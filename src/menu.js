import React from 'react'

export default function Menu(props){
    return(
        <div className='welcome'>
            <h1>Quizzical</h1>
            <p>A fun game of trivia</p>
            <button className='welcome-btn' onClick={props.onClick}>Start quiz</button>
        </div>
    )
}