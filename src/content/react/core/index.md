---
title: Core of React
---

## React Fiber {/*react-fiber*/}


## React Reconciler Construct {/*react-reconciler-construct*/}

## React Diff Algorithm {/*react-diff-algorithm*/}

## React Hooks {/*react-hooks*/}


## React State Update {/*react-state-update*/}

## React Concurrent Mode {/*react-concurrent-mode*/}



<ConsoleBlock>
ddd
</ConsoleBlock>

<Deprecated>

This API will be removed in a future major version of React. [Use `createRef` instead.](/reference/react/createRef)

</Deprecated>


<Wip>

This section describes an **experimental API that has not yet been released** in a stable version of React.

</Wip>

<Illustration alt="A browser painting 'still life with card element'." src="/images/docs/illustrations/i_browser-paint.png" />


<IllustrationBlock sequential>
  <Illustration caption="Trigger" alt="React as a server in a restaurant, fetching orders from the users and delivering them to the Component Kitchen." />
  <Illustration caption="Render" alt="The Card Chef gives React a fresh Card component." src="/images/docs/illustrations/i_render-and-commit2.png" />
  <Illustration caption="Commit" alt="React delivers the Card to the user at their table." src="/images/docs/illustrations/i_render-and-commit3.png" />
</IllustrationBlock>

<InlineToc />

<LearnMore path="/learn/responding-to-events">

Read **[Responding to Events](/learn/responding-to-events)** to learn how to add event handlers.

</LearnMore>


Consider this math formula: <Math><MathI>y</MathI> = 2<MathI>x</MathI></Math>.

If <Math><MathI>x</MathI> = 2</Math> then <Math><MathI>y</MathI> = 4</Math>. Always.

If <Math><MathI>x</MathI> = 3</Math> then <Math><MathI>y</MathI> = 6</Math>. Always.

If <Math><MathI>x</MathI> = 3</Math>, <MathI>y</MathI> won't sometimes be <Math>9</Math> or <Math>–1</Math> or <Math>2.5</Math> depending on the time of day or the state of the stock market.

If <Math><MathI>y</MathI> = 2<MathI>x</MathI></Math> and <Math><MathI>x</MathI> = 3</Math>, <MathI>y</MathI> will _always_ be <Math>6</Math>.


<Recap>

* If two state variables always update together, consider merging them into one.
* Choose your state variables carefully to avoid creating "impossible" states.
* Structure your state in a way that reduces the chances that you'll make a mistake updating it.
* Avoid redundant and duplicate state so that you don't need to keep it in sync.
* Don't put props *into* state unless you specifically want to prevent updates.
* For UI patterns like selection, keep ID or index in state instead of the object itself.
* If updating deeply nested state is complicated, try flattening it.

</Recap>

React will display your <CodeStep step={1}>loading fallback</CodeStep> until all the code and data needed by <CodeStep step={2}>the children</CodeStep> has been loaded.