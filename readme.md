# rxjs 学习

## 先看一个 demo

### 卷积的运算符的不可读问题

可管道运算符是函数，因此它们可以与普通函数一样使用：`op()(obs)` -但在实践中，它们中的许多往往卷在一起，很快就变得无法阅读：`op4()(op3()(op2()(op1()(obs))))`.

```typescript
map((name) => `Hello, ${name}!`)(of('World'))
  // 通过subscribe方法观察了这个流
  .subscribe(
    // 观察者是一个方法console.log，将获取到的流数据打印
    console.log
  );

```

### pipe 方法

`Observables` 有一个方法，名为 `.pipe()` 它完成了同样的事情，同时更容易阅读 `obs.pipe(op1(), op2(), op3(), op4());`

```typescript
// 把一个字符串转为一个流
of('World')
  // 使用pipe可以显现流中的数据
  .pipe(
    // 使用map操作符可以对显现出来的流数据进行映射处理
    // 这里把 流中的数据 World  =>(映射为新值)  `Hello, World!`
    map((name) => `Hello, ${name}!`)
    // pipe 再把上述一系列操作最后一个操作返回的数据塞到流中
  )
  // 通过subscribe方法观察了这个流
  .subscribe(
    // 观察者是一个方法console.log，将获取到的流数据打印
    console.log
  );

```

## pipe 方法的含义

### 简述

使用 `pipe` 可以显现流中的数据并接收一系列 `Operators`, 最终把一系列 `Operators` 的最后一个返回值塞回流中;

### 图形化

-------_-_---------------------->|

pipe, 显现出数据并且还会把新数据再塞回流中

------World--------------------->|

`map((name) => \`Hello, ${name}!\`)`
pipe 再把上述一系列操作最后一个操作返回的数据塞到流中

------Hello, World!------------->|

subscribe 观察（显现）流中的数据并接收一个观察者对象来消费数据，不能再把数据塞回去
console.log 就是那个观察者对象
