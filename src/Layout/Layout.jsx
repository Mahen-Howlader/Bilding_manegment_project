import { Outlet } from "react-router-dom";
import Nav from "../Page/Shered/Nav";
import Footer from "../Page/Shered/Footer";

function Layout() {
    return (
        <div className="lato-regular">
            <Nav></Nav>
            <div>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Layout;