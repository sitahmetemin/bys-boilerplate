import * as React from 'react';
import {withRouter} from 'react-router-dom'
import _ from 'lodash'

class Auth extends React.Component {

    componentDidMount() {

        const isAuthorized = JSON.parse(localStorage.getItem('userInfo'));

        if(_.isEmpty(isAuthorized) || !isAuthorized.token || _.isEmpty(isAuthorized.token)) {
            this.props.history.push('/login');
        }


    }

    render() {
        return this.props.children
    }
}

export default withRouter(Auth);