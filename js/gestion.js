const titre = document.getElementById("titre");
const categorie = document.getElementById("categorie");
const date = document.getElementById("date");
const heure = document.getElementById("heure");
const lieu = document.getElementById("lieu");
const places = document.getElementById("places");
const image = document.getElementById("image");
const resume = document.getElementById("resume");
const description = document.getElementById("description");
const boutonAjouter = document.getElementById("btnAjouter");
const boutonAnnuler = document.getElementById("btnAnnuler");
const titreForm = document.getElementById("titreForm");
const lignes = document.getElementById("lignes");
const message = document.getElementById("msg");
const texteVide = document.getElementById("vide");
const formulaire = document.querySelector("#inscription form");

let activites = [
    {
        id: 1,
        titre: "Conference : l'IA en education",
        categorie: "Conference",
        date: "2026-10-29",
        heure: "13:30",
        lieu: "Pavillon Ringuet, salle 1012",
        places: 80,
        image: "images/conference.svg",
        resume: "Une conference sur l'intelligence artificielle en education.",
        description: "Une professeure du departement d'informatique vient parler de l'intelligence artificielle et de comment elle change notre facon d'etudier."
    },
    {
        id: 2,
        titre: "Atelier CV et entrevue",
        categorie: "Atelier",
        date: "2026-11-05",
        heure: "12:00",
        lieu: "Pavillon Albert-Tessier",
        places: 25,
        image: "images/atelier.svg",
        resume: "Un atelier pratique pour ameliorer son CV.",
        description: "Atelier pratique avec le service de placement pour ameliorer ton CV et te preparer a une entrevue de stage."
    },
    {
        id: 3,
        titre: "Tournoi de soccer interieur",
        categorie: "Sport",
        date: "2026-11-08",
        heure: "09:00",
        lieu: "CAPS (gymnase)",
        places: 48,
        image: "images/sport.svg",
        resume: "Un tournoi de soccer ouvert a tous les niveaux.",
        description: "Forme ton equipe ou inscris-toi seul, on va te placer dans une equipe. Tous les niveaux sont acceptes."
    },
    {
        id: 4,
        titre: "Soiree culturelle internationale",
        categorie: "Culture",
        date: "2026-11-14",
        heure: "18:00",
        lieu: "Cafe etudiant",
        places: 120,
        image: "images/culture.svg",
        resume: "Musique, danse et nourriture de plusieurs pays.",
        description: "Musique, danse et nourriture de plusieurs pays, preparees par les associations etudiantes internationales."
    },
    {
        id: 5,
        titre: "Collecte de denrees (benevolat)",
        categorie: "Association",
        date: "2026-11-21",
        heure: "10:00",
        lieu: "Hall principal",
        places: 30,
        image: "images/associatif.svg",
        resume: "Une collecte pour la banque alimentaire du campus.",
        description: "Aide l'association etudiante a ramasser des denrees pour la banque alimentaire du campus."
    }
];

const donneesSauvegardees = localStorage.getItem("campusHubActivites");
if (donneesSauvegardees !== null) {
    activites = JSON.parse(donneesSauvegardees);
}
let indiceModification = -1;
function sauvegarderActivites() {
    localStorage.setItem("campusHubActivites", JSON.stringify(activites));
}
function afficherMessage(texte) {
    message.textContent = texte;
    message.classList.remove("cache");
}
function effacerErreurs() {
    document.getElementById("err-titre").textContent = "";
    document.getElementById("err-categorie").textContent = "";
    document.getElementById("err-date").textContent = "";
    document.getElementById("err-heure").textContent = "";
    document.getElementById("err-lieu").textContent = "";
    document.getElementById("err-places").textContent = "";
    document.getElementById("err-resume").textContent = "";
    document.getElementById("err-description").textContent = "";
}
function verifierFormulaire() {
    let valide = true;
    effacerErreurs();

    if (titre.value.trim() === "") {
        document.getElementById("err-titre").textContent = "Entre le titre de l'activite.";
        valide = false;
    }

    if (categorie.value === "") {
        document.getElementById("err-categorie").textContent = "Choisis une categorie.";
        valide = false;
    }

    if (date.value === "") {
        document.getElementById("err-date").textContent = "Choisis une date.";
        valide = false;
    }

    if (heure.value === "") {
        document.getElementById("err-heure").textContent = "Choisis une heure.";
        valide = false;
    }

    if (lieu.value.trim() === "") {
        document.getElementById("err-lieu").textContent = "Entre le lieu de l'activite.";
        valide = false;
    }

    if (places.value === "" || Number(places.value) < 0) {
        document.getElementById("err-places").textContent = "Entre un nombre de places valide.";
        valide = false;
    }

    if (resume.value.trim() === "") {
        document.getElementById("err-resume").textContent = "Entre une courte description.";
        valide = false;
    }

    if (description.value.trim() === "") {
        document.getElementById("err-description").textContent = "Entre la description complete.";
        valide = false;
    }

    return valide;
}
function prochainId() {
    let plusGrand = 0;

    for (let i = 0; i < activites.length; i++) {
        if (activites[i].id > plusGrand) {
            plusGrand = activites[i].id;
        }
    }

    return plusGrand + 1;
}
