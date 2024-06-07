import Banner from "../../Component/Banner";
import useAuth from "../../Hooks/useAuth";

function Home() {
    const {user} = useAuth()
    console.log(user)
    return (
        <div>
            <Banner></Banner>
        </div>
    );
}

export default Home;