import * as fs from 'node:fs'
import * as yaml from 'js-yaml';

const templateType = 'ci.yml';
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
 * @returns {string[]} 被调用后返回相同的对应值
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
export function replaceText(replaceWord: { [type: string]: string },lieuWord: string[]): string{
    for (const key in lieuWord){
        // 替换模版内关键字为需求字段
        template = template.replace('${{'+lieuWord[key]+'}}',replaceWord[lieuWord[key]])
        console.log(replaceWord)
    }
    return template
}



/**
 * 将转换好的YML配置文件转为TOML
 * @returns {undefined} 被调用后返回
 */
export function conversionTOML(templateFile: string): undefined{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parsedData = yaml.load(templateFile) as any;

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const toml = require('@iarna/toml');
    let tomlString: string = toml.stringify(parsedData);
    tomlString = tomlString.replace(/_/g, '');
    // 使用 fs.writeFileSync 同步写入文件
    fs.writeFileSync(__dirname + '/' + 'ci.toml', tomlString, 'utf8');
}

// 模拟定义环境变量
// const templateData: string[] = ['__VARIABLE__CMD','SECRET__PASSWORLD']
// // 模拟定义关键字字段
// const replaceData: { [type: string]: string } = {'__VARIABLE__CMD':'./run.sh','SECRET__PASSWORLD':'114514'}

// // 搜索相同
// const valueList: string[] = search(variables,templateData)

// // 替换文本
// const conversionText: string = replaceText(replaceData,valueList)

// // 转换为TOML
// conversionTOML(conversionText)
