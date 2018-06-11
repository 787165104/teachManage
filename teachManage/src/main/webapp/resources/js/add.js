//var isHideMenu;
$(function(){
	// 初始化可添加到桌面到appInfo列表
	$.ajax({
		url : ParentUrl + '/home/getAppInfoAddList',
		type : 'post',
		data : {},
		success : function(rs){
			$('li', '.the-icons').remove();
			$('h4', '.the-icons').remove();
			
			if(rs){
				if(rs.length){
					$('h3', '.the-icons').hide();
					for(var i in rs){
						var appInfo = rs[i];
						var liId = 'appItem_' + appInfo.appId;
						var inputId = 'hide_appItem_' + appInfo.appId;
						var opModelId = 'hide_openmodel_' + appInfo.appId
						var refreshOnOpenId = 'hide_refreshOnOpen_' + appInfo.appId;
						var widgetId = 'hide_widget_' + appInfo.appId;
						var widgetWidthId = 'hide_widgetWidth_' + appInfo.appId;
						var widgetHeightId = 'hide_widgetHeight_' + appInfo.appId;
						var sourceCodeId = 'hide_sourceCode_' + appInfo.appId;
						var strHtml = '<li id="'+ liId +'">' + 
										'<input id="' + inputId +'" type="hidden" value="'+ appInfo.appUrl + '" />' +
										'<input id="' + opModelId +'" type="hidden" value="'+ appInfo.openModel + '" />' +
										'<input id="' + refreshOnOpenId +'" type="hidden" value="'+ appInfo.refreshOnOpen + '" />' +
										'<input id="' + widgetId +'" type="hidden" value="'+ appInfo.widget + '" />' +
										'<input id="' + widgetWidthId +'" type="hidden" value="'+ appInfo.widgetWidth + '" />' +
										'<input id="' + widgetHeightId +'" type="hidden" value="'+ appInfo.widgetHeight + '" />' +
										'<input id="' + sourceCodeId +'" type="hidden" value="'+ appInfo.sourceCode + '" />' +
										'<i class="' + appInfo.appIcon + '"></i>' + 
										appInfo.appName + 
									  '</li>';
						
						$('.the-icons').append(strHtml);
					}
					$('.the-icons').append('<h4 style="margin: 0px; padding: 0px; text-align: center; color: #777;">请拖到桌面</h4>');
				} else {
					$('h3', '.the-icons').show();
				}
				
			} else {
				$('h3', '.the-icons').show();
			}
		}
	});
	
	$('.the-icons').mouseout(function(){
		
	});
	
	$('.the-icons').mouseover(function(){
		
	});
	
	$('.the-icons').on('mousedown','li',function(event){
		modelItem.add._targetMousedown(event, this);
	});
	
	$('.the-icons').on('mouseup', 'li',function(event){
		modelItem.add._targetMouseup(event);
	});
	
	$('#addAppItem').click(function(){
		if($('#modelSettingPopover').css('display') != 'none'){
        	$('#modelSettingPopover').css('display', 'none');
        	$('#modelSettingPopover').css('opacity', 0);
        	 if(settingTarget){
                 settingTarget.removeClass('edit');
             }
        }
        
        if($('#modelDelPopover').css('display') != 'none'){
        	$('#modelDelPopover').css('display', 'none');
        	$('#modelDelPopover').css('opacity', 0);
        	if(settingTarget){
                settingTarget.removeClass('del');
            }
        }
        
        modelItem.add.getAppInfoAddList();
	});
	
	
	/**
	 * 模块添加操作
	 */
	modelItem.add = {
			config : {
				currentMouseX : 0, // 保存鼠标当前的clientX坐标
				currentMouseY : 0, // 保存鼠标当前的clientY坐标
				selectItem : null, // 触发点击事件的appItem项
				substitute : null, // appItem项的替身对象，用于移动
				isCanPlace : false // 是否可以放置添加的磁帖
			},
			
			addModel : null,
			
			_targetMousedown : function(event, o){
				var config = modelItem.add.config;
				config.currentMouseX = event.clientX;
				config.currentMouseY = event.clientY;
				
				config.selectItem = o;
				
				//var wrapperPosition = getPosition($('#containment-wrapper').get(0));
				
				var itemPosition = getPosition(o); // 获取当前触发触发事件的对象的相对与document坐标
				var htmlStr = '<div><ul class="the-icons" style="padding: 0px"><li>' + $(o).html() + '</li></ul></div>';
				var oSubstitute = $(htmlStr).css({
					'left' : itemPosition.x, 
					'top' : itemPosition.y, 
					'position' : 'absolute', 
					'background-color' : '#fff', 
					'z-index' : 9999, 
					'width' : '210px',
					'font-size' : '14px',
					'border-radius' : '6px'
				});
				oSubstitute.appendTo('body');
				config.substitute = oSubstitute;
				// 创建虚线占位
				var oPlaceholder = $('<div>').css({
					'left' : itemPosition.x,
					'top' : itemPosition.y,
					'position' : 'absolute',
					'z-index' : 9998,
					'width' : $(o).width() + 12,
					'height' : $(o).height(),
					'border-radius' : '6px',
					'border' : '1px dashed #000',
					'background-color' : '#fff',
				});
				oPlaceholder.appendTo('body');
				config.substitute.placeholder = oPlaceholder;
				
				modelItem.draggable.drag = modelItem.add._targetMove;
				// 指定添加磁贴的处理函数
                if(!modelItem.add.addModel){	                    	
                	modelItem.add.addModel = modelItem.add._targetMouseup;
                }
			},
			
			_targetMove : function(event){
				var config = modelItem.add.config;
				
				var clientX = event.clientX;
				var clientY = event.clientY;
				
				var offsetX = clientX - config.currentMouseX;
				var offsetY = clientY - config.currentMouseY;
				
				config.currentMouseX = event.clientX;
				config.currentMouseY = event.clientY;
				
				var left = config.substitute.position().left;
				var top = config.substitute.position().top;
				left += offsetX;
				top += offsetY;
				
				config.substitute.css({'left' : left + 'px', 'top' : top + 'px'});
				
				modelItem.add.checkCanPlace(event);
			},
			
			_targetMouseup : function(event){
				var config = modelItem.add.config;

				if(config.isCanPlace){
					config.isCanPlace = false;
					isHideMenu = false;
					var layoutInfo = modelItem.add.getLayoutData();
					// 随机选取背景颜色
					var lis = $('li', '#settingboxbgcolor');
					var range = lis.length;
					if(range){
						var random = Math.random();
						var randomIndex = Math.round(random * range);
						var oli = lis.eq(randomIndex);
						var bgColor = oli.css('backgroundColor');
						var bgClassName = oli.attr('class');
						layoutInfo.iconColor = bgColor;
						layoutInfo.iconColorName = bgClassName;
					}
					
					var newModel = modelItem.createModel(layoutInfo);
					
					var left = config.substitute.modelLeft;
					var top = config.substitute.modelTop;
					newModel.css({'left' : left, 'top' : top});
					
					$('#containment-wrapper').append(newModel);
					newModel.fadeIn('fast', function(){
						setting.setIconImgSize($(this));
	                	setting.setEditIconSize($(this), width, height);
	                	
	                	if(layoutInfo.sourceCode && $('.bgIcon', newModel)[layoutInfo.sourceCode]){
	                		$('.bgIcon', newModel).html('');
	                		$('.bgIcon', newModel)[layoutInfo.sourceCode]();
	                		
	                		$('.iconfont>a', newModel).hide();// 隐藏应用名称
                        	$('.iconImg', newModel).hide(); // 隐藏应用图标
                        	
                        	$('.bgIcon', newModel).css('zIndex', 1);
	                	}
					});
					modelItem.draggable.oSelf = newModel;
					
					if(config.substitute){
						config.substitute.placeholder.remove();
						
						var width = config.substitute.modelWidth;
						var height = config.substitute.modelHeight;
						config.substitute.animate({'width' : width, 'height' : height, 'opacity' : 0}, function(){
							$(this).remove();
							config.selectItem.remove();
							
							if(!$('li', '.the-icons').length){
								$('h3', '.the-icons').show();
								$('h4', '.the-icons').remove();
							}
						});
					}
					
				} else {
					if(config.substitute){
						
						var placeholder = config.substitute.placeholder;
						var targetLeft = placeholder.position().left;
						var targetTop = placeholder.position().top;
						
						config.substitute.animate({'left' : targetLeft, 'top' : targetTop},'fast', function(){
							isHideMenu = false;
							placeholder.remove();
							$(this).remove();
							
						});
					}
				}
			},
			
			checkCanPlace : function(event){
				var dragConfig = modelItem.draggable;
		        var gridConfig = modelItem.grid;
		        var config = modelItem.add.config;
		        
		        var modelWidth = 2;
		        var modelHeight = 2;
		        var o = config.selectItem;
				var id = $(o).attr('id');
				if(id.split('_').length > 1){
					id = id.split('_')[1];
				}
				var widget = $('#hide_widget_' + id, o).val() == 'false' ? false : true;
				if(widget) {
					var widgetWidthId = '#hide_widgetWidth_' + id;
					var widgetHeightId = '#hide_widgetHeight_' + id;
					
					var widgetWidth = parseInt($(widgetWidthId, o).val());
					var widgetHeight = parseInt($(widgetHeightId, o).val());
					
					if(widgetWidth){
						modelWidth = widgetWidth;
					}
					
					if(widgetHeight){
						modelHeight = widgetHeight;
					}
				}
				
				var left = config.substitute.position().left;
				var top = config.substitute.position().top;
				
				var wrapperPosition = getPosition($('#containment-wrapper').get(0));
				
				left -= wrapperPosition.x;
				top -= wrapperPosition.y;
				config.substitute.modelLeft = left;
				config.substitute.modelTop = top;
				
				modelItem.isCanPlace = false;
				config.isCanPlace = false;

	            var tempLeft = 0;
	            var tempTop = 0;
	            tempLeft = Math.round(left);
	            tempTop = Math.round(top);

	            var tempRowIndex = parseInt(tempTop / gridConfig.size);
	            var tempColIndex = parseInt(tempLeft / gridConfig.size);
	            
	            
	            var tempWidth = gridConfig.modelSize * modelWidth;
	            var tempHeight = gridConfig.modelSize * modelHeight;
	            config.substitute.modelWidth = tempWidth;
				config.substitute.modelHeight = tempHeight;

	            //var tempCols = parseInt((tempWidth - gridConfig.modelSize) / gridConfig.size) + 1;
	            //var tempRows = parseInt((tempHeight - gridConfig.modelSize) / gridConfig.size) + 1;
	            var tempCols = modelWidth;
	            var tempRows = modelHeight;
	            
	            var isAllOk = true;
	            if (gridConfig.gridArrs[tempRowIndex][tempColIndex] == 0 && tempRowIndex + tempCols <= gridConfig.gridArrs.length) {

	                for (var i = tempRowIndex; i < tempRowIndex + tempRows; i++) {
	                    for (var j = tempColIndex; j < tempColIndex + tempCols; j++) {
	                        if (gridConfig.gridArrs[i]) {
	                            if (gridConfig.gridArrs[i][j] && gridConfig.gridArrs[i][j] != 0) {
	                                isAllOk = false;
	                                break;
	                            }
	                        }
	                    }
	                }
	                
	                if (isAllOk) {
	                    modelItem.targetWillLeft = tempColIndex * gridConfig.size;
	                    modelItem.targetWillTop = tempRowIndex * gridConfig.size;
	                    
	                    // 由于是新增的磁贴,本事就没有占用grid的slot，所以不需要将grid的slot的值修改为0
	                    modelItem.targetCurrentLeft = modelItem.targetWillLeft;
	                    modelItem.targetCurrentTop = modelItem.targetWillTop;
	                    
	                    $(config.substitute).removeClass('not');
	                    $(config.substitute).addClass('over');
	                    $('li',config.substitute).css('cursor', 'pointer');

	                    $('#modelplaceview').css({ left: modelItem.targetWillLeft + 'px',
	                        top: modelItem.targetWillTop + 'px',
	                        width: tempWidth + 'px',
	                        height: tempHeight + 'px'
	                    });
	                    $('#modelplaceview').show();
	                    
	                    config.isCanPlace = true;
	                }
	            } else {
	                isAllOk = false;
	            }

	            if (!isAllOk) {
	            	isHideMenu = true; // 用于标识不允许隐藏添加应用程序列表的下拉框,该判断会在bootstrap.js->840行进行判断

	                $('#modelplaceview').hide();
	                $(config.substitute).removeClass('over');
                    $(config.substitute).addClass('not');
	                $('li',config.substitute).css('cursor', 'not-allowed');
	            }

			},
			// 获取新增磁贴的布局数据
			getLayoutData : function(){
				var initLayoutInfo = {
					appId:"1",
					appUrl:"http://dgt.dgtis.com/crm",
					appName:"CRM",
					iconColor:"rgb(0, 146, 219)",
					iconColorName:"MintyAqua",
					iconCols:2,
					iconRows:2,
					iconColIndex:5,
					iconRowIndex:5,
					iconImg:"icon-group",
					iconName:"CRM",
					fontColor:"rgb(255, 255, 255)",
					fontColorName:"White",
					fontSize:"16px",
					fontTextAlign:"center",
					fontPosition:"bottom",
					sourceCode:null,
					widget:false,
					openModel:1,
					refreshOnOpen : false
				};
				
				var config = modelItem.add.config;
				if(config.selectItem){
					var o = config.selectItem;
					
					var id = $(o).attr('id');
					if(id.split('_').length > 1){
						id = id.split('_')[1];
					}
					var name = $(o).text();
					var iconImg = $('i', o).attr('class');
					var url = $('#hide_appItem_' + id, o).val();
					var openModel = parseInt($('#hide_openmodel_' + id, o).val());
					var refreshOnOpen = $('#hide_refreshOnOpen_' + id, o).val();
					var widget = $('#hide_widget_' + id, o).val() == 'false' ? false : true;
					
					if(widget) {
						var widgetWidthId = '#hide_widgetWidth_' + id;
						var widgetHeightId = '#hide_widgetHeight_' + id;
						
						var widgetWidth = parseInt($(widgetWidthId, o).val());
						var widgetHeight = parseInt($(widgetHeightId, o).val());
						
						if(widgetWidth){
							initLayoutInfo.iconCols = widgetWidth;
						}
						
						if(widgetHeight){
							initLayoutInfo.iconRows = widgetHeight;
						}
						
						var sourceCodeId = '#hide_sourceCode_' + id;
						var sourceCode = $(sourceCodeId, o).val();
						initLayoutInfo.sourceCode = sourceCode;
					}

					initLayoutInfo.appId = id;
					initLayoutInfo.appName = name;
					initLayoutInfo.iconName = name;
					initLayoutInfo.appUrl = url;
					initLayoutInfo.iconImg = iconImg;
					initLayoutInfo.openModel = openModel;
					initLayoutInfo.refreshOnOpen = refreshOnOpen;
					initLayoutInfo.widget = widget;
				}
				
				return initLayoutInfo;
			},
			
			getAppInfoAddList : function(){
				// 初始化可添加到桌面到appInfo列表
		    	$.ajax({
		    		url : ParentUrl + '/home/getAppInfoAddList',
		    		type : 'post',
		    		data : {},
		    		success : function(rs){
		    			$('li', '.the-icons').remove();
		    			$('h4', '.the-icons').remove();
		    			if(rs){
		    				if(rs.length){
		    					$('h3', '.the-icons').hide();
		    					for(var i in rs){
		    						var appInfo = rs[i];
		    						var liId = 'appItem_' + appInfo.appId;
		    						var inputId = 'hide_appItem_' + appInfo.appId;
		    						var opModelId = 'hide_openmodel_' + appInfo.appId
		    						var refreshOnOpenId = 'hide_refreshOnOpen_' + appInfo.appId;
		    						var widgetId = 'hide_widget_' + appInfo.appId;
		    						var widgetWidthId = 'hide_widgetWidth_' + appInfo.appId;
		    						var widgetHeightId = 'hide_widgetHeight_' + appInfo.appId;
		    						var sourceCodeId = 'hide_sourceCode_' + appInfo.appId;
		    						
		    						var strHtml = '<li id="' + liId + '">' + 
		    										'<input id="' + inputId + '" type="hidden" value="' + appInfo.appUrl + '" />' + 
		    										'<input id="' + opModelId + '" type="hidden" value="' + appInfo.openModel + '" />' + 
		    										'<input id="' + refreshOnOpenId + '" type="hidden" value="' + appInfo.refreshOnOpen + '" />' + 
		    										'<input id="' + widgetId + '" type="hidden" value="' + appInfo.widget + '" />' + 
		    										'<input id="' + widgetWidthId +'" type="hidden" value="'+ appInfo.widgetWidth + '" />' +
		    										'<input id="' + widgetHeightId +'" type="hidden" value="'+ appInfo.widgetHeight + '" />' +
		    										'<input id="' + sourceCodeId +'" type="hidden" value="'+ appInfo.sourceCode + '" />' +
		    										'<i class="' + appInfo.appIcon + '"></i>' + 
		    										appInfo.appName + 
		    									  '</li>';
		    						
		    						$('.the-icons').append(strHtml);
		    					}
		    					$('.the-icons').append('<h4 style="margin: 0px; padding: 0px; text-align: center; color: #777;">请拖到桌面</h4>');
		    				} else {
		    					$('h3', '.the-icons').show();
		    				}
		    				
		    			} else {
		    				$('h3', '.the-icons').show();
		    			}
		    		}
		    	});
			},
			
			addModelLayoutInfo : function(jsonData){
		         $.ajax({
		             type: 'POST',
		             url: ParentUrl + "/home/addModelLayoutInfo",
		             data: jsonData,
		             success: function (rs) {
		            	 if(!rs.status){
		            		 
		            	 }
		             }
		         });
			}
	}
});