## 按钮收录

<btn-neon />

``` html
<div class="box">
  <div class="neon-btn">Test Btn</div>
</div>
```

``` css
.box {
    background: #050901;
    padding: 20px 30px;
  }
  .neon-btn {
    width: fit-content;
    padding: 25px 30px;
    color: #03e9f4;
    font-size: 24px;
    transition: 0.5s;
    letter-spacing: 4px;
    cursor: pointer;
  }
  .neon-btn:hover {
    background-color: #03e9f4;
    color: #fff;
    box-shadow: 0 0 5px #03e9f4,
                0 0 25px #03e9f4,
                0 0 50px #03e9f4,
                0 0 200px #03e9f4;
  }
```