class Plant extends Character{
  constructor(img = null){
    super( createVector(mouseX,mouseY),img);
    this.planted = false;
  }

  plantaIMG(){
    return this.giveImage();
  }
  
  //this should be over ridden and is simply an example of how to do it.
  static cost(){
    return 50;
  }
  
  plant(){
    let cell = backyard.pixelToCell(mouseX,mouseY);
    this.place(cell.x,cell.y); // TODO THIS WAS WRONG
    this.planted = true; 
  }
  
}

