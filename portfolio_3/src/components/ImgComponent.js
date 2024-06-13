function ImgComponent({src, classes, cb = null}) {
    return(
        <div className={classes.join(" ")}>
            <img src={src} onClick={cb}/>
        </div>
    );
}

export default ImgComponent;

/*
Nagyon fontos, hogy ez vár 3 dolgot
1. egy src-t mert ez reusable és majd ha meg lesz hívva, akkor ott adunk meg neki egy src-t és nagyon fontos, hogy meghívásnál React-ban kell a 
require() és az nem jó, ha itt csináljuk meg mindig a behívásnál kell, hogy legyen 
2. vár classes, ami egy tömb lesz és majd itt ezt a tömböt, join-val stringgé alakítjuk és fontos, amikor megadjuk majd az osztályokat neki 
akkor ott egy tömbbe kell beírni meghívásnál, mert ez egy tömböt vár ugye 
így -> <ImgComponent/ classes={[p-md stb.]}>
fontos, hogy itt a classes egy szöközzel kell majd joinolni -> classes.join(" ")
3. azt szeretnénk, hogyha rákattintunk a képre, akkor megjelenjen nagyba, ezért várni fog a függvény egy cb-t, ami majd akkor fog lefutni 
itt egy onClick-re 
*/ 