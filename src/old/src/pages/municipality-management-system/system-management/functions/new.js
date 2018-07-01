import React, {Component} from 'react';
import {Button, Table, TableHeader, AlphaEdit, CheckBox, ComboBox} from '../../../../_shared/components/index'
import {dataAction} from "../../../../_shared/redux/action";
import {redirect} from "../../../../_shared/functions";
import Title from "../../title";
import _ from 'lodash'
import {connect} from "react-redux";
import {browserHistory} from "react-router";
import {Helmet} from "react-helmet";
import './style.css'

class Functions extends Component {

    constructor(props) {
        super(props);

        let path = this.props.location,
            homePath = 'municipality-management-system',
            somePath,
            basePath,
            query = null;

        if (path.params && !_.isEmpty(path.params)) {
            somePath = path.params.basePath;
            basePath = `${homePath}/${somePath}`
        } else {
            basePath = homePath
        }

        if (path.location && !_.isEmpty(path.location.query)) {
            query = path.location.query
        }

        this.state = {

            pathQuery: query, basePath: basePath,
            functionItem: {},
            tempFunctionItem: {}
        }
    }

    componentDidMount() {
        const {pathQuery, functionItem} = this.state;

        this.setState({
            tempFunctionItem: functionItem
        });

        if (pathQuery && !_.isEmpty(pathQuery)) {
            this.action('getFunctionItem', pathQuery.id)
        }
    }

    functionItemInitial(val, status) {
        if (status === 'success') {
            this.setState({
                functionItem: val.mms.systemManagement.functions.item
            })
        }
    }


    action(execSource, value) {
        const {dispatch} = this.props;
        let actionList = {
            source: execSource,
            value: value,
            actions: {
                addFunctionItem: {
                    request: {
                        method: 'POST',
                        url: `/functions`,
                        params: this.state.tempFunctionItem
                    },
                    func: (val, status) => redirect(`${this.state.basePath}/functions`),
                    targetPath: 'mms.systemManagement.functions.item'
                }
            }
        };
        dispatch(dataAction(actionList));
    }

    handleChange(val, type) {
        this.setState({
            tempFunctionItem: {
                ...this.state.tempFunctionItem,
                [type]: val
            }
        })
    }

    submit = () => {
        const {tempFunctionItem} = this.state;

        if (tempFunctionItem && !_.isEmpty(tempFunctionItem)) {
            this.setState({
                funnctionItem: tempFunctionItem
            }, () => {
                this.action('addFunctionItem')
            })
        }
    };

    renderFunctions() {
        const {tempFunctionItem, functionItem} = this.state;

        if (tempFunctionItem) {
            return <div className="page-box margin-bottom-3 user-filter animated fadeInRight">
                <div className="page-title">
                    Fonksiyon Ekle
                </div>
                <div className="col-md-6">
                    <AlphaEdit
                        id="name"
                        name="name"
                        caption="Fonksiyon Adı"
                        type="text"
                        value={tempFunctionItem.name}
                        onChange={(val) => {
                            this.handleChange(val, 'name')
                        }}
                        tabIndex={0}
                        errorMessage=""
                    />
                </div>
                <div className="col-md-6">
                    <AlphaEdit
                        id="description"
                        name="description"
                        caption="Fonksiyon Açıklama"
                        type="text"
                        value={tempFunctionItem.description}
                        onChange={(val) => {
                            this.handleChange(val, 'description')
                        }}
                        errorMessage=""
                    />
                </div>
                <div className="clearfix"></div>
                <hr/>
                <div className="col-md-3">
                    <Button
                        type="button"
                        button="primary"
                        bold={true}
                        text="Düzenle"
                        disabled={_.isEmpty(this.state.tempFunctionItem)}
                        onClick={() => this.submit()}
                    />
                </div>
                <div className="clearfix"></div>
            </div>
        }

        return null
    }

    renderLeftSide() {
        return <div className="activity-container animated fadeInLeft">
            <Button
                type="button"
                button="primary"
                upperCase={false}
                bold={true}
                onClick={() => redirect(`${this.state.basePath}/functions/new`)}
                icon={'playlist_add'}
                toolTip={{
                    position: 'right',
                    text: 'Fonksiyon Ekle'
                }}
            />
            <Button
                type="button"
                button="primary"
                bold={true}
                onClick={() => redirect(`${this.state.basePath}/functions`)}
                icon={'functions'}
                toolTip={{
                    position: 'right',
                    text: 'Tüm Fonksiyonlar'
                }}
            />
        </div>
    }
    render() {
        return <div>
            <Helmet>
                <title>Fonksiyonlar</title>
            </Helmet>
            {this.renderLeftSide()}
            <div className="components-container">
                <Title
                    title={'Fonksiyonlar'}
                    icon={'functions'}
                    nav={['Sistem Yönetimi', 'Fonksiyonlar', 'Yeni Fonksiyon']}
                >
                </Title>
                {this.renderFunctions()}
            </div>
        </div>
    }
}


const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Functions);
