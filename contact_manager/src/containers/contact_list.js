import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route,Link }  from 'react-router-dom';
import { fetchContacts,deleteContact } from '../actions';
import NavBar from '../components/navbar';

import _ from 'lodash';

class ContactList  extends Component {

    componentDidMount() {
        this.props.fetchContacts();
    }

    deleteContact(e, id){
        e.preventDefault();
        this.props.deleteContact(id,()=>{this.props.fetchContacts()});
    }


    renderTablrows() {

        return _.map(this.props.contacts,(contact)=>{
            return  <tr key={contact._id}>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                    <td>{contact.address}</td>
                    <td>
                        <Link className="btn btn-default" to={`/view/${contact._id}`}>View</Link>
                        <Link className="btn btn-default" to={`/edit/${contact._id}`}>Update</Link>
                        <button type="button" className="btn btn-danger" onClick={(e,index=contact._id)=>this.deleteContact(e,index)}>Delete</button>
                    </td>
                    </tr>;
        });

    };

    render () {
        if(!this.props.contacts) {
            return (
                <React.Fragment>     
                    <NavBar/>
                    <div>Loading</div>
                </React.Fragment>
            );
        }

        return (    
            <React.Fragment>     
                <NavBar/>
                <div class="panel-body">
                <table className="table table-striped">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    {this.renderTablrows()}
                </tbody>
                </table>
                </div>
            </React.Fragment>         
        );
    }
}

function mapStateToProps(state) {
    return {contacts:state.contacts};
}

export default connect(mapStateToProps,{fetchContacts,deleteContact})(ContactList);