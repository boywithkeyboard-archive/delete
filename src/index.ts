#!/usr/bin/env node

import { lstat, readdir, rmdir, stat, unlink } from 'node:fs/promises'
import { join } from 'node:path'
import files from '@unvented/files'
import minimist from 'minimist'

(async () => {
  const argv = minimist(process.argv.slice(2))

  const stats = async (path: string) => {
    try {
      const s = await stat(path)
  
      return s
    } catch (err) {
      return undefined
    }
  }

  const removeEmptyDirectories = async (directory: string) => {
    const stats = await lstat(directory)

    if (!stats.isDirectory()) return

    let fileNames = await readdir(directory)

    if (fileNames.length > 0) {
      const recursiveRemovalPromises = fileNames.map(
        fileName => removeEmptyDirectories(join(directory, fileName))
      )

      await Promise.all(recursiveRemovalPromises)

      fileNames = await readdir(directory)
    }

    if (fileNames.length === 0)
      await rmdir(directory)
  }

  for (let i of argv._) {
    i = join(process.cwd(), i.startsWith('./') || i.startsWith('../') ? i : `./${i}`)

    const s = await stats(i)

    if (!s) continue

    if (s.isFile()) {
      await unlink(i)
    } else {
      for await (const file of files(i))
        await unlink(file)

      await removeEmptyDirectories(i)
    }
  }
})()
