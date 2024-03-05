/**
 * @param {Number} p est la position dans le carroussel de choix du type de carte
**/
let p=0

export function ouvrirLesOptions () {
    if (document.querySelector(".grid3")) {
        const bouttonOptions = document.querySelector(".grid3")
        const popUpBackground = document.querySelector(".popUpBackground")
        bouttonOptions.onclick = () => {
            popUpBackground.classList.add("active")
        }
        defilerLeCarroussel()
        fermerLesOptions()
    }
}
function fermerLesOptions () {
    const popUpBackground = document.querySelector(".popUpBackground")
    popUpBackground.onclick=(event) => {
        if (event.target === popUpBackground) {
            popUpBackground.classList.remove("active")
        }
    }
    const valider = document.getElementById("valider")
    valider.onclick=(event) => {
        popUpBackground.classList.remove("active")
        validerChoixTypeDeCartes ()
        
    }
}
function defilerLeCarroussel () {
    const listeCarteCarroussel = document.getElementById("liste-carte-carroussel")
    listeCarteCarroussel.style.transition = "all 0.5s ease"
    const flecheGauche = document.getElementById("gauche")
    flecheGauche.onclick=function() {
        if (p>0) {
            p--
            // listeCarteCarroussel.style.transform="transform("p*800+"px)"
            listeCarteCarroussel.style.transform = "translate("+-286*p+"px)" 
            afficherMasquer()
        }
    }
    const flecheDroite = document.getElementById("droite")
    flecheDroite.onclick=function() {
        if (p<3) {
            p++
            // listeCarteCarroussel.style.transform="transform("p*800+"px)"
            listeCarteCarroussel.style.transform="translate("+-286*p+"px)"
            afficherMasquerBouttons()
        }
    }
    
}

function afficherMasquerBouttons() {
    const nbr=4
    const flecheDroite = document.getElementById("droite")
    if(p==nbr-1) {
        flecheDroite.style.visibility = "hidden"
    } else {
        flecheDroite.style.visibility = "visible"
    }
    const flecheGauche = document.getElementById("gauche")
    if(p==0) {
        flecheGauche.style.visibility = "hidden"
    } else {
        flecheGauche.style.visibility = "visible"
    }
}

function validerChoixTypeDeCartes () {
    window.localStorage.setItem("ChoixTypeDeCartes",p)
    
}
