import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home'
import { CartBasket } from './pages/basket'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/cart' element={<CartBasket />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
  