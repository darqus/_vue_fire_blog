# FireBlog ✌👍😁🎈

## Description
Based on Vue 2

### Basic blog for write your posts:
* blog allows you to work with blogs (create, read, update, delete - CRUD)
* work with profile: create account, update accounts data, login, logout (use firebase email auth)
* use tiptap 2x as text editor
* layouts use only CSS grid, without CUI frameworks, without CSS flexbox

## Project setup
```sh
$ yarn install
$ npm i
$ npm i --legacy-peer-deps
```

### Compiles and hot-reloads for development
```sh
$ npm run serve
$ yarn serve
```

### Compiles and minifies for production
```sh
$ npm run build
$ yarn build
```

### Lints and fixes files
```sh
$ npm run lint
$ yarn lint
```

### Deploy you project to Firebase
```sh
$ npm run deploy
$ yarn deploy
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Initial Firebase
https://firebase.google.com/docs/hosting/quickstart#initialize



```sh
# npm i -g firebase-tools
or
# curl -sL https://firebase.tools | bash

```

```sh
$ npm init
$ npm install --save firebase
$ yarn add firebase
```

```sh
$ firebase login
```

https://console.firebase.google.com/project/fire-blog-vue-js/hosting/sites
click button "Get started"


```sh
$ firebase init hosting
```


### "Don't set up a default project"

* ? What do you want to use as your public directory? dist
* ? Configure as a single-page app (rewrite all urls to /index.html)? Yes
* ? Set up automatic builds and deploys with GitHub? No
* ?  Wrote dist/index.html? Yes


```sh
$ firebase emulators:start
```


```sh
$ firebase deploy --only hosting
$ firebase deploy --only hosting:fire-blog-vue-js --project fire-blog-vue-js
```

if you have deploy troubles
```sh
$ firebase logout
$ firebase login
```

https://firebase.google.com/docs/web/modular-upgrade
https://firebase.google.com/docs/web/modular-upgrade#update_imports_to_v9_compat

### Local project firebase config
```js
VUE_APP_UIDS = []

VUE_APP_API_KEY = ''
VUE_APP_AUTH_DOMAIN = ''
VUE_APP_PROJECT_ID = ''
VUE_APP_STORAGE_BUCKET = ''
VUE_APP_MESSAGING_SENDER_ID = ''
VUE_APP_APP_ID = ''
```

Fill it from your Firebase project settings and save to .env.local

VUE_APP_UIDS - array of uids blog admins

Project Console: https://console.firebase.google.com/project/fire-blog-vue-js/overview

## Demo:
* Firebase Hosting URL1: https://fire-blog-vue-js.web.app
* Firebase Hosting URL2: https://fire-blog-vue-js.firebaseapp.com


### Material Design Icons
https://materialdesignicons.com/

### Yarn interactive update deps:

```sh
$ yarn upgrade-interactive --latest
```

### Clean cache
```sh
$ yarn cache clean
```
