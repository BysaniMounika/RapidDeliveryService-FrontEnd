import React, { Component, useState } from "react";
import { connect, useDispatch } from "react-redux";
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { setUser } from '../store/reducers/AuthReducer'
import { useNavigate, Link } from 'react-router-dom';

export function Login(props) {

	const [formData, setFormData] = useState({
		email: "",
		password: "",
		role: ""
	})

	let navigate = useNavigate();

  	function handleForm(e) {
		e.preventDefault();
		
		console.log("props", props);
		console.log("formData", formData);
		if (formData.email === '' || formData.password === '') {
			NotificationManager.warning("Email And Password Required");
			return false;
		}
		
		axios
			.get(`http://localhost:8080/api/user/${formData.email}/${formData.password}/${formData.role}`)
			.then(result => {
				console.log(result);
				localStorage.setItem("user", JSON.stringify(result.data));
				console.log(localStorage.getItem('user'));
				props.setUser(JSON.stringify(result.data));
				if (formData.role == 1) {
					navigate("/customer-home");
				} else if (formData.role == 2) {
					navigate("/shipper-home");
				}
			})
			.catch(err => {
				if (err.response && err.response.status === 404)
				NotificationManager.error(err.response.data.msg);
				else {
					NotificationManager.error("Something Went Wrong");
					console.log(err);
				}
			});
	};

	function handleInput(e) {
		e.preventDefault();
		const name = e.target.name;
		const value = e.target.value;
		setFormData({...formData, [name]: value})
		// this.setState({ [name]: value });
		// if (name == "role") {
		// 	console.log(value);
		// 	if (value == "1") {
		// 		setFormData({...formData, 
		// 			email: "darrellburress@gmail.com",
		// 			role: value,
		// 			password: "DBpassword"
		// 		})
		// 	} else if (value == "2") {
		// 		setFormData({...formData, 
		// 			email: "jamesdriver@gmail.com",
		// 			role: value,
		// 			password: "JDpassword"
		// 		})
		// 	}
		// 	console.log(formData);
		// }
	};

//   render() {
    return (
      <div className="content">
        <NotificationContainer />
        <form onSubmit={handleForm}>
        <div className="login-box1">
            <div className="login-box">
            <div></div>
            <div style={{border:'10px'}}>
                <div className="text-center heading">Login</div>
            </div>
            <div>
                <div className="form-group row" style={{'margin':'20px 10px'}}>
                    <label className="theme-text theme-color col-sm-4">Gmail</label>
                    <div class="col-sm-8">
                        {/* <input type="email" name="email" onChange={handleInput} className="form-control" value="jamesdriver@gmail.com" /> */}
						<input type="email" name="email" value={formData.email} onChange={handleInput} className="form-control" />
                    </div>
                </div>
                <div className="form-group row" style={{'margin':'20px 10px'}}>
                    <label className="theme-text theme-color col-sm-4">Role</label>
                    <div class="col-sm-8 theme-text">
                        <select class="form-select" name="role" onChange={handleInput}>
                            <option selected></option>
                            <option value="2">Delivery Man</option>    
                            <option value="1">Customer</option>
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
                	<button type="submit" className="btn btn-theme text-center col-sm-4">Login</button>
				</div>
              
			  	<Link to="/sign-up" style={{fontFamily:'"Poppins", sans-serif', fontSize: '10px', color: '#008FCC', textDecoration: 'none'}}>Create Account</Link>
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

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: user => dispatch(setUser(JSON.parse(user)))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);