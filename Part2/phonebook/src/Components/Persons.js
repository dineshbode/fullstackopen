import PersonDetails from './PersonDetails'
const Persons = ({searchedResults, deletePersonHandler}) => {
    return(
        <div>
            <ul>
                {
                    searchedResults.map(person =>  
                        <PersonDetails key={person.name} person={person} deletePersonHandler={deletePersonHandler}/>                    
                    )  
                }
            </ul> 
        </div>
    )
}

export default Persons