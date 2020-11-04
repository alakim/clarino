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

// Состояния формы, изменения которых должно вызывать перерисовку
const state = new Proxy({
		data: null,
		pageNr: 0,
		pageSize: 5,
		locale: Locale.en
	},{set:function(o, k, v){
		o[k] = v;
		renderMainForm();
		return true;
	}}
);

function renderMainForm(){
	console.log('rendering main form');
	const container = document.getElementById('mainForm');
	const {markup,apply,repeat,div,span,input,button,select,option} = $H;

	if(!state.data){
		console.log('loading data ...');
		container.innerHTML = state.locale===Locale.ru?'Загрузка...':'Loading...';
		getItems().then(res=>{
			state.data = res;
		});
		return;
	}

	$C.form(container, // or query selector '#mainForm',
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
			div({'class':'animationButtons'})
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
		}
	);

	renderAnimationForm();
}


// Форма кнопок анимации - вложенная в основную форму

const animationState = new Proxy({
		interval: null
	}, {set:function(o,k,v){
		o[k] = v;
		renderAnimationForm();
		return true;
	}}
);

function renderAnimationForm(){
	console.log('rendering animation form');
	const container = document.getElementById('mainForm');

	const {markup,div,button} = $H;
	const Class = $C.symbols('active');

	$C.form('#mainForm .animationButtons', markup(
		animationState.interval?null:button({'class':'btStart'}, 
			state.locale===Locale.ru?'Включить анимацию':'Start animation'
		),
		animationState.interval?button({'class':'btStop'}, 
			state.locale===Locale.ru?'Остановить анимацию':'Stop animation'
		):null
	), {
		'.btStart':{click:function(ev){
			console.log('Animation started!');
			animationState.interval = setInterval(function(){
				const activeItem = container.querySelector('.item.active');
				if(!activeItem) container.querySelector('.item').classList.add(Class.active);
				else{
					const items = container.querySelectorAll('.item');
					for(let itm of items) itm.classList.remove(Class.active);
					if(activeItem.nextSibling) activeItem.nextSibling.classList.add(Class.active);
					else items[0].classList.add(Class.active);
				}
			}, 1e3);
		}},
		'.btStop':{click:function(ev){
			console.log('Animation finished!');
			if(animationState.interval){
				clearInterval(animationState.interval);
				animationState.interval = null;
				const activeItem = container.querySelector('.item.active');
				if(activeItem) activeItem.classList.remove(Class.active);
			}
		}}
	});
}

window.addEventListener('load', renderMainForm);

