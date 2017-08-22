# -*- coding: utf-8 -*-

{
    'name': 'Calculator',
    'version': '1.0.1',
    'category': 'Calculations',
    'sequence': 6,
    'summary': 'Touchscreen Interface for calculations',
    'description': """Quick and Easy Calculations""",
    'author': 'Lucky',
    'depends': ['base'],
    'data': [
        'views/templates.xml',
        'views/ca_lc.xml',
    ],
    'installable': True,
    'application': True,
    'website': 'https://calc/main.html',
    'qweb': ['static/src/calc.xml'],
    'auto_install': False,
}

# vim:expandtab:smartindent:tabstop=4:softtabstop=4:shiftwidth=4:
