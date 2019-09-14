<<<<<<< HEAD
# sellapp

> sellapp

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### 实战心得

#### 手机端测试

```java
host: '0.0.0.0' //修改这样可以通过ip:8080访问，手机也可以访问，不过要在同一个局域网
```

另外懒得输网址可以进入[草料](https://cli.im/)来生成二维码手机端扫码即可访问

#### 自适应

所有使得子元素脱离文档流的方法都会让父节点丧失随着子元素变大而变大的自适应

#### CSS格式化文件

去掉所有HTML的默认样式

```css
/**
 * Eric Meyer's Reset CSS v2.0 (http://meyerweb.com/eric/tools/css/reset/)
 * http://cssreset.com
 */
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header,
menu, nav, output, ruby, section, summary,
time, mark, audio, video, input {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font-weight: normal;
    vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, menu, nav, section {
    display: block;
}

body {
    line-height: 1;
}

blockquote, q {
    quotes: none;
}

blockquote:before, blockquote:after,
q:before, q:after {
    content: none;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

/* custom */
a {
    color: #7e8c8d;
    text-decoration: none;
    -webkit-backface-visibility: hidden;
}

li {
    list-style: none;
}

::-webkit-scrollbar {
    width: 5px;
    height: 5px;
}

::-webkit-scrollbar-track-piece {
    background-color: rgba(0, 0, 0, 0.2);
    -webkit-border-radius: 6px;
}

::-webkit-scrollbar-thumb:vertical {
    height: 5px;
    background-color: rgba(125, 125, 125, 0.7);
    -webkit-border-radius: 6px;
}

::-webkit-scrollbar-thumb:horizontal {
    width: 5px;
    background-color: rgba(125, 125, 125, 0.7);
    -webkit-border-radius: 6px;
}

html, body {
    width: 100%;
}

body {
    -webkit-text-size-adjust: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
```

#### float

https://blog.csdn.net/huhaha24/article/details/79595704

由于文档流都是一行行的所以要让div并排显示就需要浮动完成

浮动排列是更具前面一个元素，前面不浮动那么该元素也老老实实待在原地，否在更在上一个浮动元素后面

clear清除浮动只作用于当前元素，如果当前元素在文本流不是浮动元素，那么如果他因为父级元素浮动脱离文档流，而上移那么clear后仍然回到原来位置，如果是浮动元素那么就会不浮动换行排列但不影响其他元素浮动效果

```stylus
//自己实现的浮动清除
.clearfix
    display: inline-block
    &:after
        display: block
        clear: both
        height: 0
        line-height: 0
        content:''
        visibility: hidden
```

#### inline-block

可以让行元素变成块元素可以设置width,height而不局限于line-height用于插入小图标

常常和span,vertical-align:top,font-size:0联合使用

#### line-height和height

当line-height的值和height的值相同的时候,元素会自动上下居中,一般常用于文字中.只限于单行

多行的话line-height仍然表示单行高度，而height表示所有行整体高度,行元素居中使用line-height

块状元素用vertical-align,line-height可以继承父元素,如果使用父元素line-height导致行高过高，可以分别写到里面的子元素中

#### display

+ block 可以是a标签的连接为块状即使在他旁边点击也会触发,也可以使span标签独占一行

+ inline-block 有效解决了内联块的问题，**因为设置inline就表示为行内元素无法设置宽高**(比如span标签)，它是由行内元素长度大小决定的,而设置block则会单独占一行，所以使用Inline-block在行内设置width,height是很不错。选择.**inline-block两个块会有空余部分，消除它在父元素中使用font-size:0，然而font-size会继承下去所以要在子元素中重新定义font-size**,inline-block对齐可以使用vertical-align,inline-block需要在每个所要作用的元素上都设置一下

+ table 以类似于table的布局在父元素上加上table，如果只有一行可以省略table-row，只写table-cell，

  并且设置vertical-align=middle让他垂直居中显示

#### postion

> https://www.cnblogs.com/theWayToAce/p/5264436.html

**top,left优先级高于right,bottom**

+ relative **定位是相对于自身位置定位**，在没有设置宽度的情况下，宽度是整个浏览器的宽度,relative初始在

  父节点左上角(0,0)那么设置top,left效果和absolute类似如果不是，那么top=2px，意思就是当前位置下移2px（相当于把原来的位置作为参考，而absolute则以父节点作为参考）

  而absolute则会直接定位到和父节点距离2px的地方

+ absolute是相对于第一个父元素(relative/absolute)的布局，采用top,right来表示和父元素的距离，会脱离文档流，一般设置absolution，父节点会设置relative，一般的absolution看布局在哪里左上角就设置top right

  右下角就设置bottom left，另外两个属性距离父节点元值会很大所以不考虑，元素在没有设置宽度的情况下，宽度由元素里面的内容决定，所以设置absolute记得设置width，absolute是根据第一个非static的父元素扥**边框开始计算的**，另外不设置宽高可以更具里面内容自适应大小但div最多撑到父容器一样大，
  
+ fixed他固定在页面一处不敢怎么滚动页面位置都不会变化

+ sticky 相当于relative与fix结合，页面滚动sticky对应元素向上滚动就好像relative布局一样，到最上层或者最下层则变成fix一样固定住而不会消失

  在没有规定宽高时，absolute，fixed可以根据子节点内容调整父节点长宽，relative和static则在宽度上总是占据一行，高度由子节点决定

+ static 默认布局，不能使用其他布局的top,left,right,bottom

#### padding和margin

+ 由于中心内容大小不变，所以padding和margin都是在内容的基础上往外包裹,，padding和margin在原来的高度上增加，所以整体高度变高内容宽度不变，宽度要扣去现在的padding和margin，所以整体宽度不变但内容宽度变小，唯一的区别padding算作内边框每个盒子都会有，所以两个都设了padding则距离是两者之和，margin为外边框，两者都设置了可以共用算一个margin(取两个Margin中较大的,小的会被覆盖掉),即元素距离是两个padding距离，1个margin距离
+ margin和padding在父元素中产生移动效果实际上是由于自身盒子影响带来的假象，margin-top实际上只作用于子元素让他有了外边距，那么父元素不变情况下他就必须向下移动margin-top的值，所以感觉和相对布局效果类似
+ **如果元素有边框,padding和margin设置需要结合边框，padding外才是边框**

#### text-decoration

去掉下划线

#### font-size

字体大小，Chrome最小字体为12px，每一个字所占的单元小方块的长和宽，如font-size:14px就是14px*14px方块中放一个字

#### font-weight

字体粗细200为细，400正常，700为粗体，**注意没有单位px**

#### white-space

nowarp可以进行单行显示而不换行

    #### text-overflow

ellipsis用省略号表示显示不出来的文字

   #### overflow

元素内容太多被裁减表现出的状态，hidden表示多处内容不可见,scroll添加滚动可见

scroll完全可被auto代替，auto可以实现内容过多产生滚动条内容过少则不会显示而

scroll无论多少与否都会显示滚动条

#### z-index

用来设置背景图片，absolute布局，并且把图片和div都高宽都设成100%这样才能完全铺满父元素

#### filter

滤镜可以有很多方法，比如模糊，饱和，灰度，阴影

#### box-shadow

相对于施加阴影元素的位置，h-shadow v-shadow blur spread color inset

h-shadow为0，v-shadow为0则阴影会和元素完全重合

#### text-align

无法居中，请让width占据整个屏幕，对div没用，只对受div包裹的内容或者行内元素有用

margin:0 auto也能实现水平居中

#### width

两边留边可以使用80%实现

#### linkActiveClass 和 linkExactActiveClass

这两个属性分别对应vue-router的css样式

linkActiveClass代表当前匹配路由及父路由被激活的样式，默认值是router-link-active，你可以在new Router中重新设置属性（比如linkActiveClass:'xxx'）那么激活后的class就是xxx而不是router-link-active

 linkExactActiveClass只代表当前路由样式(精确匹配)，其余和上面类似，对router-link-exact-active可以进行替换成自己的class名

#### :after和:before

这两个伪类可以用来做水平线

#### Flex

>水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。

1. 总结即为：
   + 主轴:水平线
   + 交叉轴:垂直线
   + 水平线起始结束为main start,main end
   + 垂直线起始结束为cross start,start end
   + 每个小块长度为main size，高度为cross size

2. 容器属性，就是包裹一些下flex小块的大容器多对应属性

   + flex-direction 排列方式

   + flex-wrap 一行排不下是否换行

   + flex-flow 等于flex-direction:row;flex-wrap:nowrap 水平从左向右排列并且不换行

   + justify-content 水平方向对齐方式

   + align-items 垂直对齐方式

   + align-content 多种线条对齐

3. flex小块属性

   - order  小块排列顺序，越小的那个排列越前面
- flex-grow 对剩余控件的分配,0表示不分配,1表示等分
   - flex-shrink 空间不足自动缩小,0表示原比例不缩小,1表示自适应缩小
   - flex-basis 固定小块的长度
   - flex flex-grow+flex-shrink+flex-basis  相当于之前属性的结合
     + none(0 0 auto)   空间太大老样子,太小也是老样子
     + auto(1 1 auto)    空间太大均分,太小尺寸缩小长度
     + 默认(0 1 auto)   空间太大老样子,太小会缩小长度
   - align-self 当整体父容器设置对齐方式后，对里面特定的小块覆盖父容器的对齐方式，设置新的对齐方式

+ flex 在父节点设置后在子节点进行详细设置，一般适用于一边固定长度另一边自适应的情况

#### dpr

> 像素比 dpr 
> dpr 是物理像素与逻辑像素之间的比例。当像素比为1:1时，使用1个物理像素显示1个逻辑像素；当像素比为2:1时，使用4个物理像素（长2倍，宽2倍，乘起来就是4倍）显示1个逻辑像素。

> CSS中的 1px 并不等于设备的1px,CSS的1px代表的是逻辑像素而不是物理像素,物理像素是设备决定的(分辨率),从iphone4开始，推出了所谓的Retina屏，分辨率提高了一倍，变成640*960，但屏幕尺寸却没变化，这就意味着同样大小的屏幕上，像素却多了一倍，这时，1个CSS像素是等于4个物理像素的,所以同样设置宽高的图片设置，需要更高分辨率的图片才能是图片不糊

#### transition和animation

transition为过渡通常是所绑定元素属性变化，需要条件触发，css下需要focus,hover,使用js动态增加class才可以出发，起始状态定义标签内，hover定义过渡状态，通过来回hover切换两个样式，一班将过度时间定义在原标签里，在Vue中，fade-enter,.fade-leave-to定义起始状态，末状态为原标签定义

animation为动画不需要触发，通过在标签中注册动画名，使用@frame 定义动画，最多可以定义4个过程，不会来回切换只会重新播放

#### transform

不要和过渡搞错他是转换，只是个样式属性，实现2D，3D，还有旋转的效果

#### border-radius

可以用来绘制图形，最好作用于最小的区域，作用父节点可能会失效

% 代表边长的%多少作为水平或者垂直半径

px,rem表示水平或者垂直半径，有八条边所以有八组，但可以省略来简写

#### box-sizing
border-box可以让盒子模型的宽度=内容宽度+padding,之后你所设置的width,height都会包含padding

#### box-shadow

增加阴影，参数x,y,blur,spread,color

#### z-index

+ fixed,relative,absolute>static
+ z-index只能用于非static定位
+ z-index依赖于父亲的z-index，如果父亲z-index过小无论你z-index多大都是在别人下面(从父原则)

[详情](https://www.cnblogs.com/GeniusLyzh/p/4621335.html)

#### innerHeight，scrollHeight，clientHeight，offsetHeight

+ innerHeight用来计算整个屏幕高度，其余都是计算某个DOM
+ innerHeight() = height+padding+border+纵向滚动条
+ offsetHeight = height+padding+border
+ clientHeight = height+paddin
+ scrollHeight=滚动视图展开的高度，没有等于clientHeight

#### visibility和display

visibility:hidden 还是保护DOM的位置控件只是不现实，display就是完全看不到

#### color

边框色 rgb(7,17,27)

灰体字 rgb(147,153,159)

黑体字 rgb(7,17,27)

红色字:rgb(240,20,20)

#### combo

inline-block vertocal-align font-size

absolute relative width height

img width height

position: absolute;top: 0;left: 0;width: 100%;  占满全屏

#### 命名

text,wrapper,content,bulletin,icon,name.logo,container
=======
# sellWebAPP
a takeout webapp
>>>>>>> b0e84fed5f2f887f1aff69d6663c24929669dcc9
