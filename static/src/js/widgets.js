function openerp_calc_widgets(instance, module){
    var QWeb = instance.web.qweb;
	var _t = instance.web._t;

    module.CalcWidget = module.CalcBaseWidget.extend({
        template: 'NumpadWidget',
        init: function(parent, options) {
            this._super(parent, options);
            this.calc_widget = this; //So that calc_widget's childs have child_widget set automatically
            this.show_chars = function (){

            };
            this.getTextboxText = function (){
                return this.$el.find('input-box').value
            }
        },

        start: function() {
            var self = this;

            }
        });
    }
