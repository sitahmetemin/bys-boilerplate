import moment from 'moment';
import i18next from 'i18next';
import i18n from '../../_i18n';
import numeral from 'numeral';
import {store} from '../redux/store';
import {syncHistoryWithStore} from "react-router-redux";
import {browserHistory} from "react-router";
const history = syncHistoryWithStore(browserHistory, store);
// import tr from 'numeral/locales/tr';

let locale = localStorage.getItem('language') || 'tr';

if (locale !== 'en') {
    require('moment/locale/'+ locale);
}

export function todayString() {
    return moment().format('LLLL');
}

export function t(key) {
    return i18n.t(key)
}

export function changeLang(key) {
    localStorage.setItem('language',key);
    i18next.changeLanguage(key)
}

export function decimal(val) {
    let number = numeral(val);
    number.format();
    numeral.defaultFormat('0,0');
    numeral.locale('tr');
    return number.format();
}

export function formatNumber(val,type) {
    let number = numeral(val);
    number.format();
    numeral.defaultFormat(type);
    // numeral.locale('tr');

    return number.format();
}

export function convertDateDotToMinus(val) {
    let startdate = val,
        new_date = moment(startdate, "DD.MM.YYYY"),
        day = new_date.format('DD'),
        month = new_date.format('MM'),
        year = new_date.format('YYYY');

    return year + '-' + month + '-' + day
}

export function redirect(val) {
    history.push(`/${val}`)
}