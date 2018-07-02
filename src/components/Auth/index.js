import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import _ from 'lodash'

class Auth extends Component {

    constructor(props) {
        super(props);

        this.state = {
            login: false
        }
    }

    async componentDidMount() {
        const isAuthorized = await JSON.parse(localStorage.getItem('userInfo'));
        if (!isAuthorized || _.isEmpty(isAuthorized)) {
            window.location = '/login';

            return false;
        } else {
            this.setState({
                login:true
            })
        }
    }

    renderChild() {
        if (this.state.login) {
            return this.props.children
        }
        return null
    }


    render() {
        return this.renderChild()
    }
}

export default withRouter(Auth);