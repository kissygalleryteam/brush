/*
 * @fileoverview ·��
 * @author yacheng.sz
 * @date 2013-7-9
*/
KISSY.add(function(S, E, D, N) {

    var $ = N.all;
    /**
        path ���
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
                self.thisNode = $(path); // ���ظ��ϲ����

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
                self.thisNode = $(rect); // ���ظ��ϲ����

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