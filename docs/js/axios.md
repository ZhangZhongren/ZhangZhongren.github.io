# axios

[官网](http://www.axios-js.com/)


## 安装axios

使用 npm
> npm install axios -s

使用 cdn

``` js
 <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

## 创建实例

``` js
axios.create([config])
```

::: tip
axios 创建实例后调用可以防止 xss 攻击
:::

## axios 的配置项

```js
const http = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json;charset=UTF-8' }
});
```
### axios 所有的配置项

``` js 
{
  url: '', //必填
  method: '', // 请求方式 默认是 get
  baseURL: '' , // 请求地址的根目录
  transformRequest:  [function (data, headers) { // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，
    // 对 data 进行任意转换处理
    return data;
  }],
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    return data;
  }],
  headers: { 'Content-Type': 'application/json;charset=UTF-8' }, // 请求头
  data: {}, // 放置请求的数据
  timeout: 2000, // 指定请求超时的毫秒数
  withCredentials: false, // 表示跨域请求时是否需要使用凭证 默认 false
  responseType: 'json', // default  表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseEncoding: 'utf8', // default
  xsrfCookieName: 'XSRF-TOKEN', // default  是用作 xsrf token 的值的cookie的名称
  xsrfHeaderName: 'X-XSRF-TOKEN', // default
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },
  onDownloadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },
  maxContentLength: 2000, // 义允许的响应内容的最大尺寸
  validateStatus: function (status) { // return true  执行 resolve 否则执行 reject
    return status >= 200 && status < 300; // default
  },
   maxRedirects: 5, // default  定义在 node.js 中 follow 的最大重定向数目
   proxy: { // 配置代理
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },
  cancelToken: new CancelToken(function (cancel) { // 指定用于取消请求的 cancel token
  })
}

```

## 请求方法别名

``` js
axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.options(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])
```

## 响应结构

``` js
{
  // `data` 由服务器提供的响应
  data: {},

  // `status` 来自服务器响应的 HTTP 状态码
  status: 200,

  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: 'OK',

  // `headers` 服务器响应的头
  headers: {},

   // `config` 是为请求提供的配置信息
  config: {},
 // 'request'
  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance the browser
  request: {}
}
```

## 全局的 axios 默认值

有些参数适合做全局处理 例如 baseUrl 默认的请求头 请求的超时时间 等

``` js
axios.defaults.baseURL = 'https://api.example.com';

```

## axios 的配置项是根据先后顺序来的

::: tip
后设置的会覆盖先前设置的配置项，我们可以利用这一点配置好我们项目里面的的默认选项 在需要做调整的时候传递指定的配置项给axios
:::

## axios 请求拦截器

```
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```

::: tip
我们可以在请求拦截器里面统一处理用户登陆是否过期， 增加请求loading 的处理
在返回拦截器里面处理系统返回的异常 结束loading 对返回数据进行统一的处理再分发出去
:::

##  cancel token 取消请求

```js
const CancelToken = axios.CancelToken
const source = CancelToken.source();
http.defaults.cancelToken = source.token

const http = axios.creat({
  cancelToken: source.token
})
http.interceptors.request.use(config => {
  // 求情之前 做一些判断 如果不满足条件 就 终止请求
  ource.cancel('Operation canceled by the user.');
  return config
}, err => {
  return Promise.reject(error)
})
```

## 配置项目内的 request.js
```
```