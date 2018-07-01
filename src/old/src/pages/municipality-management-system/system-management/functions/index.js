import React, {Component} from 'react';
import {Button, Table, TableHeader} from '../../../../_shared/components/index'
import {dataAction} from "../../../../_shared/redux/action";
import {redirect} from "../../../../_shared/functions";
import Title from "../../title";
import _ from 'lodash'
import {connect} from "react-redux";
import {Helmet} from "react-helmet";
import {MessageBox} from '../../../../components'
import './style.css'

class Functions extends Component {

    constructor(props) {
        super(props);

        let path = this.props.location,
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
            query = path.location.query
        }

        this.state = {
            basePath: basePath,
            functions: []
        }
    }

    componentDidMount() {
        this.action('functions')
    }

    functionsData(val, status) {
        if (status === 'success') {
            this.setState({
                functions: val
            })
        }
    }

    tableClick(val, type) {
        const {basePath} = this.state;

        if (!_.isEmpty(val) && type === 'edit' || !type) {
            redirect(`${basePath}/functions/edit?id=${val.id}`)
        }

        if (!_.isEmpty(val) && type === 'delete') {
            let x = this.state.functions;
            _.remove(x, val);

            this.setState({
                functions: x
            }, () => this.action('remove', val.id))

        }
    }

    action(execSource, value) {
        const {dispatch} = this.props;
        let actionList = {
            source: execSource,
            value: value,
            actions: {
                functions: {
                    request: {
                        method: 'GET',
                        url: '/functions',
                    },
                    func: (val, status) => this.functionsData(val.mms.systemManagement.functions.data, status),
                    targetPath: 'mms.systemManagement.functions.data'
                },
                remove: {
                    request: {
                        method: 'DELETE',
                        url: `/functions/${value}`,
                    },
                    success: {
                        messages: [{
                            text: 'Silme işlemi başarılı'
                        }]
                    },
                    targetPath: 'mms.systemManagement.functions.data'
                }
            }
        };
        dispatch(dataAction(actionList));
    }

    renderFunctions() {
        const {functions} = this.state

        if (functions && functions.length) {
            return <div>
                <div className="page-box animated fadeIn">
                    <Table
                        data={functions}
                        clickRow={true}
                        iconPosition="right"
                        search={false}
                        iconList={[
                            {
                                icon: 'edit',
                                type: 'edit',
                                toolTip: 'Düzenle'
                            },
                            {
                                icon: 'delete',
                                type: 'delete',
                                toolTip: 'Sil'
                            }
                        ]}
                        onClick={(val, type) => this.tableClick(val, type)}
                    >
                        <TableHeader dataField='name'>Fonksiyon Adı</TableHeader>
                        <TableHeader dataField='description'>Açıklama</TableHeader>
                    </Table>
                </div>
                <div className="page-box margin-top-2 padding-10">
                    {functions.length} kayıt var
                </div>
            </div>
        }
    }

    renderLeftSide() {
        return <div className="activity-container animated fadeInLeft">
            <Button
                type="button"
                button="primary"
                upperCase={false}
                bold={true}
                name="Button_name"
                onClick={() => redirect(`${this.state.basePath}/functions/new`)}
                icon={'playlist_add'}
                toolTip={{
                    position: 'right',
                    text: 'Fonksiyon Ekle'
                }}
            />
            <Button
                type="button"
                button="black-line"
                upperCase={false}
                bold={true}
                disabled={true}
                name="Button_name"
                onClick={() => redirect(`${this.state.basePath}/functions`)}
                icon={'functions'}
                toolTip={{
                    position: 'right',
                    text: 'Tüm Fonksiyonlar'
                }}
            />
        </div>
    }

    render() {

        return <div>
            <Helmet>
                <title>Fonksiyonlar</title>
            </Helmet>
            <MessageBox />
            {this.renderLeftSide()}
            <div className="components-container">
                <Title
                    title={'Fonksiyonlar'}
                    icon={'functions'}
                    nav={['Sistem Yönetimi', 'Fonksiyonlar']}
                >
                </Title>
                {this.renderFunctions()}
            </div>
        </div>
    }
}


const mapStateToProps = state => ({
    users: state.store.mms.systemManagement.users,
});

export default connect(mapStateToProps)(Functions);
