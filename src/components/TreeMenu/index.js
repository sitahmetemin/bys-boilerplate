import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import _ from 'lodash'
import TooltipModal from "../../_basecomponents/Tooltip";
import {connect} from 'react-redux'
import {dataAction, store} from "../../_redux";
import classNames from 'classnames'
import './style.css'

class Tree extends Component {

    constructor(props) {
        super(props);

        let localMenu = JSON.parse(localStorage.getItem('stateMenu'));
        this.state = {
            menu: localMenu ? localMenu : {},
        }
    }

    componentDidMount() {
        this.clearLocalStorage();
        let stateMenu = JSON.parse(localStorage.getItem('stateMenu'));
        if (!stateMenu) {
            this.action('menu')
        } else {
            this.setState({
                menu: stateMenu
            });
        }

    }

    clearLocalStorage() {
        let hours = 24;
        let now = new Date().getTime();
        let setupTime = localStorage.getItem('setupTime');

        if (setupTime == null) {
            localStorage.setItem('setupTime', now)
        } else {
            if(now - setupTime > hours*60*60*1000) {
                localStorage.clear();
                localStorage.setItem('setupTime', now);
            }
        }
    }

    getNestedChildren = (arr, parent) => {
        let out = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].parentId !== arr[i].vsm1progsId) {
                if (arr[i].parentId === parent) {
                    let x = this.getNestedChildren(arr, arr[i].vsm1progsId)
                    if (x.length) {
                        arr[i].children = x
                    }
                    out.push(arr[i])
                }
            }
        }
        return out
    };

    initialMenu(val, status) {
        if (status === 'success') {
            this.setState({
                menu: [
                    ...this.getNestedChildren(val, -1)
                ]
            }, () => {
                localStorage.setItem('storeMenu', JSON.stringify(val));
                localStorage.setItem('stateMenu', JSON.stringify(this.state.menu))
            })
        }
    }

    addPage(val) {
        this.action('activeMenu',val);
        this.props.history.push(val.link)
    }

    action(execSource, value) {
        const {dispatch} = store;
        let actionList = {
            source: execSource,
            value: value,
            actions: {
                menu: {
                    request: {
                        method: 'GET',
                        url: '/menu',
                    },
                    func: (val, status) => this.initialMenu(val.treeMenu.storeMenu.items, status),
                    targetPath: 'treeMenu.storeMenu'
                },
                activeMenu: {
                    value: value,
                    targetPath: 'activeMenu'
                }
            }
        };
        dispatch(dataAction(actionList));
    }

    handleClick = (val) => {
        let menu = JSON.parse(localStorage.getItem('storeMenu'));
        menu.filter((item) => {
            if (item.vsm1progsId === val) {
                item.collapse = !item.collapse
            }
            return null
        });
        this.initialMenu(menu, 'success')
    };

    treeMenu = (items, ulClass) => {
        let cx = classNames({
            'app-treeview-component': ulClass === 0,
        });

        return <ul className={cx}>
            {
                items.map((item, i) => {

                    let title = '';
                    if (item.children) {
                        title = <div className="app-treeview-menu-title" onClick={() => this.handleClick(item.vsm1progsId)}>
                            <i className="fal fa-angle-right"></i>
                            {item.name}
                        </div>
                    } else {
                        /*if (!this.isTabMenu(item).length) {
                            title = <a onClick={()=> this.addPage(item)}>{item.name}</a>
                        } else {
                            title = <TooltipModal id="popover-trigger-hover-focus" position="right" text="Bu sayfa zaten açık" title="" type="tooltip">
                                <a>{item.name}</a>
                            </TooltipModal>
                        }*/
                        title = <a onClick={()=> this.addPage(item)}>{item.name}</a>
                    }

                    let ca = classNames({
                        'open': item.collapse,
                    });

                    return <li key={i} className={ca}>
                        {title}
                        {
                            item.children ? this.treeMenu(item.children, null) : null
                        }
                    </li>
                })
            }
        </ul>

    };

    render() {
        let {menu} = this.state;
        if (menu.length) {
            return (
                this.treeMenu(menu, 0)
            )
        }
        return null
    }
}

const mapStateToProps = state => ({
    menu: state.store.treeMenu,
    // tabMenu: state.store.tabMenu,
});

export default withRouter(connect(mapStateToProps)(Tree))