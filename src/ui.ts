// Dag 4: Funktioner som bygger sidans innehåll med DOM. Gör alla tester gröna på tests.html.
// Röda understrykningar tills du skrivit return är normalt. ratt.bild och ratt.beskrivning är valfria (string | undefined): använd ?? "" för att få en text.
// Regel: använd createElement och textContent. Använd INTE innerHTML med data.
import { formateraPris } from "./pris";
import type { Ratt } from "./typer";

// 1. Bygger ett kort för en rätt och returnerar det (anropar inte append själv).
//    <article data-id="1">
//      <img src="..." alt="Illustration av kardemummabulle">
//      <h3>Kardemummabulle</h3>
//      <p>Beskrivning</p>
//      <p class="pris">35 kr</p>
//    </article>
export function skapaRattKort(ratt: Ratt): HTMLElement {
  // Skapa kort
  const kort = document.createElement("article");
  kort.dataset.id = String(ratt.id);

  // Skapa bild-element
  const bild = document.createElement("img");
  bild.src = ratt.bild ?? "";
  bild.alt = `Illustration av ${ratt.namn}`;

  // Skapa rubrik
  const rubrik = document.createElement("h3");
  rubrik.textContent = ratt.namn;

  // Skapa beskrivning
  const beskrivning = document.createElement("p");
  beskrivning.textContent = ratt.beskrivning ?? "Beskrivning";

  // Skapa text för pris och lägg till klass
  const pris = document.createElement("p");
  pris.classList.add("pris");
  pris.textContent = formateraPris(ratt.pris);

  // Sätt ihop allt
  kort.append(bild, rubrik, beskrivning, pris);
  // Returnera kortet!
  return kort;
}

// 2. Töm containern och lägg in ett kort per rätt.
//    Är listan tom: visa <p class="tom">Inga rätter hittades.</p> istället.
export function visaMeny(container: HTMLElement, ratter: Ratt[]): void {
  // Text som visas om listan är tom
  const tom = document.createElement("p");
  tom.classList.add("tom");
  // tom.textContent = "Inga rätter hittades.";
  tom.textContent = "Just nu finns det inga rätter att visa. Försök igen lite senare!";

  // Töm containern
  container.replaceChildren();

  // Kontrollera om listan är tom
  if (ratter.length === 0) {
    container.append(tom);
    return;
  }

  // Lägg in ett kort per rätt
  for (const ratt of ratter) {
    container.append(skapaRattKort(ratt));
  }
}

// 3. Sätt rubrikens text: "Meny (8 rätter)". Ett enda: "Meny (1 rätt)".
export function uppdateraRubrik(element: HTMLElement, antal: number): void {
  // Formatering baserad på antalet rätter
  const antalRatter = antal === 1 ? `${antal} rätt` : `${antal} rätter`;
  const uppdateradRubrik = `Meny (${antalRatter})`;

  // Uppdatera elementet med ny rubrik
  element.textContent = uppdateradRubrik;
}

// 4. Markera EN rätt som dagens rätt: klassen "dagens" ska finnas på kortet med rätt
//    data-id, och inte på något annat kort. Anropas igen = markeringen flyttas.
export function markeraDagensRatt(container: HTMLElement, id: number): void {
  // Hämta alla kort från containern
  const allaKort = container.querySelectorAll("article");

  for (const kort of allaKort) {
    // är detta kortet för dagens rätt?
    const arDagensRatt = kort.dataset.id === String(id);

    // Tar bort klassen "dagens" om det inte är dagens rätt, och lägger till klassen om det är dagens rätt
    kort.classList.toggle("dagens", arDagensRatt);
  }
}
