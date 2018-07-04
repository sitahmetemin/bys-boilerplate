import * as React from 'react';
import {withRouter} from 'react-router-dom'
import {Button, Form, Input,Helmet, Scroll, Table, TableHeader} from '../../../../../_basecomponents'
import {connect} from 'react-redux';
import {dataAction, store} from "../../../../../_redux";
import {TreeMenu} from '../../../../../components'
import * as _ from "lodash";


interface Props {
    history: any,
    match: any
}

interface State {
    name: string,
    description: string,
    errorMessage: string,
    sidebar: boolean,
    title: string,
    roles: any,
    formContainer: boolean
}

class AppComp extends React.Component<Props, State> {
    public state: State;

    constructor(props: Props, state: State) {
        super(props, state);

        this.state = {
            ...state,
            title: 'Roller',
            sidebar: false,
            formContainer: false
        }
    }

    componentDidMount() {
        this.action('getData', null)
    }

    handleChange(val: string, key: string): void {
        this.setState({
            ...this.state,
            [key]: val
        })
    }

    submit(): void {

    }

    initialGetData(val:any, status: string) {
        if (status === 'success') {
            this.setState({
                roles: val
            })
        }
    }


    tableClick(val: any, type: string) {
        // const {basePath} = this.state;

        /*if (!_.isEmpty(val) && type === 'edit' || !type) {
            redirect(`${basePath}/roles/edit?id=${val.id}`)
        }

        if (!_.isEmpty(val) && type === 'delete') {
            let x = this.state.roles;
            _.remove(x, val);

            this.setState({
                roles: x
            }, () => this.action('remove', val.id))

        }*/
    }


    renderTables() {
        const {roles} = this.state

        if (roles && roles.length) {
            return <div>
                <Table
                    data={roles}
                    clickRow={true}
                    iconPosition="right"
                    // search={true}
                    iconList={[
                        {
                            icon: 'edit',
                            type: 'edit',
                            toolTip: 'Düzenle'
                        },
                        {
                            icon: 'trash-alt',
                            type: 'delete',
                            toolTip: 'Sil'
                        }
                    ]}
                    onClick={(val:any, type:string) => this.tableClick(val, type)}
                >
                    <TableHeader dataField='name'>Fonksiyon Adı</TableHeader>
                    <TableHeader dataField='description'>Açıklama</TableHeader>
                    <TableHeader dataField='type' bold>Tipi</TableHeader>
                    <TableHeader dataField='adk'>ADK</TableHeader>
                    <TableHeader dataField='mobileOffice'>Mobile Ofis</TableHeader>
                    <TableHeader dataField='ybs'>YBS</TableHeader>
                </Table>
                <div className="padder-v">
                    {roles.length} kayıt var
                </div>
            </div>
        }

        return null
    }

    action(execSource: string, value: any): void {
        const {dispatch} = store;
        let actionList = {
            source: execSource,
            value: value,
            actions: {
                getData: {
                    request: {
                        method: 'GET',
                        url: '/roles',
                    },
                    func: (val:any, status:string) => this.initialGetData(val.mms.systemManagement.roles.data, status),
                    targetPath: 'mms.systemManagement.roles.data'
                },
                remove: {
                    request: {
                        method: 'DELETE',
                        url: `/roles/${value}`,
                    },
                    success: {
                        messages: [{
                            text: 'Silme işlemi başarılı'
                        }]
                    },
                    targetPath: 'mms.systemManagement.roles.data'
                }
            }
        };
        dispatch(dataAction(actionList));
    }

    renderSideBar() {
        const {sidebar} = this.state;

        if (sidebar) {
            return <div className="sidebar-menu">
                <Scroll scrollclass="tree-menu-area">
                    <TreeMenu onChange={()=> {}}/>
                </Scroll>
            </div>
        }

        return null
    }

    redirect(val = '/') {
        this.props.history.push('/' + _.split(this.props.match.url, '/')[1] + val)
    }

    renderNewData() {
        const {title, formContainer} = this.state;

        if (formContainer) {
            return <div className="modal-div animated fadeInRightBig">
                <div className="content-title">
                    <div className="col-md-6">
                        <div className="page-title">
                            {title}
                        </div>
                    </div>
                    <div className="col-md-6 text-right">
                        <Button
                            type="submit"
                            button="black-line"
                            bold={true}
                            text="Kapat"
                            small
                            width={'150px'}
                            onClick={()=> this.setState({formContainer: !this.state.formContainer})}
                        />
                    </div>
                    <div className="clearfix"></div>
                </div>
                <div className="content-area padder-v">
                    <Form onSubmit={() => this.submit()}>
                        <div className="container width-50-percent">
                            <div className="col-md-6">
                                <Input
                                    caption="Rol Adı"
                                    type="text"
                                    value={this.state.name}
                                    onChange={(val: string)=> this.handleChange(val, 'name')}
                                    style={{marginBottom: 15}}
                                    validate={['required','email']}
                                    errorMessage={this.state.errorMessage}
                                    autoComplete={false}
                                    autoFocus={true}
                                />
                            </div>
                            <div className="col-md-6">
                                <Input
                                    caption="Açıklama"
                                    type="text"
                                    value={this.state.description}
                                    onChange={(val: string)=> this.handleChange(val, 'description')}
                                    style={{marginBottom: 15}}
                                    validate={['required']}
                                    errorMessage={this.state.errorMessage}
                                    autoComplete={false}
                                />
                            </div>
                            <div className="clearfix"></div>
                            <hr/>
                            <div className="col-md-4">
                                <Button
                                    type="submit"
                                    button="black-line"
                                    upperCase={false}
                                    bold={true}
                                    text="Ekle"
                                />
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </Form>
                </div>
                .
            </div>
        }

        return null
    }

    renderCover() {
        const {title} = this.state;

        return <div>
            <Helmet title={title} />
            <div className="app-nav">
                <ul>
                    <li onClick={() => this.setState({sidebar: !this.state.sidebar})}>
                        <i className="fal fa-bars"></i>
                    </li>
                    <li onClick={() => this.redirect('/')}>
                        <i className="fal fa-arrow-left"></i>
                        Geri
                    </li>
                    <li onClick={() => this.redirect('/')}>
                        <i className="fas fa-box"></i>
                        {title}
                    </li>
                </ul>
            </div>
            <div className="content-title">
                <div className="col-md-6">
                    <div className="page-title">
                        {title}
                    </div>
                </div>
                <div className="col-md-6 text-right">
                    <Button
                        type="button"
                        button="primary"
                        bold={true}
                        text="Yeni ekle"
                        small
                        width={'150px'}
                        onClick={()=> this.setState({formContainer: !this.state.formContainer})}
                    />
                </div>
                <div className="clearfix"></div>
            </div>
        </div>
    }


    public render() {

        return (
            <div className="app-page-shared-container">
                {this.renderSideBar()}
                {this.renderNewData()}
                <div className="content">
                    {this.renderCover()}
                    <div className="content-area padder-v width-50-percent">
                        <div className="col-md-12">
                            {this.renderTables()}
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    tabMenu: state.store.tabMenu
});

export default withRouter(connect(mapStateToProps)(AppComp) as any)
