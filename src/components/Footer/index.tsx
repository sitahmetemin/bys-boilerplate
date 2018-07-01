import * as React from 'react'
import * as _ from 'lodash'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import {dataAction, store} from "../../_redux";
import './style.css'

interface Props {
    routeInfo:any,
    activeMenu: any,
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

        let x:any = localStorage.getItem('tabMenu');
        let tabMenu = JSON.parse(x);

        if (tabMenu && tabMenu.length) {
            /*console.log('----')

            tabMenu.forEach((item: any, i: number) => {
                item.active = i === 0 ? true : false;
            });*/
        } else {


            let a:any = localStorage.getItem('storeMenu');
            let storeMenu = JSON.parse(a);

            let temData:any = {
                active: true,
                link: this.props.routeInfo.location.pathname,
                name: 'Default'
            }

             _.filter(storeMenu, (item:any) => {
                if (item.link === this.props.routeInfo.location.pathname) {
                    temData = {
                        active: true,
                        link: item.link,
                        name: item.name
                    }
                    return item
                }
            });

            tabMenu = [
                {
                    ...temData
                }
            ]

            this.tabMenuUpdate(tabMenu)

        }
        this.state = {
            ...state,
            tabMenu: tabMenu ? tabMenu : [],
        }

        console.log('_---', this.state)

    }

    componentDidMount() {

        const {tabMenu} = this.state;
        if (tabMenu && tabMenu.length) {
            this.tabMenuUpdate(tabMenu)
        }
    }

    isTabMenu(val:any) {

        let x:any = localStorage.getItem('tabMenu');
        let tabMenu = JSON.parse(x);
        return _.filter(tabMenu, item => {
            if(item.link === val.link) {
                return true
            } else {
                return false
            }
        });
    }

    componentWillReceiveProps(nextProps: any) {
        if (nextProps.routeInfo.location.pathname !== this.props.routeInfo.location.pathname) {


            let menuItem = nextProps.activeMenu;
            let x:any = localStorage.getItem('tabMenu');
            let tabMenu = JSON.parse(x);
            let menu = [];

            console.log('_---',_.split(nextProps.routeInfo.location.pathname,'/'), tabMenu)

            if (_.split(nextProps.routeInfo.location.pathname,'/').length === 2) {
                menuItem = {
                    active: true,
                    link: nextProps.routeInfo.location.pathname,
                    name: 'Default'
                }
            }

            if (tabMenu && !_.isArray(tabMenu)) {
                menu.push(tabMenu)
            } else if (!tabMenu) {
                menu = [{
                    active: true,
                    link: menuItem.link,
                    name: menuItem.name
                }];

            } else if (tabMenu && _.isArray(tabMenu) && tabMenu.length) {
                menu = tabMenu;

                if (!this.isTabMenu(menuItem).length) {
                    menu.forEach(item => {
                        item.active = false;
                    });

                    menu.push({
                        link: menuItem.link,
                        name: menuItem.name,
                        active: true
                    })
                } else {
                    menu.forEach(item => {
                        item.active = false;
                        if(menuItem.link === item.link) {
                            item.active = true;
                        }
                    });
                }
            }

            this.setState({
                tabMenu: menu
            });

            this.tabMenuUpdate(menu)
        }
    }

    redirect(val: any, status: string) {
        if (status === 'success') {
            this.props.history.push(this.state.selectedMenu)
        }
    }

    action(execSource: string, value: any): void {
        const {dispatch} = store;
        let actionList = {
            source: execSource,
            value: value,
            actions: {
                tabUpdate: {
                    value: value,
                    // func: (val: any, status: string) => this.redirect(val, status),
                    targetPath: 'tabMenu'
                },
                activeMenu: {
                    value: value,
                    targetPath: 'activeMenu'
                }
            }
        };
        dispatch(dataAction(actionList));
    }

    selectTab(val: string): void {
        const {tabMenu} = this.state;

        tabMenu.length && tabMenu.forEach(item => {
            item.active = item.link === val ? true : false;
        });

        this.setState({
            tabMenu: tabMenu,
            selectedMenu: val
        }, () => {
            // TODO: tıklandığında URL değiştirmesi için gelitirme yapılacak
            // this.action('activeMenu',val);
            this.tabMenuUpdate(this.state.tabMenu)
        })
    }

    tabMenuUpdate(x: any) {
        this.action('tabUpdate', x);
        localStorage.setItem('tabMenu', JSON.stringify(x))
    }

    removeTabItem(val: any) {
        const {tabMenu} = this.state;
        let x = tabMenu;

        _.remove(x, function(n) {
            return n.link === val;
        });

        if (x && x.length && val.active) {
            x.forEach((item, i) => {
                item.active = i === 0 ? true : false;
            });
        }

        this.tabMenuUpdate(x)

    }

    renderTab(): object | null {
        const {tabMenu} = this.state;

        if (tabMenu && tabMenu.length) {
            return tabMenu.map((item, i) => {
                return <li className={item.active ? 'active' : ''} key={i} onClick={() => this.selectTab(item.link)}>
                    {item.name}
                    <div className="close" onClick={()=> this.removeTabItem(item.link)}>
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
        return (this.renderTabMenu())
    }
}

const mapStateToProps = (state: any) => ({
    tabMenu: state.store.tabMenu,
    activeMenu: state.store.activeMenu,
});

export default withRouter(connect(mapStateToProps)(Footer) as any)