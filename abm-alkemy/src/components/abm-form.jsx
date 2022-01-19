import {React, useState} from 'react'

function ABM_Form() {
    const [form, setform] = useState("")
  
    return (
    <div>
      <h1>🧮🖩 New Register 🖩🧮</h1>
      <form>
          <label>Concept:</label>
          <input id="concept" name="concept"></input>
      </form>
    </div>
  );
}

export default ABM_Form;
