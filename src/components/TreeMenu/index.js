import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import TooltipModal from "../../_basecomponents/Tooltip";
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

    treeMenu = (items, ulClass) => {
        let cx = classNames({
            'app-treeview-component': ulClass === 0,
        });

        return <ul className={cx}>
            {
                items.map((item, i) => {
                    if (item.id && item.parentId) {
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

export default withRouter(Tree)