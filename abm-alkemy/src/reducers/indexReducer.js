import { TYPES } from "../actions/indexActions";

const initialState = {
  abm: [],
  balance: { in: 0, out: 0 },
  allAbm: [],
  user: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_ABM: {
      const copia = action.payload;

      const abmOut = copia
        .filter((r) => r.type === "out")
        .map((r) => parseFloat(r.amount));
      const abmIn = copia
        .filter((r) => r.type === "in")
        .map((r) => parseFloat(r.amount));
      return {
        ...state,
        abm: action.payload,
        allAbm: copia,
        balance: { in: abmIn, out: abmOut },
      };
    }
    case TYPES.DELETE_ABM: {
      const allAbms = state.allAbm;
      const filterState = allAbms.filter((abm) => abm.id !== action.payload);
      const abmOut = filterState
        .filter((r) => r.type === "out")
        .map((r) => parseFloat(r.amount));
      const abmIn = filterState
        .filter((r) => r.type === "in")
        .map((r) => parseFloat(r.amount));
      return {
        ...state,
        abm: filterState,
        allAbm: filterState,
        balance: { in: abmIn, out: abmOut },
      };
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
      if (search==="quit-filter"){
        return {
          ...state,
          abm: allAbms,
        };
      }
      
      const filterState = allAbms.filter((r) => r.type === search);
      return {
        ...state,
        abm: filterState,
      };
    }
    case TYPES.FILTER_BY_CATEGORY: {
      const search = action.payload;
      const allAbms = state.allAbm;
      if (search==="quit-filter"){
        return {
          ...state,
          abm: allAbms,
        };
      }
      const filterState = allAbms.filter((r) => r.category === search);
      return {
        ...state,
        abm: filterState,
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
