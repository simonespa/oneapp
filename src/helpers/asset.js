import config from 'config';
import fs from 'fs';

function readManifest(manifestPath) {
  try {
    return JSON.parse(fs.readFileSync(manifestPath, { encoding: 'utf-8' }));
  } catch (e) {
    return {};
  }
}

/**
 * This class reads the "assets-manifest.json" file and generates an array containing the relative/full paths of
 * the generated JS assets. This array is then returned via handlebar helper to the view.
 *
 * In production, it reads the manifest file ones and caches the result, which is then returned
 * in the template via the "assets" helper.
 *
 * In development, the manifest file is read everytime because assets can change.
 */
export default class Asset {
  static init(manifestPath) {
    if (process.env.NODE_ENV === 'production') {
      const manifest = readManifest(manifestPath);
      Asset.list = Object.values(manifest).map(
        (asset) => `${config.get('assetPrefix')}/${asset}`
      );
    } else {
      Asset.manifestPath = manifestPath;
    }
  }

  static assets() {
    if (process.env.NODE_ENV === 'production') {
      return Asset.list;
    } else {
      const manifest = readManifest(Asset.manifestPath);
      return Object.values(manifest).map(
        (asset) => `${config.get('assetPrefix')}/${asset}`
      );
    }
  }
}
