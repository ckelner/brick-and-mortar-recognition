Guests = new Meteor.Collection("guests");
Time = new Meteor.Collection("time");
// Subscribe to 'guests'
Meteor.subscribe('guests', function () {});
// Subscribe to 'time'
Meteor.subscribe('time', function () {});

//determine if concierge view or not
Template.content.is_concierge = function () {
	if(getURLParameter("concierge")==="true"){
		return true;
	}else{
		return false;
	}
}
//show guests view (if not some other view)
Template.timeline.guests = function () {
	return Guests.find({"arrivaldate": moment().format('YYYY-MM-D')});
}

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

Template.timeline.ifTimeMatches = function(gTime, options){
	if(gTime===this.arrivaltime.substring(0,2)) {
		return options.fn(this);
	}
	if(options){
		return options.inverse(this);
	}
}