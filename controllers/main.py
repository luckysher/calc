# class for calc controller

import logging
import simplejson
from openerp.http import Controller, route
from openerp.http import request
from openerp.addons.web.controllers.main import module_boot, login_redirect

logger = logging.getLogger(__name__)

class CalcController(Controller):
    @route('/calc/main', type='http', auth='user')
    def a(self, **kwargs):
        cr, session, context, uid = request.cr, request.session, request.context, request.uid
        modules = simplejson.dumps(module_boot(request.db))
        init = """
                var wc = new s.web.WebClient();
                wc._title_changed = function(){}
                wc.show_application = function(){
                    wc.action_manager.do_action("calc.ui");
                };
                wc.setElement($(document.body));
                wc.start();
               """

        html = request.registry.get('ir.ui.view').render(cr, session.uid, 'calc.home', {
            'modules': modules,
            'init': init,
        })
        return html
