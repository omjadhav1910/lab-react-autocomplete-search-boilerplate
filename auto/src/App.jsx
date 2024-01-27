 
import { createRef, useEffect, useState } from 'react'
import './App.css'
import SearchData from './components/SearchData'



function App() {
  
  const [result,setResult] = useState([])
  const [inputValue,setInputValue] = useState("")
  const [selectedValue,setSelectedValue] = useState("")
  const searchResult = createRef()
  const selected = createRef()


  useEffect(() => {

    const handleKey = (event) => {
      if(event==="Escape"){
        searchResult.current.classList.add("show")
      }
    }
    
    window.addEventListener("keydown",(e) => handleKey(e.key))

    if (result.length === 0 || inputValue === "") {
      searchResult.current.classList.add("show");
    }


  },[result],[inputValue])

  const search = (value) => {

    const searchArray = SearchData.filter((el) => el.name.toLowerCase().startsWith(value.toLowerCase()))
    console.table(searchArray)
    setResult(searchArray)
    
  }

  const autoComplete = (value) => {
    
    selected.current.value = value
  }
  
  const handleChange = (value) => {

    

    search(value)
    searchResult.current.classList.remove("show")
    setInputValue(value)


  }



  return (
    <div id='App'>
      <h1>Search Your Place</h1>
      <input ref={selected} type="text" onChange={(e) => handleChange(e.target.value)}/>
      <div className='auto-complete show' ref={searchResult}>
        {result.map((el) => {
          return (<li key={el.code}>
            <p onClick={(e) => autoComplete(e.target.innerHTML)}>{el.name}</p>
          </li>)
        })}
      </div>
    </div>
  )
}

export default App