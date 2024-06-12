import Banner from "../../Component/Banner";
import Couponbanner from "../../Component/CouponeBanner/Couponbanner";
import useAuth from "../../Hooks/useAuth";

function Home() {
    const {user} = useAuth()
    console.log(user)
    return (
        <div>
            <Banner></Banner>
            <Couponbanner></Couponbanner>
        </div>
    );
}

export default Home;