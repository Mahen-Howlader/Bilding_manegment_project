import { useContext } from "react";
import { AuthContext } from "../Provider/Authprovidre";

function useAuth() {
    const auth = useContext(AuthContext)
    // console.log(auth)
    return auth
}

export default useAuth;