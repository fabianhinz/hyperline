# investigate

- would love to display the current cpu-temp which is made possible via [systeminformation](https://www.npmjs.com/package/systeminformation) and [osx-temperature-sensor](https://www.npmjs.com/package/osx-temperature-sensor) (companion dep)
- there are mismatching versions for the companion module which [electron-rebuild](https://github.com/electron/electron-rebuild) can solve
- sadly hyper crashes when using a node module version below 69. To get the temp module to work we need *node_module_version 64* ...