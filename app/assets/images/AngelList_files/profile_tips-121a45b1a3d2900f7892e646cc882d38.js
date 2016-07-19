(function(){var t=function(t,n){function i(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return i.prototype=n.prototype,t.prototype=new i,t.__super__=n.prototype,t},e={}.hasOwnProperty;define(["jquery","mixpanel","lib/partials"],function(e,n,i){var r;return{Completeness:r=function(i){function r(){return r.__super__.constructor.apply(this,arguments)}return t(r,i),r.prototype.events=function(){return{"click .tips_link":"openPopover"}},r.prototype.initialize=function(t){return this.completenessUrl=t.completenessUrl,this.profileType=t.profileType,this.loading=!1,this.load()},r.prototype.trackViews=function(){return null!=n?n.track(this.profileType+" profile completeness: view tips click",{pct_complete:this.$el.data("pct-complete"),startup:this.$el.data("slug"),source:"completeness_unit"}):void 0},r.prototype.openPopover=function(t){return t.preventDefault(),e.facybox({ajax:this.$(".tips_link").data("popover-url")}),this.trackViews()},r.prototype.updatePercent=function(t,e){var n;return t.removeClass("u-colorSuccess u-colorWarning u-colorGray3"),n="u-colorGray3",e>=80?n="u-colorSuccess":e>=50&&(n="u-colorWarning"),t.addClass(n).text(e+"%"),this.$el.data("pct-complete",e)},r.prototype._success=function(){return null},r.prototype.load=function(){return this.loading?void 0:(this.loading=!0,e.ajax({url:this.completenessUrl,type:"get",success:function(t){return function(e){var n;return n=parseInt(e.pct,10),t.updatePercent(t.$(".pct"),n),t._success(e,n)}}(this),complete:function(t){return function(){return t.loading=!1}}(this)}))},r}(Backbone.View),handle_click:function(t,n){var r,o,a,s,l,u;return t.stopPropagation(),u=e(t.target).attr("href"),u.indexOf("edit_profile")>=0?(e.facybox.close(),l="user"===n.toLowerCase()?"profile":"startup",i["with"](e(i.selector(l+"s/show/header")),function(t){return t.edit()})):u.indexOf("#")>=0?(r=400,o=20,l=u.slice(u.indexOf("#")+1),s=e('[data-tips_selector="'+l+'"]'),s.length&&s.offset()?(a=s.offset().top,a>=o&&(a-=o),e.facybox.close(),e("html, body").animate({scrollTop:a},r,"linear",function(){return s.find(".edit").click()})):window.location.href=u):(u.indexOf("/press")>0&&(u=u.slice(0,u.indexOf("/press"))+"/updates#press"),t.metaKey?open(u):window.location.href=u),!1}}})}).call(this);