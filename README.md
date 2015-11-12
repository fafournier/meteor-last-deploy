last-update
====================================

This package helps you display the last deployment date of the project.

Initially forked from https://github.com/monbro/meteor-last-software-release-package to remove older dependencies that were incompatible with some new project, then redone to remove session use.



# Usage
Meteor.call('lastDeployed', function(err, data) {
  // do something with "data"
});

Optionally, use copleykj:livestamp or momentjs:moment to display a human-readable message "8 days ago". (Add these yourself, no hard dependencies)
