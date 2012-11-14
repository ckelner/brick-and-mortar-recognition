// Shouldn't need this...
if (Meteor.isServer) {
	Meteor.startup(function () {
		if (Guests.find().count() === 0) {
			var guests = 
				[
					{"fname" : "Joe", 
					"lname" : "Blo", 
					"pcr" : "908127821", 
					"arrived" : false, 
					"notes" : 
						["cars", 
						"software", 
						"ihg employee" 
						], 
					"arrivaltime" : "15:00", 
					"arrivaldate" : "2012-11-14", 
					"sex" : "m"},
					
					{"fname": "Ryan",
					"lname": "Esparza",
					"pcr": "908126320",
					"arrived": false,
					"notes": 
						["Texas",
						"football",
						"mustangs"],
					"arrivaltime": "13:30",
					"arrivaldate": "2012-11-14",
					"sex": "m" },
					
					{"fname": "Scott",
					"lname": "Wolfson",
					"pcr": "908126300",
					"arrived": false,
					"notes": 
						["Texas",
						"Tupperware",
						"Running"],
					"arrivaltime": "09:30",
					"arrivaldate": "2012-11-14",
					"sex": "m" },
					
					{"fname": "Chris",
					"lname": "Kelner",
					"pcr": "908122320",
					"arrived": false,
					"notes": 
						["cars",
						"development",
						"space"],
					"arrivaltime": "10:30",
					"arrivaldate": "2012-11-14",
					"sex": "m" },
					
					{"fname": "Carolina",
					"lname": "Kelner",
					"pcr": "988126320",
					"arrived": false,
					"notes": 
						["shoes",
						"purses",
						"photography"],
					"arrivaltime": "11:30",
					"arrivaldate": "2012-11-14",
					"sex": "f" },
					
					{"fname": "David",
					"lname": "Black",
					"pcr": "9081200020",
					"arrived": false,
					"notes": 
						["cars",
						"startups",
						"cheese&crackers"],
					"arrivaltime": "14:00",
					"arrivaldate": "2012-11-14",
					"sex": "m" },
					
					{"fname": "Brian",
					"lname": "DeWitt",
					"pcr": "999926320",
					"arrived": false,
					"notes": 
						["no idea",
						"no idea",
						"no idea"],
					"arrivaltime": "11:15",
					"arrivaldate": "2012-11-14",
					"sex": "m" },
					
					{"fname": "Peter",
					"lname": "Pan",
					"pcr": "911126320",
					"arrived": false,
					"notes": 
						["magic",
						"flying",
						"lost boys"],
					"arrivaltime": "18:30",
					"arrivaldate": "2012-11-14",
					"sex": "m" },
					
					{"fname": "Jax",
					"lname": "Teller",
					"pcr": "908333330",
					"arrived": false,
					"notes": 
						["harleys",
						"guns",
						"charming"],
					"arrivaltime": "20:45",
					"arrivaldate": "2012-11-14",
					"sex": "m" },
				];
			Guests.insert(guests);
		}
	});
}
