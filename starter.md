# steps to create react component library

## 1. create vite app with react

```node.js
npm create vite@latest app-name
```

## 2. install

### changes in package.json file

change

```json
"devDependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
},
```

to

```json
"peerDependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
},
```

### and add following in package.json file

```json
"exports": {
    ".": {
        "types": "./dist/main.d.ts",
        "default": "./dist/main.js"
    },
    "./assets": {
        "types": "./dist/assets.d.ts",
        "default": "./dist/assets.js"
    },
    "./dist/assets/style.css": "./dist/assets/style.css"
},
"sideEffects": [
    "**/*.css"
]
```

### copy and paste following code in `vite.config.ts` file

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { extname, relative, resolve } from 'path';
import { fileURLToPath } from 'node:url';
import { glob } from 'glob';
import tailwindcss from 'tailwindcss';
import typescript from '@rollup/plugin-typescript';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), dts({ include: ['lib/**/!(*.spec|*.test).{ts,tsx}'] })],
	css: {
		postcss: {
			plugins: [tailwindcss],
		},
	},
	build: {
		copyPublicDir: false,
		lib: {
			entry: resolve(__dirname, 'lib/main.ts'),
			formats: ['es'],
		},
		rollupOptions: {
			external: ['react', 'react-dom', 'react/jsx-runtime', 'tailwindcss'],
			plugins: [
				typescriptPaths({
					preserveExtensions: true,
				}),
				typescript({
					sourceMap: false,
					declaration: true,
					outDir: 'dist',
				}),
			],
			input: Object.fromEntries(
				glob
					.sync('lib/**/*.{ts,tsx}', {
						ignore: ['lib/**/*.d.ts'],
					})
					.map((file) => [
						// The name of the entry point
						// lib/nested/foo.ts becomes nested/foo
						relative('lib', file.slice(0, file.length - extname(file).length)),
						// The absolute path to the entry file
						// lib/nested/foo.ts becomes /project/lib/nested/foo.ts
						fileURLToPath(new URL(file, import.meta.url)),
					])
			),
			output: {
				assetFileNames: 'assets/[name][extname]',
				entryFileNames: '[name].js',
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
					tailwindcss: 'tailwindcss',
				},
			},
		},
		sourcemap: false,
		emptyOutDir: true,
	},
});
```

### copy paste following code in `tsconfig.json` file

```json
{
	"compilerOptions": {
		"target": "ES2020",
		"useDefineForClassFields": true,
		"module": "ESNext",
		"lib": ["ES2020", "DOM", "DOM.Iterable"],
		"skipLibCheck": true,

		/* Bundler mode */
		"moduleResolution": "Node",
		"allowImportingTsExtensions": true,
		"isolatedModules": true,
		"moduleDetection": "force",
		"noEmit": true,

		/* Linting */
		"strict": true,
		"noUnusedLocals": true,
		"noUnusedParameters": true,
		"noFallthroughCasesInSwitch": true,

		/* lib mode config */
		"allowJs": false,
		"types": ["vite/client", "node"],
		"esModuleInterop": false,
		"allowSyntheticDefaultImports": true,
		"forceConsistentCasingInFileNames": true,
		"resolveJsonModule": true,
		"jsx": "preserve",
		"baseUrl": "./",
		"paths": {
			"~/*": ["lib/*"]
		}
	},
	"include": ["lib"],
	"exclude": ["node_modules"]
}
```

## install following dev dependencies

1. glob
2. react
3. react-dom
4. rollup-plugin-typescript-paths
5. vite-plugin-dts
6. vite-plugin-lib-inject-css
7. @rollup/plugin-typescript
8. @types/node
9. cssnano
10. @fullhuman/postcss-purgecss postcss

```node
npm i -D glob react react-dom rollup-plugin-typescript-paths vite-plugin-dts vite-plugin-lib-inject-css @rollup/plugin-typescript @types/node tslib
```

## create files and folders

create `lib` folder and create `lib/index.css` and `lib/main.ts`

## install tailwindcss

run following script

```node.js
npm install -D tailwindcss postcss autoprefixer
```

```node.js
npx tailwindcss init -p
```

### add following in `tailwind.config.js` file

```js
content: ['./lib/**/*.{js,ts,jsx,tsx}'],
purge: {
    enabled: true,
    content: ['./lib/**/*.{ts,tsx}'],
},
```

### replace following in `postcss.config.js`

```js
export default {
	plugins: {
		tailwindcss: {},
		autoprefixer: {},
		...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
	},
};
```

### import following in css file

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

if there are any plugins with tailwind css then install and add them in tailwind.config.js file
