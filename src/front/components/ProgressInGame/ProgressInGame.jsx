import "./ProgressInGame.css"
export const ProgressInGame = () => {
    return (
        <>
            <div className="w-[350px] bg-primary rounded-[20px] p-3">
                <div className="flex flex-row justify-between mx-5 text-(--color-white)">
                    <span>1/10</span>
                    <span>30 segundos</span>
                </div>
                <div className="progress m-3">
                    <div className="progress-value"></div>
                </div>
            </div>
        </>
    )

}