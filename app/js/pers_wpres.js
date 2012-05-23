/**
 * @author T. Schmidt
 * 12.07.2011
 */

//Fenster erzeugen
App.pers_wpres.createWindow = function(item){
    
    var label = item.myLabel;
    Ext.namespace('App.pers_wpres.' + label +'.window');
        
    //Kommunikation
    var dataStruct = {
        pers_wpres_name: 'STRING.19',
        pers_wpres_wecken: 'BOOL',
        pers_wpres_aufstehen: 'BOOL',
        pers_wpres_gehen: 'BOOL',
        pers_wpres_kommen: 'BOOL',
        pers_wpres_schlafen: 'BOOL',
        pers_wpres_aufstehenTOD: 'TOD',
        pers_wpres_gehenTOD: 'TOD',
        pers_wpres_kommenTOD: 'TOD',
        pers_wpres_schlafenTOD: 'TOD'
    };
    
    App.pers_wpres[label].data = [{},{},{},{},{},{},{}];
    
    App.pers_wpres[label].sendData = function() {
        var tabpanel = App.pers_wpres[label].window.getComponent(0);
        for (var i = 0; i < 7; i++) {
            App.pers_wpres[label].data[i] = tabpanel.getComponent(i).getComponent(0).getForm().getFieldValues(); 
        } 
        App.comm.cx.writeArrayOfStruct({
            //Parameter für Schreiben
            fld: 'M',
            addr: App.comm.plcAddr.pers_wpres[label],
            debug: false,
            arrlen: 7,
            //onlyItem: 1, //Test
            def: dataStruct,
            //jvar: 'App.pers_wpres.' + label + '.data', //Geht auch statt val 
            val: App.pers_wpres[label].data
        })
    };
    
    App.pers_wpres[label].readData = function() {
        App.comm.cx.readArrayOfStruct({
            //Parameter für Lesen
            fld: 'M',
            addr: App.comm.plcAddr.pers_wpres[label],
            oc: function(){
                var tabpanel = App.pers_wpres[label].window.getComponent(0);
                for (var i = 0; i < 7; i++) {
                    tabpanel.getComponent(i).getComponent(0).getForm().setValues(App.pers_wpres[label].data[i]);
                }
            },
            debug: false,
            arrlen: 7,
            def: dataStruct,
            jvar: 'App.pers_wpres.' + label + '.data',
        })
    };
    
    //Fenster
    if (!App.pers_wpres[label].window.rendered || App.pers_wpres[label].window.isDestroyed) {
        App.pers_wpres[label].window = Ext.create('Ext.window.Window', {
            title: item.text,
            id: 'window_' + label,
            layout: 'fit',
            listeners: {
                render: App.pers_wpres[label].readData
            },
            items: App.pers_wpres.createTabPanel(label),
            bbar: ['->', {
                xtype: 'button',
                text: 'Senden',
                tooltip: 'Daten an SPS senden.',
                handler: App.pers_wpres[label].sendData
            }, {
                xtype: 'button',
                text: 'Refresh',
                tooltip: 'Daten aus SPS laden.',
                handler: App.pers_wpres[label].readData
            }]
        }).show();
    };
   
};
   
//Tabpanel
App.pers_wpres.createTabPanel = function(label){

    return Ext.createWidget('tabpanel', {
        //renderTo: 'tabs',
        //resizeTabs: true,
        id: label + '_tabpanel',
        //enableTabScroll: true,
        width: 500,
        //height: 250,
        defaults: {
            autoScroll: true,
            bodyPadding: 5
        },
        items: [{
            title: 'Montag',
            //iconCls: 'tabs',
            items: App.pers_wpres.createFormPanel(label,'_MO')
        },{
            title: 'Dienstag',
            //iconCls: 'tabs',
            items: App.pers_wpres.createFormPanel(label,'_DI')
        },{
            title: 'Mittwoch',
            //iconCls: 'tabs',
            items: App.pers_wpres.createFormPanel(label,'_MI')
        },{
            title: 'Donnerstag',
            //iconCls: 'tabs',
            items: App.pers_wpres.createFormPanel(label,'_DO')
        },{
            title: 'Freitag',
            //iconCls: 'tabs',
            items: App.pers_wpres.createFormPanel(label,'_FR')
        },{
            title: 'Samstag',
            //iconCls: 'tabs',
            items: App.pers_wpres.createFormPanel(label,'_SA')
        },{
            title: 'Sonntag',
            //iconCls: 'tabs',
            items: App.pers_wpres.createFormPanel(label,'_SO')
        }]
    })
}

//Formular innerhalb des Tabs
App.pers_wpres.createFormPanel = function(label,index) {
   
   return Ext.create('Ext.form.Panel', {
        id: label + index + '_formpanel',
        frame: false,
        //width: 340,
        bodyPadding: 5,  
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 300,
            anchor: '100%'
        },
        mylabel: label,
        myindex: index,
        listeners: {
            afterrender: function() {
                Ext.create('Ext.tip.ToolTip', {
                    target: this.mylabel + this.myindex + '_name',
                    html: 'Bezeichnung des Presets.'
                });
                Ext.create('Ext.tip.ToolTip', {
                    target: this.mylabel + this.myindex + '_wecken',
                    html: 'Wecken aktiv. Zum Zeitpunkt "Aufstehen" wird das Wecksignal ausgegeben.'
                });
                Ext.create('Ext.tip.ToolTip', {
                    target: this.mylabel + this.myindex + '_aufstehen',
                    html: 'Zeitpunkt "Aufstehen" aktiv und wird von der Schaltuhr ausgewertet.'
                });
                Ext.create('Ext.tip.ToolTip', {
                    target: this.mylabel + this.myindex + '_gehen',
                    html: 'Zeitpunkt "Gehen" aktiv und wird von der Schaltuhr ausgewertet.'
                });
                Ext.create('Ext.tip.ToolTip', {
                    target: this.mylabel + this.myindex + '_kommen',
                    html: 'Zeitpunkt "Kommen" aktiv und wird von der Schaltuhr ausgewertet.'
                });
                Ext.create('Ext.tip.ToolTip', {
                    target: this.mylabel + this.myindex + '_schlafen',
                    html: 'Zeitpunkt "Schlafen" aktiv und wird von der Schaltuhr ausgewertet.'
                });
                Ext.create('Ext.tip.ToolTip', {
                    target: this.mylabel + this.myindex + '_aufstehenTOD',
                    html: 'Zeit, zu der Person aufsteht.'
                });
                Ext.create('Ext.tip.ToolTip', {
                    target: this.mylabel + this.myindex + '_gehenTOD',
                    html: 'Zeit, wenn Person die Wohnung verlässt.'
                });
                Ext.create('Ext.tip.ToolTip', {
                    target: this.mylabel + this.myindex + '_kommenTOD',
                    html: 'Zeit, wenn Person wieder anwesend ist.'
                });
                Ext.create('Ext.tip.ToolTip', {
                    target: this.mylabel + this.myindex + '_schlafenTOD',
                    html: 'Zeit, wenn Person schlafen geht.'
                });     
            }
        },
        items: [{
            xtype: 'fieldset',
            id: label + index + '_fieldset1',
            title: 'Allgemein',
            items: [{
                xtype: 'textfield',
                name: 'pers_wpres_name',
                id: label + index + '_name',
                fieldLabel: 'Bezeichnung',
                maxLength: 19,
                maxLengthText: 'Maximale Länge: 19 Zeichen.'
            }]
        },{
            xtype: 'fieldset',
            id: label + index + '_fieldset2',
            title: 'Schaltpunkte Ein/Aus',
            items: [{
                xtype: 'checkboxfield',
                name: 'pers_wpres_wecken',
                id: label + index + '_wecken',
                fieldLabel: 'Wecken aktiv',
                inputValue: '1'
            },{
                xtype: 'checkboxfield',
                name: 'pers_wpres_aufstehen',
                id: label + index + '_aufstehen',
                fieldLabel: 'Aufstehen aktiv',
                inputValue: '1',
            },{
                xtype: 'checkboxfield',
                name: 'pers_wpres_gehen',
                id: label + index + '_gehen',
                fieldLabel: 'Gehen aktiv',
                inputValue: '1',
            },{
                xtype: 'checkboxfield',
                name: 'pers_wpres_kommen',
                id: label + index + '_kommen',
                fieldLabel: 'Kommen aktiv',
                inputValue: '1',
            },{
                xtype: 'checkboxfield',
                name: 'pers_wpres_schlafen',
                id: label + index + '_schlafen',
                fieldLabel: 'Schlafen aktiv',
                inputValue: '1',
            }]
        },{
            xtype: 'fieldset',
            id: label + index + '_fieldset3',
            title: 'Zeiten',
            items: [{
                xtype: 'timefield',
                name: 'pers_wpres_aufstehenTOD',
                id: label + index + '_aufstehenTOD',
                fieldLabel: 'Zeit Aufstehen',  
                anchor: '100%',
                format: 'H:i'
            },{
                xtype: 'timefield',
                name: 'pers_wpres_gehenTOD',
                id: label + index + '_gehenTOD',
                fieldLabel: 'Zeit Gehen',
                anchor: '100%',
                format: 'H:i'
            },{
                xtype: 'timefield',
                name: 'pers_wpres_kommenTOD',
                id: label + index + '_kommenTOD',
                fieldLabel: 'Zeit Kommen',
                anchor: '100%',
                format: 'H:i'
            },{
                xtype: 'timefield',
                name: 'pers_wpres_schlafenTOD',
                id: label + index + '_schlafenTOD',
                fieldLabel: 'Zeit Schlafen',
                anchor: '100%',
                format: 'H:i'
            }]  
        }]
    })
   
};



