// script.js

const img = new Image(); // used to load image from <input> and draw to canvas

// Fires whenever the img object loads a new image (such as with img.src =)
img.addEventListener('load', (event) => {
    
    var c = document.getElementById("user-image"); 
    var context = c.getContext('2d'); 
    context.rect(0,0,400,400); 
    context.fillStyle = 'black';
    context.fill();

    var dim = getDimmensions(c.width,c.height,img.width,img.height); 
  
    context.drawImage(img,dim.startX,dim.startY,dim.width,dim.height);
});

// Uploading Image/Creating path 
document.querySelector('#image-input').addEventListener('change', () => {
    const file = document.querySelector('#image-input').files[0]; 
    const url = URL.createObjectURL(file); // creates path 
    // set image object to have a path
    img.src = url; 
})

// LOADING MEME TEXT 
function memeText(){ 
  var topText = document.getElementById("text-top").value; 
  var bottomText = document.getElementById("text-bottom").value;

  // Accessing the canvas to add text 
  var canvas = document.getElementById("user-image"); 
  var context = canvas.getContext("2d")

  context.fillStyle = "red"; 
  context.strokeStyle = "red"; 
  context.font = "40px Impact";

  let topCount = context.measureText(topText).width/2;   
  let btmCount = context.measureText(bottomText).width/2;   

  let canvasWidth = (canvas.width)/2;

  
  // top left corner 
  context.fillText(topText,canvasWidth - topCount,50);
  // bottom left corner
  context.fillText(bottomText,canvasWidth - btmCount,canvas.height-15);
  
}

// LOADS INTO HTML 
document.getElementById("generate-meme").addEventListener('submit', (event) => { 
  event.preventDefault();// prevents from refreshing
  memeText();
     
})

// CLEARING THE DISABLE FUNCTION FOR 'rest' AND 'button'  
document.querySelector("button[type='reset']").removeAttribute("disabled");
document.querySelector("button[type='button']").removeAttribute("disabled");

// REST BUTTON
document.querySelector("button[type='reset']").addEventListener('click', (event) => { 
  var canvas = document.getElementById("user-image"); 
  var context = canvas.getContext('2d'); 

  context.clearRect(0,0,canvas.width, canvas.height);
}); 

// Reading the meme 
function read(){ 

  let message = window.speechSynthesis; 

  let topRead = new SpeechSynthesisUtterance(document.getElementById("text-top").value); 
  let bottomRead = new SpeechSynthesisUtterance(document.getElementById("text-bottom").value); 

  var speechVol = document.querySelector("input[type='range']").value;
  //changeVolImage(speechVol); 



  // converting the volume input to speech limits 0-1
  message.volume= parseFloat(speechVol/100);
  message.cancel();
  console.log(message.volume);
  message.speak(topRead); 
  message.speak(bottomRead);
  
}

//document.getElementById("img").src = "icons/volume-level-3.svg";

/*
function changeVolImage(curVol){ 

  // access the img attribute 
  // take the curVol and set the conditions 
  
  // Volume 3 
  if(67 <= curVol || curVol >= 100){ 
    document.getElementById("img").src="volume-level-3.svg";
  // Volume 2 
  }else if( 34<= curVol || curVol >= 66){ 
    document.getElementById("img").src="volume-level-2.svg";
  // Volume 1 
  }else if(1 <= curVol || curVol >= 33){ 
    document.getElementById("img").src="volume-level-1.svg";
  // Volume 0
  }else{ 
    document.getElementById("img").src="volume-level-0.svg";
  }
  console.log(document.getElementById("img").value);

}

*/ 
document.getElementById("voice-selection").removeAttribute("disabled");


/*function changeVoice(){

  var voices = speechSynthesis.getVoices(); 
  var voiceSelection = doument.getElementById('voice-selection')

  voices.forEach(function(voice, i) {
    // Create a new option element.
		var option = document.createElement('option');
    
    // Set the options value and text.
		option.value = voice.name;
		option.innerHTML = voice.name;

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
		  
    // Add the option to the voice selector.
		voiceSelection.appendChild(option);
	});

}

// Execute loadVoices.
changeVoice();

// Chrome loads voices asynchronously.
window.speechSynthesis.onvoiceschanged = function(e) {
  changeVoice();
};
 */ 


function populateVoiceList() {

  // set conditions
  if(typeof speechSynthesis === 'undefined') {
    return;
  }

  // access all possible voices
  var voices = speechSynthesis.getVoices();

  // storing the options
  for(var i = 0; i < voices.length; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    document.getElementById("voice-selection").appendChild(option);
  }
}

// Loads it from the start of the call
populateVoiceList();
if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

// LOADS READ TEXT FUNCTION INTO HTML 
document.querySelector("button[type='button']").addEventListener('click', () => { 
  read(); 
  // convert some stuff, range from  1-100 > utterence units 
}); 

/*function changeVolume(){ 
  
  //get volume input 
  var speechVol = document.querySelector("input[type='range']").value;
  // 0 - 100

  // converting the volume input to speech limits 0-1
  speechSynthesisUtteranceInstance.volume = speedVol/100;
  // convert some stuff, range from  1-100 > utterence units 

  console.log("vol: " + document.querySelector("input[type='range']"));
}*/ 

/**
 * Takes in the dimensions of the canvas and the new image, then calculates the new
 * dimensions of the image so that it fits perfectly into the Canvas and maintains aspect ratio
 * @param {number} canvasWidth Width of the canvas element to insert image into
 * @param {number} canvasHeight Height of the canvas element to insert image into
 * @param {number} imageWidth Width of the new user submitted image
 * @param {number} imageHeight Height of the new user submitted image
 * @returns {Object} An object containing four properties: The newly calculated width and height,
 * and also the starting X and starting Y coordinate to be used when you draw the new image to the
 * Canvas. These coordinates align with the top left of the image.
 */
function getDimmensions(canvasWidth, canvasHeight, imageWidth, imageHeight) {
  let aspectRatio, height, width, startX, startY;

  // Get the aspect ratio, used so the picture always fits inside the canvas
  aspectRatio = imageWidth / imageHeight;

  // If the apsect ratio is less than 1 it's a verical image
  if (aspectRatio < 1) {
    // Height is the max possible given the canvas
    height = canvasHeight;
    // Width is then proportional given the height and aspect ratio
    width = canvasHeight * aspectRatio;
    // Start the Y at the top since it's max height, but center the width
    startY = 0;
    startX = (canvasWidth - width) / 2;
    // This is for horizontal images now
  } else {
    // Width is the maximum width possible given the canvas
    width = canvasWidth;
    // Height is then proportional given the width and aspect ratio
    height = canvasWidth / aspectRatio;
    // Start the X at the very left since it's max width, but center the height
    startX = 0;
    startY = (canvasHeight - height) / 2;

  }

  return { 'width': width, 'height': height, 'startX': startX, 'startY': startY }
}
