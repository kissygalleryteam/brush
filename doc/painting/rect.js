/**
 * @fileoverview 矩形
 * @author yacheng.sz
 * @date 2013-7-9
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
                self.thisNode = $(rect); // 返回给上层调用

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
                self.thisNode = $(rect); // 返回给上层调用

            }

        
        },

        // 坐标转换
        _readConfig: function(brush, config){

            var x, y;
            var mapWidth = brush.config.mapNode.width();
            var mapHeight = brush.config.mapNode.height();

            // 找当前定位的坐标计算x、y
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