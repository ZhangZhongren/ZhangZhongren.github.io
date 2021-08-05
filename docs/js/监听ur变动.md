## 监听url变动

### 监听 hash 变动

1. window.onhashchange

``` js
  function locationHashChanged(e) {
    const { newURL, oldURL } = e
    console.log(e, newURL, oldURL)
  }
  window.onhashchange = locationHashChanged;
```

2、window.addEventListener('hashchange', call, false)

``` js
  function hashHandler() {
    console.log('The hash has changed!');
  }

  window.addEventListener('hashchange', hashHandler, false);
```


### 监听 history 变动

1. window.addEventListener('popstate', call)

``` js
  window.addEventListener('popstate', function(event) {
    console.log(event)
  }
```
可以监听到相应的行为:

1. window.history.go();
2. window.history.back();
3. window.history.forward();
4. 在浏览器中点击后退和前进按钮也会触发popstate事件

History.pushState()和History.replaceState()不会触发popstate事件

实现 pushState、replaceState 的监听

实现方案：代理window事件

``` js

  function _wr(type) {
    var orig = history[type]
    return function() {
      var rv = orig.apply(this, arguments);
      var e = new Event(type);
      e.arguments = arguments;
      window.dispatchEvent(e);
      return rv;
    }
  }
  history.pushState = _wr('pushState');
  history.replaceState = _wr('replaceState');
```