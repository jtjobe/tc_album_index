(function(){var t=[].slice;define(["module","rollbar"],function(e,n){var i,r,o;o={},i=e.config().logging_enabled;for(r in window.mixpanel)"function"==typeof mixpanel[r]&&!function(e){return o[e]=function(){var r,o;r=1<=arguments.length?t.call(arguments,0):[];try{window.mixpanel[e].apply(window.mixpanel,r)}catch(a){throw o=a,n.error("Error in mixpanel."+e,{arguments:r,exception:o.message}),o}return i?("undefined"!=typeof console&&null!==console&&console.log("MP Tracking - "+e+" - "+r[0]),"undefined"!=typeof console&&null!==console?console.log(r):void 0):void 0}}(r);return o.track_with_callback=function(t,e,n){var i,r;return null==e&&(e={}),r=!1,i=function(){return r?void 0:(n(),r=!0)},window.setTimeout(i,3e3),o.track(t,e,i)},o})}).call(this);