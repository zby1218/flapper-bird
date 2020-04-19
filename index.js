


class SetTime{
    constructor(){
        this.timer = null;
    }
    start(interval){
        if(this.timer){
            console.log('已经有定时器存在了');
            return;
        }
        this.timer = setInterval(()=>{
            this.action();
        },interval)  
        
    }
    stop(){
        clearInterval(this.timer);
        //对定时器对象进行重置，否则对象有值start方法无法开启
        this.timer = null; 
    }
    //行为  如果未定义定位输出
    action(){
        console.log(undefined);
    }
}


class Sky{
    constructor(){
        this.dom = document.querySelector('.sky'),
        this.left = 0;
    }
    action(){
        
        this.left--;
        this.dom.style.left = `${this.left}px`;
        //获取宽度offsetwidth
        if(this.left <= -this.dom.offsetWidth/2){
            this.dom.style.left = `${0}px`
            this.left = 0;
        }
    }
}

class Land{
    constructor(){
        this.dom = document.querySelector('.land'),
        this.left = 0;
    }
    action(){
        
        this.left--;
        this.dom.style.left = `${this.left}px`;
        //获取宽度offsetwidth
        if(this.left <= -this.dom.offsetWidth/2){
            this.dom.style.left = `${0}px`
            this.left = 0;
        }
    }
}

class Bird{
    constructor(){
        this.dom = document.querySelector('.bird');
        this.top = 200;
        this.width = this.dom.offsetWidth;
        //鸟的翅膀状态
        this.status = 0;
        //鸟的速度
        this.v = 0;
        //鸟的加速度
        this.a = 0.01;
        //鸟的移动距离
        this.h = 0;
        //每次掉落的时间
        this.t = 20;
        this.distance = document.querySelector('.sky').offsetHeight - this.dom.offsetHeight;
    }
    //小鸟扇翅膀动画
    action(){
        if(this.status == 0){
            this.dom.style.backgroundPosition = '-8px -10px';
        }
        else if(this.status == 1){
            this.dom.style.backgroundPosition = '-60px -10px';
        }
        else{
            this.dom.style.backgroundPosition = '-113px -10px';
        }
        this.status = (++status)%3;
    }
    //小鸟跳跃函数
    jump(){
        this.v = -6;
    }
    //小鸟掉落函数
    drop(){
        //计算出新的速度及移动的距离
        this.h = this.v + 0.5 * this.a * this.t * this.t;
        this.v = this.v + this.a * this.t;
        this.top = this.top + this.h;
        //改变鸟的高度
        this.dom.style.top = `${this.top}px`;
     
        return this.top >= this.distance;
    }
}

class Pipe{
    constructor(){
        this.father = document.querySelector('.container');
        this.child = document.querySelector('.land');
        //整个的高度
        this.full = document.querySelector('.sky').offsetHeight;
        //设置两个柱子的上下间隔
        this.distance = document.querySelector('.sky').offsetHeight*0.3;
        this.left = this.father.offsetWidth * 1.1;
        //一个对象数组，存储每对管子
        this.allPipe = [];
    }
    //建造柱子
    build(){
        let pipeUp = document.createElement('div');
        pipeUp.className = 'pipeUp';
        pipeUp.style.bottom = `${document.querySelector('.land').offsetHeight}px`
        pipeUp.style.height = `${this.full * this.setHeight() / 100}px`;
        pipeUp.style.left = `${this.left}px`;

        let pipeDown = document.createElement('div');
        pipeDown.className = 'pipeDown';
        pipeDown.style.height = `${this.full - parseInt( pipeUp.style.height) - this.distance}px`
        
        pipeDown.style.left = `${this.left}px`;
        let left = this.left;

        this.father.insertBefore(pipeUp,this.child);
        this.father.insertBefore(pipeDown,this.child);
     
        //将生成的一对管子 当前的left值加入数组中
        this.allPipe.push({pipeUp , pipeDown , left});
    }
    //柱子高度计算
    setHeight(){
        let max = 60;
        let min = 10;
        return Math.random() * ( max - min + 1) + min ;
    }
    action(){
       for(let i = 0;i < this.allPipe.length;i++){
            console.log(i);
            
           this.allPipe[i].left--;
           this.allPipe[i].pipeDown.style.left = `${ this.allPipe[i].left}px`;
           this.allPipe[i].pipeUp.style.left= `${ this.allPipe[i].left}px`;
           if(this.allPipe[i].left<= -this.allPipe[i].pipeDown.offsetWidth){
           
                this.allPipe[i].pipeDown.style.display = 'none';
                this.allPipe[i].pipeUp.style.display = 'none';
                this.father.removeChild(this.allPipe[i].pipeDown);
                this.father.removeChild(this.allPipe[i].pipeUp);
                this.allPipe.shift();
          
               
           }
       } 
       
    }
}

class Game{
    constructor(){
        //游戏遮罩层
        this.show = document.querySelector('.show');
    }
    //游戏初始化 初始化所有对线
    init(){
        this.sky = new Sky();
        this.land = new Land();
        this.bird = new Bird();
        this.pipe = new Pipe();
        this.temp = new SetTime();
        this.flying = new SetTime();
        this.setPipe = new SetTime();
        //控制计时器的行为
        this.temp.action = ()=>{
            this.sky.action();
            this.land.action();
            this.pipe.action();
            let x = this.bird.drop(this.temp);
           
            if(x){
                this.over();
            }
            
        }
        this.flying.action = ()=>{
            this.bird.action();
           
        }
        this.setPipe.action = ()=>{
          
            this.pipe.build();
        }

    }
    //游戏开始
    start(){
        this.temp.start(20);
        this.flying.start(200);
        this.setPipe.start(3000);
    }
    //游戏暂停
    stop(){
        this.temp.stop();
        this.flying.stop();
        this.setPipe.stop();
    }
    //游戏结束
    over(){
        this.stop();
        this.show.style.opacity = '1';
    }
}

//初始化一个游戏类
let game = new Game();
game.init();
var isActing = false;
//绑定事件
document.addEventListener('keypress',(e)=>{
    console.log(e.key);
    
    //如果不在运动 回车开始游戏
    if(e.key == 'Enter' && isActing == false){
        //游戏开始
        game.start();
        isActing = true;
    }
    else if(e.key == 'Enter' && isActing == true){
        game.stop();
        isActing = false;
    }
    //如果在运动，空格键跳跃
    if(e.key == ' ' && isActing == true){
        game.bird.jump();
    }

}) 






