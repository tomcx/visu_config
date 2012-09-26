/**
 * @author T. Schmidt
 * 20.06.2011
 */

/*
 * Fenster f. Rollodaten erzeugen
 */
App.rollo.createWindow = function(item){
    
    var label = item.myLabel;
    Ext.namespace('App.rollo.' + label +'.window');

    //Kommunikation
    var dataStruct = {
        rollo_name: 'STRING.39',
        rollo_tagPos: 'BYTE',
        rollo_tagPos2: 'BYTE',
        rollo_schattPos: 'BYTE',
        rollo_nachtPos: 'BYTE',
        rollo_nachtPos2: 'BYTE',
        rollo_nachtLueftPos: 'BYTE',
        rollo_nachtXmasPos: 'BYTE',
        rollo_handTimeout: 'TIME.#m',
        rollo_fahrZeit: 'TIME.#s'
    };
    
    App.rollo[label].data = {};
    
    App.rollo[label].sendData = function() {
        App.rollo[label].data = App.rollo[label].window.getComponent(label + '_formpanel').getForm().getValues(); 
        App.comm.cx.writeStruct({
            //Parameter für Schreiben
            fld: 'M',
            addr: App.comm.plcAddr.rollo[label],
            debug: false,
            def: dataStruct,
            jvar: 'App.rollo.' + label + '.data',
        })
    };
    
    
    App.rollo[label].readData = function() {
        App.comm.cx.readStruct({
            //Parameter für Lesen
            fld: 'M',
            addr: App.comm.plcAddr.rollo[label],
            oc: function(){
                App.rollo[label].window.getComponent(label + '_formpanel').getForm().setValues(App.rollo[label].data);
            },
            debug: false,
            def: dataStruct,
            jvar: 'App.rollo.' + label + '.data',
        })
    };
    
    //Fenster
    if (!App.rollo[label].window.rendered || App.rollo[label].window.isDestroyed) {
        App.rollo[label].window = Ext.create('Ext.window.Window', {
            title: 'Rollladen ' + item.text,
            id: 'window_' + label,
            layout: 'fit',
            items: App.rollo.createFormPanel(label),
            bbar: ['->', {
                xtype: 'button',
                text: 'Senden',
                tooltip: 'Daten an SPS senden.',
                handler: App.rollo[label].sendData
            }, {
                xtype: 'button',
                text: 'Refresh',
                tooltip: 'Daten aus SPS laden.',
                handler: App.rollo[label].readData
            }]
        }).show();
    };
    
    //Tooltips
    var tooltips = {
        tip1: Ext.create('Ext.tip.ToolTip', {
             target: label + '_name',
             html: 'Name des Rollos für Visualisierung.'
        }),
        tip2: Ext.create('Ext.tip.ToolTip', {
            target: label + '_tagPos',
            html: 'Normale Tagesposition.'
        }),
        tip3: Ext.create('Ext.tip.ToolTip', {
            target: label + '_tagPos2',
            html: 'Alternative Tagesposition.'
        }),
        tip4: Ext.create('Ext.tip.ToolTip', {
            target: label + '_schattPos',
            html: 'Position für Verschattung.'
        }),
        tip5: Ext.create('Ext.tip.ToolTip', {
            target: label + '_nachtPos',
            html: 'Normale Nachtposition.'
        }),
        tip6: Ext.create('Ext.tip.ToolTip', {
            target: label + '_nachtPos2',
            html: 'Alternative Nachtposition.'
        }),
        tip7: Ext.create('Ext.tip.ToolTip', {
            target: label + '_nachtLueftPos',
            html: 'Position bei offenem Fenster im Nachtbetrieb.'
        }),
        tip8: Ext.create('Ext.tip.ToolTip', {
            target: label + '_nachtXmasPos',
            html: 'Position bei aktiver Weihnachtsbeleuchtung im Nachtbetrieb.'
        }),
        tip9: Ext.create('Ext.tip.ToolTip', {
            target: label + '_handTimeout',
            html: 'Zeit in Minuten, nach der von Handbetätigung wieder in Automatikbetrieb geschaltet wird.'
        }),
        tip10: Ext.create('Ext.tip.ToolTip', {
            target: label + '_fahrZeit',
            html: 'Fahrzeit des Rollladens in Sekunden.'
        })
    };
    
    App.rollo[label].readData();
    
};
   

//Formular innerhalbe des Fensters
App.rollo.createFormPanel = function(label) {

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
            xtype: 'fieldset',
            id: label + '_fieldset1',
            title: 'Allgemein',
            items: [{
                xtype: 'textfield',
                name: 'rollo_name',
                id: label + '_name',
                fieldLabel: 'Bezeichnung',
                maxLength: 39,
                maxLengthText: 'Maximale Länge: 39 Zeichen.'
            }]
            },{
            xtype: 'fieldset',
            id: label + '_fieldset2',
            title: 'Positionen',
            items: [{
                xtype: 'numberfield',
                name: 'rollo_tagPos',
                id: label + '_tagPos',
                fieldLabel: 'Tagesposition',
                value: 0,
                minValue: 0,
                maxValue: 100
            },{
                xtype: 'numberfield',
                name: 'rollo_tagPos2',
                id: label + '_tagPos2',
                fieldLabel: 'Tagesposition 2',
                value: 0,
                minValue: 0,
                maxValue: 100
            },{
                xtype: 'numberfield',
                name: 'rollo_schattPos',
                id: label + '_schattPos',
                fieldLabel: 'Verschattungspos.',
                value: 0,
                minValue: 0,
                maxValue: 100
            },{
                xtype: 'numberfield',
                name: 'rollo_nachtPos',
                id: label + '_nachtPos',
                fieldLabel: 'Nachtposition',
                value: 0,
                minValue: 0,
                maxValue: 100
            },{
                xtype: 'numberfield',
                name: 'rollo_nachtPos2',
                id: label + '_nachtPos2',
                fieldLabel: 'Nachtposition 2',
                value: 0,
                minValue: 0,
                maxValue: 100
            },{
                xtype: 'numberfield',
                name: 'rollo_nachtLueftPos',
                id: label + '_nachtLueftPos',
                fieldLabel: 'Lüftungsposition',
                value: 0,
                minValue: 0,
                maxValue: 100
            },{
                xtype: 'numberfield',
                name: 'rollo_nachtXmasPos',
                id: label + '_nachtXmasPos',
                fieldLabel: 'XMAS-Position',
                value: 0,
                minValue: 0,
                maxValue: 100
            }]
            },{
            xtype: 'fieldset',
            id: label + '_fieldset3',
            title: 'Zeiten',
            items: [{
                xtype: 'numberfield',
                name: 'rollo_handTimeout',
                id: label + '_handTimeout',
                fieldLabel: 'Timeout Handbetrieb',
                value: 0,
                minValue: 0,
                maxValue: 720
            },{
                xtype: 'numberfield',
                name: 'rollo_fahrZeit',
                id: label + '_fahrZeit',
                fieldLabel: 'Fahrzeit',
                value: 0,
                minValue: 0,
                maxValue: 60
            }]  
        }]
    })
};


/*
 *  Fenster für allgemeine Rollodaten
 */
App.rollo.createWindow2 = function(item){
    
    var label = item.myLabel;
    Ext.namespace('App.rollo.' + label +'.window');

    //Kommunikation
    var dataStruct = {
        rollo_winkelZuSensor: 'REAL',
        rollo_winkelZu: 'REAL',
        rollo_winkelAufSensor: 'REAL',
        rollo_winkelAuf: 'REAL',
        rollo_mindestHelligkeit: 'INT',
        rollo_wzOstOffenBisSchlafen: 'BOOL',
        rollo_wzSuedOffenBisSchlafen: 'BOOL',
        rollo_wzOstSuedZuAussenTemp: 'INT1DP',
        rollo_helligkeitVerschattungEin: 'INT',
        rollo_helligkeitVerschattungAus: 'INT',
        rollo_zeitVerschattungEin: 'TIME.#m',
        rollo_zeitVerschattungAus: 'TIME.#m',
        rollo_aussenTempVerschattung: 'INT1DP',
        rollo_aussenTempVerschattung24: 'INT1DP',
        reserve: 'INT',
        reserve: 'INT'
    };
    
    App.rollo[label].data = {};
    
    App.rollo[label].sendData = function() {
        App.rollo[label].data = App.rollo[label].window.getComponent(label + '_formpanel').getForm().getValues();
        App.comm.cx.writeStruct({
            //Parameter für Schreiben
            fld: 'M',
            addr: App.comm.plcAddr.rollo[label],
            debug: false,
            def: dataStruct,
            jvar: 'App.rollo.' + label + '.data',
        })
    };
    
    
    App.rollo[label].readData = function() {
        App.comm.cx.readStruct({
            //Parameter für Lesen
            fld: 'M',
            addr: App.comm.plcAddr.rollo[label],
            oc: function(){
                App.rollo[label].window.getComponent(label + '_formpanel').getForm().setValues(App.rollo[label].data);
            },
            debug: false,
            def: dataStruct,
            jvar: 'App.rollo.' + label + '.data',
        })
    };



    //Fenster
    if (! App.rollo[label].window.rendered || App.rollo[label].window.isDestroyed) { 
        App.rollo[label].window = Ext.create('Ext.window.Window', {
            title: 'Allgemeine Einstellungen für Rollos ',
            layout: 'fit',
            items: App.rollo.createFormPanel2(label),
            bbar: [
                '->',
                {
                    xtype: 'button',
                    text: 'Senden',
                    tooltip: 'Daten an SPS senden.',
                    handler: App.rollo[label].sendData
                },{ 
                    xtype: 'button',
                    text: 'Refresh',
                    tooltip: 'Daten aus SPS laden.',
                    handler: App.rollo[label].readData
                }]
        }).show();
    };
    
    //Tooltips
    var tooltips = {
        tip1: Ext.create('Ext.tip.ToolTip', {
            target: label + '_winkelZuSensor',
            html: 'Sonnenstandshöhe in Grad, ab dem der Helligkeitssensor für die Aktivierung des Nachtbetriebs ausgewertet wird.'
        }),
        tip2: Ext.create('Ext.tip.ToolTip', {
            target: label + '_winkelZu',
            html: 'Sonnenstandshöhe in Grad, ab dem unabhängig vom Sensor auf Nachtbetrieb geschaltet wird.'
        }),
        tip3: Ext.create('Ext.tip.ToolTip', {
            target: label + '_winkelAufSensor',
            html: 'Sonnenstandshöhe in Grad, ab dem der Helligkeitssensor für das Ausschalten des Nachtbetriebs ausgewertet wir.'
        }),
        tip4: Ext.create('Ext.tip.ToolTip', {
            target: label + '_winkelAuf',
            html: 'Sonnenstandshöhe in Grad, ab dem der Nachtbetrieb unabhängig vom Sensor deaktiviert wird.'
        }),
        tip5: Ext.create('Ext.tip.ToolTip', {
            target: label + '_mindestHelligkeit',
            html: 'Helligkeitsschwelle, unter der der Nachtbetrieb aktiviert wird.'
        }),
        tip6: Ext.create('Ext.tip.ToolTip', {
            target: label + '_wzOstOffenBisSchlafen',
            html: 'Wohnzimmer Rollos Ostseite bei Nachtbetrieb offen lassen bis alle schlafen.'
        }),
        tip7: Ext.create('Ext.tip.ToolTip', {
            target: label + '_wzSuedOffenBisSchlafen',
            html: 'Wohnzimmer Rollos Südseite bei Nachtbetrieb offen lassen bis alle schlafen.'
        }),
        tip8: Ext.create('Ext.tip.ToolTip', {
            target: label + '_wzOstSuedZuAussenTemp',
            html: 'Außentemperatur, unter der die Rollos Ost und Süd im WZ bei Nachtbetrieb auf jeden Fall geschlossen werden.'
        }),
        tip9: Ext.create('Ext.tip.ToolTip', {
            target: label + '_helligkeitVerschattungEin',
            html: 'Helligkeitsschwelle, über der Verschattung aktiviert wird.'
        }),
        tip10: Ext.create('Ext.tip.ToolTip', {
            target: label + '_helligkeitVerschattungAus',
            html: 'Helligkeitsschwelle, unter der Verschattung deaktiviert wird.'
        }),
        tip11: Ext.create('Ext.tip.ToolTip', {
            target: label + '_zeitVerschattungEin',
            html: 'Zeit in Minuten, für welche die Helligkeitsschwelle überschritten werden muss, damit Verschattung aktiviert wird.'
        }),
        tip12: Ext.create('Ext.tip.ToolTip', {
            target: label + '_zeitVerschattungAus',
            html: 'Zeit in Minuten, für welche die Helligkeitsschwelle unterschritten werden muss, damit Verschattung deaktiviert wird.'
        }),
        tip13: Ext.create('Ext.tip.ToolTip', {
            target: label + '_aussenTempVerschattung',
            html: 'Aktuelle Außentemperatur, welche für die Freigabe der Verschattung erreicht werden muss.'
        }),
        tip14: Ext.create('Ext.tip.ToolTip', {
            target: label + '_aussenTempVerschattung24',
            html: 'Minimale Außentemperatur der letzten 24 Stunden, welche für die Freigabe der Verschattung erreicht werden muss.'
        })
    };
    
    App.rollo[label].readData();
    
};


//Formular innerhalbe des Fensters
App.rollo.createFormPanel2 = function(label) {
    
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
            xtype: 'fieldset',
            id: label + '_fieldset',
            title: 'Nachtbetrieb',
            items: [{
                xtype: 'numberfield',
                name: 'rollo_winkelZuSensor',
                id: label + '_winkelZuSensor',
                fieldLabel: 'Sonnenwinkel Nacht m. Sensor',
                value: 0,
                minValue: -15,
                maxValue: 15
            },{
                xtype: 'numberfield',
                name: 'rollo_winkelZu',
                id: label + '_winkelZu',
                fieldLabel: 'Sonnenwinkel Nacht',
                value: 0,
                minValue: -15,
                maxValue: 15
            },{
                xtype: 'numberfield',
                name: 'rollo_winkelAufSensor',
                id: label + '_winkelAufSensor',
                fieldLabel: 'Sonnenwinkel Tag m. Sensor',
                value: 0,
                minValue: -15,
                maxValue: 15
            },{
                xtype: 'numberfield',
                name: 'rollo_winkelAuf',
                id: label + '_winkelAuf',
                fieldLabel: 'Sonnenwinkel Tag',
                value: 0,
                minValue: -15,
                maxValue: 15
            },{
                xtype: 'numberfield',
                name: 'rollo_mindestHelligkeit',
                id: label + '_mindestHelligkeit',
                fieldLabel: 'Mindesthelligkeit',
                value: 0,
                minValue: 0,
                maxValue: 32767
            },{
                xtype: 'checkboxfield',
                name: 'rollo_wzOstOffenBisSchlafen',
                id: label + '_wzOstOffenBisSchlafen',
                fieldLabel: 'Wohnz. Ost offen bis Schlafen',
                inputValue: '1'
            },{
                xtype: 'checkboxfield',
                name: 'rollo_wzSuedOffenBisSchlafen',
                id: label + '_wzSuedOffenBisSchlafen',
                fieldLabel: 'Wohnz. Süd offen bis Schlafen',
                inputValue: '1'
            },{
                xtype: 'numberfield',
                name: 'rollo_wzOstSuedZuAussenTemp',
                id: label + '_wzOstSuedZuAussenTemp',
                fieldLabel: 'Temperatur Wohnz. Ost/Süd schließen',
                value: 0,
                minValue: -20,
                maxValue: 20
            }]
         },{
            xtype: 'fieldset',
            id: label + '_fieldset4',
            title: 'Verschattung',
            items: [{
                xtype: 'numberfield',
                name: 'rollo_helligkeitVerschattungEin',
                id: label + '_helligkeitVerschattungEin',
                fieldLabel: 'Helligkeit Verschatt. Ein',
                value: 0,
                minValue: 0,
                maxValue: 32767
            },{
                xtype: 'numberfield',
                name: 'rollo_helligkeitVerschattungAus',
                id: label + '_helligkeitVerschattungAus',
                fieldLabel: 'Helligkeit Verschatt. Aus',
                value: 0,
                minValue: 0,
                maxValue: 32767
            },{
                xtype: 'numberfield',
                name: 'rollo_zeitVerschattungEin',
                id: label + '_zeitVerschattungEin',
                fieldLabel: 'Verzögerung Verschatt. Ein',
                value: 0,
                minValue: 0,
                maxValue: 120
            },{
                xtype: 'numberfield',
                name: 'rollo_zeitVerschattungAus',
                id: label + '_zeitVerschattungAus',
                fieldLabel: 'Verzögerung Verschatt. Aus',
                value: 0,
                minValue: 0,
                maxValue: 120
            },{
                xtype: 'numberfield',
                name: 'rollo_aussenTempVerschattung',
                id: label + '_aussenTempVerschattung',
                fieldLabel: 'Aussentemperatur',
                value: 0,
                minValue: 0,
                maxValue: 30
            },{
                xtype: 'numberfield',
                name: 'rollo_aussenTempVerschattung24',
                id: label + '_aussenTempVerschattung24',
                fieldLabel: 'Min. Aussentemp. 24 Std. ',
                value: 0,
                minValue: 0,
                maxValue: 30
            }]
         }]
    })
};

 
 
 