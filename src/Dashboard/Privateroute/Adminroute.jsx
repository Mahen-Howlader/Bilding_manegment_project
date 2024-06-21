import { Children } from "react";
import Spinner from "../../Component/Spinner";
import useAdmin from "../../Hook/useAdmin";
import useAuth from "../../Hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

function Adminroute({children}) {
    const [isAdmin,adminLoading] = useAdmin();
    const {user,loading}= useAuth();
    const location = useLocation();

    if(adminLoading || loading){
        return <Spinner></Spinner>
    }

    if(user && isAdmin){
        return children
    }
    return <Navigate to="/login" state={{from : location}} replace></Navigate>
}

export default Adminroute;