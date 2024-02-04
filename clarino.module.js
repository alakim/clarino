const Clarino=function(){const t={},e={},n={xhtmlMode:!0};function o(t,e){for(let n in e)t[n]=e[n]}function r(t){"string"==typeof t&&(t=t.split(";"));const e={};for(let o of t){o=o.split(".");let t,r=n;for(let e=0;e<o.length;e++)r=r[t=o[e]];e[t]=r}return e}function i(t,e){if(t)if(t instanceof Array)for(let n=0;n<t.length;n++)e(t[n],n);else if(Array.from&&t instanceof Map){const n=Array.from(t.keys());for(let o,r=0;o=n[r],r<n.length;r++)e(t.get(o),o)}else if(Array.from&&t instanceof Set){const n=Array.from(t);for(let t=0;t<n.length;t++)e(n[t],t)}else for(let n in t)e(t[n],n)}function l(t,e,o,r){let l=[];const c=[];return i(e,function(t){"object"!=typeof t?l.push(t):i(t,function(t,e){c.push(` ${e}="${t}"`)})}),(l=l.join("")).match(/^\s+$/i)&&(l=""),r&&0==l.length&&(l="&nbsp;"),o&&0==l.length?"<"+t+c.join("")+(n.xhtmlMode?"/>":">"):"<"+t+c.join("")+">"+l+"</"+t+">"}function c(t){return{alias:(t=t.split("|"))[0],name:t[2==t.length?1:0]}}function s(e,n,o){e instanceof Array||(e=e.split(";")),i(e,function(e){const r=c(e);t[r.alias]=function(t){return l(r.name,arguments,n,o)}})}function u(t){return!t||"string"==typeof t&&0==t.length}o(n,{extend:o,composeInterface:r,repeat:function(t,e,n){const o=[];for(let n=0;n<t;n++)o.push(e(n+1));return o.join(n||"")},markup:function(){const t=[];return i(arguments,function(e){t.push(e)}),t.join("")},json:function(t){if(null==t)return"null";if("string"==typeof t)return"'"+t.replace(/\"/g,'\\"')+"'";if("boolean"==typeof t)return t.toString();if("number"==typeof t)return t.toString();if("function"==typeof t)return"";if(t.constructor==Array){const e=[];for(let o=0;o<t.length;o++)e.push(n.json(t[o]));return"["+e.join(",")+"]"}if("object"==typeof t){const e=[];for(let o in t)e.push(o+":"+n.json(t[o]));return"{"+e.join(",")+"}"}return""},format:function(t,e,n){for(let e=0;e<arguments.length;e++)t=t.replace(new RegExp("{s*"+e+"s*}","ig"),arguments[e+1]);return t},entities:function(t){return t?t.toString().replace(/\&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/\'/g,"&apos;"):""},decodeEntities:function(t){return t?t.toString().replace(/\&lt;/g,"<").replace(/\&gt;/g,">").replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/\&amp;/g,"&"):""},tag:l,apply:function(t,e,n,o){const r=[];return i(t,function(t,n){if(!u(t)||!o){const i=e(t,n);u(i)&&o||r.push(i)}}),r.join(n||"")},when:function(t,e,n=null){return t?e:n},formatStyle:function(){const t={};for(let e=0;e<arguments.length;e++)o(t,arguments[e]);const e=[];for(let o in t){const i=o.replace(/([A-Z])/g,t=>"-"+t.toLowerCase());e.push(i+":"+(r=t[o],"width"!=(n=i)&&"height"!=n&&"top"!=n&&"left"!=n&&"font-size"!=n||"number"!=typeof r?r:r+"px"))}var n,r;return e.join(";")},callFunction:function(t,e,o){const r=[];for(let t=1;t<arguments.length;t++){let e=arguments[t];e="string"==typeof e&&e.match(/^@/)?e.slice(1,e.length):n.json(e),r.push(e)}return`${t}(${r.join(",")})`},defineTags:function(t){t instanceof Array||(t=t.split(";")),s(t)},getTagDefinitions:function(t){function e(t){return function(){return n.tag(t,arguments,!0)}}t instanceof Array||(t=t.split(";"));const o={};for(let n of t){const t=c(n);o[t.alias]=e(t.name)}return o}}),s("div;a;p;span;nobr;ul;ol;li;i;table;tbody;thead;tr;input;label;textarea;pre;select;option;optgroup;h1;h2;h3;h4;h5;h6;button;form;dl;dt;dd;svg"),s("abbr;address;area;article;aside;audio;b;base;bdi;bdo;blockquote;body;canvas;caption;cite;code;col;colgroup;datalist;del;details;dfn;dialog;em;embed;fieldset;figcaption;figure;footer;head;header;html;ins;kbd;keygen;legend;link;main;map;mark;menu;menuitem;meta;meter;nav;noscript;object;output;param;picture;progress;q;rp;rt;ruby;s;samp;script;section;small;source;strong;style;sub;summary;sup;tfoot;time;title;track;u;var;video;wbr"),s("img;hr;br;iframe",!0,!1),function(t){s(t,!1,!0)}("th;td"),e.attributes={},e.stylesheet=function(...t){return t.map(function(t){if("string"==typeof t)return t;const n=[];return i(t,function(t,o){!function t(n,o,r){"function"==typeof n&&(n=n());const l={};function c(t){return function(t){return t=t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}(e.attributes[t]||t)}r.push(o+"{"),i(n,function(t,e){if("function"==typeof t&&(t=t()),"object"!=typeof t)r.push([c(e),":",t,";"].join(" "));else if(t instanceof Array)for(let n of t)r.push([c(e),":",n,";"].join(" "));else l[e]=t}),"@"==o[0]?(i(l,function(e,n){t(e,n,r)}),r.push("}")):(r.push("}"),i(l,function(e,n){t(e,o+n,r)}))}(t,o,n)}),function(t){const e=[];for(let n=0;n<t.length;n++){const o=t[n];"{"!=o[o.length-1]||"}"!=t[n+1]?e.push(o):n++}return e}(n).join("\n")}).join("\n")},e.writeStylesheet=function(t){document.write('<style type="text/css">\n'),document.write(e.stylesheet(t)),document.write("\n</style>\n")},e.addStylesheet=function(t,...e){document.getElementById(t)?console.warn("Stylesheet #%s already exists",t):document.getElementsByTagName("head")[0].innerHTML+=n.html.style({id:t},"/*"+t+"*/\n",n.css.stylesheet(...e))},e.updateStylesheet=function(t,e){const o=document.getElementById(t);o?o.innerHTML=n.css.stylesheet(e):document.getElementsByTagName("head")[0].innerHTML+=n.html.style({id:t},n.css.stylesheet(e))},e.unit=function(t){const e=e=>"string"==typeof e?e:e instanceof Array?e.join(t+" ")+t:e+t,n={},o=t=>n[t]=r(t);function r(t){return 1==arguments.length?n[t]?n[t]:e(t):Array.from(arguments).map(t=>e(t)).join(" ")}return o(0),"pct"==t||"vw"==t||"vh"==t?(o(100),o(75),o(50),o(25)):"em"!=t&&"rem"!=t||(o(1),o(.75),o(.5),o(.25)),r},o(e.unit,{px:e.unit("px"),pct:e.unit("%"),vw:e.unit("vw"),vh:e.unit("vh"),pc:e.unit("pc"),rem:e.unit("rem"),em:e.unit("em")});const f=function(){let t=1;return function(){return t++}}();function a(t,e){if(t==e)return 0;t=t.split("."),e=e.split(".");for(let n=0;n<3;n++){const o=parseInt(t[n],10),r=parseInt(e[n],10);if(o<r)return-1;if(o>r)return 1}return 0}e.ViewClass=function(...t){const e={},o=/\/\*vc\d+\*\//;for(let n of t){const t="function"==typeof n?n.selectors:n.match(/;/)?n.split(";"):[n];for(let n of t){const t=`/*vc${f()}*/`;for(n.match(o)?n=n.replace(o,t):n+=t;e[n];)n=" "+n;e[" "+n]=!0}}const r=function(t){return n.expand(Object.keys(e),t)};return r.selectors=Object.keys(e),r},n.symbols=function(t,e=!1){const n=t.split(";"),o={};for(let t of n)o[t]=e?t.replace(/[A-Z]/g,t=>"-"+t.toLowerCase()):t;return new Proxy(o,{get(t,e){if("toString"==e)return function(){return t.toString()};if(!(e in t))throw`Undefined symbol "${e}"`;return t[e]}})},n.enumeration=((t,e=!1)=>new Proxy(Object.freeze(t.split(";").reduce((t,n,o)=>(t[n]=e?Symbol():o,t),{})),{get(t,e){if(!(e in t))throw`Undefined enum value "${e}"`;return t[e]}})),n.expand=((t,e,n=(t=>t))=>("string"==typeof t&&(t=t.split(";")),t.reduce((t,o)=>(t[n(o)]="function"==typeof e?e(o):e,t),{}))),n.curry=function(t){return function e(...n){return n.length>=t.length?t.apply(this,n):function(...t){return e.apply(this,n.concat(t))}}},n.compose=((...t)=>t.reduce((t,e)=>(...n)=>t(e(...n)))),n.pipe=((...t)=>e=>t.reduce((t,e)=>e(t),e)),n.range=function*(t,e,n=1){for(let o=t;o<=e;o+=n)yield o},n.lazy=function(t,e=300){let n=0,o=[];return function(){o=Array.from(arguments),n||function r(){n=(new Date).getTime(),setTimeout(function(){const i=(new Date).getTime();if(i-n<e)return n=i,void r();n=0,t(...o)},e)}()}},n.indexedArray=function(t,e){if(!(t instanceof Array))throw"Bad data value. Array expected";if("object"!=typeof e&&"function"!=typeof e)throw"Bad idxDef value. Object or function exptected";"function"==typeof e&&(e={id:e});const n={};for(let o in e){const r=new Map,i=e[o];for(let e of t)r.set(i(e),e);n[o]={getID:i,index:r}}function o(t){for(let e in n){const o=n[e];o.index.clear();for(let e of t)o.index.set(o.getID(e),e)}}function r(t){for(let e in n){const o=n[e];o.index.delete(o.getID(t))}}return new Proxy(t,{set(t,e,o){if("length"!==e)for(let t in n){const e=n[t],r=e.getID(o);if(null==r)throw"Item id can't be null";if(e.index.has(r))throw`Item with ID=${r} already exists`;e.index.set(r,o)}return Reflect.set(t,e,o),!0},get:(e,i)=>"index"===i?function(t,e="id"){if(null==t)throw"Item id can't be null";if(!(e in n))throw`Undefined index ID: "${e}"`;return n[e].index.get(t)}:"data"===i?t:"pop"===i?function(){const e=t.pop();return r(e),e}:"shift"===i?function(){const e=t.shift();return r(e),e}:"unshift"===i?function(...e){const n=t.unshift(...e);return o(t),n}:"splice"===i?function(...e){const n=t.splice(...e);return o(t),n}:Reflect.get(e,i)})},n.form=function(t,e,n){if(t){if("string"==typeof t?t=document.querySelector(t):t.jquery&&(t=t[0]),"string"!=typeof e)throw"Bad markup value: string expected";if(t.innerHTML=e,n){if("object"!=typeof n)throw"Bad events structure: object expected";for(let e in n){const o=t.querySelectorAll(e),r=n[e];let i=0;for(let t of o)for(let e in r)if("each"===e){(0,r[e])(t,i++)}else t.addEventListener(e,r[e])}}}},n.typedFunction=function(...t){const e=t[t.length-1],n=t.slice(0,e.length),o=t.length==n.length+1?t=>t:t[n.length];return function(...t){t.length!=n.length&&console.error(`${n.length} arguments expected`);const r=t.map((t,e)=>n[e](t));return o(e(...r))}},e.keywords=n.symbols("block;none;flex;row;rowReverse;column;columnReverse;left;right;center;top;bottom;hidden;pointer;italic;bold;normal;uppercase;lowercase;absolute;relative;fixed;underline;auto;collapse;separate;inline;inlineBlock;default;solid;dotted;dashed;double;groove;ridge;inset;outset;cover;contain;unset;initial;inherit;wrap;nowrap;wrapReverse;spaceBetween;spaceAround;spaceEvenly;flexStart;flexEnd;baseline;stretch;contentBox;borderBox",!0),e.template={border:function(t,n,o){return o=o||e.keywords.solid,n=n||"#000",[e.unit.px(t),o,n].join(" ")},linearGradient:function(t,e,n){return[e,"-webkit-linear-gradient("+[t+"deg",e,n].join(",")+")","-o-linear-gradient("+[t+"deg",e,n].join(",")+")","-moz-linear-gradient("+[t+"deg",e,n].join(",")+")","linear-gradient("+[t+"deg",e,n].join(",")+")"]}};const p="3.0.0";n.compareVersions=a;const h={};o(n,{version:function(t){if(!t)return p;for(let e in h)if(a(t,e)<=0){const t={};return o(t,h[e]),t}console.error("Clarino version "+t+" not supported")}}),n.html=t,n.css=e,n.simple=r("markup;apply;repeat;where;format;formatStyle;entities;decodeEntities;callFunction");const d=r("html.div;html.a;html.p;html.span;html.nobr;html.hr;html.br;html.img;html.ul;html.ol;html.li;html.table;html.tbody;html.thead;html.tr;html.td;html.th;html.input;html.label;html.textarea;html.pre;html.select;html.option;html.optgroup;html.h1;html.h2;html.h3;html.h4;html.h5;html.h6;html.button;html.form;html.dl;html.dt;html.dd");return o(n.simple,d),h["1.5.0"]=function(){const t={};o(t,n.css),t.unit=function(t){return n.css.unit(t)},o(t.unit,n.css.unit),t.unit.pc=t.unit.pct;const e={};return o(e,n),e.css=t,e}(),h["2.0.0"]=function(){const t={};return o(t,n),t.compose=n.composeInterface,t}(),h["2.2.0"]=function(){const t={};return o(t,n),t.symbols=function(t){return n.symbols(t,!0)},t}(),h[p]=n,n}();
export default Clarino;
