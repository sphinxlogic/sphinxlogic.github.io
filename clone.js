
var clone = require('clone-repos');

clone({owner: 'llvm'}, function(err, repos) {
  if (err) return console.error(err);
  console.log('cloned', repos);
});