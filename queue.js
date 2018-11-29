const Queue = function(maxSize) {
	this.queue = [];

	this.reset = function() {
		this.head = -1;
		this.tail = -1;
	};

	this.maxSize = maxSize || Queue.MAX_SIZE;
	this.reset();

	this.increment = function(number) {
		return (number + 1) % this.maxSize;
	};
};

Queue.MAX_SIZE = Math.pow(2, 53) - 1;

Queue.prototype.enqueue = function(entry) {
//	if (this.isFull()) {
//		throw new Error("Queue is full can't add new entries");
//	}

	if (this.isEmpty()) {
		this.head = this.increment(this.head);
	}

	this.tail = this.increment(this.tail);

	this.queue[this.tail] = entry;
}

Queue.prototype.isEmpty = function() {
	return this.tail === -1 && this.head === -1;
}

Queue.prototype.isFull = function() {
	return this.increment(this.tail) === this.head;
};

Queue.prototype.print = function() {
	for(var i= this.head; i <= this.tail; i++){
		console.log(this.queue[i]);
	}
};

Queue.prototype.map = function(fn) {
	return this.queue.map(fn);
}

Queue.prototype.reduce = function(fn, acc) {
	return this.queue.reduce(fn, acc);
}
module.exports = Queue


// Usage:
console.log(" ==== testing ====");
let queue = new Queue(5);

queue.enqueue(1)
queue.enqueue(2);

console.log("enqueue; 1, 2");
queue.print()

var data = queue.map(function(value, index) {
  return [index + 1, value];
});

var max = queue.reduce(function(acc, val) {
  return (val > acc) ? val : acc;
}, 0);


queue.enqueue(5)
queue.enqueue(6);
queue.enqueue(7)
queue.enqueue(8);
queue.enqueue(9)
queue.enqueue(10);

queue.print()
