import { Link ,useNavigate} from 'react-router-dom'
import React, { useState} from 'react'

export default function Login() { const [credentials, setcredentials] = useState({email: "", password: "", })

let  navigate= useNavigate()
const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {  email: credentials.email, password: credentials.password,};
//         const userData = { 
//             "name":"prajwal hhs",
//             "password":"1dasdad456",
//             "email":"dadadads@gmail.com",
//             "location":"Pune"
// }
    // console.log(JSON.stringify({ name: credentials.name, email: credentials.email, passowrd: credentials.password, location: credentials.location }))
    const response = await fetch('http://127.0.0.1:5000/api/loginuser', 
    { 
        method: 'POST',
        headers: {  
            'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(userData),
      });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
        alert("Enter valid credentials")
    }

    if (json.success) {
      localStorage.setItem("userEmail",credentials.email);
      localStorage.setItem("authToken",json.authToken);

      console.log(localStorage.getItem("authToken"));
      navigate("/");
  }
}
const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
}

  return (
    <div>



      <div className="container">
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" placeholder="Enter email" name='email' value={credentials.email} onChange={onChange} />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" placeholder="Password" name="password" value={credentials.password} onChange={onChange} />
          </div>


          <button type="submit" className="btn btn-success m-2">Submit</button>
          <Link to="/createuser" className="m-3 btn btn-danger" >I am New user</Link>
        </form>

      </div>






    </div>
  )
}
