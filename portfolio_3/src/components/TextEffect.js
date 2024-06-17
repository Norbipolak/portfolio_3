import { useEffect, useRef, useState } from "react";

function TextEffect({ text, offset, sec = 3, classes }) {
    const [opacities, setOpacities] = useState(text.split("").map(() => 0));
    const [offsetY, setoffsetY] = useState(0);
    const divRef = useRef(null);

    const ms = sec/text.length * 1000;

    const anim = ()=> {
        let i = 0;

        const intervalID = setInterval(() => {
            const optcs = [...opacities];
            optcs[i] = 1;

            for(let from = 0; from <= i; from++) {
                optcs[from] = 1;
            }

            setOpacities(optcs);
            i++;

            if(i === opacities.length)
                clearInterval(intervalID);
        }, ms);
    }

    // useEffect(() => {
    //     let i = 0;

    //     const intervalID = setInterval(() => {
    //         const optcs = [...opacities];
    //         optcs[i] = 1;

    //         for(let from = 0; from <= i; from++) {
    //             optcs[from] = 1;
    //         }

    //         setOpacities(optcs);
    //         i++;

    //         if(i === opacities.length)
    //             clearInterval(intervalID);
    //     }, ms);

    //     return ()=>clearInterval(intervalID);
    // }, []);

    useEffect(()=> {
        const rect = divRef.current.getBoundingClientRect();

        window.onscroll = ()=> {
            setoffsetY(rect.top);
        }
    }, [offsetY])

    useEffect(()=> {
        if(offsetY <= 150 && !animStarted) {
            setAnimStarted(true);
            anim();
        }

        if(offsetY > 150) {
            setAnimStarted(false);
            setOpacities(text.split("").map(()=> 0));
        }
    }, [offsetY])

    return (
        <div ref={divRef} className={"pos-relative" + classes.join(" ")}>
            {
                text.split("").map((ch, i) =>
                    <div key={i} className="d-inline" style={{ opacity: opacities[i], transition:"all 0.3s ease"}}>
                        {ch}
                    </div>
                )
            }
        </div>
    );
}

export default TextEffect;

/*
Kell neki props-ban egy text meg egy sec, hogy hány másodperc alatt tünjön elő!! 
->
function TextEffect({text, sec}) {

Lesz még a return-ben egy div és majd annak kellenek osztályok pl.betűtípus és ezért még vár ez a függvény egy classes-t is!! 
-> 
function TextEffect({text, sec, classes}) {
    return(
        <div className={classes.join(" ")}>

Alá beírjuk a {text}-et és azalatt lesz egy div, aminek lesz egy class-va a hiding 
->
    return(
        <div className={classes.join(" ")}>
            {text}
            <div className="hiding"></div>
        </div>
    );

és a ahol vannak a classes ott meg beleégetünk egy position-relative class-t 
<div className={"postion-relative" + classes.join(" ")}>
fontos a + jel, ha van egy olyan class, amit bele szeretnénk égetni és van egy valami amit majd megadunk neki props-ként!!!

hiding meg az lesz, ahogy látjuk ez a dolog balról jobbra tünik elő 
tehát ha van valami ami elrejti és jobbra van rendezve, akkor ezt meg lehet vele oldani!
ámegyünk styles.scss-be és ott megcsináljuk ezt a hiding class-t 
.hiding {
    width: 100%;
    height: 100%;
    position: absolute;
    right: 0;
    background-color: black;
}
    
és még itt beleégetjük, hogy a sec az 3 legyen!! 
function TextEffect({text, sec = 3, classes}) {

és a HomePage-n pedig meghívjuk ezt a TextEffect-et!! 
<TextEffect text={"Szöveg"} classes={["text-center"]}/>

és ez így nem lesz jó, mert az egész fekete lett 
de miért foglalja az egész képernyőt, mert a a hiding az benne van egy div-ben itt 
        <div className={"postion-relative" + classes.join(" ")}>
            {text}
            <div className="hiding"></div>
        </div>
és mivel a hiding az position: absolute, amiben benne van az meg position-relative, szóval csak annak kéne, hogy teljesen bemenjen sötétbe 
nem az egésznek!! 
mert olyanunk nem volt, hogy position-relative, hanem csak olyan, hogy pos-relative!!! 
-> 
<div className={"pos-relative" + classes.join(" ")}>

Már csak az a kérdés, hogy miért egymás alatt van ez a kettő, mert most ki van írva, hogy Szöveg és alatta van egy fekete vonal 
mert nem csak a right-nak kell, hogy legyen, hogy nulla, hanem annak is, hogy top!!! 
.hiding {
    width: 100%;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    background-color: black;
}
és akkor már el fogja takarni, rajta lesz a fekete vonal!!  
ha meg azt mondanánk, hogy width: 50%, akkor most már csak a fele van eltakarva, a második fele a div-nek és a Szöveg ami középen van, mert 
annak van egy olyan class-ja, hogy text-center, akkor annak a fele látszódik, az első fele, a második pedig nem 

a példában úgy van csinálva, hogy mindegyik betűre van egy külön div csinálva, ami position: absolute és még fontos, hogy inline-block 
tehát, hogy a betűk egymás mellett legyenek, ne egymás alatt!!! 

és akkor mi is így megcsináljuk a text-en végigmegyünk egy map-val!!! 
de fontos, hogy a text-et split-eljük elötte!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
hogy külöbetűnként tudjunk vele dologozni, ne csak egy szöveg legyen egy string-ben!! 

    text.split("").map((ch, i)=> 
        <div key={i} className="d-inline">
            {ch}
        </div>
    )

Szétszettük a karaktereire, tehát a split("")-nél minden egyes karakter egy tömbbe lesz [[s], [z], [ö] stb.]
ezen végigmentünk egy map-val, szokásos key-t azt megadtuk az index-vel, és még nagyon fontos, hogy itt a div amit csináltunk és amibe
beletesszük a karaktereket, az megkapott egy olyan class-t, hogy d-inline, tehát, hogy egy vonalban legyenek!!!! 

csinálunk betűméretek!!! 
és ott csinálunk egy map-et a font-size-okra, hasonló lesz mint a sizes, csak kicsit más értékekkel!! 
ez a variables-ben lesz 
$fontSizes:(
    "xs": 8px,
    "sm": 12px,
    "md": 16px,
    "lg": 20px,
    "xl": 24px,
    "xxl": 28px
);

settings-ben pedig meghívjuk ezt!!! 
@include mapMixin($fontSizes, "font", font-size);

és akkor itt be tudjuk adni, hogy font-lg
beraktuk a HomePage-re, meg is jelent, de mi azt szeretnénk, hogy csak, akkor jelenjen meg ha elérünk egy bizonyos window.innerHeight-ot 
ezért alapból opacity: 0-nak kell lennie és ezt megadjuk neki style-ban

Most megpróbáljuk azt, hogy lehet, hogy amikor végigmegyünk ezen e text-en egy map-val, akkor ott bent, lehet-e ilyen setInterval vagy setTimeout
-ot csinálni 
-> 
text.split("").map((ch, i)=> {
    let opacity = 0;

    return <div key={i} style={{opacity: opacity}}
    className="d-inline">
        {ch}  
    </div>
})

ez így nem lesz jó, de csinálunk kintre a return-ön kivülre, nem ez a return, ami itt van a map-on belül, mert ott csináltunk egy {}-ot 
azért kellett ott a return, hanem ahol visszaadjuk a jsx szerkezetet azon kivül csinálunk egy opcities nevű useState-s változót 
const [opacities, setOpacities] = useState([]) ami egy tömb lesz!!! 
        
és akkor itt belül a map-on 
csinálunk egy const opcts változót, ahol kibontjuk az opacities tömbnek az értékeit és belerakjuk egy új tömbbe!! 
->
text.split("").map((ch, i)=> {
    let opacity = 0;
    const optcs = [...opacities];
    setOpacities()

    return <div key={i} style={{opacity: opacity}}
    className="d-inline">
        {ch}  
    </div>
})

de nem így lesz, hanem a useState-s változó alapból kapna egy értéket, nem csak egy üres tömb lenne, hanem 
-> 
const [opacities, setOpacities] = useState(
    text.split("").map(()=>0)
)
mert akkor az opacities-ben megjelenik ennyi nulla alapból!!! 
és akkor már csak annyit kell csinálni, hogy opacity a style-ban az opacties[i]-diket kapja meg akkor alapból mindegyiknek lesz egy 
opacity: 0-ja!!!! !

text.split("").map((ch, i)=> {

    return <div key={i} style={{opacity: opacities[i]}}
    className="d-inline">
        {ch}  
    </div>
})
és akkor itt csak átadjuk neki, hogy az opacity az a opacities[i] legyen!!
Itt fontos, hogy a useState-s változónak is lehet valami értéke, nem csak egy üres tömb lehet vagy null vagy ilyesmi 
mint ebben a példában is!!! 

és akkor így mindegyik betűnél(div-nél) nulla lesz a style-ban az opacity 
-> 
<div class="d-inline" style="opacity: 0;">S</div>
<div class="d-inline" style="opacity: 0;">z</div>
<div class="d-inline" style="opacity: 0;">ö</div>
<div class="d-inline" style="opacity: 0;">v</div>
<div class="d-inline" style="opacity: 0;">e</div>
<div class="d-inline" style="opacity: 0;">g</div>

és ha itt nullák az opacities-ek és a opacities useState-s változóhóz vannak kötve, akkor azt tudjuk mondani egy useEffect-ben 
csinálhatunk egy setInteval-t, amit úgy csinálunk meg, mint az elöbb, mert kétszer fog lefutni 
-> 
    useEffect(() => {
        let i = 0;

        const intervalID = setInterval(() => {
            const optcs = [...opacities];
            optcs[i] = 1;
            setOpacities(opcts)
        }, 500);

        return ()=>clearInterval(intervalID);

itt annyi van, hogy belerakjuk ebbe a optcs tömbbe az összes dolgot, ami benne van az opacities-ben, ami jelen esetben, annyi nulla, amennyi 
eleme van az text-nek 
és itt ebbe az új tömbbe belerakott nullákat pedig egyre változtatjuk, tehát a tömb összes elemét egyre változtatjuk ezzel -> optcs[i] = 1;

a végén meg kell a return ezzel a callback-vel meg, hogy clearInterval és itt adjuk meg neki az intevalID-t!!! 
hogy rögtön leállítsa 

setOpacities(opcts)
ez meg, hogy set-eljük vele a useState-s változónkat, arra, amit itt csináltunk 
nagyon fontos, hogy ez így müködik, hogy van pl. egy tömb, azzal akarunk valamit csinálni, pl. itt megváltoztatni minden elemnek az értékét 
vagy mondjuk egy elemet, akarunk hozzáadni ehhez a tömbhöz akkor kell ki kell bontani a régi tömböt egy spread-operatior-val 
-> 
const optcs = [...opacities]
megcsinálni a müveletet ->
optcs[i] = 1;
->
majd az utolsó lépés az, hogy set-veljük a useState-s változót, hogy ez legyen az új állapota!!! 
->
setOpacities(opcts);

Ez ilyenkor nem ment tovább, tehát csak az első S betű jelent meg a Szöveg-ből 
    useEffect(() => {
        let i = 0;

        const intervalID = setInterval(() => {
            const optcs = [...opacities];
            optcs[i] = 1;
            setOpacities(opcts)
            i++;
        }, 500);

        return ()=>clearInterval(intervalID);

azért mert nem növeltük az i-nek az értékét, amit létrehoztunk az elején, szóval ezt a interval-ban növelni kell egyel 
de viszont így is lesz egy probláma, hogy most mindegyik le fog futni de az előzőek meg el fognak tünni, mintha azoknak az opacity-je 
nem maradna egy, hanem csak mindig annak 1 az opacity-je, amit éppen mutat
tehát ha van 6 betünk és azt szeretnénk, hogy mindegyik látszodjon, akkor ennek kell lennie a tömbben amit majd átadunk a style-ban 
az opacity-nek, hogyha szépen megy sorba 
ha a második beűnél tart 
[1, 1, 0, 0, 0, 0]
ha mindegyik betű lefut 
[1, 1, 1, 1, 1, 1]
ugye akkor mindegyiknek az opacity-je egynek kell, hogy legyen!!! 

de viszont ez most így müködik 
-> 
ha második betűnél tart, akkor visszamegy az első nullára, 
->
[0, 1, 0, 0, 0, 0]
ha meg az utolsónál, akkor csak az utolsónak lesz az opacity-je egy a többinek nulla 
[0, 0, 0, 0, 0, 1]

most csak azt kellene elérni, hogy a többi ne nullázodjon vissza!!! 
*****
ha azt csináljuk, hogy ez a useEffect ne [], mindenre menjen, hanem csak a [opacities]-nek a változására, akkor meg csak az első fog lefutni 
a többi nem!!! 
*****
Ezt azért csinálja, mert itt az opacity-nek a nulladik eleme egy lesz ->  const optcs = [...opacities];
                                                                            optcs[i] = 1;

és utána pedig azt mondjuk, hogy setOpacities(opcts) 
és akkor itt a következő iterációban még mindig a régi opacities látjuk nem az újat, itt -> const optcs = [...opacities];

mert úgy láthatnánk az újat, hogy csinálunk még egy useEffect-et az opacities-re és ott, amikor megváltozik 
useEffect(()=> {
    console.log(opcts);    
}, [opacities])

és akkor itt látjuk, hogy hogy müködik ez 
->
[0, 0, 0, 0, 0, 0]
[0, 0, 0, 0, 0, 0]
[1, 0, 0, 0, 0, 0]
[0, 1, 0, 0, 0, 0]
[0, 0, 1, 0, 0, 0]
[0, 0, 0, 1, 0, 0]
[0, 0, 0, 0, 1, 0]

Tehát az elején lefut kétszer, akkor még semmi se változik meg majd utána folyamatosan csak az aktuális lesz egy 
és nem is áll le, mert csak azt csináltunk meg, hogy az első alapból álljon le, de azt viszont nem, hogy ez ami megy, ez mikor álljon majd le 
-> 
akkor kell majd leállni, hogy az i amit létrehoztunk a setInterval-on kivül és belül meg minden egyes iterációnál növeljük az értékét 
akkor álljon le ha az i eléri a, egyenlő lesz a opacities.length-vel!!! 
-> 
    useEffect(() => {
        let i = 0;

        const intervalID = setInterval(() => {
            const optcs = [...opacities];
            optcs[i] = 1;
            setOpacities(optcs);
            i++;

            if(i === opacities.length)
                clearInterval(intervalID);
        }, 500);

        return ()=>clearInterval(intervalID);
    }, []);

tehát ezt leállítjuk, amikor elkezdődik az egész 
->
return ()=>clearInterval(intervalID);

de viszont, ami meg megy, azt majd le kell állítani a függvény belsejében, ha eléri az opacities.length-et
->
if(i === opacities.length)
    clearInterval(intervalID);

és így akkor már leáll, de viszont még mindig csak egynek lesz az opacity-je egy 
ilyenkor látjuk a változásokat, amikor létrehozunk egy useEffect-et a useState-s változónak 

useEffect(()=> {
    console.log(opacities);
}, [opacities])
itt látjuk ezeket a dolgokat 
->
[1, 0, 0, 0, 0, 0]
[0, 1, 0, 0, 0, 0]
[0, 0, 1, 0, 0, 0]
[0, 0, 0, 1, 0, 0]

Az egyes iterációknál, amit a setInterval csinál, mindig csak az egyel régebbi érték lesz érvényben 
ezért van az, hogy amikor console.log(opacities), akkor az elején ott még semmi se változott, mindegyiknek az értéke az, hogy nulla 

de ezt úgy meg lehet oldani, hogy csinálunk egy for-ciklust 
for(let from = 0; from < i; from++) {
    opcts[i] = 1;
}

->
    useEffect(() => {
        let i = 0;

        const intervalID = setInterval(() => {
            const optcs = [...opacities];
            optcs[i] = 1;

            for(let from = 0; from <= i; from++) {
                optcs[from] = 1;
            }

            setOpacities(optcs);
            i++;

            if(i === opacities.length)
                clearInterval(intervalID);
        }, 500);

        return ()=>clearInterval(intervalID);
    }, []);

itt mi történik 

jön a let i = 0;- ből a nulla 
bemeggyünk a for-ciklusba 

és akkor csak a nulladikat fogjuk megcsinálni, arra, hogy optcs = 1 legyen 
utána ha lement a ciklus, akkor elkezdjük előlről, de akkor már növeltük az i értékét egyel és akkor az már nem nulla lesz, hanem 
egy és akkor már a nulladik-nak meg az elsőnek is az lesz az értéke, hogy egy és akkor ez megy tovább, mert a futási feltétel azt mondja, hogy 
ez i-ig menjen -> from <= i és akkor a legvégén mindegyiknek az értéke 1 lesz az opcts tömbben!!! 

ez hasonló ahhoz amikor két for ciklus egymásba van ágyazva!!! 
és nagyon fontos, hogy itt már a from-adikat adjuk meg neki, mert az az a szám, ami kell nekünk!!
optcs[from] = 1;

Most azt akarjuk majd kiszámítani, hogy ez az egész komponens az vár egy sec-et 
function TextEffect({ text, sec = 3, classes })

és ha itt megadunk bármit, annyi idő alatt fusson le ez a setInterval, annyiszor amennyiszer kell, hogy összesen 
amit megadunk sec-et, annyiszor lefusson majd az összes!!! 

tehát itt lesz egy ms változónk, ami sec/text.length 
mert a sec, amennyit megadunk és ez az egész meg annyiszor fog lefutni, amennyi a text-nek a length-je 
de ezt még be kell szorozni ezerrel, mert itt milliszekunduban kell megadni az értéket!!! 

const ms = sec/text.length * 1000;
és akkor ezt a ms-t megadjuk majd a setInterval-nak!!!! 
-> 
        const ms = sec/text.length * 1000;

        const intervalID = setInterval(() => {
            const optcs = [...opacities];
            optcs[i] = 1;

            for(let from = 0; from <= i; from++) {
                optcs[from] = 1;
            }

            setOpacities(optcs);
            i++;

            if(i === opacities.length)
                clearInterval(intervalID);
        }, ms);


és akkor így annyi ideig fog lefutni az összes, amennyit megadunk majd meghívásnál a sec-nek!!!  
de ezt nem csak meghívásnál lehet megadni, hanem itt is, hogy bele van égetve paraméterként 
function TextEffect({ text, sec = 3, classes })
pl. a mi esetünkben, hogy ez 3 másodperc lesz és akkor meghívásnál nem kell semmit ide beírni, de viszont így nem lesz 
olyan reusable, mert ezt beraknánk máshova az is 3 másodperc alatt futna le!!!
de ezt felül lehet írni meghívásnál!!! 
<TextEffect text={"Szöveg"} classes={["text-center", "font-lg"]} sec={0.5}/> 

most már szépen kiírja a szöveg-et!!! 
Azt kell majd meghatározni, hogy legyen egy transition-ja mert így jelen esetben csak kiírja a szöveget, de jó ha van egy transition
is neki mert úgy szebb!!! 
de ezt meg lehet adni style-ban, ahol megcsináltuk az opacity-t is!! 
style={{ opacity: opacities[i], transition:"all 0.3s ease"}}>

Azt kell megcsinálni, hogy megadott magaságon fusson majd le
meg a ms azt kivisszük a useEffect-ből egy globális változónak, hogy jobb ha ez ott már ki van számolva, mert ez egy loop-ban van és ne 
számoljuk ki többször, mert felesleges!! 
-> 
    const ms = sec/text.length * 1000;

    useEffect(() => {
        let i = 0;
******
és kell egy másik useEffect-et, ami a window.pageYOffset-re lesz csinálva, mert azt szeretnénk, hogy ez az egész, amit csináltunk 
az csak akkor fusson le, hogyha elérünk egy bizonyos magasságot a képernyőn és pageYOffset mutatja meg, hogy hol vagyunk jelenleg az y-tengelyen 
-> 
useEffect(()=> {
    console.log(pageYOffset);
}, [window.pageYOffset])

Az a kérdés, hogy hogyan tudjuk megoldani, hogy folyamatosan nézzük a pageYOffset-et!!! 
mert ez csak akkor nézi, hogyha megállunk, de nem folyamatosan!! 
és arra ha görgetünk ő erre nem tud reágálni, nem olyan, mint egy useState-s változó

ezért kell a window-ra egy onscroll-os eventListener, hogy ezt tudjuk követni!!! 
    useEffect(()=> {
        window.onscroll = ()=> {
            console.log(pageYOffset);
        }
    }, [window.pageYOffset])
és akkor mindig, amikor scroll-olunk, akkor ez le fog futni és megmondja, hogy mennyi a pageYOffset, mert ugy az van vele console.log-olva
de ez is kétszer fog lefutni 
ezért csinálunk egy offsetY-es useState-s változót!!! 
const [offsetY, setoffsetY] = useState(0);

és a window.onscroll-nál pedig set-eljük ezt a window.pageYOffset-re
    useEffect(()=> {
        window.onscroll = ()=> {
            setoffsetY(pageYOffset);
        }
    }, [])

még azt kell megcsinálni, hogy megnézni, hogy pontosan hol van az elemünk, mert ezt ahhoz képest kell majd meghatározni, hogy mikor 
fusson le!!!! 

    return (
        <div className={"pos-relative" + classes.join(" ")}>
            {
                text.split("").map((ch, i) =>
                    <div key={i} className="d-inline" style={{ opacity: opacities[i], transition:"all 0.3s ease"}}>
                        {ch}
                    </div>
                )
            }
        </div>
    );

ennek az egésznek kell majd a magassága 
ezért használni kell egy useRef-et!!!!! 
mert arra jó, hogyha megadjuk a ref-et annak pl. itt ennek az egésznek itt jelen esetben, ami itt benne van a return-ben, akkor azt 
egy egésznek kezeli és majd a current-vel tudunk hozzáférni!!! 

1. létrehozunk egy ref-et 
const divRef = useRef(null);
2. ref-ként megadjuk annak az elemnek, amit szeretnénk, ugye ez itt a legkülső div lesz majd!!! 
<div ref={divRef} className={"pos-relative" + classes.join(" ")}>
3. és ahogy változik nekünk a pageYOffset, úgy nézzük meg a divRef.current-vel!!! 

átneveztük -> offsetY-ra 
const [offsetY, setoffsetY] = useState(0);

    useEffect(()=> {
        window.onscroll = ()=> {
            setoffsetY(window.pageYOffset);
        }
    }, [offsetY])

    useEffect(()=> {
        console.log(offsetY);
    }, [offsetY])

Itt kell nekünk a getBoundingClientRect
->
this function returns an element's position relative to the whole document (page)!!!!
és akkor nekünk ez kell a divRef.current-re mert annak akarjuk meghatározni majd 
const rect = divRef.current.getBoundingClientRect()
console.log(rect);
és akkor ez visszaadott egy DOMWect-et, mindenféle értékkel
-> 
{x: 33, y: -106, widht: 1260, height: 38 top: -10 ..right, left, bottom}
és akkor nekünk itt a top kell majd 
console.log(rect.top)
->
alapból ez 90-ről indul, mert ott van a szövegünk ha eléri a szöveget(szöveg itt a divRef.current), akkor 0 lesz, majd ha alá megyünk 
akkor ennek az értéke - lesz!!!! 
Akkor éri ezt a dolgot, amikor a top nullánál van!!!!!!!!!!!!!!!!!

és akkor nem is kell nekünk itt a window-os dolog, hanem ez kell és ezzel fogjuk majd set-elni a offsetY-t 
->
    useEffect(()=> {
        const rect = divRef.current.getBoundingClientRect();

        window.onscroll = ()=> {
            setoffsetY(rect.top);
        }
    }, [offsetY])

    useEffect(()=> {
        console.log(offsetY);
    }, [offsetY])


és amikor ez nulla lesz akkor kell elkezdeni az animációt, vagy egy kicsit majd elötte 
    useEffect(()=> {
        const rect = divRef.current.getBoundingClientRect();

        window.onscroll = ()=> {
            setoffsetY(rect.top);
        }
    }, [offsetY])

    useEffect(()=> {
        if(offsetY === 0) {
            console.log("Elkezdjük az animációt!")
        }
    }, [offsetY])

de mivel az const [offsetY, setOffsetY] = useState(0)
itt ez most nem jó, hogy alapból nulláról indul, mert az azt jelenti, hogy már ott vagyunk!!! 
hanem mondjuk 1000-ről
-> 
const [offsetY, setOffsetY] = useState(1000)

itt az a probléma, hogy amikor görgetünk lefele sokszor átugorja a 0-t, ezért azt mondjuk, hogy kisebb vagy egyenlő, mint nulla 
-> 
    useEffect(()=> {
        if(offsetY <= 0) {
            console.log("Elkezdjük az animációt!")
        }
    }, [offsetY])

És itt még az a kérdés, hogy el volt-e kezdve az animáció ennél a konkrét példánynál!!!! 
ezért létrehozunk egy useState-s változót, hogy 
const [animStarted, setAnimStarted] = useState(false)

ezért itt meg kell határozni, hogy kisebb legyen, mint 0 és még, hogy nem animStarted 
mert itt bent pedig az animStarted az true lesz 
    useEffect(()=> {
        if(offsetY <= 0 && !animStarted) {
            console.log("Elkezdjük az animációt!")
            setAnimStarted(true);
        }
    }, [offsetY])
tehát ha ez az érték false, akkor menjen be és csinálja meg, amit kell
de viszont ha ezt megcsinálta, akkor ne menjen be többször, ezért állítottuk be belül az animStarted-ot mindig true-ra 
és akkor csak egyszer fogja lejátszani!!!

de viszont hogyha az offsetY > 0 akkor meg visszaállítjuk false-ra, hogy látsza le többször, de csak akkor ha felpörgetünk!!!! 

átrendezzük egy kicsit, mert ha animStarted van, akkor kellene ezt a useEffect-ben lévő dolgot úgy meghívni, hogy
csinálunk egy anim függvényt, amibe belerakjuk ami useEffect-ben volt 
-> 
    const anim = ()=> {
        let i = 0;

        const intervalID = setInterval(() => {
            const optcs = [...opacities];
            optcs[i] = 1;

            for(let from = 0; from <= i; from++) {
                optcs[from] = 1;
            }

            setOpacities(optcs);
            i++;

            if(i === opacities.length)
                clearInterval(intervalID);
        }, ms);
    }

és nem ezt fogja returnölni, hogy return ()=>clearInterval(intervalID);
hanem csak annyit, hogy intervalID

nem adunk vissza semmit!!!!! 
mert nincsen arra szükségünk, hogy visszaadjunk itt bármit is mert az anim függvény csak egyszer fog elindulni!!!!!! 
ez nagyon fontos!!!!! 
Mert nem az van, hogy kétszer betölti az oldalt és oldalbetöltéskor lemegy hanem itt az anim függvény az elegendő és az már csak 
egyszer fog lefutni!!!! 

    const anim = ()=> {
        let i = 0;

        const intervalID = setInterval(() => {
            const optcs = [...opacities];
            optcs[i] = 1;

            for(let from = 0; from <= i; from++) {
                optcs[from] = 1;
            }

            setOpacities(optcs);
            i++;

            if(i === opacities.length)
                clearInterval(intervalID);
        }, ms);
    }

    useEffect(()=> {
        if(offsetY <= 20 && !animStarted) {
            setAnimStarted(true);
            anim();
        }

        if(offsetY > 20 ) {
            setAnimStarted(false);
        }
    }, [offsetY])

és ezt az anim-ot pedig meghívjuk, hogyha itt az if-ben teljsülnek a dolgok!!!! 

de viszont ha azt akarjuk, hogy lemenjen mégegyszer, akkor le kell venni majd az opacities ott nullára, tehát megkapja a kezdőértéket 
itt a második if-ben!!! 
-> 
       if(offsetY > 20 ) {
            setAnimStarted(false);
            setOpacities(text.split("").map(()=> 0));
        }

Beraktuk ez aljábbra, meg azt szerettük volna, hogyha elöbb kezdi ezt az animációt 
            <div className="container-xl bg-light-grey p-md" style={{minHeight: "1000px"}}> 
                <h1>Rólam</h1>
                <TextEffect text={"Szöveg"} classes={["text-center", "font-lg"]} sec={0.5}/>

azért kellett, hogy megadjuk style={{minHeight: "1000px"}}, hogy elérje nekünk a top-tól a 150-et, mert alatta már nem volt sok valami!!! 

    useEffect(()=> {
        if(offsetY <= 150 && !animStarted) {
            setAnimStarted(true);
            anim();
        }

        if(offsetY > 150) {
            setAnimStarted(false);
            setOpacities(text.split("").map(()=> 0));
        }
    }, [offsetY])


és itt a határt is be lehet állítani, tehát lesz egy offset
-> 
function TextEffect({ text, offset, sec = 3, classes })
és akkor az offset kötelező paraméter és akkor az offset-et elemenként tudjuk majd beállítani 
->
    useEffect(()=> {
        if(offsetY <= offset && !animStarted) {
            setAnimStarted(true);
            anim();
        }

        if(offsetY > offset) {
            setAnimStarted(false);
            setOpacities(text.split("").map(()=> 0));
        }
    }, [offsetY])

<TextEffect offset={100} text={"Szöveg"} classes={["text-center", "font-lg"]} sec={0.5}/>

itt lehet 100az offset, de egy másik elemnél meg mást tudunk beállítani!!!!
de úgy is lehet, mint a sec-nél, hogy beleégetjük itt az értéket 
*/