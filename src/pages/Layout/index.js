import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {Sidebar, Footer} from '../../components'
import './style.css'

class Layout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            path: this.props.match.path,
        }
    }

    render(){
        return (
            <div className="app-container">
                <Sidebar/>
                <Footer
                    routeInfo={this.props}
                />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default withRouter(Layout);