import React, { useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import styles from './add.module.css'

const Add = () => {
    const[addNode,setAddNode]=useState("")
  return (
    <div className={styles.add}>
        <input value={addNode} onChange={(e)=>setAddNode(e.target.value)} type="text"/>
        <button> <AddCircleIcon/></button>
    </div>
  )
}

export default Add