import React, {Component} from 'react';

class Form extends Component {
    constructor(props) {
        super(props);
        [].forEach((name) => this[name] = this[name].bind(this))

    }

    render() {

        const { ...props} = this.props;

        return (
            <form {...props} autoComplete="off" onSubmit={this.handleSubmit} onReset={this.handleReset}>
                {this.props.children}
            </form>
        );
    }

    handleSubmit = (e) => {
        e.preventDefault();
        /*const {onSubmit, onReset, ...props} = this.props;
        const inputs = this.props.children;


        inputs.map(component => {

            console.log('c',component)


            let types = String(component.props.type),
                valid = component.props.valid;

            if (types !== 'submit') {
                // component.props.errorMessage = 'okok'
               /!* _.merge(component.props, {
                    errorMessage: 'sdsd'
                });*!/

                this.okan.setValue('sd')

                console.log('---Children---',component.props)

                // onSubmit()
            }
        })*/

        // if (this.props.name) {
        //     this.context.form.attachToForm(this);
        // }
    }

    handleReset() {

    }
}


export default Form;