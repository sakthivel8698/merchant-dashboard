import React from 'react'
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import ResizeHook from '../components/hooks/resizeHooks';
import Header from './Header';
import Sidebar from './Sidebar';


function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
    const widthResize = ResizeHook();
    const togglesidebar = () => {
        setIsSidebarOpen(prev => !prev)
    }
    return (
        <>
            <Header />
            {widthResize > 991 && <Sidebar isSidebarOpen={isSidebarOpen} togglesidebar={togglesidebar} />}
            <main className={`${isSidebarOpen ? styles.maincontent : `${styles.maincontent} ${styles.mainfull}`}`}>
               <Outlet />
            </main>
        </>
    )
}

export default Layout