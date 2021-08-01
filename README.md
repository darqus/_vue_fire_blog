# fireblog

## Project setup
```
$ yarn install
$ npm i
$ npm i --legacy-peer-deps
```

### Compiles and hot-reloads for development
```
$ npm run serve
```

### Compiles and minifies for production
```
$ npm run build
```

### Lints and fixes files
```
$ npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Firebase
https://firebase.google.com/docs/hosting/quickstart#initialize



```
# npm i -g firebase-tools
or
# curl -sL https://firebase.tools | bash

```

```
$ npm init
$ npm install --save firebase
```

```
$ firebase login
```

https://console.firebase.google.com/project/fire-blog-vue-js/hosting/sites
click button "Get started"


```
$ firebase init hosting
```

"Don't set up a default project"

? What do you want to use as your public directory? dist
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
? Set up automatic builds and deploys with GitHub? No
+  Wrote dist/index.html

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

### config firebase
.env.local

```
VUE_APP_UIDS = []

VUE_APP_API_KEY = ''
VUE_APP_AUTH_DOMAIN = ''
VUE_APP_PROJECT_ID = ''
VUE_APP_STORAGE_BUCKET = ''
VUE_APP_MESSAGING_SENDER_ID = ''
VUE_APP_APP_ID = ''
```

VUE_APP_UIDS - array of uids admins

Project Console: https://console.firebase.google.com/project/fire-blog-vue-js/overview

Hosting URL1: https://fire-blog-vue-js.web.app

Hosting URL2: https://fire-blog-vue-js.firebaseapp.com/


### Yarn update deps:

v1
```
$ yarn upgrade-interactive --latest
```

v2
```
$ yarn upgrade-interactive
```
