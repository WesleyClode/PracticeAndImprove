## Promise
- 为什么需要？
  依次加载3个请求 index.txt-->name.txt-->age.txt
  使用fs代替http
- promise 解决无限嵌套

## 三个状态
- pending    等待状态
- fulfilled  成功状态
- rejected   失败状态

## 状态转换
- 开始状态pending, resolve()可转变为成功状态, reject变为失败状态
- 一旦状态改变则不可再改变
- resolve(xxx)数据会转给then(成功，失败)成功回调方法
- reject(yyy)数据会转给then中失败回调方法
- 是成功态就调成功回调 失败态相同
- 需要把then中的成功、失败回调保存