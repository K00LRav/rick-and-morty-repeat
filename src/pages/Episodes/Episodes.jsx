import React from 'react'
import './Episodes.css'
import axios from 'axios'
import { useSyncExternalStore } from 'react'
import CharacterCard from '../../components/CharacterCard/CharacterCard'

function Episodes() {
  //create state to hold the episode numbers
  const [options, setOptions] = React.useState([])
  // need state to hold option selected
  const [selectedOption, setSelectedOption] = React.useState(1)
  
    //create state for episode info
  const [selectedEpisode, setSelectedEpisode] = React.useState('')
  //need state for character info
  const [characterList, setCharacterList] = React.useState([])
  const handleSelectChange =(e)=>{
      // console.log(e)
      //store the value
      setSelectedOption(e.target.value)
  }

// this is to get the episodes list https://rickandmortyapi.com/api/episode
// to create the drop down I need to know how many episodes there are
 React.useEffect(
    ()=>{
      console.log('page loaded')
      //call api to get the number of episodes
      axios.get('https://rickandmortyapi.com/api/episode')
      .then(res => {
        // console.log(res.data.info.count)
        
        //create an array with the numbers from 1 to this count
        const newOptions = []
        for (let i = 1; i <= res.data.info.count; i++){
          newOptions.push(i)
        }
        // console.log(newOptions)
        //store in state
        setOptions(newOptions)

      })
      .catch(err => console.log(err))

    }, [] //empty array rungs once when the page
  )

  React.useEffect(
    ()=>{
      console.log('you selected ', selectedOption)
      //I need to call api to get data for selected episode
      //https://rickandmortyapi.com/api/episode/28
      //use async js
      const fetchEpisodeData = async () =>{
        
        try{
          //need to make api, wait for result
          const res = await axios.get(`https://rickandmortyapi.com/api/episode/${selectedOption}`)
          console.log (res.data)
          //store in state
          setSelectedEpisode(res.data)
          //to get each characters data, I need to make api calls from res.data.characters

          const episodeCharacters = await Promise.all(
            res.data.characters.map(url => {
              return axios.get(url).then(res => res.data)
            })
          )
          console.log(episodeCharacters)
          //store in state
          setCharacterList(episodeCharacters)

        } catch (err){
          console.log(err)
        }

      }
      //call the function
      fetchEpisodeData()

    },[selectedOption] //dependency array
  )


  return (
    <div className='episodes-container'>
      <div>
        <label> Select an Episode</label>
          <select id="select-episode" onChange={handleSelectChange}>
            {
              options.map(num => <option key={num} value={num}>{`Episode ${num}`}</option>)
            }
          </select>
      </div>

      <div>
        <div className='episode-info'>
              <p>Episode Name: {selectedEpisode?.name}</p>
              <p>Air Date: {selectedEpisode?.air_date}</p>
        </div>
        <div className='character-container'>
              {characterList.map(item=><CharacterCard key={item.id} character={item}/>)}
        </div>
      </div>
   
      </div>
  )
}

export default Episodes