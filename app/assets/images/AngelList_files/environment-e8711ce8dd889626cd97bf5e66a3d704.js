(function(){define(["module","models/repository","models/user"],function(t,e,n){var i;return i=t.config().environment,{controller:t.config().controller,action:t.config().action,isDevelopment:function(){return"development"===i},isProduction:function(){return"production"===i},env:i,currentUser:function(){var i;return(i=t.config().current_user)?e.get(n).bootstrap(i):void 0}}})}).call(this);