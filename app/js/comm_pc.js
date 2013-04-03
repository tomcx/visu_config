/**
 * @author T. Schmidt
 * 23.06.2011
 */
//Connector
App.comm.cx = TAME.WebServiceClient.createClient({
        serviceUrl: 'http://192.168.1.2/TcAdsWebService/TcAdsWebService.dll',
        amsNetId: '192.168.1.2.1.1',
        dataAlign4: false
})

//SPS-Variablenadressen
App.comm.plcAddr = {
    lueft: {  
        BA: 45000,
        WC: 45046
    },
    raum: {
        WZ: 37000,
        FL: 37074,
        SZ: 37148,
        KZ: 37222,
        BA: 37296,
        WC: 37370
    },
    rollo: {
        Allgem: 35000,
        KZ: 35042,
        SZ: 35097,
        WZOstLi: 35152,
        WZOstRe: 35207,
        WZSuedLi: 35262,   
        WZSuedRe: 35317,
        WZWestLi: 35372,
        WZWestRe: 35427,
        FL: 35482,
        WC: 35537,
        BALi: 35592,
        BARe: 35647
    },
    heiz: {
        Allgem: 36000,
        StellAntr1: 36026,
        StellAntr2: 36071,
        StellAntr3: 36116,
        StellAntr4: 36161,
        StellAntr5: 36206,   
        StellAntr6: 36251,
        StellAntr7: 36296,
        StellAntr8: 36341,
        StellAntr9: 36386,
        StellAntr10: 36431,
        StellAntr11: 36476,
        StellAntr12: 36521,
        StellAntr13: 36566
    },
    pers: {
        Pers1: 20000,
        Pers2: 21361,
        Pers3: 22722,
        Pers4: 24083
        
    },
    pers_tpres: {
        TPres1: 30000,
        TPres2: 30041,
        TPres3: 30082,
        TPres4: 30123,
        TPres5: 30164,
        TPres6: 30205,
        TPres7: 30246,
        TPres8: 30287,
        TPres9: 30328,
        TPres10: 30369
    },
    pers_wpres: {
        WPres1: 30500,
        WPres2: 30787,
        WPres3: 31074,
        WPres4: 31361,
        WPres5: 31648,
        WPres6: 31935,
        WPres7: 32222,
        WPres8: 32509,
        WPres9: 32796,
        WPres10: 33083
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
