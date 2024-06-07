import { useContext } from "react";
import { AuthContext } from "../Provider/Authprovidre";

function useAuth() {
    const auth = useContext(AuthContext)
    return auth
}

export default useAuth;