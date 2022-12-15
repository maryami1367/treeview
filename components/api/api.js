import axios from "axios"
import dataa from "../db.json"
 const instance= axios.create({
    baseURL:"http://localhost:3000"
})

const getAllData=async()=>{
    return await instance.get("dataa")
}

export {getAllData}  
console.log('getAllData', getAllData)