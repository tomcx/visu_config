/**
 * @author T. Schmidt
 * 17.08.2011
 */


//Store, Proxy und Model beim Laden der Seite erzeugen
App.licht_szene.data = new Array(64);

//Arrays vorbelegen
(function() {
    for (var i=0;i<64;i++) {
        App.licht_szene.data[i] = {addr: i ,name: 'nicht vorhanden'};
    }
})();

    
App.licht_szene.createStore = function() {
    
    //Datenmodell Gruppenadressen
    Ext.define('Gruppenadresse', {
        extend: 'Ext.data.Model',
        fields: [
            {type: 'number', name: 'adresse'},
            {type: 'string', name: 'name'},
        ]
    });
    
    //Datenmodell Lampe
    Ext.define('Lampe', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'addr', type: 'int'},
            {name: 'name', type: 'string'},
            {name: 'kanal', type: 'string'}
        ]
    });
    
    //Store Lampe
    App.licht_szene.store = new Ext.data.Store({
        //autoLoad: true,
        model: 'Lampe',
        data : App.licht_szene,
        proxy: {
            type: 'memory',
            reader: {
                type: 'json',
                root: 'data'
            }
        }
    });
    
}();




//Fenster erzeugen
App.licht_szene.createWindow = function(){
    
    Ext.namespace('App.licht_szene.window');

    //Kommunikation
    var dataStructLampe = {
        name: 'STRING.39',
        kanal: 'STRING.5'
    };
    
    var dataStructRGB = {
        name: 'STRING.39',
        addr: 'BYTE',
        master: 'BYTE',
        rgb: 'BOOL',
        kanal1: 'BYTE',
        kanal2: 'BYTE',
        kanal3: 'BYTE',
        szene: 'BYTE',
        gruppe: 'BYTE'
    };
    
    /*App.licht_szene.data2 = {
        addr: 'BYTE',
        szene: 'BYTE',
        master: 'BYTE',
        kanal1: 'BYTE',
        kanal2: 'BYTE',
        kanal3: 'BYTE',
        rgb: 'BOOL'
    };*/
 
    
    App.licht_szene.sendData = function() {
        App.licht_szene.data2 = App.licht_szene.window.getComponent('licht_szene_formpanel').getForm().getFieldValues();
        App.comm.cx.writeStruct({
            //Parameter für Schreiben
            fld: 'M',
            addr: App.comm.plcAddr.licht.szene,
            def: dataStructRGB,
            debug: true,
            jvar: 'App.licht_szene.data2'
        });
    };

    
    App.licht_szene.readData = function() {
        App.comm.cx.readArrayOfStruct({
            //Parameter für Lesen
            fld: 'M',
            addr: App.comm.plcAddr.licht.namen,
            oc: function(){
                App.licht_szene.store.load();
            },
            arrlen: 64,
            def: dataStructLampe,
            jvar: 'App.licht_szene.data',
        });
    };
 

    //Formular innerhalb des Fensters
    App.licht_szene.createFormPanel = function() {
    
        return Ext.create('Ext.form.Panel', {
            id: 'licht_szene_formpanel',
            //frame: true,
            width: 860,
            bodyPadding: 5,
            fieldDefaults: {
                labelAlign: 'left',
                //labelWidth: 80,
                //anchor: '100%',
            },
            layout: 'column',
            items: [{
                columnWidth: 0.4,
                xtype: 'gridpanel',
                id: 'licht_szene_gridpanel',
                invalidateScrollerOnRefresh: false,
                store: App.licht_szene.store,
                height: 400,
                columnLines: true,
                columns: [{
                        text   : 'Adresse',
                        width: 50,
                        dataIndex: 'addr'
                    },
                    {
                        text   : 'Name',
                        flex: 1,
                        dataIndex: 'name'
                    },
                    {
                        text   : 'Kanal',
                        width    :50,
                        dataIndex: 'kanal'
                    }
                ],
                listeners: {
                    selectionchange: function(model, records) {
		        //App.licht_szene.window.getChildByElement('licht_szene_kanal1').collapse();
                        var selModel = this.getSelectionModel();
                        var store = this.getStore();
                        App.licht_szene.index = store.indexOf(selModel.getLastSelected());
                        if (records[0]) {
                            this.up('form').getForm().loadRecord(records[0]);
                        }
                        App.licht_szene.sendData;
                    }
                }
            },{
                xtype: 'panel',
                columnWidth: 0.6,
                height: 400,
                items: [{
                    xtype: 'fieldset',
                    //id: 'licht_szene_fieldset',
                    margin: '5 5 5 5',
                    title: 'Leistungswert',
                    defaults: {
                        labelWidth: 60
                    },
                    items: [{
                        xtype: 'textfield',
                        name: 'name',
                        id: 'licht_szene_name',
                        fieldLabel: 'Bezeichn.',
                        readOnly: true,
                    },{
                        xtype: 'numberfield',
                        name: 'addr',
                        id: 'licht_szene_adresse',
                        fieldLabel: 'DALI-Adr.',
                        value: 0,
                        readOnly: true,
                        width: 130               
                    },{
                        xtype: 'slider',
                        name: 'master',
                        id: 'licht_szene_master',
                        fieldLabel: 'Master',
                        margin: '20 0 0 0',
                        value: 0,
                        minValue: 0,
                        maxValue: 254,
                        //vertical: true,
                        width: 450,
                        listeners: {
                            changecomplete: App.licht_szene.sendData
                        }
                    },{
                        xtype: 'fieldset',
                        id: 'licht_szene_rgbfieldset',
                        defaults: {
                            labelWidth: 60,
                            value: 0,
                            minValue: 0,
                            maxValue: 254,
                            width: 450,
                        },
                        margin: '20 0 0 0',
                        title: 'RGB',
                        checkboxToggle:true,
                        checkboxName: 'rgb',
                        collapsed: true,
                        items: [
                            {
                            xtype: 'slider',
                            name: 'kanal1',
                            id: 'licht_szene_kanal1',
                            fieldLabel: 'Rot',
                            listeners: {
                                changecomplete: App.licht_szene.sendData
                            }
                        },{
                            xtype: 'slider',
                            name: 'kanal2',
                            id: 'licht_szene_kanal2',
                            fieldLabel: 'Grün',
                            listeners: {
                                changecomplete: App.licht_szene.sendData
                            }
                        },{
                            xtype: 'slider',
                            name: 'kanal3',
                            id: 'licht_szene_manal3',
                            fieldLabel: 'Blau',
                            listeners: {
                                changecomplete: App.licht_szene.sendData
                            }
                        }]
                    }]
                },{
                    xtype: 'fieldset',
                    margin: '20 5 5 5',
                    title: 'Szene',
                    defaults: {
                        labelWidth: 60
                    },
                    items: [{
                        xtype: 'numberfield',
                        name: 'szene',
                        id: 'licht_szene_szene',
                        fieldLabel: 'Szene',
                        value: 0,
                        minValue: 0,
                        maxValue: 15,
                        width: 130,
                        listeners: {
                            change: App.licht_szene.sendData
                        }
                    }
                    /*,{
                        xtype: 'numberfield',
                        name: 'gruppe',
                        id: 'licht_szene_gruppe',
                        fieldLabel: 'Gruppe',
                        value: 0,
                        minValue: 0,
                        maxValue: 15,
                        width: 130,
                        listeners: {
                            change: App.licht_szene.sendData
                        }
                    }*/
                    ,{ 
                        xtype: 'combobox',
                        fieldLabel: 'Gruppe',
                        id: 'licht_szene_Gruppe',
                        displayField: 'name',
                        valueField: 'adresse',
                        name: 'gruppe',
                        store: Ext.create('Ext.data.Store', {
                            model: 'Gruppenadresse',
                            data: [
                                {'adresse': 0, 'name':'Wohnzimmer'},
                                {'adresse': 1, 'name':'Flur'},
                                {'adresse': 2, 'name':'Schlafzimmer'},
                                {'adresse': 3, 'name':'Kinderzimmer'},
                                {'adresse': 4, 'name':'Bad'},
                                {'adresse': 5, 'name':'WC'}
                            ]
                        }),
                        listeners: {
                            change: App.licht_szene.sendData
                        },
                        queryMode: 'local',
                        typeAhead: true,
                        forceSelection: true
                    }]               
                }]
            }],
            buttons: [{
                text: 'Szene Speichern',
                tooltip: 'Werte der Kanäle unter der angegebenen Szenennummer in den EVG\'s speichern.',
                handler: function(){
                    App.comm.cx.writeBool({
                        //Parameter für Schreiben
                        fld: 'M',
                        addr: App.comm.plcAddr.licht.sz_speichern,
                        val: 1,
                        oc: function() {
                            App.comm.cx.writeBool({
                            //Parameter für Schreiben
                            fld: 'M',
                            addr: App.comm.plcAddr.licht.sz_speichern,
                            val: 0,
                            })
                        },
                        ocd: 1000
                    })
                }
            }]
        })
    };


    //Fenster
    if (! App.licht_szene.window.rendered || App.licht_szene.window.isDestroyed) { 
        App.licht_szene.window = Ext.create('Ext.window.Window', {
            title: 'Szenenprogrammierung',
            layout: 'fit',
            items: App.licht_szene.createFormPanel(),
            bbar: [
                '->',
                /*
                {
                    xtype: 'button',
                    text: 'Senden',
                    tooltip: 'Daten an SPS senden.',
                    handler: App.licht_szene.sendData
                }, 
                */
                { 
                    xtype: 'button',
                    text: 'Refresh',
                    tooltip: 'Daten aus SPS laden.',
                    handler: App.licht_szene.readData
                }]
        }).show();
    };
    
    var tooltips = [{
        target: 'licht_szene_adresse',
        html: 'DALI-Adresse des Lampen-EVG\'s. Dient nur als Index und kann hier nicht verändert werden.\
        Zur Konfiguration des DALI-Busses die KS2000-Sofware der Fa. Beckhoff verwenden.'
    },{
        target: 'licht_szene_name',
        html: 'Bezeichnung der Lampe für Visualisierung.'
    },{
        target: 'licht_szene_kanal',
        html: 'RGB-Kanal bei LED-Beleuchtung: Rot,Grün o. Blau. Nur für Visualisierung verwendet.'
    },
    {
        target: 'licht_szene_einschaltWertMin',
        html: 'Minimaler Einschaltwert. Wird bei Doppelklick auf Taster "Lampe aus" verwendet.'
    },
    {
        target: 'licht_szene_einschaltWertMax',
        html: 'Maximaler Einschaltwert. Wird bei Doppelklick auf Taster "Lampe ein" verwendet.'
    }];
    
    Ext.each(tooltips, function(config) {
        Ext.create('Ext.tip.ToolTip', config);
    });  
    
    Ext.QuickTips.init();
    
    App.licht_szene.readData();
    
};




