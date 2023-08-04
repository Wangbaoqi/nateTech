---
title: React Reconcile
---

<Intro>

React Reconcile 是React的核心所在，称之为协调器，其主要目的就是进行 diff 算法

</Intro>

## Reconcile 原理 {/*reconcile-原理*/}

diff算法的目的是为了减少真实DOM的操作，从而避免大量的DOM的回流和重绘。


而在没有React库之前，UI的渲染是通过 **过程驱动** 实现的，也就是通过JavaScript代码操作 **宿主环境** 提供的API，比如流行的JQuery，将操作DOM的操作封装成各种API，供开发者使用。

而后来出现各种框架/库实现了diff算法，将新老虚拟DOM对象的差异对比出来，从而 **一次性**的渲染到真实DOM上。

这种利用diff算法的库/框架是通过 **状态/数据驱动** 实现UI渲染的。

而要实现这种渲染方式，首先得有一下几个模块：

- **描述UI的方式**： JSX 和 template
- **runtime阶段进行协调(Diff操作)**: reconciler 和 Renderer
- **针对不同的宿主环境，调用对应的渲染UI的API**

而在React中，声明式的UI(JSX)被Babel编译为**ReactElement**，而**ReactElement**保存节点的数据信息是有限的，不能描述节点之间的关系，无法表达节点的状态，不能进行拓展字段。


因此[FiberNode](/react/core/fiber#fiber的结构)诞生了。

有了FiberNode节点之后，就对于 **协调阶段** 就轻而易举了。


<IllustrationBlock sequential>
  <Illustration caption="ReactElement" alt="最新的ReactElement的状态" />
  <Illustration caption="FiberNode" alt="保存了旧状态FiberNode，也就是当前页面展示的状态" />
  <Illustration caption="New FiberNode with flags" alt="带着各种副作用的flags，包括新增、删除、更新标记" />
</IllustrationBlock>

当所有的 **ReactElement** 和 对应的 **FiberNode** 对比结束之后，会产生一颗 **FiberNode Tree(节点之间的关系等)**，而UI状态更新结束之后，会存在两颗 **FiberNo Tree**:

- current: 与真实UI所对应的FiberNode树
- workInProgress: 触发新的更新之后，在协调中发生更新的FiberNode树

## Reconciler 架构 {/*reconciler-架构*/}

因为对应真实UI的FiberNode是 **Tree** 的结构，而ReactElement也是树的结构，因此在协调过程中，需要遍历所有的节点，因此 **DFS(深度优先遍历)** 成了不二之选。

首先，看个例子

```tsx
<div key='1'>
  <span>2</span>
  <span>1</span>
</div>
```

以DFS的顺序遍历上述ReactElement，有以下过程：

- 递阶段：如果有子节点，遍历以及处理子节点，对应 beginWork
- 归阶段：如果没有子节点，遍历其兄弟节点, 对应 completeWork

<img className='w-full'src='https://media.wangbaoqi.tech/assets/blog/react/render/react-render.svg' />

上图为整个reconciler过程(render阶段)。

下面简单的实现下 **reconciler 架构**

```ts
let workInProgress: FiberNode | null = null;

// initialize or schedule update
function renderRoot(root: FiberRootNode) {
  workInProgress = createWorkInProgress(root.current, {});
  do {
    try {
      workLoop();
      break;
    } catch (e) {
      workInProgress = null;
    }
  } while (true);
}

function workLoop() {
  while(workInProgress !== null) {
    performanceUnitOfWork(workInProgress);
  }
}

// handle Next stage
function performanceUnitOfWork(fiber: FiberNode) {
  const next = beginWork(fiber);

  fiber.memoizedProps = fiber.pendingProps;

  // children node over, next step handle siblings and return nodes
  if (next === null) {
    completeUnitOfWork(fiber);
  } else {
    workInProgress = null;
  }
}

// handle Return stage
function completeUnitOfWork(fiber: FiberNode) {
  let node: FiberNode | null = fiber;

  do {
    completeWork(node);

    const sibling = node?.sibling;
    if (sibling !== null) {
      workInProgress = sibling;
      return;
    }
    node = node.return;
    workInProgress = node;
  } while (node !== null);
}
```









