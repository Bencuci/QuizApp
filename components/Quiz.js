import React from "react"
import { decode } from "html-entities"

export default function Quiz({question, correctAns, wrongAnsArray, increaseScore, finished}) {
    const [shuffledChoices, setShuffledChoices] = React.useState([])
    const [selectedChoice, setSelectedChoice] = React.useState("")
    
    React.useEffect(() => {
        const choices = [correctAns, ...wrongAnsArray]
        shuffle(choices)
        setShuffledChoices(choices)
    }, [correctAns, ...wrongAnsArray])
    
    React.useEffect(()=> finished && selectedChoice === correctAns && increaseScore(), [finished])
    
    function handleClick(choice) {
        setSelectedChoice(choice)
    }
    
    function shuffle(array) {
        for (let i = array.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    return (
        <div className="question">
            <h2>{decode(question)}</h2>
            <div className="buttons-container">
                {shuffledChoices.map(choice => (
                    <button 
                        onClick={()=>handleClick(choice)}
                        className = {
                            finished ? (
                                choice === correctAns ?
                                    "correct" :
                                    selectedChoice === choice && "wrong"
                            ) :
                                selectedChoice === choice && "selected"
                        }
                        disabled={finished}
                    >
                    {choice}
                    </button>
                ))}
            </div>
            <hr/>
        </div>
    )
}