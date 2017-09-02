function openerp_calc_basewidget(instance, module){ //module is instance.calc


    module.CalcBaseWidget = instance.web.Widget.extend({
        init:function(parent,options){
            this._super(parent);
            options = options || {};
            this.calc = options.calc || (parent ? parent.calc : undefined);
            this.calc_widget = options.calc_widget || (parent ? parent.calc_widget : undefined);
        }
    });
}
