(function(){var t=function(t,e){return function(){return t.apply(e,arguments)}},e=function(t,e){function r(){this.constructor=t}for(var i in e)n.call(e,i)&&(t[i]=e[i]);return r.prototype=e.prototype,t.prototype=new r,t.__super__=e.prototype,t},n={}.hasOwnProperty;define(["backbone","underscore"],function(n,r){var i;return i={},{get:function(o){var a;if(!r.isFunction(o))throw new Error("Must provide a class");return i[o]||(a=function(n){function i(){return this.bootstrap=t(this.bootstrap,this),i.__super__.constructor.apply(this,arguments)}return e(i,n),i.prototype.model=o,i.prototype.bootstrap=function(t,e){var n,i;if(null==e&&(e={}),null==t)throw new Error("Must pass an object, array of objects, or ID");if(r.isArray(t))return r.map(t,function(t){return function(n){return t.bootstrap(n,e)}}(this));if(r.defaults(e,{merge:!0}),n=o.prototype.idAttribute,r.isObject(t)){if(null==t[n])throw new Error("Can only bootstrap models which exist on the server")}else i={},i[n]=t,t=i;return this.add(t,e),this.get(t[n])},i}(n.Collection),i[o]=new a),i[o]}}})}).call(this);