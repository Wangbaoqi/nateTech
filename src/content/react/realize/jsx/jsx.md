---
title: JSX转换实现
---

[JSX Of React](/react/concept/jsx)阐述了其如何使用以及其原理。

此篇主要去简单的实现它(运行时)。

JSX的运行时转换在[React源码](https://github.com/facebook/react/blob/493f72b0a7111b601c16b8ad8bc2649d82c184a0/packages/react/src/jsx/ReactJSXElement.js#L210)比较简单





```ts
import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import {
	Type,
	Key,
	Ref,
	Props,
	IReactElement,
	ElementType
} from 'shared/ReactTypes';

// react source code here params (type, key, ref, self, source, owner, props)
// self、source、 owner params are used development environments
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

const RESERVED_PROPS = {
	key: true,
	ref: true,
	__self: true,
	__source: true
};

const hasValidKey = (config: any): boolean => {
	return config.key !== undefined;
};

const hasValidRef = (config: any): boolean => {
	return config.ref !== undefined;
};

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

export const jsxDEV = jsx;

export const createElement = (
	type: ElementType,
	conf: any,
	children: any[]
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

	const childLen = children.length;
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