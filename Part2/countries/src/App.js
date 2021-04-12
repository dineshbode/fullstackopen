import react, { useEffect, useState} from 'react'
import axios from 'axios'
import Search from './Components/Search'
import Results from './Components/Results'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] =useState()
  const [searchResults, setSearchResults] = useState([])
  
  useEffect(async () =>{
    async function fetchData(){
      const resultCountries = await axios('https://restcountries.eu/rest/v2/',);
      setCountries(resultCountries.data)
    };
    fetchData();
  },[])

  const handleSearchInputChange = (event) => {
    setSearch(event.target.value)
    setSearchResults(countries.filter((country) => {
      return country.name.toLowerCase().includes(event.target.value.toLowerCase())
    }))
  }

  const handleShowButton = (name) => {
    setSearch(name)
    setSearchResults(countries.filter((country) => country.name===name));
  }

  return(
    <div>
      <h1>Find countries</h1>
      <Search 
        handleSearchInput = {search}
        handleSearchInputChange={handleSearchInputChange} />

      <Results 
        searchResults={searchResults}
        handleShowButton = {handleShowButton }
      />
    </div>
  )
}

export default App;
