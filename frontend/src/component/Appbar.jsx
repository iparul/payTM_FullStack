import { useNavigate } from "react-router-dom"
import Button from "./Button"

export const Appbar = () => {
    const navigate = useNavigate()

    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <div className="rounded-full h-12 w-24 bg-slate-200 flex justify-center mt-1 mr-2 text-center">
                <div className="flex flex-col justify-center h-full text-xl w-full">
                    U
                </div>
            </div>
            <Button lable={"LogOut"} onClick={() => { navigate("/signin") }} />
        </div>
    </div>
}