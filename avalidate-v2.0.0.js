/*
 * avalidate.js 2.0.0 重构版本

 * #################################################
 * 框架特性：
 * 2.0.0 版本完全颠覆了1.x版本，内部架构完全重写。
 * 2.0.0 版本比1.x版本性能提高，代码更加清晰。
 * 2.0.0 版本支持更强大的验证，支持多区域验证，多组合验证
 * 2.0.0 版本新增了验证开始，验证失败，验证成功，验证完成事件。
 * 2.0.0 版本呈现全新的验证思路，小伙伴们再也不用担心验证的问题了。
 * #################################################

 * 框架作者：新生帝
 * 编写时间：2015年12月13日 傍晚
 * 版权所有：中山赢友网络科技有限公司
 * 开发理念：一切从简，只为了更懒！
 * 开发火线：为APICloud表单验证而生，但不仅仅限于此！
 * 企业官网：http://www.winu.net
 */
!function (W, D) {
	"use strict";

	var Ext = function () {
		this.Q = function (cssSelector, parent) {
			parent = parent ? parent : D;
			return parent.querySelectorAll(cssSelector);
		};
		this.extend = function (baseObj, extObj) {
			var inheritObj = baseObj;
			for (var i in extObj) {
				inheritObj[i] = extObj[i];
			}
			return inheritObj;
		};
		this.getNewObj = function (obj) {
			return $$api.strToJson(JSON.stringify(obj));
		};
		this.trim = function (str) {
			return str.replace(/(^\s*)|(\s*$)/g, '');
		};
		this.isNullOrEmpty = function (str) {
			return (str == null || str == undefined || $$com.trim(str) == "") ? true : false;
		};
		this.isNullOrUndefined = function (str) {
			return (str == null || str == undefined) ? true : false;
		};
		this.warn = function (msg) {
			console.warn(msg);
		};
		this.error = function (msg) {
			console.error(msg);
		};
		this.log = function (msg) {
			console.log(msg);
		};
		this.getCommonByTwoArray = function (arr1, arr2) {
			var arr = [];
			for (var s in arr1) {
				for (var x in arr2) {
					if (arr1[s] == arr2[x]) {
						arr.push(arr1[s]);
					}
				}
			}
			return arr;
		};
		this.creatArrayByObjectValue = function (obj) {
			var arr = [];
			for (var item in obj) {
				arr.push(obj[item]);
			}
		};
		// 判断是否是表单元素
		this.isFormElement = function (node) {
			var formEle = ["input", "select", "textarea"];
			return formEle.indexOf(node.nodeName.toLocaleLowerCase()) > -1;
		}
	};
	var cmd = new Ext();

	// 默认配置对象
	var defaultOptions = {
		area: document,
		btn: "",
		tip: function (e, msg) {
			alert(msg);
		},
		before: function (form) { },
		success: function (form, formData) { },
		error: function (form, errorElement, status) { },
		complete: function (form, status) { }
	},
	defaultRules = {
		// 检测是否有输入，可以输入任何字符，不留空即可通过验证；
		"*": /^[\w\W]+$/,
		// 检测是否为6到16位任意字符；
		"*6-16": /^[\w\W]{6,16}$/,
		// 数字类型；
		"n": /^\d+$/,
		// 6到16位数字；
		"n6-16": /^\d{6,16}$/,
		// 字符串类型；
		"s": /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]+$/,
		// 6到16位字符串；
		"s6-16": /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]{6,18}$/,
		// 验证是否为邮政编码；
		"p": /^[0-9]{6}$/,
		// 手机号码格式；
		"m": /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$|17[0-9]{9}$/,
		// email格式；
		"e": /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
		// 验证字符串是否为网址。
		"url": /^(\w+:\/\/)?\w+(\.\w+)+.*$/,
		// 日期格式
		"date": /^(?:(?:1[6-9]|[2-9][0-9])[0-9]{2}([-/.]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:(?:1[6-9]|[2-9][0-9])(?:0[48]|[2468][048]|[13579][26])|(?:16|[2468][048]|[3579][26])00)([-/.]?)0?2\2(?:29))(\s+([01][0-9]:|2[0-3]:)?[0-5][0-9]:[0-5][0-9])?$/,
		//匹配中文字符;
		"zh": /^[\u4e00-\u9fa5]+$/,
		//匹配双字节字符;
		"dword": /^[^\x00-\xff]+$/,
		// 货币类型
		"money": /^(([0-9]|([1-9][0-9]{0,9}))((\.[0-9]{1,2})?))$/,
		//匹配ipv4地址;
		"ipv4": /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/,
		// 匹配ipv6地址;
		"ipv6": /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
		//数值型;
		"num": /^(\d+[\s,]*)+\.?\d*$/,
		//QQ号码;
		"qq": /^[1-9][0-9]{4,}$/,
		// 身份证
		"idcard": /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
		// 时间格式  例如：10:57:10
		"time": /^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/,
		// 固话
		"t": /(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)/,
		// 手机或者固话
		"tm": /((15)\d{9})|((13)\d{9})|((18)\d{9})|(0[1-9]{2,3}\-?[1-9]{6,7})/i,
		// 判断是否是视频文件
		"video": /(.*)\.(rm|rmvb|wmv|avi|mp4|3gp|mkv)$/,
		// 判断是否是flash文件
		"flash": /(.*)\.(swf|fla|flv)$/,
		// 判断是否是mp3文件
		"mp3": /(.*)\.(mp3)$/,
		// 判断是否是文档文件
		"doc": /(.*)\.(doc|xls|docx|xlsx|pdf)$/,
		// 判断是否是图片文件
		"img": /(.*)\.(jpg|gif|ico|jpeg|png)$/,
		// 判断是否是压缩包文件
		"zip": /(.*)\.(rar|zip|7zip|tgz)$/,
		// 判断是否一个md5字符串
		"md5": /^([a-fA-F0-9]{32})$/,
		// 判断是否是ascii码
		"ascii": /^[\x00-\xFF]+$/,
		// 判断是否是十六进制颜色值
		"color": /^#[0-9a-fA-F]{6}$/,
		// 判断是否全部是小写字母
		"ens": /^[a-z]+$/,
		// 判断是否是全部大写字母
		"enb": /^[A-Z]+$/,
		// 判断是否是正常的年龄
		"age": /^[1-99]?\d*$/,
		// 判断是否是中文名称
		"cname": /^[\u0391-\uFFE5]{2,15}$/,
		// 判断是否是英文名称
		"ename": /^[A-Za-z]{1,161}$/,
		// 判断是否是正数
		"pn": /^[+]?\d+(\.\d+)?$/,
		// 判断是否是负数
		"upn": /^-[1-9]\d*\.\d*|-0\.\d*[1-9]\d*$/
	}
	, defaultRuleTips = {
		"*": "不能为空！",
		"*6-16": "请填写$1到$2位任意字符！",
		"n": "请填写数字！",
		"n6-16": "请填写$1到$2位数字！",
		"s": "不能输入特殊字符！",
		"s6-16": "请填写$1到$2位字符！",
		"p": "请填写邮政编码！",
		"m": "请填写手机号码！",
		"e": "邮箱地址格式不对！",
		"url": "请填写网址！",
		"date": "请填写日期！",
		"zh": "请填写中文！",
		"dword": "请填写双字节字符！",
		"money": "请填写货币值！",
		"ipv4": "请填写ip地址！",
		"ipv6": "请填写IPv6地址！",
		"num": "请填写数值！",
		"qq": "请填写QQ号码！",
		"idcard": "请填写身份证号码",
		"time": "请输入时间格式",
		"t": "请输入固话",
		"tm": "请输入手机或固话",
		"video": "请输入视频文件",
		"flash": "请输入flash文件",
		"mp3": "请输入mp3文件",
		"doc": "请输入文档文件",
		"img": "请输入图片格式文件",
		"zip": "请输入压缩包格式文件",
		"md5": "请输入md5码字符串",
		"ascii": "请输入ascii码字符串",
		"color": "请输入十六进制颜色字符串",
		"ens": "请输入纯小写字母",
		"enb": "请输入纯大写字母",
		"age": "请输入正确的年龄",
		"cname": "请输入正确的中文名称",
		"ename": "请输入正确的英文名称",
		"pn": "请输入正确的正数",
		"upn": "请输入正确的负数"
	}
	, defautPropertys = [
		"data-rule",
		"data-nullmsg",
		"data-errmsg",
		"data-sucmsg",
		"data-ignore",
		"data-sync"
	];

	var Core = function (options, rules) {
		var o = options || {};
		var r = rules || {};
		this.config = cmd.extend(defaultOptions, o);
		this.status = "prepare";	// 验证状态，prepare,validating,success,error,complete
		this.validate_way = "text";	// 验证方式，对非表单元素有左右，默认只对元素文本内容验证
		this.rules = cmd.extend(defaultRules, r);

		if (this.config.btn && cmd.Q(this.config.btn).length > 0) {
			this.ready();
		}
	};

	// 获取所有需要验证的对象
	Core.prototype.getValidateObj = function (nodeList) {
		var arr = [];
		for (var i = 0; i < nodeList.length; i++) {
			var attrs = nodeList[i].attributes;
			if (attrs.length > 0) {
				for (var j = 0; j < attrs.length; j++) {
					if (defautPropertys.indexOf(attrs[j].name) > -1) {
						arr.push(nodeList[i]);
						break;
					}
				}
			}
		}
		return arr;
	};

	// 获取验证区域集合
	Core.prototype.getValidateList = function () {
		var that = this;
		var config = that.config;
		// 验证的区域集合
		var validateList = [];

		if (config.area && cmd.Q(config.area).length > 0) {
			var areas = cmd.Q(config.area);

			for (var i = 0; i < areas.length; i++) {
				var childrens = cmd.Q("*", areas[i]);
				var nodes = that.getValidateObj(childrens);
				// 将区域和区域对应的验证元素添加到数组集合中
				validateList.push({
					area: areas[i],
					elements: nodes,
					btn: cmd.Q(config.btn, areas[i])
				});
			}
		}
		return validateList;
	};

	// 验证失败执行函数
	Core.prototype.checkError = function (ele, errmsg, area) {
		var that = this;
		var config = that.config;

		that.status = "error";
		if (typeof config.tip == "function") {
			config.tip(ele, errmsg);
		}
		if (typeof config.error == "function") {
			config.error(area, ele, that.status);
		}
		if (typeof config.complete == "function") {
			config.complete(area, that.status);
		}
		// 设置表单元素获取焦点
		if (cmd.isFormElement(ele)) {
			ele.focus();
		}
	};

	// 开始正则配对
	Core.prototype.ruleCheck = function (ele, val, area) {
		var that = this;
		var config = that.config;

		var data_rule = ele.getAttribute(defautPropertys[0]);
		var data_nullmsg = ele.getAttribute(defautPropertys[1]);
		var data_errmsg = ele.getAttribute(defautPropertys[2]);
		var data_sucmsg = ele.getAttribute(defautPropertys[3]);
		var data_ignore = ele.getAttribute(defautPropertys[4]);
		var data_sync = ele.getAttribute(defautPropertys[5]);

		if (data_rule) {
			// 第一种情况，如果找到对应的占位符
			if (that.rules[data_rule.toString()]) {
				if (!that.rules[data_rule.toString()].test(val)) {

					that.checkError(ele, data_errmsg ? data_errmsg : defaultRuleTips[data_rule.toString()], area);
					return;
				}
				else {
					that.status = "success";
				}
			}
				// 第二种情况，是否配置范围占位符
			else if (/(.+)([0-9]+)-([0-9]+)/.test(data_rule)) {
				var matches = data_rule.match(/(.+)([0-9]+)-([0-9]+)/);
				// 判断第一个是否是内置标识符
				if (that.rules[matches[1].toString()]) {
					// /^[\w\W]+$/
					var _reg = that.rules[matches[1].toString()].toString();
					var regMatches = _reg.match(/\/\^(.+)\+\$\//);

					var reg = eval("/^" + regMatches[1] + "{" + matches[2] + "," + matches[3] + "}" + "$/");
					// 验证正则表达式
					if (!reg.test(val)) {
						that.checkError(ele, data_errmsg ? data_errmsg : defaultRuleTips[data_rule.toString()].replace("$1", matches[2]).replace("$2", matches[3]), area);
						return;
					}
					else {
						that.status = "success";
					}
				}
				else {
					var reg = eval(data_rule);
					// 验证正则表达式
					if (!reg.test(val)) {
						that.checkError(ele, data_errmsg ? data_errmsg : defaultRuleTips[data_rule.toString()], area);
						return;
					}
					else {
						that.status = "success";
					}
				}
			}
				// 第三种情况，非常强大的组合验证，格式()and() ()or()
			else if (/((.+))[and|or]((.+))/g.test(data_rule)) {
				// 分割成数组
				var splitArr = data_rule.split(/and|or/);
				//alert(splitArr);
			}
				// 第四种情况，直接当正则表达式匹配
			else {
				var reg = eval(data_rule);
				// 验证正则表达式
				if (!reg.test(val)) {
					that.checkError(ele, data_errmsg ? data_errmsg : defaultRuleTips[data_rule.toString()], area);
					return;
				}
				else {
					that.status = "success";
				}
			}
		}
	};

	// 开始验证
	Core.prototype.begin = function (elements, area) {
		var that = this;
		var config = that.config;

		for (var i = 0; i < elements.length; i++) {
			if (that.status != "error") {
				var node = elements[i];
				var val = "";
				if (cmd.isFormElement(node)) {
					val = node.value;
				}
				else {
					val = that.validate_way == "text" ? cmd.trim(node.innerText) : cmd.trim(node.innerHTML);
				}

				this.ruleCheck(elements[i], cmd.trim(val), area);
			}
		}
	};

	// 开始处理
	Core.prototype.handle = function (obj) {
		var that = this;
		var config = that.config;

		if (obj.btn) {
			// 绑定事件
			(obj.btn)[0].addEventListener("click", function () {
				that.status = "prepare";
				if (typeof config.before == "function") {
					// 执行开始验证
					config.before(obj.area);

					that.begin(obj.elements, obj.area);
				}

				// 成功验证
				if (that.status == "success") {
					if (typeof config.success == "function") {
						// 验证成功
						config.success(obj.area, {});
					}
				}

				// 完成验证
				if (typeof config.complete == "function") {
					// 验证成功
					config.complete(obj.area, that.status);
				}
			}, false);
		}
		else {
			// 如果按钮为空，可以主动触发验证
		}
	};

	// 开始验证
	Core.prototype.ready = function () {
		var that = this;
		var config = that.config;

		var list = that.getValidateList();

		for (var i = 0; i < list.length; i++) {
			var obj = list[i];
			that.handle(obj);
		}
	};

	var V = {};
	V.init = function (options, rules) {
		return new Core(options, rules);
	};
	V.version = "2.0.0";

	W.V = V;
}(window, document);