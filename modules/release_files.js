var glob      = require('glob');

exports.get = function (version, path) {
  return glob.sync(path, {nodir: true}).map(function (file) {
    return { version: version, path: file }
  });
}

function fetch (version, items) {
  var foundItem;
  items.forEach(function(item){
    if (item.version == version) {
      foundItem = item;
    }
  });
  return foundItem
}

function includesFn (item, items) {
  var returnVal = false
  items.forEach(function(i){
    if (i == item) {
      returnVal = true;
    }
  });
  return returnVal;
};

exports.go = function (files) {
  var items = [];
  files.map(function(file){
    var version = file.Key.split('/')[1];
    if ( !includesFn(file.Key, ['index.html', 'c/', 'releases/']) ) {
      var item = fetch (version, items);
      if (item != undefined)
        { item.files.push(file); }
      else
        { items.push({version: version, files: [file]}) }
    }
  })
  return items;
}
