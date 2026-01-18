import React, { useRef, useState } from 'react'

function Stream() {
    const input = useRef();
    const [data, setData] = useState([])

    const handleClick = () => {
        setData("");

        const es = new EventSource(
            `http://localhost:8001/stream?data=${input.current}`
        );

        es.onmessage = (e) => {
            if (e.data === "[DONE]") {
                es.close();
                return;
            }
            console.log(e.data);
            
            setData((prev) => prev + e.data + "\n\n"); 
        };

        es.onerror = () => {
            es.close();
        };
    }

  return (
      <div>
          <input type="text" ref={input} onChange={(e) => { input.current = e.target.value; console.log(input.current) }} />
          <textarea name="text" id="text" value={data} onChange={(e)=>setData(e.target.value)}></textarea>
          
          <button onClick={handleClick}>Submit</button> 
    </div>
  )
}

export default Stream
