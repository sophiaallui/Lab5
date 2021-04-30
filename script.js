// script.js

const img = new Image(); // used to load image from <input> and draw to canvas

// Fires whenever the img object loads a new image (such as with img.src =)
img.addEventListener('load', (event) => {
  // TODO

    // Some helpful tips:
    // - Fill the whole Canvas with black first to add borders on non-square images, 
    
    var c = document.getElementById("user-image"); 
    var context = c.getContext('2d'); 
    context.rect(0,0,c.width,c.height); 
    context.fillStyle = 'black';
    context.fill();

    //console.log(c.height);
    // get reference .width and .height

    /* canvas.drawImage( …. ) --> getdimensions*/
    const dim = getDimmensions(c.width,c.width,img.width,img.height); 

    img.width = dim.width;
    img.height = dim.height;
  
    context.drawImage(img,dim.startX,dim.startY);
    // - Clear the form when a new image is selected
    // - If you draw the image to canvas here, it will update as soon as a new image is selected
});

/*
element.addEventListener( ‘change’, () => { function });
element.addEventListener( ‘change’, () => { function });
input element 
*/ 

  // Using querySelector
document.querySelector('#image-input').addEventListener('change', () => {
    //console.log(document.querySelector('#image-input'));
    const file = document.querySelector('#image-input').files[0]; 
    const url = URL.createObjectURL(file); // creates path 
    
    // set image object to have a path
    img.src = url; 

    // get dimensions

})

// hoping to take care of uploading the meme text 
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
  context.fillText(topText,0,0);
  // bottom left corner
  context.fillText(bottomText,10,10)
}

const form = document.getElementById('generate-meme');  
//form.addEventListener('submit',memeText);

// Reseting the meme
function clear(){ 
  document.getElementById("generate-meme").reset();
}

document.getElementById("reset").onclick = function(){
  clear(); 
}; 

/*Another way but using querySelector

const rest = document.querySelectror('reset'); 
rest.addEventListener('click', event => {
    document.getElementById("generate-meme").reset();
})
*/ 

// saw it for a brief second
document.getElementById("submit").onsubmit = function(){
  memeText(); 
};

// Reading the meme 
function read(){ 

  var message = window.speechSynthesis; 

  var topRead = new SpeechSynthesisUtterance(document.getElementById("text-top")); 
  var bottomRead = new SpeechSynthesisUtterance(document.getElementById("text-bottom")); 

  message.speak(topRead); 
  message.speak(bottomRead);

}

document.getElementById("button").onclick = function(){ 
  read();
}; 

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
