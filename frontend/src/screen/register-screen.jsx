import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/loader";
import Message from "../components/message";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { register } from "../action/userAction";
import FormContainer from "../components/form";

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [ssn, setSsn] = useState("");
    const [date_of_birth, setDate_of_birth] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [FName, setFName] = useState("");
    const [LName, setLName] = useState("");

    const [message, setMessage] = useState("");
    const [type_of_customer, setType_of_customer] = useState("");
    const [queryParameters] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userRegister = useSelector((state) => state.userRegister);
    const { error, loading, userInfo } = userRegister;

    const redirect = queryParameters.get("redirect")
        ? queryParameters.get("redirect")
        : "/";

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, navigate, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Password do not match");
        }
        dispatch(register(username, password, email, ssn, type_of_customer,date_of_birth,address,phone,FName,LName));
        navigate("/login");
    };

    return (
        <FormContainer>
            <h1 className="d-flex justify-content-center">Register</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            {message && <Message variant="danger">{message}</Message>}
            <Form
                className="border border-dark rounded-2 p-4"
                onSubmit={submitHandler}
            >
                <Form.Group
                    controlId="name"
                    className="d-flex flex-column"
                    style={{ textAlign: "left" }}
                >
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        required
                        type="Username"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    ></Form.Control>
                </Form.Group>
                <Form.Group
                    controlId="email"
                    className="d-flex flex-column mt-3" 
                    style={{ textAlign: "left" }}
                >
                    <Form.Label>Email Adress</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    ></Form.Control>
                </Form.Group>

                <Form.Group
                    controlId="password"
                    className="d-flex flex-column mt-3"
                    style={{ textAlign: "left" }}
                >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    ></Form.Control>
                </Form.Group>

                <Form.Group
                    controlId="passwordConfirm"
                    className="d-flex flex-column mt-3"
                    style={{ textAlign: "left" }}
                >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                    ></Form.Control>
                        </Form.Group>


                        <Form.Group
                    controlId="SSN"
                    className="d-flex flex-column mt-3"
                    style={{ textAlign: "left" }}
                >
                    <Form.Label>SSN</Form.Label>
                    <Form.Control
                        required
                        type="ssn"
                        placeholder="Ssn"
                        value={ssn}
                        onChange={(e) => {
                            setSsn(e.target.value);
                        }}
                    ></Form.Control>
                        </Form.Group>
                        
                        <Form.Group
                    controlId="DateOfBirth"
                    className="d-flex flex-column mt-3"
                    style={{ textAlign: "left" }}
                >
                    <Form.Label>Date of birth</Form.Label>
                    <Form.Control
                        required
                        type="Date of birth"
                        placeholder="yyyy-mm-dd"
                        value={date_of_birth}
                        onChange={(e) => {
                            setDate_of_birth(e.target.value);
                        }}
                    ></Form.Control>

                    </Form.Group>
                        
                        <Form.Group
                    controlId="Address"
                    className="d-flex flex-column mt-3"
                    style={{ textAlign: "left" }}
                >
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        required
                        type="address"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value);
                        }}
                    ></Form.Control>
                     </Form.Group>   
                      
                     <Form.Group
                    controlId="Phone"
                    className="d-flex flex-column mt-3"
                    style={{ textAlign: "left" }}
                >
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        required
                        type="Phone"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => {
                            setPhone(e.target.value);
                        }}
                    ></Form.Control>
                     </Form.Group> 
                      
                     <Form.Group
                    controlId="FNames"
                    className="d-flex flex-column mt-3"
                    style={{ textAlign: "left" }}
                >
                    <Form.Label>FName</Form.Label>
                    <Form.Control
                        required
                        type="FName"
                        placeholder="FName"
                        value={FName}
                        onChange={(e) => {
                            setFName(e.target.value);
                        }}
                    ></Form.Control>
                     </Form.Group> 


                     <Form.Group
                    controlId="LName"
                    className="d-flex flex-column mt-3"
                    style={{ textAlign: "left" }}
                >
                    <Form.Label>LName</Form.Label>
                    <Form.Control
                        required
                        type="LName"
                        placeholder="LName"
                        value={LName}
                        onChange={(e) => {
                            setLName(e.target.value);
                        }}
                    ></Form.Control>
                     </Form.Group> 


               
                    <Form.Group
                    controlId="role"
                    className="d-flex flex-column mt-3"
                    style={{ textAlign: "left" }}>
                        <Form.Label>Type of Customer</Form.Label>
                    <div>
                    <Form.Check
                        type="radio"
                        label="Seller"
                        name="typeCustomer"
                        id="typeCustomerSeller"
                        value="Seller" // Gán giá trị cụ thể
                        onChange={(e) => setType_of_customer(e.target.value)}
                        checked={type_of_customer === "Seller"}
                    />
                    <Form.Check
                        type="radio"
                        label="Purchaser"
                        name="typeCustomer"
                        id="typeCustomerPurchaser"
                        value="Purchaser" // Gán giá trị cụ thể
                        onChange={(e) => setType_of_customer(e.target.value)}
                        checked={type_of_customer === "Purchaser"}
                    />
                    </div>




                    </Form.Group>



                <Button
                    type="submit"
                    variant="dark"
                    className="mt-4"
                    style={{ minWidth: "50%" }}
                >
                    Register
                </Button>
            </Form>

            <Row className="py-3">
                <Col>
                    <Button
                        className="bg-white text-black"
                        onClick={() => navigate('/login')}
                        variant="dark"
                        style={{ minWidth: "10%" }}
                    >
                        Have an account already?
                    </Button>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default RegisterScreen;
