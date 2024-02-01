
const $C = Clarino.version('3.0.0');
const {markup,apply,h2,h3,p,div,span} = $C.simple;
const {px,em,pct} = $C.css.unit, css = $C.css.keywords;

// Стили для базового отображения модуля
// описываем минимально необходимую стилизацию для корректного отображения
$C.css.addStylesheet('ThingsStyles', {
	'.thingsList':{
		display: css.flex,
		flexDirection: css.column,
		' .thing':{
			display: css.flex,
			flexDirection: css.row,
			gap:px(8)
		}
	}
});

const data = [
	{type:'guitar', brand:'Fender Stratocaster'},
	{type:'guitar', brand:'Gibson Les Paul'},
	{type:'trumpet', brand:'Yamaha YTR-9335CHS'},
	{type:'clarinet', brand:'Buffet Crampon'}
];

function view(){
	return div({'class':'thingsList'},
		h3('Things'),
		apply(data, el=>div({'class':'thing'},
			span({'class':'type'}, el.type),
			span({'class':'brand'}, el.brand)
		))
	);
}


export default{
	view,
	events:{
		'.thingsList':{click:ev=>{
			alert('Thing clicked!');
		}}
	}
};
