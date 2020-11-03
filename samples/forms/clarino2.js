(function(){

	Clarino.enumeration = s=>Object.freeze(s.split(';').reduce((a,e)=>(a[e]=Symbol(), a), {}));
	// const eTypes = Clarino.enumeration('int;float;bool');

	Clarino.form = function(container, markup, events){
		if(typeof(container)==='string') container = document.querySelector(container);
		if(typeof(markup)!=='string') throw 'Bad markup value: string expected';
		container.innerHTML = markup;

		if(!events) return;
		if(typeof(events)!=='object') throw 'Bad events structure: object expected';
		for(let sel in events){
			const elements = container.querySelectorAll(sel),
				handlers = events[sel];
			for(let el of elements) for(let evt in handlers)
				el.addEventListener(evt, handlers[evt]);
		}
	};
	
})();
