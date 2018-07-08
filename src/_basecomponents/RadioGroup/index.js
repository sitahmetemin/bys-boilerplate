import React, {Component} from 'react';
import {FormContext} from "../Form/FormContext";
import RadioGroup from "./radio";

export default class RadioContainer extends Component {

    render() {
        return (
            <FormContext.Consumer>
                {formContext => {
                    return <RadioGroup {...this.props} formContext={formContext} />
                }}
            </FormContext.Consumer>
        );
    }
}
