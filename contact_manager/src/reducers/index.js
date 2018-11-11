import { combineReducers } from 'redux';
import ContactsReducer from './contacts_reducer';
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
    contacts: ContactsReducer,
    form: formReducer

});

export default rootReducer;
