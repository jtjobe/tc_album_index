(function(){var e=[].slice;define(["jquery","qtip","rollbar","jquery.imagesloaded","css!qtip2/jquery.qtip.standard","css!coffeescripts/plugins/qtip"],function(t,n){var i;return i=t.fn.qtip,t.extend(i.defaults.style,{classes:"qtip-tipsy"}),t.extend(i.defaults.style.tip,{width:12,height:6}),t.extend(i.defaults.show,{effect:function(){return t(this).fadeIn(50)}}),t.extend(i.defaults.hide,{effect:function(){return t(this).fadeOut(100)}}),t.extend(i.defaults.position,{my:"bottom center",at:"top center",viewport:t(window)}),t.fn.qtip=function(){var n,r,o,a;if(n=1<=arguments.length?e.call(arguments,0):[],o=n[0],"object"==typeof o){if(null!=o.defaultPosition&&(a=function(){switch(o.defaultPosition){case"top":return{my:"bottom center",at:"top center"};case"bottom":return{my:"top center",at:"bottom center"};case"right":return{my:"center left",at:"center right"};case"left":return{my:"center right",at:"center left"};default:throw new Error("Unrecognized default position: "+o.defaultPosition)}}(),o.position||(o.position={}),t.extend(o.position,a)),null!=o.activation)switch(o.show||(o.show={}),o.hide||(o.hide={}),o.activation){case"focus":o.show.event="focus",o.hide.event="blur";break;default:throw new Error("Unrecognized activation: "+o.activation)}null!=o.maxWidth&&(o.events||(o.events={}),r=o.events.show,o.events.show=function(){var n;return n=1<=arguments.length?e.call(arguments,0):[],t(this).css("max-width",o.maxWidth),null!=r?r.apply(this,n):void 0})}return i.apply(this,n)},t.extend(t.fn.qtip,i),n})}).call(this);