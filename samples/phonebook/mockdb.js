var DB = (function(){
	var timeout = .5e3;
	var data = [
		{name: 'John', phone:'444-44-44', room:'11'},
		{name: 'Phill', phone:'333-33-33', room:'12'},
		{name: 'Bill', phone:'222-22-22', room:'11'},
		{name: 'James', phone:'111-11-11', room:'12'},
		{name: 'George', phone:'555-55-55', room:'15'}
	];

	return {
		getList: function(callback){
			var res = [];
			for(var el,i=0; el=data[i],i<data.length; i++){
				res.push({id:i, name:el.name});
			}
			setTimeout(function(){
				callback(res);
			}, timeout);
		},
		getRecord: function(id, callback){
			var res = data[id];
			setTimeout(function(){
				callback(res);
			}, timeout);
		}
	};
})();
