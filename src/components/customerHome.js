import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function CustomerHome(props) {
    console.log(props);
    const [statesData, setStatesData] = useState([]);
    const [statesLoading, setStatesLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setStatesLoading(true);
            try {
                const { data: response } = await axios.get('http://localhost:8080/api/states');
                let s = response.reduce((a, v) => ({ ...a, [v.id]: v}), {});
                setStatesData(response);
            } catch (error) {
                console.error(error)
            }
            setStatesLoading(false);
        };
    
        fetchData();
    }, []);

    // useEffect(() => {
    //     console.log("statesData", statesData);
    //     console.log("status", statesLoading);
    // }, [statesData]);

    const [formData, setFormData] = useState({
		weight: "",
		height: "",
		length: "",
        width: "",
        fromAddress: {
            "address1": "",
            "address2": "",
            "city": "",
            "state": "",
            "zip": ""
        }
	})

    const [fromAddress, setFromAddress] = useState({
        "address1": "",
        "address2": "",
        "city": "",
        "state": {},
        "zip": ""
    })

    const [toAddress, setToAddress] = useState({
        "address1": "",
        "address2": "",
        "city": "",
        "state": {},
        "zip": ""
    })

    function handleInput(e) {
		e.preventDefault();
		const name = e.target.name;
		const value = e.target.value;
		setFormData({...formData, [name]: value})
	};

    function updateFromAddress(e) {
        e.preventDefault();
        const name = e.target.name;
		let value = e.target.value;
        if (name == "state") {
            value = JSON.parse(e.target.value);
        }
		setFromAddress({...fromAddress, [name]: value})
    }

    function updateToAddress(e) {
        e.preventDefault();
        const name = e.target.name;
		let value = e.target.value;
        if (name == "state") {
            value = JSON.parse(e.target.value);
        }
		setToAddress({...toAddress, [name]: value})
    }

    let navigate = useNavigate();
    
    function handleForm(e) {
        e.preventDefault();
        console.log(formData);
        console.log(fromAddress);
        console.log(toAddress);

        const data = {
            "weight": formData.weight,
            "length": formData.length,
            "width": formData.width,
            "height": formData.height,
            "fromAddress": fromAddress,
            "toAddress": toAddress,
            "orderedBy": props.auth.user,
            "assignedTo": null
        }

        console.log("data", data);

        axios
            .post("http://localhost:8080/api/order", data)
            .then(result => {
                console.log(result);
                navigate(`/customer/${props.auth.user.id}/order-success/${result.data.id}`);
            })
            .catch(err => {
                console.log(err.response);
            });
    }

    return (
        <div style={{padding:'80px'}}>
            <div>
                <div className="left">
                    <h6 className="page-heading"> Create order </h6>
                </div>
            </div>
            <br/>
            <form onSubmit={handleForm}>
                <div className="custom-box">
                    <div>
                        <div style={{textAlign:'left'}}>
                            <h6 className="box-heading"> Package Details </h6>
                        </div>
                    </div>
                    <div style={{textAlign:'left', padding:'0px 20px'}}>
                        <div className="form-group row" style={{'margin':'20px 10px'}}>
                            <label className="theme-text theme-color col-sm-3">Weight(in lb)</label>
                            <div className="col-sm-4">
                                <input type="number" name="weight" value={formData.weight} onChange={handleInput} className="form-control" />
                            </div>
                        </div>
                        <div className="form-group row" style={{'margin':'20px 10px'}}>
                            <label className="theme-text theme-color col-sm-3">Height(in cm)</label>
                            <div className="col-sm-4">
                                <input type="number" name="height" value={formData.height} onChange={handleInput} className="form-control" />
                            </div>
                        </div>
                        <div className="form-group row" style={{'margin':'20px 10px'}}>
                            <label className="theme-text theme-color col-sm-3">Length(in cm)</label>
                            <div className="col-sm-4">
                                <input type="number" name="length" value={formData.length} onChange={handleInput} className="form-control" />
                            </div>
                        </div>
                        <div className="form-group row" style={{'margin':'20px 10px'}}>
                            <label className="theme-text theme-color col-sm-3">Width(in cm)</label>
                            <div className="col-sm-4">
                                <input type="number" name="width" value={formData.width} onChange={handleInput} className="form-control" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="custom-box">
                    <div>
                        <div style={{textAlign:'left'}}>
                            <h6 className="box-heading"> Pick Up Address </h6>
                        </div>
                    </div>
                    <div style={{textAlign:'left', padding:'0px 20px'}}>
                        <div className="form-group row" style={{'margin':'20px 10px'}}>
                            <label className="theme-text theme-color col-sm-3">Address Line 1</label>
                            <div className="col-sm-9">
                                <input type="text" name="address1" value={fromAddress.address1} onChange={updateFromAddress} className="form-control" />
                            </div>
                        </div>
                        <div className="form-group row" style={{'margin':'20px 10px'}}>
                            <label className="theme-text theme-color col-sm-3">Address Line 2</label>
                            <div className="col-sm-9">
                                <input type="text" name="address2" value={fromAddress.address2} onChange={updateFromAddress} className="form-control" />
                            </div>
                        </div>
                        <div className="form-group row" style={{'margin':'20px 10px'}}>
                            <label className="theme-text theme-color col-sm-3">City</label>
                            <div className="col-sm-4">
                                <input type="text" name="city" value={fromAddress.city} onChange={updateFromAddress} className="form-control" />
                            </div>
                        </div>
                        <div className="form-group row" style={{'margin':'20px 10px'}}>
                            <label className="theme-text theme-color col-sm-3">State</label>
                            <div className="col-sm-4 theme-text">
                                <select className="form-select" name="state" onChange={updateFromAddress}>
                                    {!statesLoading && 
                                        statesData.map(item => (<option value={JSON.stringify(item)}>{item.name}</option>))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="form-group row" style={{'margin':'20px 10px'}}>
                            <label className="theme-text theme-color col-sm-3">Zip Code</label>
                            <div className="col-sm-4">
                                <input type="text" name="zip" value={fromAddress.zipcode} onChange={updateFromAddress} className="form-control" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="custom-box">
                    <div>
                        <div style={{textAlign:'left'}}>
                            <h6 className="box-heading"> Delivery Address </h6>
                        </div>
                    </div>
                    <div style={{textAlign:'left', padding:'0px 20px'}}>
                        <div className="form-group row" style={{'margin':'20px 10px'}}>
                            <label className="theme-text theme-color col-sm-3">Address Line 1</label>
                            <div className="col-sm-9">
                                <input type="text" name="address1" value={toAddress.address1} onChange={updateToAddress} className="form-control" />
                            </div>
                        </div>
                        <div className="form-group row" style={{'margin':'20px 10px'}}>
                            <label className="theme-text theme-color col-sm-3">Address Line 2</label>
                            <div className="col-sm-9">
                                <input type="text" name="address2" value={toAddress.address2} onChange={updateToAddress} className="form-control" />
                            </div>
                        </div>
                        <div className="form-group row" style={{'margin':'20px 10px'}}>
                            <label className="theme-text theme-color col-sm-3">City</label>
                            <div className="col-sm-4">
                                <input type="text" name="city" value={toAddress.city} onChange={updateToAddress} className="form-control" />
                            </div>
                        </div>
                        <div className="form-group row" style={{'margin':'20px 10px'}}>
                            <label className="theme-text theme-color col-sm-3">State</label>
                            <div className="col-sm-4 theme-text">
                                <select className="form-select" name="state" onChange={updateToAddress}>
                                    {!statesLoading && 
                                        statesData.map(item => (<option value={JSON.stringify(item)}>{item.name}</option>))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="form-group row" style={{'margin':'20px 10px'}}>
                            <label className="theme-text theme-color col-sm-3">Zip Code</label>
                            <div className="col-sm-4">
                                <input type="text" name="zip" value={toAddress.zipcode} onChange={updateToAddress} className="form-control" />
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{height: '20px'}}>

                </div>
                <div className="text-center"> 
                    <button type="submit" className="btn btn-theme text-center col-sm-2">Create Order</button>
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
    mapStateToProps,
    null
)(CustomerHome);