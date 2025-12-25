import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import styles from "./Layout.module.css";
import ImageComponent from "../components/images/Image";
import ResizeHook from "../components/hooks/resizeHooks";
import Mobilesidebar from "./MobileSidebar";
import NetworkStatus from "../components/hooks/networkStatus";


export default function Header() {

    const widthResize = ResizeHook();
    const netWorkStatus = NetworkStatus();
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleCloseHeader = () => {
        setShow(false);
    };


    return (
        <>

            <header className={styles.header}>
                <div className={styles.headerbox}>

                    <div className="networkStatus d-none d-xl-flex">
                        <span
                            className={`dot ${netWorkStatus ? 'green' : 'red'}`}
                        />
                        <span className={`text ${netWorkStatus ? 'green' : 'red'}`}>
                            {netWorkStatus ? "Online" : "Offline"}
                        </span>
                    </div>

                    {
                        widthResize <= 991 && (
                            <div className={`d-flex align-items-center justify-content-between`}>
                                <Link to="/dashboard">
                                    <ImageComponent src={"logo"} className={`img-fluid ${styles.logo}`} />
                                </Link>
                                <div className={`d-flex align-items-center gap-3`}>
                                    <div className="networkStatus d-flex d-xl-none">
                                        <span
                                            className={`dot ${netWorkStatus ? 'green' : 'red'}`}
                                        />
                                        <span className={`text ${netWorkStatus ? 'green' : 'red'}`}>
                                            {netWorkStatus ? "Online" : "Offline"}
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        className={`btn ${styles.mobtoggle} p-0`}
                                        onClick={handleShow}
                                    >
                                        <RxHamburgerMenu color={"#000"} />
                                    </button>
                                </div>
                            </div>
                        )}
                </div>
            </header>
            <Mobilesidebar
                show={show}
                handleClose={handleClose}
                handleCloseHeader={handleCloseHeader}
            />
        </>
    );
}