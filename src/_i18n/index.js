import i18next from 'i18next';
import moment from 'moment';
import en from './en';
import tr from './tr';
import Cache from 'i18next-localstorage-cache';

let lang = JSON.parse(localStorage.getItem("userInfo"));
let language = 'tr';

if (lang && lang.language) {
    language = lang.language
}


i18next
    .use(Cache)
    .init({
        fallback: 'tr',
        lng: language,
        resources: {
            en: {
                translation: en
            },
            tr: {
                translation: tr
            }
        }
    }, function (err, t) {
        // initialized and ready to go!
    });


export default i18next;