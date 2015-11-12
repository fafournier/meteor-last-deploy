last-deploy
====================================

This package helps you display the last deployment date of the project.

Initially forked from https://github.com/monbro/meteor-last-software-release-package to remove older dependencies that were incompatible with some new project, then redone to remove session use.



# Usage
## get the date from the server
On it own
    Meteor.call('lastDeployed', function(err, date) {
      // do something with "date"
    });

You could use the package simple:reactive-method to make it simpler (add it yourself)
    var date = ReactiveMethod.call("lastDeployed");

## use client template
This package provides the '{{> deployDate 'lll'}}' template. that takes a keyword in argument. Use copleykj:livestamp or momentjs:moment to display a human-readable message "8 days ago". (Add these yourself, no hard dependencies in the package)

The keyword option could be:
- "timestamp", "stamp", "livestamp" uses copleykj:livestamp to provide you with a html timestamp
- "fromNow", "since" uses momentjs:moment to provide you with a formated date "10 hours ago" using moment(/* */).fromNow()
- "fromNowClean" does the same but without the suffix "10 hours", using moment(/* */).fromNow(true)
- any other format string from moment such as "dddd, MMM Do YYYY, h:mm:ss a Z" or "ddd, hA", for exemple. Full documentation on formats: http://momentjs.com/docs/#/displaying/format/
