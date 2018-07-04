import * as React from 'react';
import {withRouter} from 'react-router-dom'
import {Button, Form, Input,Helmet, Scroll, Table, TableHeader, RadioGroup, Checkbox} from '../../../../../_basecomponents'
import {connect} from 'react-redux';
import {dataAction, store} from "../../../../../_redux";
import {TreeMenu} from '../../../../../components'
import * as _ from "lodash";

interface Props {
    history: any,
    match: any
}

interface TempData {
    name: string,
    description: string,
    adk: string,
    type: number | string,
    ybs: number | string,
    mobileOffice: boolean
}

interface State {
    errorMessage: string,
    sidebar: boolean,
    title: string,
    roles: any,
    formContainer: boolean,
    pageType: string,
    tempData: TempData
}

class AppComp extends React.Component<Props, State> {
    public state: State;

    constructor(props: Props, state: State) {
        super(props, state);

        this.state = {
            ...state,
            title: 'Roller',
            sidebar: false,
            formContainer: false,
            pageType: 'default',
            tempData: {
                name: '',
                description: '',
                adk: '',
                type: '',
                ybs: '',
                mobileOffice: false
            }
        }
    }

    componentDidMount() {
        this.action('getData', null)
    }

    handleChange(val: string, key: string): void {
        this.setState({
            ...this.state,
            tempData: {
                ...this.state.tempData,
                [key]: val
            }
        })
    }

    submit(): void {
        this.setState({
            formContainer: !this.state.formContainer
        },() => {
            this.action('addData', null)
        })
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
                removeData: {
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
                },
                addData: {
                    request: {
                        method: 'POST',
                        url: `/roles`,
                        params: this.state.tempData
                    },
                    success: {
                        messages: [{
                            text: 'Role eklendi'
                        }],
                        triggers: ['getData']
                    },
                    targetPath: 'mms.systemManagement.roles.item'
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
                        <div className="width-50-percent">
                            <div className="col-md-6">
                                <Input
                                    caption="Rol Adı"
                                    type="text"
                                    value={this.state.tempData.name}
                                    onChange={(val: string)=> this.handleChange(val, 'name')}
                                    style={{marginBottom: 15}}
                                    validate={['required']}
                                    autoComplete={false}
                                    autoFocus={true}
                                />
                            </div>
                            <div className="col-md-6">
                                <Input
                                    caption="Açıklama"
                                    type="text"
                                    value={this.state.tempData.description}
                                    onChange={(val: string)=> this.handleChange(val, 'description')}
                                    style={{marginBottom: 15}}
                                    validate={['required']}
                                    autoComplete={false}
                                />
                            </div>
                            <div className="col-md-6">
                                <Input
                                    caption="Active Directory Key"
                                    type="text"
                                    value={this.state.tempData.adk}
                                    onChange={(val: string)=> this.handleChange(val, 'adk')}
                                    style={{marginBottom: 15}}
                                    validate={['required']}
                                    autoComplete={false}
                                />
                            </div>
                            <hr/>
                            <div className="col-md-12 no-margin">
                                <RadioGroup
                                    title={'Tipi'}
                                    data={[
                                        {
                                            label: 'E-Kent',
                                            value: 1,
                                            disabled: false
                                        },
                                        {
                                            label: 'Döküman',
                                            value: 2,
                                            disabled: false
                                        },
                                        {
                                            label: 'Mobil Uygulama',
                                            value: 3,
                                            disabled: false
                                        }
                                    ]}
                                    labelField="label"
                                    valueField="value"
                                    disabledField="disabled"
                                    name="check_box_name"
                                    checked={this.state.tempData.type}
                                    checkedField="value"
                                    onChange={(val: any)=> this.handleChange(val, 'type')}
                                    row={3}
                                />
                            </div>
                            <div className="col-md-6" style={{width: 350, marginRight: 15, marginTop:20, display: 'inline-block'}}>
                                <Checkbox
                                    checked={this.state.tempData.mobileOffice}
                                    caption="Mobil Ofis"
                                    disabled={true}
                                    tabIndex={0}
                                    onChange={(val: any)=> this.handleChange(val, 'mobileOffice')}
                                />
                            </div>
                            <div className="clearfix"></div>
                            <hr/>
                            <div className="col-md-4">
                                <Button
                                    type="submit"
                                    button="primary"
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


    public render(): JSX.Element {

        console.log('This.s', this.state)

        return (
            <div className="app-page-shared-container">
                {this.renderSideBar()}
                {this.renderNewData()}
                <div className="content">
                    {this.renderCover()}
                    <div className="content-area padder-v ">
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
