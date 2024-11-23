import { generate } from 'openapi-typescript-codegen';
import * as path from 'path';

async function generateApi() {
  await generate({
    input: path.join(__dirname, '../openapi.json'),
    output: path.join(__dirname, '../lib/api'),
    httpClient: 'axios',
    useOptions: true,
    useUnionTypes: true,
  });
}

generateApi(); 