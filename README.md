Projet : Clone de Twitter basique (Version Microservices / Multithreading / Cache Redis)
Descriptif Technique :
Architecture Globale :

    Architecture : Microservices avec communication inter-services via API REST ou message broker (RabbitMQ/Kafka).
    Backend : Node.js avec gestion du multithreading (via worker_threads) pour optimiser les requêtes concurrentes.
    Base de données :
        Redis : Utilisé comme cache pour les données fréquemment consultées (messages du mur).
        MySQL : Base de données principale pour stocker les informations persistantes (messages, pseudonymes).
    Frontend :
        React.js : Interface utilisateur dynamique.
        HTML/CSS : Structure et design de la page.
    Tests :
        Jest : Pour les tests unitaires et d'intégration.

Descriptif Fonctionnel :
Fonctionnalités Principales :

    Choix de pseudonyme :
        Un utilisateur peut choisir un pseudonyme sans créer de compte.
        Le pseudonyme est validé et stocké en mémoire pendant la session.

    Publication de messages :
        Un utilisateur peut publier un message sur un mur commun.
        Les messages sont immédiatement visibles par tous les utilisateurs sans rechargement de la page.

    Gestion du cache et de la persistance :
        Les messages sont d'abord récupérés depuis Redis (cache).
        Si les messages ne sont pas dans Redis, ils sont récupérés depuis MySQL, puis stockés dans Redis pour les requêtes futures.
        En cas d'indisponibilité de Redis, le système bascule sur MySQL sans affecter l'expérience utilisateur.

    Tests automatisés :
        Des tests unitaires et d'intégration sont implémentés pour valider le bon fonctionnement du système.

Technologies Utilisées :
Backend (Microservices) :

    Auth Service :
        Technologies : Node.js, Express.js, JWT (JSON Web Tokens).
        Responsabilité : Gestion des pseudonymes et des sessions utilisateurs.
        Endpoints :
            POST /auth/choose-pseudo : Choix et validation du pseudonyme.
            GET /auth/validate-session : Validation de la session utilisateur.

    Post Service :
        Technologies : Node.js, Express.js, multithreading (worker_threads).
        Responsabilité : Gestion de la publication et de la récupération des messages.
        Endpoints :
            POST /post : Publication d'un message.
            GET /posts : Récupération des messages du mur.

    Cache Service :
        Technologies : Node.js, Redis, multithreading (worker_threads).
        Responsabilité : Gestion du cache Redis pour les messages.
        Endpoints :
            GET /cache/posts : Récupération des messages depuis Redis.
            POST /cache/posts : Stockage des messages dans Redis.

    Database Service :
        Technologies : Node.js, MySQL, multithreading (worker_threads).
        Responsabilité : Gestion des interactions avec la base de données MySQL.
        Endpoints :
            GET /db/posts : Récupération des messages depuis MySQL.
            POST /db/posts : Stockage des messages dans MySQL.

Frontend :

    Technologies : React.js, HTML, CSS.
    Responsabilité : Interface utilisateur pour choisir un pseudonyme, publier des messages et afficher le mur commun.
    Fonctionnalités :
        Affichage en temps réel des messages.
        Formulaire de publication de messages.
        Gestion des pseudonymes.

User Stories :

    En tant qu'utilisateur, je souhaite pouvoir choisir un pseudonyme afin de publier sur le mur commun sans avoir besoin de créer de compte.
        Critère d'acceptation : L'utilisateur peut entrer un pseudonyme unique sur l'interface sans créer de compte. Le pseudonyme est validé et stocké en mémoire pendant la session.

    En tant qu'utilisateur, je souhaite pouvoir publier un message sur le mur commun pour partager des informations.
        Critère d'acceptation : L'utilisateur peut saisir un message et cliquer sur un bouton pour le publier. Le message est ajouté au mur commun et visible pour tous les autres utilisateurs.

    En tant qu'utilisateur, je veux que mes publications soient visibles immédiatement sur le mur, même si un autre utilisateur vient de publier un message.
        Critère d'acceptation : Dès qu'une publication est effectuée, elle est immédiatement visible sur le mur commun sans rechargement de la page.

    En tant que système, je veux utiliser Redis comme cache afin d'accélérer l'affichage des messages du mur commun.
        Critère d'acceptation : Les messages doivent être récupérés à partir de Redis lorsqu'ils sont déjà en cache, pour des temps de réponse rapides.

    En tant que système, je veux que les messages soient persistants dans la base de données MySQL pour éviter toute perte de données en cas de redémarrage du serveur.
        Critère d'acceptation : Si les messages ne sont pas dans Redis, ils sont récupérés depuis MySQL et affichés. Après récupération, les messages sont stockés dans Redis pour une utilisation future.

    En tant qu'utilisateur, je veux que le système affiche correctement les données du mur même si Redis n'est pas disponible, en basculant sur MySQL.
        Critère d'acceptation : Si Redis n'est pas disponible, les messages doivent être récupérés depuis MySQL sans affecter l'expérience de l'utilisateur.

    En tant que développeur, je veux que le système de publication soit testé automatiquement pour garantir son bon fonctionnement.
        Critère d'acceptation : Des tests unitaires sont écrits en utilisant Jest pour valider que la publication des messages fonctionne comme prévu.

Tests avec Jest :

    Test de publication :
        Vérifier que lorsqu'un utilisateur publie un message, il est correctement ajouté à MySQL et Redis.

    Test de récupération de données :
        Vérifier que les données sont d'abord récupérées depuis Redis et, en cas d'absence, depuis MySQL.

    Test de performance :
        Vérifier que les messages sont récupérés rapidement en utilisant Redis et que MySQL est consulté uniquement lorsque Redis est vide.

    Test de bascule Redis/MySQL :
        Vérifier que le système bascule correctement sur MySQL en cas d'indisponibilité de Redis.

