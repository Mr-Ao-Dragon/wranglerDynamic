import * as fs from 'node:fs'

const templateType = 'wrangler.toml.template';
let template: string = fs.readFileSync(__dirname + '/' + templateType, 'utf-8')

const regexVARIABLE =/\${{__VARIABLE__([A-Za-z0-9_]+)}}/g;
const regexSECRET =/\${{__SECRET__([A-Za-z0-9_]+)}}/g;

let matches;
const variables: string[] = [];
// 查找所有匹配的变量
while ((matches = regexVARIABLE.exec(template)) !== null){
    // 删除花括号
    matches = matches[0].replace(/^\${{(.*)}}$/, '$1') 
    // matches[1] 是匹配到的变量部分
    variables.push(matches);
  }
while ((matches = regexSECRET.exec(template)) !== null){
    // 删除花括号
    matches = matches[0].replace(/^\${{(.*)}}$/, '$1') 
    // matches[1] 是匹配到的变量部分
    variables.push(matches);
  }


  
/**
 * 执行搜索
 * 搜索出环境变量里有且模板里能寻找到对应值的
 * @returns {string[]} 被调用后返回相同地对应值
 */
export function search(variableWord: string[], lieuWord: string[]): string[]{
    // 创建数据存储列表，存储相同的关键字
    const sameList: string[] = []
    for (const variableKey in variableWord){
        for (const lieuKey in lieuWord){
            // 判断是否相同 如果有就写进存储列表
            if (variableWord[variableKey] == lieuWord[lieuKey]){
                sameList.push(variableWord[variableKey])
            }
        }
    }
    return sameList
  }



/**
 * 执行替换并输出替换文本
 * @returns {undefined} 被调用后返回
 */
export function replaceText(replaceWord: { [type: string]: string },targetContext: string[]): string{
    for (const key in targetContext){
        // 替换模版内关键字为需求字段
        template = template.replace('${{'+targetContext[key]+'}}',replaceWord[targetContext[key]])
        console.log(replaceWord)
    }
    return template
}



/**
 * 调用directReplacement需要传入两个参数
 * 第一个为替换的模版
 * 第二个为替换的模版内关键字对应的需求字段
 * @returns {void} 被调用后返回
 */
export function directReplacement(templateFile: string, replacements: { [key: string]: string }): void{
    // 读取模板文件内容
    let templateContent = fs.readFileSync(templateFile, 'utf8');

    // 遍历替换对象，进行字符串替换
    for (const [key, value] of Object.entries(replacements)) {
        const regex = new RegExp(key, 'g');
        templateContent = templateContent.replace(regex, value);
    }

    // 将处理后的内容写回文件
    fs.writeFileSync(templateFile, templateContent, 'utf8');
}
