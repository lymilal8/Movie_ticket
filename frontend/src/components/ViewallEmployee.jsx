import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Addemployee from './Addemployee'

const ViewallEmployee = () => {

    const[userStatus,setUserStatus] =useState(sessionStorage.getItem("userStatus"));
    const[userToken,setUserToken] =useState(sessionStorage.getItem("userToken"));
    // const[userID,setUserToken] =useState(sessionStorage.getItem("userToken"));
    console.log(userStatus);

    const[data,setData]=useState([]);
    const[update,setUpdate] = useState(false);
    const[singleValue,setSingleValue] = useState([]);
  
    const fetchDataFromApi = () =>{
      axios
      .get(
      
        "http://localhost:3000/api/getdata/"+userToken
        ) 
       .then((response)=>{
        console.log(response.data);
        setData(response.data);
  
       })
    }
   const deleteBlog=(id)=>{
    console.log("delete clicked");
    console.log(id);
    axios.delete("http://localhost:3000/api/delete/"+id)
    .then((response)=>{
      alert(response.data.message);
      window.location.reload(false);
    })
    
   }
   const updateBlog=(val) => {
    console.log("update clicked",val);
    setUpdate(true);
    setSingleValue(val);
    
  
   }
  
    useEffect(()=>{
      fetchDataFromApi()
    },[]);
  

    let finalJSX= <div className="container ">
      <br/><br/>
      <div className="row text-center">
        <h1>Employees</h1>
      </div>
      <br/>
     
    <div className="row">
      <div className="col col-12 col-sm-12 col-md-12">
        <div className="row g-3">
          {data.map((value,index)=>{
            return<div className="col col-12 col-sm-4 col-md-4 col-lg-4 d-flex align-items-stretch">
                <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="./img/emp.png"class="img-fluid rounded-start" alt="..."/>
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">{value.name}</h5>
                                <p class="card-text">Address : {value.address}</p>
                                <p class="card-text">Phone : {value.phone}</p>
                                <p class="card-text">Email : {value.email}</p>
                                <p class="card-text">Designation : {value.post}</p>
                                <p class="card-text"><small class="text-body-secondary">Salary : {value.salary}</small></p>
                                {userStatus==="user"?<p class="card-text" style={{display:'none'}}> 
                                <small class="text-body-secondary">
                                <button className='btn btn-danger' onClick={()=>deleteBlog(value._id)}>Delete</button>
                                </small>&nbsp;
                                <small class="text-body-secondary">
                                <button className='btn btn-primary' onClick={()=>updateBlog(value)}>update</button>
                                </small>
                                </p>:
                                <p class="card-text"> 
                                <small class="text-body-secondary">
                                <button className='btn btn-danger' onClick={()=>deleteBlog(value._id)}>Delete</button>
                                </small>&nbsp;
                                <small class="text-body-secondary">
                                <button className='btn btn-primary' onClick={()=>updateBlog(value)}>update</button>
                                </small>
                                </p>}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  
          })}
          
        </div>
      </div>
    </div>
  </div>
    if(update) finalJSX=<Addemployee method='put' data={singleValue} />
      return (
      
        finalJSX
  
    )
}

export default ViewallEmployee