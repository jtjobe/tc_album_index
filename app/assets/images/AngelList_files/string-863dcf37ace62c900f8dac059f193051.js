(function(){define(["module","require","underscore"],function(t,e,n){return{simple_format:function(t){return t=t.replace(/\r\n?/,"\n"),t=$.trim(t),t.length>0&&(t=t.replace(/\n\n+/g,"</p><p>"),t=t.replace(/\n/g,"<br />"),t="<p>"+t+"</p>"),t},auto_link:function(t,e){var r,i,o,a;null==e&&(e={}),o=/(?:([\w+.:-]+:)(?:\/|\&#x2F\;)(?:\/|\&#x2F\;)|(www\.))([^\s<]+)/gi,i="";for(r in e)a=e[r],i+=" "+n.escape(r)+"='"+n.escape(a)+"'";return t.replace(o,function(t,e,n,r){var o,a,s,l;return r=r.replace(/&#x2F;/g,"/"),a=/([^\w]*)$/.exec(r),l=a[0],o=a[1],r=r.substring(0,r.length-o.length),s="/",0===o.indexOf(s)&&(o=o.substring(s.length),r+=s),o=o.replace(/\//g,"&#x2F;"),t=t.substring(0,t.length-o.length),"<a href='"+(e||"http:")+"//"+(n||"")+r+"'"+i+">"+t+"</a>"+o})},link_and_format:function(r){var i;return i=e(t.id),i.auto_link(i.simple_format(n.escape(r)),{target:"_blank"})},truncate_on_word_boundary:function(t,e,n){var r;return null==e&&(e=30),null==n&&(n="..."),t.length>e?(r=e-n.length,r=t.substr(0,r+1).lastIndexOf(" "),0>r&&(r=0),t.substr(0,r)+"..."):t.toString()},number_to_human:function(t,e){var n,r,i,o;for(null==e&&(e={}),i=e.precision||0,o=["K","M","B","T"],r=o.length-1;r>=0;){if(n=Math.pow(1e3,r+1),-n>=t||t>=n)return+(t/n).toFixed(i)+o[r];r--}return t.toString()},number_with_delimiter:function(t,e){var n;return null==e&&(e={}),n=t.toString().split("."),n[0]=n[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),n.join(".")},capitalize:function(t){return t.charAt(0).toUpperCase()+t.slice(1)}}})}).call(this);