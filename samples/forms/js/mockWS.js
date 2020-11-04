import {$C} from './core.js';

function getItems(){
	return new Promise((resolve)=>{
		setTimeout(function(){
			resolve(Array.from($C.range(1, 30)).map(i=>({
				name: 'Item #'+i
			})));
		}, 500);
	});
}


export {getItems};
