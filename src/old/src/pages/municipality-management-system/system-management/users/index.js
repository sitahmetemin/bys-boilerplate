import React, {Component} from 'react';
import {Button, Table, TableHeader, AlphaEdit, CheckBox, ComboBox} from '../../../../_shared/components/index'
import {dataAction} from "../../../../_shared/redux/action";
import _ from 'lodash'
import {connect} from "react-redux";
import {browserHistory} from "react-router";
import './style.css'
import Modal from '../../../../components/Modal'


class Users extends Component {

    constructor(props) {
        super(props);

        let path = this.props.location;

        if (path.params && !_.isEmpty(path.params)) {
            this.homePath = 'municipality-management-system';
            this.basePath = path.params.basePath
            this.somePath = path.params.somePath
            this.subPath = path.params.subPath
        }


        this.state = {
            modalPersonnel: false,
            users: [],
            userFilter: true,
            usersShow: false
        }
    }

    componentDidMount() {
        this.action('users')
    }

    usersData(val, status) {
        if (status === 'success') {
            this.setState({
                users: val
            })
        }
    }

    action(execSource, value) {
        const {dispatch} = this.props;
        let actionList = {
            source: execSource,
            value: value,
            actions: {
                users: {
                    request: {
                        method: 'GET',
                        url: '/users',
                    },
                    func: (val, status) => this.usersData(val.mms.systemManagement.users, status),
                    targetPath: 'mms.systemManagement.users'
                }
            }
        };
        dispatch(dataAction(actionList));
    }

    renderUsers() {
        const {users, usersShow} = this.state

        if (users && users.length && usersShow) {
            return <div>

                <div className="page-box animated fadeInRight">
                    <Table
                        data={users}
                        clickRow={false}
                        iconPosition="right"
                        iconList={[
                            {
                                icon: 'edit',
                                type: 'check',
                                toolTip: 'Düzenle',
                            },
                            {
                                icon: 'info_outline',
                                type: 'info',
                                toolTip: 'Diğer Bilgiler',
                            },
                            {
                                icon: 'delete',
                                type: 'delete',
                                toolTip: 'Kaydı Sil'
                            }
                        ]}
                        onClick={(val, type) => this.click(val, type)}
                    >
                        <TableHeader dataField='id' width="90px" textAlign="center">ID</TableHeader>
                        <TableHeader dataField='name'>İsim</TableHeader>
                        <TableHeader dataField='username' bold={true}>Kullanıcı Adı</TableHeader>
                        <TableHeader dataField='surname'>Soyisim</TableHeader>
                        <TableHeader dataField='emailAddress' bold={false}>E-Posta</TableHeader>
                        <TableHeader dataField='phone' bold={false}>Telefon</TableHeader>
                        <TableHeader dataField='phone_internal' bold={false}>Dahili</TableHeader>
                        <TableHeader dataField='fax' bold={false}>Fax</TableHeader>
                        <TableHeader dataField='isSystem' bold={false}>Sistemde</TableHeader>
                    </Table>
                </div>
                <div className="page-box margin-top-2 padding-10">
                    {users.length} kayıt var
                </div>
            </div>
        }
    }

    renderPersonnelUsers() {
        const {users} = this.state;

        if (users && users.length) {
            console.log('Statettstts',users)

            return <Table
                data={users}
                headBg={'transparent'}
                clickRow={false}
                iconPosition="right"
                iconList={[
                    {
                        icon: 'add_box',
                        type: 'select',
                        toolTip: 'Seç',
                    }
                ]}
                onClick={(val, type) => this.click(val, type)}
            >
                <TableHeader dataField='name'>İsim</TableHeader>
                <TableHeader dataField='username' bold={true}>Kullanıcı Adı</TableHeader>
                <TableHeader dataField='surname'>Soyisim</TableHeader>
                <TableHeader dataField='emailAddress' bold={false}>E-Posta</TableHeader>
            </Table>
        }
    }

    redirect(val) {
        browserHistory.push(`/${this.homePath}/${this.basePath}/${this.somePath}/${val}`)
    }

    cover() {
        return <div className="page-box cover animated fadeInLeft">
            <i className="material-icons cover-bg-icon">group</i>
            <nav>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Sistem Yönetim</a></li>
                    <li className="breadcrumb-item"><a href="#">Kullanıcılar</a></li>
                    <li className="breadcrumb-item active">Tüm Kullanıcılar</li>
                </ol>
            </nav>
            <div className="cover-title">
                Kullanıcılar
            </div>
            <div className="buttons">
                <Button
                    type="button"
                    button="primary"
                    name="Button_name"
                    id="new-user"
                    text="Yeni Kullanıcı Ekle"
                    onClick={()=>this.redirect('new')}
                    icon={'group_add'}
                />
            </div>
        </div>
    }

    helperClick() {
        this.setState({
            modalPersonnel: !this.state.modalPersonnel
        })
    }

    userQuery() {
        this.setState({
            userFilter: false,
            usersShow: true
        })
    }

    renderUserFilter() {
        const {userFilter} = this.state;

        if (userFilter) {
            return <div className="page-box margin-bottom-3 user-filter animated fadeInRight">
                <div className="page-title">
                    Kullanıcı filtreleme alanı
                </div>
                <div className="col-md-3">
                    <AlphaEdit
                        id="name"
                        name="name"
                        caption="Ad"
                        type="text"
                        value=""
                        onChange={(val) => {
                            this.handleChange(val)
                        }}
                        tabIndex={0}
                        errorMessage=""
                    />
                </div>
                <div className="col-md-3">
                    <AlphaEdit
                        id="surname"
                        name="surname"
                        caption="Soyad"
                        type="text"
                        value=""
                        onChange={(val) => {
                            this.handleChange(val)
                        }}
                        errorMessage=""
                    />
                </div>
                <div className="col-md-3">
                    <AlphaEdit
                        id="tcno"
                        name="tcno"
                        caption="TC Kimlik No"
                        type="text"
                        value=""
                        onChange={(val) => {
                            this.handleChange(val)
                        }}
                        errorMessage=""
                    />
                </div>
                <div className="col-md-3">
                    <AlphaEdit
                        id="username"
                        name="username"
                        caption="Kullanıcı Adı"
                        type="text"
                        value=""
                        onChange={(val) => {
                            this.handleChange(val)
                        }}
                        errorMessage=""
                    />
                </div>
                <div className="clearfix"></div>
                <div className="box">
                    <div className="col-md-4">
                        <CheckBox
                            name="check_box_name"
                            checked={false}
                            caption="Yetkili kullanıcı"
                            disabled={false}
                            tabIndex={0}
                        />
                    </div>
                    <div className="col-md-4">
                        <CheckBox
                            name="check_box_name"
                            checked={false}
                            caption="Aktif"
                            disabled={false}
                            tabIndex={0}
                        />
                    </div>
                    <div className="col-md-4">
                        <CheckBox
                            name="check_box_name"
                            checked={false}
                            caption="CadMap düzenle"
                            disabled={false}
                            tabIndex={0}
                        />
                    </div>
                    <div className="col-md-4">
                        <CheckBox
                            name="check_box_name"
                            checked={false}
                            caption="CadMap görüntüle"
                            disabled={false}
                            tabIndex={0}
                        />
                    </div>
                    <div className="col-md-4">
                        <CheckBox
                            name="check_box_name"
                            checked={false}
                            caption="Döküman yönetim sistemi izin"
                            disabled={false}
                            tabIndex={0}
                        />
                    </div>
                    <div className="col-md-4">
                        <CheckBox
                            name="check_box_name"
                            checked={false}
                            caption="DYS döküman silebilir"
                            disabled={false}
                            tabIndex={0}
                        />
                    </div>
                    <div className="clearfix"></div>
                    <hr/>
                    <div className="col-md-4">
                        <AlphaEdit
                            id="webpage_title"
                            name="webpage_title"
                            caption="Personel"
                            type="text"
                            value=""
                            helperIcon="search"
                            helperIconClick={(val) => {
                                this.helperClick(val)
                            }}
                            onChange={(val) => {
                                this.handleChange(val)
                            }}
                            errorMessage=""
                        />
                    </div>
                    <div className="col-md-4">
                        <AlphaEdit
                            id="webpage_title"
                            name="webpage_title"
                            caption="Roller"
                            type="text"
                            value=""
                            onChange={(val) => {
                                this.handleChange(val)
                            }}
                            errorMessage=""
                        />
                    </div>
                    <div className="clearfix"></div>
                </div>
                <div className="clearfix"></div>
                <div className="col-md-2">
                    <Button
                        type="button"
                        button="primary"
                        upperCase={false}
                        bold={true}
                        name="Button_name"
                        id="12312"
                        text="Sorgula"
                        onClick={()=>this.userQuery()}
                        small={true}
                    />
                </div>
                <div className="col-md-2">
                    <Button
                        type="button"
                        button="primary-line"
                        upperCase={false}
                        bold={true}
                        name="Button_name"
                        id="12312"
                        text="Temizle"
                        onClick={this.handleClick}
                        small={true}
                    />
                </div>
                <div className="clearfix"></div>
            </div>
        }

        return null
    }

    modalData(val) {

        this.setState({
            modalPersonnel: false
        })
    }

    renderModalPersonnel() {
        return <Modal dataReady={(val)=> this.modalData(val)} show={this.state.modalPersonnel}>
            <div className="container">
                <div className="col-md-7">
                    <div className="content-title">
                        Personel Sorgula
                    </div>
                    <div className="form-content">
                        <div className="col-md-6">
                            <AlphaEdit
                                id="per_name"
                                name="per_name"
                                caption="Ad"
                                type="text"
                                value=""
                                onChange={(val) => {
                                    this.handleChange(val)
                                }}
                                tabIndex={0}
                                errorMessage=""
                            />
                        </div>
                        <div className="col-md-6">
                            <AlphaEdit
                                id="per_surname"
                                name="per_surname"
                                caption="Soyad"
                                type="text"
                                value=""
                                onChange={(val) => {
                                    this.handleChange(val)
                                }}
                                errorMessage=""
                            />
                        </div>
                        <div className="col-md-6">
                            <AlphaEdit
                                id="peR_tcno"
                                name="per_tcno"
                                caption="Kurum Sicil No"
                                type="text"
                                value=""
                                onChange={(val) => {
                                    this.handleChange(val)
                                }}
                                errorMessage=""
                            />
                        </div>
                        <div className="col-md-6">
                            <ComboBox
                                id="webpage_title"
                                name="webpage_title"
                                caption="Personel Durumu"
                                type="text"
                                value=""
                                maxChar={50}
                                minChar={3}
                                valid={true}
                                data={[
                                    {
                                        id: 1,
                                        label: 'Aktif Çalışan'
                                    },
                                    {
                                        id: 2,
                                        label: 'Askerde'
                                    },
                                    {
                                        id: 3,
                                        label: 'Ayrılan'
                                    },
                                    {
                                        id: 4,
                                        label: 'Doğum izninde'
                                    },
                                    {
                                        id: 5,
                                        label: 'Emekli'
                                    }
                                ]}
                                selected={{}}
                                multipleSelect="true"
                                displayLabel="label"
                                onChange={(val) => {
                                    this.handleChange(val)
                                }}
                                errorMessage=""
                            />
                        </div>
                        <div className="col-md-12">
                            <ComboBox
                                id="webpage_title"
                                name="webpage_title"
                                caption="Müdürlük"
                                type="text"
                                value=""
                                maxChar={50}
                                minChar={3}
                                valid={true}
                                data={[
                                    {
                                        id: 1,
                                        label: 'Aktif Çalışan'
                                    },
                                    {
                                        id: 2,
                                        label: 'Askerde'
                                    },
                                    {
                                        id: 3,
                                        label: 'Ayrılan'
                                    },
                                    {
                                        id: 4,
                                        label: 'Doğum izninde'
                                    },
                                    {
                                        id: 5,
                                        label: 'Emekli'
                                    }
                                ]}
                                selected={{}}
                                multipleSelect="true"
                                displayLabel="label"
                                onChange={(val) => {
                                    this.handleChange(val)
                                }}
                                errorMessage=""
                            />
                        </div>
                        <hr/>
                        <div className="col-md-4">
                            <Button
                                type="button"
                                button="black"
                                name="Button_name"
                                id="new-user"
                                text="Sorgu"
                                onClick={()=>this.redirect('new')}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="content-title">
                        Sonuçlar
                    </div>
                    {this.renderPersonnelUsers()}
                </div>
            </div>
        </Modal>
    }

    render() {
        console.log('---',this.state)
        return <div>
            {this.cover()}
            {this.renderUserFilter()}
            {this.renderModalPersonnel()}
            {this.renderUsers()}
        </div>
    }
}


const mapStateToProps = state => ({
    users: state.store.mms.systemManagement.users,
});

export default connect(mapStateToProps)(Users);
