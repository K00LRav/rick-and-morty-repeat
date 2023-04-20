import React from 'react'
import './Search.css'
import axios from 'axios'

function Search({setCharacters}) {
    //create state to hold the user input
    const[query, setQuery] = React.useState('')

    //https://rickandmortyapi.com/api/character/?name=rick

    const handleSubmit =(e)=>{
        console.log('Search for', query)
        e.preventDefault()
        //make an api call to filter the data from query
        axios.get(`https://rickandmortyapi.com/api/character/?name=${query}`)
        .then(res =>{
            console.log(res.data.results)
            //change the data in characters to this
            setCharacters(res.data.results)
        })
        .catch(err => {
            //check for error code
            if(err.response.status === 404){
                alert(`There is no character with the name ${query}`)
            }
            else{
                console.log(err)
            }
        })
        //clear the textbox
        setQuery('')
    }

  return (
    <form className="search-container" onSubmit={handleSubmit}>
        <input type="text" value={query} placeholder='Search all characters' 
        onChange={(e)=>setQuery(e.target.value)}
        />
    </form>
  )
}

export default Search