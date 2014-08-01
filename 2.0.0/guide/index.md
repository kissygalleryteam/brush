## 综述

brush是一个基于 css api 设计的矢量绘图库。
（基于 kissy，使用svg+vml实现，浏览器全兼容）

* 版本：2.0.0
* 作者：亚城
* demo：[http://kg.kissyui.com/brush/2.0.0/demo/index.html](http://kg.kissyui.com/brush/2.0.0/demo/index.html)

## 初始化组件

    S.use('kg/brush/2.0.0/index', function (S, Brush) {

        var brush = new Brush('#J_MapHook');
		
		// 创建画布
		brush.usePaper({
		    width: 800,
		    height: 300,
		    backgroundColor: '#e0e0e0'
		}).on('click', function(e){
			S.log('click the map');
		});

		// 画圆
		brush.draw.circle({
		    top: 60,
		    left: 60,
		    width: 200,
		    backgroundColor: '#e0e0e0',
		    borderWidth: 2,
		    borderColor: '#999'
		}).on('click', function(e){
		    S.log('click the circle');
		});;

    })

## API说明


2.0.0版本基本api如下
（返回对象支持链式调用KISSY方法）

### usePaper (创建画布)

属性名|参数类型|取值示例|描述
------------|------------|------------|-------------
width     |      String    |     '2.0.0'   |  
height     |     String    |     '2.0.0'      | 
backgroundColor     |    String    |     '#fff'      | 
...     |      String    |     '10'      | 其他css属性类似（这里仅针对usePaper）

### circle （圆）

属性名|参数类型|取值示例|描述
------------|------------|------------|-------------
top     |      String    |     '2.0.0'   |  相对画布的绝对定位
left     |      String    |     '2.0.0'   |  
bottom     |      String    |     '2.0.0'   |  
right     |      String    |     '2.0.0'   |  
width     |      String    |     '2.0.0'   |  width或height只定义一个就可以
height     |      String    |     '2.0.0'   |  
backgroundColor     |      String    |     '#fff'   |  
borderWidth     |      String    |     '2.0.0'   |  
borderColor     |      String    |     '2.0.0'   |  

### ellipse （椭圆）

属性名|参数类型|取值示例|描述
------------|------------|------------|-------------
top     |      String    |     '2.0.0'   | 
left     |      String    |     '2.0.0'   | 
bottom     |      String    |     '2.0.0'   | 
right     |      String    |     '2.0.0'   | 
width     |      String    |     '2.0.0'   | width和height同时需要
height     |      String    |     '2.0.0'   | 
backgroundColor     |      String    |     '#fff'   | 
borderWidth     |      String    |     '2.0.0'   | 
borderColor     |      String    |     '#fff'   | 

### line （线）

属性名|参数类型|取值示例|描述
------------|------------|------------|-------------
points     |      String    |     '40,20 50,10'   | 一组点的字符串
borderWidth     |      String    |     '2.0.0'   | 
borderColor     |      String    |     '#fff'   | 


### path （路径）

属性名|参数类型|取值示例|描述
------------|------------|------------|-------------
path     |      String    |     'M250 250C250 200 450 200 450 250'   | 详见下面说明
backgroundColor     |      String    |     '#fff'   | 
borderWidth     |      String    |     '2.0.0'   | 
borderColor     |      String    |     '#fff'   | 


### polygon （多边形）

属性名|参数类型|取值示例|描述
------------|------------|------------|-------------
points     |      String    |     '40,20 50,10'   | 
borderWidth     |      String    |     '2.0.0'   | 
borderColor     |      String    |     '#fff'   | 
backgroundColor     |      String    |     '#fff'   | 


### rect （矩形）

属性名|参数类型|取值示例|描述
------------|------------|------------|-------------
top     |      String    |     '2.0.0'   | 
left     |      String    |     '2.0.0'   | 
bottom     |      String    |     '2.0.0'   | 
right     |      String    |     '2.0.0'   | 
width     |      String    |     '2.0.0'   | 
height     |      String    |     '2.0.0'   | 
backgroundColor     |      String    |     '#fff'   | 
borderWidth     |      String    |     '2.0.0'   | 
borderColor     |      String    |     '#fff'   | 

## 特殊API说明

1、尽量模拟css的使用习惯，如top、width等

2、引入了两个非css特性，points（一组点）、path（路径）

path路径目前支持一些基础的功能（两种写法都兼容）
* SVG： M（移动到），L（直线），C（曲线），Z（闭合路径），Q（二次贝赛尔曲线）
* VML： M（移动到），L（直线），C（曲线），X（闭合路径），qb（二次贝赛尔曲线）

## brush 应用场景

* 情感化图标和icon，可与用户发生互动的小表情
* 创意logo绘制
* 制作页面彩蛋
* 活动页的各种好玩效果
* 非webfont的特殊字体解决方案