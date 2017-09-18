var ModalDialog = (function($, $C){
	var Settings = {
		size:{w:500, h:300},
		color:{
			gray: '#ccc',
			white: '#fff',
			black: '#000'
		}
	};

	var $H = $C.simple,
		css = $C.css.keywords,
		px = $C.css.unit.px,
		pc = $C.css.unit.pc
	;

	function solidBorder(width, color){
		return px(width)+' solid '+color;
	}

	$C.css.writeStylesheet({
		'.modalDialog':{
			position: css.fixed,
			backgroundColor: 'rgba(0, 0, 0, .7)',
			left: px(0), top: px(0),
			width:pc(100), height:pc(100),
			display: css.none,
			' .dialogBody':{
				backgroundColor:Settings.color.white,
				color: Settings.color.black,
				width:px(Settings.size.w),
				border: solidBorder(1, Settings.color.gray),
				borderRadius: px(5),
				margin: px(200, css.auto),
				' .dialogTitle':{
					fontSize:px(18),
					textAlign: css.center,
					padding: px(5),
					borderBottom: solidBorder(1, Settings.color.gray)
				},
				' .dialogContent':{
					minHeight: px(Settings.size.h),
					padding: px(5)
				},
				' .dialogButtons':{
					padding: px(5),
					display: css.flex,
					justifyContent: css.flexEnd,
					borderTop: solidBorder(1, Settings.color.gray),
					' button':{
						margin:px(0, 10)
					}
				}
			}
		}
	});
	

	function open(id){
		var dlg = $('#'+id);
		if(!dlg.length){
			dlg = $((function(){with($H){
				return div({'class':'modalDialog', id:id},
					div({'class':'dialogBody'},
						div({'class':'dialogTitle'}, 'Modal Dialog'),
						div({'class':'dialogContent'}),
						div({'class':'dialogButtons'},
							div({'class':'customButtons'}),
							button({'class':'btClose'}, 'Close')
						)
					)
				);
			}})());
			dlg
				.click(function(){
					$(this).hide();
				})
				.find('.dialogBody').click(function(ev){
					ev.stopPropagation();
				}).end()
				.find('.btClose').click(function(){
					dlg.hide();
				}).end()
			;
			$('body').append(dlg);
		}
		dlg.fadeIn();
		return dlg;
	};


	return {
		open: open
	};
})(jQuery, Clarino.version('1.0.2'));
