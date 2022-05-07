import React, { Component, useState } from "react";
import { connect, useDispatch } from "react-redux";
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { setUser } from '../store/reducers/AuthReducer'
import { useNavigate, Link } from 'react-router-dom';
export function SignUp(props) {

	const [formData, setFormData] = useState({
		"firstName": "",
        "lastName": "",
        "email": "",
        "userRole": 0,
        "password": ""
	})

	let navigate = useNavigate();

  	function handleForm(e) {
		e.preventDefault();
        const data = {
            "email": formData.email,
            "password": formData.password,
            "firstName": formData.firstName,
            "lastName": formData.lastName,
            "userRole": {
                "id": parseInt(formData.userRole, 10),
                "name": formData.userRole == "1" ? "Customer" : "Driver"
            }
        }
        // setFormData({...formData, "userRole": {
        //     "id": parseInt(formData.userRole, 10),
        //     "name": formData.userRole == "1" ? "Customer" : "Driver"
        // }});
        console.log("data", data);

		axios
			.post(`http://localhost:8080/api/user`, data)
			.then(result => {
				console.log(result);
                navigate("/login");
			})
			.catch(err => {
				console.log(err);
			});
	};

	function handleInput(e) {
		e.preventDefault();
		const name = e.target.name;
		const value = e.target.value;
		setFormData({...formData, [name]: value})
	};

    return (
      <div className="content">
        <NotificationContainer />
        <form onSubmit={handleForm}>
        <div className="login-box1" style={{height: '400px !important'}}>
            <div className="login-box">
            <div></div>
            <div style={{border:'10px'}}>
                <div className="text-center heading">Sign Up</div>
            </div>
            <div>
                <div className="form-group row" style={{'margin':'20px 10px'}}>
                    <label className="theme-text theme-color col-sm-4">First Name</label>
                    <div class="col-sm-8">
						<input type="text" name="firstName" value={formData.firstName} onChange={handleInput} className="form-control" />
                    </div>
                </div>
                <div className="form-group row" style={{'margin':'20px 10px'}}>
                    <label className="theme-text theme-color col-sm-4">Last Name</label>
                    <div class="col-sm-8">
						<input type="text" name="lastName" value={formData.lastName} onChange={handleInput} className="form-control" />
                    </div>
                </div>
                <div className="form-group row" style={{'margin':'20px 10px'}}>
                    <label className="theme-text theme-color col-sm-4">Gmail</label>
                    <div class="col-sm-8">
						<input type="email" name="email" value={formData.email} onChange={handleInput} className="form-control" />
                    </div>
                </div>
                <div className="form-group row" style={{'margin':'20px 10px'}}>
                    <label className="theme-text theme-color col-sm-4">Role</label>
                    <div class="col-sm-8 theme-text">
                        <select class="form-select" name="userRole" onChange={handleInput}>
                            <option selected></option>
                            <option value="1">Customer</option>
                            <option value="2">Delivery Man</option>    
                        </select>
                    </div>
                </div>
                <div className="form-group row" style={{'margin':'20px 10px'}}>
                    <label className="theme-text theme-color col-sm-4">Password</label>
                    <div class="col-sm-8">
                        <input type="password" name="password" className="form-control" value={formData.password} onChange={handleInput}/>
                    </div>
                </div>

                <div className="text-center"> 
                	<button type="submit" className="btn btn-theme text-center col-sm-4">Sign Up</button>
				</div>
              
			  	<Link to="/login" style={{fontFamily:'"Poppins", sans-serif', fontSize: '10px', color: '#008FCC', textDecoration: 'none'}}>Already have an account? Login here.</Link>
            </div>
            <div className="col-sm-2"></div>
            </div>
        </div>
          
        </form>
      </div>
    );
}

const mapStateToProps = (state) => {
	console.log("state", state);
	const { auth } = state;
	return {
		auth: auth
	};
}

export default connect(
    null,
    null
)(SignUp);