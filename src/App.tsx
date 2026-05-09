import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/' element={<div>Оформление заказа</div>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
