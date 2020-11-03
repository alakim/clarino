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
			' h2':{
				margin:px(0, 0, 12)
			},
			' .item':{
				padding: px(5),
				margin: px(3),
				border: border(1, '#efe'),
				cursor: css.pointer,
				'.active':{
					backgroundColor:'#0a3'
				}
			}
		},
		'.modalDialog':{
			position: css.fixed,
			top: 0, left:0,
			width:'100vw', height:'100vh',
			backgroundColor:'rgba(0, 0, 0, .7)',
			' .dlgBody':{
				backgroundColor:'#ccc',
				border: border(1, '#888'),
				width:px(600),
				height: px(400),
				margin: px(100, css.auto),
				color:'#000',
				' .dlgTitle':{
					textAlign: css.center,
					borderBottom: border(1, '#888'),
					padding:px(5)
				},
				' .dlgContent':{
					width: '100%',
					height: 'calc(100% - 80px)',
					padding: px(8)
				},
				' .dlgButtons':{
					textAlign: css.right,
					borderTop: border(1, '#888'),
					padding:px(5, 25)
				}
			}
		}
	});

	function modalDialog(id, title, locale){
		const {markup,div,span,button} = $H;
		const dlg = document.createElement('DIV');
		dlg.setAttribute('id', id);
		dlg.setAttribute('class', 'modalDialog');
		dlg.addEventListener('click', function(){dlg.remove();});

		$C.form(dlg, 
			markup(
				div({'class':'dlgBody'},
					div({'class':'dlgTitle'}, title),
					div({'class':'dlgContent'}),
					div({'class':'dlgButtons'},
						span({'class':'custom'}),
						button({'class':'btClose'}, locale===tLocale.ru?'Отмена':'Cancel')
					)
				)
			),
			{
				'.dlgBody':{click: function(ev){
					ev.stopPropagation();
				}},
				'.btClose':{click:function(){
					dlg.remove();
				}}
			}
		);

		document.body.append(dlg);
		return dlg;
	}

	const tLocale = $C.enumeration('en;ru');

	function itemDialog(itm, locale){
		const dlg = modalDialog('itemDialog', locale===tLocale.ru?'Свойства элемента':'Item properties', locale);

		let valid = true;
		const state = new Proxy({name: itm.innerHTML}, {
			set: function(o,k,v){
				o[k] = v;
				valid = validate[k](v);
			}
		});

		const validate = {
			_all: function(){
				for(let k in validate){
					if(k==='_all') continue;
					valid = validate[k](state[k]);
					if(!valid) return;
				}
				valid = true;
			},
			name: function(val){
				if(val.length<1) {alert(locale===tLocale.ru?'Ошибка валидации: следует указать название':'Validation error: empty name'); return false;}
				return true;
			}
		};

		const {markup,div,span,button,input} = $H;
		$C.form(dlg.querySelector('.dlgContent'), 
			markup(
				div(locale===tLocale.ru?'Название':'Name', ': ', input({type:'text', 'class':'tbName', value: state.name}))
			),
			{
				'.tbName':{change:function(ev){
					state.name = ev.target.value;
				}}
			}
		);

		$C.form(dlg.querySelector('.dlgButtons .custom'),
			markup(
				button({'class':'btSave'}, locale===tLocale.ru?'Сохранить':'Save')
			),
			{
				'.btSave':{click:function(){
					validate._all();
					if(!valid) return;
					dlg.remove();
					itm.innerHTML = state.name;
				}}
			}
		);
	}

	window.addEventListener('load', function(){
		const {markup,apply,repeat,div,span,input,button,select,option} = $H;

		let interval;

		const state = new Proxy({
			itemCount:5,
			locale:tLocale.en
		}, {set:function(o, k, v){o[k] = v; updateForm1();}});

		function updateForm1(){
			const container = document.getElementById('form1');
			$C.form(container, // or query selector '#form1',
				div({'class':'simpleForm'},
					$H.h2(
						state.locale===tLocale.ru?'Список элементов':'Item list'
					),
					div(
						state.locale===tLocale.ru?'Количество: ':'Count: ', 
						input({'type':'text', 'class':'tbCount', value:state.itemCount}),
						' ', state.locale===tLocale.ru?'Язык':'Locale', ': ',
						select({'class':'selLocale'},
							apply(tLocale, (v,k)=>option({value:v}, v===state.locale?{selected:true}:null, k))
						)
					),
					div(
						repeat(state.itemCount, i=>div({'class':'item', 'data-idx':i}, 
							state.locale===tLocale.ru?'Элемент №'
								:'Item #', 
							i
						)),
					),
					div(
						button({'class':'btStart'}, 
							state.locale===tLocale.ru?'Старт':'Start'
						),
						button({'class':'btStop'}, 
							state.locale===tLocale.ru?'Стоп':'Stop'
						)
					)
				),
				{
					'.tbCount':{
						click:function(){console.log('Count field clicked!')},
						change:function(ev){
							const val = ev.target.value;
							console.log('Count changed to "%s"', val);
							state.itemCount = parseInt(val);
						}
					},
					'.selLocale':{change:function(ev){
						state.locale = parseInt(ev.target.value);
					}},
					'.item':{
						click:function(ev){
							const idx = ev.target.getAttribute('data-idx');
							console.log(`Item #${idx} clicked!`);
							itemDialog(ev.target, state.locale);
						}
					},
					'.btStart':{click:function(ev){
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
					'.btStop':{click:function(ev){
						console.log('Finished!');
						if(interval) clearInterval(interval);
					}}
				}
			);
		}

		updateForm1();
	});
	
})(Clarino.version('1.5.0'));
