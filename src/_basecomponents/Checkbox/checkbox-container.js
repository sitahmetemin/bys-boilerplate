/*
import React, {Component} from 'react';
import uuidv4 from 'uuid/v4'
import _ from 'lodash'
import RenderHtml from "../renderFunction";
import classNames from "classnames";

export default class CustomCheckBox extends Component {

    constructor(props) {
        super(props);

        const {id, name, caption, checked, disabled, tabIndex} = this.props;

        this.state = {

        }
    }



    render() {

        let {readOnly, caption, disabled, maxSize, value, errorMessage, autoComplete, autoFocus, title, titleLeft, md, sm, rounded, customClass, addon, type, id, name, checked, tabIndex} = this.state,
            appClass = classNames('input-group', {
                'data-active': value && !_.isEmpty(value),
                'addon-left': _.find(addon, {position: 'left'}) && !_.isEmpty(_.find(addon, {position: 'left'})),
                'addon-right': _.find(addon, {position: 'right'}) && !_.isEmpty(_.find(addon, {position: 'right'})),
                'error': errorMessage && !_.isEmpty(errorMessage)
            }),
            containerClass = classNames('app-base-component-container', {
                'is-title-left': titleLeft,
                'is-title-top': title && !titleLeft,
                'md': md,
                'sm': sm,
                'rounded': rounded
            }),
            inputClass = classNames({
                'no-label': !caption
            });

        return (
            <div >
                {this.props.children}
                {RenderHtml.renderError(this.state)}
            </div>
        );
    }

}
*/
