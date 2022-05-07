import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { connect } from "react-redux";
import axios from 'axios';

export function OrderHistory(props) {
    let { customerId, orderId } = useParams();

    const [order, setOrder] = useState({});
    const [status, setStatus] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            console.log(props);
            try {
                const { data: response } = await axios.get(`http://localhost:8080/api/order/${orderId}`);
                console.log(response)
                setOrder(response);
            } catch (error) {
                console.error(error)
            }
            setStatus(true);
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        console.log("Order", order);
    }, [order]);

    return (
        <div style={{padding:'80px'}}>
            <div>
                <div className="left">
                    <h6 className="page-heading"> Order History </h6>
                </div>
            </div>

            {status && 
                <div className="custom-box row" style={{border: 0}}>
                    <div className="col-sm-8">
                        <div className="row">
                            <div className="col-sm-3">Order ID</div>
                            <div className="col-sm-1">:</div>
                            <div className="col-sm-8">{order.id}</div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-sm-3">Created At</div>
                            <div className="col-sm-1">:</div>
                            <div className="col-sm-8">{order.created}</div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-sm-3">PickUp Address</div>
                            <div className="col-sm-1">:</div>
                            <div className="col-sm-8">
                                {order.fromAddress.address1},
                                {order.fromAddress.address2}, 
                                 {order.fromAddress.city}, 
                                 {order.fromAddress.state.code},
                                 {order.fromAddress.zip}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-sm-3">Delivery Address</div>
                            <div className="col-sm-1">:</div>
                            <div className="col-sm-8"> 
                                {order.toAddress.address1},
                                {order.toAddress.address2}, 
                                {order.toAddress.city}, 
                                {order.toAddress.state.code},
                                {order.toAddress.zip}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-sm-3">Order Status</div>
                            <div className="col-sm-1">:</div>
                            <div className="col-sm-8">{order.orderStatus.name}</div>
                        </div>
                        <br />
                        {order.orderStatus.name != "Unassigned" && <div className="row">
                            <div className="col-sm-3">{order.orderStatus.name} At</div>
                            <div className="col-sm-1">:</div>
                            <div className="col-sm-8">{order.updated}</div>
                        </div>}
                    </div>
                </div>
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
)(OrderHistory);