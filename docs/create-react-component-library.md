# create react component library

link to the article is [here](https://dev.to/receter/how-to-create-a-react-component-library-using-vites-library-mode-4lma)

## Create a Component Library Fast🚀(using Vite's library mode)

If you are managing multiple React applications and want consistency across your user interfaces, sooner or later you'll find that you need a component library.

When I first wanted to create a React component library, it took me a lot of time to find a setup that met all my requirements and wasn't too complicated.

A guide like this would've spared me a great amount of energy wrestling with this stuff myself. I hope it can help you as much as it would have helped me.

This post covers setting up and publishing a React component library, including configuring your build process and publishing your package to npm so you and/or others can use it.

I've done my best to keep all configurations simple and concise, using default settings whenever possible.

When you are done, you can install your library like any other npm package:

```nodejs
npm install @username/my-component-library
```

And use it like:

```javascript
import { Button } from `@username/my-component-library`;

function MyComponent() {
  return <Button>Click me!</Button>
}
```

### Before we start

Before we dig into the implementation details, I would like to elaborate on some technical details regarding the setup of the library.

### 🌳Fully tree shakeable

For me it was particularly important that only necessary code ends up in the final application. When you import a component, it only includes the necessary JS and CSS styles. Pretty cool, right?

### 🦑Compiled CSS modules

The components are styled with [CSS modules](https://github.com/css-modules/css-modules). When building the library, these styles will get transformed to normal CSS style sheets. This means that the consuming application will not even be required to support CSS modules.

As a bonus compiling the CSS modules avoids a [compatibility issue](https://stackoverflow.com/questions/71294870/how-to-publish-a-react-component-with-css-modules-that-can-be-consumed-by-both) and the package can be consumed in both, environments that support named imports for CSS modules, and environments that don't.

(In the future I want to extend this tutorial to use [vanilla-extract](https://vanilla-extract.style/) instead.)

### 😎TypeScript

While the library is written in [TypeScript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html), it can be consumed in any "normal" JavaScript project as well. If you never used TypeScript before, give it a try. It not only forces you to write cleaner code, but also helps your AI coding assistant make better suggestions 😉

OK enough reading, now let's have some fun!

### 1. Setup a new Vite project

If you have never worked with [Vite](https://vitejs.dev/), think of it as a replacement for [Create React App](https://medium.com/@dawid.niegrebecki/create-react-app-is-dead-what-to-use-instead-fcdd46b70295). Just a few commands and you are ready to go.

```nodejs
npm create vite@latest
? Project name: › my-component-library
? Select a framework: › React
? Select a variant: › TypeScript
cd my-component-library
npm i
```

That's it, your new Vite/React project is ready to go.

[Here are two things I recommend you to do right after installing Vite.](https://dev.to/receter/two-things-i-do-every-time-i-set-up-a-new-node-project-1mg3)

### 2. Basic build setup

You can now run npm run dev and browse to the url provided by Vite. While working on your library, this is a place where you can easily import your library and actually see your components. Think of all code inside the src folder as your demo page.

The actual library code will reside in another folder. Let's create this folder and name it lib. You could also name it differently, but lib is a solid choice.

The main entry point of your library will be a file named main.ts inside of lib. When installing the library you can import everything that is exported from this file.

```nodejs
 📂my-component-library
 +┣ 📂lib
 +┃ ┗ 📜main.ts
  ┣ 📂public
  ┣ 📂src
  …
```

### Vite Library Mode

At this time, if you build the project with npm run build Vite will transpile the code inside src to the dist folder. This is default Vite behavior.

For now you will use the demo page for development purposes only. So there is no need to transpile this part of the project yet. Instead you want to transpile and ship the code inside of lib.

This is where Vite's Library Mode comes into play. It was designed specifically for building/transpiling libraries. To activate this mode, simply specify your library entry point in vite.config.ts.

Like so:

```nodejs
import { defineConfig } from 'vite'
+ import { resolve } from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
+  build: {
+    lib: {
+      entry: resolve(__dirname, 'lib/main.ts'),
+      formats: ['es']
+    }
  }
})
```

<blockquote>
💡 The default formats are 'es' and 'umd'. For your component library 'es' is all you need. This also removes the necessity for adding the name property.

💡 If your TypeScript linter complains about 'path' and __dirname just install the types for node: npm i @types/node -D
</blockquote>

- 📘 Library mode [docs](https://vitejs.dev/guide/build.html#library-mode)
- 📘 lib mode [docs](https://vitejs.dev/config/build-options.html#build-lib)

### TypeScript and library mode

The tsconfig.json created by Vite only includes the folder src. To enable TypeScript for your newly created lib folder as well you need to add it to the TypeScript configuration file like this:

```nodejs
-   "include": ["src"],
+   "include": ["src", "lib"],
```

Although TypeScript needs to be enabled for both the src and lib folders, it is better to not include src when building the library.

To ensure only the lib directory is included during the build process you can create a separate TypeScript configuration file specifically for building.

<blockquote>
💡 Implementing this separate configuration helps avoid TypeScript errors when you import components directly from the dist folder on the demo page and those components haven't been built yet.
</blockquote>

```nodejs
 📂my-component-library
  ┣ …
  ┣ 📜tsconfig.json
 +┣ 📜tsconfig-build.json
  …
```

The only difference is that the build config includes only the lib directory, whereas the default configuration includes both lib and src

`📜tsconfig-build.json`

```json
{
  "extends": "./tsconfig.json",
  "include": ["lib"]
}
```

To use tsconfig-build.json for building you need to pass the configuration file to tsc in the build script in your package.json:

```node.js
{
  "scripts": {
    …
-   "build": "tsc && vite build",
+   "build": "tsc --p ./tsconfig-build.json && vite build",
  }
}
```

Finally you will also need to copy the file vite-env.d.ts from src to lib. Without this file Typescript will miss some types definitions provided by Vite when building (because we don't include src anymore).

You can now execute npm run build once more and this is what you will see in your dist folder:

```nodejs
 📂dist
  ┣ 📜my-component-library.js
  ┗ 📜vite.svg
```

<blockquote>
💡 The name of the output file is identical with the name property in your package.json per default. This can be changed in the Vite config (build.lib.fileName) but we will do something else about this later.
</blockquote>

The file vite.svg is in your dist folder because Vite copies all files from the public directory to the output folder. Let's disable this behavior:

```nodejs
build: {
+  copyPublicDir: false,
…
}
```

<blockquote>
You can read a more detailed explanation here: <a href="https://stackoverflow.com/questions/75276160/why-is-the-file-vite-svg-in-the-dist-folder-when-building-with-vite-library">Why is the file vite.svg in the dist folder?</a>
</blockquote>

### Building the types

As this is a Typescript library you also want to ship type definitions with your package. Fortunately there is a Vite plugin that does exactly this: [vite-plugin-dts](https://github.com/qmhc/vite-plugin-dts)

```nodejs
npm i vite-plugin-dts -D
```

Per default dts will generate types for both src and lib because both folders are included in the project's .tsconfig. This is why we need to pass one configuration parameter: include: ['lib'].

```javascript
// vite.config.ts
+import dts from 'vite-plugin-dts'
…
  plugins: [
    react(),
+   dts({ include: ['lib'] })
  ],
…
```

<blockquote>
💡 It would also work to exclude: ['src'] or use a different Typescript config file for building.
</blockquote>

To test things out, let's add some actual code to your library. Open lib/main.ts and export something, for example:

```javascript
lib/main.ts
export function helloAnything(thing: string): string {
  return `Hello ${thing}!`
}
```

Then run npm run build to transpile your code. If the content of your dist folder looks like below you should be all set 🥳:

```nodejs
 📂dist
  ┣ 📜main.d.ts
  ┗ 📜my-component-library.js
```

<blockquote>
💡 Don't be shy, open the files and see what the program did for you!
</blockquote>

### 3. What is a React component library without components?

We didn't do all of this just to export a helloAnything function. So let's add some meat 🍖 (or tofu 🌱 or both) to our library.

Let's go with three very common basic components: A button, a label, and a text input.

```nodejs
 📂my-component-library
  ┣ 📂lib
 +┃ ┣ 📂components
 +┃ ┃ ┣ 📂Button
 +┃ ┃ ┃ ┗ 📜index.tsx
 +┃ ┃ ┣ 📂Input
 +┃ ┃ ┃ ┗ 📜index.tsx
 +┃ ┃ ┗ 📂Label
 +┃ ┃   ┗ 📜index.tsx
  ┃ ┗ 📜main.ts
  …
```

And a very basic implementation for these components:

```javascript
// lib/components/Button/index.tsx
export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} />
}
```

```javascript
// lib/components/Input/index.tsx
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} />
}
```

```javascript
// lib/components/Label/index.tsx
export function Label(props: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label {...props} />
}
```

Finally export the components from the library's main file:

```javascript
// lib/main.ts
export { Button } from './components/Button'
export { Input } from './components/Input'
export { Label } from './components/Label'
```

If you npm run build again you will notice that the transpiled file my-component-library.js now has 78kb 😮

The implementation of the components above contains React JSX code and therefore react (and react/jsx-runtime) gets bundled as well.

As this library will be used in projects that have React installed anyways, you can externalize this dependencies to remove the code from bundle:

```javascript
//vite.config.ts
  build: {
    …
+   rollupOptions: {
+     external: ['react', 'react/jsx-runtime'],
+   }
  }
```

### 4. Add some styles

As mentioned in the beginning, this library will use [CSS modules](https://github.com/css-modules/css-modules) to style the components.

CSS modules are supported by Vite per default. All you have to do is to create CSS files that end with .module.css.

```node.js
 📂my-component-library
  ┣ 📂lib
  ┃ ┣ 📂components
  ┃ ┃ ┣ 📂Button
  ┃ ┃ ┃ ┣ 📜index.tsx
+ ┃ ┃ ┃ ┗ 📜styles.module.css
  ┃ ┃ ┣ 📂Input
  ┃ ┃ ┃ ┣ 📜index.tsx
+ ┃ ┃ ┃ ┗ 📜styles.module.css
  ┃ ┃ ┗ 📂Label
  ┃ ┃   ┣ 📜index.tsx
+ ┃ ┃   ┗ 📜styles.module.css
  ┃ ┗ 📜main.ts
  …
```

And add some basic CSS classes:

```css
/* lib/components/Button/styles.module.css */
.button {
    padding: 1rem;
}
```

```css
/* lib/components/Input/styles.module.css */
.input {
    padding: 1rem;
}
```

```css
/* lib/components/Label/styles.module.css */
.label {
    font-weight: bold;
}
```

And import/use them inside your components eg:

```javascript
import styles from './styles.module.css'

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className, ...restProps } = props
  return <button className={`${className} ${styles.button}`} {...restProps} />
}
```

### ⛴️ Ship your style

After transpiling your library you will notice that there is a new file in your distribution folder:

```nodejs
 📂dist
  ┣ …
  ┣ 📜my-component-library.js
+ ┗ 📜style.css
```

But there are two issues with this file:

1. You need to manually import the file in the consuming application.
2. It is one file that contains all styles for all components.

#### Import the CSS

CSS files just can't easily be imported in JavaScript. Therefore, the CSS file is generated separately, allowing the library user to decide how to handle the file.

But what if we were to assume that the application using the library has a bundler configuration that can handle CSS imports?

For this to work, the transpiled JavaScript bundle must contain an import statement for the CSS file. We are going to use yet another Vite plugin ([vite-plugin-lib-inject-css](https://github.com/emosheeep/fe-tools/tree/master/packages/vite-plugin-lib-inject-css)) that does exactly what we need with zero configuration.

```nodejs
npm i vite-plugin-lib-inject-css -D
```

```javascript
// vite.config.ts
+import { libInjectCss } from 'vite-plugin-lib-inject-css'
…
  plugins: [
    react(),
+   libInjectCss(),
    dts({ include: ['lib'] })
  ],
…
```

Build the library and take a look at the top of your bundled JavaScript file (dist/my-component-library.js):

```nodejs
// dist/my-component-library.js
import "./main.css";
…
```

<blockquote>
💡 You may notice that the CSS filename has changed from style.css to main.css. This change occurs because the plugin generates a separate CSS file for each chunk, and in this case the name of the chunk comes from the filename of the entry file.
</blockquote>

### Split up the CSS

But there's still the second problem: when you import something from your library, main.css is also imported and all the CSS styles end up in your application bundle. Even if you only import the button.

The libInjectCSS plugin generates a separate CSS file for each chunk and includes an import statement at the beginning of each chunk's output file.

So if you split up the JavaScript code, you end up having separate CSS files that only get imported when the according JavaScript files are imported.

One way of doing this would be to turn every file into an Rollup entry point. And, it couldn't be better, there is a recommended way of doing this right in the [Rollup documentation](https://rollupjs.org/configuration-options/#input):

<blockquote>
📘 If you want to convert a set of files to another format while maintaining the file structure and export signatures, the recommended way—instead of using output.preserveModules that may tree-shake exports as well as emit virtual files created by plugins—is to turn every file into an entry point.
</blockquote>

So let's add this to your configuration.

First install glob as it will be required:

```nodejs
npm i glob -D
```

Then change your Vite config to this:

```javascript
// vite.config.ts
-import { resolve } from 'path'
+import { extname, relative, resolve } from 'path'
+import { fileURLToPath } from 'node:url'
+import { glob } from 'glob'
…
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
+     input: Object.fromEntries(
+       glob.sync('lib/**/*.{ts,tsx}', {
+         ignore: ["lib/**/*.d.ts"],
+       }).map(file => [
+         // The name of the entry point
+         // lib/nested/foo.ts becomes nested/foo
+         relative(
+           'lib',
+           file.slice(0, file.length - extname(file).length)
+         ),
+         // The absolute path to the entry file
+         // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
+         fileURLToPath(new URL(file, import.meta.url))
+       ])
+     )
    }
…
```

<blockquote>
💡 The glob library helps you to specify a set of filenames. In this case it selects all files ending with .ts or .tsx and ignores *.d.ts files <a href="https://en.wikipedia.org/wiki/Glob_(programming)">Glob Wikipedia</a>
</blockquote>

Now you end up with a bunch of JavaScript and CSS files in the root of your dist folder. It works, but it doesn't look particularly pretty, does it?

```javascript
// vite.config.ts
    rollupOptions: {
…
+     output: {
+       assetFileNames: 'assets/[name][extname]',
+       entryFileNames: '[name].js',
+     }
    }
…
```

Transpile the library again and all JavaScript files should now be in the same organized folder structure you have created in lib alongside with their type definitions. And the CSS files are inside a new folder called assets.

Transpile the library again and all JavaScript files should now be in the same organized folder structure that you created in lib along with their types. And the CSS files are in a new folder called "assets". 🙌

Notice that the name of the main file has changed from "my-component-library.js" to "main.js". That's great!

### 5. A few last steps before you can publish the package

Your build setup is now ready, there are just a few things to consider before releasing your package.

The package.json file will get published along with your package files. And you need to make sure it contains all important information about the package.

#### Main file

Every npm package has a primary entry point, per default this file is index.js in the root of the package.

Your library's primary entry point is now located at dist/main.js, so this needs to be set in your package.json. The same applies to the type's entry point: dist/main.d.ts

```javascript
// package.json
{
  "name": "my-component-library",
  "private": true,
  "version": "0.0.0",
  "type": "module",
+ "main": "dist/main.js",
+ "types": "dist/main.d.ts",
  …
```

#### Define the files to publish

You should also define which files should be packed into your distributed package.

```javascript
// package.json
  …
  "main": "dist/main.js",
  "types": "dist/main.d.ts",
+ "files": [
+   "dist"
+ ],
  …
```

<blockquote>
💡 Certain files like package.json or README are always included, regardless of settings: <a href="https://docs.npmjs.com/cli/v9/configuring-npm/package-json#files">Read the docs</a>
</blockquote>

#### Dependencies

Now take a look at your dependencies: right now there should be only two react and react-dom and a couple of devDependencies.

You can move those two to the devDepedencies as well. And additionally add them as peerDependencies so the consuming application is aware that it must have React installed to use this package.

```javascript
// package.json
- "dependencies": {
+ "peerDependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
+   "react": "^18.2.0",
+   "react-dom": "^18.2.0",
    …
  }
```

<blockquote>
💡 See this StackOverflow answer to learn more about the different types of dependencies: <a href="https://stackoverflow.com/questions/18875674/whats-the-difference-between-dependencies-devdependencies-and-peerdependencie">Link</a>
</blockquote>

#### Side effects

To prevent the CSS files from being accidentally removed by the consumer's tree-shaking efforts, you should also specify the generated CSS as side effects:

```javascript
// package.json
+ "sideEffects": [
+   "**/*.css"
+ ],
```

You can read more about sideEffects in the [webpack docs]([*](https://webpack.js.org/guides/tree-shaking/#mark-the-file-as-side-effect-free)). (Originally from Webpack, this field has developed into a common pattern that is now also supported by other bundlers)

#### Ensure that the package is built

You can use the special lifecycle script prepublishOnly to guarantee that your changes are always built before the package is published:

```javascript
// package.json
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    …
+   "prepublishOnly": "npm run build"
  },
```

### 6. Demo page and deployment

To just play around with your components on the demo page, you can simply import the components directly from the root of your project. This works because your package.json points to the transpiled main file `dist/main.ts`.

```node.js
src/App.tsx
…
import { Button, Label, Input } from '../';
…
```

To publish your package, you just need to run npm publish. If you want to release your package to the public, you have to set private: false in your package.json.

You can read more about publishing your package, including installing it in a local project (without publishing) in these articles of mine:

- [Publish/install your package](https://dev.to/receter/the-minimal-setup-to-package-and-reuse-your-react-components-1063#publishinstall-your-package)
- [Automatically publish you package with GitHub actions](https://dev.to/receter/automatically-publish-your-node-package-to-npm-with-pnpm-and-github-actions-22eg)


### FAQs

#### Can I remove the CSS imports from the output?

Yes, you can easily remove the vite-plugin-lib-inject-css plugin (and subsequential the sideEffects from your package.json)

Having done that you will get one compiled stylesheet containing all required classes in dist/assets/style.css. Import/use this stylesheet in your application and you should be good to go.

You will of course loose the CSS treeshaking feature which is made possible by importing only the required CSS inside each component.

I published a branch demonstrating this change here: [https://github.com/receter/my-component-library/tree/no-css-injection](https://github.com/receter/my-component-library/tree/no-css-injection)

Does this work with Next.js?
Importing CSS from external npm packages works since Next.js 13.4:
[https://github.com/vercel/next.js/discussions/27953#discussioncomment-5831478](https://github.com/vercel/next.js/discussions/27953#discussioncomment-5831478)

If you use an older version of Next.js you can install next-transpile-modules

Here is a Next.js demo repo: [https://github.com/receter/my-nextjs-component-library-consumer](https://github.com/receter/my-nextjs-component-library-consumer)

How to use Storybook for my library?
To install Storybook run npx storybook@latest init and start adding your stories.

If you add stories inside the lib folder you also need to make sure to exclude all .stories.tsx files from the glob pattern so the stories don't end up in your bundle.
glob.sync('lib/**/*.{ts,tsx}', { ignore: 'lib/**/*.stories.tsx'})
I have published a branch with Storybook here: [https://github.com/receter/my-component-library/tree/storybook](https://github.com/receter/my-component-library/tree/storybook)

To be able to build Storybook you need to disable the libInjectCss plugin. Otherwise you will run into an TypeError: Cannot convert undefined or null to object error when running npm run build-storybook (Thanks @codalf for figuring that out!)

Update 26.03.2024: This issue (#15) with vite-plugin-lib-inject-css and has been fixed in version 2.0.0 and the fix is not needed anymore.

Thanks for reading!
If you did not follow along or something wasn't that clear, you can find the full source code with working examples on my GitHub Profile:

- [https://github.com/receter/my-component-library](https://github.com/receter/my-component-library)
- [https://github.com/receter/my-component-library-consumer](https://github.com/receter/my-component-library-consumer)
- [https://www.npmjs.com/package/@receter/my-component-library](https://www.npmjs.com/package/@receter/my-component-library)
Fingers crossed you found it helpful, and I'm all ears for any thoughts you'd like to share.

<blockquote>
👋 Before you go
</blockquote>