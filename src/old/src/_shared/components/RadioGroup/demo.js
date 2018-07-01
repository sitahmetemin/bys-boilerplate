import React, {Component} from 'react';
import RadioGroup from '../RadioGroup'
import '../demo-style.css'
export default class CustomRadio extends Component {

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
        // console.log('Clicked')
    }


    render() {

        return (
            <div className="demo-page">
                <div className="title">
                    Radio Button Component
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <RadioGroup
                            data={[
                                {
                                    label: 'Radio button 1',
                                    value: 1,
                                    disabled: false
                                },
                                {
                                    label: 'Radio button 2 uzun yazı alanı olarak kullanılsın',
                                    value: 2,
                                    disabled: false
                                },
                                {
                                    label: 'Radio button 3',
                                    value: 3,
                                    disabled: false
                                },
                                {
                                    label: 'Radio button 4',
                                    value: 4,
                                    disabled: false
                                },
                                {
                                    label: 'Radio button 5',
                                    value: 5,
                                    disabled: false
                                },
                                {
                                    label: 'Radio button 6 uzun yazı alanı olarak kullanılsın',
                                    value: 6,
                                    disabled: true
                                }
                            ]}
                            labelField="label"
                            valueField="value"
                            disabledField="disabled"
                            name="check_box_name"
                            checked={3}
                            checkedField="value"
                            row={3}
                        />
                    </div>
                    <div className="clearfix"></div>
                    <hr/>
                    <div className="col-md-12">
                        <RadioGroup
                            data={[
                                {
                                    label: 'Radio button 1',
                                    value: 1,
                                    disabled: false
                                },
                                {
                                    label: 'Radio button 2 uzun yazı alanı olarak kullanılsın',
                                    value: 2,
                                    disabled: false
                                },
                                {
                                    label: 'Radio button 3',
                                    value: 3,
                                    disabled: false
                                },
                                {
                                    label: 'Radio button 4',
                                    value: 4,
                                    disabled: false
                                },
                                {
                                    label: 'Radio button 5',
                                    value: 5,
                                    disabled: false
                                },
                                {
                                    label: 'Radio button 6 uzun yazı alanı olarak kullanılsın',
                                    value: 6,
                                    disabled: true
                                }
                            ]}
                            labelField="label"
                            valueField="value"
                            disabledField="disabled"
                            name="check_box_name2"
                            checked={3}
                            checkedField="value"
                            row={12}
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
                            <RadioGroup
                                data={[
                                    {
                                        label: 'Radio button 1',
                                        value: 1,
                                        disabled: false
                                    },
                                    {
                                        label: 'Radio button 2',
                                        value: 2,
                                        disabled: false
                                    },
                                    {
                                        label: 'Radio button 3',
                                        value: 3,
                                        disabled: false
                                    },
                                    {
                                        label: 'Radio button 4',
                                        value: 4,
                                        disabled: false
                                    },
                                    {
                                        label: 'Radio button 5',
                                        value: 5,
                                        disabled: false
                                    },
                                ]}
                                labelField="label"
                                valueField="value"
                                disabledField="disabled"
                                name="check_box_name"
                                checked={3}
                                checkedField="value"
                                row={3} // grid sistemine göre verilmeli
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
