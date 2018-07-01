import React, {Component} from 'react';
import {Button, Table, TableHeader} from '../../../../_shared/components/index'
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
            basePath: basePath,
            roles: []
        }
    }

    componentDidMount() {
        this.action('roles')
    }

    rolesData(val, status) {
        if (status === 'success') {
            this.setState({
                roles: val
            })
        }
    }

    tableClick(val, type) {
        const {basePath} = this.state;

        if (!_.isEmpty(val) && type === 'edit' || !type) {
            redirect(`${basePath}/roles/edit?id=${val.id}`)
        }

        if (!_.isEmpty(val) && type === 'delete') {
            let x = this.state.roles;
            _.remove(x, val);

            this.setState({
                roles: x
            }, () => this.action('remove', val.id))

        }
    }

    action(execSource, value) {
        const {dispatch} = this.props;
        let actionList = {
            source: execSource,
            value: value,
            actions: {
                roles: {
                    request: {
                        method: 'GET',
                        url: '/roles',
                    },
                    func: (val, status) => this.rolesData(val.mms.systemManagement.roles.data, status),
                    targetPath: 'mms.systemManagement.roles.data'
                },
                remove: {
                    request: {
                        method: 'DELETE',
                        url: `/roles/${value}`,
                    },
                    success: {
                        messages: [{
                            text: 'Silme işlemi başarılı'
                        }]
                    },
                    targetPath: 'mms.systemManagement.roles.data'
                }
            }
        };
        dispatch(dataAction(actionList));
    }

    renderFunctions() {
        const {roles} = this.state

        if (roles && roles.length) {
            return <div>
                <div className="page-box animated fadeIn">
                    <Table
                        data={roles}
                        clickRow={true}
                        iconPosition="right"
                        search={true}
                        iconList={[
                            {
                                icon: 'edit',
                                type: 'edit',
                                toolTip: 'Düzenle'
                            },
                            {
                                icon: 'delete',
                                type: 'delete',
                                toolTip: 'Sil'
                            }
                        ]}
                        onClick={(val, type) => this.tableClick(val, type)}
                    >
                        <TableHeader dataField='name'>Fonksiyon Adı</TableHeader>
                        <TableHeader dataField='description'>Açıklama</TableHeader>
                        <TableHeader dataField='type' bold>Tipi</TableHeader>
                        <TableHeader dataField='adk'>ADK</TableHeader>
                        <TableHeader dataField='mobileOffice'>Mobile Ofis</TableHeader>
                        <TableHeader dataField='ybs'>YBS</TableHeader>
                    </Table>
                </div>
                <div className="page-box margin-top-2 padding-10">
                    {roles.length} kayıt var
                </div>
            </div>
        }
    }

    renderLeftSide() {
        return <div className="activity-container animated fadeInLeft">
            <Button
                type="button"
                button="primary"
                upperCase={false}
                bold={true}
                name="Button_name"
                onClick={() => redirect(`${this.state.basePath}/roles/new`)}
                icon={'add'}
                toolTip={{
                    position: 'right',
                    text: 'Rol Ekle'
                }}
            />
            <Button
                type="button"
                button="black-line"
                upperCase={false}
                bold={true}
                name="Button_name"
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
            <MessageBox />
            {this.renderLeftSide()}
            <div className="components-container">
                <Title
                    title={'Roller'}
                    icon={'stars'}
                    nav={['Sistem Yönetimi', 'Roller']}
                >
                    <div className="tab">
                        <ul>
                            <li className="active">
                                Roller
                            </li>
                            <li className="">
                                Programlar
                            </li>
                            <li className="">
                                Fonksiyonlar
                            </li>
                            <li className="">
                                Kullanıcılar
                            </li>
                        </ul>
                    </div>
                </Title>
                {this.renderFunctions()}
            </div>
        </div>
    }
}


const mapStateToProps = state => ({
    users: state.store.mms.systemManagement.users,
});

export default connect(mapStateToProps)(Functions);
