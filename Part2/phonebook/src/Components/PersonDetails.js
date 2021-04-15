const PersonDetails = ({person, deletePersonHandler}) => {
    return (
        <div>
            <li key={person.name}> {person.name} {person.number} <button onClick={ ()=> deletePersonHandler(person)}>Delete</button></li>
        </div>
    )
}
export default PersonDetails