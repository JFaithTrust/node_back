import {Route, Routes} from "react-router-dom";
import {Auth, Home} from "@/pages";
import Navbar from "@/components/shared/navbar.tsx";

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path={'/'} element={<Home />}  />
        <Route path={'/auth'} element={<Auth />}  />
      </Routes>
    </>
  )
}

export default App
