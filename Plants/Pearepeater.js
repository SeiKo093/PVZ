let sprPearepeater,sprPearepeaterShoot;

class Pearepeater extends Plant {
  static cost(){
   return 200; 
  }
  
  static preload(){
    sprPearepeater = loadImage("img/pearepeat.gif");     
    sprPearepeaterShoot = loadImage("img/pearepeat_shoot.gif");   
  }
  
  constructor(){
    super(sprPearepeater);
    this.reloadtime = 1400; 
    this.weaponOffset = createVector(20,-10);
  }
  
 
  *shoot(){
    let rememberIndex = this.spriteIndex;
    // Espera hasta el momento adecuado para disparar el primer guisante
    let shootAnimationOffset = 7;
    while(this.spriteIndex < shootAnimationOffset){
      yield; 
    }
    
    this.image = sprPearepeaterShoot;
    this.spriteIndex = 0;
  
    // Dispara el primer guisante
    let peaposition = p5.Vector.add(this.pos,this.weaponOffset);
    addGameObject( new Pea(peaposition) );
    this.cooldown = this.reloadtime;
    
    // Espera hasta que la animación termine
    while(this.spriteIndex !== 0 ){
      yield; 
    }
  
    // Vuelve a la imagen original
    this.spriteIndex = rememberIndex;
    this.image = sprPearepeater;
  
    // Espera 0.5 segundos antes de disparar el segundo guisante
    yield sleep(500);
  
    // Dispara el segundo guisante
    addGameObject( new Pea(peaposition) );
  }
  
  
  
  *waitForZombies(){
    
    let zombies = 0;
    while(zombies == 0){
      zombies = findObjectsOfType(this.cell.y,Zombie).length;
      yield sleep(50);
    }
    
    startCoroutine(this.shoot());
  }
  
  cooldownFinish(){
    startCoroutine(this.waitForZombies());
  }

}