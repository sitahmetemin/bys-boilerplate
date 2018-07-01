import React, {Component} from 'react';import NumberEdit from './index'import '../demo-style.css'export default class NumberInput extends Component {    componentDidMount() {    }    handleChange(val) {    }    render() {        return (            <div className="demo-page">                <div className="title">                    Number Component                </div>                <div className="row">                    <div className="col-md-5">                        <NumberEdit                            id="webpage_title"                            name="webpage_title"                            caption="Number"                            value=""                            maxChar={50}                            minChar={3}                            precision={2}                            useThousandSeparator={true}                            useNegative={false}                            addon={[                                {                                    position: 'right',                                    text: '$'                                }                            ]}                            onChange={(val) => {                                this.handleChange(val)                            }}                            onBlur={(val) => {                                this.handleChange(val)                            }}                            tabIndex={0}                            errorMessage=""                            ref={ref => this.okan = ref}                        />                    </div>                    <div className="col-md-5">                        <NumberEdit                            id="webpage_title"                            name="webpage_title"                            caption="Number"                            value=""                            maxChar={50}                            minChar={3}                            precision={4}                            useThousandSeparator={false}                            useNegative={false}                            onChange={(val) => {                                this.handleChange(val)                            }}                            onBlur={(val) => {                                this.handleChange(val)                            }}                            tabIndex={0}                            errorMessage="Hata Mesajı"                            ref={ref => this.okan = ref}                        />                    </div>                    <div className="clearfix"></div>                    <hr/>                    <div className="col-md-6">                        <div className="title">                            Kullanım                        </div>                    </div>                    <div className="clearfix"></div>                    <div className="col-md-5">                        <pre><code>                            {`                            <NumberEdit                                id="webpage_title"                                name="webpage_title"                                caption="Number"                                value=""                                maxChar={50}                                minChar={3}                                precision={4}                                useThousandSeparator={false}                                useNegative={false}                                addon={[                                    {                                        position: 'right',                                        text: '$'                                    }                                ]}                                onChange={(val) => {                                    this.handleChange(val)                                }}                                onBlur={(val) => {                                    this.handleChange(val)                                }}                                tabIndex={0}                                errorMessage=""                                ref={ref => this.okan = ref}                            />                            `}                        </code></pre>                    </div>                </div>                <div className="clearfix"></div>            </div>        );    }}