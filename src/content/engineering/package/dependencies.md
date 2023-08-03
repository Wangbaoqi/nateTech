---
title: dependencies
---

<Intro>

要指定项目所依赖的软件包，您必须在软件包的`package.json`文件中将它们列为**dependencies** 或 **devDependencies**。

运行`npm install`安装时，npm将下载`package.json`中列出的满足每个内容的语义版本要求的dependencies和devDependencies。要查看将安装哪些版本的软件包，请使用[semver Calculator](https://semver.npmjs.com/)。

</Intro>

- dependencies: 应用在生产环境需要的packages。
- devDependencies: 应用在开发或者测试环境需要的packages。


## 安装依赖 {/*安装依赖*/}

您可以从**命令行**或者通过**手动编辑package.json文件**向package.json文件添加依赖项。

```shell
npm install [<package-spec> ...]

aliases: add, i, in, ins, inst, insta, instal, isnt, isnta, isntal, isntall
```

此命令安装一个软件包以及它所依赖的任何软件包。如果软件包具有package-lock.json、npm-shrinkwrap.json
或yarn.lock，则依赖项的安装将由其驱动，并遵守以下优先顺序:

- npm-shrinkwrap.json
- package-lock.json
- yarn.lock

### command line {/*command-line*/}

一般通过`npm install`来安装依赖，也可以增加 option 来选择安装不同环境的依赖

**语法**

```shell
npm install [<@scope>/]<package-name>
```

`<scope>` 是可选的。该软件包将从与指定范围关联的注册表中下载。如果没有与给定范围关联的注册表，则假定默认注册表。

option 安装方式

```bash
npm install <package-name> [--save-prod | -P]       # default production env
npm install <package-name> --save-dev | -D          # development env
npm install <package-name> --save-optional | -O     # package appears optionalDependencies
npm install <package-name> --no-save                # prevent saving to dependencies
npm install <package-name> --save-exact | -E        # 保存的依赖项将配置为精确的版本，而不是使用npm的默认semver范围运算符。
npm install <package-name> --save-bundle            # saving dependencies to bundleDependencies

```


除了比较常见的安装方式，还有以下几种方式


1. tag, version as dependencies

```shell
npm install [<@scope>/]<name>@<tag>

npm install [<@scope>/]<name>@<version>

npm install [<@scope>/]<name>@<version-range>

```

安装指定标签引用的软件包版本。如果该包的注册表数据中不存在该标签，那么这将失败。

```shell
npm install babel@latest

npm install vite@4.4.8

npm install vite">=1.0.0 <4.4.8"
```


2. URL as dependencies - patch-package

> NPM（和yarn）有一个有用的约定，通过指向fork和可选地使用特定分支而不是给它一个版本号来指向项目的package.json依赖项中的git存储库。

使用git的软件包基本配置的约定：

```bash
git+{protocol}://{user}@{hostname}:{project owner}/{project}.git#{branch name}
```

- 协议可以是ssh或https。
- 通过git登录的用户和主机名。通常用户是git，特别是对于github.com和gitlab.com
- 项目所有者要么是一个组织，要么是一个用户
- 项目是repo
- 分支名称（可选）是您想要处理的分支

比如:

```shell
npm i git+ssh://git@github.com:matthew-andrews/isomorphic-fetch.git
npm install git+ssh://git@github.com:npm/cli.git#v1.0.27
npm install git+ssh://git@github.com:npm/cli#pull/273
npm install git+ssh://git@github.com:npm/cli#semver:^5.0
npm install git+https://isaacs@github.com/npm/cli.git
npm install git://github.com/npm/cli.git#v1.0.27
GIT_SSH_COMMAND='ssh -i ~/.ssh/custom_ident' npm install git+ssh://git@github.com:npm/cli.git
```

而在package.json中

```json
{
  "dependencies": {
    "isomorphic-fetch": "git@github.com:matthew-andrews/isomorphic-fetch.git"
  }
}
```

这种一般使用场景是某一依赖改动较小，且不想发布package的情况。

除此之外，还有其他的安装URL的方式，如下语法，详细[传送门](https://docs.npmjs.com/cli/v8/commands/npm-install#description)

```bash
npm install <protocol>://[<user>[:<password>]@]<hostname>[:<port>][:][/]<path>[#<commit-ish> | #semver:<semver>]
npm install <githubname>/<githubrepo>[#<commit-ish>]:
npm install github:<githubname>/<githubrepo>[#<commit-ish>]:
npm install gist:[<githubname>/]<gistID>[#<commit-ish>|#semver:<semver>]
npm install bitbucket:<bitbucketname>/<bitbucketrepo>[#<commit-ish>]
npm install gitlab:<gitlabname>/<gitlabrepo>[#<commit-ish>]
```


2. alias 别名方式

alias方式主要是安装同一个package的多个版本，一般使用场景是用在 **Playground**

```shell
npm install <alias>@npm:<name>:
```

例如：

```shell
npm install react-15@npm:react@^15.6.7
npm install react-18@npm:react
```
而在package.json中

```json
{
  "dependencies": {
    "react-15": "npm:react@^15.7.0",
    "react-18": "npm:react@^18.2.0",
  }
}
```

3. folder as dependency

如果`<folder>`位于项目的根目录中，则将安装其依赖项，并可能像其他类型的依赖项一样被提升到顶级node_modules。如果`<folder>`位于项目的根目录之外，npm将不会在目录`<folder>`中安装软件包依赖项，但它将创建到`<folder>`的符号链接。

<Note>
如果您想从注册表安装目录（如软件包）的内容，而不是创建链接，则需要使用`--install-links`选项。
</Note>

```shell
npm install ../../yarnPackage --install-links
```

而在package.json中

```json
{
  "dependencies": {
    "yarnPackage": "file:../yarnPackage"
  },
}
```

## devDependencies {/*devdependencies*/}

<Intro>

如果有人计划在他们的程序中下载和使用您的模块，那么他们可能不希望或不需要下载和构建您使用的外部测试或文档package。
而这些不需要的依赖包则可以安装在 devDependencies 中。
</Intro>

比如我们通常在开发环境或者测试环境中使用的一些工具链的工具，webpack、babel、eslint等等，而这些package在打包的时候是不会打包到生产环境中。

## peerDependencies {/*peerdependencies*/}

<Intro>
在开发插件时，你的插件需要某些依赖的支持，但是你又没必要去安装，因为插件的宿主会去安装这些依赖。此时就可以用 peerDependencies 去声明一下需要依赖的插件和版本。如果出问题的话，npm 会有警告来提示使用者去解决版本中的冲突。
</Intro>








查看link的包是否成功安装到了本地
```
cd node_modules
ls -al | grep xxx
```

yarn link 通常创建全局唯一的引用，在用户目录 ~/.config/yarn/link/ 下。

