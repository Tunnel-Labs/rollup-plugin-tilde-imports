import { expandTildeImport } from '@t/tilde-imports';
import type { Plugin } from 'rollup';

export function tildeImports(): Plugin {
	return {
		name: 'tilde-imports',
		resolveId: {
			order: 'pre',
			handler(source: string, importer: string | undefined) {
				if (importer === undefined) {
					return null;
				}

				if (importer.includes('/node_modules/')) {
					return null;
				}

				if (!source.startsWith('~')) {
					return null;
				}

				return expandTildeImport({
					importSpecifier: source,
					importerFilePath: importer
				});
			}
		}
	};
}
