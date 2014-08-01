/**
 * @fileoverview ����
 * @author yacheng.sz
 * @date 2013-7-8
*/
KISSY.add(function(S, E, D, N) {

    var $ = N.all;
    /**
        ������ȥ�����������ֱȽϺ����õ���ķ�ʽ
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
                self.thisNode = $(line); // ���ظ��ϲ����

            }else{

                // VML
                var rect = document.createElement('v:polyLine');
                $(rect).attr('points', config.points)
                    .attr('filled', true)
                    .attr('strokeweight', config.borderWidth*0.8)
                    .attr('strokecolor', config.borderColor)
                    .css({
                        'position':'absolute',
                        'top':0, // ��λд������Ϊ�˽��ie��λbug
                        'left':0
                    });
                brush.config.mapNode.append(rect);
                self.thisNode = $(rect); // ���ظ��ϲ����

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