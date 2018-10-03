(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.WCReactions = {})));
}(this, (function (exports) { 'use strict';

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var taggedTemplateLiteral = function (strings, raw) {
    return Object.freeze(Object.defineProperties(strings, {
      raw: {
        value: Object.freeze(raw)
      }
    }));
  };

  var withConfig = function withConfig() {
    return function (base, initialConfig) {
      return function (_base) {
        inherits(_class, _base);

        function _class(props) {
          classCallCheck(this, _class);

          var _this = possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

          _this.config = initialConfig;
          return _this;
        }

        return _class;
      }(base);
    };
  };

  var mixins = /*#__PURE__*/Object.freeze({
    withConfig: withConfig
  });

  /**
  @license
  Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
  This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
  The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
  The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
  Code distributed by Google as part of the polymer project is also
  subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
  */

  window.JSCompiler_renameProperty = function (prop) {
    return prop;
  };

  /**
  @license
  Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
  This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
  The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
  The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
  Code distributed by Google as part of the polymer project is also
  subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
  */

  // unique global id for deduping mixins.
  var dedupeId = 0;

  /* eslint-disable valid-jsdoc */
  /**
   * Wraps an ES6 class expression mixin such that the mixin is only applied
   * if it has not already been applied its base argument. Also memoizes mixin
   * applications.
   *
   * @template T
   * @param {T} mixin ES6 class expression mixin to wrap
   * @return {T}
   * @suppress {invalidCasts}
   */
  var dedupingMixin = function dedupingMixin(mixin) {
    var mixinApplications = /** @type {!MixinFunction} */mixin.__mixinApplications;
    if (!mixinApplications) {
      mixinApplications = new WeakMap();
      /** @type {!MixinFunction} */mixin.__mixinApplications = mixinApplications;
    }
    // maintain a unique id for each mixin
    var mixinDedupeId = dedupeId++;
    function dedupingMixin(base) {
      var baseSet = /** @type {!MixinFunction} */base.__mixinSet;
      if (baseSet && baseSet[mixinDedupeId]) {
        return base;
      }
      var map = mixinApplications;
      var extended = map.get(base);
      if (!extended) {
        extended = /** @type {!Function} */mixin(base);
        map.set(base, extended);
      }
      // copy inherited mixin set from the extended class, or the base class
      // NOTE: we avoid use of Set here because some browser (IE11)
      // cannot extend a base Set via the constructor.
      var mixinSet = Object.create( /** @type {!MixinFunction} */extended.__mixinSet || baseSet || null);
      mixinSet[mixinDedupeId] = true;
      /** @type {!MixinFunction} */extended.__mixinSet = mixinSet;
      return extended;
    }

    return (/** @type {T} */dedupingMixin
    );
  };
  /* eslint-enable valid-jsdoc */

  /**
  @license
  Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
  This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
  The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
  The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
  Code distributed by Google as part of the polymer project is also
  subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
  */

  // Microtask implemented using Mutation Observer
  var microtaskCurrHandle = 0;
  var microtaskLastHandle = 0;
  var microtaskCallbacks = [];
  var microtaskNodeContent = 0;
  var microtaskNode = document.createTextNode('');
  new window.MutationObserver(microtaskFlush).observe(microtaskNode, { characterData: true });

  function microtaskFlush() {
    var len = microtaskCallbacks.length;
    for (var i = 0; i < len; i++) {
      var cb = microtaskCallbacks[i];
      if (cb) {
        try {
          cb();
        } catch (e) {
          setTimeout(function () {
            throw e;
          });
        }
      }
    }
    microtaskCallbacks.splice(0, len);
    microtaskLastHandle += len;
  }

  /**
   * Async interface for enqueuing callbacks that run at microtask timing.
   *
   * Note that microtask timing is achieved via a single `MutationObserver`,
   * and thus callbacks enqueued with this API will all run in a single
   * batch, and not interleaved with other microtasks such as promises.
   * Promises are avoided as an implementation choice for the time being
   * due to Safari bugs that cause Promises to lack microtask guarantees.
   *
   * @namespace
   * @summary Async interface for enqueuing callbacks that run at microtask
   *   timing.
   */
  var microTask = {

    /**
     * Enqueues a function called at microtask timing.
     *
     * @memberof microTask
     * @param {!Function=} callback Callback to run
     * @return {number} Handle used for canceling task
     */
    run: function run(callback) {
      microtaskNode.textContent = microtaskNodeContent++;
      microtaskCallbacks.push(callback);
      return microtaskCurrHandle++;
    },


    /**
     * Cancels a previously enqueued `microTask` callback.
     *
     * @memberof microTask
     * @param {number} handle Handle returned from `run` of callback to cancel
     * @return {void}
     */
    cancel: function cancel(handle) {
      var idx = handle - microtaskLastHandle;
      if (idx >= 0) {
        if (!microtaskCallbacks[idx]) {
          throw new Error('invalid async handle: ' + handle);
        }
        microtaskCallbacks[idx] = null;
      }
    }
  };

  /**
  @license
  Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
  This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
  The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
  The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
  Code distributed by Google as part of the polymer project is also
  subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
  */

  /** @const {!AsyncInterface} */
  var microtask = microTask;

  /**
   * Element class mixin that provides basic meta-programming for creating one
   * or more property accessors (getter/setter pair) that enqueue an async
   * (batched) `_propertiesChanged` callback.
   *
   * For basic usage of this mixin, call `MyClass.createProperties(props)`
   * once at class definition time to create property accessors for properties
   * named in props, implement `_propertiesChanged` to react as desired to
   * property changes, and implement `static get observedAttributes()` and
   * include lowercase versions of any property names that should be set from
   * attributes. Last, call `this._enableProperties()` in the element's
   * `connectedCallback` to enable the accessors.
   *
   * @mixinFunction
   * @polymer
   * @summary Element class mixin for reacting to property changes from
   *   generated property accessors.
   */
  var PropertiesChanged = dedupingMixin(function (superClass) {

    /**
     * @polymer
     * @mixinClass
     * @extends {superClass}
     * @implements {Polymer_PropertiesChanged}
     * @unrestricted
     */
    var PropertiesChanged = function (_superClass) {
      inherits(PropertiesChanged, _superClass);
      createClass(PropertiesChanged, [{
        key: '_createPropertyAccessor',
        //eslint-disable-line no-unused-vars

        /**
         * Creates a setter/getter pair for the named property with its own
         * local storage.  The getter returns the value in the local storage,
         * and the setter calls `_setProperty`, which updates the local storage
         * for the property and enqueues a `_propertiesChanged` callback.
         *
         * This method may be called on a prototype or an instance.  Calling
         * this method may overwrite a property value that already exists on
         * the prototype/instance by creating the accessor.
         *
         * @param {string} property Name of the property
         * @param {boolean=} readOnly When true, no setter is created; the
         *   protected `_setProperty` function must be used to set the property
         * @return {void}
         * @protected
         */
        value: function _createPropertyAccessor(property, readOnly) {
          this._addPropertyToAttributeMap(property);
          if (!this.hasOwnProperty('__dataHasAccessor')) {
            this.__dataHasAccessor = Object.assign({}, this.__dataHasAccessor);
          }
          if (!this.__dataHasAccessor[property]) {
            this.__dataHasAccessor[property] = true;
            this._definePropertyAccessor(property, readOnly);
          }
        }

        /**
         * Adds the given `property` to a map matching attribute names
         * to property names, using `attributeNameForProperty`. This map is
         * used when deserializing attribute values to properties.
         *
         * @param {string} property Name of the property
         */

      }, {
        key: '_addPropertyToAttributeMap',
        value: function _addPropertyToAttributeMap(property) {
          if (!this.hasOwnProperty('__dataAttributes')) {
            this.__dataAttributes = Object.assign({}, this.__dataAttributes);
          }
          if (!this.__dataAttributes[property]) {
            var attr = this.constructor.attributeNameForProperty(property);
            this.__dataAttributes[attr] = property;
          }
        }

        /**
         * Defines a property accessor for the given property.
         * @param {string} property Name of the property
         * @param {boolean=} readOnly When true, no setter is created
         * @return {void}
         */

      }, {
        key: '_definePropertyAccessor',
        value: function _definePropertyAccessor(property, readOnly) {
          Object.defineProperty(this, property, {
            /* eslint-disable valid-jsdoc */
            /** @this {PropertiesChanged} */
            get: function get$$1() {
              return this._getProperty(property);
            },

            /** @this {PropertiesChanged} */
            set: readOnly ? function () {} : function (value) {
              this._setProperty(property, value);
            }
            /* eslint-enable */
          });
        }
      }], [{
        key: 'createProperties',


        /**
         * Creates property accessors for the given property names.
         * @param {!Object} props Object whose keys are names of accessors.
         * @return {void}
         * @protected
         */
        value: function createProperties(props) {
          var proto = this.prototype;
          for (var prop in props) {
            // don't stomp an existing accessor
            if (!(prop in proto)) {
              proto._createPropertyAccessor(prop);
            }
          }
        }

        /**
         * Returns an attribute name that corresponds to the given property.
         * The attribute name is the lowercased property name. Override to
         * customize this mapping.
         * @param {string} property Property to convert
         * @return {string} Attribute name corresponding to the given property.
         *
         * @protected
         */

      }, {
        key: 'attributeNameForProperty',
        value: function attributeNameForProperty(property) {
          return property.toLowerCase();
        }

        /**
         * Override point to provide a type to which to deserialize a value to
         * a given property.
         * @param {string} name Name of property
         *
         * @protected
         */

      }, {
        key: 'typeForProperty',
        value: function typeForProperty(name) {}
      }]);

      function PropertiesChanged() {
        classCallCheck(this, PropertiesChanged);

        var _this = possibleConstructorReturn(this, (PropertiesChanged.__proto__ || Object.getPrototypeOf(PropertiesChanged)).call(this));

        _this.__dataEnabled = false;
        _this.__dataReady = false;
        _this.__dataInvalid = false;
        _this.__data = {};
        _this.__dataPending = null;
        _this.__dataOld = null;
        _this.__dataInstanceProps = null;
        _this.__serializing = false;
        _this._initializeProperties();
        return _this;
      }

      /**
       * Lifecycle callback called when properties are enabled via
       * `_enableProperties`.
       *
       * Users may override this function to implement behavior that is
       * dependent on the element having its property data initialized, e.g.
       * from defaults (initialized from `constructor`, `_initializeProperties`),
       * `attributeChangedCallback`, or values propagated from host e.g. via
       * bindings.  `super.ready()` must be called to ensure the data system
       * becomes enabled.
       *
       * @return {void}
       * @public
       */


      createClass(PropertiesChanged, [{
        key: 'ready',
        value: function ready() {
          this.__dataReady = true;
          this._flushProperties();
        }

        /**
         * Initializes the local storage for property accessors.
         *
         * Provided as an override point for performing any setup work prior
         * to initializing the property accessor system.
         *
         * @return {void}
         * @protected
         */

      }, {
        key: '_initializeProperties',
        value: function _initializeProperties() {
          // Capture instance properties; these will be set into accessors
          // during first flush. Don't set them here, since we want
          // these to overwrite defaults/constructor assignments
          for (var p in this.__dataHasAccessor) {
            if (this.hasOwnProperty(p)) {
              this.__dataInstanceProps = this.__dataInstanceProps || {};
              this.__dataInstanceProps[p] = this[p];
              delete this[p];
            }
          }
        }

        /**
         * Called at ready time with bag of instance properties that overwrote
         * accessors when the element upgraded.
         *
         * The default implementation sets these properties back into the
         * setter at ready time.  This method is provided as an override
         * point for customizing or providing more efficient initialization.
         *
         * @param {Object} props Bag of property values that were overwritten
         *   when creating property accessors.
         * @return {void}
         * @protected
         */

      }, {
        key: '_initializeInstanceProperties',
        value: function _initializeInstanceProperties(props) {
          Object.assign(this, props);
        }

        /**
         * Updates the local storage for a property (via `_setPendingProperty`)
         * and enqueues a `_proeprtiesChanged` callback.
         *
         * @param {string} property Name of the property
         * @param {*} value Value to set
         * @return {void}
         * @protected
         */

      }, {
        key: '_setProperty',
        value: function _setProperty(property, value) {
          if (this._setPendingProperty(property, value)) {
            this._invalidateProperties();
          }
        }

        /**
         * Returns the value for the given property.
         * @param {string} property Name of property
         * @return {*} Value for the given property
         * @protected
         */

      }, {
        key: '_getProperty',
        value: function _getProperty(property) {
          return this.__data[property];
        }

        /* eslint-disable no-unused-vars */
        /**
         * Updates the local storage for a property, records the previous value,
         * and adds it to the set of "pending changes" that will be passed to the
         * `_propertiesChanged` callback.  This method does not enqueue the
         * `_propertiesChanged` callback.
         *
         * @param {string} property Name of the property
         * @param {*} value Value to set
         * @param {boolean=} ext Not used here; affordance for closure
         * @return {boolean} Returns true if the property changed
         * @protected
         */

      }, {
        key: '_setPendingProperty',
        value: function _setPendingProperty(property, value, ext) {
          var old = this.__data[property];
          var changed = this._shouldPropertyChange(property, value, old);
          if (changed) {
            if (!this.__dataPending) {
              this.__dataPending = {};
              this.__dataOld = {};
            }
            // Ensure old is captured from the last turn
            if (this.__dataOld && !(property in this.__dataOld)) {
              this.__dataOld[property] = old;
            }
            this.__data[property] = value;
            this.__dataPending[property] = value;
          }
          return changed;
        }
        /* eslint-enable */

        /**
         * Marks the properties as invalid, and enqueues an async
         * `_propertiesChanged` callback.
         *
         * @return {void}
         * @protected
         */

      }, {
        key: '_invalidateProperties',
        value: function _invalidateProperties() {
          var _this2 = this;

          if (!this.__dataInvalid && this.__dataReady) {
            this.__dataInvalid = true;
            microtask.run(function () {
              if (_this2.__dataInvalid) {
                _this2.__dataInvalid = false;
                _this2._flushProperties();
              }
            });
          }
        }

        /**
         * Call to enable property accessor processing. Before this method is
         * called accessor values will be set but side effects are
         * queued. When called, any pending side effects occur immediately.
         * For elements, generally `connectedCallback` is a normal spot to do so.
         * It is safe to call this method multiple times as it only turns on
         * property accessors once.
         *
         * @return {void}
         * @protected
         */

      }, {
        key: '_enableProperties',
        value: function _enableProperties() {
          if (!this.__dataEnabled) {
            this.__dataEnabled = true;
            if (this.__dataInstanceProps) {
              this._initializeInstanceProperties(this.__dataInstanceProps);
              this.__dataInstanceProps = null;
            }
            this.ready();
          }
        }

        /**
         * Calls the `_propertiesChanged` callback with the current set of
         * pending changes (and old values recorded when pending changes were
         * set), and resets the pending set of changes. Generally, this method
         * should not be called in user code.
         *
         * @return {void}
         * @protected
         */

      }, {
        key: '_flushProperties',
        value: function _flushProperties() {
          var props = this.__data;
          var changedProps = this.__dataPending;
          var old = this.__dataOld;
          if (this._shouldPropertiesChange(props, changedProps, old)) {
            this.__dataPending = null;
            this.__dataOld = null;
            this._propertiesChanged(props, changedProps, old);
          }
        }

        /**
         * Called in `_flushProperties` to determine if `_propertiesChanged`
         * should be called. The default implementation returns true if
         * properties are pending. Override to customize when
         * `_propertiesChanged` is called.
         * @param {!Object} currentProps Bag of all current accessor values
         * @param {!Object} changedProps Bag of properties changed since the last
         *   call to `_propertiesChanged`
         * @param {!Object} oldProps Bag of previous values for each property
         *   in `changedProps`
         * @return {boolean} true if changedProps is truthy
         */

      }, {
        key: '_shouldPropertiesChange',
        value: function _shouldPropertiesChange(currentProps, changedProps, oldProps) {
          // eslint-disable-line no-unused-vars
          return Boolean(changedProps);
        }

        /**
         * Callback called when any properties with accessors created via
         * `_createPropertyAccessor` have been set.
         *
         * @param {!Object} currentProps Bag of all current accessor values
         * @param {!Object} changedProps Bag of properties changed since the last
         *   call to `_propertiesChanged`
         * @param {!Object} oldProps Bag of previous values for each property
         *   in `changedProps`
         * @return {void}
         * @protected
         */

      }, {
        key: '_propertiesChanged',
        value: function _propertiesChanged(currentProps, changedProps, oldProps) {} // eslint-disable-line no-unused-vars


        /**
         * Method called to determine whether a property value should be
         * considered as a change and cause the `_propertiesChanged` callback
         * to be enqueued.
         *
         * The default implementation returns `true` if a strict equality
         * check fails. The method always returns false for `NaN`.
         *
         * Override this method to e.g. provide stricter checking for
         * Objects/Arrays when using immutable patterns.
         *
         * @param {string} property Property name
         * @param {*} value New property value
         * @param {*} old Previous property value
         * @return {boolean} Whether the property should be considered a change
         *   and enqueue a `_proeprtiesChanged` callback
         * @protected
         */

      }, {
        key: '_shouldPropertyChange',
        value: function _shouldPropertyChange(property, value, old) {
          return (
            // Strict equality check
            old !== value && (
            // This ensures (old==NaN, value==NaN) always returns false
            old === old || value === value)
          );
        }

        /**
         * Implements native Custom Elements `attributeChangedCallback` to
         * set an attribute value to a property via `_attributeToProperty`.
         *
         * @param {string} name Name of attribute that changed
         * @param {?string} old Old attribute value
         * @param {?string} value New attribute value
         * @param {?string} namespace Attribute namespace.
         * @return {void}
         * @suppress {missingProperties} Super may or may not implement the callback
         */

      }, {
        key: 'attributeChangedCallback',
        value: function attributeChangedCallback(name, old, value, namespace) {
          if (old !== value) {
            this._attributeToProperty(name, value);
          }
          if (get(PropertiesChanged.prototype.__proto__ || Object.getPrototypeOf(PropertiesChanged.prototype), 'attributeChangedCallback', this)) {
            get(PropertiesChanged.prototype.__proto__ || Object.getPrototypeOf(PropertiesChanged.prototype), 'attributeChangedCallback', this).call(this, name, old, value, namespace);
          }
        }

        /**
         * Deserializes an attribute to its associated property.
         *
         * This method calls the `_deserializeValue` method to convert the string to
         * a typed value.
         *
         * @param {string} attribute Name of attribute to deserialize.
         * @param {?string} value of the attribute.
         * @param {*=} type type to deserialize to, defaults to the value
         * returned from `typeForProperty`
         * @return {void}
         */

      }, {
        key: '_attributeToProperty',
        value: function _attributeToProperty(attribute, value, type) {
          if (!this.__serializing) {
            var map = this.__dataAttributes;
            var property = map && map[attribute] || attribute;
            this[property] = this._deserializeValue(value, type || this.constructor.typeForProperty(property));
          }
        }

        /**
         * Serializes a property to its associated attribute.
         *
         * @suppress {invalidCasts} Closure can't figure out `this` is an element.
         *
         * @param {string} property Property name to reflect.
         * @param {string=} attribute Attribute name to reflect to.
         * @param {*=} value Property value to refect.
         * @return {void}
         */

      }, {
        key: '_propertyToAttribute',
        value: function _propertyToAttribute(property, attribute, value) {
          this.__serializing = true;
          value = arguments.length < 3 ? this[property] : value;
          this._valueToNodeAttribute( /** @type {!HTMLElement} */this, value, attribute || this.constructor.attributeNameForProperty(property));
          this.__serializing = false;
        }

        /**
         * Sets a typed value to an HTML attribute on a node.
         *
         * This method calls the `_serializeValue` method to convert the typed
         * value to a string.  If the `_serializeValue` method returns `undefined`,
         * the attribute will be removed (this is the default for boolean
         * type `false`).
         *
         * @param {Element} node Element to set attribute to.
         * @param {*} value Value to serialize.
         * @param {string} attribute Attribute name to serialize to.
         * @return {void}
         */

      }, {
        key: '_valueToNodeAttribute',
        value: function _valueToNodeAttribute(node, value, attribute) {
          var str = this._serializeValue(value);
          if (str === undefined) {
            node.removeAttribute(attribute);
          } else {
            node.setAttribute(attribute, str);
          }
        }

        /**
         * Converts a typed JavaScript value to a string.
         *
         * This method is called when setting JS property values to
         * HTML attributes.  Users may override this method to provide
         * serialization for custom types.
         *
         * @param {*} value Property value to serialize.
         * @return {string | undefined} String serialized from the provided
         * property  value.
         */

      }, {
        key: '_serializeValue',
        value: function _serializeValue(value) {
          switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
            case 'boolean':
              return value ? '' : undefined;
            default:
              return value != null ? value.toString() : undefined;
          }
        }

        /**
         * Converts a string to a typed JavaScript value.
         *
         * This method is called when reading HTML attribute values to
         * JS properties.  Users may override this method to provide
         * deserialization for custom `type`s. Types for `Boolean`, `String`,
         * and `Number` convert attributes to the expected types.
         *
         * @param {?string} value Value to deserialize.
         * @param {*=} type Type to deserialize the string to.
         * @return {*} Typed value deserialized from the provided string.
         */

      }, {
        key: '_deserializeValue',
        value: function _deserializeValue(value, type) {
          switch (type) {
            case Boolean:
              return value !== null;
            case Number:
              return Number(value);
            default:
              return value;
          }
        }
      }]);
      return PropertiesChanged;
    }(superClass);

    return PropertiesChanged;
  });

  /**
  @license
  Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
  This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
  The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
  The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
  Code distributed by Google as part of the polymer project is also
  subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
  */

  /**
   * Creates a copy of `props` with each property normalized such that
   * upgraded it is an object with at least a type property { type: Type}.
   *
   * @param {Object} props Properties to normalize
   * @return {Object} Copy of input `props` with normalized properties that
   * are in the form {type: Type}
   * @private
   */
  function normalizeProperties(props) {
    var output = {};
    for (var p in props) {
      var o = props[p];
      output[p] = typeof o === 'function' ? { type: o } : o;
    }
    return output;
  }

  /**
   * Mixin that provides a minimal starting point to using the PropertiesChanged
   * mixin by providing a mechanism to declare properties in a static
   * getter (e.g. static get properties() { return { foo: String } }). Changes
   * are reported via the `_propertiesChanged` method.
   *
   * This mixin provides no specific support for rendering. Users are expected
   * to create a ShadowRoot and put content into it and update it in whatever
   * way makes sense. This can be done in reaction to properties changing by
   * implementing `_propertiesChanged`.
   *
   * @mixinFunction
   * @polymer
   * @appliesMixin PropertiesChanged
   * @summary Mixin that provides a minimal starting point for using
   * the PropertiesChanged mixin by providing a declarative `properties` object.
   */
  var PropertiesMixin = dedupingMixin(function (superClass) {

    /**
     * @constructor
     * @extends {superClass}
     * @implements {Polymer_PropertiesChanged}
     */
    var base = PropertiesChanged(superClass);

    /**
     * Returns the super class constructor for the given class, if it is an
     * instance of the PropertiesMixin.
     *
     * @param {!PropertiesMixinConstructor} constructor PropertiesMixin constructor
     * @return {PropertiesMixinConstructor} Super class constructor
     */
    function superPropertiesClass(constructor) {
      var superCtor = Object.getPrototypeOf(constructor);

      // Note, the `PropertiesMixin` class below only refers to the class
      // generated by this call to the mixin; the instanceof test only works
      // because the mixin is deduped and guaranteed only to apply once, hence
      // all constructors in a proto chain will see the same `PropertiesMixin`
      return superCtor.prototype instanceof PropertiesMixin ?
      /** @type {PropertiesMixinConstructor} */superCtor : null;
    }

    /**
     * Returns a memoized version of the `properties` object for the
     * given class. Properties not in object format are converted to at
     * least {type}.
     *
     * @param {PropertiesMixinConstructor} constructor PropertiesMixin constructor
     * @return {Object} Memoized properties object
     */
    function ownProperties(constructor) {
      if (!constructor.hasOwnProperty(JSCompiler_renameProperty('__ownProperties', constructor))) {
        var props = null;

        if (constructor.hasOwnProperty(JSCompiler_renameProperty('properties', constructor)) && constructor.properties) {
          props = normalizeProperties(constructor.properties);
        }

        constructor.__ownProperties = props;
      }
      return constructor.__ownProperties;
    }

    /**
     * @polymer
     * @mixinClass
     * @extends {base}
     * @implements {Polymer_PropertiesMixin}
     * @unrestricted
     */

    var PropertiesMixin = function (_base) {
      inherits(PropertiesMixin, _base);

      function PropertiesMixin() {
        classCallCheck(this, PropertiesMixin);
        return possibleConstructorReturn(this, (PropertiesMixin.__proto__ || Object.getPrototypeOf(PropertiesMixin)).apply(this, arguments));
      }

      createClass(PropertiesMixin, [{
        key: '_initializeProperties',


        /**
         * Overrides `PropertiesChanged` method and adds a call to
         * `finalize` which lazily configures the element's property accessors.
         * @override
         * @return {void}
         */
        value: function _initializeProperties() {
          this.constructor.finalize();
          get(PropertiesMixin.prototype.__proto__ || Object.getPrototypeOf(PropertiesMixin.prototype), '_initializeProperties', this).call(this);
        }

        /**
         * Called when the element is added to a document.
         * Calls `_enableProperties` to turn on property system from
         * `PropertiesChanged`.
         * @suppress {missingProperties} Super may or may not implement the callback
         * @return {void}
         */

      }, {
        key: 'connectedCallback',
        value: function connectedCallback() {
          if (get(PropertiesMixin.prototype.__proto__ || Object.getPrototypeOf(PropertiesMixin.prototype), 'connectedCallback', this)) {
            get(PropertiesMixin.prototype.__proto__ || Object.getPrototypeOf(PropertiesMixin.prototype), 'connectedCallback', this).call(this);
          }
          this._enableProperties();
        }

        /**
         * Called when the element is removed from a document
         * @suppress {missingProperties} Super may or may not implement the callback
         * @return {void}
         */

      }, {
        key: 'disconnectedCallback',
        value: function disconnectedCallback() {
          if (get(PropertiesMixin.prototype.__proto__ || Object.getPrototypeOf(PropertiesMixin.prototype), 'disconnectedCallback', this)) {
            get(PropertiesMixin.prototype.__proto__ || Object.getPrototypeOf(PropertiesMixin.prototype), 'disconnectedCallback', this).call(this);
          }
        }
      }], [{
        key: 'finalize',


        /**
         * Finalizes an element definition, including ensuring any super classes
         * are also finalized. This includes ensuring property
         * accessors exist on the element prototype. This method calls
         * `_finalizeClass` to finalize each constructor in the prototype chain.
         * @return {void}
         */
        value: function finalize() {
          if (!this.hasOwnProperty(JSCompiler_renameProperty('__finalized', this))) {
            var superCtor = superPropertiesClass( /** @type {PropertiesMixinConstructor} */this);
            if (superCtor) {
              superCtor.finalize();
            }
            this.__finalized = true;
            this._finalizeClass();
          }
        }

        /**
         * Finalize an element class. This includes ensuring property
         * accessors exist on the element prototype. This method is called by
         * `finalize` and finalizes the class constructor.
         *
         * @protected
         */

      }, {
        key: '_finalizeClass',
        value: function _finalizeClass() {
          var props = ownProperties( /** @type {PropertiesMixinConstructor} */this);
          if (props) {
            this.createProperties(props);
          }
        }

        /**
         * Returns a memoized version of all properties, including those inherited
         * from super classes. Properties not in object format are converted to
         * at least {type}.
         *
         * @return {Object} Object containing properties for this class
         * @protected
         */

      }, {
        key: 'typeForProperty',


        /**
         * Overrides `PropertiesChanged` method to return type specified in the
         * static `properties` object for the given property.
         * @param {string} name Name of property
         * @return {*} Type to which to deserialize attribute
         *
         * @protected
         */
        value: function typeForProperty(name) {
          var info = this._properties[name];
          return info && info.type;
        }
      }, {
        key: 'observedAttributes',


        /**
         * Implements standard custom elements getter to observes the attributes
         * listed in `properties`.
         * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
         */
        get: function get$$1() {
          var _this2 = this;

          var props = this._properties;
          return props ? Object.keys(props).map(function (p) {
            return _this2.attributeNameForProperty(p);
          }) : [];
        }
      }, {
        key: '_properties',
        get: function get$$1() {
          if (!this.hasOwnProperty(JSCompiler_renameProperty('__properties', this))) {
            var superCtor = superPropertiesClass( /** @type {PropertiesMixinConstructor} */this);
            this.__properties = Object.assign({}, superCtor && superCtor._properties, ownProperties( /** @type {PropertiesMixinConstructor} */this));
          }
          return this.__properties;
        }
      }]);
      return PropertiesMixin;
    }(base);

    return PropertiesMixin;
  });

  /**
  @license
  Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
  This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
  The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
  The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
  Code distributed by Google as part of the polymer project is also
  subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
  */

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  // The first argument to JS template tags retain identity across multiple
  // calls to a tag for the same literal, so we can cache work done per literal
  // in a Map.
  var templateCaches = new Map();
  /**
   * The return type of `html`, which holds a Template and the values from
   * interpolated expressions.
   */
  var TemplateResult = function () {
      function TemplateResult(strings, values, type) {
          var partCallback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultPartCallback;
          classCallCheck(this, TemplateResult);

          this.strings = strings;
          this.values = values;
          this.type = type;
          this.partCallback = partCallback;
      }
      /**
       * Returns a string of HTML used to create a <template> element.
       */


      createClass(TemplateResult, [{
          key: 'getHTML',
          value: function getHTML() {
              var l = this.strings.length - 1;
              var html = '';
              var isTextBinding = true;
              for (var i = 0; i < l; i++) {
                  var s = this.strings[i];
                  html += s;
                  // We're in a text position if the previous string closed its tags.
                  // If it doesn't have any tags, then we use the previous text position
                  // state.
                  var closing = findTagClose(s);
                  isTextBinding = closing > -1 ? closing < s.length : isTextBinding;
                  html += isTextBinding ? nodeMarker : marker;
              }
              html += this.strings[l];
              return html;
          }
      }, {
          key: 'getTemplateElement',
          value: function getTemplateElement() {
              var template = document.createElement('template');
              template.innerHTML = this.getHTML();
              return template;
          }
      }]);
      return TemplateResult;
  }();
  /**
   * A TemplateResult for SVG fragments.
   *
   * This class wraps HTMl in an <svg> tag in order to parse its contents in the
   * SVG namespace, then modifies the template to remove the <svg> tag so that
   * clones only container the original fragment.
   */
  var SVGTemplateResult = function (_TemplateResult) {
      inherits(SVGTemplateResult, _TemplateResult);

      function SVGTemplateResult() {
          classCallCheck(this, SVGTemplateResult);
          return possibleConstructorReturn(this, (SVGTemplateResult.__proto__ || Object.getPrototypeOf(SVGTemplateResult)).apply(this, arguments));
      }

      createClass(SVGTemplateResult, [{
          key: 'getHTML',
          value: function getHTML() {
              return '<svg>' + get(SVGTemplateResult.prototype.__proto__ || Object.getPrototypeOf(SVGTemplateResult.prototype), 'getHTML', this).call(this) + '</svg>';
          }
      }, {
          key: 'getTemplateElement',
          value: function getTemplateElement() {
              var template = get(SVGTemplateResult.prototype.__proto__ || Object.getPrototypeOf(SVGTemplateResult.prototype), 'getTemplateElement', this).call(this);
              var content = template.content;
              var svgElement = content.firstChild;
              content.removeChild(svgElement);
              reparentNodes(content, svgElement.firstChild);
              return template;
          }
      }]);
      return SVGTemplateResult;
  }(TemplateResult);
  /**
   * An expression marker with embedded unique key to avoid collision with
   * possible text in templates.
   */
  var marker = '{{lit-' + String(Math.random()).slice(2) + '}}';
  /**
   * An expression marker used text-positions, not attribute positions,
   * in template.
   */
  var nodeMarker = '<!--' + marker + '-->';
  var markerRegex = new RegExp(marker + '|' + nodeMarker);
  /**
   * This regex extracts the attribute name preceding an attribute-position
   * expression. It does this by matching the syntax allowed for attributes
   * against the string literal directly preceding the expression, assuming that
   * the expression is in an attribute-value position.
   *
   * See attributes in the HTML spec:
   * https://www.w3.org/TR/html5/syntax.html#attributes-0
   *
   * "\0-\x1F\x7F-\x9F" are Unicode control characters
   *
   * " \x09\x0a\x0c\x0d" are HTML space characters:
   * https://www.w3.org/TR/html5/infrastructure.html#space-character
   *
   * So an attribute is:
   *  * The name: any character except a control character, space character, ('),
   *    ("), ">", "=", or "/"
   *  * Followed by zero or more space characters
   *  * Followed by "="
   *  * Followed by zero or more space characters
   *  * Followed by:
   *    * Any character except space, ('), ("), "<", ">", "=", (`), or
   *    * (") then any non-("), or
   *    * (') then any non-(')
   */
  var lastAttributeNameRegex = /[ \x09\x0a\x0c\x0d]([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=/]+)[ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*)$/;
  /**
   * Finds the closing index of the last closed HTML tag.
   * This has 3 possible return values:
   *   - `-1`, meaning there is no tag in str.
   *   - `string.length`, meaning the last opened tag is unclosed.
   *   - Some positive number < str.length, meaning the index of the closing '>'.
   */
  function findTagClose(str) {
      var close = str.lastIndexOf('>');
      var open = str.indexOf('<', close + 1);
      return open > -1 ? str.length : close;
  }
  /**
   * A placeholder for a dynamic expression in an HTML template.
   *
   * There are two built-in part types: AttributePart and NodePart. NodeParts
   * always represent a single dynamic expression, while AttributeParts may
   * represent as many expressions are contained in the attribute.
   *
   * A Template's parts are mutable, so parts can be replaced or modified
   * (possibly to implement different template semantics). The contract is that
   * parts can only be replaced, not removed, added or reordered, and parts must
   * always consume the correct number of values in their `update()` method.
   *
   * TODO(justinfagnani): That requirement is a little fragile. A
   * TemplateInstance could instead be more careful about which values it gives
   * to Part.update().
   */
  var TemplatePart = function TemplatePart(type, index, name, rawName, strings) {
      classCallCheck(this, TemplatePart);

      this.type = type;
      this.index = index;
      this.name = name;
      this.rawName = rawName;
      this.strings = strings;
  };
  var isTemplatePartActive = function isTemplatePartActive(part) {
      return part.index !== -1;
  };
  /**
   * An updateable Template that tracks the location of dynamic parts.
   */
  var Template = function Template(result, element) {
      classCallCheck(this, Template);

      this.parts = [];
      this.element = element;
      var content = this.element.content;
      // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
      var walker = document.createTreeWalker(content, 133 /* NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT |
                                                          NodeFilter.SHOW_TEXT */, null, false);
      var index = -1;
      var partIndex = 0;
      var nodesToRemove = [];
      // The actual previous node, accounting for removals: if a node is removed
      // it will never be the previousNode.
      var previousNode = void 0;
      // Used to set previousNode at the top of the loop.
      var currentNode = void 0;
      while (walker.nextNode()) {
          index++;
          previousNode = currentNode;
          var node = currentNode = walker.currentNode;
          if (node.nodeType === 1 /* Node.ELEMENT_NODE */) {
                  if (!node.hasAttributes()) {
                      continue;
                  }
                  var attributes = node.attributes;
                  // Per https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
                  // attributes are not guaranteed to be returned in document order. In
                  // particular, Edge/IE can return them out of order, so we cannot assume
                  // a correspondance between part index and attribute index.
                  var count = 0;
                  for (var i = 0; i < attributes.length; i++) {
                      if (attributes[i].value.indexOf(marker) >= 0) {
                          count++;
                      }
                  }
                  while (count-- > 0) {
                      // Get the template literal section leading up to the first
                      // expression in this attribute
                      var stringForPart = result.strings[partIndex];
                      // Find the attribute name
                      var attributeNameInPart = lastAttributeNameRegex.exec(stringForPart)[1];
                      // Find the corresponding attribute
                      // TODO(justinfagnani): remove non-null assertion
                      var attribute = attributes.getNamedItem(attributeNameInPart);
                      var stringsForAttributeValue = attribute.value.split(markerRegex);
                      this.parts.push(new TemplatePart('attribute', index, attribute.name, attributeNameInPart, stringsForAttributeValue));
                      node.removeAttribute(attribute.name);
                      partIndex += stringsForAttributeValue.length - 1;
                  }
              } else if (node.nodeType === 3 /* Node.TEXT_NODE */) {
                  var nodeValue = node.nodeValue;
                  if (nodeValue.indexOf(marker) < 0) {
                      continue;
                  }
                  var parent = node.parentNode;
                  var strings = nodeValue.split(markerRegex);
                  var lastIndex = strings.length - 1;
                  // We have a part for each match found
                  partIndex += lastIndex;
                  // Generate a new text node for each literal section
                  // These nodes are also used as the markers for node parts
                  for (var _i = 0; _i < lastIndex; _i++) {
                      parent.insertBefore(strings[_i] === '' ? document.createComment('') : document.createTextNode(strings[_i]), node);
                      this.parts.push(new TemplatePart('node', index++));
                  }
                  parent.insertBefore(strings[lastIndex] === '' ? document.createComment('') : document.createTextNode(strings[lastIndex]), node);
                  nodesToRemove.push(node);
              } else if (node.nodeType === 8 /* Node.COMMENT_NODE */ && node.nodeValue === marker) {
              var _parent = node.parentNode;
              // Add a new marker node to be the startNode of the Part if any of the
              // following are true:
              //  * We don't have a previousSibling
              //  * previousSibling is being removed (thus it's not the
              //    `previousNode`)
              //  * previousSibling is not a Text node
              //
              // TODO(justinfagnani): We should be able to use the previousNode here
              // as the marker node and reduce the number of extra nodes we add to a
              // template. See https://github.com/PolymerLabs/lit-html/issues/147
              var previousSibling = node.previousSibling;
              if (previousSibling === null || previousSibling !== previousNode || previousSibling.nodeType !== Node.TEXT_NODE) {
                  _parent.insertBefore(document.createComment(''), node);
              } else {
                  index--;
              }
              this.parts.push(new TemplatePart('node', index++));
              nodesToRemove.push(node);
              // If we don't have a nextSibling add a marker node.
              // We don't have to check if the next node is going to be removed,
              // because that node will induce a new marker if so.
              if (node.nextSibling === null) {
                  _parent.insertBefore(document.createComment(''), node);
              } else {
                  index--;
              }
              currentNode = previousNode;
              partIndex++;
          }
      }
      // Remove text binding nodes after the walk to not disturb the TreeWalker
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
          for (var _iterator = nodesToRemove[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var n = _step.value;

              n.parentNode.removeChild(n);
          }
      } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
      } finally {
          try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
              }
          } finally {
              if (_didIteratorError) {
                  throw _iteratorError;
              }
          }
      }
  };
  /**
   * Returns a value ready to be inserted into a Part from a user-provided value.
   *
   * If the user value is a directive, this invokes the directive with the given
   * part. If the value is null, it's converted to undefined to work better
   * with certain DOM APIs, like textContent.
   */
  var getValue = function getValue(part, value) {
      // `null` as the value of a Text node will render the string 'null'
      // so we convert it to undefined
      if (isDirective(value)) {
          value = value(part);
          return noChange;
      }
      return value === null ? undefined : value;
  };
  var isDirective = function isDirective(o) {
      return typeof o === 'function' && o.__litDirective === true;
  };
  /**
   * A sentinel value that signals that a value was handled by a directive and
   * should not be written to the DOM.
   */
  var noChange = {};
  var isPrimitiveValue = function isPrimitiveValue(value) {
      return value === null || !((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' || typeof value === 'function');
  };
  var AttributePart = function () {
      function AttributePart(instance, element, name, strings) {
          classCallCheck(this, AttributePart);

          this.instance = instance;
          this.element = element;
          this.name = name;
          this.strings = strings;
          this.size = strings.length - 1;
          this._previousValues = [];
      }

      createClass(AttributePart, [{
          key: '_interpolate',
          value: function _interpolate(values, startIndex) {
              var strings = this.strings;
              var l = strings.length - 1;
              var text = '';
              for (var i = 0; i < l; i++) {
                  text += strings[i];
                  var v = getValue(this, values[startIndex + i]);
                  if (v && v !== noChange && (Array.isArray(v) || typeof v !== 'string' && v[Symbol.iterator])) {
                      var _iteratorNormalCompletion2 = true;
                      var _didIteratorError2 = false;
                      var _iteratorError2 = undefined;

                      try {
                          for (var _iterator2 = v[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                              var t = _step2.value;

                              // TODO: we need to recursively call getValue into iterables...
                              text += t;
                          }
                      } catch (err) {
                          _didIteratorError2 = true;
                          _iteratorError2 = err;
                      } finally {
                          try {
                              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                  _iterator2.return();
                              }
                          } finally {
                              if (_didIteratorError2) {
                                  throw _iteratorError2;
                              }
                          }
                      }
                  } else {
                      text += v;
                  }
              }
              return text + strings[l];
          }
      }, {
          key: '_equalToPreviousValues',
          value: function _equalToPreviousValues(values, startIndex) {
              for (var i = startIndex; i < startIndex + this.size; i++) {
                  if (this._previousValues[i] !== values[i] || !isPrimitiveValue(values[i])) {
                      return false;
                  }
              }
              return true;
          }
      }, {
          key: 'setValue',
          value: function setValue(values, startIndex) {
              if (this._equalToPreviousValues(values, startIndex)) {
                  return;
              }
              var s = this.strings;
              var value = void 0;
              if (s.length === 2 && s[0] === '' && s[1] === '') {
                  // An expression that occupies the whole attribute value will leave
                  // leading and trailing empty strings.
                  value = getValue(this, values[startIndex]);
                  if (Array.isArray(value)) {
                      value = value.join('');
                  }
              } else {
                  value = this._interpolate(values, startIndex);
              }
              if (value !== noChange) {
                  this.element.setAttribute(this.name, value);
              }
              this._previousValues = values;
          }
      }]);
      return AttributePart;
  }();
  var NodePart = function () {
      function NodePart(instance, startNode, endNode) {
          classCallCheck(this, NodePart);

          this.instance = instance;
          this.startNode = startNode;
          this.endNode = endNode;
          this._previousValue = undefined;
      }

      createClass(NodePart, [{
          key: 'setValue',
          value: function setValue(value) {
              value = getValue(this, value);
              if (value === noChange) {
                  return;
              }
              if (isPrimitiveValue(value)) {
                  // Handle primitive values
                  // If the value didn't change, do nothing
                  if (value === this._previousValue) {
                      return;
                  }
                  this._setText(value);
              } else if (value instanceof TemplateResult) {
                  this._setTemplateResult(value);
              } else if (Array.isArray(value) || value[Symbol.iterator]) {
                  this._setIterable(value);
              } else if (value instanceof Node) {
                  this._setNode(value);
              } else if (value.then !== undefined) {
                  this._setPromise(value);
              } else {
                  // Fallback, will render the string representation
                  this._setText(value);
              }
          }
      }, {
          key: '_insert',
          value: function _insert(node) {
              this.endNode.parentNode.insertBefore(node, this.endNode);
          }
      }, {
          key: '_setNode',
          value: function _setNode(value) {
              if (this._previousValue === value) {
                  return;
              }
              this.clear();
              this._insert(value);
              this._previousValue = value;
          }
      }, {
          key: '_setText',
          value: function _setText(value) {
              var node = this.startNode.nextSibling;
              value = value === undefined ? '' : value;
              if (node === this.endNode.previousSibling && node.nodeType === Node.TEXT_NODE) {
                  // If we only have a single text node between the markers, we can just
                  // set its value, rather than replacing it.
                  // TODO(justinfagnani): Can we just check if _previousValue is
                  // primitive?
                  node.textContent = value;
              } else {
                  this._setNode(document.createTextNode(value));
              }
              this._previousValue = value;
          }
      }, {
          key: '_setTemplateResult',
          value: function _setTemplateResult(value) {
              var template = this.instance._getTemplate(value);
              var instance = void 0;
              if (this._previousValue && this._previousValue.template === template) {
                  instance = this._previousValue;
              } else {
                  instance = new TemplateInstance(template, this.instance._partCallback, this.instance._getTemplate);
                  this._setNode(instance._clone());
                  this._previousValue = instance;
              }
              instance.update(value.values);
          }
      }, {
          key: '_setIterable',
          value: function _setIterable(value) {
              // For an Iterable, we create a new InstancePart per item, then set its
              // value to the item. This is a little bit of overhead for every item in
              // an Iterable, but it lets us recurse easily and efficiently update Arrays
              // of TemplateResults that will be commonly returned from expressions like:
              // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
              // If _previousValue is an array, then the previous render was of an
              // iterable and _previousValue will contain the NodeParts from the previous
              // render. If _previousValue is not an array, clear this part and make a new
              // array for NodeParts.
              if (!Array.isArray(this._previousValue)) {
                  this.clear();
                  this._previousValue = [];
              }
              // Lets us keep track of how many items we stamped so we can clear leftover
              // items from a previous render
              var itemParts = this._previousValue;
              var partIndex = 0;
              var _iteratorNormalCompletion3 = true;
              var _didIteratorError3 = false;
              var _iteratorError3 = undefined;

              try {
                  for (var _iterator3 = value[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                      var item = _step3.value;

                      // Try to reuse an existing part
                      var itemPart = itemParts[partIndex];
                      // If no existing part, create a new one
                      if (itemPart === undefined) {
                          // If we're creating the first item part, it's startNode should be the
                          // container's startNode
                          var itemStart = this.startNode;
                          // If we're not creating the first part, create a new separator marker
                          // node, and fix up the previous part's endNode to point to it
                          if (partIndex > 0) {
                              var previousPart = itemParts[partIndex - 1];
                              itemStart = previousPart.endNode = document.createTextNode('');
                              this._insert(itemStart);
                          }
                          itemPart = new NodePart(this.instance, itemStart, this.endNode);
                          itemParts.push(itemPart);
                      }
                      itemPart.setValue(item);
                      partIndex++;
                  }
              } catch (err) {
                  _didIteratorError3 = true;
                  _iteratorError3 = err;
              } finally {
                  try {
                      if (!_iteratorNormalCompletion3 && _iterator3.return) {
                          _iterator3.return();
                      }
                  } finally {
                      if (_didIteratorError3) {
                          throw _iteratorError3;
                      }
                  }
              }

              if (partIndex === 0) {
                  this.clear();
                  this._previousValue = undefined;
              } else if (partIndex < itemParts.length) {
                  var lastPart = itemParts[partIndex - 1];
                  // Truncate the parts array so _previousValue reflects the current state
                  itemParts.length = partIndex;
                  this.clear(lastPart.endNode.previousSibling);
                  lastPart.endNode = this.endNode;
              }
          }
      }, {
          key: '_setPromise',
          value: function _setPromise(value) {
              var _this2 = this;

              this._previousValue = value;
              value.then(function (v) {
                  if (_this2._previousValue === value) {
                      _this2.setValue(v);
                  }
              });
          }
      }, {
          key: 'clear',
          value: function clear() {
              var startNode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.startNode;

              removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
          }
      }]);
      return NodePart;
  }();
  var defaultPartCallback = function defaultPartCallback(instance, templatePart, node) {
      if (templatePart.type === 'attribute') {
          return new AttributePart(instance, node, templatePart.name, templatePart.strings);
      } else if (templatePart.type === 'node') {
          return new NodePart(instance, node, node.nextSibling);
      }
      throw new Error('Unknown part type ' + templatePart.type);
  };
  /**
   * An instance of a `Template` that can be attached to the DOM and updated
   * with new values.
   */
  var TemplateInstance = function () {
      function TemplateInstance(template, partCallback, getTemplate) {
          classCallCheck(this, TemplateInstance);

          this._parts = [];
          this.template = template;
          this._partCallback = partCallback;
          this._getTemplate = getTemplate;
      }

      createClass(TemplateInstance, [{
          key: 'update',
          value: function update(values) {
              var valueIndex = 0;
              var _iteratorNormalCompletion4 = true;
              var _didIteratorError4 = false;
              var _iteratorError4 = undefined;

              try {
                  for (var _iterator4 = this._parts[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                      var part = _step4.value;

                      if (!part) {
                          valueIndex++;
                      } else if (part.size === undefined) {
                          part.setValue(values[valueIndex]);
                          valueIndex++;
                      } else {
                          part.setValue(values, valueIndex);
                          valueIndex += part.size;
                      }
                  }
              } catch (err) {
                  _didIteratorError4 = true;
                  _iteratorError4 = err;
              } finally {
                  try {
                      if (!_iteratorNormalCompletion4 && _iterator4.return) {
                          _iterator4.return();
                      }
                  } finally {
                      if (_didIteratorError4) {
                          throw _iteratorError4;
                      }
                  }
              }
          }
      }, {
          key: '_clone',
          value: function _clone() {
              // Clone the node, rather than importing it, to keep the fragment in the
              // template's document. This leaves the fragment inert so custom elements
              // won't upgrade until after the main document adopts the node.
              var fragment = this.template.element.content.cloneNode(true);
              var parts = this.template.parts;
              if (parts.length > 0) {
                  // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be
                  // null
                  var _walker = document.createTreeWalker(fragment, 133 /* NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT |
                                                                        NodeFilter.SHOW_TEXT */, null, false);
                  var _index = -1;
                  for (var i = 0; i < parts.length; i++) {
                      var part = parts[i];
                      var partActive = isTemplatePartActive(part);
                      // An inactive part has no coresponding Template node.
                      if (partActive) {
                          while (_index < part.index) {
                              _index++;
                              _walker.nextNode();
                          }
                      }
                      this._parts.push(partActive ? this._partCallback(this, part, _walker.currentNode) : undefined);
                  }
              }
              return fragment;
          }
      }]);
      return TemplateInstance;
  }();
  /**
   * Reparents nodes, starting from `startNode` (inclusive) to `endNode`
   * (exclusive), into another container (could be the same container), before
   * `beforeNode`. If `beforeNode` is null, it appends the nodes to the
   * container.
   */
  var reparentNodes = function reparentNodes(container, start) {
      var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var before = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

      var node = start;
      while (node !== end) {
          var n = node.nextSibling;
          container.insertBefore(node, before);
          node = n;
      }
  };
  /**
   * Removes nodes, starting from `startNode` (inclusive) to `endNode`
   * (exclusive), from `container`.
   */
  var removeNodes = function removeNodes(container, startNode) {
      var endNode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var node = startNode;
      while (node !== endNode) {
          var n = node.nextSibling;
          container.removeChild(node);
          node = n;
      }
  };

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  var walkerNodeFilter = NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT;
  /**
   * Removes the list of nodes from a Template safely. In addition to removing
   * nodes from the Template, the Template part indices are updated to match
   * the mutated Template DOM.
   *
   * As the template is walked the removal state is tracked and
   * part indices are adjusted as needed.
   *
   * div
   *   div#1 (remove) <-- start removing (removing node is div#1)
   *     div
   *       div#2 (remove)  <-- continue removing (removing node is still div#1)
   *         div
   * div <-- stop removing since previous sibling is the removing node (div#1, removed 4 nodes)
   */
  function removeNodesFromTemplate(template, nodesToRemove) {
      var content = template.element.content,
          parts = template.parts;

      var walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
      var partIndex = 0;
      var part = parts[0];
      var nodeIndex = -1;
      var removeCount = 0;
      var nodesToRemoveInTemplate = [];
      var currentRemovingNode = null;
      while (walker.nextNode()) {
          nodeIndex++;
          var node = walker.currentNode;
          // End removal if stepped past the removing node
          if (node.previousSibling === currentRemovingNode) {
              currentRemovingNode = null;
          }
          // A node to remove was found in the template
          if (nodesToRemove.has(node)) {
              nodesToRemoveInTemplate.push(node);
              // Track node we're removing
              if (currentRemovingNode === null) {
                  currentRemovingNode = node;
              }
          }
          // When removing, increment count by which to adjust subsequent part indices
          if (currentRemovingNode !== null) {
              removeCount++;
          }
          while (part !== undefined && part.index === nodeIndex) {
              // If part is in a removed node deactivate it by setting index to -1 or
              // adjust the index as needed.
              part.index = currentRemovingNode !== null ? -1 : part.index - removeCount;
              part = parts[++partIndex];
          }
      }
      nodesToRemoveInTemplate.forEach(function (n) {
          return n.parentNode.removeChild(n);
      });
  }
  var countNodes = function countNodes(node) {
      var count = 1;
      var walker = document.createTreeWalker(node, walkerNodeFilter, null, false);
      while (walker.nextNode()) {
          count++;
      }
      return count;
  };
  var nextActiveIndexInTemplateParts = function nextActiveIndexInTemplateParts(parts) {
      var startIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

      for (var i = startIndex + 1; i < parts.length; i++) {
          var part = parts[i];
          if (isTemplatePartActive(part)) {
              return i;
          }
      }
      return -1;
  };
  /**
   * Inserts the given node into the Template, optionally before the given
   * refNode. In addition to inserting the node into the Template, the Template
   * part indices are updated to match the mutated Template DOM.
   */
  function insertNodeIntoTemplate(template, node) {
      var refNode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var content = template.element.content,
          parts = template.parts;
      // If there's no refNode, then put node at end of template.
      // No part indices need to be shifted in this case.

      if (refNode === null || refNode === undefined) {
          content.appendChild(node);
          return;
      }
      var walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
      var partIndex = nextActiveIndexInTemplateParts(parts);
      var insertCount = 0;
      var walkerIndex = -1;
      while (walker.nextNode()) {
          walkerIndex++;
          var walkerNode = walker.currentNode;
          if (walkerNode === refNode) {
              refNode.parentNode.insertBefore(node, refNode);
              insertCount = countNodes(node);
          }
          while (partIndex !== -1 && parts[partIndex].index === walkerIndex) {
              // If we've inserted the node, simply adjust all subsequent parts
              if (insertCount > 0) {
                  while (partIndex !== -1) {
                      parts[partIndex].index += insertCount;
                      partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
                  }
                  return;
              }
              partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
          }
      }
  }

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  // Get a key to lookup in `templateCaches`.
  var getTemplateCacheKey = function getTemplateCacheKey(type, scopeName) {
      return type + '--' + scopeName;
  };
  /**
   * Template factory which scopes template DOM using ShadyCSS.
   * @param scopeName {string}
   */
  var shadyTemplateFactory = function shadyTemplateFactory(scopeName) {
      return function (result) {
          var cacheKey = getTemplateCacheKey(result.type, scopeName);
          var templateCache = templateCaches.get(cacheKey);
          if (templateCache === undefined) {
              templateCache = new Map();
              templateCaches.set(cacheKey, templateCache);
          }
          var template = templateCache.get(result.strings);
          if (template === undefined) {
              var element = result.getTemplateElement();
              if (_typeof(window.ShadyCSS) === 'object') {
                  window.ShadyCSS.prepareTemplateDom(element, scopeName);
              }
              template = new Template(result, element);
              templateCache.set(result.strings, template);
          }
          return template;
      };
  };
  var TEMPLATE_TYPES = ['html', 'svg'];
  /**
   * Removes all style elements from Templates for the given scopeName.
   */
  function removeStylesFromLitTemplates(scopeName) {
      TEMPLATE_TYPES.forEach(function (type) {
          var templates = templateCaches.get(getTemplateCacheKey(type, scopeName));
          if (templates !== undefined) {
              templates.forEach(function (template) {
                  var content = template.element.content;

                  var styles = content.querySelectorAll('style');
                  removeNodesFromTemplate(template, new Set(Array.from(styles)));
              });
          }
      });
  }
  var shadyRenderSet = new Set();
  /**
   * For the given scope name, ensures that ShadyCSS style scoping is performed.
   * This is done just once per scope name so the fragment and template cannot
   * be modified.
   * (1) extracts styles from the rendered fragment and hands them to ShadyCSS
   * to be scoped and appended to the document
   * (2) removes style elements from all lit-html Templates for this scope name.
   *
   * Note, <style> elements can only be placed into templates for the
   * initial rendering of the scope. If <style> elements are included in templates
   * dynamically rendered to the scope (after the first scope render), they will
   * not be scoped and the <style> will be left in the template and rendered output.
   */
  var ensureStylesScoped = function ensureStylesScoped(fragment, template, scopeName) {
      // only scope element template once per scope name
      if (!shadyRenderSet.has(scopeName)) {
          shadyRenderSet.add(scopeName);
          var styleTemplate = document.createElement('template');
          Array.from(fragment.querySelectorAll('style')).forEach(function (s) {
              styleTemplate.content.appendChild(s);
          });
          window.ShadyCSS.prepareTemplateStyles(styleTemplate, scopeName);
          // Fix templates: note the expectation here is that the given `fragment`
          // has been generated from the given `template` which contains
          // the set of templates rendered into this scope.
          // It is only from this set of initial templates from which styles
          // will be scoped and removed.
          removeStylesFromLitTemplates(scopeName);
          // ApplyShim case
          if (window.ShadyCSS.nativeShadow) {
              var style = styleTemplate.content.querySelector('style');
              if (style !== null) {
                  // Insert style into rendered fragment
                  fragment.insertBefore(style, fragment.firstChild);
                  // Insert into lit-template (for subsequent renders)
                  insertNodeIntoTemplate(template, style.cloneNode(true), template.element.content.firstChild);
              }
          }
      }
  };
  // NOTE: We're copying code from lit-html's `render` method here.
  // We're doing this explicitly because the API for rendering templates is likely
  // to change in the near term.
  function render$1(result, container, scopeName) {
      var templateFactory = shadyTemplateFactory(scopeName);
      var template = templateFactory(result);
      var instance = container.__templateInstance;
      // Repeat render, just call update()
      if (instance !== undefined && instance.template === template && instance._partCallback === result.partCallback) {
          instance.update(result.values);
          return;
      }
      // First render, create a new TemplateInstance and append it
      instance = new TemplateInstance(template, result.partCallback, templateFactory);
      container.__templateInstance = instance;
      var fragment = instance._clone();
      instance.update(result.values);
      var host = container instanceof ShadowRoot ? container.host : undefined;
      // If there's a shadow host, do ShadyCSS scoping...
      if (host !== undefined && _typeof(window.ShadyCSS) === 'object') {
          ensureStylesScoped(fragment, template, scopeName);
          window.ShadyCSS.styleElement(host);
      }
      removeNodes(container, container.firstChild);
      container.appendChild(fragment);
  }

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  /**
   * Interprets a template literal as a lit-extended HTML template.
   */
  var html$1 = function html$$1(strings) {
      for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          values[_key - 1] = arguments[_key];
      }

      return new TemplateResult(strings, values, 'html', extendedPartCallback);
  };
  /**
   * A PartCallback which allows templates to set properties and declarative
   * event handlers.
   *
   * Properties are set by default, instead of attributes. Attribute names in
   * lit-html templates preserve case, so properties are case sensitive. If an
   * expression takes up an entire attribute value, then the property is set to
   * that value. If an expression is interpolated with a string or other
   * expressions then the property is set to the string result of the
   * interpolation.
   *
   * To set an attribute instead of a property, append a `$` suffix to the
   * attribute name.
   *
   * Example:
   *
   *     html`<button class$="primary">Buy Now</button>`
   *
   * To set an event handler, prefix the attribute name with `on-`:
   *
   * Example:
   *
   *     html`<button on-click=${(e)=> this.onClickHandler(e)}>Buy Now</button>`
   *
   */
  var extendedPartCallback = function extendedPartCallback(instance, templatePart, node) {
      if (templatePart.type === 'attribute') {
          if (templatePart.rawName.substr(0, 3) === 'on-') {
              var eventName = templatePart.rawName.slice(3);
              return new EventPart(instance, node, eventName);
          }
          var lastChar = templatePart.name.substr(templatePart.name.length - 1);
          if (lastChar === '$') {
              var name = templatePart.name.slice(0, -1);
              return new AttributePart(instance, node, name, templatePart.strings);
          }
          if (lastChar === '?') {
              var _name = templatePart.name.slice(0, -1);
              return new BooleanAttributePart(instance, node, _name, templatePart.strings);
          }
          return new PropertyPart(instance, node, templatePart.rawName, templatePart.strings);
      }
      return defaultPartCallback(instance, templatePart, node);
  };
  /**
   * Implements a boolean attribute, roughly as defined in the HTML
   * specification.
   *
   * If the value is truthy, then the attribute is present with a value of
   * ''. If the value is falsey, the attribute is removed.
   */
  var BooleanAttributePart = function (_AttributePart) {
      inherits(BooleanAttributePart, _AttributePart);

      function BooleanAttributePart() {
          classCallCheck(this, BooleanAttributePart);
          return possibleConstructorReturn(this, (BooleanAttributePart.__proto__ || Object.getPrototypeOf(BooleanAttributePart)).apply(this, arguments));
      }

      createClass(BooleanAttributePart, [{
          key: 'setValue',
          value: function setValue(values, startIndex) {
              var s = this.strings;
              if (s.length === 2 && s[0] === '' && s[1] === '') {
                  var value = getValue(this, values[startIndex]);
                  if (value === noChange) {
                      return;
                  }
                  if (value) {
                      this.element.setAttribute(this.name, '');
                  } else {
                      this.element.removeAttribute(this.name);
                  }
              } else {
                  throw new Error('boolean attributes can only contain a single expression');
              }
          }
      }]);
      return BooleanAttributePart;
  }(AttributePart);
  var PropertyPart = function (_AttributePart2) {
      inherits(PropertyPart, _AttributePart2);

      function PropertyPart() {
          classCallCheck(this, PropertyPart);
          return possibleConstructorReturn(this, (PropertyPart.__proto__ || Object.getPrototypeOf(PropertyPart)).apply(this, arguments));
      }

      createClass(PropertyPart, [{
          key: 'setValue',
          value: function setValue(values, startIndex) {
              var s = this.strings;
              var value = void 0;
              if (this._equalToPreviousValues(values, startIndex)) {
                  return;
              }
              if (s.length === 2 && s[0] === '' && s[1] === '') {
                  // An expression that occupies the whole attribute value will leave
                  // leading and trailing empty strings.
                  value = getValue(this, values[startIndex]);
              } else {
                  // Interpolation, so interpolate
                  value = this._interpolate(values, startIndex);
              }
              if (value !== noChange) {
                  this.element[this.name] = value;
              }
              this._previousValues = values;
          }
      }]);
      return PropertyPart;
  }(AttributePart);
  var EventPart = function () {
      function EventPart(instance, element, eventName) {
          classCallCheck(this, EventPart);

          this.instance = instance;
          this.element = element;
          this.eventName = eventName;
      }

      createClass(EventPart, [{
          key: 'setValue',
          value: function setValue(value) {
              var listener = getValue(this, value);
              if (listener === this._listener) {
                  return;
              }
              if (listener == null) {
                  this.element.removeEventListener(this.eventName, this);
              } else if (this._listener == null) {
                  this.element.addEventListener(this.eventName, this);
              }
              this._listener = listener;
          }
      }, {
          key: 'handleEvent',
          value: function handleEvent(event) {
              if (typeof this._listener === 'function') {
                  this._listener.call(this.element, event);
              } else if (typeof this._listener.handleEvent === 'function') {
                  this._listener.handleEvent(event);
              }
          }
      }]);
      return EventPart;
  }();

  /**
   * Returns a string of css class names formed by taking the properties
   * in the `classInfo` object and appending the property name to the string of
   * class names if the property value is truthy.
   * @param classInfo
   */
  function classString(classInfo) {
      var o = [];
      for (var name in classInfo) {
          var v = classInfo[name];
          if (v) {
              o.push(name);
          }
      }
      return o.join(' ');
  }
  var LitElement = function (_PropertiesMixin) {
      inherits(LitElement, _PropertiesMixin);

      function LitElement() {
          classCallCheck(this, LitElement);

          var _this = possibleConstructorReturn(this, (LitElement.__proto__ || Object.getPrototypeOf(LitElement)).apply(this, arguments));

          _this.__renderComplete = null;
          _this.__resolveRenderComplete = null;
          _this.__isInvalid = false;
          _this.__isChanging = false;
          return _this;
      }
      /**
       * Override which sets up element rendering by calling* `_createRoot`
       * and `_firstRendered`.
       */


      createClass(LitElement, [{
          key: 'ready',
          value: function ready() {
              this._root = this._createRoot();
              get(LitElement.prototype.__proto__ || Object.getPrototypeOf(LitElement.prototype), 'ready', this).call(this);
              this._firstRendered();
          }
      }, {
          key: 'connectedCallback',
          value: function connectedCallback() {
              if (window.ShadyCSS && this._root) {
                  window.ShadyCSS.styleElement(this);
              }
              get(LitElement.prototype.__proto__ || Object.getPrototypeOf(LitElement.prototype), 'connectedCallback', this).call(this);
          }
          /**
           * Called after the element DOM is rendered for the first time.
           * Implement to perform tasks after first rendering like capturing a
           * reference to a static node which must be directly manipulated.
           * This should not be commonly needed. For tasks which should be performed
           * before first render, use the element constructor.
           */

      }, {
          key: '_firstRendered',
          value: function _firstRendered() {}
          /**
           * Implement to customize where the element's template is rendered by
           * returning an element into which to render. By default this creates
           * a shadowRoot for the element. To render into the element's childNodes,
           * return `this`.
           * @returns {Element|DocumentFragment} Returns a node into which to render.
           */

      }, {
          key: '_createRoot',
          value: function _createRoot() {
              return this.attachShadow({ mode: 'open' });
          }
          /**
           * Override which returns the value of `_shouldRender` which users
           * should implement to control rendering. If this method returns false,
           * _propertiesChanged will not be called and no rendering will occur even
           * if property values change or `requestRender` is called.
           * @param _props Current element properties
           * @param _changedProps Changing element properties
           * @param _prevProps Previous element properties
           * @returns {boolean} Default implementation always returns true.
           */

      }, {
          key: '_shouldPropertiesChange',
          value: function _shouldPropertiesChange(_props, _changedProps, _prevProps) {
              var shouldRender = this._shouldRender(_props, _changedProps, _prevProps);
              if (!shouldRender && this.__resolveRenderComplete) {
                  this.__resolveRenderComplete(false);
              }
              return shouldRender;
          }
          /**
           * Implement to control if rendering should occur when property values
           * change or `requestRender` is called. By default, this method always
           * returns true, but this can be customized as an optimization to avoid
           * rendering work when changes occur which should not be rendered.
           * @param _props Current element properties
           * @param _changedProps Changing element properties
           * @param _prevProps Previous element properties
           * @returns {boolean} Default implementation always returns true.
           */

      }, {
          key: '_shouldRender',
          value: function _shouldRender(_props, _changedProps, _prevProps) {
              return true;
          }
          /**
           * Override which performs element rendering by calling
           * `_render`, `_applyRender`, and finally `_didRender`.
           * @param props Current element properties
           * @param changedProps Changing element properties
           * @param prevProps Previous element properties
           */

      }, {
          key: '_propertiesChanged',
          value: function _propertiesChanged(props, changedProps, prevProps) {
              get(LitElement.prototype.__proto__ || Object.getPrototypeOf(LitElement.prototype), '_propertiesChanged', this).call(this, props, changedProps, prevProps);
              var result = this._render(props);
              if (result && this._root !== undefined) {
                  this._applyRender(result, this._root);
              }
              this._didRender(props, changedProps, prevProps);
              if (this.__resolveRenderComplete) {
                  this.__resolveRenderComplete(true);
              }
          }
      }, {
          key: '_flushProperties',
          value: function _flushProperties() {
              this.__isChanging = true;
              this.__isInvalid = false;
              get(LitElement.prototype.__proto__ || Object.getPrototypeOf(LitElement.prototype), '_flushProperties', this).call(this);
              this.__isChanging = false;
          }
          /**
           * Override which warns when a user attempts to change a property during
           * the rendering lifecycle. This is an anti-pattern and should be avoided.
           * @param property {string}
           * @param value {any}
           * @param old {any}
           */
          // tslint:disable-next-line no-any

      }, {
          key: '_shouldPropertyChange',
          value: function _shouldPropertyChange(property, value, old) {
              var change = get(LitElement.prototype.__proto__ || Object.getPrototypeOf(LitElement.prototype), '_shouldPropertyChange', this).call(this, property, value, old);
              if (change && this.__isChanging) {
                  console.trace('Setting properties in response to other properties changing ' + ('considered harmful. Setting \'' + property + '\' from ') + ('\'' + this._getProperty(property) + '\' to \'' + value + '\'.'));
              }
              return change;
          }
          /**
           * Implement to describe the DOM which should be rendered in the element.
           * Ideally, the implementation is a pure function using only props to describe
           * the element template. The implementation must return a `lit-html`
           * TemplateResult. By default this template is rendered into the element's
           * shadowRoot. This can be customized by implementing `_createRoot`. This
           * method must be implemented.
           * @param {*} _props Current element properties
           * @returns {TemplateResult} Must return a lit-html TemplateResult.
           */

      }, {
          key: '_render',
          value: function _render(_props) {
              throw new Error('_render() not implemented');
          }
          /**
           * Renders the given lit-html template `result` into the given `node`.
           * Implement to customize the way rendering is applied. This is should not
           * typically be needed and is provided for advanced use cases.
           * @param result {TemplateResult} `lit-html` template result to render
           * @param node {Element|DocumentFragment} node into which to render
           */

      }, {
          key: '_applyRender',
          value: function _applyRender(result, node) {
              render$1(result, node, this.localName);
          }
          /**
           * Called after element DOM has been rendered. Implement to
           * directly control rendered DOM. Typically this is not needed as `lit-html`
           * can be used in the `_render` method to set properties, attributes, and
           * event listeners. However, it is sometimes useful for calling methods on
           * rendered elements, like calling `focus()` on an element to focus it.
           * @param _props Current element properties
           * @param _changedProps Changing element properties
           * @param _prevProps Previous element properties
           */

      }, {
          key: '_didRender',
          value: function _didRender(_props, _changedProps, _prevProps) {}
          /**
           * Call to request the element to asynchronously re-render regardless
           * of whether or not any property changes are pending.
           */

      }, {
          key: 'requestRender',
          value: function requestRender() {
              this._invalidateProperties();
          }
          /**
           * Override which provides tracking of invalidated state.
           */

      }, {
          key: '_invalidateProperties',
          value: function _invalidateProperties() {
              this.__isInvalid = true;
              get(LitElement.prototype.__proto__ || Object.getPrototypeOf(LitElement.prototype), '_invalidateProperties', this).call(this);
          }
          /**
           * Returns a promise which resolves after the element next renders.
           * The promise resolves to `true` if the element rendered and `false` if the
           * element did not render.
           * This is useful when users (e.g. tests) need to react to the rendered state
           * of the element after a change is made.
           * This can also be useful in event handlers if it is desireable to wait
           * to send an event until after rendering. If possible implement the
           * `_didRender` method to directly respond to rendering within the
           * rendering lifecycle.
           */

      }, {
          key: 'renderComplete',
          get: function get$$1() {
              var _this2 = this;

              if (!this.__renderComplete) {
                  this.__renderComplete = new Promise(function (resolve) {
                      _this2.__resolveRenderComplete = function (value) {
                          _this2.__resolveRenderComplete = _this2.__renderComplete = null;
                          resolve(value);
                      };
                  });
                  if (!this.__isInvalid && this.__resolveRenderComplete) {
                      Promise.resolve().then(function () {
                          return _this2.__resolveRenderComplete(false);
                      });
                  }
              }
              return this.__renderComplete;
          }
      }]);
      return LitElement;
  }(PropertiesMixin(HTMLElement));

  var _templateObject = taggedTemplateLiteral(['<style>', '</style>'], ['<style>', '</style>']),
      _templateObject2 = taggedTemplateLiteral(['\n      ', '\n      ', '\n    '], ['\n      ', '\n      ', '\n    ']);

  var withStyle = function withStyle(base) {
    for (var _len = arguments.length, styles = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      styles[_key - 1] = arguments[_key];
    }

    return function (_base) {
      inherits(_class, _base);

      function _class() {
        classCallCheck(this, _class);
        return possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
      }

      createClass(_class, [{
        key: '_renderStyles',
        value: function _renderStyles() {
          for (var _len2 = arguments.length, argv = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            argv[_key2] = arguments[_key2];
          }

          // eslint-disable-line class-methods-use-this
          return html$1(_templateObject, argv.join(' '));
        }
      }, {
        key: '_render',
        value: function _render(props) {
          return html$1(_templateObject2, this._renderStyles.apply(this, styles), get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), '_render', this).call(this, props));
        }
      }]);
      return _class;
    }(base);
  };

  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  /**
   * lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="npm" -o ./`
   * Copyright jQuery Foundation and other contributors <https://jquery.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   */

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER = 9007199254740991;

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      mapTag = '[object Map]',
      objectTag = '[object Object]',
      promiseTag = '[object Promise]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      weakMapTag = '[object WeakMap]';

  var dataViewTag = '[object DataView]';

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /** Used to compose unicode character classes. */
  var rsAstralRange = '\\ud800-\\udfff',
      rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
      rsComboSymbolsRange = '\\u20d0-\\u20f0',
      rsVarRange = '\\ufe0e\\ufe0f';

  /** Used to compose unicode capture groups. */
  var rsAstral = '[' + rsAstralRange + ']',
      rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']',
      rsFitz = '\\ud83c[\\udffb-\\udfff]',
      rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
      rsNonAstral = '[^' + rsAstralRange + ']',
      rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
      rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
      rsZWJ = '\\u200d';

  /** Used to compose unicode regexes. */
  var reOptMod = rsModifier + '?',
      rsOptVar = '[' + rsVarRange + ']?',
      rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
      rsSeq = rsOptVar + reOptMod + rsOptJoin,
      rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

  /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
  var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

  /** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
  var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange + rsComboMarksRange + rsComboSymbolsRange + rsVarRange + ']');

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = _typeof(commonjsGlobal) == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

  /** Detect free variable `self`. */
  var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = freeGlobal || freeSelf || Function('return this')();

  /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function arrayMap(array, iteratee) {
    var index = -1,
        length = array ? array.length : 0,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }

  /**
   * Converts an ASCII `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function asciiToArray(string) {
    return string.split('');
  }

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  /**
   * The base implementation of `_.values` and `_.valuesIn` which creates an
   * array of `object` property values corresponding to the property names
   * of `props`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} props The property names to get values for.
   * @returns {Object} Returns the array of property values.
   */
  function baseValues(object, props) {
    return arrayMap(props, function (key) {
      return object[key];
    });
  }

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue$1(object, key) {
    return object == null ? undefined : object[key];
  }

  /**
   * Checks if `string` contains Unicode symbols.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {boolean} Returns `true` if a symbol is found, else `false`.
   */
  function hasUnicode(string) {
    return reHasUnicode.test(string);
  }

  /**
   * Checks if `value` is a host object in IE < 9.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
   */
  function isHostObject(value) {
    // Many host objects are `Object` objects that can coerce to strings
    // despite having improperly defined `toString` methods.
    var result = false;
    if (value != null && typeof value.toString != 'function') {
      try {
        result = !!(value + '');
      } catch (e) {}
    }
    return result;
  }

  /**
   * Converts `iterator` to an array.
   *
   * @private
   * @param {Object} iterator The iterator to convert.
   * @returns {Array} Returns the converted array.
   */
  function iteratorToArray(iterator) {
    var data,
        result = [];

    while (!(data = iterator.next()).done) {
      result.push(data.value);
    }
    return result;
  }

  /**
   * Converts `map` to its key-value pairs.
   *
   * @private
   * @param {Object} map The map to convert.
   * @returns {Array} Returns the key-value pairs.
   */
  function mapToArray(map) {
    var index = -1,
        result = Array(map.size);

    map.forEach(function (value, key) {
      result[++index] = [key, value];
    });
    return result;
  }

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function (arg) {
      return func(transform(arg));
    };
  }

  /**
   * Converts `set` to an array of its values.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the values.
   */
  function setToArray(set$$1) {
    var index = -1,
        result = Array(set$$1.size);

    set$$1.forEach(function (value) {
      result[++index] = value;
    });
    return result;
  }

  /**
   * Converts `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function stringToArray(string) {
    return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
  }

  /**
   * Converts a Unicode `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function unicodeToArray(string) {
    return string.match(reUnicode) || [];
  }

  /** Used for built-in method references. */
  var funcProto = Function.prototype,
      objectProto = Object.prototype;

  /** Used to detect overreaching core-js shims. */
  var coreJsData = root['__core-js_shared__'];

  /** Used to detect methods masquerading as native. */
  var maskSrcKey = function () {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
    return uid ? 'Symbol(src)_1.' + uid : '';
  }();

  /** Used to resolve the decompiled source of functions. */
  var funcToString = funcProto.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var objectToString = objectProto.toString;

  /** Used to detect if a method is native. */
  var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

  /** Built-in value references. */
  var _Symbol = root.Symbol,
      iteratorSymbol = _Symbol ? _Symbol.iterator : undefined,
      propertyIsEnumerable = objectProto.propertyIsEnumerable;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeKeys = overArg(Object.keys, Object);

  /* Built-in method references that are verified to be native. */
  var DataView = getNative(root, 'DataView'),
      Map$1 = getNative(root, 'Map'),
      Promise$1 = getNative(root, 'Promise'),
      Set$1 = getNative(root, 'Set'),
      WeakMap$1 = getNative(root, 'WeakMap');

  /** Used to detect maps, sets, and weakmaps. */
  var dataViewCtorString = toSource(DataView),
      mapCtorString = toSource(Map$1),
      promiseCtorString = toSource(Promise$1),
      setCtorString = toSource(Set$1),
      weakMapCtorString = toSource(WeakMap$1);

  /**
   * Creates an array of the enumerable property names of the array-like `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @param {boolean} inherited Specify returning inherited property names.
   * @returns {Array} Returns the array of property names.
   */
  function arrayLikeKeys(value, inherited) {
    // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
    // Safari 9 makes `arguments.length` enumerable in strict mode.
    var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];

    var length = result.length,
        skipIndexes = !!length;

    for (var key in value) {
      if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
        result.push(key);
      }
    }
    return result;
  }

  /**
   * The base implementation of `getTag`.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag(value) {
    return objectToString.call(value);
  }

  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */
  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }

  /**
   * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeys(object) {
    if (!isPrototype(object)) {
      return nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty.call(object, key) && key != 'constructor') {
        result.push(key);
      }
    }
    return result;
  }

  /**
   * Copies the values of `source` to `array`.
   *
   * @private
   * @param {Array} source The array to copy values from.
   * @param {Array} [array=[]] The array to copy values to.
   * @returns {Array} Returns `array`.
   */
  function copyArray(source, array) {
    var index = -1,
        length = source.length;

    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */
  function getNative(object, key) {
    var value = getValue$1(object, key);
    return baseIsNative(value) ? value : undefined;
  }

  /**
   * Gets the `toStringTag` of `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  var getTag = baseGetTag;

  // Fallback for data views, maps, sets, and weak maps in IE 11,
  // for data views in Edge < 14, and promises in Node.js.
  if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map$1 && getTag(new Map$1()) != mapTag || Promise$1 && getTag(Promise$1.resolve()) != promiseTag || Set$1 && getTag(new Set$1()) != setTag || WeakMap$1 && getTag(new WeakMap$1()) != weakMapTag) {
    getTag = function getTag(value) {
      var result = objectToString.call(value),
          Ctor = result == objectTag ? value.constructor : undefined,
          ctorString = Ctor ? toSource(Ctor) : undefined;

      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag;
          case mapCtorString:
            return mapTag;
          case promiseCtorString:
            return promiseTag;
          case setCtorString:
            return setTag;
          case weakMapCtorString:
            return weakMapTag;
        }
      }
      return result;
    };
  }

  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */
  function isIndex(value, length) {
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
  }

  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }

  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */
  function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;

    return value === proto;
  }

  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to process.
   * @returns {string} Returns the source code.
   */
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {}
      try {
        return func + '';
      } catch (e) {}
    }
    return '';
  }

  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   *  else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  function isArguments(value) {
    // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
    return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') && (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
  }

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */
  var isArray = Array.isArray;

  /**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */
  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
  }

  /**
   * This method is like `_.isArrayLike` except that it also checks if `value`
   * is an object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array-like object,
   *  else `false`.
   * @example
   *
   * _.isArrayLikeObject([1, 2, 3]);
   * // => true
   *
   * _.isArrayLikeObject(document.body.children);
   * // => true
   *
   * _.isArrayLikeObject('abc');
   * // => false
   *
   * _.isArrayLikeObject(_.noop);
   * // => false
   */
  function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
  }

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction(value) {
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 8-9 which returns 'object' for typed array and other constructors.
    var tag = isObject(value) ? objectToString.call(value) : '';
    return tag == funcTag || tag == genTag;
  }

  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This method is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */
  function isLength(value) {
    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
    return !!value && (type == 'object' || type == 'function');
  }

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
  }

  /**
   * Checks if `value` is classified as a `String` primitive or object.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a string, else `false`.
   * @example
   *
   * _.isString('abc');
   * // => true
   *
   * _.isString(1);
   * // => false
   */
  function isString(value) {
    return typeof value == 'string' || !isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag;
  }

  /**
   * Converts `value` to an array.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {Array} Returns the converted array.
   * @example
   *
   * _.toArray({ 'a': 1, 'b': 2 });
   * // => [1, 2]
   *
   * _.toArray('abc');
   * // => ['a', 'b', 'c']
   *
   * _.toArray(1);
   * // => []
   *
   * _.toArray(null);
   * // => []
   */
  function toArray$1(value) {
    if (!value) {
      return [];
    }
    if (isArrayLike(value)) {
      return isString(value) ? stringToArray(value) : copyArray(value);
    }
    if (iteratorSymbol && value[iteratorSymbol]) {
      return iteratorToArray(value[iteratorSymbol]());
    }
    var tag = getTag(value),
        func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;

    return func(value);
  }

  /**
   * Creates an array of the own enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects. See the
   * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * for more details.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keys(new Foo);
   * // => ['a', 'b'] (iteration order is not guaranteed)
   *
   * _.keys('hi');
   * // => ['0', '1']
   */
  function keys(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
  }

  /**
   * Creates an array of the own enumerable string keyed property values of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property values.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.values(new Foo);
   * // => [1, 2] (iteration order is not guaranteed)
   *
   * _.values('hi');
   * // => ['h', 'i']
   */
  function values(object) {
    return object ? baseValues(object, keys(object)) : [];
  }

  var lodash_toarray = toArray$1;

  var interrobang = "⁉️";
  var tm = "™️";
  var information_source = "ℹ️";
  var left_right_arrow = "↔️";
  var arrow_up_down = "↕️";
  var arrow_upper_left = "↖️";
  var arrow_upper_right = "↗️";
  var arrow_lower_right = "↘️";
  var arrow_lower_left = "↙️";
  var keyboard = "⌨";
  var sunny = "☀️";
  var cloud = "☁️";
  var umbrella = "☔️";
  var showman = "☃";
  var comet = "☄";
  var ballot_box_with_check = "☑️";
  var coffee = "☕️";
  var shamrock = "☘";
  var skull_and_crossbones = "☠";
  var radioactive_sign = "☢";
  var biohazard_sign = "☣";
  var orthodox_cross = "☦";
  var wheel_of_dharma = "☸";
  var white_frowning_face = "☹";
  var aries = "♈️";
  var taurus = "♉️";
  var sagittarius = "♐️";
  var capricorn = "♑️";
  var aquarius = "♒️";
  var pisces = "♓️";
  var spades = "♠️";
  var clubs = "♣️";
  var hearts = "♥️";
  var diamonds = "♦️";
  var hotsprings = "♨️";
  var hammer_and_pick = "⚒";
  var anchor = "⚓️";
  var crossed_swords = "⚔";
  var scales = "⚖";
  var alembic = "⚗";
  var gear = "⚙";
  var scissors = "✂️";
  var white_check_mark = "✅";
  var airplane = "✈️";
  var email = "✉️";
  var envelope = "✉️";
  var black_nib = "✒️";
  var heavy_check_mark = "✔️";
  var heavy_multiplication_x = "✖️";
  var star_of_david = "✡";
  var sparkles = "✨";
  var eight_spoked_asterisk = "✳️";
  var eight_pointed_black_star = "✴️";
  var snowflake = "❄️";
  var sparkle = "❇️";
  var question = "❓";
  var grey_question = "❔";
  var grey_exclamation = "❕";
  var exclamation = "❗️";
  var heavy_exclamation_mark = "❗️";
  var heavy_heart_exclamation_mark_ornament = "❣";
  var heart = "❤️";
  var heavy_plus_sign = "➕";
  var heavy_minus_sign = "➖";
  var heavy_division_sign = "➗";
  var arrow_heading_up = "⤴️";
  var arrow_heading_down = "⤵️";
  var wavy_dash = "〰️";
  var congratulations = "㊗️";
  var secret = "㊙️";
  var copyright = "©️";
  var registered = "®️";
  var bangbang = "‼️";
  var leftwards_arrow_with_hook = "↩️";
  var arrow_right_hook = "↪️";
  var watch = "⌚️";
  var hourglass = "⌛️";
  var fast_forward = "⏩";
  var rewind = "⏪";
  var arrow_double_up = "⏫";
  var arrow_double_down = "⏬";
  var black_right_pointing_double_triangle_with_vertical_bar = "⏭";
  var black_left_pointing_double_triangle_with_vertical_bar = "⏮";
  var black_right_pointing_triangle_with_double_vertical_bar = "⏯";
  var alarm_clock = "⏰";
  var stopwatch = "⏱";
  var timer_clock = "⏲";
  var hourglass_flowing_sand = "⏳";
  var double_vertical_bar = "⏸";
  var black_square_for_stop = "⏹";
  var black_circle_for_record = "⏺";
  var m = "Ⓜ️";
  var black_small_square = "▪️";
  var white_small_square = "▫️";
  var arrow_forward = "▶️";
  var arrow_backward = "◀️";
  var white_medium_square = "◻️";
  var black_medium_square = "◼️";
  var white_medium_small_square = "◽️";
  var black_medium_small_square = "◾️";
  var phone = "☎️";
  var telephone = "☎️";
  var point_up = "☝️";
  var star_and_crescent = "☪";
  var peace_symbol = "☮";
  var yin_yang = "☯";
  var relaxed = "☺️";
  var gemini = "♊️";
  var cancer = "♋️";
  var leo = "♌️";
  var virgo = "♍️";
  var libra = "♎️";
  var scorpius = "♏️";
  var recycle = "♻️";
  var wheelchair = "♿️";
  var atom_symbol = "⚛";
  var fleur_de_lis = "⚜";
  var warning = "⚠️";
  var zap = "⚡️";
  var white_circle = "⚪️";
  var black_circle = "⚫️";
  var coffin = "⚰";
  var funeral_urn = "⚱";
  var soccer = "⚽️";
  var baseball = "⚾️";
  var snowman = "⛄️";
  var partly_sunny = "⛅️";
  var thunder_cloud_and_rain = "⛈";
  var ophiuchus = "⛎";
  var pick = "⛏";
  var helmet_with_white_cross = "⛑";
  var chains = "⛓";
  var no_entry = "⛔️";
  var shinto_shrine = "⛩";
  var church = "⛪️";
  var mountain = "⛰";
  var umbrella_on_ground = "⛱";
  var fountain = "⛲️";
  var golf = "⛳️";
  var ferry = "⛴";
  var boat = "⛵️";
  var sailboat = "⛵️";
  var skier = "⛷";
  var ice_skate = "⛸";
  var person_with_ball = "⛹";
  var tent = "⛺️";
  var fuelpump = "⛽️";
  var fist = "✊";
  var hand = "✋";
  var raised_hand = "✋";
  var v = "✌️";
  var writing_hand = "✍";
  var pencil2 = "✏️";
  var latin_cross = "✝";
  var x = "❌";
  var negative_squared_cross_mark = "❎";
  var arrow_right = "➡️";
  var curly_loop = "➰";
  var loop = "➿";
  var arrow_left = "⬅️";
  var arrow_up = "⬆️";
  var arrow_down = "⬇️";
  var black_large_square = "⬛️";
  var white_large_square = "⬜️";
  var star = "⭐️";
  var o = "⭕️";
  var part_alternation_mark = "〽️";
  var mahjong = "🀄️";
  var black_joker = "🃏";
  var a = "🅰️";
  var b = "🅱️";
  var o2 = "🅾️";
  var parking = "🅿️";
  var ab = "🆎";
  var cl = "🆑";
  var cool = "🆒";
  var free = "🆓";
  var id = "🆔";
  var ng = "🆖";
  var ok = "🆗";
  var sos = "🆘";
  var up = "🆙";
  var vs = "🆚";
  var koko = "🈁";
  var sa = "🈂️";
  var u7121 = "🈚️";
  var u6307 = "🈯️";
  var u7981 = "🈲";
  var u7a7a = "🈳";
  var u5408 = "🈴";
  var u6e80 = "🈵";
  var u6709 = "🈶";
  var u6708 = "🈷️";
  var u7533 = "🈸";
  var u5272 = "🈹";
  var u55b6 = "🈺";
  var ideograph_advantage = "🉐";
  var accept = "🉑";
  var cyclone = "🌀";
  var foggy = "🌁";
  var closed_umbrella = "🌂";
  var night_with_stars = "🌃";
  var sunrise_over_mountains = "🌄";
  var sunrise = "🌅";
  var city_sunset = "🌆";
  var city_sunrise = "🌇";
  var rainbow = "🌈";
  var bridge_at_night = "🌉";
  var ocean = "🌊";
  var volcano = "🌋";
  var milky_way = "🌌";
  var earth_africa = "🌍";
  var earth_americas = "🌎";
  var earth_asia = "🌏";
  var globe_with_meridians = "🌐";
  var new_moon = "🌑";
  var waxing_crescent_moon = "🌒";
  var first_quarter_moon = "🌓";
  var moon = "🌔";
  var waxing_gibbous_moon = "🌔";
  var full_moon = "🌕";
  var waning_gibbous_moon = "🌖";
  var last_quarter_moon = "🌗";
  var waning_crescent_moon = "🌘";
  var crescent_moon = "🌙";
  var new_moon_with_face = "🌚";
  var first_quarter_moon_with_face = "🌛";
  var last_quarter_moon_with_face = "🌜";
  var full_moon_with_face = "🌝";
  var sun_with_face = "🌞";
  var star2 = "🌟";
  var stars = "🌠";
  var thermometer = "🌡";
  var mostly_sunny = "🌤";
  var sun_small_cloud = "🌤";
  var barely_sunny = "🌥";
  var sun_behind_cloud = "🌥";
  var partly_sunny_rain = "🌦";
  var sun_behind_rain_cloud = "🌦";
  var rain_cloud = "🌧";
  var snow_cloud = "🌨";
  var lightning = "🌩";
  var lightning_cloud = "🌩";
  var tornado = "🌪";
  var tornado_cloud = "🌪";
  var fog = "🌫";
  var wind_blowing_face = "🌬";
  var hotdog = "🌭";
  var taco = "🌮";
  var burrito = "🌯";
  var chestnut = "🌰";
  var seedling = "🌱";
  var evergreen_tree = "🌲";
  var deciduous_tree = "🌳";
  var palm_tree = "🌴";
  var cactus = "🌵";
  var hot_pepper = "🌶";
  var tulip = "🌷";
  var cherry_blossom = "🌸";
  var rose = "🌹";
  var hibiscus = "🌺";
  var sunflower = "🌻";
  var blossom = "🌼";
  var corn = "🌽";
  var ear_of_rice = "🌾";
  var herb = "🌿";
  var four_leaf_clover = "🍀";
  var maple_leaf = "🍁";
  var fallen_leaf = "🍂";
  var leaves = "🍃";
  var mushroom = "🍄";
  var tomato = "🍅";
  var eggplant = "🍆";
  var grapes = "🍇";
  var melon = "🍈";
  var watermelon = "🍉";
  var tangerine = "🍊";
  var lemon = "🍋";
  var banana = "🍌";
  var pineapple = "🍍";
  var apple = "🍎";
  var green_apple = "🍏";
  var pear = "🍐";
  var peach = "🍑";
  var cherries = "🍒";
  var strawberry = "🍓";
  var hamburger = "🍔";
  var pizza = "🍕";
  var meat_on_bone = "🍖";
  var poultry_leg = "🍗";
  var rice_cracker = "🍘";
  var rice_ball = "🍙";
  var rice = "🍚";
  var curry = "🍛";
  var ramen = "🍜";
  var spaghetti = "🍝";
  var bread = "🍞";
  var fries = "🍟";
  var sweet_potato = "🍠";
  var dango = "🍡";
  var oden = "🍢";
  var sushi = "🍣";
  var fried_shrimp = "🍤";
  var fish_cake = "🍥";
  var icecream = "🍦";
  var shaved_ice = "🍧";
  var ice_cream = "🍨";
  var doughnut = "🍩";
  var cookie = "🍪";
  var chocolate_bar = "🍫";
  var candy = "🍬";
  var lollipop = "🍭";
  var custard = "🍮";
  var honey_pot = "🍯";
  var cake = "🍰";
  var bento = "🍱";
  var stew = "🍲";
  var egg = "🍳";
  var fork_and_knife = "🍴";
  var tea = "🍵";
  var sake = "🍶";
  var wine_glass = "🍷";
  var cocktail = "🍸";
  var tropical_drink = "🍹";
  var beer = "🍺";
  var beers = "🍻";
  var baby_bottle = "🍼";
  var knife_fork_plate = "🍽";
  var champagne = "🍾";
  var popcorn = "🍿";
  var ribbon = "🎀";
  var gift = "🎁";
  var birthday = "🎂";
  var jack_o_lantern = "🎃";
  var christmas_tree = "🎄";
  var santa = "🎅";
  var fireworks = "🎆";
  var sparkler = "🎇";
  var balloon = "🎈";
  var tada = "🎉";
  var confetti_ball = "🎊";
  var tanabata_tree = "🎋";
  var crossed_flags = "🎌";
  var bamboo = "🎍";
  var dolls = "🎎";
  var flags = "🎏";
  var wind_chime = "🎐";
  var rice_scene = "🎑";
  var school_satchel = "🎒";
  var mortar_board = "🎓";
  var medal = "🎖";
  var reminder_ribbon = "🎗";
  var studio_microphone = "🎙";
  var level_slider = "🎚";
  var control_knobs = "🎛";
  var film_frames = "🎞";
  var admission_tickets = "🎟";
  var carousel_horse = "🎠";
  var ferris_wheel = "🎡";
  var roller_coaster = "🎢";
  var fishing_pole_and_fish = "🎣";
  var microphone = "🎤";
  var movie_camera = "🎥";
  var cinema = "🎦";
  var headphones = "🎧";
  var art = "🎨";
  var tophat = "🎩";
  var circus_tent = "🎪";
  var ticket = "🎫";
  var clapper = "🎬";
  var performing_arts = "🎭";
  var video_game = "🎮";
  var dart = "🎯";
  var slot_machine = "🎰";
  var game_die = "🎲";
  var bowling = "🎳";
  var flower_playing_cards = "🎴";
  var musical_note = "🎵";
  var notes = "🎶";
  var saxophone = "🎷";
  var guitar = "🎸";
  var musical_keyboard = "🎹";
  var trumpet = "🎺";
  var violin = "🎻";
  var musical_score = "🎼";
  var running_shirt_with_sash = "🎽";
  var tennis = "🎾";
  var ski = "🎿";
  var basketball = "🏀";
  var checkered_flag = "🏁";
  var snowboarder = "🏂";
  var runner = "🏃";
  var running = "🏃";
  var surfer = "🏄";
  var sports_medal = "🏅";
  var trophy = "🏆";
  var horse_racing = "🏇";
  var football = "🏈";
  var rugby_football = "🏉";
  var swimmer = "🏊";
  var weight_lifter = "🏋";
  var golfer = "🏌";
  var racing_motorcycle = "🏍";
  var racing_car = "🏎";
  var cricket_bat_and_ball = "🏏";
  var volleyball = "🏐";
  var field_hockey_stick_and_ball = "🏑";
  var ice_hockey_stick_and_puck = "🏒";
  var table_tennis_paddle_and_ball = "🏓";
  var snow_capped_mountain = "🏔";
  var camping = "🏕";
  var beach_with_umbrella = "🏖";
  var building_construction = "🏗";
  var house_buildings = "🏘";
  var cityscape = "🏙";
  var derelict_house_building = "🏚";
  var classical_building = "🏛";
  var desert = "🏜";
  var desert_island = "🏝";
  var national_park = "🏞";
  var stadium = "🏟";
  var house = "🏠";
  var house_with_garden = "🏡";
  var office = "🏢";
  var post_office = "🏣";
  var european_post_office = "🏤";
  var hospital = "🏥";
  var bank = "🏦";
  var atm = "🏧";
  var hotel = "🏨";
  var love_hotel = "🏩";
  var convenience_store = "🏪";
  var school = "🏫";
  var department_store = "🏬";
  var factory = "🏭";
  var izakaya_lantern = "🏮";
  var lantern = "🏮";
  var japanese_castle = "🏯";
  var european_castle = "🏰";
  var waving_white_flag = "🏳";
  var waving_black_flag = "🏴";
  var rosette = "🏵";
  var label = "🏷";
  var badminton_racquet_and_shuttlecock = "🏸";
  var bow_and_arrow = "🏹";
  var amphora = "🏺";
  var rat = "🐀";
  var mouse2 = "🐁";
  var ox = "🐂";
  var water_buffalo = "🐃";
  var cow2 = "🐄";
  var tiger2 = "🐅";
  var leopard = "🐆";
  var rabbit2 = "🐇";
  var cat2 = "🐈";
  var dragon = "🐉";
  var crocodile = "🐊";
  var whale2 = "🐋";
  var snail = "🐌";
  var snake = "🐍";
  var racehorse = "🐎";
  var ram = "🐏";
  var goat = "🐐";
  var sheep = "🐑";
  var monkey = "🐒";
  var rooster = "🐓";
  var chicken = "🐔";
  var dog2 = "🐕";
  var pig2 = "🐖";
  var boar = "🐗";
  var elephant = "🐘";
  var octopus = "🐙";
  var shell = "🐚";
  var bug = "🐛";
  var ant = "🐜";
  var bee = "🐝";
  var honeybee = "🐝";
  var beetle = "🐞";
  var fish = "🐟";
  var tropical_fish = "🐠";
  var blowfish = "🐡";
  var turtle = "🐢";
  var hatching_chick = "🐣";
  var baby_chick = "🐤";
  var hatched_chick = "🐥";
  var bird = "🐦";
  var penguin = "🐧";
  var koala = "🐨";
  var poodle = "🐩";
  var dromedary_camel = "🐪";
  var camel = "🐫";
  var dolphin = "🐬";
  var flipper = "🐬";
  var mouse = "🐭";
  var cow = "🐮";
  var tiger = "🐯";
  var rabbit = "🐰";
  var cat = "🐱";
  var dragon_face = "🐲";
  var whale = "🐳";
  var horse = "🐴";
  var monkey_face = "🐵";
  var dog = "🐶";
  var pig = "🐷";
  var frog = "🐸";
  var hamster = "🐹";
  var wolf = "🐺";
  var bear = "🐻";
  var panda_face = "🐼";
  var pig_nose = "🐽";
  var feet = "🐾";
  var paw_prints = "🐾";
  var chipmunk = "🐿";
  var eyes = "👀";
  var eye = "👁";
  var ear = "👂";
  var nose = "👃";
  var lips = "👄";
  var tongue = "👅";
  var point_up_2 = "👆";
  var point_down = "👇";
  var point_left = "👈";
  var point_right = "👉";
  var facepunch = "👊";
  var punch = "👊";
  var wave = "👋";
  var ok_hand = "👌";
  var thumbsup = "👍";
  var thumbsdown = "👎";
  var clap = "👏";
  var open_hands = "👐";
  var crown = "👑";
  var womans_hat = "👒";
  var eyeglasses = "👓";
  var necktie = "👔";
  var shirt = "👕";
  var tshirt = "👕";
  var jeans = "👖";
  var dress = "👗";
  var kimono = "👘";
  var bikini = "👙";
  var womans_clothes = "👚";
  var purse = "👛";
  var handbag = "👜";
  var pouch = "👝";
  var mans_shoe = "👞";
  var shoe = "👞";
  var athletic_shoe = "👟";
  var high_heel = "👠";
  var sandal = "👡";
  var boot = "👢";
  var footprints = "👣";
  var bust_in_silhouette = "👤";
  var busts_in_silhouette = "👥";
  var boy = "👦";
  var girl = "👧";
  var man = "👨";
  var woman = "👩";
  var family = "👨‍👩‍👦";
  var couple = "👫";
  var man_and_woman_holding_hands = "👫";
  var two_men_holding_hands = "👬";
  var two_women_holding_hands = "👭";
  var cop = "👮";
  var dancers = "👯";
  var bride_with_veil = "👰";
  var person_with_blond_hair = "👱";
  var man_with_gua_pi_mao = "👲";
  var man_with_turban = "👳";
  var older_man = "👴";
  var older_woman = "👵";
  var baby = "👶";
  var construction_worker = "👷";
  var princess = "👸";
  var japanese_ogre = "👹";
  var japanese_goblin = "👺";
  var ghost = "👻";
  var angel = "👼";
  var alien = "👽";
  var space_invader = "👾";
  var imp = "👿";
  var skull = "💀";
  var information_desk_person = "💁";
  var guardsman = "💂";
  var dancer = "💃";
  var lipstick = "💄";
  var nail_care = "💅";
  var massage = "💆";
  var haircut = "💇";
  var barber = "💈";
  var syringe = "💉";
  var pill = "💊";
  var kiss = "💋";
  var love_letter = "💌";
  var ring = "💍";
  var gem = "💎";
  var couplekiss = "💏";
  var bouquet = "💐";
  var couple_with_heart = "💑";
  var wedding = "💒";
  var heartbeat = "💓";
  var broken_heart = "💔";
  var two_hearts = "💕";
  var sparkling_heart = "💖";
  var heartpulse = "💗";
  var cupid = "💘";
  var blue_heart = "💙";
  var green_heart = "💚";
  var yellow_heart = "💛";
  var purple_heart = "💜";
  var gift_heart = "💝";
  var revolving_hearts = "💞";
  var heart_decoration = "💟";
  var diamond_shape_with_a_dot_inside = "💠";
  var bulb = "💡";
  var anger = "💢";
  var bomb = "💣";
  var zzz = "💤";
  var boom = "💥";
  var collision = "💥";
  var sweat_drops = "💦";
  var droplet = "💧";
  var dash = "💨";
  var hankey = "💩";
  var poop = "💩";
  var shit = "💩";
  var muscle = "💪";
  var dizzy = "💫";
  var speech_balloon = "💬";
  var thought_balloon = "💭";
  var white_flower = "💮";
  var moneybag = "💰";
  var currency_exchange = "💱";
  var heavy_dollar_sign = "💲";
  var credit_card = "💳";
  var yen = "💴";
  var dollar = "💵";
  var euro = "💶";
  var pound = "💷";
  var money_with_wings = "💸";
  var chart = "💹";
  var seat = "💺";
  var computer = "💻";
  var briefcase = "💼";
  var minidisc = "💽";
  var floppy_disk = "💾";
  var cd = "💿";
  var dvd = "📀";
  var file_folder = "📁";
  var open_file_folder = "📂";
  var page_with_curl = "📃";
  var page_facing_up = "📄";
  var date = "📅";
  var calendar = "📆";
  var card_index = "📇";
  var chart_with_upwards_trend = "📈";
  var chart_with_downwards_trend = "📉";
  var bar_chart = "📊";
  var clipboard = "📋";
  var pushpin = "📌";
  var round_pushpin = "📍";
  var paperclip = "📎";
  var straight_ruler = "📏";
  var triangular_ruler = "📐";
  var bookmark_tabs = "📑";
  var ledger = "📒";
  var notebook = "📓";
  var notebook_with_decorative_cover = "📔";
  var closed_book = "📕";
  var book = "📖";
  var open_book = "📖";
  var green_book = "📗";
  var blue_book = "📘";
  var orange_book = "📙";
  var books = "📚";
  var name_badge = "📛";
  var scroll = "📜";
  var memo = "📝";
  var pencil = "📝";
  var telephone_receiver = "📞";
  var pager = "📟";
  var fax = "📠";
  var satellite = "🛰";
  var loudspeaker = "📢";
  var mega = "📣";
  var outbox_tray = "📤";
  var inbox_tray = "📥";
  var incoming_envelope = "📨";
  var envelope_with_arrow = "📩";
  var mailbox_closed = "📪";
  var mailbox = "📫";
  var mailbox_with_mail = "📬";
  var mailbox_with_no_mail = "📭";
  var postbox = "📮";
  var postal_horn = "📯";
  var newspaper = "📰";
  var iphone = "📱";
  var calling = "📲";
  var vibration_mode = "📳";
  var mobile_phone_off = "📴";
  var no_mobile_phones = "📵";
  var signal_strength = "📶";
  var camera = "📷";
  var camera_with_flash = "📸";
  var video_camera = "📹";
  var tv = "📺";
  var radio = "📻";
  var vhs = "📼";
  var film_projector = "📽";
  var prayer_beads = "📿";
  var twisted_rightwards_arrows = "🔀";
  var repeat = "🔁";
  var repeat_one = "🔂";
  var arrows_clockwise = "🔃";
  var arrows_counterclockwise = "🔄";
  var low_brightness = "🔅";
  var high_brightness = "🔆";
  var mute = "🔇";
  var speaker = "🔈";
  var sound = "🔉";
  var loud_sound = "🔊";
  var battery = "🔋";
  var electric_plug = "🔌";
  var mag = "🔍";
  var mag_right = "🔎";
  var lock_with_ink_pen = "🔏";
  var closed_lock_with_key = "🔐";
  var key = "🔑";
  var lock = "🔒";
  var unlock = "🔓";
  var bell = "🔔";
  var no_bell = "🔕";
  var bookmark = "🔖";
  var link = "🔗";
  var radio_button = "🔘";
  var back = "🔙";
  var end = "🔚";
  var on = "🔛";
  var soon = "🔜";
  var top = "🔝";
  var underage = "🔞";
  var keycap_ten = "🔟";
  var capital_abcd = "🔠";
  var abcd = "🔡";
  var symbols = "🔣";
  var abc = "🔤";
  var fire = "🔥";
  var flashlight = "🔦";
  var wrench = "🔧";
  var hammer = "🔨";
  var nut_and_bolt = "🔩";
  var hocho = "🔪";
  var knife = "🔪";
  var gun = "🔫";
  var microscope = "🔬";
  var telescope = "🔭";
  var crystal_ball = "🔮";
  var six_pointed_star = "🔯";
  var beginner = "🔰";
  var trident = "🔱";
  var black_square_button = "🔲";
  var white_square_button = "🔳";
  var red_circle = "🔴";
  var large_blue_circle = "🔵";
  var large_orange_diamond = "🔶";
  var large_blue_diamond = "🔷";
  var small_orange_diamond = "🔸";
  var small_blue_diamond = "🔹";
  var small_red_triangle = "🔺";
  var small_red_triangle_down = "🔻";
  var arrow_up_small = "🔼";
  var arrow_down_small = "🔽";
  var om_symbol = "🕉";
  var dove_of_peace = "🕊";
  var kaaba = "🕋";
  var mosque = "🕌";
  var synagogue = "🕍";
  var menorah_with_nine_branches = "🕎";
  var clock1 = "🕐";
  var clock2 = "🕑";
  var clock3 = "🕒";
  var clock4 = "🕓";
  var clock5 = "🕔";
  var clock6 = "🕕";
  var clock7 = "🕖";
  var clock8 = "🕗";
  var clock9 = "🕘";
  var clock10 = "🕙";
  var clock11 = "🕚";
  var clock12 = "🕛";
  var clock130 = "🕜";
  var clock230 = "🕝";
  var clock330 = "🕞";
  var clock430 = "🕟";
  var clock530 = "🕠";
  var clock630 = "🕡";
  var clock730 = "🕢";
  var clock830 = "🕣";
  var clock930 = "🕤";
  var clock1030 = "🕥";
  var clock1130 = "🕦";
  var clock1230 = "🕧";
  var candle = "🕯";
  var mantelpiece_clock = "🕰";
  var hole = "🕳";
  var man_in_business_suit_levitating = "🕴";
  var sleuth_or_spy = "🕵";
  var dark_sunglasses = "🕶";
  var spider = "🕷";
  var spider_web = "🕸";
  var joystick = "🕹";
  var linked_paperclips = "🖇";
  var lower_left_ballpoint_pen = "🖊";
  var lower_left_fountain_pen = "🖋";
  var lower_left_paintbrush = "🖌";
  var lower_left_crayon = "🖍";
  var raised_hand_with_fingers_splayed = "🖐";
  var middle_finger = "🖕";
  var reversed_hand_with_middle_finger_extended = "🖕";
  var desktop_computer = "🖥";
  var printer = "🖨";
  var three_button_mouse = "🖱";
  var trackball = "🖲";
  var frame_with_picture = "🖼";
  var card_index_dividers = "🗂";
  var card_file_box = "🗃";
  var file_cabinet = "🗄";
  var wastebasket = "🗑";
  var spiral_note_pad = "🗒";
  var spiral_calendar_pad = "🗓";
  var compression = "🗜";
  var old_key = "🗝";
  var rolled_up_newspaper = "🗞";
  var dagger_knife = "🗡";
  var speaking_head_in_silhouette = "🗣";
  var left_speech_bubble = "🗨";
  var right_anger_bubble = "🗯";
  var ballot_box_with_ballot = "🗳";
  var world_map = "🗺";
  var mount_fuji = "🗻";
  var tokyo_tower = "🗼";
  var statue_of_liberty = "🗽";
  var japan = "🗾";
  var moyai = "🗿";
  var grinning = "😀";
  var grin = "😁";
  var joy = "😂";
  var smiley = "😃";
  var smile = "😄";
  var sweat_smile = "😅";
  var laughing = "😆";
  var satisfied = "😆";
  var innocent = "😇";
  var smiling_imp = "😈";
  var wink = "😉";
  var blush = "😊";
  var yum = "😋";
  var relieved = "😌";
  var heart_eyes = "😍";
  var sunglasses = "😎";
  var smirk = "😏";
  var neutral_face = "😐";
  var expressionless = "😑";
  var unamused = "😒";
  var sweat = "😓";
  var pensive = "😔";
  var confused = "😕";
  var confounded = "😖";
  var kissing = "😗";
  var kissing_heart = "😘";
  var kissing_smiling_eyes = "😙";
  var kissing_closed_eyes = "😚";
  var stuck_out_tongue = "😛";
  var stuck_out_tongue_winking_eye = "😜";
  var stuck_out_tongue_closed_eyes = "😝";
  var disappointed = "😞";
  var worried = "😟";
  var angry = "😠";
  var rage = "😡";
  var cry = "😢";
  var persevere = "😣";
  var triumph = "😤";
  var disappointed_relieved = "😥";
  var frowning = "😦";
  var anguished = "😧";
  var fearful = "😨";
  var weary = "😩";
  var sleepy = "😪";
  var tired_face = "😫";
  var grimacing = "😬";
  var sob = "😭";
  var open_mouth = "😮";
  var hushed = "😯";
  var cold_sweat = "😰";
  var scream = "😱";
  var astonished = "😲";
  var flushed = "😳";
  var sleeping = "😴";
  var dizzy_face = "😵";
  var no_mouth = "😶";
  var mask = "😷";
  var smile_cat = "😸";
  var joy_cat = "😹";
  var smiley_cat = "😺";
  var heart_eyes_cat = "😻";
  var smirk_cat = "😼";
  var kissing_cat = "😽";
  var pouting_cat = "😾";
  var crying_cat_face = "😿";
  var scream_cat = "🙀";
  var slightly_frowning_face = "🙁";
  var slightly_smiling_face = "🙂";
  var upside_down_face = "🙃";
  var face_with_rolling_eyes = "🙄";
  var no_good = "🙅";
  var ok_woman = "🙆";
  var bow = "🙇";
  var see_no_evil = "🙈";
  var hear_no_evil = "🙉";
  var speak_no_evil = "🙊";
  var raising_hand = "🙋";
  var raised_hands = "🙌";
  var person_frowning = "🙍";
  var person_with_pouting_face = "🙎";
  var pray = "🙏";
  var rocket = "🚀";
  var helicopter = "🚁";
  var steam_locomotive = "🚂";
  var railway_car = "🚃";
  var bullettrain_side = "🚄";
  var bullettrain_front = "🚅";
  var train2 = "🚆";
  var metro = "🚇";
  var light_rail = "🚈";
  var station = "🚉";
  var tram = "🚊";
  var train = "🚋";
  var bus = "🚌";
  var oncoming_bus = "🚍";
  var trolleybus = "🚎";
  var busstop = "🚏";
  var minibus = "🚐";
  var ambulance = "🚑";
  var fire_engine = "🚒";
  var police_car = "🚓";
  var oncoming_police_car = "🚔";
  var taxi = "🚕";
  var oncoming_taxi = "🚖";
  var car = "🚗";
  var red_car = "🚗";
  var oncoming_automobile = "🚘";
  var blue_car = "🚙";
  var truck = "🚚";
  var articulated_lorry = "🚛";
  var tractor = "🚜";
  var monorail = "🚝";
  var mountain_railway = "🚞";
  var suspension_railway = "🚟";
  var mountain_cableway = "🚠";
  var aerial_tramway = "🚡";
  var ship = "🚢";
  var rowboat = "🚣";
  var speedboat = "🚤";
  var traffic_light = "🚥";
  var vertical_traffic_light = "🚦";
  var construction = "🚧";
  var rotating_light = "🚨";
  var triangular_flag_on_post = "🚩";
  var door = "🚪";
  var no_entry_sign = "🚫";
  var smoking = "🚬";
  var no_smoking = "🚭";
  var put_litter_in_its_place = "🚮";
  var do_not_litter = "🚯";
  var potable_water = "🚰";
  var bike = "🚲";
  var no_bicycles = "🚳";
  var bicyclist = "🚴";
  var mountain_bicyclist = "🚵";
  var walking = "🚶";
  var no_pedestrians = "🚷";
  var children_crossing = "🚸";
  var mens = "🚹";
  var womens = "🚺";
  var restroom = "🚻";
  var baby_symbol = "🚼";
  var toilet = "🚽";
  var wc = "🚾";
  var shower = "🚿";
  var bath = "🛀";
  var bathtub = "🛁";
  var passport_control = "🛂";
  var customs = "🛃";
  var baggage_claim = "🛄";
  var left_luggage = "🛅";
  var couch_and_lamp = "🛋";
  var sleeping_accommodation = "🛌";
  var shopping_bags = "🛍";
  var bellhop_bell = "🛎";
  var bed = "🛏";
  var place_of_worship = "🛐";
  var hammer_and_wrench = "🛠";
  var shield = "🛡";
  var oil_drum = "🛢";
  var motorway = "🛣";
  var railway_track = "🛤";
  var motor_boat = "🛥";
  var small_airplane = "🛩";
  var airplane_departure = "🛫";
  var airplane_arriving = "🛬";
  var passenger_ship = "🛳";
  var zipper_mouth_face = "🤐";
  var money_mouth_face = "🤑";
  var face_with_thermometer = "🤒";
  var nerd_face = "🤓";
  var thinking_face = "🤔";
  var face_with_head_bandage = "🤕";
  var robot_face = "🤖";
  var hugging_face = "🤗";
  var the_horns = "🤘";
  var sign_of_the_horns = "🤘";
  var crab = "🦀";
  var lion_face = "🦁";
  var scorpion = "🦂";
  var turkey = "🦃";
  var unicorn_face = "🦄";
  var cheese_wedge = "🧀";
  var hash = "#️⃣";
  var keycap_star = "*⃣";
  var zero = "0️⃣";
  var one = "1️⃣";
  var two = "2️⃣";
  var three = "3️⃣";
  var four = "4️⃣";
  var five = "5️⃣";
  var six = "6️⃣";
  var seven = "7️⃣";
  var eight = "8️⃣";
  var nine = "9️⃣";
  var cn = "🇨🇳";
  var de = "🇩🇪";
  var es = "🇪🇸";
  var fr = "🇫🇷";
  var gb = "🇬🇧";
  var uk = "🇬🇧";
  var it = "🇮🇹";
  var jp = "🇯🇵";
  var kr = "🇰🇷";
  var ru = "🇷🇺";
  var us = "🇺🇸";
  var emoji = {
  	"100": "💯",
  	"1234": "🔢",
  	interrobang: interrobang,
  	tm: tm,
  	information_source: information_source,
  	left_right_arrow: left_right_arrow,
  	arrow_up_down: arrow_up_down,
  	arrow_upper_left: arrow_upper_left,
  	arrow_upper_right: arrow_upper_right,
  	arrow_lower_right: arrow_lower_right,
  	arrow_lower_left: arrow_lower_left,
  	keyboard: keyboard,
  	sunny: sunny,
  	cloud: cloud,
  	umbrella: umbrella,
  	showman: showman,
  	comet: comet,
  	ballot_box_with_check: ballot_box_with_check,
  	coffee: coffee,
  	shamrock: shamrock,
  	skull_and_crossbones: skull_and_crossbones,
  	radioactive_sign: radioactive_sign,
  	biohazard_sign: biohazard_sign,
  	orthodox_cross: orthodox_cross,
  	wheel_of_dharma: wheel_of_dharma,
  	white_frowning_face: white_frowning_face,
  	aries: aries,
  	taurus: taurus,
  	sagittarius: sagittarius,
  	capricorn: capricorn,
  	aquarius: aquarius,
  	pisces: pisces,
  	spades: spades,
  	clubs: clubs,
  	hearts: hearts,
  	diamonds: diamonds,
  	hotsprings: hotsprings,
  	hammer_and_pick: hammer_and_pick,
  	anchor: anchor,
  	crossed_swords: crossed_swords,
  	scales: scales,
  	alembic: alembic,
  	gear: gear,
  	scissors: scissors,
  	white_check_mark: white_check_mark,
  	airplane: airplane,
  	email: email,
  	envelope: envelope,
  	black_nib: black_nib,
  	heavy_check_mark: heavy_check_mark,
  	heavy_multiplication_x: heavy_multiplication_x,
  	star_of_david: star_of_david,
  	sparkles: sparkles,
  	eight_spoked_asterisk: eight_spoked_asterisk,
  	eight_pointed_black_star: eight_pointed_black_star,
  	snowflake: snowflake,
  	sparkle: sparkle,
  	question: question,
  	grey_question: grey_question,
  	grey_exclamation: grey_exclamation,
  	exclamation: exclamation,
  	heavy_exclamation_mark: heavy_exclamation_mark,
  	heavy_heart_exclamation_mark_ornament: heavy_heart_exclamation_mark_ornament,
  	heart: heart,
  	heavy_plus_sign: heavy_plus_sign,
  	heavy_minus_sign: heavy_minus_sign,
  	heavy_division_sign: heavy_division_sign,
  	arrow_heading_up: arrow_heading_up,
  	arrow_heading_down: arrow_heading_down,
  	wavy_dash: wavy_dash,
  	congratulations: congratulations,
  	secret: secret,
  	copyright: copyright,
  	registered: registered,
  	bangbang: bangbang,
  	leftwards_arrow_with_hook: leftwards_arrow_with_hook,
  	arrow_right_hook: arrow_right_hook,
  	watch: watch,
  	hourglass: hourglass,
  	fast_forward: fast_forward,
  	rewind: rewind,
  	arrow_double_up: arrow_double_up,
  	arrow_double_down: arrow_double_down,
  	black_right_pointing_double_triangle_with_vertical_bar: black_right_pointing_double_triangle_with_vertical_bar,
  	black_left_pointing_double_triangle_with_vertical_bar: black_left_pointing_double_triangle_with_vertical_bar,
  	black_right_pointing_triangle_with_double_vertical_bar: black_right_pointing_triangle_with_double_vertical_bar,
  	alarm_clock: alarm_clock,
  	stopwatch: stopwatch,
  	timer_clock: timer_clock,
  	hourglass_flowing_sand: hourglass_flowing_sand,
  	double_vertical_bar: double_vertical_bar,
  	black_square_for_stop: black_square_for_stop,
  	black_circle_for_record: black_circle_for_record,
  	m: m,
  	black_small_square: black_small_square,
  	white_small_square: white_small_square,
  	arrow_forward: arrow_forward,
  	arrow_backward: arrow_backward,
  	white_medium_square: white_medium_square,
  	black_medium_square: black_medium_square,
  	white_medium_small_square: white_medium_small_square,
  	black_medium_small_square: black_medium_small_square,
  	phone: phone,
  	telephone: telephone,
  	point_up: point_up,
  	star_and_crescent: star_and_crescent,
  	peace_symbol: peace_symbol,
  	yin_yang: yin_yang,
  	relaxed: relaxed,
  	gemini: gemini,
  	cancer: cancer,
  	leo: leo,
  	virgo: virgo,
  	libra: libra,
  	scorpius: scorpius,
  	recycle: recycle,
  	wheelchair: wheelchair,
  	atom_symbol: atom_symbol,
  	fleur_de_lis: fleur_de_lis,
  	warning: warning,
  	zap: zap,
  	white_circle: white_circle,
  	black_circle: black_circle,
  	coffin: coffin,
  	funeral_urn: funeral_urn,
  	soccer: soccer,
  	baseball: baseball,
  	snowman: snowman,
  	partly_sunny: partly_sunny,
  	thunder_cloud_and_rain: thunder_cloud_and_rain,
  	ophiuchus: ophiuchus,
  	pick: pick,
  	helmet_with_white_cross: helmet_with_white_cross,
  	chains: chains,
  	no_entry: no_entry,
  	shinto_shrine: shinto_shrine,
  	church: church,
  	mountain: mountain,
  	umbrella_on_ground: umbrella_on_ground,
  	fountain: fountain,
  	golf: golf,
  	ferry: ferry,
  	boat: boat,
  	sailboat: sailboat,
  	skier: skier,
  	ice_skate: ice_skate,
  	person_with_ball: person_with_ball,
  	tent: tent,
  	fuelpump: fuelpump,
  	fist: fist,
  	hand: hand,
  	raised_hand: raised_hand,
  	v: v,
  	writing_hand: writing_hand,
  	pencil2: pencil2,
  	latin_cross: latin_cross,
  	x: x,
  	negative_squared_cross_mark: negative_squared_cross_mark,
  	arrow_right: arrow_right,
  	curly_loop: curly_loop,
  	loop: loop,
  	arrow_left: arrow_left,
  	arrow_up: arrow_up,
  	arrow_down: arrow_down,
  	black_large_square: black_large_square,
  	white_large_square: white_large_square,
  	star: star,
  	o: o,
  	part_alternation_mark: part_alternation_mark,
  	mahjong: mahjong,
  	black_joker: black_joker,
  	a: a,
  	b: b,
  	o2: o2,
  	parking: parking,
  	ab: ab,
  	cl: cl,
  	cool: cool,
  	free: free,
  	id: id,
  	"new": "🆕",
  	ng: ng,
  	ok: ok,
  	sos: sos,
  	up: up,
  	vs: vs,
  	koko: koko,
  	sa: sa,
  	u7121: u7121,
  	u6307: u6307,
  	u7981: u7981,
  	u7a7a: u7a7a,
  	u5408: u5408,
  	u6e80: u6e80,
  	u6709: u6709,
  	u6708: u6708,
  	u7533: u7533,
  	u5272: u5272,
  	u55b6: u55b6,
  	ideograph_advantage: ideograph_advantage,
  	accept: accept,
  	cyclone: cyclone,
  	foggy: foggy,
  	closed_umbrella: closed_umbrella,
  	night_with_stars: night_with_stars,
  	sunrise_over_mountains: sunrise_over_mountains,
  	sunrise: sunrise,
  	city_sunset: city_sunset,
  	city_sunrise: city_sunrise,
  	rainbow: rainbow,
  	bridge_at_night: bridge_at_night,
  	ocean: ocean,
  	volcano: volcano,
  	milky_way: milky_way,
  	earth_africa: earth_africa,
  	earth_americas: earth_americas,
  	earth_asia: earth_asia,
  	globe_with_meridians: globe_with_meridians,
  	new_moon: new_moon,
  	waxing_crescent_moon: waxing_crescent_moon,
  	first_quarter_moon: first_quarter_moon,
  	moon: moon,
  	waxing_gibbous_moon: waxing_gibbous_moon,
  	full_moon: full_moon,
  	waning_gibbous_moon: waning_gibbous_moon,
  	last_quarter_moon: last_quarter_moon,
  	waning_crescent_moon: waning_crescent_moon,
  	crescent_moon: crescent_moon,
  	new_moon_with_face: new_moon_with_face,
  	first_quarter_moon_with_face: first_quarter_moon_with_face,
  	last_quarter_moon_with_face: last_quarter_moon_with_face,
  	full_moon_with_face: full_moon_with_face,
  	sun_with_face: sun_with_face,
  	star2: star2,
  	stars: stars,
  	thermometer: thermometer,
  	mostly_sunny: mostly_sunny,
  	sun_small_cloud: sun_small_cloud,
  	barely_sunny: barely_sunny,
  	sun_behind_cloud: sun_behind_cloud,
  	partly_sunny_rain: partly_sunny_rain,
  	sun_behind_rain_cloud: sun_behind_rain_cloud,
  	rain_cloud: rain_cloud,
  	snow_cloud: snow_cloud,
  	lightning: lightning,
  	lightning_cloud: lightning_cloud,
  	tornado: tornado,
  	tornado_cloud: tornado_cloud,
  	fog: fog,
  	wind_blowing_face: wind_blowing_face,
  	hotdog: hotdog,
  	taco: taco,
  	burrito: burrito,
  	chestnut: chestnut,
  	seedling: seedling,
  	evergreen_tree: evergreen_tree,
  	deciduous_tree: deciduous_tree,
  	palm_tree: palm_tree,
  	cactus: cactus,
  	hot_pepper: hot_pepper,
  	tulip: tulip,
  	cherry_blossom: cherry_blossom,
  	rose: rose,
  	hibiscus: hibiscus,
  	sunflower: sunflower,
  	blossom: blossom,
  	corn: corn,
  	ear_of_rice: ear_of_rice,
  	herb: herb,
  	four_leaf_clover: four_leaf_clover,
  	maple_leaf: maple_leaf,
  	fallen_leaf: fallen_leaf,
  	leaves: leaves,
  	mushroom: mushroom,
  	tomato: tomato,
  	eggplant: eggplant,
  	grapes: grapes,
  	melon: melon,
  	watermelon: watermelon,
  	tangerine: tangerine,
  	lemon: lemon,
  	banana: banana,
  	pineapple: pineapple,
  	apple: apple,
  	green_apple: green_apple,
  	pear: pear,
  	peach: peach,
  	cherries: cherries,
  	strawberry: strawberry,
  	hamburger: hamburger,
  	pizza: pizza,
  	meat_on_bone: meat_on_bone,
  	poultry_leg: poultry_leg,
  	rice_cracker: rice_cracker,
  	rice_ball: rice_ball,
  	rice: rice,
  	curry: curry,
  	ramen: ramen,
  	spaghetti: spaghetti,
  	bread: bread,
  	fries: fries,
  	sweet_potato: sweet_potato,
  	dango: dango,
  	oden: oden,
  	sushi: sushi,
  	fried_shrimp: fried_shrimp,
  	fish_cake: fish_cake,
  	icecream: icecream,
  	shaved_ice: shaved_ice,
  	ice_cream: ice_cream,
  	doughnut: doughnut,
  	cookie: cookie,
  	chocolate_bar: chocolate_bar,
  	candy: candy,
  	lollipop: lollipop,
  	custard: custard,
  	honey_pot: honey_pot,
  	cake: cake,
  	bento: bento,
  	stew: stew,
  	egg: egg,
  	fork_and_knife: fork_and_knife,
  	tea: tea,
  	sake: sake,
  	wine_glass: wine_glass,
  	cocktail: cocktail,
  	tropical_drink: tropical_drink,
  	beer: beer,
  	beers: beers,
  	baby_bottle: baby_bottle,
  	knife_fork_plate: knife_fork_plate,
  	champagne: champagne,
  	popcorn: popcorn,
  	ribbon: ribbon,
  	gift: gift,
  	birthday: birthday,
  	jack_o_lantern: jack_o_lantern,
  	christmas_tree: christmas_tree,
  	santa: santa,
  	fireworks: fireworks,
  	sparkler: sparkler,
  	balloon: balloon,
  	tada: tada,
  	confetti_ball: confetti_ball,
  	tanabata_tree: tanabata_tree,
  	crossed_flags: crossed_flags,
  	bamboo: bamboo,
  	dolls: dolls,
  	flags: flags,
  	wind_chime: wind_chime,
  	rice_scene: rice_scene,
  	school_satchel: school_satchel,
  	mortar_board: mortar_board,
  	medal: medal,
  	reminder_ribbon: reminder_ribbon,
  	studio_microphone: studio_microphone,
  	level_slider: level_slider,
  	control_knobs: control_knobs,
  	film_frames: film_frames,
  	admission_tickets: admission_tickets,
  	carousel_horse: carousel_horse,
  	ferris_wheel: ferris_wheel,
  	roller_coaster: roller_coaster,
  	fishing_pole_and_fish: fishing_pole_and_fish,
  	microphone: microphone,
  	movie_camera: movie_camera,
  	cinema: cinema,
  	headphones: headphones,
  	art: art,
  	tophat: tophat,
  	circus_tent: circus_tent,
  	ticket: ticket,
  	clapper: clapper,
  	performing_arts: performing_arts,
  	video_game: video_game,
  	dart: dart,
  	slot_machine: slot_machine,
  	"8ball": "🎱",
  	game_die: game_die,
  	bowling: bowling,
  	flower_playing_cards: flower_playing_cards,
  	musical_note: musical_note,
  	notes: notes,
  	saxophone: saxophone,
  	guitar: guitar,
  	musical_keyboard: musical_keyboard,
  	trumpet: trumpet,
  	violin: violin,
  	musical_score: musical_score,
  	running_shirt_with_sash: running_shirt_with_sash,
  	tennis: tennis,
  	ski: ski,
  	basketball: basketball,
  	checkered_flag: checkered_flag,
  	snowboarder: snowboarder,
  	runner: runner,
  	running: running,
  	surfer: surfer,
  	sports_medal: sports_medal,
  	trophy: trophy,
  	horse_racing: horse_racing,
  	football: football,
  	rugby_football: rugby_football,
  	swimmer: swimmer,
  	weight_lifter: weight_lifter,
  	golfer: golfer,
  	racing_motorcycle: racing_motorcycle,
  	racing_car: racing_car,
  	cricket_bat_and_ball: cricket_bat_and_ball,
  	volleyball: volleyball,
  	field_hockey_stick_and_ball: field_hockey_stick_and_ball,
  	ice_hockey_stick_and_puck: ice_hockey_stick_and_puck,
  	table_tennis_paddle_and_ball: table_tennis_paddle_and_ball,
  	snow_capped_mountain: snow_capped_mountain,
  	camping: camping,
  	beach_with_umbrella: beach_with_umbrella,
  	building_construction: building_construction,
  	house_buildings: house_buildings,
  	cityscape: cityscape,
  	derelict_house_building: derelict_house_building,
  	classical_building: classical_building,
  	desert: desert,
  	desert_island: desert_island,
  	national_park: national_park,
  	stadium: stadium,
  	house: house,
  	house_with_garden: house_with_garden,
  	office: office,
  	post_office: post_office,
  	european_post_office: european_post_office,
  	hospital: hospital,
  	bank: bank,
  	atm: atm,
  	hotel: hotel,
  	love_hotel: love_hotel,
  	convenience_store: convenience_store,
  	school: school,
  	department_store: department_store,
  	factory: factory,
  	izakaya_lantern: izakaya_lantern,
  	lantern: lantern,
  	japanese_castle: japanese_castle,
  	european_castle: european_castle,
  	waving_white_flag: waving_white_flag,
  	waving_black_flag: waving_black_flag,
  	rosette: rosette,
  	label: label,
  	badminton_racquet_and_shuttlecock: badminton_racquet_and_shuttlecock,
  	bow_and_arrow: bow_and_arrow,
  	amphora: amphora,
  	"skin-tone-2": "🏻",
  	"skin-tone-3": "🏼",
  	"skin-tone-4": "🏽",
  	"skin-tone-5": "🏾",
  	"skin-tone-6": "🏿",
  	rat: rat,
  	mouse2: mouse2,
  	ox: ox,
  	water_buffalo: water_buffalo,
  	cow2: cow2,
  	tiger2: tiger2,
  	leopard: leopard,
  	rabbit2: rabbit2,
  	cat2: cat2,
  	dragon: dragon,
  	crocodile: crocodile,
  	whale2: whale2,
  	snail: snail,
  	snake: snake,
  	racehorse: racehorse,
  	ram: ram,
  	goat: goat,
  	sheep: sheep,
  	monkey: monkey,
  	rooster: rooster,
  	chicken: chicken,
  	dog2: dog2,
  	pig2: pig2,
  	boar: boar,
  	elephant: elephant,
  	octopus: octopus,
  	shell: shell,
  	bug: bug,
  	ant: ant,
  	bee: bee,
  	honeybee: honeybee,
  	beetle: beetle,
  	fish: fish,
  	tropical_fish: tropical_fish,
  	blowfish: blowfish,
  	turtle: turtle,
  	hatching_chick: hatching_chick,
  	baby_chick: baby_chick,
  	hatched_chick: hatched_chick,
  	bird: bird,
  	penguin: penguin,
  	koala: koala,
  	poodle: poodle,
  	dromedary_camel: dromedary_camel,
  	camel: camel,
  	dolphin: dolphin,
  	flipper: flipper,
  	mouse: mouse,
  	cow: cow,
  	tiger: tiger,
  	rabbit: rabbit,
  	cat: cat,
  	dragon_face: dragon_face,
  	whale: whale,
  	horse: horse,
  	monkey_face: monkey_face,
  	dog: dog,
  	pig: pig,
  	frog: frog,
  	hamster: hamster,
  	wolf: wolf,
  	bear: bear,
  	panda_face: panda_face,
  	pig_nose: pig_nose,
  	feet: feet,
  	paw_prints: paw_prints,
  	chipmunk: chipmunk,
  	eyes: eyes,
  	eye: eye,
  	ear: ear,
  	nose: nose,
  	lips: lips,
  	tongue: tongue,
  	point_up_2: point_up_2,
  	point_down: point_down,
  	point_left: point_left,
  	point_right: point_right,
  	facepunch: facepunch,
  	punch: punch,
  	wave: wave,
  	ok_hand: ok_hand,
  	"+1": "👍",
  	thumbsup: thumbsup,
  	"-1": "👎",
  	thumbsdown: thumbsdown,
  	clap: clap,
  	open_hands: open_hands,
  	crown: crown,
  	womans_hat: womans_hat,
  	eyeglasses: eyeglasses,
  	necktie: necktie,
  	shirt: shirt,
  	tshirt: tshirt,
  	jeans: jeans,
  	dress: dress,
  	kimono: kimono,
  	bikini: bikini,
  	womans_clothes: womans_clothes,
  	purse: purse,
  	handbag: handbag,
  	pouch: pouch,
  	mans_shoe: mans_shoe,
  	shoe: shoe,
  	athletic_shoe: athletic_shoe,
  	high_heel: high_heel,
  	sandal: sandal,
  	boot: boot,
  	footprints: footprints,
  	bust_in_silhouette: bust_in_silhouette,
  	busts_in_silhouette: busts_in_silhouette,
  	boy: boy,
  	girl: girl,
  	man: man,
  	woman: woman,
  	family: family,
  	"man-woman-boy": "👨‍👩‍👦",
  	couple: couple,
  	man_and_woman_holding_hands: man_and_woman_holding_hands,
  	two_men_holding_hands: two_men_holding_hands,
  	two_women_holding_hands: two_women_holding_hands,
  	cop: cop,
  	dancers: dancers,
  	bride_with_veil: bride_with_veil,
  	person_with_blond_hair: person_with_blond_hair,
  	man_with_gua_pi_mao: man_with_gua_pi_mao,
  	man_with_turban: man_with_turban,
  	older_man: older_man,
  	older_woman: older_woman,
  	baby: baby,
  	construction_worker: construction_worker,
  	princess: princess,
  	japanese_ogre: japanese_ogre,
  	japanese_goblin: japanese_goblin,
  	ghost: ghost,
  	angel: angel,
  	alien: alien,
  	space_invader: space_invader,
  	imp: imp,
  	skull: skull,
  	information_desk_person: information_desk_person,
  	guardsman: guardsman,
  	dancer: dancer,
  	lipstick: lipstick,
  	nail_care: nail_care,
  	massage: massage,
  	haircut: haircut,
  	barber: barber,
  	syringe: syringe,
  	pill: pill,
  	kiss: kiss,
  	love_letter: love_letter,
  	ring: ring,
  	gem: gem,
  	couplekiss: couplekiss,
  	bouquet: bouquet,
  	couple_with_heart: couple_with_heart,
  	wedding: wedding,
  	heartbeat: heartbeat,
  	broken_heart: broken_heart,
  	two_hearts: two_hearts,
  	sparkling_heart: sparkling_heart,
  	heartpulse: heartpulse,
  	cupid: cupid,
  	blue_heart: blue_heart,
  	green_heart: green_heart,
  	yellow_heart: yellow_heart,
  	purple_heart: purple_heart,
  	gift_heart: gift_heart,
  	revolving_hearts: revolving_hearts,
  	heart_decoration: heart_decoration,
  	diamond_shape_with_a_dot_inside: diamond_shape_with_a_dot_inside,
  	bulb: bulb,
  	anger: anger,
  	bomb: bomb,
  	zzz: zzz,
  	boom: boom,
  	collision: collision,
  	sweat_drops: sweat_drops,
  	droplet: droplet,
  	dash: dash,
  	hankey: hankey,
  	poop: poop,
  	shit: shit,
  	muscle: muscle,
  	dizzy: dizzy,
  	speech_balloon: speech_balloon,
  	thought_balloon: thought_balloon,
  	white_flower: white_flower,
  	moneybag: moneybag,
  	currency_exchange: currency_exchange,
  	heavy_dollar_sign: heavy_dollar_sign,
  	credit_card: credit_card,
  	yen: yen,
  	dollar: dollar,
  	euro: euro,
  	pound: pound,
  	money_with_wings: money_with_wings,
  	chart: chart,
  	seat: seat,
  	computer: computer,
  	briefcase: briefcase,
  	minidisc: minidisc,
  	floppy_disk: floppy_disk,
  	cd: cd,
  	dvd: dvd,
  	file_folder: file_folder,
  	open_file_folder: open_file_folder,
  	page_with_curl: page_with_curl,
  	page_facing_up: page_facing_up,
  	date: date,
  	calendar: calendar,
  	card_index: card_index,
  	chart_with_upwards_trend: chart_with_upwards_trend,
  	chart_with_downwards_trend: chart_with_downwards_trend,
  	bar_chart: bar_chart,
  	clipboard: clipboard,
  	pushpin: pushpin,
  	round_pushpin: round_pushpin,
  	paperclip: paperclip,
  	straight_ruler: straight_ruler,
  	triangular_ruler: triangular_ruler,
  	bookmark_tabs: bookmark_tabs,
  	ledger: ledger,
  	notebook: notebook,
  	notebook_with_decorative_cover: notebook_with_decorative_cover,
  	closed_book: closed_book,
  	book: book,
  	open_book: open_book,
  	green_book: green_book,
  	blue_book: blue_book,
  	orange_book: orange_book,
  	books: books,
  	name_badge: name_badge,
  	scroll: scroll,
  	memo: memo,
  	pencil: pencil,
  	telephone_receiver: telephone_receiver,
  	pager: pager,
  	fax: fax,
  	satellite: satellite,
  	loudspeaker: loudspeaker,
  	mega: mega,
  	outbox_tray: outbox_tray,
  	inbox_tray: inbox_tray,
  	"package": "📦",
  	"e-mail": "📧",
  	incoming_envelope: incoming_envelope,
  	envelope_with_arrow: envelope_with_arrow,
  	mailbox_closed: mailbox_closed,
  	mailbox: mailbox,
  	mailbox_with_mail: mailbox_with_mail,
  	mailbox_with_no_mail: mailbox_with_no_mail,
  	postbox: postbox,
  	postal_horn: postal_horn,
  	newspaper: newspaper,
  	iphone: iphone,
  	calling: calling,
  	vibration_mode: vibration_mode,
  	mobile_phone_off: mobile_phone_off,
  	no_mobile_phones: no_mobile_phones,
  	signal_strength: signal_strength,
  	camera: camera,
  	camera_with_flash: camera_with_flash,
  	video_camera: video_camera,
  	tv: tv,
  	radio: radio,
  	vhs: vhs,
  	film_projector: film_projector,
  	prayer_beads: prayer_beads,
  	twisted_rightwards_arrows: twisted_rightwards_arrows,
  	repeat: repeat,
  	repeat_one: repeat_one,
  	arrows_clockwise: arrows_clockwise,
  	arrows_counterclockwise: arrows_counterclockwise,
  	low_brightness: low_brightness,
  	high_brightness: high_brightness,
  	mute: mute,
  	speaker: speaker,
  	sound: sound,
  	loud_sound: loud_sound,
  	battery: battery,
  	electric_plug: electric_plug,
  	mag: mag,
  	mag_right: mag_right,
  	lock_with_ink_pen: lock_with_ink_pen,
  	closed_lock_with_key: closed_lock_with_key,
  	key: key,
  	lock: lock,
  	unlock: unlock,
  	bell: bell,
  	no_bell: no_bell,
  	bookmark: bookmark,
  	link: link,
  	radio_button: radio_button,
  	back: back,
  	end: end,
  	on: on,
  	soon: soon,
  	top: top,
  	underage: underage,
  	keycap_ten: keycap_ten,
  	capital_abcd: capital_abcd,
  	abcd: abcd,
  	symbols: symbols,
  	abc: abc,
  	fire: fire,
  	flashlight: flashlight,
  	wrench: wrench,
  	hammer: hammer,
  	nut_and_bolt: nut_and_bolt,
  	hocho: hocho,
  	knife: knife,
  	gun: gun,
  	microscope: microscope,
  	telescope: telescope,
  	crystal_ball: crystal_ball,
  	six_pointed_star: six_pointed_star,
  	beginner: beginner,
  	trident: trident,
  	black_square_button: black_square_button,
  	white_square_button: white_square_button,
  	red_circle: red_circle,
  	large_blue_circle: large_blue_circle,
  	large_orange_diamond: large_orange_diamond,
  	large_blue_diamond: large_blue_diamond,
  	small_orange_diamond: small_orange_diamond,
  	small_blue_diamond: small_blue_diamond,
  	small_red_triangle: small_red_triangle,
  	small_red_triangle_down: small_red_triangle_down,
  	arrow_up_small: arrow_up_small,
  	arrow_down_small: arrow_down_small,
  	om_symbol: om_symbol,
  	dove_of_peace: dove_of_peace,
  	kaaba: kaaba,
  	mosque: mosque,
  	synagogue: synagogue,
  	menorah_with_nine_branches: menorah_with_nine_branches,
  	clock1: clock1,
  	clock2: clock2,
  	clock3: clock3,
  	clock4: clock4,
  	clock5: clock5,
  	clock6: clock6,
  	clock7: clock7,
  	clock8: clock8,
  	clock9: clock9,
  	clock10: clock10,
  	clock11: clock11,
  	clock12: clock12,
  	clock130: clock130,
  	clock230: clock230,
  	clock330: clock330,
  	clock430: clock430,
  	clock530: clock530,
  	clock630: clock630,
  	clock730: clock730,
  	clock830: clock830,
  	clock930: clock930,
  	clock1030: clock1030,
  	clock1130: clock1130,
  	clock1230: clock1230,
  	candle: candle,
  	mantelpiece_clock: mantelpiece_clock,
  	hole: hole,
  	man_in_business_suit_levitating: man_in_business_suit_levitating,
  	sleuth_or_spy: sleuth_or_spy,
  	dark_sunglasses: dark_sunglasses,
  	spider: spider,
  	spider_web: spider_web,
  	joystick: joystick,
  	linked_paperclips: linked_paperclips,
  	lower_left_ballpoint_pen: lower_left_ballpoint_pen,
  	lower_left_fountain_pen: lower_left_fountain_pen,
  	lower_left_paintbrush: lower_left_paintbrush,
  	lower_left_crayon: lower_left_crayon,
  	raised_hand_with_fingers_splayed: raised_hand_with_fingers_splayed,
  	middle_finger: middle_finger,
  	reversed_hand_with_middle_finger_extended: reversed_hand_with_middle_finger_extended,
  	"spock-hand": "🖖",
  	desktop_computer: desktop_computer,
  	printer: printer,
  	three_button_mouse: three_button_mouse,
  	trackball: trackball,
  	frame_with_picture: frame_with_picture,
  	card_index_dividers: card_index_dividers,
  	card_file_box: card_file_box,
  	file_cabinet: file_cabinet,
  	wastebasket: wastebasket,
  	spiral_note_pad: spiral_note_pad,
  	spiral_calendar_pad: spiral_calendar_pad,
  	compression: compression,
  	old_key: old_key,
  	rolled_up_newspaper: rolled_up_newspaper,
  	dagger_knife: dagger_knife,
  	speaking_head_in_silhouette: speaking_head_in_silhouette,
  	left_speech_bubble: left_speech_bubble,
  	right_anger_bubble: right_anger_bubble,
  	ballot_box_with_ballot: ballot_box_with_ballot,
  	world_map: world_map,
  	mount_fuji: mount_fuji,
  	tokyo_tower: tokyo_tower,
  	statue_of_liberty: statue_of_liberty,
  	japan: japan,
  	moyai: moyai,
  	grinning: grinning,
  	grin: grin,
  	joy: joy,
  	smiley: smiley,
  	smile: smile,
  	sweat_smile: sweat_smile,
  	laughing: laughing,
  	satisfied: satisfied,
  	innocent: innocent,
  	smiling_imp: smiling_imp,
  	wink: wink,
  	blush: blush,
  	yum: yum,
  	relieved: relieved,
  	heart_eyes: heart_eyes,
  	sunglasses: sunglasses,
  	smirk: smirk,
  	neutral_face: neutral_face,
  	expressionless: expressionless,
  	unamused: unamused,
  	sweat: sweat,
  	pensive: pensive,
  	confused: confused,
  	confounded: confounded,
  	kissing: kissing,
  	kissing_heart: kissing_heart,
  	kissing_smiling_eyes: kissing_smiling_eyes,
  	kissing_closed_eyes: kissing_closed_eyes,
  	stuck_out_tongue: stuck_out_tongue,
  	stuck_out_tongue_winking_eye: stuck_out_tongue_winking_eye,
  	stuck_out_tongue_closed_eyes: stuck_out_tongue_closed_eyes,
  	disappointed: disappointed,
  	worried: worried,
  	angry: angry,
  	rage: rage,
  	cry: cry,
  	persevere: persevere,
  	triumph: triumph,
  	disappointed_relieved: disappointed_relieved,
  	frowning: frowning,
  	anguished: anguished,
  	fearful: fearful,
  	weary: weary,
  	sleepy: sleepy,
  	tired_face: tired_face,
  	grimacing: grimacing,
  	sob: sob,
  	open_mouth: open_mouth,
  	hushed: hushed,
  	cold_sweat: cold_sweat,
  	scream: scream,
  	astonished: astonished,
  	flushed: flushed,
  	sleeping: sleeping,
  	dizzy_face: dizzy_face,
  	no_mouth: no_mouth,
  	mask: mask,
  	smile_cat: smile_cat,
  	joy_cat: joy_cat,
  	smiley_cat: smiley_cat,
  	heart_eyes_cat: heart_eyes_cat,
  	smirk_cat: smirk_cat,
  	kissing_cat: kissing_cat,
  	pouting_cat: pouting_cat,
  	crying_cat_face: crying_cat_face,
  	scream_cat: scream_cat,
  	slightly_frowning_face: slightly_frowning_face,
  	slightly_smiling_face: slightly_smiling_face,
  	upside_down_face: upside_down_face,
  	face_with_rolling_eyes: face_with_rolling_eyes,
  	no_good: no_good,
  	ok_woman: ok_woman,
  	bow: bow,
  	see_no_evil: see_no_evil,
  	hear_no_evil: hear_no_evil,
  	speak_no_evil: speak_no_evil,
  	raising_hand: raising_hand,
  	raised_hands: raised_hands,
  	person_frowning: person_frowning,
  	person_with_pouting_face: person_with_pouting_face,
  	pray: pray,
  	rocket: rocket,
  	helicopter: helicopter,
  	steam_locomotive: steam_locomotive,
  	railway_car: railway_car,
  	bullettrain_side: bullettrain_side,
  	bullettrain_front: bullettrain_front,
  	train2: train2,
  	metro: metro,
  	light_rail: light_rail,
  	station: station,
  	tram: tram,
  	train: train,
  	bus: bus,
  	oncoming_bus: oncoming_bus,
  	trolleybus: trolleybus,
  	busstop: busstop,
  	minibus: minibus,
  	ambulance: ambulance,
  	fire_engine: fire_engine,
  	police_car: police_car,
  	oncoming_police_car: oncoming_police_car,
  	taxi: taxi,
  	oncoming_taxi: oncoming_taxi,
  	car: car,
  	red_car: red_car,
  	oncoming_automobile: oncoming_automobile,
  	blue_car: blue_car,
  	truck: truck,
  	articulated_lorry: articulated_lorry,
  	tractor: tractor,
  	monorail: monorail,
  	mountain_railway: mountain_railway,
  	suspension_railway: suspension_railway,
  	mountain_cableway: mountain_cableway,
  	aerial_tramway: aerial_tramway,
  	ship: ship,
  	rowboat: rowboat,
  	speedboat: speedboat,
  	traffic_light: traffic_light,
  	vertical_traffic_light: vertical_traffic_light,
  	construction: construction,
  	rotating_light: rotating_light,
  	triangular_flag_on_post: triangular_flag_on_post,
  	door: door,
  	no_entry_sign: no_entry_sign,
  	smoking: smoking,
  	no_smoking: no_smoking,
  	put_litter_in_its_place: put_litter_in_its_place,
  	do_not_litter: do_not_litter,
  	potable_water: potable_water,
  	"non-potable_water": "🚱",
  	bike: bike,
  	no_bicycles: no_bicycles,
  	bicyclist: bicyclist,
  	mountain_bicyclist: mountain_bicyclist,
  	walking: walking,
  	no_pedestrians: no_pedestrians,
  	children_crossing: children_crossing,
  	mens: mens,
  	womens: womens,
  	restroom: restroom,
  	baby_symbol: baby_symbol,
  	toilet: toilet,
  	wc: wc,
  	shower: shower,
  	bath: bath,
  	bathtub: bathtub,
  	passport_control: passport_control,
  	customs: customs,
  	baggage_claim: baggage_claim,
  	left_luggage: left_luggage,
  	couch_and_lamp: couch_and_lamp,
  	sleeping_accommodation: sleeping_accommodation,
  	shopping_bags: shopping_bags,
  	bellhop_bell: bellhop_bell,
  	bed: bed,
  	place_of_worship: place_of_worship,
  	hammer_and_wrench: hammer_and_wrench,
  	shield: shield,
  	oil_drum: oil_drum,
  	motorway: motorway,
  	railway_track: railway_track,
  	motor_boat: motor_boat,
  	small_airplane: small_airplane,
  	airplane_departure: airplane_departure,
  	airplane_arriving: airplane_arriving,
  	passenger_ship: passenger_ship,
  	zipper_mouth_face: zipper_mouth_face,
  	money_mouth_face: money_mouth_face,
  	face_with_thermometer: face_with_thermometer,
  	nerd_face: nerd_face,
  	thinking_face: thinking_face,
  	face_with_head_bandage: face_with_head_bandage,
  	robot_face: robot_face,
  	hugging_face: hugging_face,
  	the_horns: the_horns,
  	sign_of_the_horns: sign_of_the_horns,
  	crab: crab,
  	lion_face: lion_face,
  	scorpion: scorpion,
  	turkey: turkey,
  	unicorn_face: unicorn_face,
  	cheese_wedge: cheese_wedge,
  	hash: hash,
  	keycap_star: keycap_star,
  	zero: zero,
  	one: one,
  	two: two,
  	three: three,
  	four: four,
  	five: five,
  	six: six,
  	seven: seven,
  	eight: eight,
  	nine: nine,
  	"flag-ac": "🇦🇨",
  	"flag-ad": "🇦🇩",
  	"flag-ae": "🇦🇪",
  	"flag-af": "🇦🇫",
  	"flag-ag": "🇦🇬",
  	"flag-ai": "🇦🇮",
  	"flag-al": "🇦🇱",
  	"flag-am": "🇦🇲",
  	"flag-ao": "🇦🇴",
  	"flag-aq": "🇦🇶",
  	"flag-ar": "🇦🇷",
  	"flag-as": "🇦🇸",
  	"flag-at": "🇦🇹",
  	"flag-au": "🇦🇺",
  	"flag-aw": "🇦🇼",
  	"flag-ax": "🇦🇽",
  	"flag-az": "🇦🇿",
  	"flag-ba": "🇧🇦",
  	"flag-bb": "🇧🇧",
  	"flag-bd": "🇧🇩",
  	"flag-be": "🇧🇪",
  	"flag-bf": "🇧🇫",
  	"flag-bg": "🇧🇬",
  	"flag-bh": "🇧🇭",
  	"flag-bi": "🇧🇮",
  	"flag-bj": "🇧🇯",
  	"flag-bl": "🇧🇱",
  	"flag-bm": "🇧🇲",
  	"flag-bn": "🇧🇳",
  	"flag-bo": "🇧🇴",
  	"flag-bq": "🇧🇶",
  	"flag-br": "🇧🇷",
  	"flag-bs": "🇧🇸",
  	"flag-bt": "🇧🇹",
  	"flag-bv": "🇧🇻",
  	"flag-bw": "🇧🇼",
  	"flag-by": "🇧🇾",
  	"flag-bz": "🇧🇿",
  	"flag-ca": "🇨🇦",
  	"flag-cc": "🇨🇨",
  	"flag-cd": "🇨🇩",
  	"flag-cf": "🇨🇫",
  	"flag-cg": "🇨🇬",
  	"flag-ch": "🇨🇭",
  	"flag-ci": "🇨🇮",
  	"flag-ck": "🇨🇰",
  	"flag-cl": "🇨🇱",
  	"flag-cm": "🇨🇲",
  	"flag-cn": "🇨🇳",
  	cn: cn,
  	"flag-co": "🇨🇴",
  	"flag-cp": "🇨🇵",
  	"flag-cr": "🇨🇷",
  	"flag-cu": "🇨🇺",
  	"flag-cv": "🇨🇻",
  	"flag-cw": "🇨🇼",
  	"flag-cx": "🇨🇽",
  	"flag-cy": "🇨🇾",
  	"flag-cz": "🇨🇿",
  	"flag-de": "🇩🇪",
  	de: de,
  	"flag-dg": "🇩🇬",
  	"flag-dj": "🇩🇯",
  	"flag-dk": "🇩🇰",
  	"flag-dm": "🇩🇲",
  	"flag-do": "🇩🇴",
  	"flag-dz": "🇩🇿",
  	"flag-ea": "🇪🇦",
  	"flag-ec": "🇪🇨",
  	"flag-ee": "🇪🇪",
  	"flag-eg": "🇪🇬",
  	"flag-eh": "🇪🇭",
  	"flag-er": "🇪🇷",
  	"flag-es": "🇪🇸",
  	es: es,
  	"flag-et": "🇪🇹",
  	"flag-eu": "🇪🇺",
  	"flag-fi": "🇫🇮",
  	"flag-fj": "🇫🇯",
  	"flag-fk": "🇫🇰",
  	"flag-fm": "🇫🇲",
  	"flag-fo": "🇫🇴",
  	"flag-fr": "🇫🇷",
  	fr: fr,
  	"flag-ga": "🇬🇦",
  	"flag-gb": "🇬🇧",
  	gb: gb,
  	uk: uk,
  	"flag-gd": "🇬🇩",
  	"flag-ge": "🇬🇪",
  	"flag-gf": "🇬🇫",
  	"flag-gg": "🇬🇬",
  	"flag-gh": "🇬🇭",
  	"flag-gi": "🇬🇮",
  	"flag-gl": "🇬🇱",
  	"flag-gm": "🇬🇲",
  	"flag-gn": "🇬🇳",
  	"flag-gp": "🇬🇵",
  	"flag-gq": "🇬🇶",
  	"flag-gr": "🇬🇷",
  	"flag-gs": "🇬🇸",
  	"flag-gt": "🇬🇹",
  	"flag-gu": "🇬🇺",
  	"flag-gw": "🇬🇼",
  	"flag-gy": "🇬🇾",
  	"flag-hk": "🇭🇰",
  	"flag-hm": "🇭🇲",
  	"flag-hn": "🇭🇳",
  	"flag-hr": "🇭🇷",
  	"flag-ht": "🇭🇹",
  	"flag-hu": "🇭🇺",
  	"flag-ic": "🇮🇨",
  	"flag-id": "🇮🇩",
  	"flag-ie": "🇮🇪",
  	"flag-il": "🇮🇱",
  	"flag-im": "🇮🇲",
  	"flag-in": "🇮🇳",
  	"flag-io": "🇮🇴",
  	"flag-iq": "🇮🇶",
  	"flag-ir": "🇮🇷",
  	"flag-is": "🇮🇸",
  	"flag-it": "🇮🇹",
  	it: it,
  	"flag-je": "🇯🇪",
  	"flag-jm": "🇯🇲",
  	"flag-jo": "🇯🇴",
  	"flag-jp": "🇯🇵",
  	jp: jp,
  	"flag-ke": "🇰🇪",
  	"flag-kg": "🇰🇬",
  	"flag-kh": "🇰🇭",
  	"flag-ki": "🇰🇮",
  	"flag-km": "🇰🇲",
  	"flag-kn": "🇰🇳",
  	"flag-kp": "🇰🇵",
  	"flag-kr": "🇰🇷",
  	kr: kr,
  	"flag-kw": "🇰🇼",
  	"flag-ky": "🇰🇾",
  	"flag-kz": "🇰🇿",
  	"flag-la": "🇱🇦",
  	"flag-lb": "🇱🇧",
  	"flag-lc": "🇱🇨",
  	"flag-li": "🇱🇮",
  	"flag-lk": "🇱🇰",
  	"flag-lr": "🇱🇷",
  	"flag-ls": "🇱🇸",
  	"flag-lt": "🇱🇹",
  	"flag-lu": "🇱🇺",
  	"flag-lv": "🇱🇻",
  	"flag-ly": "🇱🇾",
  	"flag-ma": "🇲🇦",
  	"flag-mc": "🇲🇨",
  	"flag-md": "🇲🇩",
  	"flag-me": "🇲🇪",
  	"flag-mf": "🇲🇫",
  	"flag-mg": "🇲🇬",
  	"flag-mh": "🇲🇭",
  	"flag-mk": "🇲🇰",
  	"flag-ml": "🇲🇱",
  	"flag-mm": "🇲🇲",
  	"flag-mn": "🇲🇳",
  	"flag-mo": "🇲🇴",
  	"flag-mp": "🇲🇵",
  	"flag-mq": "🇲🇶",
  	"flag-mr": "🇲🇷",
  	"flag-ms": "🇲🇸",
  	"flag-mt": "🇲🇹",
  	"flag-mu": "🇲🇺",
  	"flag-mv": "🇲🇻",
  	"flag-mw": "🇲🇼",
  	"flag-mx": "🇲🇽",
  	"flag-my": "🇲🇾",
  	"flag-mz": "🇲🇿",
  	"flag-na": "🇳🇦",
  	"flag-nc": "🇳🇨",
  	"flag-ne": "🇳🇪",
  	"flag-nf": "🇳🇫",
  	"flag-ng": "🇳🇬",
  	"flag-ni": "🇳🇮",
  	"flag-nl": "🇳🇱",
  	"flag-no": "🇳🇴",
  	"flag-np": "🇳🇵",
  	"flag-nr": "🇳🇷",
  	"flag-nu": "🇳🇺",
  	"flag-nz": "🇳🇿",
  	"flag-om": "🇴🇲",
  	"flag-pa": "🇵🇦",
  	"flag-pe": "🇵🇪",
  	"flag-pf": "🇵🇫",
  	"flag-pg": "🇵🇬",
  	"flag-ph": "🇵🇭",
  	"flag-pk": "🇵🇰",
  	"flag-pl": "🇵🇱",
  	"flag-pm": "🇵🇲",
  	"flag-pn": "🇵🇳",
  	"flag-pr": "🇵🇷",
  	"flag-ps": "🇵🇸",
  	"flag-pt": "🇵🇹",
  	"flag-pw": "🇵🇼",
  	"flag-py": "🇵🇾",
  	"flag-qa": "🇶🇦",
  	"flag-re": "🇷🇪",
  	"flag-ro": "🇷🇴",
  	"flag-rs": "🇷🇸",
  	"flag-ru": "🇷🇺",
  	ru: ru,
  	"flag-rw": "🇷🇼",
  	"flag-sa": "🇸🇦",
  	"flag-sb": "🇸🇧",
  	"flag-sc": "🇸🇨",
  	"flag-sd": "🇸🇩",
  	"flag-se": "🇸🇪",
  	"flag-sg": "🇸🇬",
  	"flag-sh": "🇸🇭",
  	"flag-si": "🇸🇮",
  	"flag-sj": "🇸🇯",
  	"flag-sk": "🇸🇰",
  	"flag-sl": "🇸🇱",
  	"flag-sm": "🇸🇲",
  	"flag-sn": "🇸🇳",
  	"flag-so": "🇸🇴",
  	"flag-sr": "🇸🇷",
  	"flag-ss": "🇸🇸",
  	"flag-st": "🇸🇹",
  	"flag-sv": "🇸🇻",
  	"flag-sx": "🇸🇽",
  	"flag-sy": "🇸🇾",
  	"flag-sz": "🇸🇿",
  	"flag-ta": "🇹🇦",
  	"flag-tc": "🇹🇨",
  	"flag-td": "🇹🇩",
  	"flag-tf": "🇹🇫",
  	"flag-tg": "🇹🇬",
  	"flag-th": "🇹🇭",
  	"flag-tj": "🇹🇯",
  	"flag-tk": "🇹🇰",
  	"flag-tl": "🇹🇱",
  	"flag-tm": "🇹🇲",
  	"flag-tn": "🇹🇳",
  	"flag-to": "🇹🇴",
  	"flag-tr": "🇹🇷",
  	"flag-tt": "🇹🇹",
  	"flag-tv": "🇹🇻",
  	"flag-tw": "🇹🇼",
  	"flag-tz": "🇹🇿",
  	"flag-ua": "🇺🇦",
  	"flag-ug": "🇺🇬",
  	"flag-um": "🇺🇲",
  	"flag-us": "🇺🇸",
  	us: us,
  	"flag-uy": "🇺🇾",
  	"flag-uz": "🇺🇿",
  	"flag-va": "🇻🇦",
  	"flag-vc": "🇻🇨",
  	"flag-ve": "🇻🇪",
  	"flag-vg": "🇻🇬",
  	"flag-vi": "🇻🇮",
  	"flag-vn": "🇻🇳",
  	"flag-vu": "🇻🇺",
  	"flag-wf": "🇼🇫",
  	"flag-ws": "🇼🇸",
  	"flag-xk": "🇽🇰",
  	"flag-ye": "🇾🇪",
  	"flag-yt": "🇾🇹",
  	"flag-za": "🇿🇦",
  	"flag-zm": "🇿🇲",
  	"flag-zw": "🇿🇼",
  	"man-man-boy": "👨‍👨‍👦",
  	"man-man-boy-boy": "👨‍👨‍👦‍👦",
  	"man-man-girl": "👨‍👨‍👧",
  	"man-man-girl-boy": "👨‍👨‍👧‍👦",
  	"man-man-girl-girl": "👨‍👨‍👧‍👧",
  	"man-woman-boy-boy": "👨‍👩‍👦‍👦",
  	"man-woman-girl": "👨‍👩‍👧",
  	"man-woman-girl-boy": "👨‍👩‍👧‍👦",
  	"man-woman-girl-girl": "👨‍👩‍👧‍👧",
  	"man-heart-man": "👨‍❤️‍👨",
  	"man-kiss-man": "👨‍❤️‍💋‍👨",
  	"woman-woman-boy": "👩‍👩‍👦",
  	"woman-woman-boy-boy": "👩‍👩‍👦‍👦",
  	"woman-woman-girl": "👩‍👩‍👧",
  	"woman-woman-girl-boy": "👩‍👩‍👧‍👦",
  	"woman-woman-girl-girl": "👩‍👩‍👧‍👧",
  	"woman-heart-woman": "👩‍❤️‍👩",
  	"woman-kiss-woman": "👩‍❤️‍💋‍👩"
  };

  var emoji$1 = /*#__PURE__*/Object.freeze({
    interrobang: interrobang,
    tm: tm,
    information_source: information_source,
    left_right_arrow: left_right_arrow,
    arrow_up_down: arrow_up_down,
    arrow_upper_left: arrow_upper_left,
    arrow_upper_right: arrow_upper_right,
    arrow_lower_right: arrow_lower_right,
    arrow_lower_left: arrow_lower_left,
    keyboard: keyboard,
    sunny: sunny,
    cloud: cloud,
    umbrella: umbrella,
    showman: showman,
    comet: comet,
    ballot_box_with_check: ballot_box_with_check,
    coffee: coffee,
    shamrock: shamrock,
    skull_and_crossbones: skull_and_crossbones,
    radioactive_sign: radioactive_sign,
    biohazard_sign: biohazard_sign,
    orthodox_cross: orthodox_cross,
    wheel_of_dharma: wheel_of_dharma,
    white_frowning_face: white_frowning_face,
    aries: aries,
    taurus: taurus,
    sagittarius: sagittarius,
    capricorn: capricorn,
    aquarius: aquarius,
    pisces: pisces,
    spades: spades,
    clubs: clubs,
    hearts: hearts,
    diamonds: diamonds,
    hotsprings: hotsprings,
    hammer_and_pick: hammer_and_pick,
    anchor: anchor,
    crossed_swords: crossed_swords,
    scales: scales,
    alembic: alembic,
    gear: gear,
    scissors: scissors,
    white_check_mark: white_check_mark,
    airplane: airplane,
    email: email,
    envelope: envelope,
    black_nib: black_nib,
    heavy_check_mark: heavy_check_mark,
    heavy_multiplication_x: heavy_multiplication_x,
    star_of_david: star_of_david,
    sparkles: sparkles,
    eight_spoked_asterisk: eight_spoked_asterisk,
    eight_pointed_black_star: eight_pointed_black_star,
    snowflake: snowflake,
    sparkle: sparkle,
    question: question,
    grey_question: grey_question,
    grey_exclamation: grey_exclamation,
    exclamation: exclamation,
    heavy_exclamation_mark: heavy_exclamation_mark,
    heavy_heart_exclamation_mark_ornament: heavy_heart_exclamation_mark_ornament,
    heart: heart,
    heavy_plus_sign: heavy_plus_sign,
    heavy_minus_sign: heavy_minus_sign,
    heavy_division_sign: heavy_division_sign,
    arrow_heading_up: arrow_heading_up,
    arrow_heading_down: arrow_heading_down,
    wavy_dash: wavy_dash,
    congratulations: congratulations,
    secret: secret,
    copyright: copyright,
    registered: registered,
    bangbang: bangbang,
    leftwards_arrow_with_hook: leftwards_arrow_with_hook,
    arrow_right_hook: arrow_right_hook,
    watch: watch,
    hourglass: hourglass,
    fast_forward: fast_forward,
    rewind: rewind,
    arrow_double_up: arrow_double_up,
    arrow_double_down: arrow_double_down,
    black_right_pointing_double_triangle_with_vertical_bar: black_right_pointing_double_triangle_with_vertical_bar,
    black_left_pointing_double_triangle_with_vertical_bar: black_left_pointing_double_triangle_with_vertical_bar,
    black_right_pointing_triangle_with_double_vertical_bar: black_right_pointing_triangle_with_double_vertical_bar,
    alarm_clock: alarm_clock,
    stopwatch: stopwatch,
    timer_clock: timer_clock,
    hourglass_flowing_sand: hourglass_flowing_sand,
    double_vertical_bar: double_vertical_bar,
    black_square_for_stop: black_square_for_stop,
    black_circle_for_record: black_circle_for_record,
    m: m,
    black_small_square: black_small_square,
    white_small_square: white_small_square,
    arrow_forward: arrow_forward,
    arrow_backward: arrow_backward,
    white_medium_square: white_medium_square,
    black_medium_square: black_medium_square,
    white_medium_small_square: white_medium_small_square,
    black_medium_small_square: black_medium_small_square,
    phone: phone,
    telephone: telephone,
    point_up: point_up,
    star_and_crescent: star_and_crescent,
    peace_symbol: peace_symbol,
    yin_yang: yin_yang,
    relaxed: relaxed,
    gemini: gemini,
    cancer: cancer,
    leo: leo,
    virgo: virgo,
    libra: libra,
    scorpius: scorpius,
    recycle: recycle,
    wheelchair: wheelchair,
    atom_symbol: atom_symbol,
    fleur_de_lis: fleur_de_lis,
    warning: warning,
    zap: zap,
    white_circle: white_circle,
    black_circle: black_circle,
    coffin: coffin,
    funeral_urn: funeral_urn,
    soccer: soccer,
    baseball: baseball,
    snowman: snowman,
    partly_sunny: partly_sunny,
    thunder_cloud_and_rain: thunder_cloud_and_rain,
    ophiuchus: ophiuchus,
    pick: pick,
    helmet_with_white_cross: helmet_with_white_cross,
    chains: chains,
    no_entry: no_entry,
    shinto_shrine: shinto_shrine,
    church: church,
    mountain: mountain,
    umbrella_on_ground: umbrella_on_ground,
    fountain: fountain,
    golf: golf,
    ferry: ferry,
    boat: boat,
    sailboat: sailboat,
    skier: skier,
    ice_skate: ice_skate,
    person_with_ball: person_with_ball,
    tent: tent,
    fuelpump: fuelpump,
    fist: fist,
    hand: hand,
    raised_hand: raised_hand,
    v: v,
    writing_hand: writing_hand,
    pencil2: pencil2,
    latin_cross: latin_cross,
    x: x,
    negative_squared_cross_mark: negative_squared_cross_mark,
    arrow_right: arrow_right,
    curly_loop: curly_loop,
    loop: loop,
    arrow_left: arrow_left,
    arrow_up: arrow_up,
    arrow_down: arrow_down,
    black_large_square: black_large_square,
    white_large_square: white_large_square,
    star: star,
    o: o,
    part_alternation_mark: part_alternation_mark,
    mahjong: mahjong,
    black_joker: black_joker,
    a: a,
    b: b,
    o2: o2,
    parking: parking,
    ab: ab,
    cl: cl,
    cool: cool,
    free: free,
    id: id,
    ng: ng,
    ok: ok,
    sos: sos,
    up: up,
    vs: vs,
    koko: koko,
    sa: sa,
    u7121: u7121,
    u6307: u6307,
    u7981: u7981,
    u7a7a: u7a7a,
    u5408: u5408,
    u6e80: u6e80,
    u6709: u6709,
    u6708: u6708,
    u7533: u7533,
    u5272: u5272,
    u55b6: u55b6,
    ideograph_advantage: ideograph_advantage,
    accept: accept,
    cyclone: cyclone,
    foggy: foggy,
    closed_umbrella: closed_umbrella,
    night_with_stars: night_with_stars,
    sunrise_over_mountains: sunrise_over_mountains,
    sunrise: sunrise,
    city_sunset: city_sunset,
    city_sunrise: city_sunrise,
    rainbow: rainbow,
    bridge_at_night: bridge_at_night,
    ocean: ocean,
    volcano: volcano,
    milky_way: milky_way,
    earth_africa: earth_africa,
    earth_americas: earth_americas,
    earth_asia: earth_asia,
    globe_with_meridians: globe_with_meridians,
    new_moon: new_moon,
    waxing_crescent_moon: waxing_crescent_moon,
    first_quarter_moon: first_quarter_moon,
    moon: moon,
    waxing_gibbous_moon: waxing_gibbous_moon,
    full_moon: full_moon,
    waning_gibbous_moon: waning_gibbous_moon,
    last_quarter_moon: last_quarter_moon,
    waning_crescent_moon: waning_crescent_moon,
    crescent_moon: crescent_moon,
    new_moon_with_face: new_moon_with_face,
    first_quarter_moon_with_face: first_quarter_moon_with_face,
    last_quarter_moon_with_face: last_quarter_moon_with_face,
    full_moon_with_face: full_moon_with_face,
    sun_with_face: sun_with_face,
    star2: star2,
    stars: stars,
    thermometer: thermometer,
    mostly_sunny: mostly_sunny,
    sun_small_cloud: sun_small_cloud,
    barely_sunny: barely_sunny,
    sun_behind_cloud: sun_behind_cloud,
    partly_sunny_rain: partly_sunny_rain,
    sun_behind_rain_cloud: sun_behind_rain_cloud,
    rain_cloud: rain_cloud,
    snow_cloud: snow_cloud,
    lightning: lightning,
    lightning_cloud: lightning_cloud,
    tornado: tornado,
    tornado_cloud: tornado_cloud,
    fog: fog,
    wind_blowing_face: wind_blowing_face,
    hotdog: hotdog,
    taco: taco,
    burrito: burrito,
    chestnut: chestnut,
    seedling: seedling,
    evergreen_tree: evergreen_tree,
    deciduous_tree: deciduous_tree,
    palm_tree: palm_tree,
    cactus: cactus,
    hot_pepper: hot_pepper,
    tulip: tulip,
    cherry_blossom: cherry_blossom,
    rose: rose,
    hibiscus: hibiscus,
    sunflower: sunflower,
    blossom: blossom,
    corn: corn,
    ear_of_rice: ear_of_rice,
    herb: herb,
    four_leaf_clover: four_leaf_clover,
    maple_leaf: maple_leaf,
    fallen_leaf: fallen_leaf,
    leaves: leaves,
    mushroom: mushroom,
    tomato: tomato,
    eggplant: eggplant,
    grapes: grapes,
    melon: melon,
    watermelon: watermelon,
    tangerine: tangerine,
    lemon: lemon,
    banana: banana,
    pineapple: pineapple,
    apple: apple,
    green_apple: green_apple,
    pear: pear,
    peach: peach,
    cherries: cherries,
    strawberry: strawberry,
    hamburger: hamburger,
    pizza: pizza,
    meat_on_bone: meat_on_bone,
    poultry_leg: poultry_leg,
    rice_cracker: rice_cracker,
    rice_ball: rice_ball,
    rice: rice,
    curry: curry,
    ramen: ramen,
    spaghetti: spaghetti,
    bread: bread,
    fries: fries,
    sweet_potato: sweet_potato,
    dango: dango,
    oden: oden,
    sushi: sushi,
    fried_shrimp: fried_shrimp,
    fish_cake: fish_cake,
    icecream: icecream,
    shaved_ice: shaved_ice,
    ice_cream: ice_cream,
    doughnut: doughnut,
    cookie: cookie,
    chocolate_bar: chocolate_bar,
    candy: candy,
    lollipop: lollipop,
    custard: custard,
    honey_pot: honey_pot,
    cake: cake,
    bento: bento,
    stew: stew,
    egg: egg,
    fork_and_knife: fork_and_knife,
    tea: tea,
    sake: sake,
    wine_glass: wine_glass,
    cocktail: cocktail,
    tropical_drink: tropical_drink,
    beer: beer,
    beers: beers,
    baby_bottle: baby_bottle,
    knife_fork_plate: knife_fork_plate,
    champagne: champagne,
    popcorn: popcorn,
    ribbon: ribbon,
    gift: gift,
    birthday: birthday,
    jack_o_lantern: jack_o_lantern,
    christmas_tree: christmas_tree,
    santa: santa,
    fireworks: fireworks,
    sparkler: sparkler,
    balloon: balloon,
    tada: tada,
    confetti_ball: confetti_ball,
    tanabata_tree: tanabata_tree,
    crossed_flags: crossed_flags,
    bamboo: bamboo,
    dolls: dolls,
    flags: flags,
    wind_chime: wind_chime,
    rice_scene: rice_scene,
    school_satchel: school_satchel,
    mortar_board: mortar_board,
    medal: medal,
    reminder_ribbon: reminder_ribbon,
    studio_microphone: studio_microphone,
    level_slider: level_slider,
    control_knobs: control_knobs,
    film_frames: film_frames,
    admission_tickets: admission_tickets,
    carousel_horse: carousel_horse,
    ferris_wheel: ferris_wheel,
    roller_coaster: roller_coaster,
    fishing_pole_and_fish: fishing_pole_and_fish,
    microphone: microphone,
    movie_camera: movie_camera,
    cinema: cinema,
    headphones: headphones,
    art: art,
    tophat: tophat,
    circus_tent: circus_tent,
    ticket: ticket,
    clapper: clapper,
    performing_arts: performing_arts,
    video_game: video_game,
    dart: dart,
    slot_machine: slot_machine,
    game_die: game_die,
    bowling: bowling,
    flower_playing_cards: flower_playing_cards,
    musical_note: musical_note,
    notes: notes,
    saxophone: saxophone,
    guitar: guitar,
    musical_keyboard: musical_keyboard,
    trumpet: trumpet,
    violin: violin,
    musical_score: musical_score,
    running_shirt_with_sash: running_shirt_with_sash,
    tennis: tennis,
    ski: ski,
    basketball: basketball,
    checkered_flag: checkered_flag,
    snowboarder: snowboarder,
    runner: runner,
    running: running,
    surfer: surfer,
    sports_medal: sports_medal,
    trophy: trophy,
    horse_racing: horse_racing,
    football: football,
    rugby_football: rugby_football,
    swimmer: swimmer,
    weight_lifter: weight_lifter,
    golfer: golfer,
    racing_motorcycle: racing_motorcycle,
    racing_car: racing_car,
    cricket_bat_and_ball: cricket_bat_and_ball,
    volleyball: volleyball,
    field_hockey_stick_and_ball: field_hockey_stick_and_ball,
    ice_hockey_stick_and_puck: ice_hockey_stick_and_puck,
    table_tennis_paddle_and_ball: table_tennis_paddle_and_ball,
    snow_capped_mountain: snow_capped_mountain,
    camping: camping,
    beach_with_umbrella: beach_with_umbrella,
    building_construction: building_construction,
    house_buildings: house_buildings,
    cityscape: cityscape,
    derelict_house_building: derelict_house_building,
    classical_building: classical_building,
    desert: desert,
    desert_island: desert_island,
    national_park: national_park,
    stadium: stadium,
    house: house,
    house_with_garden: house_with_garden,
    office: office,
    post_office: post_office,
    european_post_office: european_post_office,
    hospital: hospital,
    bank: bank,
    atm: atm,
    hotel: hotel,
    love_hotel: love_hotel,
    convenience_store: convenience_store,
    school: school,
    department_store: department_store,
    factory: factory,
    izakaya_lantern: izakaya_lantern,
    lantern: lantern,
    japanese_castle: japanese_castle,
    european_castle: european_castle,
    waving_white_flag: waving_white_flag,
    waving_black_flag: waving_black_flag,
    rosette: rosette,
    label: label,
    badminton_racquet_and_shuttlecock: badminton_racquet_and_shuttlecock,
    bow_and_arrow: bow_and_arrow,
    amphora: amphora,
    rat: rat,
    mouse2: mouse2,
    ox: ox,
    water_buffalo: water_buffalo,
    cow2: cow2,
    tiger2: tiger2,
    leopard: leopard,
    rabbit2: rabbit2,
    cat2: cat2,
    dragon: dragon,
    crocodile: crocodile,
    whale2: whale2,
    snail: snail,
    snake: snake,
    racehorse: racehorse,
    ram: ram,
    goat: goat,
    sheep: sheep,
    monkey: monkey,
    rooster: rooster,
    chicken: chicken,
    dog2: dog2,
    pig2: pig2,
    boar: boar,
    elephant: elephant,
    octopus: octopus,
    shell: shell,
    bug: bug,
    ant: ant,
    bee: bee,
    honeybee: honeybee,
    beetle: beetle,
    fish: fish,
    tropical_fish: tropical_fish,
    blowfish: blowfish,
    turtle: turtle,
    hatching_chick: hatching_chick,
    baby_chick: baby_chick,
    hatched_chick: hatched_chick,
    bird: bird,
    penguin: penguin,
    koala: koala,
    poodle: poodle,
    dromedary_camel: dromedary_camel,
    camel: camel,
    dolphin: dolphin,
    flipper: flipper,
    mouse: mouse,
    cow: cow,
    tiger: tiger,
    rabbit: rabbit,
    cat: cat,
    dragon_face: dragon_face,
    whale: whale,
    horse: horse,
    monkey_face: monkey_face,
    dog: dog,
    pig: pig,
    frog: frog,
    hamster: hamster,
    wolf: wolf,
    bear: bear,
    panda_face: panda_face,
    pig_nose: pig_nose,
    feet: feet,
    paw_prints: paw_prints,
    chipmunk: chipmunk,
    eyes: eyes,
    eye: eye,
    ear: ear,
    nose: nose,
    lips: lips,
    tongue: tongue,
    point_up_2: point_up_2,
    point_down: point_down,
    point_left: point_left,
    point_right: point_right,
    facepunch: facepunch,
    punch: punch,
    wave: wave,
    ok_hand: ok_hand,
    thumbsup: thumbsup,
    thumbsdown: thumbsdown,
    clap: clap,
    open_hands: open_hands,
    crown: crown,
    womans_hat: womans_hat,
    eyeglasses: eyeglasses,
    necktie: necktie,
    shirt: shirt,
    tshirt: tshirt,
    jeans: jeans,
    dress: dress,
    kimono: kimono,
    bikini: bikini,
    womans_clothes: womans_clothes,
    purse: purse,
    handbag: handbag,
    pouch: pouch,
    mans_shoe: mans_shoe,
    shoe: shoe,
    athletic_shoe: athletic_shoe,
    high_heel: high_heel,
    sandal: sandal,
    boot: boot,
    footprints: footprints,
    bust_in_silhouette: bust_in_silhouette,
    busts_in_silhouette: busts_in_silhouette,
    boy: boy,
    girl: girl,
    man: man,
    woman: woman,
    family: family,
    couple: couple,
    man_and_woman_holding_hands: man_and_woman_holding_hands,
    two_men_holding_hands: two_men_holding_hands,
    two_women_holding_hands: two_women_holding_hands,
    cop: cop,
    dancers: dancers,
    bride_with_veil: bride_with_veil,
    person_with_blond_hair: person_with_blond_hair,
    man_with_gua_pi_mao: man_with_gua_pi_mao,
    man_with_turban: man_with_turban,
    older_man: older_man,
    older_woman: older_woman,
    baby: baby,
    construction_worker: construction_worker,
    princess: princess,
    japanese_ogre: japanese_ogre,
    japanese_goblin: japanese_goblin,
    ghost: ghost,
    angel: angel,
    alien: alien,
    space_invader: space_invader,
    imp: imp,
    skull: skull,
    information_desk_person: information_desk_person,
    guardsman: guardsman,
    dancer: dancer,
    lipstick: lipstick,
    nail_care: nail_care,
    massage: massage,
    haircut: haircut,
    barber: barber,
    syringe: syringe,
    pill: pill,
    kiss: kiss,
    love_letter: love_letter,
    ring: ring,
    gem: gem,
    couplekiss: couplekiss,
    bouquet: bouquet,
    couple_with_heart: couple_with_heart,
    wedding: wedding,
    heartbeat: heartbeat,
    broken_heart: broken_heart,
    two_hearts: two_hearts,
    sparkling_heart: sparkling_heart,
    heartpulse: heartpulse,
    cupid: cupid,
    blue_heart: blue_heart,
    green_heart: green_heart,
    yellow_heart: yellow_heart,
    purple_heart: purple_heart,
    gift_heart: gift_heart,
    revolving_hearts: revolving_hearts,
    heart_decoration: heart_decoration,
    diamond_shape_with_a_dot_inside: diamond_shape_with_a_dot_inside,
    bulb: bulb,
    anger: anger,
    bomb: bomb,
    zzz: zzz,
    boom: boom,
    collision: collision,
    sweat_drops: sweat_drops,
    droplet: droplet,
    dash: dash,
    hankey: hankey,
    poop: poop,
    shit: shit,
    muscle: muscle,
    dizzy: dizzy,
    speech_balloon: speech_balloon,
    thought_balloon: thought_balloon,
    white_flower: white_flower,
    moneybag: moneybag,
    currency_exchange: currency_exchange,
    heavy_dollar_sign: heavy_dollar_sign,
    credit_card: credit_card,
    yen: yen,
    dollar: dollar,
    euro: euro,
    pound: pound,
    money_with_wings: money_with_wings,
    chart: chart,
    seat: seat,
    computer: computer,
    briefcase: briefcase,
    minidisc: minidisc,
    floppy_disk: floppy_disk,
    cd: cd,
    dvd: dvd,
    file_folder: file_folder,
    open_file_folder: open_file_folder,
    page_with_curl: page_with_curl,
    page_facing_up: page_facing_up,
    date: date,
    calendar: calendar,
    card_index: card_index,
    chart_with_upwards_trend: chart_with_upwards_trend,
    chart_with_downwards_trend: chart_with_downwards_trend,
    bar_chart: bar_chart,
    clipboard: clipboard,
    pushpin: pushpin,
    round_pushpin: round_pushpin,
    paperclip: paperclip,
    straight_ruler: straight_ruler,
    triangular_ruler: triangular_ruler,
    bookmark_tabs: bookmark_tabs,
    ledger: ledger,
    notebook: notebook,
    notebook_with_decorative_cover: notebook_with_decorative_cover,
    closed_book: closed_book,
    book: book,
    open_book: open_book,
    green_book: green_book,
    blue_book: blue_book,
    orange_book: orange_book,
    books: books,
    name_badge: name_badge,
    scroll: scroll,
    memo: memo,
    pencil: pencil,
    telephone_receiver: telephone_receiver,
    pager: pager,
    fax: fax,
    satellite: satellite,
    loudspeaker: loudspeaker,
    mega: mega,
    outbox_tray: outbox_tray,
    inbox_tray: inbox_tray,
    incoming_envelope: incoming_envelope,
    envelope_with_arrow: envelope_with_arrow,
    mailbox_closed: mailbox_closed,
    mailbox: mailbox,
    mailbox_with_mail: mailbox_with_mail,
    mailbox_with_no_mail: mailbox_with_no_mail,
    postbox: postbox,
    postal_horn: postal_horn,
    newspaper: newspaper,
    iphone: iphone,
    calling: calling,
    vibration_mode: vibration_mode,
    mobile_phone_off: mobile_phone_off,
    no_mobile_phones: no_mobile_phones,
    signal_strength: signal_strength,
    camera: camera,
    camera_with_flash: camera_with_flash,
    video_camera: video_camera,
    tv: tv,
    radio: radio,
    vhs: vhs,
    film_projector: film_projector,
    prayer_beads: prayer_beads,
    twisted_rightwards_arrows: twisted_rightwards_arrows,
    repeat: repeat,
    repeat_one: repeat_one,
    arrows_clockwise: arrows_clockwise,
    arrows_counterclockwise: arrows_counterclockwise,
    low_brightness: low_brightness,
    high_brightness: high_brightness,
    mute: mute,
    speaker: speaker,
    sound: sound,
    loud_sound: loud_sound,
    battery: battery,
    electric_plug: electric_plug,
    mag: mag,
    mag_right: mag_right,
    lock_with_ink_pen: lock_with_ink_pen,
    closed_lock_with_key: closed_lock_with_key,
    key: key,
    lock: lock,
    unlock: unlock,
    bell: bell,
    no_bell: no_bell,
    bookmark: bookmark,
    link: link,
    radio_button: radio_button,
    back: back,
    end: end,
    on: on,
    soon: soon,
    top: top,
    underage: underage,
    keycap_ten: keycap_ten,
    capital_abcd: capital_abcd,
    abcd: abcd,
    symbols: symbols,
    abc: abc,
    fire: fire,
    flashlight: flashlight,
    wrench: wrench,
    hammer: hammer,
    nut_and_bolt: nut_and_bolt,
    hocho: hocho,
    knife: knife,
    gun: gun,
    microscope: microscope,
    telescope: telescope,
    crystal_ball: crystal_ball,
    six_pointed_star: six_pointed_star,
    beginner: beginner,
    trident: trident,
    black_square_button: black_square_button,
    white_square_button: white_square_button,
    red_circle: red_circle,
    large_blue_circle: large_blue_circle,
    large_orange_diamond: large_orange_diamond,
    large_blue_diamond: large_blue_diamond,
    small_orange_diamond: small_orange_diamond,
    small_blue_diamond: small_blue_diamond,
    small_red_triangle: small_red_triangle,
    small_red_triangle_down: small_red_triangle_down,
    arrow_up_small: arrow_up_small,
    arrow_down_small: arrow_down_small,
    om_symbol: om_symbol,
    dove_of_peace: dove_of_peace,
    kaaba: kaaba,
    mosque: mosque,
    synagogue: synagogue,
    menorah_with_nine_branches: menorah_with_nine_branches,
    clock1: clock1,
    clock2: clock2,
    clock3: clock3,
    clock4: clock4,
    clock5: clock5,
    clock6: clock6,
    clock7: clock7,
    clock8: clock8,
    clock9: clock9,
    clock10: clock10,
    clock11: clock11,
    clock12: clock12,
    clock130: clock130,
    clock230: clock230,
    clock330: clock330,
    clock430: clock430,
    clock530: clock530,
    clock630: clock630,
    clock730: clock730,
    clock830: clock830,
    clock930: clock930,
    clock1030: clock1030,
    clock1130: clock1130,
    clock1230: clock1230,
    candle: candle,
    mantelpiece_clock: mantelpiece_clock,
    hole: hole,
    man_in_business_suit_levitating: man_in_business_suit_levitating,
    sleuth_or_spy: sleuth_or_spy,
    dark_sunglasses: dark_sunglasses,
    spider: spider,
    spider_web: spider_web,
    joystick: joystick,
    linked_paperclips: linked_paperclips,
    lower_left_ballpoint_pen: lower_left_ballpoint_pen,
    lower_left_fountain_pen: lower_left_fountain_pen,
    lower_left_paintbrush: lower_left_paintbrush,
    lower_left_crayon: lower_left_crayon,
    raised_hand_with_fingers_splayed: raised_hand_with_fingers_splayed,
    middle_finger: middle_finger,
    reversed_hand_with_middle_finger_extended: reversed_hand_with_middle_finger_extended,
    desktop_computer: desktop_computer,
    printer: printer,
    three_button_mouse: three_button_mouse,
    trackball: trackball,
    frame_with_picture: frame_with_picture,
    card_index_dividers: card_index_dividers,
    card_file_box: card_file_box,
    file_cabinet: file_cabinet,
    wastebasket: wastebasket,
    spiral_note_pad: spiral_note_pad,
    spiral_calendar_pad: spiral_calendar_pad,
    compression: compression,
    old_key: old_key,
    rolled_up_newspaper: rolled_up_newspaper,
    dagger_knife: dagger_knife,
    speaking_head_in_silhouette: speaking_head_in_silhouette,
    left_speech_bubble: left_speech_bubble,
    right_anger_bubble: right_anger_bubble,
    ballot_box_with_ballot: ballot_box_with_ballot,
    world_map: world_map,
    mount_fuji: mount_fuji,
    tokyo_tower: tokyo_tower,
    statue_of_liberty: statue_of_liberty,
    japan: japan,
    moyai: moyai,
    grinning: grinning,
    grin: grin,
    joy: joy,
    smiley: smiley,
    smile: smile,
    sweat_smile: sweat_smile,
    laughing: laughing,
    satisfied: satisfied,
    innocent: innocent,
    smiling_imp: smiling_imp,
    wink: wink,
    blush: blush,
    yum: yum,
    relieved: relieved,
    heart_eyes: heart_eyes,
    sunglasses: sunglasses,
    smirk: smirk,
    neutral_face: neutral_face,
    expressionless: expressionless,
    unamused: unamused,
    sweat: sweat,
    pensive: pensive,
    confused: confused,
    confounded: confounded,
    kissing: kissing,
    kissing_heart: kissing_heart,
    kissing_smiling_eyes: kissing_smiling_eyes,
    kissing_closed_eyes: kissing_closed_eyes,
    stuck_out_tongue: stuck_out_tongue,
    stuck_out_tongue_winking_eye: stuck_out_tongue_winking_eye,
    stuck_out_tongue_closed_eyes: stuck_out_tongue_closed_eyes,
    disappointed: disappointed,
    worried: worried,
    angry: angry,
    rage: rage,
    cry: cry,
    persevere: persevere,
    triumph: triumph,
    disappointed_relieved: disappointed_relieved,
    frowning: frowning,
    anguished: anguished,
    fearful: fearful,
    weary: weary,
    sleepy: sleepy,
    tired_face: tired_face,
    grimacing: grimacing,
    sob: sob,
    open_mouth: open_mouth,
    hushed: hushed,
    cold_sweat: cold_sweat,
    scream: scream,
    astonished: astonished,
    flushed: flushed,
    sleeping: sleeping,
    dizzy_face: dizzy_face,
    no_mouth: no_mouth,
    mask: mask,
    smile_cat: smile_cat,
    joy_cat: joy_cat,
    smiley_cat: smiley_cat,
    heart_eyes_cat: heart_eyes_cat,
    smirk_cat: smirk_cat,
    kissing_cat: kissing_cat,
    pouting_cat: pouting_cat,
    crying_cat_face: crying_cat_face,
    scream_cat: scream_cat,
    slightly_frowning_face: slightly_frowning_face,
    slightly_smiling_face: slightly_smiling_face,
    upside_down_face: upside_down_face,
    face_with_rolling_eyes: face_with_rolling_eyes,
    no_good: no_good,
    ok_woman: ok_woman,
    bow: bow,
    see_no_evil: see_no_evil,
    hear_no_evil: hear_no_evil,
    speak_no_evil: speak_no_evil,
    raising_hand: raising_hand,
    raised_hands: raised_hands,
    person_frowning: person_frowning,
    person_with_pouting_face: person_with_pouting_face,
    pray: pray,
    rocket: rocket,
    helicopter: helicopter,
    steam_locomotive: steam_locomotive,
    railway_car: railway_car,
    bullettrain_side: bullettrain_side,
    bullettrain_front: bullettrain_front,
    train2: train2,
    metro: metro,
    light_rail: light_rail,
    station: station,
    tram: tram,
    train: train,
    bus: bus,
    oncoming_bus: oncoming_bus,
    trolleybus: trolleybus,
    busstop: busstop,
    minibus: minibus,
    ambulance: ambulance,
    fire_engine: fire_engine,
    police_car: police_car,
    oncoming_police_car: oncoming_police_car,
    taxi: taxi,
    oncoming_taxi: oncoming_taxi,
    car: car,
    red_car: red_car,
    oncoming_automobile: oncoming_automobile,
    blue_car: blue_car,
    truck: truck,
    articulated_lorry: articulated_lorry,
    tractor: tractor,
    monorail: monorail,
    mountain_railway: mountain_railway,
    suspension_railway: suspension_railway,
    mountain_cableway: mountain_cableway,
    aerial_tramway: aerial_tramway,
    ship: ship,
    rowboat: rowboat,
    speedboat: speedboat,
    traffic_light: traffic_light,
    vertical_traffic_light: vertical_traffic_light,
    construction: construction,
    rotating_light: rotating_light,
    triangular_flag_on_post: triangular_flag_on_post,
    door: door,
    no_entry_sign: no_entry_sign,
    smoking: smoking,
    no_smoking: no_smoking,
    put_litter_in_its_place: put_litter_in_its_place,
    do_not_litter: do_not_litter,
    potable_water: potable_water,
    bike: bike,
    no_bicycles: no_bicycles,
    bicyclist: bicyclist,
    mountain_bicyclist: mountain_bicyclist,
    walking: walking,
    no_pedestrians: no_pedestrians,
    children_crossing: children_crossing,
    mens: mens,
    womens: womens,
    restroom: restroom,
    baby_symbol: baby_symbol,
    toilet: toilet,
    wc: wc,
    shower: shower,
    bath: bath,
    bathtub: bathtub,
    passport_control: passport_control,
    customs: customs,
    baggage_claim: baggage_claim,
    left_luggage: left_luggage,
    couch_and_lamp: couch_and_lamp,
    sleeping_accommodation: sleeping_accommodation,
    shopping_bags: shopping_bags,
    bellhop_bell: bellhop_bell,
    bed: bed,
    place_of_worship: place_of_worship,
    hammer_and_wrench: hammer_and_wrench,
    shield: shield,
    oil_drum: oil_drum,
    motorway: motorway,
    railway_track: railway_track,
    motor_boat: motor_boat,
    small_airplane: small_airplane,
    airplane_departure: airplane_departure,
    airplane_arriving: airplane_arriving,
    passenger_ship: passenger_ship,
    zipper_mouth_face: zipper_mouth_face,
    money_mouth_face: money_mouth_face,
    face_with_thermometer: face_with_thermometer,
    nerd_face: nerd_face,
    thinking_face: thinking_face,
    face_with_head_bandage: face_with_head_bandage,
    robot_face: robot_face,
    hugging_face: hugging_face,
    the_horns: the_horns,
    sign_of_the_horns: sign_of_the_horns,
    crab: crab,
    lion_face: lion_face,
    scorpion: scorpion,
    turkey: turkey,
    unicorn_face: unicorn_face,
    cheese_wedge: cheese_wedge,
    hash: hash,
    keycap_star: keycap_star,
    zero: zero,
    one: one,
    two: two,
    three: three,
    four: four,
    five: five,
    six: six,
    seven: seven,
    eight: eight,
    nine: nine,
    cn: cn,
    de: de,
    es: es,
    fr: fr,
    gb: gb,
    uk: uk,
    it: it,
    jp: jp,
    kr: kr,
    ru: ru,
    us: us,
    default: emoji
  });

  var emojiByName = ( emoji$1 && emoji ) || emoji$1;

  /**
   * regex to parse emoji in a string - finds emoji, e.g. :coffee:
   */
  var emojiNameRegex = /:([a-zA-Z0-9_\-\+]+):/g;

  /**
   * regex to trim whitespace
   * use instead of String.prototype.trim() for IE8 supprt
   */
  var trimSpaceRegex = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

  /**
   * Removes colons on either side
   * of the string if present
   * @param  {string} str
   * @return {string}
   */
  function stripColons(str) {
    var colonIndex = str.indexOf(':');
    if (colonIndex > -1) {
      // :emoji: (http://www.emoji-cheat-sheet.com/)
      if (colonIndex === str.length - 1) {
        str = str.substring(0, colonIndex);
        return stripColons(str);
      } else {
        str = str.substr(colonIndex + 1);
        return stripColons(str);
      }
    }

    return str;
  }

  /**
   * Adds colons to either side
   * of the string
   * @param {string} str
   * @return {string}
   */
  function wrapColons(str) {
    return typeof str === 'string' && str.length > 0 ? ':' + str + ':' : str;
  }

  /**
   * Ensure that the word is wrapped in colons
   * by only adding them, if they are not there.
   * @param {string} str
   * @return {string}
   */
  function ensureColons(str) {
    return typeof str === 'string' && str[0] !== ':' ? wrapColons(str) : str;
  }

  // Non spacing mark, some emoticons have them. It's the 'Variant Form',
  // which provides more information so that emoticons can be rendered as
  // more colorful graphics. FE0E is a unicode text version, where as FE0F
  // should be rendered as a graphical version. The code gracefully degrades.
  var NON_SPACING_MARK = String.fromCharCode(65039); // 65039 - '️' - 0xFE0F;
  var nonSpacingRegex = new RegExp(NON_SPACING_MARK, 'g');

  // Remove the non-spacing-mark from the code, never send a stripped version
  // to the client, as it kills graphical emoticons.
  function stripNSB(code) {
    return code.replace(nonSpacingRegex, '');
  }
  // Reversed hash table, where as emojiByName contains a { heart: '❤' }
  // dictionary emojiByCode contains { ❤: 'heart' }. The codes are normalized
  // to the text version.
  var emojiByCode = Object.keys(emojiByName).reduce(function (h, k) {
    h[stripNSB(emojiByName[k])] = k;
    return h;
  }, {});

  /**
   * Emoji namespace
   */
  var Emoji = {
    emoji: emojiByName
  };

  /**
   * get emoji code from name
   * @param  {string} emoji
   * @return {string}
   */
  Emoji._get = function _get(emoji) {
    if (emojiByName.hasOwnProperty(emoji)) {
      return emojiByName[emoji];
    }

    return ensureColons(emoji);
  };

  /**
   * get emoji code from :emoji: string or name
   * @param  {string} emoji
   * @return {string}
   */
  Emoji.get = function get(emoji) {
    emoji = stripColons(emoji);

    return Emoji._get(emoji);
  };

  /**
   * find the emoji by either code or name
   * @param {string} nameOrCode The emoji to find, either `coffee`, `:coffee:` or `☕`;
   * @return {object}
   */
  Emoji.find = function find(nameOrCode) {
    return Emoji.findByName(nameOrCode) || Emoji.findByCode(nameOrCode);
  };

  /**
   * find the emoji by name
   * @param {string} name The emoji to find either `coffee` or `:coffee:`;
   * @return {object}
   */
  Emoji.findByName = function findByName(name) {
    var stripped = stripColons(name);
    var emoji = emojiByName[stripped];

    return emoji ? { emoji: emoji, key: stripped } : undefined;
  };

  /**
   * find the emoji by code (emoji)
   * @param {string} code The emoji to find; for example `☕` or `☔`
   * @return {object}
   */
  Emoji.findByCode = function findByCode(code) {
    var stripped = stripNSB(code);
    var name = emojiByCode[stripped];

    // lookup emoji to ensure the Variant Form is returned
    return name ? { emoji: emojiByName[name], key: name } : undefined;
  };

  /**
   * Check if an emoji is known by this library
   * @param {string} nameOrCode The emoji to validate, either `coffee`, `:coffee:` or `☕`;
   * @return {object}
   */
  Emoji.hasEmoji = function hasEmoji(nameOrCode) {
    return Emoji.hasEmojiByName(nameOrCode) || Emoji.hasEmojiByCode(nameOrCode);
  };

  /**
   * Check if an emoji with given name is known by this library
   * @param {string} name The emoji to validate either `coffee` or `:coffee:`;
   * @return {object}
   */
  Emoji.hasEmojiByName = function hasEmojiByName(name) {
    var result = Emoji.findByName(name);
    return !!result && result.key === stripColons(name);
  };

  /**
   * Check if a given emoji is known by this library
   * @param {string} code The emoji to validate; for example `☕` or `☔`
   * @return {object}
   */
  Emoji.hasEmojiByCode = function hasEmojiByCode(code) {
    var result = Emoji.findByCode(code);
    return !!result && stripNSB(result.emoji) === stripNSB(code);
  };

  /**
   * get emoji name from code
   * @param  {string} emoji
   * @param  {boolean} includeColons should the result include the ::
   * @return {string}
   */
  Emoji.which = function which(emoji_code, includeColons) {
    var code = stripNSB(emoji_code);
    var word = emojiByCode[code];

    return includeColons ? wrapColons(word) : word;
  };

  /**
   * emojify a string (replace :emoji: with an emoji)
   * @param  {string} str
   * @param  {function} on_missing (gets emoji name without :: and returns a proper emoji if no emoji was found)
   * @param  {function} format (wrap the returned emoji in a custom element)
   * @return {string}
   */
  Emoji.emojify = function emojify(str, on_missing, format) {
    if (!str) return '';

    return str.split(emojiNameRegex) // parse emoji via regex
    .map(function parseEmoji(s, i) {
      // every second element is an emoji, e.g. "test :fast_forward:" -> [ "test ", "fast_forward" ]
      if (i % 2 === 0) return s;
      var emoji = Emoji._get(s);
      var isMissing = emoji.indexOf(':') > -1;

      if (isMissing && typeof on_missing === 'function') {
        return on_missing(s);
      }

      if (!isMissing && typeof format === 'function') {
        return format(emoji, s);
      }

      return emoji;
    }).join('') // convert back to string
    ;
  };

  /**
   * return a random emoji
   * @return {string}
   */
  Emoji.random = function random() {
    var emojiKeys = Object.keys(emojiByName);
    var randomIndex = Math.floor(Math.random() * emojiKeys.length);
    var key = emojiKeys[randomIndex];
    var emoji = Emoji._get(key);
    return { key: key, emoji: emoji };
  };

  /**
   *  return an collection of potential emoji matches
   *  @param {string} str
   *  @return {Array.<Object>}
   */
  Emoji.search = function search(str) {
    var emojiKeys = Object.keys(emojiByName);
    var matcher = stripColons(str);
    var matchingKeys = emojiKeys.filter(function (key) {
      return key.toString().indexOf(matcher) === 0;
    });
    return matchingKeys.map(function (key) {
      return {
        key: key,
        emoji: Emoji._get(key)
      };
    });
  };

  /**
   * unemojify a string (replace emoji with :emoji:)
   * @param  {string} str
   * @return {string}
   */
  Emoji.unemojify = function unemojify(str) {
    if (!str) return '';
    var words = lodash_toarray(str);

    return words.map(function (word) {
      return Emoji.which(word, true) || word;
    }).join('');
  };

  /**
   * replace emojis with replacement value
   * @param {string} str
   * @param {function|string} the string or callback function to replace the emoji with
   * @param {boolean} should trailing whitespaces be cleaned? Defaults false
   * @return {string}
   */
  Emoji.replace = function replace(str, replacement, cleanSpaces) {
    if (!str) return '';

    var replace = typeof replacement === 'function' ? replacement : function () {
      return replacement;
    };
    var words = lodash_toarray(str);

    var replaced = words.map(function (word, idx) {
      var emoji = Emoji.findByCode(word);

      if (emoji && cleanSpaces && words[idx + 1] === ' ') {
        words[idx + 1] = '';
      }

      return emoji ? replace(emoji) : word;
    }).join('');

    return cleanSpaces ? replaced.replace(trimSpaceRegex, '') : replaced;
  };

  /**
   * remove all emojis from a string
   * @param {string} str
   * @return {string}
   */
  Emoji.strip = function strip(str) {
    return Emoji.replace(str, '', true);
  };

  var emoji$2 = Emoji;

  function styleInject(css, ref) {
    if (ref === void 0) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') {
      return;
    }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css = ".icons {\n  display: flex;\n  flex-direction: row;\n}\n\n.icons.vertical {\n  flex-direction: column;\n}\n\n.icon {\n  cursor: pointer;\n  line-height: normal;\n  line-height: var(--reaction-icon-line-height, normal);\n  margin-right: 5px;\n  position: relative;\n}\n\n.count {\n  left: -5px;\n  left: var(--reaction-count-left, -5px);\n  position: inherit;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n";
  styleInject(css);

  var _templateObject$1 = taggedTemplateLiteral(['<img src="', '" />'], ['<img src="', '" />']),
      _templateObject2$1 = taggedTemplateLiteral(['\n        <div class="icon" name=', ' on-click=', '>\n          <span>', '</span>\n          ', '\n        </div>\n      '], ['\n        <div class="icon" name=', ' on-click=', '>\n          <span>', '</span>\n          ', '\n        </div>\n      ']),
      _templateObject3 = taggedTemplateLiteral(['<span class="count">', '</span>'], ['<span class="count">', '</span>']),
      _templateObject4 = taggedTemplateLiteral(['\n      <div class$=', '>\n        ', '\n      </div>\n    '], ['\n      <div class$=', '>\n        ', '\n      </div>\n    ']);

  var Reactions = function (_LitElement) {
    inherits(Reactions, _LitElement);
    createClass(Reactions, null, [{
      key: 'properties',
      get: function get$$1() {
        return {
          config: Object,
          direction: String,
          displayname: String,
          showcount: Boolean,
          showall: Boolean
        };
      }
    }]);

    function Reactions(props) {
      classCallCheck(this, Reactions);

      var _this = possibleConstructorReturn(this, (Reactions.__proto__ || Object.getPrototypeOf(Reactions)).call(this, props));

      _this.emoji = emoji$2;

      _this._boundedClick = _this._handleClick.bind(_this);
      _this.config = new Map();
      _this.displayname = 'reactions';
      _this.showall = false;
      _this.showcount = false;
      return _this;
    }

    createClass(Reactions, [{
      key: '_renderIcon',
      value: function _renderIcon(data) {
        return data.icon ? html$1(_templateObject$1, data.icon) : this.emoji.get(data.name);
      }
    }, {
      key: '_handleClick',
      value: function _handleClick(e) {
        this.dispatchEvent(new CustomEvent(this.displayname + '-toggle', { detail: { reaction: e.currentTarget.name } }));
      }
    }, {
      key: '_renderActions',
      value: function _renderActions() {
        var _this2 = this;

        return this.config.toJSON().map(function () {
          return _this2._renderReaction.apply(_this2, arguments);
        });
      }
    }, {
      key: '_renderReaction',
      value: function _renderReaction(_ref) {
        var _ref2 = slicedToArray(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];

        var count = Number(v.count || 0);
        var shouldRender = count || this.showall;
        var shouldCount = count > 0 && this.showcount;

        return !shouldRender ? null : html$1(_templateObject2$1, k, this._boundedClick, this._renderIcon(v), shouldCount ? html$1(_templateObject3, count) : null);
      }
    }, {
      key: '_configure',
      value: function _configure(config) {
        if (!(config instanceof Map)) throw new TypeError('Wrong configuration');
        var data = new Map(config);

        if (config !== data) this.config = data;
      }
    }, {
      key: '_render',
      value: function _render(props) {
        var _props$direction = props.direction,
            direction = _props$direction === undefined ? 'row' : _props$direction;


        return html$1(_templateObject4, classString({ icons: true, vertical: direction === 'column' }), this._renderActions());
      }
    }]);
    return Reactions;
  }(LitElement);
  var ReactionList = withStyle(Reactions, css);

  exports.mixins = mixins;
  exports.ReactionList = ReactionList;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
