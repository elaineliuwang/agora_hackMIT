import { NextApiRequest, NextApiResponse } from 'next';
import { execSync } from 'child_process';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  try {
    const pythonProcess = execSync('python3 src/pages/api/test.py'); // Adjust the path to your Python script
    const output = pythonProcess.toString();
    res.status(200).send(output); // Send the script output directly
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while executing Python code.'); // Send error message as a string
  }
}
