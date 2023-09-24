import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Addmovie from './Addmovie';

const ViewallMovies = () => {
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
    <h1>Movies</h1>
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
                        <img src="{value.img_url}"class="img-fluid rounded-start" alt="..."/>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">{value.movie_name}</h5>
                            <p class="card-text">Category : {value.category}</p>
                            <p class="card-text">Languages : {value.languages}</p>
                            <p class="card-text">Cast : {value.cast}</p>
                            <p class="card-text">Description : {value.description}</p>
                            <p class="card-text">ticket_rate : {value.ticket_rate}</p>
                            <p class="card-text"><small class="text-body-secondary">no_seats : {value.no_seats}</small></p>
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
if(update) finalJSX=<Addmovie method='put' data={singleValue} />
  return (
  
    finalJSX

)
}

export default ViewallMovies