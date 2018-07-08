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
import t from '../language';

let search = new JsSearch.Search('id');
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

export default class Select extends Component {
    constructor(props) {
        super(props);

        const {data, remote, multiSelect, selected,formContext, errorMessage} = this.props;

        if (data && _.isArray(data) && data.length) {
            _.keys(data[0]).forEach(c => {
                search.addIndex(c)
            });

            data.forEach(k => {
                search.addDocuments([k])
            })
        }

        let multiData_ = [];
        if (selected && multiSelect) {
            multiData_ = selected
        } else if( selected && !multiSelect) {
            multiData_ = [selected]
        }

        this.state = {
            ...this.props,
            uuid: uuidv4(),
            selectData: !remote ? data : [],
            dataIndex: null,
            selectOpen: false,
            selected: multiData_,
            value: '',
            multiData: multiData_,
            sizeErrorMessage: '',
            errorMessage: errorMessage ? errorMessage : '',
            lang: formContext.lang ? formContext.lang : 'tr'
        }
    }

    componentDidMount() {
        const {uuid, validate} = this.state;
        const {formContext, selected, multiSelect} = this.props;
        let str ='';

        if (selected && !multiSelect) {
            str = inputSetString(this.state, selected)
        }

        this.setState({
            manualErrorMessage: this.getErrorMessage(),
            value: str,
        }, () => {
            if (multiSelect && selected) {
                str = 'true';
            }
            validate && formContext.validate(uuid, str, validate, this.state.manualErrorMessage);
        });

        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    getErrorMessage() {
        const {errorMessage, multiData} = this.state;
        const {selectMaxSize, selectMinSize, multiSelect} = this.props;
        let errMsg = errorMessage;
        if (multiSelect && multiData.length > selectMaxSize) {
            errMsg = `En fazla ${selectMaxSize} seçim yapılmalıdır`
        } else if(multiSelect && multiData.length < selectMinSize) {
            errMsg = `En az ${selectMinSize} seçim yapılmalıdır`
        } else {
            errMsg = ''
        }

        return errMsg
    }

    componentWillReceiveProps(nextProps) {
        const {errorMessage, selected, validate, formContext, remote, data, multiSelect} = nextProps,
            {uuid} = this.state;

        if (nextProps.errorMessage !== this.props.errorMessage) {
            this.setState({
                ...nextProps,
                manualErrorMessage: errorMessage
            })
        }

        if (nextProps.data !== this.props.data) {
            this.setState({
                value: '',
                manualErrorMessage: '',
                selected: [],
                multiData: [],
                selectData: !remote ? data : []
            })
        }

        if (selected !== this.props.selected) {
            let str ='',
            mData = [];

            if (selected && !multiSelect) {
                str = inputSetString(this.state, selected);
                mData = [selected]
            } else if(selected && multiSelect) {
                mData = selected
            }

            this.setState({
                ...nextProps,
                selected: selected,
                multiData: mData,
                value: str
            },()=> {
                if (multiSelect && selected) {
                    str = 'true';
                }
                validate && formContext.validate(uuid, str, validate, errorMessage);
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

        if (this.state.remote && this.props.multiSelect) {
            this.setState({
                selectOpen: true,
                selectData: this.state.selected
            })
        }
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
                    selectData: newValue ? response : this.state.selected,
                    dataIndex: !_.isEmpty(response) ? 0 : null,
                    selectOpen: response.length ? true : false
                }, () => {
                    _.keys(response[0]).forEach(c => {
                        search.addIndex(c)
                    });
                    search.addDocuments(response)
                });
            })
    }

    dataSearch(val){
        let filterData = [];
        filterData = search.search(val);

        this.setState({
            selectData: val ? filterData : this.props.data,
            dataIndex: !_.isEmpty(filterData) ? 0 : null,
            selectOpen: filterData.length ? true : false
        });
    }

    handleChange = (e) => {
        const {formContext, multiSelect} = this.props;
        const {data, uuid, validate, manualErrorMessage, remote, multiData, selectOpen} = this.state;
        let val = e.target.value;

        remote && this.remoteSearch(val, remote);
        data && this.dataSearch(val);

        this.setState({
            value: val,
        }, () => {

            if(multiSelect && multiData.length > 0 && !_.trim(val)) {
                val = true
            }

            validate && formContext.validate(uuid, _.trim(val), validate, manualErrorMessage);
        })
    };

    handlePress = (e) => {
        const {remote} = this.props;
        let {dataIndex, selectData} = this.state;

        if (e.key === 'Enter') {

            if (dataIndex !== null) {
                this.setState({
                    selectData: !remote ? this.props.data : selectData
                });

                this.searchSelectItem(selectData[dataIndex]);
                e.preventDefault();
            }
        }

        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            this.setState({
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
            const {onChange, formContext, multiSelect, selectMaxSize, dataShowFields} = this.props;
            let showStr = inputSetString(this.state, val);
            let {uuid, validate, dataIndex, multiData} = this.state;
            let selectVal = multiSelect ? [] : {};

            let multipleData = multiData;
            let sizeError = '';

            if (multiSelect) {
                if (_.filter(multipleData, k => _.isEqual(val, k)).length > 0) {
                    _.remove(multipleData, item => _.isEqual(val, item));
                } else {
                    if (multipleData.length >= selectMaxSize) {
                        sizeError = `En fazla ${selectMaxSize} seçim yapılabilir`
                    } else {
                        multipleData.push(val)
                    }
                }

                selectVal = multipleData;

                if(!multiData.length) {
                    showStr = '';
                    selectVal = []
                }

            } else {
                selectVal = val;
                showStr = !_.isEmpty(val) ? val[dataShowFields] : '';
            }

            this.setState({
                value:  showStr,
                selected: !_.isEmpty(selectVal) ? selectVal : null,
                multiData: multipleData,
                dataIndex: multiSelect ? dataIndex : null,
                errorMessage: sizeError,
                manualErrorMessage: this.getErrorMessage(),
                sizeErrorMessage: sizeError,
                selectOpen: multiSelect ? true : false
            }, () => {

                if (multiSelect) {
                    showStr = multiData.length ? showStr : ''
                }

                validate && formContext.validate(uuid, showStr, validate, this.state.manualErrorMessage);
                onChange && this.props.onChange(selectVal)
            })
        }
    }

    removeSelect() {
        const {formContext} = this.props;
        let {uuid, validate, errorMessage} = this.state;

        this.setState({
            value: '',
            selected: null,
            multiData: [],
            sizeErrorMessage: '',
            errorMessage: ''
        },()=> {
            validate && formContext.validate(uuid, '', validate, errorMessage);
        })
    }

    renderSearch() {
        const {multiSelect} = this.props;
        let {selectData, selectOpen, selected, multiData, sizeErrorMessage, lang} = this.state;
        if (selectOpen && selectData && selectData.length) {

            return <ul className="dropdown-menu dropdown-select block" >
                {selected && <li className={'dd-search'} onClick={()=> this.removeSelect()}>
                    <i className={'fal fa-trash-alt'}>
                    </i>
                    {t[lang].removeSelection}
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
                            if (multiSelect && multiData && multiData.length) {
                                _.filter(multiData, k => {
                                    if (_.isEqual(k, item)) {
                                        activeClass = 'active'

                                    }
                                })
                            }

                            if (!multiSelect && selected && selected.length) {
                                _.filter(selected, k => {
                                    if (_.isEqual(k, item)) {
                                        activeClass = 'active'

                                    }
                                })
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

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    };

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({
                selectOpen: false,
                // errorMessage: this.getErrorMessage()
            })
        } else if (this.wrapperRef && this.wrapperRef.contains(event.target) && this.state.data){
            this.setState({
                selectOpen: true,
            })
        }
    };

    setValue() {
        const {value} = this.state;
        return value
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
            <div className={`${containerClass} ${customClass}`} style={this.props.style} data-title={RenderHtml.renderTitleAfterElement(this.state)} ref={this.setWrapperRef} >
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
