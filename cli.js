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

const reportKeys = ['lines', 'statements', 'functions', 'branches'];

const getBadge = (report, key) => {
  if (!(report && report.total && report.total[key])) {
    throw new Error('malformed coverage report')
  }

  const coverage = report.total[key].pct
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

readFile('./coverage/coverage-summary.json', 'utf8', (err, res) => {
  if (err) throw err
  const report = JSON.parse(res);

  const urlLines = getBadge(report, reportKeys[0]);

  // TODO: DRY
  download(urlLines, (err, res) => {
    if (err) throw err
    writeFile('./coverage/badge-lines.svg', res, 'utf8', err => {
      if (err) throw err
    });
  });

  const urlStatements= getBadge(report, reportKeys[1]);

  download(urlStatements, (err, res) => {
    if (err) throw err
    writeFile('./coverage/badge-statements.svg', res, 'utf8', err => {
      if (err) throw err
    });
  });

  const urlFunctions= getBadge(report, reportKeys[2]);

  download(urlFunctions, (err, res) => {
    if (err) throw err
    writeFile('./coverage/badge-functions.svg', res, 'utf8', err => {
      if (err) throw err
    });
  });

  const urlBranches = getBadge(report, reportKeys[3]);

  download(urlBranches, (err, res) => {
    if (err) throw err
    writeFile('./coverage/badge-branches.svg', res, 'utf8', err => {
      if (err) throw err
    });
  });
})
