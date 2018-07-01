import React, {Component} from 'react';
import {Button, AlphaEdit, RadioGroup, CheckBox} from '../../../../_shared/components/index'
import {dataAction} from "../../../../_shared/redux/action";
import {redirect} from "../../../../_shared/functions";
import Title from "../../title";
import _ from 'lodash'
import {connect} from "react-redux";
import {Helmet} from "react-helmet";
import {MessageBox} from '../../../../components'
import './style.css'

class Roles extends Component {

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
            roleItem: {},
            temp: {},
            click: false,
            error: {

            }
        }
    }

    componentDidMount() {
        const {pathQuery} = this.state;

        if (pathQuery && !_.isEmpty(pathQuery)) {
            this.action('getRoleItem', pathQuery.id)
        }
    }

    roleItemInitial(val, status) {
        if (status === 'success') {
            this.setState({
                roleItem: val.mms.systemManagement.roles.item,
                temp: val.mms.systemManagement.roles.item
            })
        }
    }

    action(execSource, value) {
        const {dispatch} = this.props;
        let actionList = {
            source: execSource,
            value: value,
            actions: {
                getRoleItem: {
                    request: {
                        method: 'GET',
                        url: `/roles/${value}`,
                    },
                    func: (val, status) => this.roleItemInitial(val, status),
                    targetPath: 'mms.systemManagement.roles.item'
                },
                updateRoleItem: {
                    request: {
                        method: 'PUT',
                        url: `/roles/${value}`,
                        params: this.state.temp
                    },
                    success: {
                        messages: [{
                            text: 'Bilgiler Güncellendi'
                        }]
                    },
                    func: (val, status) => redirect(`${this.state.basePath}/roles`),
                    targetPath: 'mms.systemManagement.roles.item'
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
                    name: 'Rol adı giriniz'
                }
            })

            return false
        }
        if (temp && !_.isEmpty(temp)) {
            this.setState({
                roleItem: temp,
                click: true
            }, () => {
                this.action('updateRoleItem', pathQuery.id)
            })
        }
    };

    btnDisabled() {
        if (this.state.click) {
            return true
        }
        return false
    }

    renderFunctions() {
        const {roleItem, temp} = this.state;

        if (roleItem && !_.isEmpty(roleItem)) {
            return <div className="page-box margin-bottom-3 user-filter animated fadeIn">
                <div className="page-title">
                    Role Ekle
                </div>
                <div className="col-md-6">
                    <AlphaEdit
                        id="name"
                        name="name"
                        caption="Role Adı"
                        type="text"
                        value={temp.name}
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
                        caption="Role Açıklama"
                        type="text"
                        value={temp.description}
                        onChange={(val) => {
                            this.handleChange(val, 'description')
                        }}
                        errorMessage=""
                    />
                </div>
                <div className="col-md-6">
                    <AlphaEdit
                        id="description"
                        name="description"
                        caption="Active Directory Key"
                        type="text"
                        value={temp.adk}
                        onChange={(val) => {
                            this.handleChange(val, 'adk')
                        }}
                        errorMessage=""
                    />
                </div>
                <div className="clearfix"></div>
                <hr/>
                <div className="col-md-12 no-margin">
                    <RadioGroup
                        title={'Tipi'}
                        data={[
                            {
                                label: 'E-Kent',
                                value: 1,
                                disabled: false
                            },
                            {
                                label: 'Döküman',
                                value: 2,
                                disabled: false
                            },
                            {
                                label: 'Mobil Uygulama',
                                value: 3,
                                disabled: false
                            }
                        ]}
                        labelField="label"
                        valueField="value"
                        disabledField="disabled"
                        name="check_box_name"
                        checked={3}
                        checkedField="value"
                        row={3}
                    />
                </div>
                <div className="clearfix"></div>
                <hr/>
                <div className="col-md-3 no-margin">
                    <CheckBox
                        id={3}
                        name="check_box_name"
                        checked={false}
                        caption="Mobile Ofis"
                    />
                </div>
                <div className="col-md-3 no-margin">
                    <CheckBox
                        id={3}
                        name="check_box_name"
                        checked={false}
                        caption="YBS"
                    />
                </div>
                <div className="clearfix"></div>
                <hr/>
                <div className="col-md-3">
                    <Button
                        type="button"
                        button="primary"
                        bold={true}
                        upperCase={true}
                        text="Ekle"
                        disabled={_.isEmpty(this.state.temp)}
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
                onClick={()=> redirect(`${this.state.basePath}/roles/new`)}
                text={'SYS'}
                toolTip={{
                    position: 'right',
                    text: 'Role Tanımı'
                }}
            />
            <Button
                type="button"
                button="primary"
                upperCase={false}
                bold={true}
                name="Button_name"
                onClick={()=> redirect(`${this.state.basePath}/roles/new`)}
                icon={'add'}
                toolTip={{
                    position: 'right',
                    text: 'Role Ekle'
                }}
            />
            <Button
                type="button"
                button="black-line"
                upperCase={false}
                bold={true}
                disabled={true}
                name="Button_name"
                onClick={()=> redirect(`${this.state.basePath}/roles`)}
                icon={'stars'}
                toolTip={{
                    position: 'right',
                    text: 'Tüm Roller'
                }}
            />
        </div>
    }

    render() {
        const {roleItem} = this.state;

        return <div>
            <Helmet>
                <title>{`Roller - '${roleItem.name}' Düzenle`}</title>
            </Helmet>
            <MessageBox />
            {this.renderLeftSide()}
            <div className="components-container">
                <Title
                    title={`Roller - '${roleItem.name}' Düzenle`}
                    icon={'functions'}
                    nav={['Sistem Yönetimi', 'Roller', roleItem.name]}
                >
                </Title>
                {this.renderFunctions()}
            </div>
        </div>
    }
}


const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Roles);
