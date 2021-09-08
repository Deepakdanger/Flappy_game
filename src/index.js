
let cvs = document.getElementById('canavas');
let ctx = cvs.getContext('2d');


let frames=0;
let count=0;

// Loading Images
let sprite = new Image();
sprite.src = "src/assets/images/sprite.png";
let birdpic = new Image();
birdpic.src ="src/assets/images/frame.png";
let alienpic = new Image();
alienpic.src ="src/assets/images/alien.png";
let fireballpic = new Image();
fireballpic.src ="src/assets/images/fireball.png";

//loading audio
let die=new Audio();
die.src="src/assets/audio/die.wav";

let music=new Audio();
music.src="src/assets/audio/dreams.mp3";

let hit=new Audio();
hit.src="src/assets/audio/hit.wav";

let point=new Audio();
point.src="src/assets/audio/point.wav";

let swooshing=new Audio();
swooshing.src="src/assets/audio/swooshing.wav";

music.play();


//game page
const state={
    current:0,
    getReady:0,
    game:1,
    gameOver:2
}

cvs.addEventListener("click",function(){
    switch(state.current){
        case state.getReady:
            if(state.current==state.getReady){
                music.play();
                music.volume=0.2;
            }
            state.current= state.game;
            swooshing.play();
            break;
        case state.game:
            bird.move();
            break;
        case state.gameOver:
            state.current = state.getReady;           
            music.load();
            pipes.reset();
            ball.reset();
            score.reset();
            break;
    }
})


//1st page
const getReady ={
    sX:0,
    sY:228,
    w:173,
    h:152,
    x:cvs.width/2-(173/2),
    y:200,
    draw:function(){
        if(state.current==state.getReady){
        ctx.drawImage(sprite,this.sX,this.sY,this.w,this.h,this.x,this.y,this.w,this.h);
       }
    }
}

//last page
const gameOver ={
    sX:175,
    sY:228,
    w:225,
    h:202,
    x:cvs.width/2-(225/2),
    y:200,
    draw:function(){
        if(state.current==state.gameOver){
        ctx.drawImage(sprite,this.sX,this.sY,this.w,this.h,this.x,this.y,this.w,this.h);
        }
    }
}

//setting cloud

let cloud = {
    sX:0,
    sY:0,
    w:275,
    h:220,
    x:0,
    y:cvs.height-280,
    draw:function(){
       ctx.drawImage(sprite,this.sX,this.sY,this.w,this.h,this.x,this.y,this.w,this.h);
       ctx.drawImage(sprite,this.sX,this.sY,this.w,this.h,this.x + this.w,this.y,this.w,this.h);
       ctx.drawImage(sprite,this.sX,this.sY,this.w,this.h,this.x + 2*(this.w),this.y,this.w,this.h);
       ctx.drawImage(sprite,this.sX,this.sY,this.w,this.h,this.x + 3*(this.w),this.y,this.w,this.h);
       ctx.drawImage(sprite,this.sX,this.sY,this.w,this.h,this.x + 4*(this.w),this.y,this.w,this.h);
    }
}

//setting ground

let ground = {
    sX:276,
    sY:0,
    w:224,
    h:112,
    x:0,
    y:cvs.height-112,
    dx:3,
    draw:function(){
       ctx.drawImage(sprite,this.sX,this.sY,this.w,this.h,this.x,this.y,this.w,this.h);
       ctx.drawImage(sprite,this.sX,this.sY,this.w,this.h,this.x + this.w,this.y,this.w,this.h);
       ctx.drawImage(sprite,this.sX,this.sY,this.w,this.h,this.x + 2*(this.w),this.y,this.w,this.h);
       ctx.drawImage(sprite,this.sX,this.sY,this.w,this.h,this.x + 3*(this.w),this.y,this.w,this.h);
       ctx.drawImage(sprite,this.sX,this.sY,this.w,this.h,this.x + 4*(this.w),this.y,this.w,this.h);
       ctx.drawImage(sprite,this.sX,this.sY,this.w,this.h,this.x + 5*(this.w),this.y,this.w,this.h);
       ctx.drawImage(sprite,this.sX,this.sY,this.w,this.h,this.x + 6*(this.w),this.y,this.w,this.h);
    },
    update:function(){
        if(state.current==state.game){
            this.x= this.x - this.dx;
            if (this.x%50==0){
                this.x =0;
            }
        }

    }
}
// For bird
const bird={
    animation:[
        {sX:0,sY:0},
        {sX:282,sY:1},
        {sX:0,sY:234},
        {sX:282,sY:1}
    ],
    die:[
        {sX:272,sY:231}
    ],
    x:70,
    y:150,
    w1:275,
    h1:213,
    w:36,
    h:28,
    frame:0,
    period:5,
    speed:0,
    gravity:0.20,
    jump:4.6,
    radius:13,
    draw:function(){
        if(state.current !== state.gameOver){
            let bird = this.animation[this.frame];
            ctx.drawImage(birdpic,bird.sX,bird.sY,this.w1,this.h1,this.x-this.w/2,this.y-this.h/2,this.w,this.h);
        }
        if(state.current==state.gameOver){
            ctx.drawImage(birdpic,this.die[0].sX,this.die[0].sY,this.w1,this.h1,this.x-this.w/2,this.y-this.h/2,this.w,this.h);
        }
    },
    update:function(){
        this.period=state.current==state.getReady?10:5;
        this.frame += frames%this.period==0 ? 1:0;  //flapping the bird
        this.frame = this.frame%this.animation.length; //resetting the frame
        // gravity
        if(state.current==state.getReady){
            this.y=150;
        }else{
            this.y+= this.speed;
            this.speed += this.gravity;
        }
        if(this.y+this.h/2 >= cvs.height-ground.h){
            this.speed =0;
            this.frame =0;
            if(state.current==state.game){
                music.pause();
                state.current=state.gameOver;
                die.play();
            }          
        }
    },
    move:function(){
        this.speed = -this.jump;
    }
}

//pipes

const pipes={
    position:[],
    top:{
        sX:553,
        sY:0,
    },
    bottom:{
        sX:502,
        sY:0,
    },
    w:53,
    h:400,
    gap:120,
    maxYPos: -150,
    dx:3,
    draw:function(){
        for(let i=0;i<this.position.length;i++){
            let p= this.position[i];
            let topYPos= p.y;
            let bottomYPos=p.y+this.h+this.gap;
            //top pipe
            ctx.drawImage(sprite,this.top.sX,this.top.sY,this.w,this.h,p.x,topYPos,this.w,this.h);
            ctx.drawImage(sprite,this.bottom.sX,this.bottom.sY,this.w,this.h,p.x,bottomYPos,this.w,this.h);
        }
    },
    update:function(){
        if(state.current !== state.game){
            return;
        }
        if(frames%100==0){
            this.position.push({
                x:cvs.width,
                y:this.maxYPos*(Math.random()+1),
            });
        }
        for(let i=0;i<this.position.length;i++){
            let p= this.position[i];
            p.x=p.x-this.dx;

            //remove pipes
            if(p.x+this.w<=0){
                this.position.shift();
                //scoring
                point.play();
                score.value+=1;
                score.bestscore=Math.max(score.value,score.bestscore);
                localStorage.setItem("bestscore",score.bestscore);
            }
            //collision with the pipe
            if(bird.x+bird.radius>p.x && bird.x-bird.radius<p.x+this.w &&
                bird.y+bird.radius>p.y && bird.y-bird.radius<p.y+this.h){
                    hit.play();
                    music.pause();
                    state.current=state.gameOver;
                }
            let tobp=p.y+this.h+this.gap;
            if(bird.x+bird.radius>p.x && bird.x-bird.radius<p.x+this.w &&
                bird.y+bird.radius>tobp && bird.y-bird.radius<tobp+this.h){
                    hit.play();
                    music.pause();
                    state.current=state.gameOver;
            }
        }
        
    },
    reset:function(){
        this.position=[];
    }
    
}

//for alien
const alien={
    sX:0,
    sY:0,    
    w:464,
    h:506,
    x2:cvs.width-100,
    y2:80,
    w2:65,
    h2:65,
    dx:1,
    draw:function(){
        ctx.drawImage(alienpic,this.sX,this.sY,this.w,this.h,this.x2,this.y2,this.w2,this.h2);     
    },
    update:function(){
        if(state.current==state.game){   
            console.log(count);
            if(count>600){
                count=0;
            }                  
            if(count < 300){
                this.y2 += this.dx;
                count += 1;
            }else{
                this.y2 -= this.dx;
                count += 1;
            }
        }
    }
}
// for fireball
const ball={
    ball_position:[],
    w:45,
    h:20,
    sX:0,
    sY:0,
    dx:4,
    draw:function(){
        for(let i=0;i<this.ball_position.length;i++){
            let p=this.ball_position[i];
            ctx.drawImage(fireballpic,this.sX,this.sY,64,64,p.x,p.y,this.w,this.h)
        }

    },
    update:function(){
        if(state.current!==state.game){
            return;
        }
        if(frames%100==0){
            this.ball_position.push({
                x:cvs.width-100,
                y:alien.y2,
            });
        }
        for(let i=0;i<this.ball_position.length;i++){
            let p=this.ball_position[i];
            p.x -= this.dx;

            if(p.x+this.width<=0){
                this.ball_position.shift();
            }
            //collison
            if(bird.x+bird.radius>p.x && bird.x-bird.radius<p.x+this.w &&
                bird.y+bird.radius>p.y && bird.y-bird.radius<p.y+this.h){
                    hit.play();
                    music.pause();
                    state.current=state.gameOver;
                }
        }

    },
    reset:function(){
        this.ball_position=[];
    }
}

// for scoring
const score={
    bestscore:parseInt(localStorage.getItem("bestscore")) || 0,
    value:0,
    draw:function(){
        ctx.fillStyle="#000000";  
        if(state.current==state.game){                  
            ctx.font="40px teko";
            ctx.fillText(this.value,100,80);
        }else if(state.current==state.gameOver){
            ctx.font="25px teko";
            ctx.fillText(this.value,cvs.width/2+65,300);

            ctx.font="25px teko";
            ctx.fillText(this.bestscore,cvs.width/2+65,340);
        }
    },
    reset:function(){
        this.value=0;
    }

}

// for drawing
const draw = () => {
    ctx.fillStyle="#70c5ce";
    ctx.fillRect(0,0,cvs.width,cvs.height);
    cloud.draw();
    pipes.draw();
    ball.draw();
    ground.draw();   
    bird.draw();
    alien.draw();
    getReady.draw();
    gameOver.draw();
    score.draw();
};

// for update
const update = () => {
    ground.update();
    bird.update();
    pipes.update();
    alien.update();
    ball.update();
};

//Loop fuction
const loop = () => {
    draw();
    update();
    frames++;
    requestAnimationFrame(loop);
};
loop();


