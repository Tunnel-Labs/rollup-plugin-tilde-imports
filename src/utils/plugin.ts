// @ts-expect-error: forgot to add types
import { createTildeImportExpander } from 'tilde-imports';
import { getMonorepoDirpath } from 'get-monorepo-root';
import type { Plugin } from 'rollup';

export function tildeImports(): Plugin {
	const expandTildeImport = createTildeImportExpander({
		monorepoDirpath: getMonorepoDirpath(import.meta.url)
	});

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
					importerFilepath: importer
				});
			}
		}
	};
}
