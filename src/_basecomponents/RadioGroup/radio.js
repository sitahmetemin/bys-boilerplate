import React, {Component} from 'react';
import uuidv4 from 'uuid/v4'
import _ from 'lodash'
import RenderHtml from "../renderFunction";
import classNames from "classnames";

export default class RadioGroup extends Component {

    constructor(props) {
        super(props);

        const {checked, errorMessage, disabled} = this.props;

        this.state = {
            ...this.props,
            selected: checked ? checked : null,
            disabled: disabled ? disabled : [],
            uuid: uuidv4(),
            errorMessage: errorMessage ? errorMessage : ''
        }
    }

    componentDidMount() {
        const {uuid, validate, selected} = this.state;
        const {formContext, errorMessage} = this.props;
        let str ='';

        this.setState({
            manualErrorMessage: errorMessage,
        }, () => {
            if (selected) {
                str = 'true'
            }

            validate && formContext.validate(uuid, str, validate, errorMessage);
        });

    }

    componentWillReceiveProps(nextProps) {
        const {formContext, checked, errorMessage, disabled} = nextProps;
        const {uuid, validate} = this.state;

        if (!_.isEqual(checked, this.props.checked)) {
            this.setState({
                selected: checked ? checked : this.state.selected
            },()=> {
                let x = 'true';
                if (!this.state.selected) {
                    x = ''
                }

                validate && formContext.validate(uuid, x, validate, errorMessage);
            });
        }

        if (!_.isEqual(disabled, this.props.disabled)) {
            this.setState({
                disabled: disabled ? disabled : this.state.disabled
            });
        }

        if (errorMessage !== this.props.errorMessage) {
            this.setState({
                ...nextProps,
                manualErrorMessage: errorMessage,
            },()=> {
                let x = 'true';
                if (!this.state.selected) {
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

    handleCheck(val){
        const {formContext, onChange} = this.props;
        const {validate, manualErrorMessage, uuid} = this.state;
        let str = '';

        this.setState({
            selected: val,
        },()=> {

            if (this.state.selected) {
                str = 'true'
            } else {
                str = ''
            }

            validate && formContext.validate(uuid, str, validate, manualErrorMessage);
            onChange && this.props.onChange(this.state.selected)
        })
    };

    renderRadioButtons() {
        const {data, displayField, selected, cols, disabled, tabIndex} = this.state;
        let inputClass = classNames('app-base-component-radio-layer');
        let styleCols = {};

        if(cols && _.isNumber(cols)) {
            styleCols = {
                width: 100 /cols + '%',
                display: 'inline-block'
            }
        }

        if (data && data.length) {
            return data.map(radio => {

                let selectDisabled = false;
                if (disabled && disabled.length) {
                    _.filter(disabled, k => {
                        if (_.isEqual(k, radio)) {
                            selectDisabled = true
                        }
                    })
                }

                return <div
                    key={radio[displayField] + '-' + uuidv4()}
                    className={`${inputClass} ${selectDisabled ? 'disabled' : ''}`}
                    style={styleCols}
                >
                    <label >
                        {radio[displayField]}
                        <input
                            type="radio"
                            name={RenderHtml.renderName(this.state)}
                            id={RenderHtml.renderId(this.state)}
                            disabled={selectDisabled}
                            tabIndex={tabIndex}
                            defaultChecked={_.isEqual(selected, radio) ? true : false}
                            onChange={() => this.handleCheck(radio)}
                            ref={ref => this.input = ref}
                        />
                        <span className="checkmark"></span>
                    </label>
                </div>
            })
        }
    }



    render() {

        let {errorMessage, title, titleStyle, errorStyle, customClass} = this.state,
            appClass = classNames('app-check-container-class', {
                'error': errorMessage && !_.isEmpty(errorMessage),
            });

        return (
            <div className={`${appClass} ${customClass}`} id={RenderHtml.renderId(this.state)}>
                {errorMessage && <div className="app-check-error-container"  style={errorStyle}>
                    {errorMessage}
                </div> }
                {title && <div className="app-check-title" style={titleStyle}>
                    {title}
                </div> }

                {this.renderRadioButtons()}
            </div>
        );
    }

}
