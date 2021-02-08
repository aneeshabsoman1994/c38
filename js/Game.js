class Game {
  constructor() {}
  
  getState() {
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value", function(data) {
       gameState = data.val();
    })
  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if(gameState === 0) {      
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");

      if(playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      
      form = new Form();
      form.display();
    }
    
     car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);

    cars = [car1, car2, car3, car4];
  }

  play() {
    form.hide();
    //show on the screen game to start in position 120,100
    // textSize(30);
    //text("Game Start", 120, 100);

    //getting all the players data by calling the static function from player class
    Player.getPlayerInfo();

    //Display all the info on screen=name,distnace
    if(allPlayers !== undefined) {
      
    //  for(var plr in allPlayers) {
        //first time plr=1, index=1
        //second time plr=2, index=2
        //third time plr=3, index=3
        //fourth time plr=4, index=4

        //meaning of index
        //When data objects are stored in an array, 
        //individual objects are selected by an index that is usually a non-negative scalar integer. 
        //Indexes are also called subscripts. 
        //An index maps the array value to a stored object

      
      var x = 0;
      var y;
      
      //index for the array
      var index = 0;
    
     for(var plr in allPlayers){
        //adding 1 to the index for every loop
        index = index + 1;                            //first time, index=1
                                                                  
        //position the cars a little awayfrom each other in x direction
        x = x + 200;

        //for the y position of the sprite, we will use distance data from the database
        y = displayHeight - allPlayers[plr].distance;

        cars[index-1].x = x;               
        cars[index-1].y = y;
        
       if(index===player.index){
        cars[index-1].shapeColor="red";

       camera.position.x=displayWidth/2;
       camera.position.y=cars[index-1].y;
       }
        //text(allPlayers[plr].name,allPlayers[plr].distance,120,display_position);       
      }
    }

    //Whenever the keydown is pressed we want the distance to increase by 5 and the function updatew to be called 
    //so that the distance gets updated in the database
    if(keyIsDown(UP_ARROW) && player.index!==null) {
      player.distance+= 50;
      player.update();
    }
    
    drawSprites();
  }
}


