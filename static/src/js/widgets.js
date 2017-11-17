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
            this.setTextboxText = function (text){
                return this.$el.find('input-box').value = text;
            }
            this.delete_digit = function (){
                var num = this.getTextboxText();
                var edited_num = num.substr(0, num.length-1);
               this.setTextboxText(edited_num);
            }
        },

        start: function() {
            var self = this;

            }
        });
    }
