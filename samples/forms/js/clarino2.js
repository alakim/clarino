(function(){

	Clarino.enumeration = (s,symbolic=false)=>Object.freeze(s.split(';').reduce((a,e,i)=>(a[e]=symbolic?Symbol():i, a), {}));

	Clarino.range = function*(vFrom, vTo, vStep=1){
		for(let i=vFrom; i<=vTo; i+=vStep) yield i;
	}

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

	Clarino.lazy = function(F, timeout=300){
		let last = 0;
		let args = [];

		return function(){
			args = Array.from(arguments);
			if(last) return;

			function tryStart(){
				last = new Date().getTime();
				setTimeout(function(){
					const now = new Date().getTime();
					if(now - last < timeout){
						last = now;
						tryStart();
						return;
					}
					last = 0;
					F(...args);
				}, timeout);
			}

			tryStart();
		};
	}
	
})();
