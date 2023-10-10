const Clarino = (function(){
	const Html = {}, Css = {};
	const Clarino = {
		xhtmlMode: true
	};
	
	function extend(o,s){for(let k in s){o[k] = s[k];}}

	function composeInterface(path){
		if(typeof(path)=='string') path = path.split(';');
		const res = {};
		for(let p of path){
			p = p.split('.');
			let v = Clarino;
			let s;
			for(let j=0; j<p.length; j++){
				s = p[j]; v = v[s];
			}
			res[s] = v;
		}
		return res;
	};
	
	function each(coll, F){
		if(!coll) return;
		if(coll instanceof Array)
			for(let i=0; i<coll.length; i++){F(coll[i], i);}
		else if(Array.from && coll instanceof Map){
			const keys = Array.from(coll.keys());
			for(let k,i=0; k=keys[i], i<keys.length; i++){
				F(coll.get(k), k);
			}
		}
		else if(Array.from && coll instanceof Set){
			const items = Array.from(coll);
			for(let i=0; i<items.length; i++) F(items[i], i);
		}
		else
			for(let k in coll){F(coll[k], k);}
	}
	
	function tag(name, content, selfClosing, notEmpty){
		let h = [];
		const a = [];
		each(content, function(el){
			if(typeof(el)!="object")
				h.push(el);
			else{
				each(el, function(val, nm){
					a.push(` ${nm}="${val}"`);
				});
			}
		});
		
		h = h.join("");
		if(h.match(/^\s+$/i)) h = "";
		if(notEmpty && h.length==0) h = "&nbsp;";
		
		return selfClosing && h.length==0
			? "<"+name+a.join("")+(Clarino.xhtmlMode? "/>":">")
			: "<"+name+a.join("")+">"+h+"</"+name+">";
	}

	function getAlias(def){
		def = def.split('|');
		return{
			alias:def[0],
			name:def[def.length==2?1:0]
		};
	}

	function defineTags(tags, selfClosing, notEmpty){
		if(!(tags instanceof Array)) tags = tags.split(";");
		each(tags, function(t){
			//const tN = t.indexOf("_")==0?t.slice(1):t;
			const tN = getAlias(t);
			Html[tN.alias] = function(content){
				return tag(tN.name, arguments, selfClosing, notEmpty);
			}
		});
	}
	
	function defineSelfClosingTags(tags){defineTags(tags, true, false);}
	function defineNotEmptyTags(tags){defineTags(tags, false, true)}
	function markup(){
		const res = [];
		each(arguments, function(tag){
			res.push(tag);
		});
		return res.join("");
	}
	
	function repeat(count, F, delim){
		const h = [];
		for(let i=0; i<count; i++) h.push(F(i+1));
		return h.join(delim||"");
	}
	
	function emptyValue(v){return !v ||(typeof(v)=="string"&&v.length==0);}
	
	extend(Clarino, {
		extend,
		composeInterface,
		repeat,
		markup,
		
		json: function(o){
			if(o==null) return 'null';
			if(typeof(o)=="string") return "'"+o.replace(/\"/g, "\\\"")+"'";
			if(typeof(o)=="boolean") return o.toString();
			if(typeof(o)=="number") return o.toString();
			if(typeof(o)=="function") return "";
			if(o.constructor==Array){
				const res = [];
				for(let i=0; i<o.length; i++) res.push(Clarino.json(o[i]));
				return "["+res.join(",")+"]";
			}
			if(typeof(o)=="object"){
				const res = [];
				for(let k in o) res.push(k+":"+Clarino.json(o[k]));
				return "{"+res.join(",")+"}";
			}
			return "";
		},
		
		format: function(str, v1, v2){
			for(let i=0; i<arguments.length; i++){
				str = str.replace(new RegExp("{\s*"+i+"\s*}", "ig"), arguments[i+1])
			}
			return str;
		},

		entities: function(str){
			if(!str) return '';
			return str.toString()
				.replace(/\&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
				.replace(/\"/g, '&quot;')
				.replace(/\'/g, '&apos;')
			;
		},

		decodeEntities: function(str){
			if(!str) return '';
			return str.toString()
				.replace(/\&lt;/g, '<')
				.replace(/\&gt;/g, '>')
				.replace(/&quot;/g, '"')
				.replace(/&apos;/g, "'")
				.replace(/\&amp;/g, '&')
			;
		},
		
		tag,
		
		apply: function(coll, F, delim, hideEmpty){
			const h = [];
			each(coll, function(el, i){
				if(!emptyValue(el) || !hideEmpty){
					const v = F(el, i);
					if(!emptyValue(v) || !hideEmpty)
						h.push(v);
				}
			});
			return h.join(delim||"");
		},

		when: function(cond, markupThen, markupElse=null){
			return cond?markupThen:markupElse;
		},
		
		formatStyle: function(){
			function addUnits(nm, val){
				if((nm=="width"||nm=="height"||nm=="top"||nm=="left"||nm=='font-size')&&typeof(val)=="number") return val+"px";
				return val;
			}
			
			const s = {};
			for(let i=0; i<arguments.length; i++){
				extend(s, arguments[i]);
			}
			const r = [];
			for(let k in s){
				const kk = k.replace(/([A-Z])/g, v=>'-'+v.toLowerCase());
				r.push(kk+":"+addUnits(kk, s[k]));
			}
			return r.join(";");
		},
		
		callFunction: function(name, a1, a2){
			const args = [];
			for(let i=1; i<arguments.length; i++){
				let arg = arguments[i];
				arg = typeof(arg)=="string" && arg.match(/^@/)? arg.slice(1, arg.length)
					:Clarino.json(arg);
				args.push(arg);
			}
			return `${name}(${args.join(',')})`;
		},
		defineTags: function(tags){
			if(!(tags instanceof(Array)))tags=tags.split(";");
			defineTags(tags);
		},
		getTagDefinitions: function(tags){
			if(!(tags instanceof(Array)))tags=tags.split(";");
			function defTag(nm){
				return function(){return Clarino.tag(nm, arguments, true);}
			}
			const res = {}
			for(let t of tags){
				const tN = getAlias(t);
				res[tN.alias] = defTag(tN.name);
			}
			return res;
		}
	});

	defineTags("div;a;p;span;nobr;ul;ol;li;i;table;tbody;thead;tr;input;label;textarea;pre;select;option;optgroup;h1;h2;h3;h4;h5;h6;button;form;dl;dt;dd;svg");
	defineTags('abbr;address;area;article;aside;audio;b;base;bdi;bdo;blockquote;body;canvas;caption;cite;code;col;colgroup;datalist;del;details;dfn;dialog;em;embed;fieldset;figcaption;figure;footer;head;header;html;ins;kbd;keygen;legend;link;main;map;mark;menu;menuitem;meta;meter;nav;noscript;object;output;param;picture;progress;q;rp;rt;ruby;s;samp;script;section;small;source;strong;style;sub;summary;sup;tfoot;time;title;track;u;var;video;wbr');
	
	defineSelfClosingTags("img;hr;br;iframe");
	defineNotEmptyTags("th;td");
	
	function writeStyle(defs, sel, stylesheet){
		if(typeof(defs)=="function") defs = defs();
		const children = {};
		
		function insertHyphens(nm){
			nm = nm.replace(/([A-Z])/g, function(m){
				return "-"+m.toLowerCase();
			});
			return nm;
		}
		
		function attrName(nm){
			const attNm = Css.attributes[nm] || nm;
			return insertHyphens(attNm);
		}
		
		stylesheet.push(sel+"{");
		each(defs, function(v, nm){
			//console.log(v);
			if(typeof(v)=="function") v = v();
			if(typeof(v)!="object"){
				stylesheet.push([attrName(nm), ":", v, ";"].join(" "));
			}
			else if(v instanceof Array){
				for(let el of v) stylesheet.push([attrName(nm), ":", el, ";"].join(" "));
			}
			else{
				children[nm] = v;
			}
		});

		if(sel[0]=='@'){
			each(children, function(cDef, cSel){
				writeStyle(cDef, cSel, stylesheet);
			});
			stylesheet.push("}");
		}
		else{
			stylesheet.push("}");
			each(children, function(cDef, cSel){
				writeStyle(cDef, sel+cSel, stylesheet);
			});
		}
	}

	Css.attributes = {};

	function removeEmptyStyles(cssArray){
		const res = [];
		for(let i=0; i<cssArray.length; i++){
			const ln = cssArray[i];
			if(ln[ln.length-1]=='{' && cssArray[i+1]=='}'){
				i++;
				continue;
			}
			res.push(ln);
		}
		return res;
	}
	
	Css.stylesheet = function(css){
		if(typeof(css)==='string') return css;
		const stylesheet = [];
		each(css, function(defs, sel){
			writeStyle(defs, sel, stylesheet);
		});

		return removeEmptyStyles(stylesheet).join("\n");
		// return stylesheet.join("\n");
	}
	
	Css.writeStylesheet = function(css){
		document.write('<style type="text/css">\n');
		document.write(Css.stylesheet(css));
		document.write('\n</style>\n');
	}

	Css.addStylesheet = function(id, styles){
		if(document.getElementById(id)) {
			console.warn('Stylesheet #%s already exists', id);
			return;
		}
		document.getElementsByTagName('head')[0].innerHTML+=Clarino.html.style({id:id},
			Clarino.css.stylesheet(styles)
		);
	}

	Css.updateStylesheet = function(id, styles){
		const pnl = document.getElementById(id);
		if(!pnl){
			document.getElementsByTagName('head')[0].innerHTML+=Clarino.html.style({id:id},
				Clarino.css.stylesheet(styles)
			);
		}
		else{
			pnl.innerHTML = Clarino.css.stylesheet(styles);
		}
	}
	
	Css.unit = function(name){
		const format = v=>typeof(v)==='string'?v
			:v instanceof Array? v.join(name+' ')+name
			:v+name;

		const cache = {};

		return function(v){
			if(arguments.length==1){
				if(cache[v]) return cache[v];
				const vv = format(v);
				cache[v] = vv;
				return vv;
			}
			return Array.from(arguments).map(a=>format(a)).join(' ');
		}
	}

	extend(Css.unit, {
		px: Css.unit('px'),
		pct: Css.unit('%'),
		pc: Css.unit('pc'),
		rem: Css.unit('rem'),
		em: Css.unit('em')
	});

	Clarino.symbols = function(str, camelCaseToHyphens=false){
		const c=str.split(';');
		const res = {};
		for(let s of c) res[s] = camelCaseToHyphens?s.replace(/[A-Z]/g, v=>'-'+v.toLowerCase()) :s;
		return new Proxy(res, {
			get(o,k){
				if(k=='toString'){
					return function(){
						return o.toString();
					};
				}
				else if(!(k in o)){
					throw `Undefined symbol "${k}"`;
				}
				return o[k];
			}
		});
	};

	Clarino.enumeration = (s,symbolic=false)=>new Proxy(
		Object.freeze(s.split(';').reduce((a,e,i)=>(a[e]=symbolic?Symbol():i, a), {})),
		{get(o,k){
			if(!(k in o)) throw `Undefined enum value "${k}"`;
			return o[k];
		}}
	);

	Clarino.expand = (keys, val, keyF=x=>x)=>{
		if(typeof(keys)==='string') keys = keys.split(';');
		return keys.reduce((a,k)=>((a[keyF(k)] = typeof(val)==='function'?val(k):val), a), {});
	};

	Clarino.curry = function(F) {
		return function curried(...args) {
			if (args.length >= F.length) {
				return F.apply(this, args);
			} else {
				return function(...tail) {
					return curried.apply(this, args.concat(tail));
				}
			}
		};
	}

	Clarino.compose = (...fns)=>fns.reduce((f, g)=>(...args)=>f(g(...args)));
	Clarino.pipe = (...fns) => (input) => fns.reduce((acc,f)=>f(acc), input);

	Clarino.range = function*(vFrom, vTo, vStep=1){
		for(let i=vFrom; i<=vTo; i+=vStep) yield i;
	}

	Clarino.lazy = function(F, timeout=300){
		let last = 0;
		let args = [];

		return function(){
			args = Array.from(arguments);
			if(last) return;

			function tryStart(){
				last = new Date().getTime();
				setTimeout(function(){
					const now = new Date().getTime();
					if(now - last < timeout){
						last = now;
						tryStart();
						return;
					}
					last = 0;
					F(...args);
				}, timeout);
			}

			tryStart();
		};
	}

	Clarino.indexedArray = function(data, idxDef){
		if(!(data instanceof Array)) throw 'Bad data value. Array expected';
		if(typeof(idxDef)!=='object' && typeof(idxDef)!=='function') throw 'Bad idxDef value. Object or function exptected';

		if(typeof(idxDef)==='function') idxDef = {id:idxDef};

		// if(typeof(getID)==='object') return;
		// if(typeof(getID)!=='function') throw 'Bad getID value. Function exptected';

		// const index = new Map();

		const indices = {};
		for(let k in idxDef){
			const index = new Map();
			const getID = idxDef[k];
			for(let x of data) index.set(getID(x), x);
			indices[k] = {getID, index};
		}

		function updateIndices(data){
			for(let idxID in indices){
				const idx = indices[idxID];
				idx.index.clear();
				for(let x of data) idx.index.set(idx.getID(x), x);
			}
		}

		function deleteFromIndices(itm){
			for(let idxID in indices){
				const idx = indices[idxID];
				idx.index.delete(idx.getID(itm));
			}
		}

		return new Proxy(data, {
			set(o, k, v){
				if(k!=='length'){
					for(let idxID in indices){
						const idx = indices[idxID];
						const id = idx.getID(v);
						if(id==null) throw `Item id can't be null`;
						if(idx.index.has(id)) throw `Item with ID=${id} already exists`;
						idx.index.set(id, v);
					}
				}

				Reflect.set(o, k, v);
				return true;
			},
			get(o,k){
				if(k==='index') return function(id, idxID='id'){
					if(id==null) throw `Item id can't be null`;
					if(!(idxID in indices)) throw `Undefined index ID: "${idxID}"`;
					const idx = indices[idxID];
					return idx.index.get(id);
				}
				if(k==='data') return data;
				if(k==='pop') return function(){
					const x = data.pop();
					deleteFromIndices(x);
					return x;
				}
				if(k==='shift') return function(){
					const x = data.shift();
					deleteFromIndices(x);
					return x;
				}
				if(k==='unshift') return function(...args){
					const res = data.unshift(...args);
					updateIndices(data);
					return res;
				}
				if(k==='splice') return function(...args){
					const res = data.splice(...args);
					updateIndices(data);
					return res;
				}
				return Reflect.get(o, k);
			}
		});
	}

	Clarino.form = function(container, markup, events){
		if(!container) return;
		if(typeof(container)==='string') container = document.querySelector(container);
		else if(container.jquery) container = container[0];

		if(typeof(markup)!=='string') throw 'Bad markup value: string expected';
		container.innerHTML = markup;

		if(!events) return;
		if(typeof(events)!=='object') throw 'Bad events structure: object expected';
		for(let sel in events){
			const elements = container.querySelectorAll(sel),
				handlers = events[sel];
			let idx = 0;
			for(let el of elements) for(let evt in handlers){
				if(evt==='each'){
					const F = handlers[evt];
					F(el, idx++);
				}
				else el.addEventListener(evt, handlers[evt]);
			}
		}
	};

	Clarino.typedFunction  = function(...defs){
		const fBody = defs[defs.length-1];
		const argDefs = defs.slice(0, fBody.length);
		const resDef = defs.length==argDefs.length+1 ? x=>x : defs[argDefs.length];

		return function(...actArgs){
			if(actArgs.length!=argDefs.length) console.error(`${argDefs.length} arguments expected`);
			const args = actArgs.map((x,i)=>argDefs[i](x));
			return resDef(fBody(...args));
		}
	}

	Css.keywords = Clarino.symbols('block;none;flex;row;rowReverse;column;columnReverse;left;right;center;top;bottom;hidden;pointer;italic;bold;normal;uppercase;lowercase;absolute;relative;fixed;underline;auto;collapse;separate;inline;inlineBlock;default;solid;dotted;dashed;double;groove;ridge;inset;outset;cover;contain;unset;initial;inherit;wrap;nowrap;wrapReverse;spaceBetween;spaceAround;spaceEvenly;flexStart;flexEnd;baseline;stretch;contentBox;borderBox', true);

	Css.template = {
		border: function(width, color, style){
			style = style || Css.keywords.solid;
			color = color || '#000';
			return [Css.unit.px(width), style, color].join(' ');
		},
		linearGradient: function(angle, color1, color2){
			return [
				color1,
				'-webkit-linear-gradient('+[angle+'deg', color1, color2].join(',')+')',
				'-o-linear-gradient('+[angle+'deg', color1, color2].join(',')+')',
				'-moz-linear-gradient('+[angle+'deg', color1, color2].join(',')+')',
				'linear-gradient('+[angle+'deg', color1, color2].join(',')+')'
			];
		}
	};
	
	function compareVersions(v1, v2){
		if(v1==v2) return 0;
		v1 = v1.split(".");
		v2 = v2.split(".");
		for(let i=0; i<3; i++){
			const a = parseInt(v1[i], 10),
				b = parseInt(v2[i], 10);
			if(a<b) return -1;
			if(a>b) return 1;
		}
		return 0;
	}
	
	function version(num){
		if(!num) return topVersion;
		for(let k in interfaces){
			if(compareVersions(num, k)<=0){
				const $H = {};
				// console.log('return %s interface', k);
				extend($H, interfaces[k]);
				return $H;
			}
		}
		console.error("Clarino version "+num+" not supported");
	}
	
	const topVersion = "2.9.2";
	
	// if(typeof(JSUnit)=="object") 
	Clarino.compareVersions = compareVersions;
	
	const interfaces = {};
	// interfaces[topVersion] = Clarino;
	
	const intf = {
		version
	};
	
	extend(Clarino, intf);
	Clarino.html = Html;
	Clarino.css = Css;
	Clarino.simple = composeInterface('markup;apply;repeat;format;formatStyle;entities;decodeEntities;callFunction');
	const simpleHtml = composeInterface('html.div;html.a;html.p;html.span;html.nobr;html.hr;html.br;html.img;html.ul;html.ol;html.li;html.table;html.tbody;html.thead;html.tr;html.td;html.th;html.input;html.label;html.textarea;html.pre;html.select;html.option;html.optgroup;html.h1;html.h2;html.h3;html.h4;html.h5;html.h6;html.button;html.form;html.dl;html.dt;html.dd');
	extend(Clarino.simple, simpleHtml);

	// Backward compatibitity
	interfaces['1.5.0'] = (function(){
		const css = {};
		extend(css, Clarino.css);
		css.unit = function(nm){
			return Clarino.css.unit(nm);
		}
		extend(css.unit, Clarino.css.unit);
		css.unit.pc = css.unit.pct;

		const intrf = {};
		extend(intrf, Clarino);
		intrf.css = css;
		return intrf;
	})();
	interfaces['2.0.0'] = (function(){
		const intrf = {};
		extend(intrf, Clarino);
		intrf.compose = Clarino.composeInterface;
		return intrf;
	})();
	interfaces['2.2.0'] = (function(){
		const intrf = {};
		extend(intrf, Clarino);
		intrf.symbols = function(str){
			return Clarino.symbols(str, true);
		};
		return intrf;
		
	})();
	interfaces[topVersion] = Clarino;

	return Clarino;
})();
