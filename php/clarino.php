<?php
namespace Clarino;

function markup(...$args){
	return join('', $args);
}

function tag($name, ...$args){
	$res = [];
	$attrs = [];

	foreach($args as $arg){
		if(is_array($arg)){
			foreach($arg as $k=>$v){
				$attrs[]="{$k}=\"{$v}\"";
			}
		}
		else $res[] = $arg;
	}

	$res[] = "</{$name}>";
	$res = join('', $res);

	if(sizeof($attrs)>0){
		$attrs = join(', ', $attrs);
		$res = "<{$name} ".$attrs.'>'.$res;
	}
	else $res = "<{$name}>".$res;
	return $res;
}

function apply($coll, $F){
	$res = [];

	foreach($coll as $k=>$v){
		$res[] = $F($v, $k);
	}

	return join('', $res);
}

function repeat($count, $F){
	$res = [];

	for($i=0; $i<$count; $i++){
		$res[] = $F($i);
	}

	return join('', $res);
}
