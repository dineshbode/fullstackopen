const PersonForm = ({newName, handleNameChange, newNumber, handleNumberChange, addPerson}) => {
    return(
        <div>
             <form>
                <div> Name: <input value={newName} onChange={handleNameChange} /></div>
                <div> Number: <input value={newNumber} onChange={handleNumberChange} /></div>        
                <button type='submit' onClick={addPerson}>Add</button>
             </form> 
        </div>
    )
}
export default PersonForm