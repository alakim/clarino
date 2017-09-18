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
		loadList();

		function loadList(callback){
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
						loadItem(id);
					}).end()
				;
				if(callback) callback();
			});
		}
		
		function loadItem(id){
			var detailsPnl = $(pnl).find('.main .detailsPanel');
			detailsPnl.html('Loading...');
			db.getRecord(id, function(res){
				if(!checkRes(res)) return;
				detailsPnl.html((function(){with($H){
						return  markup(
							div({'class':'itemCard'},
								p('Name: ', res.name),
								p('Phone: ', res.phone),
								p('Room nr.: ', res.room)
							),
							div({'class':'buttons'},
								button({'class':'btEdit'}, 'Edit')
							)
						);
					}})())
					.find('.btEdit').click(function(){
						var dlg = ModalDialog.open('itemEditDialog');
						dlg
							.find('.dialogTitle').html('Edit Item').end()
							.find('.dialogContent').html((function(){with($H){
								return table({width:pc(100), border:0},
									tr(
										td('Name'),
										td(input({type:'text', 
											'class':'tbName',
											style:$C.formatStyle({width:pc(95)}),
											value:res.name
										}))
									),
									tr(
										td('Phone'),
										td(input({type:'text',
											'class':'tbPhone',
											style:$C.formatStyle({width:pc(95)}),
											value:res.phone
										}))
									),
									tr(
										td('Room Nr'),
										td(input({type:'text',
											'class':'tbRoom',
											style:$C.formatStyle({width:pc(95)}),
											value:res.room
										}))
									)
								);
							}})()).end()
							.find('.dialogButtons .customButtons')
								.html((function(){with($H){
									return markup(
										button({'class':'btOK'}, 'OK')
									);
								}})())
								.find('.btOK').click(function(){
									var name = dlg.find('.dialogContent .tbName').val(),
										phone = dlg.find('.dialogContent .tbPhone').val(),
										room = dlg.find('.dialogContent .tbRoom').val();
									db.saveRecord(id, {name:name, phone:phone, room:room}, function(res){
										if(!checkRes(res)) return;
										dlg.hide();
										loadList(function(){
											loadItem(id);
										});
									});
								}).end()
						;
					}).end()
				;
			});
		}
	}

	return {
		init: init
	};
})(jQuery, Clarino.version('1.0.2'));
