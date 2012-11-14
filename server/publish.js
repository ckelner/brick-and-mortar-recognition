Guests = new Meteor.Collection("guests");

// Publish complete set of lists to all clients.
Meteor.publish('guests', function () {
	return Guests.find();
});
