const Country = ({country, handleShowButton}) => {
    return(
        <div>
            <h2>{country.name}</h2>
            <button type="button" value={country.name} onClick={ () => handleShowButton(country.name)}>Show</button>
        </div>
    )
}

export default Country