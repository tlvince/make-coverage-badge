#!/usr/bin/env node

const { get } = require('https')
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

  return `https://badgen.net/badge/coverage/${coverage}${encodeURI('%')}/${colour}`;
  // return `https://img.shields.io/badge/Coverage-${coverage}${encodeURI('%')}-${colour}.svg`
}

const download = (url, cb) => {
  get(url, res => {
    let file = ''
    res.on('data', chunk => (file += chunk))
    res.on('end', () => cb(null, file))
  }).on('error', err => cb(err))
}

const [, , thirdArg, fourthArg] = process.argv
const outputPath = ((thirdArg === '--output-path' || thirdArg === '--outputPath') && fourthArg) ? fourthArg : './coverage/badge.svg'

readFile('./coverage/coverage-summary.json', 'utf8', (err, res) => {
  if (err) throw err
  const report = JSON.parse(res)
  const url = getBadge(report)
  download(url, (err, res) => {
    if (err) throw err
    writeFile(outputPath, res, 'utf8', err => {
      if (err) throw err

      console.log('Wrote coverage badge to: ' + outputPath)
    })
  })
})
