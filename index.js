#! /usr/bin/env node

var colors = require('colors');
var argv = require('yargs')
.demand(['version'])
.argv;

var git = require(__dirname + '/modules/git.js');
var release = require(__dirname + '/modules/release.js');


// 1. git tag and push
git.tag(argv.version);

// 2. upload the release to s3
var promise = release.publish(argv.version);

promise.then(function (publishedFiles) {
  return release.getBucketListing();
}).then(function (files){
  return release.buildPage(files);
}).then(function (obj){
  console.log(
    colors.green('\n' + argv.version + ' has been released! ==>'), colors.cyan(obj.Location), '\n'
  );
}).catch(function (err){
  console.log(err.name.red, err.message.red);
})

