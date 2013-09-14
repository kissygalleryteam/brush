/**
 * @fileoverview 
 * @author kissy-team<yacheng.sz@taobao.com>
 * @module brush
 **/
KISSY.add(function (S, Node,Base) {
    var EMPTY = '';
    var $ = Node.all;
    /**
     * 
     * @class Brush
     * @constructor
     * @extends Base
     */
    function Brush(comConfig) {
        var self = this;
        //调用父类构造函数
        Brush.superclass.constructor.call(self, comConfig);
    }
    S.extend(Brush, Base, /** @lends Brush.prototype*/{

    }, {ATTRS : /** @lends Brush*/{

    }});
    return Brush;
}, {requires:['node', 'base']});



