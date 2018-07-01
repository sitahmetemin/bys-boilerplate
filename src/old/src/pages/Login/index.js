import React, {Component} from 'react';
import {Button, AlphaEdit, CheckBox, ComboBox} from '../../_shared/components/index'
import './style.css'

export default class Login extends Component {


    handleChange() {

    }

    render() {
        return (
            <div className="login">

                <div className="login-cover"></div>
                <div className="login-form-area">
                    <div className="col-md-8 content-title">
                        DigiSmart
                    </div>
                    <div className="clearfix"></div>
                    <div className="col-md-8">
                        <AlphaEdit
                            id="name"
                            name="name"
                            caption="Kullanıcı Adı"
                            type="text"
                            value=""
                            onChange={(val) => {
                                this.handleChange(val)
                            }}
                            tabIndex={0}
                            errorMessage=""
                        />
                    </div>
                    <div className="col-md-8">
                        <AlphaEdit
                            id="surname"
                            name="surname"
                            caption="Şifre"
                            type="password"
                            value=""
                            onChange={(val) => {
                                this.handleChange(val)
                            }}
                            errorMessage=""
                        />
                    </div>
                    <div className="col-md-8">
                        <CheckBox
                            id={3}
                            name="check_box_name"
                            checked={true}
                            caption="Beni hatırla"
                        />
                    </div>
                    <hr/>
                    <div className="col-md-8">
                        <Button
                            type="button"
                            button="black-line"
                            upperCase={false}
                            bold={true}
                            name="Button_name"
                            id="12312"
                            text="Giriş Yap"
                            onClick={this.handleClick}
                        />
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>
        );
    }
}
