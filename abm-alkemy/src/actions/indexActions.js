import axios from 'axios'

export const TYPES={
    SET_USER:"SET_USER",
    GET_ABM:"GET_ABM",
}

//set logged User
export const setUser= function(user){
    return function(dispatch){
        dispatch({type:TYPES.SET_USER, payload:user})
    }
}


//getAbms by user logged
export const getAbm = function (user) {
    alert (user)
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


