!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="./",t(t.s=33)}([function(e,t,n){"use strict";function r(e){return"[object Array]"===b.call(e)}function o(e){return"[object ArrayBuffer]"===b.call(e)}function i(e){return"undefined"!=typeof FormData&&e instanceof FormData}function a(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer}function s(e){return"string"==typeof e}function u(e){return"number"==typeof e}function c(e){return void 0===e}function f(e){return null!==e&&"object"==typeof e}function p(e){return"[object Date]"===b.call(e)}function l(e){return"[object File]"===b.call(e)}function d(e){return"[object Blob]"===b.call(e)}function h(e){return"[object Function]"===b.call(e)}function m(e){return f(e)&&h(e.pipe)}function y(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams}function T(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function g(){return"undefined"!=typeof window&&"undefined"!=typeof document&&"function"==typeof document.createElement}function w(e,t){if(null!==e&&void 0!==e)if("object"==typeof e||r(e)||(e=[e]),r(e))for(var n=0,o=e.length;n<o;n++)t.call(null,e[n],n,e);else for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.call(null,e[i],i,e)}function v(){function e(e,n){"object"==typeof t[n]&&"object"==typeof e?t[n]=v(t[n],e):t[n]=e}for(var t={},n=0,r=arguments.length;n<r;n++)w(arguments[n],e);return t}function Z(e,t,n){return w(t,function(t,r){e[r]=n&&"function"==typeof t?x(t,n):t}),e}var x=n(6),b=Object.prototype.toString;e.exports={isArray:r,isArrayBuffer:o,isFormData:i,isArrayBufferView:a,isString:s,isNumber:u,isObject:f,isUndefined:c,isDate:p,isFile:l,isBlob:d,isFunction:h,isStream:m,isURLSearchParams:y,isStandardBrowserEnv:g,forEach:w,merge:v,extend:Z,trim:T}},function(e,t,n){"use strict";(function(t){function r(e,t){!i.isUndefined(e)&&i.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}function o(){var e;return"undefined"!=typeof XMLHttpRequest?e=n(2):void 0!==t&&(e=n(2)),e}var i=n(0),a=n(25),s=/^\)\]\}',?\n/,u={"Content-Type":"application/x-www-form-urlencoded"},c={adapter:o(),transformRequest:[function(e,t){return a(t,"Content-Type"),i.isFormData(e)||i.isArrayBuffer(e)||i.isStream(e)||i.isFile(e)||i.isBlob(e)?e:i.isArrayBufferView(e)?e.buffer:i.isURLSearchParams(e)?(r(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):i.isObject(e)?(r(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e){e=e.replace(s,"");try{e=JSON.parse(e)}catch(e){}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};c.headers={common:{Accept:"application/json, text/plain, */*"}},i.forEach(["delete","get","head"],function(e){c.headers[e]={}}),i.forEach(["post","put","patch"],function(e){c.headers[e]=i.merge(u)}),e.exports=c}).call(t,n(32))},function(e,t,n){"use strict";var r=n(0),o=n(17),i=n(20),a=n(26),s=n(24),u=n(5),c="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||n(19);e.exports=function(e){return new Promise(function(t,f){var p=e.data,l=e.headers;r.isFormData(p)&&delete l["Content-Type"];var d=new XMLHttpRequest,h="onreadystatechange",m=!1;if("undefined"==typeof window||!window.XDomainRequest||"withCredentials"in d||s(e.url)||(d=new window.XDomainRequest,h="onload",m=!0,d.onprogress=function(){},d.ontimeout=function(){}),e.auth){var y=e.auth.username||"",T=e.auth.password||"";l.Authorization="Basic "+c(y+":"+T)}if(d.open(e.method.toUpperCase(),i(e.url,e.params,e.paramsSerializer),!0),d.timeout=e.timeout,d[h]=function(){if(d&&(4===d.readyState||m)&&(0!==d.status||d.responseURL&&0===d.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in d?a(d.getAllResponseHeaders()):null;o(t,f,{data:e.responseType&&"text"!==e.responseType?d.response:d.responseText,status:1223===d.status?204:d.status,statusText:1223===d.status?"No Content":d.statusText,headers:n,config:e,request:d}),d=null}},d.onerror=function(){f(u("Network Error",e)),d=null},d.ontimeout=function(){f(u("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED")),d=null},r.isStandardBrowserEnv()){var g=n(22),w=(e.withCredentials||s(e.url))&&e.xsrfCookieName?g.read(e.xsrfCookieName):void 0;w&&(l[e.xsrfHeaderName]=w)}if("setRequestHeader"in d&&r.forEach(l,function(e,t){void 0===p&&"content-type"===t.toLowerCase()?delete l[t]:d.setRequestHeader(t,e)}),e.withCredentials&&(d.withCredentials=!0),e.responseType)try{d.responseType=e.responseType}catch(e){if("json"!==d.responseType)throw e}"function"==typeof e.onDownloadProgress&&d.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&d.upload&&d.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){d&&(d.abort(),f(e),d=null)}),void 0===p&&(p=null),d.send(p)})}},function(e,t,n){"use strict";function r(e){this.message=e}r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,e.exports=r},function(e,t,n){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t,n){"use strict";var r=n(16);e.exports=function(e,t,n,o){return r(new Error(e),t,n,o)}},function(e,t,n){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},function(e,t,n){var r=window.mapboxgl;r.accessToken=window.mapbox.key,window.map=new r.Map({container:"map",center:[0,0],zoom:14,style:"mapbox://styles/mapbox/streets-v9"}),window.map.on("load",function(){n(30)})},function(e,t){},function(e,t,n){function r(e,t){function n(e){return JSON.parse(JSON.stringify(e))}t=t||{};for(var r={minimumDistance:t.minimumDistance||10,minimumTime:t.minimumTime||5,maximumPoints:t.maximumPoints||100},i={type:"FeatureCollection",features:[]},a={type:"Feature",properties:{coordTimes:[]},geometry:{type:"LineString",coordinates:[]}},s=0;s<e.features.length;s++)if("LineString"==e.features[s].geometry.type){var u=e.features[s].geometry.coordinates,c=e.features[s].properties.coordTimes;i.features.push(n(a));for(var f=0;f<u.length;f++)if(0!==f&&f!=u.length-1){var p={latitude:u[f][1],longitude:u[f][0]},l={latitude:u[f+1][1],longitude:u[f+1][0]},d=1e3*o(p,l,{unit:"km"});if(!(d<r.minimumDistance)){if(c){var h=new Date(c[f]),m=new Date(c[f+1]),y=(m-h)/1e3;if(y<r.minimumTime)continue}i.features[i.features.length-1].geometry.coordinates.push(u[f]),c&&i.features[i.features.length-1].properties.coordTimes.push(c[f]),i.features[i.features.length-1].geometry.coordinates.length%r.maximumPoints==0&&(i.features.push(n(a)),i.features[i.features.length-1].geometry.coordinates.push(u[f]),c&&i.features[i.features.length-1].properties.coordTimes.push(c[f]))}}else i.features[i.features.length-1].geometry.coordinates.push(u[f]),c&&i.features[i.features.length-1].properties.coordTimes.push(c[f])}return i}var o=n(31);e.exports.tidy=r},function(e,t,n){e.exports=n(11)},function(e,t,n){"use strict";function r(e){var t=new a(e),n=i(a.prototype.request,t);return o.extend(n,a.prototype,t),o.extend(n,t),n}var o=n(0),i=n(6),a=n(13),s=n(1),u=r(s);u.Axios=a,u.create=function(e){return r(o.merge(s,e))},u.Cancel=n(3),u.CancelToken=n(12),u.isCancel=n(4),u.all=function(e){return Promise.all(e)},u.spread=n(27),e.exports=u,e.exports.default=u},function(e,t,n){"use strict";function r(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var n=this;e(function(e){n.reason||(n.reason=new o(e),t(n.reason))})}var o=n(3);r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.source=function(){var e;return{token:new r(function(t){e=t}),cancel:e}},e.exports=r},function(e,t,n){"use strict";function r(e){this.defaults=e,this.interceptors={request:new a,response:new a}}var o=n(1),i=n(0),a=n(14),s=n(15),u=n(23),c=n(21);r.prototype.request=function(e){"string"==typeof e&&(e=i.merge({url:arguments[0]},arguments[1])),e=i.merge(o,this.defaults,{method:"get"},e),e.baseURL&&!u(e.url)&&(e.url=c(e.baseURL,e.url));var t=[s,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)n=n.then(t.shift(),t.shift());return n},i.forEach(["delete","get","head"],function(e){r.prototype[e]=function(t,n){return this.request(i.merge(n||{},{method:e,url:t}))}}),i.forEach(["post","put","patch"],function(e){r.prototype[e]=function(t,n,r){return this.request(i.merge(r||{},{method:e,url:t,data:n}))}}),e.exports=r},function(e,t,n){"use strict";function r(){this.handlers=[]}var o=n(0);r.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},r.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},r.prototype.forEach=function(e){o.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=r},function(e,t,n){"use strict";function r(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var o=n(0),i=n(18),a=n(4),s=n(1);e.exports=function(e){return r(e),e.headers=e.headers||{},e.data=i(e.data,e.headers,e.transformRequest),e.headers=o.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),o.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]}),(e.adapter||s.adapter)(e).then(function(t){return r(e),t.data=i(t.data,t.headers,e.transformResponse),t},function(t){return a(t)||(r(e),t&&t.response&&(t.response.data=i(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},function(e,t,n){"use strict";e.exports=function(e,t,n,r){return e.config=t,n&&(e.code=n),e.response=r,e}},function(e,t,n){"use strict";var r=n(5);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n)):e(n)}},function(e,t,n){"use strict";var r=n(0);e.exports=function(e,t,n){return r.forEach(n,function(n){e=n(e,t)}),e}},function(e,t,n){"use strict";function r(){this.message="String contains an invalid character"}function o(e){for(var t,n,o=String(e),a="",s=0,u=i;o.charAt(0|s)||(u="=",s%1);a+=u.charAt(63&t>>8-s%1*8)){if((n=o.charCodeAt(s+=.75))>255)throw new r;t=t<<8|n}return a}var i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.prototype=new Error,r.prototype.code=5,r.prototype.name="InvalidCharacterError",e.exports=o},function(e,t,n){"use strict";function r(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var o=n(0);e.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else if(o.isURLSearchParams(t))i=t.toString();else{var a=[];o.forEach(t,function(e,t){null!==e&&void 0!==e&&(o.isArray(e)&&(t+="[]"),o.isArray(e)||(e=[e]),o.forEach(e,function(e){o.isDate(e)?e=e.toISOString():o.isObject(e)&&(e=JSON.stringify(e)),a.push(r(t)+"="+r(e))}))}),i=a.join("&")}return i&&(e+=(e.indexOf("?")===-1?"?":"&")+i),e}},function(e,t,n){"use strict";e.exports=function(e,t){return e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,"")}},function(e,t,n){"use strict";var r=n(0);e.exports=r.isStandardBrowserEnv()?function(){return{write:function(e,t,n,o,i,a){var s=[];s.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&s.push("expires="+new Date(n).toGMTString()),r.isString(o)&&s.push("path="+o),r.isString(i)&&s.push("domain="+i),a===!0&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},function(e,t,n){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t,n){"use strict";var r=n(0);e.exports=r.isStandardBrowserEnv()?function(){function e(e){var t=e;return n&&(o.setAttribute("href",t),t=o.href),o.setAttribute("href",t),{href:o.href,protocol:o.protocol?o.protocol.replace(/:$/,""):"",host:o.host,search:o.search?o.search.replace(/^\?/,""):"",hash:o.hash?o.hash.replace(/^#/,""):"",hostname:o.hostname,port:o.port,pathname:"/"===o.pathname.charAt(0)?o.pathname:"/"+o.pathname}}var t,n=/(msie|trident)/i.test(navigator.userAgent),o=document.createElement("a");return t=e(window.location.href),function(n){var o=r.isString(n)?e(n):n;return o.protocol===t.protocol&&o.host===t.host}}():function(){return function(){return!0}}()},function(e,t,n){"use strict";var r=n(0);e.exports=function(e,t){r.forEach(e,function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])})}},function(e,t,n){"use strict";var r=n(0);e.exports=function(e){var t,n,o,i={};return e?(r.forEach(e.split("\n"),function(e){o=e.indexOf(":"),t=r.trim(e.substr(0,o)).toLowerCase(),n=r.trim(e.substr(o+1)),t&&(i[t]=i[t]?i[t]+", "+n:n)}),i):i}},function(e,t,n){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},function(e,t){e.exports=function(e){return{type:"FeatureCollection",features:[{type:"Feature",properties:{},geometry:{type:"LineString",coordinates:[e]}}]}}},function(e,t){e.exports={type:"FeatureCollection",features:[{type:"Feature",properties:{name:"19 Mar 2017 00:54:47",time:"2017-03-19T00:54:48.000Z",links:[{href:"https://play.google.com/store/apps/details?id=com.ilyabogdanovich.geotracker"}],coordTimes:["2017-03-19T00:54:48.000Z","2017-03-19T00:55:01.000Z","2017-03-19T00:55:09.000Z","2017-03-19T00:55:19.000Z","2017-03-19T00:55:27.000Z","2017-03-19T00:55:37.000Z","2017-03-19T00:55:45.000Z","2017-03-19T00:55:54.000Z","2017-03-19T00:56:02.000Z","2017-03-19T00:56:08.000Z","2017-03-19T00:56:15.000Z","2017-03-19T00:56:21.000Z","2017-03-19T00:56:26.000Z","2017-03-19T00:56:32.000Z","2017-03-19T00:56:44.000Z","2017-03-19T00:56:53.000Z","2017-03-19T00:57:03.000Z","2017-03-19T00:57:11.000Z","2017-03-19T00:57:22.000Z","2017-03-19T00:57:31.000Z","2017-03-19T00:57:38.000Z","2017-03-19T00:57:45.000Z","2017-03-19T00:57:52.000Z","2017-03-19T00:57:58.000Z","2017-03-19T00:58:05.000Z","2017-03-19T00:58:14.000Z","2017-03-19T00:58:22.000Z","2017-03-19T00:58:29.000Z","2017-03-19T00:58:36.000Z","2017-03-19T00:58:44.000Z","2017-03-19T00:58:55.000Z","2017-03-19T00:59:02.000Z","2017-03-19T00:59:10.000Z","2017-03-19T00:59:17.000Z","2017-03-19T00:59:23.000Z","2017-03-19T00:59:30.000Z","2017-03-19T00:59:39.000Z","2017-03-19T00:59:45.000Z","2017-03-19T00:59:50.000Z","2017-03-19T00:59:56.000Z","2017-03-19T01:00:02.000Z","2017-03-19T01:00:12.000Z","2017-03-19T01:00:21.000Z","2017-03-19T01:00:28.000Z","2017-03-19T01:00:34.000Z","2017-03-19T01:00:40.000Z","2017-03-19T01:00:48.000Z","2017-03-19T01:00:55.000Z","2017-03-19T01:01:02.000Z","2017-03-19T01:01:08.000Z","2017-03-19T01:01:14.000Z","2017-03-19T01:01:22.000Z","2017-03-19T01:01:28.000Z","2017-03-19T01:01:35.000Z","2017-03-19T01:01:41.000Z","2017-03-19T01:01:49.000Z","2017-03-19T01:01:56.000Z","2017-03-19T01:02:04.000Z","2017-03-19T01:02:13.000Z","2017-03-19T01:02:22.000Z","2017-03-19T01:02:31.000Z","2017-03-19T01:02:38.000Z","2017-03-19T01:02:46.000Z","2017-03-19T01:02:53.000Z","2017-03-19T01:03:00.000Z","2017-03-19T01:03:07.000Z","2017-03-19T01:03:13.000Z","2017-03-19T01:03:20.000Z","2017-03-19T01:03:28.000Z","2017-03-19T01:03:37.000Z","2017-03-19T01:03:44.000Z","2017-03-19T01:03:50.000Z","2017-03-19T01:03:57.000Z","2017-03-19T01:04:04.000Z","2017-03-19T01:04:11.000Z","2017-03-19T01:04:17.000Z","2017-03-19T01:04:24.000Z","2017-03-19T01:04:32.000Z","2017-03-19T01:04:38.000Z","2017-03-19T01:04:47.000Z","2017-03-19T01:04:54.000Z","2017-03-19T01:05:00.000Z","2017-03-19T01:05:06.000Z","2017-03-19T01:05:13.000Z","2017-03-19T01:05:22.000Z","2017-03-19T01:05:33.000Z","2017-03-19T01:05:41.000Z","2017-03-19T01:05:47.000Z","2017-03-19T01:05:54.000Z","2017-03-19T01:06:02.000Z","2017-03-19T01:06:09.000Z","2017-03-19T01:06:18.000Z","2017-03-19T01:06:24.000Z","2017-03-19T01:06:31.000Z","2017-03-19T01:06:38.000Z","2017-03-19T01:06:44.000Z","2017-03-19T01:06:52.000Z","2017-03-19T01:07:03.000Z"]},geometry:{type:"LineString",coordinates:[[-2.222678,53.42683,44.4],[-2.222748,53.426918,43.7],[-2.222798,53.427002,41.9],[-2.222648,53.427036,39.1],[-2.222577,53.42712,37.4],[-2.222468,53.427185,35.3],[-2.22235,53.427246,34.4],[-2.22225,53.427319,34.2],[-2.222135,53.427383,34.4],[-2.222012,53.427448,34.2],[-2.221925,53.427525,33.5],[-2.221903,53.427616,34.5],[-2.221853,53.427708,34.7],[-2.221893,53.427799,34.4],[-2.221977,53.427876,34.2],[-2.222055,53.427956,33.5],[-2.222132,53.428047,33.3],[-2.222297,53.428097,32.5],[-2.22245,53.428082,33.4],[-2.222603,53.42804,32.9],[-2.222725,53.427971,31.9],[-2.222832,53.427906,31.7],[-2.222932,53.427822,30.6],[-2.22305,53.427746,29.8],[-2.223152,53.427673,28.7],[-2.223285,53.427612,28],[-2.223418,53.427547,28.9],[-2.22352,53.427475,28.7],[-2.223633,53.427406,27.1],[-2.223717,53.427326,25.3],[-2.223808,53.427223,24.1],[-2.223925,53.427147,23.2],[-2.224037,53.427074,22.4],[-2.224155,53.42701,21.8],[-2.224268,53.426929,21.2],[-2.224402,53.426861,20.9],[-2.224492,53.426781,19.9],[-2.22464,53.426727,19.5],[-2.224747,53.426643,18.9],[-2.224848,53.426579,18.2],[-2.22499,53.426525,16.5],[-2.224995,53.426426,15.6],[-2.224873,53.426369,15],[-2.224767,53.426296,14.7],[-2.22465,53.426235,14.5],[-2.224525,53.426174,14.4],[-2.224387,53.426136,12.8],[-2.224285,53.426064,12.6],[-2.224163,53.425995,12.5],[-2.224048,53.425938,13.6],[-2.223922,53.42588,14.1],[-2.223782,53.425816,15.2],[-2.223673,53.425751,15.2],[-2.223553,53.425678,14.7],[-2.22344,53.425617,14.2],[-2.223302,53.425571,14.3],[-2.223153,53.42556,14],[-2.223005,53.425537,14.2],[-2.22284,53.425545,14.7],[-2.222708,53.425602,14.9],[-2.222585,53.425663,15.4],[-2.222433,53.425697,16.8],[-2.222295,53.425747,16.4],[-2.222148,53.425797,16.9],[-2.222033,53.425865,18],[-2.221928,53.425938,17.4],[-2.221848,53.426014,17.3],[-2.221783,53.426105,18.1],[-2.221718,53.426197,19],[-2.221642,53.426277,20.1],[-2.221605,53.42638,21.8],[-2.22156,53.426476,23.2],[-2.221537,53.426575,25.1],[-2.221503,53.42667,26.4],[-2.221457,53.426762,28.5],[-2.221415,53.426853,30.7],[-2.221392,53.426949,31.3],[-2.221378,53.427048,31.5],[-2.22137,53.427147,31.5],[-2.221283,53.427231,31],[-2.221258,53.427319,31.1],[-2.221243,53.427418,31.2],[-2.22126,53.427517,31.3],[-2.22134,53.427593,31.8],[-2.221437,53.427681,32.4],[-2.22159,53.427689,31.7],[-2.22172,53.427643,29.2],[-2.22183,53.427578,26.2],[-2.221953,53.427513,23.7],[-2.222072,53.427448,22.3],[-2.222182,53.427372,22.3],[-2.222283,53.427299,21.7],[-2.22237,53.427219,21.5],[-2.222487,53.427158,21],[-2.222627,53.42712,20.5],[-2.22278,53.427078,22.4],[-2.222795,53.426987,24.5],[-2.222678,53.426895,24.8]]}}]}},function(e,t,n){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function o(e){var t=[],n=!0,r=!1,o=void 0;try{for(var i,a=e.features[Symbol.iterator]();!(n=(i=a.next()).done);n=!0){var s=i.value;t.push({type:"Feature",properties:{},geometry:{type:"LineString",coordinates:s.geometry.coordinates.map(function(e){return[e[0],e[1]]})}})}}catch(e){r=!0,o=e}finally{try{!n&&a.return&&a.return()}finally{if(r)throw o}}return{type:"FeatureCollection",features:t}}function i(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,o=(t=[]).concat.apply(t,r(e.map(function(e){return e.data.features}))),i=o.filter(function(e){return e.properties.confidence>=n});return i.length<1&&alert("Geocoder returned no geometry (with a confidence threshold of "+n+")"),{type:"FeatureCollection",features:i}}function a(){window.map.addLayer({id:"line-animation-bg",type:"line",source:"line-animation",layout:{"line-cap":"round","line-join":"round"},paint:{"line-color":"#510bff","line-width":9,"line-opacity":.1}}),window.map.addLayer({id:"line-animation",type:"line",source:"line-animation",layout:{"line-cap":"round","line-join":"round"},paint:{"line-color":"#008eff","line-width":4,"line-opacity":.5}}),window.map.addLayer({id:"line-animation-fg",type:"line",source:"line-animation",layout:{"line-cap":"round","line-join":"round"},paint:{"line-color":"#aceeff","line-width":.5,"line-opacity":.7}})}Object.defineProperty(t,"__esModule",{value:!0});var s=n(9),u=n.n(s),c=n(10),f=n.n(c),p="https://api.mapbox.com/matching/v4/mapbox.driving.json?access_token="+window.mapbox.key,l=n(29),d=o(l),h=d.features[0].geometry.coordinates[0];window.map.panTo(h);var m=n(28)(h),y=u.a.tidy(d,{minimumDistance:10,minimumTime:5,maximumPoints:100}),T=y.features.map(function(e){return f.a.post(p,e)});f.a.all(T).then(function(e){function t(){var e=window.pageYOffset,t=document.documentElement.clientHeight,o=Math.max(document.body.scrollHeight,document.body.offsetHeight,document.documentElement.clientHeight,document.documentElement.scrollHeight,document.documentElement.offsetHeight),i=e/(o-t),a=Math.floor(n.features[0].geometry.coordinates.length*i);r.features[0].geometry.coordinates=n.features[0].geometry.coordinates.slice(0,a),window.map.getSource("line-animation").setData(r),window.map.panTo(r.features[0].geometry.coordinates[r.features[0].geometry.coordinates.length-1])}var n=i(e),r=m;window.map.addSource("line-animation",{type:"geojson",data:r}),a(),document.addEventListener("scroll",t)})},function(e,t){var n=function(){var e=function(e){return e*Math.PI/180};return function(t,n,r){r=r||{};var o={km:6371,mile:3960,meter:6371e3,nmi:3440},i=r.unit in o?o[r.unit]:o.km,a=e(n.latitude-t.latitude),s=e(n.longitude-t.longitude),u=e(t.latitude),c=e(n.latitude),f=Math.sin(a/2)*Math.sin(a/2)+Math.sin(s/2)*Math.sin(s/2)*Math.cos(u)*Math.cos(c),p=2*Math.atan2(Math.sqrt(f),Math.sqrt(1-f));return r.threshold?r.threshold>i*p:i*p}}();void 0!==e&&e.exports&&(e.exports=n)},function(e,t){function n(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function o(e){if(f===setTimeout)return setTimeout(e,0);if((f===n||!f)&&setTimeout)return f=setTimeout,setTimeout(e,0);try{return f(e,0)}catch(t){try{return f.call(null,e,0)}catch(t){return f.call(this,e,0)}}}function i(e){if(p===clearTimeout)return clearTimeout(e);if((p===r||!p)&&clearTimeout)return p=clearTimeout,clearTimeout(e);try{return p(e)}catch(t){try{return p.call(null,e)}catch(t){return p.call(this,e)}}}function a(){m&&d&&(m=!1,d.length?h=d.concat(h):y=-1,h.length&&s())}function s(){if(!m){var e=o(a);m=!0;for(var t=h.length;t;){for(d=h,h=[];++y<t;)d&&d[y].run();y=-1,t=h.length}d=null,m=!1,i(e)}}function u(e,t){this.fun=e,this.array=t}function c(){}var f,p,l=e.exports={};!function(){try{f="function"==typeof setTimeout?setTimeout:n}catch(e){f=n}try{p="function"==typeof clearTimeout?clearTimeout:r}catch(e){p=r}}();var d,h=[],m=!1,y=-1;l.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];h.push(new u(e,t)),1!==h.length||m||o(s)},u.prototype.run=function(){this.fun.apply(null,this.array)},l.title="browser",l.browser=!0,l.env={},l.argv=[],l.version="",l.versions={},l.on=c,l.addListener=c,l.once=c,l.off=c,l.removeListener=c,l.removeAllListeners=c,l.emit=c,l.binding=function(e){throw new Error("process.binding is not supported")},l.cwd=function(){return"/"},l.chdir=function(e){throw new Error("process.chdir is not supported")},l.umask=function(){return 0}},function(e,t,n){n(7),e.exports=n(8)}]);