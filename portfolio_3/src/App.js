import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./styles/style.scss";
import Nav from "./components/Nav";
import PortfolioPage from "./pages/PortfolioPage";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

library.add(
    faCircleXmark
);

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Nav/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="/portfolio" element={<PortfolioPage/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
