export default class MinHeap {
    constructor(items = []) {
        this.heap = [];
        if (items.length > 0) {
            this.heapifyArray(items);
        }
    }
 
    // Helper Methods
    getLeftChildIndex(parentIndex) {
        return 2 * parentIndex + 1;
    }
    getRightChildIndex(parentIndex) {
        return 2 * parentIndex + 2;
    }
    getParentIndex(childIndex) {
        return Math.floor((childIndex - 1) / 2);
    }
    hasLeftChild(index) {
        return this.getLeftChildIndex(index) < this.heap.length;
    }
    hasRightChild(index) {
        return this.getRightChildIndex(index) < this.heap.length;
    }
    hasParent(index) {
        return this.getParentIndex(index) >= 0;
    }
    leftChild(index) {
        return this.heap[this.getLeftChildIndex(index)];
    }
    rightChild(index) {
        return this.heap[this.getRightChildIndex(index)];
    }
    parent(index) {
        return this.heap[this.getParentIndex(index)];
    }
 
    // Functions to create Min Heap
     
    swap(indexOne, indexTwo) {
        const temp = this.heap[indexOne];
        this.heap[indexOne] = this.heap[indexTwo];
        this.heap[indexTwo] = temp;
    }
 
    peek() {
        if (this.heap.length === 0) {
            return null;
        }
        return this.heap[0];
    }
     
    // Removing an element will remove the
    // top element with highest priority then
    // heapifyDown will be called 
    remove() {
        if (this.heap.length === 0) {
            return null;
        }
        const item = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();
        this.heapifyDown();
        return item;
    }
 
    add(item) {
        this.heap.push(item);
        this.heapifyUp();
    }
 
    // maintains the heap structure when an element is added to the heap
    heapifyUp() {
        let index = this.heap.length - 1;
        while (this.hasParent(index) && new Date(this.parent(index).dueForReview) > new Date(this.heap[index].dueForReview)) {
            this.swap(this.getParentIndex(index), index);
            index = this.getParentIndex(index);
        }
    }
 
    // maintains the heap structure when an element is deleted
    heapifyDown() {
        let index = 0;
        while (this.hasLeftChild(index)) {
            let smallerChildIndex = this.getLeftChildIndex(index);
            if (this.hasRightChild(index) && new Date(this.rightChild(index).dueForReview) < new Date(this.leftChild(index).dueForReview)) {
                smallerChildIndex = this.getRightChildIndex(index);
            }
            if (new Date(this.heap[index].dueForReview) < new Date(this.heap[smallerChildIndex].dueForReview)) {
                break;
            } else {
                this.swap(index, smallerChildIndex);
            }
            index = smallerChildIndex;
        }
    }

    heapifyArray(items) {
        this.heap = items;
        for (let i = Math.floor(this.heap.length / 2 - 1); i >= 0; i--) {
            this.heapifyDownFromIndex(i);
        }
    }

    heapifyDownFromIndex(index) {
        while (this.hasLeftChild(index)) {
            let smallerChildIndex = this.getLeftChildIndex(index);
            if (this.hasRightChild(index) && new Date(this.rightChild(index).dueForReview) < new Date(this.leftChild(index).dueForReview)) {
                smallerChildIndex = this.getRightChildIndex(index);
            }
            if (new Date(this.heap[index].dueForReview) < new Date(this.heap[smallerChildIndex].dueForReview)) {
                break;
            } else {
                this.swap(index, smallerChildIndex);
            }
            index = smallerChildIndex;
        }
    }
     
    printHeap() {
        var heap =` ${this.heap[0]} `
        for(var i = 1; i<this.heap.length;i++) {
            heap += ` ${this.heap[i]} `;
        }
        console.log(heap);
    }
}