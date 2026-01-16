import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios"

function App() {
  const [count, setCount] = useState(0)
  const [data, setdata] = useState([])
  const [token, setToken] = useState()
  const handle = () => {
    
    axios.post(`http://localhost:8000/instagram?token=${token}` ).then(res => {
      console.log(res);
      setdata(res.data.data)
    })
  }
  console.log(data);
  

  return (
    <>
      <input type="text" value={token} onChange={(e) => { setToken(e.target.value);  console.log(token);
      }} />
      <button onClick={handle}>Submit</button>
      <ul style={{listStyle:"none"}}>
        {
          data?.map(data => (
            <div style={{marginBottom:"20px"}}>
              <li>{data.caption}</li>
              {/* <li>{data.}</li> */}
              <img style={{ width: "100px" }} src={data.media_url} alt="" />
              <li>Likes : {data.like_count}</li>
              <li>Comment : {data.comments_count}</li>
            </div>
            
          ))
        }
      </ul>
    </>
  )
}

export default App
