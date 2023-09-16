import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const[inputs,setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const navigate=useNavigate();


    const inputHandler = (e)=>{
        console.log("onchange");
        
        if (Object.keys(errors).length > 0) {
            validateFields();
          }
      


        setInputs({
            ...inputs,[e.target.name]: e.target.value
        })
        console.log(inputs);
    }

    const submitHandler = ()=>{
        if (validateFields()) {

            let data={
                name:inputs.name,
                email:inputs.email,
                username:inputs.username,
                password:inputs.password,
                userStatus:"user"
              }
              
            console.log("onsubmit",data);
            axios.post("http://localhost:3000/api/signup",data)
            .then((response)=>{
                console.log(response);
                console.log(response.data);
                if(response.data.message=== "Signup successfully"){
                    // alert(response.data);
                    // alert("Signup successfully");
                    alert(response.data.message);
                     navigate('/');  
                }
                else
                {
                    alert(response.data.message);
                }
            })
            .catch(err=>console.log(err))
        }
       
    }
    
    const validateFields = () => {
        const { name, email, username, password} = inputs;
        const newErrors = {};
    
        if (!name) {
          newErrors.name = 'Please enter your name!';
        }
        if (!email) {
          newErrors.email = 'Please enter your email!';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          newErrors.email = 'Please enter a valid email address!';
        }
        if (!username) {
          newErrors.username = 'Please enter your username!';
        }else if (username.length < 5) {
            newErrors.username = 'Username must be at least 5 characters long!';
        }
        if (!password) {
          newErrors.password = 'Please enter your password!';
        }else if (password.length < 5) {
            newErrors.password = 'Password must be at least 5 characters long!';
          } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{5,}/.test(password)) {
            newErrors.password =
              'Password must contain at least one uppercase letter, one lowercase letter, and one number!';
          }
       
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    



  return (
    <div>

        <div className="container">
            <section className="section min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                            <div className="card">
                                <div className="card-body">
                                    <div className="pb-2">
                                        <h5 className="card-title text-center fs-4">Signup</h5>
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="" className="form-label">Name</label>
                                        <input type="text" className="form-control" name="name" onChange={inputHandler}/>
                                        {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
                                    </div>
                                    <div className="col-12">
                                         <label htmlFor="" className="form-label">Email ID</label>
                                        <input type="text" name="email"  className="form-control"  onChange={inputHandler}/>
                                        {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                                    </div>
                                    <div className="col-12">
                                            <label htmlFor="" className="form-label">User Name</label>
                                                <input type="text" name="username"  className="form-control" onChange={inputHandler}/>
                                            {errors.username && <div className="invalid-feedback d-block">{errors.username}</div>}
                                        
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="" className="form-label">Password</label>
                                         <input type="password" name="password"  className="form-control" onChange={inputHandler}/>
                                        {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
                                    </div>
                                    <br />
                                    <div className="col-12">
                                        <button className="btn btn-primary btn-block"  onClick={submitHandler}>
                                            Create Account
                                        </button>
                                    </div>
                                    <div className="col-12">
                                        <p className="mb-0">
                                            Already have an account? <a href="/">Log in</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>


    </div>
  )
}

export default Register