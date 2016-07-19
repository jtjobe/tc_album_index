(function(){var t=function(t,n){function r(){this.constructor=t}for(var i in n)e.call(n,i)&&(t[i]=n[i]);return r.prototype=n.prototype,t.prototype=new r,t.__super__=n.prototype,t},e={}.hasOwnProperty;define(["jquery","models/base","lib/autocomplete"],function(e,n,r){var i;return i=function(n){function i(){return i.__super__.constructor.apply(this,arguments)}return t(i,n),i.prototype.direction="outbound",i.prototype.idAttribute="token",i.prototype.toSyncData=function(t,e,n){var r;return r=i.__super__.toSyncData.call(this,t,e,n),"create"!==e&&"update"!==e&&"patch"!==e?r:(null!=this.get("company_name")&&(r.startup||(r.startup={}),r.startup.company_name=this.get("company_name"),delete r.startup_role.company_name),null!=this.get("metadata_id")&&(r.metadata_id||(r.metadata_id=null),r.metadata_id=this.get("metadata_id"),delete r.startup_role.metadata_id),delete r.startup_role.startup,r.startup_role=_.omit(r.startup_role,_.filter(_.keys(r.startup_role),function(t){return"startup_id"!==t&&0===t.indexOf("startup_")})),delete r.startup_role.token,r)},i.prototype.getName=function(){switch(this.direction){case"outbound":return this.get("company_name");case"inbound":return this.get("invited_name")}},i.prototype.setName=function(t){switch(this.direction){case"outbound":return this.set("company_name",t);case"inbound":return this.set("invited_name",t)}},i.prototype.reset=function(){switch(this.direction){case"outbound":return this.set("startup_id",null);case"inbound":return this.set({tagged_type:null,tagged_id:null})}},i.prototype.confirm=function(){return e.ajax({url:"/startup_roles/approve",type:"post",dataType:"json",data:{token:this.id},success:function(t){return function(e){return t.processResponse(e)}}(this)})},i.prototype.parse=function(t){return t.role},i.prototype.autocomplete=function(t){return new r(t,{selectCallback:function(e){return function(n){switch(t.val(n.name),e.direction){case"outbound":e.set("company_name",n.name),e.set("startup_id",n.id);break;case"inbound":e.shell=n.shell,e.set("invited_name",n.name),e.set("tagged_id",n.id),e.set("tagged_type",n.model)}return e.trigger(n.id?"autocomplete":"noautocomplete")}}(this),queryOptions:{klasses:t.parent().data("klasses")},roles:!0})},i.prototype.processResponse=function(t){if(t.popover){if(t.popover.html)return e.facybox(t.popover.html);if(t.popover.url)return e.facybox({ajax:t.popover.url})}},i}(n("StartupRole"))})}).call(this);