const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const newNode = new Node(data);
    if (!this._root) {
      this._root = newNode;
      return;
    }

    let node = this._root;

    while (true) {
      if (data < node.data) {
        if (!node.left) {
          node.left = newNode;
          return;
        }
        node = node.left;
      } else {
        if (!node.right) {
          node.right = newNode;
          return;
        }
        node = node.right;
      }
    }
  }

  has(data) {
    let node = this._root;

    while (node) {
      if (data === node.data) {
        return true;
      }
      if (data < node.data) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
    return false;
  }

  find(data) {
    let node = this._root;

    while (node) {
      if (data === node.data) {
        return node;
      }
      if (data < node.data) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
    return null;
  }

  remove(data) {
    let parent = null;
    let node = this._root;

    while (node && node.data !== data) {
      parent = node;
      if (data < node.data) {
        node = node.left;
      } else {
        node = node.right;
      }
    }

    if (!node) {
      return;
    }

    if (!node.left && !node.right) {
      this._replaceChild(parent, node, null);
    } else if (!node.left || !node.right) {
      const child = node.left || node.right;
      this._replaceChild(parent, node, child);
    } else {
      let minParent = node;
      let minNode = node.right;

      while (minNode.left) {
        minParent = minNode;
        minNode = minNode.left;
      }
      node.data = minNode.data;
      this._replaceChild(minParent, minNode, minNode.right);
    }
  }

  _replaceChild(parent, node, child) {
    if (!parent) {
      this._root = child;
    } else if (parent.left === node) {
      parent.left = child;
    } else {
      parent.right = child;
    }
  }

  min() {
    if (!this._root) {
      return null;
    }

    let node = this._root;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if (!this._root) {
      return null;
    }

    let node = this._root;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree,
};
