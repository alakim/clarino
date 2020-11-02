(function($C){const $H = $C.simple;
	const {px} = $C.css.unit,
		css = $C.css.keywords,
		{border} = $C.css.template
	;

	$C.css.writeStylesheet({
		'.simpleForm':{
			width: px(800),
			border: border(1, '#ffe'),
			padding: px(13),
			' .item':{
				padding: px(5),
				margin: px(3),
				border: border(1, '#efe'),
				cursor: css.pointer,
				'.active':{
					backgroundColor:'#0a3'
				}
			}
		}
	});

	$C.form = function(container, markup, events){
		if(typeof(container)==='string') container = document.querySelector(container);
		if(typeof(markup)!=='string') throw 'Bad markup value: string expected';
		if(typeof(events)!=='object') throw 'Bad events structure: object expected';
		container.innerHTML = markup;
		for(let sel in events){
			const elements = container.querySelectorAll(sel),
				handlers = events[sel];
			for(let el of elements) for(let evt in handlers)
				el.addEventListener(evt, handlers[evt]);
		}
		
	}

	window.addEventListener('load', function(){
		const {markup,apply,repeat,div,span,input,button} = $H;

		let itemCount = 5;
		let interval;

		function updateForm1(){
			const container = document.getElementById('form1');
			$C.form(container, // or query selector '#form1',
				div({'class':'simpleForm'},
					div('Simple form'),
					div('Count: ', input({'type':'text', 'class':'tbCount', value:itemCount})),
					div(
						repeat(itemCount, i=>div({'class':'item', 'data-idx':i}, 'Item #', i)),
					),
					div(
						button({'class':'btStart'}, 'Start'),
						button({'class':'btStop'}, 'Stop')
					)
				),
				{
					'.tbCount':{
						'click':function(){console.log('Count field clicked!')},
						'change':function(ev){
							const val = ev.target.value;
							console.log('Count changed to "%s"', val);
							itemCount = parseInt(val);
							updateForm1();
						}
					},
					'.item':{
						'click':function(ev){
							const idx = ev.target.getAttribute('data-idx');
							console.log(`Item #${idx} clicked!`);
						}
					},
					'.btStart':{'click':function(ev){
						console.log('Started!');
						interval = setInterval(function(){
							const activeItem = container.querySelector('.item.active');
							if(!activeItem) container.querySelector('.item').classList.add('active');
							else{
								const items = container.querySelectorAll('.item');
								for(let itm of items) itm.classList.remove('active');
								if(activeItem.nextSibling) activeItem.nextSibling.classList.add('active');
								else items[0].classList.add('active');
							}
						}, 1e3);
					}},
					'.btStop':{'click':function(ev){
						console.log('Finished!');
						if(interval) clearInterval(interval);
					}}
				}
			);
		}

		updateForm1();
	});
	
})(Clarino.version('1.5.0'));
