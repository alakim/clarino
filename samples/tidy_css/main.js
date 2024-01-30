import People from './people.js';
import Things from './things.js';

const $C = Clarino.version('3.0.0');
const {markup,apply,h2,h3,p,div,span,label,input,ul,li} = $C.simple;
const {px,em,pct} = $C.css.unit, css = $C.css.keywords, {border} = $C.css.template;
const {ViewClass} = $C.css;

// Цветовая гамма дизайна
const color = {
	black: '#000',
	gray: '#444',
	darkBlue: '#024',
	darkViolet: '#102',
	lightBlue: '#acf',
	lightYellow: '#fee'
};

// Дизайнерские размеры
const size = {
	emGap: .4
};

//******* Классы отображения (View Classes, VC) *********
// Сначала определяем более специфичные классы,
// а потом обобщаем их до более абстрактных
// NB! В отличие от ООП базовые классы отображения являются
// более специфичными, чем производные от них обобщенные
const VC = {
	// Класс отображения заголовков разделов
	// для илюстрации возможностей функции expand
	// задаем его одной строкой, но позже, при объявлении
	// обобщающих классов, нам это аукнется ;)
	
	Headers: ViewClass('h1;h2;h3'),
	// Класс отображения таблиц
	Tables: ViewClass(
		'.peopleList',
		'.thingsList'
	),
	// Класс отображения табличных строк
	Rows: ViewClass(
		'.peopleList .person',
		'.peopleList .titles',
		'.thingsList .thing'
	),
	// Класс отображения табличных заголовков
	TableHeaders: ViewClass(
		'.peopleList .titles'
	)
}

// Обобщенные классы отображения
// класс всего, что отображается шрифтом с засечками
VC.Serif = ViewClass(
	VC.Headers,
	VC.TableHeaders
);

// Главная таблица стилей
// Таблица формируется уже после того, как были сформированы
// таблицы стилей статически импортируемых модулей,
// следовательно, она имеет высший приоритет
$C.css.addStylesheet('MainStyles', {
	// включаем таблицу стилей для класса отображения
	...VC.Headers.stylesheet({
		margin: em(size.emGap*4, size.emGap, size.emGap*2)
	}),
	...VC.TableHeaders.stylesheet({
		backgroundColor: color.darkViolet,
		fontWeight: css.bold,
		justifyContent: 'space-around'
	}),
	...VC.Rows.stylesheet({
		padding: em(size.emGap, size.emGap*2),
		border: border(1, color.gray),
		justifyContent: 'space-between',
		color:color.lightBlue,
		':nth-child(odd)':{
			backgroundColor: color.darkBlue
		},
		':last-child':{
			borderBottomWidth: em(size.emGap)
		}
	}),
	...VC.Tables.stylesheet({
		width:pct(70)
	}),

	...VC.Serif.stylesheet({
		fontFamily: 'Antiqua, Times New Roman, Serif'
	}),

	// Дополнительная нормализация отображения отдельного элемента
	'.peopleList h3':{
		color:color.lightYellow
	}
});

// console.log(''+VC.Rows);

// Стили для мобильной версии
$C.css.addStylesheet('MainMobileStyles', {
	'#main.mobile':{
		backgroundColor: color.black,
		width: px(500),
		padding: px(8),
		margin: px(8),
		border: border(1, color.gray),
		...VC.Headers.stylesheet({
			color: color.lightBlue
		}),
		...VC.Tables.stylesheet({
			width:pct(100),
			' h3':{
				marginTop: em(size.emGap*6),
				textAlign: css.center
			}
		}),
		...VC.Rows.stylesheet({
			flexDirection: css.column,
			' span:nth-child(2)':{
				textAlign: css.right,
				'.born':{
					'::before':{content:"' born '"}
				}
			}
		}),
		...VC.TableHeaders.stylesheet({
			display: css.none
		})
	}
});

$C.form('#main', markup(
	div(
		label('Мобильная версия ', input({type:'checkbox', id:'cbMobile'}))
	),
	People.view(),
	Things.view()
),{
	'#cbMobile':{change:ev=>{
		const onMobile = ev.target.checked;
		document.getElementById('main').classList[onMobile?'add':'remove']('mobile');
	}}
});
