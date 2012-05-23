/**
 * @author T. Schmidt
 * 20.06.2011
 */

//Fenster erzeugen
App.backup.createWindow = function(item){
    
    var label = item.myLabel;
    Ext.namespace('App.backup.' + label +'.window');

    //Kommunikation
    var dataStruct = {
        backup_bewohnerKonfig: 'BOOL',
        backup_bewohnerKompl: 'BOOL',
        backup_tagesPresets: 'BOOL',
        backup_wochenPresets: 'BOOL',
        backup_heizung: 'BOOL',
        backup_lampen: 'BOOL',
        backup_luefter: 'BOOL',
        backup_raeume: 'BOOL',
        backup_rollos: 'BOOL',
        backup_xmas: 'BOOL'
    };
    
    App.backup[label].data = {};
    
    App.backup[label].sendData = function() {
        App.backup[label].data = App.backup[label].window.getComponent(label + '_formpanel').getForm().getFieldValues();
        App.comm.cx.writeStruct({
            //Parameter für Schreiben
            fld: 'M',
            addr: App.comm.plcAddr.backup[label],
            debug: false,
            def: dataStruct,
            jvar: 'App.backup.' + label + '.data',
            ocd: 1000,
            oc: function(){
                App.backup[label].readData();
            }
        })
    };
    
    App.backup[label].readData = function() {
        App.comm.cx.readStruct({
            //Parameter für Lesen
            fld: 'M',
            addr: App.comm.plcAddr.backup[label],
            oc: function(){
                App.backup[label].window.getComponent(label + '_formpanel').getForm().setValues(App.backup[label].data);
            },
            debug: false,
            def: dataStruct,
            jvar: 'App.backup.' + label + '.data',
        })
    };
    
    
    
    //Fenster
    if (! App.backup[label].window.rendered || App.backup[label].window.isDestroyed) { 
        App.backup[label].window = Ext.create('Ext.window.Window', {
            title: (label == 'Backup') ? 'Sichern der Daten auf USB-Stick' : 'Wiederherstellen der Daten vom USB-Stick',
            layout: 'fit',
            items: App.backup.createFormPanel(label),
            bbar: [
                '->',
                {
                    xtype: 'button',
                    text: 'Senden',
                    tooltip: 'Daten an SPS senden.',
                    handler: App.backup[label].sendData
                }]
        }).show();
    };
    
};


//Formular innerhalbe des Fensters
App.backup.createFormPanel = function(label) {
    
    
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
            name: 'backup_beschreibung',
            value: 'Die Daten werden als XML-Dateien auf einem im CX steckenden USB-Stick  \
                    gesichert (Backup) und von können von dort wiederhergstellt werden (Restore).',
            margin: '5 5 10 5'
            },{
            xtype: 'fieldset',
            id: label + '_fieldset',
            title: label + ' XML-Daten',
            items: [{
                xtype: 'checkboxfield',
                name: 'backup_bewohnerKonfig',
                id: label + '_bewohnerKonfig',
                fieldLabel: 'Daten der Personen (nur Konfig.)',
                inputValue: '1'
            },{
                xtype: 'checkboxfield',
                name: 'backup_bewohnerKompl',
                id: label + '_bewohnerKompl',
                fieldLabel: 'Daten der Personen (komplett)',
                inputValue: '1'
            },{
                xtype: 'checkboxfield',
                name: 'backup_tagesPresets',
                id: label + '_tagesPresets',
                fieldLabel: 'Tagespresets',
                inputValue: '1'
            },{
                xtype: 'checkboxfield',
                name: 'backup_wochenPresets',
                id: label + '_wochenPresets',
                fieldLabel: 'Wochenpresets',
                inputValue: '1'
            },{
                xtype: 'checkboxfield',
                name: 'backup_heizung',
                id: label + '_heizung',
                fieldLabel: 'Heizung',
                inputValue: '1'
            },{
                xtype: 'checkboxfield',
                name: 'backup_lampen',
                id: label + '_lampen',
                fieldLabel: 'Lampen',
                inputValue: '1'
            },{
                xtype: 'checkboxfield',
                name: 'backup_luefter',
                id: label + '_luefter',
                fieldLabel: 'Lüfter',
                inputValue: '1'
            },{
                xtype: 'checkboxfield',
                name: 'backup_raeume',
                id: label + '_raeume',
                fieldLabel: 'Räume',
                inputValue: '1'
            },{
                xtype: 'checkboxfield',
                name: 'backup_rollos',
                id: label + '_rollos',
                fieldLabel: 'Rollos',
                inputValue: '1'
            },{
                xtype: 'checkboxfield',
                name: 'backup_xmas',
                id: label + '_xmas',
                fieldLabel: 'Xmas',
                inputValue: '1'
            }]  
        }]
    })
};

