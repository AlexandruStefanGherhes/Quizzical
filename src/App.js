import React,{useState,useEffect} from 'react'
import Menu from './menu'
import Question from './question'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

export default function App(){
    const [started,setStarted] = useState(false)
    const [count,setCount] = useState(0)
    const [checked,setChecked] = useState(false)
    const [correct,setCorrect] = useState(0)
    const [questions,setQuestions] = useState([])

    const shuffleArray = (arr)=> arr.sort(()=>Math.random() - 0.5)

    function switchActive(){
        setStarted(!started)
    }

    useEffect(()=>{
    async function getAPI(){
        const res = await fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&encode=base64')
        const data = await res.json()
        const q = []
        data.results.forEach(question=>{
            q.push({id:nanoid(),question:question.question,answers:shuffleArray([...question.incorrect_answers,question.correct_answer]),correct:question.correct_answer,checked:false,selected:null})
        })
        setQuestions(q)
    }
    getAPI()
    },[count])

    function handleCheck(){
        let selected = true;
        questions.forEach(question=>{
            if(question.selected === null){
                selected = false;
                return
            }
        })
        if(!selected){
            return
        }
        setQuestions(questions=>questions.map(question=>{
            return {...question,checked:true}
        }))

        setChecked(true)
        let correct = 0
        questions.forEach(question=>{
            if(question.correct === question.selected){
                correct +=1
            }
        })
        setCorrect(correct)
    }

    function handleClickAnswer(id,answer){
        setQuestions(questions=>questions.map(question=>{
            return question.id===id?{...question,selected:answer}:question
        }))
    }

    function playAgain(){
        setCount(count=>count +1)
        setChecked(false)
        setCorrect(0)
    }

    const newQuestionElement = questions ? questions.map(question=>{
    return  <Question
                key={question.id}
                q={question}
                onClick={handleClickAnswer}
                id={question.id}/>
    }) : []



return(
    <div className='container'>
        {started ? 
        <div className='container-question'>
            {newQuestionElement}
        <div className='submit'>
            {checked && <div className='result'>You got {correct}/5 answers correctly</div>}
            <button className='submit-btn' onClick={checked ? playAgain : handleCheck}>{checked ? 'Play Again' : 'Check Answers'}</button>
            {correct === 5 ? <div className='confetti'>
                <Confetti />
            </div> : <></>}
        </div>
        </div>:
        <div className='container-menu'>
            <Menu onClick={switchActive}/>  
        </div>}
    </div>
)
}