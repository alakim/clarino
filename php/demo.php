<?php
require_once('clarino.php');

use Clarino as C;

$pageTitle = 'Clarino PHP demo page';

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

$h1 = C\defineTag('h1');

extract(C\getTagDefinitions('html;head;title;style;body'));
extract(C\getTagDefinitions('table;tr;th;td'));

function svgPicture(){
	extract(C\getTagDefinitions('svg;circle;rect'));
	return $svg(['width'=>100, 'height'=>100],
		$rect(['x'=>0, 'y'=>2, 'width'=>33, 'height'=>52, 'style'=>'fill:#f08']),
		$rect(['x'=>35, 'y'=>2, 'width'=>33, 'height'=>52, 'style'=>'fill:#0a8'])
	);
}


echo(C\markup(
	$html(
		$head(
			$title($pageTitle),
			'<meta charset="utf-8">',
			$style('body{font-family: Verdana, Arial, Sans-Serif; background-color:#012; color:#ffe;}'),
			$style('th,td{padding:3px;}')
		),
		$body(
			$h1($pageTitle),
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
			})),
			$table(['border'=>1, 'style'=>'border-collapse:collapse;'],
				$tr($th('Name'), $th('Count')),
				$tr($td('John'), $td(25)),
				$tr($td('Phill'), $td(33))
			),
			svgPicture()
		)
	)
));

