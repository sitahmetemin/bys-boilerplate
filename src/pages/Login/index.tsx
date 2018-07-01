import * as React from 'react';
import {withRouter} from 'react-router-dom'
import {Button, Form, Input, Checkbox} from '../../_basecomponents'
import './style.css'

interface Props {
    history: any
}

interface State {
    errorMessage: string,
    email: string,
    password: string
}

class Login extends React.Component<Props, State> {
    public state: State;

    constructor(props: Props, state: State) {
        super(props, state);

        this.state = {
            ...state
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
            token: '123123123'
        }));

        this.props.history.push("/");
    }

    render(): JSX.Element {

        return (
            <div className="login">
                <div className="login-cover"></div>
                <div className="login-form-area">
                    <div className="col-md-8 content-title">
                        DigiSmart
                    </div>
                    <div className="clearfix"></div>
                    <Form onSubmit={() => this.submit()}>
                        <div className="col-md-8">
                            <Input
                                caption="E-Posta Adresi"
                                type="text"
                                value={''}
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
                                value={''}
                                onChange={(val: string)=> this.handleChange(val, 'password')}
                                helperIcon={'lock-alt'}
                                style={{marginBottom: 15}}
                                validate={['required']}
                                errorMessage={this.state.errorMessage}
                                autoComplete={false}
                            />
                        </div>
                        <div className="clearfix"></div>
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