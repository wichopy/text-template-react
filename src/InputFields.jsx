import React from 'react';

const InputFields = (props) => {  
  return (
    <div className="well">
      {props.inputFields.map((inputField, i) => {
        return ( 
          <div key={ i } >
            <p><b> Field {i} </b> </p> 
            <p className="note"> Original value:{ inputField } </p>
            <input onChange={(e)=>props.handleChange(i,inputField,e)}/> 
          </div>
        )
      })}
    </div>
  )
}

export default InputFields;