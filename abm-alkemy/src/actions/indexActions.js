import axios from 'axios'

export const TYPES={
    SET_USER:"SET_USER",
    GET_ABM:"GET_ABM",
    FILTER_BY_TYPE:"FILTER_BY_TYPE",
    FILTER_BY_CATEGORY:"FILTER_BY_CATEGORY",
    DELETE_ABM:"DELETE_ABM",
    BALANCE_ABM:"BALANCE_ABM",
}

//set logged User
export const setUser= function(user){
    return function(dispatch){
        dispatch({type:TYPES.SET_USER, payload:user})
    }
}

//DELETE_ABM
export const deleteAbmAction= function(id){

    return function(dispatch){
        axios({
            method: "POST",
            url: "http://localhost:3001/delete",
            data: {id:id}
          }).then((abm)=>{
              if(abm.data.res==="success") return dispatch({ type: TYPES.DELETE_ABM, payload: id }); 
              else return alert("failure to delete selected card, retry later")
          })
    };
}


//getAbms by user logged
export const getAbm = function (user) {
    return function(dispatch) {
        axios({
            method: "POST",
            url: "http://localhost:3001/user",
            data: user,
          }).then((abm)=>{
            dispatch({ type: TYPES.GET_ABM, payload: abm.data[0].abms.map(m=> m) }); 
        })
        
      };
     
}

//Filter Abms by Type
export const filterAbmByType= function (type){
    return function(dispatch){
        dispatch({type:TYPES.FILTER_BY_TYPE, payload:type})
    }
}

//Filter Abms by Category
export const filterAbmByCategory= function (category){
    return function(dispatch){
        dispatch({type:TYPES.FILTER_BY_CATEGORY, payload:category})
    }
}




