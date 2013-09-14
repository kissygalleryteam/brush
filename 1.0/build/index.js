/*
combined files : 

gallery/brush/1.0/painting/map
gallery/brush/1.0/painting/circle
gallery/brush/1.0/painting/line
gallery/brush/1.0/painting/rect
gallery/brush/1.0/painting/ellipse
gallery/brush/1.0/painting/polygon
gallery/brush/1.0/painting/path
gallery/brush/1.0/index

*/
/**
 * @fileoverview map
 * @author yacheng.sz
 * @date 2013-7-4
*/
KISSY.add('gallery/brush/1.0/painting/map',function(S, E, D, N) {

    var $ = N.all;

    function Map(brush, config){

    	var self = this;
        self._init(brush, config);

    }

    S.augment(Map, S.EventTarget, {
        
        _init: function(brush, config){
            
            // ���ӵ���������ʽ
            brush.config.mapNode.css({'position': 'relative'});

            // ���ӵ�ͼ��ʽ
            for(k in config){
                brush.css[k](brush.config.mapNode, config[k]);
            }

            if(brush.ifSVG){
                var html = '<svg width="'+config.width+'" height="'+config.height+'" version="1.1" xmlns="http://www.w3.org/2000/svg"></svg>';
                brush.config.mapNode.append(html);
            }else{
                if(!document.namespaces.v){
                    document.namespaces.add('v', 'urn:schemas-microsoft-com:vml');
                }
                var css = document.createStyleSheet();      
                css.addRule('v\\:roundrect', 'behavior: url(#default#VML);display:inline-block;');
                css.addRule('v\\:polyLine', 'behavior: url(#default#VML);display:inline-block;');
                css.addRule('v\\:rect', 'behavior: url(#default#VML);display:inline-block;');
                css.addRule('v\\:oval', 'behavior: url(#default#VML);display:inline-block;');
                css.addRule('v\\:shape', 'behavior: url(#default#VML);display:inline-block;');
                var html = '<div style="width:'+config.width+'px; height:'+config.height+'px;"></div>';
                brush.config.mapNode.append(html);
            }
            

        }

    });
        
    return Map;

}, {
    requires:[
        'event',
        'dom',
        'node'
    ]
})
/**
 * NOTE:
 *
 */
/*
 * @fileoverview ��Բ
 * @author yacheng.sz
 * @date 2013-7-4
*/
KISSY.add('gallery/brush/1.0/painting/circle',function(S, E, D, N) {

    var $ = N.all;
    var defaultConfig = {
        top: -9999,
        left: -9999,
        right: -9999,
        bottom: -9999,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderColor: 'transparent'
    }

    function Circle(brush, config){

    	var self = this;
        self._init(brush, config);

    }

    S.augment(Circle, S.EventTarget, {
        
        _init: function(brush, config){

            var self = this;

            var config = S.merge(defaultConfig, config);
            if(config.width == 0 && config.height != 0){
                config.width = config.height;
            }
            var xyObj = self._readConfig(brush, config);

            if(brush.ifSVG){

                // SVG
                var circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
                $(circle).attr('cx', xyObj.x)
                    .attr('cy', xyObj.y)
                    .attr('r', config.width/2)
                    .attr('stroke', config.borderColor)
                    .attr('stroke-width', config.borderWidth)
                    .attr('fill', config.backgroundColor);

                brush.config.mapNode.append(circle);
                self.thisNode = $(circle); // ���ظ��ϲ�����

            }else{

                // VML
                var rect = document.createElement('v:roundrect');
                $(rect).attr('arcsize', config.width)
                    .attr('stroked', true)
                    .attr('strokecolor', config.borderColor)
                    .attr('strokeweight', config.borderWidth*0.8)
                    .attr('fillcolor', config.backgroundColor)
                    .css({
                        'position':'absolute',
                        'top':xyObj.y - config.width/2, // �����Ķ�λҪ��ȥ�뾶
                        'left':xyObj.x - config.width/2,
                        'width':config.width,
                        'height':config.width,
                        'antialias':true
                    });
                brush.config.mapNode.append(rect);
                self.thisNode = $(rect); // ���ظ��ϲ�����

            }
            // for(k in config){
            //     brush.css[k](brush.config.mapNode, config[k]);
            // }

        },

        // ����ת��
        _readConfig: function(brush, config){

            var x, y;
            var mapWidth = brush.config.mapNode.width();
            var mapHeight = brush.config.mapNode.height();

            // �ҵ�ǰ��λ����������x��y
            if(config.top != -9999 && config.left != -9999){

                x = config.left + config.width/2;
                y = config.top + config.width/2;

            }else if(config.top != -9999 && config.right != -9999){

                x = mapWidth - config.right - config.width/2;
                y = config.top + config.width/2;

            }else if(config.bottom != -9999 && config.left != -9999){

                x = config.left + config.width/2;
                y = mapHeight - config.bottom - config.width/2;

            }else if(config.bottom != -9999 && config.right != -9999){

                x = mapWidth - config.right - config.width/2;
                y = mapHeight - config.bottom - config.width/2;

            }

            return {
                x: x,
                y: y
            }

        }

    });
        
    return Circle;

}, {
    requires:[
        'event',
        'dom',
        'node'
    ]
})
/**
 * NOTE:
 *
 */
/**
 * @fileoverview ����
 * @author yacheng.sz
 * @date 2013-7-8
*/
KISSY.add('gallery/brush/1.0/painting/line',function(S, E, D, N) {

    var $ = N.all;
    /**
        ������ȥ�����������ֱȽϺ������õ����ķ�ʽ
        {
            points: '',
            borderWidth: 1,
            borderColor: #000
        }

    */
    var defaultConfig = {
        points: '',
        borderWidth: 0,
        borderColor: 'transparent'
    }

    function Line(brush, config){

    	var self = this;
        self._init(brush, config);

    }

    S.augment(Line, S.EventTarget, {
        
        _init: function(brush, config){

            var self = this;

            var config = S.merge(defaultConfig, config);
            var xyObj = self._readConfig(brush, config);

            if(brush.ifSVG){

                // SVG
                var line = document.createElementNS("http://www.w3.org/2000/svg","line");
                $(line).attr('x1', xyObj.x1)
                    .attr('y1', xyObj.y1)
                    .attr('x2', xyObj.x2)
                    .attr('y2', xyObj.y2)
                    .attr('stroke', config.borderColor)
                    .attr('stroke-width', config.borderWidth);

                brush.config.mapNode.append(line);
                self.thisNode = $(line); // ���ظ��ϲ�����

            }else{

                // VML
                var rect = document.createElement('v:polyLine');
                $(rect).attr('points', config.points)
                    .attr('filled', true)
                    .attr('strokeweight', config.borderWidth*0.8)
                    .attr('strokecolor', config.borderColor)
                    .css({
                        'position':'absolute',
                        'top':0, // ��λд������Ϊ�˽���ie��λbug
                        'left':0
                    });
                brush.config.mapNode.append(rect);
                self.thisNode = $(rect); // ���ظ��ϲ�����

            }

        },

        // ����ת��
        _readConfig: function(brush, config){

            var x1, x2, y1, y2;
            var points = config.points.split(' ');

            return {
                x1: points[0].split(',')[0],
                y1: points[0].split(',')[1],
                x2: points[1].split(',')[0],
                y2: points[1].split(',')[1]
            }

        }

    });
        
    return Line;

}, {
    requires:[
        'event',
        'dom',
        'node'
    ]
})
/**
 * NOTE:
 *
 */
/**
 * @fileoverview ����
 * @author yacheng.sz
 * @date 2013-7-9
*/
KISSY.add('gallery/brush/1.0/painting/rect',function(S, E, D, N) {

    var $ = N.all;
    var defaultConfig = {
        top: -9999,
        left: -9999,
        right: -9999,
        bottom: -9999,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderColor: 'transparent'
    }

    function Rect(brush, config){

        var self = this;
        self._init(brush, config);

    }

    S.augment(Rect, S.EventTarget, {
        
        _init: function(brush, config){

            var self = this;

            var config = S.merge(defaultConfig, config);
            var xyObj = self._readConfig(brush, config);

            if(brush.ifSVG){

                // SVG
                var rect = document.createElementNS("http://www.w3.org/2000/svg","rect");
                $(rect).attr('x', xyObj.x)
                    .attr('y', xyObj.y)
                    .attr('width', config.width)
                    .attr('height', config.height)
                    .attr('stroke', config.borderColor)
                    .attr('stroke-width', config.borderWidth)
                    .attr('fill', config.backgroundColor);

                brush.config.mapNode.append(rect);
                self.thisNode = $(rect); // ���ظ��ϲ�����

            }else{

                // VML
                var rect = document.createElement('v:rect');
                $(rect).attr('filled', true)
                    .attr('fillcolor', config.backgroundColor)
                    .attr('strokeweight', config.borderWidth*0.7)
                    .attr('strokecolor', config.borderColor)
                    .css({
                        'position': 'absolute',
                        'top':xyObj.y,
                        'left':xyObj.x,
                        'width':config.width,
                        'height':config.width
                    });
                brush.config.mapNode.append(rect);
                self.thisNode = $(rect); // ���ظ��ϲ�����

            }

        
        },

        // ����ת��
        _readConfig: function(brush, config){

            var x, y;
            var mapWidth = brush.config.mapNode.width();
            var mapHeight = brush.config.mapNode.height();

            // �ҵ�ǰ��λ����������x��y
            if(config.top != -9999 && config.left != -9999){

                x = config.left;
                y = config.top;

            }else if(config.top != -9999 && config.right != -9999){

                x = mapWidth - config.right - config.width;
                y = config.top;

            }else if(config.bottom != -9999 && config.left != -9999){

                x = config.left;
                y = mapHeight - config.bottom - config.height;

            }else if(config.bottom != -9999 && config.right != -9999){

                x = mapWidth - config.right - config.width;
                y = mapHeight - config.bottom - config.height;
                
            }

            return {
                x: x,
                y: y
            }

        }

    });
        
    return Rect;

}, {
    requires:[
        'event',
        'dom',
        'node'
    ]
})
/**
 * NOTE:
 *
 */
/*
 * @fileoverview ��Բ
 * @author yacheng.sz
 * @date 2013-7-4
*/
KISSY.add('gallery/brush/1.0/painting/ellipse',function(S, E, D, N) {

    var $ = N.all;
    var defaultConfig = {
        top: -9999,
        left: -9999,
        right: -9999,
        bottom: -9999,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderColor: 'transparent'
    }

    function Circle(brush, config){

        var self = this;
        self._init(brush, config);

    }

    S.augment(Circle, S.EventTarget, {
        
        _init: function(brush, config){

            var self = this;

            var config = S.merge(defaultConfig, config);
            var xyObj = self._readConfig(brush, config);

            if(brush.ifSVG){

                // SVG
                var ellipse = document.createElementNS("http://www.w3.org/2000/svg","ellipse");
                $(ellipse).attr('cx', xyObj.x)
                    .attr('cy', xyObj.y)
                    .attr('rx', config.width/2)
                    .attr('ry', config.height/2)
                    .attr('stroke', config.borderColor)
                    .attr('stroke-width', config.borderWidth)
                    .attr('fill', config.backgroundColor);

                brush.config.mapNode.append(ellipse);
                self.thisNode = $(ellipse); // ���ظ��ϲ�����

            }else{

                // VML
                var rect = document.createElement('v:oval');
                $(rect).attr('arcsize', config.width)
                    .attr('stroked', true)
                    .attr('strokecolor', config.borderColor)
                    .attr('strokeweight', config.borderWidth*0.8)
                    .attr('fillcolor', config.backgroundColor)
                    .css({
                        'position':'absolute',
                        'top':xyObj.y - config.height/2, // �����Ķ�λҪ��ȥ�뾶
                        'left':xyObj.x - config.width/2,
                        'width':config.width,
                        'height':config.height,
                        'antialias':true
                    });
                brush.config.mapNode.append(rect);
                self.thisNode = $(rect); // ���ظ��ϲ�����

            }

        },

        // ����ת��
        _readConfig: function(brush, config){

            var x, y;
            var mapWidth = brush.config.mapNode.width();
            var mapHeight = brush.config.mapNode.height();

            // �ҵ�ǰ��λ����������x��y
            if(config.top != -9999 && config.left != -9999){

                x = config.left + config.width/2;
                y = config.top + config.width/2;

            }else if(config.top != -9999 && config.right != -9999){

                x = mapWidth - config.right - config.width/2;
                y = config.top + config.width/2;

            }else if(config.bottom != -9999 && config.left != -9999){

                x = config.left + config.width/2;
                y = mapHeight - config.bottom - config.height/2;

            }else if(config.bottom != -9999 && config.right != -9999){

                x = mapWidth - config.right - config.width/2;
                y = mapHeight - config.bottom - config.height/2;

            }

            return {
                x: x,
                y: y
            }

        }

    });
        
    return Circle;

}, {
    requires:[
        'event',
        'dom',
        'node'
    ]
})
/**
 * NOTE:
 *
 */
/*
 * @fileoverview ������
 * @author yacheng.sz
 * @date 2013-7-9
 * TODO������right��bottom�������⣬��Ҫ�������������Ŀ���
 *        �ȽϾ��ᣬ�о����Է�����top��left��֧��
*/
KISSY.add('gallery/brush/1.0/painting/polygon',function(S, E, D, N) {

    var $ = N.all;
    var defaultConfig = {
        top: -9999,
        left: -9999,
        right: -9999,
        bottom: -9999,
        points: '',
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderColor: 'transparent'
    }

    function Circle(brush, config){

        var self = this;
        self._init(brush, config);

    }

    S.augment(Circle, S.EventTarget, {
        
        _init: function(brush, config){

            var self = this;

            var config = S.merge(defaultConfig, config);
            // var points = self._readConfig(brush, config); // ��ʱ��ȥ��

            if(brush.ifSVG){

                // SVG
                var polygon = document.createElementNS("http://www.w3.org/2000/svg","polygon");
                $(polygon).attr('points', config.points)
                    .attr('stroke', config.borderColor)
                    .attr('stroke-width', config.borderWidth)
                    .attr('fill', config.backgroundColor);

                brush.config.mapNode.append(polygon);
                self.thisNode = $(polygon); // ���ظ��ϲ�����

            }else{

                // VML
                var rect = document.createElement('v:polyLine');
                // VMLҪת�ص�Բ��
                config.points = config.points +' '+ config.points.split(' ')[0]
                $(rect).attr('points', config.points)
                    .attr('filled', true)
                    .attr('fillcolor', config.backgroundColor)
                    .attr('strokeweight', config.borderWidth*0.8)
                    .attr('strokecolor', config.borderColor)
                    .css({
                        'position':'absolute',
                        'top':0,
                        'left':0
                    });
                brush.config.mapNode.append(rect);
                self.thisNode = $(rect); // ���ظ��ϲ�����

            }

        },

        // ����ת��
        _readConfig: function(brush, config){

            var x, y;
            var mapWidth = brush.config.mapNode.width();
            var mapHeight = brush.config.mapNode.height();
            var pointArr = config.points.split(' ');
            var newPointStr = '';

            S.each(pointArr, function(item, index){

                var thisPoint = item.split(',');
                thisPoint[0] = parseInt(thisPoint[0]);
                thisPoint[1] = parseInt(thisPoint[1]);

                if(config.top != -9999 && config.left != -9999){

                    x = thisPoint[0] + config.left;
                    y = thisPoint[1] + config.top;

                }else if(config.top != -9999 && config.right != -9999){

                    x = thisPoint[0] - config.right ;
                    y = thisPoint[1] + config.top;

                }else if(config.bottom != -9999 && config.left != -9999){

                    x = thisPoint[0] + config.left;
                    y = thisPoint[1] - config.bottom;

                }else if(config.bottom != -9999 && config.right != -9999){

                    x = thisPoint[0] - config.right;
                    y = thisPoint[1] - config.bottom;

                }

                if(index == 0){
                    newPointStr += x+','+y;
                }else{
                    newPointStr += ' '+x+','+y;
                }

            });

            return newPointStr;

        }

    });
        
    return Circle;

}, {
    requires:[
        'event',
        'dom',
        'node'
    ]
})
/**
 * NOTE:
 *
 */
/*
 * @fileoverview ·��
 * @author yacheng.sz
 * @date 2013-7-9
*/
KISSY.add('gallery/brush/1.0/painting/path',function(S, E, D, N) {

    var $ = N.all;
    /**
        path ����
        M   �ƶ�����moveTo�� (x y)+
        Z   �պ�·����closepath�� (none)
        L   ֱ�ߣ�lineTo��  (x y)+
        H   ˮƽֱ��    x+
        V   ��ֱֱ��    y+
        C   ���ߣ�curveto�� (x1 y1 x2 y2 x y)+
        S   ƽ������    (x2 y2 x y)+
        Q   ���α��������� (x1 y1 x y)+
        T   ƽ�����α���������   (x y)+
        A   ��Բ�� (rx ry x-axis-rotation large-arc-flag sweep-flag x y)+
    */
    // ���Զ�λ֧��
    var defaultConfig = {
        path: '',
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderColor: 'transparent'
    }

    function Circle(brush, config){

        var self = this;
        self._init(brush, config);

    }

    S.augment(Circle, S.EventTarget, {
        
        _init: function(brush, config){

            var self = this;

            var config = S.merge(defaultConfig, config);

            /*
                һЩ���ܵ�֧��
                SVG
                M��L��C��Z��Q
                VML
                M��L��C��X��qb
            */

            if(brush.ifSVG){

                // SVG
                var path = document.createElementNS("http://www.w3.org/2000/svg","path");
                config.path = config.path
                    .replace(/X/, 'Z')
                    .replace(/qb/, 'Q');
                $(path).attr('d', config.path)
                    .attr('stroke', config.borderColor)
                    .attr('stroke-width', config.borderWidth)
                    .attr('fill', config.backgroundColor);
                brush.config.mapNode.append(path);
                self.thisNode = $(path); // ���ظ��ϲ�����

            }else{

                // VML
                var rect = document.createElement('v:shape');
                config.path = config.path
                    .replace(/Z/, 'X')
                    .replace(/Q/, 'qb');
                $(rect).attr('path', config.path)
                    .attr('filled', true)
                    .attr('fillcolor', config.backgroundColor)
                    .attr('strokeweight', config.borderWidth*0.8)
                    .attr('strokecolor', config.borderColor)
                    // ת������ϵ
                    .attr('CoordSize', brush.config.mapNode.width()+','+brush.config.mapNode.height())
                    .css({
                        'position':'absolute',
                        'top': 0,
                        'left': 0,
                        'width':brush.config.mapNode.width(),
                        'height':brush.config.mapNode.height()
                    });
                brush.config.mapNode.append(rect);
                self.thisNode = $(rect); // ���ظ��ϲ�����

            }

        
        }

    });
        
    return Circle;

}, {
    requires:[
        'event',
        'dom',
        'node'
    ]
})
/**
 * NOTE:
 *
 */
/**
 * @fileoverview 
 * @author kissy-team<yacheng.sz@taobao.com>
 * @module brush
 **/
KISSY.add('gallery/brush/1.0/index',function (S, Base, D, N, E, UA, Map, Circle, Line, Rect, Ellipse, Polygon, Path) {
    
    var EMPTY = '';
    var $ = N.all;
    var bursh = {
        ifSVG: true,
        config: {
        }
    };

    /**
     * 
     * @class Brush
     * @constructor
     * @extends Base
     */
    function Brush(hook) {
        
        var self = this;
        //调用父类构造函数
        Brush.superclass.constructor.call(self, comConfig);

        bursh.config.mapNode = $(hook);

        // 判断环境
        var ieEngine = document.documentMode || UA.ie;
        if(ieEngine<9){
            bursh.ifSVG = false;
        }

        // 载入基础设定和样式库
        bursh.css = Base.css;

    }
    S.extend(Brush, Base, /** @lends Brush.prototype*/{

        usePaper: function(config){
            
            var map = new Map(bursh, config);

            if(bursh.ifSVG){
                // 这是svg的情况
                bursh.config.mapNode = $(bursh.config.mapNode.children('svg')[0]);
            }else{
                bursh.config.mapNode = $(bursh.config.mapNode.children('div')[0]);
            }

            return bursh.config.mapNode;

        },

        draw: {

            // 线条
            line: function(config){

                var line = new Line(bursh, config);
                return line.thisNode;

            },

            // 圆形
            circle: function(config){

                var circle = new Circle(bursh, config);
                return circle.thisNode;

            },
            
            // 矩形
            rect: function(config){

                var rect = new Rect(bursh, config);
                return rect.thisNode;

            },
            
            // 椭圆
            ellipse: function(config){

                var ellipse = new Ellipse(bursh, config);
                return ellipse.thisNode;

            },

            // 多边形
            polygon: function(config){

                var polygon = new Polygon(bursh, config);
                return polygon.thisNode;

            },

            // 路径
            path: function(config){

                var path = new Path(bursh, config);
                return path.thisNode;

            }
            
        }

    }, {ATTRS : /** @lends Brush*/{

    }});
    return Brush;
}, {
    requires:[
        'base',
        'dom',
        'node',
        'event',
        'ua',
        './painting/map',
        './painting/circle',
        './painting/line',
        './painting/rect',
        './painting/ellipse',
        './painting/polygon',
        './painting/path'
    ]
});




