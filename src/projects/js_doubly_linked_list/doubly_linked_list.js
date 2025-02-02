import LinkedList, { Node, defaultEqFn } from '../js_linked_list/linked_list';
export class DoublyLLNode extends Node {
  constructor(element, next, previous) {
    super(element, next);
    this.previous = previous;
  }
}

class DoublyLinkedList extends LinkedList {
  constructor(equalsFn = defaultEqFn) {
    super(equalsFn);
    this.tail = null;
  }

  push(element) {
    const previousElement = super.getElementAt(this.size() - 1);
    const newNode = super.push(element);
    newNode.previous = previousElement || null;
    this.tail = newNode;
  }

  insertAt(element, index) {
    if (index < 0 || index > this.size()) {
      return false;
    }
    let current = this.head;
    if (index === 0) {
      const newNode = new DoublyLLNode(element);
      // adding the first item of the linked list
      if (this.head === null) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        newNode.next = current;
        current.previous = newNode;
        this.head = newNode;
      }
      this.count++;
      return newNode;
    } else if (index === this.size()) {
      // adding the first item of the linked list
      return this.push(element);
    } else {
      const previousElement = super.getElementAt(index - 1);
      const current = super.getElementAt(index);
      const newNode = super.insertAt(element, index);
      newNode.previous = previousElement || null;
      current.previous = newNode;
      return newNode;
    }
  }

  removeAt(index) {
    if (index < 0 || index >= this.size()) {
      return false;
    }
    const previousItem = super.getElementAt(index - 1);
    let removedEl;
    if (index === 0) {
      // first item
      removedEl = super.removeAt(index);
      if (this.size() === 0) {
        this.tail = null;
      } else {
        this.head.previous = null;
      }
    } else if (index === this.size() - 1) {
      // last item
      removedEl = super.removeAt(index);
      this.tail = previousItem;
      this.tail.next = null;
    } else {
      // between first and last item
      removedEl = super.removeAt(index);
      previousItem.next = removedEl.next;
      removedEl.next.previous = previousItem;
    }
    return removedEl;
  }

  clear() {
    super.clear();
    this.tail = null;
  }
}

export default DoublyLinkedList;
