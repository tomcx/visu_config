/**
 * @author T. Schmidt
 * 23.06.2011
 */
//Connector
App.comm.cx = TAME.WebServiceClient.createClient({
        serviceUrl: window.location.href.replace(/visu_config\/index\.html/,'/TcAdsWebService/TcAdsWebService.dll'),
        amsNetId: '5.2.52.54.1.1',
        dataAlign4: true
});

//SPS-Variablenadressen
App.comm.plcAddr = {
    lueft: {  
        BA: 45000,
        WC: 45048   //45046,
    },
    raum: {
        WZ: 37000,
        FL: 37076,
        SZ: 37152,
        KZ: 37228,
        BA: 37304,
        WC: 37380
    },
    rollo: {
        Allgem: 35000,
        KZ: 35044,
        SZ: 35100,  //35073,
        WZOstLi: 35156,
        WZOstRe: 35212,
        WZSuedLi: 35268,   
        WZSuedRe: 35324,
        WZWestLi: 35380,
        WZWestRe: 35436,
        FL: 35492,
        WC: 35548,
        BALi: 35604,
        BARe: 35660
    },
    heiz: {
        Allgem: 36000,
        StellAntr1: 36028,
        StellAntr2: 36076, //36069,
        StellAntr3: 36124,
        StellAntr4: 36172,
        StellAntr5: 36220,   
        StellAntr6: 36268,
        StellAntr7: 36316,
        StellAntr8: 36364,
        StellAntr9: 36412,
        StellAntr10: 36460,
        StellAntr11: 36508,
        StellAntr12: 36556,
        StellAntr13: 36604
    },
    pers: {
        Pers1: 20000,
        Pers2: 21508,  //21353,
        Pers3: 23016,
        Pers4: 24524
        
    },
    pers_tpres: {
        TPres1: 30000,
        TPres2: 30044,
        TPres3: 30088,
        TPres4: 30132,
        TPres5: 30176,
        TPres6: 30220,
        TPres7: 30264,
        TPres8: 30308,
        TPres9: 30352,
        TPres10: 30396
    },
    pers_wpres: {
        WPres1: 30500,
        WPres2: 30808,
        WPres3: 31116,
        WPres4: 31424,
        WPres5: 31732,
        WPres6: 32040,
        WPres7: 32348,
        WPres8: 32656,
        WPres9: 32964,
        WPres10: 33272
    },
    licht: {
        namen: 37500,
        evg: 40444,
        szene: 12150,
        sz_speichern: 12200
    },
    xmas: 34500,
    backup: {
        Backup: 45500,
        Restore: 45550
    }
 
};
