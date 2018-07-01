import * as React from 'react';
import './style.css'

interface Props {

}

interface State {
    sideBar: boolean;
}

class Notfound extends React.Component<Props,State> {
    public state: State;

    constructor(props: Props, state: State) {
        super(props, state);

    }

    render() {

        return (
            <div className="notfound">
                <div className="container">
                    <div className="col-md-6 text-right">
                        404
                    </div>
                    <div className="col-md-6 text-left">
                        Böyle bir sayfa mevcut değil
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>
        );
    }
}

export default Notfound
