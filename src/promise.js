/**
 * Javascript Promise Polyfill
 *
 * @author Dominik Geng
 * @copyright (C) 2018 Dominik Geng
 * @license Apache-2.0
 */

(function (root) {

  // Abort if Promise already exists.
  if (root.Promise) {
    return;
  }

  var STATE = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
  };

  /**
   * @class Promise
   * @param {function} executor A functoin that is passed with the arguments resolve and reject.
   */
  var Promise = function Promise(executor) {
    if (typeof executor != 'function') {
      throw TypeError('Promise argument is not a function');
    }

    this.onResolved = undefined;
    this.onRejected = undefined;
    this.onFinally = undefined;

    this.value = undefined;
    this.reason = undefined;

    var thisPromise = this;

    executor.call(
      undefined,
      function resolve(value) {
        // Ignore if already fulfilled.
        if (thisPromise.state == STATE.FULFILLED) {
          return;
        }

        thisPromise.value = value;
        thisPromise.state = STATE.FULFILLED;

        if (thisPromise.onResolved) {
          thisPromise.onResolved(value);
        }
        if (thisPromise.onFinally) {
          thisPromise.onFinally();
        }
      },
      function reject(reason) {
        // Ignore if already rejected.
        if (thisPromise.state == STATE.REJECTED) {
          return;
        }

        thisPromise.reason = reason;
        thisPromise.state = STATE.REJECTED;

        if (thisPromise.onRejected) {
          thisPromise.onRejected(reason);
        }
        if (thisPromise.onFinally) {
          thisPromise.onFinally();
        }
      }
    );

  };

  Promise.prototype = {

    constructor: Promise,
    state: STATE.PENDING,

    /**
     * Appends a fulfillment and rejection handlers to the promise.
     * @param {function} onResolved Method called on resolved promise.
     * @return {Promise} This promise.
     */
    then: function (onResolved, onRejected) {
      this.onResolved = onResolved;
      this.onRejected = onRejected;

      if (this.state == STATE.FULFILLED) {
        this.onResolved(this.value);
      } else if (this.state == STATE.REJECTED) {
        this.onRejected(this.reason);
      }

      return this;
    },

    /**
     * Appends a rejection handler callback to the promise.
     * Method name wrapped in quote for compatibility of older javascript version. (keyword)
     * @param {function} onRejected Method called on rejected promise.
     * @return {Promise} This promise.
     */
    'catch': function (onRejected) {
      this.onRejected = onRejected;

      if (this.state == STATE.REJECTED) {
        this.onRejected(this.reason);
      }

      return this;
    },

    /**
     * Appends a handler to the promise witch is called when the promise is settled.
     * Method name wrapped in quote for compatibility of older javascript version. (keyword)
     */
    'finally': function (onFinally) {
      this.onFinally = onFinally;

      if (this.state == STATE.FULFILLED || this.state == STATE.REJECTED) {
        this.onFinally();
      }

      return this;
    },

    /**
     * Returns a string representation of this object.
     * @return {string} A string representation of this object.
     */
    toString: function () {
      return '[object Promise]';
    }
  };

  /**
   * Length property whose value is always 1 (number of constructor arguments).
   * @static
   */
  Promise.length = 1;

  /**
   * Returns a Promise object that is resolved with the given value.
   * @param {any} value Value of resolve.
   * @return {Promise} A new promise.
   * @static
   */
  Promise.resolve = function (value) {
    if (value instanceof Promise) {
      return value;
    }

    return new Promise(function (resolve, reject) {
      resolve(value);
    });
  };

  /**
   * Returns a Promise object that is rejected with the given reason.
   * @param {any} reason Reason for the reject.
   * @return {Promise} A new promise.
   * @static
   */
  Promise.reject = function (reason) {
    return new Promise(function (resolve, reject) {
      reject(reason);
    });
  };

  /**
   * Returns a promise that either fulfills when all of the passed promises have fulfilled or rejects
   * as soon as one of the promises in the argument rejects.
   * @param {Promise[]} promises Array of promises.
   * @return {Promise} A new promise.
   * @static
   */
  Promise.all = function (promises) {
    if (!Array.isArray(promises)) {
      throw TypeError('Argument is not an array.');
    }

    return new Promise(function (resolve, reject) {

      var results = [];
      var remaining = promises.length;

      var checkComplete = function () {
        if (remaining <= 0) {
          resolve(results);
        }
      };

      promises.forEach(function (item, index) {
        if (item && (typeof item.then == 'function')) {
          item.then(function (value) {
            results[index] = value;
            remaining--;
            checkComplete();
          }, reject);
        } else {
          results[index] = item;
          remaining--;
        }
      });

      checkComplete();
    });
  };

  /**
   * Returns a promise that fulfills or rejects as soon as one of the promises fulfills or rejects,
   * with the value or reason from that promise.
   * @param {Promise[]} promises Array of promises.
   * @return {Promise} A new promise.
   * @static
   */
  Promise.race = function (promises) {
    if (!Array.isArray(promises)) {
      throw TypeError('Argument is not an array.');
    }

    return new Promise(function (resolve, reject) {
      promises.forEach(function (item) {
        if (item && (typeof item.then == 'function')) {
          item.then(resolve, reject);
        } else {
          resolve(item);
        }
      });
    });
  };

  // Export
  root.Promise = Promise;

})(this);
