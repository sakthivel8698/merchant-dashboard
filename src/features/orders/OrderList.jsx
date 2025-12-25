import { useEffect, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Table from "../../components/table/Table";
import ButtonComponent from "../../components/button/Button";
import { deleteOrder, fetchOrders, syncOfflineOrders } from '../../redux/orderAction';
import NetworkStatus from '../../components/hooks/networkStatus';
import { toast } from "react-toastify";
import InputComponent from "../../components/input/Input";

function OrderList() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list } = useSelector(s => s.orders);
  const netWorkStatus = NetworkStatus();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 5;

  useEffect(() => {
    if (netWorkStatus) {
      dispatch(syncOfflineOrders());
    }
  }, [netWorkStatus]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const columns = [
    { key: "orderId", label: "Order ID" },
    { key: "customerName", label: "Customer" },
    { key: "total", label: "Total Amount" },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span
          style={{
            color:
              row.status === "Paid"
                ? "green"
                : row.status === "Cancelled"
                  ? "red"
                  : "orange"
          }}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: "",
      label: "Action",
      render: (row) => (
        <div className="d-flex align-items-center gap-3">
          <ButtonComponent
            btnText='Edit'
            className='addSaveBtn'
            onClick={() => handleEdit(row)}
          />
          <ButtonComponent
            btnText='View'
            className='addSaveBtn btn-success'
            onClick={() => handleView(row)}
          />
          <ButtonComponent
            btnText='Delete'
            className='addSaveBtn btn-danger'
            onClick={() => handleDelete(row)}
          />
        </div>
      ),
    },
  ];


  const handleNavigate = () => {
    navigate('/create-order')
  }

  const filteredOrders = useMemo(() => {
    if (!search) return list;

    const q = search.toLowerCase();

    return list?.filter(order =>
      order.orderId?.toString().toLowerCase().includes(q) ||
      order.customerName?.toLowerCase().includes(q) ||
      order.status?.toLowerCase().includes(q) ||
      order.total?.toString().includes(q)
    );
  }, [list, search]);


  const totalPages = Math.ceil(filteredOrders?.length / PAGE_SIZE);

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredOrders?.slice(start, start + PAGE_SIZE);
  }, [filteredOrders, currentPage]);


  const handleEdit = (value) => {
    navigate('/edit-order', { state: value })
  }

  const handleView = (value) => {
    navigate('/view-details', { state: value })
  }

  const handleDelete = (order) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete order ${order.orderId}?`
    );

    if (!confirmDelete) return;

    dispatch(deleteOrder(order.id));
    toast.success("Order deleted successfully");
  };



  return (
    <div>
      <h4 className="">Order List</h4>
      <div className="mt-4 d-flex align-items-center gap-3 justify-content-between flex-wrap">
        <InputComponent
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ButtonComponent
          btnText='Add'
          className='addSaveBtn'
          onClick={() => handleNavigate()}
        />
      </div>

      <div className="mt-4">
        <Table
          columns={columns}
          data={paginatedOrders}
        />
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <span>
          Page {currentPage} of {totalPages || 1}
        </span>

        <div className="d-flex gap-2">
          <ButtonComponent
            className="btn btn-primary btn-sm"
            btnText='Prev'
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          />

          <ButtonComponent
            className="btn btn-primary btn-sm"
            btnText='Next'
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(p => p + 1)}
          />

        </div>
      </div>

    </div>
  );
}

export default OrderList;
