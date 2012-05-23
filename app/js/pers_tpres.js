/**
 * @author T. Schmidt
 * 20.06.2011
 */

//Fenster erzeugen
App.pers_tpres.createWindow = function(item){
    
    var label = item.myLabel;
    Ext.namespace('App.pers_tpres.' + label +'.window');
        
    //Kommunikation
    var dataStruct = {
        pers_tpres_name: 'STRING.19',
        pers_tpres_wecken: 'BOOL',
        pers_tpres_aufstehen: 'BOOL',
        pers_tpres_gehen: 'BOOL',
        pers_tpres_kommen: 'BOOL',
        pers_tpres_schlafen: 'BOOL',
        pers_tpres_aufstehenTOD: 'TOD',
        pers_tpres_gehenTOD: 'TOD',
        pers_tpres_kommenTOD: 'TOD',
        pers_tpres_schlafenTOD: 'TOD'
    };
    
    App.pers_tpres[label].data = {};
    
    App.pers_tpres[label].sendData = function() {
        App.pers_tpres[label].data = App.pers_tpres[label].window.getComponent(label + '_formpanel').getForm().getFieldValues(); 
        App.comm.cx.writeStruct({
            //Parameter für Schreiben
            fld: 'M',
            addr: App.comm.plcAddr.pers_tpres[label],
            debug: false,
            def: dataStruct,
            //jvar: 'App.pers_tpres.' + label + '.data',  //Geht auch statt val
            val: App.pers_tpres[label].data
        })
    };
    
    App.pers_tpres[label].readData = function() {
        App.comm.cx.readStruct({
            //Parameter für Lesen
            fld: 'M',
            addr: App.comm.plcAddr.pers_tpres[label],
            oc: function(){
                App.pers_tpres[label].window.getComponent(label + '_formpanel').getForm().setValues(App.pers_tpres[label].data);
            },
            debug: false,
            def: dataStruct,
            jvar: 'App.pers_tpres.' + label + '.data',
        })
    };
    
    //Fenster
    if (!App.pers_tpres[label].window.rendered || App.pers_tpres[label].window.isDestroyed) {
        App.pers_tpres[label].window = Ext.create('Ext.window.Window', {
            title: item.text,
            id: 'window_' + label,
            layout: 'fit',
            items: App.pers_tpres.createFormPanel(label),
            listeners: {
                render: App.pers_tpres[label].readData
            },
            bbar: ['->', {
                xtype: 'button',
                text: 'Senden',
                tooltip: 'Daten an SPS senden.',
                handler: App.pers_tpres[label].sendData
            }, {
                xtype: 'button',
                text: 'Refresh',
                tooltip: 'Daten aus SPS laden.',
                handler: App.pers_tpres[label].readData
            }]
        }).show();
    };
};
   

//Formular innerhalbe des Fensters
App.pers_tpres.createFormPanel = function(label) {

    return Ext.create('Ext.form.Panel', {
        id: label + '_formpanel',
        frame: false,
        width: 340,
        bodyPadding: 5,  
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 200,
            anchor: '100%'
        },
        mylabel: label,
        listeners: {
            afterrender: function() {
                //Tooltips
                Ext.create('Ext.tip.ToolTip', {
                 target: this.mylabel + '_name',
                 html: 'Bezeichnung des Presets.'
                });
                Ext.create('Ext.tip.ToolTip', {
                    target: this.mylabel + '_wecken',
                    html: 'Wecken aktiv. Zum Zeitpunkt "Aufstehen" wird das Wecksignal ausgegeben.'
                });
                Ext.create('Ext.tip.ToolTip', {
                    target: this.mylabel + '_aufstehen',
                    html: 'Zeitpunkt "Aufstehen" aktiv und wird von der Schaltuhr ausgewertet.'
                });
                Ext.create('Ext.tip.ToolTip', {
                    target: this.mylabel + '_gehen',
                    html: 'Zeitpunkt "Gehen" aktiv und wird von der Schaltuhr ausgewertet.'
                });
                Ext.create('Ext.tip.ToolTip', {
                    target: this.mylabel + '_kommen',
                    html: 'Zeitpunkt "Kommen" aktiv und wird von der Schaltuhr ausgewertet.'
                });
                Ext.create('Ext.tip.ToolTip', {
                    target: this.mylabel + '_schlafen',
                    html: 'Zeitpunkt "Schlafen" aktiv und wird von der Schaltuhr ausgewertet.'
                });
                Ext.create('Ext.tip.ToolTip', {
                    target: this.mylabel + '_aufstehenTOD',
                    html: 'Zeit, zu der Person aufsteht.'
                });
                Ext.create('Ext.tip.ToolTip', {
                    target: this.mylabel + '_gehenTOD',
                    html: 'Zeit, wenn Person die Wohnung verlässt.'
                });
                Ext.create('Ext.tip.ToolTip', {
                    target: this.mylabel + '_kommenTOD',
                    html: 'Zeit, wenn Person wieder anwesend ist.'
                });
                Ext.create('Ext.tip.ToolTip', {
                    target: this.mylabel + '_schlafenTOD',
                    html: 'Zeit, wenn Person schlafen geht.'
                });   
            }
        },
        items: [{
            xtype: 'fieldset',
            id: label + '_fieldset1',
            title: 'Allgemein',
            items: [{
                xtype: 'textfield',
                name: 'pers_tpres_name',
                id: label + '_name',
                fieldLabel: 'Bezeichnung',
                maxLength: 19,
                maxLengthText: 'Maximale Länge: 19 Zeichen.'
            }]
        },{
            xtype: 'fieldset',
            id: label + '_fieldset2',
            title: 'Schaltpunkte Ein/Aus',
            items: [{
                xtype: 'checkboxfield',
                name: 'pers_tpres_wecken',
                id: label + '_wecken',
                fieldLabel: 'Wecken aktiv',
                inputValue: '1'
            },{
                xtype: 'checkboxfield',
                name: 'pers_tpres_aufstehen',
                id: label + '_aufstehen',
                fieldLabel: 'Aufstehen aktiv',
                inputValue: '1',
            },{
                xtype: 'checkboxfield',
                name: 'pers_tpres_gehen',
                id: label + '_gehen',
                fieldLabel: 'Gehen aktiv',
                inputValue: '1',
            },{
                xtype: 'checkboxfield',
                name: 'pers_tpres_kommen',
                id: label + '_kommen',
                fieldLabel: 'Kommen aktiv',
                inputValue: '1',
            },{
                xtype: 'checkboxfield',
                name: 'pers_tpres_schlafen',
                id: label + '_schlafen',
                fieldLabel: 'Schlafen aktiv',
                inputValue: '1',
            }]
        },{
            xtype: 'fieldset',
            id: label + '_fieldset3',
            title: 'Zeiten',
            items: [{
                xtype: 'timefield',
                name: 'pers_tpres_aufstehenTOD',
                id: label + '_aufstehenTOD',
                fieldLabel: 'Zeit Aufstehen',  
                anchor: '100%',
                format: 'H:i'
            },{
                xtype: 'timefield',
                name: 'pers_tpres_gehenTOD',
                id: label + '_gehenTOD',
                fieldLabel: 'Zeit Gehen',
                anchor: '100%',
                format: 'H:i'
            },{
                xtype: 'timefield',
                name: 'pers_tpres_kommenTOD',
                id: label + '_kommenTOD',
                fieldLabel: 'Zeit Kommen',
                anchor: '100%',
                format: 'H:i'
            },{
                xtype: 'timefield',
                name: 'pers_tpres_schlafenTOD',
                id: label + '_schlafenTOD',
                fieldLabel: 'Zeit Schlafen',
                anchor: '100%',
                format: 'H:i'
            }]  
        }]
    })
};



