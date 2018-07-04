import * as React from 'react';
import * as _ from 'lodash'
import {withRouter} from 'react-router-dom'
import {Tooltip} from "../../_basecomponents";
import './sidebar.css';
import {data} from './data'

interface Props {
    path: any,
    history: any,
}

interface Menu {
    name: string,
    active: boolean,
    link: string,
    icon: string,
    count: number,

}

interface State {
    path: string,
    menuData: Menu[]
}

class Sidebar extends React.Component<Props, State> {
    public state: State;
    public refs: {
        scrollContent: HTMLInputElement;
    };
    constructor(props: Props, context: any) {
        super(props);

        this.state = {
            path: this.props.path,
            menuData: data
        };
    }

    basePath() {
        const {path} = this.state;
        return _.split(path, '/', 2)[1]
    }

    addPage(val: any) {
        this.props.history.push(val.link)
    }

    logout() {
        localStorage.removeItem("userInfo");
        this.props.history.push("/login");
    }

    renderMenu() {
        return <div className="app-page-sidebar-container">
            <div className="app-sidebar animated fadeInLeft">
                <div className="left">
                    <ul>
                        {
                            this.state.menuData.map((item,i) => {
                                return <li key={i}>
                                    <Tooltip
                                        id="popover-trigger-hover-focus"
                                        position="right"
                                        text={item.name}
                                        title=""
                                        type="tooltip"
                                    >
                                        <a
                                            onClick={() => this.addPage(item)}
                                            className={this.basePath() === item.link ? 'active' : ''}
                                        >
                                            <i className={`fas ${item.icon}`}></i>
                                            <i className={`fal ${item.icon}`}></i>
                                            {item.count > 0 && <span className="count">{item.count}</span>}
                                        </a>
                                    </Tooltip>
                                </li>
                            })
                        }
                    </ul>
                    <ul className={'bottom'}>
                        <li key={'111'}>
                            <Tooltip
                                id="popover-trigger-hover-focus"
                                position="right"
                                text={'Çıkış'}
                                title=""
                                type="tooltip"
                            >
                                <a
                                    onClick={() => this.logout()}
                                >
                                    <i className={`fas fa-power-off`}></i>
                                    <i className={`fal fa-power-off`}></i>
                                </a>
                            </Tooltip>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }

    render() {
        return this.renderMenu()
    }
}


export default withRouter((Sidebar as any))
