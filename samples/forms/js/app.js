import {$C, $H, px, css, border, Locale} from './core.js'; 
import itemDialog from './itemDialog.js';
import {getItems} from './mockWS.js';

$C.css.addStylesheet('app', {
	'.simpleForm':{
		width: px(800),
		border: border(1, '#ffe'),
		padding: px(13),
		' h2':{
			margin:px(0, 0, 12)
		},
		' .topButtons':{
			' button':{
				margin:px(0, 5)
			}
		},
		' .pagerButtons':{
			textAlign: css.right,
			' button':{
				margin: px(0, 5)
			}
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
		data: null,
		pageNr: 0,
		pageSize: 5,
		locale: Locale.en
	}, {set:function(o, k, v){
		o[k] = v;
		updateForm1();
		return true;
	}});

	function updateForm1(){
		const container = document.getElementById('form1');

		if(!state.data){
			container.innerHTML = state.locale===Locale.ru?'Загрузка...':'Loading...';
			getItems().then(res=>{
				state.data = res;
			});
			return;
		}

		$C.form(container, // or query selector '#form1',
			div({'class':'simpleForm'},
				$H.h2(
					state.locale===Locale.ru?'Список элементов':'Item list'
				),
				div({'class':'topButtons'},
					state.locale===Locale.ru?'Размер страницы: ':'Page size: ', 
					input({'type':'text', 'class':'tbPageSize', value:state.pageSize}),
					' ', state.locale===Locale.ru?'Язык':'Locale', ': ',
					select({'class':'selLocale'},
						apply(Locale, (v,k)=>option({value:v}, v===state.locale?{selected:true}:null, k))
					),
					button({'class':'btReload'}, state.locale===Locale.ru?'Перезагрузить':'Reload')
				),
				div(
					repeat(state.pageSize, i=>{
						const idx = i-1 + state.pageSize*state.pageNr;
						return idx<state.data.length?div({'class':'item', 'data-idx':i}, 
							state.data[idx].name
						):null;
					}),
				),
				div({'class':'pagerButtons'},
					state.pageNr>0?button({'class':'btPrevPage'}, '&lt;&lt;', state.locale===Locale.ru?'Пред. страница':'Prev page'):null,
					state.pageNr<(state.data.length/state.pageSize - 1)?button({'class':'btNextPage'}, state.locale===Locale.ru?'След. страница':'Next page', '&gt;&gt;'):null
				),
				div(
					button({'class':'btStart'}, 
						state.locale===Locale.ru?'Старт':'Start'
					),
					button({'class':'btStop'}, 
						state.locale===Locale.ru?'Стоп':'Stop'
					)
				)
			),
			{
				'.tbPageSize':{
					click:function(){console.log('Count field clicked!')},
					change:function(ev){
						const val = ev.target.value;
						state.pageSize = parseInt(val);
					}
				},
				'.btPrevPage':{click:()=>{state.pageNr--;}},
				'.btNextPage':{click:()=>{state.pageNr++;}},
				'.btReload':{click:()=>{state.data = null;}},
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

