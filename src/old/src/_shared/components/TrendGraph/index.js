import React, {Component} from 'react';
import Trend from 'react-trend';

class TrendGraph extends Component {

    render() {
        return (
            <Trend
                smooth
                autoDraw
                autoDrawDuration={3000}
                autoDrawEasing="ease-out"
                data={this.props.data}
                gradient={['#F71C6C']}
                radius={10}
                strokeWidth={2}
                strokeLinecap={'butt'}
            />
        );
    }
}

export default TrendGraph;