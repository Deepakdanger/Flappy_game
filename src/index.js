
let cvs = document.getElementById('canavas');
let ctx = cvs.getContext('2d');


let frames=0;

// Loading Images
let sprite = new Image();
sprite.src = "src/assets/images/sprite.png";
console.log(sprite);

//setting cloud

let cloud = {
    sX:0,
    sY:0,
    w:275,
    h:220,
    x:0,
    y:cvs.height-220,
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
        this.x= this.x - this.dx;
        if (this.x%50==0){
            this.x =0;
        }

    }
}
// For bird
const bird={
    animation:[
        {sX:276,sY:112},
        {sX:276,sY:139},
        {sX:276,sY:164},
        {sX:276,sY:139}
    ],
    x:60,
    y:150,
    w:34,
    h:26,
    frame:0,
    period:10,
    draw:function(){
        let bird = this.animation[this.frame];
        ctx.drawImage(sprite,bird.sX,bird.sY,this.w,this.h,this.x,this.y,this.w,this.h);

    },
    update:function(){
        this.frame = this.frame + frames%this.period == 0 ? 1:0;  //flapping the bird
        this.frame = this.frame % this.animation.length; //resetting the frame
    }
}
// for drawing
const draw = () => {
    cloud.draw();
    ground.draw();
    bird.draw();
};

// for update
const update = () => {
    ground.update();
    bird.update();
};

//Loop fuction
const loop = () => {
    draw();
    update();
    frames++;
    requestAnimationFrame(loop);
};
loop();


