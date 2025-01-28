// let core = require('@actions/core')
import * as core from '@actions/core'
import * as process from 'node:process'
import * as fs from 'node:fs'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    let targetFile: string
    const templateType = core.getInput('template')
    if (
      !templateType.endsWith('toml.template') ||
      !templateType.endsWith('json.template')
    ) {
      core.setFailed('Invalid template type')
      return
    }
    if (templateType.endsWith('toml.template')) {
      targetFile = __dirname + '/' + 'wrangler.toml'
    } else if (templateType.endsWith('json.template')) {
      targetFile = __dirname + '/' + 'wrangler.json'
    }
    const envVars: Record<string, string> = {}
    for (const key in process.env) {
      if (key.startsWith('__VARIABLE__') || key.startsWith('__SECRET__')) {
        envVars[key] = process.env[key] || ''
      }
    }
    core.notice('targets searched')
    // read template file
    const template: string = fs.readFileSync(__dirname + '/' + templateType, 'utf-8')

    for (const key in template.match(/__VARIABLE__/g)) {

    }

    // Log the current timestamp, wait, then log the new timestamp
    core.debug(new Date().toTimeString())

    // Set outputs for other workflow steps to use
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
