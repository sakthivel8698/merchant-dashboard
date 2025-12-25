const KEY = "orders";

export const getOrders = () =>
  JSON.parse(localStorage.getItem(KEY)) || [];

export const saveOrders = (orders) =>
  localStorage.setItem(KEY, JSON.stringify(orders));
