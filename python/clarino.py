#coding:utf8
class Clarino:
	@staticmethod
	def tagContent(nm, content):
		head = '<'+nm;
		for e in content:
			if type(e) is dict:
				for n in e:
					head+=' '+n+'="'+e[n]+'"'

		tail = '</%s>'%nm;
		# inner = ''.join(list(map(lambda e:e.__str__(), content)))

		inner = ''
		for e in content:
			if not(type(e) is dict):
				#inner+=e.__str__()
				#inner+=e.encode('utf-8', 'ignore').decode('utf-8') #.strip()
				inner+=e.__str__().encode('utf-8', 'ignore').decode('utf-8') #.strip()
		if len(inner)>0:
			return head+'>'+inner+tail
		else:
			return head+'/>'

	@staticmethod
	def tag(nm):
		#return lambda *x: '<%s>%s</%s>'%(nm, ''.join(list(map(lambda e:e.__str__(), x))), nm)
		return lambda *x: Clarino.tagContent(nm, x)

	@staticmethod
	def repeat(n, templ):
		s = ''
		for i in range(n):
			s = s+templ(i+1)
		return s

	@staticmethod
	def apply(coll, templ):
		s = ''
		for e in coll:
			s = s+templ(e)
		return s

	@staticmethod
	def markup(*content):
		inner = ''
		for e in content:
			inner+=e.__str__().encode('utf-8', 'ignore').decode('utf-8') #.strip()
		return inner
