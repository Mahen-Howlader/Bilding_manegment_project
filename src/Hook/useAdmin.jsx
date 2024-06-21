import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import useAxiosSequre from "./useAxiosSequre";

function useAdmin() {
    const {user} = useAuth()
    const axiosSequre = useAxiosSequre()
  const {data : isAdmin,isLoading : adminLoading} = useQuery({
    enabled : !!user?.email,
    queryKey : [user?.email, "isAdmin"],
    queryFn : async () => {
        
        const res = await axiosSequre.get(`/user/admin/${user?.email}`)
        return res.data?.admin
    }
  })
  return [isAdmin,adminLoading]
}

export default useAdmin;