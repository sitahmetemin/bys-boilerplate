import React, {Component} from 'react';
import {Button, Table, TableHeader, AlphaEdit, CheckBox, ComboBox} from '../../../../_shared/components/index'
import './style.css'
import _ from 'lodash'
import {dataAction} from "../../../../_shared/redux/action";
import {connect} from "react-redux";
import {browserHistory} from "react-router";

class New extends Component {

    constructor(props) {
        super(props)

        let path = this.props.location;

        if (path.params && !_.isEmpty(path.params)) {
            this.homePath = 'municipality-management-system';
            this.basePath = path.params.basePath
            this.somePath = path.params.somePath
            this.subPath = path.params.subPath
        }

        this.state = {
            isOpen: true
        }
    }

    handleChange() {

    }

    redirect(val) {
        browserHistory.push(`/${this.homePath}/${this.basePath}/${val}`)
    }

    renderCover() {
        return <div className="page-box cover animated fadeInDown">
            <i className="material-icons cover-bg-icon">group</i>
            <nav>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Sistem Yönetim</a></li>
                    <li className="breadcrumb-item"><a href="#">Kullanıcılar</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Tüm Kullanıcılar</li>
                </ol>
            </nav>
            <div className="cover-title">
                Yeni Kullanıcı
            </div>
            <div className="buttons">
                <Button
                    type="button"
                    button="primary"
                    name="Button_name"
                    id="new-user"
                    text="Tüm Kullanıcılar"
                    onClick={()=>this.redirect('users')}
                    icon={'group'}
                />
            </div>
            <div className="tab">
                <ul>
                    <li className="active">
                        Kullanıcı
                    </li>
                    <li className="">
                        BYS Rolleri
                    </li>
                    <li className="">
                        SYS Rolleri
                    </li>
                    <li className="">
                        GIS Rolleri
                    </li>
                </ul>
            </div>
        </div>
    }

    renderUserInfo() {
        return <div className="page-box margin-bottom-3 user-filter animated fadeInRight">
            <div className="page-title">
                Kullanıcı Bilgileri
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
            <div className="col-md-3">
                <AlphaEdit
                    id="username"
                    name="username"
                    caption="Şifre"
                    type="text"
                    value=""
                    onChange={(val) => {
                        this.handleChange(val)
                    }}
                    errorMessage=""
                />
            </div>
            <div className="clearfix"></div>
            <div className="col-md-3">
                <AlphaEdit
                    id="tcno"
                    name="tcno"
                    caption="Personel No"
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
                    caption="Personel adı"
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
                    caption="Personel Soyadı"
                    type="text"
                    value=""
                    onChange={(val) => {
                        this.handleChange(val)
                    }}
                    errorMessage=""
                />
            </div>
            <div className="clearfix"></div>
            <div className="col-md-3">
                <AlphaEdit
                    id="tcno"
                    name="tcno"
                    caption="DYS Kullanıcı"
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
                    caption="DYS Şifre"
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
                    caption="Bilgi Evi"
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
                    caption="Rapor Türü"
                    type="text"
                    value=""
                    onChange={(val) => {
                        this.handleChange(val)
                    }}
                    errorMessage=""
                />
            </div>
            <div className="clearfix"></div>

            <div className="col-md-3">
                <AlphaEdit
                    id="tcno"
                    name="tcno"
                    caption="Bağlantı Kuralı"
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
                    caption="Bilgi Evi"
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
                    caption="Yüklenici"
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
                    caption="Özel İşlem Şifresi"
                    type="text"
                    value=""
                    onChange={(val) => {
                        this.handleChange(val)
                    }}
                    errorMessage=""
                />
            </div>
            <div className="clearfix"></div>

            <div className="col-md-3">
                <ComboBox
                    id="webpage_title"
                    name="webpage_title"
                    caption="Kurum içi Login"
                    type="text"
                    value=""
                    maxChar={50}
                    minChar={3}
                    valid={true}
                    data={[
                        {
                            id: 1,
                            label: 'Evet'
                        },
                        {
                            id: 2,
                            label: 'Hayır'
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
            <div className="col-md-3">
                <AlphaEdit
                    id="tcno"
                    name="tcno"
                    caption="Bilgisayar Adı"
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
                    caption="IP"
                    type="text"
                    value=""
                    onChange={(val) => {
                        this.handleChange(val)
                    }}
                    errorMessage=""
                />
            </div>

            <div className="clearfix"></div>
            <div className="col-md-3">
                <AlphaEdit
                    id="tcno"
                    name="tcno"
                    caption="Görev Müdürlüğü"
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
                    caption="Aktif Organizasyon"
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
                    caption="Kadro Müdürlüğü"
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
    }

    renderJobInfo() {
        return <div className="page-box margin-bottom-3 user-filter animated fadeInRight">
            <div className="page-title">
                Meslek Bilgileri
            </div>
            <div className="col-md-3">
                <AlphaEdit
                    id="name"
                    name="name"
                    caption="Kurum"
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
                    caption="Görevi"
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
                    caption="İlçe"
                    type="text"
                    value=""
                    onChange={(val) => {
                        this.handleChange(val)
                    }}
                    errorMessage=""
                />
            </div>
            <div className="clearfix"></div>

            <div className="col-md-3">
                <AlphaEdit
                    id="username"
                    name="username"
                    caption="Başlık"
                    type="text"
                    value=""
                    onChange={(val) => {
                        this.handleChange(val)
                    }}
                    errorMessage=""
                />
            </div>
            <div className="col-md-3">
                <CheckBox
                    id={3}
                    name="check_box_name"
                    checked={true}
                    caption="Muhtarlık Kullanıcısı"
                />
            </div>
            <div className="col-md-3">
                <AlphaEdit
                    id="tcno"
                    name="tcno"
                    caption="Mahalle"
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
    }

    render() {

        const {users} = this.state
        return <div>
            {this.renderCover()}
            {this.renderUserInfo()}
            {this.renderJobInfo()}

        </div>
    }
}


const mapStateToProps = state => ({
    users: state.store.mms.systemManagement.users,
});

export default connect(mapStateToProps)(New);
