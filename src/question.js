import React from 'react'
import {nanoid} from 'nanoid'
import {Buffer} from 'buffer'

function Question (props){
    let answers = props.q.answers

    function decodeBase64(prop){
        const buffer = Buffer.from(prop,'base64')
        return buffer.toString()
    }


    const newAnswers = answers.map(answer=>{

        function handleClick(answer){
            if(props.q.checked){
                return
            }
            props.onClick(props.id,answer)
        }

        let id = undefined;
        if(props.q.checked){
            if(props.q.correct === answer){
                id='correct'
            }
            else if(props.q.selected === answer){
                id ='incorrect'
            }
            else{
                id='not-selected'
            }
        }

        return(
            <button key={nanoid()} id={id} className={answer === props.q.selected ?
            'answer selected' : 'answer'} onClick={()=>{handleClick(answer)}}>{decodeBase64(answer)}</button>
        )
    })

    // console.log(decodeBase64(props.q.correct))

    return(
        <div className='question'>
            <h1 className='question-main'>{decodeBase64(props.q.question)}</h1>
            <div className='answers'>
            {newAnswers}
            </div>
        </div>
    )
}

export default Question