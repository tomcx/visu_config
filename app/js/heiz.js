/**
 * @author T. Schmidt
 * 29.06.2011
 */

/*
 * Fenster f. Stellantriebssdaten erzeugen
 */
App.heiz.createWindow = function(item){
    
    var label = item.myLabel;
    Ext.namespace('App.heiz.' + label +'.window');

    //Kommunikation
    var dataStruct = {
        heiz_nameHK: 'STRING.29',
        heiz_antriebTyp: 'STRING.2',
        heiz_antriebLaufzeit: 'TIME.#s',
        heiz_antriebPwmZyklus: 'TIME.#m',
        heiz_antriebAutoBetaet: 'TIME.#d'
    };
    
    App.heiz[label].data = {};
    
    App.heiz[label].sendData = function() {
        App.heiz[label].data = App.heiz[label].window.getComponent(label + '_formpanel').getForm().getValues(); 
        App.comm.cx.writeStruct({
            //Parameter für Schreiben
            fld: 'M',
            addr: App.comm.plcAddr.heiz[label],
            debug: false,
            def: dataStruct,
            jvar: 'App.heiz.' + label + '.data'
        });
    };
    
    
    App.heiz[label].readData = function() {
        App.comm.cx.readStruct({
            //Parameter für Lesen
            fld: 'M',
            addr: App.comm.plcAddr.heiz[label],
            oc: function(){
                App.heiz[label].window.getComponent(label + '_formpanel').getForm().setValues(App.heiz[label].data);
            },
            debug: false,
            def: dataStruct,
            jvar: 'App.heiz.' + label + '.data'
        });
    };
    
    //Fenster
    if (!App.heiz[label].window.rendered || App.heiz[label].window.isDestroyed) {
        App.heiz[label].window = Ext.create('Ext.window.Window', {
            title: 'Einstellungen für ' + item.text,
            id: 'window_' + label,
            layout: 'fit',
            items: App.heiz.createFormPanel(label),
            bbar: ['->', {
                xtype: 'button',
                text: 'Senden',
                tooltip: 'Daten an SPS senden.',
                handler: App.heiz[label].sendData
            }, {
                xtype: 'button',
                text: 'Refresh',
                tooltip: 'Daten aus SPS laden.',
                handler: App.heiz[label].readData
            }]
        }).show();
    }
    
    //Tooltips
    var tooltips = {
        tip1: Ext.create('Ext.tip.ToolTip', {
             target: label + '_nameHK',
             html: 'Name des Heizkreises für Visualisierung.'
        }),
        tip2: Ext.create('Ext.tip.ToolTip', {
            target: label + '_antriebTyp',
            html: 'Typ des Antriebes: NV - nicht vorhanden, NC - in Ruhestellung geschlossen, NO - in Ruhestellung geöffnet.'
        }),
        tip3: Ext.create('Ext.tip.ToolTip', {
            target: label + '_antriebLaufzeit',
            html: 'Laufzeit des Antriebs in Sekunden von Stellung "Geschlossen" bis "Geöffnet".'
        }),
        tip4: Ext.create('Ext.tip.ToolTip', {
            target: label + '_antriebPwmZyklus',
            html: 'Zykluszeit in Minuten für Pulsweitenmodulation. Ist für die Zykluszeit z.B. \
            ein Wert von 30 Minuten angegeben und soll das Ventil zu 30% geöffnet \
            sein, wird der Antrieb 10 Minuten angesteuert, danach erfolgt ein Pause von \
            20 Minuten. Dann wieder 10 Minuten ansteuern u.s.w..'
        }),
        tip5: Ext.create('Ext.tip.ToolTip', {
            target: label + '_antriebAutoBetaet',
            html: 'Zeit in Tagen, nach der das Ventil automatisch einmal \
            geöffnet und wieder geschlossen wird, um ein Festgehen zu verhindern.'
        })
    };
    
    App.heiz[label].readData();
    
};
   

//Formular innerhalbe des Fensters
App.heiz.createFormPanel = function(label) {

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
                name: 'heiz_nameHK',
                id: label + '_nameHK',
                fieldLabel: 'Bezeichnung',
                maxLength: 29,
                maxLengthText: 'Maximale Länge: 29 Zeichen.'
            },{
                xtype: 'textfield',
                name: 'heiz_antriebTyp',
                id: label + '_antriebTyp',
                fieldLabel: 'Typ',
                maxLength: 2,
                maxLengthText: 'Maximale Länge: 2 Zeichen.'
            }]
            },{
            xtype: 'fieldset',
            id: label + '_fieldset2',
            title: 'Zeiten',
            items: [{
                xtype: 'numberfield',
                name: 'heiz_antriebLaufzeit',
                id: label + '_antriebLaufzeit',
                fieldLabel: 'Laufzeit',
                value: 0,
                minValue: 0,
                maxValue: 600
            },{
                xtype: 'numberfield',
                name: 'heiz_antriebPwmZyklus',
                id: label + '_antriebPwmZyklus',
                fieldLabel: 'PWM Zykluszeit',
                value: 0,
                minValue: 0,
                maxValue: 60
            },{
                xtype: 'numberfield',
                name: 'heiz_antriebAutoBetaet',
                id: label + '_antriebAutoBetaet',
                fieldLabel: 'Pausenzeit Autobetät.',
                value: 0,
                minValue: 0,
                maxValue: 365
            }]  
        }]
    });
};


/*
 *  Fenster für Heizungsdaten
 */
App.heiz.createWindow2 = function(item){
    
    var label = item.myLabel;
    Ext.namespace('App.heiz.' + label +'.window');

    //Kommunikation
    var dataStruct = {
        heiz_frostSchutzTemp: 'INT1DP',
        heiz_ausMinTemp: 'INT1DP',
        heiz_aussenTemp30: 'INT1DP',
        heiz_aussenTemp40: 'INT1DP',
        heiz_aussenTempAbsenkSchlaf: 'INT1DP',
        heiz_aussenTempAbsenkAbw: 'INT1DP',
        heiz_aussenTempMaxAusOffs:  'INT1DP',
        heiz_mischerLaufZeit: 'TIME.#s',
        heiz_ausschaltOffset: 'TIME.#m',
        heiz_badHeizkoerpMaxZeitEin: 'TIME.#h'
    };
    
    App.heiz[label].data = {};
    
    App.heiz[label].sendData = function() {
        App.heiz[label].data = App.heiz[label].window.getComponent(label + '_formpanel').getForm().getValues();
        App.comm.cx.writeStruct({
            //Parameter für Schreiben
            fld: 'M',
            addr: App.comm.plcAddr.heiz[label],
            debug: false,
            def: dataStruct,
            jvar: 'App.heiz.' + label + '.data'
        });
    };
    
    
    App.heiz[label].readData = function() {
        App.comm.cx.readStruct({
            //Parameter für Lesen
            fld: 'M',
            addr: App.comm.plcAddr.heiz[label],
            oc: function(){
                App.heiz[label].window.getComponent(label + '_formpanel').getForm().setValues(App.heiz[label].data);
            },
            debug: false,
            def: dataStruct,
            jvar: 'App.heiz.' + label + '.data'
        });
    };



    //Fenster
    if (! App.heiz[label].window.rendered || App.heiz[label].window.isDestroyed) { 
        App.heiz[label].window = Ext.create('Ext.window.Window', {
            title: 'Allgemeine Einstellungen Fußbodenheizung',
            layout: 'fit',
            items: App.heiz.createFormPanel2(label),
            bbar: [
                '->',
                {
                    xtype: 'button',
                    text: 'Senden',
                    tooltip: 'Daten an SPS senden.',
                    handler: App.heiz[label].sendData
                },{ 
                    xtype: 'button',
                    text: 'Refresh',
                    tooltip: 'Daten aus SPS laden.',
                    handler: App.heiz[label].readData
                }]
        }).show();
    }
    
    //Tooltips
    var tooltips = {
        tip1: Ext.create('Ext.tip.ToolTip', {
            target: label + '_frostSchutzTemp',
            html: 'Temperatur für Frostschutz. Diese Wert ist gültig, wenn der Auskühlschutz \
            deaktiviert ist. Sobald in einem Raum die Temperatur unter diesen Wert \
            fällt, wird die FBH-Pumpe eingeschaltet und die Vorlauftemperatur auf den Maximalwert \
            geregelt. Die Abschaltung erfolgt, wenn die Temperatur in jedem Raum 2 Grad über dem \
            eingestellten Wert liegt. Diese Funktion ist auch bei ausgeschalteter FBH aktiv.'
        }),
        tip2: Ext.create('Ext.tip.ToolTip', {
            target: label + '_ausMinTemp',
            html: 'Temperatur für Auskühlschutz.  \
            Sobald in einem Raum die Temperatur unter diesen Wert \
            fällt, wird die FBH-Pumpe eingeschaltet und die Vorlauftemperatur auf den Maximalwert \
            geregelt. Die Abschaltung erfolgt, wenn die Temperatur in jedem Raum 2 Grad über dem \
            eingestellten Wert liegt. Diese Funktion ist auch bei ausgeschalteter FBH aktiv.'
        }),
        tip3: Ext.create('Ext.tip.ToolTip', {
            target: label + '_aussenTemp30',
            html: 'Außentemperatur, über der die maximale Vorlauftemperatur 30°C betragen soll.'
        }),
        tip4: Ext.create('Ext.tip.ToolTip', {
            target: label + '_aussenTemp40',
            html: 'Außentemperatur,  unter der die maximale Vorlauftemperatur 40°C betragen soll.'
        }),
        tip5: Ext.create('Ext.tip.ToolTip', {
            target: label + '_mischerLaufZeit',
            html: 'Laufzeit den Vorlaufmischers in Sekunden.'
        }),
        tip6: Ext.create('Ext.tip.ToolTip', {
            target: label + '_aussenTempMaxAusOffs',
            html: 'Außentemperatur, für die der max. Ausschaltoffset gilt.'
        }),
        tip7: Ext.create('Ext.tip.ToolTip', {
            target: label + '_ausschaltOffset',
            html: 'Zeit in Minuten, welche die Heizung vor der geplanten Abwesenheit aller Personen ausgeschaltet werden soll. \
            Der Wert ist der Maximalwert, welcher bei der für den max. Offset angegebenen \
            Außentemperatur gilt. Bei niedrigeren Temperaturen wird die Zeit proportional verkürzt, bei \
            der für das Deaktivierung der Absenkung eingestellten Außentemperatur liegt der Offset bei 0. Intern wird immer eine \
            Trägheit von 30 Minuten hinzugerechnet.'
        }),
        tip8: Ext.create('Ext.tip.ToolTip', {
            target: label + '_badHeizkoerpMaxZeitEin',
            html: 'Maximale Einschaltdauer der elektrischen Patrone des Badheizkörpers in Stunden. Bei Überschreitung wird \
            die Patrone ausgeschaltet.'
        }),
        tip9: Ext.create('Ext.tip.ToolTip', {
            target: label + '_aussenTempAbsenkAbw',
            html: 'Außentemperatur, unter der bei Abwesenheit der Bewohner keine Absenkung erfolgt.'
        }),
        tip10: Ext.create('Ext.tip.ToolTip', {
            target: label + '_aussenTempAbsenkSchlaf',
            html: 'Außentemperatur, unter der während des Schlafens der Bewohner keine Absenkung erfolgt.'
        })
    };
    
    App.heiz[label].readData();
    
};


//Formular innerhalbe des Fensters
App.heiz.createFormPanel2 = function(label) {
    
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
            //id: label + '_fieldset',
            title: 'Temperaturen',
            items: [{
                xtype: 'numberfield',
                name: 'heiz_frostSchutzTemp',
                id: label + '_frostSchutzTemp',
                fieldLabel: 'Frostschutztemperatur Wohnung',
                value: 0,
                minValue: 1,
                maxValue: 5
            },{
                xtype: 'numberfield',
                name: 'heiz_ausMinTemp',
                id: label + '_ausMinTemp',
                fieldLabel: 'Minimaltemperatur Wohnung',
                value: 0,
                minValue: 10,
                maxValue: 20
            },{
                xtype: 'numberfield',
                name: 'heiz_aussenTemp30',
                id: label + '_aussenTemp30',
                fieldLabel: 'Außentemp. max. Vorlauf 30°C',
                value: 0,
                minValue: -30,
                maxValue: 30
            },{
                xtype: 'numberfield',
                name: 'heiz_aussenTemp40',
                id: label + '_aussenTemp40',
                fieldLabel: 'Außentemp. max. Vorlauf 40°C',
                value: 0,
                minValue: -30,
                maxValue: 30
            },{
                xtype: 'numberfield',
                name: 'heiz_aussenTempMaxAusOffs',
                id: label + '_aussenTempMaxAusOffs',
                fieldLabel: 'Außentemp. f. max. Ausschaltoffset',
                value: 0,
                minValue: -30,
                maxValue: 30
            },{
                xtype: 'numberfield',
                name: 'heiz_aussenTempAbsenkSchlaf',
                id: label + '_aussenTempAbsenkSchlaf',
                fieldLabel: 'Außentemp. Absenk. Schlaf',
                value: 0,
                minValue: -30,
                maxValue: 30
            },{
                xtype: 'numberfield',
                name: 'heiz_aussenTempAbsenkAbw',
                id: label + '_aussenTempAbsenkAbw',
                fieldLabel: 'Außentemp. Absenk. Abw.',
                value: 0,
                minValue: -30,
                maxValue: 30
            },{
                xtype: 'displayfield',
                name: 'heiz_text',
                value: 'Hinweis: Für die Berechnung der Heizungsparamter wird anstelle der aktuellen Außentemperatur der Minimalwert der letzten 24 Stunden verwendet.'
                //margin: '5 5 10 5'
            }]  
        },{
            xtype: 'fieldset',
            //id: label + '_fieldset2',
            title: 'Zeiten',
            items: [{
                xtype: 'numberfield',
                name: 'heiz_mischerLaufZeit',
                id: label + '_mischerLaufZeit',
                fieldLabel: 'Mischer Laufzeit',
                value: 0,
                minValue: 0,
                maxValue: 600
            },{
                xtype: 'numberfield',
                name: 'heiz_ausschaltOffset',
                id: label + '_ausschaltOffset',
                fieldLabel: 'Max. Ausschaltoffset',
                value: 0,
                minValue: 0,
                maxValue: 180
            },{
                xtype: 'numberfield',
                name: 'heiz_badHeizkoerpMaxZeitEin',
                id: label + '_badHeizkoerpMaxZeitEin',
                fieldLabel: 'Badheizk. max. Einschaltdauer',
                value: 0,
                minValue: 0,
                maxValue: 12
            }]
         }]
    });
};

 
 
 