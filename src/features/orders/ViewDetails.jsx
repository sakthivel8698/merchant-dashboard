import { useLocation, useNavigate } from "react-router-dom";
import Table from "../../components/table/Table";
import ButtonComponent from "../../components/button/Button";
import { Card, Col, Row } from "react-bootstrap";

function ViewDetails() {

    const navigate = useNavigate();
    const location = useLocation();
    const orderData = location.state;

    const columns = [
        {
            key: "item",
            label: "Item"
        },
        { key: "quantity", label: "Quantity" },
        { key: "price", label: "Price" },
    ];


    const handleNavigate = () => {
        navigate(-1)
    }

    return (
        <div>

            <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap mb-4">
                <h4 className="">Order Details</h4>
                <ButtonComponent
                    className=''
                    btnText='Back'
                    onClick={handleNavigate}
                />
            </div>

            <Card className="mb-4 mt-4">
                <Card.Body>
                    <Row className="mb-2">
                        <Col md={4}><strong>Order ID:</strong></Col>
                        <Col md={8}>{orderData?.orderId}</Col>
                    </Row>

                    <Row className="mb-2">
                        <Col md={4}><strong>Customer Name:</strong></Col>
                        <Col md={8}>{orderData?.customerName}</Col>
                    </Row>

                    <Row className="mb-2">
                        <Col md={4}><strong>Status:</strong></Col>
                        <Col md={8}>
                            <span
                                style={{
                                    color:
                                        orderData?.status === "Paid"
                                            ? "green"
                                            : orderData?.status === "Cancelled"
                                                ? "red"
                                                : "orange",
                                    fontWeight: "bold",
                                }}
                            >
                                {orderData?.status}
                            </span>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <div className="mt-4">
                <Table
                    columns={columns}
                    data={orderData?.items}
                />
            </div>

            <Card className="mt-4">
                <Card.Body>
                    <Row className="mb-2">
                        <Col md={4}><strong>Tax (%):</strong></Col>
                        <Col md={8}>{orderData?.tax}</Col>
                    </Row>

                    <Row className="mb-2">
                        <Col md={4}><strong>Discount (%):</strong></Col>
                        <Col md={8}>{orderData?.discount}</Col>
                    </Row>

                    <Row className="mb-2">
                        <Col md={4}><strong>Total Amount:</strong></Col>
                        <Col md={8}>
                            <strong>{orderData?.total}</strong>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
}

export default ViewDetails;