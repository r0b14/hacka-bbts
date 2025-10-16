import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./app/context/AuthContext";
import Login from "./app/routes/Login";
import Dashboard from "./app/routes/Dashboard";
import UploadCsv from "./app/routes/UploadCsv";
import Relatorios from "./app/routes/Relatorios";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload-csv" element={<UploadCsv />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
