let sprNut;

class Nut extends Plant{
  static cost(){
   return 50; 
  }
  
  static preload(){
    sprNut = loadImage("img/nuez.gif");     
  }
  
  constructor(){
     super(sprNut); 
     this.reloadtime = 20000; //milliseconds
     this.spriteSpeed = 0.2;
     this.health = 250;
  }

}