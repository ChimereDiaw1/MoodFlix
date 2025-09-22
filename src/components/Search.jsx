import React from 'react'


// Destructuring the props
// searchTerm is the value of the search input
// setSearchTerm is the function to update the search input
const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className="search">
        <div>
            <img src="./search.svg" alt="search" />

            <input
                type="text"
                placeholder="Search for a movie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button>Search</button>
        </div>
    
    </div>
  )
}

export default Search
