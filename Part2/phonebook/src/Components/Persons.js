const Persons = (props) => {
    return(
        <div>
            <ul>
                {
                    props.searchedResults.map(person => 
                    <li key={person.name}>{person.name}  {person.number}</li>)  
                }
            </ul> 
        </div>
    )
}

export default Persons