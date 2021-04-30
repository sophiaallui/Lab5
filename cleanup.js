// script.js

const img = new Image(); // used to load image from <input> and draw to canvas

// Fires whenever the img object loads a new image (such as with img.src =)
img.addEventListener('load', (event) => {
    // - Fill the whole Canvas with black first to add borders on non-square images, 
    
    var c = document.getElementById("user-image"); 
    var context = c.getContext('2d'); 
    context.rect(0,0,c.width,c.height); 
    context.fillStyle = 'black';
    context.fill();
// fillRect look up
    /* canvas.drawImage( …. ) --> getdimensions*/
    var dim = getDimmensions(c.width,c.height,img.width,img.height); 

  
    context.drawImage(img,dim.startX,dim.startY,dim.width,dim.height);

    
});


// Using querySelector
document.querySelector('#image-input').addEventListener('change', () => {
    const file = document.querySelector('#image-input').files[0]; 
    const url = URL.createObjectURL(file); // creates path 
    
    img.src = url; 

})

function memeText(){ 
    //document.getElementById('generate-meme').submit(); 
    var topText = document.getElementById("text-top").value; 
    var bottomText = document.getElementById("text-bottom").value;
  
    // Accessing the canvas to add text 
    var canvas = document.getElementById("user-image"); 
    var context = canvas.getContext("2d")
  
    context.fillStyle = "red"; 
    context.strokeStyle = "red"; 
  
    context.font = "40px Arial";
    // top left corner 
    
    context.fillText(topText,0,50);
    // bottom left corner
    context.fillText(bottomText,0,canvas.height-15);
    
  }
  
  // meme text 
  document.getElementById("generate-meme").addEventListener('submit', (event) => { 
    
    event.preventDefault();// prevents from refreshing
    
    memeText(); 
       
  })


  // clearing the disabled features: clear and read text 
  document.querySelector("button[type='reset']").removeAttribute("disabled");
  document.querySelector("button[type='button']").removeAttribute("disabled");
  
  // CLEAR BUTTON: current: works
  document.querySelector("button[type='reset']").addEventListener('click', (event) => { 
    // want to clear the canvas 
    var canvas = document.getElementById("user-image"); 
    var context = canvas.getContext('2d'); 
  
    context.clearRect(0,0,canvas.width, canvas.height);
  }); 
  
  // Reading the meme 
  /*function read(){ 
  
    let message = window.speechSynthesis; 
  
    let topRead = new SpeechSynthesisUtterance(document.getElementById("text-top").value); 
    let bottomRead = new SpeechSynthesisUtterance(document.getElementById("text-bottom").value); 
  
    message.speak(topRead); 
    message.speak(bottomRead);
  
    console.log(topRead);
  
  }*/
  
  
  document.querySelector("button[type='button']").addEventListener('click', () => { 
    //read(); 
    let message = window.speechSynthesis; 
  
    let topRead = new SpeechSynthesisUtterance(document.getElementById("text-top").value); 
    let bottomRead = new SpeechSynthesisUtterance(document.getElementById("text-bottom").value); 
  
    message.speak(topRead); 
    message.speak(bottomRead);
  
    console.log(topRead);
    console.log("reading");
  }); 
  
/*
function changeVolume(){ 
  
  //var speechVol = speechSynthesisUtteranceInstance.volume; 
  var speechVol = document.querySelector("input[type='range']").value;
  // 0 - 100
  speechSynthesisUtteranceInstance.volume = speedVol;
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
