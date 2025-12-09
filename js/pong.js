//canvas and context
var c = document.querySelector(`#pong`)
var ctx = c.getContext(`2d`)

//timer to make the game run at 60fps
var timer = setInterval(main, 1000/60)

//global friction variable 
var fy = .97

// player array
var player = [];

player[0] = new player("Player 1");
player[0].pad = new Box();
player[0].pad.w = 20;
player[0].pad.h = 150;
player[0].pad.x = 0 + player[0].pad.w / 2;
player[0].pad.color = "blue";

player[1] = new player("Player 2");
player[1].pad = new Box();
player[1].pad.w = 20;
player[1].pad.h = 150;
player[1].pad.x = c.width - player[1].pad.w / 2;
player[1].pad.color = "orange";

var pad = [];
pad[0] = player[0].pad;
pad[1] = player[1].pad;

//ball setup
var ball = new Box();
ball.w = 20
ball.h = 20
ball.vx = -2
ball.vy = -2
ball.color = `black`

function main()
{
    //erases the canvas
    ctx.clearRect(0,0,c.width,c.height)
    
    //pad[0] (Player 1) accelerates when key is pressed 
    if(keys[`w`])
    {
       pad[0].vy += -pad[0].force
    }
    if(keys[`s`])
    {
        pad[0].vy += pad[0].force
    }

    //pad[1] (Player 2) Arrow key acceleration
    if(keys[`ArrowUp`])
    {
        pad[1].vy += -pad[1].force
    }
    if(keys[`ArrowDown`])
    {
        pad[1].vy += pad[1].force
    }

    //applies friction 
    pad[0].vy *= fy;
    pad[1].vy *= fy;  

    //player movement
    pad[0].move();
    pad[1].move();    

    //pad[0] collision with canvas
    if(pad[0].y < 0 + pad[0].h/2)
    {
        pad[0].y = 0 + pad[0].h/2
        pad[0].vy = 0
    }
    if(pad[0].y > c.height - pad[0].h/2)
    {
        pad[0].y = c.height - pad[0].h/2
        pad[0].vy = 0
    }

    //pad[1] collision with canvas 
    if(pad[1].y < 0 + pad[1].h/2)
    {
        pad[1].y = 0 + pad[1].h/2
        pad[1].vy = 0
    }
    if(pad[1].y > c.height - pad[1].h/2)
    {
        pad[1].y = c.height - pad[1].h/2
        pad[1].vy = 0
    }

    //ball movement
    ball.move()

    //ball collision with walls

    // Left side — Player 2 scores
    if(ball.x < 0)
    {
        player[1].score++;
        console.log(player[0].score + " | " + player[1].score);

        // reset ball to center
        ball.x = c.width/2;
        ball.y = c.height/2;

        // send ball toward Player 1 (right)
        if (ball.vx < 0) {
            ball.vx = -ball.vx;
        }
    }

    // Right side — Player 1 scores
    if(ball.x > c.width)
    {
        player[0].score++;
        console.log(player[0].score + " | " + player[1].score);

        // reset ball to center
        ball.x = c.width/2;
        ball.y = c.height/2;

        // send ball toward Player 2 (left)
        if (ball.vx > 0) 
        {
            ball.vx = -ball.vx;
        }
    }

    // Top / Bottom — bounce
    if(ball.y < 0)
    {
        ball.y = 0
        ball.vy = -ball.vy
    }
    if(ball.y > c.height)
    {
        ball.y = c.height
        ball.vy = -ball.vy
    }

    //pad[0] with ball collision 
    if(ball.collide(pad[0]))
    {
        ball.x = pad[0].x + pad[0].w/2 + ball.w/2
        ball.vx = -ball.vx;
    }

    //pad[1] with ball collision 
    if (ball.collide(pad[1])) 
    {
        ball.x = pad[1].x - pad[1].w/2 - ball.w/2;
        ball.vx = -Math.abs(ball.vx);
    }

    //DRAW 
    pad[0].draw()
    pad[1].draw() 
    ball.draw()
}
