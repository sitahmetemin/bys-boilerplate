import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {
    Home,
    Login,
    Layout,
    Container
} from "./pages/index";
import {Notfound, Auth, Loading} from "./components/index";
import './_styles/main.css';

const DashboardLayout = ({children} : any) => {
    return <Layout children={children} tab={true}/>
}

const NoTabLayout = ({children} : any) => {
    return <Layout children={children} tab={false}/>
}

const DashboardRoute = ({component: Component, ...rest}: any) => {
    return (
        <Route {...rest} render={matchProps => (
            <DashboardLayout>
                <Auth>
                    <Component {...matchProps} />
                </Auth>
            </DashboardLayout>
        )} />
    )
};

const DashboardRouteNoTab = ({component: Component, ...rest}: any) => {
    return (
        <Route {...rest} render={matchProps => (
            <NoTabLayout>
                <Auth>
                    <Component {...matchProps} />
                </Auth>
            </NoTabLayout>
        )} />
    )
};


interface Props {

}

interface State {
    initialized: boolean
}

export default class App extends React.Component<Props,State> {
    public state: State;

    constructor(props: Props, context: any) {
        super(props, context);

        this.state = {
            initialized: false,
        };
    }

    async init(): Promise<void> {
        let {initialized} = this.state;
        if (initialized) {
            return;
        }

        this.setState({
            initialized: true,
        });
    }

    componentDidMount(): void {
        this.init();
    }

    render(): JSX.Element {

        if (this.state === null || !this.state.initialized) {
            return (
                <Loading/>
            );
        }

        return (
            <Router>
                <Switch>
                    <DashboardRouteNoTab exact path="/" component={Home} />
                    <DashboardRouteNoTab path="/home" component={Home} />
                    <DashboardRoute path='/municipality-management-system' component={Container} />
                    <DashboardRoute path='/business-processes-management' component={Container} />
                    <Route exact path='/login' component={Login} />
                    <Route component={Notfound} />
                </Switch>
            </Router>
        );
    }
}