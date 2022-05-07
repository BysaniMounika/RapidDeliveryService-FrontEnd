import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function CustomerPreviousOrders(props) {
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            console.log(props);
            setStatus(true);
            try {
                const { data: response } = await axios.get(`http://localhost:8080/api/orderByOrderedBy/${props.auth.user.id}`);
                console.log(response)
                setOrders(response);
            } catch (error) {
                console.error(error)
            }
            setStatus(false);
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        console.log("Orders", orders);
    }, [orders]);

    let navigate = useNavigate();
    
    const goToOrderHistory = useCallback((orderId) => (e) => navigate(`/customer/${props.auth.user.id}/order/${orderId}`), [navigate]);

    return (
        <div style={{padding:'80px'}}>
            <div>
                <div className="left">
                    <h6 className="page-heading"> Previous Orders </h6>
                </div>
            </div>
            {!status && 
                orders.map(item => (
                    <div className="custom-box row">
                        <div className="col-sm-6">
                            <div className="row">
                                <div className="col-sm-5">Order ID</div>
                                <div className="col-sm-1">:</div>
                                <div className="col-sm-6">{item.id}</div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-sm-5">Created At</div>
                                <div className="col-sm-1">:</div>
                                <div className="col-sm-6">{item.created}</div>
                            </div>
                        </div>
                        <div className="col-sm-6" style={{position:'relative'}}>
                            <div className="text-center" style={{margin: 0, position: 'absolute', top: '50%', left: '50%', transform: 'translateY(-50%)'}}> 
                                <button className="btn btn-theme text-center" onClick={goToOrderHistory(item.id)} style={{ fontFamily: '"Poppins Bold", "Poppins", sans-serif', fontWeight: 700, fontSize: '15px'}}>VIEW DETAILS</button>
                            </div>
                        </div>
                    </div>
                ))
            }
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
    mapStateToProps,
    null
)(CustomerPreviousOrders);