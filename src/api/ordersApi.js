import { getOrders, saveOrders } from "../utils/localStorage";

export const fetchOrdersApi = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(getOrders()), 500);
  });

export const syncOrderApi = (order) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(order), 300);
  });
