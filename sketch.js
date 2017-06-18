var video;
var button;
var snaps = [];

var canWidth = document.documentElement.clientWidth+50;
var canHeight = document.documentElement.clientHeight+50;
var screenmult = document.documentElement.clientWidth/window.screen.width;
var boxes=40;
var vScale= parseInt(canWidth/boxes);
var w = canWidth/vScale;
var h = canHeight/vScale;
var index;
var scaleCube;
var cubestart;
var newboxes;
var stop = true;
var greyscale = false;

// var vplus=0 ;




function setup(){

  createCanvas(canWidth, canHeight);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(w,h);
  video.hide();  
  background(0);

}

function freeze(){
 stop =! stop; 
}
function grey(){
 greyscale =! greyscale; 
}
var neww;
var newh;


function draw(){
    newboxes=parseInt(random(15,100));
    if (newboxes != boxes && !stop){
      vScale= parseInt(canWidth/newboxes);
      neww = canWidth/vScale;
      newh = canHeight/vScale;
      // console.log(neww,newh);
      if (neww != w){
        video.size(neww,newh);
        w = neww;
        h = newh;
      }
    }
    video.loadPixels()
    loadPixels();
    for (var y = 0; y < video.height; y++){
      for(var x = 0; x < video.width; x++){
        index = (video.width-x+(y*video.width-1))*4; 
        r = video.pixels[index+0];
        g = video.pixels[index+1];
        b = video.pixels[index+2];
        a = video.pixels[index+3];
        greyval = (r+g+b)/3;
        cubestart = (x*vScale+y*vScale*width);
        if(!greyscale){
          for (var sy = 0; sy < vScale; sy++){
            for (var sx = 0; sx < vScale; sx++){
                sindex = (cubestart+sx+(sy*width))*4;
                pixels[sindex+0] = r;
                pixels[sindex+1] = g;
                pixels[sindex+2] = b;
                pixels[sindex+3] = 255;
            }
          }
        }
        if(greyscale){
          for (var sy = 0; sy < vScale; sy++){
            for (var sx = 0; sx < vScale; sx++){
                sindex = (cubestart+sx+(sy*width))*4;
                pixels[sindex+0] = greyval;
                pixels[sindex+1] = greyval;
                pixels[sindex+2] = greyval;
                pixels[sindex+3] = 255;
            }
          }
        }
      }
    }

    updatePixels();
    // console.log("asdf");

 }