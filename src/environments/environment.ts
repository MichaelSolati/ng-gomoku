// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  hmr: false,
  firebase: {
    apiKey: 'AIzaSyBUGP4ZbBYmysPyW2Bn34UsNNoWwbJHnBA',
    authDomain: 'ng-gomoku.firebaseapp.com',
    databaseURL: 'https://ng-gomoku.firebaseio.com',
    projectId: 'ng-gomoku',
    storageBucket: 'ng-gomoku.appspot.com',
    messagingSenderId: '875790008397'
  }
};
