// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyB_ADo7c3fGSXwk-7LZekUFgWKLtF5GbDQ",
    authDomain: "soccerbrawl-c2810.firebaseapp.com",
    databaseURL: "https://soccerbrawl-c2810.firebaseio.com",
    projectId: "soccerbrawl-c2810",
    storageBucket: "soccerbrawl-c2810.appspot.com",
    messagingSenderId: "799241345359"
  },
  admins: ['jorge@unimicro.no', 'jorgeparent@gmail.com']
};
