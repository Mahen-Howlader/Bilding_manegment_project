import { MagnifyingGlass } from "react-loader-spinner";

function Spinner() {
    return (
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
    );
}

export default Spinner;