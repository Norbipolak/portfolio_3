import { useState } from "react";
import ImgComponent from "../components/ImgComponent";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

function HomePage() {
    const [languageImages, setLanguageImages] = useState([
        {
            "src":require("../images/html-5.png"),
            "name":"HTML5",
            "percentage":100
        }, {
            "src":require("../images/css-3.png"),
            "name":"CSS3",
            "percentage":95
        },
        {
            "src":require("../images/javascript.png"),
            "name":"CSS3",
            "percentage":93
        },
        {
            "src":require("../images/react.png"),
            "name":"CSS3",
            "percentage":90
        }
    ]);

    return(
        <>
            <div className="container-xl bg-light-grey p-md">
                <h1>Rólam</h1>
                <ImgComponent src={require("../images/man-avatar.jpg")}
                    classes={["float-left", "border-primary", "mr-md", "mb-md", "maxw-200", "img-holder"]}/>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas venenatis 
                    urna sapien. Duis in augue luctus, sodales justo nec, bibendum nisi. 
                    Curabitur efficitur est quis sagittis dictum. Cras vel augue ante. 
                    Ut ut mauris massa. Proin scelerisque justo et purus tempor pretium. 
                    Nam lorem sapien, cursus a metus quis, vestibulum placerat leo. 
                    Praesent condimentum ac magna vitae suscipit. Nunc sagittis ullamcorper 
                    velit, venenatis tempor odio fermentum in. Curabitur blandit pulvinar 
                    blandit. Pellentesque at metus eu enim fermentum laoreet. Morbi metus 
                    justo, ultricies non lacinia ac, ullamcorper et dui. In et 
                    vulputate ligula, vel efficitur quam.
                </p>

                <div className="clear"></div>
            </div>

            <div className="bg-secondary line p-xl text-center">
                <h2 className="color-white">Technológiák, amiket ismerek</h2>

                <div className="container-xl grid-col-4 gap-xl">
                    {
                        languageImages.map((img, i)=> 
                            <div key={i} className="box-white p-lg">
                                <h3>{img.name}</h3>
                                <ImgComponent src={img.src} classes={["img-holder"]}/>

                                <Loading from={0} to={img.percentage} sec={4}/>
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="container-xl bg-light-grey p-md">
                <h1>Rólam</h1>
                <ImgComponent src={require("../images/man-avatar.jpg")}
                    classes={["float-left", "border-primary", "mr-md", "mb-md", "maxw-200", "img-holder"]}/>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas venenatis 
                    urna sapien. Duis in augue luctus, sodales justo nec, bibendum nisi. 
                    Curabitur efficitur est quis sagittis dictum. Cras vel augue ante. 
                    Ut ut mauris massa. Proin scelerisque justo et purus tempor pretium. 
                    Nam lorem sapien, cursus a metus quis, vestibulum placerat leo. 
                    Praesent condimentum ac magna vitae suscipit. Nunc sagittis ullamcorper 
                    velit, venenatis tempor odio fermentum in. Curabitur blandit pulvinar 
                    blandit. Pellentesque at metus eu enim fermentum laoreet. Morbi metus 
                    justo, ultricies non lacinia ac, ullamcorper et dui. In et 
                    vulputate ligula, vel efficitur quam.
                </p>

                <div className="clear"></div>
            </div>

            <Footer text={"Készítette: Lengyel Norbert"}/>
        </>
    );
}

export default HomePage;