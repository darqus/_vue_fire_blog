# FireBlog ✌👍😁🎈

## Description
### Basic blog for write your posts:
- blog allows you to work with blogs (create, read, update, delete - CRUD)
- work with profile: create account, update accounts data, login, logout (use firebase email auth)
- use tiptap 2x as text editor
- layouts use only CSS grid, without CUI frameworks, without CSS flexbox

## Project setup
```
$ yarn install
$ npm i
$ npm i --legacy-peer-deps
```

### Compiles and hot-reloads for development
```
$ npm run serve
$ yarn serve
```

### Compiles and minifies for production
```
$ npm run build
$ yarn build
```

### Lints and fixes files
```
$ npm run lint
$ yarn lint
```

### Deploy you project to Firebase
```
$ npm run deploy
$ yarn deploy
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Initial Firebase
https://firebase.google.com/docs/hosting/quickstart#initialize



```
# npm i -g firebase-tools
or
# curl -sL https://firebase.tools | bash

```

```
$ npm init
$ npm install --save firebase
$ yarn add firebase
```

```
$ firebase login
```

https://console.firebase.google.com/project/fire-blog-vue-js/hosting/sites
click button "Get started"


```
$ firebase init hosting
```

```
"Don't set up a default project"

? What do you want to use as your public directory? dist
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
? Set up automatic builds and deploys with GitHub? No
+  Wrote dist/index.html
```

```
$ firebase emulators:start
```


```
$ firebase deploy --only hosting
$ firebase deploy --only hosting:fire-blog-vue-js --project fire-blog-vue-js
```

if you have deploy troubles
```
$ firebase logout
$ firebase login
```

https://firebase.google.com/docs/web/modular-upgrade
https://firebase.google.com/docs/web/modular-upgrade#update_imports_to_v9_compat

### Local project firebase config
```
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
- Firebase Hosting URL1: https://fire-blog-vue-js.web.app
- Firebase Hosting URL2: https://fire-blog-vue-js.firebaseapp.com



### Material Design Icons
https://materialdesignicons.com/

### DEV: Yarn interactive update deps:

v1:
```
$ yarn upgrade-interactive --latest
```

v2:
```
$ yarn upgrade-interactive
```
