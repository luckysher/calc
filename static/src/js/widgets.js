function openerp_calc_widgets(instance, module){
    var QWeb = instance.web.qweb;
	var _t = instance.web._t;

    // It is mainly composed of :
    // - a header, containing the list of orders
    // - a leftpane, containing the list of bought products (orderlines) 
    // - a rightpane, containing the screens (see pos_screens.js)
    // - an actionbar on the bottom, containing various action buttons
    // - popups
    // - an onscreen keyboard
    // a screen_selector which controls the switching between screens and the showing/closing of popups
    module.CalcWidget = module.CalcBaseWidget.extend({
        template: 'NumpadWidget',
        init: function(parent, options) {
            this._super(parent, options);
            this.calc_widget = this; //So that calc_widget's childs have pos_widget set automatically
        },

        start: function() {
            var self = this;
            }
        });
    }
