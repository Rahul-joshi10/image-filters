var originalimage=null;
var finalimage=null;
var canvas=null;

function upload(){
  var img=document.getElementById("img");
  canvas=document.getElementById("can");
  var dim=document.getElementById("sz");
  originalimage=new SimpleImage(img);
  finalimage=new SimpleImage(img);
  originalimage.drawTo(canvas);
}

function getavg(pixel){
  return((pixel.getRed()+ pixel.getGreen()+pixel.getBlue())/3);
}

function check(){
  if(originalimage==null||!originalimage.complete()){
    alert("ERROR:Image Not Uploaded");
    return;
  }
}

function red(){
  check();
  for(var pixel of originalimage.values()){
    var avg=getavg(pixel);
    var pixelFinal=finalimage.getPixel(pixel.getX(),pixel.getY());
    if(avg<128){
      pixelFinal.setRed(2*avg);
      pixelFinal.setGreen(0);
      pixelFinal.setBlue(0);
    }
    else{
      pixelFinal.setRed(255);
      pixelFinal.setGreen(2*avg-255);
      pixelFinal.setBlue(2*avg-255);
    }
  }
  finalimage.drawTo(canvas);
}

function monochrome(){
  check();
  for(var pixel of originalimage.values() ){
    var avg=getavg(pixel);
    var pixelfinal=finalimage.getPixel(pixel.getX(),pixel.getY());
    pixelfinal.setRed(avg);
    pixelfinal.setGreen(avg);
    pixelfinal.setBlue(avg);
  }
  finalimage.drawTo(canvas);
}
function inverted(){

  check();
  for(var pixel of originalimage.values()){
    var avg=getavg(pixel);
    var pixelfinal=finalimage.getPixel(pixel.getX(),pixel.getY());
    pixelfinal.setRed(255-pixel.getRed());
    pixelfinal.setGreen(255-pixel.getGreen());
    pixelfinal.setBlue(255-pixel.getBlue());
  }
  finalimage.drawTo(canvas);
}

function rainbow()
{
 check();
 for(var pixel of originalimage.values()){
   var avg=getavg(pixel);
   var h=originalimage.getHeight();
   var pixelfinal=finalimage.getPixel(pixel.getX(),pixel.getY());
   if(pixel.getY()<h/7){
     if(avg<128){
       pixelfinal.setRed(2*avg);
       pixelfinal.setGreen(0);
       pixelfinal.setBlue(0);
     }
     else{
       pixelfinal.setRed(255);
       pixelfinal.setGreen(2*avg-255);
       pixelfinal.setBlue(2*avg-255);
     }
   }
   else if(pixel.getY()<2*h/7){
     if(avg<128){
       pixelfinal.setRed(2*avg);
       pixelfinal.setGreen(0.8*avg);
       pixelfinal.setBlue(0);
     }
     else {
       pixelfinal.setRed(255);
       pixelfinal.setGreen(1.2*avg-51);
       pixelfinal.setBlue(2*avg-255);
     }
   }
   else if(pixel.getY()<3*h/7){
     if(avg<128){
       pixelfinal.setRed(2*avg);
       pixelfinal.setGreen(2*avg);
       pixelfinal.setBlue(0);
     }
     else {
       pixelfinal.setRed(255);
       pixelfinal.setGreen(255);
       pixelfinal.setBlue(2*avg-255);
     }
   }
   //Green color
    else if(pixel.getY()<4*h/7){
     if(avg<128){
       pixelfinal.setRed(0);
       pixelfinal.setGreen(2*avg);
       pixelfinal.setBlue(0);
     }
     else {
       pixelfinal.setRed(2*avg-255);
       pixelfinal.setGreen(255);
       pixelfinal.setBlue(2*avg-255);
     }
   }
   //Blue color
    else if(pixel.getY()<5*h/7){
     if(avg<128){
       pixelfinal.setRed(0);
       pixelfinal.setGreen(0);
       pixelfinal.setBlue(2*avg);
     }
     else {
       pixelfinal.setRed(2*avg-255);
       pixelfinal.setGreen(2*avg-255);
       pixelfinal.setBlue(255);
     }
   }
   //Indigo color
    else if(pixel.getY()<6*h/7){
     if(avg<128){
       pixelfinal.setRed(0.8*avg);
       pixelfinal.setGreen(0);
       pixelfinal.setBlue(2*avg);
     }
     else {
       pixelfinal.setRed(1.3*avg-51);
       pixelfinal.setGreen(2*avg-255);
       pixelfinal.setBlue(255);
     }
   }
    else if(pixel.getY()<h){
     if(avg<128){
       pixelfinal.setRed(1.6*avg);
       pixelfinal.setGreen(0);
       pixelfinal.setBlue(1.6*avg);
     }
     else {
       pixelfinal.setRed(0.4*avg+153);
       pixelfinal.setGreen(2*avg-255);
       pixelfinal.setBlue(0.4*avg+153);
     }
   }
 }
  finalimage.drawTo(canvas);
}

function makeblur()
{
 check();
 for(var pixel of originalimage.values())
 {
   var x=pixel.getX();
   var y=pixel.getY();
   var val=Math.random();
   if(val<0.5)
   {
     finalimage.setPixel(x,y,pixel);
   }
   else
   {
     finalimage.setPixel(x,y,getRandomPixel(x,y,20));
   }
  }
  finalimage.drawTo(canvas);
}
function getRandomPixel(x, y, distance)
{

  var randomX = x + (Math.random() * distance);
  var randomY = y + (Math.random() * distance);

  if(randomX < 0){randomX = 0;}
  if(randomX > originalimage.getWidth()){randomX = originalimage.getWidth() - 1;}
  if(randomY < 0){randomY = 0;}
  if(randomY > originalimage.getHeight()){randomY = originalimage.getHeight() - 1;}

  return(originalimage.getPixel(randomX, randomY));
}

function makesize(){
 check();
  var dim=document.getElementById("sz");
  var w=originalimage.getWidth();
  var h=originalimage.getHeight();
  dim.innerHTML="Picture size:"+ w+"x"+h;
  dim.className="show";
}

function reset(){
  originalimage.drawTo(canvas);
}
