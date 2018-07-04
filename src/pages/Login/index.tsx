import * as React from 'react';
import {withRouter} from 'react-router-dom'
import {Button, Form, Input, Checkbox, Select} from '../../_basecomponents'
import './style.css'

interface Props {
    history: any
}

interface Language {
    name: string,
    key: string,
    id: string
}

interface State {
    errorMessage: string,
    email: string,
    password: string,
    language: Language
}

class Login extends React.Component<Props, State> {
    public state: State;

    constructor(props: Props, state: State) {
        super(props, state);

        this.state = {
            ...state,
            email: 'mail@mehmetokanozcan.com',
            password: '123',
            language: {
                name: 'Türkçe',
                key: 'tr',
                id: 'tr-TR'
            }

        }
    }

    handleChange(val: string, key: string): void {
        this.setState({
            ...this.state,
            [key]: val
        })
    }

    submit(): void {
        localStorage.setItem('userInfo', JSON.stringify({
            email: this.state.email,
            name: 'Mehmet Okan Ozcan',
            token: '123123123',
            language: this.state.language.key
        }));

        window.location.href = '/'
    }

    selectLanguage(val: Language) {
        this.setState({
            ...this.state,
            language: val
        })
    }

    render(): JSX.Element {

        console.log('--Th', this.state)

        return (
            <div className="login">
                <div className="login-cover"></div>
                <div className="login-form-area">
                    <div className="col-md-8 login-content-title">
                        DigiSmart
                    </div>
                    <div className="clearfix"></div>
                    <Form onSubmit={() => this.submit()}>
                        <div className="col-md-8">
                            <Input
                                caption="E-Posta Adresi"
                                type="text"
                                value={this.state.email}
                                onChange={(val: string)=> this.handleChange(val, 'email')}
                                helperIcon={'at'}
                                style={{marginBottom: 15}}
                                validate={['required','email']}
                                errorMessage={this.state.errorMessage}
                                autoComplete={false}
                                autoFocus={true}
                            />
                        </div>
                        <div className="col-md-8">
                            <Input
                                caption="Şifre"
                                type="password"
                                value={this.state.password}
                                onChange={(val: string)=> this.handleChange(val, 'password')}
                                helperIcon={'lock-alt'}
                                style={{marginBottom: 15}}
                                validate={['required']}
                                errorMessage={this.state.errorMessage}
                                autoComplete={false}
                            />
                        </div>
                        <div className="col-md-8">
                            <Select
                                caption="Dil Seçin"
                                selectItem={(val:Language)=> this.selectLanguage(val)}
                                autoComplete={'off'}
                                validate={true}
                                data={[
                                    {
                                        name: 'Türkçe',
                                        key: 'tr',
                                        id: 'tr-TR'
                                    },
                                    {
                                        name: 'English',
                                        key: 'en',
                                        id: 'en-US'
                                    }
                                ]}
                                selected={this.state.language}
                                dataShowFields={'name'}
                                dataInputSetFields={'name'}
                            />
                        </div>
                        <div className="clearfix"></div>
                        <hr/>
                        <div className="col-md-8">
                            <Checkbox
                                id={3}
                                name="check_box_name"
                                checked={true}
                                caption="Beni hatırla"
                            />
                        </div>
                        <hr/>
                        <div className="col-md-8">
                            <Button
                                type="submit"
                                button="black-line"
                                upperCase={false}
                                bold={true}
                                text="Giriş Yap"
                            />
                        </div>
                    </Form>
                    <div className="clearfix"></div>
                </div>
            </div>
        );
    }
}

export default withRouter((Login as any))
