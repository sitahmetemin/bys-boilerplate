import React, {Component} from 'react';
import './style.css'
import Sidebar from './sidebar'
import _ from 'lodash'

const tryRequire = (path) => {
    try {
        return require(`${path}`);
    } catch (err) {
        return null;
    }
};

export default class Municipality extends Component {

    constructor(props) {
        super(props)
        this.state = {
            location: this.props.location,
            basePath: null,
            query: null
        }
    }

    componentDidMount() {

        let path = this.props,
            homePath = 'municipality-management-system',
            somePath,
            basePath,
            query = null;

        if (path.params && !_.isEmpty(path.params)) {
            somePath = path.params.basePath;
            basePath = `${homePath}/${somePath}`
        } else {
            basePath = homePath
        }

        if (path.location && !_.isEmpty(path.location.query)) {
            query= path.location.query
        }

        this.setState({
            basePath: basePath,
            query: query
        })

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            this.setState({
                location: nextProps.location,
                basePath: this.state.basePath,
                query: this.state.query
            })
        }
    }

    render() {

        let x = this.state.location.pathname,
            componentPath = `.${_.replace(x,'municipality-management-system/','')}`,
            path = tryRequire(componentPath),
            LoadComponent;

        if (path) {
            LoadComponent = tryRequire(componentPath).default
        } else {
            LoadComponent = tryRequire('./Dashboard').default
        }

        return (
            <div className="page">
                <div className="sidebar animated fadeInLeft">
                    <Sidebar/>
                </div>
                <div className="page-content">
                    <LoadComponent
                        location={this.props}
                        basePath={this.state.basePath}
                        pathQuery={this.state.query}
                    />
                </div>
            </div>
        );
    }
}
