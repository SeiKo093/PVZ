let backyard;
let backyardObjects = [];
let otherObjects = [];
let newPlant = null;

let unlockable01 = false; let unlockable02 = false
let bagg = null;

let suns = 0;
let oleada, zombieCounter;
let sunRainTimer = 10000; //milli seconds between suns rainding down
let reset = false;

function* spawnZombies() {
  let timering = 10000;
  yield sleep(17000);
  sndZombiesComing.play();
  yield sleep(2500);
  
  while (true) {
    let row = floor(random(0, backyard.numCellsY));
    addGameObject(new Zombie(row,this.oleada));
    this.zombieCounter++;
    yield sleep(timering);

    if(this.zombieCounter == 11){
      yield sleep(8000);
      this.reset = true;
      sndZombiesComing.play();
      yield sleep(3000);
      this.zombieCounter = 0;
      this.oleada++;
      this.suns = 100;

      if(this.oleada == 3){timering = 7000}
    }
  }
}

function* rainSuns() {
  while (true) {
    let randomX = random(backyard.width) + backyard.pos.x;
    let randomY = random(backyard.height) + backyard.pos.y;

    let starting = createVector(randomX, -20);
    let landing = createVector(randomX, randomY);

    addGameObject(new Sun(starting, landing));
    yield sleep(sunRainTimer);
  }
}

function addGameObject(obj) {
  if (obj.cell) {
    backyardObjects[obj.cell.y].push(obj);
  } else {
    otherObjects.push(obj);
  }
}

function preload(){
  Sun.preload();
  Pea.preload();
  Peashooter.preload();
  Sunflower.preload();
  Nut.preload();
  Pearepeater.preload();
  Zombie.preload();
  bagg = loadImage("img/day.png");
  this.oleada = 1;
  this.zombieCounter = 0;
}

function setup() {
  createCanvas(800, 520);
  backyard = new Backyard(createVector(100, 100));
  for (let i = 0; i < backyard.numCellsY; i++) {
    backyardObjects.push([]);
  }

  addGameObject(new Seeds(createVector(150, 5), Sunflower, 0));
  addGameObject(new Seeds(createVector(210, 5), Peashooter, 1));
  addGameObject(new Seeds(createVector(270, 5), Nut, 2));
  addGameObject(new Seeds(createVector(330, 5), Pearepeater, 3));

  startCoroutine(spawnZombies());
  startCoroutine(rainSuns());
  bg = loadImage("img/day.png");
}

function draw() {
  tickCoroutines();
  background(220,200,200);
  image(bagg, 0-100, 30, 1150, 490);
  backyard.update();
  backyard.draw();
  

  //draw sun currency
  fill(255, 255, 0);
  stroke(200, 200, 200);
  circle(40, 15, 20);
  fill(0);
  textSize(30);
  text(suns, 55, 25);

  text('Oleada: ' + this.oleada, 625, 25);

  if(this.reset){
    fill(100, 100, 100,100);
    rect(0, 0, 2000, 2000);
  }


  for (let i = otherObjects.length - 1; i >= 0; i--) {
    otherObjects[i].update();
    if (otherObjects[i].deleteMe) {
      otherObjects.splice(i, 1);
    }
  }
  for (const row of backyardObjects) {
    for (let i = row.length - 1; i >= 0; i--) {
      row[i].update();
      if (row[i].deleteMe) {
        row.splice(i, 1);
      }
    }
  }

  if (this.reset == true){
    for (const row of backyardObjects) {
      for (let i = row.length - 1; i >= 0; i--) {
        row[i].deleteMe = true;
      }
    }
    this.reset = false;
  }

  for (let i = 0; i < otherObjects.length; i++) {
    otherObjects[i].draw();
  }
  for (const row of backyardObjects) {
    for (let i = 0; i < row.length; i++) {
      row[i].draw();
    }
  }


  if (newPlant != null) {
    newPlant.pos.x = mouseX;
    newPlant.pos.y = mouseY;
    newPlant.draw();

  }
}

function mouseClicked() {
  let mousePos = createVector(mouseX, mouseY);
  //go through all the game objects
  for (let i = 0; i < otherObjects.length; i++) {
    //does this object recieve clicks?
    if (otherObjects[i].onClick != null) {
      //is the mouse hovering over the object
      if (otherObjects[i].mouseOver(mousePos)) {
        //register the click
        otherObjects[i].onClick();
      }
    }
  }
}

function mouseReleased() {
  if (newPlant != null) {
    newPlant.plant();
    addGameObject(newPlant);
    newPlant = null;
  }
}


function findObjectsOfType(row,type){
  let found = [];
  for (const obj of backyardObjects[row]) {
    if(obj instanceof type){
      found.push(obj);
    }
  }
  
  return found;
}