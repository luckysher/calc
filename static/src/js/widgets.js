function openerp_calc_widgets(instance, module){
    var QWeb = instance.web.qweb;
	var _t = instance.web._t;
	var num1 = null;
    var num2 = null;
    var hasOpt = false;
    var opt = null;
    var oprts = ['/', '*', '+', '-'];

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
                //$.each(oprts, function(){
                //});
                console.log("Solving equation..." + equation);
                return result;
            };
        },

        start: function() {
            var self = this;
            var oprt = ['-', '+', '*', '/'];
            $('.numpad button').bind('click', function(){
                var val = $(this).text();
                var lastChar = null;
                var lastChar = $(this).text();

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
                    console.log("var op_min = " + oprt);
                    self.solveEquation("a+b");
                    return;
                }

               if (oprts.indexOf(lastChar) >= 0) {
                    if (hasOpt == false){
                          num1 = self.getTextboxText();
                          hasOpt = true;
                          opt = lastChar;
                          self.setTextboxText(num1 + opt);
                          console.log("num1 : " + num1);
                          return;
                       }

                    var equation = self.getTextboxText();
                    num2 = equation.substr(num1.length+1, equation.length);
                    console.log("num2 set : " + num2);

                   num1 = parseInt(num1);
                    num2 = parseInt(num2);
                    result =
                    self.setTextboxText(result + '' + lastChar);
                    hasOpt = true;
                    opt = lastChar;
                    console.log(" setting total: : " +  result);
                    return;
                }

                 val = self.getTextboxText() + val;
                 console.log("Text is: " + val);
                 self.setTextboxText(val);
            });
           }
        });
    }
