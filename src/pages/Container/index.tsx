import * as React from 'react';
import * as _ from 'lodash';
import {withRouter} from 'react-router-dom'
import {NotFound} from '../../components'
import {connect} from "react-redux";

interface TabMenu {
    name: string,
    link: string,
    active: boolean
}

interface Props {
    history: any,
    tabMenu: TabMenu[]
}

interface State {
    errorMessage: string,
    tabMenu: any,
    location: any,
    basePath: any,
    query: any
}

const tryRequire = (path:any) => {
    try {
        return require(`${path}`);
    } catch (err) {
        return null;
    }
};

class Container extends React.Component<Props, State> {
    public state: State;

    constructor(props: Props, state: State) {
        super(props, state);
        let x:any = localStorage.getItem('tabMenu');
        let tabMenu = JSON.parse(x);

        this.state = {
            ...state,
            tabMenu: tabMenu
        }
    }

    componentWillReceiveProps(nextProps: any) {
        if (_.difference(nextProps.tabMenu, this.state.tabMenu)) {
            this.setState({
                tabMenu: nextProps.tabMenu
            })
        }
    }

    tabContainer() {
        const {tabMenu} = this.state;

        if (tabMenu && tabMenu.length) {
            return tabMenu.map((item: any,i:number) => {
                let path:any = `.${item.link}`;
                if (path && tryRequire(path)) {
                    let LoadComponent = tryRequire(path).default;
                    return <div className="tab" style={{display: item.active ? 'block' : 'none'}} key={i}>
                        <LoadComponent
                            location={this.props}
                            basePath={this.state.basePath}
                            pathQuery={this.state.query}
                        />
                    </div>
                } else {
                    return <div key={i} style={{display: item.active ? 'block' : 'none', height:'100%'}} className="notfound-container"><NotFound /></div>
                }
            })
        }
    }

    render() {
        return this.tabContainer()
    }
}

const mapStateToProps = (state: any) => ({
    tabMenu: state.store.tabMenu,
});

export default withRouter(connect(mapStateToProps)(Container) as any)
