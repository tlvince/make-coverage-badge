#!/usr/bin/env node

const { get } = require('https')
const argv = require('yargs').default('output-path', './coverage/badge.svg').default('report-path', './coverage/coverage-summary.json').argv
const { readFile, writeFile } = require('fs')

const getColour = coverage => {
  if (coverage < 80) {
    return 'red'
  }
  if (coverage < 90) {
    return 'yellow'
  }
  return 'brightgreen'
}

const getBadge = report => {
  if (!(report && report.total && report.total.statements)) {
    throw new Error('malformed coverage report')
  }

  const coverage = report.total.statements.pct
  const colour = getColour(coverage)

  return `https://img.shields.io/badge/Coverage-${coverage}${encodeURI('%')}-${colour}.svg`
}

const download = (url, cb) => {
  get(url, res => {
    let file = ''
    res.on('data', chunk => (file += chunk))
    res.on('end', () => cb(null, file))
  }).on('error', err => cb(err))
}

readFile(argv.inputPath, 'utf8', (err, res) => {
  if (err) throw err
  const report = JSON.parse(res)
  const url = getBadge(report)
  download(url, (err, res) => {
    if (err) throw err
    writeFile(argv.outputPath, res, 'utf8', err => {
      if (err) throw err

      console.log('Wrote coverage badge to: ' + argv.outputPath)
    })
  })
})
