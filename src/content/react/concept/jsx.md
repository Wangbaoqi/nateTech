---
title: JSX of React
---

<Intro>

**JSX** 是 JavaScript 语法的一种扩展，可以在 JavaScript 中编写`HTML`代码，这样做是为了更好的将页面逻辑和页面结构结合在一起，符合 React 的组件化的开发模式。

</Intro>


<YouWillLearn>

* JSX的使用
* JSX的转换

</YouWillLearn>


## JSX的使用 {/*jsx的使用*/}

- 元素的类型
- 元素的Props
- 元素的子元素

### 元素的类型 {/*元素的类型*/}

在**JSX**结构中，我们可以写符合`HTML`规范的标签或者符合`React`组件的标签。

下面有几点对元素类型的注意事项：

- 如果没有使用 React 新的编译方式，则必须引入 React， 否则会抛出异常`ReferenceError: React is not defined`

```js
// react version < 17
import React from "react";

function App() {
  return <div>react</div>;
}
```

- 标签的大小写，小写则被编译成`HTML`标签，自定义的组件，则必须要大写，标签必须闭合
- 在**JSX**类型中可以使用点语法
- 在运行时可以选择组件的类型
- JSX必须返回一个根元素

如果不太清楚HTML如何转换成JSX，可以使用[transform](https://transform.tools/html-to-jsx)

### 元素的 Props {/*元素的-props*/}

`props`是**JSX 对象**的属性，有以下几种方式可以指定`props`：

1. `JavaScript`对象作为`props`的值。
2. 字面量作为`props`的值
3. 扩展符运算符`...`
4. 默认值为`true`
5. 几乎所有的属性名使用camelCase

例如`ListItem`元素，被转换为`JSX`对象

```js
<ListItem key='2' className="li" show={showObj.isShow} name='nate' {...obj} disable={false}>7</ListItem>

{
  $$typeof: Symbol(react.element)
  key: "2"
  props: { className: 'li', show: 'true', name: 'nate', age: 12, hobby: 'ball', disable: false, children: '7' }
  ref: null
  type: ({ show, disable, ...rest }) => {…}
}
```


### 元素的子元素 {/*元素的子元素*/}

元素的子元素会被保存在`props`的`children`属性中。

**子元素的类型**

1. 字面量作为子元素
2. js表达式作为子元素
3. `JSX`对象作为子元素
4. 函数作为子元素
5. 布尔、`null`和`undefined`作为子元素会被忽略

```html
<ul>
  <li>字面量</li>
  <li>{1}</li>
  <ListItem key='0' className="li" show={showObj.isShow} name='nate' {...obj} disable={false}>0</ListItem>
  {() => <li>函数作为子元素</li>}
  <li>{false}</li>
  <li>{null}</li>
  <li>{undefine}</li>
</ul>
```

上述元素被编译，如下：

```js
[
  {
    $$typeof: Symbol(react.element)
    key: null
    props: { children: '字面量' }
    ref: null
    type: 'li'
  },{
    $$typeof: Symbol(react.element)
    key: null
    props: { children: 1 }
    ref: null
    type: 'li'
  },{
    $$typeof: Symbol(react.element)
    key: "2"
    props: { className: 'li', show: 'true', name: 'nate', age: 12, hobby: 'ball', disable: false, children: '7' }
    ref: null
    type: ({ show, disable, ...rest }) => {…}
  },{
    () => {…}
  },{
    $$typeof: Symbol(react.element)
    key: null
    props: { children: false }
    ref: null
    type: 'li'
  },{
    $$typeof: Symbol(react.element)
    key: null
    props: { children: null }
    ref: null
    type: 'li'
  },{
    $$typeof: Symbol(react.element)
    key: null
    props: { children: undefined }
    ref: null
    type: 'li'
  }
]
```

## JSX的转换 {/*jsx的转换*/}

JSX的转换可以分为两部分：
- 编译时
- 运行时

编译时主要是有 **Babel** 来处理的，但是在在`17版本`发布后，React 介绍了[全新的 JSX 编译方式](https://zh-hans.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)

比如下面例子：

```tsx
const App = (
  <div className="App">
    <Home />
    <Content />
  </div>
);
```
通过**全新的babel编译**之后，如下：

```ts
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const App = /*#__PURE__*/_jsxs("div", {
  className: "App",
  children: [/*#__PURE__*/_jsx(Home, {}), /*#__PURE__*/_jsx(Content, {})]
});
```

通过**传统的babel编译**之后，如下：

```ts
const App = /*#__PURE__*/React.createElement("div", {
  className: "App"
}, /*#__PURE__*/React.createElement(Home, null), /*#__PURE__*/React.createElement(Content, null));
```

可以看到，在编译之后，运行时会执行不同的方法，全新的方式直接调用`__jsx`或者`__jsxs`方法，而传统的方式会调用`React.createElement`，这也就为什么`React version < 17`的版本必须引入`React`的原因。

在运行时阶段，会执行`__jsx`或者`React.createElement`方法，首先看下`__jsx`源码：

```ts
/**
 * https://github.com/reactjs/rfcs/pull/107
 * @param {*} type
 * @param {object} props
 * @param {string} key
 */
export function jsx(type, config, maybeKey) {
  let propName;

  // Reserved names are extracted
  const props = {};

  let key = null;
  let ref = null;

  // Currently, key can be spread in as a prop. This causes a potential
  // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
  // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
  // but as an intermediary step, we will use jsxDEV for everything except
  // <div {...props} key="Hi" />, because we aren't currently able to tell if
  // key is explicitly declared to be undefined or not.
  if (maybeKey !== undefined) {
    if (__DEV__) {
      checkKeyStringCoercion(maybeKey);
    }
    key = '' + maybeKey;
  }

  if (hasValidKey(config)) {
    if (__DEV__) {
      checkKeyStringCoercion(config.key);
    }
    key = '' + config.key;
  }

  if (hasValidRef(config)) {
    ref = config.ref;
  }

  // Remaining properties are added to a new props object
  for (propName in config) {
    if (
      hasOwnProperty.call(config, propName) &&
      !RESERVED_PROPS.hasOwnProperty(propName)
    ) {
      props[propName] = config[propName];
    }
  }

  // Resolve default props
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  // return ReactElement
  return ReactElement(
    type,
    key,
    ref,
    undefined,
    undefined,
    ReactCurrentOwner.current,
    props,
  );
}
```

再看下`React.createElement`的源码：

```ts
/**
 * Create and return a new ReactElement of the given type.
 * See https://reactjs.org/docs/react-api.html#createelement
 */
export function createElement(type, config, children) {
  let propName;

  // Reserved names are extracted
  const props = {};

  let key = null;
  let ref = null;
  let self = null;
  let source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (
        hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName)
      ) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    if (__DEV__) {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props,
  );
}
```

从两个方法可以看到，将JSX的属性（props、ref、key等）处理之后，最后调用`ReactElement`方法创建react元素(其实是JS对象), 如下：

```ts
ReactElement(type, key, ref, self, source, owner, props) {
  const element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type,
    key,
    ref,
    props,

    // Record the component responsible for creating this element.
    _owner: owner,
  };

  return element;
}
```

