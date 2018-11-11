import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route,Link }  from 'react-router-dom';
import { fetchContacts } from '../actions';
import NavBar from '../components/navbar';
import { Field, reduxForm, initialize } from 'redux-form'

import _ from 'lodash';
import  { saveContact, fetchContactById, updateContact } from '../actions'

class NewContact  extends Component {
    state = {
        'name': '',
        'phone': '',
        'email': '',
        'address': '',
        'populate':true,
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.contact && nextProps.contact.name) {
            this.setState({
                'name': nextProps.contact.name,
                'phone': nextProps.contact.phone,
                'email': nextProps.contact.email,
                'address': nextProps.contact.address
            });

            if(this.state.populate) {
                const initData = {
                    'name': nextProps.contact.name,
                    'phone': nextProps.contact.phone,
                    'email': nextProps.contact.email,
                    'address': nextProps.contact.address
                }
                this.props.initialize(initData);
                this.setState({
                    'populate':false
                });
            }
            
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        if(this.props.match.params.id){
            this.props.fetchContactById(id);
        }
    }

    handleFormSubmit(values) {
        if(this.props.match.params.id) {
            var updateval = values;
            updateval.id = this.props.match.params.id;
            this.props.updateContact(updateval ,()=>{this.props.history.push('/')});
        }
        else {
            this.props.saveContact(values,()=>{this.props.history.push('/')});
        }
    }

    renderField(field) {
        return (
            <div className="form-group fields">
            <label>{field.label}</label>
            <input className="form-control" type={field.type}
            {...field.input} />
            <div className="errr">{field.meta.touched && field.meta.error ? field.meta.error:''}</div>
            </div>
        );
    }

    renderButton(field) {
        var loc = location.pathname;
        var btnname = '';
        if(loc.indexOf('new') > -1)
            btnname = 'Save';
        else if(loc.indexOf('edit') > -1)
            btnname = 'Update';

        if(loc.indexOf('view')  > -1)
            return (<div className="form-group">
            </div>);

        return (
            <div className="form-group">
            <button className="btn btn-primary" type={field.type} {...field.input}>{btnname}</button>
            </div>
        );
    }
    
    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;

        return (    
            <React.Fragment>    
            <NavBar/>
            <div class="panel-body">
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Field label = "Name" name="name" type="text" placeholder="John" component={this.renderField}
                />
                <Field label = "Email" name="email" type="text" placeholder="ed@test.com" component={this.renderField}
                />
                <Field label = "Phone" name="phone" type="text" placeholder="12345" component={this.renderField}
                />
                <Field label = "Address" name="address" type="text" placeholder="London" component={this.renderField}
                />
                <Field name="submit" type ="submit" component={this.renderButton}
                />
            </form>
            </div>
            </React.Fragment>         
        );
    }
}


function validate(values) {
    const error = {};
    if(!values.name)
        error.name = 'required';
    if(!values.email)
        error.email = 'required';
    if(!values.phone)
        error.phone = 'required';
    if(!values.address)
        error.address = 'required';
    return error;
}

function mapStateToProps(state,props) {
    if(props.match.params.id && state.contacts[props.match.params.id]);
        return {contact:state.contacts[props.match.params.id]};
}

export default reduxForm({
    validate,
    pristine :false,
    enableReinitialize:true,
    keepDirtyOnReinitialize:true,
    pure :true,
    form: 'ContactAdder' // a unique identifier for this form
})(connect(mapStateToProps,{saveContact,fetchContactById,updateContact})(NewContact));