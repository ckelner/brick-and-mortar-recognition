var g_isProd=true;
if(location.href.indexOf("mosaic-qa")!==-1){
	g_isProd=false;
}
if(g_isProd){
	Guests = new Meteor.Collection("guests_prod");
}else{
	Guests = new Meteor.Collection("guests");
}

// Publish complete set of lists to all clients.
Meteor.publish('guests', function () {
	return Guests.find();
});
