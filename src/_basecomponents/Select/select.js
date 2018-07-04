import React, {Component} from 'react';
import _ from 'lodash';
import uuidv4 from 'uuid/v4'
import "whatwg-fetch";
import fetch from "isomorphic-fetch";
import classNames from 'classnames';
import {arrowUpDown, inputSetString} from '../function';
import RenderHtml from '../renderFunction';
import ScrollArea from 'react-scrollbar';
import * as JsSearch from 'js-search';

let search = new JsSearch.Search('id');
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;


export default class Select extends Component {
    constructor(props) {
        super(props);

        const {data} = this.props;

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
            selectOpen: false,
            selected: this.props.selected,
            value: '',
            multiData: this.props.selected ? [this.props.selected] : [],
            sizeErrorMessage: ''
        }
    }

    componentDidMount() {
        const {uuid, validate} = this.state;
        const {formContext, selected} = this.props;
        const str = inputSetString(this.state, selected);
        this.setState({
            manualErrorMessage: this.getErrorMessage(),
            value: str
        }, () => {
            formContext.validate(uuid, str, validate, this.state.manualErrorMessage);
        });
    }

    getErrorMessage() {
        const {errorMessage, multiData} = this.state;
        const {selectMaxSize, selectMinSize, multiSelect} = this.props;
        let errMsg = errorMessage;
        if (multiSelect && multiData.length >= selectMaxSize) {
            errMsg = `En fazla ${selectMaxSize} seçim yapılmalıdır`
        } else if(multiSelect && multiData.length < selectMinSize) {
            errMsg = `En az ${selectMinSize} seçim yapılmalıdır`
        }

        return errMsg
    }

    componentWillReceiveProps(nextProps) {
        const {errorMessage, selected, validate, formContext} = nextProps,
            {uuid} = this.state;

        if (nextProps.errorMessage !== this.props.errorMessage) {
            this.setState({
                ...nextProps,
                manualErrorMessage: errorMessage
            })
        }

        if (nextProps.data !== this.props.data) {
            this.setState({
                ...nextProps,
                value: '',
                manualErrorMessage: '',
                selected: null
            },() => {
                this.openSelect()
            })
        }

        if (selected !== this.props.selected) {
            const str = inputSetString(this.state, selected);
            this.setState({
                ...nextProps,
                selected: selected,
                multiData: selected ? [selected] : [],
                value: str
            },()=> {
                formContext.validate(uuid, str, validate, errorMessage);
            })
        }

        if (nextProps.formContext !== this.props.formContext) {
            if (nextProps.formContext.click) {
                let msg = nextProps.formContext.messages.filter(item => item.id === uuid);
                this.setState({
                    errorMessage: msg.length ? msg[0].messages : null
                })
            }
        }

    }

    focus = () => {
        this.input.focus();
        this.openSelect()
    };

    handleChange = (e) => {
        const {onChange, formContext, multiSelect} = this.props;
        const {data, uuid, validate, manualErrorMessage, remote, multiData, selectOpen} = this.state;

        !selectOpen && this.openSelect();
        let val = e.target.value;
        const filterData = !_.isEmpty(val) ? search.search(val) : data;
        remote && this.remoteSearch(val, remote);

        this.setState({
            ...this.state,
            value: val,
            selectData: filterData,
            dataIndex: !_.isEmpty(filterData) ? 0 : null
        }, () => {

            if(multiSelect && multiData.length > 0 && !_.trim(val)) {
                val = true
            }

            formContext.validate(uuid, _.trim(val), validate, manualErrorMessage);
            onChange && this.props.onChange(this.state.value)
        })
    };

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
                    _.keys(response[0]).forEach(c => {
                        search.addIndex(c)
                    });
                    search.addDocuments(response)
                });
            })
    }

    handlePress = (e) => {
        const {multiSelect} = this.props;
        let {dataIndex, selectData, selectOpen} = this.state;

        !multiSelect && !selectOpen && this.openSelect();

        this.setState({
            selected: null
        });

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

        if (val && _.isObject(val)) {
            const {selectItem, formContext, multiSelect, selectMaxSize, dataShowFields} = this.props;
            let showStr = inputSetString(this.state, val);

            let {uuid, validate, dataIndex, multiData} = this.state;
            let selectVal = multiSelect ? [] : {};

            let multipleData = multiData;
            let sizeError = '';

            if (multiSelect) {

                if (_.filter(multipleData, k => val === k).length > 0) {
                    _.remove(multipleData, item => item === val);
                } else {
                    if (multiData.length >= selectMaxSize) {
                        sizeError = `En fazla ${selectMaxSize} seçim yapılabilir`
                    } else {
                        multipleData.push(val)
                    }
                }

            } else {
                selectVal = val;
                // showStr = !_.isEmpty(val) ? val[dataShowFields] : '';

                // console.log('S',showStr)
            }

            this.setState({
                value:  showStr,
                selected: multipleData.length ? val : null,
                multiData: multipleData,
                dataIndex: multiSelect ? dataIndex : null,
                errorMessage: sizeError,
                manualErrorMessage: '',
                sizeErrorMessage: sizeError
            }, () => {

                if (multiSelect) {
                    showStr = multiData.length ? showStr : ''
                }

                // !multiSelect && this.openSelect();
                formContext.validate(uuid, showStr, validate, this.state.manualErrorMessage);
                !multiSelect && selectItem && this.props.selectItem(selectVal)
            })
        }
    }

    removeSelect() {
        this.setState({
            value: '',
            selected: null,
            multiData: [],
            errorMessage: ''
        },()=> {
            const {formContext} = this.props;
            let {uuid, validate, errorMessage} = this.state;
            this.openSelect();
            formContext.validate(uuid, '', validate, errorMessage);
        })
    }

    renderSearch() {
        const {multiSelect} = this.props;
        let {selectData, selectOpen, selected, multiData, sizeErrorMessage} = this.state;
        if (selectOpen && selectData && selectData.length) {

            return <ul className="dropdown-menu dropdown-select block" >
                {selected && <li className={'dd-search'} onClick={()=> this.removeSelect()}>
                    <i className={'fal fa-trash-alt'}>
                    </i>
                    Seçimi Temizle
                </li>}
                {sizeErrorMessage && <li className={'dd-search dd-warning'}>
                    <i className={'fal fa-exclamation-square'}>
                    </i>
                    {this.state.sizeErrorMessage}
                </li>}
                <ScrollArea smoothScrolling={true} speed={0.8} className="scroll-area-conrainer" contentClassName="" horizontal={false} ref={ref => this.scroll = ref}>
                    {
                        selectData && selectData.map((item, i) => {
                            let activeClass = '';
                            let activeHoverClass = '';
                            if (multiSelect && multiData && multiData.length && _.filter(multiData, k => item === k).length > 0) {
                                activeClass = 'active'
                            }

                            if (!multiSelect && !_.isEmpty(selected) && selected === item) {
                                activeClass = 'active'
                            }

                            if (this.state.dataIndex === i) {
                                activeHoverClass = 'activeHover'
                            }

                            return (
                                <li className={`app-select-list-items only-li ${activeClass} ${activeHoverClass}`} key={i} onClick={() => this.searchSelectItem(item)} >
                                    <i className={`far fa-check`}>
                                    </i>
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
        const {multiSelect, selectItem, selectMinSize, selectMaxSize, formContext} = this.props;
        const {selectOpen, data, multiData, uuid, validate} = this.state;
        if (!selectOpen) {
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }

        this.setState({
            selectOpen: !selectOpen,
            selectData: data
        },()=> {
            if (!this.state.selectOpen) {
                if (multiData.length < selectMinSize) {
                    let sizeError = `En az ${selectMinSize} seçim yapılmalıdır`;

                    this.setState({
                        errorMessage: sizeError,
                        sizeErrorMessage: sizeError
                    }, () => {
                        formContext.validate(uuid, '', validate, this.state.errorMessage);
                    })

                } else if(multiData.length >= selectMinSize || multiData.length <= selectMaxSize) {
                    this.setState({
                        errorMessage: '',
                        manualErrorMessage: '',
                    }, ()=> {
                        multiSelect && selectItem && this.props.selectItem(multiData)
                    })
                }
            }
        })
    };

    handleOutsideClick = (e) => {
        let x = true;
        if (!_.includes(e.target.className, 'app-select-list-items')) {
            x = false;
        }

        !x && this.openSelect();
    };

    setValue() {
        const {value, selected} = this.state;
        if (selected && !_.isEmpty(selected)) {
            return inputSetString(this.state, selected)
        } else {
            return value ? value : ''
        }
    }

    render() {

        let {readOnly, disabled, value, errorMessage, autoFocus, title, titleLeft, md, sm, rounded, customClass, addon, caption} = this.state,
            appClass = classNames('input-group', {
                'data-active': value && !_.isEmpty(value),
                'addon-left': _.find(addon, {position: 'left'}) && !_.isEmpty(_.find(addon, {position: 'left'})),
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
            }),
            selectClass = classNames('select-arrow',{
                'op-soft': disabled
            });

        return (
            <div className={`${containerClass} ${customClass}`} style={this.props.style} data-title={RenderHtml.renderTitleAfterElement(this.state)}>
                <div className="app-form-edit-container">
                    <div className={appClass}>
                        {RenderHtml.renderAddon(this.state, 'left')}
                        <fieldset>
                            <input
                                id={RenderHtml.renderId(this.state)}
                                name={RenderHtml.renderName(this.state)}
                                type="text"
                                disabled={disabled}
                                readOnly={readOnly}
                                value={this.setValue()}
                                onChange={(val) => {
                                    this.handleChange(val)
                                }}
                                onClick={this.focus}
                                onKeyPress={(e) => {
                                    this.handlePress(e)
                                }}
                                onKeyDown={(e) => {
                                    this.handlePress(e)
                                }}
                                className={inputClass}
                                formNoValidate="formnovalidate"
                                required={false}
                                autoComplete={'off'}
                                autoFocus={autoFocus}
                                tabIndex={this.state.tabIndex}
                                ref={ref => this.input = ref}
                            />
                            <div className={selectClass} onClick={disabled ? () => {} : this.openSelect}>
                                <i className={'fas fa-caret-down'}>
                                </i>
                            </div>
                            {RenderHtml.renderLabel(this.state)}
                        </fieldset>
                        {this.renderSearch()}
                        {RenderHtml.renderError(this.state)}
                    </div>
                </div>
            </div>
        );
    }
}
