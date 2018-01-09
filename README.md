DEPRECATED: Probably not needed anymore. Use the code directly.
====================================
Things have evolved and you have more choice than ever. You probably don't need this package anymore.

Replacement strategy
====================

Nowaday, you could probably just add the npm packages to your codebase

    npm install path
    npm install fs

Then, add on the server side:

    import path from 'path'
    import fs from 'fs';

    Meteor.startup(function(){
      Meteor.deployDate = (new Date(fs.statSync(path.resolve('.')+'/config.json').mtime)).toISOString();
    });

    Meteor.methods({
      lastDeployed: function() {
        return Meteor.deployDate;
      },
    });

On the client side you could call:

    Meteor.startup(function(){
      Meteor.deployDate = new ReactiveVar();

      Meteor.call('lastDeployed', (error, data) => {
        Meteor.deployDate.set(data);
      });

      Template.registerHelper('lastDeployDate', function(){
        return Meteor.deployDate.get();
      });
    });

This would allow you to just do your own formating

In Blaze:

    {{formatDate lastDeployDate 'stamp'}}
    {{formatDate lastDeployDate 'dddd, MMMM Do YYYY, h:mm:ss a Z'}}



In JS (using moment, but you could use "new Date().toISOString()" now as well):

    const lastRedeploy = moment(Meteor.call("lastDeployed")).toISOString();


There, you probably didn't need a package and 100KBs of dependencies to make such a simple thing.


One more thing that may help if you're just starting:

My formatting function is as such:

    import moment from 'moment';

    export const dateFormats = {
      short: "DD MMMM YYYY",
      long: "dddd DD.MM.YYYY HH:mm"
    };

    export function formatDate(datetime, format) { //formatDate(datetime, format);
      if (moment) {
        if(format == "stamp"){
          return moment(datetime).fromNow();
        }else if(format =="ISO"){
          return moment(datetime).toISOString();
        }else{
          // can use other formats like 'lll' too
          return moment(datetime).format(dateFormats[format] || format);
        }
      } else {
        return datetime;
      }
    }

    Template.registerHelper("formatDate", formatDate);

You can just import it using

    import { formatDate } from '/imports/tools/dateformating.js';






OLD DOCUMENTATION:
------------------------------------

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
This package provides the '{{> deployDate 'lll'}}' template. that takes a keyword in argument. Uses copleykj:livestamp or momentjs:moment or "meteor npm install --save moment" to display a human-readable message "8 days ago". (Add these yourself, no hard dependencies in the package.)

The keyword option could be:
- "timestamp", "stamp", "livestamp" uses copleykj:livestamp to provide you with a html timestamp
- "fromNow", "since" uses momentjs:moment to provide you with a formated date "10 hours ago" using moment(/* */).fromNow()
- "fromNowClean" does the same but without the suffix "10 hours", using moment(/* */).fromNow(true)
- any other format string from moment such as "dddd, MMM Do YYYY, h:mm:ss a Z" or "ddd, hA", for exemple. Full documentation on formats: http://momentjs.com/docs/#/displaying/format/


v0.0.2
- uses moment from npm if it is existing instead of the atmosphere package (but it's still not included, bring your own)
- fixed link to github repository
