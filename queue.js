var Queue = function(maxSize) {
	this.queue = [];

	this.reset = function() {
		this.head = -1;
		this.tail = -1;
	};

	this.maxSize = maxSize || Queue.MAX_SIZE;

	this.increment = function(number) {
		return (number + 1) % this.maxSize;
	};
};

Queue.MAX_SIZE = Math.pow(2, 53) - 1;

Queue.prototype.enqueue = function(entry) {
	if (this.isFull()) {
		throw new Error("Queue is full can't add new entries");
	}

	if (this.isEmpty()) {
		this.head = this.increment(this.head);
	}

	this.tail = this.increment(this.tail);

	this.queue[this.tail] = entry;
}

Queue.prototype.isEmpty = function() {
	return this.tail === -1 && this.head === -1;
}

module.exports = Queue
