# How to install

install with yarn

```node.js
yarn add yw-daisyui@https://github.com/yswarkare/yw-hooks.git
```

## reference

```node.js
yarn add https://github.com/fancyapps/fancybox [remote url]
yarn add ssh://github.com/fancyapps/fancybox#3.0  [branch]
yarn add https://github.com/fancyapps/fancybox#5cda5b529ce3fb6c167a55d42ee5a316e921d95f [commit]
```


```node.js
git+https://github.com/owner/package.git#commithashortagorbranch
git+ssh://github.com/owner/package.git#commithashortagorbranch
```


66

Yarn 2+
Installing from remote URLs has changed slightly with Yarn 2. Specifically, remote URLs must be prefixed with the package name. So for github this means:

```node.js
yarn add '<package name>@https://github.com/<github user>/<github repo>'
```

Make sure that `<package name>` matches the value in the "name" field of the repo's `package.json` file.

To target a specific branch add either `head=<branch>` or `commit=<full commit hash>` via the URL fragment:

```node.js
yarn add '<package name>@https://github.com/<github user>/<github repo>#head=<branch name>'
```

If you're trying to install an individual package from a Yarn monorepo on github you can add `workspace=<package name>` to the URL fragment:

```node.js
yarn add '<package name>@https://github.com/<github user>/<github repo>#head=<branch name>&workspace=<package name>'
```

For ssh style urls just add ssh before the url:

```node.js
yarn add ssh://<whatever>@<xxx>#<branch,tag,commit>
```