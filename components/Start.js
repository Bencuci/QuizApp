import React from "react"

export default function Start({getQuiz}) {
    return (
        <div className="start">
            <h1>Quizzical</h1>
            <p>Are you ready for the quiz?</p>
            <button onClick={getQuiz}>Start Quiz</button>
        </div>
    )
}