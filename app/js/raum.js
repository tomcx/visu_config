/**
 * @author T. Schmidt
 * 20.06.2011
 */

//Fenster erzeugen
App.raum.createWindow = function(item){

    var label = item.myLabel;
    Ext.namespace('App.raum.' + label +'.window');
        
    //Kommunikation
    var dataStruct = {
        raum_name: 'STRING.39',
        raum_sollTemp: 'INT1DP',
        raum_maxEinstellTemp: 'INT1DP',
        raum_minEinstellTemp : 'INT1DP',
        raum_absenkTemp: 'INT1DP',
        raum_verschattTemp: 'INT1DP',
        raum_maxLuftfeuchte: 'INT1DP',
        raum_minLuftfeuchte: 'INT1DP',
        raum_resAnwTuerGeschl: 'TIME.#m',
        raum_resAnwTuerOffen: 'TIME.#m',
        raum_resAnwKeinBewohner: 'TIME.#m',
        raum_lichtAusSchlafen: 'TIME.#m',
        raum_lichtStandby: 'TIME.#m'
    };
    
    App.raum[label].data = {};
    
    App.raum[label].sendData = function() {
        App.raum[label].data = App.raum[label].window.getComponent(label + '_formpanel').getForm().getValues(); 
        App.comm.cx.writeStruct({
            //Parameter für Schreiben
            fld: 'M',
            addr: App.comm.plcAddr.raum[label],
            debug: false,
            def: dataStruct,
            jvar: 'App.raum.' + label + '.data',
        })
    };
    
    
    App.raum[label].readData = function() {
        App.comm.cx.readStruct({
            //Parameter für Lesen
            fld: 'M',
            addr: App.comm.plcAddr.raum[label],
            oc: function(){
                App.raum[label].window.getComponent(label + '_formpanel').getForm().setValues(App.raum[label].data);
            },
            debug: false,
            def: dataStruct,
            jvar: 'App.raum.' + label + '.data',
        })
    };
    
    //Fenster
    if (!App.raum[label].window.rendered || App.raum[label].window.isDestroyed) {
        App.raum[label].window = Ext.create('Ext.window.Window', {
            title: 'Einstellungen ' + item.text,
            id: 'window_' + label,
            layout: 'fit',
            items: App.raum.createFormPanel(label),
            bbar: ['->', {
                xtype: 'button',
                text: 'Senden',
                tooltip: 'Daten an SPS senden.',
                handler: App.raum[label].sendData
            }, {
                xtype: 'button',
                text: 'Refresh',
                tooltip: 'Daten aus SPS laden.',
                handler: App.raum[label].readData
            }]
        }).show();
    };
    
    //Tooltips
    var tooltips = {
        tip1: Ext.create('Ext.tip.ToolTip', {
             target: label + '_name',
             html: 'Name des Raumes für Visualisierung.'
        }),
        tip2: Ext.create('Ext.tip.ToolTip', {
            target: label + '_sollTemp',
            html: 'Solltemperatur des Raumes für die FBH-Regelung im Normalbetrieb(über Visualisierung)'
        }),
        tip3: Ext.create('Ext.tip.ToolTip', {
            target: label + '_maxEinstellTemp',
            html: 'Maximale Raumtemperatur, die über die Visualisierung einstellbar ist.'
        }),
        tip4: Ext.create('Ext.tip.ToolTip', {
            target: label + '_minEinstellTemp',
            html: 'Minimale Raumtemperatur, die über die Visualisierung einstellbar ist.'
        }),
        tip5: Ext.create('Ext.tip.ToolTip', {
            target: label + '_absenkTemp',
            html: 'Solltemperatur des Raumes für die FBH-Regelung im Absenkbetrieb.'
        }),
        tip6: Ext.create('Ext.tip.ToolTip', {
            target: label + '_verschattTemp',
            html: 'Temperatur, ab der die Freigabe für die Verschattung erfolgt. Nur bei Wohn-, Schlaf- und Kinderzimmer verwendet.'
        }),
        tip7: Ext.create('Ext.tip.ToolTip', {
            target: label + '_maxLuftfeuchte',
            html: 'Maximale Luftfeuchte.'
        }),
        tip8: Ext.create('Ext.tip.ToolTip', {
            target: label + '_minLuftfeuchte',
            html: 'Minimale Luftfeuchte.'
        }),
        tip9: Ext.create('Ext.tip.ToolTip', {
            target: label + '_resAnwTuerGeschl',
            html: 'Bei geplanter Anwesenheit eines Bewohners: Wird bei geschlossener Zimmertür eine Person durch die Bewegungsmelder erkannt, bleibt die Anwesenheit bis zum nächsten Öffnen gesetzt. Wird nach Schließen der Zimmertür keine Bewegung erkannt, wird nach Ablauf der hier eingestellten Zeit (in Minuten) die Anwesenheit zurück gesetzt.'
        }),
        tip10: Ext.create('Ext.tip.ToolTip', {
            target: label + '_resAnwTuerOffen',
            html: 'Bei geplanter Anwesenheit eines Bewohners: Zeit in Minuten, nach der die Anwesenheit zurück gesetzt wird, wenn keine Person im Raum erkannt wurde und die Zimmertür offen ist.'
        }),
        tip11: Ext.create('Ext.tip.ToolTip', {
            target: label + '_resAnwKeinBewohner',
            html: 'Wenn kein Bewohner als anwesend geplant ist: Zeit in Minuten, nach der die Anwesenheit zurück gesetzt wird wenn keine Person im Raum erkannt wurde.'
        }),
        tip12: Ext.create('Ext.tip.ToolTip', {
            target: label + '_lichtAusSchlafen',
            html: 'Wenn ein Bewohner schläft: Zeit in Minuten, nach der das Licht ausgeschaltet wird, wenn keine Bewegung mehr erkannt wurde.'
        }),
        tip13: Ext.create('Ext.tip.ToolTip', {
            target: label + '_lichtStandby',
            html: 'Zeit in Minuten, für die das Licht auf einen minimale Wert gedimmt wird, wenn keine Person mehr anwesend ist. Danach wird Licht ausgeschaltet.'
        })
    };
    
    //Presets deaktivieren
    var form = App.raum[label].window.getComponent(label + '_formpanel').getForm();
    switch (label) {
        case 'WZ':
            form.findField(label + '_resAnwTuerGeschl').setDisabled(true);
            form.findField(label + '_resAnwTuerOffen').setDisabled(true);
            tooltips.tip12 = Ext.create('Ext.tip.ToolTip', {
                target: label + '_lichtAusSchlafen',
                html: 'Wenn alle Bewohner schlafen: Zeit in Minuten, nach der die Anwesenheit zurückgesetzt wird, wenn eine Bewegung im Flur und keine Bewegung im Wohnzimmer mehr erkannt wurde.'
            });
            break;
        case 'FL':
            form.findField(label + '_lichtAusSchlafen').setDisabled(true);
            break;
        case 'BA':
            form.findField(label + '_lichtAusSchlafen').setDisabled(true);
            break;
        case 'WC':
            form.findField(label + '_lichtAusSchlafen').setDisabled(true);
            break;
    };
    
    App.raum[label].readData();
    
};


//Formular innerhalbe des Fensters
App.raum.createFormPanel = function(label) {

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
                name: 'raum_name',
                id: label + '_name',
                fieldLabel: 'Raumname',
                maxLength: 39,
                maxLengthText: 'Maximale Länge: 39 Zeichen.'
            }]
            },{
            xtype: 'fieldset',
            id: label + '_fieldset2',
            title: 'Temperaturen',
            items: [{
                xtype: 'numberfield',
                name: 'raum_sollTemp',
                id: label + '_sollTemp',
                fieldLabel: 'Solltemperatur',
                value: 0,
                minValue: 10,
                maxValue: 25
            },{
                xtype: 'numberfield',
                name: 'raum_maxEinstellTemp',
                id: label + '_maxEinstellTemp',
                fieldLabel: 'Solltemperatur Max.',
                value: 0,
                minValue: 10,
                maxValue: 25
            },{
                xtype: 'numberfield',
                name: 'raum_minEinstellTemp',
                id: label + '_minEinstellTemp',
                fieldLabel: 'Solltemperatur Min.',
                value: 0,
                minValue: 10,
                maxValue: 25
            },{
                xtype: 'numberfield',
                name: 'raum_absenkTemp',
                id: label + '_absenkTemp',
                fieldLabel: 'Absenktemperatur',
                value: 0,
                minValue: 10,
                maxValue: 25
            },{
                xtype: 'numberfield',
                name: 'raum_verschattTemp',
                id: label + '_verschattTemp',
                fieldLabel: 'Verschattungstemperatur',
                value: 0,
                minValue: 15,
                maxValue: 30
            }]
            },{
            xtype: 'fieldset',
            id: label + '_fieldset3',
            title: 'Luftfeuchte',
            items: [{
                xtype: 'numberfield',
                name: 'raum_maxLuftfeuchte',
                id: label + '_maxLuftfeuchte',
                fieldLabel: 'Luftfeuchte Max.',
                value: 0,
                minValue: 0,
                maxValue: 100
            },{
                xtype: 'numberfield',
                name: 'raum_minLuftfeuchte',
                id: label + '_minLuftfeuchte',
                fieldLabel: 'Luftfeuchte Min.',
                value: 0,
                minValue: 0,
                maxValue: 100
            }]  
        },{
            xtype: 'fieldset',
            id: label + '_fieldset4',
            title: 'Zeiten',
            items: [{
                xtype: 'numberfield',
                name: 'raum_resAnwTuerGeschl',
                id: label + '_resAnwTuerGeschl',
                fieldLabel: 'Reset Anw. Tür Geschl.',
                value: 0,
                minValue: 0,
                maxValue: 600
            },{
                xtype: 'numberfield',
                name: 'raum_resAnwTuerOffen',
                id: label + '_resAnwTuerOffen',
                fieldLabel: 'Reset Anw. Tür Offen',
                value: 0,
                minValue: 0,
                maxValue: 600
            },{
                xtype: 'numberfield',
                name: 'raum_resAnwKeinBewohner',
                id: label + '_resAnwKeinBewohner',
                fieldLabel: 'Reset Anw. kein Bewohn. gepl.',
                value: 0,
                minValue: 0,
                maxValue: 600
            },{
                xtype: 'numberfield',
                name: 'raum_lichtAusSchlafen',
                id: label + '_lichtAusSchlafen',
                fieldLabel: 'Licht Aus Schlafen',
                value: 0,
                minValue: 0,
                maxValue: 600
            },{
                xtype: 'numberfield',
                name: 'raum_lichtStandby',
                id: label + '_lichtStandby',
                fieldLabel: 'Licht Standby',
                value: 0,
                minValue: 0,
                maxValue: 600
            }]  
        }]
    })
};



