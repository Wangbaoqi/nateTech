---
title: everything of typescript
---

优势相较于JavaScript
- 编译时静态类型检测
- 自动提示清晰明确
- 引入泛型和特有的类型
- 强大的d.ts声明文件
- 编译成JS文件
- 灵活性高

## Core Syntax {/*core-syntax*/}

1. 类型注解和类型推导

```ts
let str: string = 'string'; // 类型注解
let num = 20; // 类型推导, 可以推导出来num的类型为number
```

2. 24中TS数据类型

- 基本数据类型： `number`、 `string`、 `boolean`、 `undefined`、 `null` 和`symbol`
- 根类型： `Object`、 `{}`
- 对象类型：`object`、`object`、`function`
- 枚举：`enum`
- 特殊类型：`any`、`unknown`、`never`、`void`、`tuple`、`可变类型`
- 合成类型：联合和交叉类型
- 字面量类型：字面量作为类型`type num = 1 | 2 | 3`

