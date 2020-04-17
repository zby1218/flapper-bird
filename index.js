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

let sky = new Sky();
let land = new Land();
let temp = new SetTime();

temp.action = ()=>{
    sky.action();
    land.action();
}


var isActing = false;
document.addEventListener('keypress',(e)=>{
    console.log(e.key);
    
    //如果不在运动 回车开始游戏
    if(e.key == 'Enter' && isActing == false){
        temp.start(20)
        isActing = true;
    }
    else if(e.key == 'Enter' && isActing == true){
        temp.stop();
        isActing = false;
    }

}) 





