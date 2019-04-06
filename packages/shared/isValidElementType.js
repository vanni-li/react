/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import {
  REACT_CONCURRENT_MODE_TYPE,
  REACT_CONTEXT_TYPE,
  REACT_FORWARD_REF_TYPE,
  REACT_FRAGMENT_TYPE,
  REACT_PROFILER_TYPE,
  REACT_PROVIDER_TYPE,
  REACT_STRICT_MODE_TYPE,
  REACT_SUSPENSE_TYPE,
  REACT_MEMO_TYPE,
  REACT_LAZY_TYPE,
  REACT_EVENT_COMPONENT_TYPE,
  REACT_EVENT_TARGET_TYPE,
} from 'shared/ReactSymbols';

// 有效的 Element 类型，也就是组件类型，createElement 传进来的第一个参数
// 有效值包含：
// 1. 字符串(div,span这些)
// 2. 函数：函数组件，class定义的组件 (class定义的组件，typeof 为 function，本质上也是函数)
// 3. 定义好的一些 Symbol 变量
// 4. 对象，且 $$typeof 字段为指定的一些 Symbol 变量

export default function isValidElementType(type: mixed) {
  return (
    typeof type === 'string' ||
    typeof type === 'function' ||
    // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
    type === REACT_FRAGMENT_TYPE ||
    type === REACT_CONCURRENT_MODE_TYPE ||
    type === REACT_PROFILER_TYPE ||
    type === REACT_STRICT_MODE_TYPE ||
    type === REACT_SUSPENSE_TYPE ||
    (typeof type === 'object' &&
      type !== null &&
      (type.$$typeof === REACT_LAZY_TYPE ||
        type.$$typeof === REACT_MEMO_TYPE ||
        type.$$typeof === REACT_PROVIDER_TYPE ||
        type.$$typeof === REACT_CONTEXT_TYPE ||
        type.$$typeof === REACT_FORWARD_REF_TYPE ||
        type.$$typeof === REACT_EVENT_COMPONENT_TYPE ||
        type.$$typeof === REACT_EVENT_TARGET_TYPE))
  );
}
