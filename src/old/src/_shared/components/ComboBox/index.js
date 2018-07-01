import React, {Component} from 'react';
import _ from 'lodash';
import './style.css'
import classNames from 'classnames'

export default class ComboBox extends Component {
    constructor(props) {
        super(props);

        const {selected} = this.props;

        this.state = {
            ...this.props,
            selectOpen: false,
            selected: selected && !_.isEmpty(selected) ? selected : []
        }
    }

    title() {
        let {
            title,
            id
        } = this.state;

        if (title && !_.isEmpty(title)) {
            return <div className="title" id={"alpha_title_" + id}>
                {title}
            </div>
        }
    }


    label() {
        let {caption, id} = this.state;

        if (caption && !_.isEmpty(caption)) {
            return <label className="placeholder-label" id={"alpha_label_" + id}>{caption}</label>
        }

        return null
    }

    handleSelect(val) {
        const {onChange} = this.props;

        this.setState({
            selected: val,
        }, ()=> {
            onChange && this.props.onChange(this.state.selected)
        })

    }

    error() {
        let {errorMessage, id} = this.state;

        if (errorMessage && !_.isEmpty(errorMessage)) {
            return <div className="error-container" id={"alpha_error_" + id}>{errorMessage}</div>
        }

        return null
    }

    focus = () => {
        this.state.ref && this[this.state.ref] && this[this.state.ref].focus();
    }

    openSelect = () => {
        this.setState({
            selectOpen: !this.state.selectOpen
        })
    }

    selectBox() {
        let {data, selected, displayLabel, selectOpen} = this.state,
            _this = this;

        if (selectOpen) {
            return <div className="dropdown-menu dropdown-select">
                {
                    data.map(function (item, i) {
                        return (
                            <li
                                className="only-li "
                                key={i}
                                onClick={()=>_this.handleSelect(item)}
                            >
                                <i className={`material-icons ${selected[displayLabel] === item[displayLabel] ? 'active' : ''}`}>done</i>
                                {item[displayLabel]}
                            </li>
                        )
                    })
                }
            </div>
        }
        return null
    }

    getVal() {
        let {selected, displayLabel} = this.state;

        return !_.isEmpty(selected) ? selected[displayLabel] : ''
    }

    removeSelect = () => {
        this.setState({
            selected: {}
        })
    }

    render() {

        let {id, name, type, disabled, errorMessage, selected, selectOpen, tabIndex} = this.state,
            igClass = classNames('input-group', {
                'data-active': selected && !_.isEmpty(selected),
                'select-open': selectOpen,
                'error': errorMessage && !_.isEmpty(errorMessage)
            });

        // console.log('state--->',this.state, !_.isEmpty(selected))
        return (
            <div className="combo-box">
                {this.title()}
                <div className="alpha-container" onClick={this.openSelect}>
                    <div className={igClass}>
                        <fieldset>
                            <input
                                id={id}
                                type={type}
                                name={name}
                                value={this.getVal()}
                                readOnly={true}
                                disabled={disabled}
                                className="digi-alpha-input"
                                tabIndex={tabIndex}
                                onFocus={this.openSelect}
                                ref={ref => this[this.state.ref] = ref}
                            />
                            <div className="select-arrow" onClick={this.openSelect}>
                                <span className="caret"></span>
                            </div>
                            {!!this.getVal() && <div className="select-remove" onClick={()=> this.removeSelect()}>
                                <i className="material-icons">clear</i>
                            </div>}
                            {this.label()}
                        </fieldset>
                        {this.selectBox()}
                        {this.error()}
                    </div>

                </div>
            </div>

        );
    }


}
