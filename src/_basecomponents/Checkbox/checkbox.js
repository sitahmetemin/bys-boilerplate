import React, {Component} from 'react';
import uuidv4 from 'uuid/v4'
import _ from 'lodash'
import RenderHtml from "../renderFunction";
import classNames from "classnames";

export default class CheckBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ...this.props,
            uuid: uuidv4(),
            errorMessage: this.props.errorMessage ? this.props.errorMessage : ''
        }
    }

    componentDidMount() {
        const {uuid, validate} = this.state;
        const {formContext, checked, errorMessage} = this.props;
        let str ='';

        this.setState({
            manualErrorMessage: errorMessage,
        }, () => {
            if (checked) {
                str = 'true'
            }

            validate && formContext.validate(uuid, str, validate, errorMessage);
        });

    }

    componentWillReceiveProps(nextProps) {
        const {formContext, checked, errorMessage} = nextProps;
        const {uuid, validate} = this.state;

        if (checked !== this.props.checked) {
            this.setState({
                checked: checked
            },()=> {

                let x = 'true';
                if (!this.state.checked) {
                    x = ''
                }

                validate && formContext.validate(uuid, x, validate, errorMessage);
            });
        }

        if (errorMessage !== this.props.errorMessage) {
            this.setState({
                ...nextProps,
                manualErrorMessage: errorMessage,
            },()=> {
                let x = 'true';
                if (!this.state.checked) {
                    x = ''
                }
                validate && formContext.validate(uuid, x, validate, errorMessage);
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

    handleCheck(){

        const {formContext, onChange} = this.props;
        const {checked, validate, manualErrorMessage, uuid} = this.state;
        let str = '';

        this.setState({
            checked: !checked,

        },()=> {

            if (this.state.checked) {
                str = 'true'
            } else {
                str = ''
            }

            validate && formContext.validate(uuid, str, validate, manualErrorMessage);
            onChange && this.props.onChange(this.state.checked)
        })
    };

    render() {

        let {caption, disabled, checked, tabIndex, errorMessage, customClass} = this.state,
            inputClass = classNames('app-base-component-checkbox-layer',{
                // 'no-label': !caption,
                'disabled': disabled,
                'error': errorMessage && !_.isEmpty(errorMessage)
            }),
            checkmarkError = classNames('checkmark',{
                'error-checkmark': errorMessage && !_.isEmpty(errorMessage)
            });

        customClass = customClass ? customClass : '';

        return (
            <div className={`${inputClass} ${customClass}`}>
                <label >
                    {caption}
                    <input
                        type="checkbox"
                        name={RenderHtml.renderName(this.state)}
                        id={RenderHtml.renderId(this.state)}
                        disabled={disabled}
                        checked={checked}
                        tabIndex={tabIndex}
                        onClick={()=>this.handleCheck()}
                        ref={ref => this.input = ref}
                    />
                    <span className={checkmarkError}></span>
                </label>
                {RenderHtml.renderError(this.state)}
            </div>
        );
    }

}
