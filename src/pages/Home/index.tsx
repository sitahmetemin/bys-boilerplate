import * as React from 'react';
// import './style.css'

class Home extends React.Component<{},{}> {

    render() {
        return (
            <div className="notfound">
                <div className="container text-center">
                    <h1 data-text="DigiSmart">DigiSmart</h1>
                    <span>Belediye Yönetim Sistemi</span>
                    <div className="clearfix"></div>
                </div>
            </div>
        );
    }
}

export default Home
