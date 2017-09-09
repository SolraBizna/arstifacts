"use strict";
// This is some data that is bulky, but won't change often.
// the good old "Licensed By Eiling Technologies" screen
let INITIAL_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAADwCAMAAADYSUr5AAAAb1BMVEUAAAArKysrK1VAK1VVKysrQFVVQCsrSlUrVStVSisrVVVKVStVVStVVVVVVapVgKqAgICqgFVVlaqAgP+qlVW/gP9Vqqr/gICVqlWqqlWqqqqAv///v4CA3//V1dWA/4D/34CA///f/4D//4D///9tMQ7GAAACxklEQVR42u3aDVfaMBTG8XS+TV0nG06djAos3/8zLrVWmtw0AQ9ntrn/3zkcoBYlz8nbbTUGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAWjQ2qVkU3fwq0/zXCKqCA2hsU6fPqN0pBff/QxrX2EXBHaA2549J56YuuAtYa8xjRndWwQH8ySg6gHYIXKbbf1n0EJCT4I/XNquZBOUyeL/ZbK71LIPhRujZXLsA7l2v17IRCrbCfQCVmq2w3x3azv7XKXriz62KXQCNrfQ0ezgIKvPbBfDNPNtaTb/3psHaPO12u1sXgJqhHy6Ety6AJ7dB0BKA2Ap1AdRuQdDSAWrz9SXULQhqJv4XGYCedXAsADXr4MgQ0LMOynrwYbvd3ihaB0U92AWgZx0U9eCNC+BB0Too6sGr9Xr9U9E6KOtBF8BadT3YBaC4HrxbrVYXmuvBPgC19eCFC+BOcz34ZblcfldWD7Zt9imrB5cyAF314C9BUQDtEDgL239W9B3BXD34lovaZbBV+B3BZD2o445goh5Ud0cQAAAAAACUqb/C213teHsxeN8/5HHrXRzef3xmV433X7Z75TW6a5h3bH/cb2jsnNkGEOsZ8njxAby/F0MjHsD7D+Z13yTfA/Kv/fczu2+UnwPMUXPADAMYzOonWAXU/gsRAADA5Hd6sSrPq3KyO8RgWzw4HlRRcudoP6FYOjQAG+xt5efC8/3Pyd+bfv70am//3o7U8bI6DBqeLJLC4misiJpCADb+pbIB2FwAqTJ7lgH4DZxNAP6fjnyxviE2PgTklaLh+YkArD8EBoFPLADzwQDMRwIw05sEzcGT4NgVomMmwf8+DE4ZQO4x01Wg+AByG5P4RkiuErmN0HHPkwvAZALIb4XFjYN4w+d23wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADASf0Dar/s4UL4wZ0AAAAASUVORK5CYII=";
// the FIR filter weights for the crazy boxcar filter
// precalculated, sorry
let HYBRID_FIR = {"radius":5,
"kernel":[
  [
      [153,118,-1006,292,238,-1992,60,43,-380,387,-34,-840,-2464,598,3379,847,-1215,4033,5348,-1719,-5172,-3326,2890,-6158,-162,-1770,9539,7192,-943,-5000,-4533,6702,-4950,-1573,-230,8740,17577,5646,8263,7361,15167,12277,-2400,-1842,7529,13822,3005,2502,10028,21232,6330,6006,6198,13480,8791,-162,3352,371,12422,3855,303,-247,9808,6573,-2884,-2050,-3735,3215,-6100,-315,-1631,9353,4935,-2174,-1745,-3671,3513,-8463,-2384,534,3499,1107,-900,1733,-99,-331,1963,-347,114,322,-105,72,-93,-207,141,-182,-40,27,-35],
      [112,-62,24,219,-121,47,43,-23,9,86,-245,1036,-1432,422,1581,219,-247,698,3907,-978,-5207,-3027,2641,-5658,1123,-1660,5601,6088,-2097,-4927,-6535,4395,-5021,-1910,-691,8656,12578,651,3271,870,8685,5802,-517,43,9416,13771,2953,2451,9927,21131,6229,5986,6179,13461,13785,4837,8341,6850,18911,10324,-1583,-2131,7921,7762,-1710,-1999,-1444,5566,-6128,178,-1232,9516,5299,-1747,-4900,-4846,3849,-7113,-1999,-631,8492,2367,-1768,2895,-612,-64,1934,-1554,303,2515,27,188,-1040,47,372,-2038,8,73,-395]
  ],
  [
      [-411,79,669,-807,156,1312,-156,28,265,1635,181,-5216,314,241,-2063,952,-1095,3144,5047,-1363,-6215,-5775,3573,-3256,-1474,-1027,9155,8932,-2697,-531,-3443,4956,1181,-1129,-456,8743,9257,-1560,-2062,8232,19436,4534,4105,4297,11579,19237,10289,13794,8403,20464,11877,-670,-1217,8834,10516,702,628,3105,9443,-1830,1777,237,11066,5423,-1737,-4938,-5854,4520,-7263,-1370,-1064,9199,5238,-3376,3646,-4018,2345,-1541,-1982,162,4362,833,-424,-3,-282,791,-3335,-86,146,-526,73,-71,174,142,-139,342,28,-27,66],
      [-97,74,-125,-190,144,-245,-37,28,-48,580,-149,-754,701,-58,-1538,651,-465,686,1969,-168,-4298,-5496,2918,-616,260,-1543,7263,8108,-3640,-2275,-4767,2960,-2270,-1354,-860,8068,10165,-659,-1159,1508,12698,-2199,342,532,7815,19186,10238,13742,8302,20363,11776,-689,-1237,8815,9613,-203,-267,9839,16173,4920,5542,4001,14834,6081,-591,-3351,-4567,6729,-3927,-1120,-672,10035,7201,-3243,-2185,-4504,2563,-1387,-2210,-404,7873,3272,-1628,-198,-214,1304,-6152,-1275,603,240,-299,-6,815,-593,-8,1598,-115,-2,310]
  ],
  [
      [562,-255,-162,1100,-502,-301,212,-98,-49,186,730,-4248,-3795,1617,1623,-186,-530,3215,7531,-2959,-4513,-4320,2393,-998,-1257,-884,7848,8733,-2261,-2251,-4012,6845,-7052,-549,-424,7053,17079,8131,11635,1267,13329,4742,363,-185,9867,10296,480,416,17420,23755,12502,5195,3654,14487,8811,2458,-719,158,12080,604,-982,-413,10135,7126,-2958,-3115,-4518,2754,-1669,-1532,-994,9261,5640,-3118,1266,-2098,2857,-9208,-1103,-109,3450,-163,-275,1845,-1146,559,126,-159,-56,704,-20,51,-209,-40,100,-411,-8,19,-80],
      [56,-66,192,110,-129,378,21,-25,73,-767,633,-1248,-1426,813,-448,-27,-212,1162,4455,-1146,-5777,-1322,681,-42,521,-1628,7015,7164,-3018,-3003,-6807,5165,-8271,-1100,-744,6807,9800,859,4357,-1614,10460,1860,915,370,10418,10245,429,365,17320,23655,12401,5175,3634,14468,16088,9733,6548,3036,14954,3464,-1535,-966,9578,8784,-2149,-2418,-1408,4335,118,-966,-690,9724,7872,-3547,-2376,-5419,4151,-7163,-1751,-198,5611,1585,-1521,3674,-3425,2057,-1608,-1449,510,1174,499,-182,-369,974,-354,-731,190,-69,-141]
  ],
  [
      [-554,363,-414,-1101,715,-795,-217,140,-151,2959,-970,-2763,57,-645,3174,656,-859,2703,6920,-2759,-3935,-7082,4752,-5897,-1021,-664,6098,6947,-1997,1071,-5370,6700,-2743,-353,-899,8986,9380,-435,-500,13477,19812,8558,1793,252,11085,18288,11933,8749,5697,17616,6126,1521,2090,12634,10431,-712,-473,3782,9112,5894,678,874,11481,7630,-2943,-4513,-5677,4361,-6906,-1536,-581,7147,3123,-2066,2447,-4965,3737,-6222,-1622,-163,5089,693,-370,88,1273,-337,-1601,110,-201,745,-37,-18,188,-73,-35,369,-14,-7,72],
      [0,41,-208,-1,80,-409,0,15,-79,783,-238,-828,973,-892,2041,157,-336,1317,3224,-239,-7224,-5778,3459,-2660,-509,-802,5465,6431,-3256,144,-6236,4085,-4209,-553,-1375,8622,10373,552,498,4173,10498,-737,518,-1025,9812,18237,11882,8698,5597,17516,6026,1502,2071,12615,9437,-1702,-1460,13084,18423,15210,1952,2150,12759,8254,-1582,-3946,-4775,7145,-5523,-1388,-31,7441,6465,-3572,1440,-7021,4637,-5469,-1148,-684,6531,3136,-2180,3002,1101,211,-3973,-323,-121,1470,-560,318,-170,-1100,626,-339,-213,121,-63]
  ],
  [
      [417,-379,856,798,-733,1683,154,-142,327,1082,286,-4308,-3958,2600,-3009,311,-417,1334,6388,-3233,-100,-6267,3836,-3318,-26,-1452,7547,7769,-1878,-1699,-1431,5237,-5539,181,-1296,9630,12814,6459,3274,1565,13484,1994,2867,3436,13980,13778,2640,2882,18238,23578,20365,375,573,11181,11801,2010,-817,-566,11442,-2135,-892,482,7778,6969,-3369,-588,-7116,4472,-3705,-1172,-873,7696,5027,-2806,1266,-286,1093,-4880,-1182,-531,5830,-348,314,-705,-1127,820,-1267,-653,210,629,85,-21,-116,166,-40,-228,32,-8,-44],
      [-55,-4,168,-109,-9,330,-21,-2,64,304,314,-2417,-1128,860,-1473,-269,129,42,4996,-2038,-2605,-3637,1239,3153,291,-1297,5911,6327,-2524,-3352,-4243,3926,-8618,-379,-1516,8887,7666,1314,-1881,-458,11465,-44,441,1011,11552,13727,2589,2831,18137,23477,20264,355,553,11162,16953,7155,4330,1465,13459,-112,1535,2907,10204,8548,-2754,1314,-4374,5878,-51,-619,-612,8413,6352,-3272,194,-3849,3574,-8311,-255,-1368,7711,489,-384,696,-2714,2642,-6487,-1266,317,1687,473,-370,666,928,-727,1308,180,-142,258]
  ],
  [
      [-144,281,-1073,-299,565,-2122,-56,108,-410,1526,-795,93,-1821,180,3845,1066,-1186,3311,5423,-2127,-3266,-4739,4054,-8449,335,-1782,8297,6052,-601,-3771,-4624,6710,-4751,-1131,-675,9875,14957,3819,4061,11241,16581,13368,-2068,-1871,8738,16068,6270,3446,7222,19217,5645,4581,5952,13249,9887,-1283,3079,1070,11581,6228,358,416,9553,7222,-3314,-1533,-4611,3948,-7577,-264,-1388,7969,3710,-1533,-1834,-4002,3586,-7972,-2410,323,4653,1188,-747,729,797,-739,1716,-374,64,651,-110,53,14,-215,104,27,-42,20,5],
      [96,-33,-83,189,-65,-163,37,-13,-32,731,-525,785,-808,-123,2753,57,-145,598,4147,-1058,-5426,-4598,3480,-5863,654,-1211,4520,5271,-1908,-3755,-6130,4153,-4837,-1394,-1160,9717,12174,1037,1286,3030,8372,5174,-674,-476,10136,16017,6219,3395,7122,19116,5545,4561,5932,13230,12665,1502,5857,9270,19794,14427,-1038,-978,8156,8177,-2026,-1458,-2955,6642,-7708,116,-910,8022,4419,-1766,-2492,-5414,4346,-8182,-1196,-1115,8876,2341,-1740,2823,819,-562,747,-1029,-67,3040,-258,323,-988,-508,634,-1933,-100,123,-373]
  ],
  [
      [-149,-121,1014,-300,-231,1974,-55,-48,390,1122,355,-4770,-1020,1362,-4337,1127,-1066,2535,4235,-1360,-4101,-5509,3593,-4055,-586,-1634,9948,8595,-2197,-2224,-1779,4241,500,-1038,-708,9798,10282,484,-2340,5376,17371,3799,3952,5323,12621,18691,7528,11883,11490,22014,16648,-1366,-1306,7828,11440,963,1486,1331,10391,-4049,1408,277,9192,5141,-2030,-2692,-6547,4892,-7361,-861,-1306,9108,5605,-3294,2267,-2357,1314,-587,-2128,107,5029,712,-232,-670,-875,981,-2754,-497,369,-594,105,-72,93,207,-141,182,40,-27,35],
      [-112,62,-24,-219,121,-47,-43,23,-9,760,-203,-947,-108,504,-2311,476,-231,-57,2709,-980,-2059,-5379,2638,522,667,-1660,6801,7552,-3003,-4099,-3661,2615,-3396,-1351,-1036,8971,9544,-258,-3086,602,12588,-990,-119,1250,8546,18640,7477,11831,11389,21914,16547,-1386,-1325,7808,12184,1702,2235,6117,15166,746,5481,4349,13267,6055,-1102,-652,-4795,6759,-3485,-473,-1000,10029,6224,-2626,-2794,-3031,2122,-2979,-1647,-967,9295,2247,-853,-1497,-848,1731,-6688,-1600,651,840,-22,-190,1037,-49,-371,2040,-11,-72,397]
  ],
  [
      [410,-78,-674,805,-153,-1325,157,-32,-247,-100,584,-2743,-3092,1032,2792,291,-942,4087,6364,-2070,-6026,-3189,2184,-2885,-972,-1297,9227,8378,-1722,-4096,-4531,6870,-5817,-1341,-85,7384,18316,7152,11507,3587,14112,8745,-1349,-1289,7845,11467,985,1517,13860,22910,8489,6373,5241,14159,8193,1379,1614,261,12487,1822,-207,-603,10344,6576,-2688,-3066,-3589,2653,-3588,-930,-1427,9913,5694,-2857,-221,-3124,3365,-9133,-1808,360,2887,555,-731,2307,-829,189,1202,-192,29,355,-73,71,-174,-142,139,-342,-28,27,-66],
      [97,-74,125,190,-144,245,37,-28,48,-576,253,206,-1568,731,348,210,-311,1052,3923,-890,-5702,-1661,1501,-3374,1004,-1818,6727,6974,-2664,-4327,-6993,4876,-6298,-1786,-488,7286,11670,514,4866,-952,9585,4214,226,289,9422,11415,933,1466,13760,22809,8389,6354,5221,14140,14834,8021,8247,4791,17021,6337,-1784,-2180,8764,8022,-1683,-2822,-755,4586,-2889,-379,-1088,10236,6910,-2595,-4757,-5076,3835,-6436,-2321,-157,6892,2206,-1794,3456,-2308,977,1022,-1681,539,1633,304,3,-813,589,10,-1598,114,2,-310]
  ],
  [
      [-558,256,144,-1100,502,300,-215,97,67,2456,-357,-4601,661,-517,930,679,-944,3080,6362,-2092,-5910,-6615,4095,-3742,-1702,-554,7315,8291,-2696,1147,-4880,5991,-381,-717,-590,8349,8685,-1797,-1264,11297,20347,5926,3457,2325,11243,18886,12073,12299,6505,18736,8051,368,-28,10916,10185,161,-561,4125,8840,2185,1348,518,12002,6560,-2165,-5715,-5630,4311,-6774,-1748,-691,8269,4181,-2897,3952,-4962,3291,-3934,-1659,-24,4474,714,-411,245,577,292,-3014,176,-108,94,20,-51,209,40,-100,411,8,-19,80],
      [-56,66,-192,-110,129,-378,-21,25,-73,560,-105,-929,1180,-636,178,480,-494,1284,2269,105,-6492,-5612,3138,-1446,-312,-1151,6742,7664,-3802,-277,-5827,3626,-2918,-910,-1043,7847,10226,-263,277,2914,11950,-2456,718,-418,8504,18835,12022,12247,6405,18635,7950,349,-47,10897,8646,-1377,-2091,12511,17230,10589,4089,3259,14745,7128,-866,-4681,-4659,6853,-4323,-1597,-201,8862,7452,-3790,-27,-6244,3675,-2552,-1911,-291,6506,3552,-2146,1737,437,829,-5411,-699,272,435,-496,180,373,-978,357,726,-189,69,142]
  ],
  [
      [566,-365,399,1096,-714,801,210,-138,159,763,510,-4625,-4254,2260,-482,-181,-295,1993,7627,-3553,-1702,-5693,3193,-1514,-751,-967,6949,8267,-2219,-1250,-2777,6264,-7300,151,-984,8101,14861,8049,8274,750,12981,2296,1887,1491,12435,11180,1158,443,19146,23864,17223,2838,2009,13495,10374,2590,-1733,-244,11680,-494,-1375,101,8970,7457,-3367,-1882,-6016,3530,-1739,-1602,-743,8150,5194,-2968,1661,-899,1966,-7765,-832,-507,4789,-548,173,547,-1164,729,-699,-364,6,920,37,18,-188,73,35,-369,14,7,-72],
      [0,-41,208,1,-80,409,0,-15,79,-361,639,-2341,-1272,828,-929,-279,-2,740,5056,-1685,-4581,-2182,620,2529,189,-1354,6472,6700,-2874,-2526,-5708,4834,-9451,-450,-1230,7604,8131,1323,1539,-1210,11031,326,975,581,11521,11129,1107,392,19045,23764,17122,2818,1989,13475,17106,9316,4991,1718,13633,1454,-463,1012,9880,9181,-2713,-556,-2955,4926,1132,-1035,-462,8734,7484,-3800,-57,-5021,4190,-8406,-760,-771,5961,795,-930,2703,-3494,2665,-4559,-1215,355,1356,560,-319,172,1098,-624,332,214,-122,67]
  ],
  [
      [-402,371,-858,-809,739,-1682,-158,144,-327,2616,-1190,-730,-946,-298,4015,896,-980,2698,6331,-2725,-2569,-6378,4834,-8165,-48,-1259,6606,5923,-1059,-1077,-5053,6844,-4318,-523,-984,9868,11715,1692,978,13580,18298,11657,-391,-1220,10265,17499,9710,5384,5860,17775,5596,2920,4395,13263,10526,-1412,1207,2441,10233,7349,334,889,10262,7834,-3430,-2546,-5416,4353,-7550,-842,-896,6950,2898,-1464,-60,-4465,3727,-7482,-1993,-19,5325,924,-490,99,1371,-759,310,-168,-96,935,-85,21,116,-166,40,228,-32,8,44],
      [55,4,-168,109,9,-330,21,2,-64,958,-465,-116,155,-670,3045,-20,-168,919,4009,-785,-6468,-5575,3699,-4430,-85,-819,4438,5362,-2401,-1453,-6137,4167,-4891,-746,-1469,9611,11125,1100,395,4339,9052,2431,-153,-983,10506,17448,9659,5333,5760,17675,5495,2901,4376,13243,11112,-819,1797,11674,19480,16590,95,652,10024,8599,-2079,-2295,-4274,7203,-7137,-600,-354,7037,5008,-2635,437,-6489,4826,-7834,-767,-1125,7803,2577,-1924,3151,1384,-381,-1668,-470,-270,2622,-473,371,-669,-928,727,-1312,-180,141,-251]
  ],
  [
      [155,-289,1083,287,-556,2110,58,-109,412,1065,282,-4242,-2726,2294,-4665,890,-775,1658,4814,-2214,-1222,-5936,3884,-4436,103,-1815,9076,7927,-1797,-2527,-942,4361,-2309,-416,-1132,10349,11380,3591,-735,3159,15074,2894,3480,4955,13822,16731,4800,7417,15213,23019,20129,-1145,-588,8784,12153,1342,833,-112,11105,-3811,288,483,7763,5895,-2786,-774,-7215,4985,-6086,-770,-1187,8258,5326,-2954,1247,-830,796,-1922,-1794,-218,5828,225,103,-1122,-1094,930,-1919,-741,388,-55,110,-53,-14,215,-104,-27,42,-20,-5],
      [-96,33,83,-189,65,163,-37,13,32,743,-50,-1688,-785,808,-2102,62,36,-345,4026,-1782,-1378,-4837,2058,2084,607,-1487,6063,6673,-2502,-4373,-3377,2986,-6051,-860,-1386,9482,8426,635,-3698,106,12018,-176,-102,1373,10237,16680,4749,7365,15112,22918,20028,-1165,-607,8765,15113,4296,3793,2952,14156,-746,3872,4065,11347,7162,-2065,1403,-4947,6566,-2091,-271,-925,9113,5729,-2642,-1416,-2842,2626,-6071,-696,-1449,9286,1066,-324,-1130,-1683,2219,-7013,-1515,473,1533,260,-323,982,508,-634,1934,98,-123,378]
  ]
]};
