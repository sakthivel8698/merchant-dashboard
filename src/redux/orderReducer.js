import * as types from "./types";
import { getOrders } from "../utils/localStorage";

const initialState = {
    list: getOrders(),
    loading: false,
    error: null,
};

export default function orderReducer(state = initialState, action) {
    switch (action.type) {

        case types.FETCH_ORDERS:
            return { ...state, list: action.payload, loading: false };

        case types.ADD_ORDER:
            return { ...state, list: [...state.list, action.payload] };

        case types.UPDATE_ORDER:
            return {
                ...state,
                list: state.list.map(o =>
                    o.id === action.payload.id
                        ? { ...action.payload, isSynced: navigator.onLine }
                        : o
                ),
            };

        case types.DELETE_ORDER:
            return {
                ...state,
                list: state.list.filter(o => o.id !== action.payload),
            };

        default:
            return state;
    }
}
