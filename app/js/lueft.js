/**
 * @author T. Schmidt
 * 20.06.2011
 */

//Fenster erzeugen
App.lueft.createWindow = function(item){
    
    var label = item.myLabel;
    Ext.namespace('App.lueft.' + label +'.window');

    //Kommunikation
    var dataStruct = {
        lueft_name: 'STRING.29',
        lueft_wartezeit: 'TIME.#m',
        lueft_nachlaufzeit: 'TIME.#m',
        lueft_timeout: 'TIME.#m',
        lueft_maxlaufzeit: 'TIME.#m'
    };
    
    App.lueft[label].data = {};
    
    App.lueft[label].sendData = function() {
        App.lueft[label].data = App.lueft[label].window.getComponent(label + '_formpanel').getForm().getValues();
        App.comm.cx.writeStruct({
            //Parameter für Schreiben
            fld: 'M',
            addr: App.comm.plcAddr.lueft[label],
            debug: false,
            def: dataStruct,
            jvar: 'App.lueft.' + label + '.data',
        })
    };
    
    
    App.lueft[label].readData = function() {
        App.comm.cx.readStruct({
            //Parameter für Lesen
            fld: 'M',
            addr: App.comm.plcAddr.lueft[label],
            oc: function(){
                App.lueft[label].window.getComponent(label + '_formpanel').getForm().setValues(App.lueft[label].data);
            },
            debug: false,
            def: dataStruct,
            jvar: 'App.lueft.' + label + '.data',
        })
    };



    //Fenster
    if (! App.lueft[label].window.rendered || App.lueft[label].window.isDestroyed) { 
        App.lueft[label].window = Ext.create('Ext.window.Window', {
            title: 'Lüftung ' + item.text,
            layout: 'fit',
            items: App.lueft.createFormPanel(label),
            bbar: [
                '->',
                {
                    xtype: 'button',
                    text: 'Senden',
                    tooltip: 'Daten an SPS senden.',
                    handler: App.lueft[label].sendData
                },{ 
                    xtype: 'button',
                    text: 'Refresh',
                    tooltip: 'Daten aus SPS laden.',
                    handler: App.lueft[label].readData
                }]
        }).show();
    };
    
    //Tooltips
    var tooltips = {
        tip1: Ext.create('Ext.tip.ToolTip', {
            target: label + '_name',
            html: 'Bezeichnung des Lüfters für Visualisierung.'
        }),
        tip2: Ext.create('Ext.tip.ToolTip', {
            target: label + '_wartezeit',
            html: 'Wartezeit in Minuten zwischen Startsignal und dem Einschalten des Lüfters.'
        }),
        tip3: Ext.create('Ext.tip.ToolTip', {
            target: label + '_nachlaufzeit',
            html: 'Nachlaufzeit in Minuten nach dem Ausschalten des Lüfters. Muss auf jeden Fall kleiner als die maximale Laufzeit sein.'
        }),
        tip4: Ext.create('Ext.tip.ToolTip', {
            target: label + '_timeout',
            html: 'Wartezeit in Minuten, nach der nach manuellem Eingriff (Ein- oder Ausschalten) wieder auf Automatik geschaltet wird. Muss kleiner als die maximale Laufzeit sein.'
        }),
        tip5: Ext.create('Ext.tip.ToolTip', {
            target: label + '_maxlaufzeit',
            html: 'Maximale Laufzeit des Lüfters in Minuten. Danach wird der Lüfter abgeschaltet und eine Fehlermeldung in der Visualisierung ausgegeben.'
        })
    };
    
    App.lueft[label].readData();
    
};


//Formular innerhalbe des Fensters
App.lueft.createFormPanel = function(label) {
    
    var beschreibung = {
        BA: 'Der Lüfter wird bei Überschreiten der für das Bad eingestellten \
             maximalen Luftfeuchtigkeit eingeschaltet. Nach unterschreiten der minimalen Luftfeuchte \
             wird der Lüfter wieder ausgeschaltet.',
        WC: 'Der Lüfter wird bei Anwesenheit einer Person eingeschaltet.'
    };
    
    
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
            name: 'lueft_beschreibung',
            value: beschreibung[label],
            margin: '5 5 10 5'
            },{
            xtype: 'fieldset',
            id: label + '_fieldset1',
            title: 'Allgemein',
            items: [{
                xtype: 'textfield',
                name: 'lueft_name',
                id: label + '_name',
                fieldLabel: 'Bezeichnung',
                maxLength: 29,
                maxLengthText: 'Maximale Länge: 29 Zeichen.'
            }]
            },{
            xtype: 'fieldset',
            id: label + '_fieldset2',
            title: 'Zeiten',
            items: [{
                xtype: 'numberfield',
                name: 'lueft_wartezeit',
                id: label + '_wartezeit',
                fieldLabel: 'Wartezeit Einschalten',
                value: 0,
                minValue: 0,
                maxValue: 60
            },{
                xtype: 'numberfield',
                name: 'lueft_nachlaufzeit',
                id: label + '_nachlaufzeit',
                fieldLabel: 'Nachlaufzeit',
                value: 0,
                minValue: 0,
                maxValue: 60
            },{
                xtype: 'numberfield',
                name: 'lueft_timeout',
                id: label + '_timeout',
                fieldLabel: 'Timeout Handbetrieb',
                value: 0,
                minValue: 0,
                maxValue: 60
            },{
                xtype: 'numberfield',
                name: 'lueft_maxlaufzeit',
                id: label + '_maxlaufzeit',
                fieldLabel: 'Maximale Laufzeit',
                value: 0,
                minValue: 1,
                maxValue: 180
            }]  
        }]
    })
};

