/**
 * Created by Administrator on 2017/11/17 0017.
 */
var page = {
	index: function (req, res) {            //主页
		res.render('index', {user: req._user,title:"主页"});
	},
	login:function (req,res) {
		res.render('login',{user: req._user,title:"登录"})
	},
	main:function (req,res) {
		res.render('main',{user: req._user,title:"主页1"})
	}
};
module.exports=page;