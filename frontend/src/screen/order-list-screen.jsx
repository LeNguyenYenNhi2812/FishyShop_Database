// src/screens/OrderListScreen.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/loader";
import Message from "../components/message";
import { listOrderSeller } from "../action/orderAction"; 
import { useNavigate } from "react-router-dom";

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Ensure you're selecting the correct slice of state
  const listOrderSellerState = useSelector((state) => state.listOrderSeller);
  const { loading, error, orders } = listOrderSellerState;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listOrderSeller(1)); // Assuming 1 is the user ID or dynamic ID based on login
  }, [dispatch, userInfo]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Order ID</th>
              <th>Product ID</th>
              <th>Shop ID</th>
              <th>Quantity</th>
              <th>Number of Stars</th>
              <th>Feedback</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.ItemID}>
                <td>{order.ItemID}</td>
                <td>{order.OrderID}</td>
                <td>{order.ProductID}</td>
                <td>{order.ShopID}</td>
                <td>{order.Quantity}</td>
                <td>
                  {order.NumberOfStars.Valid
                    ? order.NumberOfStars.Int64
                    : "N/A"}
                </td>
                <td>
                  {order.FeedbackContent.Valid
                    ? order.FeedbackContent.String
                    : "No feedback"}
                </td>
                <td>{new Date(order.Time).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default OrderListScreen;
