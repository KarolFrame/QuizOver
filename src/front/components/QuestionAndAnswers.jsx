export const QuestionAndAnswers = ({ question, option1, option2, image }) => {
    return (<>
        <div className="w-[350px] bg-primary rounded-[20px] p-3">
            <h1 className="text-(--color-white) font-[500] text-xl">{question}</h1>
        </div>
        <img className="max-w-[350px] w-full h-auto rounded-[20px]" src={image} />
        <div className="flex flex-row justify-between mx-5 text-(--color-white) text-xl gap-5 max-w-[250x]">
            <p className="bg-primary rounded-[20px] p-3 max-w-[60x]">{option1}</p>
            <p className="bg-primary rounded-[20px] p-3 max-w-[60x">{option2}</p>
        </div>
    </>);
}