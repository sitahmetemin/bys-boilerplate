import React, {Component} from 'react';
import './style.css'
import _ from 'lodash'


export default class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            location: this.props.location,
            basePath: null,
            query: null
        }
    }

    componentDidMount() {

        let path = this.props,
            homePath = 'municipality-management-system',
            somePath,
            basePath,
            query = null;

        if (path.params && !_.isEmpty(path.params)) {
            somePath = path.params.basePath;
            basePath = `${homePath}/${somePath}`
        } else {
            basePath = homePath
        }

        if (path.location && !_.isEmpty(path.location.query)) {
            query= path.location.query
        }

        this.setState({
            basePath: basePath,
            query: query
        })

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            this.setState({
                location: nextProps.location,
                basePath: this.state.basePath,
                query: this.state.query
            })
        }
    }

    render() {

        return (
            <div className="mms-dashboard">
                <div className="mms-title">
                    Uygulamalar
                </div>
                <div className="row mms">
                    <div className="col-sm-2">
                        <div className="title">
                            Sistem Yönetimi
                        </div>
                        <div className="count">
                            6
                            <span>Sayfa</span>
                        </div>
                        <i className="material-icons">dashboard</i>
                    </div>
                    <div className="col-sm-2">
                        <div className="title">
                            E-Devlet Entegrasyonu
                        </div>
                        <div className="count">
                            23
                            <span>Sayfa</span>
                        </div>
                        <i className="material-icons">settings_input_hdmi</i>
                    </div>
                    <div className="col-sm-2">
                        <div className="title">
                            Gayrimenkul Yönetimi
                        </div>
                        <div className="count">
                            18
                            <span>Sayfa</span>
                        </div>
                        <i className="material-icons">streetview</i>
                    </div>
                    <div className="col-sm-3">

                    </div>
                    <div className="clearfix"></div>
                    <hr/>
                </div>
                <div className="mms-title">
                    Günlük Sık Kullandıklarım
                </div>
                <div className="row mms">
                    <div className="col-sm-2">
                        <div className="title">
                            Hukuk Modülleri
                        </div>
                        <div className="count">
                            16
                            <span>Sayfa</span>
                        </div>
                        <i className="material-icons">pan_tool</i>
                    </div>
                    <div className="col-sm-2">
                        <div className="title">
                            Belge Yönetimi
                        </div>
                        <div className="count">
                            11
                            <span>Sayfa</span>
                        </div>
                        <i className="material-icons">work</i>
                    </div>
                    <div className="col-sm-2">
                        <div className="title">
                            Meclis
                        </div>
                        <div className="count">
                            2
                            <span>Sayfa</span>
                        </div>
                        <i className="material-icons">vpn_key</i>
                    </div>
                    <div className="col-sm-3">

                    </div>
                    <div className="clearfix"></div>
                    <hr/>
                </div>
            </div>
        );
    }
}
