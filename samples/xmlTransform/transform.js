(function($, $C){const $H=$C.simple;
	const {px,pc} = $C.css.unit;
	const css = $C.css.keywords;

	let xTr;

	$C.css.writeStylesheet({
		body:{
			fontFamily:'Verdana, Arial, Sans-Serif',
			fontSize:px(14),
			backgroundColor:'#012',
			color:'#ffe'
		},
		'span.level':{
			border:$C.css.template.border(1, '#ffe')
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

	const templates = {
		catalog:{ // transformation mode for subject catalog
			subjectCatalog:el=>$H.ul(xTr.applyTemplates(el.children, templates.catalog)),
			subject:el=>$H.li(
				$H.span({'class':'level', title:'Subject level'}, xTr.level(el, e=>e.tagName=='subject')), ' ',
				el.getAttribute('title'),
				el.children.length?$H.ul(
					xTr.applyTemplates(el.children, templates.catalog)
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
				xTr.applyTemplates(xTr.selectChildNodes(el, e=>e.tagName=='subjectCatalog'), templates.catalog),
				xTr.applyTemplates(el.children)
			),
			bookStore:el=>$H.table({'class':'pnlLibrary'},
				$H.tr($H.th('№'), $H.th('Название'), $H.th('Автор')),
				xTr.applyTemplates(el.children)
			),
			book:el=>$H.tr({'class':'book'},
				$H.td(xTr.serialNumber(el)),
				$H.td(el.getAttribute('title')),
				$H.td(
					xTr.applyTemplates(xTr.selectNodes(xTr.root, e=>e.getAttribute('id')==el.getAttribute('author')), templates.bookDetails)
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
			xTr = XMLTransformation(xmlDoc.documentElement, templates);
			$('#out').html($H.markup(
				xTr.transform()
			));
		});
		
	}

	$(init);
})(jQuery, Clarino.version('1.3.0'));
