#!/usr/bin/env node

const { get } = require('https')
const { readFile, writeFile } = require('fs')
const { basename } = require('path')
const mri = require('mri')

const getColour = (coverage) => {
  if (coverage < 80) {
    return 'red'
  }
  if (coverage < 90) {
    return 'yellow'
  }
  return 'brightgreen'
}

const getBadge = (report, logo) => {
  if (!(report && report.total && report.total.statements)) {
    throw new Error('malformed coverage report')
  }

  const coverage = report.total.statements.pct
  const colour = getColour(coverage)

  let badgeUrl = `https://img.shields.io/badge/Coverage-${coverage}${encodeURI(
    '%'
  )}-${colour}.svg`

  if (logo) {
    badgeUrl += `?logo=${logo}`
  }

  return badgeUrl
}

const download = (url, cb) => {
  get(url, (res) => {
    let file = ''
    res.on('data', (chunk) => (file += chunk))
    res.on('end', () => cb(null, file))
  }).on('error', (err) => cb(err))
}

const options = {
  alias: {
    h: 'help',
    outputPath: 'output-path',
  },
  boolean: 'help',
  logo: 'string',
  default: {
    'output-path': './coverage/badge.svg',
    'report-path': './coverage/coverage-summary.json',
  },
}

const [, filename, ...args] = process.argv
const { _, help, ...params } = mri(args, options) // eslint-disable-line no-unused-vars

if (help) {
  console.log(
    `usage: ${basename(
      filename
    )} [-h,--help] [--report-path] [--output-path] [--logo]`
  )
  process.exit()
}

const { outputPath, 'report-path': reportPath, logo } = params

readFile(reportPath, 'utf8', (err, res) => {
  if (err) throw err
  const report = JSON.parse(res)
  const url = getBadge(report, logo)
  download(url, (err, res) => {
    if (err) throw err
    writeFile(outputPath, res, 'utf8', (err) => {
      if (err) throw err
      console.log('Wrote coverage badge to: ' + outputPath)
    })
  })
})
