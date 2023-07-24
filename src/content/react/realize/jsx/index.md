---
title: JSX实现总览
---

<Intro>

关于JSX的详细介绍，可以看[JSX](/react/concept/jsx)

</Intro>

如果要实现一个JSX的转换(runtime)，则有以下流程：

<YouWillLearn>

1. jsx方法
2. jsx的build
3. jsx的调试

</YouWillLearn>


## JSX方法 {/*jsx方法*/}

jsx方法包括：

- jsxDev
- jsx(production)
- React.createElement

## JSX打包 {/*jsx打包*/}

针对上述JSX三种方法，分别打包对应的环境的代码

- react/jsx-dev-runtime.js (dev)
- react/jsx-runtime.js (prod)
- React

## JSX的调试 {/*jsx的调试*/}

