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

            this.strToNum = function(num){
                var ret = null;
                if (num.toString().indexOf('.') >= 0){
                    ret = parseFloat(num);
                }else{
                    ret = parseInt(num);
                }
                return ret;
            };

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
            this.solveEquation = function(num1, opt, num2){
                var result = null;
                if (opt == '/'){
                    result = num1 / num2;
                }
                if (opt == '*'){
                    result = num1 * num2;
                }
                if (opt == '+'){
                    result = num1 + num2;
                }
                if (opt == '-'){
                    result = num1 - num2;
                }
                return result;
            };
        },

        start: function() {
            var self = this;
            var oprt = ['-', '+', '*', '/'];
            $('.numpad button').bind('click', function(){
                var lastChar = $(this).text();
                if (this.id == "back"){
                    self.delete_digit();
                    return;
                }
                if (this.id == "ac"){
                    self.setTextboxText("");
                    num1 = null;
                    num2 = null;
                    hasOpt = false;
                    oprt = null;
                    result = null;
                    return;
                }
                if (this.id == "eq"){
                    var equation = self.getTextboxText();
                    num2 = equation.substr(num1.toString().length+1, equation.length);
                    if (num1 != null && num2 != null && num2.length > 0){
                        num1 = self.strToNum(num1);
                        num2 = self.strToNum(num2);
                        result = self.solveEquation(num1, opt, num2);
                        hasOpt = false;
                        opt = null;
                        num1 = self.strToNum(result);
                        num2 = null;
                        self.setTextboxText(result.toString());
                       }
                    return;
                }

               if (oprts.indexOf(lastChar) >= 0) {
                    if (hasOpt == false){
                          num1 = self.getTextboxText();
                          hasOpt = true;
                          opt = lastChar;
                          self.setTextboxText(num1 + opt);
                          return;
                       }

                    var equation = self.getTextboxText();
                    num2 = equation.substr(num1.toString().length+1, equation.length);
                    if (num1 != null && num2 != null && num2.length > 0){
                        num1 = self.strToNum(num1);
                        num2 = self.strToNum(num2);
                        result = self.solveEquation(num1, opt, num2);
                        self.setTextboxText(result + '' + lastChar);
                        hasOpt = true;
                        opt = lastChar;
                        num1 = self.strToNum(result);
                        num2 = null;
                        return;
                        }
                }

                 if (oprts.indexOf(lastChar) >= 0 && hasOpt ==  true){
                        self.setTextboxText(self.getTextboxText().substr(0, self.getTextboxText().length-1)+lastChar);
                        oprt = lastChar;
                      return;
                 }
                 var val = self.getTextboxText() + lastChar;
                 self.setTextboxText(val);
            });
           }
        });
    }
