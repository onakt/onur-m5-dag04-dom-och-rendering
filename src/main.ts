// Dag 4: DOM. Kör npm run dev och titta i Console (F12).
// querySelector kan ge null om elementet saknas. Hantera det med if eller ?. (TypeScript kräver det).
// Tips: document.querySelector<HTMLElement>("#id") säger vilken sorts element du får.
import { meny } from "./data";
import { visaMeny, uppdateraRubrik, markeraDagensRatt } from "./ui";
import { billigast } from "./meny";

// DEL 1: utforska DOM:en ----------------------------------------------
// 1. Hämta h1 med document.querySelector("h1") och skriv ut dess textContent.
const heading1 = document.querySelector("h1");
console.log(heading1?.textContent);

// 2. Ändra texten i #hero-rubrik till "Välkommen in!"
const heroRubrik = document.querySelector("#hero-rubrik");
if (heroRubrik) {
    heroRubrik.textContent = "Välkommen in!";
}

// 3. Hämta alla länkar i menyn med document.querySelectorAll("nav a").
const menyLankar = document.querySelectorAll<HTMLAnchorElement>("nav a");
//    Loopa med for...of och skriv ut varje länks href och text.
if (menyLankar) {
    for (const lank of menyLankar) {
        console.log(lank.href, lank.textContent);
    }
}

// 4. Skapa ett nytt p-element (document.createElement), ge det texten
//    "Dagens tips: prova en kardemummabulle." och lägg det sist i #hero med append.
const p = document.createElement("p"); // elementet finns endast i JavaScript som ett DOM-element, men ännu inte placerat i HTML-dokumentet.
p.textContent = "Dagens tips: prova en kardemummabulle.";
const hero = document.querySelector("#hero");
if (hero) {
    hero.append(p);
}
// 5. Lägg klassen "dagens" på #hero med classList.add. Ta bort den med classList.remove.
if (hero) {
    hero.classList.add("dagens");
    hero.classList.remove("dagens");
}

// 6. Säkerhetsförsök: sätt p.innerHTML = '<img src="x" onerror="console.log(\'Attack!\')">'
//p.innerHTML = '<img src="x" onerror="console.log(\'Attack!\')">';
//    Vad händer i Console? Byt sedan till p.textContent med samma text. Vad händer nu?
// I console får jag upp texten "Attack!"
p.textContent = "Attack!";
// Nu ersätts bilden i p med texten "Attack!" i stället.
/*
Man ska aldrig sätta 'InnerHTML' med text som en användare eller ett API skrivit eftersom det kan
innehålla skadlig HTML eller JavaScript-kod som kan köras på sidan. 'textContent' används i stället
för att behandla innehållet som vanlig text.
*/


// DEL 2: koppla ihop med funktionerna i ui.js ----------------------------
// 7. Hämta #meny-lista och #meny-rubrik.
const menyLista = document.querySelector<HTMLElement>("#meny-lista");
const menyRubrik = document.querySelector<HTMLElement>("#meny-rubrik");
// 8. Anropa visaMeny med menyn, och uppdateraRubrik med antalet rätter.
if (menyLista && menyRubrik) {
    visaMeny(menyLista, meny);
    uppdateraRubrik(menyRubrik, meny.length);
    // Testa tomt-läge
    // visaMeny(menyLista, []);
}
// 9. Dagens rätt = den billigaste lunchen. Använd filter och billigast (från meny.js)
//    och markeraDagensRatt.
// Plocka ut alla luncher ur menyn
if (menyLista) {
    // Välj alla luncher
    const luncher = meny.filter((ratt) => ratt.kategori === "lunch");
    // Hitta den billigaste lunchen
    const billigasteLunchen = billigast(luncher);

    //Markera den billigaste lunchen som dagens rätt!
    if (billigasteLunchen) {
        markeraDagensRatt(menyLista, billigasteLunchen.id);
    }
}
