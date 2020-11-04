import {$C, $H, px, css, border, Locale} from './core.js'; 

$C.css.addStylesheet('controls', {
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
	dlg.setAttribute('class', id);
	dlg.setAttribute('class', 'modalDialog');
	dlg.addEventListener('click', function(){dlg.remove();});

	$C.form(dlg, 
		markup(
			div({'class':'dlgBody'},
				div({'class':'dlgTitle'}, title),
				div({'class':'dlgContent'}),
				div({'class':'dlgButtons'},
					span({'class':'custom'}),
					button({'class':'btClose'}, locale===Locale.ru?'Отмена':'Cancel')
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

export {modalDialog};
