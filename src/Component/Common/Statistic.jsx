import Normaluser from "../../Dashboard/NormalUser/Normaluser";
import UserAdmin from "../../Dashboard/UserAdmin/UserAdmin";
import UserMember from "../../Dashboard/UserMember/UserMember";
import useRole from "../../Hooks/useRole";
import Spinner from "../Spinner";

function Statistic() {
  const [role, isLoading] = useRole();
  console.log(role)
  if (isLoading) return <Spinner></Spinner>;

  return (
    <>
      {role === "user" && <Normaluser></Normaluser>}
      {role === "admin" && <UserAdmin></UserAdmin>}
      {role === "member" && <UserMember></UserMember>}
    </>
  );
}

export default Statistic;
