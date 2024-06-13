import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ImgComponent from "./ImgComponent";

function ModalImg(src, classes) {
    const [display, setDisplay] = useState(false);

    return (
        <>
            <div className={"modal-img " + (display ? "d-flex" : "d-none")}>
                <div className="modal-img-holder">
                    <div className="modal-x" onClick={() => setDisplay(false)}>
                        <FontAwesomeIcon icon="fa-regular fa-circle-xmark" />
                    </div>
                    <img src={src} />
                </div>
            </div>

            <ImgComponent cb={() => setDisplay(true)} classes={classes} src={src}/>
        </>
    );
}

export default ModalImg;

/*
Ez ugyanúgy, mint a sima ImgComponent vár egy src-t és egy classes-ot!!! 
lesz egy useState-s változónk, ami azt fogja megmondani, hogy display-e vagy nem!! tehát true vagy false lehet az értéke
és ha ennek az értéke true akkor megkap egy d-flex-es osztályt ha meg nem akkor meg egy d-none, szóval nem fogjuk látni!! 
-> "modal-img " + (display ? "d-flex" : "d-none")

és ezt majd két helyen fogjuk használni ezt a useState-s változót, egyik, amikor meg szerentnénk nyitni, akkor a setDisplay az true lesz 
meg ahol be szeretnénk zárni, ott meg a setDisplay az false lesz!!! 

onClick={cb}
és mivel az ImgComponentben ez meg van csinálva egy onClick-re, ezért itt meg kell csak hívni az ImgComponent-et és megadni neki egy callback-et!
amivel ugye megjelenítjük ezt az egészet 
->

    <div className={"modal-img " + (display ? "d-flex" : "d-none")}>
        <div className="modal-img-holder">
            <div className="modal-x" onClick={() => setDisplay(false)}>
                <FontAwesomeIcon icon="fa-regular fa-circle-xmark" />
            </div>
            <img src={src} />
        </div>
    </div>
 
mert ez csak akkor jelenik meg, hogyha a display-nek true az értéke és akkor lesz ez egy display: flex
    display: flex;
    justify-content: center;
    align-items: center;
mert ami itt van benne ebbe az display flex 
tehát ez a rész 
        <div className="modal-img-holder">
            <div className="modal-x" onClick={() => setDisplay(false)}>
                <FontAwesomeIcon icon="fa-regular fa-circle-xmark" />
            </div>
            <img src={src} />

ha meg d-none, akkor azt jelenti, hogy eböl semmi se fog megjelenni!!! 

ez meg csak annyi, hogy van itt egy x ikon és ha arra kattunktunk, akkor bezárja, tehát itt onClick-re az lesz, hogy 
()=> setDisplay(false)
nagyon fontos, hogyha itt akarunk valamit set-elni, mint jelen esetben, akkor kell egy cb!!!!! 
ha meg van egy függvény, amiben set-eltünk, akkor meg tudjuk neki adni simán onClick={függvény neve}

*/
