import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Layout from "./layout/Layout";
const Dashboard = lazy(() => import("./features/dashbard/Dashboard"));
const OrderList = lazy(() => import("./features/orders/OrderList"));
const CreateOrder = lazy(() => import("./features/orders/CreateOrder"));
const EditOrder = lazy(() => import("./features/orders/EditOrder"));
const ViewDetails = lazy(() => import("./features/orders/ViewDetails"));

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Navigate to='/dashboard' replace />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/orderlist',
                element: <OrderList />
            },
            {
                path: '/create-order',
                element: <CreateOrder />
            },
            {
                path: '/edit-order',
                element: <EditOrder />
            },
            {
                path: '/view-details',
                element: <ViewDetails />
            },
        ]
    },

    {
        path: "*",
        element: <NotFound />
    }
])

export default router;