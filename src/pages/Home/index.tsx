import * as React from 'react';
import {withRouter} from 'react-router-dom'

interface Props {
    baz: number;
}

interface State {
    bar: number;
}

class HomeComponent extends React.Component<Props, State> {
    public state: State;
    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            bar: 123,
        };
    }

    componentDidMount() {



    }


    public render() {

        return (
            <div>sdadsf</div>
        )
    }
}


export default withRouter((HomeComponent as any))