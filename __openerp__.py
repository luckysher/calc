# -*- coding: utf-8 -*-

{
    'name': 'Calculator',
    'version': '1.0.1',
    'category': 'Calculations',
    'sequence': 6,
    'summary': 'Make calculations easy',
    'description': """Quick and Easy Calculations""",
    'author': 'Lucky',
    'depends': ['base'],
    'data': [
        'main.xml',
        'views/calc.xml'
    ],
    'installable': True,
    'application': True,
    'website': 'https://calc/main.html',
    'qweb': ['static/src/xml/cal.xml'],
    'auto_install': False,
}

# vim:expandtab:smartindent:tabstop=4:softtabstop=4:shiftwidth=4:
