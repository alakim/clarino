import {$C, $H, px, css, border, Locale} from './core.js'; 
import {modalDialog} from './controls.js';

function itemDialog(itm, locale){
	const state = new Proxy({
			newMode: itm.name===undefined,
			name: itm.name??''
		}, {set: function(o,k,v){
			o[k] = v;
			valid = validate[k](v);
			return true;
		}}
	);

	const dlg = modalDialog('itemDialog', 
		state.newMode?(locale===Locale.ru?'Добавление элемента':'Adding new item')
			:(locale===Locale.ru?'Свойства элемента':'Item properties'),
		locale
	);

	let valid = true;
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

	return new Promise(resolve=>{
		$C.form(dlg.querySelector('.dlgButtons .custom'),
			markup(
				button({'class':'btSave'}, locale===Locale.ru?'Сохранить':'Save'),
				state.newMode?null:button({'class':'danger btDelete'}, locale===Locale.ru?'Удалить':'Delete')
			),
			{
				'.btSave':{click:function(){
					validate._all();
					if(!valid) return;
					dlg.remove();
					itm.name = state.name;
					resolve();
				}},
				'.btDelete':{click:function(){
					if(!confirm(locale===Locale.ru?'Удалить этот элемент?':'Delete this item?')) return;
					dlg.remove();
					resolve({action:'deleteItem'});
				}}
			}
		);
	});
}

export default itemDialog;
