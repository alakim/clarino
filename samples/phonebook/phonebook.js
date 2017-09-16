var Phonebook = (function($, $C){
	var $H = $C.simple,
		css = $C.css.keywords,
		px = $C.css.unit.px,
		pc = $C.css.unit.pc;

	var Styles = {
		color:{
			footer: '#888'
		}
	};

	$C.css.writeStylesheet({
		'.phonebook':{
			' .link':{
				cursor: css.pointer,
				color: '#0ff',
				':hover':{
					color:'#aff',
					textDecoration: css.underline
				}
			},
			' .main':{
				minHeight: px(300),
				' .itemList':{
					'float':css.left,
					width: px(200)
				},
				' .detailsPanel':{
					//'float':css.right,
					width: px(500)
				}
			},
			' .footer':{
				color: Styles.color.footer,
				borderTop: px(1)+' solid '+Styles.color.footer,
				padding: px(5),
				margin: px(15),
				fontSize:pc(90),
				textAlign: css.center,
				fontStyle: css.italic
			}
		}
	});

	function checkRes(res){
		if(res.error){alert('Error: '+res.error); return false;}
		return true;
	}

	function init(pnl, db){
		$(pnl).html((function(){with($H){
			return div({'class':'phonebook'},
				div({'class':'main'}, 'Loading ...'),
				p({'class':'footer'}, 'Sample Phonebook. Powered by Clarino v.', $C.version())
			);
		}})());
		db.getList(function(res){
			if(!checkRes(res)) return;
			$(pnl).find('.main')
				.html((function(){with($H){
					return markup(
						ol({'class':'itemList'},
							apply(res, function(el){
								return li(
									span({'class':'link lnkItem', 'data-id':el.id}, el.name)
								);
							})
						),
						div({'class':'detailsPanel'})
					);
				}})())
				.find('.lnkItem').click(function(){
					var id = $(this).attr('data-id');
					var detailsPnl = $(pnl).find('.main .detailsPanel');
					detailsPnl.html('Loading...');
					db.getRecord(id, function(res){
						if(!checkRes(res)) return;
						detailsPnl.html((function(){with($H){
							return  markup(
								p('Name: ', res.name),
								p('Phone: ', res.phone),
								p('Room nr.: ', res.room)
							);
						}})());
					});
				}).end()
			;
		});
	}

	return {
		init: init
	};
})(jQuery, Clarino.version('1.0.2'));
