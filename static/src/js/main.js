
openerp.calc = function(instance) {

    instance.calc = {};
    var module = instance.calc;
    openerp_calc_basewidget(instance,module);
    openerp_calc_widgets(instance,module);
    instance.web.client_actions.add('calc.ui', 'instance.calc.CalcWidget');
};


