/**
 * @author T. Schmidt
 * 18.07.2011
 */


//Store, Proxy und Model beim Laden der Seite erzeugen
App.licht_evg.data = [];

//Arrays vorbelegen
(function() {
    for (var i=0;i<64;i++) {
        App.licht_evg.data[i] = {addr: i ,name: 'nicht vorhanden'};
    }
})();
    
App.licht_evg.createStore = function() {
    
    //Datenmodell Lampe
    Ext.define('EVG', {
        extend: 'Ext.data.Model',
        fields: [
            //Lampendaten für Übersichts-Liste
            {name: 'addr', type: 'int'},
            {name: 'name', type: 'string'},
            {name: 'kanal', type: 'string'},
            //Beginn der eigentlichen DALI-Variablen
            {name: 'errors', type: 'int'},
            {name: 'present', type: 'bool'},
            {name: 'actualLevel', type: 'int'},
            {name: 'powerOnLevel', type: 'int'},
            {name: 'systemFailureLevel', type: 'int'},
            {name: 'minLevel',  type: 'int'},
            {name: 'maxLevel',  type: 'int'},
            {name: 'fadeRate',  type: 'int'},
            {name: 'fadeTime',  type: 'int'},
            {name: 'randomAddress',  type: 'int'},
            {name: 'groups',  type: 'int'},
            {name: 'sceneLevel0',  type: 'int'},
            {name: 'sceneLevel1',  type: 'int'},
            {name: 'sceneLevel2',  type: 'int'},
            {name: 'sceneLevel3',  type: 'int'},
            {name: 'sceneLevel4',  type: 'int'},
            {name: 'sceneLevel5',  type: 'int'},
            {name: 'sceneLevel6',  type: 'int'},
            {name: 'sceneLevel7',  type: 'int'},
            {name: 'sceneLevel8',  type: 'int'},
            {name: 'sceneLevel9',  type: 'int'},
            {name: 'sceneLevel10',  type: 'int'},
            {name: 'sceneLevel11',  type: 'int'},
            {name: 'sceneLevel12',  type: 'int'},
            {name: 'sceneLevel13',  type: 'int'},
            {name: 'sceneLevel14',  type: 'int'},
            {name: 'sceneLevel15',  type: 'int'},
            {name: 'status',  type: 'int'},
            {name: 'majorVersion',  type: 'int'},
            {name: 'minorVersion',  type: 'int'},
            {name: 'deviceType',  type: 'int'},
            {name: 'physicalMinLevel',  type: 'int'}  
        ]
    });
    
    //Store EVG
    App.licht_evg.store = new Ext.data.Store({
        //autoLoad: true,
        model: 'EVG',
        data : App.licht_evg,
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
App.licht_evg.createWindow = function(){
    
    Ext.namespace('App.licht_evg.window');


    //Kommunikation
    var dataStructLampe = {
        name: 'STRING.39',
        kanal: 'STRING.5'
    };
    
    var dataStructEVG = {
        errors: 'DWORD',
        present: 'BOOL',
        actualLevel: 'BYTE',
        powerOnLevel: 'BYTE',
        systemFailureLevel: 'BYTE',
        minLevel: 'BYTE',
        maxLevel: 'BYTE',
        fadeRate: 'BYTE',
        fadeTime: 'BYTE',
        randomAddress: 'DWORD',
        groups: 'WORD',
        sceneLevel: 'ARRAY.16.BYTE.SP', //with "SP" the array items will be added as single properties to the data object
        status: 'BYTE',
        majorVersion: 'BYTE',
        minorVersion: 'BYTE',
        deviceType: 'BYTE',
        physicalMinLevel: 'BYTE'
    };
    
    //With TAME < 1.1 you had to write the struct def like this
    //cause ARRAY was not supported
    /*
    var dataStructEVG = {
        errors: 'DWORD',
        present: 'BOOL',
        actualLevel: 'BYTE',
        powerOnLevel: 'BYTE',
        systemFailureLevel: 'BYTE',
        minLevel: 'BYTE',
        maxLevel: 'BYTE',
        fadeRate: 'BYTE',
        fadeTime: 'BYTE',
        randomAddress: 'DWORD',
        groups: 'WORD',
        sceneLevel0: 'BYTE',
        sceneLevel1: 'BYTE',
        sceneLevel2: 'BYTE',
        sceneLevel3: 'BYTE',
        sceneLevel4: 'BYTE',
        sceneLevel5: 'BYTE',
        sceneLevel6: 'BYTE',
        sceneLevel7: 'BYTE',
        sceneLevel8: 'BYTE',
        sceneLevel9: 'BYTE',
        sceneLevel10: 'BYTE',
        sceneLevel11: 'BYTE',
        sceneLevel12: 'BYTE',
        sceneLevel13: 'BYTE',
        sceneLevel14: 'BYTE',
        sceneLevel15: 'BYTE',
        status: 'BYTE',
        majorVersion: 'BYTE',
        minorVersion: 'BYTE',
        deviceType: 'BYTE',
        physicalMinLevel: 'BYTE'
    };
    */
    
    App.licht_evg.readData = function() {
        App.comm.cx.readArrayOfStruct({
            //Parameter für Lesen
            fld: 'M',
            addr: App.comm.plcAddr.licht.namen,
            oc: function(){
                App.licht_evg.readData2();
            },
            debug: false,
            arrlen: 64,
            def: dataStructLampe,
            jvar: 'App.licht_evg.data',
        });
    };
    
    App.licht_evg.readData2 = function() {
        App.comm.cx.readArrayOfStruct({
            //Parameter für Lesen
            fld: 'M',
            addr: App.comm.plcAddr.licht.evg,
            oc: function(){
                App.licht_evg.store.load();
            },
            debug: false,
            arrlen: 64,
            def: dataStructEVG,
            jvar: 'App.licht_evg.data',
        });
    };
 

    //Formular innerhalbe des Fensters
    App.licht_evg.createFormPanel = function() {
    
        return Ext.create('Ext.form.Panel', {
            id: 'licht_evg_formpanel',
            //frame: true,
            width: 1000,
            //autoScroll: true,
            bodyPadding: 5,
            fieldDefaults: {
                labelAlign: 'left',
                labelWidth: 150,
                anchor: '100%',
            },
            layout: 'column',
            items: [{
                columnWidth: 0.7,
                xtype: 'gridpanel',
                id: 'licht_evg_gridpanel',
                invalidateScrollerOnRefresh: false,
                store: App.licht_evg.store,
                autoScroll: true,
                height: 400,
                columnLines: true,
                //title: 'Lampen',
                columns: [{
                        text   : 'Adresse',
                        width: 50,
                        dataIndex: 'addr'
                    },
                    {
                        text   : 'Name',
                        //width: 200,
                        flex: 1,
                        dataIndex: 'name'
                    },
                    {
                        text   : 'Kanal',
                        width    :50,
                        dataIndex: 'kanal'
                    },{
                        text   : 'Vorh.',
                        width    :50,
                        dataIndex: 'present'
                    },{
                        text   : 'Fehler',
                        width    : 50,
                        dataIndex: 'errors'
                    },{
                        text   : 'Status',
                        width    : 50,
                        dataIndex: 'status'
                    },{
                        text   : 'Akt. Wert',
                        width    : 60,
                        dataIndex: 'actualLevel'
                    }
                ],
                listeners: {
                    selectionchange: function(model, records) {
                        var selModel = this.getSelectionModel();
                        var store = this.getStore();
                        App.licht_evg.index = store.indexOf(selModel.getLastSelected());
                        if (records[0]) {
                            this.up('form').getForm().loadRecord(records[0]);
                        }
                    }
                }
            },{
                xtype: 'fieldset',
                id: 'licht_evg_fieldset',
                columnWidth: 0.3,
                margin: '0 0 0 5',
                autoScroll: true,
                height: 400,
                title: 'EVG-Daten',
                items: [{
                    xtype: 'numberfield',
                    name: 'errors',
                    id: 'licht_evg_errors',
                    fieldLabel: 'Fehler',
                    readOnly: true
                },{
                    xtype: 'checkbox',
                    name: 'present',
                    id: 'licht_evg_present',
                    fieldLabel: 'Vorhanden',
                    readOnly: true
                },{ 
                    xtype: 'numberfield',
                    fieldLabel: 'Akt. Wert',
                    id: 'licht_evg_actualLevel',
                    name: 'actualLevel',
                    readOnly: true
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Einschaltwert',
                    id: 'licht_evg_powerOnLevel',
                    name: 'powerOnLevel',
                    readOnly: true
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Wert b. Systemfehler',
                    id: 'licht_evg_systemFailureLevel',
                    name: 'systemFailureLevel',
                    readOnly: true
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Minimaler Wert',
                    id: 'licht_evg_minLevel',
                    name: 'minLevel',
                    readOnly: true
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Maximaler Wert',
                    id: 'licht_evg_maxLevel',
                    name: 'maxLevel',
                    readOnly: true
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Stufengeschwindigkeit',
                    id: 'licht_evg_fadeRate',
                    name: 'fadeRate',
                    readOnly: true
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Stufenzeit',
                    id: 'licht_evg_fadeTime',
                    name: 'fadeTime',
                    readOnly: true
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Zufallsadresse',
                    id: 'licht_evg_randomAddress',
                    name: 'randomAddress',
                    readOnly: true
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Gruppen',
                    id: 'licht_evg_groups',
                    name: 'groups',
                    readOnly: true
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Wert Szene 0',
                    id: 'licht_evg_sceneLevel0',
                    name: 'sceneLevel0',
                    readOnly: true
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Wert Szene 1',
                    id: 'licht_evg_sceneLevel1',
                    name: 'sceneLevel1',
                    readOnly: true
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Wert Szene 2',
                    id: 'licht_evg_sceneLevel2',
                    name: 'sceneLevel2',
                    readOnly: true
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Wert Szene 3',
                    id: 'licht_evg_sceneLevel3',
                    name: 'sceneLevel3',
                    readOnly: true
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Wert Szene 4',
                    id: 'licht_evg_sceneLevel4',
                    name: 'sceneLevel4',
                    readOnly: true
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Wert Szene 5',
                    id: 'licht_evg_sceneLevel5',
                    name: 'sceneLevel5',
                    readOnly: true
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Wert Szene 6',
                    id: 'licht_evg_sceneLevel6',
                    name: 'sceneLevel6',
                    readOnly: true
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Wert Szene 7',
                    id: 'licht_evg_sceneLevel7',
                    name: 'sceneLevel7',
                    readOnly: true
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Wert Szene 8',
                    id: 'licht_evg_sceneLevel8',
                    name: 'sceneLevel8',
                    readOnly: true
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Wert Szene 9',
                    id: 'licht_evg_sceneLevel9',
                    name: 'sceneLevel9',
                    readOnly: true
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Wert Szene 10',
                    id: 'licht_evg_sceneLevel10',
                    name: 'sceneLevel10',
                    readOnly: true
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Wert Szene 11',
                    id: 'licht_evg_sceneLevel11',
                    name: 'sceneLevel11',
                    readOnly: true
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Wert Szene 12',
                    id: 'licht_evg_sceneLevel12',
                    name: 'sceneLevel12',
                    readOnly: true
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Wert Szene 13',
                    id: 'licht_evg_sceneLevel13',
                    name: 'sceneLevel13',
                    readOnly: true
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Wert Szene 14',
                    id: 'licht_evg_sceneLevel14',
                    name: 'sceneLevel14',
                    readOnly: true
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Wert Szene 15',
                    id: 'licht_evg_sceneLevel15',
                    name: 'sceneLevel15',
                    readOnly: true
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Status',
                    id: 'licht_evg_status',
                    name: 'status',
                    readOnly: true
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Hauptversion',
                    id: 'licht_evg_majorVersion',
                    name: 'majorVersion',
                    readOnly: true
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Unterversion',
                    id: 'licht_evg_minorVersion',
                    name: 'minorVersion',
                    readOnly: true
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Gerätetyp',
                    id: 'licht_evg_deviceType',
                    name: 'deviceType',
                    readOnly: true
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Phys. Min. Wert',
                    id: 'licht_evg_physicalMinLevel',
                    name: 'physicalMinLevel',
                    readOnly: true
                }]
            }]
        })
    };


    //Fenster
    if (! App.licht_evg.window.rendered || App.licht_evg.window.isDestroyed) { 
        App.licht_evg.window = Ext.create('Ext.window.Window', {
            title: 'DALI EVG-Daten',
            layout: 'fit',
            items: App.licht_evg.createFormPanel(),
            bbar: [
                '->',
                /*
                {
                    xtype: 'button',
                    text: 'Senden',
                    tooltip: 'Daten an SPS senden.',
                    handler: App.licht_evg.sendData
                },
                */
                { 
                    xtype: 'button',
                    text: 'Refresh',
                    tooltip: 'Daten aus SPS laden.',
                    handler: App.licht_evg.readData
                }]
        }).show();
    };
    
    var tooltips = [{
        target: 'licht_evg_errors',
        html: 'EVG-Fehlernummer. '
    },{
        target: 'licht_evg_present',
        html: 'EVG ist vorhanden und meldet sich.'
    },{
        target: 'licht_evg_actualLevel',
        html: 'Diese Variable beinhaltet den aktuellen Lampenleistungswert der Lampe (ACTUAL DIM LEVEL), Wertebereich 0 - 255.'
    },{
        target: 'licht_evg_systemFailureLevel',
        html: 'Tritt ein Fehler am DALI-Bus auf (Ruhespannung länger als 500ms unterhalb des festgelegten Pegelbereichs), \
        so wird die Lampe mit dem Leistungswert aus der Variablen SYSTEM FAILURE LEVEL angesteuert. Steht 255 (Maske) in \
        der Variablen, so ändert sich die Lampenleistung nicht. Begrenzt wird der Wertebereich durch MIN LEVEL und MAX LEVEL.'
    },,{
        target: 'licht_evg_powerOnLevel',
        html: 'Wird das Vorschaltegerät mit Spannung versorgt, wird die Lampe mit dem Leistungswert angesteuert, \
        der in der Variablen POWER ON LEVEL abgelegt ist. Vorraussetzung ist, dass der DALI-Bus schon mit Spannung \
        versorgt wird und in Ruhepegel ist. Der Bereich von POWER ON LEVEL wird durch die beiden Variabeln \
        MIN LEVEL und MAX LEVEL begrenzt.'
    },{
        target: 'licht_evg_minLevel',
        html: 'Kleinster Wert, auf welchen das EVG die Lampe regeln soll (Physikalisch kleinst möglicher Lampenleistungswert - Maximaler Wert).'
    },{
        target: 'licht_evg_maxLevel',
        html: 'Größter Wert, auf welchen das EVG die Lampe regeln soll (Minimaler Wert - 254).'
    },{
        target: 'licht_evg_fadeRate',
        html: 'Die Stufengeschwindigkeit (FADE RATE) legt die Veränderungsgeschwindigkeit (in Stufen pro Sekunde) \
        für die Änderung des Lampenleistungswertes fest. Wird beim Dimmen verwendet, Wertebereich 1 - 15.'
    },{
        target: 'licht_evg_fadeTime',
        html: 'Die Stufenzeit (FADE TIME) legt die Zeit für die Veränderung des aktuellen Lampenleistungswertes \
        zum geforderten Wert fest. Wird beim Einschalten und der Szenenanwahl verwendet, Wertebereich 0 - 15.'
    },{
        target: 'licht_evg_randomAddress',
        html: 'Die Zufallsadresse, auch als Langadresse bezeichnet, wird vom Hersteller bei Auslieferung der Vorschaltgeräte vorgegeben.'
    },{
        target: 'licht_evg_groups',
        html: 'Innerhalb eines DALI-Netzes existieren 16 Gruppen. Jedes Vorschaltgerät kann einer, mehreren oder keiner Gruppe gehören. \
        Befehle, die an eine Gruppe geschickt werden, wirken sich auf alle Vorschaltgeräte aus, die zu der entsprechenden Gruppe gehören.'
    },{
        target: 'licht_evg_sceneLevel0',
        html: 'Lampenleistungswert für Szene 0. Jedes DALI-Vorschaltgerät kann Lampenleistunsgwerte für 16 verschiedene Szenen abspeichern. \
        Pro Szene gilt ein Lampenleistungswert. Wird der Befehl zum Aufruf einer Szene an einem Teilnehmer, eine Gruppe \
        oder an alle (Sammelruf) aufgerufen, so werden jeweils die entsprechenden Lampen auf den abgespeicherten Wert gesetzt. Begrenzt wird \
        die Ausgabe durch MAX LEVEL, MIN LEVEL und PHYSICAL MIN LEVEL. '
    },{
        target: 'licht_evg_sceneLevel1',
        html: 'Lampenleistungswert für Szene 1. Jedes DALI-Vorschaltgerät kann Lampenleistunsgwerte für 16 verschiedene Szenen abspeichern. \
        Pro Szene gilt ein Lampenleistungswert. Wird der Befehl zum Aufruf einer Szene an einem Teilnehmer, eine Gruppe \
        oder an alle (Sammelruf) aufgerufen, so werden jeweils die entsprechenden Lampen auf den abgespeicherten Wert gesetzt. Begrenzt wird \
        die Ausgabe durch MAX LEVEL, MIN LEVEL und PHYSICAL MIN LEVEL. '
    },{
        target: 'licht_evg_sceneLevel2',
        html: 'Lampenleistungswert für Szene 2. Jedes DALI-Vorschaltgerät kann Lampenleistunsgwerte für 16 verschiedene Szenen abspeichern. \
        Pro Szene gilt ein Lampenleistungswert. Wird der Befehl zum Aufruf einer Szene an einem Teilnehmer, eine Gruppe \
        oder an alle (Sammelruf) aufgerufen, so werden jeweils die entsprechenden Lampen auf den abgespeicherten Wert gesetzt. Begrenzt wird \
        die Ausgabe durch MAX LEVEL, MIN LEVEL und PHYSICAL MIN LEVEL. '
    },{
        target: 'licht_evg_sceneLevel3',
        html: 'Lampenleistungswert für Szene 3. Jedes DALI-Vorschaltgerät kann Lampenleistunsgwerte für 16 verschiedene Szenen abspeichern. \
        Pro Szene gilt ein Lampenleistungswert. Wird der Befehl zum Aufruf einer Szene an einem Teilnehmer, eine Gruppe \
        oder an alle (Sammelruf) aufgerufen, so werden jeweils die entsprechenden Lampen auf den abgespeicherten Wert gesetzt. Begrenzt wird \
        die Ausgabe durch MAX LEVEL, MIN LEVEL und PHYSICAL MIN LEVEL. '
    },{
        target: 'licht_evg_sceneLevel4',
        html: 'Lampenleistungswert für Szene 4. Jedes DALI-Vorschaltgerät kann Lampenleistunsgwerte für 16 verschiedene Szenen abspeichern. \
        Pro Szene gilt ein Lampenleistungswert. Wird der Befehl zum Aufruf einer Szene an einem Teilnehmer, eine Gruppe \
        oder an alle (Sammelruf) aufgerufen, so werden jeweils die entsprechenden Lampen auf den abgespeicherten Wert gesetzt. Begrenzt wird \
        die Ausgabe durch MAX LEVEL, MIN LEVEL und PHYSICAL MIN LEVEL. '
    },{
        target: 'licht_evg_sceneLevel5',
        html: 'Lampenleistungswert für Szene 5. Jedes DALI-Vorschaltgerät kann Lampenleistunsgwerte für 16 verschiedene Szenen abspeichern. \
        Pro Szene gilt ein Lampenleistungswert. Wird der Befehl zum Aufruf einer Szene an einem Teilnehmer, eine Gruppe \
        oder an alle (Sammelruf) aufgerufen, so werden jeweils die entsprechenden Lampen auf den abgespeicherten Wert gesetzt. Begrenzt wird \
        die Ausgabe durch MAX LEVEL, MIN LEVEL und PHYSICAL MIN LEVEL. '
    },{
        target: 'licht_evg_sceneLevel6',
        html: 'Lampenleistungswert für Szene 6. Jedes DALI-Vorschaltgerät kann Lampenleistunsgwerte für 16 verschiedene Szenen abspeichern. \
        Pro Szene gilt ein Lampenleistungswert. Wird der Befehl zum Aufruf einer Szene an einem Teilnehmer, eine Gruppe \
        oder an alle (Sammelruf) aufgerufen, so werden jeweils die entsprechenden Lampen auf den abgespeicherten Wert gesetzt. Begrenzt wird \
        die Ausgabe durch MAX LEVEL, MIN LEVEL und PHYSICAL MIN LEVEL. '
    },{
        target: 'licht_evg_sceneLevel7',
        html: 'Lampenleistungswert für Szene 7. Jedes DALI-Vorschaltgerät kann Lampenleistunsgwerte für 16 verschiedene Szenen abspeichern. \
        Pro Szene gilt ein Lampenleistungswert. Wird der Befehl zum Aufruf einer Szene an einem Teilnehmer, eine Gruppe \
        oder an alle (Sammelruf) aufgerufen, so werden jeweils die entsprechenden Lampen auf den abgespeicherten Wert gesetzt. Begrenzt wird \
        die Ausgabe durch MAX LEVEL, MIN LEVEL und PHYSICAL MIN LEVEL. '
    },{
        target: 'licht_evg_sceneLevel8',
        html: 'Lampenleistungswert für Szene 8. Jedes DALI-Vorschaltgerät kann Lampenleistunsgwerte für 16 verschiedene Szenen abspeichern. \
        Pro Szene gilt ein Lampenleistungswert. Wird der Befehl zum Aufruf einer Szene an einem Teilnehmer, eine Gruppe \
        oder an alle (Sammelruf) aufgerufen, so werden jeweils die entsprechenden Lampen auf den abgespeicherten Wert gesetzt. Begrenzt wird \
        die Ausgabe durch MAX LEVEL, MIN LEVEL und PHYSICAL MIN LEVEL. '
    },{
        target: 'licht_evg_sceneLevel9',
        html: 'Lampenleistungswert für Szene 9. Jedes DALI-Vorschaltgerät kann Lampenleistunsgwerte für 16 verschiedene Szenen abspeichern. \
        Pro Szene gilt ein Lampenleistungswert. Wird der Befehl zum Aufruf einer Szene an einem Teilnehmer, eine Gruppe \
        oder an alle (Sammelruf) aufgerufen, so werden jeweils die entsprechenden Lampen auf den abgespeicherten Wert gesetzt. Begrenzt wird \
        die Ausgabe durch MAX LEVEL, MIN LEVEL und PHYSICAL MIN LEVEL. '
    },{
        target: 'licht_evg_sceneLevel10',
        html: 'Lampenleistungswert für Szene 10. Jedes DALI-Vorschaltgerät kann Lampenleistunsgwerte für 16 verschiedene Szenen abspeichern. \
        Pro Szene gilt ein Lampenleistungswert. Wird der Befehl zum Aufruf einer Szene an einem Teilnehmer, eine Gruppe \
        oder an alle (Sammelruf) aufgerufen, so werden jeweils die entsprechenden Lampen auf den abgespeicherten Wert gesetzt. Begrenzt wird \
        die Ausgabe durch MAX LEVEL, MIN LEVEL und PHYSICAL MIN LEVEL. '
    },{
        target: 'licht_evg_sceneLevel11',
        html: 'Lampenleistungswert für Szene 11. Jedes DALI-Vorschaltgerät kann Lampenleistunsgwerte für 16 verschiedene Szenen abspeichern. \
        Pro Szene gilt ein Lampenleistungswert. Wird der Befehl zum Aufruf einer Szene an einem Teilnehmer, eine Gruppe \
        oder an alle (Sammelruf) aufgerufen, so werden jeweils die entsprechenden Lampen auf den abgespeicherten Wert gesetzt. Begrenzt wird \
        die Ausgabe durch MAX LEVEL, MIN LEVEL und PHYSICAL MIN LEVEL. '
    },{
        target: 'licht_evg_sceneLevel12',
        html: 'Lampenleistungswert für Szene 12. Jedes DALI-Vorschaltgerät kann Lampenleistunsgwerte für 16 verschiedene Szenen abspeichern. \
        Pro Szene gilt ein Lampenleistungswert. Wird der Befehl zum Aufruf einer Szene an einem Teilnehmer, eine Gruppe \
        oder an alle (Sammelruf) aufgerufen, so werden jeweils die entsprechenden Lampen auf den abgespeicherten Wert gesetzt. Begrenzt wird \
        die Ausgabe durch MAX LEVEL, MIN LEVEL und PHYSICAL MIN LEVEL. '
    },{
        target: 'licht_evg_sceneLevel13',
        html: 'Lampenleistungswert für Szene 13. Jedes DALI-Vorschaltgerät kann Lampenleistunsgwerte für 16 verschiedene Szenen abspeichern. \
        Pro Szene gilt ein Lampenleistungswert. Wird der Befehl zum Aufruf einer Szene an einem Teilnehmer, eine Gruppe \
        oder an alle (Sammelruf) aufgerufen, so werden jeweils die entsprechenden Lampen auf den abgespeicherten Wert gesetzt. Begrenzt wird \
        die Ausgabe durch MAX LEVEL, MIN LEVEL und PHYSICAL MIN LEVEL. '
    },{
        target: 'licht_evg_sceneLevel14',
        html: 'Lampenleistungswert für Szene 14. Jedes DALI-Vorschaltgerät kann Lampenleistunsgwerte für 16 verschiedene Szenen abspeichern. \
        Pro Szene gilt ein Lampenleistungswert. Wird der Befehl zum Aufruf einer Szene an einem Teilnehmer, eine Gruppe \
        oder an alle (Sammelruf) aufgerufen, so werden jeweils die entsprechenden Lampen auf den abgespeicherten Wert gesetzt. Begrenzt wird \
        die Ausgabe durch MAX LEVEL, MIN LEVEL und PHYSICAL MIN LEVEL. '
    },{
        target: 'licht_evg_sceneLevel15',
        html: 'Lampenleistungswert für Szene 15. Jedes DALI-Vorschaltgerät kann Lampenleistunsgwerte für 16 verschiedene Szenen abspeichern. \
        Pro Szene gilt ein Lampenleistungswert. Wird der Befehl zum Aufruf einer Szene an einem Teilnehmer, eine Gruppe \
        oder an alle (Sammelruf) aufgerufen, so werden jeweils die entsprechenden Lampen auf den abgespeicherten Wert gesetzt. Begrenzt wird \
        die Ausgabe durch MAX LEVEL, MIN LEVEL und PHYSICAL MIN LEVEL. '
    },{
        target: 'licht_evg_status',
        html: 'Die Statusinformation enthält die wichtigsten Zustandsmeldungen eines Vorschaltgerätes.'
    },{
        target: 'licht_evg_majorVersion',
        html: 'Die Versionsnummer entspricht der Versionsnummer der IEC-Norm, nach der das Vorschaltgerät entwickelt und hergestellt wurde.'
    },{
        target: 'licht_evg_minorVersion',
        html: 'Die Versionsnummer entspricht der Versionsnummer der IEC-Norm, nach der das Vorschaltgerät entwickelt und hergestellt wurde.'
    },{
        target: 'licht_evg_deviceType',
        html: 'Gerätetyp.'
    },{
        target: 'licht_evg_physicalMinLevel',
        html: 'Der physikalisch kleinst mögliche Lampenleistungswert wird vom Hersteller in der Variablen PHYSICAL MIN LEVEL abgelegt.'
    }];
    
    Ext.each(tooltips, function(config) {
        Ext.create('Ext.tip.ToolTip', config);
    });  
    
    Ext.QuickTips.init();
    
    App.licht_evg.readData();
    
};
