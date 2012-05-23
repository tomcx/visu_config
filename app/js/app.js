/**
 * @author T. Schmidt
 * 20.06.2011
 */

//Namespace
Ext.namespace(
    'App.comm',
    'App.menu',
    'App.lueft',
    'App.raum',
    'App.rollo',
    'App.heiz',
    'App.pers',
    'App.pers_tpres',
    'App.pers_wpres',
    'App.licht',
    'App.licht_namen',
    'App.licht_evg',
    'App.licht_szene',
    'App.xmas',
    'App.backup'
);

Ext.define('Ext.menu.MyMenuItem', {
    extend: 'Ext.menu.Item',
    alias: 'widget.mymenuitem',
    myLabel: ''
});


//Anwendung starten
Ext.application({
    name: 'Smarthome Web Management',
    launch: function() {         
        Ext.create('Ext.container.Viewport', {
            layout: 'auto',
            items: [{
                html: '<h1 class="x-panel-header">Smarthome Web Management</h1>',
                //autoHeight: true,
                border: false,
                margins: '20 20 20 0'
            },{
                xtype: 'toolbar',
                items: [
                    {
                        // xtype: 'button', // default for Toolbars
                        text: 'Personen',
                        menu: App.menu.personen
                    },{
                        // xtype: 'button', // default for Toolbars
                        text: 'Rollos',
                        menu: App.menu.rollos
                    },{
                        // xtype: 'button', // default for Toolbars
                        text: 'Heizung',
                        menu: App.menu.heiz
                    },{
                        // xtype: 'button', // default for Toolbars
                        text: 'Räume',
                        menu: App.menu.raeume
                    },{
                        // xtype: 'button', // default for Toolbars
                        text: 'Licht',
                        menu: App.menu.licht
                    },{
                        // xtype: 'button', // default for Toolbars
                        text: 'Lüftung',
                        menu: App.menu.lueft,
                    },{
                        // xtype: 'button', // default for Toolbars
                        text: 'Xmas',
                        myLabel: 'xmas',
                        handler: function(item){
                            App.xmas.createWindow(item);
                        }
                    },{
                        // xtype: 'button', // default for Toolbars
                        text: 'Backup',
                        menu: App.menu.backup,
                    },
                    // begin using the right-justified button container
                    //'->', // same as {xtype: 'tbfill'}, // Ext.toolbar.Fill
                    //'-',
                    //'Hauptmenü'
                ]
            }]
        });
    }
});