import { Link } from "react-router-dom";


export const HomeSelector = () => {
    return (

        <Link to="/game/classic-mode" >
            <div className="h-75 bg-[url('public/images/classic-button.png')] bg-contain bg-no-repeat bg-center"></div>
        </Link>


    )
}