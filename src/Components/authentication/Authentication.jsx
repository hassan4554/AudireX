import { useState } from "react"
import Signup from "./Signup/Signup"
import { authContext } from "../Utilities/context"
import { ScrollToTop } from "../Utilities/ScrollToTop.jsx"

const Authentication = () => {
    ScrollToTop();
    const [authpage, setAuthPage] = useState(<Signup />)
    return (
        <>
            <authContext.Provider value={{ authpage, setAuthPage }}>
                {authpage}
            </authContext.Provider>
        </>
    )
}

export default Authentication