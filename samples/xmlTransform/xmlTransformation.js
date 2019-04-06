function XMLTransformation(root, templates){
	const $H = Clarino.version('1.3.0').simple;

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

	function ancestorNodes(thisNode, F){
		F = F || (e=>true);
		const res = [];
		function walk(nd){
			if(!nd.parentNode || !nd.parentNode.tagName) return;
			if(F(nd.parentNode)) res.push(nd.parentNode);
			walk(nd.parentNode);
		}
		walk(thisNode);
		res.reverse();
		//console.log(thisNode, res);
		return res;
	}

	function precedingNodes(thisNode, F){
		F = F || (e=>true);
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
		el = el || root;
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


	function serialNumber(el){ // serial number among siblings
		return precedingNodes(el, e=>e.tagName==el.tagName).length+1;
	}

	function level(el, F){
		return ancestorNodes(el, F).length + 1;
	}
	
	return {
		get root(){return root;},
		transform,
		generateID, selectChildNodes, selectNodes, 
		ancestorNodes, precedingNodes, applyTemplates,
		serialNumber, level
	};
}
