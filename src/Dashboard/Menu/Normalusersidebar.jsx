import MenuItem from "./MenuItem";
import { MdAnnouncement } from "react-icons/md";
function Normalusersidebar() {
    // label, address, icon
    return (
        <div>
            <MenuItem 
            label="Announcements"
            address ="announcements"
            icon={MdAnnouncement}
            ></MenuItem>
        </div>
    );
}

export default Normalusersidebar;