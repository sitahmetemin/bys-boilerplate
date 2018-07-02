import * as React from 'react';
import * as _ from 'lodash';
import {withRouter} from 'react-router-dom'
// import {TreeMenu} from '../../../components'
import {Helmet} from "../../../_basecomponents"
import './style.css'

interface Props {
    history: any,
    match: any
}

interface State {
    errorMessage: string,
    email: string,
    password: string,
    datas: string,
    title: string
}

class Municipality extends React.Component<Props, State> {
    public state: State;

    constructor(props: Props, state: State) {
        super(props, state);

        this.state = {
            ...state,
            title: 'Test'
        }
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
                    <li onClick={() => this.redirect('/')}>
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

    render(): JSX.Element {

        return (
            <div className="municipality-management-system">

                {/*<div className="sidebar-menu">
                    <Scroll scrollclass="tree-menu-area">
                        <TreeMenu onChange={()=> {}}/>
                    </Scroll>
                </div>*/}
                <div className="content">

                    {this.renderCover()}

                    asd
                </div>
            </div>
        );
    }
}

export default withRouter((Municipality as any))
