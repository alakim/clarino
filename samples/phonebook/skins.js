//
// Стили оформления (a.k.a. темы или скины)
// 
var Skins = (function($, $C){
	// Для удобства объявляем сокращенные имена
	// для используемых объектов
	var $H = $C.simple,
		css = $C.css.keywords,
		px = $C.css.unit.px,
		pc = $C.css.unit.pc;
	return {
		// Светлая тема
		light:(function(){
			var Styles = {
				color:{
					footer: '#222'
				}
			};
			return {
				// Отображаемое имя темы
				name:'Light',
				// стили отображения
				stylesheet:{
					body:{
						backgroundColor:'#fff',
						color: '#002',
						' button':{
							padding: px(1, 5),
							background:$C.css.template.linearGradient(-10, '#ccc', '#fff'),
							border: $C.css.template.border(1, '#444'),
							borderRadius: px(4)
						},
						' div.phonebook':{
							' .link':{
								color: '#008',
								':hover':{
									color:'#08a'
								}
							},
							' p.footer':{
								color: Styles.color.footer,
								borderTop: $C.css.template.border(1, Styles.color.footer),
							}
						}
					}
				}
				// При необходимости здесь также можно задать 
				// методы инициализации и финализации скина.
				// Это может быть полезно, например,
				// если скин использует WebGL.
				//
				// init: function(){}
				// finalize: function(){}
			};
		})(),
		// Темная тема
		dark:(function(){
			var Styles = {
				color:{
					footer: '#aac'
				}
			};
			return {
				// Отображаемое имя темы
				name:'Dark',
				// стили отображения
				stylesheet:{
					body:{
						backgroundColor:'#001',
						color: '#ccf',
						' button':{
							padding: px(1, 5),
							background:$C.css.template.linearGradient(-10, '#aac', '#eef'),
							border: $C.css.template.border(1, '#88f'),
							borderRadius: px(4)
						},
						' div.phonebook':{
							' .link':{
								color: '#0ff',
								':hover':{
									color:'#aff'
								}
							},
							' p.footer':{
								color: Styles.color.footer,
								borderTop: $C.css.template.border(1, Styles.color.footer),
							}
						}
					}
				}
			};
		})()
	};
})(jQuery, Clarino.version('1.1.0'));
