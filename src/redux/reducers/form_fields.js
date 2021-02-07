import * as action_types from '../action-types';

const init_state = null;

export default (state = init_state, action) => {
    if(action.type === action_types.GET_FORM_FIELDS) {
        return action.payload
    }
    return state
}