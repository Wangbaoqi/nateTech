---
title: Semver Version
---

<Intro>

上节说到，package中最重要的是`name`和`version`，版本遵循 **[语义化指南](https://semver.org/)**。

</Intro>


**Think**：假如你开发了一个package，这个package有多个稳定的版本号或者你的包依赖了其他的package，别人要使用你的package的话，需要安装哪个版本的package？如果安装高版本的话，要有多高呢?

带着这个问题，来看下语义化指南

## semver {/*semver*/}

**semver**，全称`semantics versioning`，语义化版本，它是由`[major,minor,patch]`组成的。

- **major**: 主版本号，当package发生重大变化的时候才会增长，新增的重要功能、重要API、技术架构发生了变化
- **minor**: 次版本号，当package发生了一些小变化时才会增长，向后兼容，新增小功能、辅助的API等
- **patch**: 补丁版本，当package解决了一些bug或者进行局部优化，修复函数bug，提升函数执行效率等

除此之外，还有`pre-release`版本预发版本号，比如`1.0.0-alpha`、`1.0.0-alpha.1`等。

**当我们在安装package的时候，可能会有不同的场景以及需求**

1. **major** 版本不变，**minor** 和  **patch** 版本可以变化
2. **major**、**minor** 版本不变, **patch** 主要变化
3. 希望固定版本号

这样一来，则需要在配置文件中指定package的依赖规则

| Symbol  | description              | detail |
| ------- | ------------------------ | ------ |
| `>`       | 大于某个版本，`>1.0.0`     | 大于1.0.0版本 |
| `<`       | 小于某个版本，`<1.0.0`      | 小于1.0.0版本 |
| `>=`      | 大于等于某个版本，`>=1.0.0`  | 大于等于1.0.0版本 |
| `<=`      | 小于等于某个版本，`<=1.0.0`  | 小于等于1.0.0版本 |
| -       | 介于两个版本，1.0.0 - 2.0.0  | 大于1.0.0版本 小于等于 2.0.0 |
| X       | 不固定的版本号  1.2.X      | major和minor版本号固定，补丁版本随意  |
| ~       | 补丁版本可增加 ~1.2.1      | major和minor版本号固定，补丁版本大于等于1  |
| ^       | 次版本号和补丁版本可增加 ^1.2.1      | major版本号固定，minor版本大于等于2，补丁版本大于等于1  |
| *       | 最新版本  * | 始终安装最新版本 |


## Semver 判断 {/*semver-判断*/}

如果要进行版本号的操作的话，可以根据[语义化版本语法](https://semver.org/#backusnaur-form-grammar-for-valid-semver-versions)来进行处理。

或者使用[semver package](https://www.npmjs.com/package/semver)的API来处理。

```ts
semver.valid('1,2,3'); // '1.2.3'
semver.clean('  =v1.2.3   ') // '1.2.3'
semver.satisfies('1.2.3', '1.x || >=2.5.0 || 5.0.0 - 7.2.3') // true
semver.gt('1.2.3', '9.8.7') // false
semver.lt('1.2.3', '9.8.7') // true
semver.minVersion('>=1.0.0') // '1.0.0'
```

## 差异版本处理 {/*差异版本处理*/}

这里引出一个问题，当多个package都依赖了同一个package B，但是B的版本都不一样？