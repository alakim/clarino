<?php
require_once('clarino.php');

use Clarino as C;

function div(...$args){
	return C\tag('div', ...$args);
}

function span(...$args){
	return C\tag('span', ...$args);
}

function ul(...$args){
	return C\tag('ul', ...$args);
}

function li(...$args){
	return C\tag('li', ...$args);
}

echo(C\markup(
	div('11',
		span(['class'=>'attention'], 'abc'),
		C\tag('span', ['class'=>'error'], 'test error')
	),
	C\apply([1,2,3], function($v){
		return 'x'.$v;
	}),
	div(['class'=>'comment'], 'simple comment div'),
	C\apply(['a'=>3, 'b'=>2], function($v, $k){
		return "[{$k}={$v}]";
	}),
	ul(C\repeat(3, function($n){
		return li($n);
	}))
));

