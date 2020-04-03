'use strict';

const calendar_era_table = [
    [401299, "康和", 1099],
    [402935, "長治", 1104],
    [403731, "嘉承", 1106],
    [404581, "天仁", 1108],
    [405271, "天永", 1110],
    [406392, "永久", 1113],
    [408096, "元永", 1118],
    [408841, "保安", 1120],
    [410311, "天治", 1124],
    [410949, "大治", 1126],
    [412788, "天承", 1131],
    [413359, "長承", 1132],
    [414351, "保延󠄂", 1135],
    [416607, "永治", 1141],
    [416892, "康治", 1142],
    [417565, "天養󠄁", 1144],
    [418067, "久安", 1145],
    [420079, "仁平", 1151],
    [421468, "久壽", 1154],
    [421999, "保元", 1156],
    [423085, "平治", 1159],
    [423371, "永曆", 1160],
    [423954, "應保", 1161],
    [424541, "長寛󠄁", 1163],
    [425343, "永萬", 1165],
    [425779, "仁安", 1166],
    [426735, "嘉應", 1169],
    [427486, "承安", 1171],
    [429028, "安元", 1175],
    [429772, "治承", 1177],
    [431594, "養和", 1181],
    [431537, "壽永", 1182],
    [432235, "元曆", 1184],
    [432705, "文治", 1185],
    [434415, "建久", 1190],
    [437709, "正治", 1199],
    [438375, "建仁", 1201],
    [439475, "元久", 1204],
    [440279, "建永", 1206],
    [440808, "承元", 1207],
    [442062, "建曆", 1211],
    [443063, "建保", 1213],
    [445018, "承久", 1219],
    [446112, "貞應", 1222],
    [447063, "元仁", 1224],
    [447211, "嘉祿", 1225],
    [448177, "安貞", 1227],
    [448614, "寛󠄁喜", 1229],
    [449733, "貞永", 1232],
    [450130, "天福󠄁", 1233],
    [450681, "文曆", 1234],
    [451020, "嘉禎󠄁", 1235],
    [452138, "曆仁", 1238],
    [452248, "延󠄂應", 1239],
    [452759, "仁治", 1240],
    [453714, "寛󠄁元", 1243],
    [455193, "寶治", 1247],
    [455951, "建長", 1249],
    [458683, "康元", 1256],
    [458841, "正嘉", 1257],
    [459591, "正元", 1259],
    [459991, "文應", 1260],
    [460293, "弘長", 1261],
    [461394, "文永", 1264],
    [465467, "建治", 1275],
    [466503, "弘安", 1278],
    [470223, "正應", 1288],
    [472149, "永仁", 1293],
    [474236, "正安", 1299],
    [475531, "乾元", 1302],
    [475811, "嘉元", 1303],
    [477031, "德治", 1307],
    [477705, "延慶", 1308],
    [478611, "應長", 1311],
    [478957, "正和", 1312],
    [480741, "文保", 1317],
    [481534, "元應", 1319],
    [482208, "元亨", 1321],
    [483582, "正中", 1324],
    [484101, "嘉曆", 1326],
    [485314, "元德", 1329],
    [485940, "元弘", 1331],
    [486939, "建武", 1334],
    [488620, "曆應", 1338],
    [489949, "康永", 1342],
    [491212, "貞和", 1345],
    [492813, "觀應", 1350],
    [493758, "文和", 1352],
    [495030, "延文", 1356],
    [496861, "康安", 1361],
    [497386, "貞治", 1362],
    [499360, "應安", 1368],
    [501929, "永和", 1375],
    [503410, "康曆", 1379],
    [504121, "永德", 1381],
    [505216, "至德", 1384],
    [506511, "嘉慶", 1387],
    [507030, "康應", 1389],
    [507431, "明德", 1390],
    [509004, "應永", 1394],
    [509004, "應永", 1394],
    [521370, "正長", 1428],
    [521850, "永享", 1429],
    [526026, "嘉吉", 1441],
    [527107, "文安", 1444],
    [529107, "寳德", 1449],
    [530197, "享德", 1452],
    [531319, "康正", 1455],
    [532090, "長祿", 1457],
    [533294, "寛正", 1461],
    [535161, "文正", 1466],
    [535552, "應仁", 1467],
    [536343, "文明", 1469],
    [542979, "長享", 1487],
    [543748, "延德", 1489],
    [544808, "明應", 1492],
    [547949, "文龜", 1501],
    [549043, "永正", 1504],
    [555443, "大永", 1521],
    [557980, "享祿", 1528],
    [559436, "天文", 1532],
    [567906, "弘治", 1555],
    [568768, "永祿", 1558],
    [573221, "元龜", 1570],
    [574407, "天正", 1573],
    [581475, "文祿", 1592],
    [582911, "慶長", 1596],
    [589748, "元和", 1615],
    [592895, "寛永", 1624],
    [600471, "正保", 1644],
    [601651, "慶安", 1648],
    [603308, "承應", 1652],
    [604248, "明曆", 1655],
    [605439, "萬治", 1658],
    [606445, "寛文", 1661],
    [610988, "延寳", 1673],
    [613920, "天和", 1681],
    [614798, "貞享", 1684],
    [616460, "元祿", 1688],
    [622113, "寶永", 1704],
    [624725, "正徳", 1711],
    [626611, "享保", 1716],
    [633853, "元文", 1736],
    [635623, "寛保", 1741],
    [636710, "延享", 1744],
    [638295, "寛延", 1748],
    [639521, "寶曆", 1751],
    [644103, "明和", 1764],
    [647188, "安永", 1772],
    [650246, "天明", 1781],
    [653103, "寛政", 1789],
    [657513, "享和", 1801],
    [658612, "文化", 1804],
    [663790, "文政", 1818],
    [668415, "天保", 1830],
    [673515, "弘化", 1844],
    [674693, "嘉永", 1848],
    [677173, "安政", 1854],
    [679083, "萬延", 1860],
    [679438, "文久", 1861],
    [679438, "文久", 1861],
    [680532, "元治", 1864],
    [680932, "慶應", 1865],
    [682203, "明治", 1868],
    [698188, "大正", 1912],
    [703449, "昭和", 1926],
    [726109, "平成", 1989],
    [737179, "令和", 2019],
];
const calendar_era_table2 = [
    [486263, "正慶", 1332],
    [486655, null, 1333],
    [487707, "延元", 1336],
    [489212, "興国", 1340],
    [491643, "正平", 1346],
    [503539, "建德", 1370],
    [500879, "文中", 1372], // 改元日不明
    [502027, "天授", 1375],
    [504107, "弘和", 1381],
    [505276, "元中", 1384],
    [508383, null, 1392],
];
const event_table = [
    [423371, false, "永曆改元"],
    [423954, false, "應保改元"],
    [424541, false, "長寛󠄁改元"],
    [425343, false, "永萬改元"],
    [425779, false, "仁安改元"],
    [425941, false, "平清盛内大臣昇進"],
    [426735, false, "嘉應改元"],
    [427486, false, "承安改元"],
    [429028, false, "安元改元"],
    [429772, false, "治承改元"],
    [431594, false, "養和改元"],
    [431537, false, "壽永改元"],
    [432235, false, "元曆改元"],
    [432705, false, "文治改元"],
    [432568, false, "平氏滅亡"],
    [432808, false, "鎌倉幕府成立(文治の勅許)"],
    [434415, false, "建久改元"],
    [437709, false, "正治改元"],
    [438375, false, "建仁改元"],
    [439475, false, "元久改元"],
    [440279, false, "建永改元"],
    [440808, false, "承元改元"],
    [442062, false, "建曆改元"],
    [443063, false, "建保改元"],
    [445018, false, "承久改元"],
    [446112, false, "貞應改元"],
    [447063, false, "元仁改元"],
    [447211, false, "嘉祿改元"],
    [448177, false, "安貞改元"],
    [448614, false, "寛󠄁喜改元"],
    [449733, false, "貞永改元"],
    [450130, false, "天福󠄁改元"],
    [450681, false, "文曆改元"],
    [451020, false, "嘉禎󠄁改元"],
    [452138, false, "曆仁改元"],
    [452248, false, "延󠄂應改元"],
    [452759, false, "仁治改元"],
    [453714, false, "寛󠄁元改元"],
    [455193, false, "寶治改元"],
    [455951, false, "建長改元"],
    [458683, false, "康元改元"],
    [458841, false, "正嘉改元"],
    [459591, false, "正元改元"],
    [459991, false, "文應改元"],
    [460293, false, "弘長改元"],
    [461394, false, "文永改元"],
    [465467, false, "建治改元"],
    [466503, false, "弘安改元"],
    [470223, false, "正應改元"],
    [472149, false, "永仁改元"],
    [474236, false, "正安改元"],
    [475531, false, "乾元改元"],
    [475811, false, "嘉元改元"],
    [477031, false, "德治改元"],
    [477705, false, "延慶改元"],
    [478611, false, "應長改元"],
    [478957, false, "正和改元"],
    [480741, false, "文保改元"],
    [481534, false, "元應改元"],
    [482208, false, "元亨改元"],
    [483582, false, "正中改元"],
    [484101, false, "嘉曆改元"],
    [485314, false, "元德改元"],
    [485940, false, "元弘改元"],
    [486263, false, "正慶改元(幕府)"],
    [486655, false, "鎌倉幕府滅亡"],
    [486939, false, "建武改元"],
    [486695, false, "建武の新政"],
    [487707, false, "延元改元(南朝)"],
    [487950, false, "室町幕府成立(建武式目)"],
    [488620, false, "曆應改元(北朝)"],
    [489212, false, "興国改元(南朝)"],
    [489949, false, "康永改元(北朝)"],
    [491212, false, "貞和改元(北朝)"],
    [491643, false, "正平改元(南朝)"],
    [492813, false, "觀應改元(北朝)"],
    [493758, false, "文和改元(北朝)"],
    [495030, false, "延文改元(北朝)"],
    [496861, false, "康安改元(北朝)"],
    [497386, false, "貞治改元(北朝)"],
    [499360, false, "應安改元(北朝)"],
    [501929, false, "永和改元(北朝)"],
    [502027, false, "天授改元(南朝)"],
    [503410, false, "康曆改元(北朝)"],
    [503539, false, "建德改元(南朝)"],
    [504107, false, "弘和改元(南朝)"],
    [504121, false, "永德改元(北朝)"],
    [505216, false, "至德改元(北朝)"],
    [505276, false, "元中改元(南朝)"],
    [506511, false, "嘉慶改元(北朝)"],
    [507030, false, "康應改元(北朝)"],
    [507431, false, "明德改元(北朝)"],
    [509004, false, "應永改元"],
    [521370, false, "正長改元"],
    [521850, false, "永享改元"],
    [526026, false, "嘉吉改元"],
    [527107, false, "文安改元"],
    [529107, false, "寳德改元"],
    [530197, false, "享德改元"],
    [531319, false, "康正改元"],
    [532090, false, "長祿改元"],
    [533294, false, "寛正改元"],
    [535161, false, "文正改元"],
    [535552, false, "應仁改元"],
    [536343, false, "文明改元"],
    [542979, false, "長享改元"],
    [543748, false, "延德改元"],
    [544808, false, "明應改元"],
    [547949, false, "文龜改元"],
    [549043, false, "永正改元"],
    [555443, false, "大永改元"],
    [557980, false, "享祿改元"],
    [559436, false, "天文改元"],
    [567906, false, "弘治改元"],
    [568768, false, "永祿改元"],
    [573221, false, "元龜改元"],
    [574369, false, "室町幕府滅亡"],
    [574407, false, "天正改元"],
    [577735, false, "新暦改暦(イタリア)"],    // 1582-10-15
    [581475, false, "文祿改元"],
    [582911, false, "慶長改元"],
    [585200, false, "江戸幕府成立"],
    [589748, false, "元和改元"],
    [592895, false, "寛永改元"],
    [600471, false, "正保改元"],
    [601651, false, "慶安改元"],
    [603308, false, "承應改元"],
    [604248, false, "明曆改元"],
    [605439, false, "萬治改元"],
    [606445, false, "寛文改元"],
    [610988, false, "延寳改元"],
    [613920, false, "天和改元"],
    [614798, false, "貞享改元"],
    [615103, false, "貞享暦改暦"],
    [616460, false, "元祿改元"],
    [622113, false, "寶永改元"],
    [624725, false, "正徳改元"],
    [626611, false, "享保改元"],
    [633853, false, "元文改元"],
    [635623, false, "寛保改元"],
    [636710, false, "延享改元"],
    [638295, false, "寛延改元"],
    [639521, false, "寶曆改元"],
    [640676, false, "寶曆暦改暦"],
    [644103, false, "明和改元"],
    [647188, false, "安永改元"],
    [650246, false, "天明改元"],
    [653103, false, "寛政改元"],
    [656387, false, "寛政暦改暦"],
    [657513, false, "享和改元"],
    [658612, false, "文化改元"],
    [663790, false, "文政改元"],
    [668415, false, "天保改元"],
    [673189, false, "天保暦改暦"],
    [673515, false, "弘化改元"],
    [674693, false, "嘉永改元"],
    [677173, false, "安政改元"],
    [679083, false, "萬延改元"],
    [679438, false, "文久改元"],
    [680532, false, "元治改元"],
    [680932, false, "慶應改元"],
    [681909, false, "明治政府樹立"],
    [682192, false, "即位の礼"],            // 1868-10-12
    [682203, false, "明治改元"],
    [683734, false, "太陽暦改暦"],
    [698188, false, "大正改元"],
    [698233, false, "大喪の礼"],            // 1912-09-13
    [699386, false, "即位の礼"],            // 1915-11-10
    [699390, true, "大嘗祭"],
    [699392, true, "大饗"],
    [703449, false, "昭和改元"],
    [703493, false, "大喪の礼"],            // 1927-02-07
    [704135, false, "即位の礼"],            // 1928-11-10
    [704139, true, "大嘗祭"],
    [704141, true, "大饗"],
    [715243, true, "明仁親王の結婚の儀"], // 1959-04-10
    [726109, false, "平成改元"],
    [726156, true, "大喪の礼"],            // 1989-02-24
    [726782, true, "即位の礼正殿の儀"],   // 1990-11-12
    [727722, true, "徳仁親王の結婚の儀"], // 1993-06-09
    [733671, true, "国民の休日"],          // 2009-09-22
    [735862, true, "国民の休日"],          // 2015-09-22
    [737178, true, "国民の休日"],          // 2019-04-30
    [737179, true, "天皇の即位の日"],      // 2019-05-01
    [737179, false, "令和改元"],
    [737180, true, "国民の休日"],          // 2019-05-02
    [737353, true, "即位の礼正殿の儀"],    // 2019-10-22
    [737628, true, "海の日"],              // 2020-07-23
    [737629, true, "スポーツの日"],        // 2020-07-24
];
const holiday_table = [
    [1, 1, -1, 1615, 1869, "元日"],
    [1, 7, -1, 1615, 1874, "人日"],
    [3, 3, -1, 1615, 1874, "上巳"],
    [5, 5, -1, 1615, 1874, "端午"],
    [7, 7, -1, 1615, 1874, "七夕"],
    [7, 15, -1, 1615, 1874, "盆"],
    [9, 9, -1, 1615, 1874, "重陽"],

    [1, 1, -1, 1869, 1949, "四方節"],
    [1, 3, -1, 1874, 1949, "元始祭"],
    [1, 5, -1, 1874, 1949, "新年宴会"],
    [2, 11, -1, 1874, 1949, "紀元節"],
    [4, 3, -1, 1874, 1949, "神武天皇祭"],
    [4, 29, -1, 1927, 1949, "天長節"],
    [7, 30, -1, 1913, 1926, "明治天皇祭"],
    [8, 31, -1, 1913, 1927, "天長節"],
    [9, 17, -1, 1874, 1879, "神嘗祭"],
    [10, 17, -1, 1879, 1948, "神嘗祭"],
    [10, 31, -1, 1913, 1927, "天長節祝日"],
    [11, 3, -1, 1874, 1912, "天長節"],
    [11, 3, -1, 1927, 1948, "明治節"],
    [11, 23, -1, 1874, 1948, "新嘗祭"],
    [12, 25, -1, 1927, 1948, "大正天皇祭"],

    [1, 1, -1, 1949, 9999, "元日"],
    [1, 15, -1, 1949, 2000, "成人の日"],
    [1, 2, 1, 2000, 9999, "成人の日"],
    [2, 11, -1, 1967, 9999, "建国記念の日"],
    [4, 29, -1, 1949, 1989, "天皇誕生日"],
    [4, 29, -1, 1989, 2007, "みどりの日"],
    [4, 29, -1, 2007, 9999, "昭和の日"],
    [5, 3, -1, 1949, 9999, "憲法記念日"],
    [5, 4, -1, 1988, 1992, "国民の休日"],
    [5, 4, -1, 1993, 1997, "国民の休日"],
    [5, 4, -1, 1999, 2003, "国民の休日"],
    [5, 4, -1, 2004, 2007, "国民の休日"],
    [5, 4, -1, 2007, 9999, "みどりの日"],
    [5, 5, -1, 1949, 9999, "こどもの日"],
    [7, 20, -1, 1996, 2003, "海の日"],
    [7, 3, 1, 2003, 2020, "海の日"],
    [7, 3, 1, 2021, 9999, "海の日"],
    [8, 11, -1, 2016, 9999, "山の日"],
    [9, 15, -1, 1966, 2003, "敬老の日"],
    [9, 3, 1, 2003, 9999, "敬老の日"],
    [10, 10, -1, 1966, 2000, "体育の日"],
    [10, 2, 1, 2000, 2020, "体育の日"],
    [10, 2, 1, 2021, 9999, "スポーツの日"],
    [11, 3, -1, 1948, 9999, "文化の日"],
    [11, 23, -1, 1948, 9999, "勤労感謝の日"],
    [12, 23, -1, 1989, 2019, "天皇誕生日"],
    [2, 23, -1, 2020, 9999, "天皇誕生日"],
];
