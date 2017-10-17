/**
 * Created by AnThen on 2017-5-4.
 */
/**
 *  必须是以字母数字和下划线组成，且字母开头
 * @param v
 * @returns {{}}
 */
exports.alphaNumericUnderline=(v)=>{
    var msg='必须是以字母数字和下划线组成，且字母开头',success=false;
    success=/^[a-zA-Z]\w*$/.test(v);
    return {
       success,
       msg
    };
}
/**
 * 必须是字母和数字，且以字母开头
 * @param v
 * @returns {{}}
 */
exports.alphaNumeric=(v)=>{
    var msg='必须是字母和数字，且以字母开头',success=false;
    success=/^[a-zA-Z][a-zA-Z0-9]*$/.test(v);
    return {
        success,
        msg
    };
}
/**
 * Long型 最前面可以为0
 * @param v
 * @returns {{}}
 */
exports.numberLong=(v)=>{
    var msg='必须正整数',success=false;
    success=/^\d+$/.test(v);
    return {
        success,
        msg
    };
}
