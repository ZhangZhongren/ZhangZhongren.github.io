## webpack4.X升级webpack5

1. 先按照[官网升级文档](https://webpack.docschina.org/migrate/5/)，完成基本步骤

2. webpack.NamedModulesPlugin is not a constructor

::: tip
  use config.optimization.namedModules 替换 'NamedModulesPlugin' is deprecated
:::

3. configuration.devtool should match pattern

::: tip 
devtool 字段匹配更为严格 设置为 '' 或者 'source-map'
:::

4.  webpack.HashedModuleIdsPlugin is not a constructor

::: tip
  use config.optimization.namedModules 替换 'HashedModuleIdsPlugin' is deprecated
:::

5. chunk.files was changed from Array to Set (indexing Array is deprecated)

::: tip
  uglifyjs-webpack-plugin 插件导致，升级版本即可解决
:::

6. DeprecationWarning: Module.issuer: Use new ModuleGraph API

TODO

7. 




