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
    data: Data[]
}

class AppComp extends React.Component<Props, State> {
    public state: State;
    public refs: {
        selects: HTMLInputElement;
    };
    constructor(props: Props, state: State) {
        super(props, state);

        this.state = {
            ...state,
            title: 'Kullanıcılar',
            sidebar: false,
            data: [
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
                    <TreeMenu onChange={() => {}}/>
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
                        {title}
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

    searchSelected(val: Data) {

    }

    public render() {

        return (
            <div className="app-page-shared-container animated fadeIn">
                {this.renderSideBar()}
                <div className="content">
                    {this.renderCover()}
                    <div className="content-area padder-v width-50-percent">
                        <Form>
                            <div className="col-md-6">
                                <Input
                                    // name="input_name"
                                    // id={134}
                                    // caption="Sayfa ismi"
                                    title="Sayfa adı"
                                    titleLeft={true}
                                    type="text"
                                    // mask={'+{90} (000) 000-00-00'}
                                    value={this.state.name}
                                    // addon={[
                                    //     {
                                    //         position: 'left',
                                    //         text: 'Bileşen:'
                                    //     },
                                    //     {
                                    //         position: 'right',
                                    //         text: 'TL:'
                                    //     }
                                    // ]}
                                    onChange={(val: string) => this.handleChange(val, 'name')}
                                    onBlur={(val: string) => this.handleChange(val, 'name')}

                                    // disabled={true}
                                    // readOnly={true}
                                    // tabIndex={0}
                                    // helperIcon={'search'}
                                    // helperIconClick={()=> {}}
                                    // style={{marginBottom: 15}}
                                    validate={['required']}
                                    errorMessage={this.state.errorMessage}
                                    autoComplete={false}
                                    maxSize={10}
                                    remote={'https://jsonplaceholder.typicode.com/users?q={{key}}'}
                                    // data={this.state.data}
                                    dataShowFields={'name'}
                                    dataInputSetFields={'name'}
                                    // autoFocus={true}
                                    selectItem={(val: Data) => this.searchSelected(val)}
                                    // md
                                    // sm
                                    // ref={ref => this.input = ref}
                                    // rounded
                                    // customClass={'okan'}
                                />
                            </div>
                            <div className="col-md-6">
                                <Select
                                    // name="webpage_title"
                                    // id={'234234'}
                                    caption="Seçenekler"
                                    // title="Sayfa ismi"
                                    // titleLeft={true}
                                    // addon={[
                                    //     {
                                    //         position: 'left',
                                    //         text: 'Bileşen:'
                                    //     },
                                    //     {
                                    //         position: 'right',
                                    //         text: 'TL:'
                                    //     }
                                    // ]}
                                    onChange={(val: string) => this.handleChange(val, 'name')}
                                    // tabIndex={0}
                                    // style={{marginBottom: 15}}
                                    validate={true}
                                    errorMessage={this.state.errorMessage}
                                    autoComplete={'off'}
                                    autoFocus={true}
                                    // remote={'https://jsonplaceholder.typicode.com/users?q={{key}}'}
                                    // readOnly={true}
                                    // disabled={true}
                                    data={this.state.data}
                                    dataShowFields={'name'}
                                    dataInputSetFields={'name'}
                                    selectItem={(val: Data) => this.searchSelected(val)}
                                    selected={this.state.data[5]} // Object
                                    selectMaxSize={5}
                                    selectMinSize={2}
                                    multiSelect
                                    ref="selects"
                                    // rounded
                                    // md
                                />
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter((AppComp as any))
