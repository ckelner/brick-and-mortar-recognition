Guests = new Meteor.Collection("guests");
Time = new Meteor.Collection("time");
G_HoursInDay = [{ "hour": "00" },{ "hour": "01" },{ "hour": "02" },{ "hour": "03" },{ "hour": "04" },{ "hour": "05" },
	{ "hour": "06" },{ "hour": "07" },{ "hour": "08" },{ "hour": "09" },{ "hour": "10" },{ "hour": "11" },
	{ "hour": "12" },{ "hour": "13" },{ "hour": "14" },{ "hour": "15" },{ "hour": "16" },{ "hour": "17" },
	{ "hour": "18" },{ "hour": "19" },{ "hour": "20" },{ "hour": "21" },{ "hour": "22" },{ "hour": "23" }];
// Subscribe to 'guests'
Meteor.subscribe('guests', function(){});
//determine if concierge view or not
Template.content.is_concierge=function(){
	if(getURLParameter("concierge")==="true"){
		return true;
	}else{
		return false;
	}
}
//determine if concierge view or not
Template.content.is_admin=function(){
	if(getURLParameter("admin")==="br@ndinn0v@ti0n"){
		return true;
	}else{
		return false;
	}
}
//determine if concierge view or not
Template.content.find_guest=function(){
	if(getURLParameter("admin")==="br@ndinn0v@ti0n"){
		if(getURLParameter("fg")==="true"){
			return true;
		}else{
			return false;
		}
	}else{
		return false;
	}
}
function getURLParameter(name){
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}
//hours & guests in the day
Template.timeline.hours=function(){
	return G_HoursInDay;
}
//helper function to see if guest time matches the column time
Handlebars.registerHelper('ifTimeMatches',function(gTime, guestTime){
	if(gTime===guestTime.substring(0,2)) {
		return true;
	}else{
		return false;
	}
});
//helper function to see if guest time matches the column time
Handlebars.registerHelper('ifNumMatches',function(num1, num2){
	if(num1===num2) {
		return true;
	}else{
		return false;
	}
});
//helper function to see if guest time matches the column time
Handlebars.registerHelper('ifTimeMatchesCurrentHr',function(gTime){
	if(gTime===moment().format('HH')) {
		return true;
	}else{
		return false;
	}
});
