import React, {Component} from 'react'
import './style.css'
import {connect} from 'react-redux'
import {dataAction} from '../../_shared/redux/action'
import _ from 'lodash'


class MessageBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: this.props.messages
        }

    }

    componentWillReceiveProps(nexProps) {
        let {messages} = this.props;

        if (_.difference(nexProps.messages, messages)) {
            this.setState({
                messages : _.reverse(_.difference(nexProps.messages, messages))
            })
        }
    }

    removeMessage(val) {
        let mess = this.state.messages;

        _.remove(mess, function(n,a) {
            return a === val;
        });

        this.setState({
            messages : mess
        }, () => {
            this.action('removeMessage', mess)
        })
    }

    action(execSource, value) {
        const {dispatch} = this.props;
        let actionList = {
            source: execSource,
            value: value,
            actions: {
                removeMessage: {
                    value: value,
                    targetPath: 'messageBox'
                }
            }
        };
        dispatch(dataAction(actionList));
    }

    renderMessages() {
        return this.state.messages.map((item,i) => {
            return <div className={`message-box ${item.type && _.isEmpty(item.type) ? item.type : 'success'} animated slideInDown`} key={i}>
                <div className="text ">
                    <div className="icon">
                        <i className="material-icons i-success">done</i>
                    </div>
                    <div className="message">
                        {item.text}
                    </div>
                    <div className="close" onClick={()=> this.removeMessage(i)}>
                        <i className="material-icons">close</i>
                    </div>
                </div>
            </div>
        })
    }
    render() {

        if (this.state.messages.length > 0) {
            return <div className="digi-message-box">
                {this.renderMessages()}
            </div>
        }

        return null
    }
}

const mapStateToProps = state => ({
    messages: state.store.messageBox
});

export default connect(mapStateToProps)(MessageBox);