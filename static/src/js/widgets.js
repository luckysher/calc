function openerp_calc_widgets(instance, module){ //module is instance.point_of_sale
    var QWeb = instance.web.qweb;
	var _t = instance.web._t;


    // The PosWidget is the main widget that contains all other widgets in the PointOfSale.
    // It is mainly composed of :
    // - a header, containing the list of orders
    // - a leftpane, containing the list of bought products (orderlines) 
    // - a rightpane, containing the screens (see pos_screens.js)
    // - an actionbar on the bottom, containing various action buttons
    // - popups
    // - an onscreen keyboard
    // a screen_selector which controls the switching between screens and the showing/closing of popups
    module.CalcWidget = module.CalcBaseWidget.extend({
        template: 'CalcWidget',
        init: function() { 
            this._super(arguments[0],{});
            this.calc_widget = this; //So that pos_widget's childs have pos_widget set automatically
            console.log("CALC (INIT) >>---->   ......''''.... ");
        },

        start: function() {
            var self = this;
            console.log("CALC (START) >>---->   ......''''.... ");

            return self.calc.ready.done(function() {
                if ($.browser.chrome) {
                    var chrome_version = $.browser.version.split('.')[0];
                    if (parseInt(chrome_version, 10) >= 50) {
                        console.log(">>>---> Chrome version....");
                        //openerp.loadCSS('/point_of_sale/static/src/css/chrome50.css');
                    }
                }

                // remove default webclient handlers that induce click delay
                $(document).off();
                $(window).off();
                $('html').off();
                $('body').off();
                $(self.$el).parent().off();
                $('document').off();
                $('.oe_web_client').off();
                $('.openerp_webclient_container').off();


                self.renderElement();
                
                //self.$('.neworder-button').click(function(){
                //    self.pos.add_new_order();
                //});

                //self.$('.deleteorder-button').click(function(){
                //    if( !self.pos.get('selectedOrder').is_empty() ){
                //        self.screen_selector.show_popup('confirm',{
                //            message: _t('Destroy Current Order ?'),
                //           comment: _t('You will lose any data associated with the current order'),
                //            confirm: function(){
                //                self.pos.delete_current_order();
                //            },
               //         });
               //     }else{
               //         self.pos.delete_current_order();
              //      }
              //  });
                
                //when a new order is created, add an order button widget
             //   self.pos.get('orders').bind('add', function(new_order){
             //       var new_order_button = new module.OrderButtonWidget(null, {
             //           order: new_order,
             //           pos: self.pos
             //       });
             //       new_order_button.appendTo(this.$('.orders'));
            //       new_order_button.selectOrder();
            //    }, self);

           //     self.pos.add_new_order();

                // self.build_widgets();

           //     if(self.pos.config.iface_big_scrollbars){
          //          self.$el.addClass('big-scrollbars');
          //      }

                self.screen_selector.set_default_screen();

         //       self.pos.barcode_reader.connect();

                instance.webclient.set_content_full_screen(true);

       //         self.$('.loader').animate({opacity:0},1500,'swing',function(){self.$('.loader').addClass('oe_hidden');});
                
                instance.web.cordova.send('calcready');

      //          self.pos.push_order();

            }).fail(function(err){   // error when loading models data from the backend
                self.loading_error(err);
            });
        },
        loading_error: function(err){
            var self = this;

            var message = err.message;
            var comment = err.stack;

            if(err.message === 'XmlHttpRequestError '){
                message = 'Network Failure (XmlHttpRequestError)';
                comment = 'The Point of Sale could not be loaded due to a network problem.\n Please check your internet connection.';
            }else if(err.message === 'OpenERP Server Error'){
                message = err.data.message;
                comment = err.data.debug;
            }

            if( typeof comment !== 'string' ){
                comment = 'Traceback not available.';
            }

            var popup = $(QWeb.render('ErrorTracebackPopupWidget',{
                widget: { message: message, comment: comment },
            }));

            popup.find('.button').click(function(){
                self.close();
            });

            popup.css({ zindex: 9001 });

            popup.appendTo(this.$el);
        },
        loading_progress: function(fac){
            this.$('.loader .loader-feedback').removeClass('oe_hidden');
            this.$('.loader .progress').css({'width': ''+Math.floor(fac*100)+'%'});
        },
        loading_message: function(msg,progress){
            this.$('.loader .loader-feedback').removeClass('oe_hidden');
            this.$('.loader .message').text(msg);
            if(typeof progress !== 'undefined'){
                this.loading_progress(progress);
            }
        },
        loading_skip: function(callback){
            if(callback){
                this.$('.loader .loader-feedback').removeClass('oe_hidden');
                this.$('.loader .button.skip').removeClass('oe_hidden');
                this.$('.loader .button.skip').off('click');
                this.$('.loader .button.skip').click(callback);
            }else{
                this.$('.loader .button.skip').addClass('oe_hidden');
            }
        },
        // This method instantiates all the screens, widgets, etc. If you want to add new screens change the
        // startup screen, etc, override this method.
        build_widgets: function() {
            var self = this;

            // --------  Screens ---------

            this.product_screen = new module.ProductScreenWidget(this,{});
            this.product_screen.appendTo(this.$('.screens'));

            this.receipt_screen = new module.ReceiptScreenWidget(this, {});
            this.receipt_screen.appendTo(this.$('.screens'));

            this.payment_screen = new module.PaymentScreenWidget(this, {});
            this.payment_screen.appendTo(this.$('.screens'));

            this.clientlist_screen = new module.ClientListScreenWidget(this, {});
            this.clientlist_screen.appendTo(this.$('.screens'));

            this.scale_screen = new module.ScaleScreenWidget(this,{});
            this.scale_screen.appendTo(this.$('.screens'));


            // --------  Popups ---------

            this.error_popup = new module.ErrorPopupWidget(this, {});
            this.error_popup.appendTo(this.$el);

            this.error_barcode_popup = new module.ErrorBarcodePopupWidget(this, {});
            this.error_barcode_popup.appendTo(this.$el);

            this.error_traceback_popup = new module.ErrorTracebackPopupWidget(this,{});
            this.error_traceback_popup.appendTo(this.$el);

            this.confirm_popup = new module.ConfirmPopupWidget(this,{});
            this.confirm_popup.appendTo(this.$el);

            this.unsent_orders_popup = new module.UnsentOrdersPopupWidget(this,{});
            this.unsent_orders_popup.appendTo(this.$el);

            // --------  Misc ---------

            this.close_button = new module.HeaderButtonWidget(this,{
                label: _t('Close'),
                action: function(){ 
                    var self = this;
                    if (!this.confirmed) {
                        this.$el.addClass('confirm');
                        this.$el.text(_t('Confirm'));
                        this.confirmed = setTimeout(function(){
                            self.$el.removeClass('confirm');
                            self.$el.text(_t('Close'));
                            self.confirmed = false;
                        },2000);
                    } else {
                        clearTimeout(this.confirmed);
                        this.pos_widget.close();
                    }
                },
            });
            this.close_button.appendTo(this.$('.pos-rightheader'));

            this.notification = new module.SynchNotificationWidget(this,{});
            this.notification.appendTo(this.$('.pos-rightheader'));

            if(this.pos.config.use_proxy){
                this.proxy_status = new module.ProxyStatusWidget(this,{});
                this.proxy_status.appendTo(this.$('.pos-rightheader'));
            }

            this.username   = new module.UsernameWidget(this,{});
            this.username.replace(this.$('.placeholder-UsernameWidget'));

            this.action_bar = new module.ActionBarWidget(this);
            this.action_bar.replace(this.$(".placeholder-RightActionBar"));

            this.paypad = new module.PaypadWidget(this, {});
            this.paypad.replace(this.$('.placeholder-PaypadWidget'));

            this.numpad = new module.NumpadWidget(this);
            this.numpad.replace(this.$('.placeholder-NumpadWidget'));

            this.order_widget = new module.OrderWidget(this, {});
            this.order_widget.replace(this.$('.placeholder-OrderWidget'));

            this.onscreen_keyboard = new module.OnscreenKeyboardWidget(this, {
                'keyboard_model': 'simple'
            });
            this.onscreen_keyboard.replace(this.$('.placeholder-OnscreenKeyboardWidget'));

            // --------  Screen Selector ---------

            this.screen_selector = new module.ScreenSelector({
                pos: this.pos,
                screen_set:{
                    'products': this.product_screen,
                    'payment' : this.payment_screen,
                    'scale':    this.scale_screen,
                    'receipt' : this.receipt_screen,
                    'clientlist': this.clientlist_screen,
                },
                popup_set:{
                    'error': this.error_popup,
                    'error-barcode': this.error_barcode_popup,
                    'error-traceback': this.error_traceback_popup,
                    'confirm': this.confirm_popup,
                    'unsent-orders': this.unsent_orders_popup,
                },
                default_screen: 'products',
                default_mode: 'cashier',
            });

            if(this.pos.debug){
                this.debug_widget = new module.DebugWidget(this);
                this.debug_widget.appendTo(this.$('.pos-content'));
            }

            this.disable_rubberbanding();

        },

        changed_pending_operations: function () {
            var self = this;
            this.synch_notification.on_change_nbr_pending(self.pos.get('nbr_pending_operations').length);
        },
        // shows or hide the numpad and related controls like the paypad.
        set_numpad_visible: function(visible){
            if(visible !== this.numpad_visible){
                this.numpad_visible = visible;
                if(visible){
                    this.numpad.show();
                    this.paypad.show();
                }else{
                    this.numpad.hide();
                    this.paypad.hide();
                }
            }
        },
        //shows or hide the leftpane (contains the list of orderlines, the numpad, the paypad, etc.)
        set_leftpane_visible: function(visible){
            if(visible !== this.leftpane_visible){
                this.leftpane_visible = visible;
                if(visible){
                    this.$('.pos-leftpane').removeClass('oe_hidden');
                    this.$('.rightpane').css({'left':this.leftpane_width});
                }else{
                    this.$('.pos-leftpane').addClass('oe_hidden');
                    this.$('.rightpane').css({'left':'0px'});
                }
            }
        },
        close: function() {
            var self = this;

            function close(){
                self.pos.push_order().then(function(){
                    instance.web.cordova.send('poslogout');
                    return new instance.web.Model("ir.model.data").get_func("search_read")([['name', '=', 'action_client_pos_menu']], ['res_id']).pipe(function(res) {
                        window.location = '/web#action=' + res[0]['res_id'];
                    },function(err,event) {
                        event.preventDefault();
                        self.screen_selector.show_popup('error',{
                            'message': _t('Could not close the point of sale.'),
                            'comment': _t('Your internet connection is probably down.'),
                        });
                        self.close_button.renderElement();
                    });
                });
            }

            var draft_order = _.find( self.pos.get('orders').models, function(order){
                return order.get('orderLines').length !== 0 && order.get('paymentLines').length === 0;
            });
            if(draft_order){
                if (confirm(_t("Pending orders will be lost.\nAre you sure you want to leave this session?"))) {
                    close();
                }
            }else{
                close();
            }
        },
        destroy: function() {
            this.pos.destroy();
            instance.webclient.set_content_full_screen(false);
            this._super();
        }
    });
}
