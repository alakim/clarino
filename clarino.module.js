const Clarino=function(){const t={},e={},n={xhtmlMode:!0};function o(t,e){for(let n in e)t[n]=e[n]}function r(t){"string"==typeof t&&(t=t.split(";"));const e={};for(let o of t){o=o.split(".");let t,r=n;for(let e=0;e<o.length;e++)r=r[t=o[e]];e[t]=r}return e}function i(t,e){if(t)if(t instanceof Array)for(let n=0;n<t.length;n++)e(t[n],n);else if(Array.from&&t instanceof Map){const n=Array.from(t.keys());for(let o,r=0;o=n[r],r<n.length;r++)e(t.get(o),o)}else if(Array.from&&t instanceof Set){const n=Array.from(t);for(let t=0;t<n.length;t++)e(n[t],t)}else for(let n in t)e(t[n],n)}function l(t,e,o,r){let l=[];const s=[];return i(e,function(t){"object"!=typeof t?l.push(t):i(t,function(t,e){s.push(` ${e}="${t}"`)})}),(l=l.join("")).match(/^\s+$/i)&&(l=""),r&&0==l.length&&(l="&nbsp;"),o&&0==l.length?"<"+t+s.join("")+(n.xhtmlMode?"/>":">"):"<"+t+s.join("")+">"+l+"</"+t+">"}function s(t){return{alias:(t=t.split("|"))[0],name:t[2==t.length?1:0]}}function c(e,n,o){e instanceof Array||(e=e.split(";")),i(e,function(e){const r=s(e);t[r.alias]=function(t){return l(r.name,arguments,n,o)}})}function u(t){return!t||"string"==typeof t&&0==t.length}function f(t,e){if(t==e)return 0;t=t.split("."),e=e.split(".");for(let n=0;n<3;n++){const o=parseInt(t[n],10),r=parseInt(e[n],10);if(o<r)return-1;if(o>r)return 1}return 0}o(n,{extend:o,composeInterface:r,repeat:function(t,e,n){const o=[];for(let n=0;n<t;n++)o.push(e(n+1));return o.join(n||"")},markup:function(){const t=[];return i(arguments,function(e){t.push(e)}),t.join("")},json:function(t){if(null==t)return"null";if("string"==typeof t)return"'"+t.replace(/\"/g,'\\"')+"'";if("boolean"==typeof t)return t.toString();if("number"==typeof t)return t.toString();if("function"==typeof t)return"";if(t.constructor==Array){const e=[];for(let o=0;o<t.length;o++)e.push(n.json(t[o]));return"["+e.join(",")+"]"}if("object"==typeof t){const e=[];for(let o in t)e.push(o+":"+n.json(t[o]));return"{"+e.join(",")+"}"}return""},format:function(t,e,n){for(let e=0;e<arguments.length;e++)t=t.replace(new RegExp("{s*"+e+"s*}","ig"),arguments[e+1]);return t},entities:function(t){return t?t.toString().replace(/\&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/\'/g,"&apos;"):""},decodeEntities:function(t){return t?t.toString().replace(/\&lt;/g,"<").replace(/\&gt;/g,">").replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/\&amp;/g,"&"):""},tag:l,apply:function(t,e,n,o){const r=[];return i(t,function(t,n){if(!u(t)||!o){const i=e(t,n);u(i)&&o||r.push(i)}}),r.join(n||"")},formatStyle:function(){const t={};for(let e=0;e<arguments.length;e++)o(t,arguments[e]);const e=[];for(let o in t){const i=o.replace(/([A-Z])/g,t=>"-"+t.toLowerCase());e.push(i+":"+(r=t[o],"width"!=(n=i)&&"height"!=n&&"top"!=n&&"left"!=n&&"font-size"!=n||"number"!=typeof r?r:r+"px"))}var n,r;return e.join(";")},callFunction:function(t,e,o){const r=[];for(let t=1;t<arguments.length;t++){let e=arguments[t];e="string"==typeof e&&e.match(/^@/)?e.slice(1,e.length):n.json(e),r.push(e)}return`${t}(${r.join(",")})`},defineTags:function(t){t instanceof Array||(t=t.split(";")),c(t)},getTagDefinitions:function(t){function e(t){return function(){return n.tag(t,arguments,!0)}}t instanceof Array||(t=t.split(";"));const o={};for(let n of t){const t=s(n);o[t.alias]=e(t.name)}return o}}),c("div;a;p;span;nobr;ul;ol;li;i;table;tbody;thead;tr;input;label;textarea;pre;select;option;optgroup;h1;h2;h3;h4;h5;h6;button;form;dl;dt;dd;svg"),c("abbr;address;area;article;aside;audio;b;base;bdi;bdo;blockquote;body;canvas;caption;cite;code;col;colgroup;datalist;del;details;dfn;dialog;em;embed;fieldset;figcaption;figure;footer;head;header;html;ins;kbd;keygen;legend;link;main;map;mark;menu;menuitem;meta;meter;nav;noscript;object;output;param;picture;progress;q;rp;rt;ruby;s;samp;script;section;small;source;strong;style;sub;summary;sup;tfoot;time;title;track;u;var;video;wbr"),c("img;hr;br;iframe",!0,!1),function(t){c(t,!1,!0)}("th;td"),e.attributes={},e.stylesheet=function(t){if("string"==typeof t)return t;const n=[];return i(t,function(t,o){!function t(n,o,r){"function"==typeof n&&(n=n());const l={};function s(t){return function(t){return t=t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}(e.attributes[t]||t)}r.push(o+"{"),i(n,function(t,e){if("function"==typeof t&&(t=t()),"object"!=typeof t)r.push([s(e),":",t,";"].join(" "));else if(t instanceof Array)for(let n of t)r.push([s(e),":",n,";"].join(" "));else l[e]=t}),r.push("}"),i(l,function(e,n){t(e,o+n,r)})}(t,o,n)}),n.join("\n")},e.writeStylesheet=function(t){document.write('<style type="text/css">\n'),document.write(e.stylesheet(t)),document.write("\n</style>\n")},e.addStylesheet=function(t,e){document.getElementById(t)?console.warn("Stylesheet #%s already exists",t):document.getElementsByTagName("head")[0].innerHTML+=n.html.style({id:t},n.css.stylesheet(e))},e.updateStylesheet=function(t,e){const o=document.getElementById(t);o?o.innerHTML=n.css.stylesheet(e):document.getElementsByTagName("head")[0].innerHTML+=n.html.style({id:t},n.css.stylesheet(e))},e.unit=function(t){const e=e=>"string"==typeof e?e:e instanceof Array?e.join(t+" ")+t:e+t;return function(t){return 1==arguments.length?e(t):Array.from(arguments).map(t=>e(t)).join(" ")}},o(e.unit,{px:e.unit("px"),pct:e.unit("%"),pc:e.unit("pc"),rem:e.unit("rem"),em:e.unit("em")}),n.symbols=function(t,e=!1){const n=t.split(";"),o={};for(let t of n)o[t]=e?t.replace(/[A-Z]/g,t=>"-"+t.toLowerCase()):t;return new Proxy(o,{get(t,e){if("toString"==e)return function(){return t.toString()};if(!(e in t))throw`Undefined symbol "${e}"`;return t[e]}})},n.enumeration=((t,e=!1)=>new Proxy(Object.freeze(t.split(";").reduce((t,n,o)=>(t[n]=e?Symbol():o,t),{})),{get(t,e){if(!(e in t))throw`Undefined enum value "${e}"`;return t[e]}})),n.curry=function(t){return function e(...n){return n.length>=t.length?t.apply(this,n):function(...t){return e.apply(this,n.concat(t))}}},n.compose=((...t)=>t.reduce((t,e)=>(...n)=>t(e(...n)))),n.pipe=((...t)=>e=>t.reduce((t,e)=>e(t),e)),n.range=function*(t,e,n=1){for(let o=t;o<=e;o+=n)yield o},n.lazy=function(t,e=300){let n=0,o=[];return function(){o=Array.from(arguments),n||function r(){n=(new Date).getTime(),setTimeout(function(){const i=(new Date).getTime();if(i-n<e)return n=i,void r();n=0,t(...o)},e)}()}},n.indexedArray=function(t,e){if(!(t instanceof Array))throw"Bad data value. Array expected";if("object"!=typeof e&&"function"!=typeof e)throw"Bad idxDef value. Object or function exptected";"function"==typeof e&&(e={id:e});const n={};for(let o in e){const r=new Map,i=e[o];for(let e of t)r.set(i(e),e);n[o]={getID:i,index:r}}function o(t){for(let e in n){const o=n[e];o.index.clear();for(let e of t)o.index.set(o.getID(e),e)}}function r(t){for(let e in n){const o=n[e];o.index.delete(o.getID(t))}}return new Proxy(t,{set(t,e,o){if("length"!==e)for(let t in n){const e=n[t],r=e.getID(o);if(null==r)throw"Item id can't be null";if(e.index.has(r))throw`Item with ID=${r} already exists`;e.index.set(r,o)}return Reflect.set(t,e,o),!0},get:(e,i)=>"index"===i?function(t,e="id"){if(null==t)throw"Item id can't be null";if(!(e in n))throw`Undefined index ID: "${e}"`;return n[e].index.get(t)}:"data"===i?t:"pop"===i?function(){const e=t.pop();return r(e),e}:"shift"===i?function(){const e=t.shift();return r(e),e}:"unshift"===i?function(...e){const n=t.unshift(...e);return o(t),n}:"splice"===i?function(...e){const n=t.splice(...e);return o(t),n}:Reflect.get(e,i)})},n.form=function(t,e,n){if(t){if("string"==typeof t?t=document.querySelector(t):t.jquery&&(t=t[0]),"string"!=typeof e)throw"Bad markup value: string expected";if(t.innerHTML=e,n){if("object"!=typeof n)throw"Bad events structure: object expected";for(let e in n){const o=t.querySelectorAll(e),r=n[e];let i=0;for(let t of o)for(let e in r)if("each"===e){(0,r[e])(t,i++)}else t.addEventListener(e,r[e])}}}},n.typedFunction=function(...t){return function(...e){e.length!=t.length-1&&console.error(`${t.length-1} arguments expected`);const n=e.map((e,n)=>t[n](e));return t[t.length-1](...n)}},e.keywords=n.symbols("block;none;flex;row;rowReverse;column;columnReverse;left;right;center;top;bottom;hidden;pointer;italic;bold;normal;uppercase;lowercase;absolute;relative;fixed;underline;auto;collapse;separate;inline;inlineBlock;default;solid;dotted;dashed;double;groove;ridge;inset;outset;cover;contain;unset;initial;inherit;wrap;nowrap;wrapReverse;spaceBetween;spaceAround;spaceEvenly;flexStart;flexEnd;baseline;stretch;contentBox;borderBox",!0),e.template={border:function(t,n,o){return o=o||e.keywords.solid,n=n||"#000",[e.unit.px(t),o,n].join(" ")},linearGradient:function(t,e,n){return[e,"-webkit-linear-gradient("+[t+"deg",e,n].join(",")+")","-o-linear-gradient("+[t+"deg",e,n].join(",")+")","-moz-linear-gradient("+[t+"deg",e,n].join(",")+")","linear-gradient("+[t+"deg",e,n].join(",")+")"]}};const a="2.5.0";n.compareVersions=f;const p={};o(n,{version:function(t){if(!t)return a;for(let e in p)if(f(t,e)<=0){const t={};return o(t,p[e]),t}console.error("Clarino version "+t+" not supported")}}),n.html=t,n.css=e,n.simple=r("markup;apply;repeat;format;formatStyle;entities;decodeEntities;callFunction");const d=r("html.div;html.a;html.p;html.span;html.nobr;html.hr;html.br;html.img;html.ul;html.ol;html.li;html.table;html.tbody;html.thead;html.tr;html.td;html.th;html.input;html.label;html.textarea;html.pre;html.select;html.option;html.optgroup;html.h1;html.h2;html.h3;html.h4;html.h5;html.h6;html.button;html.form;html.dl;html.dt;html.dd");return o(n.simple,d),p["1.5.0"]=function(){const t={};o(t,n.css),t.unit=function(t){return n.css.unit(t)},o(t.unit,n.css.unit),t.unit.pc=t.unit.pct;const e={};return o(e,n),e.css=t,e}(),p["2.0.0"]=function(){const t={};return o(t,n),t.compose=n.composeInterface,t}(),p["2.2.0"]=function(){const t={};return o(t,n),t.symbols=function(t){return n.symbols(t,!0)},t}(),p[a]=n,n}();
export default Clarino;
