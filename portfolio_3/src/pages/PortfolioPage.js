import { useState } from "react";
import ImgComponent from "../components/ImgComponent";
import ModalImg from "../components/ModalImg";

function PortfolioPage() {
    const [checkersDisplay, setCheckersDisplay] = useState(false);
    const checkersImgSrc = require("..images/portfolio_images/coffee_webdesign.png");

    const displayModal = (setDisplay)=> {
        setDisplay(true);
    }

    return (
        <div className="container-xl box-light-grey p-lg text-justify">
            <h1>Portfolió</h1>
            <h2>HTML + CSS</h2>

            <ModalImg src={checkersImgSrc}
                classes={["maxw-360", "img-holder", "border-primary", "float-left-m", "mr-lg", "cursor-pointer"]} />

            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse egestas, tortor in feugiat volutpat, urna quam
                dignissim ipsum, vel posuere massa massa eget lacus. Nulla
                facilisi. Vestibulum vitae elit vel erat suscipit eleifend.
                Maecenas ornare sem eget massa elementum ultricies. Donec eu
                gravida elit. Sed magna sem, porttitor eu leo sit amet,
                pellentesque semper turpis. Cras ultrices orci vel elit ornare sagittis.
            </p>

            <div>
                <a href="https://github.com">Link a Github repóhoz</a>
            </div>

            <div className="clear height-20"></div>

            <h2>JavaScript Checkers Game</h2>
            <ModalImg src={require("../images/portfolio_images/checkers.png")} 
            classes={["maxw-360", "img-holder", "border-primary", 
            "float-right-m", "ml-lg", "cursor-pointer"]}/>

            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Suspendisse egestas, tortor in feugiat volutpat, urna quam 
                dignissim ipsum, vel posuere massa massa eget lacus. Nulla 
                facilisi. Vestibulum vitae elit vel erat suscipit eleifend. 
                Maecenas ornare sem eget massa elementum ultricies. Donec eu 
                gravida elit. Sed magna sem, porttitor eu leo sit amet, 
                pellentesque semper turpis. Cras ultrices orci vel elit ornare sagittis.
            </p>

            <div>
                <a href="https://github.com">Link a Github repóhoz</a>
            </div>

            <div className="clear height-20"></div>
        </div>
    );
}

export default PortfolioPage;

/*
Mi a különbség az a tag és a Link között!!!!

Ez egyik a history object-et használja
-> 
window.history.pushState() és amikor ezt csináljuk akkor ugye nem töltjük újra az oldalt!!!! 
Ez a Link-es megoldás, tehát itt nincsen újratöltödés, amikor megyünk pl. a Home-ról a Portfolió-ra!!! 
Hanem egyszerűen átírányít minket a böngésző a másik oldalra!!! 

ha meg az a tag-et használjuk, akkor meg újratöltödik az oldal!! 
és akkor itt egy a tag-vel, ahol href-be megadjuk, hogy hova menjen ott meg belinkeljük a github-ot 
-> 
<div>
    <a href="https://github.com">Link a Github repóhoz</a>
</div>

és akkor meg tudják nézni, hogy milyen repo-k vannak fel GitHub-on!!! 
itt majd meg kell adni a repo-nak a címét, ahol ez fel van dobva!!  

ezeket a linkeket megformázzuk a style.scss-ben!! 
a:link {
    color: map-get($colors, "secondary");

}

a:visited {
    color: map-get($colors, "secondary-darker");
}

itt a az a különbség, hogy :link, amikor még nem látogattuk meg az oldalt 
a :visited meg amikor már igen!!! 

és ez így azért nem lesz jó, mert ilyenkor felül a nav-ban is átírja ezeket az a-tag-eket, amiket meg nem szeretnénk
ezért oda írunk egy important-ot, hogy az felülírja!!! 
-> 
    a {
        text-decoration: none;
        color: white!important;
        padding: 15px;
    }
}

van egy szöveg, ami előtünik jobbról balra, amikor leér oda az oldal!
csinálunk erre egy komponenst TextEffect.js
*/