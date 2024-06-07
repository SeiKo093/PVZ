let sndZombiesComing, sndScream;
let sprZombie, sprZombieCone, sprZombieCube, sprZombieBig;

class Zombie extends Character{
  static preload(){
    sprZombie = loadImage("img/zombie.gif");
    sprZombieCone = loadImage("img/zombieCone.gif");
    sprZombieCube = loadImage("img/zombieCube.gif");
    sprZombieBig = loadImage("img/zombieBig.gif");
    
    sndZombiesComing = loadSound("snd/The_Zombies_Are_Coming.ogg");
    sndScream = loadSound("snd/Scream.ogg");
  }
  
  constructor(row,oled){
    console.log(oled);
    let col = backyard.numCellsX;
    let pos = backyard.cellToPixel(col,row);

    pos.y-=backyard.cellSize/2; 

    let sele = Math.floor( Math.random()*11);

    if(oled == 0 || oled == 1){
      super(pos,sprZombie);
      this.speed = -20;
    }else if(oled == 2){

      if(sele < 5){
        super(pos,sprZombie);
        this.speed = -20;
      }else if (sele >= 5 && sele < 6){
        super(pos,sprZombieCone);
        this.health = 150;
        this.speed = -20;
      }
      else if (sele >= 7 && sele <= 9){
        super(pos,sprZombieCube);
        this.health = 200;
        this.speed = -20;
      }
      else{
        super(pos,sprZombieBig);
        this.health = 220;
        this.speed = -15;
        this.imgW = this.imgW*1.5;
        this.imgH = this.imgH*1.5;
      }

    }else{
      
      if (sele <= 6){
        super(pos,sprZombieCone);
        this.health = 150;
        this.speed = -20;
      }
      else if (sele >= 7 && sele <= 9){
        super(pos,sprZombieCube);
        this.health = 200;
        this.speed = -20;
      }
      else{
        super(pos,sprZombieBig);
        this.health = 220;
        this.speed = -15;
        this.imgW = this.imgW*1.5;
        this.imgH = this.imgH*1.5;
      }
    }
    

    //super(pos,sprZombie);
    
    this.attackPower = 30;
    this.cell = createVector(col,row);
    
    this.vel = createVector(this.speed,0);
    this.width = 30;
    startCoroutine(this.waitForPlant());
  }
  
  update(){
    super.update();
    if(this.pos.x < backyard.pos.x){ 
      noLoop(); 

      sndScream.play();
      console.log("GAME OVER");
    }

  }
  
  eat(plant){
    plant.receiveDmg(this.attackPower);
    this.cooldown = this.reloadtime;
    
  }
  
  *waitForPlant(){
        
    let isThereAPlant = false;
    while(!isThereAPlant){
      this.vel.x = this.speed;
      let plants = findObjectsOfType(this.cell.y,Plant);
      
      for(const plant of plants){
        if(this.hits(plant)){
          this.vel.x = 0;
          this.eat(plant);
          isThereAPlant = true;
        }
      }
    
      yield sleep(50);
    }
    
  }

  changeoled(oled){
    this.oled = oled
  }
  
  cooldownFinish(){
    startCoroutine(this.waitForPlant());
  }
  
  
}