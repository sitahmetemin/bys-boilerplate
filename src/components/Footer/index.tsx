import * as React from 'react'
import * as _ from 'lodash'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import {dataAction, store} from "../../_redux";
import {isMenu, getMenu} from '../../_functions'

import './style.css'

interface Props {
    routeInfo: any,
    history: any
}

interface TabMenu {
    active: boolean,
    link: string,
    name: string
}

interface State {
    tabMenu: TabMenu[],
    selectedMenu: string
}

class Footer extends React.Component<Props, State> {
    public state: State;

    constructor(props: Props, state: State) {
        super(props, state);
        this.state= {
            ...state
        }

    }

    componentDidMount() {
        let a = this.menuControl(this.props);
        let x:any = [];

        if (isMenu(a)[0]) {
            x = isMenu(a)[0]
        } else {
            x = a
        }

        let tabMenu:any = getMenu(x);

        this.state = {
            ...this.state,
            tabMenu: tabMenu
        };

        this.tabMenuUpdate(tabMenu)
    }

    componentWillReceiveProps(nextProps: any) {
        if (nextProps.routeInfo.location.pathname !== this.props.routeInfo.location.pathname) {

            let a = this.menuControl(nextProps);
            let x:any = [];
            if (isMenu(a)[0]) {
                x = isMenu(a)[0]
            } else {
                x = a
            }

            let tabMenu:any = getMenu(x);

            this.setState({
                ...this.state,
                tabMenu: tabMenu
            }, ()=> {
                this.tabMenuUpdate(tabMenu)
            })

        }
    }

    menuControl(props: any) {
        let a: any = localStorage.getItem('storeMenu');
        let storeMenu = JSON.parse(a);

        let x: any = _.filter(storeMenu, (item: any) => {
            if (item.link === _.trimEnd(props.routeInfo.location.pathname,'/')) {
                return item
            }
        });

        if (x.length) {
            return x[0]
        }

        return null
    }

    action(execSource: string, value: any): void {
        const {dispatch} = store;
        let actionList = {
            source: execSource,
            value: value,
            actions: {
                tabUpdate: {
                    value: value,
                    targetPath: 'tabMenu'
                }
            }
        };
        dispatch(dataAction(actionList));
    }

    selectTab(val: string) {
        this.props.history.push(val)
    }

    tabMenuUpdate = (x: any) => {

        this.setState({
            tabMenu: x
        });

        this.action('tabUpdate', x);
        localStorage.setItem('tabMenu', JSON.stringify(x))

    }

    removeTabItem(val: any) {
        const {tabMenu} = this.state;
        let x = tabMenu;

        _.remove(x, function (n) {
            return n.link === val;
        });

        if (x && x.length) {
            x.forEach((item, i) => {
                if (i === 0) {
                    this.props.history.push(item.link)
                }
            });
        }

        if (!x.length) {
            this.props.history.push('/')
        }

        this.tabMenuUpdate(x)

    }

    renderTab(): object | null {
        const {tabMenu} = this.state;

        if (tabMenu && tabMenu.length) {
            return tabMenu.map((item, i) => {
                return <li className={item.active ? 'active' : ''} key={i} onClick={() => this.selectTab(item.link)}>
                    {item.name}
                    <div className="close" onClick={() => this.removeTabItem(item.link)}>
                        <i className="far fa-times"></i>
                    </div>
                </li>
            })
        }

        return null
    }

    renderTabMenu() {
        const {tabMenu} = this.state;
        if (tabMenu && tabMenu.length) {
            return <div className="app-footer animated fadeInUp">
                <ul>
                    {this.renderTab()}
                </ul>
            </div>
        }

        return null
    }

    public render() {
        // console.log('---', this.state)
        return this.renderTabMenu()
    }
}

const mapStateToProps = (state: any) => ({
    tabMenu: state.store.tabMenu
});

export default withRouter(connect(mapStateToProps)(Footer) as any)