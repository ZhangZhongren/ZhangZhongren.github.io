## npm 私服包管理

### use .npmrc publish your package


* cd {your package root}
* create .npmrc
```sh
mkdir .npmrc
```

* file rules
  
```rc
registry=${origin}/repository/${group}/
email=${any@email.com}
_auth=${ENV_TOKEN}
```

example:

``` rc
registry=http://192.168.0.1/repository/npm-gropu/
//192.168.0.1/repository/npm-private/:_authToken=Y3Bkc3A6Q3Bkc3BAMTIz
email=any@email.com

```

* create _auth 
>_auth=Y3Bkc3A6Q3Bkc3BAMTIz is the base64 hash for the credentials (admin/admin123). If you use a different set of credentials, you should compute your own hash with:

```sh
echo -n 'myuser:mypassword' | openssl base64
```

example:

``` sh
echo -n 'cpdsp:Cpdsp@123' | openssl base64
```

* publish

add publishConfig to your package.json

``` json
{
  ...

  "publishConfig": {
    "registry": "http://your-host:8081/repository/npm-private/"
  }
}
```
publish your package

``` sh
npm publish
```

::: warning
if you want overwrive the version, maybe get an error. that be decided by your setting.
:::

[learn more](https://docs.npmjs.com/packages-and-modules/)