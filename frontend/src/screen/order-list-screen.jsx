import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap";
import Loader from "../components/loader";
import Message from "../components/message";
import { listOrderSeller } from "../action/orderAction"; 
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure axios is imported

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);  // State to store userId

  // Select state related to orders
  const listOrderSellerState = useSelector((state) => state.listOrderSeller);
  const { loading, error, orders } = listOrderSellerState;

  // Select state related to user login
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Fetch userId based on username in userInfo
  useEffect(() => {
    if (userInfo?.username) {
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8080/api/profile/${userInfo.username}`);
          setUserId(response.data.user_id); // Set userId state
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };

      fetchUserProfile();
    }
  }, [userInfo]);

  // Fetch orders when userId is available
  useEffect(() => {
    if (userId) {
      dispatch(listOrderSeller(userId)); // Dispatch the action to fetch orders for this user
    }
  }, [dispatch, userId]);

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
                  {/* Check if NumberOfStars exists and is valid */}
                  {order.NumberOfStars && order.NumberOfStars.Valid
                    ? order.NumberOfStars.Int64
                    : "N/A"}
                </td>
                <td>
                  {/* Check if FeedbackContent exists and is valid */}
                  {order.FeedbackContent && order.FeedbackContent.Valid
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
