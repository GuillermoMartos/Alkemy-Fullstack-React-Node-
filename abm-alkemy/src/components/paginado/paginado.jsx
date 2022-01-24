import React from 'react';
import './paginado.css'

function Paginado({contentsPerPage, allAbms, paginado}) {
const pageNumbers=[]

for(let i=0; i <Math.ceil(allAbms/contentsPerPage); i++ ){
  pageNumbers.push(i+1)
}

    return (
              
        <nav >
           <ul class="paginador">
             {pageNumbers && pageNumbers.map(num=>{
               return(
                <button class="btn-pag"  active key={num} onClick={()=>paginado(num)}> {num} </button>
               )
             })}
           
           </ul>
        </nav>
     
    )
    
};

export default Paginado;
