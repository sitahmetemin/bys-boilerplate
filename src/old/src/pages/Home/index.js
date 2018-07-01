import React, {Component} from 'react';
import './style.css'
const cover = '/digi-cover.png';

export default class HomePage extends Component {

    render() {
        return (
            <div className="page-home">
                <img src={cover} alt=""/>
            </div>
        );
    }
}
