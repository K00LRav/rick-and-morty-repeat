import React, {useEffect,useState} from 'react'
import './HomePage.css'
import axios from 'axios'
import CharacterCard from '../../components/CharacterCard/CharacterCard';
import Search from '../../components/Search/Search';

function Homepage() {

    //create state for characters
    const[characters, setCharacters] = useState([])

    //https://rickandmortyapi.com/api/character
    
    //I need to get the data from the api when the pageloads
    useEffect(
      ()=>{
            console.log("homepage loaded")
            //call api to get data
            axios.get(`https://rickandmortyapi.com/api/character`)
            .then(res=>{
                console.log(res.data.results)
                //store this data in state
                setCharacters(res.data.results)
            })
            .catch(err => console.log(err))

      }, [] //useEffects, empty array, means it runs on the first render
    )

  return (
    <div className='home-container'>
      <Search setCharacters={setCharacters}/>
      <h1>Main Characters</h1>
      <div className="characters-container">
        {
          // characters.map(item=><p key={item.id}>{item.name}</p>)
          characters.map(item=><CharacterCard key={item.id} character={item}/>)
        }
      </div>
      </div>
  )
}

export default Homepage