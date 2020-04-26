#!/usr/bin/env node

const assert = require('assert')
const { exec } = require('child_process')
const { promisify } = require('util')
const { mkdir, rmdir, unlink, readFile, writeFile } = require('fs').promises

const execP = promisify(exec)

const setup = async () => {
  await mkdir('./coverage')
  const report = {
    total: {
      statements: {
        pct: 90,
      },
    },
  }
  const json = JSON.stringify(report)
  await writeFile('./coverage/coverage-summary.json', json)
}

const teardown = async () => {
  await unlink('./coverage/coverage-summary.json')
  await unlink('./coverage/badge.svg')
  await rmdir('./coverage')
}

const test = async () => {
  await execP('./cli.js')
  const buffer = await readFile('./coverage/badge.svg')
  const badge = buffer.toString()
  assert.ok(badge.includes('90%'))
}

setup()
  .then(test)
  .then(teardown)
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
