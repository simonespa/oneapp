import config from 'config';
import fs from 'fs';

export default class Asset {
  static setManifestPath(manifestPath) {
    Asset.manifestPath = manifestPath;
  }

  static readManifest() {
    try {
      return JSON.parse(
        fs.readFileSync(Asset.manifestPath, { encoding: 'utf-8' })
      );
    } catch (e) {
      return {};
    }
  }

  static getAssetName(assetName) {
    const isCacheDisabled = config.get('assets.caching') === 'off';

    // Reads the manifest file the first time when the
    // manifest object is not defined, and then every time after that
    // only if the cache is disabled
    if (!Asset.manifest || isCacheDisabled) {
      Asset.manifest = Asset.readManifest();
    }

    return `${Asset.manifest[assetName] || assetName}`;
  }

  static assetHelper(assetName) {
    return `${config.get('assets.prefix')}/${Asset.getAssetName(assetName)}`;
  }
}
