import { MdAnnouncement, MdHistory, MdOutlinePayment } from "react-icons/md";
import MenuItem from "./MenuItem";

function AdminuserSidebar() {
  return (
    <div>
      <MenuItem
        label="Admin Profile"
        address="adminprofile"
        icon={MdOutlinePayment}
      ></MenuItem>
      <MenuItem
        label="Manage Members"
        address="managemember"
        icon={MdOutlinePayment}
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
        icon={MdAnnouncement}
      ></MenuItem>
    </div>
  );
}

export default AdminuserSidebar;
