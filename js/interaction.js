var video1;
/*section 3: part 15 Various variables*/

var videoHalfWay = 0;
var formattedHalfWay= 0;
//Choice parts
var choicePart = 7; //7 sec
var goodChoicePart = 7;
var badChoicePart = 20; //jump to the 20sec mark if they choose the bad choice
var goodChoiceChosen = false;
//Questions variable
var question1Asked = false;

$(document).ready(function(){
  
  $.featherlight.defaults.afterClose = playPauseVideo;
  
	video1 = $("#video1");
	// Code when DOM is ready goes here
  $(".box1").on("click", function(){
    /*playPauseVideo(".persona1PopUp");*/
    playPauseVideo(".popUpQuestion1"); //popup questions
  });
  
  $(".box2").on("click", function(){
    playPauseVideo(".persona2PopUp");
  });
  
  $(".goodChoice").on("click", function(){
      //close the featherlight popup window
      goodChoiceChosen = true;
      $.featherlight.close();
      video1[0].currentTime = goodChoicePart;//7sec
      
    
  });
  
  $(".badChoice").on("click", function(){
      //alert("Bad Choice Work!");    
     $.featherlight.close();
    video1[0].currentTime = badChoicePart;//20sec
  });
  
  $(video1).on("loadeddata", function(){
    videoHalfWay = Math.round(this.duration/2); //duration of video (half way of the video) 
  });
  
  $(video1).on("timeupdate", function(){
    var currentTime = Math.round(this.currentTime);
    var durationNum = Math.round(this.duration); 
    var formattedCurrentTime = secondsToHms(currentTime);
    var formattedDurationTime = secondsToHms(durationNum);
    //console.log(currentTime);
    //console.log(durationNum);
    onTrackedVideoFrame(formattedCurrentTime, formattedDurationTime);
    
    if(currentTime == choicePart && question1Asked == false){
      //at 7 sec and question1 is not asked
      question1Asked = true;
      video1[0].pause();
      showChoiceQuestion();
    }
    
    if(currentTime == videoHalfWay){
      //half way point
    }
    
    if(currentTime == durationNum){
      //alert("Video is complete!");
      //video is complete
    }
    
    if(currentTime == badChoicePart && goodChoiceChosen == true){
      video1[0].pause();
    }
  });
});

function onTrackedVideoFrame(currentTime, duration){
  $(".current").text(currentTime);
  $(".duration").text(duration);
}

function showChoiceQuestion(){
  $.featherlight($(".popUpQuestion1"));
}


function playPauseVideo(popUp){
  if(video1[0].paused){
    video1[0].play();   
  }
  else{
    video1[0].pause();
    $.featherlight($(popUp));
  }
}

/* DO NOT DELETE: Converting the time into minutes and seconds */
function secondsToHms(d) {
	d = Number(d);
	var h = Math.floor(d / 3600);
	var m = Math.floor(d % 3600 / 60);
	var s = Math.floor(d % 3600 % 60);
	return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s); 
}