import StyleDictionary from 'style-dictionary';
import { resolve } from 'node:path';
import process from 'node:process';
const tokensPath = resolve(process.cwd(), 'src');
const stylesLibPath = resolve(process.cwd(), '../styles/src/lib');
import core from '@actions/core';

await build();

async function build() {
  await buildTokens();
}

async function buildTokens() {
  core.info('Building tokens');
  const sd = new StyleDictionary({
    source: [`${tokensPath}/**/*.json`],
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: `${stylesLibPath}/css/`,
        files: [
          {
            destination: 'variables.css',
            format: 'css/variables',
          },
        ],
      },
    },
  });
  await sd.buildAllPlatforms();
  core.info('Tokens built');
}
