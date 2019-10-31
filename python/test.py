#!/usr/bin/python
#coding:utf8

import sys;
import os;
from clarino import Clarino;

ccc = ['a', 'b', 'c'];

C = Clarino
div = C.tag('div')
p = C.tag('p')
span = C.tag('span')

print(C.markup(
	div(
		p({'class':'attention', 'id':'att1'}, 'abc'),
		p('count: ', 5, ' items'),
		C.repeat(2, lambda i:span('#'+i.__str__())),
		C.apply(ccc, lambda e:div(e))
	),
	div('another div')
))

print 'Done';
