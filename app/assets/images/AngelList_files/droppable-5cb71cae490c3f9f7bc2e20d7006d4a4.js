/*!
 * jQuery UI Droppable 1.11.1
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/droppable/
 */
!function(t){"function"==typeof define&&define.amd?define(["jquery","./core","./widget","./mouse","./draggable"],t):t(jQuery)}(function(t){return t.widget("ui.droppable",{version:"1.11.1",widgetEventPrefix:"drop",options:{accept:"*",activeClass:!1,addClasses:!0,greedy:!1,hoverClass:!1,scope:"default",tolerance:"intersect",activate:null,deactivate:null,drop:null,out:null,over:null},_create:function(){var e,n=this.options,i=n.accept;this.isover=!1,this.isout=!0,this.accept=t.isFunction(i)?i:function(t){return t.is(i)},this.proportions=function(){return arguments.length?void(e=arguments[0]):e?e:e={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight}},this._addToManager(n.scope),n.addClasses&&this.element.addClass("ui-droppable")},_addToManager:function(e){t.ui.ddmanager.droppables[e]=t.ui.ddmanager.droppables[e]||[],t.ui.ddmanager.droppables[e].push(this)},_splice:function(t){for(var e=0;e<t.length;e++)t[e]===this&&t.splice(e,1)},_destroy:function(){var e=t.ui.ddmanager.droppables[this.options.scope];this._splice(e),this.element.removeClass("ui-droppable ui-droppable-disabled")},_setOption:function(e,n){if("accept"===e)this.accept=t.isFunction(n)?n:function(t){return t.is(n)};else if("scope"===e){var i=t.ui.ddmanager.droppables[this.options.scope];this._splice(i),this._addToManager(n)}this._super(e,n)},_activate:function(e){var n=t.ui.ddmanager.current;this.options.activeClass&&this.element.addClass(this.options.activeClass),n&&this._trigger("activate",e,this.ui(n))},_deactivate:function(e){var n=t.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass),n&&this._trigger("deactivate",e,this.ui(n))},_over:function(e){var n=t.ui.ddmanager.current;n&&(n.currentItem||n.element)[0]!==this.element[0]&&this.accept.call(this.element[0],n.currentItem||n.element)&&(this.options.hoverClass&&this.element.addClass(this.options.hoverClass),this._trigger("over",e,this.ui(n)))},_out:function(e){var n=t.ui.ddmanager.current;n&&(n.currentItem||n.element)[0]!==this.element[0]&&this.accept.call(this.element[0],n.currentItem||n.element)&&(this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("out",e,this.ui(n)))},_drop:function(e,n){var i=n||t.ui.ddmanager.current,r=!1;return i&&(i.currentItem||i.element)[0]!==this.element[0]?(this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function(){var n=t(this).droppable("instance");return n.options.greedy&&!n.options.disabled&&n.options.scope===i.options.scope&&n.accept.call(n.element[0],i.currentItem||i.element)&&t.ui.intersect(i,t.extend(n,{offset:n.element.offset()}),n.options.tolerance,e)?(r=!0,!1):void 0}),r?!1:this.accept.call(this.element[0],i.currentItem||i.element)?(this.options.activeClass&&this.element.removeClass(this.options.activeClass),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("drop",e,this.ui(i)),this.element):!1):!1},ui:function(t){return{draggable:t.currentItem||t.element,helper:t.helper,position:t.position,offset:t.positionAbs}}}),t.ui.intersect=function(){function t(t,e,n){return t>=e&&e+n>t}return function(e,n,i,r){if(!n.offset)return!1;var a=(e.positionAbs||e.position.absolute).left,o=(e.positionAbs||e.position.absolute).top,s=a+e.helperProportions.width,l=o+e.helperProportions.height,c=n.offset.left,u=n.offset.top,d=c+n.proportions().width,h=u+n.proportions().height;switch(i){case"fit":return a>=c&&d>=s&&o>=u&&h>=l;case"intersect":return c<a+e.helperProportions.width/2&&s-e.helperProportions.width/2<d&&u<o+e.helperProportions.height/2&&l-e.helperProportions.height/2<h;case"pointer":return t(r.pageY,u,n.proportions().height)&&t(r.pageX,c,n.proportions().width);case"touch":return(o>=u&&h>=o||l>=u&&h>=l||u>o&&l>h)&&(a>=c&&d>=a||s>=c&&d>=s||c>a&&s>d);default:return!1}}}(),t.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(e,n){var i,r,a=t.ui.ddmanager.droppables[e.options.scope]||[],o=n?n.type:null,s=(e.currentItem||e.element).find(":data(ui-droppable)").addBack();t:for(i=0;i<a.length;i++)if(!(a[i].options.disabled||e&&!a[i].accept.call(a[i].element[0],e.currentItem||e.element))){for(r=0;r<s.length;r++)if(s[r]===a[i].element[0]){a[i].proportions().height=0;continue t}a[i].visible="none"!==a[i].element.css("display"),a[i].visible&&("mousedown"===o&&a[i]._activate.call(a[i],n),a[i].offset=a[i].element.offset(),a[i].proportions({width:a[i].element[0].offsetWidth,height:a[i].element[0].offsetHeight}))}},drop:function(e,n){var i=!1;return t.each((t.ui.ddmanager.droppables[e.options.scope]||[]).slice(),function(){this.options&&(!this.options.disabled&&this.visible&&t.ui.intersect(e,this,this.options.tolerance,n)&&(i=this._drop.call(this,n)||i),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],e.currentItem||e.element)&&(this.isout=!0,this.isover=!1,this._deactivate.call(this,n)))}),i},dragStart:function(e,n){e.element.parentsUntil("body").bind("scroll.droppable",function(){e.options.refreshPositions||t.ui.ddmanager.prepareOffsets(e,n)})},drag:function(e,n){e.options.refreshPositions&&t.ui.ddmanager.prepareOffsets(e,n),t.each(t.ui.ddmanager.droppables[e.options.scope]||[],function(){if(!this.options.disabled&&!this.greedyChild&&this.visible){var i,r,a,o=t.ui.intersect(e,this,this.options.tolerance,n),s=!o&&this.isover?"isout":o&&!this.isover?"isover":null;s&&(this.options.greedy&&(r=this.options.scope,a=this.element.parents(":data(ui-droppable)").filter(function(){return t(this).droppable("instance").options.scope===r}),a.length&&(i=t(a[0]).droppable("instance"),i.greedyChild="isover"===s)),i&&"isover"===s&&(i.isover=!1,i.isout=!0,i._out.call(i,n)),this[s]=!0,this["isout"===s?"isover":"isout"]=!1,this["isover"===s?"_over":"_out"].call(this,n),i&&"isout"===s&&(i.isout=!1,i.isover=!0,i._over.call(i,n)))}})},dragStop:function(e,n){e.element.parentsUntil("body").unbind("scroll.droppable"),e.options.refreshPositions||t.ui.ddmanager.prepareOffsets(e,n)}},t.ui.droppable});