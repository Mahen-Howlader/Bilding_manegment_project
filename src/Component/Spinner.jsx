import { MagnifyingGlass } from "react-loader-spinner";

function Spinner() {
    return (
        <div className="h-[100vh] w-full z-50 flex justify-center items-center">

            <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="magnifying-glass-loading"
            wrapperStyle={{}}
            wrapperClass="magnifying-glass-wrapper"
            glassColor="#c0efff"
            color="#e15b64"
            />
        </div>
    );
}

export default Spinner;