import React, {Component} from 'react';
import CheckBox from '../CheckBox'
import '../demo-style.css'
export default class CustomCheckBox extends Component {

    constructor(props) {
        super(props)

        this.state = {
            checked: true,
            id: 2,
            name: 'checkbox_button',
            caption: 'Custom Checkbox',
            disabled: false
        }
    }

    handleClick() {
        console.log('Clicked')
    }


    render() {

        return (
            <div className="demo-page">
                <div className="title">
                    CheckBox Component
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <CheckBox
                            id={3}
                            name="check_box_name"
                            checked={true}
                            caption="Custom Checkbox"
                            disabled={true}
                            tabIndex={0}
                        />
                    </div>

                    <div className="col-md-4">
                        <CheckBox
                            id={4}
                            name="check_box_name"
                            checked={true}
                            caption="Custom Checkbox"
                            disabled={false}
                            tabIndex={0}
                        />
                    </div>

                    <div className="col-md-4">
                        <CheckBox
                            id={5}
                            name="check_box_name"
                            checked={false}
                            caption="Custom Checkbox"
                            disabled={true}
                            tabIndex={0}
                        />
                    </div>

                    <div className="clearfix"></div>
                    <hr/>
                    <div className="col-md-6">
                        <div className="title">
                            Kullanım
                        </div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="col-md-5">
                        <pre><code>
                            {`
                            <CheckBox
                                id={3}
                                name="check_box_name"
                                checked={false}
                                caption="Custom Checkbox"
                                disabled={false}
                                tabIndex={0}
                            />
                            `}
                        </code></pre>
                    </div>

                </div>
                <div className="clearfix"></div>
            </div>

        );
    }
}
