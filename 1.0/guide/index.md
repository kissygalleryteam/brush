## 综述

brush是一个基于 css api 设计的矢量绘图库。
（基于 kissy，使用svg+vml实现，浏览器全兼容）

* 版本：1.0
* 作者：亚城
* demo：[http://gallery.kissyui.com/brush/1.0/demo/index.html](http://gallery.kissyui.com/brush/1.0/demo/index.html)

## 初始化组件

    S.use('gallery/brush/1.0/index', function (S, Brush) {

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


1.0版本基本api如下
* map // 画布、地图
  * width
  * height
  * backgroundColor
  * ...
* circle // 圆
  * top
  * left
  * bottom
  * right
  * width
  * height
  * backgroundColor
  * borderWidth
  * borderColor
* ellipse // 椭圆
  * top
  * left
  * bottom
  * right
  * width
  * height
  * backgroundColor
  * borderWidth
  * borderColor
* line // 线
  * points
  * borderWidth
  * borderColor
* path // 路径
  * path
  * backgroundColor
  * borderWidth
  * borderColor
* polygon // 多边形
  * points
  * borderWidth
  * borderColor
  * backgroundColor
* rect // 矩形
  * top
  * left
  * bottom
  * right
  * width
  * height
  * backgroundColor
  * borderWidth
  * borderColor

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