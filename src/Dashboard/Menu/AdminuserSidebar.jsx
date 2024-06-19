import { MdAnnouncement, MdHistory, MdOutlinePayment, MdOutlineSpaceDashboard } from "react-icons/md";
import MenuItem from "./MenuItem";
import { RiCodeFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";

function AdminuserSidebar() {
  return (
    <div>
      <MenuItem
        label="Admin Profile"
        address="adminprofile"
        icon={MdOutlineSpaceDashboard}
      ></MenuItem>
      <MenuItem
        label="Manage Members"
        address="managemember"
        icon={FaUser}
      ></MenuItem>
      <MenuItem
        label="Make Announcemen"
        address="makeannouncemen"
        icon={MdHistory}
      ></MenuItem>
      <MenuItem
        label="Agreement Requests"
        address="agreementrequests"
        icon={MdAnnouncement}
      ></MenuItem>
      <MenuItem
        label="Manage Coupons"
        address="managecoupons"
        icon={RiCodeFill}
      ></MenuItem>
    </div>
  );
}

export default AdminuserSidebar;
