//
// Макет базы данных
// Имитирует задержки при работе через Ajax
//
var DB = (function(){
	// Время задержки (мсек)
	var timeout = .2e3;
	// Содержимое БД
	var data = [
		{name: 'John', phone:'444-44-44', room:'11'},
		{name: 'Phill', phone:'333-33-33', room:'12'},
		{name: 'Bill', phone:'222-22-22', room:'11'},
		{name: 'James', phone:'111-11-11', room:'12'},
		{name: 'George', phone:'555-55-55', room:'15'}
	];

	// Добавляет в объект 'o'
	// данные, содержащиеся 
	// в атрибутах объекта 's'
	function extend(o, s){
		for(var k in s){
			o[k] = s[k];
		}
	}

	return {
		// возвращает список контактов
		getList: function(callback){
			var res = [];
			for(var el,i=0; el=data[i],i<data.length; i++){
				if(el) res.push({id:i, name:el.name});
			}
			setTimeout(function(){
				callback(res);
			}, timeout);
		},
		// возвращает данные отдельной записи
		getRecord: function(id, callback){
			var res = data[id];
			setTimeout(function(){
				callback(res);
			}, timeout);
		},
		// сохраняет данные записи
		saveRecord: function(id, elData, callback){
			var el;
			if(id==null){
				id = data.length;
				el = {};
				data.push(el);
			}
			else el = data[id];
			extend(el, elData);
			setTimeout(function(){
				callback({id:id});
			}, timeout);
		},
		// Удаляет запись
		deleteRecord: function(id, callback){
			data[id] = null;
			setTimeout(function(){
				callback({success:true});
			}, timeout);
		}
	};
})();
