
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-windows-ui/config/app-config.css'
import 'react-windows-ui/dist/react-windows-ui.min.css'
import 'react-windows-ui/icons/fonts/fonts.min.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {TextEditor} from "./pages/TextEditor";
import App from "./components/App";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* available props for theme - 'light', 'dark' or 'system' */}
        <Route path={"/"} element={<App theme={'dark'}/>} />
        <Route path={"/editor"} element={<TextEditor theme={'dark'}/>}/>
        <Route/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
