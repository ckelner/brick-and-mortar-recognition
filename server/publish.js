MeteorEnv = function(options) {

  // Don't do anything if there's a Meteor.env already for some reason
  if (!Meteor.env) {
    Meteor.env = {};

    var path = __meteor_bootstrap__.require('path');
    var pathToConfig = process.env.HOME + '/.meteor.cfg';

    var configExists = path.existsSync(pathToConfig);
    Meteor.env.isDevelopment = configExists;
    Meteor.env.isProduction = !configExists;

  }  
};

if(MeteorEnv.isProduction){
	console.log("is prod");
	Guests = new Meteor.Collection("guests_prod");
}else{
	console.log("is dev");
	Guests = new Meteor.Collection("guests");
}

// Publish complete set of lists to all clients.
Meteor.publish('guests', function () {
	return Guests.find();
});
