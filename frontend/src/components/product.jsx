import { Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./rating";

const Product = ({ product }) => {
    function getRandomIntegerExclusive(a, b) {
        return Math.floor(Math.random() * (b - a)) + a;
        
    }
    // console.log(product.product_id);
    return (
        <Card 
           
            className="product-container mt-3 p-3 rounded"
            style={{ fontFamily: "Shantell Sans" }}
        >
            
            <Link to={`/get-products/${product.product_id}`}>
            <Image
                                
                                src={product?.image?.Valid ? product.image.String : "http://surl.li/nauveq"}
                                alt={product?.product_name}
                                fluid
                            />
            </Link>
            <Card.Body as="div">
                <Link
                    to={`/get-products/${product.product_id}`}
                    className="text-decoration-none text-dark"
                >
                    <strong
                        className="d-flex"
                        style={{ textAlign: "left", height: "3rem" }}
                    >
                        {product.product_name}
                    </strong>
                </Link>
                <Card.Text as="div">
                    <div className="my-3">
                        {/* {product.rating} from {product.numReviews} reviews */}
                        {/* <Rating
                            value={getRandomIntegerExclusive(3,5)}
                            text={ getRandomIntegerExclusive(50,100) + `reviews`}
                            color="#dc994b"
                        /> */}
                    </div>
                </Card.Text>
                <Card.Text as="h3">${product.price}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Product;
