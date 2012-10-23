/**
 * date:4/16/2011
 */

 var actionArray = new Array();
 
 //the animation method,and set all the properties.
function doFlow(chgId,chgToId,chgLeft,chgToLeft,chgTop,chgToTop,chgZindex,chgToZindex,chgRotate,chgToRotate,
		 chgScaleX,chgToScaleX,chgScaleY,chgToScaleY,chgSkewX,chgToSkewX,chgSkewY,chgToSkewY){
	var flowId=document.getElementById(chgId);
	flowId.title=chgToId;
	flowId.addEventListener( 'webkitAnimationEnd', animationEnd, false );
	
	var s = document.styleSheets[document.styleSheets.length - 1]; 
	flowId.style.webkitAnimationName=chgId+"animation";
	flowId.style.webkitAnimationDuration="1000ms";
	flowId.style.webkitAnimationIterationCount=1;
	
	s.insertRule(
    "@-webkit-keyframes '"+chgId+"animation"+"' {from{ top:"+"chgTop"+"px; left:"+chgLeft+"px;z-index:"+chgZindex+";}"
	
	+ "to{top:"+chgToTop+"px;left:"+chgToLeft+"px;z-index:"+chgToZindex+";-webkit-transform:  rotate("+chgToRotate+"deg)" +
			" scale("+chgToScaleX+","+chgToScaleY+") skew("+chgToSkewX+"deg,"+chgToSkewY+"deg) ; }}"
	,  s.length
	);
	//setTimeout(function(){
	//	flowId.id=chgToId;
	//},"0ms");
} 
    //set the movement from slidebar's left to right
function doMoveToFour(){
	    //1->4
	    oneToFour("1000ms");
	    //2->1
		doFlow("id2","id1",454,125,40,60,90,100,3,0,0.18,1,0.9,1,13,0,2,0);
		//3->2
		doFlow("id3","id2",500,454,28,40,80,90,9,3,0.15,0.18,0.85,0.9,40,13,2.4,2);
		//4->3
		doFlow("id4","id3",542,500,14,28,70,80,16,9,0.121,0.15,0.77,0.85,60,40,2.7,2.4);
		
}
function doMoveToOne(){
	fourToOne("1000ms");
	//1->2
	doFlow("id1","id2",125,454,60,40,100,900,0,3,1,0.18,1,0.9,0,13,0,2);
	//2->3
	doFlow("id2","id3",454,500,40,28,90,80,3,9,0.18,0.15,0.9,0.85,13,40,2,2.4);
	//3->4
	doFlow("id3","id4",500,542,28,14,80,70,9,16,0.15,0.121,0.85,0.77,40,60,2.4,2.7);
	//4->1
	
}
function oneToFour(animDuration){         //let first img translate to fourth.
	    var flowIdOne=document.getElementById("id1");
		flowIdOne.title = "id4";
		flowIdOne.addEventListener( 'webkitAnimationEnd', animationEnd, false );
		
		var s = document.styleSheets[document.styleSheets.length - 1]; 
		flowIdOne.style.webkitAnimationName="oToFour";
		flowIdOne.style.webkitAnimationDuration="1000ms";
		flowIdOne.style.webkitAnimationIterationCount=1;
		
		s.insertRule(
	    "@-webkit-keyframes 'oToFour' {from{ top:60px; left:125px;z-index:100;}"
		+" 50%{ top:60px;left:625px;z-index:100;-webkit-transform:  rotate(15deg) scale(0.36,0.36) skew(20deg,5deg) ; }"
		+ "to{top:14px;left:542px;z-index:70;-webkit-transform:  rotate(16deg) scale(0.121,0.77) skew(60deg,2.7deg) ; }}"
		,  s.length
		);
		//setTimeout(function(){
		//	flowIdOne.id="id4";
		//},"0ms");
	
}

function fourToOne(animDuration){
	var flowIdFour=document.getElementById("id4");
	flowIdFour.title = "id1";
	flowIdFour.addEventListener( 'webkitAnimationEnd', animationEnd, false );
	
	var s = document.styleSheets[document.styleSheets.length - 1]; 
	flowIdFour.style.webkitAnimationName="fToOne";
	flowIdFour.style.webkitAnimationDuration="animDuration";
	flowIdFour.style.webkitAnimationIterationCount=1;
	
	s.insertRule(
    "@-webkit-keyframes 'fToOne' {from{top:14px;left:542px;z-index:70;-webkit-transform:  rotate(16deg) scale(0.121,0.77) skew(60deg,2.7deg) ; }"
			
	
	+ "to{ top:60px; left:125px;z-index:100;}}"
	
	,  s.length
	);
	//setTimeout(function(){
	//	flowIdFour.id="id1";
	//},"0ms");
}

var markers = 0;
function animationEnd(event){
	event.target.removeEventListener('webkitAnimationEnd', animationEnd, false );
	markers += parseInt(event.target.id.substring(2));
	event.target.id = event.target.title;
	event.target.title="";
	if (markers == 10){
		markers = 0;
		if (actionArray.length>0){
			var actionstr = actionArray.shift();
			eval(actionstr);
		}else{
			onTransform = false;
		}
	}
}

//..................

/*function onload(range){
	range.onmousedown=onMouseDownHandler(this);
	range.onmousemove=onMouseMoveHandler(this);
	
	}*/
var orginValue;
var currentValue;
/*function onMouseDownHandler(range){
	//ev=ev||window.event;
	//var rangeButton=document.getElementById("slidebar").firstChild;	\
	 console.log("down...");
	 orginValue=range.value;
	 console.log("orginValue="+orginValue);
	
}
function onMouseMoveHandler(range){
	console.log("moving....");
    currentValue=range.value;
	console.log("currentValue="+currentValue);
	if(currentValue-orginValue==1){
		doMoveToFour();
		
	}else if(currentValue-orginValue==-1){
		doMoveToOne();
		orginValue=currentValue;
	}
	
}

function onMouseUphandler(range){
	orginValue=currentValue;
}*/
var onTransform = false;
function setupMoving(moveaction){
	actionArray.push(moveaction);
	if (!onTransform){
		actionstr = actionArray.shift();
		onTransform = true;
		eval(actionstr);
	}
}

var currentValue;
var originalvalue;
function getValue(event){
	originalvalue = event.target.value;
}

function changestart(event){
	button = event.target;
	var delta = button.value - originalvalue;
	console.log("up:"+delta);
	
	while (Math.abs(delta) > 0){
		if (delta > 0){
			setupMoving("doMoveToFour()");
			delta--;
		}else if (delta < 0){
			setupMoving("doMoveToOne()");
			delta++;
		}
	}
}


function testdown(event){
	originalvalue = event.target.value;
}

function testup(event){
	button = event.target;
	var delta = button.value - originalvalue;
	console.log("up:"+delta);
	
	while (Math.abs(delta) > 0){
		if (delta > 0){
			setupMoving("doMoveToFour()");
			delta--;
		}else if (delta < 0){
			setupMoving("doMoveToOne()");
			delta++;
		}
	}
}

function getOnChangeValue(event){
	 //rangeButton = event.target;
	 //currentValue=rangeButton.value;
	 //console.log("cur="+currentValue+":orginValue="+orginValue);
	 
	 
	 /*while (Math.abs(currentValue-orginValue)>0){
		if (currentValue-orginValue > 0){
			setupMoving("doMoveToFour()");
		}else if (currentValue-orginValue < 0){
			setupMoving("doMoveToOne()");
		}
		orginValue=currentValue;
	 }*/
	 
	 
	 
	 /*if(currentValue-orginValue==1){
			doMoveToFour();
			
		}else if(currentValue-orginValue==-1){
			doMoveToOne();
		}
	orginValue=currentValue;*/
}