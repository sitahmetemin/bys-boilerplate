import moment from 'moment';
import i18next from 'i18next';
import i18n from '../_i18n/index';
import numeral from 'numeral';
import iziToast from 'izitoast/dist/js/iziToast'
import 'izitoast/dist/css/iziToast.css'
import _ from "lodash";
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

export function getNestedChildren(arr, parent) {
    let out = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].parentId !== arr[i].vsm1progsId) {
            if (arr[i].parentId === parent) {
                let x = getNestedChildren(arr, arr[i].vsm1progsId)
                if (x.length) {
                    arr[i].children = x
                }
                out.push(arr[i])
            }
        }
    }
    return out
}

export function getMenu(val) {

    let menuItem = val;
    let x = localStorage.getItem('tabMenu');
    let tabMenu = JSON.parse(x);
    let menu = tabMenu;

    if (!isMenu(menuItem).length) {
        if(menu) {
            menu.forEach((item) => {
                item.active = false;
            });

            menu.push({
                link: menuItem.link,
                name: menuItem.name,
                active: true
            })
        } else {
            menu = [
                {
                    link: menuItem.link,
                    name: menuItem.name,
                    active: true
                }
            ]
        }

    } else {
        menu.length && menu.forEach((item) => {
            item.active = false;
            if (menuItem.link === item.link) {
                item.active = true;
            }
        });
    }

    return menu ? menu : [];
}

export function isMenu(val) {
    let x = localStorage.getItem('tabMenu');
    let tabMenu = JSON.parse(x);
    return _.filter(tabMenu, item => {
        if (item.link === val.link) {
            return true
        } else {
            return false
        }
    });
}

export function Messages(title, text, theme, show) {
    iziToast[theme]({
        title: title,
        message: text,
        position: 'topRight',
        close: true,
        closeOnEscape: true,
        timeout: 5000,
        overlay: false,
        overlayClose: true,
        animateInside: false,
        resetOnHover: true,
        targetFirst: true,
        // target: '.page-shared-container',
        progressBar: false,
        progressBarColor: 'white',
        // backgroundColor: 'white'
    });
}
