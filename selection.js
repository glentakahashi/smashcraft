var rows=3;
var cols=6;
var redLoc=0;
var blueLoc=cols-1;
var greenLoc=(rows-1)*cols;
var yellowLoc=rows*cols-1;
var numPlayers=2;
var isFriedman=false;
function setKeys() {
	window.onkeydown = function(e) {
	    switch(e.which) {
	        case 87:
	        	//move red up
	            if(Math.floor(redLoc/cols)==0) redLoc+=(rows-1)*cols;
	            else redLoc-=cols;
				isFriedman=false;
	            break;
	        case 68:	
	            //move red right
	            if(redLoc%cols==cols-1) redLoc-=cols-1;
	            else redLoc+=1;
				isFriedman=false;
	            break;
	        case 83:	
	            //move red down
	            if(Math.floor(redLoc/cols)==rows-1) redLoc-=(rows-1)*cols;
	            else redLoc+=cols;
				isFriedman=false;
	            break;
	        case 65:	
	            //move red left
	            if(redLoc%cols==0) redLoc+=cols-1;
	            else redLoc-=1;
				isFriedman=false;
	            break;
	        case 38:	
	            //move blue up
	            if(Math.floor(blueLoc/cols)==0) blueLoc+=(rows-1)*cols;
	            else blueLoc-=cols;
	            break;
	        case 39:	
	            //move blue right
	            if(blueLoc%cols==cols-1) blueLoc-=cols-1;
	            else blueLoc+=1;
	            break;
	        case 40:	
	            //move blue down
	            if(Math.floor(blueLoc/cols)==rows-1) blueLoc-=(rows-1)*cols;
	            else blueLoc+=cols;
	            break;
	        case 37:	
	            //move blue left
	            if(blueLoc%cols==0) blueLoc+=cols-1;
	            else blueLoc-=1;
	            break;
			case 89:
				//move green up
	            if(Math.floor(greenLoc/cols)==0) greenLoc+=(rows-1)*cols;
	            else greenLoc-=cols;
				break;
			case 74:
				//move green right
	            if(greenLoc%cols==cols-1) greenLoc-=cols-1;
	            else greenLoc+=1;
				break;
			case 72:
				//move green down
	            if(Math.floor(greenLoc/cols)==rows-1) greenLoc-=(rows-1)*cols;
	            else greenLoc+=cols;
				break;
			case 71:
				//move green left
	            if(greenLoc%cols==0) greenLoc+=cols-1;
	            else greenLoc-=1;
				break;
			case 80:
				//move yellow up
	            if(Math.floor(yellowLoc/cols)==0) yellowLoc+=(rows-1)*cols;
	            else yellowLoc-=cols;
				break;
			case 222:
				//move yellow right
	            if(yellowLoc%cols==cols-1) yellowLoc-=cols-1;
	            else yellowLoc+=1;
				break;
			case 186:
				//move yellow down
	            if(Math.floor(yellowLoc/cols)==rows-1) yellowLoc-=(rows-1)*cols;
	            else yellowLoc+=cols;
				break;
			case 76:
				//move yellow left
	            if(yellowLoc%cols==0) yellowLoc+=cols-1;
	            else yellowLoc-=1;
				break;
			case 49:
				//friedman
				isFriedman=true;
				break;
			case 50:
				//2 player
				$("#player3").hide();
				$("#player4").hide();
			    $("td").removeClass("highlightGreen");
			    $("td").removeClass("highlightYellow");
				$("#p3").hide();
				$("#p4").hide();
				numPlayers=2;
				break;
			case 51:
				//3 player
				$("#player3").show();
				$("#player4").hide();
			    $("td").removeClass("highlightYellow");
				$("#p3").show();
				$("#p4").hide();
				numPlayers=3;
				break;
			case 52:
				//4 player
				$("#player3").show();
				$("#player4").show();
				$("#p3").show();
				$("#p4").show();
				numPlayers=4;
				break;
			case 53:
				//start stage 5
				startGame(5);
				break;
			case 54:
				//start stage 6
				startGame(6);
				break;
			case 55:
				//start stage 7
				startGame(7);
				break;
			case 56:
				//start stage 8
				startGame(8);
				break;
			case 57:
				//start stage 9
				startGame(9);
				break;
			case 48:
				//start stage 0
				startGame(0);
				break;
			case 13:
				//start game
				startGame(5);
				break;
	    }
		//update coloring
		updateColoring();
	};
}
function startGame(stageNum) {
	$("#selection").hide();
	$("#game").show();
	var redName=$("#choice"+redLoc+" img")[0].src.substring(document.URL.length+15);
	var blueName=$("#choice"+blueLoc+" img")[0].src.substring(document.URL.length+15);
	var greenName=$("#choice"+greenLoc+" img")[0].src.substring(document.URL.length+15);
	var yellowName=$("#choice"+yellowLoc+" img")[0].src.substring(document.URL.length+15);
	redName=redName.substring(0,redName.length-8);
	blueName=blueName.substring(0,blueName.length-8);
	greenName=greenName.substring(0,greenName.length-8);
	yellowName=yellowName.substring(0,yellowName.length-8);
	if(isFriedman) {
		redName="friedman";
	}
	game = new Game(stageNum,numPlayers,redName,blueName,greenName,yellowName);
    audio.init();
    game.init();
}
function updateColoring() {
    $("td").removeClass("highlightRed");
    $("td").removeClass("highlightBlue");
    $("td").removeClass("highlightGreen");
    $("td").removeClass("highlightYellow");
    $("#choice"+redLoc).addClass("highlightRed");
    $("#choice"+blueLoc).addClass("highlightBlue");
    if(numPlayers>2)
		$("#choice"+greenLoc).addClass("highlightGreen");
    if(numPlayers>3)
		$("#choice"+yellowLoc).addClass("highlightYellow");
	var redName=$("#choice"+redLoc+" img")[0].src.substring(document.URL.length+15);
	var blueName=$("#choice"+blueLoc+" img")[0].src.substring(document.URL.length+15);
	var greenName=$("#choice"+greenLoc+" img")[0].src.substring(document.URL.length+15);
	var yellowName=$("#choice"+yellowLoc+" img")[0].src.substring(document.URL.length+15);
	redName=redName.substring(0,redName.length-8);
	blueName=blueName.substring(0,blueName.length-8);
	greenName=greenName.substring(0,greenName.length-8);
	yellowName=yellowName.substring(0,yellowName.length-8);
	$("#player1 img")[0].src=document.URL+"img/characters/"+redName+"Body.png";
	$("#player2 img")[0].src=document.URL+"img/characters/"+blueName+"Body.png";
	$("#player3 img")[0].src=document.URL+"img/characters/"+greenName+"Body.png";
	$("#player4 img")[0].src=document.URL+"img/characters/"+yellowName+"Body.png";
	$("#player1 h2").html(capEachWord(decodeURIComponent(redName)));
	$("#player2 h2").html(capEachWord(decodeURIComponent(blueName)));
	$("#player3 h2").html(capEachWord(decodeURIComponent(greenName)));
	$("#player4 h2").html(capEachWord(decodeURIComponent(yellowName)));
	if(isFriedman) {
		$("#player1 img")[0].src=document.URL+"img/characters/friedmanBody.png";
		$("#player1 h2").html("Friedman");
	}
}
function capEachWord(str) {
	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
$(function() {
var aspect = window.innerWidth / window.innerHeight;
var canvas = $('#canvas');
var width = Number(canvas.attr('width'));
$('#canvas').attr('height', width / aspect);
setKeys();
updateColoring();
});