import React from 'react';
import ReactDOM from 'react-dom';
import shortid from 'shortid';

const Header = (props) => {
    return (
      <h1>{props.course}</h1>
    )
  }
  
  const Content = (props) => {
    return (
      <div>
        <Part part={props} />
      </div>
    )
  }
  
  const Total = ({ course }) => {
    debugger;
  
    const total = course.course.parts.reduce((sum, part) => 
       sum + part.exercises, 0)
    
    return(
      <p>Number of exercises {total}</p>
    ) 
  }
  
  const Part = (props) => {
    
    return (
      <p>
        {props.part.part.name} {props.part.part.exercises}
      </p>    
    )
  }
  
  
  const Course = (course) => {
      debugger
      console.log("Inside Course")
      console.log(course)
    return(
      <div>
        <Header course={course.course.name} />
        {
            course.course.parts.map((part) =>
              <Content key={shortid.generate()} part={part} />
        )}
        <Total course={course} />
    </div>
    )
  } 

  export default Course;