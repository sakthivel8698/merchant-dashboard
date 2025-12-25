import { useState, useMemo } from "react";
import { Row, Col, Card } from "react-bootstrap";
import InputComponent from "../../components/input/Input";
import SelectComponent from "../../components/input/SelectComponent";
import ButtonComponent from "../../components/button/Button";
import { useDispatch } from "react-redux";
import { addOrder } from "../../redux/orderAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NetworkStatus from "../../components/hooks/networkStatus";

const generateOrderId = () => {
    return Date.now().toString().slice(-4);
};

export default function CreateOrder() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const netWorkStatus = NetworkStatus();

    const [formValues, setFormValues] = useState({
        orderId: generateOrderId(),
        customerName: "",
        status: "Pending",
        tax: 0,
        discount: 0,
    });

    const [errors, setErrors] = useState({});

    const [items, setItems] = useState([
        { item: "", quantity: 1, price: 0 },
    ]);

    const options = [
        { label: "Pending", value: "Pending" },
        { label: "Paid", value: "Paid" },
        { label: "Cancelled", value: "Cancelled" },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({
            ...prev,
            [name]: name === "tax" || name === "discount" ? Number(value) : value,
        }));
    };

    const updateItem = (index, field, value) => {
        const updated = [...items];
        updated[index][field] = value;
        setItems(updated);
    };

    const addItem = () => {
        setItems([...items, { item: "", quantity: 1, price: 0 }]);
    };

    const deleteItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.quantity * i.price, 0),
        [items]
    );

    const taxAmount = useMemo(() => (subtotal * formValues.tax) / 100,
        [subtotal, formValues.tax]
    );

    const discountAmount = useMemo(() => (subtotal * formValues.discount) / 100,
        [subtotal, formValues.discount]
    );

    const total = useMemo(() => subtotal + taxAmount - discountAmount,
        [subtotal, taxAmount, discountAmount]
    );

    const validateForm = (values) => {
        const newErrors = {};
        if (!values.orderId) {
            newErrors.orderId = "Order ID is required";
        }
        if (!values.customerName) {
            newErrors.customerName = "Customer Name is required";
        }
        return newErrors;
    };

    const handleSubmit = () => {
        const validationErrors = validateForm(formValues);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        if (!items.length || items.some(i => !i.item || i.quantity <= 0 || i.price <= 0)) {
            toast.error("Please add item details , ( quantity and price ) should be minimum 1");
            return;
        }

        const payload = {
            id: formValues.orderId,
            orderId: formValues.orderId,
            customerName: formValues.customerName,
            status: formValues.status,
            tax: formValues.tax,
            discount: formValues.discount,
            total,
            items,
            isSynced: netWorkStatus,
            createdAt: new Date().toISOString(),
        };

        dispatch(addOrder(payload));
        setFormValues({
            orderId: "",
            customerName: "",
            status: "Pending",
            tax: 0,
            discount: 0,
        });

        setItems([{ item: "", quantity: 1, price: 0 }]);
        toast.success("Order Created Successfully");
        setTimeout(() => {
            navigate('/orderlist')
        }, 1000);
    };

    const handleNavigate = () => {
        navigate(-1)
    }


    return (
        <div>
            <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap mb-4">
                <h4 className="">Create Order</h4>
                <ButtonComponent
                    className=''
                    btnText='Back'
                    onClick={handleNavigate}
                />
            </div>

            <Row className="mb-3">
                <Col md={4} className="mb-3">
                    <InputComponent
                        label="Order ID"
                        name="orderId"
                        placeholder="003"
                        required
                        disabled={true}
                        value={formValues.orderId}
                        error={errors.orderId}
                    />
                </Col>

                <Col md={4} className="mb-3">
                    <InputComponent
                        label="Customer Name"
                        name="customerName"
                        placeholder="Customer Name"
                        required
                        value={formValues.customerName}
                        onChange={handleChange}
                        error={errors.customerName}
                    />
                </Col>

                <Col md={4}>
                    <SelectComponent
                        label="Status"
                        name="status"
                        options={options}
                        value={formValues.status}
                        disabled={true}
                    />
                </Col>
            </Row>

            <Card className="mt-4">
                <Card.Body>
                    <ButtonComponent
                        className="addItem mb-3"
                        btnText="Add Item"
                        onClick={addItem}
                    />

                    {items?.map((row, index) => (
                        <Row className="mb-3" key={index}>
                            <Col md={3} className="mb-3">
                                <InputComponent
                                    label="Item"
                                    placeholder='Item'
                                    value={row.item}
                                    onChange={(e) =>
                                        updateItem(index, "item", e.target.value)
                                    }
                                />
                            </Col>

                            <Col md={3} className="mb-3">
                                <InputComponent
                                    label="Quantity"
                                    type="number"
                                    placeholder='Quantity'
                                    value={row.quantity}
                                    onChange={(e) =>
                                        updateItem(index, "quantity", Number(e.target.value))
                                    }
                                />
                            </Col>

                            <Col md={3} className="mb-3">
                                <InputComponent
                                    label="Price"
                                    type="number"
                                    placeholder='Price'
                                    value={row.price}
                                    onChange={(e) =>
                                        updateItem(index, "price", Number(e.target.value))
                                    }
                                />
                            </Col>

                            <Col
                                md={3}
                                className="d-flex align-items-end justify-content-start mb-3"
                            >
                                {index !== 0 && (
                                    <ButtonComponent
                                        className="deleteItem btn-danger"
                                        btnText="Delete"
                                        onClick={() => deleteItem(index)}
                                    />
                                )}
                            </Col>
                        </Row>
                    ))}
                </Card.Body>
            </Card>

            <Row className="mt-4">
                <Col md={3} className="mb-3">
                    <InputComponent label="Subtotal" placeholder='Sub Total' value={subtotal} disabled />
                </Col>
                <Col md={3} className="mb-3">
                    <InputComponent
                        label="Tax %"
                        name="tax"
                        type="number"
                        placeholder="Tax %"
                        value={formValues.tax}
                        onChange={handleChange}
                    />
                </Col>
                <Col md={3} className="mb-3">
                    <InputComponent
                        label="Discount %"
                        name="discount"
                        type="number"
                        placeholder="Discount %"
                        value={formValues.discount}
                        onChange={handleChange}

                    />
                </Col>
                <Col md={3}>
                    <InputComponent label="Total" value={total} disabled />
                </Col>
            </Row>

            <div className="d-flex justify-content-end">
                <ButtonComponent
                    className="saveOrder btn-success mt-4 px-4"
                    btnText="Save"
                    onClick={handleSubmit}
                />
            </div>
        </div>
    );
}
