import React, {Component} from 'react';

export default class Title extends Component {

    renderNav() {
        const {nav} = this.props;

        if (nav && nav.length) {
            return nav.map((item,i) => {
                return <li key={i} className={`breadcrumb-item ${i+1 === nav.length ? 'active' : ''}`}>{item}</li>
            })
        }
    }

    render() {
        return (
            <div className="page-box cover animated fadeInDown">
                <i className="material-icons cover-bg-icon">{this.props.icon}</i>
                <nav>
                    <ol className="breadcrumb">
                        {this.renderNav()}
                    </ol>
                </nav>
                <div className="cover-title">
                    {this.props.title}
                </div>
                {this.props.children}
            </div>
        )
    }
}

