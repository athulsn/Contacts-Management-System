import axios from 'axios';


export const FETCH_CONTACTS = 'fetch_contacts';
export const SAVE_CONTACT = 'save_contact';
export const DELETE_CONTACT = 'delete_contact';
export const FETCH_CONTACTS_SINGLE = 'fetch_contact_single';
export const UPDATE_CONTACT = 'update_contact';


const url = 'http://localhost:8085/contacts/';

export function fetchContacts() {

    const request = axios.get(url);

    return {
        type: FETCH_CONTACTS,
        payload: request
    };
}


export function saveContact(contact,callback) {

    const request = axios.post(`${url}new`,contact).then(()=>callback());

    return {
        type: SAVE_CONTACT,
        payload: request
    };
}

export function deleteContact(contact_id,callback) {

    const request = axios.delete(`${url}delete`,{headers: {
        'Content-Type': 'application/json'
      },data:{id:contact_id}}).then(()=>callback());

    return {
        type: SAVE_CONTACT,
        payload: request
    };
}

export function fetchContactById(contact_id) {
    const request = axios.get(`${url}${contact_id}`);

    return {
        type: FETCH_CONTACTS_SINGLE,
        payload: request
    };
}

export function updateContact(contact,callback) {
    const request = axios.post(`${url}new`, contact).then(()=>callback());

    return {
        type: UPDATE_CONTACT,
        payload: request
    };
}