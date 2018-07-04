import React, {Component} from 'react';
import _ from 'lodash';
import './style.css'
import uuidv4 from 'uuid/v4'

export default class RadioGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...this.props
        }
    }

    handleCheck(val) {

        const {onChange, valueField} = this.props;

        this.setState({
            checked: val
        },() => {
            onChange && this.props.onChange(val)
        })
    }

    renderRadioButtons() {
        const {data, valueField, labelField, disabledField, checkedField, checked, row, name} = this.state;

        let rowClass,
            style = {},
            uuid = uuidv4();
        if(row && _.isNumber(row)) {
            rowClass = 'col-md-' + row;
            style = {
                height: '40px'
            }
        }

        return data.map(radio => {
            return <div
                className={`digi-check ${rowClass}`}
                style={style}
                key={radio[valueField] + 'radio_id_' + uuidv4()}
            >
                <input
                    className="digi-radio"
                    type="radio"
                    name={name + '_radio_button'}
                    id={radio[valueField] + 'radio_id_' + uuid}
                    disabled={radio[disabledField]}
                    onChange={() => this.handleCheck(radio[valueField])}
                    defaultChecked={checked === radio[checkedField] ? true : false}
                    tabIndex={0}
                />
                <label className="text" htmlFor={radio[valueField] + 'radio_id_' + uuid}>
                    {radio[labelField]}
                </label>
            </div>
        })
    }

    title() {
        if(this.props.title && !_.isEmpty(this.props.title)) {
            return <div className="digi-check-title">
                {this.props.title}
            </div>
        }

        return null
    }

    render() {

        // console.log('---',this.state)
        return (
            <div>
                {this.title()}
                {this.renderRadioButtons()}
            </div>
        );
    }


}
