import is from "is_js";
import _ from "lodash";
import {store} from './store';
import {Messages} from "../_functions";

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

export function shouldCallAction(actionParameters) {
    if (is.object(actionParameters) && !is.empty(actionParameters) && !actionParameters.actions[actionParameters.source]) {
        console.warn('----------------------------------------------------');
        console.warn('Make sure that the invoked parameters are in the object on the container component --> ' + actionParameters.source);
        console.warn('----------------------------------------------------');
        return false;
    }
    return true;
}

export function isCallReducer(args) {
    if (!args.actions && _.isEmpty(args.actions) && _.isEmpty(args.source) && !_.isString(args.source)) {
        console.warn('----------------------------------------------------');
        console.warn('Action Throwing error');
        console.warn('----------------------------------------------------');
        return false;
    }
    return true;
}

export function initialParameters(actionParameters) {
    if (!is.empty(actionParameters)) {
        return {
            type: actionParameters.source + '-action',
            fetchStatus: null,
            ...actionParameters
        }
    }
    return null
}

export function fetchUpdateParameters(parameters, actionSource, type, response, source) {
    if (actionSource[type] && !_.isEmpty(actionSource[type])) {
        let messageExpiration = new Date();
        messageExpiration.setSeconds(messageExpiration.getSeconds() + 5);

        actionSource = {
            ...actionSource,
            [type]: {
                ...actionSource[type],
                messages: getInitialMessage(actionSource[type].messages, type, messageExpiration)
            },
            value: response
        }
    } else {
        actionSource = {
            ...actionSource,
            value: response
        }
    }

    return {
        ...parameters,
        actions: {
            ...parameters.actions,
            [source]: actionSource
        },
        fetchStatus: type
    }
}

export function fetchEndpoint(url) {
    if (process.env.NODE_ENV === 'development')  {
        url = `http://localhost:4000${url}`
    }else if (process.env.NODE_ENV === 'production') {
    }

    if (_.includes(url, '{{') && _.includes(url, '}}')) {
        return String(_.template(url)(store.getState().store))
    }
    return url || null;
}

export function getFetchBody(method, params) {

    let token = '';
    if (JSON.parse(localStorage.getItem('userInfo')) && !_.isEmpty(JSON.parse(localStorage.getItem('userInfo')))) {
        token = JSON.parse(localStorage.getItem('userInfo')).token;
    }

    let header = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        fetchBody = {};

    if (method && (_.toUpper(method) === "POST" || _.toUpper(method) === "PUT")) {
        fetchBody = {
            method: _.toUpper(method),
            body: JSON.stringify(params),
            headers: header
        };
    } else if (method && (_.toUpper(method) === "DELETE" || _.toUpper(method) === "GET")) {
        fetchBody = {
            method: _.toUpper(method),
            headers: header
        };
    }

    return fetchBody;
}

export function getInitialMessage(message, type, expiresAt = null) {
    let messageArr = [];

    if (message && message.length) {
        message.forEach(msg => {

            let text = msg.text;
            if (_.includes(text, '{{') && _.includes(text, '}}')) {
                 text = _.template(text)(store.getState().store)
            }

            let theme = msg.theme ? msg.theme : type;

            Messages('', text, theme)

            messageArr.push({
                text: text,
                type: msg.theme ? msg.theme : type,
                show: msg.show ? msg.show : true,
                expiresAt: expiresAt
            })

        });
    }

    return messageArr;
}

export function setFetchStatusData(action, state) {

    let path = action.actions[action.source].targetPath,
        value = action.value,
        fetchStatus = action.fetchStatus,
        source = action.source,
        messages = _.get(action, ['actions', action.source, action.fetchStatus, 'messages']);

    switch (action.fetchStatus) {
        case "success":
            state = setProcess(state, source, messages, fetchStatus);
            return setData(path, value, state);
        case "error":
            state = setProcess(state, source, messages, fetchStatus);
            return setData(path, [], state);
        default:
            return setData(action.targetPath, null, state);
    }
}

export function triggerFunc(actionParameters, type, dispatch, dataAction) {
    let trigArray = _.get(actionParameters, ['actions', actionParameters.source, type, "triggers"]);
    if (trigArray && trigArray.length) {
        let trigList = [];
        trigArray.forEach(t => trigList.push(t));
        return triggerAction(actionParameters, trigList, dispatch, dataAction);
    } else {
        return Promise.resolve(true);
    }
}
function sleep(timeout) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, timeout);
    });
}

async function triggerAction(action, trigList, dispatch, dataAction) {

    for (let i = 0; i < trigList.length; i++) {
        let item = trigList[i];
        let [source, delay] = _.split(item, ":", 2);
        delay = Number(delay) || 0;

        await sleep(delay);

        let trigActionParameters = {
            source: source,
            value: undefined,
            actions: _.get(action, ['actions'])
        };

        if (source) {
            await dispatch(dataAction(trigActionParameters));
        }
    }
}

function setData(dataPath, newValue, oldState) {
    if (dataPath && !is.empty(dataPath) && is.string(dataPath)) {
        return _.set(oldState, dataPath, newValue);
    }
    return false
}

function setProcess(state, source, messages, type) {
    let processType = {source: source, type: type, date: new Date(), code: state.statusCode},
        processIndex = _.findLastIndex(state.processBox, {'source': source}),
        messageBox = state.messageBox;

    if (type === 'error') {
        // Messages('', source + ' action\'ı çalıştırılırken, <b>' + String(state.statusCode) + '</b> hatası oluştu', 'error')

    }

    if (messages) {
        messageBox.push(...messages);
        _.set(state, "messageBox", messageBox);
    }

    if (processIndex > -1) {
        _.set(state, "processBox[" + processIndex + "]", processType);
    } else {
        state.processBox.push(processType);
    }

    return state;
}