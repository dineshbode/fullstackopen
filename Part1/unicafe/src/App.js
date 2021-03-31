import './App.css';
import React, {useState} from 'react'

const App = () => {
  const [good,setGood] = useState(0)
  const [neutral,setNeutral] = useState(0)
  const [bad,setBad] = useState(0)

const handleClickGood=()=>{
  setGood(good+1)
}

const handleClickBad = () => {
  setBad(bad+1)
}

const handleClickNeutral = () => {
  setNeutral(neutral+1)
}

  return(
    <div>
      <Header />
      <Button handleClick={handleClickGood} text='good' />
      <Button handleClick={handleClickNeutral} text='neutral' />
      <Button handleClick={handleClickBad} text='bad' />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

const Header = () => {
  return(
    <div>
      <h1>give feedback</h1>
    </div>
  )
}

const Button = ({handleClick, text}) => {
  return(
  
      <button onClick={handleClick}> 
        {text}
      </button>
 
  )
}

const Statistics = (props) => {
  let sum = props.good+props.neutral+props.bad
  let average = (props.good+props.neutral+props.bad)/3
  let positive = (props.good/(props.good+props.neutral+props.bad))*100
  return(
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
        <tr>
          <td>good</td>
          <td>{props.good}</td>
        </tr>
        <tr>
          <td>neutral</td>
          <td>{props.neutral}</td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{props.bad}</td>
        </tr>
        <tr>
          <td>sum</td>
          <td>{sum}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{average}</td>
        </tr>
        <tr>
          <td>positive</td>
          <td>{positive} %</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}
export default App;
