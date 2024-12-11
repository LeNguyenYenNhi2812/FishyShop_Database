import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../action/productAction";
import { useSearchParams } from "react-router-dom";

import Product from "../components/product";
import Message from "../components/message";
import Loader from "../components/loader.jsx";
import Banner from "../components/Banner/banner.jsx";
import Download from "../components/Download/download.jsx";

const HomeScreen = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { error, loading, products } = productList;

    const [queryParameters] = useSearchParams();
    const keyword = queryParameters.get("keyword");

    useEffect(() => {
        dispatch(listProducts(keyword)); // No page parameter
    }, [dispatch, keyword]);

    return (
        <div id="home">
            <Banner />
            <h1 id="product">Latest Products</h1>
            {loading ? (
    <Loader />
) : error ? (
    <Message variant="danger">{error}</Message>
) : (
    <div>
        <Row>
            {products.map((product) => (
                <Col key={product.product_id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}></Product>
                </Col>
            ))}
        </Row>
    </div>
)}

            <Download />
        </div>
    );
};

export default HomeScreen;
