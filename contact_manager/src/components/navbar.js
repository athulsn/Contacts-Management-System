import React, { Component } from 'react';
import { Link }  from 'react-router-dom';

export default class NavBar  extends Component {
    render () {
        var current = location.pathname;
        var existingcls,newcls;
        if(current.indexOf('new') > -1){
            existingcls = '';
            newcls = 'active';
        }else {
            existingcls = 'active';
            newcls = '';
        }
        
        return (
            <div className="panel-body">
                <ul className="nav nav-tabs">
                    <li className={existingcls}>
                        <Link to="/">EXISTING</Link>
                    </li>
                    <li className={newcls}>
                        <Link to="/new" onClick={()=>history.push('/new')}>NEW</Link>
                    </li>
                </ul>
            </div>
        );
    }
}