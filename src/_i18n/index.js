import i18next from 'i18next';
import moment from 'moment';
import en from './en';
import tr from './tr';
import Cache from 'i18next-localstorage-cache';
let language = localStorage.getItem('language') || 'tr';

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

i18next.on('languageChanged', function(lng) {
    // E.g. set the moment locale with the current language
    moment.locale(lng);

    // then re-render your app

});


export default i18next;