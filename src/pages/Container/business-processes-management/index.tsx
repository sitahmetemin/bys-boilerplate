import * as React from 'react';
import {withRouter} from 'react-router-dom'

interface Props {

}

interface State {

}

class Functions extends React.Component<Props, State> {
    public state: State;

    constructor(props: Props, state: State) {
        super(props, state);

        this.state = {
            ...state
        }
    }


    public render() {

        return (
            <div className="sss">
               sidebar menu sayfa
            </div>
        );
    }
}

export default withRouter((Functions as any))
