'use strict'

module.exports = function (app) {
    // pc端 后台管理页面

    app.get('/manage/*', function (req, res) {
        var pathName = req.url.split('?')[0];

        if (pathName === '/manage/') {
            pathName = '/manage/statistic'
        }

        res.render('manage', {
            title: '微信公众号后台系统',
            url: '/fe/js' + pathName + '.js',
            pathName: pathName
        });
    });
}

