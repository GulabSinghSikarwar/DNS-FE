import logo from './logo.svg';
import './App.css';
import { createContext, useState } from 'react'; // Import createContext and useState
import { Outlet } from 'react-router-dom';
import AuthContext from './service/authContext';
import Temp from './components/temp';
import HostedZones from './components/HostedZones';
// Create the AuthContext

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Provide the AuthContext value to the child components
  return (
    <div className="App">
   
    </div>
  );
}

export default App;
