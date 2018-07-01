import React, {Component} from 'react'
import './_shared/styles/main.css';
import {Sidebar, Header, MessageBox} from './components'

export default class App extends Component {
    render() {
        return (
            <div className={`app-container`} lang={navigator.language || navigator.languages[0]}>
                <Header/>
                <Sidebar location={this.props.location}/>
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
}
