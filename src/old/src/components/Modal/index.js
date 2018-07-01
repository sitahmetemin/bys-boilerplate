import React, {Component} from 'react';
import {Button} from '../../_shared/components/index'
import './style.css'

export default class Modal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            show: this.props.show
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.show !== this.state.show) {
            this.setState({
                show: nextProps.show
            })
        }
    }

    hideModal() {
        this.setState({
            show: !this.state.show
        },()=> {
            this.props.dataReady()
        })
    }

    render() {
        const {show} = this.state;

        if(show) {
            return <div className="modal-side">
                <div className="modal-side-close">
                    <Button
                        type="button"
                        button="black-line"
                        name="modal-close"
                        id="new-user"
                        onClick={()=>this.hideModal()}
                        icon={'close'}
                    />
                </div>
                {this.props.children}
            </div>
        }

        return null
    }
}
