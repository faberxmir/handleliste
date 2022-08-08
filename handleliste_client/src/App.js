import './App.css';
import Welcome from './components/welcome';
import Code404 from './components/code404';
import ShoppingList from './components/shoppingList';
import Navbar from './components/Navbar';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';

function App() {
  console.log('rendering APP')
  return (
    <div className='App'>
      <UserContextProvider>
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/shoppinglist' element={<ShoppingList />} />
            <Route path="*" element={<Code404 />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </div>
  )
}

export default App;
