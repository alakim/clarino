
const $C = Clarino.version('3.0.0');
const {markup,apply,h2,h3,p,div,span} = $C.simple;
const {px,em,pct} = $C.css.unit, css = $C.css.keywords;

// Стили для базового отображения модуля
// описываем минимально необходимую стилизацию для корректного отображения
$C.css.addStylesheet('PeopleStyles', {
	'.peopleList':{
		display: css.flex,
		flexDirection: css.column,

		// специально задали какой-то дурацкий стиль,
		// чтобы потом на уровне всего приложения его переопределить
		' h3':{color:'#f80'},

		...$C.expand(' .person; .titles', {
			display: css.flex,
			flexDirection: css.row,
			gap:px(8)
		})
	}
});

const data = [
	{name:'John Lennon', born:'1940-10-09'},
	{name:'Paul McCartney', born:'1942-06-18'},
	{name:'Ringo Starr', born:'1940-07-07'},
	{name:'George Harrison', born:'1943-02-25'}
];

function view(){
	return div({'class':'peopleList'},
		h3('People'),
		div({'class':'titles'},
			span('Name'),
			span('Born')
		),
		apply(data, el=>div({'class':'person'},
			span({'class':'name'}, el.name),
			span({'class':'born'}, el.born)
		))
	);
}


export default{
	view
};
