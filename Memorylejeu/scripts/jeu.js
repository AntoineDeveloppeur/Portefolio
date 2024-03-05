console.log("début")
let count = 0
let listeCartesChoisies = []
let nombreDeDoublons = 3
let score = 0
let scoreMax = nombreDeDoublons
// TODO : prendre en compte le nombre de tentative ratées pour afficher un score amélioré
let nombreTentativesRatées = 0
let listeTypeDeCarte = ""
let listeTypeDosDeCarte = ""

// Cette fonction récupère les données des carte dans le local storage ou dans le fichier JSON
async function recupererDonneesCartes() {
    if (listeTypeDeCarte== "") {
        if (window.localStorage.getItem("carteJSON") == null) {
            const reponse = await fetch("cartes.json")
            listeTypeDeCarte = await reponse.json()
            //  Transformation de la liste de Carte en format JSON
            const carteJSON = JSON.stringify(listeTypeDeCarte)
            // Stockage des informations dans le localStorage
            window.localStorage.setItem("carteJSON",carteJSON)
            // Sinon, chercher l'information dans le local storage
        } else {
            const carteJSON = window.localStorage.getItem("carteJSON")
            listeTypeDeCarte = JSON.parse(carteJSON)
        }
    }    
    if (listeTypeDosDeCarte== "") {
        if (window.localStorage.getItem("dosDeCarteJSON") == null) {
            const reponse = await fetch("doscartes.json")
            listeTypeDosDeCarte = await reponse.json()
            //  Transformation de la liste de Carte en format JSON
            const dosDeCarteJSON = JSON.stringify(listeTypeDosDeCarte)
            // Stockage des informations dans le localStorage
            window.localStorage.setItem("dosDeCarteJSON",dosDeCarteJSON)
            // Sinon, chercher l'information dans le local storage
        } else {
            const dosDeCarteJSON = window.localStorage.getItem("dosDeCarteJSON")
            listeTypeDosDeCarte = JSON.parse(dosDeCarteJSON)
        }
    }
  
}
/**
 * Recupère l'information du type de carte choisi par le joureur depuis le local storage pour avoir une
 * valeur qui ne change pas lors du changement de page et est garder en mémoire
 * lorsque l'utilisateur ferme son navigateur
 * @returns {number} Choix fait par l'utilisateur dans le menu option. Par défaut le choix est "0"
 */
function recupererChoixTypeDeCartes () {
    if (window.localStorage.getItem("ChoixTypeDeCartes") !== null) {
        return window.localStorage.getItem("ChoixTypeDeCartes")
    } else {
        return "0"
    }
}

// Cette fonction crée la grille des cartes en fonction du choix du joueur
async function creerGrilleCartes() {
    await recupererDonneesCartes()
    let ChoixTypeDeCartes = recupererChoixTypeDeCartes ()
    // Assigner a une variable de la division dans laquelle les cartes vont être ajoutée
    const gridCartes = document.querySelector(".grid-cartes")
    // Vider la divisions qui contient les cartes
    gridCartes.innerHTML = ""
    // Créer des doublons à partir du type de carte
    for(let i=1; i<=nombreDeDoublons; i++) {
        
        // Créer la division du premier doublon
        const premierDoublon = document.createElement("div")
        // Assigner les propriétés nécessaire au bon fonctionnement du reste du javascript et CSS
        premierDoublon.classList.add("carte-a-retourner", "Carte")
        premierDoublon.id ="carte-a-retourner"+i
        // Ajouter la division au DOM
        gridCartes.appendChild(premierDoublon)

        // Créer l'image de la carte et ajouter au DOM
        const cartePremierDoublon = document.createElement("img")
        cartePremierDoublon.src = listeTypeDeCarte[ChoixTypeDeCartes]["image"+i]
        cartePremierDoublon.classList.add("photo")
        cartePremierDoublon.id = "photo-"+i
        premierDoublon.appendChild(cartePremierDoublon)

        // Créer le dos de cartes du premier doublon et ajouter au DOM
        const dosPremierDoublon = document.createElement("img")
        dosPremierDoublon.src = listeTypeDosDeCarte[0].image
        dosPremierDoublon.classList.add("dos-de-carte")
        dosPremierDoublon.id = "dos-de-carte"+i
        premierDoublon.appendChild(dosPremierDoublon)

        // Créer le photo-hover : vérifier son utilité : let's clean the code sometime
        const photoHoverPremierDoublon = document.createElement("div")
        photoHoverPremierDoublon.classList.add("photo-hover")
        photoHoverPremierDoublon.id = "photo-hover-"+i
        premierDoublon.appendChild(photoHoverPremierDoublon)

        /**
         * Même chose pour le deuxième Doublon
         */    

        const deuxiemeDoublon = document.createElement("div")
        deuxiemeDoublon.classList.add("carte-a-retourner", "Carte")
        deuxiemeDoublon.id ="carte-a-retourner"+[i+nombreDeDoublons]
        gridCartes.appendChild(deuxiemeDoublon)

        const cartedeuxiemeDoublon = document.createElement("img")
        cartedeuxiemeDoublon.src = listeTypeDeCarte[ChoixTypeDeCartes]["image"+i]
        cartedeuxiemeDoublon.classList.add("photo")
        cartedeuxiemeDoublon.id = "photo-"+[i+nombreDeDoublons]
        deuxiemeDoublon.appendChild(cartedeuxiemeDoublon)

        const dosdeuxiemeDoublon = document.createElement("img")
        dosdeuxiemeDoublon.src = listeTypeDosDeCarte[0].image
        dosdeuxiemeDoublon.classList.add("dos-de-carte")
        dosdeuxiemeDoublon.id = "dos-de-carte"+[i+nombreDeDoublons]
        deuxiemeDoublon.appendChild(dosdeuxiemeDoublon)

        const photoHoverdeuxiemeDoublon = document.createElement("div")
        photoHoverdeuxiemeDoublon.classList.add("photo-hover")
        photoHoverdeuxiemeDoublon.id = "photo-hover-"+[i+nombreDeDoublons]
        deuxiemeDoublon.appendChild(photoHoverdeuxiemeDoublon)
    }
    placerLesCartesAleatoirement(nombreDeDoublons)
}

/**
 * Place les cartes dans un ordre aléatoire
 * @param {number} nombreDeDoublons est le nombre de pair de carte
 */

function placerLesCartesAleatoirement(nombreDeDoublons) {
    // générer un nouveau "set" qui contient que des éléments différents
    let uniqueNumbers = new Set()
    // Ajouter au set des nombres aléatoires tous différents 
    while (uniqueNumbers.size < nombreDeDoublons * 2) {
        let randomNumber = Math.floor(Math.random() * nombreDeDoublons * 2) + 1
        uniqueNumbers.add(randomNumber)
    }
    // créer une liste à partir d'un set
    let listeDeChiffresUniques = Array.from(uniqueNumbers)
    for(let n=1; n<=nombreDeDoublons * 2;n++) {
        const ordreDeChaquePhotos = document.getElementById("carte-a-retourner" + n)
        // Toutes les class sont enlevées et je rajoute celles qui m'intéresse
        ordreDeChaquePhotos.removeAttribute("class")
        ordreDeChaquePhotos.classList.add("carte-a-retourner", "Carte" + listeDeChiffresUniques[n-1])
    }
}
     

// Retourne les cartes face cachés lorsque les cartes révélés ne sont pas identiques
async function cacherLesCartes() {
    await delay(3000)
    let [Carte1,Carte2] = listeCartesChoisies
    Carte1.classList.remove("photorevele")
    Carte2.classList.remove("photorevele")
    listeCartesChoisies = []
}
// fonction nécessaire pour créer un délai
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
  
// TODO : prendre en compte le nombre de tentative Ratées pour faire un score élaboré
function afficherLeNbDoublonsATrouver(score, nombreTentativesRatées) {
    let messagePersonnalise = document.getElementById("LeNbDoublonsATrouver")
    messagePersonnalise.innerText= `Il reste ${scoreMax-score} doublons à trouver`
}

function calculScore() {
    score++
    console.log(score)
    if (score===nombreDeDoublons) {
    console.log("Partie Fini")
    }
}

/**
 * Renvoie true si les deux cartes retournées sont identiques, false dans l'autre cas
 * @return {boolean} 
 */
function comparerDeuxCartes() {
    let [Carte1,Carte2] = listeCartesChoisies
    if (Carte1.src===Carte2.src) {
        return true
    } else {
        return false
    }
}
/**
 * Retourne face visible les carte et les compare
 * @param {object} event est l'élément cliqué
*/
function revelerCarte(event) {
    if (count<2 && listeCartesChoisies.length<2) {
        let dosDeCarteChoisie = event.target.id
        let numeroCarteChoisie = dosDeCarteChoisie.slice(12)
        let idPhotoChoisie = `photo-${numeroCarteChoisie}`
        try {
            let carteChoisie = document.getElementById(idPhotoChoisie)
            carteChoisie.classList.add("photorevele")
            listeCartesChoisies.push(carteChoisie)
            count++
        // Si l'ajout de class ne fonctionne pas, c'est que l'élément n'est pas une carte
        } catch {
            // console.log("click en dehors cartes")
        }
        if (count>1) {   
            if (comparerDeuxCartes()===true) {
                calculScore()
                afficherLeNbDoublonsATrouver(score,nombreTentativesRatées)
                let messageEncouragement = document.getElementById("Encouragement")
                messageEncouragement.innerHTML= "Bravo ! un doublon découvert &#128522;"
                listeCartesChoisies = []
                count=0
                // retourner les cartes face caché
            } else {
                nombreTentativesRatées++
                afficherLeNbDoublonsATrouver(score,nombreTentativesRatées)
                let messageEncouragement = document.getElementById("Encouragement")
                messageEncouragement.innerText= `Dommage, essayez de mémoriser les photos derrières les cartes retournées`
                count=0
                cacherLesCartes()        
            }
        } 
    }
}

export function lancerJeu () {
    // Lancer le jeu à condition d'être sur la page jeu
    if(document.getElementById("encadre-du-jeu")) {
        creerGrilleCartes()
        document.addEventListener("click", revelerCarte)
    }
}
