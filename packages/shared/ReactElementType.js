/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

export type Source = {
  fileName: string,
  lineNumber: number,
};

// React element 的格式定义， React element 是 React.createElement() 最终返回的对象，也是 jsx 生成的对象
// type 指向定义组件的类/函数
export type ReactElement = {
  $$typeof: any,
  type: any,
  key: any,
  ref: any,
  props: any,
  _owner: any, // ReactInstance or ReactFiber

  // __DEV__
  _store: {
    validated: boolean,
  },
  _self: React$Element<any>,
  _shadowChildren: any,
  _source: Source,
};
