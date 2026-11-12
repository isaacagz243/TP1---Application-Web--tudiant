const activites = [
    {
        id: "conference",
        titre: "Conférence : l'IA en éducation",
        categorie: "Universitaire",
        date: "29 octobre 2026, 13 h 30",
        lieu: "Pavillon Ringuet, salle 1012",
        places: "80",
        prix: "Gratuit",
        image: "images/conference.svg",
        alt: "Illustration d'une conférence",
        description: "Une professeure du département d'informatique vient parler de l'intelligence artificielle et de comment elle change notre façon d'étudier."
    },
    {
        id: "atelier",
        titre: "Atelier CV et entrevue",
        categorie: "Universitaire",
        date: "5 novembre 2026, 12 h",
        lieu: "Pavillon Albert-Tessier",
        places: "25",
        prix: "Gratuit",
        image: "images/atelier.svg",
        alt: "Illustration d'un atelier en petit groupe",
        description: "Atelier pratique avec le service de placement pour améliorer ton CV et te préparer à une entrevue de stage."
    },
    {
        id: "soccer",
        titre: "Tournoi de soccer intérieur",
        categorie: "Parauniversitaire",
        date: "8 novembre 2026, 9 h",
        lieu: "CAPS (gymnase)",
        places: "48",
        prix: "5 $",
        image: "images/sport.svg",
        alt: "Illustration d'un ballon et d'activités sportives",
        description: "Forme ton équipe ou inscris-toi seul, on va te placer dans une équipe. Tous les niveaux sont acceptés."
    },
    {
        id: "culture",
        titre: "Soirée culturelle internationale",
        categorie: "Parauniversitaire",
        date: "14 novembre 2026, 18 h",
        lieu: "Café étudiant",
        places: "120",
        prix: "10 $ (repas inclus)",
        image: "images/culture.svg",
        alt: "Illustration d'une activité culturelle",
        description: "Musique, danse et nourriture de plusieurs pays, préparées par les associations étudiantes internationales."
    },
    {
        id: "benevolat",
        titre: "Collecte de denrées (bénévolat)",
        categorie: "Parauniversitaire",
        date: "21 novembre 2026, 10 h",
        lieu: "Hall principal",
        places: "30",
        prix: "Gratuit",
        image: "images/associatif.svg",
        alt: "Illustration de personnes qui s'entraident",
        description: "Aide l'association étudiante à ramasser des denrées pour la banque alimentaire du campus."
    }
];

function trouverActivite(id) {
    for (let i = 0; i < activites.length; i++) {
        if (activites[i].id === id) {
            return activites[i];
        }
    }
    return null;
}

function ajouterLigne(liste, etiquette, valeur) {
    const li = document.createElement("li");
    const nom = document.createElement("span");
    nom.className = "etiquette";
    nom.textContent = etiquette;
    li.appendChild(nom);
    li.appendChild(document.createTextNode(" " + valeur));
    liste.appendChild(li);
}

function afficherActivite(activite) {
    const fiche = document.getElementById("fiche");
    document.title = activite.titre + " — Campus Hub";

    const image = document.createElement("img");
    image.src = activite.image;
    image.alt = activite.alt;

    const titre = document.createElement("h2");
    titre.textContent = activite.titre;

    const categorie = document.createElement("p");
    categorie.className = "type";
    categorie.textContent = activite.categorie;

    const description = document.createElement("p");
    description.className = "description";
    description.textContent = activite.description;

    const meta = document.createElement("ul");
    meta.className = "meta";
    ajouterLigne(meta, "Date :", activite.date);
    ajouterLigne(meta, "Lieu :", activite.lieu);
    ajouterLigne(meta, "Places :", activite.places);
    ajouterLigne(meta, "Prix :", activite.prix);

    const actions = document.createElement("div");
    actions.className = "fiche-actions";

    const inscrire = document.createElement("a");
    inscrire.className = "btn primaire";
    inscrire.href = "inscription.html?activite=" + encodeURIComponent(activite.id);
    inscrire.textContent = "S'inscrire";

    const retour = document.createElement("a");
    retour.className = "btn";
    retour.href = "activites.html";
    retour.textContent = "Retour au catalogue";

    actions.appendChild(inscrire);
    actions.appendChild(retour);

    fiche.appendChild(image);
    fiche.appendChild(titre);
    fiche.appendChild(categorie);
    fiche.appendChild(description);
    fiche.appendChild(meta);
    fiche.appendChild(actions);
    fiche.hidden = false;
}

function afficherIntrouvable() {
    const vide = document.getElementById("fiche-vide");
    vide.hidden = false;
}

const identifiant = new URLSearchParams(window.location.search).get("id");
const activiteChoisie = trouverActivite(identifiant);

if (activiteChoisie) {
    afficherActivite(activiteChoisie);
} else {
    afficherIntrouvable();
}
