import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'


export default function Signup() {
    const navigate=useNavigate();

    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = { name: credentials.name, email: credentials.email, password: credentials.password, location: "india"};
//         const userData = {
//             "name":"prajwal hhs",
//             "password":"1dasdad456",
//             "email":"dadadads@gmail.com",
//             "location":"Pune"
// }
        // console.log(JSON.stringify({ name: credentials.name, email: credentials.email, passowrd: credentials.password, location: credentials.location }))
        const response = await fetch('http://127.0.0.1:5000/api/createuser', 
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
            alert("Email already used!")
        }else{
            navigate('/login');
        }

        // response.redirected('login.js');
    }

    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }
    return (  
        <>
        
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" placeholder="Enter name" name='name' value={credentials.name} onChange={onChange} />

                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" name='email' value={credentials.email} onChange={onChange} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" placeholder="Password" name="password" value={credentials.password} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Address</label>
                        <input type="text" className="form-control" placeholder="address" name="geolocation" value={credentials.geolocation} onChange={onChange} />
                    </div>

                    <button type="submit" className="btn btn-success m-2">Submit</button>
                    <Link to="/login" className="m-3 btn btn-danger" >Already a User</Link>
                </form>

            </div>
            
        </>

    )
}
