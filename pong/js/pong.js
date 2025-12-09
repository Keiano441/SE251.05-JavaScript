//canvas and context
var c = document.querySelector(`#pong`)
var ctx = c.getContext(`2d`)

//timer to make the game run at 60fps
var timer = setInterval(main, 1000/60)

//global friction variable 
var fy = .97

//p1 setup
var p1 = new Box();
p1.w = 20
p1.h = 150
p1.x = 0 + p1.w/2

//p2 setup 
var p2 = new Box();
p2.w = 20
p2.h = 150
p2.x = c.width - p2.w/2        
p2.color = `orange`             

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
    

    //p1 accelerates when key is pressed 
    if(keys[`w`])
    {
       p1.vy += -p1.force
    }
    if(keys[`s`])
    {
        p1.vy += p1.force
    }

    //p2 Arrow key acceleration
    if(keys[`ArrowUp`])
    {
        p2.vy += -p2.force
    }
    if(keys[`ArrowDown`])
    {
        p2.vy += p2.force
    }

    //applies friction 
    p1.vy *= fy
    p2.vy *= fy   

    //player movement
    p1.move();
    p2.move();    


    //p1 collision with canvas
    if(p1.y < 0+p1.h/2)
    {
        p1.y = 0+p1.h/2
        p1.vy = 0
    }
    if(p1.y > c.height-p1.h/2)
    {
        p1.y = c.height-p1.h/2
        p1.vy = 0
    }

    //p2 collision with canvas 
    if(p2.y < 0+p2.h/2)
    {
        p2.y = 0+p2.h/2
        p2.vy = 0
    }
    if(p2.y > c.height-p2.h/2)
    {
        p2.y = c.height-p2.h/2
        p2.vy = 0
    }

    //ball movement
    ball.move()

    //ball collision with walls

    // Left side — your starter already resets to center (keep it)
    if(ball.x < 0)
    {
        ball.x = c.width/2
        ball.y = c.height/2
    }

    //right side — reset to center
    if(ball.x > c.width)
    {
        ball.x = c.width/2
        ball.y = c.height/2

        if (ball.vx > 0) ball.vx = -Math.abs(ball.vx)
    }

    // Top / Bottom — bounce (unchanged)
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

    //p1 with ball collision 
    if(ball.collide(p1))
    {
        ball.x = p1.x + p1.w/2 + ball.w/2
        ball.vx = -ball.vx;
    }

    //p2 with ball collision 
    if(ball.collide(p2))
    {
        ball.x = p2.x + p2.w/2 + ball.w/2
        ball.vx = -Math.abs(ball.vx)
      
    }

    //DRAW 
    p1.draw()
    p2.draw() 
    ball.draw()
}
