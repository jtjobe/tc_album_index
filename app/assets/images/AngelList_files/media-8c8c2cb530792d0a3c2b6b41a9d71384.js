(function(){define(["underscore","backbone"],function(t,e){var n;if(null==window._mediaDependency)throw new Error("Media object must be defined in the document head");return t.extend(window._mediaDependency,e.Events),n=window._mediaDependency.detect,window._mediaDependency.detect=function(){var t;return t=n(),t&&window._mediaDependency.trigger("change"),t},window._mediaDependency})}).call(this);