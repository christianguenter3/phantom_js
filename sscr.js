var page = require('webpage').create();
var system = require('system');    
var args = system.args;
var user = args[1]
var password = args[2]

page.open('https://' + user + ':' + password + '@websmp230.sap-ag.de/sap/bc/bsp/spn/sscr/reg_object.htm', function(status) {
    var pgmid = args[3];
    var type = args[4];
    var name = args[5];
    var system = args[6];

	console.log(pgmid + type + name);
	console.log(system);

    page.evaluate(function(pgmid, type, name) {
        document.getElementById('ff_pgmid_type_objname').value = pgmid + ' ' + type + ' ' + name
    }, pgmid, type, name);

    var key = page.evaluate(function() {
        return document.getElementById('ff_pgmid_type_objname').value
    });

    console.log(key);

    page.evaluate(function() {
        document.getElementById('check').click();
    });

    setTimeout(function() {
        var object = page.evaluate(function() {
            return document.querySelector('#ff_obj_name').value
        });

        console.log(object)

        page.evaluate(function(system) {
            return document.getElementById('tbl_installations$filter_1').value = system
        },system);


        page.evaluate(function() {
            document.getElementById('tbl_installations-filterEvt').click();
        });

        setTimeout(function() {
            page.evaluate(function() {            	
                document.querySelector('#tbl_installations > tbody > tr > td > table > tbody > tr:nth-child(3) > td.urSTTD.urSTTDBdr1 > button').click();
            });

            setTimeout(function() {
                page.evaluate(function() {
                    document.getElementById('register').click();
                });

                setTimeout(function() {
                    text = page.evaluate(function() {
                        return document.querySelector('#messageBar-txt').innerText;
                    });

                    var re = /([0-9]{20})/;
                    sscr_key = re.exec(text)[0];

                    console.log(sscr_key);
                	var fs = require('fs');
                	fs.write('Y:\\150_phantom_js\\test.txt',sscr_key,'w');

                    phantom.exit();
                }, 1500);
            }, 1500);
        }, 1500);
    }, 1500);
});