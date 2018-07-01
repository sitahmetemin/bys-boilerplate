import React, {Component} from 'react';
import Button from '../Button'
import '../demo-style.css'
export default class CustomButton extends Component {

    handleClick() {
        console.log('Clicked')
    }


    render() {

        return (
            <div className="demo-page">
                <div className="title">
                    Button Component
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <Button
                            type="button"
                            button="black-line"
                            upperCase={true}
                            bold={true}
                            width={'150px'}
                            name="Button_name"
                            id="12312"
                            text="Button text"
                            onClick={this.handleClick}
                        />
                    </div>

                    <div className="col-md-4">
                        <Button
                            type="button"
                            button="primary-line"
                            upperCase={true}
                            bold={true}
                            name="Button_name"
                            id="12312"
                            text="Button text"
                            onClick={this.handleClick}
                        />
                    </div>

                    <div className="col-md-4">
                        <Button
                            type="button"
                            button="danger-line"
                            upperCase={true}
                            bold={true}
                            name="Button_name"
                            id="12312"
                            text="Button text"
                            onClick={this.handleClick}
                        />
                    </div>

                    <div className="clearfix"></div>
                    <hr style={{border:'none'}}/>
                    <div className="col-md-4">
                        <Button
                            type="button"
                            button="black"
                            upperCase={true}
                            bold={true}
                            name="Button_name"
                            id="12312"
                            text="Button text"
                            onClick={this.handleClick}
                        />
                    </div>

                    <div className="col-md-4">
                        <Button
                            type="button"
                            button="primary"
                            upperCase={true}
                            bold={true}
                            name="Button_name"
                            id="12312"
                            text="Button text"
                            onClick={this.handleClick}
                        />
                    </div>

                    <div className="col-md-4">
                        <Button
                            type="button"
                            button="danger"
                            upperCase={true}
                            bold={true}
                            name="Button_name"
                            id="12312"
                            text="Button text"
                            onClick={this.handleClick}
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
                            <Button
                                type="button"
                                button="danger"
                                upperCase={true}
                                bold={true}
                                name="Button_name"
                                id="12312"
                                text="Button text"
                                onClick={this.handleClick}
                                small={false}
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
