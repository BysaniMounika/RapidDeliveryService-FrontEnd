import React, { Fragment, useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Nav, NavDropdown } from "react-bootstrap";
import { clearUser } from '../store/reducers/AuthReducer';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

function NavBar(props) {
	console.log(props);
	let navigate = useNavigate();

	function handleLogout(e) {
		e.preventDefault();
		localStorage.removeItem("user");
		props.clearUser();
		navigate("/login");
	};

	const [pathname, setPathname] = useState('/');

	console.log(props.user);

	const checkActive = (match, location) => {
		if (!location) return false;
		setPathname(location.pathname);
		return pathname === "/" ? false : pathname === "/";
	}

	// function redirect(e) {
	// 	e.preventDefault();
	// 	console.log(e);
	// 	// console.log(route);
	// 	// navigate(route);
	// }

	const redirect = useCallback((route) => (e) => navigate(route), [navigate]);

	return (
		<div>
			<div className="navbar navbar-expand-lg">
				<div style={{width:'10px'}}>

				</div>
				<div>
					<div>
							<p className="logo vertical-center">
									<span>RDS</span>
							</p>
					</div>
				</div>
				<div style={{width:'20px'}}>

				</div>
				<div>
					<div>
							<p className="logo2 vertical-center">
									<span>Rapid Delivery Service</span>
							</p>
					</div>
				</div>
				<div style={{width:'58%'}}>

				</div>
				{props.auth.loggedIn && 
					<nav className="navbar" atyle={{width:'20%', float:'right'}}>
						<ul className="navbar-nav">
							<div>
								<div>
									<div className="user-name vertical-center">
										<span style={{marginRight:'5px'}}>{props.user.firstName} {props.user.lastName}</span>
									</div>
									<div className="user-name vertical-center">
										<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
											<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
											<path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
										</svg>
									</div>
								</div>
							</div>
							<Nav>
							<NavDropdown style={{color:"white !important"}}
								id="nav-dropdown"
							>
								{ props.user.userRole.id == 1 && 
									<div>
										<NavDropdown.Item className="theme-text theme-color text-center" onClick={redirect("/customer-home")}>Home</NavDropdown.Item>
										<NavDropdown.Divider />
									</div>
								} 

								{ props.user.userRole.id == 1 && 
									<div>
										<NavDropdown.Item className="theme-text theme-color  text-center" onClick={redirect("/customer-previous-orders")}>Previous Orders</NavDropdown.Item>
										<NavDropdown.Divider />
									</div>
								} 
								<NavDropdown.Item className="theme-text theme-color text-center" onClick={handleLogout}>Logout</NavDropdown.Item>
							</NavDropdown>
						</Nav>
						</ul>
					</nav>
				}	
			</div>
			{props.children}
		</div >
	);

}

const mapStateToProps = (state) => {
	console.log("NavBar state", state);
	const { auth } = state;
	return {
		auth: auth,
		user: auth.loggedIn ? auth.user : null
	};
}
	
const mapDispatchToProps = (dispatch) => {
	return {
	 	clearUser: () => dispatch(clearUser())
	};
};

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(NavBar);

