import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter , Routes} from "react-router";
import { Route } from "react-router";
import Authform  from "./component/AuthForm.jsx";
// ReactDOM.createRoot(document.getElementById("root")).render(
// <BrowserRouter>
//     <Routes>
//         <Route path="/" element={<App/>}/>
//         <Route path="/authform" element={<Authform/>}/>
        

//     </Routes>
// </BrowserRouter>


// );

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

