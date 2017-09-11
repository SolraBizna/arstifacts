"use strict";
// This is some data that is bulky, but won't change often.
// the good old "Licensed By Eiling Technologies" screen
let INITIAL_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAADwCAMAAADYSUr5AAAAb1BMVEUAAAArKysrK1VAK1VVKysrQFVVQCsrSlUrVStVSisrVVVKVStVVStVVVVVVapVgKqAgICqgFVVlaqAgP+qlVW/gP9Vqqr/gICVqlWqqlWqqqqAv///v4CA3//V1dWA/4D/34CA///f/4D//4D///9tMQ7GAAACxklEQVR42u3aDVfaMBTG8XS+TV0nG06djAos3/8zLrVWmtw0AQ9ntrn/3zkcoBYlz8nbbTUGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAWjQ2qVkU3fwq0/zXCKqCA2hsU6fPqN0pBff/QxrX2EXBHaA2549J56YuuAtYa8xjRndWwQH8ySg6gHYIXKbbf1n0EJCT4I/XNquZBOUyeL/ZbK71LIPhRujZXLsA7l2v17IRCrbCfQCVmq2w3x3azv7XKXriz62KXQCNrfQ0ezgIKvPbBfDNPNtaTb/3psHaPO12u1sXgJqhHy6Ety6AJ7dB0BKA2Ap1AdRuQdDSAWrz9SXULQhqJv4XGYCedXAsADXr4MgQ0LMOynrwYbvd3ihaB0U92AWgZx0U9eCNC+BB0Too6sGr9Xr9U9E6KOtBF8BadT3YBaC4HrxbrVYXmuvBPgC19eCFC+BOcz34ZblcfldWD7Zt9imrB5cyAF314C9BUQDtEDgL239W9B3BXD34lovaZbBV+B3BZD2o445goh5Ud0cQAAAAAACUqb/C213teHsxeN8/5HHrXRzef3xmV433X7Z75TW6a5h3bH/cb2jsnNkGEOsZ8njxAby/F0MjHsD7D+Z13yTfA/Kv/fczu2+UnwPMUXPADAMYzOonWAXU/gsRAADA5Hd6sSrPq3KyO8RgWzw4HlRRcudoP6FYOjQAG+xt5efC8/3Pyd+bfv70am//3o7U8bI6DBqeLJLC4misiJpCADb+pbIB2FwAqTJ7lgH4DZxNAP6fjnyxviE2PgTklaLh+YkArD8EBoFPLADzwQDMRwIw05sEzcGT4NgVomMmwf8+DE4ZQO4x01Wg+AByG5P4RkiuErmN0HHPkwvAZALIb4XFjYN4w+d23wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADASf0Dar/s4UL4wZ0AAAAASUVORK5CYII=";
// precalculated, sorry
let FIR = {};
FIR.COMPOSITE = {"radius":6,
"kernel":[
  [
      [-3,-11,64,-21,-40,261,3,-22,104,733,22,-2036,559,106,-2011,299,-265,580,1731,-429,-2328,-2371,1162,231,100,-886,4299,3871,-1378,-3955,-6073,3578,-4046,-719,-1168,7274,8612,-1420,-1139,-2586,5234,-2601,-970,-1503,8555,14866,5191,5029,6826,16705,6685,791,815,10536,16155,6395,6485,12839,22587,13015,3083,3080,12889,8664,-1170,-1215,1096,10672,583,759,762,10359,5174,-3159,-1749,-6837,4256,-4973,-1571,-696,7528,4787,-2281,-808,-2901,2746,-6531,-1153,-122,3650,2456,-1623,1915,332,-269,517,-381,-76,1391,-8,40,-183,-567,462,-893,-194,119,-104,7,-5,9,8,-6,10,2,-1,2],
      [-4,2,0,-16,8,1,-3,1,0,409,-170,-200,365,-152,-176,183,-116,118,402,-57,-762,-3160,1563,241,-36,-315,1715,3902,-1239,-3849,-4007,2964,-4753,-2,-865,4457,6891,-3027,-1881,-4924,1987,-3116,-539,-1389,8152,10245,624,301,-749,9172,-1051,675,681,10289,15929,6169,6259,13054,22802,13230,3094,3091,12900,13207,3402,3347,8642,18264,8414,904,878,10634,7369,-1296,-1614,-4152,6806,-3641,-1599,-1083,8192,5939,-2930,-1016,-2729,1819,-4100,-1207,-841,6853,2545,-1418,626,-1368,983,-1473,-1011,-171,3530,218,130,-1241,-617,998,-3519,-389,170,144,-7,-20,120,-33,-20,189,-21,-5,82]
  ],
  [
      [60,2,-168,63,-1,-161,12,-7,2,-307,294,-707,-1844,742,1014,-252,-63,983,2546,-577,-3704,-1496,997,-1210,41,-730,3649,5530,-2378,-3420,-3286,1649,-1740,-314,-1312,7546,6412,-2191,-3897,-3834,6883,-4470,-303,-172,9106,12298,2524,2640,8583,18282,8798,1717,1707,11527,17091,7305,7239,13082,22773,12892,2032,2015,11768,11082,1514,1647,-909,9109,-655,-265,-198,9504,7139,-3365,-1139,-4157,2139,-5893,-831,-1084,7681,3735,-2162,1338,-4231,2862,-3644,-1171,-294,4586,1163,-497,-490,-1771,1939,-5342,-596,211,475,299,-300,759,113,-190,679,-17,-38,240,-2,3,-7,-7,8,-24,-1,1,-2],
      [8,-5,7,10,-7,10,3,-2,3,-230,188,-363,-710,455,-484,-16,-21,150,1805,-784,-696,383,-245,256,720,-778,2120,3228,-1340,-1565,-4314,2341,-745,73,-1155,5753,5439,-2362,-4825,-6039,4423,-7997,-935,-1270,7169,10150,469,672,813,10559,1308,-782,-835,8997,17224,7438,7372,12871,22561,12681,2110,2093,11846,13257,3604,3559,6839,16761,6948,2291,2327,12087,7594,-2871,-1670,-2542,5250,-2347,-98,-150,9523,4986,-2258,-2828,-5230,3780,-7271,-1724,-288,5844,3052,-1380,-897,-1347,1457,-3971,-1141,86,2547,457,-506,1408,-521,-129,2028,-444,26,1031,74,-21,-85,93,-15,-169,-5,4,-4]
  ],
  [
      [-31,17,-5,-155,58,107,-26,6,34,1317,-572,-509,932,-664,976,322,-313,765,2172,-538,-2927,-3253,1729,-374,-267,-503,3290,4825,-1541,-5221,-5694,3640,-5747,-858,-900,6258,8637,-1120,-386,-4059,4754,-1967,-820,-1019,9009,14553,4778,4670,6438,16143,6200,1692,1681,11410,15588,5901,5892,13463,23340,13579,2905,2925,12704,9008,-871,-690,1761,11066,1523,-89,-154,9622,5185,-2464,-3156,-6426,4634,-8300,-1637,-956,7139,4509,-2330,174,-1653,1861,-5249,-700,-578,4815,1140,-1072,2529,-1025,357,847,-438,-181,2081,141,-15,-292,-23,277,-1368,-34,31,-68,0,-2,11,0,-4,18,0,-1,7],
      [-4,4,-11,-9,10,-24,-1,1,-1,238,-152,160,314,-324,845,146,-164,461,120,512,-2952,-2395,1788,-2926,34,-362,1773,3837,-1218,-3791,-2285,1871,-3642,308,-1248,5616,5476,-2800,-2074,-6057,2676,-2554,-573,-1204,8879,8997,-750,-949,526,10042,90,1035,936,10668,15583,5896,5887,13614,23491,13729,2759,2779,12558,14542,4696,4780,7658,17215,7652,579,546,10348,8391,-775,-1590,-4488,6149,-5957,-1349,-908,7827,5871,-3166,413,-4360,2288,-2533,-1409,-610,6450,2788,-1579,822,-2683,1754,-1999,-1250,149,2513,1233,-505,-632,616,162,-2450,-180,99,-37,-26,8,28,-144,70,16,-49,23,11]
  ],
  [
      [98,-52,11,99,-61,55,36,-23,24,-82,351,-1592,-1866,1337,-1995,-102,20,162,2975,-1166,-1798,-1974,1026,-107,244,-744,3189,5244,-2557,-1965,-5003,2386,-659,-484,-1168,7092,7222,-2351,-3579,-2597,6849,-4266,-654,-793,8330,13217,3536,3559,8390,18275,8578,813,833,10614,17251,7426,7464,12566,22169,12513,2444,2413,12211,10133,621,393,-799,9206,-992,620,719,10356,6152,-3457,-949,-4711,2194,-3222,-994,-916,8613,3211,-1429,-1060,-3876,3074,-5667,-1401,-238,4899,1690,-689,-881,411,655,-4448,-339,-67,1234,-70,-61,498,-339,80,475,-132,1,340,3,0,-11,6,1,-19,0,0,-1],
      [1,-2,10,2,-5,24,1,-2,9,-4,181,-920,-240,314,-987,-9,-8,66,1238,-524,-548,-459,-379,3155,196,-648,2822,2773,-634,-4004,-4556,2730,-2111,-427,-913,5821,6467,-2357,-4655,-4453,3011,-6992,-867,-1532,7553,11033,1560,1415,-484,9524,-170,-653,-632,9150,17126,7302,7340,12516,22119,12463,2618,2587,12386,12276,2598,2457,8035,17934,7907,2155,2186,11895,6886,-2969,-1222,-2922,6288,-1208,-588,-530,9193,5741,-2799,-1823,-4103,3405,-8188,-1151,-567,5462,3413,-1947,1076,-1298,1320,-3394,-697,-96,2323,-8,-166,876,-1834,994,-311,-538,202,372,103,-70,90,103,-64,57,11,-8,15]
  ],
  [
      [-45,42,-97,-143,110,-192,-3,3,-4,669,-522,931,-28,-479,2541,339,-411,1228,2033,-549,-2505,-3097,2112,-2754,255,-721,3045,5429,-2063,-4133,-4421,3073,-6421,-164,-1193,6221,7532,-1419,-1116,-5089,5486,-3008,-325,-345,9383,13270,3435,3463,7154,16724,7044,2366,2324,12113,15874,6190,6078,13742,23627,13680,2366,2392,12130,10276,436,733,993,10437,1291,-829,-818,8983,6473,-2463,-3763,-5127,3633,-8853,-1629,-995,6854,4588,-2366,151,-1908,1353,-1966,-1258,-378,5243,560,-381,492,-2242,1261,-614,-1047,192,1757,388,-169,-145,483,-146,-511,-17,-12,109,-3,1,3,-10,3,10,-3,1,3],
      [4,1,-16,5,2,-21,0,0,-1,61,-66,178,-292,-76,1157,-29,-61,390,1414,-6,-3676,-903,1018,-2871,42,-264,1249,4424,-1625,-3235,-2328,1210,-126,-129,-1039,5689,4827,-2559,-3885,-6987,3908,-3954,-1061,-886,8296,8659,-1197,-1182,1590,10902,1584,416,326,10145,16095,6410,6299,13677,23562,13616,2210,2235,11974,14920,5135,5277,6555,16241,6753,1141,1127,10944,8548,-1255,-1596,-3709,5237,-6227,-485,-525,8583,4625,-2558,166,-5575,3324,-4583,-1301,-650,6661,2208,-1260,699,-2688,2267,-4626,-833,-77,2581,1283,-869,1110,1073,-508,-198,101,-165,584,-23,21,-48,-112,107,-259,-23,17,-29]
  ],
  [
      [29,-33,91,42,-66,228,28,-33,98,345,232,-2099,-252,708,-2981,260,-203,366,1966,-713,-1483,-2206,1135,-59,395,-996,4091,4039,-1765,-2635,-6056,3378,-2939,-506,-1260,7307,8255,-1784,-1876,-2243,5832,-3277,-899,-1444,8314,14506,4858,4734,7349,17277,7318,557,587,10324,16601,6804,6904,12600,22273,12732,2959,2943,12758,8971,-767,-958,417,10165,-63,937,1001,10560,5444,-3378,-1428,-6301,3524,-3410,-1487,-654,7991,4413,-1917,-1698,-3310,2905,-6275,-1501,14,3865,2549,-1414,595,871,-313,-673,-455,-29,1341,-82,53,-59,-615,382,-357,-239,112,50,9,-5,1,10,-5,1,1,-1,0],
      [-3,1,4,-12,3,15,-3,1,4,375,-83,-557,220,2,-587,108,-55,-2,816,-329,-445,-2606,895,2225,-143,-310,1968,3728,-1045,-4395,-4529,3059,-3876,-397,-679,4535,7187,-2875,-2828,-4434,2005,-4092,-709,-1439,7839,10791,1249,902,-1010,9023,-1097,213,264,9892,16343,6546,6646,12761,22434,12893,3055,3040,12854,12601,2839,2729,8741,18458,8480,1328,1318,11046,6926,-1882,-1424,-3737,6867,-2476,-1350,-1008,8574,5782,-2840,-1252,-2702,2215,-6004,-973,-918,6614,2609,-1556,1171,-1084,998,-2296,-671,-328,3450,-137,190,-620,-1327,1282,-3122,-409,167,213,27,-44,159,27,-50,184,2,-16,77]
  ],
  [
      [9,33,-192,3,46,-243,8,-5,6,-218,104,38,-1309,266,2059,-64,-234,1370,2053,-338,-3645,-1737,1342,-2354,223,-851,3797,5405,-2209,-3734,-3112,1897,-3661,-71,-1421,7423,6454,-1937,-3153,-4504,6539,-4236,-171,-78,9409,12310,2499,2612,8254,17866,8386,2134,2105,11932,16723,6973,6867,13397,23163,13207,2010,2010,11745,11138,1457,1733,-437,9439,-20,-663,-602,9118,7357,-3149,-1982,-4316,2509,-7196,-1086,-1039,7093,4348,-2486,1398,-3762,2343,-2201,-1320,-200,4491,1017,-446,-371,-2494,2041,-3971,-930,373,519,452,-332,523,336,-267,492,-19,-22,165,-3,2,-4,-12,9,-15,-2,2,-3],
      [9,-5,0,11,-5,0,2,-1,0,-163,92,-46,-759,362,127,-35,-16,177,2073,-769,-1476,121,164,-1160,601,-586,1443,3965,-1753,-1370,-3881,1954,114,23,-1061,5402,5136,-2476,-4669,-6781,4659,-7000,-1062,-1033,7235,9530,-275,-37,1364,10925,1804,-507,-570,9251,16949,7198,7093,13182,22948,12992,2000,2000,11734,13964,4284,4318,6442,16309,6635,2021,2042,11832,7973,-2372,-1799,-2706,4955,-3744,-50,-174,9440,4445,-2059,-2351,-5469,3722,-6528,-1677,-409,6444,2445,-1055,-978,-1564,1694,-4622,-1049,-33,2918,689,-646,1520,308,-526,1900,-209,-126,1196,29,7,-114,39,33,-270,-7,5,-7]
  ],
  [
      [-21,5,28,-95,5,223,-19,-5,77,1130,-288,-1479,977,-400,-500,296,-285,689,1894,-392,-2947,-2776,1360,274,-208,-659,3938,4223,-1309,-4999,-5947,3650,-4936,-906,-998,6850,8767,-1179,-624,-3250,4832,-2084,-957,-1338,8802,14884,5161,5006,6492,16290,6276,1207,1216,10933,15784,6065,6115,13156,22978,13324,3064,3073,12870,8672,-1206,-1116,1591,11002,1155,387,336,10022,5031,-2806,-2349,-6865,4668,-6838,-1595,-831,7260,4732,-2405,-26,-2273,2385,-6320,-791,-387,4066,1883,-1486,2714,-358,-2,947,-322,-166,1696,63,16,-245,-351,430,-1291,-107,82,-142,4,-4,13,5,-6,16,2,-2,5],
      [-5,3,-5,-15,10,-14,-2,1,-1,341,-184,53,412,-275,334,202,-163,309,66,297,-1701,-3031,1877,-1717,57,-366,1737,3834,-1248,-3624,-3125,2521,-4786,304,-1120,4968,6215,-2978,-1587,-5496,2234,-2620,-461,-1326,8582,9583,-106,-371,-186,9546,-626,980,925,10578,15650,5931,5982,13367,23189,13536,2986,2995,12792,13918,4082,4096,8246,17809,8112,630,596,10378,7930,-905,-1664,-4444,6548,-4896,-1606,-1037,7889,6060,-3099,-386,-3393,1859,-2748,-1398,-692,6691,2715,-1478,491,-2010,1266,-1247,-1270,49,3076,761,-142,-1263,76,586,-3215,-329,165,12,-23,-2,69,-96,23,134,-42,11,54]
  ],
  [
      [96,-32,-87,94,-37,-53,23,-12,3,-221,354,-1246,-2086,1154,-471,-264,40,484,2978,-949,-2920,-1670,921,-361,40,-660,3292,5555,-2561,-2707,-4046,1854,-596,-481,-1190,7314,6717,-2357,-4040,-3153,7002,-4464,-486,-425,8682,12630,2904,2988,8632,18433,8868,1234,1241,11044,17284,7471,7457,12779,22409,12638,2191,2163,11939,10709,1213,1146,-1036,9021,-1009,203,284,9966,6654,-3443,-827,-4256,2001,-4440,-799,-1051,8305,3220,-1704,330,-4183,3090,-4943,-1192,-340,4874,1333,-536,-734,-646,1409,-5560,-364,23,836,91,-190,741,-121,-66,660,-54,-36,326,0,2,-11,0,5,-25,0,0,-1],
      [4,-4,11,7,-7,19,3,-3,7,-179,230,-717,-506,428,-876,-13,-18,127,1460,-647,-497,237,-488,1893,545,-804,2709,2725,-862,-2705,-4469,2569,-1508,-116,-1112,6030,5887,-2284,-4894,-5142,3795,-7984,-870,-1462,7349,10695,1145,1196,142,10043,585,-836,-859,8968,17289,7476,7462,12628,22258,12487,2336,2308,12085,12640,2987,2878,7421,17356,7414,2339,2380,12108,7206,-3103,-1415,-2640,5752,-1439,-285,-280,9409,5505,-2581,-2481,-4802,3712,-7940,-1503,-342,5392,3473,-1773,23,-1339,1375,-3568,-989,75,2208,235,-359,1233,-1343,448,1212,-561,154,675,104,-52,-5,113,-48,-49,1,0,-2]
  ],
  [
      [-41,29,-43,-175,99,-51,-17,8,3,1144,-671,456,541,-669,2026,365,-369,943,2230,-637,-2566,-3436,2063,-1615,-40,-542,2896,5287,-1859,-4740,-5198,3478,-6385,-545,-978,5958,8193,-1221,-522,-4750,5007,-2327,-579,-657,9200,13962,4147,4106,6680,16302,6480,2117,2086,11843,15621,5947,5877,13678,23577,13710,2649,2676,12433,9598,-269,-25,1545,10856,1583,-539,-575,9243,5717,-2321,-3773,-5762,4227,-8963,-1681,-1005,7015,4447,-2271,33,-1451,1423,-3521,-930,-559,5316,636,-628,1568,-1658,774,359,-740,-44,2168,254,-73,-287,296,56,-1066,-9,-4,41,-2,0,7,-5,-1,17,-2,0,6],
      [-1,4,-16,-2,6,-26,0,0,-1,147,-110,181,57,-257,1175,49,-119,486,655,403,-3795,-1604,1442,-3219,-26,-294,1584,4094,-1341,-3828,-1961,1342,-1765,77,-1183,5888,4979,-2634,-3008,-6580,3262,-2965,-825,-1029,8789,8658,-1147,-1258,1179,10534,908,824,718,10513,15745,6071,6002,13728,23627,13759,2475,2501,12259,14909,5080,5214,7039,16642,7154,766,740,10554,8603,-902,-1531,-4221,5678,-6484,-922,-730,8087,5301,-2971,749,-5174,2860,-3347,-1313,-627,6448,2565,-1515,1073,-2963,2169,-3400,-1020,69,2321,1416,-782,315,961,-215,-1411,5,-33,158,-27,15,-7,-152,103,-133,-39,24,-22]
  ],
  [
      [70,-51,78,82,-71,152,40,-33,63,84,323,-1879,-1179,1178,-2976,115,-89,156,2517,-1052,-1181,-2148,1124,-156,440,-913,3550,4625,-2252,-1841,-5733,2968,-1655,-436,-1231,7130,7770,-2139,-2756,-2264,6429,-3870,-789,-1176,8202,13903,4252,4198,7921,17852,8010,566,593,10352,17001,7182,7261,12500,22119,12548,2725,2699,12511,9503,-107,-379,-271,9625,-638,885,984,10568,5758,-3452,-1201,-5477,2746,-2770,-1277,-747,8455,3738,-1534,-1899,-3578,2985,-5990,-1583,-61,4461,2192,-1022,-486,962,2,-2533,-425,-53,1384,-122,27,182,-519,239,131,-212,62,234,7,-2,-6,9,-3,-9,0,0,0],
      [-1,-1,7,-5,-2,23,-2,-1,7,217,55,-853,12,162,-868,31,-15,-3,1083,-453,-508,-1552,140,3350,-84,-434,2457,3248,-755,-4627,-4638,2917,-2858,-577,-708,5158,6993,-2595,-3917,-4216,2355,-5501,-835,-1500,7683,11073,1596,1302,-907,9150,-776,-273,-218,9483,16781,6961,7041,12564,22184,12612,2881,2855,12667,12261,2544,2404,8518,18337,8295,1785,1797,11506,6759,-2508,-1236,-3307,6692,-1606,-971,-806,8917,5754,-2844,-1393,-3277,2844,-7561,-925,-814,6012,2993,-1816,1504,-1148,1176,-3046,-534,-289,2888,-186,53,215,-1811,1302,-1955,-459,187,243,71,-66,153,73,-64,136,13,-16,47]
  ],
  [
      [-30,46,-158,-74,88,-261,5,-3,3,134,-208,720,-667,-157,2554,180,-371,1441,1873,-370,-3007,-2388,1809,-3052,359,-865,3510,5388,-2135,-3831,-3590,2468,-5469,26,-1384,6868,6872,-1667,-2092,-4981,6041,-3723,-169,-142,9488,12665,2832,2915,7731,17296,7742,2372,2331,12147,16278,6565,6441,13639,23475,13496,2132,2148,11878,10845,1064,1386,261,9922,702,-874,-827,8929,7118,-2802,-3041,-4643,3027,-8205,-1410,-995,6814,4651,-2516,758,-2843,1730,-1452,-1410,-215,4802,776,-364,-160,-2610,1748,-2156,-1132,372,1053,478,-274,160,485,-261,72,-26,-13,134,-3,2,0,-13,7,-2,-3,2,0],
      [8,-2,-10,9,-2,-11,1,0,-1,-45,-2,128,-605,161,757,-52,-24,259,1972,-482,-2687,-337,594,-2175,298,-368,1113,4444,-1843,-2161,-3123,1491,511,-124,-983,5387,4923,-2536,-4419,-7105,4444,-5442,-1141,-879,7663,8984,-882,-727,1652,11047,1913,-72,-144,9675,16536,6822,6699,13477,23314,13335,2036,2052,11781,14573,4844,4949,6337,16119,6563,1600,1603,11413,8307,-1780,-1739,-3135,4959,-5203,-175,-321,9102,4268,-2172,-1122,-5611,3590,-5687,-1462,-574,6752,2099,-1026,-219,-2087,2039,-5027,-866,-126,2920,983,-790,1490,871,-642,1021,18,-207,1018,-6,21,-92,-38,79,-309,-11,9,-18]
  ]
]};
FIR.SVIDEO = {"radius":4,
"kernel":[
  [
      [3,-2,1,-12,17,-55,9,-15,54,970,-315,-923,-844,721,-1500,-126,-407,2423,5743,-2203,-3715,-4770,3567,-5861,-973,-1364,9576,11558,-4766,-5764,-9599,6846,-10080,-1959,-2080,15844,33057,13947,14055,27459,46415,27753,5277,5431,23984,10445,-4648,-3455,-8748,5962,-7761,-1697,-1314,11216,4308,-2059,-693,-3682,2434,-2880,-626,-375,3574,480,-265,103,-442,286,-315,-38,-22,212,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,488,-265,86,-441,282,-294,-47,-16,208,4135,-2042,-325,-3696,2529,-3328,-438,-486,3653,10116,-4616,-2755,-8775,6141,-8611,-1341,-1525,11366,32897,13963,14395,27446,46502,27340,5451,5328,24057,11615,-4772,-5885,-9595,6815,-9933,-2021,-2043,15817,6055,-2233,-4378,-4744,3397,-5054,-1311,-1164,9433,1229,-340,-1473,-823,581,-832,-406,-241,2305,30,-4,-56,-10,2,14,-20,2,42]
  ],
  [
      [7,5,-44,-1,4,-19,-6,-9,64,1299,-368,-1509,-851,576,-731,-447,-207,2240,6499,-2415,-4606,-4927,3366,-4414,-1572,-951,9020,12024,-4939,-6094,-9763,6786,-9343,-2261,-1847,15437,32967,13934,14359,27417,46497,27442,5409,5362,23992,9822,-4496,-2605,-8654,6162,-9035,-1168,-1666,11640,3637,-1838,-70,-3491,2564,-4046,-146,-725,4117,310,-192,178,-368,294,-552,58,-102,374,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,322,-200,184,-377,297,-543,54,-97,359,3361,-1671,-209,-3292,2501,-4247,-69,-830,4456,9298,-4178,-2868,-8275,6043,-9416,-1023,-1865,12284,32713,14088,14231,27600,46439,27257,5480,5266,24305,12115,-4994,-6048,-9829,6807,-9277,-2286,-1812,15325,6996,-2716,-4357,-5286,3479,-4052,-1710,-763,8409,1711,-618,-1302,-1149,669,-431,-561,-51,1733,49,-20,-23,-31,14,11,-18,7,11]
  ],
  [
      [30,-4,-56,-10,2,14,-20,2,42,1769,-667,-1202,-1213,703,-438,-556,-36,1640,7369,-3030,-3720,-5693,3695,-4098,-1676,-665,7818,12459,-5284,-5461,-10204,7006,-9319,-2254,-1723,14780,32772,14038,14333,27536,46474,27250,5485,5281,24211,9051,-3970,-3289,-8006,5900,-9386,-1045,-1930,12676,2942,-1319,-923,-2834,2258,-4196,-108,-939,5119,172,-74,-72,-213,210,-524,41,-136,596,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,177,-80,-49,-222,217,-535,46,-137,585,2840,-1169,-1429,-2621,2102,-3949,-219,-933,5378,8857,-3684,-4252,-7600,5602,-8917,-1257,-1918,13169,32678,14177,13865,27733,46329,27477,5382,5287,24450,12492,-5333,-5295,-10275,7058,-9400,-2218,-1725,14695,7553,-3301,-2807,-6078,3977,-4543,-1475,-676,7350,1922,-892,-445,-1532,937,-807,-390,-45,1253,45,-27,22,-43,27,-24,-2,1,2]
  ],
  [
      [49,-20,-23,-31,14,11,-18,7,11,1911,-913,-310,-1568,976,-915,-343,-63,1225,7483,-3433,-1943,-6303,4225,-5229,-1180,-792,7172,12428,-5455,-4499,-10482,7286,-10032,-1946,-1832,14531,32667,14156,14002,27697,46368,27369,5429,5268,24422,8903,-3597,-4823,-7451,5438,-8463,-1452,-1841,13286,2919,-1020,-2399,-2368,1824,-3179,-550,-803,5578,205,-27,-396,-132,118,-260,-73,-90,656,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,197,-27,-380,-133,122,-280,-65,-95,660,3092,-1037,-2767,-2354,1729,-2732,-738,-692,5499,9233,-3629,-5523,-7424,5259,-7613,-1809,-1630,13136,32827,14141,13663,27710,46281,27782,5256,5371,24349,12371,-5449,-4378,-10487,7317,-10179,-1884,-1868,14557,7170,-3403,-1280,-6329,4395,-6035,-842,-992,7315,1652,-888,240,-1589,1117,-1584,-63,-229,1343,22,-18,34,-33,28,-57,11,-10,24]
  ],
  [
      [45,-27,22,-43,27,-24,-2,1,2,1582,-859,276,-1560,1122,-1684,-22,-262,1408,6727,-3221,-1053,-6146,4426,-6676,-581,-1205,7729,11962,-5282,-4169,-10318,7346,-10769,-1643,-2065,14938,32756,14170,13699,27739,46286,27680,5298,5337,24414,9527,-3749,-5673,-7545,5238,-7189,-1982,-1489,12862,3590,-1241,-3022,-2559,1694,-2013,-1031,-453,5035,375,-100,-471,-206,109,-23,-169,-10,494,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,363,-92,-477,-197,107,-32,-166,-14,509,3866,-1409,-2883,-2759,1757,-1813,-1107,-348,4696,10050,-4067,-5411,-7923,5357,-6807,-2127,-1290,12218,33011,14015,13826,27555,46344,27865,5227,5434,24102,11871,-5227,-4214,-10253,7325,-10835,-1618,-2099,15049,6230,-2920,-1302,-5787,4314,-7037,-443,-1394,8339,1170,-609,69,-1262,1028,-1984,92,-419,1915,3,-2,1,-12,17,-55,9,-15,54]
  ],
  [
      [22,-18,34,-33,28,-57,11,-10,24,1112,-560,-30,-1199,994,-1977,87,-434,2008,5856,-2606,-1939,-5379,4097,-6991,-477,-1492,8930,11527,-4937,-4801,-9877,7126,-10793,-1650,-2189,15594,32951,14065,13725,27620,46310,27872,5222,5418,24195,10298,-4275,-4989,-8193,5500,-6837,-2104,-1226,11826,4285,-1761,-2169,-3216,2000,-1864,-1069,-239,4033,513,-218,-221,-361,194,-50,-152,25,271,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,508,-211,-244,-351,186,-39,-157,25,283,4387,-1911,-1663,-3430,2156,-2111,-957,-245,3773,10492,-4561,-4027,-8599,5798,-7307,-1893,-1237,11333,33046,13926,14193,27423,46454,27645,5324,5412,23956,11493,-4888,-4967,-9807,7074,-10712,-1687,-2187,15680,5672,-2335,-2851,-4995,3815,-6547,-678,-1480,9398,959,-335,-787,-879,760,-1608,-79,-425,2395,7,5,-44,-1,4,-19,-6,-9,64]
  ],
  [
      [3,-2,1,-12,17,-55,9,-15,54,970,-315,-923,-844,721,-1500,-126,-407,2423,5743,-2203,-3715,-4770,3567,-5861,-973,-1364,9576,11558,-4766,-5764,-9599,6846,-10080,-1959,-2080,15844,33057,13947,14055,27459,46415,27753,5277,5431,23984,10445,-4648,-3455,-8748,5962,-7761,-1697,-1314,11216,4308,-2059,-693,-3682,2434,-2880,-626,-375,3574,480,-265,103,-442,286,-315,-38,-22,212,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,488,-265,86,-441,282,-294,-47,-16,208,4135,-2042,-325,-3696,2529,-3328,-438,-486,3653,10116,-4616,-2755,-8775,6141,-8611,-1341,-1525,11366,32897,13963,14395,27446,46502,27340,5451,5328,24057,11615,-4772,-5885,-9595,6815,-9933,-2021,-2043,15817,6055,-2233,-4378,-4744,3397,-5054,-1311,-1164,9433,1229,-340,-1473,-823,581,-832,-406,-241,2305,30,-4,-56,-10,2,14,-20,2,42]
  ],
  [
      [7,5,-44,-1,4,-19,-6,-9,64,1299,-368,-1509,-851,576,-731,-447,-207,2240,6499,-2415,-4606,-4927,3366,-4414,-1572,-951,9020,12024,-4939,-6094,-9763,6786,-9343,-2261,-1847,15437,32967,13934,14359,27417,46497,27442,5409,5362,23992,9822,-4496,-2605,-8654,6162,-9035,-1168,-1666,11640,3637,-1838,-70,-3491,2564,-4046,-146,-725,4117,310,-192,178,-368,294,-552,58,-102,374,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,322,-200,184,-377,297,-543,54,-97,359,3361,-1671,-209,-3292,2501,-4247,-69,-830,4456,9298,-4178,-2868,-8275,6043,-9416,-1023,-1865,12284,32713,14088,14231,27600,46439,27257,5480,5266,24305,12115,-4994,-6048,-9829,6807,-9277,-2286,-1812,15325,6996,-2716,-4357,-5286,3479,-4052,-1710,-763,8409,1711,-618,-1302,-1149,669,-431,-561,-51,1733,49,-20,-23,-31,14,11,-18,7,11]
  ],
  [
      [30,-4,-56,-10,2,14,-20,2,42,1769,-667,-1202,-1213,703,-438,-556,-36,1640,7369,-3030,-3720,-5693,3695,-4098,-1676,-665,7818,12459,-5284,-5461,-10204,7006,-9319,-2254,-1723,14780,32772,14038,14333,27536,46474,27250,5485,5281,24211,9051,-3970,-3289,-8006,5900,-9386,-1045,-1930,12676,2942,-1319,-923,-2834,2258,-4196,-108,-939,5119,172,-74,-72,-213,210,-524,41,-136,596,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,177,-80,-49,-222,217,-535,46,-137,585,2840,-1169,-1429,-2621,2102,-3949,-219,-933,5378,8857,-3684,-4252,-7600,5602,-8917,-1257,-1918,13169,32678,14177,13865,27733,46329,27477,5382,5287,24450,12492,-5333,-5295,-10275,7058,-9400,-2218,-1725,14695,7553,-3301,-2807,-6078,3977,-4543,-1475,-676,7350,1922,-892,-445,-1532,937,-807,-390,-45,1253,45,-27,22,-43,27,-24,-2,1,2]
  ],
  [
      [49,-20,-23,-31,14,11,-18,7,11,1911,-913,-310,-1568,976,-915,-343,-63,1225,7483,-3433,-1943,-6303,4225,-5229,-1180,-792,7172,12428,-5455,-4499,-10482,7286,-10032,-1946,-1832,14531,32667,14156,14002,27697,46368,27369,5429,5268,24422,8903,-3597,-4823,-7451,5438,-8463,-1452,-1841,13286,2919,-1020,-2399,-2368,1824,-3179,-550,-803,5578,205,-27,-396,-132,118,-260,-73,-90,656,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,197,-27,-380,-133,122,-280,-65,-95,660,3092,-1037,-2767,-2354,1729,-2732,-738,-692,5499,9233,-3629,-5523,-7424,5259,-7613,-1809,-1630,13136,32827,14141,13663,27710,46281,27782,5256,5371,24349,12371,-5449,-4378,-10487,7317,-10179,-1884,-1868,14557,7170,-3403,-1280,-6329,4395,-6035,-842,-992,7315,1652,-888,240,-1589,1117,-1584,-63,-229,1343,22,-18,34,-33,28,-57,11,-10,24]
  ],
  [
      [45,-27,22,-43,27,-24,-2,1,2,1582,-859,276,-1560,1122,-1684,-22,-262,1408,6727,-3221,-1053,-6146,4426,-6676,-581,-1205,7729,11962,-5282,-4169,-10318,7346,-10769,-1643,-2065,14938,32756,14170,13699,27739,46286,27680,5298,5337,24414,9527,-3749,-5673,-7545,5238,-7189,-1982,-1489,12862,3590,-1241,-3022,-2559,1694,-2013,-1031,-453,5035,375,-100,-471,-206,109,-23,-169,-10,494,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,363,-92,-477,-197,107,-32,-166,-14,509,3866,-1409,-2883,-2759,1757,-1813,-1107,-348,4696,10050,-4067,-5411,-7923,5357,-6807,-2127,-1290,12218,33011,14015,13826,27555,46344,27865,5227,5434,24102,11871,-5227,-4214,-10253,7325,-10835,-1618,-2099,15049,6230,-2920,-1302,-5787,4314,-7037,-443,-1394,8339,1170,-609,69,-1262,1028,-1984,92,-419,1915,3,-2,1,-12,17,-55,9,-15,54]
  ],
  [
      [22,-18,34,-33,28,-57,11,-10,24,1112,-560,-30,-1199,994,-1977,87,-434,2008,5856,-2606,-1939,-5379,4097,-6991,-477,-1492,8930,11527,-4937,-4801,-9877,7126,-10793,-1650,-2189,15594,32951,14065,13725,27620,46310,27872,5222,5418,24195,10298,-4275,-4989,-8193,5500,-6837,-2104,-1226,11826,4285,-1761,-2169,-3216,2000,-1864,-1069,-239,4033,513,-218,-221,-361,194,-50,-152,25,271,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,508,-211,-244,-351,186,-39,-157,25,283,4387,-1911,-1663,-3430,2156,-2111,-957,-245,3773,10492,-4561,-4027,-8599,5798,-7307,-1893,-1237,11333,33046,13926,14193,27423,46454,27645,5324,5412,23956,11493,-4888,-4967,-9807,7074,-10712,-1687,-2187,15680,5672,-2335,-2851,-4995,3815,-6547,-678,-1480,9398,959,-335,-787,-879,760,-1608,-79,-425,2395,7,5,-44,-1,4,-19,-6,-9,64]
  ]
]};
