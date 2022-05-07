import { useParams } from "react-router-dom";
import { connect } from "react-redux";

function OrderSuccess(props) {
    let { orderId } = useParams();

    return (
        <div style={{padding:'80px'}}>
            <div>
                <div className="left">
                    <h6 className="page-heading" style={{color: '#63A103'}}> Order Created Successfully! </h6>
                    <br />
                    <div>
                        Order ID is {orderId}
                    </div>
                </div>
            </div>
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
)(OrderSuccess);