var isProd=true;

if(isProd){
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
