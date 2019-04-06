/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {LazyComponent, Thenable} from 'shared/ReactLazyComponent';

import {REACT_LAZY_TYPE} from 'shared/ReactSymbols';
import warning from 'shared/warning';

// 使用: const OtherComponent = React.lazy(() => import('./OtherComponent'));
// 返回一个对象，带有：$$typeof: REACT_LAZY_TYPE


export function lazy<T, R>(ctor: () => Thenable<T, R>): LazyComponent<T> {
  let lazyType = {
    $$typeof: REACT_LAZY_TYPE,
    _ctor: ctor,      // 载入函数
    // React uses these fields to store the result.
    _status: -1,      // 载入状态，值有0,1,2，分别代表：Pending, Resolved, Rejected
    _result: null,    // 载入结果
  };

  if (__DEV__) {
    // In production, this would just set it on the object.
    let defaultProps;
    let propTypes;

    // 设置 defaultProps, propTypes 时给出提示

    Object.defineProperties(lazyType, {
      defaultProps: {
        configurable: true,
        get() {
          return defaultProps;
        },
        set(newDefaultProps) {
          warning(
            false,
            'React.lazy(...): It is not supported to assign `defaultProps` to ' +
              'a lazy component import. Either specify them where the component ' +
              'is defined, or create a wrapping component around it.',
          );
          defaultProps = newDefaultProps;
          // Match production behavior more closely:
          Object.defineProperty(lazyType, 'defaultProps', {
            enumerable: true,
          });
        },
      },
      propTypes: {
        configurable: true,
        get() {
          return propTypes;
        },
        set(newPropTypes) {
          warning(
            false,
            'React.lazy(...): It is not supported to assign `propTypes` to ' +
              'a lazy component import. Either specify them where the component ' +
              'is defined, or create a wrapping component around it.',
          );
          propTypes = newPropTypes;
          // Match production behavior more closely:
          Object.defineProperty(lazyType, 'propTypes', {
            enumerable: true,
          });
        },
      },
    });
  }

  return lazyType;
}
