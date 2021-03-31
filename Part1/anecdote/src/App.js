import './App.css';
import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(6))
  const [max, setMax] = useState(0)
  const [anecdote, setAnecdote] = useState("")

  const handleClick = () => {
    let randomSelection = Math.floor(Math.random() * 5)+1
    setSelected(randomSelection)
  }

  const vote = () => {
    const copy = [...points]
    copy[selected] +=1
    if(copy[selected] > max){
      setMax(copy[selected])
      setAnecdote(anecdotes[selected])
    }
    setPoints(copy)
  }
  return(
    <div>
      <Header />
      {anecdotes[selected]}
      <Button handleClick={handleClick} text="next anecdote"/>
      <Button handleClick={vote} text="vote"/>
      <Votes point={points[selected]} />
      <LargestVotes anecdote ={anecdote} maximum={max} />
    </div>
  )
}

const Header = () => {
  return(
    <div>
      <h1>Anecdote of the day</h1>
    </div>
  )
}

const Button = ({handleClick, text}) => {
  return(
    <div>
      <button onClick={handleClick}>{text}</button>
    </div>
  )
}

const Votes = (props) => {
  debugger;
 return( <div>
    <p>
      has Votes {props.point}
    </p>
  </div>)
}

const LargestVotes = ({anecdote, maximum}) => {
  return( <div>
    <h1>Anecdote with most votes</h1>
    <p>{anecdote} has {maximum} votes</p> 
  </div>)
}
export default App;
