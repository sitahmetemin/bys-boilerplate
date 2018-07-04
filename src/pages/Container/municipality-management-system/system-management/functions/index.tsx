import * as React from 'react';
import {withRouter} from 'react-router-dom'
import {Button, Form, Helmet, Input, Scroll, Select} from '../../../../../_basecomponents'
import {TreeMenu} from '../../../../../components'
import * as _ from "lodash";

interface Props {
    history: any,
    match: any
}

interface Data {
    id: number,
    name: string,
    surname: string,
    tckno: string,
    username: string,
    emailAddress: string,
    phone: string,
    phone_internal: string,
    fax: string,
    isSystem: boolean
}

interface State {
    name: string,
    description: string,
    errorMessage: string,
    sidebar: boolean,
    title: string,
    selectData: Data[]
}

class Functions extends React.Component<Props, State> {
    public state: State;

    constructor(props: Props, state: State) {
        super(props, state);

        this.state = {
            ...state,
            title: 'Fonksiyonlar',
            sidebar: false,
            selectData: [
                {
                    "id": 1,
                    "name": "Doğukan",
                    "surname": "Yılmaz",
                    "tckno": "846373649",
                    "username": "dogukanyil",
                    "emailAddress": "dogukanyil@ccc.com",
                    "phone": "0532 777 33 22 ",
                    "phone_internal": "22",
                    "fax": "0 212 333 44 55",
                    "isSystem": true
                },
                {
                    "id": 2,
                    "name": "Ahmet",
                    "surname": "Can",
                    "tckno": "4253546456",
                    "username": "ahmetcana",
                    "emailAddress": "ahmetcana@ccc.com",
                    "phone": "0532 777 33 22 ",
                    "phone_internal": "22",
                    "fax": "0 212 333 44 55",
                    "isSystem": true
                },
                {
                    "id": 3,
                    "name": "İlker",
                    "surname": "Zengin",
                    "tckno": "67534456",
                    "username": "ilko",
                    "emailAddress": "ilko@ccc.com",
                    "phone": "0532 777 33 22 ",
                    "phone_internal": "22",
                    "fax": "0 212 333 44 55",
                    "isSystem": true
                },
                {
                    "id": 4,
                    "name": "Zeynep",
                    "surname": "Kara",
                    "tckno": "11232321",
                    "username": "zeyn",
                    "emailAddress": "zeyn@ccc.com",
                    "phone": "0532 777 33 22 ",
                    "phone_internal": "22",
                    "fax": "0 212 333 44 55",
                    "isSystem": true
                },
                {
                    "id": 5,
                    "name": "Çağla",
                    "surname": "Özcan",
                    "tckno": "2239865",
                    "username": "cagoz",
                    "emailAddress": "cagoz@ccc.com",
                    "phone": "0532 777 33 22 ",
                    "phone_internal": "22",
                    "fax": "0 212 333 44 55",
                    "isSystem": true
                },
                {
                    "id": 6,
                    "name": "Anıl",
                    "surname": "Uzun",
                    "tckno": "5564345",
                    "username": "anuz",
                    "emailAddress": "anuz@ccc.com",
                    "phone": "0532 777 33 22 ",
                    "phone_internal": "22",
                    "fax": "0 212 333 44 55",
                    "isSystem": true
                },
                {
                    "id": 7,
                    "name": "Mehmet Ali",
                    "surname": "Özcan",
                    "tckno": "465754674",
                    "username": "memo",
                    "emailAddress": "memo@ccc.com",
                    "phone": "0532 777 33 22 ",
                    "phone_internal": "22",
                    "fax": "0 212 333 44 55",
                    "isSystem": true
                },
                {
                    "id": 8,
                    "name": "Ahmet Ali",
                    "surname": "Kara",
                    "tckno": "5567878",
                    "username": "aali",
                    "emailAddress": "aali@ccc.com",
                    "phone": "0532 777 33 22 ",
                    "phone_internal": "22",
                    "fax": "0 212 333 44 55",
                    "isSystem": true
                },
                {
                    "id": 9,
                    "name": "Tuncay",
                    "surname": "Yıldız",
                    "tckno": "786576",
                    "username": "tuncoy",
                    "emailAddress": "tuncoy@ccc.com",
                    "phone": "0532 777 33 22 ",
                    "phone_internal": "22",
                    "fax": "0 212 333 44 55",
                    "isSystem": true
                },
                {
                    "id": 10,
                    "name": "Erinç",
                    "surname": "Ata",
                    "tckno": "9087654",
                    "username": "ercn",
                    "emailAddress": "ercn@ccc.com",
                    "phone": "0532 777 33 22 ",
                    "phone_internal": "22",
                    "fax": "0 212 333 44 55",
                    "isSystem": true
                }
            ]
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
                    <TreeMenu onChange={() => {
                    }}/>
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
            <Helmet title={title}/>
            <div className="app-nav">
                <ul>
                    <li onClick={() => this.setState({sidebar: !this.state.sidebar})}>
                        <i className="fal fa-bars"></i>
                    </li>
                    <li onClick={() => this.redirect('/')}>
                        <i className="fal fa-arrow-left"></i>
                        Geri
                    </li>
                    <li onClick={() => this.redirect('/')}>
                        <i className="fas fa-box"></i>
                        Fonksiyonlar
                    </li>
                </ul>
            </div>
            <div className="content-title">
                <div className="col-md-6">
                    <div className="page-title">
                        {title}
                    </div>
                </div>
                <div className="col-md-6 text-right">
                    <Button
                        type="submit"
                        button="primary"
                        bold={true}
                        text="Yeni ekle"
                        small
                        width={'200px'}
                    />
                </div>
                <div className="clearfix"></div>
            </div>
        </div>
    }

    searchSelected(val: any) {
        console.log('---Ser', val)
    }


    public render() {

        return (
            <div className="app-page-shared-container">
                {this.renderSideBar()}
                <div className="content">
                    {this.renderCover()}
                    <div className="content-area padder-v ">
                        <Form onSubmit={() => this.submit()}>
                            <div className="col-md-4">
                                <Input
                                    caption="Fonksiyon Adı"
                                    type="text"
                                    value={this.state.name}
                                    onChange={(val: string) => this.handleChange(val, 'name')}
                                    style={{marginBottom: 15}}
                                    validate={['required', 'email']}
                                    errorMessage={this.state.errorMessage}
                                    autoComplete={false}
                                    autoFocus={true}
                                />
                            </div>
                            <div className="col-md-4">
                                <Input
                                    caption="Açıklama"
                                    type="text"
                                    value={this.state.description}
                                    onChange={(val: string) => this.handleChange(val, 'description')}
                                    style={{marginBottom: 15}}
                                    validate={['required']}
                                    errorMessage={this.state.errorMessage}
                                    autoComplete={false}
                                />
                            </div>
                            <div className="col-md-4">
                                <Select
                                    caption="Seçenekler"
                                    onChange={(val: any) => {
                                        this.handleChange(val, 'c')
                                    }}
                                    validate={true}
                                    errorMessage={this.state.errorMessage}
                                    autoComplete={'off'}
                                    data={this.state.selectData}
                                    dataShowFields={'name'}
                                    dataInputSetFields={'name'}
                                    selectItem={(val: any) => this.searchSelected(val)}
                                    selectMaxSize={5}
                                    selectMinSize={2}
                                    multiSelect
                                    // rounded
                                    // md
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
                            <div className="clearfix"></div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter((Functions as any))
