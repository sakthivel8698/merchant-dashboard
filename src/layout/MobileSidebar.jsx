import { Offcanvas } from "react-bootstrap";
import Sidebar from "./Sidebar";


const Mobilesidebar = ({ show, handleClose, handleCloseHeader }) => {

    return (
        <>
            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Body>
                    <Sidebar handleCloseHeader={handleCloseHeader} handleClose={handleClose} />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}


export default Mobilesidebar;