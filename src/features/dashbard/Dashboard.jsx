import { useEffect, useMemo } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import NetworkStatus from "../../components/hooks/networkStatus";
import { syncOfflineOrders } from "../../redux/orderAction";

export default function Dashboard() {
    const { list } = useSelector(s => s.orders);
    const netWorkStatus = NetworkStatus();
    const dispatch = useDispatch();

    const stats = useMemo(() => {
        const total = list.length;
        const pending = list.filter(o => o.status === "Pending").length;
        const paid = list.filter(o => o.status === "Paid").length;
        const cancelled = list.filter(o => o.status === "Cancelled").length;
        const offline = list.filter(o => o.isSynced === false).length;

        return { total, pending, paid, cancelled, offline };
    }, [list]);

    useEffect(() => {
        if (netWorkStatus) {
            dispatch(syncOfflineOrders());
        }
    }, [netWorkStatus]);

    return (
        <div>
            <h4>Dashboard</h4>
            <div className="mt-4">
                <Row>
                    <Col xs={12} sm={6} md={4} xl={4} className="mb-3">
                        <Card className="">
                            <Card.Body>
                                <h5 className="">Total Orders</h5>
                                <p className="mt-2">{stats.total}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} sm={6} md={4} xl={4} className="mb-3">
                        <Card className="">
                            <Card.Body>
                                <h5 className="">Pending Orders</h5>
                                <p className="mt-2">{stats.pending}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} sm={6} md={4} xl={4} className="mb-3">
                        <Card className="">
                            <Card.Body>
                                <h5 className="">Paid Orders</h5>
                                <p className="mt-2">{stats.paid}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} sm={6} md={4} xl={4} className="mb-0">
                        <Card className="">
                            <Card.Body>
                                <h5 className="">Cancelled Orders</h5>
                                <p className="mt-2">{stats.cancelled}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} sm={6} md={4} xl={4} className="mb-0">
                        <Card className="">
                            <Card.Body>
                                <h5 className="">Offline Orders</h5>
                                <p className="mt-2">{stats.offline}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
