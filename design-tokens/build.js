import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';
import { logVerbosityLevels } from 'style-dictionary/enums';
import { resolve } from 'node:path';
import process from 'node:process';
const tokensPath = resolve(process.cwd(), 'src');
const stylesLibPath = resolve(process.cwd(), '../styles/src/lib');
import core from '@actions/core';

// will register them on StyleDictionary object
// that is installed as a dependency of this package.
register(StyleDictionary, {
  excludeParentKeys: true,
});

await build();

async function build() {
  await buildTokens();
}

async function buildTokens() {
  core.info('Building tokens');
  const sd = new StyleDictionary({
    log: {
      verbosity: logVerbosityLevels.verbose,
    },
    source: [`${tokensPath}/**/*.json`],
    preprocessors: ['tokens-studio'],
    platforms: {
      css: {
        transformGroup: 'tokens-studio',
        transforms: ['name/kebab'],
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
