import _ from 'lodash';
import {FETCH_CONTACTS,FETCH_CONTACTS_SINGLE} from '../actions';

export default function(state={},action) {
    switch(action.type) {
        case FETCH_CONTACTS :
            return _.mapKeys(action.payload.data,'_id');
        case FETCH_CONTACTS_SINGLE :
            return { ...state, [action.payload.data._id]:action.payload.data }
        default:
            return state;
    }
} 