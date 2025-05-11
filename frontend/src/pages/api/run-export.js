import { exec } from 'child_process';

export default function handler(req, res) {
  exec('python3 scripts/export.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).json({ error: error.message });
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
    }

    res.status(200).json({ output: stdout });
  });
}
