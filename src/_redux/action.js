// import {syncHistoryWithStore} from "react-router-redux";
// import {browserHistory} from "react-router";
import fetch from "isomorphic-fetch";
import _ from 'lodash'
import * as krax from "./krax";
import {store} from './store';
import iziToast from 'izitoast/dist/js/iziToast'
import 'izitoast/dist/css/iziToast.css'
// const history = syncHistoryWithStore(browserHistory, store);

export const API_REQUEST = 'API_REQUEST';
export const API_SUCCESS = 'API_SUCCESS';
export const API_FAILURE = 'API_FAILURE';

export function dataAction(actionParameters) {


    if (!krax.shouldCallAction(actionParameters)) {
        return
    }
    let parameters = krax.initialParameters(actionParameters);


    let source = parameters.source;
    let actionSource = _.get(parameters, ['actions', source]),
        request = _.get(actionSource, ['request']),
        toast = _.get(actionSource, ['confirm']),
        value = _.get(actionSource, ['value']),
        method,
        url,
        confirm = false,
        confirmMessage = 'Bu işlemi gerçekleştirmek istediğinize emin misiniz?',
        params;

    if (request && !_.isEmpty(request)) {
        method = _.get(request, ['method']);
        url = _.get(request, ['url']);
        params = _.get(request, ['params']);
    }

    if (toast || !_.isEmpty(toast)) {
        confirm = true;
        confirmMessage = _.isString(toast) ? toast : confirmMessage;
    }

    /*let c = true;

    if (confirm) {
        c = false;

        iziToast.show({
            theme: 'dark',
            message: confirmMessage,
            messageColor: 'white',
            position: 'center',
            progressBar: false,
            overlay: true,
            overlayColor: 'rgba(0,0,0,.3)',
            buttons: [
                ['<button><b>EVET</b></button>', (instance, toast) => {
                    instance.hide({transitionOut: 'fadeOut'}, toast, false);
                    c = true
                }, true],
                ['<button>Vazgeç</button>', (instance, toast) => {
                    instance.hide({transitionOut: 'fadeOut'}, toast, false);
                }],
            ],
            close: false,
            closeOnEscape: false,
            timeout: 50000000,
            overlayClose: true
        });
    }*/

    if (method && url) {

        return {
            types: [API_REQUEST, API_SUCCESS, API_FAILURE],
            promise: fetch(krax.fetchEndpoint(url), krax.getFetchBody(method, params)),
            success: (dispatch, response) => {
                parameters = krax.fetchUpdateParameters(parameters, actionSource, 'success', response, source);
                initialDispatch(parameters, response, dispatch, source)
            },
            error: (dispatch, response) => {
                parameters = krax.fetchUpdateParameters(parameters, actionSource, 'error', response, source)
                initialDispatch(parameters, response, dispatch, source)
            }
        }
    } else {
        return dispatch => {
            parameters = krax.fetchUpdateParameters(parameters, actionSource, 'success', value, source)
            initialDispatch(parameters, value, dispatch, source)
        }
    }

    function initialDispatch(parameters, response, dispatch, source) {
        parameterDispatch(parameters, response, dispatch, source)
            .then(() => parameterAction(parameters, dispatch))
            .then(() => parameterFunctionCall())
            .then(() => parameterRedirect())
            .catch(error => {
                console.warn(`Error : ${error} - ${parameters.source}`)
            });
    }

    function parameterDispatch(params, result, dispatch, source) {
        return new Promise(function (resolve) {
            dispatch(dataCallReducer(params, result, source));
            resolve();
        });
    }

    function parameterAction(params, dispatch) {
        return new Promise(async function (resolve) {
            await krax.triggerFunc(params, params.fetchStatus, dispatch, dataAction);
            resolve();
        });
    }

    function parameterFunctionCall() {
        return new Promise(async function (resolve) {
            if (_.get(parameters, ['actions', source, 'func'])) {
                await _.get(parameters, ['actions', source, 'func'])(store.getState().store, parameters.fetchStatus)
            }
            resolve();
        });
    }

    function parameterRedirect() {
        return new Promise(async function (resolve) {
            if (_.get(parameters, ['actions', source, 'redirect'])) {
                // history.push(_.get(parameters, ['actions', source, 'redirect']))
            }
            resolve();
        });
    }

}

export function dataCallReducer(parameters, response) {
    return {...parameters, value: response}
}