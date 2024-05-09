import React from 'react'
import { useContext } from 'react';
import {AuthContext} from '../service/authContext';
function Temp() {
    const cv= useContext(AuthContext)
    console.log(" is Auth in  in temp ", cv);

  return (
    <div>Temp</div>
  )
}

export default Temp