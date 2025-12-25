import * as types from "./types";
import { fetchOrdersApi, syncOrderApi } from "../api/ordersApi";
import { saveOrders } from "../utils/localStorage";

export const fetchOrders = () => async (dispatch) => {
    const data = await fetchOrdersApi();
    dispatch({ type: types.FETCH_ORDERS, payload: data });
};

export const addOrder = (order) => (dispatch, getState) => {
    dispatch({ type: types.ADD_ORDER, payload: order });
    saveOrders(getState().orders.list);
};

export const updateOrder = (order) => (dispatch, getState) => {
    dispatch({
        type: types.UPDATE_ORDER,
        payload: order,
    });

    saveOrders(getState().orders.list);
};

export const deleteOrder = (id) => (dispatch, getState) => {
    dispatch({
        type: types.DELETE_ORDER,
        payload: id,
    });

    saveOrders(getState().orders.list);
};

export const syncOfflineOrders = () => async (dispatch, getState) => {
    const orders = getState().orders?.list || [];

    const unsynced = orders.filter(o => !o.isSynced);

    for (const order of unsynced) {
        await syncOrderApi(order);
        order.isSynced = true;
    }

    saveOrders(orders);
};
