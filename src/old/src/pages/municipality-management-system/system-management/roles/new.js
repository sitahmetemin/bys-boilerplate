import React, {Component} from 'react';
import {Button, Table, TableHeader, AlphaEdit, CheckBox, ComboBox, RadioGroup} from '../../../../_shared/components/index'
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
            pathQuery: query,
            basePath: basePath,
            roleItem: {},
            tempRoleItem: {}
        }
    }

    componentDidMount() {
        const {pathQuery, roleItem} = this.state;

        this.setState({
            tempRoleItem: roleItem
        });

        if (pathQuery && !_.isEmpty(pathQuery)) {
            this.action('getRoleItem', pathQuery.id)
        }
    }

    action(execSource, value) {
        const {dispatch} = this.props;
        let actionList = {
            source: execSource,
            value: value,
            actions: {
                addRoleItem: {
                    request: {
                        method: 'POST',
                        url: `/roles`,
                        params: this.state.tempRoleItem
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
            tempRoleItem: {
                ...this.state.tempRoleItem,
                [type]: val
            }
        })
    }

    submit = () => {
        const {tempRoleItem} = this.state;

        if (tempRoleItem && !_.isEmpty(tempRoleItem)) {
            this.setState({
                roleItem: tempRoleItem
            }, () => {
                this.action('addFunctionItem')
            })
        }
    };

    renderRoles() {
        const {tempRoleItem} = this.state;

        if (tempRoleItem) {
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
                        value={tempRoleItem.name}
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
                        value={tempRoleItem.description}
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
                        value={tempRoleItem.adk}
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
                        disabled={_.isEmpty(this.state.tempRoleItem)}
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
                onClick={() => redirect(`${this.state.basePath}/roles/new`)}
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
                disabled={true}
                onClick={() => redirect(`${this.state.basePath}/roles/new`)}
                icon={'add'}
                toolTip={{
                    position: 'right',
                    text: 'Role Ekle'
                }}
            />
            <Button
                type="button"
                button="primary"
                bold={true}
                onClick={() => redirect(`${this.state.basePath}/roles`)}
                icon={'stars'}
                toolTip={{
                    position: 'right',
                    text: 'Tüm Roller'
                }}
            />
        </div>
    }
    render() {
        return <div>
            <Helmet>
                <title>Roller</title>
            </Helmet>
            {this.renderLeftSide()}
            <div className="components-container">
                <Title
                    title={'Roller'}
                    icon={'stars'}
                    nav={['Sistem Yönetimi', 'Roller', 'Yeni Rol']}
                >
                </Title>
                {this.renderRoles()}
            </div>
        </div>
    }
}


const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Functions);
