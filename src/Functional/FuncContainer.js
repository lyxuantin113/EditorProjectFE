import { useEffect, useState } from "react";
import Blur from "./Blur/BlurImage";
import Filter from "./Filter/Filter";

function Container() {
    const [functionName, setFunctionName] = useState('')
    const [functions, setFunctions] = useState(["Blur", "Video", "Contrast"])

    const handleFunctional = (e) => {
        setFunctionName(e.target.innerText)
    }

    return (
        <div>
            {functions.map((functional, index) => {
                return <button key={index} onClick={handleFunctional}>{functional}</button>
            })}
            {
                functionName === "Blur" ? <Blur/> : (functionName === "Video" ? <Filter/> : null)
            }
        </div>
    )
}

export default Container;