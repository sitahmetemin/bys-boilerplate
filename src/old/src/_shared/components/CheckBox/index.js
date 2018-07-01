import React, {Component} from 'react';
import './style.css'
import uuidv4 from 'uuid/v4'

export default class CustomCheckBox extends Component {

    constructor(props) {
        super(props);

        const {id, name, caption, checked, disabled, tabIndex} = this.props;

        this.state = {
            id: id ? id : 'check_id_' + uuidv4(),
            name: name ? name : 'check_name_' + uuidv4(),
            caption: caption,
            checked: checked,
            disabled: disabled,
            tabIndex: tabIndex
        }
    }

    handleCheck = () => {
        this.setState({
            checked: !this.state.checked
        })
    }

    render() {

        const {id, name, caption, checked, disabled, tabIndex} = this.state;
        return (
            <div className="digi-check">
                <input
                    className="digi-checkbox"
                    type="checkbox"
                    name={name}
                    id={id}
                    disabled={disabled}
                    onChange={this.handleCheck}
                    defaultChecked={checked}
                    tabIndex={tabIndex}
                />
                <label className="text" htmlFor={id}>
                    {caption}
                </label>
            </div>
        );
    }

}
