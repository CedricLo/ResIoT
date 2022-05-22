# Res IoT  
L'objectif de ce projet est de concevoir un moyen de controler le KNX avec yun navigateur web. Nous avons donc un serveur qu'il faut connecter au KNX et deux clients un sur téléphone mobile et l'autre sur page web qu'il faut connecter au serveur.
  
## Installer le projet:
* cloner le projet :  
  `git clone git@github.com:CedricLo/ResIoT.git`

* rentrer dans le projet :   
  `cd ResIoT`
  
* intaller les dépendance du client mobile :  
  `cd ./client/app-knx`  
    `npm install`

* installer les dépendances du client web :   
  `cd ./client/web-knx`  
    `npm install`

* installer les dépendances du serveur :  
  `cd ./serveur`  
  `npm install`

## Lancer le projet
  Assurez vous que les client ont bien la même adresse IP de connexion au serveur.
  Pour cela connectez vous au réseau du knx et tapez `ipconfig` sur windows et `ifconfig` sur linux et rentrez vien l'addresse IPV4 dans les champs :
  `const wsLien = '://X.X.X.X:3030';`
  `const httpLien = 'http://X.X.X.X:8080/home';`
  des fichiers :
  `./client/web-knx/src/app.js`
  `./client/app-knx/app.js`
  Et dans les champs : 
  `const wsAddress = "http://X.X.X.X:3030"`
  du fichier :
  `./serveur/serveurExpress.js`

* rentrer dans le serveur et le lancer : 
  `cd ./serveur`
  `node serveurExpress.js`
  
* rentrer dans le client web et le lancer : 
  `cd ./client/web-knx/src`
  `npm start`

* rentrer dans le client web et le lancer : 
  `cd ./client/app-knx`
  `expo start`
