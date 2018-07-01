import i18next from 'i18next';
import moment from 'moment';
import tr from './tr';
import en from './en';
import Cache from 'i18next-localstorage-cache';
let language = localStorage.getItem('language') || 'tr';

i18next
    .use(Cache)
    .init({
        lng: language,
        resources: {
            tr: {
                translation: tr
            },
            en: {
                translation: en
            }
        },
        fallback: 'tr'
    }, function (err, t) {
        // initialized and ready to go!
        // console.log('---')
    });

i18next.on('languageChanged', function(lng) {
    // E.g. set the moment locale with the current language
    moment.locale(lng);

    // then re-render your app

});


export default i18next;