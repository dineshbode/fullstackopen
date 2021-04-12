import React from 'react'

const Search = ({handleSearchInput, handleSearchInputChange}) => {
    return(
        <div>
            <p>
                Search :<input value={handleSearchInput} onChange={handleSearchInputChange} />
            </p>
        </div>
    )
}

export default Search