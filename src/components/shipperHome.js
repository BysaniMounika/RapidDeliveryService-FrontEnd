import React, { useEffect, useState, useCallback } from "react";
import axios from 'axios';
import { connect } from "react-redux";
import { Nav, Row, Col, Tab } from "react-bootstrap";

export function ShipperHome(props) {
    const [currentTab, setCurrentTab] = useState("unassigned");
    const [unassignedOrders, setUnassignedOrders] = useState([]);
    const [unassignedOrdersStatus, setUnassignedOrdersStatus] = useState(false);
    const [assignedOrders, setAssignedOrders] = useState([]);
    const [assignedOrdersStatus, setAssignedOrdersStatus] = useState([]);
    const [pickedOrders, setPickedOrders] = useState([]);
    const [pickedOrdersStatus, setPickedOrdersStatus] = useState([]);
    const [deliveredOrders, setDeliveredOrders] = useState([]);
    const [deliveredOrdersStatus, setDeliveredOrdersStatus] = useState([]);

    const fetchUnassigned = async () => {
        setUnassignedOrdersStatus(true);
        try {
            const { data: response } = await axios.get('http://localhost:8080/api/allUnassigned');
            setUnassignedOrders(response);
        } catch (error) {
            console.error(error)
        }
        setUnassignedOrdersStatus(false);
    };
    
    const fetchAssigned = async () => {
        setAssignedOrdersStatus(true);
        
        try {
            const { data: response } = await axios.get(`http://localhost:8080/api/orderByAssignedTo/${props.auth.user.id}/2`);
            setAssignedOrders(response);
        } catch (error) {
            console.error(error)
        }

        setAssignedOrdersStatus(false);
    };

    const fetchPicked = async () => {
        setPickedOrdersStatus(true);
        
        try {
            const { data: response } = await axios.get(`http://localhost:8080/api/orderByAssignedTo/${props.auth.user.id}/3`);
            setPickedOrders(response);
        } catch (error) {
            console.error(error)
        }
        
        setPickedOrdersStatus(false);
    };

    const fetchDelivered = async () => {
        setDeliveredOrdersStatus(true);
        
        try {
            const { data: response } = await axios.get(`http://localhost:8080/api/orderByAssignedTo/${props.auth.user.id}/4`);
            setDeliveredOrders(response);
        } catch (error) {
            console.error(error)
        }
        
        setDeliveredOrdersStatus(false);
    };

    useEffect(() => {
        if (currentTab == "unassigned") {
            fetchUnassigned();
        } else if (currentTab == "assigned") {
            fetchAssigned();
        } else if (currentTab == "picked") {
            fetchPicked();
        } else if (currentTab == "delivered") {
            fetchDelivered();
        }
    }, [currentTab]);

    useEffect(() => {
        console.log("unassignedOrders", unassignedOrders);
    }, [unassignedOrders]);

    useEffect(() => {
        console.log("assignedOrders", assignedOrders);
    }, [assignedOrders]);

    useEffect(() => {
        console.log("pickedOrders", pickedOrders);
    }, [pickedOrders]);

    useEffect(() => {
        console.log("deliveredOrders", deliveredOrders);
    }, [deliveredOrders]);

    function fetchOrders(e) {
        setCurrentTab(e);
    }

    const markAsAssigned = (orderId) => (e) => {
        console.log(orderId);
        axios
			.put(`http://localhost:8080/api/order/updateStatus/${orderId}/2/${props.auth.user.id}`)
			.then(result => {
				console.log(result);
				fetchUnassigned();
			})
			.catch(err => {
				console.log(err);
			});
    };

    const markAsPicked = (orderId) => (e) => {
        console.log(orderId);
        axios
			.put(`http://localhost:8080/api/order/updateStatus/${orderId}/3/${props.auth.user.id}`)
			.then(result => {
				console.log(result);
				fetchAssigned();
			})
			.catch(err => {
				console.log(err);
			});
    };

    const markAsDelivered = (orderId) => (e) => {
        console.log(orderId);
        axios
			.put(`http://localhost:8080/api/order/updateStatus/${orderId}/4/${props.auth.user.id}`)
			.then(result => {
				console.log(result);
				fetchPicked();
			})
			.catch(err => {
				console.log(err);
			});
    };

    return (
        
        <Tab.Container id="left-tabs-example" defaultActiveKey="unassigned" onSelect={fetchOrders}>
            <div style={{height:'2px'}}>

            </div>
            <Row>
                <Col sm={3} className ="nopadding">
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="unassigned">UnAssigned</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={3} className ="nopadding">
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="assigned">Assigned</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={3} className ="nopadding">
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="picked">Picked</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={3} className ="nopadding">
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="delivered">Delivered</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
            </Row>
            <Tab.Content>
                <Tab.Pane eventKey="unassigned">
                    <div style={{padding:'0px 80px'}}>
                        {!unassignedOrdersStatus && 
                            unassignedOrders.map(item => (
                                <div className="custom-box row">
                                    <div className="col-sm-8">
                                        <div className="row">
                                            <div className="col-sm-3 text-start">Order ID</div>
                                            <div className="col-sm-1 text-start">:</div>
                                            <div className="col-sm-8 text-start">{item.id}</div>
                                        </div>
                                        {/* <br /> */}
                                        <div className="row">
                                            <div className="col-sm-3 text-start">Created At</div>
                                            <div className="col-sm-1 text-start">:</div>
                                            <div className="col-sm-8 text-start">{item.created}</div>
                                        </div>
                                        {/* <br /> */}
                                        <div className="row">
                                            <div className="col-sm-3 text-start">PickUp Address</div>
                                            <div className="col-sm-1 text-start">:</div>
                                            <div className="col-sm-8 text-start">
                                                {item.fromAddress.address1},
                                                {item.fromAddress.address2}, 
                                                {item.fromAddress.city}, 
                                                {item.fromAddress.state.code},
                                                {item.fromAddress.zip}
                                            </div>
                                        </div>
                                        {/* <br /> */}
                                        <div className="row">
                                            <div className="col-sm-3 text-start">Delivery Address</div>
                                            <div className="col-sm-1 text-start">:</div>
                                            <div className="col-sm-8 text-start"> 
                                                {item.toAddress.address1},
                                                {item.toAddress.address2}, 
                                                {item.toAddress.city}, 
                                                {item.toAddress.state.code},
                                                {item.toAddress.zip}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4" style={{position:'relative'}}>
                                        <div className="text-center" style={{margin: 0, position: 'absolute', top: '50%', left: '50%', transform: 'translateY(-50%)'}}> 
                                            <button className="btn btn-theme text-center" onClick={markAsAssigned(item.id)} style={{ fontFamily: '"Poppins Bold", "Poppins", sans-serif', fontWeight: 700, fontSize: '15px'}}>ASSIGN</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </Tab.Pane>
                <Tab.Pane eventKey="assigned">
                    <div style={{padding:'0px 80px'}}>
                        {!assignedOrdersStatus && 
                            assignedOrders.map(item => (
                                <div className="custom-box row">
                                    <div className="col-sm-8">
                                        <div className="row">
                                            <div className="col-sm-3 text-start">Order ID</div>
                                            <div className="col-sm-1 text-start">:</div>
                                            <div className="col-sm-8 text-start">{item.id}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3 text-start">Created At</div>
                                            <div className="col-sm-1 text-start">:</div>
                                            <div className="col-sm-8 text-start">{item.created}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3 text-start">PickUp Address</div>
                                            <div className="col-sm-1 text-start">:</div>
                                            <div className="col-sm-8 text-start">
                                                {item.fromAddress.address1},
                                                {item.fromAddress.address2}, 
                                                {item.fromAddress.city}, 
                                                {item.fromAddress.state.code},
                                                {item.fromAddress.zip}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3 text-start">Delivery Address</div>
                                            <div className="col-sm-1 text-start">:</div>
                                            <div className="col-sm-8 text-start"> 
                                                {item.toAddress.address1},
                                                {item.toAddress.address2}, 
                                                {item.toAddress.city}, 
                                                {item.toAddress.state.code},
                                                {item.toAddress.zip}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4" style={{position:'relative'}}>
                                        <div className="text-center" style={{margin: 0, position: 'absolute', top: '50%', left: '50%', transform: 'translateY(-50%)'}}> 
                                            <button className="btn btn-theme text-center" onClick={markAsPicked(item.id)} style={{ fontFamily: '"Poppins Bold", "Poppins", sans-serif', fontWeight: 700, fontSize: '15px'}}>PICK UP</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </Tab.Pane>
                <Tab.Pane eventKey="picked">
                    <div style={{padding:'0px 80px'}}>
                        {!pickedOrdersStatus && 
                            pickedOrders.map(item => (
                                <div className="custom-box row">
                                    <div className="col-sm-8">
                                        <div className="row">
                                            <div className="col-sm-3 text-start">Order ID</div>
                                            <div className="col-sm-1 text-start">:</div>
                                            <div className="col-sm-8 text-start">{item.id}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3 text-start">Created At</div>
                                            <div className="col-sm-1 text-start">:</div>
                                            <div className="col-sm-8 text-start">{item.created}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3 text-start">PickUp Address</div>
                                            <div className="col-sm-1 text-start">:</div>
                                            <div className="col-sm-8 text-start">
                                                {item.fromAddress.address1},
                                                {item.fromAddress.address2}, 
                                                {item.fromAddress.city}, 
                                                {item.fromAddress.state.code},
                                                {item.fromAddress.zip}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3 text-start">Delivery Address</div>
                                            <div className="col-sm-1 text-start">:</div>
                                            <div className="col-sm-8 text-start"> 
                                                {item.toAddress.address1},
                                                {item.toAddress.address2}, 
                                                {item.toAddress.city}, 
                                                {item.toAddress.state.code},
                                                {item.toAddress.zip}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4" style={{position:'relative'}}>
                                        <div className="text-center" style={{margin: 0, position: 'absolute', top: '50%', left: '50%', transform: 'translateY(-50%)'}}> 
                                            <button className="btn btn-theme text-center" onClick={markAsDelivered(item.id)} style={{ fontFamily: '"Poppins Bold", "Poppins", sans-serif', fontWeight: 700, fontSize: '15px'}}>DELIVER</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </Tab.Pane>
                <Tab.Pane eventKey="delivered">
                    <div style={{padding:'0px 80px'}}>
                        {!deliveredOrdersStatus && 
                            deliveredOrders.map(item => (
                                <div className="custom-box row">
                                    <div className="col-sm-8">
                                        <div className="row">
                                            <div className="col-sm-3 text-start">Order ID</div>
                                            <div className="col-sm-1 text-start">:</div>
                                            <div className="col-sm-8 text-start">{item.id}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3 text-start">Created At</div>
                                            <div className="col-sm-1 text-start">:</div>
                                            <div className="col-sm-8 text-start">{item.created}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3 text-start">PickUp Address</div>
                                            <div className="col-sm-1 text-start">:</div>
                                            <div className="col-sm-8 text-start">
                                                {item.fromAddress.address1},
                                                {item.fromAddress.address2}, 
                                                {item.fromAddress.city}, 
                                                {item.fromAddress.state.code},
                                                {item.fromAddress.zip}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3 text-start">Delivery Address</div>
                                            <div className="col-sm-1 text-start">:</div>
                                            <div className="col-sm-8 text-start"> 
                                                {item.toAddress.address1},
                                                {item.toAddress.address2}, 
                                                {item.toAddress.city}, 
                                                {item.toAddress.state.code},
                                                {item.toAddress.zip}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4" style={{position:'relative'}}>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </Tab.Pane>
            </Tab.Content>
        </Tab.Container>
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
)(ShipperHome);