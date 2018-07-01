import * as React from 'react';
import * as _ from 'lodash'
import {withRouter} from 'react-router-dom'
import {Tooltip} from "../../_basecomponents";
import './sidebar.css';

interface Props {
    path: any,
    history: any,
    okan: string
}
interface State {
    path: string,
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
        };
    }

    redirect(val: string): void {

        this.props.history.push(val);
    }

    basePath() {
        const {path} = this.state;
        return _.split(path, '/', 2)[1]
    }

    renderMenu() {

        return <div className="app-page-sidebar-container">
            <div className="app-sidebar animated fadeInLeft">
                <div className="left">
                    <ul>
                        <li key="00--1">
                            <Tooltip id="popover-trigger-hover-focus" position="right" text="Dashboard" title="" type="tooltip">
                                <a
                                    onClick={() => this.redirect('/home')}
                                    className={this.basePath() === 'home' ? 'active' : ''}
                                >
                                    <i className="fas fa-tachometer-alt"></i>
                                    <i className="fal fa-tachometer-alt"></i>
                                </a>
                            </Tooltip>
                        </li>
                        <li key="00--2">
                            <Tooltip id="popover-trigger-hover-focus" position="right" text="Belediye Yönetim Sistemi" title="" type="tooltip">
                                <a
                                    onClick={() => this.redirect('/municipality-management-system')}
                                    className={this.basePath() === 'municipality-management-system' ? 'active' : ''}
                                >
                                    <i className="fas fa-allergies"></i>
                                    <i className="fal fa-allergies"></i>
                                </a>
                            </Tooltip>
                        </li>
                        <li key="00--3">
                            <Tooltip id="popover-trigger-hover-focus" position="right" text="İş Süreçleri Yönetimi" title="" type="tooltip">
                                <a>
                                    <i className="fas fa-briefcase"></i>
                                    <i className="fal fa-briefcase"></i>
                                </a>
                            </Tooltip>
                        </li>
                        <li key="00--4">
                            <Tooltip id="popover-trigger-hover-focus" position="right" text="İnteraktif Harita" title="" type="tooltip">
                                <a>
                                    <i className="fas fa-map"></i>
                                    <i className="fal fa-map"></i>
                                    <span className="count">3</span>
                                </a>
                            </Tooltip>
                        </li>
                        <li key="00--5">
                            <Tooltip id="popover-trigger-hover-focus" position="right" text="İş Zekası" title="" type="tooltip">
                                <a>
                                    <i className="fas fa-chess-knight"></i>
                                    <i className="fal fa-chess-knight"></i>
                                </a>
                            </Tooltip>
                        </li>
                        <li key="00--6">
                            <Tooltip id="popover-trigger-hover-focus" position="right" text="Elektronik Belge Yönetim Sistemi" title="" type="tooltip">
                                <a>
                                    <i className="fas fa-conveyor-belt-alt"></i>
                                    <i className="fal fa-conveyor-belt-alt"></i>
                                </a>
                            </Tooltip>
                        </li>
                        <li key="00--7">
                            <Tooltip id="popover-trigger-hover-focus" position="right" text="Döküman Yönetim Sistemi" title="" type="tooltip">
                                <a>
                                    <i className="fas fa-file-alt"></i>
                                    <i className="fal fa-file-alt"></i>
                                </a>
                            </Tooltip>
                        </li>
                        <li key="00--8">
                            <Tooltip id="popover-trigger-hover-focus" position="right" text="Yönetim Bilgi Sistemi" title="" type="tooltip">
                                <a>
                                    <i className="fas fa-sliders-v"></i>
                                    <i className="fal fa-sliders-v"></i>
                                </a>
                            </Tooltip>
                        </li>
                        <li key="00--9">
                            <Tooltip id="popover-trigger-hover-focus" position="right" text="Başvuru Yönetimi" title="" type="tooltip">
                                <a>
                                    <i className="fas fa-folder"></i>
                                    <i className="fal fa-folder"></i>
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

export default withRouter((Sidebar as any));
