import React from "react"
import Start from "./components/Start"
import Quiz from "./components/Quiz"
import { encode } from "html-entities"

export default function App() {
    const [quiz, setQuiz] = React.useState([])
    const [finished, setFinished] = React.useState(false)
    const [score, setScore] = React.useState(0)
    
    function getQuiz() {
        fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
            .then(res => res.json())
            .then(data => {
                setQuiz(data.results)
                setFinished(false)
                setScore(0)
                })
    }
    
    function renderQuiz() {
        return quiz.map(question => (
            <Quiz
                key={question.question}
                question={question.question}
                correctAns={question.correct_answer}
                wrongAnsArray={question.incorrect_answers}
                increaseScore={increaseScore}
                finished={finished}
            />
        ))
    }
    
    function increaseScore() {
        setScore(prevScore => prevScore + 1)
    }
    
    return (
        <main>
            {Array.isArray(quiz) && quiz.length > 0 ? (
                <div className="quiz-container">
                    {renderQuiz()}
                    {finished ? (
                        <div className="results">
                            <h3>You scored {score}/5 correct answers!</h3>
                            <button 
                                className="play-again" onClick={getQuiz}>
                            Play again</button>
                        </div>
                    ):(
                        <div className="results">
                            <button 
                                className="check-answer" onClick={()=> setFinished(true)}>
                            Check answers</button>
                        </div>
                    )}
                </div>
            ):
                <Start 
                    getQuiz={getQuiz}
                />
            }
        </main>
    )
}