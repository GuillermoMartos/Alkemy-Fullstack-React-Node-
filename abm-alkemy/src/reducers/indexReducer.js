const initialState = {
    abm: [],
    allAbm:[],
    user:""
};

const rootReducer = (state = initialState, action) => {

    switch (action.type) {
         case "FILTER_BY_ORIGIN": {

            const allRecipes = state.allAbm;
            // const filterState = action.payload === "db" ? allRecipes[0].filter(r => r.createdInDb) : allRecipes[0].filter(r => !r.createdInDb)

            return {
                ...state,
                // recipes: [filterState]
            }

        }
        default: return state
    }
}

export default rootReducer;
