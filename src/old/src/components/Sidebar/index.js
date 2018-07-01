import React, {Component} from 'react';
import _ from 'lodash'
import {Link} from 'react-router'
import TooltipModal from "../../_shared/components/Tooltip";
import './sidebar.css';

export default class Sidebar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            menu: [
                {
                    url: '/',
                    text: 'Dashboard',
                    icon: 'av_timer',
                    sidebarBig: 'lg',
                    notificationCount: 0
                },
                {
                    url: '/municipality-management-system',
                    text: 'Belediye Yönetim Sistemi',
                    icon: 'dvr',
                    sidebarBig: 'md',
                    notificationCount: 0
                },
                {
                    url: '/business-process-management-system',
                    text: 'İş Süreçleri Yönetimi',
                    icon: 'assignment_turned_in',
                    sidebarBig: 'md',
                    notificationCount: 0
                },
                {
                    url: '/interactive-map',
                    text: 'İnteraktif Harita',
                    icon: 'public',
                    sidebarBig: 'md',
                    notificationCount: 5
                },
                {
                    url: '/business-mind',
                    text: 'İş Zekası',
                    icon: 'work',
                    sidebarBig: 'md',
                    notificationCount: 0
                },
                {
                    url: '/electronic-area-management-system',
                    text: 'Elektronik Belge Yönetim Sistemi',
                    icon: 'unarchive',
                    sidebarBig: 'md',
                    notificationCount: 0
                },
                {
                    url: '/document-management-system',
                    text: 'Döküman Yönetim Sistemi',
                    icon: 'create_new_folder',
                    sidebarBig: 'md',
                    notificationCount: 0
                },
                {
                    url: '/management-information-system',
                    text: 'Yönetim Bilgi Sistemi',
                    icon: 'fiber_smart_record',
                    sidebarBig: 'md',
                    notificationCount: 0
                },
                {
                    url: '/application-management',
                    text: 'Başvuru Yönetimi',
                    icon: 'beenhere',
                    sidebarBig: 'md',
                    notificationCount: 0
                }
            ]
        };
    }

    renderIconMenu() {
        const {location} = this.props;
        return <div className="digi-sidebar-icon animated slideInLeft">
            <div className="sidebar-left-icon">
                <ul>
                    {this.state.menu.map(function (item, index) {
                        return <li key={`${item.icon}-${index}`}>
                            <TooltipModal id="popover-trigger-hover-focus" position="right" text={item.text} title="" type="tooltip">
                                <Link to={item.url} activeClassName={_.replace(item.url,'/','') === _.split(location.pathname, '/', 2)[1] ? 'active' : ''}>
                                    <i className="material-icons">{item.icon}</i>
                                    {item.notificationCount !== 0 &&
                                    <span className="count">{item.notificationCount}</span>}
                                </Link>
                            </TooltipModal>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    }

    render() {
        return (
            <div>
                {this.renderIconMenu()}
            </div>
        );
    }
}
