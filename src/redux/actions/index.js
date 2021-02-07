import { ADD_NEW_FIELD, ADD_RUNNER, GET_FORM_FIELDS } from "../action-types";

export const addNewField = fields => {
    return {
        type: ADD_NEW_FIELD,
        payload: addRegistrationDate(fields)
    }
}

export const addNewItem = ( items, item ) => {
    return {
        type: ADD_RUNNER,
        payload: [ ...items, item ]
    }
}

export const getFormFields = () => {
    return {
        type: GET_FORM_FIELDS,
        payload: dataFormFields
    }
}

const addRegistrationDate = items => {
    return items.map(item => {
        item = Object.fromEntries(Object.entries(item).map(([key, value]) => [key.replace(/date/, `${key} of birth`), value]).swap());
        return {
            ...item,
            'registration date': new Date().toUTCString().slice(4,-4)
        }
    })
}

Array.prototype.swap = function() {
    [this[1], this[2]] = [this[2], this[1]]
    return this
}

const dataFormFields = [
    [
        {
            label: 'name',
            type: 'text',
            name: {
                name: ''
            }
        },

        {
            label: 'date of birth',
            type: 'date',
            name: {
                date_of_birth: ''
            }
        },

        {
            label: 'e-mail',
            type: "email",
            name: {
                email: ''
            }
        },

        {
            label: 'phone',
            type: 'phone',
            name: {
                phone: ''
            }
        },

        {
            label: 'distance',
            type: 'number',
            name: {
                distance: ""
            }
        },

        {
            label: 'payment',
            type: 'number',
            name: {
                payment: ''
            }
        },

        {
            label: 'registration date',
            type: 'disabled',
            name: {
                registration_date: ''
            }
        }
    ]
]