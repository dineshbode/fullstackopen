import CountryDetails from './CountryDetails'
import Country from './Country'

const Results = ({searchResults, handleShowButton}) => {
    if(searchResults.length > 10){
        return <div>Too many matches, specify another filter</div>
    }
    if(searchResults.length === 1)
    {
        return(
            <CountryDetails country={searchResults[0]}/>
        )
    }
    if(searchResults.length > 1){
        return(
            searchResults.map((country) => (
                <Country 
                key={country.name}
                country = {country}
                handleShowButton={handleShowButton} />
            ))
        )
    }

    return <div>No matching results, specify filter</div>
}
export default Results;