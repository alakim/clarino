(function($, $C){const $H=$C.simple;
	const {px,pc} = $C.css.unit;
	const css = $C.css.keywords;

	let root;

	$C.css.writeStylesheet({
		body:{
			fontFamily:'Verdana, Arial, Sans-Serif',
			fontSize:px(14),
			backgroundColor:'#012',
			color:'#ffe'
		},
		'table':{
			border:$C.css.template.border(1, '#fee'),
			borderCollapse:css.collapse,
			' th':{
				padding:px(5),
				border:$C.css.template.border(1, '#fee')
			},
			' td':{
				padding:px(5),
				border:$C.css.template.border(1, '#fee')
			}
		}
	});

	const generateID = (function(){
		const dict = new Map();
		let count = 1;
		return function(el){
			if(dict.has(el)) return dict.get(el);
			const id = count++;
			dict.set(el, id);
			return id;
		};
	})();

	function selectChildNodes(rootNode, F){ // selects from direct children only
		const res = [];
		if(!rootNode.childNodes) return res;
		for(let el of rootNode.childNodes){
			if(F(el)) res.push(el);
		}
		return res;
	}

	function selectNodes(rootNode, F){ // select from any descendant node
		const res = [];
		if(!rootNode.childNodes) return res;

		function walk(root){
			for(let el of root.children){
				if(F(el)) res.push(el);
				walk(el);
			}
		}
		walk(rootNode);
		return res;
	}

	function precedingNodes(thisNode, F){
		const res = [];
		if(!thisNode) return res;
		let thisFound = false;

		function walk(root){
			if(thisFound) return;
			for(let el of root.children){
				if(el==thisNode){
					thisFound = true;
					return;
				}
				if(F(el)) res.push(el);
				walk(el);
			}
		}
		walk(thisNode.ownerDocument);
		return res;
	}

	function applyTemplates(coll, templateSet){ // templateSet is like XSLT 'mode' parameter
		return $H.apply(coll, ch=>transform(ch, templateSet));
	}

	function transform(el, templateSet){ // templateSet is like XSLT 'mode' parameter
		templateSet = templateSet || templates.default;
		//console.log('el: %o', el);
		if(!el) return;
		if(el.nodeName=='#text') return el.nodeValue;

		const tNm = el.tagName;
		if(!tNm) return;
		const tpl = templateSet[tNm];
		if(!tpl){
			console.error('template for "'+tNm+'" not defined', templateSet);
			return;
		}
		return tpl(el);
	}

	const templates = {
		catalog:{ // transformation mode for subject catalog
			subjectCatalog:el=>$H.ul(applyTemplates(el.children, templates.catalog)),
			subject:el=>$H.li(
				el.getAttribute('title'),
				el.children.length?$H.ul(
					applyTemplates(el.children, templates.catalog)
				):null
			)
		},
		bookDetails:{ // transformation mode for book details
			person:el=>$H.markup(
				el.getAttribute('name'),
				' (',
				el.getAttribute('years'),
				')'
			)
		},
		default:{ // default templates 
			library:el=>$H.markup(
				applyTemplates(selectChildNodes(el, e=>e.tagName=='subjectCatalog'), templates.catalog),
				applyTemplates(el.children)
			),
			bookStore:el=>$H.table({'class':'pnlLibrary'},
				$H.tr($H.th('№'), $H.th('Название'), $H.th('Автор')),
				applyTemplates(el.children)
			),
			book:el=>$H.tr({'class':'book'},
				$H.td(precedingNodes(el, e=>e.tagName=='book').length+1),
				$H.td(el.getAttribute('title')),
				$H.td(
					applyTemplates(selectNodes(root, e=>e.getAttribute('id')==el.getAttribute('author')), templates.bookDetails)
				)
			),
			subjectCatalog:()=>null, // not displayed in default mode
			persons:()=>null, // not displayed in default mode
			person:()=>null // not displayed in default mode
		}
	};

	function init(){
		const doc = fetch('doc1.xml').then(r=>r.text());
		doc.then(xml=>{
			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(xml, 'application/xml');
			root = xmlDoc.documentElement;
			$('#out').html($H.markup(
				transform(root)
			));
		});
		
	}

	$(init);
})(jQuery, Clarino.version('1.3.0'));
