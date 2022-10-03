#!/usr/bin/env node

import { join } from 'node:path'
import minimist from 'minimist'
import { deleteFiles } from '.'

(async () => {
  const argv = minimist(process.argv.slice(2))

  , entries = argv._

  for (let entry of entries)
    entry = join(process.cwd(), entry.startsWith('./') || entry.startsWith('../') ? entry : `./${entry}`)

  deleteFiles(...entries)
})()
