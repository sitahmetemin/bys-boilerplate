import React, {Component} from 'react';
import 'amcharts3';
import 'amcharts3/amcharts/serial';
import 'amcharts3/amcharts/themes/light';
import './theme';
import AmCharts from "@amcharts/amcharts3-react";

class CustomChart extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: this.props.data
        }
    }

    render() {
        return (
            <AmCharts.React style={{ width: "100%", height: "100%" }} options={this.state.data} />
        );
    }
}

export default CustomChart;