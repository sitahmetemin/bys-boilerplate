import * as React from 'react';
import {withRouter} from 'react-router-dom'
import {Button, Helmet, Scroll} from '../../../../../_basecomponents'
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

class AppComp extends React.Component<Props, State> {
    public state: State;

    constructor(props: Props, state: State) {
        super(props, state);

        this.state = {
            ...state,
            title: 'Kullanıcılar',
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


    public render() {

        return (
            <div className="app-page-shared-container">
                {this.renderSideBar()}
                <div className="content">
                    {this.renderCover()}
                    <div className="content-area padder-v width-50-percent">
                        <div className="col-md-6">
                            Kullanıcı sayfası
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter((AppComp as any))
