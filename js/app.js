document.addEventListener('DOMContentLoaded', () => {
    // Sélection des éléments du DOM
    const form = document.querySelector('#inscription form');
    const msgZone = document.getElementById('msg');

    // Fonction utilitaire pour afficher un message dans votre balise <p id="msg">
    function afficherMessage(texte, estErreur = false) {
        msgZone.textContent = texte;
        msgZone.classList.remove('cache');
        
        
        msgZone.style.padding = '12px';
        msgZone.style.borderRadius = '6px';
        msgZone.style.fontWeight = 'bold';
        if (estErreur) {
            msgZone.style.backgroundColor = '#fdecea';
            msgZone.style.color = '#b71c1c';
        } else {
            msgZone.style.backgroundColor = '#e8f5e9';
            msgZone.style.color = '#1b5e20';
        }
    }

    // Écoute de la soumission du formulaire
    form.addEventListener('submit', function (event) {
        
        event.preventDefault();

        const nom = document.getElementById('nom').value.trim();
        const prenom = document.getElementById('prenom').value.trim();
        const courriel = document.getElementById('courriel').value.trim();
        const programme = document.getElementById('programme').value;
        const session = Number(document.getElementById('session').value);
        const activiteSelect = document.getElementById('activite');
        const activiteCode = activiteSelect.value;
        const activiteNom = activiteSelect.options[activiteSelect.selectedIndex].text;
        const commentaire = document.getElementById('commentaire').value.trim();

        // Bouton radio sélectionné
        const participationRadio = document.querySelector('input[name="participation"]:checked');
        const participation = participationRadio ? participationRadio.value : '';

        // Cases à cocher sélectionnées 
        const preferences = [];
        document.querySelectorAll('input[name="preferences"]:checked').forEach((checkbox) => {
            preferences.push(checkbox.value);
        });

        // 2. Validation supplémentaire 
        if (!courriel.toLowerCase().endsWith('@uqtr.ca')) {
            afficherMessage('Veuillez utiliser une adresse courriel valide se terminant par @uqtr.ca.', true);
            document.getElementById('courriel').focus();
            return;
        }

        // 3. Création de l'objet d'inscription
        const nouvelleInscription = {
            id: Date.now(), // Identifiant unique basé sur l'heure
            nom,
            prenom,
            courriel,
            programme: programme || 'Non précisé',
            session,
            activiteCode,
            activiteNom,
            participation,
            preferences,
            commentaire,
            dateInscription: new Date().toLocaleDateString('fr-CA')
        };

        // 4. Sauvegarde dans localStorage (pour réutilisation dans gestion.html)
        const inscriptionsExistantes = JSON.parse(localStorage.getItem('campusHub_inscriptions')) || [];
        inscriptionsExistantes.push(nouvelleInscription);
        localStorage.setItem('campusHub_inscriptions', JSON.stringify(inscriptionsExistantes));

        // 5. Confirmation visuelle et réinitialisation
        afficherMessage(`Merci ${prenom} ! Ton inscription à « ${activiteNom} » a bien été enregistrée.`);
        form.reset();
    });

    // Effacer le message si l'utilisateur clique sur le bouton "Effacer"
    form.addEventListener('reset', () => {
        msgZone.classList.add('cache');
        msgZone.textContent = '';
    });
});