import React, { useState, useEffect } from 'react'
import './App.css';
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import shortid from 'shortid';
import PersonService from './services/PersonService'
import Notification from './Components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [message, setMessage] = useState({ content: null})

  const showNotification = (content, color) => {
    setMessage({content, color})
    setTimeout(() => {
      setMessage({content,color});
    }, 5000)
  };

  useEffect( async () => {
    const fetchData = async() =>{
      const result = await PersonService.getAll() 
      setPersons(result)
      console.log(result)
    };
    fetchData();
   
  }, [])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ search, setSearch ] = useState('')
  const [ searchedResults , setSearchedResults ] = useState([])

  const handleNameChange = (event) => {
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

    const person = {
      name : newName,
      number : newNumber,
      id : shortid.generate()
    }

    const existingPerson = persons.filter((personFilter) => 
    personFilter.name ===  person.name)
    
    if(existingPerson.length > 0)
    {
      if(window.confirm(`${existingPerson[0].name} is already added to the phonebook, would you like to updatetheir contact number?`)){
        person.id=existingPerson[0].id
        PersonService.putPerson(person)
        .then((returnPerson) => {
          setPersons(
            persons.map((person) => 
          person.id !== returnPerson.id ? person : returnPerson
        )
        );
        setNewName('')
        setNewNumber('')
        showNotification(`Updated person ${returnPerson.name}`,'#008000')
        })
        .catch(() => {
          showNotification(`${existingPerson[0].name} already deleted`,'#3ff0000')
          setPersons(
            persons.filter((person) => person.id !== existingPerson[0].id)
          )
        })
      }
    }
    else{
      PersonService.create(person)
      setPersons(persons.concat(person))
      showNotification(`Created Person ${person.name}`,'#008000')
      setNewName('')
      setNewNumber('')
    }
  }

  const deletePersonHandler = (person) =>{
    if(window.confirm('Delete '+person.name)){
        PersonService.deleteId(person.id)
        .then( () => {
          setPersons(persons.filter((personFilter) => personFilter.id !== person.id));
          //alert('Deleted '+person.name)
          showNotification('Deleted '+person.name, '#008000')
        })
        .catch(error => 
          showNotification(`${person.name} Already deleted from server`, '#3ff0000')
        );
    }
}

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} />

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
      <Persons searchedResults={searchedResults} deletePersonHandler={deletePersonHandler} />
    </div>
  );
}

export default App;
