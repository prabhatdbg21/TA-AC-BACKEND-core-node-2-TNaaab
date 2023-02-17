/*
Q1. Suppose on desktop, inside projects we have 2 folder each with a file
Structure is:-
Desktop
  - projects
    - client(dir)
      - index.js
    - server(dir)
      - app.js

You are currently in app.js

Write code to
  - get relative path of `index.js` 
  - get absolute path of `index.js`
*/

//    - get relative path of `index.js` 
console.log('../client/index.js');   //    ../client/index.js

//    - get absolute path of `index.js`
var path = require('path');
var absolutePath = path.join( __dirname, '..', 'client/index.js');
console.log(absolutePath);        //         /Users/prabhat/Desktop/CODE/NODEJS/TA-AC-BACKEND-core-node-2-TNaaab/block-BNaabf/projects/client/index.js
