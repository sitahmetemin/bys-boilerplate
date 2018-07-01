import React, {Component} from 'react';
import uuidv4 from 'uuid/v4'
import RenderHtml from "../renderFunction";
import classNames from "classnames";

export default class Checkbox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ...this.props,
            uuid: uuidv4(),
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.checked !== this.props.checked) {
            this.setState({
                checked: nextProps.checked
            })
        }
    }

    handleCheck = () => {
        this.setState({
            checked: !this.state.checked
        })
    };

    render() {

        let {caption, disabled, value, title, titleLeft, name, checked, tabIndex} = this.state,
            inputClass = classNames({
                'no-label': !caption
            });

        return (
            <label className="app-base-component-checkbox-layer" >
                {caption}
                <input
                    type="checkbox"
                    name={RenderHtml.renderName(this.state)}
                    id={RenderHtml.renderId(this.state)}
                    disabled={disabled}
                    checked={checked}
                    tabIndex={tabIndex}
                    onChange={this.handleCheck}
                    ref={ref => this.input = ref}
                />
                <span className="checkmark"></span>
            </label>
        );
    }

}