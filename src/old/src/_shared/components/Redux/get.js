import React, {Component} from 'react'
import {connect} from 'react-redux'
import {dataAction} from '../../redux/action'
import '../demo-style.css'

class Get extends Component {

    componentDidMount() {
        this.action('post')
    }

    funcapp(val, status) {
        // console.log('Func---',val, status)
    }

    action(execSource, value) {
        const {dispatch} = this.props;
        let actionList = {
            source: execSource,
            value: value,
            actions: {
                post: {
                    request: {
                        method: 'POST',
                        url: 'http://localhost:4000/data',
                        params: {
                            "postId": 1,
                            "id": String(new Date()),
                            "name": "alias odio sit",
                            "email": "Lew@alysha.tv",
                            "body": "non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati"
                        }
                    },
                    success: {
                        triggers: ['trig'],
                        messages: [
                            {
                                text:'Post işlemi başarıyla gerçekleşti'
                            }
                        ]
                    },
                    targetPath: 'app.post'
                },
                get: {
                    request: {
                        method: 'GET',
                        url: 'http://localhost:4000/data',
                    },
                    success: {
                        messages: [
                            {
                                text:'Bu action 3 saniye sonra gönderildi'
                            }
                        ]
                    },
                    // redirect: '/components/',
                    func: (val, status)=> this.funcapp(val, status),
                    targetPath: 'app.obj'
                },
                trig: {
                    request: {
                        method: 'GET',
                        url: 'http://localhost:4000/trigdata',
                    },
                    success: {
                        triggers: ['get:3000', 'app']
                    },
                    targetPath: 'app.trig',
                },
                app: {
                    value: 'Merhaba dunya',
                    targetPath: 'app.hello'
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
                        <p>
                            Bu data 'GET' yapılarak alınmıştır.
                        </p>
                        <br/>

                        {
                            this.props.store.app.obj && this.props.store.app.obj.map(function (item,i) {
                                return <li key={i}>
                                    {item.name}
                                </li>
                            })
                        }
                    </div>
                    <div className="clearfix"></div>
                    <hr/>
                    <div className="col-md-6">
                        <div className="title">
                            Kullanım
                        </div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="col-md-12">
                        <pre><code>
                            {`

                            Çağrılma---
                            this.action('post')

                            Action'lar---

                            action(execSource, value) {
                                const {dispatch} = this.props;
                                let actionList = {
                                    source: execSource,
                                    value: value,
                                    actions: {

                                        post: {
                                            request: {
                                                method: 'POST',
                                                url: 'http://localhost:4000/data',
                                                params: {
                                                    "postId": 1,
                                                    "id": String(new Date),
                                                    "name": "alias odio sit",
                                                    "email": "Lew@alysha.tv",
                                                    "body": "non et atque\\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\\nquia voluptas consequuntur itaque dolor\\net qui rerum deleniti ut occaecati"
                                                }
                                            },
                                            success: {
                                                triggers: ['trig']
                                            },
                                            targetPath: 'app.post'
                                        },

                                        get: {
                                            request: {
                                                method: 'GET',
                                                url: 'http://localhost:4000/data',
                                            },
                                            success: {
                                                messages: [
                                                    {
                                                        text:'{{app.trig[0].id}} asdasd'
                                                    },
                                                    {
                                                        text:'asdassdfghdfhgjgfhjdasd'
                                                    }
                                                ]
                                            },
                                            // redirect: '/components/',
                                            func: (val, status)=> this.funcapp(val, status),
                                            targetPath: 'app.obj'
                                        },

                                        trig: {
                                            request: {
                                                method: 'GET',
                                                url: 'http://localhost:4000/trigdata',
                                            },
                                            success: {
                                                triggers: ['get', 'app']
                                            },
                                            targetPath: 'app.trig',
                                        },

                                        app: {
                                            value: 'Merhaba dunya',
                                            targetPath: 'app.hello',
                                            success: {
                                                messages: [
                                                    {
                                                        text:'okan'
                                                    },
                                                    {
                                                        text:'eee'
                                                    }
                                                ]
                                            }
                                        }

                                    }
                                };
                                dispatch(dataAction(actionList));
                            }


                            ilk olarak 'post' action'ı çağrıldı ve servise POST işlemi yapıldı, post action'ı success olduğunda, yani POST işlemi başarılı olduğunda 'trig' action'ı çağrıldı.
                            trig action'ı başarılı olduğunda, senkron olarak 'get' ve 'app' action'ları sırasıyla çalıştırıldı.
                            get action'ında bir önceki action olan trig action'ından gelen datasından mesaj için id alanı kullanıldı. sonraki action olan 'app' çalıştırılmadan önce
                            'funcapp' fonksiyonu çalıştı, ve işlemin statusu ve storun son hali gönderildi. Bu durumlara göre fonksiyonda işlem yapılıp, sonrasında senkton 'app' action'ı çalıştı.
                            'app' action'ında normal veri kaydedildi.


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
    store: state.store
});

export default connect(mapStateToProps)(Get);

