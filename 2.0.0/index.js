/**
 * @fileoverview 
 * @author kissy-team<yacheng.sz@taobao.com>
 * @module brush
 **/
KISSY.add(function (S, Base, D, N, E, UA, Map, Circle, Line, Rect, Ellipse, Polygon, Path) {
    
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
        Brush.superclass.constructor.call(self, {});

        bursh.config.mapNode = $(hook);

        // 判断环境
        var ieEngine = document.documentMode || UA.ie;
        if(ieEngine<9){
            bursh.ifSVG = false;
        }

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



