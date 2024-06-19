import Banner from "../../Component/Banner";
import Couponbanner from "../../Component/CouponeBanner/Couponbanner";
import Footer from "../../Component/Footer/Footer";
import Maphome from "../../Component/Maphome/Maphome";
import useAuth from "../../Hooks/useAuth";
import Aboutbulding from "../Aboutbulding/Aboutbulding";

function Home() {
    return (
        <div>
            <Banner></Banner>
            <div className="container mx-auto my-5">
                <Couponbanner></Couponbanner>
                <Aboutbulding></Aboutbulding>
                {/* <Maphome></Maphome> */}
            </div>
                <Footer></Footer>
        </div>
    );
}

export default Home;