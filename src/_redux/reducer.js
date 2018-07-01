import {combineReducers} from 'redux';
import {initialState} from './initialstate';
import {Messages} from "../_functions";
import * as krax from './krax';
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

            switch(action.statusCode) {
                case 400:
                    Messages('Hata', action.payload.Error[0],'warning','')
                    break;
                case 500:
                    Messages('Servis Hatası', 'Internal Server Error','warning','')
                    break;
                default:
                    break;
            }

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

const rootReducer = combineReducers({store: dataReducer });
export default rootReducer;