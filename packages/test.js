/*
 * @Author: qin
 * @Date: 2022-11-07 20:00:55
 * @LastEditTime: 2022-11-07 21:14:31
 * @FilePath: /ui-lib/packages/test.js
 *  -> The best way to explain it is to do it
 */

// 并发数控制且进行错误数重发

var p1 = () =>
  new Promise((resolve, reject) => {
    if (Math.random() * 100 > 90) {
      setTimeout(resolve, 1000, 'p1');
    } else {
      setTimeout(reject, 1000, 'e-p1');
    }
  });
var p2 = () =>
  new Promise((resolve, reject) => setTimeout(resolve, 1000, 'p2'));
var p3 = () =>
  new Promise((resolve, reject) => {
    if (Math.random() * 100 > 90) {
      setTimeout(resolve, 1000, 'p3');
    } else {
      setTimeout(reject, 1000, 'e-p3');
    }
  });
var p4 = () =>
  new Promise((resolve, reject) => setTimeout(resolve, 1000, 'p4'));
var p5 = () =>
  new Promise((resolve, reject) => {
    if (Math.random() * 100 > 90) {
      setTimeout(resolve, 1000, 'p5');
    } else {
      setTimeout(reject, 1000, 'e-p5');
    }
  });
var p6 = () =>
  new Promise((resolve, reject) => setTimeout(resolve, 1000, 'p6'));
var p7 = () =>
  new Promise((resolve, reject) => {
    if (Math.random() * 100 > 90) {
      setTimeout(resolve, 1000, 'p7');
    } else {
      setTimeout(reject, 1000, 'e-p7');
    }
  });
var p8 = () =>
  new Promise((resolve, reject) => setTimeout(resolve, 1000, 'p8'));
var p9 = () =>
  new Promise((resolve, reject) => {
    if (Math.random() * 100 > 90) {
      setTimeout(resolve, 1000, 'p9');
    } else {
      setTimeout(reject, 1000, 'e-p9');
    }
  });
var p10 = () =>
  new Promise((resolve, reject) => setTimeout(resolve, 1000, 'p10'));
var p11 = () =>
  new Promise((resolve, reject) => {
    if (Math.random() * 100 > 90) {
      setTimeout(resolve, 1000, 'p11');
    } else {
      setTimeout(reject, 1000, 'e-p11');
    }
  });
var p12 = () =>
  new Promise((resolve, reject) => setTimeout(resolve, 1000, 'p12'));
var p13 = () =>
  new Promise((resolve, reject) => {
    if (Math.random() * 100 > 90) {
      setTimeout(resolve, 1000, 'p13');
    } else {
      setTimeout(reject, 1000, 'e-p13');
    }
  });
var p14 = () =>
  new Promise((resolve, reject) => setTimeout(resolve, 1000, 'p14'));

var tasks = [
  p1,
  p2,
  p3,
  p4,
  p5,
  p6,
  p7,
  p8,
  p9,
  p10,
  p11,
  p12,
  p13,
  p14,
];

class TaskQueue {
  /**
   * 任务队列
   * @param tasks 请求数组
   * @param maxNum 最大并发数
   * @param callTime 错误重发次数
   * @param callback 回调
   */
  constructor(tasks, maxNum, callTime, callback) {
    this.maxNum = maxNum;
    this.running = 0;
    this.queue = tasks;
    this.results = [];
    this.callback = callback;
    this.callTime = callTime;
    this.next();
  }
  next() {
    while (this.running < this.maxNum && this.queue.length) {
      console.log('running');
      const executeFn = this.queue.shift();
      let count = 0; // 错误次数
      const run = async task => {
        try {
          const res = await executeFn(task);
          console.log('success push');
          this.results.push(res);
          this.running--;
          this.next();
        } catch (e) {
          count += 1;
          console.log(`trying - ${count}`);
          if (count >= this.callTime) {
            console.log('fail push');
            this.results.push(e);
            this.running--;
            this.next();
          } else {
            run(task);
          }
        }
      };
      run.call(this, executeFn);
      this.running++;
    }

    if (typeof this.callback === 'function' && this.running == 0) {
      this.callback.call(null, this.results);
    }
  }
}

new TaskQueue(tasks, 5, 20, r => {
  console.log('result', r);
});
