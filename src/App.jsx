import { Routes, Route } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import MainPage from "./pages/MainPage"
import AuthPage from "./pages/AuthPage"
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (      
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/main" element={<MainPage />} />
      </Route>
      
      <Route path="/auth" element={<AuthPage />} />

      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  )
}

export default App