---
title: 认识npm和Package
---


<YouWillLearn>
- npm
- package
</YouWillLearn>

## npm {/*npm*/}

<Intro>

npm是JavaScript的一个包管理器，默认是跟**Node**捆绑在一起的。

</Intro>

那么npm是`Node Package Manager`? 这里官方否认这一说法。

<Note>

Is "npm" an acronym for "Node Package Manager"?

Contrary to popular belief, npm is not in fact an acronym for "Node Package Manager"; It is a recursive bacronymic abbreviation for "npm is not an acronym" (if the project was named "ninaa", then it would be an acronym). The precursor to npm was actually a bash utility named "pm", which was the shortform name of "pkgmakeinst" - a bash function that installed various things on various platforms. If npm were to ever have been considered an acronym, it would be as "node pm" or, potentially "new pm".

</Note>

既然npm是包管理器，那么存放的包的仓库就是[npmjs.org](https://www.npmjs.com/)了，也被称为**npm registry**

除了npm, Node还有 [yarn](https://yarnpkg.com/) 和 [pnpm](https://pnpm.io/) 包管理器。

对于它们三者之间的区别，后续再说。

npm的使用也很简单，因为是其也是CLI，所以在终端上可以查看其所有的Command

<TerminalBlock>
npm help
</TerminalBlock>


## package {/*package*/}

上述说了包管理器，那么什么是package呢？

<Intro>

package是由`package.json`文件描述的一个文件或者目录，一个package必须包含一个`package.json`文件，这样才能发布到npm registry中。

一个`package.json`文件：
- 列出您的项目所依赖的软件包
- 指定您的项目可以使用语义版本规则使用的软件包版本
- 使您的构建可重现，因此更容易与其他开发人员共享

</Intro>

一个`package.json`文件必须包含`name`字段和`version`字段。

`name`字段包含您的软件包的名称，必须是小写和一个单词，并且可能包含连字符和下划线。

“版本”字段必须以x.x.x的形式，并遵循[语义版本指南](https://docs.npmjs.com/about-semantic-versioning)。

