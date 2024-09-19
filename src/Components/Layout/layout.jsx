import { Outlet } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer"
import Sub_footer from "../Sub-Footer/Sub-footer"

const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
            <div className="seperator"></div>
            <Sub_footer />
        </>
    )
}

export default Layout
