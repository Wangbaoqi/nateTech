---
title: Core of React
---

## react 理念 - **快速响应** {/*react-理念---快速响应*/}

1. CPU的瓶颈

1帧 = 16.66ms = js + style layout + style paint

每一帧预留一点时间给React更新组件

2. IO的瓶颈

网络延迟 体现在 suspense + useDeferredValue


## react的架构 {/*react的架构*/}

- 协调器
- 渲染器
- 调度器 scheduler

### 协调器 - Reconciler {/*协调器---reconciler*/}

主要用来计算虚拟DOM的差异

react15中，协调过程是递归的，计算得到有更新的虚拟DOM，然后通知渲染器进行渲染有更新的节点。
react15中，协调器和调度器是交替进行的，也就是说节点一旦有更新，则立即进行协调和渲染。

react16中，协调是循环的，在每次协调之前会判断当前帧是否有剩余时间够处理react的渲染。
react16中，调度器将任务交给协调器后，协调器会给有更新的节点打上(增删改)标记。
react16中，调度器和协调器的执行都在内存中，当所有组件都完成协调过程，才会统一交给渲染器。

react16中使用了全新的Fiber架构，用来实现 **异步可中断的更新**

Fiber有三种体现：

### Fiber心智模型 {/*fiber心智模型*/}

- 代数效应：将函数中的副作用抽离，是函数保持纯粹
- 代数效应可以中断函数执行以及恢复中断之前的状态
- 代数效应和Generator
- 代数效应和Fiber：可以中断与恢复，恢复之后可以复用之前的中间状态，支持任务的不同优先级

[通俗易懂的代数效应 - DAN](https://overreacted.io/zh-hans/algebraic-effects-for-the-rest-of-us/)

### fiber实现原理 {/*fiber实现原理*/}

**Fiber含义**

- 架构层面：react15的协调器被称为 stack reconciler，而react16的被称为Fiber reconciler
- 静态结构：每个Fiber节点对应一个react element
- 动态单元：协调的过程中会产生Fiber Tree

**Fiber 双缓存树**

FiberRoot -> init Fiber Tree
FiberRoot -> update state -> diff algo -> update Fiber Tree

### render 协调过程 {/*render-协调过程*/}

协调过程是 createFiberTree 和 updateFiberTree 的过程

#### 递过程 - beginWork {/*递过程---beginwork*/}

1. 如果是mount

根据fiber的tag类型创建不同类型的子Fiber节点

2. 如果是update

复用Fiber节点或者新老Fiber节点进行Diff操作，Fiber节点打上effectTag标记

#### 归过程 - completeWork {/*归过程---completework*/}

1. 如果是mount

- 为Fiber节点生成真实DOM
- 将子孙DOM节点插入刚生成的DOM节点中
- 处理props过程


2. 如果是update

- 处理Fiber节点的 props onclick等回调函数的注册
- 处理style、DANGEROUSLY_SET_INNER_HTML、children props

归过程的最后，会产生一条effect组成的单链表，最后交给渲染器同步更新DOM

#### Diff {/*diff*/}

降低复杂度，diff算法进行了限制：

1. 同级元素
2. 不同类型的元素会重新创建节点
3. 通过增加 key props来进行复用节点

##### 单节点Diff {/*单节点diff*/}

元素类型为 object string number时，进行单元素diff

单元素有以下需要diff的场景

- 单节点更新后还是单节点
- 单节点更新后是多节点

如果元素的 key 和 type 都相同的话，则进行复用，否则创建新的节点

##### 多节点Diff {/*多节点diff*/}

多节点diff也有以下的场景

1. 节点更新（props、type）
2. 节点数量更新
3. 节点位置更新

### 渲染器 - Render {/*渲染器---render*/}

渲染器主要遍历effectList中的每个Fiber节点，执行Fiber节点中的副作用（变化的props、声明周期钩子、hook）

主要有三部分：

1. beforeMutation 执行DOM之前

主要有以下工作：
- 处理 DOM节点 渲染或者删除后的 `autofocus`和`blur`
- 执行 getSnapshotBeforeUpdate 生命周期钩子函数
- 调度 useEffect hook, 注意，不是执行useEffect的回调函数

2. mutation 执行DOM

主要有以下工作：
- 根据Fiber节点的Tag处理不同的节点
- 递归遍历mutation effects
- commit reconciliation 的effect
- 处理Placement Update Deletion


3. layout 执行DOM之后

主要有以下工作：
- 调用生命周期钩子和hook
  - componentDidMount
  - componentDidUpdate
- 赋值ref



