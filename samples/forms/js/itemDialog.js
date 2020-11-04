import {$C, $H, px, css, border, Locale} from './core.js'; 
import {modalDialog} from './controls.js';

function itemDialog(itm, locale){
	const dlg = modalDialog('itemDialog', locale===Locale.ru?'Свойства элемента':'Item properties', locale);

	let valid = true;
	const state = new Proxy({name: itm.innerHTML}, {
		set: function(o,k,v){
			o[k] = v;
			valid = validate[k](v);
			return true;
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
			if(val.length<1) {alert(locale===Locale.ru?'Ошибка валидации: следует указать название':'Validation error: empty name'); return false;}
			return true;
		}
	};

	const {markup,div,span,button,input} = $H;
	$C.form(dlg.querySelector('.dlgContent'), 
		markup(
			div(locale===Locale.ru?'Название':'Name', ': ', input({type:'text', 'class':'tbName', value: state.name}))
		),
		{
			'.tbName':{change:function(ev){
				state.name = ev.target.value;
			}}
		}
	);

	$C.form(dlg.querySelector('.dlgButtons .custom'),
		markup(
			button({'class':'btSave'}, locale===Locale.ru?'Сохранить':'Save')
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

export default itemDialog;
