/**
 * @author T. Schmidt
 * 20.06.2011
 */

//Fenster erzeugen
App.xmas.createWindow = function(item){
    
    var label = item.myLabel;
    Ext.namespace('App.xmas.' + label +'.window');

    //Kommunikation
    var dataStruct = {
        xmas_einschaltzeit: 'TOD',
        xmas_ausschaltzeit: 'TOD',
        xmas_abwesendAus: 'BOOL',
        xmas_schlafenAus: 'BOOL'
    };
    
    App.xmas[label].data = {};
    
    App.xmas[label].sendData = function() {
        App.xmas[label].data = App.xmas[label].window.getComponent(label + '_formpanel').getForm().getFieldValues();
        App.comm.cx.writeStruct({
            //Parameter für Schreiben
            fld: 'M',
            addr: App.comm.plcAddr.xmas,
            debug: false,
            def: dataStruct,
            jvar: 'App.xmas.' + label + '.data',
        })
    };
    
    
    App.xmas[label].readData = function() {
        App.comm.cx.readStruct({
            //Parameter für Lesen
            fld: 'M',
            addr: App.comm.plcAddr.xmas,
            oc: function(){
                App.xmas[label].window.getComponent(label + '_formpanel').getForm().setValues(App.xmas[label].data);
            },
            debug: false,
            def: dataStruct,
            jvar: 'App.xmas.' + label + '.data',
        })
    };



    //Fenster
    if (! App.xmas[label].window.rendered || App.xmas[label].window.isDestroyed) { 
        App.xmas[label].window = Ext.create('Ext.window.Window', {
            title: 'Einstellungen Weihnachtsschaltung',
            layout: 'fit',
            items: App.xmas.createFormPanel(label),
            bbar: [
                '->',
                {
                    xtype: 'button',
                    text: 'Senden',
                    tooltip: 'Daten an SPS senden.',
                    handler: App.xmas[label].sendData
                },{ 
                    xtype: 'button',
                    text: 'Refresh',
                    tooltip: 'Daten aus SPS laden.',
                    handler: App.xmas[label].readData
                }]
        }).show();
    };
    
    //Tooltips
    var tooltips = {
        tip1: Ext.create('Ext.tip.ToolTip', {
            target: label + '_einschaltzeit',
            html: 'Zeit für Einschalten der Fenstersteckdosen.'
        }),
        tip2: Ext.create('Ext.tip.ToolTip', {
            target: label + '_ausschaltzeit',
            html: 'Zeit für Ausschalten der Fenstersteckdosen.'
        }),
        tip3: Ext.create('Ext.tip.ToolTip', {
            target: label + '_abwesendAus',
            html: 'Fenstersteckdosen auf jeden Fall ausschalten,  wenn keine Bewohner anwesend sind.'
        }),
        tip4: Ext.create('Ext.tip.ToolTip', {
            target: label + '_schlafenAus',
            html: 'Fenstersteckdosen auf jeden Fall ausschalten,  wenn alle Bewohner schlafen.'
        })
        
    };
    
    App.xmas[label].readData();
    
};


//Formular innerhalbe des Fensters
App.xmas.createFormPanel = function(label) {
    
    
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
            title: 'Zeiten',
            items: [{
                xtype: 'timefield',
                name: 'xmas_einschaltzeit',
                id: label + '_einschaltzeit',
                fieldLabel: 'Einschaltzeit',
                anchor: '100%',
                format: 'H:i'
            },{
                xtype: 'timefield',
                name: 'xmas_ausschaltzeit',
                id: label + '_ausschaltzeit',
                fieldLabel: 'Ausschaltzeit',
                anchor: '100%',
                format: 'H:i'
            },{
                xtype: 'checkboxfield',
                name: 'xmas_abwesendAus',
                id: label + '_abwesendAus',
                fieldLabel: 'Aus bei Abwesenheit',
                inputValue: '1'
            },{
                xtype: 'checkboxfield',
                name: 'xmas_schlafenAus',
                id: label + '_schlafenAus',
                fieldLabel: 'Aus wenn alle schlafen',
                inputValue: '1'
            }]  
        }]
    })
};

