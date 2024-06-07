class Seeds extends GameObject {
  constructor(pos, plant, type) {
    super(pos);
    this.onClick = this.buy;
    this.mouseOver = this.mouseCheck;
    this.width = 50;
    this.height = 70;
    this.plant = plant;
    this.posasa = pos;
    if(type == 0){
      this.imai = loadImage("img/Sunflower_icon.png");
      this.cost = 50;
    }else if(type == 1){
      this.imai = loadImage("img/peashooter_icon.png");
      this.cost = 100;
    } else if (type == 2){
      this.imai = loadImage("img/nuez_icon.png");
      this.cost = 50;
    } else if (type == 3){
      this.imai = loadImage("img/pearepeater_icon.png");
      this.cost = 200;
    }
  }

  draw() {
    push();
    translate(this.pos);
    fill(255);
    stroke(0);
    rectMode(CORNER);
    rect(0, 0, this.width, this.height);
    image(this.imai,0, 0, 50, 70);
    //fill(255);
    // rect(20, 55, 30, 15);
    //fill(0);
    // textSize(12);
    //text(this.cost, 55, 25);
    pop();  
  }
  
  buy(){
   if(this.plant.cost() <= suns){
     suns -= this.plant.cost();
     newPlant = new this.plant();
   }
    
   
  }

  mouseCheck(mousePos) {
    return (mousePos.x > this.pos.x &&
      mousePos.x < this.pos.x + this.width &&
      mousePos.y > this.pos.y &&
      mousePos.y < this.pos.y + this.height);
  }
}