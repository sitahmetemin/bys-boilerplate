
import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducer';
import restMiddleware from './middleware';

let level = 'info',
    logger = createLogger({
        level,
        predicate: (getState, action) => action.type !== 'API_REQUEST' && action.type !== 'API_SUCCESS' && action.type !== '@@router/LOCATION_CHANGE' && action.type !== 'CALLCONTEXT' && action.type !== 'CALLCONTEXT_SUCCESS',
        collapsed: (getState, action, logEntry) => !logEntry.error
    });

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState, compose(
            applyMiddleware(
                thunkMiddleware,
                restMiddleware,
                logger
            )
        )
    );
    return store;
}
const initialState = window.__INITIAL_STATE__;
export const store = configureStore(initialState);