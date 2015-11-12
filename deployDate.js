if (Meteor.isClient) {
  Template = Package.templating.Template;
  moment = (Package && Package["momentjs:moment"] && Package["momentjs:moment"].moment )? Package["momentjs:moment"].moment : null;

  Template.deployDate.onCreated(function(){
    var instance = this;
    instance.deployDate = new ReactiveVar(null);
    Meteor.call('lastDeployed', function(err, data) {
      instance.deployDate.set(data);
    });
  });

  Template.deployDate.helpers({
    lastDeployed: function() {
      return Template.instance().deployDate.get();
    },
    isTimeStampRequested: function(){
      return (!!this && this == "timestamp" || this == "stamp" || this == "livestamp");
    },
    isMomentTimeStamp: function(){
      return (!!this && this == "fromNow" || this == "fromNowClean" || this == "since");
    },
    hasFormat: function(){
      return (!!this);
    },
    checkLiveStampPackage: function(){
      if(!Blaze._globalHelpers.livestamp){
        console.warn("add the copleykj:livestamp package to use the livestamp options with last-deploy");
      }
    },
    formatMomentTimeStamp: function(){
      if(moment){
        if(this == "fromNowClean"){
          var ret = moment(Template.instance().deployDate.get()).fromNow(true);
          if(ret == "Invalid date")
            return ""; //fetching date
          else
            return ret;
        }else {
          var ret = moment(Template.instance().deployDate.get()).fromNow();
          if(ret == "Invalid date")
            return ""; //fetching date
          else
            return ret;
        }
      }else{
        console.warn("add the momentjs:moment package to use the advanced formating options with last-deploy");
      }
    },
    formatDate: function () {
      if(moment){
        var ret = moment(Template.instance().deployDate.get()).format(this);
        if(ret == "Invalid date")
          return ""; //fetching date
        else
          return ret;
      }else{
        console.warn("add the momentjs:moment package to use the advanced formating options with last-deploy");
        return Template.instance().deployDate.get();
      }
    }
  });
}
