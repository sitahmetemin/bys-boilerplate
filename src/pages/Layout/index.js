import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {Sidebar, Footer} from '../../components'
import {connect} from 'react-redux'
import {dataAction, store} from "../../_redux";
import './style.css'
import {getNestedChildren} from "../../_functions";
import {data} from "../../components/Sidebar/data";
// import config from '../../config'

class Layout extends Component {

    constructor(props) {
        super(props);
        let localMenu = JSON.parse(localStorage.getItem('stateMenu'));

        this.state = {
            menu: localMenu ? localMenu : {},
            path: this.props.match.path,
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
                    confirm:true,
                    func: (val, status) => this.initialMenu(val.treeMenu.storeMenu.items, status),
                    targetPath: 'treeMenu.storeMenu'
                }
            }
        };
        dispatch(dataAction(actionList));
    }

    renderFooter() {
        const {tab} = this.props;

        if (tab) {
            return <Footer
                routeInfo={this.props}
            />
        }

        return null
    }

    render(){
        return (
            <div className="app-container">
                <Sidebar/>
                {this.renderFooter()}
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    menu: state.store.treeMenu,
});

export default withRouter(connect(mapStateToProps)(Layout))