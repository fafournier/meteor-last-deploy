if (Meteor.isServer) {
  var path = Npm.require('path');                                                        // 97
  var fs = Npm.require('fs');

  Meteor.methods({
    lastDeployed: function() {
      var stats = fs.statSync(path.resolve('.')+'/config.json');
      // console.log("deployStats", stats);
      return stats.mtime;
    },
  });
}
