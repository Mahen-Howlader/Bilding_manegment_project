import { useQuery } from "@tanstack/react-query";
import { axiosCommon } from "../../../Hooks/useAxiosCommon";
import useAuth from "../../../Hooks/useAuth";

function Apartmentinfo(props) {
    const {user} = useAuth()
  const { data : apartments = [], isLoading } = useQuery({
    queryKey: ["apartments"],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/users/${user?.email}`);
      return data;
    },
  });
  return <div></div>;
}

export default Apartmentinfo;
