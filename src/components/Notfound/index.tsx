import * as React from 'react';
import './style.css'

class Notfound extends React.Component<{},{}> {

    render() {
        return (
            <div className="notfound">
                <div className="container text-center">
                    <h1 data-text="404">404</h1>
                    <span>Böyle bir sayfa bulunamadı</span>
                    <div className="clearfix"></div>
                </div>
            </div>
        );
    }
}

export default Notfound
