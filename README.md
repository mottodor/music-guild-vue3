# Music Guild

### Pre-Requisites

- Create Firebase Project
- Enable Auth, Firestore and Storage

## Steps to run:

- Clone the project using the command "git clone https://github.com/mottodor/music-guild-vue3.git"
- Run the command "npm i"
- Run the command "firebase init", and choose: Firestore, Hosting, Storage and "dist" folder for public directory
- Add "firebase" directory in src and there create config.js:

```
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration 
const firebaseConfig = {
    apiKey: 
    authDomain: 
    projectId: 
    storageBucket:
    messagingSenderId: 
    appId: 
}

// Initialize Firebase
const project = initializeApp(firebaseConfig)

// Initialize Firestore
const projectFirestore = getFirestore(project)

// Initialize Auth
const projectAuth = getAuth(project)

// Initialize Storage
const projectStorage = getStorage(project)

export { project, projectFirestore, projectAuth, projectStorage }

```

### Compiles and hot-reloads for development

```
npm run serve
```
