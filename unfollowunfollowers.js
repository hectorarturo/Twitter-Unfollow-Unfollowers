var userConfirmation = confirm("First we are going to load all the users and count how many of them are not following you back. Sounds good?");
if(userConfirmation){
	var askUserNow = false;
	var countUnfollowersNow = false;
	var unfollowerCount = 0;

	//  LOAD ALL USERS
	var followedUsersCount = $('.ProfileNav-item.ProfileNav-item--following.is-active').find('.ProfileNav-value').html();
	var count=18;
	var followedInt = parseInt(followedUsersCount, 10);
	var scrollDone=false;
	var numberToUnfollowString;
	var numberToUnfollow = 0;

	var scroller = setInterval(function(){
	  window.scrollTo(document.body.scrollWidth,document.body.scrollHeight);
	  count = count+18;
	  console.log(count);
	  if(count >= followedInt+100) {
	  	clearInterval(scroller);
	  	countUnfollowersNow = true;
	  	window.scrollTo(0,0);
	  	setTimeout(countUnfollowers, 500);
	  }  	
	},500);

	//  HOW MANY UNFOLLOWERS 
	function countUnfollowers(){
		var profiles= $('.js-stream-item');
		var lengthProfile=profiles.length;
		for(var i=0; i<followedInt; i++){
		    var followText=profiles.eq(i).find(".ProfileCard-screenname.u-dir").find(".FollowStatus").html();
		    if(!followText){
		      unfollowerCount++;
		    }
		}
		askUserNow = true;
		setTimeout(askUser, 500);
	}

	// ASKING HOW MANY USERS TO UNFOLLOW
	function askUser(){
		var flag = true;
		do{
			numberToUnfollowString = prompt("You are following " + unfollowerCount + " users that don't follow you back.\n"
										+ "Please enter how many of these users you want to unfollow or click 'Cancel' to quit: ");
			if(numberToUnfollowString==null){
				flag=false;
			}else{

				numberToUnfollow = parseInt(numberToUnfollowString, 10);
				
				if(numberToUnfollow <= unfollowerCount && numberToUnfollow >= 0){
					flag=false;
				}else{
					alert("Ha Ha. Very funny :/ Please enter a valid number.");
				}
			}
		}while(flag);
		setTimeout(startUnfollow, 500);
	}

	function startUnfollow(){
		for(var i=0; i<numberToUnfollow; i++){
			var profiles= $('.js-stream-item');
			var lengthProfile=profiles.length;
		    var followText=profiles.eq(i).find(".ProfileCard-screenname.u-dir").find(".FollowStatus").html();
		    if(!followText){
		     	profiles.eq(i).find('.button-text.unfollow-text').trigger('click');
		    }
		}
		alert(numberToUnfollow+" users were unfollowed");
	}
}
