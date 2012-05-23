/**
 * @author T. Schmidt
 * 18.07.2011
 */


//Store, Proxy und Model beim Laden der Seite erzeugen
App.licht_lampe.data = new Array(64);

//Arrays vorbelegen
(function() {
    for (var i=0;i<64;i++) {
        App.licht_lampe.data[i] = {addr: i ,name: 'nicht vorhanden'};
    }
})();

    
App.licht_lampe.createStore = function() {
    
    //Datenmodell RGB-Kanal
    Ext.define('RGB-Kanal', {
        extend: 'Ext.data.Model',
        fields: [
            {type: 'string', name: 'wert'},
            {type: 'string', name: 'anzeige'},
        ]
    });

    //Datenmodell Lampe
    Ext.define('Lampe', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'addr', type: 'int'},
            {name: 'name', type: 'string'},
            {name: 'kanal', type: 'string'},
            {name: 'einschaltWertMin', type: 'int'},
            {name: 'einschaltWertMax', type: 'int'}
        ]
    });
    
    //Store Lampe
    App.licht_lampe.store = new Ext.data.Store({
        //autoLoad: true,
        model: 'Lampe',
        data : App.licht_lampe,
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
App.licht_lampe.createWindow = function(){
    
    Ext.namespace('App.licht_lampe.window');

    //Kommunikation
    var dataStructLampe = {
        name: 'STRING.39',
        kanal: 'STRING.6',
        einschaltWertMin: 'BYTE',
        einschaltWertMax: 'BYTE',
    };
 
    
    App.licht_lampe.sendData = function() {
        App.comm.cx.writeArrayOfStruct({
            //Parameter für Schreiben
            fld: 'M',
            addr: App.comm.plcAddr.licht.lampe,
            debug: false,
            def: dataStructLampe,
            jvar: 'App.licht_lampe.data',
            val: App.licht_lampe.data,
        });
    };
    
    
    App.licht_lampe.readData = function() {
        App.comm.cx.readArrayOfStruct({
            //Parameter für Lesen
            fld: 'M',
            addr: App.comm.plcAddr.licht.lampe,
            oc: function(){
                App.licht_lampe.store.load();
            },
            debug: false,
            arrlen: 64,
            def: dataStructLampe,
            jvar: 'App.licht_lampe.data',
        });
    };
 

    //Formular innerhalbe des Fensters
    App.licht_lampe.createFormPanel = function() {
    
        return Ext.create('Ext.form.Panel', {
            id: 'licht_lampe_formpanel',
            //frame: true,
            width: 850,
            bodyPadding: 5,
            fieldDefaults: {
                labelAlign: 'left',
                labelWidth: 80,
                anchor: '100%',
            },
            layout: 'column',
            items: [{
                columnWidth: 0.6,
                xtype: 'gridpanel',
                invalidateScrollerOnRefresh: false,
                id: 'licht_lampe_gridpanel',
                store: App.licht_lampe.store,
                height: 400,
                columnLines: true,
                autoScroll: true,
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
                    },{
                        text   : 'Ein Min.',
                        width    :50,
                        dataIndex: 'einschaltWertMin'
                    },
                    {
                        text   : 'Ein Max.',
                        width    : 50,
                        dataIndex: 'einschaltWertMax'
                    }
                ],
                listeners: {
                    selectionchange: function(model, records) {
                        var selModel = this.getSelectionModel();
                        var store = this.getStore();
                        App.licht_lampe.index = store.indexOf(selModel.getLastSelected());
                        if (records[0]) {
                            this.up('form').getForm().loadRecord(records[0]);
                        }
                    }
                }
            },{
                xtype: 'fieldset',
                id: 'licht_lampe_fieldset',
                columnWidth: 0.4,
                margin: '0 0 0 5',
                title: 'Daten',
                labelWidth: 200,
                items: [{
                    xtype: 'numberfield',
                    name: 'addr',
                    id: 'licht_lampe_adresse',
                    fieldLabel: 'DALI-Adr.',
                    value: 0,
                    minValue: 0,
                    maxValue: 63,
                    readOnly: true
                },{
                    xtype: 'textfield',
                    name: 'name',
                    id: 'licht_lampe_name',
                    fieldLabel: 'Bezeichnung',
                    maxLength: 39,
                    maxLengthText: 'Maximale Länge: 39 Zeichen.',
                },{ 
                    xtype: 'combobox',
                    fieldLabel: 'RGB-Kanal',
                    id: 'licht_lampe_kanal',
                    displayField: 'anzeige',
                    valueField: 'wert',
                    name: 'kanal',
                    store: Ext.create('Ext.data.Store', {
                        model: 'RGB-Kanal',
                        data: [{'wert': '', 'anzeige':'Keiner'},{'wert': 'Rot','anzeige': 'Rot'},{'wert': 'Grün','anzeige': 'Grün'},{'wert': 'Blau','anzeige': 'Blau'}]
                    }),
                    queryMode: 'local',
                    typeAhead: true,
                    forceSelection: true
                },{
                    xtype: 'numberfield',
                    name: 'einschaltWertMin',
                    id: 'licht_lampe_einschaltWertMin',
                    fieldLabel: 'Ein Min.',
                    value: 1,
                    minValue: 1,
                    maxValue: 254,
                },{
                    xtype: 'numberfield',
                    name: 'einschaltWertMax',
                    id: 'licht_lampe_einschaltWertMax',
                    fieldLabel: 'Ein Max.',
                    value: 1,
                    minValue: 1,
                    maxValue: 254,
                }]
            }],
                buttons: [{
                    text: 'Übernehmen',
                    tooltip: 'Werte vom Formular in die Liste übernehmen. Es werden dabei keine Daten in die SPS gesendet.',
                    handler: function(){
                        var panel = App.licht_lampe.window.getComponent('licht_lampe_formpanel').getComponent('licht_lampe_gridpanel');
                        var store = panel.getStore();
                        App.licht_lampe.data[App.licht_lampe.index] = this.up('form').getForm().getValues();
                        store.load();
                    }
                },{
                    text: 'Abbrechen',
                    tooltip: 'Formular auf Werte aus der Liste zurücksetzen.',
                    handler: function(){
                        var panel = App.licht_lampe.window.getComponent('licht_lampe_formpanel').getComponent('licht_lampe_gridpanel');
                        var store = panel.getStore();
                        this.up('form').getForm().setValues(App.licht_lampe.data[App.licht_lampe.index]);
                        //store.load();
                    }
                }]  
        })
    };


    //Fenster
    if (! App.licht_lampe.window.rendered || App.licht_lampe.window.isDestroyed) { 
        App.licht_lampe.window = Ext.create('Ext.window.Window', {
            title: 'Einstellungen für Beleuchtung',
            layout: 'fit',
            items: App.licht_lampe.createFormPanel(),
            bbar: [
                '->',
                {
                    xtype: 'button',
                    text: 'Senden',
                    tooltip: 'Daten an SPS senden.',
                    handler: App.licht_lampe.sendData
                },{ 
                    xtype: 'button',
                    text: 'Refresh',
                    tooltip: 'Daten aus SPS laden.',
                    handler: App.licht_lampe.readData
                }]
        }).show();
    };
    
    var tooltips = [{
        target: 'licht_lampe_adresse',
        html: 'DALI-Adresse des Lampen-EVG\'s. Dient nur als Index und kann hier nicht verändert werden.\
        Zur Konfiguration des DALI-Busses die KS2000-Sofware der Fa. Beckhoff verwenden.'
    },{
        target: 'licht_lampe_name',
        html: 'Bezeichnung der Lampe für Visualisierung.'
    },{
        target: 'licht_lampe_kanal',
        html: 'RGB-Kanal bei LED-Beleuchtung: Rot,Grün o. Blau. Nur für Visualisierung verwendet.'
    },
    {
        target: 'licht_lampe_einschaltWertMin',
        html: 'Minimaler Einschaltwert. Wird bei Doppelklick auf Taster "Lampe aus" verwendet.'
    },
    {
        target: 'licht_lampe_einschaltWertMax',
        html: 'Maximaler Einschaltwert. Wird bei Doppelklick auf Taster "Lampe ein" verwendet.'
    }];
    
    Ext.each(tooltips, function(config) {
        Ext.create('Ext.tip.ToolTip', config);
    });  
    
    Ext.QuickTips.init();
    
    App.licht_lampe.readData();
    
};




