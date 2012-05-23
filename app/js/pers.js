/**
 * @author T. Schmidt
 * 20.06.2011
 */

//Fenster erzeugen
App.pers.createWindow = function(item){
    
    var label = item.myLabel;
    Ext.namespace('App.pers.' + label +'.window');
          
    //Kommunikation
    var dataStruct = {
        pers_name: 'STRING.19',
        pers_weckton: 'BYTE',
        pers_weckenLichtEin: 'TIME.#m',
        pers_bettseite: 'STRING.6',
        pers_startDatum: 'DATE',
        pers_schichtSystem: 'BYTE',
        pers_preset1: 'BYTE',
        pers_preset2: 'BYTE',
        pers_preset3: 'BYTE',
        pers_preset4: 'BYTE',
    };
    
    App.pers[label].data = {};
    
    App.pers[label].sendData = function() {
        
        App.pers[label].data = App.pers[label].window.getComponent(label + '_formpanel').getForm().getFieldValues(); 
        App.comm.cx.writeStruct({
            //Parameter für Schreiben
            fld: 'M',
            addr: App.comm.plcAddr.pers[label],
            debug: false,
            def: dataStruct,
            jvar: 'App.pers.' + label + '.data',
        })
        
       
    };
    
    App.pers[label].readData = function() {
        App.comm.cx.readStruct({
            //Parameter für Lesen
            fld: 'M',
            addr: App.comm.plcAddr.pers[label],
            oc: function(){
                App.pers[label].window.getComponent(label + '_formpanel').getForm().setValues(App.pers[label].data);
                App.pers.deaktPresets();
            },
            debug: false,
            def: dataStruct,
            jvar: 'App.pers.' + label + '.data',
        })
    };
    
    //Fenster
    if (!App.pers[label].window.rendered || App.pers[label].window.isDestroyed) {
        App.pers[label].window = Ext.create('Ext.window.Window', {
            title: 'Allgemeine Daten für ' + item.text,
            id: 'window_' + label,
            layout: 'fit',
            items: App.pers.createFormPanel(label),
            bbar: ['->', {
                xtype: 'button',
                text: 'Senden',
                tooltip: 'Daten an SPS senden.',
                handler: App.pers[label].sendData
            }, {
                xtype: 'button',
                text: 'Refresh',
                tooltip: 'Daten aus SPS laden.',
                handler: App.pers[label].readData
            }]
        }).show();
    };
    
    //Presets deaktivieren
    App.pers.deaktPresets = function() {
        var form = App.pers[label].window.getComponent(label + '_formpanel').getForm();
        var sys = form.findField(label + '_schichtSystem').getValue();
        switch (sys) {
            case 1:
                form.findField(label + '_preset2').setDisabled(true);
                form.findField(label + '_preset3').setDisabled(true);
                form.findField(label + '_preset4').setDisabled(true);
                break;
            case 2:
                form.findField(label + '_preset2').setDisabled(false);
                form.findField(label + '_preset3').setDisabled(true);
                form.findField(label + '_preset4').setDisabled(true);
                break;
            case 3:
                form.findField(label + '_preset2').setDisabled(false);
                form.findField(label + '_preset3').setDisabled(false);
                form.findField(label + '_preset4').setDisabled(true);
                break;
            default:
                form.findField(label + '_preset2').setDisabled(false);
                form.findField(label + '_preset3').setDisabled(false);
                form.findField(label + '_preset4').setDisabled(false);
        };
    };
    
    //Tooltips
    Ext.create('Ext.tip.ToolTip', {
         target: label + '_name',
         html: 'Name der Person für Visualisierung.'
    });
    Ext.create('Ext.tip.ToolTip', {
        target: label + '_weckton',
        html: 'Nummer des Wecktons.'
    });
    Ext.create('Ext.tip.ToolTip', {
        target: label + '_weckenLichtEin',
        html: 'Zeit in Minuten, für die das Licht vor dem Wecken eingeschaltet werden soll.'
    });
    Ext.create('Ext.tip.ToolTip', {
        target: label + '_bettseite',
        html: 'Bettseite, wird nur für Personen, die im Schlafzimmer schlafen (1 und 2), ausgewertet.'
    });
    Ext.create('Ext.tip.ToolTip', {
        target: label + '_startDatum',
        html: 'Zählbeginn für Schichtrythmus; ein Montag, an dem der Preset Woche 1 aktiv ist.'
    });
    Ext.create('Ext.tip.ToolTip', {
        target: label + '_schichtSystem',
        html: 'Schichtsystem (1 - Kein, 2 - ZweiSchicht, 3 - DreiSchicht 4 - VierSchicht.'
    });
    Ext.create('Ext.tip.ToolTip', {
        target: label + '_preset1',
        html: 'Presetnummer der 1. Woche, für diese gilt das Startdatum zum Zählen.'
    });
    Ext.create('Ext.tip.ToolTip', {
        target: label + '_preset2',
        html: 'Presetnummer der 2. Woche.'
    });
    Ext.create('Ext.tip.ToolTip', {
        target: label + '_preset3',
        html: 'Presetnummer der 3. Woche.'
    });
    Ext.create('Ext.tip.ToolTip', {
        target: label + '_preset4',
        html: 'Presetnummer der 4. Woche.'
    });


    App.pers[label].readData();
    App.pers.deaktPresets();
    
    if (label == 'Pers3' || label == 'Pers4') {
        App.pers[label].window.getComponent(label + '_formpanel').getForm().findField(label + '_weckton').setDisabled(true);
        App.pers[label].window.getComponent(label + '_formpanel').getForm().findField(label + '_bettseite').setDisabled(true);
    }
    
    
};
   

//Formular innerhalbe des Fensters
App.pers.createFormPanel = function(label) {
    
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
        items: [{
            xtype: 'displayfield',
            name: 'pers_beschreibung',
            value: 'Die Personen 1 und 2 gelten als Erwachsene und sind \
                    automatisch dem Schlafzimmer zugeordnet. Deshalb lassen sich \
                    auch nur hier Daten für das Wecksystem eingeben.',
            margin: '5 5 10 5'
            },{
            xtype: 'fieldset',
            id: label + '_fieldset1',
            title: 'Allgemein',
            items: [{
                xtype: 'textfield',
                name: 'pers_name',
                id: label + '_name',
                fieldLabel: 'Name',
                maxLength: 19,
                maxLengthText: 'Maximale Länge: 19 Zeichen.'
            }]
        },{
            xtype: 'fieldset',
            id: label + '_fieldset2',
            title: 'Schlafen und Wecken',
            items: [{
                xtype: 'numberfield',
                name: 'pers_weckton',
                id: label + '_weckton',
                fieldLabel: 'Nummer des Wecktons',
                value: 0,
                minValue: 0,
                maxValue: 5
            },{
                xtype: 'numberfield',
                name: 'pers_weckenLichtEin',
                id: label + '_weckenLichtEin',
                fieldLabel: 'Zeit f. Licht ein vorm Wecken',
                value: 0,
                minValue: 0,
                maxValue: 60
            },{
                xtype: 'textfield',
                name: 'pers_bettseite',
                id: label + '_bettseite',
                fieldLabel: 'Bettseite (links/rechts)',
                maxLength: 6,
                maxLengthText: 'Maximale Länge: 6 Zeichen.'
            }]
        },{
            xtype: 'fieldset',
            id: label + '_fieldset3',
            title: 'Wechselrythmus',
            items: [{
                xtype: 'datefield',
                name: 'pers_startDatum',
                id: label + '_startDatum',   
                anchor: '100%',
                fieldLabel: 'Startdatum',
                value: new Date(),
                maxValue: new Date(),  // limited to the current date or prior
                format: 'd.m.Y',
            },{
                xtype: 'numberfield',
                name: 'pers_schichtSystem',
                id: label + '_schichtSystem',
                fieldLabel: 'Schichtsystem',
                value: 1,
                minValue: 1,
                maxValue: 4,
                listeners: {
                    change: function() {
                        App.pers.deaktPresets();
                     }
                }
            },{
                xtype: 'numberfield',
                name: 'pers_preset1',
                id: label + '_preset1',
                fieldLabel: 'Preset Woche 1',
                value: 1,
                minValue: 0,
                maxValue: 10
            },{
                xtype: 'numberfield',
                name: 'pers_preset2',
                id: label + '_preset2',
                fieldLabel: 'Preset Woche 2',
                value: 1,
                minValue: 0,
                maxValue: 10
            },{
                xtype: 'numberfield',
                name: 'pers_preset3',
                id: label + '_preset3',
                fieldLabel: 'Preset Woche 3',
                value: 1,
                minValue: 0,
                maxValue: 10
            },{
                xtype: 'numberfield',
                name: 'pers_preset4',
                id: label + '_preset4',
                fieldLabel: 'Preset Woche 4',
                value: 1,
                minValue: 0,
                maxValue: 10
            }]  
        }]
    })
};


