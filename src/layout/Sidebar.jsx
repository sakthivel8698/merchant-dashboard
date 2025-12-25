import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import styles from "./Layout.module.css";
import ImageComponent from "../components/images/Image";
import ResizeHook from "../components/hooks/resizeHooks";

export default function Sidebar({ handleCloseHeader, handleClose, isSidebarOpen, togglesidebar }) {

    const [sidebarlinks] = useState([
        {
            path: "/dashboard",
            name: "Dashboard",
            icon: 'dashboard',
        },
        {
            path: "/orderlist",
            name: "Order List",
            icon: 'orderList',
            subUrl: ['/create-order', '/edit-order', '/view-details']
        }
    ]);

    const location = useLocation();
    const widthResize = ResizeHook();

    return (
        <div className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebaropen : styles.sidebarclosed}`}>
            <div className={styles.sidebar_head}>
                {
                    widthResize > 991 ?
                        <div className={`position-relative d-flex align-items-center justify-content-between`}>
                            <Link to="/dashboard">
                                <h3 className="text-white">STORE</h3>
                            </Link>
                        </div>
                        :
                        <div className={`d-flex align-items-center justify-content-between`}>
                            <Link to="/dashboard">
                                <h3 className="text-white">STORE</h3>
                            </Link>
                            <IoClose fontSize={24} color={"#fff"} onClick={() => handleCloseHeader()} />
                        </div>
                }
            </div>

            <div className={styles.sidebar_body}>

                {sidebarlinks.map((item, index) => (
                    <div key={index}>

                        <ul className={styles.sidebar_ul}>
                            <li className={styles.sidebar_li} key={item.name}>
                                <Link
                                    onClick={handleClose}
                                    to={item.path}
                                    className={`${styles.sidebar_link} ${location.pathname === item.path ||
                                        (item.subUrl && item.subUrl.some(sub => location.pathname.includes(sub)))
                                        ? styles.active
                                        : ""
                                        }`}
                                >
                                    <ImageComponent
                                        src={item.icon}
                                        className='sidebarIcon'
                                        alt={item.name}
                                    />
                                    {item.name}
                                </Link>
                            </li>
                        </ul>

                    </div>
                ))}
            </div>
        </div>
    );
}
