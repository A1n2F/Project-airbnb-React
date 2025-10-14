import {Routes, Route} from "react-router-dom"
import './App.css'
import { Layout } from "./Layout"
import { IndexPage } from "./pages/IndexPage"
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"
import { ProfilePage } from "./pages/ProfilePage"
import { PlacesPage } from "./pages/PlacesPage"
import { UserContextProvider } from "./UserContext"
import axios from "axios"
import { PlacesFormPage } from "./pages/PlacesFormPage"

axios.defaults.baseURL = "http://localhost:4000"
axios.defaults.withCredentials = true

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
