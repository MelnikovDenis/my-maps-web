import { Routes, Route } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import MainPage from "./pages/MainPage"
import AuthPage from "./pages/AuthPage"
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { useAuth } from "./context/AuthProvider";

function App() {
  const { isAuthenticated } = useAuth();

  return (      
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/main" element={<MainPage />} />
      </Route>
      
      <Route element={<PublicRoute />}>
        <Route path="/auth" element={<AuthPage />} />
      </Route>
          
      <Route path="*" element={<Navigate to={ isAuthenticated ? "/main" : "/auth" } replace />} />
    </Routes>
  )
}

export default App