/*!
 @Name：availdate.js
 @Author：新生帝
 @Date：2015-11-06
 @Copyright：中山赢友网络科技有限公司
 @官网：http://www.winu.net
 @License：Apache v2 License
 @Describe：为APICloud表单验证而生，但不仅仅限于此！      
 */

; !function (win) {
    "use strict";

    var doc = document, query = 'querySelectorAll', clsEle = 'getElementsByClassName', S = function (s) {
        return doc[query](s);
    };

    var initObj = {
        tag: [
            "input",
            "select",
            "textarea"
        ],
        noInputTextFormType: [
            "radio",
            "checkbox"
        ],
        otherInputFormType: [
            "button",
            "image",
            "submit",
            "reset"
        ],
        tagAttr: [
          "data-rule",
          "data-nullmsg",
          "data-errmsg",
          "data-sucmsg",
           "data-sync",
           "data-haved"
        ],
        rules: {
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
            // 6到18位字符串；
            "s6-18": /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]{6,18}$/,
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
            "qq": /^[1-9][0-9]{4,}$/
        },
        tip: {
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
        }
    };

    win.base = {
        extend: function (config, obj) {
            var newobj = config;
            for (var i in obj) {
                newobj[i] = obj[i];
            }
            return newobj;
        },
        isFormEle: function (nodeName) {
            return initObj.tag.indexOf(nodeName) > -1;
        },
        getAttribute: function (node, attr) {
            return node.getAttribute(attr) == null ? false : node.getAttribute(attr)
        },
        // 判断是否是可以输入的表单元素
        isInputForm: function (node) {
            var nodeType = "text";
            if (base.getAttribute(node, "type")) {
                nodeType = base.getAttribute(node, "type");
            }
            return initObj.noInputTextFormType.indexOf(nodeType) == -1 && initObj.otherInputFormType.indexOf(nodeType) == -1;
        },
        isRadioOrCheckBox: function (node) {
            var nodeType = "text";
            if (base.getAttribute(node, "type")) {
                nodeType = base.getAttribute(node, "type");
            }
            return initObj.noInputTextFormType.indexOf(nodeType) > -1;
        },
        isSelectList: function (node) {
            return node.nodeName.toLocaleLowerCase() == "select";
        },
        isRadio: function (node) {
            var nodeType = "text";
            if (base.getAttribute(node, "type")) {
                nodeType = base.getAttribute(node, "type");
            }
            return nodeType.toLocaleLowerCase() == "radio";
        },
        isCheckbox: function (node) {
            var nodeType = "text";
            if (base.getAttribute(node, "type")) {
                nodeType = base.getAttribute(node, "type");
            }
            return nodeType.toLocaleLowerCase() == "checkbox";
        },
        trim: function (str) {
            return str.replace(/^\s+|\s+$/g, "")
        }
    };

    // 默认配置
    var config = {
        area: "body",
        btn: "",
        startCheck: function () {
        },
        singleSuccess: function (e, msg) {
        },
        singleError: function (e, msg) {
            alert(msg);
        },
        endSuccess: function () { }
    };

    var Winu = function (options) {
        var that = this;

        that.config = base.extend(config, options);
        that.isSuccess = true;
        that.ready();
    };

    // 判断是否具有预定义的认证规则
    Winu.prototype.isHasRule = function (node) {
        var attrs = node.attributes;
        var flag = false;

        for (var i = 0; i < attrs.length; i++) {
            if (initObj.tagAttr.indexOf(attrs[i].name) > -1) {
                return flag = true;
            }
            else {
                continue;
            }
        }
        return flag;
    }

    // 获取验证区域下的所有需要验证表单元素
    Winu.prototype.getFormNodes = function () {
        var that = this, areaFormEles = [];

        var _area = S(that.config.area);
        if (_area.length == 0) {
            console.error("验证区域必须是页面上的元素，可以是标签名，class或者id选择器！");
            return;
        }
        if (_area.length > 1) {
            console.warn("页面具有相同的验证区域，默认只对第一个验证区域有用！");
        }

        for (var i = 0; i < _area[0].childNodes.length; i++) {
            if (base.isFormEle(_area[0].childNodes[i].nodeName.toLocaleLowerCase())) {
                if (that.isHasRule(_area[0].childNodes[i])) {
                    areaFormEles.push(_area[0].childNodes[i]);
                }
            }
        }
        return areaFormEles;
    };

    // 具有可输入的验证
    Winu.prototype.inputArea = function (node) {
        var that = this;

        var _rule = base.getAttribute(node, initObj.tagAttr[0]);
        var _nullmsg = base.getAttribute(node, initObj.tagAttr[1]);
        var _errmsg = base.getAttribute(node, initObj.tagAttr[2]);
        var _sucmsgg = base.getAttribute(node, initObj.tagAttr[3]);
        var _sync = base.getAttribute(node, initObj.tagAttr[4]);
        var _haved = base.getAttribute(node, initObj.tagAttr[5]);

        var _value = node.value;
        var _name = base.getAttribute(node, "name");

        // 判断是否有同步属性
        if (_sync && _sync != "") {
            var _syncNode = S(node.nodeName.toLocaleLowerCase() + "[name='" + _sync + "']");
            if (_syncNode.length > 0) {
                _rule = base.getAttribute(_syncNode[0], initObj.tagAttr[0]);

                _nullmsg = _nullmsg == false ? base.getAttribute(_syncNode[0], initObj.tagAttr[1]) : _nullmsg;
                _errmsg = _errmsg == false ? base.getAttribute(_syncNode[0], initObj.tagAttr[2]) : _errmsg;
                _sucmsgg = _sucmsgg == false ? base.getAttribute(_syncNode[0], initObj.tagAttr[3]) : _sucmsgg;
                _sync = _sync == false ? base.getAttribute(_syncNode[0], initObj.tagAttr[4]) : _sync;
                _haved = _haved == false ? base.getAttribute(_syncNode[0], initObj.tagAttr[5]) : _haved;

                var _syncValue = _syncNode[0].value;

                // 判断两次值是否一样
                if (_syncValue != _value) {
                    that.config.singleError(node, _errmsg == false ? "两次输入值不一样" : _errmsg);
                    node.focus();
                    that.isSuccess = that.isSuccess && false;
                    return;
                }
                else {
                    that.config.singleSuccess(node, _sucmsgg == false ? "验证成功" : _sucmsgg);
                    that.isSuccess = that.isSuccess || true;
                }
            }
        }


        if (_rule) {
            // 1、判断是否是预定义正则表达式
            if (initObj.rules[_rule]) {
                if (base.trim(_value) == "") {
                    // 判断是否有 data-haved属性
                    if (_haved == false) {
                        that.config.singleError(node, _nullmsg == false ? initObj.tip[_rule] : _nullmsg);
                        node.focus();
                        that.isSuccess = that.isSuccess && false;
                        return;
                    }
                    else {
                        that.config.singleSuccess(node, _sucmsgg == false ? "验证成功" : _sucmsgg);
                        that.isSuccess = that.isSuccess || true;
                    }
                } else {
                    if (!initObj.rules[_rule].test(_value)) {
                        that.config.singleError(node, _errmsg == false ? "验证失败" : _errmsg);
                        node.focus();
                        that.isSuccess = that.isSuccess && false;
                        return;
                    }
                    else {
                        that.config.singleSuccess(node, _sucmsgg == false ? "验证成功" : _sucmsgg);
                        that.isSuccess = that.isSuccess || true;
                    }
                }
            }
            else {
                if (base.trim(_value) == "") {
                    // 判断是否有 data-haved属性
                    if (_haved == false) {
                        that.config.singleError(node, _nullmsg == false ? initObj.tip[_rule] : _nullmsg);
                        node.focus();
                        that.isSuccess = that.isSuccess && false;
                        return;
                    }
                    else {
                        that.config.singleSuccess(node, _sucmsgg == false ? "验证成功" : _sucmsgg);
                        that.isSuccess = that.isSuccess || true;
                    }
                } else {
                    // 2、判断是否和预定义匹配符匹配
                    if (/^.[0-9]+\-[0-9]+$/.test(_rule)) {
                        var _f = _rule.substr(0, 1);
                        var _temp = _rule.substr(1, _rule.length - 1);
                        var _range = _temp.split("-");
                        if (parseInt(_range[0]) < parseInt(_range[1])) {

                            if (initObj.rules[_f]) {
                                var _r = initObj.rules[_f].toString().replace("$/", "{" + _range[0] + "," + _range[1] + "}$/").replace("+", "");
                                var _rex = eval(_r);
                                if (!_rex.test(_value)) {
                                    that.config.singleError(node, _errmsg == false ? (initObj.tip[_f + "6-16"].replace("$1", _range[0]).replace("$2", _range[1])) : _errmsg);
                                    node.focus();
                                    that.isSuccess = that.isSuccess && false;
                                    return;
                                }
                                else {
                                    that.config.singleSuccess(node, _sucmsgg == false ? "验证成功" : _sucmsgg);
                                    that.isSuccess = that.isSuccess || true;
                                }
                            }
                            else {
                                console.warn("没有以" + _f + "开头的标识符！已跳过验证！");
                                that.isSuccess = that.isSuccess || true;
                            }
                        }
                        else {
                            console.warn("规则标识符数字范围前者应小于后者");
                            that.isSuccess = that.isSuccess && true;
                        }
                    }
                    else {
                        var _rex = eval(_rule);
                        if (!_rex.test(_value)) {
                            that.config.singleError(node, _errmsg == false ? "验证失败" : _errmsg);
                            node.focus();
                            that.isSuccess = that.isSuccess && false;
                            return;
                        }
                        else {
                            that.config.singleSuccess(node, _sucmsgg == false ? "验证成功" : _sucmsgg);
                            that.isSuccess = that.isSuccess || true;
                        }
                    }
                }
            }
        }
    };

    // 单选按钮，复选按钮的验证
    Winu.prototype.radioOrCheckbox = function (node) {
        var that = this;

        var _rule = base.getAttribute(node, initObj.tagAttr[0]);
        var _nullmsg = base.getAttribute(node, initObj.tagAttr[1]);
        var _errmsg = base.getAttribute(node, initObj.tagAttr[2]);
        var _sucmsgg = base.getAttribute(node, initObj.tagAttr[3]);

        var _value = node.value;
        var _name = base.getAttribute(node, "name");
        var _type = base.getAttribute(node, "type");

        if (_rule && _rule == "*") {
            if (_name) {
                var tag = false;
                var radios = S("input[name='" + _name + "'][type='" + _type + "']");
                for (var radio in radios) {
                    if (radios[radio].checked) {
                        tag = true;
                        break;
                    }
                }
                if (tag) {
                    that.config.singleSuccess(node, _sucmsgg == false ? "验证成功" : _sucmsgg);
                    that.isSuccess = that.isSuccess || true;
                }
                else {
                    that.config.singleError(node, _nullmsg == false ? "必须选择！" : _nullmsg);
                    node.focus();
                    that.isSuccess = that.isSuccess && false;
                    return;
                }
            }
            else {
                console.warn("radio的name属性不能为空！");
                that.isSuccess = that.isSuccess && true;
            }
        }
        else {
            console.warn("规则标识符不正确，应使用 * 符号");
            that.isSuccess = that.isSuccess && true;
        }
    };

    // 下拉框的验证
    Winu.prototype.select = function (node) {
        var that = this;
        var _rule = base.getAttribute(node, initObj.tagAttr[0]);
        var _nullmsg = base.getAttribute(node, initObj.tagAttr[1]);
        var _sucmsgg = base.getAttribute(node, initObj.tagAttr[3]);

        if (_rule && _rule == "*") {
            if (node.value == "") {
                that.config.singleError(node, _nullmsg == false ? "必须选择！" : _nullmsg);
                node.focus();
                that.isSuccess = that.isSuccess && false;
                return;
            }
            else {
                that.config.singleSuccess(node, _sucmsgg == false ? "验证成功" : _sucmsgg);
                that.isSuccess = that.isSuccess || true;
            }
        }
        else {
            console.warn("规则标识符不正确，应使用 * 符号");
            that.isSuccess = that.isSuccess && true;
        }
    };
    // 拓展规则
    Winu.prototype.extRule = function (rule) {
        var that = this;
        initObj.rules = base.extend(initObj.rules, rule);
    }

    // 验证核心方法
    Winu.prototype.core = function (node) {
        var that = this;
        if (base.isInputForm(node) && !base.isRadioOrCheckBox(node) && !base.isSelectList(node)) {
            that.inputArea(node);
        }
        else if (base.isRadioOrCheckBox(node)) {
            that.radioOrCheckbox(node);
        }
        else if (base.isSelectList(node)) {
            that.select(node);
        }
    };

    Winu.prototype.ready = function () {
        var that = this;

        var _btn = S(that.config.btn);
        if (_btn.length == 0) {
            console.error("没有找到触发验证的按钮！");
            return;
        }
        else {
            _btn[0].addEventListener("click", function (e) {
                that.isSuccess = true;
                that.config.startCheck();
                var areaFormEles = that.getFormNodes();
                for (var i = 0; i < areaFormEles.length; i++) {
                    if (that.isSuccess) {
                        that.core(areaFormEles[i]);
                    }
                    else {
                        break;
                    }
                }
                if (that.isSuccess) {
                    that.config.endSuccess();
                }
            });
        }
    }

    var ac = {};
    ac.form = function (options) {
        var o = new Winu(options || {});
        return o;
    }
    ac.addRule = function (rule) {
        Winu.prototype.extRule(rule);
    }

    win.ac = ac;
}(window);