(function(){var t=function(t,n){function r(){this.constructor=t}for(var i in n)e.call(n,i)&&(t[i]=n[i]);return r.prototype=n.prototype,t.prototype=new r,t.__super__=n.prototype,t},e={}.hasOwnProperty;define(["models/base","load"],function(e){var n;return n=function(e){function n(){return n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.screenshots=function(t,e){var n,r,i,o,a,s,l,u,c,d;for(null==e&&(e={}),l=[],this.has(e.locationProperty)&&(l=this.get(e.locationProperty).split(",")),d=[],r=0,a=l.length;a>r;r++)i=l[r],c=t.get(i),null!=c&&d.push(c);for(u=t.where({model_id:this.id}),o=0,s=u.length;s>o;o++)n=u[o],_.contains(l,""+n.id)||d.push(n);return d},n}(e("Project"))})}).call(this);