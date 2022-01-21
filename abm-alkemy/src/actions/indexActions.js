import axios from 'axios'

export const TYPES={
    GET_ABM:"GET_ABM",
}
//NOMBRES CONSTANTES PARA NO ERRARLE EN ESAS COSITAS :))

//Log&Coins
export const getAbm = function (user) {
    return function(dispatch) {
        axios.get("http://localhost:3001")
        .then((abm)=>{
            dispatch({ type: TYPES.GET_ABM, payload: abm.data }); 
        })
        
      };
     
}

