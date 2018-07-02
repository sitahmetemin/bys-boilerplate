import * as React from 'react';
import {withRouter} from 'react-router-dom'
import {Button, Form, Input,Helmet, Scroll} from '../../../../../_basecomponents'
import {TreeMenu} from '../../../../../components'
import * as _ from "lodash";


interface Props {
    history: any,
    match: any
}

interface State {
    name: string,
    description: string,
    errorMessage: string,
    sidebar: boolean,
    title: string
}

class Functions extends React.Component<Props, State> {
    public state: State;

    constructor(props: Props, state: State) {
        super(props, state);

        this.state = {
            ...state,
            title: 'Fonksiyonlar',
            sidebar: false
        }
    }

    handleChange(val: string, key: string): void {
        this.setState({
            ...this.state,
            [key]: val
        })
    }

    submit(): void {

    }

    renderSideBar() {
        const {sidebar} = this.state;

        if (sidebar) {
            return <div className="sidebar-menu">
                <Scroll scrollclass="tree-menu-area">
                    <TreeMenu onChange={()=> {}}/>
                </Scroll>
            </div>
        }

        return null
    }

    redirect(val = '/') {
        this.props.history.push('/' + _.split(this.props.match.url, '/')[1] + val)
    }

    renderCover() {
        const {title} = this.state

        return <div>
            <Helmet title={title} />
            <div className="app-nav">
                <ul>
                    <li onClick={() => this.setState({sidebar: !this.state.sidebar})}>
                        <i className="fal fa-bars"></i>
                    </li>
                    <li onClick={() => this.redirect('/')}>
                        <i className="fal fa-arrow-left"></i>
                        Geri
                    </li>
                    <li className="no-link">
                        {title}
                    </li>
                    <li onClick={() => this.redirect('/new')}>
                        <i className="fas fa-plus"></i>
                        Yeni Rol Ekle
                    </li>
                    <li onClick={() => this.redirect('/')}>
                        <i className="fas fa-box"></i>
                        Roller
                    </li>
                </ul>
            </div>
        </div>
    }


    public render() {

        return (
            <div className="municipality-management-system">
                {this.renderSideBar()}
                <div className="content">
                    {this.renderCover()}

                    <div className="col-md-6" style={{margin: 20}}>
                        <Form onSubmit={() => this.submit()}>
                            <div className="col-md-8">
                                <Input
                                    caption="Fonksiyon Adı"
                                    type="text"
                                    value={this.state.name}
                                    onChange={(val: string)=> this.handleChange(val, 'name')}
                                    style={{marginBottom: 15}}
                                    validate={['required','email']}
                                    errorMessage={this.state.errorMessage}
                                    autoComplete={false}
                                    autoFocus={true}
                                />
                            </div>
                            <div className="col-md-8">
                                <Input
                                    caption="Açıklama"
                                    type="text"
                                    value={this.state.description}
                                    onChange={(val: string)=> this.handleChange(val, 'description')}
                                    style={{marginBottom: 15}}
                                    validate={['required']}
                                    errorMessage={this.state.errorMessage}
                                    autoComplete={false}
                                />
                            </div>
                            <div className="clearfix"></div>
                            <hr/>
                            <div className="col-md-4">
                                <Button
                                    type="submit"
                                    button="black-line"
                                    upperCase={false}
                                    bold={true}
                                    text="Ekle"
                                />
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter((Functions as any))
