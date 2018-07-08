import React, {Component} from 'react';
import _ from 'lodash'
import t from './language';

export default class RenderHtml extends Component {

    static renderError(state) {
        let {errorMessage, id, uuid} = state;
        if (!id) id = uuid;

        if (errorMessage && !_.isEmpty(errorMessage)) {
            return <div className="app-form-error-container" id={"app_form_error_" + id}>{errorMessage}</div>
        }

        return null
    }

    static renderAddon(state, val) {
        let {addon, id, uuid} = state;
        if (!id) id = uuid;
        if (val && _.find(addon, {position: val})) {
            return <span className={'input-group-addon ' + val} id={"ariaFirst" + id}>{_.find(addon, {position: val}).text}</span>
        }
        return ''
    }

    static renderTitle(state) {
        let {title, id, uuid} = state;
        if (!id) id = uuid;
        if (title && !_.isEmpty(title)) {
            return <div className="app-component-form-title" id={"app_form_title_" + id}>{title}</div>
        }

        return null
    }

    static renderTitleAfterElement(state) {
        let {title} = state;

        if (title && !_.isEmpty(title)) {
            return title
        }

        return null
    }

    static renderLabel(state) {
        let {caption, id, uuid, multiSelect, multiData, dataShowFields} = state;

        let labelClass = '';

        if (!id) id = uuid;
        if (caption && !_.isEmpty(caption)) {

            if (multiSelect && multiData.length) {
                let showStr = '',
                    selectStr;

                multiData.forEach((obj,i) => {
                    selectStr = obj[_.split(dataShowFields,',')[0]];
                    showStr = showStr + ', ' + selectStr
                });

                caption = multiData.length + ' ' + t[state.lang].item + ' - '+_.trim(showStr, ',');
                labelClass = 'active'

            }
            return <label className={`app-placeholder-label ${labelClass}`} id={"app_form_label_" + id}>{caption}</label>
        }
        return null
    }

    static renderId(state) {
        let {id, uuid} = state;
        if (!id) id = 'input_id_' + uuid;

        return id;
    }

    static renderName(state) {
        let {name, uuid} = state;
        if (!name) name = 'input_name_' + uuid;

        return name;
    }



}
