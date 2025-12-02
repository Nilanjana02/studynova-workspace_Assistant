import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css'; // ✅ This should also be included
import { AppContextProvider } from './Context/AppContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
 
     <AppContextProvider>
       <App />
     </AppContextProvider>
    

);

