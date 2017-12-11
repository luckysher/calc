function openerp_calc_widgets(instance, module){
    var QWeb = instance.web.qweb;
	var _t = instance.web._t;
	var num1 = null;
    var num2 = null;
    var op_plus = false;
    var op_min = false;
    var op_ml = false;
    var op_div = false;

    module.CalcWidget = module.CalcBaseWidget.extend({
        template: 'NumpadWidget',
        init: function(parent, options) {
            this._super(parent, options);
            this.calc_widget = this; //So that calc_widget's childs have child_widget set automatically

            this.getTextboxText = function (){
                return this.$el.find('.input-box').val();
            };
            this.setTextboxText = function (text){
                return this.$el.find('.input-box').val(text.trim());
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
            this.solveEquation = function(equation){
                var result;
                var oprts = ['/', '*', '+', '-'];
                //$.each(oprts, function(){

                //});
                console.log("Solving equation..." + equation);
                return result;
            };
        },

        start: function() {
            var self = this;


            $('.numpad button').bind('click', function(){
                var val = $(this).text();
                if (this.id == "back"){
                    self.delete_digit();
                    return;
                }
                if (this.id == "ac"){
                    self.setTextboxText("");
                    return;
                }
                if (this.id == "eq"){
                    var equation = self.getTextboxText();
                    //if (equation.indexOf(""))
                    console.log("var op_min = " + op_min);
                    self.solveEquation("a+b");
                    //self.setTextboxText("");
                    return;
                }
              
                 val = self.getTextboxText() + val;
                 console.log("Text is: " + val);

                 self.setTextboxText(val);
            });
           }
        });
    }
