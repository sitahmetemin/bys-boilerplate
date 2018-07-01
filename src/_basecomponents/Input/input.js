import React, {Component} from 'react';
import _ from 'lodash';
import uuidv4 from 'uuid/v4'
import "whatwg-fetch";
import fetch from "isomorphic-fetch";
import classNames from 'classnames';
import IMask from 'imask';
import {arrowUpDown, inputSetString, keyPressStringSTop, nullToString} from '../function';
import RenderHtml from '../renderFunction';
import ScrollArea from 'react-scrollbar';
import * as JsSearch from 'js-search';

let search = new JsSearch.Search('id');
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

export default class Input extends Component {
    constructor(props) {
        super(props);

        let {value, mask, data} = this.props;
        let newValue = nullToString(value);
        let maskOptions = {};

        if (mask && !_.isEmpty(mask)) {
            maskOptions = {
                mask: String(mask)
            };
        }

        if (data && _.isArray(data) && data.length) {
            _.keys(data[0]).forEach(c => {
                search.addIndex(c)
            });

            data.forEach(k => {
                search.addDocuments([k])
            })
        }

        this.state = {
            ...this.props,
            uuid: uuidv4(),
            selectData: [],
            dataIndex: null,
            value: newValue,
            selectOpen: false,
            maskOptions: maskOptions
        }
    }


    componentDidMount() {
        const {maskOptions, uuid, validate, errorMessage, value} = this.state;
        const {formContext} = this.props;

        let val = value;

        this.setState({
            manualErrorMessage: errorMessage,
            value: val
        }, () => {
            formContext.validate(uuid, val, validate, errorMessage);
        });

        if (maskOptions && !_.isEmpty(maskOptions)) {
            let element = this.input;
            new IMask(element, maskOptions);
        }

    }

    componentWillReceiveProps(nextProps) {
        const {value, errorMessage, formContext, remote} = nextProps;
        const {uuid, maskOptions, validate} = this.state;

        if (value !== this.props.value) {
            let newValue = nullToString(value)
            if (maskOptions && !_.isEmpty(maskOptions) && newValue) {
                let masked = IMask.createMask(maskOptions);
                newValue = masked.resolve(newValue)
            }

            this.setState({
                ...nextProps,
                value: newValue
            },()=> {
                remote && this.remoteSearch(newValue, remote);
                formContext.validate(uuid, newValue, validate, errorMessage);
            });
        }

        if (errorMessage !== this.props.errorMessage) {
            this.setState({
                ...nextProps,
                manualErrorMessage: errorMessage,
                value: nullToString(value)
            },()=> {
                formContext.validate(uuid, nullToString(value), validate, errorMessage);
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

    remoteSearch(newValue, remote) {
        let url = remote;
        url = _.template(url);

        fetch(url({key: newValue}), {
            method: 'GET',
            headers: {"Accept": "application/json", "Content-Type": "application/json"}
        })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    selectData: response,
                    dataIndex: !_.isEmpty(response) ? 0 : null
                }, () => {
                    response.length && this.openSelect();
                    _.keys(response[0]).forEach(c => {
                        search.addIndex(c)
                    });
                    search.addDocuments(response)
                });
            })
    }

    focus = () => {
        this.input.focus()
    };

    handleChange = (e) => {
        const {onChange, formContext} = this.props;
        const {data, uuid, validate, manualErrorMessage} = this.state;
        let val = e.target.value,
            filterData = [];

        if (data) {
            filterData = search.search(val);
        }

        this.setState({
            ...this.state,
            value: val,
            selectData: filterData,
            dataIndex: !_.isEmpty(filterData) ? 0 : null,
        }, () => {
            filterData.length && this.openSelect();
            formContext.validate(uuid, _.trim(val), validate, manualErrorMessage);
            onChange && this.props.onChange(this.state.value)
        })
    };

    handleBlur = (e) => {
        const {onBlur, formContext} = this.props;
        const {uuid, validate, manualErrorMessage} = this.state;
        let val = _.trim(e.target.value);

        this.setState({
            ...this.state,
            value: val,
        }, () => {
            formContext.validate(uuid, val, validate, manualErrorMessage);
            onBlur && this.props.onBlur(val)
        })
    };

    handlePress = (e) => {
        const {type} = this.props;
        let {dataIndex, selectData} = this.state;

        if (type === 'number') {
            keyPressStringSTop(e);
        }

        if (e.key === 'Enter') {
            if (dataIndex !== null) {
                this.searchSelectItem(selectData[dataIndex]);
                e.preventDefault();
            }
        }

        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            this.setState({
                ...this.state,
                dataIndex: arrowUpDown(e.key, dataIndex, selectData)
            },()=> {
                if (this.scroll) {
                    if (dataIndex > 3) {
                        this.scroll.scrollYTo(dataIndex*20);
                    } else {
                        this.scroll.scrollYTo(0);
                    }
                }
            })
        }

        return false
    };

    searchSelectItem(val) {
        const {selectItem, formContext} = this.props;
        let {dataIndex, selectData, uuid, validate, manualErrorMessage} = this.state;

        if (val && _.isObject(val)) {
            const showStr = inputSetString(this.state, val);
            this.setState({
                ...this.state,
                value: _.trim(showStr),
                selectData: [],
                dataIndex: null
            }, () => {
                this.openSelect();
                formContext.validate(uuid, showStr, validate, manualErrorMessage);
                selectItem && this.props.selectItem(val ? val : selectData[dataIndex])
            })
        }
    }

    renderSearch() {
        let {selectData, selectOpen} = this.state;
        if (selectOpen && selectData && selectData.length) {
            return <ul className="dropdown-menu dropdown-select block">
                <ScrollArea smoothScrolling={true} speed={0.8} className="scroll-area-conrainer" contentClassName="" horizontal={false} ref={ref => this.scroll = ref}>
                    {
                        selectData.map((item, i) => {
                            let activeHoverClass = '';
                            if (this.state.dataIndex === i) {
                                activeHoverClass = 'activeHover'
                            }

                            return (
                                <li className={`app-select-list-items only-li no-icon ${activeHoverClass}`} key={i} onClick={() => this.searchSelectItem(item)} >
                                    {inputSetString(this.state, item)}
                                </li>
                            )
                        })
                    }
                </ScrollArea>
            </ul>
        }
        return null
    }

    openSelect = () => {
        const {selectOpen} = this.state;
        if (!selectOpen) {
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }

        this.setState({
            selectOpen: !selectOpen,
        })
    };

    handleOutsideClick = (e) => {
        let x = true;
        if (!_.includes(e.target.className, 'app-select-list-items')) {
            x = false;
        }

        !x && this.openSelect();
    };

    helperIconClick() {
        let {helperIconClick} = this.state;
        helperIconClick && this.props.helperIconClick()
    }

    helperIcon() {
        let {helperIcon, helperIconClick, id, uuid} = this.state;
        if (!id) id = uuid;
        if (helperIcon && !_.isEmpty(helperIcon)) {
            let clickClass = '';
            if (!helperIconClick) {
                clickClass = 'no-click'
            }
            return <i className={`app-helper-icon fal fa-${helperIcon} ${clickClass}`} id={"app_helper_icon_" + id} onClick={() => this.helperIconClick()}>
            </i>
        }
        return null
    }

    render() {

        let {readOnly, caption, disabled, maxSize, value, errorMessage, autoComplete, autoFocus, title, titleLeft, md, sm, rounded, customClass, addon, type} = this.state,
            appClass = classNames('input-group', {
                'data-active': value && !_.isEmpty(value),
                'addon-left': _.find(addon, {position: 'left'}) && !_.isEmpty(_.find(addon, {position: 'left'})),
                'addon-right': _.find(addon, {position: 'right'}) && !_.isEmpty(_.find(addon, {position: 'right'})),
                'error': errorMessage && !_.isEmpty(errorMessage)
            }),
            containerClass = classNames('app-base-component-container', {
                'is-title-left': titleLeft,
                'is-title-top': title && !titleLeft,
                'md': md,
                'sm': sm,
                'rounded': rounded
            }),
            inputClass = classNames({
                'no-label': !caption
            });

        return (
            <div className={`${containerClass} ${customClass}`} style={this.props.style} data-title={RenderHtml.renderTitleAfterElement(this.state)}>
                <div className="app-form-edit-container">
                    <div className={appClass}>
                        {RenderHtml.renderAddon(this.state, 'left')}
                        {this.helperIcon()}
                        <fieldset>
                            <input
                                id={RenderHtml.renderId(this.state)}
                                type={type === 'text' ? 'text' : 'password'}
                                name={RenderHtml.renderName(this.state)}
                                className={inputClass}
                                disabled={disabled}
                                readOnly={readOnly}
                                value={value}
                                maxLength={maxSize}
                                onChange={(val) => {
                                    this.handleChange(val)
                                }}
                                onClick={this.focus}
                                onBlur={(val) => {
                                    this.handleBlur(val)
                                }}
                                onKeyPress={(e) => {
                                    this.handlePress(e)
                                }}
                                onKeyDown={(e) => {
                                    this.handlePress(e)
                                }}
                                formNoValidate="formnovalidate"
                                required={false}
                                autoComplete={!autoComplete && type === 'text' ? 'off' : 'new-password'}
                                autoFocus={autoFocus}
                                tabIndex={this.state.tabIndex}
                                ref={ref => this.input = ref}
                            />
                            {RenderHtml.renderLabel(this.state)}
                        </fieldset>
                        {RenderHtml.renderAddon(this.state, 'right')}
                        {this.renderSearch()}
                        {RenderHtml.renderError(this.state)}
                    </div>
                </div>
            </div>
        );
    }
}