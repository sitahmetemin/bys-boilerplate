import * as React from 'react';
import {withRouter} from 'react-router-dom'
import {TreeMenu} from '../../../components'
import {Helmet, Scroll, Form, Select} from "../../../_basecomponents"
import './style.css'

interface Props {
    history: any,
    match: any
}

interface FastMenu {
    name: string,
    link: string,
    id: number
}

interface State {
    errorMessage: string,
    datas: string,
    title: string,
    sidebar: boolean,
    fastMenu: FastMenu[]
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
            fastMenu: fastMenu
        }
    }

    redirect(val: string) {
        this.props.history.push(val)
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
        console.log('---', val)
    }

    render(): JSX.Element {

        let a: any = localStorage.getItem('storeMenu');
        let fastMenuData = JSON.parse(a);

        return (
            <div className="municipality-management-system">
                {this.renderSideBar()}
                <div className="content">
                    {this.renderCover()}
                    <div className="content-title">
                        <div className="col-md-6">
                            Lorem Ipsum
                        </div>
                        <div className="col-md-6">
                            <Form>
                                <Select
                                    title="Menü ara"
                                    titleLeft={true}
                                    caption="Seçenekler"
                                    // style={{marginBottom: 15}}
                                    validate={true}
                                    autoComplete={'off'}
                                    autoFocus={true}
                                    // remote={'https://jsonplaceholder.typicode.com/users?q={{key}}'}
                                    data={fastMenuData}
                                    dataShowFields={'name'}
                                    dataInputSetFields={'name'}
                                    selectItem={(val:any) => this.searchSelected(val)}
                                    onChange={(val:any) => this.searchSelected(val)}
                                    multiSelect
                                    rounded
                                    md
                                    customClass={'fast-menu-search'}
                                />
                            </Form>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                    <div className="area">

                        {
                            this.state.fastMenu.map((item,i) => {
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

export default withRouter((Municipality as any))
