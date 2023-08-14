import './style.css';

import { of, map } from 'rxjs';

// 
map((name) => `Hello, ${name}!`)(of('World'))
// 通过subscribe方法观察了这个流
.subscribe(
  // 观察者是一个方法console.log，将获取到的流数据打印
  console.log
);



// 把一个字符串转为一个流
of('World')
  // 使用管道回调可以显现流中的数据
  .pipe(
    // 使用map操作符可以对显现出来的流数据进行映射处理
    // 这里把 流中的数据 World  =>(映射为新值)  `Hello, World!` 然后再通过管道塞到流数据中
    map((name) => `Hello, ${name}!`)
  )
  // 通过subscribe方法观察了这个流
  .subscribe(
    // 观察者是一个方法console.log，将获取到的流数据打印
    console.log
  );


// Open the console in the bottom right to see results.
