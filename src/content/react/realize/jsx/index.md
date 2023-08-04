---
title: JSX实现
---

<Intro>

关于JSX的详细介绍，可以看[JSX](/react/concept/jsx)

JSX转换 [源码地址](https://github.com/Wangbaoqi/react-self/blob/main/packages/react/src/jsx.ts)
</Intro>

如果要实现一个JSX的转换(runtime)，则有以下流程：

<YouWillLearn>

1. jsx方法
2. jsx的build
3. jsx的调试

</YouWillLearn>

## JSX方法 {/*jsx方法*/}

JSX的运行时转换在[React源码](https://github.com/facebook/react/blob/493f72b0a7111b601c16b8ad8bc2649d82c184a0/packages/react/src/jsx/ReactJSXElement.js#L210)

jsx方法包括：
- jsxDev
- jsx(production)
- React.createElement

这里要注意一点，因为可能使用React的版本不同，所以要实现两套runtime转换方法 **jsx** 和 **React.createElement**

**jsx** 和 **React.createElement** 处理完属性之后，都会去执行 `ReactElement` 方法返回 **jsx**对象，其属性会保存开发者编写的声明式UI的(jsx)的所有值或者属性。

```ts
export const ReactElement = (
  type: Type,
  key: Key,
  ref: Ref,
  props: Props
): IReactElement => {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
    __mark: 'nateWang'
  };
  return element;
};
```

### 实现jsx {/*实现jsx*/}

如果使用的Babel `runtime=automatic`的话，则编译成新的方式，也就是调用 **jsx**的方式。

比如：

```tsx
<div key='1' {...{key: '2', name: 'nate'}}>
  <span>2</span>
  <span>1</span>
</div>
```

转换为

```ts
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
/*#__PURE__*/_jsxs("div", {
  key: '2',
  name: 'nate',
  children: [/*#__PURE__*/_jsx("span", {
    children: "2"
  }), /*#__PURE__*/_jsx("span", {
    children: "1"
  })]
}, '1');
```

可以看到转换后的方法，`_jsxs`接收的参数：

- type: 也就是HTML标签的类型
- conf: 就是div上的属性，包括其children
- maybeKey: 可能会存在key属性，这里跟createElement的实现不一致

这里需要注意一点，如果 conf 中也存在key属性，则会覆盖掉显示增加的key值。

```ts
export const jsx = (type: ElementType, conf: any, maybeKey: any) => {
  let key: Key = null;
  let ref: Ref = null;

  const props: Props = {};

  if (maybeKey !== undefined) {
    key = '' + maybeKey;
  }

  if (hasValidKey(conf)) {
    key = '' + conf.key;
  }

  if (hasValidRef(conf)) {
    ref = conf.ref;
  }

  // handle jsx properties
  for (const prop in conf) {
    const val = conf[prop];
    if (
      Object.hasOwnProperty.call(conf, prop) &&
      // eslint-disable-next-line no-prototype-builtins
      !RESERVED_PROPS.hasOwnProperty(prop)
    ) {
      props[prop] = val;
    }
  }
  return ReactElement(type, key, ref, props);
};
```

### 实现createElement {/*实现createelement*/}

同样，如果使用的Babel `runtime=classic`的话，则用传统的编译方式，也就是调用 **React.createElement**的方式。

比如：

```tsx
<div key='1' {...{key: '2', name: 'nate'}}>
  <span>2</span>
  <span>1</span>
</div>
```

转换为

```ts
/*#__PURE__*/React.createElement("div", {
  key: "1",
  key: '2',
  name: 'nate'
}, /*#__PURE__*/React.createElement("span", null, "2"), /*#__PURE__*/React.createElement("span", null, "1"));
```

可以看到转换后的方法，`createElement`接收的参数：

- type: 也就是HTML标签的类型
- conf: 当前元素的属性
- children: 所有的子元素

从这里可以看到，`jsx`和`createElement`接收的参数明显不同，为什么会这么设计，可以看参考[createElement rfc](https://github.com/reactjs/rfcs/blob/createlement-rfc/text/0000-create-element-changes.md#motivation)

```ts
export const createElement = (
  type: ElementType,
  conf: any,
  ...children: any[]
) => {
  let key: Key = null;
  let ref: Ref = null;
  const props: Props = {};

  if (conf != null) {
    if (hasValidRef(conf)) {
      ref = conf.ref;
    }

    if (hasValidKey(conf)) {
      key = '' + conf.key;
    }

    for (const prop in conf) {
      if (
        Object.hasOwnProperty.call(conf, prop) &&
        !Object.hasOwnProperty.call(RESERVED_PROPS, prop)
      ) {
        props[prop] = conf[prop];
      }
    }
  }

  const childLen = children.length - 2;
  if (childLen === 1) {
    props.childLen = children;
  } else if (childLen > 1) {
    const childArray = Array(childLen);
    for (let i = 0; i < childLen; i++) {
      childArray.push(children[i]);
    }
    props.children = childArray;
  }
  return ReactElement(type, key, ref, props);
};
```

虽然两种方法的入参不同，但是返回值都是 **ReactElement**, 也可以称之为 **虚拟DOM**，其对象上的属性都是一致的。

## JSX打包 {/*jsx打包*/}

针对上述JSX三种方法，分别打包对应的环境的代码

- react/jsx-dev-runtime.js (dev)
- react/jsx-runtime.js (prod)
- React

这里主要针对JS代码打包，所以采用 **Rollup** 的打包方式。

打包脚本移步到[rollUp react jsx](https://github.com/Wangbaoqi/react-self/blob/main/scripts/rollup/react.conf.js)

## JSX的调试 {/*jsx的调试*/}

而JSX的调试，主要使用软连接的方式。

在打包的目录中，全局link package

```shell
# build/react

pnpm link --global
```

在测试项目中，link 全局的 react package.

```shell
# react-demo
pnpm link react --global
```

这样就可以愉快的测试了。

