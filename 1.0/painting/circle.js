/*
 * @fileoverview 画圆
 * @author yacheng.sz
 * @date 2013-7-4
*/
KISSY.add(function(S, E, D, N) {

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
                self.thisNode = $(circle); // 返回给上层调用

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
                        'top':xyObj.y - config.width/2, // 这里的定位要减去半径
                        'left':xyObj.x - config.width/2,
                        'width':config.width,
                        'height':config.width,
                        'antialias':true
                    });
                brush.config.mapNode.append(rect);
                self.thisNode = $(rect); // 返回给上层调用

            }
            // for(k in config){
            //     brush.css[k](brush.config.mapNode, config[k]);
            // }

        },

        // 坐标转换
        _readConfig: function(brush, config){

            var x, y;
            var mapWidth = brush.config.mapNode.width();
            var mapHeight = brush.config.mapNode.height();

            // 找当前定位的坐标计算x、y
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