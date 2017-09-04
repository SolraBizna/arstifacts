"use strict";
// This is some data that is bulky, but won't change often.
// the good old "Licensed By Eiling Technologies" screen
let INITIAL_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAADwCAMAAADYSUr5AAAAb1BMVEUAAAArKysrK1VAK1VVKysrQFVVQCsrSlUrVStVSisrVVVKVStVVStVVVVVVapVgKqAgICqgFVVlaqAgP+qlVW/gP9Vqqr/gICVqlWqqlWqqqqAv///v4CA3//V1dWA/4D/34CA///f/4D//4D///9tMQ7GAAACxklEQVR42u3aDVfaMBTG8XS+TV0nG06djAos3/8zLrVWmtw0AQ9ntrn/3zkcoBYlz8nbbTUGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAWjQ2qVkU3fwq0/zXCKqCA2hsU6fPqN0pBff/QxrX2EXBHaA2549J56YuuAtYa8xjRndWwQH8ySg6gHYIXKbbf1n0EJCT4I/XNquZBOUyeL/ZbK71LIPhRujZXLsA7l2v17IRCrbCfQCVmq2w3x3azv7XKXriz62KXQCNrfQ0ezgIKvPbBfDNPNtaTb/3psHaPO12u1sXgJqhHy6Ety6AJ7dB0BKA2Ap1AdRuQdDSAWrz9SXULQhqJv4XGYCedXAsADXr4MgQ0LMOynrwYbvd3ihaB0U92AWgZx0U9eCNC+BB0Too6sGr9Xr9U9E6KOtBF8BadT3YBaC4HrxbrVYXmuvBPgC19eCFC+BOcz34ZblcfldWD7Zt9imrB5cyAF314C9BUQDtEDgL239W9B3BXD34lovaZbBV+B3BZD2o445goh5Ud0cQAAAAAACUqb/C213teHsxeN8/5HHrXRzef3xmV433X7Z75TW6a5h3bH/cb2jsnNkGEOsZ8njxAby/F0MjHsD7D+Z13yTfA/Kv/fczu2+UnwPMUXPADAMYzOonWAXU/gsRAADA5Hd6sSrPq3KyO8RgWzw4HlRRcudoP6FYOjQAG+xt5efC8/3Pyd+bfv70am//3o7U8bI6DBqeLJLC4misiJpCADb+pbIB2FwAqTJ7lgH4DZxNAP6fjnyxviE2PgTklaLh+YkArD8EBoFPLADzwQDMRwIw05sEzcGT4NgVomMmwf8+DE4ZQO4x01Wg+AByG5P4RkiuErmN0HHPkwvAZALIb4XFjYN4w+d23wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADASf0Dar/s4UL4wZ0AAAAASUVORK5CYII=";
// the Nx3 FIR filter weights for the hybrid 2-comb/boxcar filter
// precalculated, sorry
let HYBRID_FIR = {"radius":4,
"kernel":[
  [
    [
      [-247,355,-1182,-734,987,-3160,17,-31,117,3578,-1838,82,2898,-1636,823,505,-812,2859,86,741,-4041,-4494,3593,-6716,-1046,315,1121,2645,-1935,3030,-53,-1236,6504,-125,-595,3392,2225,-316,-4207,-921,2201,-8918,-121,-11,374,295,-628,2460,-4172,1422,3618,-638,-274,3082,3439,-1453,-1535,2581,-622,-3565,616,-699,1984,-206,-83,969,-2856,97,6990,-236,-403,2693,0,0,0,0,0,0,0,0,0],
      [659,-858,2689,794,-1103,3599,474,-661,2160,-1193,1450,-4339,-10594,6792,-7192,-2174,330,4002,6695,-4078,3443,3817,-3729,9192,395,-1490,6636,12517,10811,778,7915,20182,-3530,-2062,-159,203,11921,6012,15721,16874,21493,33597,7220,7126,14564,6600,-1268,-5426,5573,4941,-10956,968,-600,2172,-1059,412,656,-10419,5270,186,-1794,-133,5389,3532,299,-10801,2031,1108,-11030,1031,-628,529,0,0,0,0,0,0,0,0,0],
      [-247,355,-1182,-734,987,-3160,17,-31,117,3578,-1838,82,2898,-1636,823,505,-812,2859,86,741,-4041,-4494,3593,-6716,-1046,315,1121,2645,-1935,3030,-53,-1236,6504,-125,-595,3392,2225,-316,-4207,-921,2201,-8918,-121,-11,374,295,-628,2460,-4172,1422,3618,-638,-274,3082,3439,-1453,-1535,2581,-622,-3565,616,-699,1984,-206,-83,969,-2856,97,6990,-236,-403,2693,0,0,0,0,0,0,0,0,0]
    ],
    [
      [0,0,0,0,0,0,0,0,0,2568,-1894,3018,1896,-1834,4472,582,-786,2524,86,741,-4041,-4494,3593,-6716,-1046,315,1121,2645,-1935,3030,-53,-1236,6504,-125,-595,3392,2225,-316,-4207,-921,2201,-8918,-121,-11,374,295,-628,2460,-4172,1422,3618,-638,-274,3082,3439,-1453,-1535,2581,-622,-3565,616,-699,1984,-596,725,-2169,-5297,3396,-3596,-1087,165,2001,-1235,614,75,-1179,576,123,88,-41,-21],
      [0,0,0,0,0,0,0,0,0,-899,1611,-5939,-8055,6932,-14568,-1137,486,481,6695,-4078,3443,3817,-3729,9192,395,-1490,6636,4652,2946,-7087,-4201,8066,-15645,-1271,632,994,11921,6012,15721,16874,21493,33597,7220,7126,14564,14465,6597,2439,17688,17057,1160,177,-1391,1381,-1059,412,656,-10419,5270,186,-1794,-133,5389,7156,-3676,163,5796,-3271,1647,1009,-1625,5718,311,-146,-62,3104,-1547,-171,1237,-606,-123],
      [0,0,0,0,0,0,0,0,0,2568,-1894,3018,1896,-1834,4472,582,-786,2524,86,741,-4041,-4494,3593,-6716,-1046,315,1121,2645,-1935,3030,-53,-1236,6504,-125,-595,3392,2225,-316,-4207,-921,2201,-8918,-121,-11,374,295,-628,2460,-4172,1422,3618,-638,-274,3082,3439,-1453,-1535,2581,-622,-3565,616,-699,1984,-596,725,-2169,-5297,3396,-3596,-1087,165,2001,-1235,614,75,-1179,576,123,88,-41,-21]
    ]
  ],
  [
    [
      [-26,-147,821,-144,-363,2248,-71,-206,1247,86,741,-4041,-4494,3593,-6716,-1046,315,1121,2645,-1935,3030,-53,-1236,6504,-125,-595,3392,2225,-316,-4207,-921,2201,-8918,-121,-11,374,295,-628,2460,-4172,1422,3618,-638,-274,3082,3439,-1453,-1535,2581,-622,-3565,616,-699,1984,-596,725,-2169,-5297,3396,-3596,-1087,165,2001,2723,-733,-3368,2300,-662,-2623,886,-553,523,0,0,0,0,0,0,0,0,0],
      [237,563,-3520,278,954,-5639,-33,-85,526,6695,-4078,3443,3817,-3729,9192,395,-1490,6636,2340,634,-9399,-5896,6371,-17341,-1376,528,889,5318,-591,9119,11077,15696,27800,4542,4448,11886,22058,14190,10032,23443,22812,6915,1906,339,3111,263,1733,1978,-8682,7007,1924,-741,920,6442,7156,-3676,163,5796,-3271,1647,1009,-1625,5718,-1621,863,-197,-9274,3248,7593,-923,-217,3539,0,0,0,0,0,0,0,0,0],
      [-26,-147,821,-144,-363,2248,-71,-206,1247,86,741,-4041,-4494,3593,-6716,-1046,315,1121,2645,-1935,3030,-53,-1236,6504,-125,-595,3392,2225,-316,-4207,-921,2201,-8918,-121,-11,374,295,-628,2460,-4172,1422,3618,-638,-274,3082,3439,-1453,-1535,2581,-622,-3565,616,-699,1984,-596,725,-2169,-5297,3396,-3596,-1087,165,2001,2723,-733,-3368,2300,-662,-2623,886,-553,523,0,0,0,0,0,0,0,0,0]
    ],
    [
      [0,0,0,0,0,0,0,0,0,259,695,-4259,-1979,2728,-8856,-267,83,271,2645,-1935,3030,-53,-1236,6504,-125,-595,3392,2225,-316,-4207,-921,2201,-8918,-121,-11,374,295,-628,2460,-4172,1422,3618,-638,-274,3082,3439,-1453,-1535,2581,-622,-3565,616,-699,1984,-596,725,-2169,-5297,3396,-3596,-1087,165,2001,3348,-2039,1722,1909,-1865,4596,198,-745,3318,85,-59,81,1668,-1157,1582,448,-305,393],
      [0,0,0,0,0,0,0,0,0,2895,-2804,6844,707,-2777,12446,372,-1432,6398,2340,634,-9399,-5896,6371,-17341,-1376,528,889,3352,-2557,7153,-1289,3330,15434,-316,-411,7028,22058,14190,10032,23443,22812,6915,1906,339,3111,2229,3699,3944,3683,19373,14289,4117,5778,11301,7156,-3676,163,5796,-3271,1647,1009,-1625,5718,172,1482,-8081,-8988,7186,-13432,-2092,630,2242,-2463,1701,-2297,-1832,1256,-1664,-107,84,-152],
      [0,0,0,0,0,0,0,0,0,259,695,-4259,-1979,2728,-8856,-267,83,271,2645,-1935,3030,-53,-1236,6504,-125,-595,3392,2225,-316,-4207,-921,2201,-8918,-121,-11,374,295,-628,2460,-4172,1422,3618,-638,-274,3082,3439,-1453,-1535,2581,-622,-3565,616,-699,1984,-596,725,-2169,-5297,3396,-3596,-1087,165,2001,3348,-2039,1722,1909,-1865,4596,198,-745,3318,85,-59,81,1668,-1157,1582,448,-305,393]
    ]
  ],
  [
    [
      [718,-45,-1651,725,-26,-1766,-63,0,166,2645,-1935,3030,-53,-1236,6504,-125,-595,3392,2225,-316,-4207,-921,2201,-8918,-121,-11,374,295,-628,2460,-4172,1422,3618,-638,-274,3082,3439,-1453,-1535,2581,-622,-3565,616,-699,1984,-596,725,-2169,-5297,3396,-3596,-1087,165,2001,3348,-2039,1722,1909,-1865,4596,198,-745,3318,-1236,941,-1606,-5321,2821,-572,-381,0,998,0,0,0,0,0,0,0,0,0],
      [-215,-4,586,-1791,115,4103,-755,32,1815,2340,634,-9399,-5896,6371,-17341,-1376,528,889,3036,-2874,6836,-4619,1,12105,-782,-876,6562,17861,9994,5835,12307,11675,-4222,2162,594,3366,5052,6523,6768,15468,31157,26073,4586,6248,11770,8845,-1986,1853,8478,-589,4328,750,-1884,5459,172,1482,-8081,-8988,7186,-13432,-2092,630,2242,5826,-2617,-1801,5648,-3192,1627,2402,-1715,2534,0,0,0,0,0,0,0,0,0],
      [718,-45,-1651,725,-26,-1766,-63,0,166,2645,-1935,3030,-53,-1236,6504,-125,-595,3392,2225,-316,-4207,-921,2201,-8918,-121,-11,374,295,-628,2460,-4172,1422,3618,-638,-274,3082,3439,-1453,-1535,2581,-622,-3565,616,-699,1984,-596,725,-2169,-5297,3396,-3596,-1087,165,2001,3348,-2039,1722,1909,-1865,4596,198,-745,3318,-1236,941,-1606,-5321,2821,-572,-381,0,998,0,0,0,0,0,0,0,0,0]
    ],
    [
      [0,0,0,0,0,0,0,0,0,455,-761,2727,-1644,-389,6314,-416,-408,3192,2225,-316,-4207,-921,2201,-8918,-121,-11,374,295,-628,2460,-4172,1422,3618,-638,-274,3082,3439,-1453,-1535,2581,-622,-3565,616,-699,1984,-596,725,-2169,-5297,3396,-3596,-1087,165,2001,3348,-2039,1722,1909,-1865,4596,198,-745,3318,1170,317,-4700,-2948,3185,-8670,-688,264,445,-780,772,-1927,-548,545,-1368,-159,167,-444],
      [0,0,0,0,0,0,0,0,0,2829,342,-9177,479,2882,-16094,-100,-106,805,3036,-2874,6836,-4619,1,12105,-782,-876,6562,7718,-150,-4308,3801,3169,-12728,1621,54,2826,5052,6523,6768,15468,31157,26073,4586,6248,11770,18989,8157,11996,16983,7916,12834,1290,-1343,6000,172,1482,-8081,-8988,7186,-13432,-2092,630,2242,5289,-3870,6059,-106,-2473,13008,-251,-1190,6783,218,-231,619,2396,-2394,6044,360,-342,817],
      [0,0,0,0,0,0,0,0,0,455,-761,2727,-1644,-389,6314,-416,-408,3192,2225,-316,-4207,-921,2201,-8918,-121,-11,374,295,-628,2460,-4172,1422,3618,-638,-274,3082,3439,-1453,-1535,2581,-622,-3565,616,-699,1984,-596,725,-2169,-5297,3396,-3596,-1087,165,2001,3348,-2039,1722,1909,-1865,4596,198,-745,3318,1170,317,-4700,-2948,3185,-8670,-688,264,445,-780,772,-1927,-548,545,-1368,-159,167,-444]
    ]
  ],
  [
    [
      [-84,32,55,-1596,629,949,-470,179,312,2225,-316,-4207,-921,2201,-8918,-121,-11,374,295,-628,2460,-4172,1422,3618,-638,-274,3082,3439,-1453,-1535,2581,-622,-3565,616,-699,1984,-596,725,-2169,-5297,3396,-3596,-1087,165,2001,3348,-2039,1722,1909,-1865,4596,198,-745,3318,1170,317,-4700,-2948,3185,-8670,-688,264,445,2371,-1399,990,2505,-2094,4215,1232,-1076,2308,0,0,0,0,0,0,0,0,0],
      [2404,-940,-1464,1856,-713,-1192,41,-25,24,3036,-2874,6836,-4619,1,12105,-782,-876,6562,5990,-1878,-6036,2255,1624,-14273,783,-785,1987,2099,3569,3814,7523,23212,18129,407,2069,7591,23330,12498,16337,23848,14781,19699,5162,2529,9872,513,1822,-7741,-6362,9812,-10806,-946,1775,3388,5289,-3870,6059,-106,-2473,13008,-251,-1190,6783,-2563,2666,-7005,-9331,6540,-9210,-321,-68,1190,0,0,0,0,0,0,0,0,0],
      [-84,32,55,-1596,629,949,-470,179,312,2225,-316,-4207,-921,2201,-8918,-121,-11,374,295,-628,2460,-4172,1422,3618,-638,-274,3082,3439,-1453,-1535,2581,-622,-3565,616,-699,1984,-596,725,-2169,-5297,3396,-3596,-1087,165,2001,3348,-2039,1722,1909,-1865,4596,198,-745,3318,1170,317,-4700,-2948,3185,-8670,-688,264,445,2371,-1399,990,2505,-2094,4215,1232,-1076,2308,0,0,0,0,0,0,0,0,0]
    ],
    [
      [0,0,0,0,0,0,0,0,0,2647,-669,-3495,1953,55,-5404,165,-192,556,295,-628,2460,-4172,1422,3618,-638,-274,3082,3439,-1453,-1535,2581,-622,-3565,616,-699,1984,-596,725,-2169,-5297,3396,-3596,-1087,165,2001,3348,-2039,1722,1909,-1865,4596,198,-745,3318,1170,317,-4700,-2948,3185,-8670,-688,264,445,1518,-1437,3418,-2309,0,6052,-391,-438,3281,48,-178,793,304,-838,3517,22,-33,110],
      [0,0,0,0,0,0,0,0,0,-405,-374,2989,-7283,2003,8782,-1843,-17,4916,5990,-1878,-6036,2255,1624,-14273,783,-785,1987,220,1691,1935,-7418,8271,3188,-1963,-301,5221,23330,12498,16337,23848,14781,19699,5162,2529,9872,2391,3701,-5862,8579,24753,4135,1424,4145,5757,5289,-3870,6059,-106,-2473,13008,-251,-1190,6783,4450,-631,-8415,-1842,4402,-17836,-243,-22,748,-352,898,-3700,-270,787,-3345,-126,413,-1796],
      [0,0,0,0,0,0,0,0,0,2647,-669,-3495,1953,55,-5404,165,-192,556,295,-628,2460,-4172,1422,3618,-638,-274,3082,3439,-1453,-1535,2581,-622,-3565,616,-699,1984,-596,725,-2169,-5297,3396,-3596,-1087,165,2001,3348,-2039,1722,1909,-1865,4596,198,-745,3318,1170,317,-4700,-2948,3185,-8670,-688,264,445,1518,-1437,3418,-2309,0,6052,-391,-438,3281,48,-178,793,304,-838,3517,22,-33,110]
    ]
  ],
  [
    [
      [1255,-737,503,876,-514,353,213,-131,116,295,-628,2460,-4172,1422,3618,-638,-274,3082,3439,-1453,-1535,2581,-622,-3565,616,-699,1984,-596,725,-2169,-5297,3396,-3596,-1087,165,2001,3348,-2039,1722,1909,-1865,4596,198,-745,3318,1170,317,-4700,-2948,3185,-8670,-688,264,445,1518,-1437,3418,-2309,0,6052,-391,-438,3281,-720,1392,-5277,-2969,2870,-6990,49,-109,435,0,0,0,0,0,0,0,0,0],
      [-294,180,-157,-3752,2217,-1577,-642,368,-211,5990,-1878,-6036,2255,1624,-14273,783,-785,1987,-1059,412,656,-10419,5270,186,-1794,-133,5389,15817,4986,8825,15714,6647,11565,5731,3097,10440,8874,10183,620,17936,34110,13492,662,3384,4996,7598,-1561,8369,1672,-694,14786,-226,-1165,6808,4450,-631,-8415,-1842,4402,-17836,-243,-22,748,2914,-2182,3597,2610,-4009,13801,1757,-2112,6266,0,0,0,0,0,0,0,0,0],
      [1255,-737,503,876,-514,353,213,-131,116,295,-628,2460,-4172,1422,3618,-638,-274,3082,3439,-1453,-1535,2581,-622,-3565,616,-699,1984,-596,725,-2169,-5297,3396,-3596,-1087,165,2001,3348,-2039,1722,1909,-1865,4596,198,-745,3318,1170,317,-4700,-2948,3185,-8670,-688,264,445,1518,-1437,3418,-2309,0,6052,-391,-438,3281,-720,1392,-5277,-2969,2870,-6990,49,-109,435,0,0,0,0,0,0,0,0,0]
    ],
    [
      [0,0,0,0,0,0,0,0,0,-561,265,106,-5001,2409,706,-1089,281,1407,3439,-1453,-1535,2581,-622,-3565,616,-699,1984,-596,725,-2169,-5297,3396,-3596,-1087,165,2001,3348,-2039,1722,1909,-1865,4596,198,-745,3318,1170,317,-4700,-2948,3185,-8670,-688,264,445,1518,-1437,3418,-2309,0,6052,-391,-438,3281,2995,-939,-3018,1128,812,-7137,391,-392,994,220,110,-1144,388,139,-1733,231,84,-1040],
      [0,0,0,0,0,0,0,0,0,6832,-3005,-2442,5613,-2120,-3799,855,-785,1803,-1059,412,656,-10419,5270,186,-1794,-133,5389,7801,-3030,809,8060,-1007,3911,2212,-422,6921,8874,10183,620,17936,34110,13492,662,3384,4996,15614,6455,16385,9327,6960,22441,3293,2354,10327,4450,-631,-8415,-1842,4402,-17836,-243,-22,748,591,-1257,4920,-8344,2843,7237,-1275,-548,6165,-563,-179,2398,-1195,-505,5732,80,17,-294],
      [0,0,0,0,0,0,0,0,0,-561,265,106,-5001,2409,706,-1089,281,1407,3439,-1453,-1535,2581,-622,-3565,616,-699,1984,-596,725,-2169,-5297,3396,-3596,-1087,165,2001,3348,-2039,1722,1909,-1865,4596,198,-745,3318,1170,317,-4700,-2948,3185,-8670,-688,264,445,1518,-1437,3418,-2309,0,6052,-391,-438,3281,2995,-939,-3018,1128,812,-7137,391,-392,994,220,110,-1144,388,139,-1733,231,84,-1040]
    ]
  ],
  [
    [
      [-276,233,-475,-1538,1251,-2407,-95,72,-118,3439,-1453,-1535,2581,-622,-3565,616,-699,1984,-596,725,-2169,-5297,3396,-3596,-1087,165,2001,3348,-2039,1722,1909,-1865,4596,198,-745,3318,1170,317,-4700,-2948,3185,-8670,-688,264,445,1518,-1437,3418,-2309,0,6052,-391,-438,3281,2995,-939,-3018,1128,812,-7137,391,-392,994,546,-601,1662,-636,-1238,8041,288,-783,3277,0,0,0,0,0,0,0,0,0],
      [1732,-1394,2639,1407,-1150,2231,680,-566,1131,-1059,412,656,-10419,5270,186,-1794,-133,5389,7156,-3676,163,5796,-3271,1647,1009,-1625,5718,8015,9324,-239,6937,23112,2493,-2558,164,1776,16871,7711,17641,19287,16920,32401,7154,6215,14188,4698,-383,-8166,1460,7705,-14534,319,540,1309,591,-1257,4920,-8344,2843,7237,-1275,-548,6165,854,1935,-12200,-1736,3680,-14396,486,-371,636,0,0,0,0,0,0,0,0,0],
      [-276,233,-475,-1538,1251,-2407,-95,72,-118,3439,-1453,-1535,2581,-622,-3565,616,-699,1984,-596,725,-2169,-5297,3396,-3596,-1087,165,2001,3348,-2039,1722,1909,-1865,4596,198,-745,3318,1170,317,-4700,-2948,3185,-8670,-688,264,445,1518,-1437,3418,-2309,0,6052,-391,-438,3281,2995,-939,-3018,1128,812,-7137,391,-392,994,546,-601,1662,-636,-1238,8041,288,-783,3277,0,0,0,0,0,0,0,0,0]
    ],
    [
      [0,0,0,0,0,0,0,0,0,3365,-1966,1300,2756,-1713,1595,631,-633,1605,-596,725,-2169,-5297,3396,-3596,-1087,165,2001,3348,-2039,1722,1909,-1865,4596,198,-745,3318,1170,317,-4700,-2948,3185,-8670,-688,264,445,1518,-1437,3418,-2309,0,6052,-391,-438,3281,2995,-939,-3018,1128,812,-7137,391,-392,994,-529,206,328,-5210,2635,93,-897,-67,2695,-815,219,1010,-1127,282,1503,114,-29,-148],
      [0,0,0,0,0,0,0,0,0,-1345,1225,-2781,-10343,6700,-7376,-1817,700,1158,7156,-3676,163,5796,-3271,1647,1009,-1625,5718,2364,3674,-5889,-6903,9271,-11347,-2257,465,2077,16871,7711,17641,19287,16920,32401,7154,6215,14188,10349,5267,-2516,15300,21545,-694,18,239,1008,591,-1257,4920,-8344,2843,7237,-1275,-548,6165,6878,-2906,-3070,5163,-1244,-7130,1232,-1398,3968,556,-126,-809,2037,-543,-2547,1062,-274,-1374],
      [0,0,0,0,0,0,0,0,0,3365,-1966,1300,2756,-1713,1595,631,-633,1605,-596,725,-2169,-5297,3396,-3596,-1087,165,2001,3348,-2039,1722,1909,-1865,4596,198,-745,3318,1170,317,-4700,-2948,3185,-8670,-688,264,445,1518,-1437,3418,-2309,0,6052,-391,-438,3281,2995,-939,-3018,1128,812,-7137,391,-392,994,-529,206,328,-5210,2635,93,-897,-67,2695,-815,219,1010,-1127,282,1503,114,-29,-148]
    ]
  ],
  [
    [
      [329,-429,1344,397,-552,1800,237,-330,1080,-596,725,-2169,-5297,3396,-3596,-1087,165,2001,3348,-2039,1722,1909,-1865,4596,198,-745,3318,1170,317,-4700,-2948,3185,-8670,-688,264,445,1518,-1437,3418,-2309,0,6052,-391,-438,3281,2995,-939,-3018,1128,812,-7137,391,-392,994,-529,206,328,-5210,2635,93,-897,-67,2695,1766,150,-5401,1015,554,-5515,516,-314,264,0,0,0,0,0,0,0,0,0],
      [-493,710,-2363,-1468,1975,-6319,35,-63,234,7156,-3676,163,5796,-3271,1647,1009,-1625,5718,172,1482,-8081,-8988,7186,-13432,-2092,630,2242,9046,-113,9817,13439,11072,26553,5748,4810,12783,18515,13434,5651,21723,27968,5729,506,727,1496,2440,593,6770,-6833,4353,8747,-523,205,6917,6878,-2906,-3070,5163,-1244,-7130,1232,-1398,3968,-411,-167,1937,-5711,193,13979,-472,-806,5386,0,0,0,0,0,0,0,0,0],
      [329,-429,1344,397,-552,1800,237,-330,1080,-596,725,-2169,-5297,3396,-3596,-1087,165,2001,3348,-2039,1722,1909,-1865,4596,198,-745,3318,1170,317,-4700,-2948,3185,-8670,-688,264,445,1518,-1437,3418,-2309,0,6052,-391,-438,3281,2995,-939,-3018,1128,812,-7137,391,-392,994,-529,206,328,-5210,2635,93,-897,-67,2695,1766,150,-5401,1015,554,-5515,516,-314,264,0,0,0,0,0,0,0,0,0]
    ],
    [
      [0,0,0,0,0,0,0,0,0,-449,806,-2970,-4028,3466,-7284,-569,243,241,3348,-2039,1722,1909,-1865,4596,198,-745,3318,1170,317,-4700,-2948,3185,-8670,-688,264,445,1518,-1437,3418,-2309,0,6052,-391,-438,3281,2995,-939,-3018,1128,812,-7137,391,-392,994,-529,206,328,-5210,2635,93,-897,-67,2695,3578,-1838,82,2898,-1636,823,505,-812,2859,156,-73,-31,1552,-774,-85,619,-303,-61],
      [0,0,0,0,0,0,0,0,0,5136,-3788,6037,3792,-3668,8943,1164,-1573,5047,172,1482,-8081,-8988,7186,-13432,-2092,630,2242,5436,-3723,6206,3026,659,16140,582,-357,7616,18515,13434,5651,21723,27968,5729,506,727,1496,6050,4203,10380,3580,14766,19160,4643,5371,12084,6878,-2906,-3070,5163,-1244,-7130,1232,-1398,3968,-1193,1450,-4339,-10594,6792,-7192,-2174,330,4002,-2471,1229,151,-2358,1153,247,176,-82,-42],
      [0,0,0,0,0,0,0,0,0,-449,806,-2970,-4028,3466,-7284,-569,243,241,3348,-2039,1722,1909,-1865,4596,198,-745,3318,1170,317,-4700,-2948,3185,-8670,-688,264,445,1518,-1437,3418,-2309,0,6052,-391,-438,3281,2995,-939,-3018,1128,812,-7137,391,-392,994,-529,206,328,-5210,2635,93,-897,-67,2695,3578,-1838,82,2898,-1636,823,505,-812,2859,156,-73,-31,1552,-774,-85,619,-303,-61]
    ]
  ],
  [
    [
      [118,281,-1760,139,477,-2819,-17,-43,263,3348,-2039,1722,1909,-1865,4596,198,-745,3318,1170,317,-4700,-2948,3185,-8670,-688,264,445,1518,-1437,3418,-2309,0,6052,-391,-438,3281,2995,-939,-3018,1128,812,-7137,391,-392,994,-529,206,328,-5210,2635,93,-897,-67,2695,3578,-1838,82,2898,-1636,823,505,-812,2859,-810,432,-98,-4637,1624,3797,-462,-109,1770,0,0,0,0,0,0,0,0,0],
      [-51,-293,1643,-287,-727,4496,-143,-412,2494,172,1482,-8081,-8988,7186,-13432,-2092,630,2242,5289,-3870,6059,-106,-2473,13008,-251,-1190,6783,16102,11020,3237,9819,16063,-6175,-254,-33,736,7474,5626,11803,15526,26712,31106,6352,7079,13792,8016,-1769,-1933,8253,1846,-4040,1116,-1513,3853,-1193,1450,-4339,-10594,6792,-7192,-2174,330,4002,5447,-1465,-6736,4600,-1324,-5245,1771,-1105,1046,0,0,0,0,0,0,0,0,0],
      [118,281,-1760,139,477,-2819,-17,-43,263,3348,-2039,1722,1909,-1865,4596,198,-745,3318,1170,317,-4700,-2948,3185,-8670,-688,264,445,1518,-1437,3418,-2309,0,6052,-391,-438,3281,2995,-939,-3018,1128,812,-7137,391,-392,994,-529,206,328,-5210,2635,93,-897,-67,2695,3578,-1838,82,2898,-1636,823,505,-812,2859,-810,432,-98,-4637,1624,3797,-462,-109,1770,0,0,0,0,0,0,0,0,0]
    ],
    [
      [0,0,0,0,0,0,0,0,0,1448,-1402,3422,353,-1389,6223,186,-716,3199,1170,317,-4700,-2948,3185,-8670,-688,264,445,1518,-1437,3418,-2309,0,6052,-391,-438,3281,2995,-939,-3018,1128,812,-7137,391,-392,994,-529,206,328,-5210,2635,93,-897,-67,2695,3578,-1838,82,2898,-1636,823,505,-812,2859,86,741,-4041,-4494,3593,-6716,-1046,315,1121,-1232,850,-1149,-916,628,-832,-54,42,-76],
      [0,0,0,0,0,0,0,0,0,519,1390,-8518,-3959,5456,-17711,-534,167,541,5289,-3870,6059,-106,-2473,13008,-251,-1190,6783,6592,1511,-6273,-344,5900,-16338,229,450,1220,7474,5626,11803,15526,26712,31106,6352,7079,13792,17525,7741,7577,18416,12009,6123,633,-1997,3370,-1193,1450,-4339,-10594,6792,-7192,-2174,330,4002,6695,-4078,3443,3817,-3729,9192,395,-1490,6636,170,-118,162,3337,-2314,3164,897,-609,786],
      [0,0,0,0,0,0,0,0,0,1448,-1402,3422,353,-1389,6223,186,-716,3199,1170,317,-4700,-2948,3185,-8670,-688,264,445,1518,-1437,3418,-2309,0,6052,-391,-438,3281,2995,-939,-3018,1128,812,-7137,391,-392,994,-529,206,328,-5210,2635,93,-897,-67,2695,3578,-1838,82,2898,-1636,823,505,-812,2859,86,741,-4041,-4494,3593,-6716,-1046,315,1121,-1232,850,-1149,-916,628,-832,-54,42,-76]
    ]
  ],
  [
    [
      [-107,-2,293,-896,58,2051,-377,16,907,1170,317,-4700,-2948,3185,-8670,-688,264,445,1518,-1437,3418,-2309,0,6052,-391,-438,3281,2995,-939,-3018,1128,812,-7137,391,-392,994,-529,206,328,-5210,2635,93,-897,-67,2695,3578,-1838,82,2898,-1636,823,505,-812,2859,86,741,-4041,-4494,3593,-6716,-1046,315,1121,2913,-1308,-900,2824,-1596,814,1201,-858,1267,0,0,0,0,0,0,0,0,0],
      [1436,-90,-3303,1450,-52,-3533,-125,-1,332,5289,-3870,6059,-106,-2473,13008,-251,-1190,6783,4450,-631,-8415,-1842,4402,-17836,-243,-22,748,2654,806,6983,8961,20148,24542,2658,3386,10099,23718,13933,13769,24333,17926,12040,3601,972,6338,-423,2220,-3569,-8448,8937,-5046,-977,1526,5199,6695,-4078,3443,3817,-3729,9192,395,-1490,6636,-2472,1883,-3213,-10642,5641,-1144,-762,0,1996,0,0,0,0,0,0,0,0,0],
      [-107,-2,293,-896,58,2051,-377,16,907,1170,317,-4700,-2948,3185,-8670,-688,264,445,1518,-1437,3418,-2309,0,6052,-391,-438,3281,2995,-939,-3018,1128,812,-7137,391,-392,994,-529,206,328,-5210,2635,93,-897,-67,2695,3578,-1838,82,2898,-1636,823,505,-812,2859,86,741,-4041,-4494,3593,-6716,-1046,315,1121,2913,-1308,-900,2824,-1596,814,1201,-858,1267,0,0,0,0,0,0,0,0,0]
    ],
    [
      [0,0,0,0,0,0,0,0,0,1415,171,-4588,240,1441,-8047,-50,-53,403,1518,-1437,3418,-2309,0,6052,-391,-438,3281,2995,-939,-3018,1128,812,-7137,391,-392,994,-529,206,328,-5210,2635,93,-897,-67,2695,3578,-1838,82,2898,-1636,823,505,-812,2859,86,741,-4041,-4494,3593,-6716,-1046,315,1121,2645,-1935,3030,-53,-1236,6504,-125,-595,3392,109,-116,309,1198,-1197,3022,180,-171,409],
      [0,0,0,0,0,0,0,0,0,911,-1523,5453,-3288,-779,12628,-831,-816,6384,4450,-631,-8415,-1842,4402,-17836,-243,-22,748,1322,-525,5652,-5062,6125,10519,-1176,-449,6264,23718,13933,13769,24333,17926,12040,3601,972,6338,909,3551,-2237,5575,22960,8977,2858,5361,9034,6695,-4078,3443,3817,-3729,9192,395,-1490,6636,2340,634,-9399,-5896,6371,-17341,-1376,528,889,-1560,1543,-3854,-1095,1089,-2737,-318,335,-888],
      [0,0,0,0,0,0,0,0,0,1415,171,-4588,240,1441,-8047,-50,-53,403,1518,-1437,3418,-2309,0,6052,-391,-438,3281,2995,-939,-3018,1128,812,-7137,391,-392,994,-529,206,328,-5210,2635,93,-897,-67,2695,3578,-1838,82,2898,-1636,823,505,-812,2859,86,741,-4041,-4494,3593,-6716,-1046,315,1121,2645,-1935,3030,-53,-1236,6504,-125,-595,3392,109,-116,309,1198,-1197,3022,180,-171,409]
    ]
  ],
  [
    [
      [1202,-470,-732,928,-357,-596,20,-13,12,1518,-1437,3418,-2309,0,6052,-391,-438,3281,2995,-939,-3018,1128,812,-7137,391,-392,994,-529,206,328,-5210,2635,93,-897,-67,2695,3578,-1838,82,2898,-1636,823,505,-812,2859,86,741,-4041,-4494,3593,-6716,-1046,315,1121,2645,-1935,3030,-53,-1236,6504,-125,-595,3392,-1282,1333,-3503,-4665,3270,-4605,-160,-34,595,0,0,0,0,0,0,0,0,0],
      [-168,64,110,-3192,1257,1898,-940,357,624,4450,-631,-8415,-1842,4402,-17836,-243,-22,748,591,-1257,4920,-8344,2843,7237,-1275,-548,6165,17655,7871,7707,14576,8170,2284,4343,1713,7080,5584,8227,2438,16411,33797,19814,2423,4927,8599,8814,-1960,5562,6019,-1528,11394,187,-1698,6428,2340,634,-9399,-5896,6371,-17341,-1376,528,889,4741,-2799,1980,5009,-4188,8429,2464,-2151,4616,0,0,0,0,0,0,0,0,0],
      [1202,-470,-732,928,-357,-596,20,-13,12,1518,-1437,3418,-2309,0,6052,-391,-438,3281,2995,-939,-3018,1128,812,-7137,391,-392,994,-529,206,328,-5210,2635,93,-897,-67,2695,3578,-1838,82,2898,-1636,823,505,-812,2859,86,741,-4041,-4494,3593,-6716,-1046,315,1121,2645,-1935,3030,-53,-1236,6504,-125,-595,3392,-1282,1333,-3503,-4665,3270,-4605,-160,-34,595,0,0,0,0,0,0,0,0,0]
    ],
    [
      [0,0,0,0,0,0,0,0,0,-203,-187,1494,-3642,1001,4391,-921,-8,2458,2995,-939,-3018,1128,812,-7137,391,-392,994,-529,206,328,-5210,2635,93,-897,-67,2695,3578,-1838,82,2898,-1636,823,505,-812,2859,86,741,-4041,-4494,3593,-6716,-1046,315,1121,2645,-1935,3030,-53,-1236,6504,-125,-595,3392,2225,-316,-4207,-921,2201,-8918,-121,-11,374,-176,449,-1850,-135,394,-1673,-63,207,-898],
      [0,0,0,0,0,0,0,0,0,5294,-1338,-6990,3906,110,-10809,331,-384,1112,591,-1257,4920,-8344,2843,7237,-1275,-548,6165,8058,-1726,-1890,6989,582,-5304,2338,-292,5074,5584,8227,2438,16411,33797,19814,2423,4927,8599,18410,7637,15158,13607,6060,18982,2192,307,8433,2340,634,-9399,-5896,6371,-17341,-1376,528,889,3036,-2874,6836,-4619,1,12105,-782,-876,6562,95,-357,1587,608,-1676,7035,44,-65,220],
      [0,0,0,0,0,0,0,0,0,-203,-187,1494,-3642,1001,4391,-921,-8,2458,2995,-939,-3018,1128,812,-7137,391,-392,994,-529,206,328,-5210,2635,93,-897,-67,2695,3578,-1838,82,2898,-1636,823,505,-812,2859,86,741,-4041,-4494,3593,-6716,-1046,315,1121,2645,-1935,3030,-53,-1236,6504,-125,-595,3392,2225,-316,-4207,-921,2201,-8918,-121,-11,374,-176,449,-1850,-135,394,-1673,-63,207,-898]
    ]
  ],
  [
    [
      [-147,90,-78,-1876,1108,-789,-321,184,-105,2995,-939,-3018,1128,812,-7137,391,-392,994,-529,206,328,-5210,2635,93,-897,-67,2695,3578,-1838,82,2898,-1636,823,505,-812,2859,86,741,-4041,-4494,3593,-6716,-1046,315,1121,2645,-1935,3030,-53,-1236,6504,-125,-595,3392,2225,-316,-4207,-921,2201,-8918,-121,-11,374,1457,-1091,1798,1305,-2005,6900,879,-1056,3133,0,0,0,0,0,0,0,0,0],
      [2509,-1473,1006,1751,-1029,706,427,-263,233,591,-1257,4920,-8344,2843,7237,-1275,-548,6165,6878,-2906,-3070,5163,-1244,-7130,1232,-1398,3968,4080,6723,934,6844,24229,10246,-1583,921,4593,20945,10171,17692,21951,14404,27326,6392,4506,12632,2489,784,-9249,-2847,9420,-14291,-463,1441,1802,3036,-2874,6836,-4619,1,12105,-782,-876,6562,-1440,2783,-10554,-5938,5739,-13980,97,-219,871,0,0,0,0,0,0,0,0,0],
      [-147,90,-78,-1876,1108,-789,-321,184,-105,2995,-939,-3018,1128,812,-7137,391,-392,994,-529,206,328,-5210,2635,93,-897,-67,2695,3578,-1838,82,2898,-1636,823,505,-812,2859,86,741,-4041,-4494,3593,-6716,-1046,315,1121,2645,-1935,3030,-53,-1236,6504,-125,-595,3392,2225,-316,-4207,-921,2201,-8918,-121,-11,374,1457,-1091,1798,1305,-2005,6900,879,-1056,3133,0,0,0,0,0,0,0,0,0]
    ],
    [
      [0,0,0,0,0,0,0,0,0,3416,-1502,-1221,2806,-1060,-1899,427,-393,901,-529,206,328,-5210,2635,93,-897,-67,2695,3578,-1838,82,2898,-1636,823,505,-812,2859,86,741,-4041,-4494,3593,-6716,-1046,315,1121,2645,-1935,3030,-53,-1236,6504,-125,-595,3392,2225,-316,-4207,-921,2201,-8918,-121,-11,374,295,-628,2460,-4172,1422,3618,-638,-274,3082,-281,-90,1199,-597,-252,2866,40,8,-147],
      [0,0,0,0,0,0,0,0,0,-1121,530,212,-10001,4819,1412,-2178,562,2815,6878,-2906,-3070,5163,-1244,-7130,1232,-1398,3968,621,3264,-2525,-8030,9355,-4628,-2439,65,3737,20945,10171,17692,21951,14404,27326,6392,4506,12632,5949,4243,-5790,12027,24294,583,394,2297,2658,3036,-2874,6836,-4619,1,12105,-782,-876,6562,5990,-1878,-6036,2255,1624,-14273,783,-785,1987,441,220,-2288,775,279,-3467,462,169,-2081],
      [0,0,0,0,0,0,0,0,0,3416,-1502,-1221,2806,-1060,-1899,427,-393,901,-529,206,328,-5210,2635,93,-897,-67,2695,3578,-1838,82,2898,-1636,823,505,-812,2859,86,741,-4041,-4494,3593,-6716,-1046,315,1121,2645,-1935,3030,-53,-1236,6504,-125,-595,3392,2225,-316,-4207,-921,2201,-8918,-121,-11,374,295,-628,2460,-4172,1422,3618,-638,-274,3082,-281,-90,1199,-597,-252,2866,40,8,-147]
    ]
  ],
  [
    [
      [866,-697,1319,703,-575,1115,340,-283,566,-529,206,328,-5210,2635,93,-897,-67,2695,3578,-1838,82,2898,-1636,823,505,-812,2859,86,741,-4041,-4494,3593,-6716,-1046,315,1121,2645,-1935,3030,-53,-1236,6504,-125,-595,3392,2225,-316,-4207,-921,2201,-8918,-121,-11,374,295,-628,2460,-4172,1422,3618,-638,-274,3082,427,967,-6100,-868,1840,-7198,243,-186,318,0,0,0,0,0,0,0,0,0],
      [-552,465,-950,-3076,2502,-4814,-191,143,-237,6878,-2906,-3070,5163,-1244,-7130,1232,-1398,3968,-1193,1450,-4339,-10594,6792,-7192,-2174,330,4002,12787,2014,9535,15248,7701,20623,6174,4289,12415,13709,12004,1970,19768,32035,8324,-30,1873,2235,5246,-663,9047,-3093,1526,13630,-406,-500,6938,5990,-1878,-6036,2255,1624,-14273,783,-785,1987,1091,-1201,3324,-1271,-2476,16082,576,-1567,6555,0,0,0,0,0,0,0,0,0],
      [866,-697,1319,703,-575,1115,340,-283,566,-529,206,328,-5210,2635,93,-897,-67,2695,3578,-1838,82,2898,-1636,823,505,-812,2859,86,741,-4041,-4494,3593,-6716,-1046,315,1121,2645,-1935,3030,-53,-1236,6504,-125,-595,3392,2225,-316,-4207,-921,2201,-8918,-121,-11,374,295,-628,2460,-4172,1422,3618,-638,-274,3082,427,967,-6100,-868,1840,-7198,243,-186,318,0,0,0,0,0,0,0,0,0]
    ],
    [
      [0,0,0,0,0,0,0,0,0,-673,613,-1391,-5172,3350,-3688,-908,350,579,3578,-1838,82,2898,-1636,823,505,-812,2859,86,741,-4041,-4494,3593,-6716,-1046,315,1121,2645,-1935,3030,-53,-1236,6504,-125,-595,3392,2225,-316,-4207,-921,2201,-8918,-121,-11,374,295,-628,2460,-4172,1422,3618,-638,-274,3082,3439,-1453,-1535,2581,-622,-3565,616,-699,1984,278,-63,-404,1019,-271,-1273,531,-137,-687],
      [0,0,0,0,0,0,0,0,0,6731,-3933,2600,5512,-3426,3190,1263,-1266,3210,-1193,1450,-4339,-10594,6792,-7192,-2174,330,4002,6962,-3811,3710,6559,-987,11934,1498,-387,7739,13709,12004,1970,19768,32035,8324,-30,1873,2235,11071,5162,14872,5595,10215,22319,4271,4176,11615,5990,-1878,-6036,2255,1624,-14273,783,-785,1987,-1059,412,656,-10419,5270,186,-1794,-133,5389,-1630,438,2019,-2254,564,3005,228,-59,-296],
      [0,0,0,0,0,0,0,0,0,-673,613,-1391,-5172,3350,-3688,-908,350,579,3578,-1838,82,2898,-1636,823,505,-812,2859,86,741,-4041,-4494,3593,-6716,-1046,315,1121,2645,-1935,3030,-53,-1236,6504,-125,-595,3392,2225,-316,-4207,-921,2201,-8918,-121,-11,374,295,-628,2460,-4172,1422,3618,-638,-274,3082,3439,-1453,-1535,2581,-622,-3565,616,-699,1984,278,-63,-404,1019,-271,-1273,531,-137,-687]
    ]
  ]
]};
