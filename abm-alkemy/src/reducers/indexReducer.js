import { TYPES } from "../actions/indexActions";

const initialState = {
    abm: [],
    allAbm:[],
    user:""
};

const rootReducer = (state = initialState, action) => {

    switch (action.type) {
         case TYPES.GET_ABM: {

            return {
                ...state,
                abm:action.payload
            }

        }
        default: return state
    }
}

export default rootReducer;
