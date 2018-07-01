import {combineReducers} from 'redux';
import {initialState} from './initialstate';
import {routerReducer} from 'react-router-redux';
import * as krax from './krax';
import is from 'is_js';
import _ from 'lodash';
import {fromJS} from 'immutable'

export function dataReducer(state = initialState, action) {
    if (action.type) {
        if (_.startsWith(action.type, '@@router') && _.get(initialState, ['pathsToResetOnRouteChange']) ) {
            function changeItemDataType() {
                let type;
                switch(arguments[0]) {
                    case Array:
                        type = [];
                        break;
                    case Object:
                        type = {};
                        break;
                    case Number || Boolean:
                        type = null;
                        break;
                    case String:
                        type = '';
                        break;
                    default:
                        type = 'undefined'
                }

                return type
            }
            let changeItems = initialState.pathsToResetOnRouteChange;
            changeItems.forEach(function (item, i) {
                if (_.trim(window.location.pathname,'/') === item.url) {
                    if (!_.isEmpty(item.resetPath)) {
                        item.resetPath.forEach(function (path) {
                            _.update(state, path, function () {
                                return changeItemDataType(_.get(state, path).constructor);
                            });
                        })
                    }
                }
            });
        }

        if (action.type === 'API_REQUEST') {
            state = {...state, loading: true};
            action = {
                ...action,
                type: action.source + '-request-action'
            }
        }

        if (action.type === 'API_SUCCESS' || action.type === 'API_FAILURE') {
            state = {...state, loading: false, statusCode: action.statusCode};

            let acType = action.type === 'API_SUCCESS' ? 'success' : 'failure'
            action = {
                ...action,
                type: action.source + '-' + acType
            }
        }

        if (_.get(action, ['source'])) {
            if (!krax.isCallReducer(action)) return;

            state = krax.setFetchStatusData(action ? action : null, state);
        }
    }

    return fromJS(state).toJS(state)
}

export function device() {
    return {
        ie: is.ie() ? true : false,
        edge: is.edge() ? true : false,
        chrome: is.chrome() ? true : false,
        firefox: is.firefox() ? true : false,
        opera: is.opera() ? true : false,
        safari: is.safari() ? true : false,
        ios: is.ios() ? true : false,
        iphone: is.iphone() ? true : false,
        ipad: is.ipad() ? true : false,
        ipod: is.ipod() ? true : false,
        android: is.android() ? true : false,
        androidPhone: is.androidPhone() ? true : false,
        androidTablet: is.androidTablet() ? true : false,
        windowsPhone: is.windowsPhone() ? true : false,
        windowsTablet: is.windowsTablet() ? true : false,
        windows: is.windows() ? true : false,
        mac: is.mac() ? true : false,
        linux: is.linux() ? true : false,
        desktop: is.desktop() ? true : false,
        mobile: is.mobile() ? true : false,
        tablet: is.tablet() ? true : false,
        online: is.online() ? true : false,
        touchDevice: is.touchDevice() ? true : false
    }
}
const rootReducer = combineReducers({store: dataReducer, routing: routerReducer, _device: device });
export default rootReducer;