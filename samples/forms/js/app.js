import {$C, $H, px, css, border, tLocale} from './core.js'; 
import itemDialog from './itemDialog.js';

$C.css.addStylesheet('app', {
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
	}
});

window.addEventListener('load', function(){
	const {markup,apply,repeat,div,span,input,button,select,option} = $H;

	let interval;

	const state = new Proxy({
		itemCount:5,
		locale:tLocale.en
	}, {set:function(o, k, v){o[k] = v; updateForm1(); return true;}});

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

