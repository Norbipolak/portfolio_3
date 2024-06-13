function Loading({to, from, sec}) {
    const [currentState, setCurrentState] = useState(from);
    const [intervalID, setIntervalID] = useState([]);

    const load = ()=> {
        const diff = to - from;
        const ms = sec / diff * 1000;

        const id = setInterval(()=> {
            setCurrentState(cs=>++cs);
            //itt ezt növeljük egyel!!! a currentState-t, és megadjuk, hogy ms alatt menjen végbe egy loop!! portfolio2-ben a leírás 
        }, ms)
    }

    useEffect(()=> {
        if(currentState === to) {
            clearInterval(intervalID); //fontos, hogy itt az intervalID töröljük majd!!!! 
        }
    },[currentState])

    /*
    Itt állítjuk le azt a folyamatot, amit hagyjuk lefutni, ez a currentState változására van csinálva 
    fontos, hogy akkor állítjuk le ha a currentState az eléri a to-t, mert azt szeretnénk, hogy addig menjen, amíg a to van!!! 
    */

    useEffect(()=> {
        const diff = to - from;
        const ms = sec / diff * 1000;

        const id = setInterval(()=> {
            setIntervalID(id); 
            setCurrentState(cs=>++cs)
        }, ms)

        return ()=> clearInterval(id);
        //itt meg a sima id-t!! amivel előtte set-teltünk az intervalID-s változónkat, de ez fontos, hogy már az elején töröljük!!! 
    }, []);

    /*
    Tehát itt megcsináltuk ugyanazt, csak annyi különbséggel, hogy ez egyszer fog lefutni amikor a komponens betölt!!!! 
    és 
    */

    return(
        <div className="loading-component">
            {currentState}%
            <div className="loading-holder">
                <div className="loading-line" style={{width:`${currentState}%`}}></div>
            </div>
        </div>
    );
}

export default Loading;

/*
Ami a return-ben van 
azért kell a loading-component, hogy ki tudjuk írni rendesen a %-t, ami ugye currentState useState-es változóból kapjuk meg 
loading-holder meg a holding-line ugyanaz, hogy kell legyen a height-ja és a loading-holder az position: relative lesz 
loading-line pedig position: absolute és még fontos, hogy itt a top: 0; bottom: 0; és a left: 0; mert a tölrés balról jobbra megy 
és majd úgy tölt be, hogy megadtuk neki a style-ban a width-et, akkorára, mint a currentState változó, ami majd min={0} max={100}
tehát ez nulla %-tól fog menni 100%-ig, persze ez a parent elem a loading-holder width-jéhez képest!!! 

és majd itt jön a neheze, hogy kettő menetet kell majd leállítani setInterval-nál 
fontos, hogy legyen egy setIterval-os useState-s változó, ami egy tömb lesz és tudjuk majd itt mindkettő id-t tárolni és az egyiket 
majd leállítjuk a futás elején rögtön ez lesz a useEffect-ben, ami [] készült, másikat meg leállítjuk, amikor végbement a folyamat 
ez lesz a useEffect-ben, ami a [currentState]-re van 

const [currentState, setCurrentState] = useState(from);
fontos, hogy ez a from-tól induljon, mert ez egy reusable-ös dolog és nem biztos, hogy minden esetben a from az nulla lesz 
tehát ez így nem jó, ha ezt 0-ra állítjuk!!!!! 
*/ 