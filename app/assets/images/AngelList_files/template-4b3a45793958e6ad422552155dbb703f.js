(function(){define(["jquery","underscore"],function(t,e){return{render:function(t,n){var i;return i={interpolate:/\{\{(.+?)\}\}/g,evaluate:/\{\-(.+?)\-\}/g,escape:/\{\{\-(.+?)\-\}\}/g},e.template(t,n,i)}}})}).call(this);