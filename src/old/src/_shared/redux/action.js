import {syncHistoryWithStore} from "react-router-redux";
import {browserHistory} from "react-router";
import fetch from "isomorphic-fetch";
import _ from 'lodash'
import * as krax from "./krax";
import {store} from './store';
const history = syncHistoryWithStore(browserHistory, store);

export const API_REQUEST = 'API_REQUEST';
export const API_SUCCESS = 'API_SUCCESS';
export const API_FAILURE = 'API_FAILURE';

export function dataAction(actionParameters) {

    if (!krax.shouldCallAction(actionParameters)) return;
    let parameters = krax.initialParameters(actionParameters);


    let source = parameters.source;
    let actionSource = _.get(parameters, ['actions', source]),
        request = _.get(actionSource, ['request']),
        value = _.get(actionSource, ['value']),
        method,
        url,
        params;

    if (request && !_.isEmpty(request)) {
        method = _.get(request, ['method']);
        url = _.get(request, ['url']);
        params = _.get(request, ['params']);
    }

    if( method && url) {

        return {
            types: [API_REQUEST, API_SUCCESS, API_FAILURE],
            promise: fetch(krax.fetchEndpoint(url), krax.getFetchBody(method, params)),
            success: (dispatch, response) => {
                parameters = krax.fetchUpdateParameters(parameters, actionSource, 'success', response, source)
                parameterDispatch(parameters, response, dispatch)
                    .then(() => parameterAction(parameters, dispatch))
                    .then(() => parameterFunctionCall())
                    .then(() => parameterRedirect())
                    .catch(error => {
                        console.warn(`Error : ${error} - ${parameters.source}`)
                    });

            },
            error: (dispatch, response) => {
                parameters = krax.fetchUpdateParameters(parameters, actionSource, 'error', response, source)
                parameterDispatch(parameters, response, dispatch)
                    .then(() => parameterAction(parameters, dispatch))
                    .then(() => parameterFunctionCall())
                    .then(() => parameterRedirect())
                    .catch(error => {
                        console.warn(`Error : ${error} - ${parameters.source}`)
                    });
            }
        }
    } else {
        return dispatch => {
            parameters = krax.fetchUpdateParameters(parameters, actionSource, 'success', value, source)
            parameterDispatch(parameters, value, dispatch)
                .then(() => parameterAction(parameters, dispatch))
                .then(() => parameterFunctionCall())
                .then(() => parameterRedirect())
                .catch(error => {
                    console.warn(`Error : ${error}`)
                });
        }
    }


    function parameterDispatch(params, result, dispatch) {
        return new Promise(function (resolve) {
            dispatch(dataCallReducer(params, result));
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
                history.push(_.get(parameters, ['actions', source, 'redirect']))
            }
            resolve();
        });
    }

}

export function dataCallReducer(parameters, response) {
    return {...parameters, value: response}
}