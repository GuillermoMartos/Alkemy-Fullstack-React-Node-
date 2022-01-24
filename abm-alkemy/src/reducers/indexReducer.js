import { TYPES } from "../actions/indexActions";

const initialState = {
  abm: [],
  allAbm: [],
  user: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_ABM: {
      const copia = action.payload;
      return {
        ...state,
        abm: action.payload,
        allAbm: copia,
      };
    }
    case "DELETE_ABM": {
      const allAbms = state.allAbm;
      const filterState = allAbms.filter(abm => abm!==action.payload)
      return {
          ...state,
          abm: filterState
      }

    }
    case TYPES.SET_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case TYPES.FILTER_BY_TYPE: {
      const search = action.payload;
      const allAbms = state.allAbm;
      const filterState = allAbms.filter((r) =>
        r.type===search
      );
      return {
        ...state,
        abm:filterState,
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
