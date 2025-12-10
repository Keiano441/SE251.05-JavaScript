//canvas and context
var c = document.querySelector(`#pong`);
var ctx = c.getContext(`2d`);
var states = [];
var o = [];
var pad = [];
var g = [];
var goals = [];
var sides = {
        top: c.height/2 + (c.height/2 * -1), 
        right: c.width/2 + (c.width/2 * 1), 
        bottom: c.height/2 + (c.height/2 * 1), 
        left: c.width/2 + (c.width/2 * -1)
    };
var timer, ball, currentState;
var scoreBoard;
var player = [
    new User().setProps({h:150,  force:1, fill:`#ffff00`}),
    new User().setProps({h:150,  force:1, fill:`#ffff00`, keys:{u:`ArrowUp`, d:`ArrowDown`, s:`ArrowLeft`}})
]


init();

//Main Game Loop
function main()
{
    //erases the canvas
    ctx.clearRect(0,0,c.width,c.height);
    states[currentState]();
}

function init()
{   
    //pad 1 and 2
    o[0] = new Box().setProps(player[0]).setProps({x:10, dir:1});
    o[1] = new Box().setProps(player[1]).setProps({x:c.width-10, dir:-1});
    //ball
    o[2] = new Box().setProps({w:20, h:20, vx:-2, vy:0, fill:`rgb(255,255,255)`});
    //goals 1 and 2
    o[3] = new Box().setProps({x:o[0].x + ((c.width +10 ) * o[0].dir), h:c.height, w:20, fill:`green`});
    o[4] = new Box().setProps({x:o[1].x + ((c.width +10 ) * o[1].dir), h:c.height, w:20});
    
    player[0].pad = o[0];
    player[1].pad = o[1];

    pad = [o[0], o[1]]
    ball = o[2]
    goals = [o[3], o[4]]
    scoreBoard = document.querySelectorAll(`#score div p`);
    currentState = `game`;
    //timer to make the game run at 60fps
    clearTimeout(timer);
    timer = setInterval(main, 1000/60);
}


states[`pause`] = function(){
    o.forEach(function (i){
        i.draw()
    })
    if(keys[`Escape`])
    {
        currentState =`game`
    }
   
}
states[`game`] = function()
{

  
    //ball movement
    ball.move();

    if(ball.y < sides.top + ball.h/2)
    {
        ball.y = sides.top + ball.h/2;
        ball.vy = -ball.vy;
    }
    if(ball.y > sides.bottom - ball.h/2)
    {
        ball.y = sides.bottom - ball.h/2;
        ball.vy = -ball.vy;
    }

    for(let i=0; i<pad.length; i++)
    {
        if(keys[player[i].keys.u])
        {
            pad[i].vy += -player[i].force;
        }

        if(keys[player[i].keys.d])
        {
            pad[i].vy += player[i].force;
        }

        
        //applies friction
        pad[i].vy *= player[i].fy;
        //player movement
        pad[i].move();

        //pad[0] collision
        if(pad[i].y < pad[i].h/2)
        {
            pad[i].y = pad[i].h/2;
            pad[i].vy =0;
        }
        if(pad[i].y > c.height-pad[i].h/2)
        {
            pad[i].y = c.height-pad[i].h/2;
            pad[i].vy =0;
        }
        
        if(ball.collide(goals[i]))
        {
            ball.x = c.width/2;
            player[i].score++;
            scoreBoard[i].innerHTML = player[i].score;
        }

        if(ball.collide(pad[i]))
        {
            ball.x = pad[i].x + pad[i].dir * (pad[i].w/2 + ball.w/2);
            ball.vx = pad[i].dir * player[i].power;
            
            if(keys[player[i].keys.s])
            {
                ball.vy = 0;
                ball.vx = player[i].power * pad[i].dir
            }
            else
            {
                if(ball.y < pad[i].y - pad[i].h/6)
                {
                    ball.vy = -player[i].power;
                }
                if(ball.y > pad[i].y + pad[i].h/6)
                {
                    ball.vy = player[i].power;
                }
            }
        }
       
    }
    
    //draw the objects (Uses the array forEach function where i is the object stored in the o Array)
    o.forEach(function (i){
        i.draw()
    })
    pad.forEach(function(i){
        i.debug()
    })

}




