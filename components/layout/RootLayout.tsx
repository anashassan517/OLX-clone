// "use client";
import Navbar from "@/app/navbar/page"
import styles from "../../app//navbar/Navbar.module.css";
// import styles  from "../../appnavbar/Navbar.module.css";


const MainLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default MainLayout;



