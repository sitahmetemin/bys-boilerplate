import React, {Component} from 'react';
import {Button, AlphaEdit} from '../../../../_shared/components/index'
import {dataAction} from "../../../../_shared/redux/action";
import {redirect} from "../../../../_shared/functions";
import Title from "../../title";
import _ from 'lodash'
import {connect} from "react-redux";
import {Helmet} from "react-helmet";
import {MessageBox} from '../../../../components'
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
            temp: {},
            click: false,
            error: {

            }
        }
    }

    componentDidMount() {
        const {pathQuery} = this.state;

        if (pathQuery && !_.isEmpty(pathQuery)) {
            this.action('getFunctionItem', pathQuery.id)
        }
    }

    functionItemInitial(val, status) {
        if (status === 'success') {
            this.setState({
                functionItem: val.mms.systemManagement.functions.item,
                temp: val.mms.systemManagement.functions.item
            })
        }
    }

    action(execSource, value) {
        const {dispatch} = this.props;
        let actionList = {
            source: execSource,
            value: value,
            actions: {
                getFunctionItem: {
                    request: {
                        method: 'GET',
                        url: `/functions/${value}`,
                    },
                    func: (val, status) => this.functionItemInitial(val, status),
                    targetPath: 'mms.systemManagement.functions.item'
                },
                updateFunctionItem: {
                    request: {
                        method: 'PUT',
                        url: `/functions/${value}`,
                        params: this.state.temp
                    },
                    success: {
                        messages: [{
                            text: 'Bilgiler Güncellendi'
                        }]
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
            temp: {
                ...this.state.temp,
                [type]: val
            },
            error: {
                [type]: ''
            }
        })
    }

    submit = () => {
        const {temp, pathQuery} = this.state;

        if(!_.trim(temp.name)) {
            this.setState({
                error: {
                    ...this.state.error,
                    name: 'Fonksiyon adı giriniz'
                }
            })

            return false
        }
        if (temp && !_.isEmpty(temp)) {
            this.setState({
                funnctionItem: temp,
                click: true
            }, () => {
                this.action('updateFunctionItem', pathQuery.id)
            })
        }
    };

    btnDisabled() {
        if (this.state.click) {
            console.log('figir')
            return true
        }
        return false
    }

    renderFunctions() {
        const {functionItem, temp} = this.state;

        if (functionItem && !_.isEmpty(functionItem)) {
            return <div className="page-box margin-bottom-3 user-filter animated fadeInRight">
                <div className="page-title">
                    {`'${functionItem.name}' Düzenle`}
                </div>
                <div className="col-md-6">
                    <AlphaEdit
                        id="name"
                        name="name"
                        caption="Fonksiyon Adı"
                        type="text"
                        value={temp.name}
                        onChange={(val) => {
                            this.handleChange(val, 'name')
                        }}
                        errorMessage={this.state.error.name}
                    />
                </div>
                <div className="col-md-6">
                    <AlphaEdit
                        id="description"
                        name="description"
                        caption="Fonksiyon Açıklama"
                        type="text"
                        value={temp.description}
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
                        disabled={this.btnDisabled()}
                        text="Düzenle"
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
                name="Button_name"
                onClick={()=> redirect(`${this.state.basePath}/functions/new`)}
                icon={'add'}
                toolTip={{
                    position: 'right',
                    text: 'Fonksiyon Ekle'
                }}
            />
            <Button
                type="button"
                button="black-line"
                upperCase={false}
                bold={true}
                disabled={true}
                name="Button_name"
                onClick={()=> redirect(`${this.state.basePath}/functions`)}
                icon={'functions'}
                toolTip={{
                    position: 'right',
                    text: 'Tüm Fonksiyonlar'
                }}
            />
        </div>
    }

    render() {
        const {functionItem} = this.state;

        console.log('State*-',this.state)
        return <div>
            <Helmet>
                <title>{`Fonksiyonlar - '${functionItem.name}' Düzenle`}</title>
            </Helmet>
            <MessageBox />
            {this.renderLeftSide()}
            <div className="components-container">
                <Title
                    title={`Fonksiyonlar - '${functionItem.name}' Düzenle`}
                    icon={'functions'}
                    nav={['Sistem Yönetimi', 'Fonksiyonlar', functionItem.name]}
                >
                </Title>
                {this.renderFunctions()}
            </div>
        </div>
    }
}


const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Functions);
