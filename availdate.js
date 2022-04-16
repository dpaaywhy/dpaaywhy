/*!
 @Name：移动端表单验证插件
 @Author：新生帝
 @Date：2015-11-06
 @Copyright：中山赢友网络科技有限公司
 @官网：http://www.winu.net
 @License：Apache v2 License
        
 */

; !function (win) {
    "use strict";

    var doc = document, query = 'querySelectorAll', clsEles = 'getElementsByClassName', S = function (s) {
        return doc[query](s);
    };

    var config = {
        area: "body",
        call: function (e) {
            alert("验证出错");
        }
    },
    // 默认验证规则
    rules = {
        // 检测是否有输入，可以输入任何字符，不留空即可通过验证；
        "*": /[\w\W]+/,
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
    };

    win.ready = {
        extend: function (config, obj) {
            var newobj = config;
            for (var i in obj) {
                newobj[i] = obj[i];
            }
            return newobj;
        }
    };

    var ac = {};
    var formArr = [
        "input", "select", "textarea"
    ];
    // 拓展默认规则
    ac.rules = function (rule) {
        if (rule != null && typeof rule == "object") {
            rules = ready.extend(rules, rule);
        }
        else {
        }
    }

    ac.core = function (ele) {
        var _rule = ele.getAttribute("data-rule");
        var _nodeName = ele.nodeName.toLocaleLowerCase();
        var _nodeType = (ele.getAttribute("type") != undefined && ele.getAttribute("type") != "") ? ele.getAttribute("type") : "";
        var formname = (ele.getAttribute("name") != undefined && ele.getAttribute("name") != "") ? ele.getAttribute("name") : "";
        var _value = ele.value;
        // 文本域的判断
        if (_nodeName == "input" || _nodeName == "textarea") {
            // 判断是否是文本域
            if (_nodeType == "text" || _nodeType == "textarea") {
                // 判断是否是正则表达式内的
                if (rules[_rule] != undefined && rules[_rule] != null) {
                    if (!rules[_rule].test(_value)) {
                        config.call(ele);
                        ele.focus();
                        return;
                    }
                }
                else {
                    // /^.[0-9]+\-[0-9]+$/
                    if (/^.[0-9]+\-[0-9]+$/.test(_rule)) {
                        if (rules[_rule.substr(0, 1)] != undefined && rules[_rule.substr(0, 1)] != null) {
                            var _temp = _rule.substr(1, _rule.length - 1);
                            var _range = _temp.split("-");
                            if (parseInt(_range[0]) < parseInt(_range[1])) {
                                var _r = rules[_rule.substr(0, 1)].toString().replace("$/", "{" + _range[0] + "," + _range[1] + "}$/").replace("+", "");
                                var _rex = eval(_r);
                                if (!_rex.test(_value)) {
                                    config.call(ele);
                                    ele.focus();
                                    return;
                                }
                            }
                            else {
                                console.warn("取值范围应该前者小于后者！")
                            }
                        }
                        else {
                            var _rex = eval(_rule);
                            if (!_rex.test(_value)) {
                                config.call(ele);
                                ele.focus();
                                return;
                            }
                        }
                    }
                    else {
                        var _rex = eval(_rule);
                        if (!_rex.test(_value)) {
                            config.call(ele);
                            ele.focus();
                            return;
                        }
                    }
                }
            }
            else {

            }
        }
        else if (_nodeName == "select") {
        }
    }

    ac.form = function (options) {
        config = ready.extend(options);
        var area = S(config.area);
        if (area.length > 0) {
            for (var i = 0; i < area.length; i++) {
                var checkElement = [];
                var formEles = area[i].childNodes;
                for (var j = 0; j < formEles.length; j++) {
                    if (formArr.indexOf(formEles[j].nodeName.toLocaleLowerCase()) > -1 && formEles[j].getAttribute("data-rule") != undefined && formEles[j].getAttribute("data-rule") != "") {
                        checkElement.push(formEles[j]);
                    }
                }
                // 验证核心
                for (var n = 0; n < checkElement.length; n++) {
                    ac.core(checkElement[n]);
                }
            }
        }
        else {
            console.error("没有找到该验证区域")
            return;
        }
    }

    win.ac = ac;
}(window);