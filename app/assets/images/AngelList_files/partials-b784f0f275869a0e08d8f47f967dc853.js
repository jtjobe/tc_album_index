(function(){var t=[].slice;define(["require","jquery","module"],function(e,n,i){return{classNames:function(t){var e,n,r,o,a,s,l,u,c,d,p;for(d=t.split("/"),a=d.pop(),n=d.join("/"),o=n.split(/[\/_]/),c="",l=0,u=o.length;u>l;l++)p=o[l],c+=p[0];return e=function(t){var e,n,i,r;for(r=0,e=n=0,i=t.length-1;i>=0?i>=n:n>=i;e=i>=0?++n:--n)r+=t.charAt(e).charCodeAt(0);return r%100},r="d"+c+e(n),s="f"+a.charAt(0)+a.charAt(a.length-1)+e(a),[i.config().root_class,r,s]},selector:function(t){var n;return n=e(i.id),"."+n.classNames(t).join(".")},rootSelector:function(){return"."+i.config().root_class},"with":function(){var n;return n=1<=arguments.length?t.call(arguments,0):[],void e(["initializer"],function(t){return t["with"].apply(void 0,n)})}}})}).call(this);