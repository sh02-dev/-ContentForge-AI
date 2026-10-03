import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { RecoilRoot } from 'recoil';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <div className=' bg-[#171616] min-h-screen text-white'>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </div>
  </BrowserRouter>
)
