import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import {Bar} from "react-chartjs-2"
import './App.css'
import axios from "axios"
import "chart.js/auto";


function App() {
  const [count, setCount] = useState(0)
  const [data, setdata] = useState([])
  const [token, setToken] = useState()
  const [chartData, setChartData] = useState(null)
  const handle = () => {
    
    axios.post(`http://localhost:8000/instagram?token=${token}` ).then(res => {
      console.log(res);
      setdata(res.data);
      let labels = res.data.data.data.map(name => (name.caption));
      console.log(labels);
      
      setChartData({
        labels,
        datasets: [
          {
            label: "Likes",
            data: res.data.data.data.map(likes => (likes.like_count))
          },
          {
            label: "Comments",
            data: res.data.data.data.map(comment => (comment.comments_count))
          }
          // {
          //   label: "Total Post",
          //   data: 
          // }
        ]
      });
    })

  }
  console.log(chartData);
  

  return (
    <>
      <input type="text" placeholder='Enter your access key for IG' value={token} onChange={(e) => { setToken(e.target.value);  console.log(token);
      }} />
      <button onClick={handle}>Submit</button>
      <ul style={{listStyle:"none"}}>
        {
          data?.data?.data?.map(data => (
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

      {chartData && <Bar
        // style={{width:"1000px", height:"200px"}}
        // key={chartData.labels.length}
        data={chartData}
      />}
    </>
  )
}

export default App
