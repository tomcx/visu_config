/**
 * @author T. Schmidt
 * 18.07.2011
 */


//Store, Proxy und Model beim Laden der Seite erzeugen
App.licht_namen.data = new Array(64);

//Arrays vorbelegen
(function() {
    for (var i=0;i<64;i++) {
        App.licht_namen.data[i] = {addr: i ,name: 'nicht vorhanden'};
    }
})();

    
App.licht_namen.createStore = function() {
    
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
            {name: 'kanal', type: 'string'}
        ]
    });
    
    //Store Lampe
    App.licht_namen.store = new Ext.data.Store({
        //autoLoad: true,
        model: 'Lampe',
        data : App.licht_namen,
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
App.licht_namen.createWindow = function(){
    
    Ext.namespace('App.licht_namen.window');

    //Kommunikation
    var dataStructLampe = {
        name: 'STRING.39',
        kanal: 'STRING.5'
    };
 
    
    App.licht_namen.sendData = function() {
        App.comm.cx.writeArrayOfStruct({
            //Parameter für Schreiben
            fld: 'M',
            addr: App.comm.plcAddr.licht.namen,
            debug: false,
            def: dataStructLampe,
            val: App.licht_namen.data,
        });
    };
    
    
    App.licht_namen.readData = function() {
        App.comm.cx.readArrayOfStruct({
            //Parameter für Lesen
            fld: 'M',
            addr: App.comm.plcAddr.licht.namen,
            oc: function(){
                App.licht_namen.store.load();
            },
            debug: false,
            arrlen: 64,
            def: dataStructLampe,
            jvar: 'App.licht_namen.data',
        });
    };
 

    //Formular innerhalbe des Fensters
    App.licht_namen.createFormPanel = function() {
    
        return Ext.create('Ext.form.Panel', {
            id: 'licht_namen_formpanel',
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
                id: 'licht_namen_gridpanel',
                store: App.licht_namen.store,
                height: 400,
                columnLines: true,
                autoScroll: true,
                columns: [{
                        text   : 'Adresse',
                        width: 50,
                        dataIndex: 'addr'
                    },{
                        text   : 'Name',
                        flex: 1,
                        dataIndex: 'name'
                    },{
                        text   : 'Kanal',
                        width    :50,
                        dataIndex: 'kanal'
                }],
                listeners: {
                    selectionchange: function(model, records) {
                        var selModel = this.getSelectionModel();
                        var store = this.getStore();
                        App.licht_namen.index = store.indexOf(selModel.getLastSelected());
                        if (records[0]) {
                            this.up('form').getForm().loadRecord(records[0]);
                        }
                    }
                }
            },{
                xtype: 'fieldset',
                id: 'licht_namen_fieldset',
                columnWidth: 0.4,
                margin: '0 0 0 5',
                title: 'Daten',
                labelWidth: 200,
                items: [{
                    xtype: 'numberfield',
                    name: 'addr',
                    id: 'licht_namen_adresse',
                    fieldLabel: 'DALI-Adr.',
                    value: 0,
                    minValue: 0,
                    maxValue: 63,
                    readOnly: true
                },{
                    xtype: 'textfield',
                    name: 'name',
                    id: 'licht_namen_name',
                    fieldLabel: 'Bezeichnung',
                    maxLength: 39,
                    maxLengthText: 'Maximale Länge: 39 Zeichen.',
                },{ 
                    xtype: 'combobox',
                    fieldLabel: 'RGB-Kanal',
                    id: 'licht_namen_kanal',
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
                }]
            }],
                buttons: [{
                    text: 'Übernehmen',
                    tooltip: 'Werte vom Formular in die Liste übernehmen. Es werden dabei keine Daten in die SPS gesendet.',
                    handler: function(){
                        var panel = App.licht_namen.window.getComponent('licht_namen_formpanel').getComponent('licht_namen_gridpanel');
                        var store = panel.getStore();
                        App.licht_namen.data[App.licht_namen.index] = this.up('form').getForm().getValues();
                        store.load();
                    }
                },{
                    text: 'Abbrechen',
                    tooltip: 'Formular auf Werte aus der Liste zurücksetzen.',
                    handler: function(){
                        var panel = App.licht_namen.window.getComponent('licht_namen_formpanel').getComponent('licht_namen_gridpanel');
                        var store = panel.getStore();
                        this.up('form').getForm().setValues(App.licht_namen.data[App.licht_namen.index]);
                        //store.load();
                    }
                }]  
        })
    };


    //Fenster
    if (! App.licht_namen.window.rendered || App.licht_namen.window.isDestroyed) { 
        App.licht_namen.window = Ext.create('Ext.window.Window', {
            title: 'Bezeichnungen der Lampen',
            layout: 'fit',
            items: App.licht_namen.createFormPanel(),
            bbar: [
                '->',
                {
                    xtype: 'button',
                    text: 'Senden',
                    tooltip: 'Daten an SPS senden.',
                    handler: App.licht_namen.sendData
                },{ 
                    xtype: 'button',
                    text: 'Refresh',
                    tooltip: 'Daten aus SPS laden.',
                    handler: App.licht_namen.readData
                }]
        }).show();
    };
    
    var tooltips = [{
        target: 'licht_namen_adresse',
        html: 'DALI-Adresse des Lampen-EVG\'s. Dient nur als Index und kann hier nicht verändert werden.\
        Zur Konfiguration des DALI-Busses die KS2000-Sofware der Fa. Beckhoff verwenden.'
    },{
        target: 'licht_namen_name',
        html: 'Bezeichnung der Lampe für Visualisierung.'
    },{
        target: 'licht_namen_kanal',
        html: 'RGB-Kanal bei LED-Beleuchtung: Rot,Grün o. Blau. Nur für Visualisierung verwendet.'
    }];
    
    Ext.each(tooltips, function(config) {
        Ext.create('Ext.tip.ToolTip', config);
    });  
    
    Ext.QuickTips.init();
    
    App.licht_namen.readData();
    
};




