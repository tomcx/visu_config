/**
 * @author T. Schmidt
 * 01.07.2011
 */
App.menu.personen = Ext.create('Ext.menu.Menu', {
    items: [{                        
            text: 'Person 1',
            xtype: 'mymenuitem',
            iconCls: 'person',
            myLabel: 'Pers1',
            handler: function(item){
                App.pers.createWindow(item);
            }
        },{
            text: 'Person 2',
            xtype: 'mymenuitem',
            iconCls: 'person',
            myLabel: 'Pers2',
            handler: function(item){
                App.pers.createWindow(item);
            }
        },{
            text: 'Person 3',
            xtype: 'mymenuitem',
            iconCls: 'person',
            myLabel: 'Pers3',
            handler: function(item){
                App.pers.createWindow(item);
            }
        },{
            text: 'Person 4',
            xtype: 'mymenuitem',
            iconCls: 'person',
            myLabel: 'Pers4',
            handler: function(item){
                App.pers.createWindow(item);
            }
        }, '-',{
            text: 'Tagespresets',
            xtype: 'mymenuitem',
            iconCls: 'no-icon',
            menu: {
                items: [{
                    text: 'Tagespreset 1',
                    xtype: 'mymenuitem',
                    iconCls: 'no-icon',
                    myLabel: 'TPres1',
                    handler: function(item){
                        App.pers_tpres.createWindow(item);
                    }
                },{
                    text: 'Tagespreset 2',
                    xtype: 'mymenuitem',
                    iconCls: 'no-icon',
                    myLabel: 'TPres2',
                    handler: function(item){
                        App.pers_tpres.createWindow(item);
                    }
                },{
                    text: 'Tagespreset 3',
                    xtype: 'mymenuitem',
                    iconCls: 'no-icon',
                    myLabel: 'TPres3',
                    handler: function(item){
                        App.pers_tpres.createWindow(item);
                    }
                },{
                    text: 'Tagespreset 4',
                    xtype: 'mymenuitem',
                    iconCls: 'no-icon',
                    myLabel: 'TPres4',
                    handler: function(item){
                        App.pers_tpres.createWindow(item);
                    }
                },{
                    text: 'Tagespreset 5',
                    xtype: 'mymenuitem',
                    iconCls: 'no-icon',
                    myLabel: 'TPres5',
                    handler: function(item){
                        App.pers_tpres.createWindow(item);
                    }
                },{
                    text: 'Tagespreset 6',
                    xtype: 'mymenuitem',
                    iconCls: 'no-icon',
                    myLabel: 'TPres6',
                    handler: function(item){
                        App.pers_tpres.createWindow(item);
                    }
                },{
                    text: 'Tagespreset 7',
                    xtype: 'mymenuitem',
                    iconCls: 'no-icon',
                    myLabel: 'TPres7',
                    handler: function(item){
                        App.pers_tpres.createWindow(item);
                    }
                },{
                    text: 'Tagespreset 8',
                    xtype: 'mymenuitem',
                    iconCls: 'no-icon',
                    myLabel: 'TPres8',
                    handler: function(item){
                        App.pers_tpres.createWindow(item);
                    }
                },{
                    text: 'Tagespreset 9',
                    xtype: 'mymenuitem',
                    iconCls: 'no-icon',
                    myLabel: 'TPres9',
                    handler: function(item){
                        App.pers_tpres.createWindow(item);
                    }
                },{
                    text: 'Tagespreset 10',
                    xtype: 'mymenuitem',
                    iconCls: 'no-icon',
                    myLabel: 'TPres10',
                    handler: function(item){
                        App.pers_tpres.createWindow(item);
                    }
                }]
            }
        },{
            text: 'Wochenpresets',
            xtype: 'mymenuitem',
            iconCls: 'no-icon',
            menu: {
                items: [{
                    text: 'Wochenpreset 1',
                    xtype: 'mymenuitem',
                    iconCls: 'no-icon',
                    myLabel: 'WPres1',
                    handler: function(item){
                        App.pers_wpres.createWindow(item);
                    }
                },{
                    text: 'Wochenpreset 2',
                    xtype: 'mymenuitem',
                    iconCls: 'no-icon',
                    myLabel: 'WPres2',
                    handler: function(item){
                        App.pers_wpres.createWindow(item);
                    }
                },{
                    text: 'Wochenpreset 3',
                    xtype: 'mymenuitem',
                    iconCls: 'no-icon',
                    myLabel: 'WPres3',
                    handler: function(item){
                        App.pers_wpres.createWindow(item);
                    }
                },{
                    text: 'Wochenpreset 4',
                    xtype: 'mymenuitem',
                    iconCls: 'no-icon',
                    myLabel: 'WPres4',
                    handler: function(item){
                        App.pers_wpres.createWindow(item);
                    }
                },{
                    text: 'Wochenpreset 5',
                    xtype: 'mymenuitem',
                    iconCls: 'no-icon',
                    myLabel: 'WPres5',
                    handler: function(item){
                        App.pers_wpres.createWindow(item);
                    }
                },{
                    text: 'Wochenpreset 6',
                    xtype: 'mymenuitem',
                    iconCls: 'no-icon',
                    myLabel: 'WPres6',
                    handler: function(item){
                        App.pers_wpres.createWindow(item);
                    }
                },{
                    text: 'Wochenpreset 7',
                    xtype: 'mymenuitem',
                    iconCls: 'no-icon',
                    myLabel: 'WPres7',
                    handler: function(item){
                        App.pers_wpres.createWindow(item);
                    }
                },{
                    text: 'Wochenpreset 8',
                    xtype: 'mymenuitem',
                    iconCls: 'no-icon',
                    myLabel: 'WPres8',
                    handler: function(item){
                        App.pers_wpres.createWindow(item);
                    }
                },{
                    text: 'Wochenpreset 9',
                    xtype: 'mymenuitem',
                    iconCls: 'no-icon',
                    myLabel: 'WPres9',
                    handler: function(item){
                        App.pers_wpres.createWindow(item);
                    }
                },{
                    text: 'Wochenpreset 10',
                    xtype: 'mymenuitem',
                    iconCls: 'no-icon',
                    myLabel: 'WPres10',
                    handler: function(item){
                        App.pers_wpres.createWindow(item);
                    }
                }]
            }
        }
    ]
});

App.menu.rollos = Ext.create('Ext.menu.Menu', {
    defaults: {
        iconCls: 'no-icon',
    },
    items: [{                      
            text: 'Allgemein',
            xtype: 'mymenuitem',
            myLabel: 'Allgem',
            handler: function(item){
                App.rollo.createWindow2(item);
            }
        },{                      
            text: 'Kinderzimmer',
            xtype: 'mymenuitem',
            myLabel: 'KZ',
            handler: function(item){
                App.rollo.createWindow(item);
            }
        },{
            text: 'Schlafzimmer',
            xtype: 'mymenuitem',
            myLabel: 'SZ',
            handler: function(item){
                App.rollo.createWindow(item);
            }
        },{
            text: 'Wohnz. Ost Links',
            xtype: 'mymenuitem',
            myLabel: 'WZOstLi',
            handler: function(item){
                App.rollo.createWindow(item);
            }
        },{
            text: 'Wohnz. Ost Rechts',
            xtype: 'mymenuitem',
            myLabel: 'WZOstRe',
            handler: function(item){
                App.rollo.createWindow(item);
            }
        },{
            text: 'Wohnz. Sued Links',
            xtype: 'mymenuitem',
            myLabel: 'WZSuedLi',
            handler: function(item){
                App.rollo.createWindow(item);
            }
        },{
            text: 'Wohnz. Sued Rechts',
            xtype: 'mymenuitem',
            myLabel: 'WZSuedRe',
            handler: function(item){
                App.rollo.createWindow(item);
            }
        },{
            text: 'Wohnz. West Links',
            xtype: 'mymenuitem',
            myLabel: 'WZWestLi',
            handler: function(item){
                App.rollo.createWindow(item);
            }
        },{
            text: 'Wohnz. West Rechts',
            xtype: 'mymenuitem',
            myLabel: 'WZWestRe',
            handler: function(item){
                App.rollo.createWindow(item);
            }
        },{
            text: 'Flur',
            xtype: 'mymenuitem',
            myLabel: 'FL',
            handler: function(item){
                App.rollo.createWindow(item);
            }
        },{
            text: 'WC',
            xtype: 'mymenuitem',
            myLabel: 'WC',
            handler: function(item){
                App.rollo.createWindow(item);
            }
        },{
            text: 'Bad Links',
            xtype: 'mymenuitem',
            myLabel: 'BALi',
            handler: function(item){
                App.rollo.createWindow(item);
            }
        },{
            text: 'Bad Rechts',
            xtype: 'mymenuitem',
            myLabel: 'BARe',
            handler: function(item){
                App.rollo.createWindow(item);
            }
        }
    ]
});

App.menu.raeume = Ext.create('Ext.menu.Menu', {
    items: [{                      
            text: 'Wohnzimmer',
            xtype: 'mymenuitem',
            myLabel: 'WZ',
            handler: function(item){
                App.raum.createWindow(item);
            }
        },{                      
            text: 'Flur',
            xtype: 'mymenuitem',
            myLabel: 'FL',
            handler: function(item){
                App.raum.createWindow(item);
            }
        },{
            text: 'Schlafzimmer',
            xtype: 'mymenuitem',
            myLabel: 'SZ',
            handler: function(item){
                App.raum.createWindow(item);
            }
        },{
            text: 'Kinderzimmer',
            xtype: 'mymenuitem',
            myLabel: 'KZ',
            handler: function(item){
                App.raum.createWindow(item);
            }
        },{
            text: 'Bad',
            xtype: 'mymenuitem',
            myLabel: 'BA',
            handler: function(item){
                App.raum.createWindow(item);
            }
        },{
            text: 'WC',
            xtype: 'mymenuitem',
            myLabel: 'WC',
            handler: function(item){
                App.raum.createWindow(item);
            }
        }
    ]
});

App.menu.lueft = Ext.create('Ext.menu.Menu', {
    items: [{                      
            text: 'Bad',
            xtype: 'mymenuitem',
            myLabel: 'BA',
            handler: function(item){
                App.lueft.createWindow(item);
            }
        },{                      
            text: 'WC',
            xtype: 'mymenuitem',
            myLabel: 'WC',
            handler: function(item){
                App.lueft.createWindow(item);
            }
        }
    ]
});

App.menu.licht = Ext.create('Ext.menu.Menu', {
    items: [{                      
            text: 'Lampennamen',
            xtype: 'mymenuitem',
            myLabel: 'licht_namen',
            handler: function(){
                App.licht_namen.createWindow();
            }
        },{                      
            text: 'DALI EVG',
            xtype: 'mymenuitem',
            myLabel: 'licht_evg',
            handler: function(item){
                App.licht_evg.createWindow();
            }
        },{                      
            text: 'Szenen-Tool',
            xtype: 'mymenuitem',
            myLabel: 'licht_szene',
            handler: function(item){
                App.licht_szene.createWindow();
            }
        }
    ]
});

App.menu.heiz = Ext.create('Ext.menu.Menu', {
    defaults: {
        iconCls: 'no-icon',
    },
    items: [{                      
            text: 'Allgemein',
            xtype: 'mymenuitem',
            myLabel: 'Allgem',
            handler: function(item){
                App.heiz.createWindow2(item);
            }
        },{                      
            text: 'Stellantrieb 1',
            xtype: 'mymenuitem',
            myLabel: 'StellAntr1',
            handler: function(item){
                App.heiz.createWindow(item);
            }
        },{
            text: 'Stellantrieb 2',
            xtype: 'mymenuitem',
            myLabel: 'StellAntr2',
            handler: function(item){
                App.heiz.createWindow(item);
            }
        },{
            text: 'Stellantrieb 3',
            xtype: 'mymenuitem',
            myLabel: 'StellAntr3',
            handler: function(item){
                App.heiz.createWindow(item);
            }
        },{
            text: 'Stellantrieb 4',
            xtype: 'mymenuitem',
            myLabel: 'StellAntr4',
            handler: function(item){
                App.heiz.createWindow(item);
            }
        },{
            text: 'Stellantrieb 5',
            xtype: 'mymenuitem',
            myLabel: 'StellAntr5',
            handler: function(item){
                App.heiz.createWindow(item);
            }
        },{
            text: 'Stellantrieb 6',
            xtype: 'mymenuitem',
            myLabel: 'StellAntr6',
            handler: function(item){
                App.heiz.createWindow(item);
            }
        },{
            text: 'Stellantrieb 7',
            xtype: 'mymenuitem',
            myLabel: 'StellAntr7',
            handler: function(item){
                App.heiz.createWindow(item);
            }
        },{
            text: 'Stellantrieb 8',
            xtype: 'mymenuitem',
            myLabel: 'StellAntr8',
            handler: function(item){
                App.heiz.createWindow(item);
            }
        },{
            text: 'Stellantrieb 9',
            xtype: 'mymenuitem',
            myLabel: 'StellAntr9',
            handler: function(item){
                App.heiz.createWindow(item);
            }
        },{
            text: 'Stellantrieb 10',
            xtype: 'mymenuitem',
            myLabel: 'StellAntr10',
            handler: function(item){
                App.heiz.createWindow(item);
            }
        },{
            text: 'Stellantrieb 11',
            xtype: 'mymenuitem',
            myLabel: 'StellAntr11',
            handler: function(item){
                App.heiz.createWindow(item);
            }
        },{
            text: 'Stellantrieb 12',
            xtype: 'mymenuitem',
            myLabel: 'StellAntr12',
            handler: function(item){
                App.heiz.createWindow(item);
            }
        },{
            text: 'Stellantrieb 13',
            xtype: 'mymenuitem',
            myLabel: 'StellAntr13',
            handler: function(item){
                App.heiz.createWindow(item);
            }
        }
    ]
});


App.menu.backup = Ext.create('Ext.menu.Menu', {
    items: [{                      
            text: 'Backup',
            xtype: 'mymenuitem',
            myLabel: 'Backup',
            handler: function(item){
                App.backup.createWindow(item);
            }
        },{                      
            text: 'Restore',
            xtype: 'mymenuitem',
            myLabel: 'Restore',
            handler: function(item){
                App.backup.createWindow(item);
            }
        }
    ]
});
