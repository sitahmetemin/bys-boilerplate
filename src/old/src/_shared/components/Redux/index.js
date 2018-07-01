import React, {Component} from 'react'
import {connect} from 'react-redux'
import {dataAction} from '../../redux/action'
import '../demo-style.css'

class Redux extends Component {

    componentDidMount() {
        this.action('test','Bu yazı önce redux store\'a yazıldı, sonra ekranda gösterildi.')
    }

    action(execSource, actionParams) {
        const {dispatch} = this.props;
        let actionList = {
            source: execSource,
            params: actionParams,
            actions: {
                test: {
                    value: actionParams,
                    targetPath: 'app.test'
                }
            }
        };
        dispatch(dataAction(actionList));
    }

    render() {
        return (
            <div className="demo-page">
                <div className="title">
                    Redux Test
                </div>
                <div className="row">
                    <div className="col-md-12">
                        {this.props.store.app.test}
                    </div>
                    <div className="clearfix"></div>
                    <hr/>
                    <div className="col-md-6">
                        <div className="title">
                            Kullanım
                        </div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="col-md-8">
                        <pre><code>
                            {`
                            componentDidMount() {
                                // action fırlatma:

                                this.action('test','Bu yazı önce redux store\\'a yazıldı, sonra ekranda gösterildi.')
                            }

                            // Çalışacak kod --- actions objesi içindeki her item, bir action olur.
                            action(execSource, actionParams) {
                                const {dispatch} = this.props;
                                let actionList = {
                                    source: execSource,
                                    params: actionParams,
                                    actions: {
                                        test: {
                                            value: actionParams,
                                            targetPath: 'app.test'
                                        }
                                    }
                                };
                                dispatch(dataAction(actionList));
                            }

                            // sayfanın en altında çağrılırken:

                            const mapStateToProps = state => ({
                                store: state.store,
                            });

                            // ekranda kullanırken

                            this.props.store[path]

                            `}
                        </code></pre>
                    </div>

                </div>
                <div className="clearfix"></div>

            </div>
        )
    }
}



const mapStateToProps = state => ({
    store: state.store,
});

export default connect(mapStateToProps)(Redux);

