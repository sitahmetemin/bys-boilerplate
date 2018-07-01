import React, {Component} from "react";
import {FormContext} from "./FormContext";
import _ from 'lodash'
import {validateFunc} from '../function'
import '../styles/style.css';

class Form extends Component {

    constructor(props) {
        super(props);

        this.state = {
            validationErrors: [],
            click: false,
            messages: []
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({click: true});
        if (this.state.messages.length) {
            return;
        }
        this.props.onSubmit();
    }

    validate(id, val, validateSpecs, errMsg) {

        let err = validateFunc(validateSpecs, val, errMsg),
            {messages} = this.state,
            msgs = messages;

        _.remove(msgs, item => item.id === id)

        if (err.length > 0) {
            msgs.push({
                id: id,
                messages: err[0]
            });
        }

        this.setState({
            messages: msgs
        })
    }

    formChange() {
        if(!_.isEmpty(arguments)) {
            this.validate(...arguments)
        }
    }

    render() {

        const formContextInstance = {
            click: this.state.click,
            validate: (id, val, specs, errMsg) => this.validate(id, val, specs, errMsg),
            messages: this.state.messages
        };

        return (
            <FormContext.Provider value={formContextInstance}>
                <form onSubmit={(e) => this.handleSubmit(e)} onChange={()=>this.formChange()}>
                    {this.props.children}
                </form>
            </FormContext.Provider>
        );
    }
}

export default Form;

