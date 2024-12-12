import { useEffect, useState } from "react";
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";
import Loader from "../components/loader";
import Message from "../components/message";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfileScreen = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userType, setUserType] = useState(null); // To store the user type (Seller or not)

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  const HandleGoback = () => {
    navigate("/");
  };

  // Fetch userId and userType based on the username in userInfo
  useEffect(() => {
    if (userInfo?.username) {
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8080/api/profile/${userInfo.username}`);
          setUserId(response.data.user_id); // Set userId state
          setUserType(response.data.type_of_customer); // Set userType state
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setError("Failed to fetch user profile.");
        }
      };

      fetchUserProfile();
    }
  }, [userInfo]);

  // Fetch profile data once the userId and userType are available
  useEffect(() => {
    if (userId && userType === "Seller") {
      const fetchProfileData = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8080/seller/api/shop/${userId}`);
          setProfileData(response.data);
        } catch (err) {
          setError("Failed to fetch profile data.");
        } finally {
          setLoading(false);
        }
      };

      fetchProfileData();
    } else if (userType && userType !== "Seller") {
      setError("You must be a Seller to view this profile.");
      setLoading(false);
    }
  }, [userId, userType]);

  return (
    <Container>
      <h1 className="my-4 text-center">Profile Information</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={8} className="mx-auto">
            <Card>
              <Card.Header>
                <h2>{profileData.shop_name} - Profile</h2>
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Shop ID:</strong> {profileData.shop_id}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>User ID:</strong> {profileData.user_id}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Shop Name:</strong> {profileData.shop_name}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Total Sales:</strong> ${profileData.total_sales}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Creation Date:</strong> {new Date(profileData.creation_date).toLocaleDateString()}
                </ListGroup.Item>
              </ListGroup>
              <Card.Footer>
                <Button variant="primary" onClick={HandleGoback}>
                  Go back
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProfileScreen;
