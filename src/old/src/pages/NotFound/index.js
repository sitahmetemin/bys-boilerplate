import React, {Component} from 'react';
import './style.css'
const img = '/notfound.png';
export default class NotFound extends Component {

    render() {

        return (
            <div className="page" dangerouslySetInnerHTML={{__html: '<iframe width="100%" height="100%" src="https://digikent.basaksehir.bel.tr:8843/digikentui/pages/html/index.xhtml"></iframe>'}}>
                {/*<div className="page-content">
                    <div className="page-box full-center bg-transparent margin-auto animated fadeInLeft">
                        <img src={img} alt=""/>
                        <div className="not-found-text">
                            Bu sayfa henüz hazır değil yada gitmeye çalıştığınız adres hatalı.
                        </div>
                    </div>
                </div>*/}
            </div>

        );
    }
}
