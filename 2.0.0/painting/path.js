/*
 * @fileoverview 路径
 * @author yacheng.sz
 * @date 2013-7-9
*/
KISSY.add(function(S, E, D, N) {

    var $ = N.all;
    /**
        path 详解
        M   移动到（moveTo） (x y)+
        Z   闭合路径（closepath） (none)
        L   直线（lineTo）  (x y)+
        H   水平直线    x+
        V   垂直直线    y+
        C   曲线（curveto） (x1 y1 x2 y2 x y)+
        S   平滑曲线    (x2 y2 x y)+
        Q   二次贝赛尔曲线 (x1 y1 x y)+
        T   平滑二次贝塞尔曲线   (x y)+
        A   椭圆弧 (rx ry x-axis-rotation large-arc-flag sweep-flag x y)+
    */
    // 不对定位支持
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
                一些功能的支持
                SVG
                M，L，C，Z，Q
                VML
                M，L，C，X，qb
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
                self.thisNode = $(path); // 返回给上层调用

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
                    // 转换坐标系
                    .attr('CoordSize', brush.config.mapNode.width()+','+brush.config.mapNode.height())
                    .css({
                        'position':'absolute',
                        'top': 0,
                        'left': 0,
                        'width':brush.config.mapNode.width(),
                        'height':brush.config.mapNode.height()
                    });
                brush.config.mapNode.append(rect);
                self.thisNode = $(rect); // 返回给上层调用

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