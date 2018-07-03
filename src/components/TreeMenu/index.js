import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import TooltipModal from "../../_basecomponents/Tooltip";
import classNames from 'classnames'
import {connect} from 'react-redux';
import {dataAction, store} from "../../_redux";
import {getNestedChildren} from '../../_functions'
import './style.css'
import {data} from "../Sidebar/data";

class Tree extends Component {

    constructor(props) {
        super(props);

        let localMenu = JSON.parse(localStorage.getItem('stateMenu'));
        let fastMenu = JSON.parse(localStorage.getItem('fastMenu'));
        this.state = {
            menu: localMenu ? localMenu : {},
            fastMenu: fastMenu ? fastMenu : []
        }
    }

    addPage(val) {
        this.props.history.push(val.link)
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

    initialMenu(val, status) {
        if (status === 'success') {
            this.setState({
                ...this.state,
                menu: [
                    ...getNestedChildren(val, -1),
                    ...data
                ]
            }, () => {

                let x = [
                    ...val,
                    ...data
                ];

                localStorage.setItem('storeMenu', JSON.stringify(x));
                localStorage.setItem('stateMenu', JSON.stringify(this.state.menu))
            })
        }
    }

    addMenu(val) {
        let {fastMenu} = this.state;

        if (fastMenu.length === 0) {
            fastMenu = [{
                name: val.name,
                link: val.link,
                id: val.id
            }]
        } else {
            let a = _.filter(fastMenu, item => item.id === val.id);

            if (a.length === 0) {
                fastMenu.push({
                    name: val.name,
                    link: val.link,
                    id: val.id
                })
            }
        }

        this.setState({
            fastMenu: fastMenu
        },()=> {
            localStorage.setItem('fastMenu', JSON.stringify(fastMenu))
            this.action('fastMenu', this.state.fastMenu)
        })

    }

    action(execSource, value) {
        const {dispatch} = store;
        let actionList = {
            source: execSource,
            value: value,
            actions: {
                fastMenu: {
                    value: value,
                    targetPath: 'fastMenu'
                }
            }
        };
        dispatch(dataAction(actionList));
    }

    treeMenu = (items, ulClass) => {
        let cx = classNames({
            'app-treeview-component': ulClass === 0,
        });

        return <ul className={cx}>
            {
                items.map((item, i) => {
                    if (item.id && item.parentId) {
                        let title = '',
                            icon = '';
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
                            icon = <div className="add-menu" onClick={()=> this.addMenu(item)}><i className="fal fa-plus-circle"></i></div>
                        }

                        let ca = classNames({
                            'open': item.collapse,
                        });

                        return <li key={i} className={ca}>
                            {title}
                            {icon}
                            {
                                item.children ? this.treeMenu(item.children, null) : null
                            }
                        </li>
                    }
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

const mapStateToProps = (state) => ({
    fastMenu: state.store.fastMenu
});

export default withRouter(connect(mapStateToProps)(Tree))