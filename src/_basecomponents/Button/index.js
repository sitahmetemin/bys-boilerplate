import React, {Component} from 'react';
import _ from 'lodash';
import classNames from "classnames";
import uuidv4 from 'uuid/v4'

export default class Button extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ...this.props,
        }
    }

    handleClick = (e) => {
        const {onClick} = this.props;
        onClick && this.props.onClick()
    };

    renderIcon() {
        const {icon} = this.state;
        if (icon && !_.isEmpty(icon)) {
            return <i className={`fal ${icon} cover-bg-icon`}>
            </i>
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.disabled !== this.props.disabled) {
            this.setState({
                ...nextProps
            })
        }
    }

    render() {
        const {button, type, text, bold, upperCase, name, id, font, small, width, disabled} = this.state;

        let buttonClass = classNames('input-group', {
                'bold': bold,
                'uppercase': upperCase,
                'primary': button && !_.isEmpty(button) && button === 'primary',
                'danger': button && !_.isEmpty(button) && button === 'danger',
                'black': button && !_.isEmpty(button) && button === 'black',
                'primary-line': button && !_.isEmpty(button) && button === 'primary-line',
                'danger-line': button && !_.isEmpty(button) && button === 'danger-line',
                'black-line': button && !_.isEmpty(button) && button === 'black-line',
                'small': small,
            }),
            style = {};


        if (font && !_.isEmpty(font)) {
            style = {
                ...style,
                fontSize: font
            }
        }

        if (width && !_.isEmpty(width)) {
            style = {
                ...style,
                width: width
            }
        }

        return (
            <div className="app-base-component-button">
                <button
                    className={buttonClass}
                    type={type}
                    name={name && _.isEmpty(name) ? name : 'button-' + uuidv4()}
                    id={id && _.isEmpty(id) ? id : 'id-' + uuidv4()}
                    style={style}
                    disabled={disabled}
                    onClick={() => {
                        this.handleClick()
                    }}
                >
                    {this.renderIcon()}
                    {text}
                </button>
            </div>

        );
    }


}
