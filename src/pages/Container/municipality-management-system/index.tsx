import * as React from 'react';
import * as _ from 'lodash';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
// import {dataAction, store} from "../../_redux";
import {TreeMenu} from '../../../components'
import {Helmet, Scroll, Form, Select} from "../../../_basecomponents"
import './style.css'

interface FastMenu {
    name: string,
    link: string,
    id: number,
    parentId: number,
    vsm1progsId: any
}

interface Data {
    vsm1progsId: number,
    type: string,
    link: string,
    name: string,
    description: string | null,
    parentId: number,
    parameter: any,
    kayitDuzeyi: number,
    id: number,
    componentLink: any
}

interface Props {
    history: any,
    match: any,
    fastMenu: FastMenu[]
}

interface NextProps {
    history: any,
    match: any,
    fastMenu: FastMenu[]
}

interface State {
    errorMessage: string,
    datas: string,
    title: string,
    sidebar: boolean,
    fastMenu: FastMenu[],
    selectData: Data[]
}

class Municipality extends React.Component<Props, State> {
    public state: State;

    constructor(props: Props, state: State) {
        super(props, state);

        let x:any = localStorage.getItem('fastMenu');
        let fastMenu = JSON.parse(x);

        this.state = {
            ...state,
            title: 'Test',
            sidebar: false,
            fastMenu: fastMenu,
            selectData: [
                {
                    "vsm1progsId": 7,
                    "type": "F",
                    "link": "/municipality-management-system/system-management/users",
                    "name": "Kullanıcılar",
                    "description": "-",
                    "parentId": 6,
                    "parameter": null,
                    "kayitDuzeyi": 3,
                    "id": 7,
                    "componentLink": null
                },
                {
                    "vsm1progsId": 3000,
                    "type": "T",
                    "link": "/KEYOP/yeniMenu/sagAlt.html",
                    "name": "Parametre Yönetimi",
                    "description": "-",
                    "parentId": 1,
                    "parameter": null,
                    "kayitDuzeyi": 2,
                    "id": 57,
                    "componentLink": null
                },
                {
                    "vsm1progsId": 132069,
                    "type": "O",
                    "link": "/KEYOP/faces/prm/prmServisList.jsp",
                    "name": "Servis Listesi",
                    "description": "-",
                    "parentId": 3000,
                    "parameter": null,
                    "kayitDuzeyi": 3,
                    "id": 128626,
                    "componentLink": null
                },
                {
                    "vsm1progsId": 132070,
                    "type": "F",
                    "link": "/KEYOP/faces/prm/prmServis.jsp",
                    "name": "Yeni Servis",
                    "description": "-",
                    "parentId": 132069,
                    "parameter": null,
                    "kayitDuzeyi": 4,
                    "id": 130128,
                    "componentLink": null
                },
                {
                    "vsm1progsId": 152874,
                    "type": "O",
                    "link": "/KEYOP/faces/prm/prmOrgutList.jsp",
                    "name": "Örgüt Listesi",
                    "description": null,
                    "parentId": 3000,
                    "parameter": null,
                    "kayitDuzeyi": 3,
                    "id": 143451,
                    "componentLink": null
                },
                {
                    "vsm1progsId": 152875,
                    "type": "F",
                    "link": "/KEYOP/faces/prm/prmOrgut.jsp",
                    "name": "Yeni Örgüt",
                    "description": null,
                    "parentId": 152874,
                    "parameter": null,
                    "kayitDuzeyi": 4,
                    "id": 143452,
                    "componentLink": null
                },
                {
                    "vsm1progsId": 3001,
                    "type": "F",
                    "link": "/KEYOP/faces/prm/prmGenelSabitlerList.jsp",
                    "name": "Genel Sabitler",
                    "description": "-",
                    "parentId": 3000,
                    "parameter": null,
                    "kayitDuzeyi": 3,
                    "id": 77,
                    "componentLink": null
                },
                {
                    "vsm1progsId": 145673,
                    "type": "T",
                    "link": "/KEYOP/faces/prm/prmParamList.jsp",
                    "name": "Sabitler",
                    "description": "-",
                    "parentId": 3000,
                    "parameter": null,
                    "kayitDuzeyi": 3,
                    "id": 142251,
                    "componentLink": null
                },
                {
                    "vsm1progsId": 3002,
                    "type": "T",
                    "link": "/KEYOP/faces/prm/prmYabanciDillerList.jsp",
                    "name": "Yabancı Diller",
                    "description": "-",
                    "parentId": 3000,
                    "parameter": null,
                    "kayitDuzeyi": 3,
                    "id": 78,
                    "componentLink": null
                },
                {
                    "vsm1progsId": 3003,
                    "type": "T",
                    "link": "/KEYOP/faces/prm/prmEgitimDurumuList.jsp",
                    "name": "Eğitim Durumu",
                    "description": "-",
                    "parentId": 3000,
                    "parameter": null,
                    "kayitDuzeyi": 3,
                    "id": 79,
                    "componentLink": null
                },
                {
                    "vsm1progsId": 3004,
                    "type": "T",
                    "link": "/KEYOP/faces/prm/prmEgitimBolumuList.jsp",
                    "name": "Eğitim Bölümü",
                    "description": "-",
                    "parentId": 3000,
                    "parameter": null,
                    "kayitDuzeyi": 3,
                    "id": 80,
                    "componentLink": null
                }
            ]
        }
    }

    redirect(val: string) {
        this.props.history.push(val)
    }

    componentDidMount() {
        let x:any = localStorage.getItem('fastMenu');
        let fastMenu = JSON.parse(x);

        this.state = {
            ...this.state,
            fastMenu: fastMenu
        }
    }

    componentWillReceiveProps(nextProps: NextProps) {
        if(nextProps.fastMenu !== this.props.fastMenu && !_.isEmpty(nextProps.fastMenu)) {
            this.setState({
                ...this.state,
                fastMenu: nextProps.fastMenu
            })
        }
    }

    handleChange(val: any, type: string) {

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
                </ul>
            </div>
            <div className="content-title">
                <div className="col-md-6">
                    <div className="page-title">
                        {title}
                    </div>
                </div>
                <div className="col-md-6 text-right">
                    <Form>
                        <Select
                            title={'Menü seç'}
                            titleLeft={true}
                            caption="Hızlı Menüye Ekle"
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
                            selectMaxSize={50}
                            selectMinSize={1}
                            multiSelect
                            customClass={'fast-menu-search'}
                            rounded
                            md
                        />
                    </Form>
                </div>
                <div className="clearfix"></div>
            </div>
        </div>
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

    searchSelected(val:any) {
        let {fastMenu} = this.state;

        if (!fastMenu || fastMenu.length === 0) {

            fastMenu = [];

            val && val.map((item:any) => {
                fastMenu.push({
                    name: item.name,
                    link: item.link,
                    id: item.id,
                    parentId: item.parentId,
                    vsm1progsId: item.vsm1progsId
                })
            })

        } else {

            val && val.map((item:any) => {
                let a = _.filter(fastMenu, sx => sx.id === item.id);

                if (a.length === 0) {
                    fastMenu.push({
                        name: item.name,
                        link: item.link,
                        id: item.id,
                        parentId: item.parentId,
                        vsm1progsId: item.vsm1progsId
                    })
                }
            });
        }

        this.setState({
            fastMenu: fastMenu
        },()=> {
            localStorage.setItem('fastMenu', JSON.stringify(fastMenu))
        })
    }

    render(): JSX.Element {

        /*let a: any = localStorage.getItem('stateMenu');
        let fastMenuData = JSON.parse(a);*/

        return (
            <div className="app-page-shared-container">
                {this.renderSideBar()}
                <div className="content">
                    {this.renderCover()}

                    <div className="area">

                        {
                            this.state.fastMenu && this.state.fastMenu.map((item,i) => {
                                return <div className="area-box animated slideInLeft" onClick={()=> this.redirect(item.link)} key={i}>
                                    <div className="box">
                                        <i className="fal fa-star"></i>
                                    </div>
                                    <a>{item.name}</a>
                                </div>
                            })
                        }

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    fastMenu: state.store.fastMenu
});

export default withRouter(connect(mapStateToProps)(Municipality) as any)
