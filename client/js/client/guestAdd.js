function lastNameDataErrTestGA(){
	var lastname=$("#addGuestLname").val();
	var isErr=false;
	if(lastname.length<1){
		lastNameErrGA('blank');
		isErr=true;
	}else if(!(/^[a-zA-Z'-]+$/.test(lastname))){
		lastNameErrGA('badchar');
		isErr=true;
	}
	if(lastname.length>30){
		lastNameErrGA('toolong');
		isErr=true;
	}
	if(isErr===false){
		hideErrorLNameGA();
	}
	return isErr;
}
function lastNameErrGA(err){
	$('#addGuestLNameControlGrp').addClass('error');
	if(err==='blank'){
		var helpDiv=$('#addGuestLNameHelpErrBlank');
		helpDiv.css('display','block');
		helpDiv.css('visibility','visible');
	}else if(err==='toolong'){
		var helpDiv=$('#addGuestLNameHelpErrTooLong');
		helpDiv.css('display','block');
		helpDiv.css('visibility','visible');
	}else{
		var helpDiv=$('#addGuestLNameHelpErrBad');
		helpDiv.css('display','block');
		helpDiv.css('visibility','visible');
	}
}
function hideErrorLNameGA(){
	$('#addGuestLNameControlGrp').removeClass('error');
	$('#addGuestLNameHelpErrBlank').hide();
	$('#addGuestLNameHelpErrBad').hide();
	$('#addGuestLNameHelpErrTooLong').hide()
}
function pNameDataErrTestGA(){
	var lastnameP=$("#addGuestPname").val();
	var isErr=false;
	if(!(/^[a-zA-Z'-]+$/.test(lastnameP))){
		if(lastnameP.length>0){
			pNameErrGA('badchar');
			isErr=true;
		}
	}
	if(lastnameP.length>40){
		pNameErrGA('toolong');
		isErr=true;
	}
	if(isErr===false){
		hideErrorPNameGA();
	}
	return isErr;
}
function pNameErrGA(err){
	$('#addGuestPNameControlGrp').addClass('error');
	if(err==='toolong'){
		var helpDiv=$('#addGuestPNameHelpErrTooLong');
		helpDiv.css('display','block');
		helpDiv.css('visibility','visible');
	}else{
		var helpDiv=$('#addGuestPNameHelpErrBad');
		helpDiv.css('display','block');
		helpDiv.css('visibility','visible');
	}
}
function hideErrorPNameGA(){
	$('#addGuestPNameControlGrp').removeClass('error');
	$('#addGuestPNameHelpErrBlank').hide();
	$('#addGuestPNameHelpErrBad').hide();
	$('#addGuestPNameHelpErrTooLong').hide()
}
function gPhoneDataErrTestGA(){
	var gPhone=$("#addGuestPhone").val();
	var isErr=false;
	if(gPhone.length<1){
		gPhoneErrGA('blank');
		isErr=true;
	}else if(!(/[0-9,]+/.test(gPhone))){
		gPhoneErrGA('badchar');
		isErr=true;
	}
	if(gPhone.length>15){
		gPhoneErrGA('toolong');
		isErr=true;
	}
	if(gPhone.length>1&&gPhone.length<11){
		gPhoneErrGA('tooshort');
		isErr=true;
	}
	if(isErr===false){
		hideErrorGPhoneGA();
	}
	return isErr;
}
function gPhoneErrGA(err){
	$('#addGuestCellPhoneControlGrp').addClass('error');
	if(err==='blank'){
		var helpDiv=$('#addGuestPhoneHelpErrBlank');
		helpDiv.css('display','block');
		helpDiv.css('visibility','visible');
	}else if(err==='toolong'){
		var helpDiv=$('#addGuestPhoneHelpErrTooLong');
		helpDiv.css('display','block');
		helpDiv.css('visibility','visible');
	}else if(err==='tooshort'){
		var helpDiv=$('#addGuestPhoneHelpErrTooShort');
		helpDiv.css('display','block');
		helpDiv.css('visibility','visible');
	}else{
		var helpDiv=$('#addGuestPhoneHelpErrBad');
		helpDiv.css('display','block');
		helpDiv.css('visibility','visible');
	}
}
function hideErrorGPhoneGA(){
	$('#addGuestCellPhoneControlGrp').removeClass('error');
	$('#addGuestPhoneHelpErrBlank').hide();
	$('#addGuestPhoneHelpErrBad').hide();
	$('#addGuestPhoneHelpErrTooLong').hide()
	$('#addGuestPhoneHelpErrTooShort').hide()
}
function hideAllErrorMsgGA(){
	hideErrorLNameGA();
	hideErrorPNameGA();
	hideErrorGPhoneGA();
	$('#addGuestPhotoControlGrp').removeClass('error');
	$('#addGuestPhotoHelpErr').hide();
}
function guestPhotoUploadGuestGA(){
	if(isErrorWithGuestDataGA()){
		// abort
		console.log("there was an error - abort");
		return;
	}else{
		addGuestModalSetupGA();
		filepicker.store($("#guestPhotoInput")[0], function(FPFile){
	            guestDBSaveGA(FPFile.url);
	        }, function(FPError){
	        	$("#guestAddPhotoUploadPlsWait").hide();
	        	$("#guestAddPhotoUploadBadMsg").show();
	        	$("#guestAddPhotoUploadBadMsg").html("Something went wrong with upload!");
	            photoMissingOrUploadErrGA(FPError);
	        }, function(progress){
	        	$("#guestAddPhotoUploadProgressBar").css("width",progress+"%");
	        }
	   );
	}
}
function isErrorWithGuestDataGA(){
	hideAllErrorMsgGA();
	var isErr=false;
	var isErrCur=false;
	if($("#guestPhotoInput")[0].files.length<1){
		photoMissingOrUploadErrGA('no detected photo');
		isErrCur=true;
	}
	if(isErrCur===true){
		isErr=isErrCur;
	}
	isErrCur=lastNameDataErrTestGA();
	if(isErrCur===true){
		isErr=isErrCur;
	}
	isErrCur=pNameDataErrTestGA();
	if(isErrCur===true){
		isErr=isErrCur;
	}
	isErrCur=gPhoneDataErrTestGA();
	if(isErrCur===true){
		isErr=isErrCur;
	}
	console.log("is error is : "+isErr);
	return isErr;
}
function addGuestModalSetupGA(){
	$('#addGuestModalDiv').modal();
	$("#guestAddPhotoUploadPlsWait").show();
	$("#guestAddPhotoUploadBadMsg").hide();
	$("#guestAddPhotoUploadGoodMsg").hide();
	$("#guestAddPhotoUploadProgressBar").css("width","0%");
}
function photoMissingOrUploadErrGA(err){
	console.log(err);
	$('#addGuestModalDiv').modal('hide');
	$('#addGuestPhotoControlGrp').addClass('error');
	var helpDiv=$('#addGuestPhotoHelpErr');
	helpDiv.css('display','block');
	helpDiv.css('visibility','visible');
}
function guestDBSaveGA(photoUrl){
	var lastname=$("#addGuestLname").val();
	var proName=$("#addGuestPname").val();
	var gPhone=$("#addGuestPhone").val();
	var photo=photoUrl;
	Guests.insert({
		lname: lastname,
		pname: proName,
		type: 'incomplete',
		img: photo,
		timestamp: (new Date()).getTime()+Meteor.uuid()
    });
    addGuestSuccesfulModalActionGA();
}
function addGuestSuccesfulModalActionGA(){
	$("#guestAddPhotoUploadPlsWait").hide();
	$("#guestAddPhotoUploadGoodMsg").show();
	$("#guestAddPhotoUploadGoodMsg").html("Upload & save successful!");
	$('#addGuestModalDiv').on('hide',function(){
		addGuestClearDataGA();
	});
}
function addGuestClearDataGA(){
	$("#addGuestLname").val("");
	$("#addGuestPhone").val("");
	$("#addGuestPname").val("");
	$("#addGuestRemoveImgBtn").trigger('click');
}
