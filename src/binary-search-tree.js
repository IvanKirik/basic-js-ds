const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

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
    const node = new Node(data);
    if (!this._root) {
      this._root = node;
      return;
    }

    let currentNode = this._root;

    while (currentNode) {
      if (node.data < currentNode.data) {
        if (!currentNode.left) {
          currentNode.left = new Node(data);
          return;
        }
        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          currentNode.right = new Node(data);
          return;
        }
        currentNode = currentNode.right;
      }
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    const findNode = (node, data) => {
      if (node === null) {
        return null;
      } else if (node.data === data) {
        return node;
      } else if (data < node.data) {
        return findNode(node.left, data);
      } else {
        return findNode(node.right, data);
      }
    }
    return findNode(this._root, data);
  }

  remove(data) {
    const removeNode = (node, data) => {
      if (node === null) {
        return null;
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (node.left === null && node.right === null) {
          return null;
        } else if (node.left === null) {
          return node.right;
        } else if (node.right === null) {
          return node.left;
        } else {
          const minRightNode = this.findMinNode(node.right);
          node.data = minRightNode.data;
          node.right = removeNode(node.right, minRightNode.data);
          return node;
        }
      }
    }
    return removeNode(this._root, data);
  }

  min() {
    if (this._root === null) {
      return null;
    } else {
      return this.findMinNode(this._root).data;
    }
  }

  findMinNode(node) {
    if (node.left === null) {
      return node;
    } else {
      return this.findMinNode(node.left);
    }
  }

  max() {
    if (this._root === null) {
      return null;
    } else {
      return this.findMaxNode(this._root).data;
    }
  }

  findMaxNode(node) {
    if (node.right === null) {
      return node;
    } else {
      return this.findMaxNode(node.right);
    }
  }
}

module.exports = {
  BinarySearchTree
};
