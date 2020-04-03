'use strict';


const year_table = [0, 1,31, 2,28, 3,31, 4,30, 5,31, 6,30, 7,31, 8,31, 9,30, 10,31, 11,30, 12,31];
const leapyear_table = [0, 1,31, 2,29, 3,31, 4,30, 5,31, 6,30, 7,31, 8,31, 9,30, 10,31, 11,30, 12,31];

const mon_yday = [
    /* Normal years.  */
    [ 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365 ],
    /* Leap years.  */
    [ 0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366 ],
];
const weekday = "日月火水木金土";
const ganzhi10 = "甲乙丙丁戊已庚辛壬癸";
const ganzhi12 = "子丑寅卯辰巳午未申酉戌亥";

let year_calendar = false;
let today_ymd = get_today_ymd();

function $(id)
{
    return document.getElementById(id);
}
function $e(name, attr, c)
{
    const e = document.createElement(name);
    if (attr) {
        for (let k in attr) {
            e.setAttribute(k, attr[k]);
        }
    }
    if (c) {
        if (typeof c === 'object') {
            e.appendChild(c);
        } else {
            e.textContent = c;
        }
    }
    return e;
}
function $clear(n)
{
    while (n.firstChild) {
        n.removeChild(n.firstChild);
    }
}

function get_today_ymd()
{
    const d = new Date();
    return {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate(),
    };
}

// i2 > 0
function d_mod(i1, i2)
{
    const m = i1 % i2;
    if (m < 0) {
        return m + i2;
    }
    return m;
}
function is_leap_year(year)
{
    return (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
}
function leaps_thru_end_of(y)
{
    return Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400);
}
function is_juli_leap_year(year)
{
    return year % 4 == 0;
}
function juli_leaps_thru_end_of(y)
{
    return Math.floor(y / 4);
}
function year_index_to_year(y)
{
    return y - calendar_old_table.length + 1873;
}
function to_month_text(num)
{
    const n = Math.floor(num);
    if (n + 0.25 < num) {
        return `閏${n}`;
    } else {
        return `${n}`;
    }
}

function ymd_to_jd(year, month, day)
{
    let y = year;
    let m = month - 2;
    let d = day;

    // 1～12 → 11,12(last year), 1, 2, .. 10
    // 月が1～12の範囲外の場合、正規化する
    if (m > 12) {
        m--;
        y += Math.floor(m / 12);
        m = m % 12;
        m++;
    } else if (m <= 0) {
        m--;
        y += Math.ceil((m + 1) / 12) - 1;
        m = m % 12;
        if (m != 0) {
            m += 12;
        }
        m++;
    }
    // ユリウス通日 (0001-01-01 == 0)
    return Math.floor(36525 * y / 100) + Math.floor(y / 400) - Math.floor(y / 100) + Math.floor(3059 * m / 100) + d - 337;
}
function calendar_to_jd(year_index, month_index, day)
{
    if (year_index < calendar_old_table.length) {
        const table = calendar_old_table[year_index];
        let jd = table[0];

        for (let i = 0; i < month_index; i++) {
            jd += table[i * 2 + 2];
        }
        jd += day - 1;
        return jd;
    } else {
        return ymd_to_jd(year_index_to_year(year_index), month_index + 1, day);
    }
}
function jd_to_greg_ymd(jd)
{
    let y = 1582;
    jd -= 577448;
    while (jd < 0 || jd >= (is_leap_year(y) ? 366 : 365)) {
        const yg = y + Math.floor(jd / 365);
        jd -= ((yg - y) * 365 + leaps_thru_end_of(yg - 1) - leaps_thru_end_of(y - 1));
        y = yg;
    }

    const dt = {}
    dt.year = y;
    dt.day_from_newyear = jd;

    const ip = mon_yday[is_leap_year(y) ? 1 : 0];
    let month = 11;
    while (jd < ip[month]) {
        month--;
    }

    jd -= ip[month];
    dt.month = month + 1;
    dt.day = jd + 1;

    return dt;
}
function jd_to_juli_ymd(jd)
{
    let y = 1;
    jd += 2;
    while (jd < 0 || jd >= (is_juli_leap_year(y) ? 366 : 365)) {
        const yg = y + Math.floor(jd / 365);
        jd -= ((yg - y) * 365 + juli_leaps_thru_end_of(yg - 1) - juli_leaps_thru_end_of(y - 1));
        y = yg;
    }

    const dt = {}
    dt.year = y;
    dt.day_from_newyear = jd;

    const ip = mon_yday[is_juli_leap_year(y) ? 1 : 0];
    let month = 11;
    while (jd < ip[month]) {
        month--;
    }

    jd -= ip[month];
    dt.month = month + 1;
    dt.day = jd + 1;

    return dt;
}
function jd_to_ymd(jd)
{
    if (jd < 577735) {  // 1582-10-15
        return jd_to_juli_ymd(jd);
    } else {
        return jd_to_greg_ymd(jd);
    }
}

function get_era_name(year_index, month_begin, month_end)
{
    function get_era_table(tbl, jd)
    {
        if (tbl[0][0] > jd) {
            return null;
        }
        for (let i = tbl.length - 1; i >= 0; i--) {
            if (tbl[i][0] <= jd) {
                return tbl[i];
            }
        }
        return null;
    }
    const jd_month_begin = calendar_to_jd(year_index, month_begin, 1);
    const jd_month_end = calendar_to_jd(year_index, month_end, 0);
    const era_begin = get_era_table(calendar_era_table, jd_month_begin);
    const era_end = get_era_table(calendar_era_table, jd_month_end);
    const era_begin2 = get_era_table(calendar_era_table2, jd_month_begin);
    const era_end2 = get_era_table(calendar_era_table2, jd_month_end);
    const year_i = year_index_to_year(year_index);

    let result;
    if (era_begin != null) {
        if (year_i == era_begin[2]) {
            result = era_begin[1] + "元年";
        } else {
            result = era_begin[1] + (year_i - era_begin[2] + 1) + "年";
        }
        if (era_begin != era_end) {
            result += "〜" + era_end[1] + "元年";
        }
    } else if (era_end != null) {
        result = era_end[1] + "元年";
    } else {
        result = "";
    }
    if (era_begin2 != null && era_begin2[1] != null) {
        result += (year_i >= 1336 ? "(北朝) / " : "(後醍醐天皇) / ");
        if (year_i == era_begin2[2]) {
            result += era_begin2[1] + "元年";
        } else {
            result += era_begin2[1] + (year_i - era_begin2[2] + 1) + "年";
        }
        if (era_begin != era_end) {
            result += "〜" + era_end[1] + "元年";
        }
        result += (year_i >= 1336 ? "(南朝)" : "(鎌倉幕府)");
    } else if (era_end2 != null && era_end2[1] != null) {
        result += (year_i >= 1336 ? "(北朝) / " : "(後醍醐天皇) / ");
        result += era_end2[1] + (year_i >= 1336 ? "元年(南朝)" : "元年(鎌倉幕府)");
    }
    return result;
}
function get_calendar_table(year_index)
{
    if (year_index < calendar_old_table.length) {
        // 旧暦
        return calendar_old_table[year_index];
    } else {
        // 新暦
        var year_i = year_index_to_year(year_index);
        if (is_leap_year(year_i)) {
            return leapyear_table;
        } else {
            return year_table;
        }
    }
}

// 西暦改暦後の旧暦
function get_new_old_date(year_i, day_from_newyear)
{
    if (year_i < 1873 || year_i - 1873 >= calendar_new_old_table.length) {
        return null;
    }
    const o = {};
    const table = calendar_new_old_table[year_i - 1873];
    o.table = table;
    o.month_index = 0;
    o.day = table[1];
    day_from_newyear += o.day;

    while (day_from_newyear > 0) {
        const month_days = table[o.month_index * 2 + 3];
        if (day_from_newyear <= month_days) {
            o.month = table[o.month_index * 2 + 2];
            o.day = day_from_newyear;
            return o;
        }
        day_from_newyear -= table[o.month_index * 2 + 3];
        o.month_index++;
    }
    return null;
}
function next_new_old_date(o)
{
    if (o.month_index * 2 + 3 >= o.table.length) {
        o.day++;
        return;
    }
    const month_days = o.table[o.month_index * 2 + 3];
    if (o.day < month_days) {
        o.day++;
    } else {
        o.day = 1;
        o.month_index++;
        o.month = o.table[o.month_index * 2 + 2];
    }
}
function find_event_table_index(jd)
{
    let lb = 0;
    let ub = event_table.length - 1;

    while (lb <= ub) {
        var m = (lb + ub) >> 1;
        var f = event_table[m][0];

        if (jd === f) {
            while (m > 0 && event_table[m - 1][0] === jd) {
                m--;
            }
            return m;
        }
        if (jd < f) {
            ub = m - 1;
        } else {
            lb = m + 1;
        }
    }
    return -1;
}
function get_holiday_table(year_i, month_i)
{
    // 春分
    function vernal_equinox(year)
    {
        // 1879年以降
        const mod = year % 4;
        if (year < 1892) {
            return mod < 3 ? 20 : 21;
        } else if (year < 1923) {
            return mod < 3 ? 21 : 22;
        } else if (year < 1960) {
            return 21;
        } else if (year < 1991) {
            return mod < 1 ? 20 : 21;
        } else if (year < 2024) {
            return mod < 2 ? 20 : 21;
        } else if (year < 2056) {
            return mod < 3 ? 20 : 21;
        } else {
            return -1;
        }
    }
    // 秋分
    function autumnal_equinox(year)
    {
        // 1879年以降
        const mod = year % 4;
        if (year < 1887) {
            return mod < 23;
        } else if (year < 1900) {
            return mod < 1 ? 22 : 23;
        } else if (year < 1920) {
            return mod < 1 ? 23 : 24;
        } else if (year < 1948) {
            return mod < 2 ? 23 : 24;
        } else if (year < 1980) {
            return mod < 3 ? 23 : 24;
        } else if (year < 2012) {
            return 23;
        } else if (year < 2044) {
            return mod < 1 ? 22 : 23;
        } else {
            return -1;
        }
    }
    const t = [];
    for (let i = 0; i < holiday_table.length; i++) {
        const tmp = holiday_table[i];
        if (tmp[0] == month_i && tmp[3] <= year_i && tmp[4] > year_i) {
            t.push(tmp);
        }
    }
    // 春分・秋分
    if (year_i >= 1879) {
        if (month_i == 3) {
            t.push([3, vernal_equinox(year_i), -1, 0, 0, year_i < 1948 ? "春季皇霊祭" : "春分の日"]);
        } else if (month_i == 9) {
            t.push([9, autumnal_equinox(year_i), -1, 0, 0, year_i < 1948 ? "秋季皇霊祭" : "秋分の日"]);
        }
    }
    return t;
}

///////////////////////////////////////////////////////////////////////////////////////////

function create_table(cal, jd)
{
    let day_list = [];
    let width = 0, height = 0, additional = false;

    $clear(cal);

    if (jd < 682196) {
        let tr = $e('tr');
        for (let i = 0; i < 5; i++) {
            tr.appendChild($e('th', null, '-'));
        }
        tr.appendChild($e('th', {'class': 'holiday'}, '常假'));
        cal.appendChild(tr);
        width = 6;
        height = 5;
    } else if (jd < 683734) {    // 1873-01-01 明治改暦
        let tr = $e('tr');
        tr.appendChild($e('th', {'class': 'holiday'}, '公休'));
        for (let i = 0; i < 4; i++) {
            tr.appendChild($e('th', null, '-'));
        }
        cal.appendChild(tr);
        width = 5;
        height = 6;
    } else if (jd < 684889) {
        let tr = $e('tr');
        tr.appendChild($e('th', {'class': 'holiday'}, '公休'));
        for (let i = 0; i < 5; i++) {
            tr.appendChild($e('th', null, '-'));
        }
        cal.appendChild(tr);
        width = 5;
        height = 6;
        additional = true;
    } else {
        let tr = $e('tr');
        tr.appendChild($e('th', {'class': 'holiday'}, '日'));
        tr.appendChild($e('th', null, '月'));
        tr.appendChild($e('th', null, '火'));
        tr.appendChild($e('th', null, '水'));
        tr.appendChild($e('th', null, '木'));
        tr.appendChild($e('th', null, '金'));
        tr.appendChild($e('th', {'class': 'saturday'}, '土'));
        cal.appendChild(tr);
        width = 7;
        height = 6;
    }

    if (width > 0 && height > 0) {
        for (let row = 0; row < height; row++) {
            let tr = $e('tr');
            for (let col = 0; col < width; col++) {
                let tmp = $e('td');
                day_list.push(tmp);
                tr.appendChild(tmp);
            }
            if (additional) {
                let tmp = $e('td');
                if (row == 5) {
                    day_list.push(tmp);
                } else {
                }
                tr.appendChild(tmp);
            }
            cal.appendChild(tr);
        }
    }
    return day_list;
}

function update_month_list(year_index, month_index)
{
    let month_table = get_calendar_table(year_index);
    let month_length = month_table.length / 2 - 1;
    let month = $('month');
    $clear(month);
    for (let i = 0; i < month_length; i++) {
        month.appendChild($e('option', {value: i}, to_month_text(month_table[i * 2 + 1]) + "月"));
    }
    if (month_index < 0) {
        month_index += month.childNodes.length;
    }
    month.value = month_index;
}
function render_month_calendar(calendar, year_index, month_index, large_style)
{
    let year_i = year_index_to_year(year_index);
    let month_table = get_calendar_table(year_index);
    let jd = calendar_to_jd(year_index, month_index, 1);
    let ymd = jd_to_ymd(jd);
    let month_i = month_table[month_index * 2 + 1];
    let day_month = month_table[month_index * 2 + 2];

    let day_cell_list = create_table(calendar, jd);

    let idx = 0;
    if (jd >= 684889) {
        idx = (jd + 1) % 7;
    } else {
        idx = 0;
    }

    let old_date = get_new_old_date(year_i, ymd.day_from_newyear);
    let holidays = get_holiday_table(year_i, month_i);

    // 振替休日 (月をまたいだ場合は未対応)
    let substitute = false;
    let substitute_next = false;

    for (let day = 1; day <= day_month; day++) {
        let d = $e('div', {'class': 'day'}, day);
        let cell = day_cell_list[idx];
        let is_holiday = false;
        let text = null;
        cell.appendChild(d);

        if (old_date != null) {
            // 旧暦
            text = `旧暦:${to_month_text(old_date.month)}/${old_date.day}`;
            next_new_old_date(old_date);
        } else {
            // 西暦
            let tmp = $e('div', {'class': 'new-style'});
            let dt = jd_to_ymd(jd);
            text = `西暦:${dt.year}/${dt.month}/${dt.day}(${weekday.charAt((jd + 1) % 7)})`;
        }
        if (large_style) {
            cell.appendChild($e('div', {'class': 'new-style'}, text));
        } else {
            cell.setAttribute('title', text);
        }

        let i = find_event_table_index(jd);
        if (i >= 0) {
            while (i < event_table.length) {
                let tmp = event_table[i];
                if (tmp[0] !== jd) {
                    break;
                }
                if (tmp[1]) {
                    if (large_style) {
                        cell.appendChild($e('div', {'class': 'holiday'}, tmp[2]));
                    }
                    is_holiday = true;
                } else {
                    if (large_style) {
                        cell.appendChild($e('div', null, tmp[2]));
                    }
                }
                i++;
            }
        }
        let week = Math.floor((day - 1) / 7) + 1;
        for (let i = 0; i < holidays.length; i++) {
            let tmp = holidays[i];
            if (tmp[2] < 0) {
                if (day === tmp[1]) {
                    if (large_style) {
                        cell.appendChild($e('div', {'class': 'holiday'}, tmp[5]));
                    }
                    is_holiday = true;
                    // 振替休日
                    if (jd >= 720258 && idx % 7 == 0) {  // 1973-01-01
                        substitute_next = true;
                    }
                }
            } else {
                if (week === tmp[1] && idx % 7 === tmp[2]) {
                    if (large_style) {
                        cell.appendChild($e('div', {'class': 'holiday'}, tmp[5]));
                    }
                    is_holiday = true;
                }
            }
        }

        if (jd < 682203) {
            if (day % 6 == 0 || day === day_month) {
                is_holiday = true;
            }
        } else if (jd < 684900) {
            if (day % 5 == 1 && day != 31) {
                is_holiday = true;
            }
        } else {
            if (idx % 7 == 0) {
                is_holiday = true;
            }
        }
        if (substitute && !is_holiday) {
            if (large_style) {
                cell.appendChild($e('div', {'class': 'holiday'}, '振替休日'));
            }
            is_holiday = true;
            substitute = false;
        }
        if (substitute_next) {
            substitute = true;
            substitute_next = false;
        }

        if (is_holiday) {
            d.classList.add('holiday');
        } else if (jd >= 684900 && idx % 7 === 6) {
            d.classList.add('saturday');
        }

        idx++;
        jd++;
    }

    if (large_style) {
        $('cur-year').textContent = get_era_name(year_index, month_index, month_index + 1);
        if (jd_to_ymd(jd - 1).year > ymd.year) {
            $('year-w').textContent = "西暦" + ymd.year + "-" + (ymd.year + 1) + "年";
        } else {
            $('year-w').textContent = "西暦" + ymd.year + "年";
        }
        $('year-zodiac').textContent = ganzhi10.charAt((year_i + 6) % 10) + ganzhi12.charAt((year_i + 8) % 12);
        $('cur-month').textContent = to_month_text(month_i) + "月";
    }
}
function render_year_calendar(year_index)
{
    let month_table = get_calendar_table(year_index);
    let month_length = month_table.length / 2 - 1;
    let jd = calendar_to_jd(year_index, 0, 1);
    let jd_end = calendar_to_jd(year_index + 1, 1, 0);
    let row = 0, col = 0;

    for (let i = 0; i < month_length; i++, col++) {
        let tmp = month_table[i * 2 + 1];
        let idx = col + row * 4;
        if (tmp == 4 || tmp == 7 || tmp == 10) {
            $('cal-title-' + idx).textContent = '';
            $clear($('cal-' + idx));
            row++;
            col = 0;
            idx = col + row * 4;
        }
        $('cal-title-' + idx).textContent = to_month_text(tmp) + "月";
        render_month_calendar($('cal-' + idx), year_index, i, false);
    }
    if (col == 3) {
        const idx = col + row * 4;
        $('cal-title-' + idx).textContent = '';
        $clear($('cal-' + idx));
    }

    $('cur-year').textContent = get_era_name(year_index, 0, month_length);
    const year_i = year_index_to_year(year_index);
    if (jd < 683407) {    // 1872-02-09 明治改暦の1年前
        $('year-w').textContent = "西暦" + year_i + "-" + (year_i + 1) + "年";
    } else {
        $('year-w').textContent = "西暦" + year_i + "年";
    }
    $('year-zodiac').textContent = ganzhi10.charAt((year_i + 6) % 10) + ganzhi12.charAt((year_i + 8) % 12);
    $('cur-month').textContent = '';
}

document.addEventListener('DOMContentLoaded', () =>
{
    let year_index = calendar_old_table.length + today_ymd.year - 1873;
    let year_index_max = calendar_old_table.length + calendar_new_old_table.length;

    function move_year(y, month_index) {
        year_index += y;
        if (year_index < 0) {
            year_index = 0;
        } else if (year_index >= year_index_max) {
            year_index = year_index_max - 1;
        }
        if (year_calendar) {
            render_year_calendar(year_index);
        } else {
            update_month_list(year_index, month_index);
            if (month_index < 0) {
                month_index += $('month').childNodes.length;
            }
            render_month_calendar($('calendar'), year_index, month_index, true);
        }
    }
    function move_month(m) {
        render_month_calendar($('calendar'), year_index, m, true);
    }

    $('prev100').addEventListener('click', e => {
        move_year(-100, 0);
    });
    $('prev10').addEventListener('click', e => {
        move_year(-10, 0);
    });
    $('prev1').addEventListener('click', e => {
        move_year(-1, 0);
    });
    $('next1').addEventListener('click', e => {
        move_year(1, 0);
    });
    $('next10').addEventListener('click', e => {
        move_year(10, 0);
    });
    $('next100').addEventListener('click', e => {
        move_year(100, 0);
    });
    $('prev1m').addEventListener('click', e => {
        let month = $('month');
        let idx = Number(month.value);
        if (idx > 0){
            month.value = idx - 1;
            move_month(idx - 1);
        } else {
            month.value = idx;
            move_year(-1, -1);
        }
    });
    $('next1m').addEventListener('click', e => {
        let month = $('month');
        let idx = Number(month.value);
        if (idx < month.childNodes.length - 1) {
            month.value = idx + 1;
            move_month(idx + 1);
        } else {
            move_year(1, 0);
        }
    });
    $('switch-cal-type').addEventListener('click', e => {
        year_calendar = !year_calendar;
        $('month-button').style.display = year_calendar ? 'none' : '';
        $('calendar').style.display = year_calendar ? 'none' : '';
        $('calendar-list').style.display = year_calendar ? 'table' : 'none';
        $('month').value = 0;
        move_year(0, 0);
    });
    $('month').addEventListener('change', e => {
        move_month(Number($('month').value));
    });

    update_month_list(year_index, today_ymd.month - 1);
    move_month(today_ymd.month - 1);
});

