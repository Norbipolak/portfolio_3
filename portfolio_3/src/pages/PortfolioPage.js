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

            <div className="clear height-20"></div>
        </div>
    );
}

export default PortfolioPage;