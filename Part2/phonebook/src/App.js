import React, { useState, useEffect } from 'react'
import './App.css';
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([])

  useEffect( async () => {
    const fetchData = async() =>{
      const result = await axios('http://localhost:3001/persons',
      );
      setPersons(result.data)
    };
    fetchData();
  }, [])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ search, setSearch ] = useState('')
  const [ searchedResults , setSearchedResults ] = useState([])

  const handleNameChange = (event) => {
    console.log(event.target.value) 
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)

    const searchedResults = persons.filter(function(person){
      return person.name.includes(search)
    })
    setSearchedResults(searchedResults)
    console.log(searchedResults)
  }

  const addPerson = (event) =>{
    event.preventDefault()
    const samePerson = persons.filter(function(person){ 
      return person.name === newName
    })
    if(samePerson.length > 0)
    {
      console.log(samePerson)
      alert(newName+' is already added to phonebook')
      return
    }
    const person = {
      name : newName,
      number : newNumber
    }
    setPersons(persons.concat(person))
    setNewName('')
    setNewNumber('')
    console.log(persons)
    debugger
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearchChange={handleSearchChange}/>

      <h3>Add a new</h3>
      <PersonForm 
      newName={newName} 
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
      addPerson={addPerson}
      />

      <h3>Numbers</h3>
      <Persons searchedResults={searchedResults} />
    </div>
  );
}

export default App;
