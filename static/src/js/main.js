
openerp.calc = function(instance) {

    instance.calc = {};

    var module = instance.calc;

    //openerp_calc_db(instance,module);         // import db.js

    //openerp_calc_models(instance,module);     // import calc_models.js

    openerp_calc_basewidget(instance,module); // import calc_basewidget.js

    //openerp_calc_keyboard(instance,module);   // import  calc_keyboard_widget.js

    //openerp_calc_screens(instance,module);    // import calc_screens.js

    //openerp_calc_devices(instance,module);    // import calc_devices.js

    openerp_calc_widgets(instance,module);    // import calc_widgets.js

    instance.web.client_actions.add('calc.ui', 'instance.calc.CalcWidget');
};


