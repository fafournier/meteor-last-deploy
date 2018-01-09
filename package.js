Package.describe({
  name: 'fafournier:last-deploy',
  summary: 'DEPRECATED: Get the last deployment date.',
  version: '0.0.5',
  git: 'https://github.com/fafournier/meteor-last-deploy',
  documentation: 'README.md'
});


// Npm.depends({
//   "path": "0.3.1",
//   "fs": "3.1.3",
// });

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.use('ecmascript@0.1.3');
  api.use('templating', 'client');
  api.use('reactive-var', 'client');
  api.use('momentjs:moment@2.10.0', 'client', {weak: true});
  api.use('copleykj:livestamp@1.1.2', 'client', {weak: true});
  api.addFiles('server.js','server');
  api.addFiles('deployDate.html', 'client');
  api.addFiles('deployDate.js','client');
  api.export( 'methods', [ 'client', 'server' ] ) ;
});


// Package.onTest(function(api) {
//   api.versionsFrom('1.1.0.2');
//   api.use('ecmascript@0.1.3');
//   api.use( ['blaze@2.0.0', 'templating@1.0.5', 'ui', 'meteor', 'reactive-var']);
//   api.use('copleykj:livestamp@1.1.2', 'client');
//   api.addFiles('lib/client.js','client');
//   api.addFiles('lib/server.js','server');
//   api.addFiles('lib/deploy_date.html');
//   api.export( 'methods', [ 'client', 'server' ] ) ;
//
//   api.use('tinytest');
// });
