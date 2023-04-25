import React from 'react'
import { useParams } from 'react-router-dom'
import './CharacterDetails.css'
import axios from 'axios'

function CharacterDetails() {
        //I need to know the ID of the character to display
        //get the id from the params
        const {characterId} = useParams()

        //create state to store character data
        const [character, setCharacter]= React.useState('')

        //I need to make an api call to get the character info
        //https://rickandmortyapi.com/api/character/2
        //I need to show the info when the page loads
        React.useEffect(
            ()=>{
                //make api call call to get the data    
                axios.get(`https://rickandmortyapi.com/api/character/${characterId}`)
                .then(res => {
                    console.log(res.data)
                    //store info in usestate
                    setCharacter(res.data)
                })
                .catch(err =>{
                    console.log(err)
                })
        },[] //means it runs one time when page loads
        )


  return (
    <div className='details-container'>
        <img src={character?.image}/>
        <div className="container-info">
            <p>Name: {character?.name}</p>
            <p>Gender: {character?.gender}</p>
            <p>Location: {character?.location?.name}</p>
            <p>Species: {character?.species}</p>
            </div>
        
        </div>
  )
}

export default CharacterDetails