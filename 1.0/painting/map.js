/**
 * @fileoverview map
 * @author yacheng.sz
 * @date 2013-7-4
*/
KISSY.add(function(S, E, D, N) {

    var $ = N.all;

    function Map(brush, config){

    	var self = this;
        self._init(brush, config);

    }

    S.augment(Map, S.EventTarget, {
        
        _init: function(brush, config){
            console.log(brush);
            // 添加滴入基础样式
            brush.config.mapNode.css({'position': 'relative'});

            // 添加地图样式
            for(k in config){
                brush.config.mapNode.css(k, config[k]);
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