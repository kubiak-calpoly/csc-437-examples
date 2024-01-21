import { s, x } from './lit-element-d3f56664.js';

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=t=>(e,o)=>{void 0!==o?o.addInitializer((()=>{customElements.define(t,e);})):customElements.define(t,e);};

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
console.log('Loading module "Kram_748885b0_webc"');
function Program({ connectStore, initializeStore }) {
  let HelloWorldElement = class extends s {
    render() {
      return x` <h1>Hello, <slot>world</slot>!</h1> `;
    }
  };
  HelloWorldElement = __decorateClass([
    t("hello-world")
  ], HelloWorldElement);
  return {};
}
function mount(mountpoint, initial) {
  let Store = {
    root: Object.assign({}, initial)
  };
  const connectStore = (path = ["root"]) => {
    let root = Store;
    path.forEach((key) => root = root[key]);
    return {
      root,
      get: (key) => root[key],
      set: (key, value) => root[key] = value,
      keys: () => Object.keys(root)
    };
  };
  const program = Program({ connectStore });
  return (n, container) => {
    program[n - 1].call(container);
  };
}

export { Program, mount };
