import fs from 'fs'
import path from 'path'
import { defineCliConfig } from 'sanity/cli'

// Parse .env manually to ensure compatibility with global and local Sanity CLI without external dependencies
const envPath = path.resolve(process.cwd(), '.env')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8')
  envContent.split(/\r?\n/).forEach((line) => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/)
    if (match) {
      const key = match[1]
      let val = match[2] || ''
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.slice(1, -1)
      } else if (val.startsWith("'") && val.endsWith("'")) {
        val = val.slice(1, -1)
      }
      process.env[key] = val.trim()
    }
  })
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

export default defineCliConfig({ api: { projectId, dataset } })
