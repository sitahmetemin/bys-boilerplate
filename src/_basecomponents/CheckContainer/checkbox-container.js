import React, {Component} from 'react';
import _ from 'lodash'
import uuidv4 from 'uuid/v4'
import classNames from "classnames";
import RenderHtml from "../renderFunction";

export default class CheckContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ...this.props,
            uuid: uuidv4(),
            value: ''
        }
    }

    componentDidMount() {
        const {uuid, validate, errorMessage, value} = this.state;
        const {formContext} = this.props;

        let val = errorMessage ? '' : 'true'

        this.setState({
            manualErrorMessage: errorMessage,
            value: val
        }, () => {
            formContext.validate(uuid, val, validate, errorMessage);
        });
    }

    componentWillReceiveProps(nextProps) {
        const {formContext, errorMessage} = nextProps;
        const {uuid, validate} = this.state;


        if (errorMessage !== this.props.errorMessage) {
            this.setState({
                ...nextProps,
                manualErrorMessage: errorMessage,
            },()=> {
                let x = 'true';
                if (errorMessage) {
                    x = ''
                }
                formContext.validate(uuid, x, validate, errorMessage);
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

    render() {

        let {errorMessage, title, titleStyle, errorStyle} = this.state,
            appClass = classNames('app-check-container-class', {
                'error': errorMessage && !_.isEmpty(errorMessage)
            });

        return (
            <div className={appClass} id={RenderHtml.renderId(this.state)}>
                {errorMessage && <div className="app-check-error-container"  style={errorStyle}>
                    {errorMessage}
                </div> }
                {title && <div className="app-check-title" style={titleStyle}>
                    {title}
                </div> }
                {this.props.children}
            </div>
        );
    }

}
