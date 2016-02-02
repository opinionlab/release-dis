var r = require("../../modules/release_files.js");

describe("get", function(){
  it("does", function(){
    expect(r.get('0.0.0', "spec/support/mock/**/*")).toEqual(
      [
        { version: '0.0.0', path: 'spec/support/mock/foo/bar.js' },
        { version: '0.0.0', path: 'spec/support/mock/test.js' }
      ]
    );
  });
});


describe("get", function(){
  it("does", function(){
    var files = [
      { Key: 'index.html'},
      { Key: 'release/0.0.8/index.js'},
      { Key: 'release/0.0.8/modules/stuff.js'},
      { Key: 'release/0.0.7/index.js'},
      { Key: 'release/0.0.7/modules/foo.js'},
    ]
    expect(r.go(files)).toEqual(
      [
        { version: '0.0.8', files: [ {Key: 'release/0.0.8/index.js'}, {Key: 'release/0.0.8/modules/stuff.js'} ] },
        { version: '0.0.7', files: [ {Key: 'release/0.0.7/index.js'}, {Key: 'release/0.0.7/modules/foo.js'} ] }
      ]
    );
  });
  it("goes", function(){

    var files = [
      { Key: 'index.html'},
      { Key: 'release/0.0.8/index.js'},
      { Key: 'release/0.0.8/modules/stuff.js'},
      { Key: 'release/0.0.7/index.js'},
      { Key: 'release/0.0.7/modules/foo.js'},
      { Key: 'c/walmart/foo.js'},
    ]
    expect(r.matching(files, 'release')).toEqual(
      [
        { Key: 'release/0.0.8/index.js'},
        { Key: 'release/0.0.8/modules/stuff.js'},
        { Key: 'release/0.0.7/index.js'},
        { Key: 'release/0.0.7/modules/foo.js'}
      ]
    )
  })
});

