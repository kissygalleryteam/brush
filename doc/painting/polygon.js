/*
 * @fileoverview �����
 * @author yacheng.sz
 * @date 2013-7-9
 * TODO������right��bottom�������⣬��Ҫ������������Ŀ��
 *        �ȽϾ��ᣬ�о����Է�����top��left��֧��
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
            // var points = self._readConfig(brush, config); // ��ʱ��ȥ��

            if(brush.ifSVG){

                // SVG
                var polygon = document.createElementNS("http://www.w3.org/2000/svg","polygon");
                $(polygon).attr('points', config.points)
                    .attr('stroke', config.borderColor)
                    .attr('stroke-width', config.borderWidth)
                    .attr('fill', config.backgroundColor);

                brush.config.mapNode.append(polygon);
                self.thisNode = $(polygon); // ���ظ��ϲ����

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
                self.thisNode = $(rect); // ���ظ��ϲ����

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