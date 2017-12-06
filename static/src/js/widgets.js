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
                return this.$el.find('.input-box').val();
            };
            this.setTextboxText = function (text){
                return this.$el.find('.input-box').val(text);
            };
            this.delete_digit = function (){
                var num = this.getTextboxText();
                if (num.length > 0){
                    var edited_num = num.substr(0, num.length-1);
                    this.setTextboxText(edited_num);
                    }
            };
            this.show_propagation = function (bObj){
                bObj.className -= "";
            };
        },

        start: function() {
            var self = this;
            $('.numpad button').bind('click', function(){
                var val = $(this).text();
                console.log("numpad button --", val);
                if (this.id == "back"){
                    self.delete_digit();
                }
                else {
                      if (self.getTextboxText() != 'undefined'){
                        val = self.getTextboxText() + val;
                      }

                      console.log("Text is: " + val);
                      self.setTextboxText(val);
                }


            });
           }
        });
    }
