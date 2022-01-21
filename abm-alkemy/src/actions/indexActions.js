import axios from 'axios'


//NOMBRES CONSTANTES PARA NO ERRARLE EN ESAS COSITAS :))

//Log&Coins
export const user= function(user){
    return function(dispatch){
        dispatch({type:"USER", payload:user})
    }
}
