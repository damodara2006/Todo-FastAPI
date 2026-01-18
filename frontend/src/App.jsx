import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Insta from './Insta'
import Stream from './Stream.jsx';
// import {Insta} from "ins"
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/insta' element={<Insta />} />
                <Route path='/stream' element={<Stream />} />

            </Routes>
        </BrowserRouter>
    )
}

export default App;
