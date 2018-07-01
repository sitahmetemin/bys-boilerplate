import React, {Component} from 'react';
import _ from 'lodash';
import uuidv4 from 'uuid/v4'
import classNames from 'classnames';
import {keyPressStringSTop, nullToString, numberValue} from '../function';
import RenderHtml from '../renderFunction';

export default class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props,
            uuid: uuidv4(),
            value: nullToString(this.props.value),
            type:'number'
        }
    }

    componentDidMount() {
        const {uuid, validate, errorMessage, value} = this.state;
        const {formContext} = this.props;
        this.setState({
            manualErrorMessage: errorMessage,
            value: value
        }, () => {
            formContext.validate(uuid, value, validate, errorMessage);
        });
    }

    componentWillReceiveProps(nextProps) {
        const {value, errorMessage, formContext} = nextProps;
        const {uuid, validate} = this.state;

        if (value !== this.props.value) {
            this.setState({
                ...nextProps,
                value: nullToString(value)
            },()=> {
                formContext.validate(uuid, nullToString(value), validate, errorMessage);
            });
        }

        if (errorMessage !== this.props.errorMessage) {
            this.setState({
                ...nextProps,
                manualErrorMessage: errorMessage,
                value: nullToString(value)
            },()=> {
                formContext.validate(uuid, nullToString(value), validate, errorMessage);
            })
        }

        if (formContext !== this.props.formContext) {
            if (formContext.click) {
                let msg = formContext.messages.filter(item => item.id === uuid);
                this.setState({
                    errorMessage: msg.length ? msg[0].messages : null,
                })
            }
        }
    }

    focus = () => {
        this.input.focus()
    };

    handleChange = (e) => {
        const {onChange, formContext} = this.props;
        const {uuid, validate, manualErrorMessage} = this.state;
        let val = e.target.value;

        val = _.replace(val, ',','.');

        this.setState({
            ...this.state,
            value: _.trim(val),
        }, () => {
            formContext.validate(uuid, _.trim(val), validate, manualErrorMessage);
            onChange && this.props.onChange(this.state.value)
        })
    };

    handleBlur = (e) => {
        const {onBlur, formContext} = this.props;
        const {uuid, validate, manualErrorMessage} = this.state;
        let val = e.target.value;
        val = val ? numberValue(this.state, val) : '';

        this.setState({
            ...this.state,
            value: _.trim(val),
        }, () => {
            formContext.validate(uuid, _.trim(val), validate, manualErrorMessage);
            onBlur && this.props.onBlur(this.state.value)
        })
    };

    handlePress = (e) => {
        keyPressStringSTop(e);
    };

    helperIconClick() {
        let {helperIconClick} = this.state;
        helperIconClick && this.props.helperIconClick()
    }

    helperIcon() {
        let {helperIcon, helperIconClick, id, uuid} = this.state;
        if (!id) id = uuid;
        if (helperIcon && !_.isEmpty(helperIcon)) {
            let clickClass = '';
            if (!helperIconClick) {
                clickClass = 'no-click'
            }
            return <i className={`app-helper-icon far fa-${helperIcon} ${clickClass}`} id={"app_helper_icon_" + id} onClick={() => this.helperIconClick()}>
            </i>
        }
        return null
    }

    render() {

        let {readOnly, caption, disabled, maxSize, value, errorMessage, autoFocus, title, titleLeft, md, sm, rounded, customClass, addon} = this.state,
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
            <div className={`${containerClass} ${customClass}`} style={this.props.style} data-title={RenderHtml.renderTitleAfterElement(this.state)}>
                <div className="app-form-edit-container">
                    <div className={appClass}>
                        {RenderHtml.renderAddon(this.state, 'left')}
                        {this.helperIcon()}
                        <fieldset>
                            <input
                                id={RenderHtml.renderId(this.state)}
                                type="text"
                                name={RenderHtml.renderName(this.state)}
                                className={inputClass}
                                disabled={disabled}
                                readOnly={readOnly}
                                value={value}
                                maxLength={maxSize}
                                onChange={(val) => {
                                    this.handleChange(val)
                                }}
                                onClick={this.focus}
                                onBlur={(val) => {
                                    this.handleBlur(val)
                                }}
                                onKeyPress={(e) => {
                                    this.handlePress(e)
                                }}
                                onKeyDown={(e) => {
                                    this.handlePress(e)
                                }}
                                formNoValidate="formnovalidate"
                                required={false}
                                autoComplete={'off'}
                                autoFocus={autoFocus}
                                tabIndex={this.state.tabIndex}
                                ref={ref => this.input = ref}
                            />
                            {RenderHtml.renderLabel(this.state)}
                        </fieldset>
                        {RenderHtml.renderAddon(this.state, 'right')}
                        {RenderHtml.renderError(this.state)}
                    </div>
                </div>
            </div>
        );
    }
}
