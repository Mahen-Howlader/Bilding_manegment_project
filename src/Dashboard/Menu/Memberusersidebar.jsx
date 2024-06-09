import { MdAnnouncement, MdHistory, MdOutlinePayment } from "react-icons/md";
import MenuItem from "./MenuItem";
function Memberusersidebar() {
    return (
        <div>
        <MenuItem
          label="Make payment"
          address="payment"
          icon={MdOutlinePayment}
        ></MenuItem>
        <MenuItem
          label="Payment history"
          address="paymenthistory"
          icon={MdHistory}
        ></MenuItem>
        <MenuItem
          label="Announcements"
          address="announcements"
          icon={MdAnnouncement}
        ></MenuItem>
      </div>
    );
}

export default Memberusersidebar;