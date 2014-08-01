/*
 * @fileoverview 多边形
 * @author yacheng.sz
 * @date 2013-7-9
 * TODO：现在right和bottom还有问题，需要计算虚拟区域的宽高
 *        比较纠结，感觉可以放弃对top和left的支持
*/
KISSY.add(function(S, E, D, N) {

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
            // var points = self._readConfig(brush, config); // 暂时先去掉

            if(brush.ifSVG){

                // SVG
                var polygon = document.createElementNS("http://www.w3.org/2000/svg","polygon");
                $(polygon).attr('points', config.points)
                    .attr('stroke', config.borderColor)
                    .attr('stroke-width', config.borderWidth)
                    .attr('fill', config.backgroundColor);

                brush.config.mapNode.append(polygon);
                self.thisNode = $(polygon); // 返回给上层调用

            }else{

                // VML
                var rect = document.createElement('v:polyLine');
                // VML要转回到圆点
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
                self.thisNode = $(rect); // 返回给上层调用

            }

        },

        // 坐标转换
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