import { Link, Outlet, useLocation, useNavigate, useNavigation } from "react-router-dom";
import selectMenu from "../app/selectMenu";

function Nav() {
    const location = useLocation();

    return(
        <>
        <nav>
            <ul>
                <li className={selectMenu(location.pathname, "/")}>
                    <Link to="/">Home</Link>
                </li>
                <li className={selectMenu(location.pathname, "/portfolio")}>
                    <Link to="/portfolio">Portfolio</Link>
                </li>
                <li className={selectMenu(location.pathname, "/contact")}>
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>
        </nav>

        <Outlet/>
    </>
    );
}

export default Nav;

/*
Mi nagyon fontos itt 
hogy van egy selectMenu, ami be van ide importálva, mert ott azt nézzük, meg, hogy a current az megegyezik-e a path-val 
és ha igen, akkor kap egy class-t ami kejelöli 
className={selectMenu(location.pathname, "/portfolio")}>

tehát, ami itt fontos az a location objektum -> const location = useLocation()
és ennek van egy olyanja, hogy pathname, ami megmutatja nekünk, hogy melyik url-en vagyunk!! 
és ezt hasonlítjuk majd összes, azzal, amit itt megadunk majd meghívásnál külön 
-> 
<li className={selectMenu(location.pathname, "/")}>
<li className={selectMenu(location.pathname, "/portfolio")}>
<li className={selectMenu(location.pathname, "/contact")}>
*/