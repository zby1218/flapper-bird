##  原生JS实现flappyBird

### 项目简介

使用原生JS，通过ES6练习面向对象思想，设置重力效果，进行碰撞检测从而实现Flappybird游戏，

### 设计思路

- 为了实现小鸟的飞行效果，使用定时器对天空及陆地进行移动，动态添加管子实现类似小鸟飞行的效果
- 游戏中设计天空移动，陆地移动，管道移动，小鸟扇动翅膀，因此定时器存在多个，设置一个类产生定时器
- 小鸟的跳动通过设置重力动态计算速度，通过改变速度即可实现跳跃及掉落
- 对碰撞进行检测

#### 类及其结构

```js
定时器设置类 {
    开启定时器start
    停止定时器stop
    定时器运行时执行的函数action
}
//
天空类{
    天空移动函数action
    //left-- 图片设置为二倍宽度，到达一倍宽度时再将left置零实现移动
}
大地类{
	大地移动函数action
    //同上
}
小鸟类{
    小鸟翅膀扇动函数action
    小鸟掉落函数drop
    小鸟跳跃函数jump
}
管道类{
    生成管道函数build
    管道随机高度函数setHeight
    管道运动函数action
}
游戏类{
	初始化init
    //初始上面的所有类
    开始游戏函数start
    //开启所有的定时器
    游戏暂停函数stop
    游戏停止函数over
    碰撞检测函数judge
}
```



#### 定时器设置

```js
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
```

- start开启一个定时器，传入参数为执行间隔
- action为定时器每次要执行的行为，后续统一设置

【注】设置this.timer对定时器加锁，防止定时器的多次开启

​	    清楚定时器后对定时器对象置null,否则定时器不能再次开启

#### 小鸟扇动翅膀

在鸟的类中设置一个状态位，每个状态位对应一个图片，快速替换图片即可

#### 小鸟掉落函数

在鸟的类中设置小鸟的初速度，每次移动的高度，每次获取一次赋值即可

通过`v = v + a * t`  `h = v + 0.5 *a * t * t `

计算新的速度及移动的距离，对小鸟top进行赋值即可

a及t可以自行设置，我的设置为 0.01 20

```js
 drop(){
        //计算出新的速度及移动的距离
        this.h = this.v + 0.5 * this.a * this.t * this.t;
        this.v = this.v + this.a * this.t;
     	//对新top进行记录
        this.top = this.top + this.h;
        //改变鸟的高度
        this.dom.style.top = `${this.top}px`;
     	//后续的碰撞检测
        this.positionY = parseInt(this.dom.style.top) + this.height /2;
     	//当前top值是否碰到了大地？停止：继续
        return this.top >= this.distance;
    }
```

#### 小鸟跳跃函数

将`v`设置为一个负值即可

#### 管道生成函数

设置一个管道类，在一个固定位置通过定时器产生管道，产生的管道存入数组中便于管理，管道的生成有以下几个要点

- 长度要随机
  - 管道间的间隔是一个定制，我设置为整体高度的30%
  - 设置一个区间，生成这个区间内的随机数，作为一个管道的高度
  - 剩下的管道通过总高度 - 随机的管道高度 - 管道间隔计算
- 将每对管道作为对象存入数组中，方便其移动及后面的碰撞检测

#### 管道移动函数

遍历管道对象数组，统一left--即可

#### 碰撞检测

中心点：矩形宽高的一半

发生碰撞的条件是

小鸟中心点到管道中心点的横向距离小于小鸟及管道宽度的和的一半同时

小鸟中心点到管道中心点的纵向距离小于小鸟及管道高度的和的一半

----

[详细代码及注释](https://github.com/zby1218/flapper-bird)

