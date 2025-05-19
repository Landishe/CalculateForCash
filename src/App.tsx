import './App.css'
import { MainPage } from './Components/MainPage/MainPage.tsx'
import { UserProvider } from './Context/MyContext.tsx'

function App() {
  
  return (
  <UserProvider>
    <MainPage></MainPage>
  </UserProvider>)
}

export default App
