var renderReactPlayer =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 32);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(33);
} else {
  module.exports = require('./cjs/react.development.js');
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.parseStartTime = parseStartTime;
exports.parseEndTime = parseEndTime;
exports.randomString = randomString;
exports.queryString = queryString;
exports.getSDK = getSDK;
exports.getConfig = getConfig;
exports.omit = omit;
exports.callPlayer = callPlayer;
exports.isObject = isObject;
exports.isEqual = isEqual;
exports.isMediaStream = isMediaStream;

var _loadScript = __webpack_require__(40);

var _loadScript2 = _interopRequireDefault(_loadScript);

var _deepmerge = __webpack_require__(41);

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _props = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MATCH_START_QUERY = /[?&#](?:start|t)=([0-9hms]+)/;
var MATCH_END_QUERY = /[?&#]end=([0-9hms]+)/;
var MATCH_START_STAMP = /(\d+)(h|m|s)/g;
var MATCH_NUMERIC = /^\d+$/;

// Parse YouTube URL for a start time param, ie ?t=1h14m30s
// and return the start time in seconds
function parseTimeParam(url, pattern) {
  var match = url.match(pattern);
  if (match) {
    var stamp = match[1];
    if (stamp.match(MATCH_START_STAMP)) {
      return parseTimeString(stamp);
    }
    if (MATCH_NUMERIC.test(stamp)) {
      return parseInt(stamp);
    }
  }
  return undefined;
}

function parseTimeString(stamp) {
  var seconds = 0;
  var array = MATCH_START_STAMP.exec(stamp);
  while (array !== null) {
    var _array = array,
        _array2 = _slicedToArray(_array, 3),
        count = _array2[1],
        period = _array2[2];

    if (period === 'h') seconds += parseInt(count, 10) * 60 * 60;
    if (period === 'm') seconds += parseInt(count, 10) * 60;
    if (period === 's') seconds += parseInt(count, 10);
    array = MATCH_START_STAMP.exec(stamp);
  }
  return seconds;
}

function parseStartTime(url) {
  return parseTimeParam(url, MATCH_START_QUERY);
}

function parseEndTime(url) {
  return parseTimeParam(url, MATCH_END_QUERY);
}

// http://stackoverflow.com/a/38622545
function randomString() {
  return Math.random().toString(36).substr(2, 5);
}

function queryString(object) {
  return Object.keys(object).map(function (key) {
    return key + '=' + object[key];
  }).join('&');
}

// Util function to load an external SDK
// or return the SDK if it is already loaded
var resolves = {};
function getSDK(url, sdkGlobal) {
  var sdkReady = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var isLoaded = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {
    return true;
  };
  var fetchScript = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _loadScript2['default'];

  if (window[sdkGlobal] && isLoaded(window[sdkGlobal])) {
    return Promise.resolve(window[sdkGlobal]);
  }
  return new Promise(function (resolve, reject) {
    // If we are already loading the SDK, add the resolve
    // function to the existing array of resolve functions
    if (resolves[url]) {
      resolves[url].push(resolve);
      return;
    }
    resolves[url] = [resolve];
    var onLoaded = function onLoaded(sdk) {
      // When loaded, resolve all pending promises
      resolves[url].forEach(function (resolve) {
        return resolve(sdk);
      });
    };
    if (sdkReady) {
      var previousOnReady = window[sdkReady];
      window[sdkReady] = function () {
        if (previousOnReady) previousOnReady();
        onLoaded(window[sdkGlobal]);
      };
    }
    fetchScript(url, function (err) {
      if (err) reject(err);
      if (!sdkReady) {
        onLoaded(window[sdkGlobal]);
      }
    });
  });
}

function getConfig(props, defaultProps, showWarning) {
  var config = (0, _deepmerge2['default'])(defaultProps.config, props.config);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _props.DEPRECATED_CONFIG_PROPS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var p = _step.value;

      if (props[p]) {
        var key = p.replace(/Config$/, '');
        config = (0, _deepmerge2['default'])(config, _defineProperty({}, key, props[p]));
        if (showWarning) {
          var link = 'https://github.com/CookPete/react-player#config-prop';
          var message = 'ReactPlayer: %c' + p + ' %cis deprecated, please use the config prop instead \u2013 ' + link;
          console.warn(message, 'font-weight: bold', '');
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return config;
}

function omit(object) {
  var _ref;

  for (var _len = arguments.length, arrays = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    arrays[_key - 1] = arguments[_key];
  }

  var omitKeys = (_ref = []).concat.apply(_ref, arrays);
  var output = {};
  var keys = Object.keys(object);
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = keys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var key = _step2.value;

      if (omitKeys.indexOf(key) === -1) {
        output[key] = object[key];
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2['return']) {
        _iterator2['return']();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return output;
}

function callPlayer(method) {
  var _player;

  // Util method for calling a method on this.player
  // but guard against errors and console.warn instead
  if (!this.player || !this.player[method]) {
    var message = 'ReactPlayer: ' + this.constructor.displayName + ' player could not call %c' + method + '%c \u2013 ';
    if (!this.player) {
      message += 'The player was not available';
    } else if (!this.player[method]) {
      message += 'The method was not available';
    }
    console.warn(message, 'font-weight: bold', '');
    return null;
  }

  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  return (_player = this.player)[method].apply(_player, args);
}

function isObject(val) {
  return val !== null && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object';
}

// Deep comparison of two objects but ignoring
// functions, for use in shouldComponentUpdate
function isEqual(a, b) {
  if (typeof a === 'function' && typeof b === 'function') {
    return true;
  }
  if (a instanceof Array && b instanceof Array) {
    if (a.length !== b.length) {
      return false;
    }
    for (var i = 0; i !== a.length; i++) {
      if (!isEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }
  if (isObject(a) && isObject(b)) {
    if (Object.keys(a).length !== Object.keys(b).length) {
      return false;
    }
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = Object.keys(a)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var key = _step3.value;

        if (!isEqual(a[key], b[key])) {
          return false;
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
          _iterator3['return']();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    return true;
  }
  return a === b;
}

function isMediaStream(url) {
  return typeof window !== 'undefined' && typeof window.MediaStream !== 'undefined' && url instanceof window.MediaStream;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports['default'] = createSinglePlayer;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _props2 = __webpack_require__(4);

var _utils = __webpack_require__(1);

var _Player = __webpack_require__(6);

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SUPPORTED_PROPS = Object.keys(_props2.propTypes);

function createSinglePlayer(activePlayer) {
  var _class, _temp2;

  return _temp2 = _class = function (_Component) {
    _inherits(SinglePlayer, _Component);

    function SinglePlayer() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, SinglePlayer);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SinglePlayer.__proto__ || Object.getPrototypeOf(SinglePlayer)).call.apply(_ref, [this].concat(args))), _this), _this.config = (0, _utils.getConfig)(_this.props, _props2.defaultProps, true), _this.getDuration = function () {
        if (!_this.player) return null;
        return _this.player.getDuration();
      }, _this.getCurrentTime = function () {
        if (!_this.player) return null;
        return _this.player.getCurrentTime();
      }, _this.getSecondsLoaded = function () {
        if (!_this.player) return null;
        return _this.player.getSecondsLoaded();
      }, _this.getInternalPlayer = function () {
        var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'player';

        if (!_this.player) return null;
        return _this.player.getInternalPlayer(key);
      }, _this.seekTo = function (fraction, type) {
        if (!_this.player) return null;
        _this.player.seekTo(fraction, type);
      }, _this.ref = function (player) {
        _this.player = player;
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SinglePlayer, [{
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps) {
        return !(0, _utils.isEqual)(this.props, nextProps);
      }
    }, {
      key: 'componentWillUpdate',
      value: function componentWillUpdate(nextProps) {
        this.config = (0, _utils.getConfig)(nextProps, _props2.defaultProps);
      }
    }, {
      key: 'render',
      value: function render() {
        var _config$file = this.config.file,
            forceVideo = _config$file.forceVideo,
            forceAudio = _config$file.forceAudio,
            forceHLS = _config$file.forceHLS,
            forceDASH = _config$file.forceDASH;

        var skipCanPlay = forceVideo || forceAudio || forceHLS || forceDASH;
        if (!activePlayer.canPlay(this.props.url) && !skipCanPlay) {
          return null;
        }
        var _props = this.props,
            style = _props.style,
            width = _props.width,
            height = _props.height,
            Wrapper = _props.wrapper;

        var otherProps = (0, _utils.omit)(this.props, SUPPORTED_PROPS, _props2.DEPRECATED_CONFIG_PROPS);
        return _react2['default'].createElement(
          Wrapper,
          _extends({ style: _extends({}, style, { width: width, height: height }) }, otherProps),
          _react2['default'].createElement(_Player2['default'], _extends({}, this.props, {
            ref: this.ref,
            activePlayer: activePlayer,
            config: this.config
          }))
        );
      }
    }]);

    return SinglePlayer;
  }(_react.Component), _class.displayName = activePlayer.displayName + 'Player', _class.propTypes = _props2.propTypes, _class.defaultProps = _props2.defaultProps, _class.canPlay = activePlayer.canPlay, _temp2;
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parserUtils = undefined;

var _util = __webpack_require__(12);

/**
 * This module provides support methods to the parsing classes.
 */

/**
 * Returns the first element of the given node which nodeName matches the given name.
 * @param  {Object} node - The node to use to find a match.
 * @param  {String} name - The name to look for.
 * @return {Object}
 */
function childByName(node, name) {
  var childNodes = node.childNodes;

  for (var childKey in childNodes) {
    var child = childNodes[childKey];

    if (child.nodeName === name) {
      return child;
    }
  }
}

/**
 * Returns all the elements of the given node which nodeName match the given name.
 * @param  {any} node - The node to use to find the matches.
 * @param  {any} name - The name to look for.
 * @return {Array}
 */
function childrenByName(node, name) {
  var children = [];
  var childNodes = node.childNodes;

  for (var childKey in childNodes) {
    var child = childNodes[childKey];

    if (child.nodeName === name) {
      children.push(child);
    }
  }
  return children;
}

/**
 * Converts relative vastAdTagUri.
 * @param  {String} vastAdTagUrl - The url to resolve.
 * @param  {String} originalUrl - The original url.
 * @return {String}
 */
function resolveVastAdTagURI(vastAdTagUrl, originalUrl) {
  if (!originalUrl) {
    return vastAdTagUrl;
  }

  if (vastAdTagUrl.indexOf('//') === 0) {
    var _location = location,
        protocol = _location.protocol;

    return '' + protocol + vastAdTagUrl;
  }

  if (vastAdTagUrl.indexOf('://') === -1) {
    // Resolve relative URLs (mainly for unit testing)
    var baseURL = originalUrl.slice(0, originalUrl.lastIndexOf('/'));
    return baseURL + '/' + vastAdTagUrl;
  }

  return vastAdTagUrl;
}

/**
 * Converts a boolean string into a Boolean.
 * @param  {String} booleanString - The boolean string to convert.
 * @return {Boolean}
 */
function parseBoolean(booleanString) {
  return ['true', 'TRUE', '1'].indexOf(booleanString) !== -1;
}

/**
 * Parses a node text (for legacy support).
 * @param  {Object} node - The node to parse the text from.
 * @return {String}
 */
function parseNodeText(node) {
  return node && (node.textContent || node.text || '').trim();
}

/**
 * Copies an attribute from a node to another.
 * @param  {String} attributeName - The name of the attribute to clone.
 * @param  {Object} nodeSource - The source node to copy the attribute from.
 * @param  {Object} nodeDestination - The destination node to copy the attribute at.
 */
function copyNodeAttribute(attributeName, nodeSource, nodeDestination) {
  var attributeValue = nodeSource.getAttribute(attributeName);
  if (attributeValue) {
    nodeDestination.setAttribute(attributeName, attributeValue);
  }
}

/**
 * Parses a String duration into a Number.
 * @param  {String} durationString - The dureation represented as a string.
 * @return {Number}
 */
function parseDuration(durationString) {
  if (durationString === null || typeof durationString === 'undefined') {
    return -1;
  }
  // Some VAST doesn't have an HH:MM:SS duration format but instead jus the number of seconds
  if (_util.util.isNumeric(durationString)) {
    return parseInt(durationString);
  }

  var durationComponents = durationString.split(':');
  if (durationComponents.length !== 3) {
    return -1;
  }

  var secondsAndMS = durationComponents[2].split('.');
  var seconds = parseInt(secondsAndMS[0]);
  if (secondsAndMS.length === 2) {
    seconds += parseFloat('0.' + secondsAndMS[1]);
  }

  var minutes = parseInt(durationComponents[1] * 60);
  var hours = parseInt(durationComponents[0] * 60 * 60);

  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds) || minutes > 60 * 60 || seconds > 60) {
    return -1;
  }
  return hours + minutes + seconds;
}

/**
 * Splits an Array of ads into an Array of Arrays of ads.
 * Each subarray contains either one ad or multiple ads (an AdPod)
 * @param  {Array} ads - An Array of ads to split
 * @return {Array}
 */
function splitVAST(ads) {
  var splittedVAST = [];
  var lastAdPod = null;

  ads.forEach(function (ad, i) {
    if (ad.sequence) {
      ad.sequence = parseInt(ad.sequence, 10);
    }
    // The current Ad may be the next Ad of an AdPod
    if (ad.sequence > 1) {
      var lastAd = ads[i - 1];
      // check if the current Ad is exactly the next one in the AdPod
      if (lastAd && lastAd.sequence === ad.sequence - 1) {
        lastAdPod && lastAdPod.push(ad);
        return;
      }
      // If the ad had a sequence attribute but it was not part of a correctly formed
      // AdPod, let's remove the sequence attribute
      delete ad.sequence;
    }

    lastAdPod = [ad];
    splittedVAST.push(lastAdPod);
  });

  return splittedVAST;
}

/**
 * Merges the data between an unwrapped ad and his wrapper.
 * @param  {Ad} unwrappedAd - The 'unwrapped' Ad.
 * @param  {Ad} wrapper - The wrapper Ad.
 * @return {void}
 */
function mergeWrapperAdData(unwrappedAd, wrapper) {
  unwrappedAd.errorURLTemplates = wrapper.errorURLTemplates.concat(unwrappedAd.errorURLTemplates);
  unwrappedAd.impressionURLTemplates = wrapper.impressionURLTemplates.concat(unwrappedAd.impressionURLTemplates);
  unwrappedAd.extensions = wrapper.extensions.concat(unwrappedAd.extensions);

  unwrappedAd.creatives.forEach(function (creative) {
    if (wrapper.trackingEvents && wrapper.trackingEvents[creative.type]) {
      for (var eventName in wrapper.trackingEvents[creative.type]) {
        var urls = wrapper.trackingEvents[creative.type][eventName];
        if (!Array.isArray(creative.trackingEvents[eventName])) {
          creative.trackingEvents[eventName] = [];
        }
        creative.trackingEvents[eventName] = creative.trackingEvents[eventName].concat(urls);
      }
    }
  });

  if (wrapper.videoClickTrackingURLTemplates && wrapper.videoClickTrackingURLTemplates.length) {
    unwrappedAd.creatives.forEach(function (creative) {
      if (creative.type === 'linear') {
        creative.videoClickTrackingURLTemplates = creative.videoClickTrackingURLTemplates.concat(wrapper.videoClickTrackingURLTemplates);
      }
    });
  }

  if (wrapper.videoCustomClickURLTemplates && wrapper.videoCustomClickURLTemplates.length) {
    unwrappedAd.creatives.forEach(function (creative) {
      if (creative.type === 'linear') {
        creative.videoCustomClickURLTemplates = creative.videoCustomClickURLTemplates.concat(wrapper.videoCustomClickURLTemplates);
      }
    });
  }

  // VAST 2.0 support - Use Wrapper/linear/clickThrough when Inline/Linear/clickThrough is null
  if (wrapper.videoClickThroughURLTemplate) {
    unwrappedAd.creatives.forEach(function (creative) {
      if (creative.type === 'linear' && (creative.videoClickThroughURLTemplate === null || typeof creative.videoClickThroughURLTemplate === 'undefined')) {
        creative.videoClickThroughURLTemplate = wrapper.videoClickThroughURLTemplate;
      }
    });
  }
}

var parserUtils = exports.parserUtils = {
  childByName: childByName,
  childrenByName: childrenByName,
  resolveVastAdTagURI: resolveVastAdTagURI,
  parseBoolean: parseBoolean,
  parseNodeText: parseNodeText,
  copyNodeAttribute: copyNodeAttribute,
  parseDuration: parseDuration,
  splitVAST: splitVAST,
  mergeWrapperAdData: mergeWrapperAdData
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEPRECATED_CONFIG_PROPS = exports.defaultProps = exports.propTypes = undefined;

var _propTypes = __webpack_require__(42);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var string = _propTypes2['default'].string,
    bool = _propTypes2['default'].bool,
    number = _propTypes2['default'].number,
    array = _propTypes2['default'].array,
    oneOfType = _propTypes2['default'].oneOfType,
    shape = _propTypes2['default'].shape,
    object = _propTypes2['default'].object,
    func = _propTypes2['default'].func;
var propTypes = exports.propTypes = {
  url: oneOfType([string, array, object]),
  playing: bool,
  loop: bool,
  controls: bool,
  volume: number,
  muted: bool,
  playbackRate: number,
  width: oneOfType([string, number]),
  height: oneOfType([string, number]),
  style: object,
  progressInterval: number,
  playsinline: bool,
  pip: bool,
  light: oneOfType([bool, string]),
  wrapper: oneOfType([string, func, shape({ render: func.isRequired })]),
  config: shape({
    soundcloud: shape({
      options: object,
      preload: bool
    }),
    youtube: shape({
      playerVars: object,
      embedOptions: object,
      preload: bool
    }),
    facebook: shape({
      appId: string
    }),
    dailymotion: shape({
      params: object,
      preload: bool
    }),
    vimeo: shape({
      playerOptions: object,
      preload: bool
    }),
    file: shape({
      attributes: object,
      tracks: array,
      forceVideo: bool,
      forceAudio: bool,
      forceHLS: bool,
      forceDASH: bool,
      hlsOptions: object,
      hlsVersion: string,
      dashVersion: string
    }),
    wistia: shape({
      options: object
    }),
    mixcloud: shape({
      options: object
    }),
    twitch: shape({
      options: object
    })
  }),
  onAdSkippable: func,
  onReady: func,
  onStart: func,
  onPlay: func,
  onPause: func,
  onBuffer: func,
  onBufferEnd: func,
  onEnded: func,
  onError: func,
  onDuration: func,
  onSeek: func,
  onProgress: func,
  onVolumeChange: func,
  onEnablePIP: func,
  onDisablePIP: func
};

var defaultProps = exports.defaultProps = {
  playing: false,
  loop: false,
  controls: false,
  volume: null,
  muted: false,
  playbackRate: 1,
  width: '640px',
  height: '360px',
  style: {},
  progressInterval: 1000,
  playsinline: false,
  pip: false,
  light: false,
  wrapper: 'div',
  config: {
    soundcloud: {
      options: {
        visual: true, // Undocumented, but makes player fill container and look better
        buying: false,
        liking: false,
        download: false,
        sharing: false,
        show_comments: false,
        show_playcount: false
      }
    },
    youtube: {
      playerVars: {
        playsinline: 1,
        showinfo: 0,
        rel: 0,
        iv_load_policy: 3,
        modestbranding: 1
      },
      embedOptions: {},
      preload: false
    },
    facebook: {
      appId: '1309697205772819'
    },
    dailymotion: {
      params: {
        api: 1,
        'endscreen-enable': false
      },
      preload: false
    },
    vimeo: {
      playerOptions: {
        autopause: false,
        byline: false,
        portrait: false,
        title: false
      },
      preload: false
    },
    file: {
      attributes: {},
      tracks: [],
      forceVideo: false,
      forceAudio: false,
      forceHLS: false,
      forceDASH: false,
      hlsOptions: {},
      hlsVersion: '0.10.1',
      dashVersion: '2.9.2'
    },
    wistia: {
      options: {}
    },
    mixcloud: {
      options: {
        hide_cover: 1
      }
    },
    twitch: {
      options: {}
    }
  },
  onAdSkippable: function onAdSkippable() {},
  onReady: function onReady() {},
  onStart: function onStart() {},
  onPlay: function onPlay() {},
  onPause: function onPause() {},
  onBuffer: function onBuffer() {},
  onBufferEnd: function onBufferEnd() {},
  onEnded: function onEnded() {},
  onError: function onError() {},
  onDuration: function onDuration() {},
  onSeek: function onSeek() {},
  onVolumeChange: function onVolumeChange() {},
  onProgress: function onProgress() {},
  onEnablePIP: function onEnablePIP() {},
  onDisablePIP: function onDisablePIP() {}
};

var DEPRECATED_CONFIG_PROPS = exports.DEPRECATED_CONFIG_PROPS = ['soundcloudConfig', 'youtubeConfig', 'facebookConfig', 'dailymotionConfig', 'vimeoConfig', 'fileConfig', 'wistiaConfig'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YouTube = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utils = __webpack_require__(1);

var _singlePlayer = __webpack_require__(2);

var _singlePlayer2 = _interopRequireDefault(_singlePlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SDK_URL = 'https://www.youtube.com/iframe_api';
var SDK_GLOBAL = 'YT';
var SDK_GLOBAL_READY = 'onYouTubeIframeAPIReady';
var MATCH_URL = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})|youtube\.com\/playlist\?list=/;
var MATCH_PLAYLIST = /list=([a-zA-Z0-9_-]+)/;

function parsePlaylist(url) {
  if (MATCH_PLAYLIST.test(url)) {
    var _url$match = url.match(MATCH_PLAYLIST),
        _url$match2 = _slicedToArray(_url$match, 2),
        playlistId = _url$match2[1];

    return {
      listType: 'playlist',
      list: playlistId
    };
  }
  return {};
}

var YouTube = exports.YouTube = function (_Component) {
  _inherits(YouTube, _Component);

  function YouTube() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, YouTube);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = YouTube.__proto__ || Object.getPrototypeOf(YouTube)).call.apply(_ref, [this].concat(args))), _this), _this.callPlayer = _utils.callPlayer, _this.onStateChange = function (_ref2) {
      var data = _ref2.data;
      var _this$props = _this.props,
          onPlay = _this$props.onPlay,
          onPause = _this$props.onPause,
          onBuffer = _this$props.onBuffer,
          onBufferEnd = _this$props.onBufferEnd,
          onEnded = _this$props.onEnded,
          onReady = _this$props.onReady,
          loop = _this$props.loop;
      var _window$SDK_GLOBAL$Pl = window[SDK_GLOBAL].PlayerState,
          PLAYING = _window$SDK_GLOBAL$Pl.PLAYING,
          PAUSED = _window$SDK_GLOBAL$Pl.PAUSED,
          BUFFERING = _window$SDK_GLOBAL$Pl.BUFFERING,
          ENDED = _window$SDK_GLOBAL$Pl.ENDED,
          CUED = _window$SDK_GLOBAL$Pl.CUED;

      if (data === PLAYING) {
        onPlay();
        onBufferEnd();
      }
      if (data === PAUSED) onPause();
      if (data === BUFFERING) onBuffer();
      if (data === ENDED) {
        var isPlaylist = !!_this.callPlayer('getPlaylist');
        if (loop && !isPlaylist) {
          _this.play(); // Only loop manually if not playing a playlist
        }
        onEnded();
      }
      if (data === CUED) onReady();
    }, _this.mute = function () {
      _this.callPlayer('mute');
    }, _this.unmute = function () {
      _this.callPlayer('unMute');
    }, _this.ref = function (container) {
      _this.container = container;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(YouTube, [{
    key: 'load',
    value: function load(url, isReady) {
      var _this2 = this;

      var _props = this.props,
          playing = _props.playing,
          muted = _props.muted,
          playsinline = _props.playsinline,
          controls = _props.controls,
          loop = _props.loop,
          config = _props.config,
          _onError = _props.onError;
      var _config$youtube = config.youtube,
          playerVars = _config$youtube.playerVars,
          embedOptions = _config$youtube.embedOptions;

      var id = url && url.match(MATCH_URL)[1];
      if (isReady) {
        if (MATCH_PLAYLIST.test(url)) {
          this.player.loadPlaylist(parsePlaylist(url));
          return;
        }
        this.player.cueVideoById({
          videoId: id,
          startSeconds: (0, _utils.parseStartTime)(url) || playerVars.start,
          endSeconds: (0, _utils.parseEndTime)(url) || playerVars.end
        });
        return;
      }
      (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL, SDK_GLOBAL_READY, function (YT) {
        return YT.loaded;
      }).then(function (YT) {
        if (!_this2.container) return;
        _this2.player = new YT.Player(_this2.container, _extends({
          width: '100%',
          height: '100%',
          videoId: id,
          playerVars: _extends({
            autoplay: playing ? 1 : 0,
            mute: muted ? 1 : 0,
            controls: controls ? 1 : 0,
            start: (0, _utils.parseStartTime)(url),
            end: (0, _utils.parseEndTime)(url),
            origin: window.location.origin,
            playsinline: playsinline
          }, parsePlaylist(url), playerVars),
          events: {
            onReady: _this2.props.onReady,
            onStateChange: _this2.onStateChange,
            onError: function onError(event) {
              return _onError(event.data);
            }
          }
        }, embedOptions));
        if (loop) {
          _this2.player.setLoop(true); // Enable playlist looping
        }
      }, _onError);
    }
  }, {
    key: 'play',
    value: function play() {
      this.callPlayer('playVideo');
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.callPlayer('pauseVideo');
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (!document.body.contains(this.callPlayer('getIframe'))) return;
      this.callPlayer('stopVideo');
    }
  }, {
    key: 'seekTo',
    value: function seekTo(amount) {
      this.callPlayer('seekTo', amount);
      if (!this.props.playing) {
        this.pause();
      }
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      this.callPlayer('setVolume', fraction * 100);
    }
  }, {
    key: 'setPlaybackRate',
    value: function setPlaybackRate(rate) {
      this.callPlayer('setPlaybackRate', rate);
    }
  }, {
    key: 'setLoop',
    value: function setLoop(loop) {
      this.callPlayer('setLoop', loop);
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      return this.callPlayer('getDuration');
    }
  }, {
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      return this.callPlayer('getCurrentTime');
    }
  }, {
    key: 'getSecondsLoaded',
    value: function getSecondsLoaded() {
      return this.callPlayer('getVideoLoadedFraction') * this.getDuration();
    }
  }, {
    key: 'render',
    value: function render() {
      var style = _extends({
        width: '100%',
        height: '100%'
      }, this.props.style);
      return _react2['default'].createElement(
        'div',
        { style: style },
        _react2['default'].createElement('div', { ref: this.ref })
      );
    }
  }]);

  return YouTube;
}(_react.Component);

YouTube.displayName = 'YouTube';

YouTube.canPlay = function (url) {
  return MATCH_URL.test(url);
};

exports['default'] = (0, _singlePlayer2['default'])(YouTube);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _props2 = __webpack_require__(4);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SEEK_ON_PLAY_EXPIRY = 5000;

var Player = function (_Component) {
  _inherits(Player, _Component);

  function Player() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Player);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Player.__proto__ || Object.getPrototypeOf(Player)).call.apply(_ref, [this].concat(args))), _this), _this.mounted = false, _this.isReady = false, _this.isPlaying = false, _this.isLoading = true, _this.loadOnReady = null, _this.startOnPlay = true, _this.seekOnPlay = null, _this.onDurationCalled = false, _this.getInternalPlayer = function (key) {
      if (!_this.player) return null;
      return _this.player[key];
    }, _this.progress = function () {
      if (_this.props.url && _this.player && _this.isReady) {
        var playedSeconds = _this.getCurrentTime() || 0;
        var loadedSeconds = _this.getSecondsLoaded();
        var duration = _this.getDuration();
        if (duration) {
          var progress = {
            playedSeconds: playedSeconds,
            played: playedSeconds / duration
          };
          if (loadedSeconds !== null) {
            progress.loadedSeconds = loadedSeconds;
            progress.loaded = loadedSeconds / duration;
          }
          // Only call onProgress if values have changed
          if (progress.played !== _this.prevPlayed || progress.loaded !== _this.prevLoaded) {
            _this.props.onProgress(progress);
          }
          _this.prevPlayed = progress.played;
          _this.prevLoaded = progress.loaded;
        }
      }
      _this.progressTimeout = setTimeout(_this.progress, _this.props.progressFrequency || _this.props.progressInterval);
    }, _this.onReady = function () {
      if (!_this.mounted) return;
      _this.isReady = true;
      _this.isLoading = false;
      var _this$props = _this.props,
          onReady = _this$props.onReady,
          playing = _this$props.playing,
          volume = _this$props.volume,
          muted = _this$props.muted;

      onReady();
      if (!muted && volume !== null) {
        _this.player.setVolume(volume);
      }
      if (_this.loadOnReady) {
        _this.player.load(_this.loadOnReady, true);
        _this.loadOnReady = null;
      } else if (playing) {
        _this.player.play();
      }
      _this.onDurationCheck();
    }, _this.onPlay = function () {
      _this.isPlaying = true;
      _this.isLoading = false;
      var _this$props2 = _this.props,
          onStart = _this$props2.onStart,
          onPlay = _this$props2.onPlay,
          playbackRate = _this$props2.playbackRate;

      if (_this.startOnPlay) {
        if (_this.player.setPlaybackRate) {
          _this.player.setPlaybackRate(playbackRate);
        }
        onStart();
        _this.startOnPlay = false;
      }
      onPlay();
      if (_this.seekOnPlay) {
        _this.seekTo(_this.seekOnPlay);
        _this.seekOnPlay = null;
      }
      _this.onDurationCheck();
    }, _this.onPause = function (e) {
      _this.isPlaying = false;
      if (!_this.isLoading) {
        _this.props.onPause(e);
      }
    }, _this.onEnded = function () {
      var _this$props3 = _this.props,
          activePlayer = _this$props3.activePlayer,
          loop = _this$props3.loop,
          onEnded = _this$props3.onEnded;

      if (activePlayer.loopOnEnded && loop) {
        _this.seekTo(0);
      }
      if (!loop) {
        _this.isPlaying = false;
        onEnded();
      }
    }, _this.onError = function (e) {
      _this.isLoading = false;
      _this.props.onError(e);
    }, _this.onDurationCheck = function () {
      clearTimeout(_this.durationCheckTimeout);
      var duration = _this.getDuration();
      if (duration) {
        if (!_this.onDurationCalled) {
          _this.props.onDuration(duration);
          _this.onDurationCalled = true;
        }
      } else {
        _this.durationCheckTimeout = setTimeout(_this.onDurationCheck, 100);
      }
    }, _this.onLoaded = function () {
      // Sometimes we know loading has stopped but onReady/onPlay are never called
      // so this provides a way for players to avoid getting stuck
      _this.isLoading = false;
    }, _this.ref = function (player) {
      if (player) {
        _this.player = player;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  } // Track playing state internally to prevent bugs
  // Use isLoading to prevent onPause when switching URL


  _createClass(Player, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.mounted = true;
      this.player.load(this.props.url);
      this.progress();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.progressTimeout);
      clearTimeout(this.durationCheckTimeout);
      if (this.isReady) {
        this.player.stop();
      }
      if (this.player.disablePIP) {
        this.player.disablePIP();
      }
      this.mounted = false;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      // Invoke player methods based on incoming props
      var _props = this.props,
          url = _props.url,
          playing = _props.playing,
          volume = _props.volume,
          muted = _props.muted,
          playbackRate = _props.playbackRate,
          pip = _props.pip,
          loop = _props.loop;

      if (!(0, _utils.isEqual)(url, nextProps.url)) {
        if (this.isLoading) {
          console.warn('ReactPlayer: the attempt to load ' + nextProps.url + ' is being deferred until the player has loaded');
          this.loadOnReady = nextProps.url;
          return;
        }
        this.isLoading = true;
        this.startOnPlay = true;
        this.onDurationCalled = false;
        this.player.load(nextProps.url, this.isReady);
      }
      if (!playing && nextProps.playing && !this.isPlaying) {
        this.player.play();
      }
      if (playing && !nextProps.playing && this.isPlaying) {
        this.player.pause();
      }
      if (!pip && nextProps.pip && this.player.enablePIP) {
        this.player.enablePIP();
      } else if (pip && !nextProps.pip && this.player.disablePIP) {
        this.player.disablePIP();
      }
      if (volume !== nextProps.volume && nextProps.volume !== null) {
        this.player.setVolume(nextProps.volume);
      }
      if (muted !== nextProps.muted) {
        if (nextProps.muted) {
          this.player.mute();
        } else {
          this.player.unmute();
          if (nextProps.volume !== null) {
            // Set volume next tick to fix a bug with DailyMotion
            setTimeout(function () {
              return _this2.player.setVolume(nextProps.volume);
            });
          }
        }
      }
      if (playbackRate !== nextProps.playbackRate && this.player.setPlaybackRate) {
        this.player.setPlaybackRate(nextProps.playbackRate);
      }
      if (loop !== nextProps.loop && this.player.setLoop) {
        this.player.setLoop(nextProps.loop);
      }
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      if (!this.isReady) return null;
      return this.player.getDuration();
    }
  }, {
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      if (!this.isReady) return null;
      return this.player.getCurrentTime();
    }
  }, {
    key: 'getSecondsLoaded',
    value: function getSecondsLoaded() {
      if (!this.isReady) return null;
      return this.player.getSecondsLoaded();
    }
  }, {
    key: 'seekTo',
    value: function seekTo(amount, type) {
      var _this3 = this;

      // When seeking before player is ready, store value and seek later
      if (!this.isReady && amount !== 0) {
        this.seekOnPlay = amount;
        setTimeout(function () {
          _this3.seekOnPlay = null;
        }, SEEK_ON_PLAY_EXPIRY);
        return;
      }
      var isFraction = !type ? amount > 0 && amount < 1 : type === 'fraction';
      if (isFraction) {
        // Convert fraction to seconds based on duration
        var duration = this.player.getDuration();
        if (!duration) {
          console.warn('ReactPlayer: could not seek using fraction – duration not yet available');
          return;
        }
        this.player.seekTo(duration * amount);
        return;
      }
      this.player.seekTo(amount);
    }
  }, {
    key: 'render',
    value: function render() {
      var Player = this.props.activePlayer;
      if (!Player) {
        return null;
      }
      return _react2['default'].createElement(Player, _extends({}, this.props, {
        ref: this.ref,
        onReady: this.onReady,
        onPlay: this.onPlay,
        onPause: this.onPause,
        onEnded: this.onEnded,
        onLoaded: this.onLoaded,
        onError: this.onError
      }));
    }
  }]);

  return Player;
}(_react.Component);

Player.displayName = 'Player';
Player.propTypes = _props2.propTypes;
Player.defaultProps = _props2.defaultProps;
exports['default'] = Player;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoundCloud = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utils = __webpack_require__(1);

var _singlePlayer = __webpack_require__(2);

var _singlePlayer2 = _interopRequireDefault(_singlePlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SDK_URL = 'https://w.soundcloud.com/player/api.js';
var SDK_GLOBAL = 'SC';
var MATCH_URL = /(soundcloud\.com|snd\.sc)\/.+$/;

var SoundCloud = exports.SoundCloud = function (_Component) {
  _inherits(SoundCloud, _Component);

  function SoundCloud() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SoundCloud);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SoundCloud.__proto__ || Object.getPrototypeOf(SoundCloud)).call.apply(_ref, [this].concat(args))), _this), _this.callPlayer = _utils.callPlayer, _this.duration = null, _this.currentTime = null, _this.fractionLoaded = null, _this.mute = function () {
      _this.setVolume(0);
    }, _this.unmute = function () {
      if (_this.props.volume !== null) {
        _this.setVolume(_this.props.volume);
      }
    }, _this.ref = function (iframe) {
      _this.iframe = iframe;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SoundCloud, [{
    key: 'load',
    value: function load(url, isReady) {
      var _this2 = this;

      (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL).then(function (SC) {
        if (!_this2.iframe) return;
        var _SC$Widget$Events = SC.Widget.Events,
            PLAY = _SC$Widget$Events.PLAY,
            PLAY_PROGRESS = _SC$Widget$Events.PLAY_PROGRESS,
            PAUSE = _SC$Widget$Events.PAUSE,
            FINISH = _SC$Widget$Events.FINISH,
            ERROR = _SC$Widget$Events.ERROR;

        if (!isReady) {
          _this2.player = SC.Widget(_this2.iframe);
          _this2.player.bind(PLAY, _this2.props.onPlay);
          _this2.player.bind(PAUSE, _this2.props.onPause);
          _this2.player.bind(PLAY_PROGRESS, function (e) {
            _this2.currentTime = e.currentPosition / 1000;
            _this2.fractionLoaded = e.loadedProgress;
          });
          _this2.player.bind(FINISH, function () {
            return _this2.props.onEnded();
          });
          _this2.player.bind(ERROR, function (e) {
            return _this2.props.onError(e);
          });
        }
        _this2.player.load(url, _extends({}, _this2.props.config.soundcloud.options, {
          callback: function callback() {
            _this2.player.getDuration(function (duration) {
              _this2.duration = duration / 1000;
              _this2.props.onReady();
            });
          }
        }));
      });
    }
  }, {
    key: 'play',
    value: function play() {
      this.callPlayer('play');
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.callPlayer('pause');
    }
  }, {
    key: 'stop',
    value: function stop() {
      // Nothing to do
    }
  }, {
    key: 'seekTo',
    value: function seekTo(seconds) {
      this.callPlayer('seekTo', seconds * 1000);
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      this.callPlayer('setVolume', fraction * 100);
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      return this.duration;
    }
  }, {
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      return this.currentTime;
    }
  }, {
    key: 'getSecondsLoaded',
    value: function getSecondsLoaded() {
      return this.fractionLoaded * this.duration;
    }
  }, {
    key: 'render',
    value: function render() {
      var style = _extends({
        width: '100%',
        height: '100%'
      }, this.props.style);
      return _react2['default'].createElement('iframe', {
        ref: this.ref,
        src: 'https://w.soundcloud.com/player/?url=' + encodeURIComponent(this.props.url),
        style: style,
        frameBorder: 0,
        allow: 'autoplay'
      });
    }
  }]);

  return SoundCloud;
}(_react.Component);

SoundCloud.displayName = 'SoundCloud';

SoundCloud.canPlay = function (url) {
  return MATCH_URL.test(url);
};

SoundCloud.loopOnEnded = true;
exports['default'] = (0, _singlePlayer2['default'])(SoundCloud);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vimeo = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utils = __webpack_require__(1);

var _singlePlayer = __webpack_require__(2);

var _singlePlayer2 = _interopRequireDefault(_singlePlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SDK_URL = 'https://player.vimeo.com/api/player.js';
var SDK_GLOBAL = 'Vimeo';
var MATCH_URL = /vimeo\.com\/.+/;
var MATCH_FILE_URL = /vimeo\.com\/external\/.+\.mp4/;

var Vimeo = exports.Vimeo = function (_Component) {
  _inherits(Vimeo, _Component);

  function Vimeo() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Vimeo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Vimeo.__proto__ || Object.getPrototypeOf(Vimeo)).call.apply(_ref, [this].concat(args))), _this), _this.callPlayer = _utils.callPlayer, _this.duration = null, _this.currentTime = null, _this.secondsLoaded = null, _this.mute = function () {
      _this.setVolume(0);
    }, _this.unmute = function () {
      if (_this.props.volume !== null) {
        _this.setVolume(_this.props.volume);
      }
    }, _this.ref = function (container) {
      _this.container = container;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Vimeo, [{
    key: 'load',
    value: function load(url) {
      var _this2 = this;

      this.duration = null;
      (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL).then(function (Vimeo) {
        if (!_this2.container) return;
        _this2.player = new Vimeo.Player(_this2.container, _extends({}, _this2.props.config.vimeo.playerOptions, {
          url: url,
          autoplay: _this2.props.playing,
          muted: _this2.props.muted,
          loop: _this2.props.loop,
          playsinline: _this2.props.playsinline
        }));
        _this2.player.ready().then(function () {
          var iframe = _this2.container.querySelector('iframe');
          iframe.style.width = '100%';
          iframe.style.height = '100%';
        })['catch'](_this2.props.onError);
        _this2.player.on('loaded', function () {
          _this2.props.onReady();
          _this2.refreshDuration();
        });
        _this2.player.on('play', function () {
          _this2.props.onPlay();
          _this2.refreshDuration();
        });
        _this2.player.on('pause', _this2.props.onPause);
        _this2.player.on('seeked', function (e) {
          return _this2.props.onSeek(e.seconds);
        });
        _this2.player.on('ended', _this2.props.onEnded);
        _this2.player.on('error', _this2.props.onError);
        _this2.player.on('timeupdate', function (_ref2) {
          var seconds = _ref2.seconds;

          _this2.currentTime = seconds;
        });
        _this2.player.on('progress', function (_ref3) {
          var seconds = _ref3.seconds;

          _this2.secondsLoaded = seconds;
        });
      }, this.props.onError);
    }
  }, {
    key: 'refreshDuration',
    value: function refreshDuration() {
      var _this3 = this;

      this.player.getDuration().then(function (duration) {
        _this3.duration = duration;
      });
    }
  }, {
    key: 'play',
    value: function play() {
      this.callPlayer('play');
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.callPlayer('pause');
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.callPlayer('unload');
    }
  }, {
    key: 'seekTo',
    value: function seekTo(seconds) {
      this.callPlayer('setCurrentTime', seconds);
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      this.callPlayer('setVolume', fraction);
    }
  }, {
    key: 'setLoop',
    value: function setLoop(loop) {
      this.callPlayer('setLoop', loop);
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      return this.duration;
    }
  }, {
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      return this.currentTime;
    }
  }, {
    key: 'getSecondsLoaded',
    value: function getSecondsLoaded() {
      return this.secondsLoaded;
    }
  }, {
    key: 'render',
    value: function render() {
      var style = _extends({
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: 'black'
      }, this.props.style);
      return _react2['default'].createElement('div', {
        key: this.props.url,
        ref: this.ref,
        style: style
      });
    }
  }]);

  return Vimeo;
}(_react.Component);

Vimeo.displayName = 'Vimeo';

Vimeo.canPlay = function (url) {
  if (MATCH_FILE_URL.test(url)) {
    return false;
  }
  return MATCH_URL.test(url);
};

exports['default'] = (0, _singlePlayer2['default'])(Vimeo);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DailyMotion = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utils = __webpack_require__(1);

var _singlePlayer = __webpack_require__(2);

var _singlePlayer2 = _interopRequireDefault(_singlePlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SDK_URL = 'https://api.dmcdn.net/all.js';
var SDK_GLOBAL = 'DM';
var SDK_GLOBAL_READY = 'dmAsyncInit';
var MATCH_URL = /^(?:(?:https?):)?(?:\/\/)?(?:www\.)?(?:(?:dailymotion\.com(?:\/embed)?\/video)|dai\.ly)\/([a-zA-Z0-9]+)(?:_[\w_-]+)?$/;

var DailyMotion = exports.DailyMotion = function (_Component) {
  _inherits(DailyMotion, _Component);

  function DailyMotion() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DailyMotion);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DailyMotion.__proto__ || Object.getPrototypeOf(DailyMotion)).call.apply(_ref, [this].concat(args))), _this), _this.callPlayer = _utils.callPlayer, _this.onDurationChange = function () {
      var duration = _this.getDuration();
      _this.props.onDuration(duration);
    }, _this.mute = function () {
      _this.callPlayer('setMuted', true);
    }, _this.unmute = function () {
      _this.callPlayer('setMuted', false);
    }, _this.ref = function (container) {
      _this.container = container;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DailyMotion, [{
    key: 'load',
    value: function load(url) {
      var _this2 = this;

      var _props = this.props,
          controls = _props.controls,
          config = _props.config,
          onError = _props.onError,
          playing = _props.playing;

      var _url$match = url.match(MATCH_URL),
          _url$match2 = _slicedToArray(_url$match, 2),
          id = _url$match2[1];

      if (this.player) {
        this.player.load(id, {
          start: (0, _utils.parseStartTime)(url),
          autoplay: playing
        });
        return;
      }
      (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL, SDK_GLOBAL_READY, function (DM) {
        return DM.player;
      }).then(function (DM) {
        if (!_this2.container) return;
        var Player = DM.player;
        _this2.player = new Player(_this2.container, {
          width: '100%',
          height: '100%',
          video: id,
          params: _extends({
            controls: controls,
            autoplay: _this2.props.playing,
            mute: _this2.props.muted,
            start: (0, _utils.parseStartTime)(url),
            origin: window.location.origin
          }, config.dailymotion.params),
          events: {
            apiready: _this2.props.onReady,
            seeked: function seeked() {
              return _this2.props.onSeek(_this2.player.currentTime);
            },
            video_end: _this2.props.onEnded,
            durationchange: _this2.onDurationChange,
            pause: _this2.props.onPause,
            playing: _this2.props.onPlay,
            waiting: _this2.props.onBuffer,
            error: function error(event) {
              return onError(event);
            }
          }
        });
      }, onError);
    }
  }, {
    key: 'play',
    value: function play() {
      this.callPlayer('play');
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.callPlayer('pause');
    }
  }, {
    key: 'stop',
    value: function stop() {
      // Nothing to do
    }
  }, {
    key: 'seekTo',
    value: function seekTo(seconds) {
      this.callPlayer('seek', seconds);
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      this.callPlayer('setVolume', fraction);
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      return this.player.duration || null;
    }
  }, {
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      return this.player.currentTime;
    }
  }, {
    key: 'getSecondsLoaded',
    value: function getSecondsLoaded() {
      return this.player.bufferedTime;
    }
  }, {
    key: 'render',
    value: function render() {
      var style = _extends({
        width: '100%',
        height: '100%',
        backgroundColor: 'black'
      }, this.props.style);
      return _react2['default'].createElement(
        'div',
        { style: style },
        _react2['default'].createElement('div', { ref: this.ref })
      );
    }
  }]);

  return DailyMotion;
}(_react.Component);

DailyMotion.displayName = 'DailyMotion';

DailyMotion.canPlay = function (url) {
  return MATCH_URL.test(url);
};

DailyMotion.loopOnEnded = true;
exports['default'] = (0, _singlePlayer2['default'])(DailyMotion);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilePlayer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utils = __webpack_require__(1);

var _singlePlayer = __webpack_require__(2);

var _singlePlayer2 = _interopRequireDefault(_singlePlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var AUDIO_EXTENSIONS = /\.(m4a|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx)($|\?)/i;
var VIDEO_EXTENSIONS = /\.(mp4|og[gv]|webm|mov|m4v)($|\?)/i;
var HLS_EXTENSIONS = /\.(m3u8)($|\?)/i;
var HLS_SDK_URL = 'https://cdnjs.cloudflare.com/ajax/libs/hls.js/VERSION/hls.min.js';
var HLS_GLOBAL = 'Hls';
var DASH_EXTENSIONS = /\.(mpd)($|\?)/i;
var DASH_SDK_URL = 'https://cdnjs.cloudflare.com/ajax/libs/dashjs/VERSION/dash.all.min.js';
var DASH_GLOBAL = 'dashjs';
var MATCH_DROPBOX_URL = /www\.dropbox\.com\/.+/;

function canPlay(url) {
  if (url instanceof Array) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = url[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var item = _step.value;

        if (typeof item === 'string' && canPlay(item)) {
          return true;
        }
        if (canPlay(item.src)) {
          return true;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return false;
  }
  if ((0, _utils.isMediaStream)(url)) {
    return true;
  }
  return AUDIO_EXTENSIONS.test(url) || VIDEO_EXTENSIONS.test(url) || HLS_EXTENSIONS.test(url) || DASH_EXTENSIONS.test(url);
}

function canEnablePIP(url) {
  return canPlay(url) && !!document.pictureInPictureEnabled && !AUDIO_EXTENSIONS.test(url);
}

var FilePlayer = exports.FilePlayer = function (_Component) {
  _inherits(FilePlayer, _Component);

  function FilePlayer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FilePlayer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FilePlayer.__proto__ || Object.getPrototypeOf(FilePlayer)).call.apply(_ref, [this].concat(args))), _this), _this.onDisablePIP = function (e) {
      var _this$props = _this.props,
          onDisablePIP = _this$props.onDisablePIP,
          playing = _this$props.playing;

      onDisablePIP(e);
      if (playing) {
        _this.play();
      }
    }, _this.onSeek = function (e) {
      _this.props.onSeek(e.target.currentTime);
    }, _this.mute = function () {
      _this.player.muted = true;
    }, _this.unmute = function () {
      _this.player.muted = false;
    }, _this.renderSourceElement = function (source, index) {
      if (typeof source === 'string') {
        return _react2['default'].createElement('source', { key: index, src: source });
      }
      return _react2['default'].createElement('source', _extends({ key: index }, source));
    }, _this.renderTrack = function (track, index) {
      return _react2['default'].createElement('track', _extends({ key: index }, track));
    }, _this.ref = function (player) {
      _this.player = player;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FilePlayer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.addListeners();
      if (IOS) {
        this.player.load();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.shouldUseAudio(this.props) !== this.shouldUseAudio(nextProps)) {
        this.removeListeners();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.shouldUseAudio(this.props) !== this.shouldUseAudio(prevProps)) {
        this.addListeners();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.removeListeners();
    }
  }, {
    key: 'addListeners',
    value: function addListeners() {
      var _props = this.props,
          onReady = _props.onReady,
          onPlay = _props.onPlay,
          onBuffer = _props.onBuffer,
          onBufferEnd = _props.onBufferEnd,
          onPause = _props.onPause,
          onEnded = _props.onEnded,
          onError = _props.onError,
          playsinline = _props.playsinline,
          onEnablePIP = _props.onEnablePIP,
          onVolumeChange = _props.onVolumeChange,
          videoElementId = _props.videoElementId;

      this.player.addEventListener('canplay', onReady);
      this.player.addEventListener('play', onPlay);
      this.player.addEventListener('waiting', onBuffer);
      this.player.addEventListener('playing', onBufferEnd);
      this.player.addEventListener('pause', onPause);
      this.player.addEventListener('seeked', this.onSeek);
      this.player.addEventListener('ended', onEnded);
      this.player.addEventListener('error', onError);
      this.player.addEventListener('volumeChange', onVolumeChange);
      this.player.setAttribute('id', videoElementId);
      this.player.addEventListener('enterpictureinpicture', onEnablePIP);
      this.player.addEventListener('leavepictureinpicture', this.onDisablePIP);
      if (playsinline) {
        this.player.setAttribute('playsinline', '');
        this.player.setAttribute('webkit-playsinline', '');
        this.player.setAttribute('x5-playsinline', '');
      }
    }
  }, {
    key: 'removeListeners',
    value: function removeListeners() {
      var _props2 = this.props,
          onReady = _props2.onReady,
          onPlay = _props2.onPlay,
          onBuffer = _props2.onBuffer,
          onBufferEnd = _props2.onBufferEnd,
          onPause = _props2.onPause,
          onEnded = _props2.onEnded,
          onError = _props2.onError,
          onEnablePIP = _props2.onEnablePIP,
          onVolumeChange = _props2.onVolumeChange;

      this.player.removeEventListener('canplay', onReady);
      this.player.removeEventListener('play', onPlay);
      this.player.removeEventListener('waiting', onBuffer);
      this.player.removeEventListener('playing', onBufferEnd);
      this.player.removeEventListener('pause', onPause);
      this.player.removeEventListener('seeked', this.onSeek);
      this.player.removeEventListener('ended', onEnded);
      this.player.removeEventListener('error', onError);
      this.player.removeEventListener('volumeChange', onVolumeChange);
      this.player.removeEventListener('enterpictureinpicture', onEnablePIP);
      this.player.removeEventListener('leavepictureinpicture', this.onDisablePIP);
    }
  }, {
    key: 'shouldUseAudio',
    value: function shouldUseAudio(props) {
      if (props.config.file.forceVideo) {
        return false;
      }
      if (props.config.file.attributes.poster) {
        return false; // Use <video> so that poster is shown
      }
      return AUDIO_EXTENSIONS.test(props.url) || props.config.file.forceAudio;
    }
  }, {
    key: 'shouldUseHLS',
    value: function shouldUseHLS(url) {
      return HLS_EXTENSIONS.test(url) && !IOS || this.props.config.file.forceHLS;
    }
  }, {
    key: 'shouldUseDASH',
    value: function shouldUseDASH(url) {
      return DASH_EXTENSIONS.test(url) || this.props.config.file.forceDASH;
    }
  }, {
    key: 'load',
    value: function load(url) {
      var _this2 = this;

      var _props$config$file = this.props.config.file,
          hlsVersion = _props$config$file.hlsVersion,
          dashVersion = _props$config$file.dashVersion;

      if (this.shouldUseHLS(url)) {
        (0, _utils.getSDK)(HLS_SDK_URL.replace('VERSION', hlsVersion), HLS_GLOBAL).then(function (Hls) {
          _this2.hls = new Hls(_this2.props.config.file.hlsOptions);
          _this2.hls.on(Hls.Events.ERROR, function (e, data) {
            _this2.props.onError(e, data, _this2.hls, Hls);
          });
          _this2.hls.loadSource(url);
          _this2.hls.attachMedia(_this2.player);
        });
      }
      if (this.shouldUseDASH(url)) {
        (0, _utils.getSDK)(DASH_SDK_URL.replace('VERSION', dashVersion), DASH_GLOBAL).then(function (dashjs) {
          _this2.dash = dashjs.MediaPlayer().create();
          _this2.dash.initialize(_this2.player, url, _this2.props.playing);
          _this2.dash.getDebug().setLogToBrowserConsole(false);
        });
      }

      if (url instanceof Array) {
        // When setting new urls (<source>) on an already loaded video,
        // HTMLMediaElement.load() is needed to reset the media element
        // and restart the media resource. Just replacing children source
        // dom nodes is not enough
        this.player.load();
      } else if ((0, _utils.isMediaStream)(url)) {
        try {
          this.player.srcObject = url;
        } catch (e) {
          this.player.src = window.URL.createObjectURL(url);
        }
      }
    }
  }, {
    key: 'play',
    value: function play() {
      var promise = this.player.play();
      if (promise) {
        promise['catch'](this.props.onError);
      }
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.player.pause();
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.player.removeAttribute('src');
      if (this.hls) {
        this.hls.destroy();
      }
      if (this.dash) {
        this.dash.reset();
      }
    }
  }, {
    key: 'seekTo',
    value: function seekTo(seconds) {
      this.player.currentTime = seconds;
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      this.player.volume = fraction;
    }
  }, {
    key: 'enablePIP',
    value: function enablePIP() {
      if (this.player.requestPictureInPicture && document.pictureInPictureElement !== this.player) {
        this.player.requestPictureInPicture();
      }
    }
  }, {
    key: 'disablePIP',
    value: function disablePIP() {
      if (document.exitPictureInPicture && document.pictureInPictureElement === this.player) {
        document.exitPictureInPicture();
      }
    }
  }, {
    key: 'setPlaybackRate',
    value: function setPlaybackRate(rate) {
      this.player.playbackRate = rate;
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      if (!this.player) return null;
      var _player = this.player,
          duration = _player.duration,
          seekable = _player.seekable;
      // on iOS, live streams return Infinity for the duration
      // so instead we use the end of the seekable timerange

      if (duration === Infinity && seekable.length > 0) {
        return seekable.end(seekable.length - 1);
      }
      return duration;
    }
  }, {
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      if (!this.player) return null;
      return this.player.currentTime;
    }
  }, {
    key: 'getSecondsLoaded',
    value: function getSecondsLoaded() {
      if (!this.player) return null;
      var buffered = this.player.buffered;

      if (buffered.length === 0) {
        return 0;
      }
      var end = buffered.end(buffered.length - 1);
      var duration = this.getDuration();
      if (end > duration) {
        return duration;
      }
      return end;
    }
  }, {
    key: 'getSource',
    value: function getSource(url) {
      var useHLS = this.shouldUseHLS(url);
      var useDASH = this.shouldUseDASH(url);
      if (url instanceof Array || (0, _utils.isMediaStream)(url) || useHLS || useDASH) {
        return undefined;
      }
      if (MATCH_DROPBOX_URL.test(url)) {
        return url.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
      }
      return url;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          url = _props3.url,
          playing = _props3.playing,
          loop = _props3.loop,
          controls = _props3.controls,
          muted = _props3.muted,
          config = _props3.config,
          width = _props3.width,
          height = _props3.height;

      var useAudio = this.shouldUseAudio(this.props);
      var Element = useAudio ? 'audio' : 'video';
      var style = {
        width: width === 'auto' ? width : '100%',
        height: height === 'auto' ? height : '100%'
      };
      return _react2['default'].createElement(
        Element,
        _extends({
          ref: this.ref,
          src: this.getSource(url),
          style: style,
          preload: 'auto',
          autoPlay: playing || undefined,
          controls: controls,
          muted: muted,
          loop: loop
        }, config.file.attributes),
        url instanceof Array && url.map(this.renderSourceElement),
        config.file.tracks.map(this.renderTrack)
      );
    }
  }]);

  return FilePlayer;
}(_react.Component);

FilePlayer.displayName = 'FilePlayer';
FilePlayer.canPlay = canPlay;
FilePlayer.canEnablePIP = canEnablePIP;
exports['default'] = (0, _singlePlayer2['default'])(FilePlayer);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Creative = exports.Creative = function Creative() {
  var creativeAttributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, Creative);

  this.id = creativeAttributes.id || null;
  this.adId = creativeAttributes.adId || null;
  this.sequence = creativeAttributes.sequence || null;
  this.apiFramework = creativeAttributes.apiFramework || null;
  this.trackingEvents = {};
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function track(URLTemplates, variables, options) {
  var URLs = resolveURLTemplates(URLTemplates, variables, options);

  URLs.forEach(function (URL) {
    if (typeof window !== 'undefined' && window !== null) {
      var i = new Image();
      i.src = URL;
    }
  });
}

/**
 * Replace the provided URLTemplates with the given values
 *
 * @param {Array} URLTemplates - An array of tracking url templates.
 * @param {Object} [variables={}] - An optional Object of parameters to be used in the tracking calls.
 * @param {Object} [options={}] - An optional Object of options to be used in the tracking calls.
 */
function resolveURLTemplates(URLTemplates) {
  var variables = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var URLs = [];

  // Encode String variables, when given
  if (variables['ASSETURI']) {
    variables['ASSETURI'] = encodeURIComponentRFC3986(variables['ASSETURI']);
  }
  if (variables['CONTENTPLAYHEAD']) {
    variables['CONTENTPLAYHEAD'] = encodeURIComponentRFC3986(variables['CONTENTPLAYHEAD']);
  }

  // Set default value for invalid ERRORCODE
  if (variables['ERRORCODE'] && !options.isCustomCode && !/^[0-9]{3}$/.test(variables['ERRORCODE'])) {
    variables['ERRORCODE'] = 900;
  }

  // Calc random/time based macros
  variables['CACHEBUSTING'] = leftpad(Math.round(Math.random() * 1.0e8).toString());
  variables['TIMESTAMP'] = encodeURIComponentRFC3986(new Date().toISOString());

  // RANDOM/random is not defined in VAST 3/4 as a valid macro tho it's used by some adServer (Auditude)
  variables['RANDOM'] = variables['random'] = variables['CACHEBUSTING'];

  for (var URLTemplateKey in URLTemplates) {
    var resolveURL = URLTemplates[URLTemplateKey];

    if (typeof resolveURL !== 'string') {
      continue;
    }

    for (var key in variables) {
      var value = variables[key];
      var macro1 = '[' + key + ']';
      var macro2 = '%%' + key + '%%';
      resolveURL = resolveURL.replace(macro1, value);
      resolveURL = resolveURL.replace(macro2, value);
    }
    URLs.push(resolveURL);
  }

  return URLs;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
function encodeURIComponentRFC3986(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
}

function leftpad(str) {
  if (str.length < 8) {
    return range(0, 8 - str.length, false).map(function () {
      return '0';
    }).join('') + str;
  }
  return str;
}

function range(left, right, inclusive) {
  var result = [];
  var ascending = left < right;
  var end = !inclusive ? right : ascending ? right + 1 : right - 1;

  for (var i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
    result.push(i);
  }
  return result;
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

var util = exports.util = {
  track: track,
  resolveURLTemplates: resolveURLTemplates,
  encodeURIComponentRFC3986: encodeURIComponentRFC3986,
  leftpad: leftpad,
  range: range,
  isNumeric: isNumeric,
  flatten: flatten
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Facebook = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utils = __webpack_require__(1);

var _singlePlayer = __webpack_require__(2);

var _singlePlayer2 = _interopRequireDefault(_singlePlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SDK_URL = '//connect.facebook.net/en_US/sdk.js';
var SDK_GLOBAL = 'FB';
var SDK_GLOBAL_READY = 'fbAsyncInit';
var MATCH_URL = /facebook\.com\/([^/?].+\/)?video(s|\.php)[/?].*$/;
var PLAYER_ID_PREFIX = 'facebook-player-';

var Facebook = exports.Facebook = function (_Component) {
  _inherits(Facebook, _Component);

  function Facebook() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Facebook);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Facebook.__proto__ || Object.getPrototypeOf(Facebook)).call.apply(_ref, [this].concat(args))), _this), _this.callPlayer = _utils.callPlayer, _this.playerID = PLAYER_ID_PREFIX + (0, _utils.randomString)(), _this.mute = function () {
      _this.callPlayer('mute');
    }, _this.unmute = function () {
      _this.callPlayer('unmute');
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Facebook, [{
    key: 'load',
    value: function load(url, isReady) {
      var _this2 = this;

      if (isReady) {
        (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL, SDK_GLOBAL_READY).then(function (FB) {
          return FB.XFBML.parse();
        });
        return;
      }
      (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL, SDK_GLOBAL_READY).then(function (FB) {
        FB.init({
          appId: _this2.props.config.facebook.appId,
          xfbml: true,
          version: 'v2.5'
        });
        FB.Event.subscribe('xfbml.render', function (msg) {
          // Here we know the SDK has loaded, even if onReady/onPlay
          // is not called due to a video that cannot be embedded
          _this2.props.onLoaded();
        });
        FB.Event.subscribe('xfbml.ready', function (msg) {
          if (msg.type === 'video' && msg.id === _this2.playerID) {
            _this2.player = msg.instance;
            _this2.player.subscribe('startedPlaying', _this2.props.onPlay);
            _this2.player.subscribe('paused', _this2.props.onPause);
            _this2.player.subscribe('finishedPlaying', _this2.props.onEnded);
            _this2.player.subscribe('startedBuffering', _this2.props.onBuffer);
            _this2.player.subscribe('finishedBuffering', _this2.props.onBufferEnd);
            _this2.player.subscribe('error', _this2.props.onError);
            if (!_this2.props.muted) {
              // Player is muted by default
              _this2.callPlayer('unmute');
            }
            _this2.props.onReady();

            // For some reason Facebook have added `visibility: hidden`
            // to the iframe when autoplay fails, so here we set it back
            document.getElementById(_this2.playerID).querySelector('iframe').style.visibility = 'visible';
          }
        });
      });
    }
  }, {
    key: 'play',
    value: function play() {
      this.callPlayer('play');
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.callPlayer('pause');
    }
  }, {
    key: 'stop',
    value: function stop() {
      // Nothing to do
    }
  }, {
    key: 'seekTo',
    value: function seekTo(seconds) {
      this.callPlayer('seek', seconds);
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      this.callPlayer('setVolume', fraction);
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      return this.callPlayer('getDuration');
    }
  }, {
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      return this.callPlayer('getCurrentPosition');
    }
  }, {
    key: 'getSecondsLoaded',
    value: function getSecondsLoaded() {
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var style = {
        width: '100%',
        height: '100%',
        backgroundColor: 'black'
      };
      return _react2['default'].createElement('div', {
        style: style,
        id: this.playerID,
        className: 'fb-video',
        'data-href': this.props.url,
        'data-autoplay': this.props.playing ? 'true' : 'false',
        'data-allowfullscreen': 'true',
        'data-controls': this.props.controls ? 'true' : 'false'
      });
    }
  }]);

  return Facebook;
}(_react.Component);

Facebook.displayName = 'Facebook';

Facebook.canPlay = function (url) {
  return MATCH_URL.test(url);
};

Facebook.loopOnEnded = true;
exports['default'] = (0, _singlePlayer2['default'])(Facebook);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Streamable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utils = __webpack_require__(1);

var _singlePlayer = __webpack_require__(2);

var _singlePlayer2 = _interopRequireDefault(_singlePlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SDK_URL = '//cdn.embed.ly/player-0.1.0.min.js';
var SDK_GLOBAL = 'playerjs';
var MATCH_URL = /streamable\.com\/([a-z0-9]+)$/;

var Streamable = exports.Streamable = function (_Component) {
  _inherits(Streamable, _Component);

  function Streamable() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Streamable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Streamable.__proto__ || Object.getPrototypeOf(Streamable)).call.apply(_ref, [this].concat(args))), _this), _this.callPlayer = _utils.callPlayer, _this.duration = null, _this.currentTime = null, _this.secondsLoaded = null, _this.mute = function () {
      _this.callPlayer('mute');
    }, _this.unmute = function () {
      _this.callPlayer('unmute');
    }, _this.ref = function (iframe) {
      _this.iframe = iframe;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Streamable, [{
    key: 'load',
    value: function load(url) {
      var _this2 = this;

      (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL).then(function (playerjs) {
        if (!_this2.iframe) return;
        _this2.player = new playerjs.Player(_this2.iframe);
        _this2.player.setLoop(_this2.props.loop);
        _this2.player.on('ready', _this2.props.onReady);
        _this2.player.on('play', _this2.props.onPlay);
        _this2.player.on('pause', _this2.props.onPause);
        _this2.player.on('seeked', _this2.props.onSeek);
        _this2.player.on('ended', _this2.props.onEnded);
        _this2.player.on('error', _this2.props.onError);
        _this2.player.on('timeupdate', function (_ref2) {
          var duration = _ref2.duration,
              seconds = _ref2.seconds;

          _this2.duration = duration;
          _this2.currentTime = seconds;
        });
        _this2.player.on('buffered', function (_ref3) {
          var percent = _ref3.percent;

          if (_this2.duration) {
            _this2.secondsLoaded = _this2.duration * percent;
          }
        });
        if (_this2.props.muted) {
          _this2.player.mute();
        }
      }, this.props.onError);
    }
  }, {
    key: 'play',
    value: function play() {
      this.callPlayer('play');
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.callPlayer('pause');
    }
  }, {
    key: 'stop',
    value: function stop() {
      // Nothing to do
    }
  }, {
    key: 'seekTo',
    value: function seekTo(seconds) {
      this.callPlayer('setCurrentTime', seconds);
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      this.callPlayer('setVolume', fraction * 100);
    }
  }, {
    key: 'setLoop',
    value: function setLoop(loop) {
      this.callPlayer('setLoop', loop);
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      return this.duration;
    }
  }, {
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      return this.currentTime;
    }
  }, {
    key: 'getSecondsLoaded',
    value: function getSecondsLoaded() {
      return this.secondsLoaded;
    }
  }, {
    key: 'render',
    value: function render() {
      var id = this.props.url.match(MATCH_URL)[1];
      var style = {
        width: '100%',
        height: '100%'
      };
      return _react2['default'].createElement('iframe', {
        ref: this.ref,
        src: 'https://streamable.com/o/' + id,
        frameBorder: '0',
        scrolling: 'no',
        style: style,
        allowFullScreen: true
      });
    }
  }]);

  return Streamable;
}(_react.Component);

Streamable.displayName = 'Streamable';

Streamable.canPlay = function (url) {
  return MATCH_URL.test(url);
};

exports['default'] = (0, _singlePlayer2['default'])(Streamable);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FaceMask = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utils = __webpack_require__(1);

var _singlePlayer = __webpack_require__(2);

var _singlePlayer2 = _interopRequireDefault(_singlePlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SDK_URL = 'https://www.nfl.com/libs/playaction/api.js';
var SDK_GLOBAL = 'nfl';
var MATCH_FILE_URL = /nflent-vh\.akamaihd\.net\/.+\.m3u8/;
var PLAYER_ID_PREFIX = 'facemask-player-';

var FaceMask = exports.FaceMask = function (_Component) {
  _inherits(FaceMask, _Component);

  function FaceMask() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FaceMask);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FaceMask.__proto__ || Object.getPrototypeOf(FaceMask)).call.apply(_ref, [this].concat(args))), _this), _this.callPlayer = _utils.callPlayer, _this.duration = null, _this.volume = null, _this.currentTime = null, _this.secondsLoaded = null, _this.playerID = PLAYER_ID_PREFIX + (0, _utils.randomString)(), _this.ref = function (container) {
      _this.container = container;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FaceMask, [{
    key: 'load',
    value: function load(url) {
      var _this2 = this;

      this.duration = null;
      (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL).then(function (nfl) {
        if (!_this2.container) return;
        // eslint-disable-next-line new-cap
        _this2.player = new nfl.playaction({
          containerId: _this2.playerID,
          initialVideo: { url: url },
          height: '100%',
          width: '100%'
        });
        var _nfl$playaction$EVENT = nfl.playaction.EVENTS,
            PLAYER_READY = _nfl$playaction$EVENT.PLAYER_READY,
            STATUS = _nfl$playaction$EVENT.STATUS,
            TIME_UPDATE = _nfl$playaction$EVENT.TIME_UPDATE,
            VOLUME = _nfl$playaction$EVENT.VOLUME;
        var _nfl$playaction$STATU = nfl.playaction.STATUS,
            COMPLETE = _nfl$playaction$STATU.COMPLETE,
            ERROR = _nfl$playaction$STATU.ERROR,
            PAUSED = _nfl$playaction$STATU.PAUSED,
            PLAYING = _nfl$playaction$STATU.PLAYING;

        _this2.player.on(PLAYER_READY, _this2.props.onReady);
        _this2.player.on(VOLUME, _this2.props.onVolumeChange);
        _this2.player.on(STATUS, function (e) {
          switch (e.status) {
            case COMPLETE:
              {
                _this2.props.onEnded();
                break;
              }
            case ERROR:
              {
                _this2.props.onError(e);
                break;
              }
            case PAUSED:
              {
                _this2.props.onPause();
                break;
              }
            case PLAYING:
              {
                _this2.props.onPlay();
                break;
              }
          }
        });
        _this2.player.on(TIME_UPDATE, function (_ref2) {
          var currentTime = _ref2.currentTime,
              duration = _ref2.duration;

          _this2.currentTime = currentTime;
          _this2.duration = duration || Infinity;
        });
      }, this.props.onError);
    }
  }, {
    key: 'play',
    value: function play() {
      this.callPlayer('play');
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.callPlayer('pause');
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.callPlayer('destroy');
    }
  }, {
    key: 'seekTo',
    value: function seekTo(seconds) {
      this.callPlayer('seek', seconds);
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      // not supported
    }
  }, {
    key: 'mute',
    value: function mute() {
      this.callPlayer('mute');
    }
  }, {
    key: 'unmute',
    value: function unmute() {
      this.callPlayer('unmute');
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      return this.duration;
    }
  }, {
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      return this.currentTime;
    }
  }, {
    key: 'getSecondsLoaded',
    value: function getSecondsLoaded() {
      return this.secondsLoaded;
    }
  }, {
    key: 'render',
    value: function render() {
      var style = {
        width: '100%',
        height: '100%'
      };
      return _react2['default'].createElement('div', {
        id: this.playerID,
        ref: this.ref,
        style: style
      });
    }
  }]);

  return FaceMask;
}(_react.Component);

FaceMask.displayName = 'FaceMask';

FaceMask.canPlay = function (url) {
  return MATCH_FILE_URL.test(url);
};

exports['default'] = (0, _singlePlayer2['default'])(FaceMask);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wistia = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utils = __webpack_require__(1);

var _singlePlayer = __webpack_require__(2);

var _singlePlayer2 = _interopRequireDefault(_singlePlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SDK_URL = '//fast.wistia.com/assets/external/E-v1.js';
var SDK_GLOBAL = 'Wistia';
var MATCH_URL = /(?:wistia\.com|wi\.st)\/(?:medias|embed)\/(.*)$/;

var Wistia = exports.Wistia = function (_Component) {
  _inherits(Wistia, _Component);

  function Wistia() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Wistia);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Wistia.__proto__ || Object.getPrototypeOf(Wistia)).call.apply(_ref, [this].concat(args))), _this), _this.callPlayer = _utils.callPlayer, _this.mute = function () {
      _this.callPlayer('mute');
    }, _this.unmute = function () {
      _this.callPlayer('unmute');
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Wistia, [{
    key: 'getID',
    value: function getID(url) {
      return url && url.match(MATCH_URL)[1];
    }
  }, {
    key: 'load',
    value: function load(url) {
      var _this2 = this;

      var _props = this.props,
          playing = _props.playing,
          muted = _props.muted,
          controls = _props.controls,
          _onReady = _props.onReady,
          onPlay = _props.onPlay,
          onPause = _props.onPause,
          onSeek = _props.onSeek,
          onEnded = _props.onEnded,
          config = _props.config,
          onError = _props.onError;

      (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL).then(function () {
        window._wq = window._wq || [];
        window._wq.push({
          id: _this2.getID(url),
          options: _extends({
            autoPlay: playing,
            silentAutoPlay: 'allow',
            muted: muted,
            controlsVisibleOnLoad: controls
          }, config.wistia.options),
          onReady: function onReady(player) {
            _this2.player = player;
            _this2.unbind();
            _this2.player.bind('play', onPlay);
            _this2.player.bind('pause', onPause);
            _this2.player.bind('seek', onSeek);
            _this2.player.bind('end', onEnded);
            _onReady();
          }
        });
      }, onError);
    }
  }, {
    key: 'play',
    value: function play() {
      this.callPlayer('play');
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.callPlayer('pause');
    }
  }, {
    key: 'unbind',
    value: function unbind() {
      var _props2 = this.props,
          onPlay = _props2.onPlay,
          onPause = _props2.onPause,
          onSeek = _props2.onSeek,
          onEnded = _props2.onEnded;

      this.player.unbind('play', onPlay);
      this.player.unbind('pause', onPause);
      this.player.unbind('seek', onSeek);
      this.player.unbind('end', onEnded);
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.unbind();
      this.callPlayer('remove');
    }
  }, {
    key: 'seekTo',
    value: function seekTo(seconds) {
      this.callPlayer('time', seconds);
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      this.callPlayer('volume', fraction);
    }
  }, {
    key: 'setPlaybackRate',
    value: function setPlaybackRate(rate) {
      this.callPlayer('playbackRate', rate);
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      return this.callPlayer('duration');
    }
  }, {
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      return this.callPlayer('time');
    }
  }, {
    key: 'getSecondsLoaded',
    value: function getSecondsLoaded() {
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var id = this.getID(this.props.url);
      var className = 'wistia_embed wistia_async_' + id;
      var style = {
        width: '100%',
        height: '100%'
      };
      return _react2['default'].createElement('div', { key: id, className: className, style: style });
    }
  }]);

  return Wistia;
}(_react.Component);

Wistia.displayName = 'Wistia';

Wistia.canPlay = function (url) {
  return MATCH_URL.test(url);
};

Wistia.loopOnEnded = true;
exports['default'] = (0, _singlePlayer2['default'])(Wistia);

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Twitch = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utils = __webpack_require__(1);

var _singlePlayer = __webpack_require__(2);

var _singlePlayer2 = _interopRequireDefault(_singlePlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SDK_URL = 'https://player.twitch.tv/js/embed/v1.js';
var SDK_GLOBAL = 'Twitch';
var MATCH_VIDEO_URL = /(?:www\.|go\.)?twitch\.tv\/videos\/(\d+)($|\?)/;
var MATCH_CHANNEL_URL = /(?:www\.|go\.)?twitch\.tv\/([a-z0-9_]+)($|\?)/;
var PLAYER_ID_PREFIX = 'twitch-player-';

var Twitch = exports.Twitch = function (_Component) {
  _inherits(Twitch, _Component);

  function Twitch() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Twitch);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Twitch.__proto__ || Object.getPrototypeOf(Twitch)).call.apply(_ref, [this].concat(args))), _this), _this.callPlayer = _utils.callPlayer, _this.playerID = PLAYER_ID_PREFIX + (0, _utils.randomString)(), _this.mute = function () {
      _this.callPlayer('setMuted', true);
    }, _this.unmute = function () {
      _this.callPlayer('setMuted', false);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Twitch, [{
    key: 'load',
    value: function load(url, isReady) {
      var _this2 = this;

      var _props = this.props,
          playsinline = _props.playsinline,
          onError = _props.onError,
          config = _props.config;

      var isChannel = MATCH_CHANNEL_URL.test(url);
      var id = isChannel ? url.match(MATCH_CHANNEL_URL)[1] : url.match(MATCH_VIDEO_URL)[1];
      if (isReady) {
        if (isChannel) {
          this.player.setChannel(id);
        } else {
          this.player.setVideo('v' + id);
        }
        return;
      }
      (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL).then(function (Twitch) {
        _this2.player = new Twitch.Player(_this2.playerID, _extends({
          video: isChannel ? '' : id,
          channel: isChannel ? id : '',
          height: '100%',
          width: '100%',
          playsinline: playsinline,
          autoplay: _this2.props.playing,
          muted: _this2.props.muted
        }, config.twitch.options));
        var _Twitch$Player = Twitch.Player,
            READY = _Twitch$Player.READY,
            PLAYING = _Twitch$Player.PLAYING,
            PAUSE = _Twitch$Player.PAUSE,
            ENDED = _Twitch$Player.ENDED;

        _this2.player.addEventListener(READY, _this2.props.onReady);
        _this2.player.addEventListener(PLAYING, _this2.props.onPlay);
        _this2.player.addEventListener(PAUSE, _this2.props.onPause);
        _this2.player.addEventListener(ENDED, _this2.props.onEnded);
      }, onError);
    }
  }, {
    key: 'play',
    value: function play() {
      this.callPlayer('play');
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.callPlayer('pause');
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.callPlayer('pause');
    }
  }, {
    key: 'seekTo',
    value: function seekTo(seconds) {
      this.callPlayer('seek', seconds);
    }
  }, {
    key: 'getVolume',
    value: function getVolume() {
      return this.callPlayer('getVolume');
    }
  }, {
    key: 'getMuted',
    value: function getMuted() {
      return this.callPlayer('getMuted');
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      this.callPlayer('setVolume', fraction);
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      return this.callPlayer('getDuration');
    }
  }, {
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      return this.callPlayer('getCurrentTime');
    }
  }, {
    key: 'getSecondsLoaded',
    value: function getSecondsLoaded() {
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var style = {
        width: '100%',
        height: '100%'
      };
      return _react2['default'].createElement('div', { style: style, id: this.playerID });
    }
  }]);

  return Twitch;
}(_react.Component);

Twitch.displayName = 'Twitch';

Twitch.canPlay = function (url) {
  return MATCH_VIDEO_URL.test(url) || MATCH_CHANNEL_URL.test(url);
};

Twitch.loopOnEnded = true;
exports['default'] = (0, _singlePlayer2['default'])(Twitch);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UstreamLive = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utils = __webpack_require__(1);

var _singlePlayer = __webpack_require__(2);

var _singlePlayer2 = _interopRequireDefault(_singlePlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SDK_URL = 'https://developers.ustream.tv/js/ustream-embedapi.min.js';
var SDK_GLOBAL = 'UstreamEmbed';
var MATCH_URL = /(ustream.tv\/channel\/)([^#&?/]*)/;
var PLAYER_ID_PREFIX = 'UstreamLive-player-';

var UstreamLive = exports.UstreamLive = function (_Component) {
  _inherits(UstreamLive, _Component);

  function UstreamLive() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, UstreamLive);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = UstreamLive.__proto__ || Object.getPrototypeOf(UstreamLive)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      ustreamSrc: null
    }, _this.playerID = PLAYER_ID_PREFIX + (0, _utils.randomString)(), _this.callPlayer = _utils.callPlayer, _this.mute = function () {}, _this.unmute = function () {}, _this.ref = function (container) {
      _this.container = container;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(UstreamLive, [{
    key: 'parseId',
    value: function parseId(url) {
      var m = url.match(MATCH_URL);
      return m[2];
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      // reset ustreamSrc on reload
      if (prevProps.url && prevProps.url !== this.props.url) {
        this.setState({
          ustreamSrc: null
        });
      }
    }
  }, {
    key: 'load',
    value: function load() {
      var _this2 = this;

      var _props = this.props,
          onEnded = _props.onEnded,
          onError = _props.onError,
          onPause = _props.onPause,
          onPlay = _props.onPlay,
          onReady = _props.onReady,
          playing = _props.playing,
          url = _props.url;

      var channelId = this.parseId(url);
      this.setState({
        ustreamSrc: 'https://www.ustream.tv/embed/' + channelId + '?html5ui=1&autoplay=' + playing + '&controls=false&showtitle=false'
      });
      (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL).then(function (UstreamEmbed) {
        if (!_this2.container) return;
        _this2.currentTime = 0;
        _this2.player = UstreamEmbed(_this2.playerID);
        _this2.player.addListener('playing', function (type, playing) {
          if (playing) {
            _this2.playTime = Date.now();
            onPlay();
          } else {
            _this2.currentTime = _this2.getCurrentTime();
            _this2.playTime = null;
            onPause();
          }
        });
        _this2.player.addListener('live', onReady);
        _this2.player.addListener('offline', onReady);
        _this2.player.addListener('finished', onEnded);
        _this2.player.getProperty('duration', function (duration) {
          _this2.player.duration = duration || Infinity;
        });
      }, onError);
    }
    // todo

    // todo

  }, {
    key: 'play',
    value: function play() {
      this.callPlayer('callMethod', 'play');
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.callPlayer('callMethod', 'pause');
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.callPlayer('callMethod', 'stop');
    }
  }, {
    key: 'seekTo',
    value: function seekTo(seconds) {
      this.callPlayer('callMethod', 'seek', seconds);
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      this.callPlayer('callMethod', 'volume', fraction * 100);
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      return Infinity;
    }
  }, {
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      var playing = 0;
      if (this.playTime) {
        playing = (Date.now() - this.playTime) / 1000;
      }
      return this.currentTime + playing;
    }
  }, {
    key: 'getSecondsLoaded',
    value: function getSecondsLoaded() {
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var style = {
        width: '100%',
        height: '100%'
      };

      var ustreamSrc = this.state.ustreamSrc;

      return ustreamSrc && _react2['default'].createElement('iframe', {
        id: this.playerID,
        ref: this.ref,
        src: ustreamSrc,
        frameBorder: '0',
        scrolling: 'no',
        style: style,
        allowFullScreen: true
      });
    }
  }]);

  return UstreamLive;
}(_react.Component);

UstreamLive.displayName = 'UstreamLive';

UstreamLive.canPlay = function (url) {
  return MATCH_URL.test(url);
};

UstreamLive.loopOnEnded = false;
exports['default'] = (0, _singlePlayer2['default'])(UstreamLive);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UstreamVideo = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utils = __webpack_require__(1);

var _singlePlayer = __webpack_require__(2);

var _singlePlayer2 = _interopRequireDefault(_singlePlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SDK_URL = 'https://developers.ustream.tv/js/ustream-embedapi.min.js';
var SDK_GLOBAL = 'UstreamEmbed';
var MATCH_URL = /(ustream.tv\/recorded\/)([^#&?/]*)/;
var PLAYER_ID_PREFIX = 'UstreamVideo-player-';

var UstreamVideo = exports.UstreamVideo = function (_Component) {
  _inherits(UstreamVideo, _Component);

  function UstreamVideo() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, UstreamVideo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = UstreamVideo.__proto__ || Object.getPrototypeOf(UstreamVideo)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      ustreamSrc: null
    }, _this.playerID = PLAYER_ID_PREFIX + (0, _utils.randomString)(), _this.callPlayer = _utils.callPlayer, _this.mute = function () {}, _this.unmute = function () {}, _this.ref = function (container) {
      _this.container = container;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(UstreamVideo, [{
    key: 'parseId',
    value: function parseId(url) {
      var m = url.match(MATCH_URL);
      return m[2];
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      // reset ustreamSrc on reload
      if (prevProps.url && prevProps.url !== this.props.url) {
        this.setState({
          ustreamSrc: null
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // clear the interval below
      if (this.currentTimeInterval) {
        clearInterval(this.currentTimeInterval);
      }
    }

    // there's no events to update progress and duration,
    // so we're going to set an interval here. Also, duration
    // is zero or null for the first few seconds. Couldn't find
    // a deterministic event to let us know when we should grab the duration.

  }, {
    key: 'initInterval',
    value: function initInterval() {
      var _this2 = this;

      if (this.currentTimeInterval) {
        return;
      }
      this.currentTimeInterval = setInterval(function () {
        if (_this2.player) {
          _this2.player.getProperty('progress', function (progress) {
            _this2.player.currentTime = progress;
          });
          _this2.player.getProperty('duration', function (duration) {
            _this2.player.duration = duration;
          });
        }
      }, 500);
    }
  }, {
    key: 'load',
    value: function load() {
      var _this3 = this;

      var _props = this.props,
          onEnded = _props.onEnded,
          onError = _props.onError,
          onPause = _props.onPause,
          onPlay = _props.onPlay,
          onReady = _props.onReady,
          playing = _props.playing,
          url = _props.url;

      var videoId = this.parseId(url);
      this.setState({
        ustreamSrc: 'https://www.ustream.tv/embed/recorded/' + videoId + '?html5ui=1&autoplay=' + playing + '&controls=false&showtitle=false'
      });
      (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL).then(function (UstreamEmbed) {
        if (!_this3.container) return;
        _this3.player = UstreamEmbed(_this3.playerID);
        _this3.player.addListener('playing', function (type, playing) {
          playing ? onPlay() : onPause();
        });
        _this3.player.addListener('ready', function () {
          _this3.initInterval();
          onReady();
        });
        _this3.player.addListener('finished', onEnded);
      }, onError);
    }
    // todo

    // todo

  }, {
    key: 'play',
    value: function play() {
      this.callPlayer('callMethod', 'play');
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.callPlayer('callMethod', 'pause');
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.callPlayer('callMethod', 'stop');
    }
  }, {
    key: 'seekTo',
    value: function seekTo(seconds) {
      this.callPlayer('callMethod', 'seek', seconds);
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      this.callPlayer('callMethod', 'volume', fraction * 100);
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      return this.player.duration;
    }
  }, {
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      return this.player.currentTime;
    }
  }, {
    key: 'getSecondsLoaded',
    value: function getSecondsLoaded() {
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var style = {
        width: '100%',
        height: '100%'
      };

      var ustreamSrc = this.state.ustreamSrc;

      return ustreamSrc && _react2['default'].createElement('iframe', {
        id: this.playerID,
        ref: this.ref,
        src: ustreamSrc,
        frameBorder: '0',
        scrolling: 'no',
        style: style,
        allowFullScreen: true
      });
    }
  }]);

  return UstreamVideo;
}(_react.Component);

UstreamVideo.displayName = 'UstreamVideo';

UstreamVideo.canPlay = function (url) {
  return MATCH_URL.test(url);
};

UstreamVideo.loopOnEnded = false;
exports['default'] = (0, _singlePlayer2['default'])(UstreamVideo);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Iframe = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utils = __webpack_require__(1);

var _singlePlayer = __webpack_require__(2);

var _singlePlayer2 = _interopRequireDefault(_singlePlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PLAYER_ID_PREFIX = 'Iframe-player-';

var Iframe = exports.Iframe = function (_Component) {
  _inherits(Iframe, _Component);

  function Iframe() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Iframe);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Iframe.__proto__ || Object.getPrototypeOf(Iframe)).call.apply(_ref, [this].concat(args))), _this), _this.playerID = PLAYER_ID_PREFIX + (0, _utils.randomString)(), _this.player = {
      currentTime: 0
    }, _this.mute = function () {
      // no support
    }, _this.unmute = function () {
      // no support
    }, _this.ref = function (container) {
      _this.container = container;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Iframe, [{
    key: 'load',
    value: function load(url) {
      var _this2 = this;

      if (!this.container) {
        this.props.onReady();
      } else {
        setTimeout(function () {
          return _this2.props.onReady();
        }, 3000);
      }
    }
  }, {
    key: 'play',
    value: function play() {
      this.playTime = Date.now();
      this.props.onPlay();
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.player.currentTime = this.getCurrentTime();
      this.playTime = null;
      this.props.onPause();
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.player.currentTime = this.getCurrentTime();
      this.playTime = null;
      this.props.onPause();
    }
  }, {
    key: 'seekTo',
    value: function seekTo(seconds) {
      // no support
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      // no support
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      return Infinity;
    }
  }, {
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      var playing = 0;
      if (this.playTime) {
        playing = (Date.now() - this.playTime) / 1000;
      }
      return this.player.currentTime + playing;
    }
  }, {
    key: 'getSecondsLoaded',
    value: function getSecondsLoaded() {
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var style = {
        width: '100%',
        height: '100%'
      };
      var _props = this.props,
          url = _props.url,
          playing = _props.playing;

      if (playing) {
        return _react2['default'].createElement('iframe', {
          id: this.playerID,
          ref: this.ref,
          src: playing && url,
          frameBorder: '0',
          scrolling: 'no',
          style: style,
          allowFullScreen: true
        });
      } else {
        // pause flow for iframe
        return _react2['default'].createElement(
          'div',
          { style: style },
          _react2['default'].createElement(
            'div',
            { style: {
                alignItems: 'center',
                background: 'rgba(255,255,255,0.3)',
                display: 'flex',
                height: '100%',
                justifyContent: 'center',
                width: '100%'
              } },
            _react2['default'].createElement('div', { className: 'pause', style: {
                borderStyle: 'double',
                borderWidth: '0px 0px 0px 50px',
                color: 'gray',
                height: '60px'
              } })
          )
        );
      }
    }
  }]);

  return Iframe;
}(_react.Component);

Iframe.displayName = 'Iframe';

Iframe.canPlay = function (url) {
  return true;
};

exports['default'] = (0, _singlePlayer2['default'])(Iframe);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mixcloud = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utils = __webpack_require__(1);

var _singlePlayer = __webpack_require__(2);

var _singlePlayer2 = _interopRequireDefault(_singlePlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SDK_URL = '//widget.mixcloud.com/media/js/widgetApi.js';
var SDK_GLOBAL = 'Mixcloud';
var MATCH_URL = /mixcloud\.com\/([^/]+\/[^/]+)/;

var Mixcloud = exports.Mixcloud = function (_Component) {
  _inherits(Mixcloud, _Component);

  function Mixcloud() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Mixcloud);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Mixcloud.__proto__ || Object.getPrototypeOf(Mixcloud)).call.apply(_ref, [this].concat(args))), _this), _this.callPlayer = _utils.callPlayer, _this.duration = null, _this.currentTime = null, _this.secondsLoaded = null, _this.mute = function () {
      // No volume support
    }, _this.unmute = function () {
      // No volume support
    }, _this.ref = function (iframe) {
      _this.iframe = iframe;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Mixcloud, [{
    key: 'load',
    value: function load(url) {
      var _this2 = this;

      (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL).then(function (Mixcloud) {
        _this2.player = Mixcloud.PlayerWidget(_this2.iframe);
        _this2.player.ready.then(function () {
          _this2.player.events.play.on(_this2.props.onPlay);
          _this2.player.events.pause.on(_this2.props.onPause);
          _this2.player.events.ended.on(_this2.props.onEnded);
          _this2.player.events.error.on(_this2.props.error);
          _this2.player.events.progress.on(function (seconds, duration) {
            _this2.currentTime = seconds;
            _this2.duration = duration;
          });
          _this2.props.onReady();
        });
      }, this.props.onError);
    }
  }, {
    key: 'play',
    value: function play() {
      this.callPlayer('play');
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.callPlayer('pause');
    }
  }, {
    key: 'stop',
    value: function stop() {
      // Nothing to do
    }
  }, {
    key: 'seekTo',
    value: function seekTo(seconds) {
      this.callPlayer('seek', seconds);
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      // No volume support
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      return this.duration;
    }
  }, {
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      return this.currentTime;
    }
  }, {
    key: 'getSecondsLoaded',
    value: function getSecondsLoaded() {
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          url = _props.url,
          config = _props.config;

      var id = url.match(MATCH_URL)[1];
      var style = {
        width: '100%',
        height: '100%'
      };
      var query = (0, _utils.queryString)(_extends({}, config.mixcloud.options, {
        feed: '/' + id + '/'
      }));
      // We have to give the iframe a key here to prevent a
      // weird dialog appearing when loading a new track
      return _react2['default'].createElement('iframe', {
        key: id,
        ref: this.ref,
        style: style,
        src: 'https://www.mixcloud.com/widget/iframe/?' + query,
        frameBorder: '0'
      });
    }
  }]);

  return Mixcloud;
}(_react.Component);

Mixcloud.displayName = 'Mixcloud';

Mixcloud.canPlay = function (url) {
  return MATCH_URL.test(url);
};

Mixcloud.loopOnEnded = true;
exports['default'] = (0, _singlePlayer2['default'])(Mixcloud);

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VAST = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _vpaidHtml5Client = __webpack_require__(45);

var _vpaidHtml5Client2 = _interopRequireDefault(_vpaidHtml5Client);

var _vastClient = __webpack_require__(49);

var _utils = __webpack_require__(1);

var _singlePlayer = __webpack_require__(2);

var _singlePlayer2 = _interopRequireDefault(_singlePlayer);

var _FilePlayer = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PLAYER_ID_PREFIX = 'vast-player-';
var CONTENT_ID_PREFIX = 'vast-content-';
var SKIP_ID_PREFIX = 'vast-skip-';
var MATCH_URL = /^VAST:https:\/\//i;

var VAST = exports.VAST = function (_Component) {
  _inherits(VAST, _Component);

  function VAST() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, VAST);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = VAST.__proto__ || Object.getPrototypeOf(VAST)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      canSkip: false,
      framework: null,
      preMuteVolume: 0.0,
      sources: [],
      tracker: null,
      type: null,
      vastClient: new _vastClient.VASTClient(),
      vpaidAdUnit: null,
      vpaidClient: null
    }, _this.playerID = PLAYER_ID_PREFIX + (0, _utils.randomString)(), _this.contentID = CONTENT_ID_PREFIX + (0, _utils.randomString)(), _this.skipID = SKIP_ID_PREFIX + (0, _utils.randomString)(), _this.callPlayer = _utils.callPlayer, _this.mute = function () {
      var _this$state = _this.state,
          framework = _this$state.framework,
          vpaidAdUnit = _this$state.vpaidAdUnit;

      if (framework === 'VPAID') {
        _this.setState({
          preMuteVolume: _this.container.volume
        });
        vpaidAdUnit.setAdVolume(0.0);
      } else {
        _this.container.mute();
      }
    }, _this.unmute = function () {
      var _this$state2 = _this.state,
          framework = _this$state2.framework,
          preMuteVolume = _this$state2.preMuteVolume,
          vpaidAdUnit = _this$state2.vpaidAdUnit;

      if (framework === 'VPAID') {
        vpaidAdUnit.setAdVolume(preMuteVolume);
      } else {
        _this.container.unmute();
      }
    }, _this.ref = function (container) {
      _this.container = container;
    }, _this.onAdClick = function () {
      var _this$state3 = _this.state,
          framework = _this$state3.framework,
          tracker = _this$state3.tracker;

      if (framework === 'VAST' && tracker) {
        tracker.click();
      }
    }, _this.onEnded = function (event) {
      var onEnded = _this.props.onEnded;
      var _this$state4 = _this.state,
          framework = _this$state4.framework,
          tracker = _this$state4.tracker;

      if (framework === 'VAST' && tracker) {
        tracker.complete();
      }
      onEnded(event);
    }, _this.onError = function (event) {
      var onError = _this.props.onError;
      var _this$state5 = _this.state,
          framework = _this$state5.framework,
          tracker = _this$state5.tracker;

      if (framework === 'VAST' && tracker) {
        tracker.errorWithCode(405);
      }
      onError(event);
    }, _this.onPause = function (event) {
      var onPause = _this.props.onPause;
      var _this$state6 = _this.state,
          framework = _this$state6.framework,
          tracker = _this$state6.tracker;

      if (framework === 'VAST' && tracker) {
        tracker.setPaused(true);
      }
      onPause(event);
    }, _this.onPlay = function (event) {
      var onPlay = _this.props.onPlay;
      var _this$state7 = _this.state,
          framework = _this$state7.framework,
          tracker = _this$state7.tracker;

      if (framework === 'VAST' && tracker) {
        tracker.setPaused(false);
      }
      onPlay(event);
    }, _this.onProgress = function (event) {
      var onProgress = _this.props.onProgress;
      var _this$state8 = _this.state,
          framework = _this$state8.framework,
          tracker = _this$state8.tracker;

      if (framework === 'VAST' && tracker) {
        tracker.setProgress(event.playedSeconds);
      }
      onProgress(event);
    }, _this.onReady = function (event) {
      var onReady = _this.props.onReady;
      var _this$state9 = _this.state,
          framework = _this$state9.framework,
          tracker = _this$state9.tracker;

      if (framework === 'VAST' && tracker) {
        if (Number.isNaN(tracker.assetDuration)) {
          tracker.assetDuration = _this.container.getDuration();
        }
      }

      onReady(event);
    }, _this.onVolumeChange = function (event) {
      var onVolumeChange = _this.props.onVolumeChange;
      var _this$state10 = _this.state,
          framework = _this$state10.framework,
          tracker = _this$state10.tracker;

      if (framework === 'VAST' && tracker) {
        tracker.setMuted(_this.container.muted);
      }
      onVolumeChange(event);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(VAST, [{
    key: 'createSourceFiles',
    value: function createSourceFiles() {
      var mediaFiles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      return mediaFiles.map(function () {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            apiFramework = _ref2.apiFramework,
            src = _ref2.fileURL,
            type = _ref2.mimeType;

        return { apiFramework: apiFramework, src: src, type: type };
      }).filter(function (_ref3) {
        var apiFramework = _ref3.apiFramework,
            src = _ref3.src;
        return apiFramework === 'VPAID' || _FilePlayer.FilePlayer.canPlay(src);
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.state.framework === 'VPAID') {
        this.removeVPAIDListeners();
      }
    }
  }, {
    key: 'parseResponse',
    value: function parseResponse(response) {
      var onEnded = this.props.onEnded;
      var _response$ads = response.ads,
          ads = _response$ads === undefined ? [] : _response$ads;

      // find video creatives
      // todo: handle companion ads

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = ads[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var ad = _step.value;
          var _ad$creatives = ad.creatives,
              creatives = _ad$creatives === undefined ? [] : _ad$creatives;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = creatives[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var creative = _step2.value;
              var _creative$mediaFiles = creative.mediaFiles,
                  mediaFiles = _creative$mediaFiles === undefined ? [] : _creative$mediaFiles,
                  type = creative.type;

              if (type === 'linear') {
                var sources = this.createSourceFiles(mediaFiles);
                if (sources.length) {
                  return this.setState({
                    framework: sources[0].apiFramework || 'VAST',
                    sources: sources,
                    // eslint-disable-next-line new-cap
                    tracker: new _vastClient.VASTTracker(this.state.vastClient, ad, creative)
                  });
                }
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                _iterator2['return']();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          return onEnded();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'addVPAIDListeners',
    value: function addVPAIDListeners() {
      var framework = this.state.framework;

      if (framework !== 'VPAID') {
        return null;
      }
      var _props = this.props,
          onReady = _props.onReady,
          onPlay = _props.onPlay,
          onBuffer = _props.onBuffer,
          onBufferEnd = _props.onBufferEnd,
          onPause = _props.onPause,
          onEnded = _props.onEnded,
          onError = _props.onError,
          onVolumeChange = _props.onVolumeChange;


      this.container.addEventListener('canplay', onReady);
      this.container.addEventListener('play', onPlay);
      this.container.addEventListener('waiting', onBuffer);
      this.container.addEventListener('playing', onBufferEnd);
      this.container.addEventListener('pause', onPause);
      this.container.addEventListener('ended', onEnded);
      this.container.addEventListener('error', onError);
      this.container.addEventListener('volumeChange', onVolumeChange);

      // list of events available in IVPAIDAdUnit.js in vpaid-html5-client
      this.state.vpaidAdUnit.subscribe('AdLoaded', this.onVPAIDAdLoaded.bind(this));
      this.state.vpaidAdUnit.subscribe('AdSkippableStateChange', this.props.onAdSkippable.bind(this));
    }
  }, {
    key: 'skip',
    value: function skip() {
      var _state = this.state,
          framework = _state.framework,
          tracker = _state.tracker,
          vpaidAdUnit = _state.vpaidAdUnit;

      if (framework === 'VAST' && tracker) {
        tracker.skip();
      } else {
        vpaidAdUnit.skipAd();
      }
    }
  }, {
    key: 'onVPAIDAdLoaded',
    value: function onVPAIDAdLoaded() {
      var _props2 = this.props,
          onReady = _props2.onReady,
          playing = _props2.playing;
      var vpaidAdUnit = this.state.vpaidAdUnit;

      onReady();
      if (playing) {
        vpaidAdUnit.startAd();
        this.setVolume(0.0);
      }
    }
  }, {
    key: 'removeVPAIDListeners',
    value: function removeVPAIDListeners() {
      var _props3 = this.props,
          onReady = _props3.onReady,
          onPlay = _props3.onPlay,
          onBuffer = _props3.onBuffer,
          onBufferEnd = _props3.onBufferEnd,
          onPause = _props3.onPause,
          onEnded = _props3.onEnded,
          onError = _props3.onError,
          onVolumeChange = _props3.onVolumeChange;

      this.container.removeEventListener('canplay', onReady);
      this.container.removeEventListener('play', onPlay);
      this.container.removeEventListener('waiting', onBuffer);
      this.container.removeEventListener('playing', onBufferEnd);
      this.container.removeEventListener('pause', onPause);
      this.container.removeEventListener('ended', onEnded);
      this.container.removeEventListener('error', onError);
      this.container.removeEventListener('volumeChange', onVolumeChange);
      this.state.vpaidAdUnit.unsubscribe('AdLoaded');
      this.state.vpaidAdUnit.unsubscribe('AdSkippableStateChange');
    }
  }, {
    key: 'loadVPAID',
    value: function loadVPAID(url) {
      var _this2 = this;

      this.state.vpaidClient = new _vpaidHtml5Client2['default'](document.getElementById(this.contentID), document.getElementById(this.playerID));
      var onError = this.props.onError;
      var vpaidClient = this.state.vpaidClient;

      vpaidClient.loadAdUnit(url, function (error, adUnit) {
        if (error) {
          return onError(error);
        }
        _this2.state.vpaidAdUnit = adUnit;
        _this2.addVPAIDListeners();
        adUnit.initAd('100%', '100%', 'normal', -1, {}, {});
      });
    }
  }, {
    key: 'load',
    value: function load(rawUrl) {
      var _this3 = this;

      // replace [RANDOM] or [random] with a randomly generated cache value
      var ord = Math.random() * 10000000000000000;
      var url = rawUrl.replace(/\[random]/ig, ord);
      this.state.vastClient.get(url.slice('VAST:'.length), { withCredentials: true }).then(function (response) {
        _this3.parseResponse(response);
        var _state2 = _this3.state,
            framework = _state2.framework,
            sources = _state2.sources,
            tracker = _state2.tracker;

        if (framework === 'VPAID') {
          _this3.loadVPAID(sources[0].src);
        } else {
          if (tracker) {
            tracker.on('clickthrough', _this3.openAdLink);
          }
        }
      })['catch'](function (error) {
        return _this3.props.onError(error);
      });
    }
  }, {
    key: 'play',
    value: function play() {
      var _state3 = this.state,
          framework = _state3.framework,
          vpaidAdUnit = _state3.vpaidAdUnit;

      if (framework === 'VPAID') {
        vpaidAdUnit.resumeAd();
      } else {
        this.container.play();
      }
    }
  }, {
    key: 'pause',
    value: function pause() {
      var _state4 = this.state,
          framework = _state4.framework,
          vpaidAdUnit = _state4.vpaidAdUnit;

      if (framework === 'VPAID') {
        vpaidAdUnit.pauseAd();
      } else {
        this.container.pause();
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      var _state5 = this.state,
          framework = _state5.framework,
          vpaidAdUnit = _state5.vpaidAdUnit;

      if (framework === 'VPAID') {
        vpaidAdUnit.stopAd();
      } else {
        this.container.stop();
      }
    }

    // only allow rewind for VAST

  }, {
    key: 'seekTo',
    value: function seekTo(seconds) {
      var framework = this.state.framework;

      if (framework === 'VAST') {
        if (seconds < this.getCurrentTime()) {
          this.container.seekTo(seconds);
        }
      }
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      var _state6 = this.state,
          framework = _state6.framework,
          vpaidAdUnit = _state6.vpaidAdUnit;

      if (framework === 'VPAID') {
        vpaidAdUnit.setAdVolume(fraction);
      } else {
        this.container.setVolume(fraction);
      }
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      var framework = this.state.framework;

      if (framework === 'VPAID') {
        if (!this.container) return null;
        var duration = this.container.duration;

        return duration;
      } else {
        return this.container.getDuration();
      }
    }
  }, {
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      var framework = this.state.framework;

      if (framework === 'VPAID') {
        return this.container ? this.container.currentTime : null;
      } else {
        return this.container.getCurrentTime();
      }
    }
  }, {
    key: 'getSecondsLoaded',
    value: function getSecondsLoaded() {
      var framework = this.state.framework;

      if (framework === 'VPAID') {
        if (!this.container) return null;
        var buffered = this.container.buffered;

        if (buffered.length === 0) {
          return 0;
        }
        var end = buffered.end(buffered.length - 1);
        var duration = this.getDuration();
        if (end > duration) {
          return duration;
        }
        return end;
      } else {
        return this.container.getCurrentTime();
      }
    }
  }, {
    key: 'openAdLink',
    value: function openAdLink(url) {
      window.open(url, '_blank');
    }

    // track ended


    // track error


    // track pause


    // track play


    // track load and duration


    // track volume change

  }, {
    key: 'renderVAST',
    value: function renderVAST() {
      var _state7 = this.state,
          sources = _state7.sources,
          clickTrackingURLTemplate = _state7.tracker;
      var _props4 = this.props,
          width = _props4.width,
          height = _props4.height;

      var wrapperStyle = {
        cursor: clickTrackingURLTemplate ? 'pointer' : 'default',
        height: '100%'
      };
      var videoStyle = {
        width: width === 'auto' ? width : '100%',
        height: height === 'auto' ? height : '100%'
      };
      return sources.length ? _react2['default'].createElement(
        'div',
        { onClick: this.onAdClick, style: wrapperStyle },
        _react2['default'].createElement(_FilePlayer.FilePlayer, _extends({}, this.props, {
          onEnded: this.onEnded,
          onError: this.onError,
          onPause: this.onPause,
          onPlay: this.onPlay,
          onProgress: this.onProgress,
          onReady: this.onReady,
          onVolumeChange: this.onVolumeChange,
          ref: this.ref,
          style: videoStyle,
          url: this.state.sources[0].src
        }))
      ) : null;
    }
  }, {
    key: 'renderVPAID',
    value: function renderVPAID() {
      var _this4 = this;

      var _props5 = this.props,
          width = _props5.width,
          height = _props5.height;
      var canSkip = this.state.canSkip;

      var dimensions = {
        width: width === 'auto' ? width : '100%',
        height: height === 'auto' ? height : '100%'
      };
      var contentStyle = _extends({}, dimensions, {
        top: 0,
        left: 0,
        position: 'absolute',
        zIndex: 1
      });
      var skipStyle = {
        cursor: 'pointer',
        display: 'block',
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        zIndex: 2
      };
      return _react2['default'].createElement(
        'div',
        { style: _extends({}, dimensions, { position: 'relative' }) },
        canSkip && _react2['default'].createElement(
          'button',
          {
            id: this.skipID,
            style: skipStyle,
            onClick: function onClick() {
              return _this4.skip();
            } },
          'Skip'
        ),
        _react2['default'].createElement('div', { id: this.contentID, style: contentStyle }),
        _react2['default'].createElement('video', {
          ref: this.ref,
          controls: false,
          style: dimensions,
          id: this.playerID
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var framework = this.state.framework;

      if (!framework) {
        return null;
      }
      if (framework === 'VPAID') {
        return this.renderVPAID();
      } else {
        return this.renderVAST();
      }
    }
  }]);

  return VAST;
}(_react.Component);

VAST.displayName = 'VAST';

VAST.canPlay = function (url) {
  return MATCH_URL.test(url);
};

exports['default'] = (0, _singlePlayer2['default'])(VAST);

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * noop a empty function
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function noop() {}

/**
 * validate if is not validate will return an Error with the message
 *
 * @param {boolean} isValid
 * @param {string} message
 */
function validate(isValid, message) {
    return isValid ? null : new Error(message);
}

var timeouts = {};
/**
 * clearCallbackTimeout
 *
 * @param {function} func handler to remove
 */
function clearCallbackTimeout(func) {
    var timeout = timeouts[func];
    if (timeout) {
        clearTimeout(timeout);
        delete timeouts[func];
    }
}

/**
 * callbackTimeout if the onSuccess is not called and returns true in the timelimit then onTimeout will be called
 *
 * @param {number} timer
 * @param {function} onSuccess
 * @param {function} onTimeout
 */
function callbackTimeout(timer, onSuccess, onTimeout) {
    var _callback, timeout;

    timeout = setTimeout(function () {
        onSuccess = noop;
        delete timeout[_callback];
        onTimeout();
    }, timer);

    _callback = function callback() {
        // TODO avoid leaking arguments
        // https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
        if (onSuccess.apply(this, arguments)) {
            clearCallbackTimeout(_callback);
        }
    };

    timeouts[_callback] = timeout;

    return _callback;
}

/**
 * createElementInEl
 *
 * @param {HTMLElement} parent
 * @param {string} tagName
 * @param {string} id
 */
function createElementInEl(parent, tagName, id) {
    var nEl = document.createElement(tagName);
    if (id) nEl.id = id;
    parent.appendChild(nEl);
    return nEl;
}

/**
 * createIframeWithContent
 *
 * @param {HTMLElement} parent
 * @param {string} template simple template using {{var}}
 * @param {object} data
 */
function createIframeWithContent(parent, template, data) {
    var iframe = createIframe(parent, null, data.zIndex);
    if (!setIframeContent(iframe, simpleTemplate(template, data))) return;
    return iframe;
}

/**
 * createIframe
 *
 * @param {HTMLElement} parent
 * @param {string} url
 */
function createIframe(parent, url, zIndex) {
    var nEl = document.createElement('iframe');
    nEl.src = url || 'about:blank';
    nEl.marginWidth = '0';
    nEl.marginHeight = '0';
    nEl.frameBorder = '0';
    nEl.width = '100%';
    nEl.height = '100%';
    setFullSizeStyle(nEl);

    if (zIndex) {
        nEl.style.zIndex = zIndex;
    }

    nEl.setAttribute('SCROLLING', 'NO');
    parent.innerHTML = '';
    parent.appendChild(nEl);
    return nEl;
}

function setFullSizeStyle(element) {
    element.style.position = 'absolute';
    element.style.left = '0';
    element.style.top = '0';
    element.style.margin = '0px';
    element.style.padding = '0px';
    element.style.border = 'none';
    element.style.width = '100%';
    element.style.height = '100%';
}

/**
 * simpleTemplate
 *
 * @param {string} template
 * @param {object} data
 */
function simpleTemplate(template, data) {
    Object.keys(data).forEach(function (key) {
        var value = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? JSON.stringify(data[key]) : data[key];
        template = template.replace(new RegExp('{{' + key + '}}', 'g'), value);
    });
    return template;
}

/**
 * setIframeContent
 *
 * @param {HTMLIframeElement} iframeEl
 * @param content
 */
function setIframeContent(iframeEl, content) {
    var iframeDoc = iframeEl.contentWindow && iframeEl.contentWindow.document;
    if (!iframeDoc) return false;

    iframeDoc.write(content);

    return true;
}

/**
 * extend object with keys from another object
 *
 * @param {object} toExtend
 * @param {object} fromSource
 */
function extend(toExtend, fromSource) {
    Object.keys(fromSource).forEach(function (key) {
        toExtend[key] = fromSource[key];
    });
    return toExtend;
}

/**
 * unique will create a unique string everytime is called, sequentially and prefixed
 *
 * @param {string} prefix
 */
function unique(prefix) {
    var count = -1;
    return function () {
        return prefix + '_' + ++count;
    };
}

module.exports = {
    noop: noop,
    validate: validate,
    clearCallbackTimeout: clearCallbackTimeout,
    callbackTimeout: callbackTimeout,
    createElementInEl: createElementInEl,
    createIframeWithContent: createIframeWithContent,
    createIframe: createIframe,
    setFullSizeStyle: setFullSizeStyle,
    simpleTemplate: simpleTemplate,
    setIframeContent: setIframeContent,
    extend: extend,
    unique: unique
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VASTParser = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ad_parser = __webpack_require__(50);

var _events = __webpack_require__(29);

var _parser_utils = __webpack_require__(3);

var _url_handler = __webpack_require__(61);

var _util = __webpack_require__(12);

var _vast_response = __webpack_require__(65);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_MAX_WRAPPER_DEPTH = 10;
var DEFAULT_EVENT_DATA = {
  ERRORCODE: 900,
  extensions: []
};

/**
 * This class provides methods to fetch and parse a VAST document.
 * @export
 * @class VASTParser
 * @extends EventEmitter
 */

var VASTParser = exports.VASTParser = function (_EventEmitter) {
  _inherits(VASTParser, _EventEmitter);

  /**
   * Creates an instance of VASTParser.
   * @constructor
   */
  function VASTParser() {
    _classCallCheck(this, VASTParser);

    var _this = _possibleConstructorReturn(this, (VASTParser.__proto__ || Object.getPrototypeOf(VASTParser)).call(this));

    _this.remainingAds = [];
    _this.parentURLs = [];
    _this.errorURLTemplates = [];
    _this.rootErrorURLTemplates = [];
    _this.maxWrapperDepth = null;
    _this.URLTemplateFilters = [];
    _this.fetchingOptions = {};
    return _this;
  }

  /**
   * Adds a filter function to the array of filters which are called before fetching a VAST document.
   * @param  {function} filter - The filter function to be added at the end of the array.
   * @return {void}
   */


  _createClass(VASTParser, [{
    key: 'addURLTemplateFilter',
    value: function addURLTemplateFilter(filter) {
      if (typeof filter === 'function') {
        this.URLTemplateFilters.push(filter);
      }
    }

    /**
     * Removes the last element of the url templates filters array.
     * @return {void}
     */

  }, {
    key: 'removeURLTemplateFilter',
    value: function removeURLTemplateFilter() {
      this.URLTemplateFilters.pop();
    }

    /**
     * Returns the number of filters of the url templates filters array.
     * @return {Number}
     */

  }, {
    key: 'countURLTemplateFilters',
    value: function countURLTemplateFilters() {
      return this.URLTemplateFilters.length;
    }

    /**
     * Removes all the filter functions from the url templates filters array.
     * @return {void}
     */

  }, {
    key: 'clearURLTemplateFilters',
    value: function clearURLTemplateFilters() {
      this.URLTemplateFilters = [];
    }

    /**
     * Tracks the error provided in the errorCode parameter and emits a VAST-error event for the given error.
     * @param  {Array} urlTemplates - An Array of url templates to use to make the tracking call.
     * @param  {Object} errorCode - An Object containing the error data.
     * @param  {Object} data - One (or more) Object containing additional data.
     * @emits  VASTParser#VAST-error
     * @return {void}
     */

  }, {
    key: 'trackVastError',
    value: function trackVastError(urlTemplates, errorCode) {
      for (var _len = arguments.length, data = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        data[_key - 2] = arguments[_key];
      }

      this.emit('VAST-error', Object.assign.apply(Object, [DEFAULT_EVENT_DATA, errorCode].concat(data)));
      _util.util.track(urlTemplates, errorCode);
    }

    /**
     * Returns an array of errorURLTemplates for the VAST being parsed.
     * @return {Array}
     */

  }, {
    key: 'getErrorURLTemplates',
    value: function getErrorURLTemplates() {
      return this.rootErrorURLTemplates.concat(this.errorURLTemplates);
    }

    /**
     * Fetches a VAST document for the given url.
     * Returns a Promise which resolves,rejects according to the result of the request.
     * @param  {String} url - The url to request the VAST document.
     * @param {Number} wrapperDepth - how many times the current url has been wrapped
     * @param {String} originalUrl - url of original wrapper
     * @emits  VASTParser#VAST-resolving
     * @emits  VASTParser#VAST-resolved
     * @return {Promise}
     */

  }, {
    key: 'fetchVAST',
    value: function fetchVAST(url, wrapperDepth, originalUrl) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        // Process url with defined filter
        _this2.URLTemplateFilters.forEach(function (filter) {
          url = filter(url);
        });

        _this2.parentURLs.push(url);
        _this2.emit('VAST-resolving', { url: url, wrapperDepth: wrapperDepth, originalUrl: originalUrl });

        _this2.urlHandler.get(url, _this2.fetchingOptions, function (err, xml) {
          _this2.emit('VAST-resolved', { url: url, error: err });

          if (err) {
            reject(err);
          } else {
            resolve(xml);
          }
        });
      });
    }

    /**
     * Inits the parsing properties of the class with the custom values provided as options.
     * @param {Object} options - The options to initialize a parsing sequence
     */

  }, {
    key: 'initParsingStatus',
    value: function initParsingStatus() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.rootURL = '';
      this.remainingAds = [];
      this.parentURLs = [];
      this.errorURLTemplates = [];
      this.rootErrorURLTemplates = [];
      this.maxWrapperDepth = options.wrapperLimit || DEFAULT_MAX_WRAPPER_DEPTH;
      this.fetchingOptions = {
        timeout: options.timeout,
        withCredentials: options.withCredentials
      };

      this.urlHandler = options.urlHandler || options.urlhandler || _url_handler.urlHandler;
    }

    /**
     * Resolves the next group of ads. If all is true resolves all the remaining ads.
     * @param  {Boolean} all - If true all the remaining ads are resolved
     * @return {Promise}
     */

  }, {
    key: 'getRemainingAds',
    value: function getRemainingAds(all) {
      var _this3 = this;

      if (this.remainingAds.length === 0) {
        return Promise.reject(new Error('No more ads are available for the given VAST'));
      }

      var ads = all ? _util.util.flatten(this.remainingAds) : this.remainingAds.shift();
      this.errorURLTemplates = [];
      this.parentURLs = [];

      return this.resolveAds(ads, {
        wrapperDepth: 0,
        originalUrl: this.rootURL
      }).then(function (resolvedAds) {
        return _this3.buildVASTResponse(resolvedAds);
      });
    }

    /**
     * Fetches and parses a VAST for the given url.
     * Returns a Promise which resolves with a fully parsed VASTResponse or rejects with an Error.
     * @param  {String} url - The url to request the VAST document.
     * @param  {Object} options - An optional Object of parameters to be used in the parsing process.
     * @emits  VASTParser#VAST-resolving
     * @emits  VASTParser#VAST-resolved
     * @return {Promise}
     */

  }, {
    key: 'getAndParseVAST',
    value: function getAndParseVAST(url) {
      var _this4 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      this.initParsingStatus(options);
      this.rootURL = url;

      return this.fetchVAST(url).then(function (xml) {
        options.originalUrl = url;
        options.isRootVAST = true;

        return _this4.parse(xml, options).then(function (ads) {
          return _this4.buildVASTResponse(ads);
        });
      });
    }

    /**
     * Parses the given xml Object into a VASTResponse.
     * Returns a Promise which resolves with a fully parsed VASTResponse or rejects with an Error.
     * @param  {Object} vastXml - An object representing a vast xml document.
     * @param  {Object} options - An optional Object of parameters to be used in the parsing process.
     * @emits  VASTParser#VAST-resolving
     * @emits  VASTParser#VAST-resolved
     * @return {Promise}
     */

  }, {
    key: 'parseVAST',
    value: function parseVAST(vastXml) {
      var _this5 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      this.initParsingStatus(options);

      options.isRootVAST = true;

      return this.parse(vastXml, options).then(function (ads) {
        return _this5.buildVASTResponse(ads);
      });
    }

    /**
     * Builds a VASTResponse which can be returned.
     * @param  {Array} ads - An Array of unwrapped ads
     * @return {VASTResponse}
     */

  }, {
    key: 'buildVASTResponse',
    value: function buildVASTResponse(ads) {
      var response = new _vast_response.VASTResponse();
      response.ads = ads;
      response.errorURLTemplates = this.getErrorURLTemplates();
      this.completeWrapperResolving(response);

      return response;
    }

    /**
     * Parses the given xml Object into an array of ads
     * Returns the array or throws an `Error` if an invalid VAST XML is provided
     * @param  {Object} vastXml - An object representing an xml document.
     * @param  {Object} options - An optional Object of parameters to be used in the parsing process.
     * @return {Array}
     * @throws {Error} `vastXml` must be a valid VAST XMLDocument
     */

  }, {
    key: 'parseVastXml',
    value: function parseVastXml(vastXml, _ref) {
      var _ref$isRootVAST = _ref.isRootVAST,
          isRootVAST = _ref$isRootVAST === undefined ? false : _ref$isRootVAST;

      // check if is a valid VAST document
      if (!vastXml || !vastXml.documentElement || vastXml.documentElement.nodeName !== 'VAST') {
        throw new Error('Invalid VAST XMLDocument');
      }

      var ads = [];
      var childNodes = vastXml.documentElement.childNodes;

      // Fill the VASTResponse object with ads and errorURLTemplates
      for (var nodeKey in childNodes) {
        var node = childNodes[nodeKey];

        if (node.nodeName === 'Error') {
          var errorURLTemplate = _parser_utils.parserUtils.parseNodeText(node);

          // Distinguish root VAST url templates from ad specific ones
          isRootVAST ? this.rootErrorURLTemplates.push(errorURLTemplate) : this.errorURLTemplates.push(errorURLTemplate);
        }

        if (node.nodeName === 'Ad') {
          var ad = (0, _ad_parser.parseAd)(node);

          if (ad) {
            ads.push(ad);
          } else {
            // VAST version of response not supported.
            this.trackVastError(this.getErrorURLTemplates(), {
              ERRORCODE: 101
            });
          }
        }
      }

      return ads;
    }

    /**
     * Parses the given xml Object into an array of unwrapped ads.
     * Returns a Promise which resolves with the array or rejects with an error according to the result of the parsing.
     * @param  {Object} vastXml - An object representing an xml document.
     * @param  {Object} options - An optional Object of parameters to be used in the parsing process.
     * @emits  VASTParser#VAST-resolving
     * @emits  VASTParser#VAST-resolved
     * @return {Promise}
     */

  }, {
    key: 'parse',
    value: function parse(vastXml, _ref2) {
      var _ref2$resolveAll = _ref2.resolveAll,
          resolveAll = _ref2$resolveAll === undefined ? true : _ref2$resolveAll,
          _ref2$wrapperSequence = _ref2.wrapperSequence,
          wrapperSequence = _ref2$wrapperSequence === undefined ? null : _ref2$wrapperSequence,
          _ref2$originalUrl = _ref2.originalUrl,
          originalUrl = _ref2$originalUrl === undefined ? null : _ref2$originalUrl,
          _ref2$wrapperDepth = _ref2.wrapperDepth,
          wrapperDepth = _ref2$wrapperDepth === undefined ? 0 : _ref2$wrapperDepth,
          _ref2$isRootVAST = _ref2.isRootVAST,
          isRootVAST = _ref2$isRootVAST === undefined ? false : _ref2$isRootVAST;

      var ads = [];
      try {
        ads = this.parseVastXml(vastXml, { isRootVAST: isRootVAST });
      } catch (e) {
        return Promise.reject(e);
      }

      var adsCount = ads.length;
      var lastAddedAd = ads[adsCount - 1];
      // if in child nodes we have only one ads
      // and wrapperSequence is defined
      // and this ads doesn't already have sequence
      if (adsCount === 1 && wrapperSequence !== undefined && wrapperSequence !== null && lastAddedAd && !lastAddedAd.sequence) {
        lastAddedAd.sequence = wrapperSequence;
      }

      // Split the VAST in case we don't want to resolve everything at the first time
      if (resolveAll === false) {
        this.remainingAds = _parser_utils.parserUtils.splitVAST(ads);
        // Remove the first element from the remaining ads array, since we're going to resolve that element
        ads = this.remainingAds.shift();
      }

      return this.resolveAds(ads, { wrapperDepth: wrapperDepth, originalUrl: originalUrl });
    }

    /**
     * Resolves an Array of ads, recursively calling itself with the remaining ads if a no ad
     * response is returned for the given array.
     * @param {Array} ads - An array of ads to resolve
     * @param {Object} options - An options Object containing resolving parameters
     * @return {Promise}
     */

  }, {
    key: 'resolveAds',
    value: function resolveAds() {
      var _this6 = this;

      var ads = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var _ref3 = arguments[1];
      var wrapperDepth = _ref3.wrapperDepth,
          originalUrl = _ref3.originalUrl;

      var resolveWrappersPromises = [];

      ads.forEach(function (ad) {
        var resolveWrappersPromise = _this6.resolveWrappers(ad, wrapperDepth, originalUrl);

        resolveWrappersPromises.push(resolveWrappersPromise);
      });

      return Promise.all(resolveWrappersPromises).then(function (unwrappedAds) {
        var resolvedAds = _util.util.flatten(unwrappedAds);

        if (!resolvedAds && _this6.remainingAds.length > 0) {
          var remainingAdsToResolve = _this6.remainingAds.shift();

          return _this6.resolveAds(remainingAdsToResolve, {
            wrapperDepth: wrapperDepth,
            originalUrl: originalUrl
          });
        }

        return resolvedAds;
      });
    }

    /**
     * Resolves the wrappers for the given ad in a recursive way.
     * Returns a Promise which resolves with the unwrapped ad or rejects with an error.
     * @param  {Ad} ad - An ad to be unwrapped.
     * @param  {Number} wrapperDepth - The reached depth in the wrapper resolving chain.
     * @param  {String} originalUrl - The original vast url.
     * @return {Promise}
     */

  }, {
    key: 'resolveWrappers',
    value: function resolveWrappers(ad, wrapperDepth, originalUrl) {
      var _this7 = this;

      return new Promise(function (resolve) {
        // Going one level deeper in the wrapper chain
        wrapperDepth++;
        // We already have a resolved VAST ad, no need to resolve wrapper
        if (!ad.nextWrapperURL) {
          delete ad.nextWrapperURL;
          return resolve(ad);
        }

        if (wrapperDepth >= _this7.maxWrapperDepth || _this7.parentURLs.indexOf(ad.nextWrapperURL) !== -1) {
          // Wrapper limit reached, as defined by the video player.
          // Too many Wrapper responses have been received with no InLine response.
          ad.errorCode = 302;
          delete ad.nextWrapperURL;
          return resolve(ad);
        }

        // Get full URL
        ad.nextWrapperURL = _parser_utils.parserUtils.resolveVastAdTagURI(ad.nextWrapperURL, originalUrl);

        // sequence doesn't carry over in wrapper element
        var wrapperSequence = ad.sequence;
        originalUrl = ad.nextWrapperURL;

        _this7.fetchVAST(ad.nextWrapperURL, wrapperDepth, originalUrl).then(function (xml) {
          return _this7.parse(xml, {
            originalUrl: originalUrl,
            wrapperSequence: wrapperSequence,
            wrapperDepth: wrapperDepth
          }).then(function (unwrappedAds) {
            delete ad.nextWrapperURL;
            if (unwrappedAds.length === 0) {
              // No ads returned by the wrappedResponse, discard current <Ad><Wrapper> creatives
              ad.creatives = [];
              return resolve(ad);
            }

            unwrappedAds.forEach(function (unwrappedAd) {
              if (unwrappedAd) {
                _parser_utils.parserUtils.mergeWrapperAdData(unwrappedAd, ad);
              }
            });

            resolve(unwrappedAds);
          });
        }).catch(function (err) {
          // Timeout of VAST URI provided in Wrapper element, or of VAST URI provided in a subsequent Wrapper element.
          // (URI was either unavailable or reached a timeout as defined by the video player.)
          ad.errorCode = 301;
          ad.errorMessage = err.message;

          resolve(ad);
        });
      });
    }

    /**
     * Takes care of handling errors when the wrappers are resolved.
     * @param {VASTResponse} vastResponse - A resolved VASTResponse.
     */

  }, {
    key: 'completeWrapperResolving',
    value: function completeWrapperResolving(vastResponse) {
      // We've to wait for all <Ad> elements to be parsed before handling error so we can:
      // - Send computed extensions data
      // - Ping all <Error> URIs defined across VAST files

      // No Ad case - The parser never bump into an <Ad> element
      if (vastResponse.ads.length === 0) {
        this.trackVastError(vastResponse.errorURLTemplates, { ERRORCODE: 303 });
      } else {
        for (var index = vastResponse.ads.length - 1; index >= 0; index--) {
          // - Error encountred while parsing
          // - No Creative case - The parser has dealt with soma <Ad><Wrapper> or/and an <Ad><Inline> elements
          // but no creative was found
          var ad = vastResponse.ads[index];
          if (ad.errorCode || ad.creatives.length === 0) {
            this.trackVastError(ad.errorURLTemplates.concat(vastResponse.errorURLTemplates), { ERRORCODE: ad.errorCode || 303 }, { ERRORMESSAGE: ad.errorMessage || '' }, { extensions: ad.extensions }, { system: ad.system });
            vastResponse.ads.splice(index, 1);
          }
        }
      }
    }
  }]);

  return VASTParser;
}(_events.EventEmitter);

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CompanionAd = exports.CompanionAd = function CompanionAd() {
  _classCallCheck(this, CompanionAd);

  this.id = null;
  this.width = 0;
  this.height = 0;
  this.type = null;
  this.staticResource = null;
  this.htmlResource = null;
  this.iframeResource = null;
  this.altText = null;
  this.companionClickThroughURLTemplate = null;
  this.companionClickTrackingURLTemplates = [];
  this.trackingEvents = {};
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreativeLinear = undefined;

var _creative = __webpack_require__(11);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CreativeLinear = exports.CreativeLinear = function (_Creative) {
  _inherits(CreativeLinear, _Creative);

  function CreativeLinear() {
    var creativeAttributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, CreativeLinear);

    var _this = _possibleConstructorReturn(this, (CreativeLinear.__proto__ || Object.getPrototypeOf(CreativeLinear)).call(this, creativeAttributes));

    _this.type = 'linear';
    _this.duration = 0;
    _this.skipDelay = null;
    _this.mediaFiles = [];
    _this.videoClickThroughURLTemplate = null;
    _this.videoClickTrackingURLTemplates = [];
    _this.videoCustomClickURLTemplates = [];
    _this.adParameters = null;
    _this.icons = [];
    return _this;
  }

  return CreativeLinear;
}(_creative.Creative);

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NonLinearAd = exports.NonLinearAd = function NonLinearAd() {
  _classCallCheck(this, NonLinearAd);

  this.id = null;
  this.width = 0;
  this.height = 0;
  this.expandedWidth = 0;
  this.expandedHeight = 0;
  this.scalable = true;
  this.maintainAspectRatio = true;
  this.minSuggestedDuration = 0;
  this.apiFramework = 'static';
  this.type = null;
  this.staticResource = null;
  this.htmlResource = null;
  this.iframeResource = null;
  this.nonlinearClickThroughURLTemplate = null;
  this.nonlinearClickTrackingURLTemplates = [];
  this.adParameters = null;
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var R = (typeof Reflect === 'undefined' ? 'undefined' : _typeof(Reflect)) === 'object' ? Reflect : null;
var ReflectApply = R && typeof R.apply === 'function' ? R.apply : function ReflectApply(target, receiver, args) {
  return Function.prototype.apply.call(target, receiver, args);
};

var ReflectOwnKeys;
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys;
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
};

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function get() {
    return defaultMaxListeners;
  },
  set: function set(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function () {

  if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) {
    args.push(arguments[i]);
  }var doError = type === 'error';

  var events = this._events;
  if (events !== undefined) doError = doError && events.error === undefined;else if (!doError) return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0) er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined) return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i) {
      ReflectApply(listeners[i], this, args);
    }
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + (typeof listener === 'undefined' ? 'undefined' : _typeof(listener)));
  }

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type, listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] = prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = $getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + String(type) + ' listeners ' + 'added. Use emitter.setMaxListeners() to ' + 'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener = function prependListener(type, listener) {
  return _addListener(this, type, listener, true);
};

function onceWrapper() {
  var args = [];
  for (var i = 0; i < arguments.length; i++) {
    args.push(arguments[i]);
  }if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    ReflectApply(this.listener, this.target, args);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + (typeof listener === 'undefined' ? 'undefined' : _typeof(listener)));
  }
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + (typeof listener === 'undefined' ? 'undefined' : _typeof(listener)));
  }
  this.prependListener(type, _onceWrap(this, type, listener));
  return this;
};

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener = function removeListener(type, listener) {
  var list, events, position, i, originalListener;

  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + (typeof listener === 'undefined' ? 'undefined' : _typeof(listener)));
  }

  events = this._events;
  if (events === undefined) return this;

  list = events[type];
  if (list === undefined) return this;

  if (list === listener || list.listener === listener) {
    if (--this._eventsCount === 0) this._events = Object.create(null);else {
      delete events[type];
      if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
    }
  } else if (typeof list !== 'function') {
    position = -1;

    for (i = list.length - 1; i >= 0; i--) {
      if (list[i] === listener || list[i].listener === listener) {
        originalListener = list[i].listener;
        position = i;
        break;
      }
    }

    if (position < 0) return this;

    if (position === 0) list.shift();else {
      spliceOne(list, position);
    }

    if (list.length === 1) events[type] = list[0];

    if (events.removeListener !== undefined) this.emit('removeListener', type, originalListener || listener);
  }

  return this;
};

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
  var listeners, events, i;

  events = this._events;
  if (events === undefined) return this;

  // not listening for removeListener, no need to emit
  if (events.removeListener === undefined) {
    if (arguments.length === 0) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    } else if (events[type] !== undefined) {
      if (--this._eventsCount === 0) this._events = Object.create(null);else delete events[type];
    }
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    var keys = Object.keys(events);
    var key;
    for (i = 0; i < keys.length; ++i) {
      key = keys[i];
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = Object.create(null);
    this._eventsCount = 0;
    return this;
  }

  listeners = events[type];

  if (typeof listeners === 'function') {
    this.removeListener(type, listeners);
  } else if (listeners !== undefined) {
    // LIFO order
    for (i = listeners.length - 1; i >= 0; i--) {
      this.removeListener(type, listeners[i]);
    }
  }

  return this;
};

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined) return [];

  var evlistener = events[type];
  if (evlistener === undefined) return [];

  if (typeof evlistener === 'function') return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function (emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i) {
    copy[i] = arr[i];
  }return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++) {
    list[index] = list[index + 1];
  }list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JWPlayer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utils = __webpack_require__(1);

var _singlePlayer = __webpack_require__(2);

var _singlePlayer2 = _interopRequireDefault(_singlePlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SDK_URL = '//cdn.jwplayer.com/libraries/8DNY8ff0.js';
var SDK_GLOBAL = 'jwplayer';
// TODO: figure out all cases
var MATCH_VIDEO_URL = /jwplayer/;
var PLAYER_ID_PREFIX = 'jw-player-';

var JWPlayer = exports.JWPlayer = function (_Component) {
  _inherits(JWPlayer, _Component);

  function JWPlayer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, JWPlayer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = JWPlayer.__proto__ || Object.getPrototypeOf(JWPlayer)).call.apply(_ref, [this].concat(args))), _this), _this.callPlayer = _utils.callPlayer, _this.playerID = PLAYER_ID_PREFIX + (0, _utils.randomString)(), _this.mute = function () {
      _this.callPlayer('setMute', true);
    }, _this.unmute = function () {
      _this.callPlayer('setMute', false);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(JWPlayer, [{
    key: 'load',
    value: function load(url, isReady) {
      var _this2 = this;

      var onError = this.props.onError;

      if (isReady) {
        this.player.setup({
          file: url
        });
      } else {
        (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL).then(function (jwplayer) {
          _this2.player = jwplayer(_this2.playerID).setup({
            file: url
          });
          _this2.player.on('ready', _this2.props.onReady);
          _this2.player.on('play', _this2.props.onPlay);
          _this2.player.on('pause', _this2.props.onPause);
          _this2.player.on('error', onError);
        }, onError);
      }
    }
  }, {
    key: 'handleUnmount',
    value: function handleUnmount() {
      this.callPlayer('remove');
    }
  }, {
    key: 'play',
    value: function play() {
      this.callPlayer('play');
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.callPlayer('pause');
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.callPlayer('stop');
    }
  }, {
    key: 'seekTo',
    value: function seekTo(seconds) {
      this.callPlayer('seek', seconds);
    }
  }, {
    key: 'getVolume',
    value: function getVolume() {
      return this.callPlayer('getVolume') / 100;
    }
  }, {
    key: 'getMuted',
    value: function getMuted() {
      return this.callPlayer('getMute');
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      this.callPlayer('setVolume', fraction * 100);
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      return this.callPlayer('getDuration');
    }
  }, {
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      return this.callPlayer('getCurrentPosition');
    }
  }, {
    key: 'getSecondsLoaded',
    value: function getSecondsLoaded() {
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var style = {
        width: '100%',
        height: '100%'
      };
      return _react2['default'].createElement('div', { style: style, id: this.playerID });
    }
  }]);

  return JWPlayer;
}(_react.Component);

JWPlayer.displayName = 'JWPlayer';

JWPlayer.canPlay = function (url) {
  return MATCH_VIDEO_URL.test(url);
};

JWPlayer.loopOnEnded = true;
exports['default'] = (0, _singlePlayer2['default'])(JWPlayer);

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhenixPlayer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utils = __webpack_require__(1);

var _singlePlayer = __webpack_require__(2);

var _singlePlayer2 = _interopRequireDefault(_singlePlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // TODO: ReactPlayer's listener logic is very shaky because if you change the function identity
//       it won't get cleaned up. This is an existing problem so we're not gonna fix it here.


var PHENIX_SDK_URL = 'https://unpkg.com/phenix-web-sdk@2019.2.3/dist/phenix-web-sdk.min.js';
var PHENIX_SDK_GLOBAL = 'phenix-web-sdk';

// TODO: Add optional auth data parameter at the end
var PHENIX_URL_REGEX = /^phenix:(.+?)\|(.+?)(?:\|(.+?))?$/i; // i hate this so much

function getPhenixSdk() {
  return (0, _utils.getSDK)(PHENIX_SDK_URL, PHENIX_SDK_GLOBAL);
}

function canPlay(url) {
  return PHENIX_URL_REGEX.test(url);
}

var PhenixPlayer = exports.PhenixPlayer = function (_Component) {
  _inherits(PhenixPlayer, _Component);

  function PhenixPlayer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PhenixPlayer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PhenixPlayer.__proto__ || Object.getPrototypeOf(PhenixPlayer)).call.apply(_ref, [this].concat(args))), _this), _this.player = null, _this.channelExpress = null, _this.playerRef = function (player) {
      if (player === _this.player) {
        return;
      }
      if (_this.player) {
        _this.removeListeners();
      }
      _this.player = player;
      if (_this.player) {
        _this.addListeners();
      }
    }, _this.onSeek = function (e) {
      _this.props.onSeek(e.target.currentTime);
    }, _this.mute = function () {
      _this.player.muted = true;
    }, _this.unmute = function () {
      _this.player.muted = false;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PhenixPlayer, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // TODO: If refs get called with null on unmount, no reason to do this
      if (this.player) {
        this.removeListeners();
        this.player = null;
      }
      if (this.channelExpress) {
        this.channelExpress.dispose();
        this.channelExpress = null;
      }
    }
  }, {
    key: 'addListeners',
    value: function addListeners() {
      var _props = this.props,
          onReady = _props.onReady,
          onPlay = _props.onPlay,
          onPause = _props.onPause,
          onEnded = _props.onEnded,
          onVolumeChange = _props.onVolumeChange,
          onError = _props.onError,
          playsinline = _props.playsinline,
          videoElementId = _props.videoElementId;

      this.player.addEventListener('canplay', onReady);
      this.player.addEventListener('play', onPlay);
      this.player.addEventListener('pause', onPause);
      this.player.addEventListener('seeked', this.onSeek);
      this.player.addEventListener('ended', onEnded);
      this.player.addEventListener('error', onError);
      this.player.addEventListener('volumechange', onVolumeChange);
      // wow
      this.player.setAttribute('id', videoElementId);
      if (playsinline) {
        this.player.setAttribute('playsinline', '');
        this.player.setAttribute('webkit-playsinline', '');
      }
    }
  }, {
    key: 'removeListeners',
    value: function removeListeners() {
      var _props2 = this.props,
          onReady = _props2.onReady,
          onPlay = _props2.onPlay,
          onPause = _props2.onPause,
          onEnded = _props2.onEnded,
          onVolumeChange = _props2.onVolumeChange,
          onError = _props2.onError;

      this.player.removeEventListener('canplay', onReady);
      this.player.removeEventListener('play', onPlay);
      this.player.removeEventListener('pause', onPause);
      this.player.removeEventListener('seeked', this.onSeek);
      this.player.removeEventListener('ended', onEnded);
      this.player.removeEventListener('error', onError);
      this.player.removeEventListener('volumechange', onVolumeChange);
    }
  }, {
    key: 'getPhenixBackendUri',
    value: function getPhenixBackendUri() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.url;

      return PHENIX_URL_REGEX.exec(url)[1];
    }
  }, {
    key: 'getPhenixChannelId',
    value: function getPhenixChannelId() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.url;

      return PHENIX_URL_REGEX.exec(url)[2];
    }
  }, {
    key: 'getPhenixAuthenticationData',
    value: function getPhenixAuthenticationData() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.url;

      var match = PHENIX_URL_REGEX.exec(url)[3];
      return match ? JSON.parse(match) : {};
    }
  }, {
    key: 'load',
    value: function load(url) {
      var _this2 = this;

      var backendUri = this.getPhenixBackendUri(url);
      var channelId = this.getPhenixChannelId(url);
      var authenticationData = this.getPhenixAuthenticationData(url);

      var joinChannelCallback = function joinChannelCallback(err, response) {
        var success = !err && response.status === 'ok';
        if (!success) {
          var error = err || new Error('Response status: ' + response.status);
          _this2.props.onError(error);
        }
      };

      var subscriberCallback = function subscriberCallback(err, response) {
        var success = !err && ['ok', 'no-stream-playing'].includes(response.status);
        if (!success) {
          var error = err || new Error('Response status: ' + response.status);
          _this2.props.onError(error);
        }
        // otherwise, response.mediaStream.getStreamId() will be a thing
      };

      getPhenixSdk().then(function (phenix) {
        // TODO: Does this check do anything?
        if (url !== _this2.props.url) {
          return;
        }
        if (_this2.channelExpress) {
          _this2.channelExpress.dispose();
          _this2.channelExpress = null;
        }
        _this2.channelExpress = new phenix.express.ChannelExpress({
          authenticationData: authenticationData,
          backendUri: backendUri
        });
        _this2.channelExpress.joinChannel({
          channelId: channelId,
          videoElement: _this2.player
        }, joinChannelCallback, subscriberCallback);
      });
    }
  }, {
    key: 'play',
    value: function play() {
      var promise = this.player.play();
      if (promise) {
        promise['catch'](this.props.onError);
      }
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.player.pause();
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (this.channelExpress) {
        this.channelExpress.dispose();
        this.channelExpress = null;
      }
    }
  }, {
    key: 'seekTo',
    value: function seekTo(seconds) {
      if (seconds === Infinity || this.getDuration() === Infinity) {
        return;
      }
      this.player.currentTime = seconds;
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      this.player.volume = fraction;
    }
  }, {
    key: 'setPlaybackRate',
    value: function setPlaybackRate(rate) {
      this.player.playbackRate = rate;
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      return this.player.duration;
    }
  }, {
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      return this.player.currentTime;
    }
  }, {
    key: 'getSecondsLoaded',
    value: function getSecondsLoaded() {
      var buffered = this.player.buffered;

      if (buffered.length === 0) {
        return 0;
      }
      var end = buffered.end(buffered.length - 1);
      var duration = this.getDuration();
      if (end > duration) {
        return duration;
      }
      return end;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          playing = _props3.playing,
          loop = _props3.loop,
          controls = _props3.controls,
          muted = _props3.muted,
          width = _props3.width,
          height = _props3.height;

      var style = {
        width: width === 'auto' ? width : '100%',
        height: height === 'auto' ? height : '100%'
      };
      return _react2['default'].createElement('video', {
        ref: this.playerRef,
        style: style,
        preload: 'auto' // TODO
        , autoPlay: playing // TODO
        , controls: controls // TODO
        , muted: muted,
        loop: loop
      });
    }
  }]);

  return PhenixPlayer;
}(_react.Component);

PhenixPlayer.displayName = 'PhenixPlayer';
PhenixPlayer.canPlay = canPlay;
exports['default'] = (0, _singlePlayer2['default'])(PhenixPlayer); // TODO: WTF does this even do?

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = renderReactPlayer;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(34);

var _ReactPlayer = __webpack_require__(39);

var _ReactPlayer2 = _interopRequireDefault(_ReactPlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function renderReactPlayer(container, props) {
  (0, _reactDom.render)(_react2['default'].createElement(_ReactPlayer2['default'], props), container);
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.8.6
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var k = __webpack_require__(13),
    n = "function" === typeof Symbol && Symbol["for"],
    p = n ? Symbol["for"]("react.element") : 60103,
    q = n ? Symbol["for"]("react.portal") : 60106,
    r = n ? Symbol["for"]("react.fragment") : 60107,
    t = n ? Symbol["for"]("react.strict_mode") : 60108,
    u = n ? Symbol["for"]("react.profiler") : 60114,
    v = n ? Symbol["for"]("react.provider") : 60109,
    w = n ? Symbol["for"]("react.context") : 60110,
    x = n ? Symbol["for"]("react.concurrent_mode") : 60111,
    y = n ? Symbol["for"]("react.forward_ref") : 60112,
    z = n ? Symbol["for"]("react.suspense") : 60113,
    aa = n ? Symbol["for"]("react.memo") : 60115,
    ba = n ? Symbol["for"]("react.lazy") : 60116,
    A = "function" === typeof Symbol && Symbol.iterator;function ca(a, b, d, c, e, g, h, f) {
  if (!a) {
    a = void 0;if (void 0 === b) a = Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else {
      var l = [d, c, e, g, h, f],
          m = 0;a = Error(b.replace(/%s/g, function () {
        return l[m++];
      }));a.name = "Invariant Violation";
    }a.framesToPop = 1;throw a;
  }
}
function B(a) {
  for (var b = arguments.length - 1, d = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 0; c < b; c++) {
    d += "&args[]=" + encodeURIComponent(arguments[c + 1]);
  }ca(!1, "Minified React error #" + a + "; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ", d);
}var C = { isMounted: function isMounted() {
    return !1;
  }, enqueueForceUpdate: function enqueueForceUpdate() {}, enqueueReplaceState: function enqueueReplaceState() {}, enqueueSetState: function enqueueSetState() {} },
    D = {};
function E(a, b, d) {
  this.props = a;this.context = b;this.refs = D;this.updater = d || C;
}E.prototype.isReactComponent = {};E.prototype.setState = function (a, b) {
  "object" !== (typeof a === "undefined" ? "undefined" : _typeof(a)) && "function" !== typeof a && null != a ? B("85") : void 0;this.updater.enqueueSetState(this, a, b, "setState");
};E.prototype.forceUpdate = function (a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};function F() {}F.prototype = E.prototype;function G(a, b, d) {
  this.props = a;this.context = b;this.refs = D;this.updater = d || C;
}var H = G.prototype = new F();
H.constructor = G;k(H, E.prototype);H.isPureReactComponent = !0;var I = { current: null },
    J = { current: null },
    K = Object.prototype.hasOwnProperty,
    L = { key: !0, ref: !0, __self: !0, __source: !0 };
function M(a, b, d) {
  var c = void 0,
      e = {},
      g = null,
      h = null;if (null != b) for (c in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (g = "" + b.key), b) {
    K.call(b, c) && !L.hasOwnProperty(c) && (e[c] = b[c]);
  }var f = arguments.length - 2;if (1 === f) e.children = d;else if (1 < f) {
    for (var l = Array(f), m = 0; m < f; m++) {
      l[m] = arguments[m + 2];
    }e.children = l;
  }if (a && a.defaultProps) for (c in f = a.defaultProps, f) {
    void 0 === e[c] && (e[c] = f[c]);
  }return { $$typeof: p, type: a, key: g, ref: h, props: e, _owner: J.current };
}
function da(a, b) {
  return { $$typeof: p, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
}function N(a) {
  return "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && null !== a && a.$$typeof === p;
}function escape(a) {
  var b = { "=": "=0", ":": "=2" };return "$" + ("" + a).replace(/[=:]/g, function (a) {
    return b[a];
  });
}var O = /\/+/g,
    P = [];function Q(a, b, d, c) {
  if (P.length) {
    var e = P.pop();e.result = a;e.keyPrefix = b;e.func = d;e.context = c;e.count = 0;return e;
  }return { result: a, keyPrefix: b, func: d, context: c, count: 0 };
}
function R(a) {
  a.result = null;a.keyPrefix = null;a.func = null;a.context = null;a.count = 0;10 > P.length && P.push(a);
}
function S(a, b, d, c) {
  var e = typeof a === "undefined" ? "undefined" : _typeof(a);if ("undefined" === e || "boolean" === e) a = null;var g = !1;if (null === a) g = !0;else switch (e) {case "string":case "number":
      g = !0;break;case "object":
      switch (a.$$typeof) {case p:case q:
          g = !0;}}if (g) return d(c, a, "" === b ? "." + T(a, 0) : b), 1;g = 0;b = "" === b ? "." : b + ":";if (Array.isArray(a)) for (var h = 0; h < a.length; h++) {
    e = a[h];var f = b + T(e, h);g += S(e, f, d, c);
  } else if (null === a || "object" !== (typeof a === "undefined" ? "undefined" : _typeof(a)) ? f = null : (f = A && a[A] || a["@@iterator"], f = "function" === typeof f ? f : null), "function" === typeof f) for (a = f.call(a), h = 0; !(e = a.next()).done;) {
    e = e.value, f = b + T(e, h++), g += S(e, f, d, c);
  } else "object" === e && (d = "" + a, B("31", "[object Object]" === d ? "object with keys {" + Object.keys(a).join(", ") + "}" : d, ""));return g;
}function U(a, b, d) {
  return null == a ? 0 : S(a, "", b, d);
}function T(a, b) {
  return "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && null !== a && null != a.key ? escape(a.key) : b.toString(36);
}function ea(a, b) {
  a.func.call(a.context, b, a.count++);
}
function fa(a, b, d) {
  var c = a.result,
      e = a.keyPrefix;a = a.func.call(a.context, b, a.count++);Array.isArray(a) ? V(a, c, d, function (a) {
    return a;
  }) : null != a && (N(a) && (a = da(a, e + (!a.key || b && b.key === a.key ? "" : ("" + a.key).replace(O, "$&/") + "/") + d)), c.push(a));
}function V(a, b, d, c, e) {
  var g = "";null != d && (g = ("" + d).replace(O, "$&/") + "/");b = Q(b, g, c, e);U(a, fa, b);R(b);
}function W() {
  var a = I.current;null === a ? B("321") : void 0;return a;
}
var X = { Children: { map: function map(a, b, d) {
      if (null == a) return a;var c = [];V(a, c, null, b, d);return c;
    }, forEach: function forEach(a, b, d) {
      if (null == a) return a;b = Q(null, null, b, d);U(a, ea, b);R(b);
    }, count: function count(a) {
      return U(a, function () {
        return null;
      }, null);
    }, toArray: function toArray(a) {
      var b = [];V(a, b, null, function (a) {
        return a;
      });return b;
    }, only: function only(a) {
      N(a) ? void 0 : B("143");return a;
    } }, createRef: function createRef() {
    return { current: null };
  }, Component: E, PureComponent: G, createContext: function createContext(a, b) {
    void 0 === b && (b = null);a = { $$typeof: w, _calculateChangedBits: b,
      _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null };a.Provider = { $$typeof: v, _context: a };return a.Consumer = a;
  }, forwardRef: function forwardRef(a) {
    return { $$typeof: y, render: a };
  }, lazy: function lazy(a) {
    return { $$typeof: ba, _ctor: a, _status: -1, _result: null };
  }, memo: function memo(a, b) {
    return { $$typeof: aa, type: a, compare: void 0 === b ? null : b };
  }, useCallback: function useCallback(a, b) {
    return W().useCallback(a, b);
  }, useContext: function useContext(a, b) {
    return W().useContext(a, b);
  }, useEffect: function useEffect(a, b) {
    return W().useEffect(a, b);
  }, useImperativeHandle: function useImperativeHandle(a, b, d) {
    return W().useImperativeHandle(a, b, d);
  }, useDebugValue: function useDebugValue() {}, useLayoutEffect: function useLayoutEffect(a, b) {
    return W().useLayoutEffect(a, b);
  }, useMemo: function useMemo(a, b) {
    return W().useMemo(a, b);
  }, useReducer: function useReducer(a, b, d) {
    return W().useReducer(a, b, d);
  }, useRef: function useRef(a) {
    return W().useRef(a);
  }, useState: function useState(a) {
    return W().useState(a);
  }, Fragment: r, StrictMode: t, Suspense: z, createElement: M, cloneElement: function cloneElement(a, b, d) {
    null === a || void 0 === a ? B("267", a) : void 0;var c = void 0,
        e = k({}, a.props),
        g = a.key,
        h = a.ref,
        f = a._owner;if (null != b) {
      void 0 !== b.ref && (h = b.ref, f = J.current);void 0 !== b.key && (g = "" + b.key);var l = void 0;a.type && a.type.defaultProps && (l = a.type.defaultProps);for (c in b) {
        K.call(b, c) && !L.hasOwnProperty(c) && (e[c] = void 0 === b[c] && void 0 !== l ? l[c] : b[c]);
      }
    }c = arguments.length - 2;if (1 === c) e.children = d;else if (1 < c) {
      l = Array(c);for (var m = 0; m < c; m++) {
        l[m] = arguments[m + 2];
      }e.children = l;
    }return { $$typeof: p, type: a.type, key: g, ref: h, props: e, _owner: f };
  }, createFactory: function createFactory(a) {
    var b = M.bind(null, a);b.type = a;return b;
  }, isValidElement: N, version: "16.8.6",
  unstable_ConcurrentMode: x, unstable_Profiler: u, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: { ReactCurrentDispatcher: I, ReactCurrentOwner: J, assign: k } },
    Y = { "default": X },
    Z = Y && X || Y;module.exports = Z["default"] || Z;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function') {
    return;
  }
  if (false) {
    // This branch is unreachable because this function is only called
    // in production, but the condition is true only in development.
    // Therefore if the branch is still here, dead code elimination wasn't
    // properly applied.
    // Don't change the message. React DevTools relies on it. Also make sure
    // this message doesn't occur elsewhere in this function, or it will cause
    // a false positive.
    throw new Error('^_^');
  }
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if (true) {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = __webpack_require__(35);
} else {
  module.exports = require('./cjs/react-dom.development.js');
}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.8.6
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var aa = __webpack_require__(0),
    n = __webpack_require__(13),
    r = __webpack_require__(36);function ba(a, b, c, d, e, f, g, h) {
  if (!a) {
    a = void 0;if (void 0 === b) a = Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else {
      var l = [c, d, e, f, g, h],
          k = 0;a = Error(b.replace(/%s/g, function () {
        return l[k++];
      }));a.name = "Invariant Violation";
    }a.framesToPop = 1;throw a;
  }
}
function x(a) {
  for (var b = arguments.length - 1, c = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, d = 0; d < b; d++) {
    c += "&args[]=" + encodeURIComponent(arguments[d + 1]);
  }ba(!1, "Minified React error #" + a + "; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ", c);
}aa ? void 0 : x("227");function ca(a, b, c, d, e, f, g, h, l) {
  var k = Array.prototype.slice.call(arguments, 3);try {
    b.apply(c, k);
  } catch (m) {
    this.onError(m);
  }
}
var da = !1,
    ea = null,
    fa = !1,
    ha = null,
    ia = { onError: function onError(a) {
    da = !0;ea = a;
  } };function ja(a, b, c, d, e, f, g, h, l) {
  da = !1;ea = null;ca.apply(ia, arguments);
}function ka(a, b, c, d, e, f, g, h, l) {
  ja.apply(this, arguments);if (da) {
    if (da) {
      var k = ea;da = !1;ea = null;
    } else x("198"), k = void 0;fa || (fa = !0, ha = k);
  }
}var la = null,
    ma = {};
function na() {
  if (la) for (var a in ma) {
    var b = ma[a],
        c = la.indexOf(a);-1 < c ? void 0 : x("96", a);if (!oa[c]) {
      b.extractEvents ? void 0 : x("97", a);oa[c] = b;c = b.eventTypes;for (var d in c) {
        var e = void 0;var f = c[d],
            g = b,
            h = d;pa.hasOwnProperty(h) ? x("99", h) : void 0;pa[h] = f;var l = f.phasedRegistrationNames;if (l) {
          for (e in l) {
            l.hasOwnProperty(e) && qa(l[e], g, h);
          }e = !0;
        } else f.registrationName ? (qa(f.registrationName, g, h), e = !0) : e = !1;e ? void 0 : x("98", d, a);
      }
    }
  }
}
function qa(a, b, c) {
  ra[a] ? x("100", a) : void 0;ra[a] = b;sa[a] = b.eventTypes[c].dependencies;
}var oa = [],
    pa = {},
    ra = {},
    sa = {},
    ta = null,
    ua = null,
    va = null;function wa(a, b, c) {
  var d = a.type || "unknown-event";a.currentTarget = va(c);ka(d, b, void 0, a);a.currentTarget = null;
}function xa(a, b) {
  null == b ? x("30") : void 0;if (null == a) return b;if (Array.isArray(a)) {
    if (Array.isArray(b)) return a.push.apply(a, b), a;a.push(b);return a;
  }return Array.isArray(b) ? [a].concat(b) : [a, b];
}
function ya(a, b, c) {
  Array.isArray(a) ? a.forEach(b, c) : a && b.call(c, a);
}var za = null;function Aa(a) {
  if (a) {
    var b = a._dispatchListeners,
        c = a._dispatchInstances;if (Array.isArray(b)) for (var d = 0; d < b.length && !a.isPropagationStopped(); d++) {
      wa(a, b[d], c[d]);
    } else b && wa(a, b, c);a._dispatchListeners = null;a._dispatchInstances = null;a.isPersistent() || a.constructor.release(a);
  }
}
var Ba = { injectEventPluginOrder: function injectEventPluginOrder(a) {
    la ? x("101") : void 0;la = Array.prototype.slice.call(a);na();
  }, injectEventPluginsByName: function injectEventPluginsByName(a) {
    var b = !1,
        c;for (c in a) {
      if (a.hasOwnProperty(c)) {
        var d = a[c];ma.hasOwnProperty(c) && ma[c] === d || (ma[c] ? x("102", c) : void 0, ma[c] = d, b = !0);
      }
    }b && na();
  } };
function Ca(a, b) {
  var c = a.stateNode;if (!c) return null;var d = ta(c);if (!d) return null;c = d[b];a: switch (b) {case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":
      (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));a = !d;break a;default:
      a = !1;}if (a) return null;c && "function" !== typeof c ? x("231", b, typeof c === "undefined" ? "undefined" : _typeof(c)) : void 0;
  return c;
}function Da(a) {
  null !== a && (za = xa(za, a));a = za;za = null;if (a && (ya(a, Aa), za ? x("95") : void 0, fa)) throw a = ha, fa = !1, ha = null, a;
}var Ea = Math.random().toString(36).slice(2),
    Fa = "__reactInternalInstance$" + Ea,
    Ga = "__reactEventHandlers$" + Ea;function Ha(a) {
  if (a[Fa]) return a[Fa];for (; !a[Fa];) {
    if (a.parentNode) a = a.parentNode;else return null;
  }a = a[Fa];return 5 === a.tag || 6 === a.tag ? a : null;
}function Ia(a) {
  a = a[Fa];return !a || 5 !== a.tag && 6 !== a.tag ? null : a;
}
function Ja(a) {
  if (5 === a.tag || 6 === a.tag) return a.stateNode;x("33");
}function Ka(a) {
  return a[Ga] || null;
}function La(a) {
  do {
    a = a["return"];
  } while (a && 5 !== a.tag);return a ? a : null;
}function Ma(a, b, c) {
  if (b = Ca(a, c.dispatchConfig.phasedRegistrationNames[b])) c._dispatchListeners = xa(c._dispatchListeners, b), c._dispatchInstances = xa(c._dispatchInstances, a);
}
function Na(a) {
  if (a && a.dispatchConfig.phasedRegistrationNames) {
    for (var b = a._targetInst, c = []; b;) {
      c.push(b), b = La(b);
    }for (b = c.length; 0 < b--;) {
      Ma(c[b], "captured", a);
    }for (b = 0; b < c.length; b++) {
      Ma(c[b], "bubbled", a);
    }
  }
}function Oa(a, b, c) {
  a && c && c.dispatchConfig.registrationName && (b = Ca(a, c.dispatchConfig.registrationName)) && (c._dispatchListeners = xa(c._dispatchListeners, b), c._dispatchInstances = xa(c._dispatchInstances, a));
}function Pa(a) {
  a && a.dispatchConfig.registrationName && Oa(a._targetInst, null, a);
}
function Qa(a) {
  ya(a, Na);
}var Ra = !("undefined" === typeof window || !window.document || !window.document.createElement);function Sa(a, b) {
  var c = {};c[a.toLowerCase()] = b.toLowerCase();c["Webkit" + a] = "webkit" + b;c["Moz" + a] = "moz" + b;return c;
}var Ta = { animationend: Sa("Animation", "AnimationEnd"), animationiteration: Sa("Animation", "AnimationIteration"), animationstart: Sa("Animation", "AnimationStart"), transitionend: Sa("Transition", "TransitionEnd") },
    Ua = {},
    Va = {};
Ra && (Va = document.createElement("div").style, "AnimationEvent" in window || (delete Ta.animationend.animation, delete Ta.animationiteration.animation, delete Ta.animationstart.animation), "TransitionEvent" in window || delete Ta.transitionend.transition);function Wa(a) {
  if (Ua[a]) return Ua[a];if (!Ta[a]) return a;var b = Ta[a],
      c;for (c in b) {
    if (b.hasOwnProperty(c) && c in Va) return Ua[a] = b[c];
  }return a;
}
var Xa = Wa("animationend"),
    Ya = Wa("animationiteration"),
    Za = Wa("animationstart"),
    $a = Wa("transitionend"),
    ab = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
    bb = null,
    cb = null,
    db = null;
function eb() {
  if (db) return db;var a,
      b = cb,
      c = b.length,
      d,
      e = "value" in bb ? bb.value : bb.textContent,
      f = e.length;for (a = 0; a < c && b[a] === e[a]; a++) {}var g = c - a;for (d = 1; d <= g && b[c - d] === e[f - d]; d++) {}return db = e.slice(a, 1 < d ? 1 - d : void 0);
}function fb() {
  return !0;
}function gb() {
  return !1;
}
function y(a, b, c, d) {
  this.dispatchConfig = a;this._targetInst = b;this.nativeEvent = c;a = this.constructor.Interface;for (var e in a) {
    a.hasOwnProperty(e) && ((b = a[e]) ? this[e] = b(c) : "target" === e ? this.target = d : this[e] = c[e]);
  }this.isDefaultPrevented = (null != c.defaultPrevented ? c.defaultPrevented : !1 === c.returnValue) ? fb : gb;this.isPropagationStopped = gb;return this;
}
n(y.prototype, { preventDefault: function preventDefault() {
    this.defaultPrevented = !0;var a = this.nativeEvent;a && (a.preventDefault ? a.preventDefault() : "unknown" !== typeof a.returnValue && (a.returnValue = !1), this.isDefaultPrevented = fb);
  }, stopPropagation: function stopPropagation() {
    var a = this.nativeEvent;a && (a.stopPropagation ? a.stopPropagation() : "unknown" !== typeof a.cancelBubble && (a.cancelBubble = !0), this.isPropagationStopped = fb);
  }, persist: function persist() {
    this.isPersistent = fb;
  }, isPersistent: gb, destructor: function destructor() {
    var a = this.constructor.Interface,
        b;for (b in a) {
      this[b] = null;
    }this.nativeEvent = this._targetInst = this.dispatchConfig = null;this.isPropagationStopped = this.isDefaultPrevented = gb;this._dispatchInstances = this._dispatchListeners = null;
  } });y.Interface = { type: null, target: null, currentTarget: function currentTarget() {
    return null;
  }, eventPhase: null, bubbles: null, cancelable: null, timeStamp: function timeStamp(a) {
    return a.timeStamp || Date.now();
  }, defaultPrevented: null, isTrusted: null };
y.extend = function (a) {
  function b() {}function c() {
    return d.apply(this, arguments);
  }var d = this;b.prototype = d.prototype;var e = new b();n(e, c.prototype);c.prototype = e;c.prototype.constructor = c;c.Interface = n({}, d.Interface, a);c.extend = d.extend;hb(c);return c;
};hb(y);function ib(a, b, c, d) {
  if (this.eventPool.length) {
    var e = this.eventPool.pop();this.call(e, a, b, c, d);return e;
  }return new this(a, b, c, d);
}function jb(a) {
  a instanceof this ? void 0 : x("279");a.destructor();10 > this.eventPool.length && this.eventPool.push(a);
}
function hb(a) {
  a.eventPool = [];a.getPooled = ib;a.release = jb;
}var kb = y.extend({ data: null }),
    lb = y.extend({ data: null }),
    mb = [9, 13, 27, 32],
    nb = Ra && "CompositionEvent" in window,
    ob = null;Ra && "documentMode" in document && (ob = document.documentMode);
var pb = Ra && "TextEvent" in window && !ob,
    qb = Ra && (!nb || ob && 8 < ob && 11 >= ob),
    rb = String.fromCharCode(32),
    sb = { beforeInput: { phasedRegistrationNames: { bubbled: "onBeforeInput", captured: "onBeforeInputCapture" }, dependencies: ["compositionend", "keypress", "textInput", "paste"] }, compositionEnd: { phasedRegistrationNames: { bubbled: "onCompositionEnd", captured: "onCompositionEndCapture" }, dependencies: "blur compositionend keydown keypress keyup mousedown".split(" ") }, compositionStart: { phasedRegistrationNames: { bubbled: "onCompositionStart",
      captured: "onCompositionStartCapture" }, dependencies: "blur compositionstart keydown keypress keyup mousedown".split(" ") }, compositionUpdate: { phasedRegistrationNames: { bubbled: "onCompositionUpdate", captured: "onCompositionUpdateCapture" }, dependencies: "blur compositionupdate keydown keypress keyup mousedown".split(" ") } },
    tb = !1;
function ub(a, b) {
  switch (a) {case "keyup":
      return -1 !== mb.indexOf(b.keyCode);case "keydown":
      return 229 !== b.keyCode;case "keypress":case "mousedown":case "blur":
      return !0;default:
      return !1;}
}function vb(a) {
  a = a.detail;return "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && "data" in a ? a.data : null;
}var wb = !1;function xb(a, b) {
  switch (a) {case "compositionend":
      return vb(b);case "keypress":
      if (32 !== b.which) return null;tb = !0;return rb;case "textInput":
      return a = b.data, a === rb && tb ? null : a;default:
      return null;}
}
function yb(a, b) {
  if (wb) return "compositionend" === a || !nb && ub(a, b) ? (a = eb(), db = cb = bb = null, wb = !1, a) : null;switch (a) {case "paste":
      return null;case "keypress":
      if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
        if (b.char && 1 < b.char.length) return b.char;if (b.which) return String.fromCharCode(b.which);
      }return null;case "compositionend":
      return qb && "ko" !== b.locale ? null : b.data;default:
      return null;}
}
var zb = { eventTypes: sb, extractEvents: function extractEvents(a, b, c, d) {
    var e = void 0;var f = void 0;if (nb) b: {
      switch (a) {case "compositionstart":
          e = sb.compositionStart;break b;case "compositionend":
          e = sb.compositionEnd;break b;case "compositionupdate":
          e = sb.compositionUpdate;break b;}e = void 0;
    } else wb ? ub(a, c) && (e = sb.compositionEnd) : "keydown" === a && 229 === c.keyCode && (e = sb.compositionStart);e ? (qb && "ko" !== c.locale && (wb || e !== sb.compositionStart ? e === sb.compositionEnd && wb && (f = eb()) : (bb = d, cb = "value" in bb ? bb.value : bb.textContent, wb = !0)), e = kb.getPooled(e, b, c, d), f ? e.data = f : (f = vb(c), null !== f && (e.data = f)), Qa(e), f = e) : f = null;(a = pb ? xb(a, c) : yb(a, c)) ? (b = lb.getPooled(sb.beforeInput, b, c, d), b.data = a, Qa(b)) : b = null;return null === f ? b : null === b ? f : [f, b];
  } },
    Ab = null,
    Bb = null,
    Cb = null;function Db(a) {
  if (a = ua(a)) {
    "function" !== typeof Ab ? x("280") : void 0;var b = ta(a.stateNode);Ab(a.stateNode, a.type, b);
  }
}function Eb(a) {
  Bb ? Cb ? Cb.push(a) : Cb = [a] : Bb = a;
}function Fb() {
  if (Bb) {
    var a = Bb,
        b = Cb;Cb = Bb = null;Db(a);if (b) for (a = 0; a < b.length; a++) {
      Db(b[a]);
    }
  }
}
function Gb(a, b) {
  return a(b);
}function Hb(a, b, c) {
  return a(b, c);
}function Ib() {}var Jb = !1;function Kb(a, b) {
  if (Jb) return a(b);Jb = !0;try {
    return Gb(a, b);
  } finally {
    if (Jb = !1, null !== Bb || null !== Cb) Ib(), Fb();
  }
}var Lb = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };function Mb(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();return "input" === b ? !!Lb[a.type] : "textarea" === b ? !0 : !1;
}
function Nb(a) {
  a = a.target || a.srcElement || window;a.correspondingUseElement && (a = a.correspondingUseElement);return 3 === a.nodeType ? a.parentNode : a;
}function Ob(a) {
  if (!Ra) return !1;a = "on" + a;var b = a in document;b || (b = document.createElement("div"), b.setAttribute(a, "return;"), b = "function" === typeof b[a]);return b;
}function Pb(a) {
  var b = a.type;return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
}
function Qb(a) {
  var b = Pb(a) ? "checked" : "value",
      c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b),
      d = "" + a[b];if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
    var e = c.get,
        f = c.set;Object.defineProperty(a, b, { configurable: !0, get: function get() {
        return e.call(this);
      }, set: function set(a) {
        d = "" + a;f.call(this, a);
      } });Object.defineProperty(a, b, { enumerable: c.enumerable });return { getValue: function getValue() {
        return d;
      }, setValue: function setValue(a) {
        d = "" + a;
      }, stopTracking: function stopTracking() {
        a._valueTracker = null;delete a[b];
      } };
  }
}function Rb(a) {
  a._valueTracker || (a._valueTracker = Qb(a));
}function Sb(a) {
  if (!a) return !1;var b = a._valueTracker;if (!b) return !0;var c = b.getValue();var d = "";a && (d = Pb(a) ? a.checked ? "true" : "false" : a.value);a = d;return a !== c ? (b.setValue(a), !0) : !1;
}var Tb = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;Tb.hasOwnProperty("ReactCurrentDispatcher") || (Tb.ReactCurrentDispatcher = { current: null });
var Ub = /^(.*)[\\\/]/,
    z = "function" === typeof Symbol && Symbol["for"],
    Vb = z ? Symbol["for"]("react.element") : 60103,
    Wb = z ? Symbol["for"]("react.portal") : 60106,
    Xb = z ? Symbol["for"]("react.fragment") : 60107,
    Yb = z ? Symbol["for"]("react.strict_mode") : 60108,
    Zb = z ? Symbol["for"]("react.profiler") : 60114,
    $b = z ? Symbol["for"]("react.provider") : 60109,
    ac = z ? Symbol["for"]("react.context") : 60110,
    bc = z ? Symbol["for"]("react.concurrent_mode") : 60111,
    cc = z ? Symbol["for"]("react.forward_ref") : 60112,
    dc = z ? Symbol["for"]("react.suspense") : 60113,
    ec = z ? Symbol["for"]("react.memo") : 60115,
    fc = z ? Symbol["for"]("react.lazy") : 60116,
    gc = "function" === typeof Symbol && Symbol.iterator;function hc(a) {
  if (null === a || "object" !== (typeof a === "undefined" ? "undefined" : _typeof(a))) return null;a = gc && a[gc] || a["@@iterator"];return "function" === typeof a ? a : null;
}
function ic(a) {
  if (null == a) return null;if ("function" === typeof a) return a.displayName || a.name || null;if ("string" === typeof a) return a;switch (a) {case bc:
      return "ConcurrentMode";case Xb:
      return "Fragment";case Wb:
      return "Portal";case Zb:
      return "Profiler";case Yb:
      return "StrictMode";case dc:
      return "Suspense";}if ("object" === (typeof a === "undefined" ? "undefined" : _typeof(a))) switch (a.$$typeof) {case ac:
      return "Context.Consumer";case $b:
      return "Context.Provider";case cc:
      var b = a.render;b = b.displayName || b.name || "";return a.displayName || ("" !== b ? "ForwardRef(" + b + ")" : "ForwardRef");case ec:
      return ic(a.type);case fc:
      if (a = 1 === a._status ? a._result : null) return ic(a);}return null;
}function jc(a) {
  var b = "";do {
    a: switch (a.tag) {case 3:case 4:case 6:case 7:case 10:case 9:
        var c = "";break a;default:
        var d = a._debugOwner,
            e = a._debugSource,
            f = ic(a.type);c = null;d && (c = ic(d.type));d = f;f = "";e ? f = " (at " + e.fileName.replace(Ub, "") + ":" + e.lineNumber + ")" : c && (f = " (created by " + c + ")");c = "\n    in " + (d || "Unknown") + f;}b += c;a = a["return"];
  } while (a);return b;
}
var kc = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    lc = Object.prototype.hasOwnProperty,
    mc = {},
    nc = {};
function oc(a) {
  if (lc.call(nc, a)) return !0;if (lc.call(mc, a)) return !1;if (kc.test(a)) return nc[a] = !0;mc[a] = !0;return !1;
}function pc(a, b, c, d) {
  if (null !== c && 0 === c.type) return !1;switch (typeof b === "undefined" ? "undefined" : _typeof(b)) {case "function":case "symbol":
      return !0;case "boolean":
      if (d) return !1;if (null !== c) return !c.acceptsBooleans;a = a.toLowerCase().slice(0, 5);return "data-" !== a && "aria-" !== a;default:
      return !1;}
}
function qc(a, b, c, d) {
  if (null === b || "undefined" === typeof b || pc(a, b, c, d)) return !0;if (d) return !1;if (null !== c) switch (c.type) {case 3:
      return !b;case 4:
      return !1 === b;case 5:
      return isNaN(b);case 6:
      return isNaN(b) || 1 > b;}return !1;
}function C(a, b, c, d, e) {
  this.acceptsBooleans = 2 === b || 3 === b || 4 === b;this.attributeName = d;this.attributeNamespace = e;this.mustUseProperty = c;this.propertyName = a;this.type = b;
}var D = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function (a) {
  D[a] = new C(a, 0, !1, a, null);
});[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function (a) {
  var b = a[0];D[b] = new C(b, 1, !1, a[1], null);
});["contentEditable", "draggable", "spellCheck", "value"].forEach(function (a) {
  D[a] = new C(a, 2, !1, a.toLowerCase(), null);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function (a) {
  D[a] = new C(a, 2, !1, a, null);
});"allowFullScreen async autoFocus autoPlay controls default defer disabled formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function (a) {
  D[a] = new C(a, 3, !1, a.toLowerCase(), null);
});["checked", "multiple", "muted", "selected"].forEach(function (a) {
  D[a] = new C(a, 3, !0, a, null);
});
["capture", "download"].forEach(function (a) {
  D[a] = new C(a, 4, !1, a, null);
});["cols", "rows", "size", "span"].forEach(function (a) {
  D[a] = new C(a, 6, !1, a, null);
});["rowSpan", "start"].forEach(function (a) {
  D[a] = new C(a, 5, !1, a.toLowerCase(), null);
});var rc = /[\-:]([a-z])/g;function sc(a) {
  return a[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function (a) {
  var b = a.replace(rc, sc);D[b] = new C(b, 1, !1, a, null);
});"xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function (a) {
  var b = a.replace(rc, sc);D[b] = new C(b, 1, !1, a, "http://www.w3.org/1999/xlink");
});["xml:base", "xml:lang", "xml:space"].forEach(function (a) {
  var b = a.replace(rc, sc);D[b] = new C(b, 1, !1, a, "http://www.w3.org/XML/1998/namespace");
});["tabIndex", "crossOrigin"].forEach(function (a) {
  D[a] = new C(a, 1, !1, a.toLowerCase(), null);
});
function tc(a, b, c, d) {
  var e = D.hasOwnProperty(b) ? D[b] : null;var f = null !== e ? 0 === e.type : d ? !1 : !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1] ? !1 : !0;f || (qc(b, c, e, d) && (c = null), d || null === e ? oc(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? !1 : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && !0 === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c))));
}
function uc(a) {
  switch (typeof a === "undefined" ? "undefined" : _typeof(a)) {case "boolean":case "number":case "object":case "string":case "undefined":
      return a;default:
      return "";}
}function vc(a, b) {
  var c = b.checked;return n({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
}
function wc(a, b) {
  var c = null == b.defaultValue ? "" : b.defaultValue,
      d = null != b.checked ? b.checked : b.defaultChecked;c = uc(null != b.value ? b.value : c);a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
}function xc(a, b) {
  b = b.checked;null != b && tc(a, "checked", b, !1);
}
function yc(a, b) {
  xc(a, b);var c = uc(b.value),
      d = b.type;if (null != c) {
    if ("number" === d) {
      if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
    } else a.value !== "" + c && (a.value = "" + c);
  } else if ("submit" === d || "reset" === d) {
    a.removeAttribute("value");return;
  }b.hasOwnProperty("value") ? zc(a, b.type, c) : b.hasOwnProperty("defaultValue") && zc(a, b.type, uc(b.defaultValue));null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
}
function Ac(a, b, c) {
  if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
    var d = b.type;if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;b = "" + a._wrapperState.initialValue;c || b === a.value || (a.value = b);a.defaultValue = b;
  }c = a.name;"" !== c && (a.name = "");a.defaultChecked = !a.defaultChecked;a.defaultChecked = !!a._wrapperState.initialChecked;"" !== c && (a.name = c);
}
function zc(a, b, c) {
  if ("number" !== b || a.ownerDocument.activeElement !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
}var Bc = { change: { phasedRegistrationNames: { bubbled: "onChange", captured: "onChangeCapture" }, dependencies: "blur change click focus input keydown keyup selectionchange".split(" ") } };function Cc(a, b, c) {
  a = y.getPooled(Bc.change, a, b, c);a.type = "change";Eb(c);Qa(a);return a;
}var Dc = null,
    Ec = null;function Fc(a) {
  Da(a);
}
function Gc(a) {
  var b = Ja(a);if (Sb(b)) return a;
}function Hc(a, b) {
  if ("change" === a) return b;
}var Ic = !1;Ra && (Ic = Ob("input") && (!document.documentMode || 9 < document.documentMode));function Jc() {
  Dc && (Dc.detachEvent("onpropertychange", Kc), Ec = Dc = null);
}function Kc(a) {
  "value" === a.propertyName && Gc(Ec) && (a = Cc(Ec, a, Nb(a)), Kb(Fc, a));
}function Lc(a, b, c) {
  "focus" === a ? (Jc(), Dc = b, Ec = c, Dc.attachEvent("onpropertychange", Kc)) : "blur" === a && Jc();
}function Mc(a) {
  if ("selectionchange" === a || "keyup" === a || "keydown" === a) return Gc(Ec);
}
function Nc(a, b) {
  if ("click" === a) return Gc(b);
}function Oc(a, b) {
  if ("input" === a || "change" === a) return Gc(b);
}
var Pc = { eventTypes: Bc, _isInputEventSupported: Ic, extractEvents: function extractEvents(a, b, c, d) {
    var e = b ? Ja(b) : window,
        f = void 0,
        g = void 0,
        h = e.nodeName && e.nodeName.toLowerCase();"select" === h || "input" === h && "file" === e.type ? f = Hc : Mb(e) ? Ic ? f = Oc : (f = Mc, g = Lc) : (h = e.nodeName) && "input" === h.toLowerCase() && ("checkbox" === e.type || "radio" === e.type) && (f = Nc);if (f && (f = f(a, b))) return Cc(f, c, d);g && g(a, e, b);"blur" === a && (a = e._wrapperState) && a.controlled && "number" === e.type && zc(e, "number", e.value);
  } },
    Qc = y.extend({ view: null, detail: null }),
    Rc = { Alt: "altKey",
  Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };function Sc(a) {
  var b = this.nativeEvent;return b.getModifierState ? b.getModifierState(a) : (a = Rc[a]) ? !!b[a] : !1;
}function Tc() {
  return Sc;
}
var Uc = 0,
    Vc = 0,
    Wc = !1,
    Xc = !1,
    Yc = Qc.extend({ screenX: null, screenY: null, clientX: null, clientY: null, pageX: null, pageY: null, ctrlKey: null, shiftKey: null, altKey: null, metaKey: null, getModifierState: Tc, button: null, buttons: null, relatedTarget: function relatedTarget(a) {
    return a.relatedTarget || (a.fromElement === a.srcElement ? a.toElement : a.fromElement);
  }, movementX: function movementX(a) {
    if ("movementX" in a) return a.movementX;var b = Uc;Uc = a.screenX;return Wc ? "mousemove" === a.type ? a.screenX - b : 0 : (Wc = !0, 0);
  }, movementY: function movementY(a) {
    if ("movementY" in a) return a.movementY;
    var b = Vc;Vc = a.screenY;return Xc ? "mousemove" === a.type ? a.screenY - b : 0 : (Xc = !0, 0);
  } }),
    Zc = Yc.extend({ pointerId: null, width: null, height: null, pressure: null, tangentialPressure: null, tiltX: null, tiltY: null, twist: null, pointerType: null, isPrimary: null }),
    $c = { mouseEnter: { registrationName: "onMouseEnter", dependencies: ["mouseout", "mouseover"] }, mouseLeave: { registrationName: "onMouseLeave", dependencies: ["mouseout", "mouseover"] }, pointerEnter: { registrationName: "onPointerEnter", dependencies: ["pointerout", "pointerover"] }, pointerLeave: { registrationName: "onPointerLeave",
    dependencies: ["pointerout", "pointerover"] } },
    ad = { eventTypes: $c, extractEvents: function extractEvents(a, b, c, d) {
    var e = "mouseover" === a || "pointerover" === a,
        f = "mouseout" === a || "pointerout" === a;if (e && (c.relatedTarget || c.fromElement) || !f && !e) return null;e = d.window === d ? d : (e = d.ownerDocument) ? e.defaultView || e.parentWindow : window;f ? (f = b, b = (b = c.relatedTarget || c.toElement) ? Ha(b) : null) : f = null;if (f === b) return null;var g = void 0,
        h = void 0,
        l = void 0,
        k = void 0;if ("mouseout" === a || "mouseover" === a) g = Yc, h = $c.mouseLeave, l = $c.mouseEnter, k = "mouse";else if ("pointerout" === a || "pointerover" === a) g = Zc, h = $c.pointerLeave, l = $c.pointerEnter, k = "pointer";var m = null == f ? e : Ja(f);e = null == b ? e : Ja(b);a = g.getPooled(h, f, c, d);a.type = k + "leave";a.target = m;a.relatedTarget = e;c = g.getPooled(l, b, c, d);c.type = k + "enter";c.target = e;c.relatedTarget = m;d = b;if (f && d) a: {
      b = f;e = d;k = 0;for (g = b; g; g = La(g)) {
        k++;
      }g = 0;for (l = e; l; l = La(l)) {
        g++;
      }for (; 0 < k - g;) {
        b = La(b), k--;
      }for (; 0 < g - k;) {
        e = La(e), g--;
      }for (; k--;) {
        if (b === e || b === e.alternate) break a;b = La(b);e = La(e);
      }b = null;
    } else b = null;e = b;for (b = []; f && f !== e;) {
      k = f.alternate;if (null !== k && k === e) break;b.push(f);f = La(f);
    }for (f = []; d && d !== e;) {
      k = d.alternate;if (null !== k && k === e) break;f.push(d);d = La(d);
    }for (d = 0; d < b.length; d++) {
      Oa(b[d], "bubbled", a);
    }for (d = f.length; 0 < d--;) {
      Oa(f[d], "captured", c);
    }return [a, c];
  } };function bd(a, b) {
  return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
}var cd = Object.prototype.hasOwnProperty;
function dd(a, b) {
  if (bd(a, b)) return !0;if ("object" !== (typeof a === "undefined" ? "undefined" : _typeof(a)) || null === a || "object" !== (typeof b === "undefined" ? "undefined" : _typeof(b)) || null === b) return !1;var c = Object.keys(a),
      d = Object.keys(b);if (c.length !== d.length) return !1;for (d = 0; d < c.length; d++) {
    if (!cd.call(b, c[d]) || !bd(a[c[d]], b[c[d]])) return !1;
  }return !0;
}function ed(a) {
  var b = a;if (a.alternate) for (; b["return"];) {
    b = b["return"];
  } else {
    if (0 !== (b.effectTag & 2)) return 1;for (; b["return"];) {
      if (b = b["return"], 0 !== (b.effectTag & 2)) return 1;
    }
  }return 3 === b.tag ? 2 : 3;
}function fd(a) {
  2 !== ed(a) ? x("188") : void 0;
}
function gd(a) {
  var b = a.alternate;if (!b) return b = ed(a), 3 === b ? x("188") : void 0, 1 === b ? null : a;for (var c = a, d = b;;) {
    var e = c["return"],
        f = e ? e.alternate : null;if (!e || !f) break;if (e.child === f.child) {
      for (var g = e.child; g;) {
        if (g === c) return fd(e), a;if (g === d) return fd(e), b;g = g.sibling;
      }x("188");
    }if (c["return"] !== d["return"]) c = e, d = f;else {
      g = !1;for (var h = e.child; h;) {
        if (h === c) {
          g = !0;c = e;d = f;break;
        }if (h === d) {
          g = !0;d = e;c = f;break;
        }h = h.sibling;
      }if (!g) {
        for (h = f.child; h;) {
          if (h === c) {
            g = !0;c = f;d = e;break;
          }if (h === d) {
            g = !0;d = f;c = e;break;
          }h = h.sibling;
        }g ? void 0 : x("189");
      }
    }c.alternate !== d ? x("190") : void 0;
  }3 !== c.tag ? x("188") : void 0;return c.stateNode.current === c ? a : b;
}function hd(a) {
  a = gd(a);if (!a) return null;for (var b = a;;) {
    if (5 === b.tag || 6 === b.tag) return b;if (b.child) b.child["return"] = b, b = b.child;else {
      if (b === a) break;for (; !b.sibling;) {
        if (!b["return"] || b["return"] === a) return null;b = b["return"];
      }b.sibling["return"] = b["return"];b = b.sibling;
    }
  }return null;
}
var id = y.extend({ animationName: null, elapsedTime: null, pseudoElement: null }),
    jd = y.extend({ clipboardData: function clipboardData(a) {
    return "clipboardData" in a ? a.clipboardData : window.clipboardData;
  } }),
    kd = Qc.extend({ relatedTarget: null });function ld(a) {
  var b = a.keyCode;"charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;10 === a && (a = 13);return 32 <= a || 13 === a ? a : 0;
}
var md = { Esc: "Escape", Spacebar: " ", Left: "ArrowLeft", Up: "ArrowUp", Right: "ArrowRight", Down: "ArrowDown", Del: "Delete", Win: "OS", Menu: "ContextMenu", Apps: "ContextMenu", Scroll: "ScrollLock", MozPrintableKey: "Unidentified" },
    nd = { 8: "Backspace", 9: "Tab", 12: "Clear", 13: "Enter", 16: "Shift", 17: "Control", 18: "Alt", 19: "Pause", 20: "CapsLock", 27: "Escape", 32: " ", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "ArrowLeft", 38: "ArrowUp", 39: "ArrowRight", 40: "ArrowDown", 45: "Insert", 46: "Delete", 112: "F1", 113: "F2", 114: "F3", 115: "F4",
  116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "NumLock", 145: "ScrollLock", 224: "Meta" },
    od = Qc.extend({ key: function key(a) {
    if (a.key) {
      var b = md[a.key] || a.key;if ("Unidentified" !== b) return b;
    }return "keypress" === a.type ? (a = ld(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? nd[a.keyCode] || "Unidentified" : "";
  }, location: null, ctrlKey: null, shiftKey: null, altKey: null, metaKey: null, repeat: null, locale: null, getModifierState: Tc, charCode: function charCode(a) {
    return "keypress" === a.type ? ld(a) : 0;
  }, keyCode: function keyCode(a) {
    return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
  }, which: function which(a) {
    return "keypress" === a.type ? ld(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
  } }),
    pd = Yc.extend({ dataTransfer: null }),
    qd = Qc.extend({ touches: null, targetTouches: null, changedTouches: null, altKey: null, metaKey: null, ctrlKey: null, shiftKey: null, getModifierState: Tc }),
    rd = y.extend({ propertyName: null, elapsedTime: null, pseudoElement: null }),
    sd = Yc.extend({ deltaX: function deltaX(a) {
    return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
  }, deltaY: function deltaY(a) {
    return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
  }, deltaZ: null, deltaMode: null }),
    td = [["abort", "abort"], [Xa, "animationEnd"], [Ya, "animationIteration"], [Za, "animationStart"], ["canplay", "canPlay"], ["canplaythrough", "canPlayThrough"], ["drag", "drag"], ["dragenter", "dragEnter"], ["dragexit", "dragExit"], ["dragleave", "dragLeave"], ["dragover", "dragOver"], ["durationchange", "durationChange"], ["emptied", "emptied"], ["encrypted", "encrypted"], ["ended", "ended"], ["error", "error"], ["gotpointercapture", "gotPointerCapture"], ["load", "load"], ["loadeddata", "loadedData"], ["loadedmetadata", "loadedMetadata"], ["loadstart", "loadStart"], ["lostpointercapture", "lostPointerCapture"], ["mousemove", "mouseMove"], ["mouseout", "mouseOut"], ["mouseover", "mouseOver"], ["playing", "playing"], ["pointermove", "pointerMove"], ["pointerout", "pointerOut"], ["pointerover", "pointerOver"], ["progress", "progress"], ["scroll", "scroll"], ["seeking", "seeking"], ["stalled", "stalled"], ["suspend", "suspend"], ["timeupdate", "timeUpdate"], ["toggle", "toggle"], ["touchmove", "touchMove"], [$a, "transitionEnd"], ["waiting", "waiting"], ["wheel", "wheel"]],
    ud = {},
    vd = {};function wd(a, b) {
  var c = a[0];a = a[1];var d = "on" + (a[0].toUpperCase() + a.slice(1));b = { phasedRegistrationNames: { bubbled: d, captured: d + "Capture" }, dependencies: [c], isInteractive: b };ud[a] = b;vd[c] = b;
}
[["blur", "blur"], ["cancel", "cancel"], ["click", "click"], ["close", "close"], ["contextmenu", "contextMenu"], ["copy", "copy"], ["cut", "cut"], ["auxclick", "auxClick"], ["dblclick", "doubleClick"], ["dragend", "dragEnd"], ["dragstart", "dragStart"], ["drop", "drop"], ["focus", "focus"], ["input", "input"], ["invalid", "invalid"], ["keydown", "keyDown"], ["keypress", "keyPress"], ["keyup", "keyUp"], ["mousedown", "mouseDown"], ["mouseup", "mouseUp"], ["paste", "paste"], ["pause", "pause"], ["play", "play"], ["pointercancel", "pointerCancel"], ["pointerdown", "pointerDown"], ["pointerup", "pointerUp"], ["ratechange", "rateChange"], ["reset", "reset"], ["seeked", "seeked"], ["submit", "submit"], ["touchcancel", "touchCancel"], ["touchend", "touchEnd"], ["touchstart", "touchStart"], ["volumechange", "volumeChange"]].forEach(function (a) {
  wd(a, !0);
});td.forEach(function (a) {
  wd(a, !1);
});
var xd = { eventTypes: ud, isInteractiveTopLevelEventType: function isInteractiveTopLevelEventType(a) {
    a = vd[a];return void 0 !== a && !0 === a.isInteractive;
  }, extractEvents: function extractEvents(a, b, c, d) {
    var e = vd[a];if (!e) return null;switch (a) {case "keypress":
        if (0 === ld(c)) return null;case "keydown":case "keyup":
        a = od;break;case "blur":case "focus":
        a = kd;break;case "click":
        if (2 === c.button) return null;case "auxclick":case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":
        a = Yc;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":
        a = pd;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":
        a = qd;break;case Xa:case Ya:case Za:
        a = id;break;case $a:
        a = rd;break;case "scroll":
        a = Qc;break;case "wheel":
        a = sd;break;case "copy":case "cut":case "paste":
        a = jd;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":
        a = Zc;break;default:
        a = y;}b = a.getPooled(e, b, c, d);Qa(b);return b;
  } },
    yd = xd.isInteractiveTopLevelEventType,
    zd = [];function Ad(a) {
  var b = a.targetInst,
      c = b;do {
    if (!c) {
      a.ancestors.push(c);break;
    }var d;for (d = c; d["return"];) {
      d = d["return"];
    }d = 3 !== d.tag ? null : d.stateNode.containerInfo;if (!d) break;a.ancestors.push(c);c = Ha(d);
  } while (c);for (c = 0; c < a.ancestors.length; c++) {
    b = a.ancestors[c];var e = Nb(a.nativeEvent);d = a.topLevelType;for (var f = a.nativeEvent, g = null, h = 0; h < oa.length; h++) {
      var l = oa[h];l && (l = l.extractEvents(d, b, f, e)) && (g = xa(g, l));
    }Da(g);
  }
}var Bd = !0;
function E(a, b) {
  if (!b) return null;var c = (yd(a) ? Cd : Dd).bind(null, a);b.addEventListener(a, c, !1);
}function Ed(a, b) {
  if (!b) return null;var c = (yd(a) ? Cd : Dd).bind(null, a);b.addEventListener(a, c, !0);
}function Cd(a, b) {
  Hb(Dd, a, b);
}
function Dd(a, b) {
  if (Bd) {
    var c = Nb(b);c = Ha(c);null === c || "number" !== typeof c.tag || 2 === ed(c) || (c = null);if (zd.length) {
      var d = zd.pop();d.topLevelType = a;d.nativeEvent = b;d.targetInst = c;a = d;
    } else a = { topLevelType: a, nativeEvent: b, targetInst: c, ancestors: [] };try {
      Kb(Ad, a);
    } finally {
      a.topLevelType = null, a.nativeEvent = null, a.targetInst = null, a.ancestors.length = 0, 10 > zd.length && zd.push(a);
    }
  }
}var Fd = {},
    Gd = 0,
    Hd = "_reactListenersID" + ("" + Math.random()).slice(2);
function Id(a) {
  Object.prototype.hasOwnProperty.call(a, Hd) || (a[Hd] = Gd++, Fd[a[Hd]] = {});return Fd[a[Hd]];
}function Jd(a) {
  a = a || ("undefined" !== typeof document ? document : void 0);if ("undefined" === typeof a) return null;try {
    return a.activeElement || a.body;
  } catch (b) {
    return a.body;
  }
}function Kd(a) {
  for (; a && a.firstChild;) {
    a = a.firstChild;
  }return a;
}
function Ld(a, b) {
  var c = Kd(a);a = 0;for (var d; c;) {
    if (3 === c.nodeType) {
      d = a + c.textContent.length;if (a <= b && d >= b) return { node: c, offset: b - a };a = d;
    }a: {
      for (; c;) {
        if (c.nextSibling) {
          c = c.nextSibling;break a;
        }c = c.parentNode;
      }c = void 0;
    }c = Kd(c);
  }
}function Md(a, b) {
  return a && b ? a === b ? !0 : a && 3 === a.nodeType ? !1 : b && 3 === b.nodeType ? Md(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : !1 : !1;
}
function Nd() {
  for (var a = window, b = Jd(); b instanceof a.HTMLIFrameElement;) {
    try {
      var c = "string" === typeof b.contentWindow.location.href;
    } catch (d) {
      c = !1;
    }if (c) a = b.contentWindow;else break;b = Jd(a.document);
  }return b;
}function Od(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
}
function Pd() {
  var a = Nd();if (Od(a)) {
    if ("selectionStart" in a) var b = { start: a.selectionStart, end: a.selectionEnd };else a: {
      b = (b = a.ownerDocument) && b.defaultView || window;var c = b.getSelection && b.getSelection();if (c && 0 !== c.rangeCount) {
        b = c.anchorNode;var d = c.anchorOffset,
            e = c.focusNode;c = c.focusOffset;try {
          b.nodeType, e.nodeType;
        } catch (A) {
          b = null;break a;
        }var f = 0,
            g = -1,
            h = -1,
            l = 0,
            k = 0,
            m = a,
            p = null;b: for (;;) {
          for (var t;;) {
            m !== b || 0 !== d && 3 !== m.nodeType || (g = f + d);m !== e || 0 !== c && 3 !== m.nodeType || (h = f + c);3 === m.nodeType && (f += m.nodeValue.length);
            if (null === (t = m.firstChild)) break;p = m;m = t;
          }for (;;) {
            if (m === a) break b;p === b && ++l === d && (g = f);p === e && ++k === c && (h = f);if (null !== (t = m.nextSibling)) break;m = p;p = m.parentNode;
          }m = t;
        }b = -1 === g || -1 === h ? null : { start: g, end: h };
      } else b = null;
    }b = b || { start: 0, end: 0 };
  } else b = null;return { focusedElem: a, selectionRange: b };
}
function Qd(a) {
  var b = Nd(),
      c = a.focusedElem,
      d = a.selectionRange;if (b !== c && c && c.ownerDocument && Md(c.ownerDocument.documentElement, c)) {
    if (null !== d && Od(c)) if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c) c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
      a = a.getSelection();var e = c.textContent.length,
          f = Math.min(d.start, e);d = void 0 === d.end ? f : Math.min(d.end, e);!a.extend && f > d && (e = d, d = f, f = e);e = Ld(c, f);var g = Ld(c, d);e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
    }b = [];for (a = c; a = a.parentNode;) {
      1 === a.nodeType && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
    }"function" === typeof c.focus && c.focus();for (c = 0; c < b.length; c++) {
      a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
    }
  }
}
var Rd = Ra && "documentMode" in document && 11 >= document.documentMode,
    Sd = { select: { phasedRegistrationNames: { bubbled: "onSelect", captured: "onSelectCapture" }, dependencies: "blur contextmenu dragend focus keydown keyup mousedown mouseup selectionchange".split(" ") } },
    Td = null,
    Ud = null,
    Vd = null,
    Wd = !1;
function Xd(a, b) {
  var c = b.window === b ? b.document : 9 === b.nodeType ? b : b.ownerDocument;if (Wd || null == Td || Td !== Jd(c)) return null;c = Td;"selectionStart" in c && Od(c) ? c = { start: c.selectionStart, end: c.selectionEnd } : (c = (c.ownerDocument && c.ownerDocument.defaultView || window).getSelection(), c = { anchorNode: c.anchorNode, anchorOffset: c.anchorOffset, focusNode: c.focusNode, focusOffset: c.focusOffset });return Vd && dd(Vd, c) ? null : (Vd = c, a = y.getPooled(Sd.select, Ud, a, b), a.type = "select", a.target = Td, Qa(a), a);
}
var Yd = { eventTypes: Sd, extractEvents: function extractEvents(a, b, c, d) {
    var e = d.window === d ? d.document : 9 === d.nodeType ? d : d.ownerDocument,
        f;if (!(f = !e)) {
      a: {
        e = Id(e);f = sa.onSelect;for (var g = 0; g < f.length; g++) {
          var h = f[g];if (!e.hasOwnProperty(h) || !e[h]) {
            e = !1;break a;
          }
        }e = !0;
      }f = !e;
    }if (f) return null;e = b ? Ja(b) : window;switch (a) {case "focus":
        if (Mb(e) || "true" === e.contentEditable) Td = e, Ud = b, Vd = null;break;case "blur":
        Vd = Ud = Td = null;break;case "mousedown":
        Wd = !0;break;case "contextmenu":case "mouseup":case "dragend":
        return Wd = !1, Xd(c, d);case "selectionchange":
        if (Rd) break;
      case "keydown":case "keyup":
        return Xd(c, d);}return null;
  } };Ba.injectEventPluginOrder("ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" "));ta = Ka;ua = Ia;va = Ja;Ba.injectEventPluginsByName({ SimpleEventPlugin: xd, EnterLeaveEventPlugin: ad, ChangeEventPlugin: Pc, SelectEventPlugin: Yd, BeforeInputEventPlugin: zb });function Zd(a) {
  var b = "";aa.Children.forEach(a, function (a) {
    null != a && (b += a);
  });return b;
}
function $d(a, b) {
  a = n({ children: void 0 }, b);if (b = Zd(b.children)) a.children = b;return a;
}function ae(a, b, c, d) {
  a = a.options;if (b) {
    b = {};for (var e = 0; e < c.length; e++) {
      b["$" + c[e]] = !0;
    }for (c = 0; c < a.length; c++) {
      e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = !0);
    }
  } else {
    c = "" + uc(c);b = null;for (e = 0; e < a.length; e++) {
      if (a[e].value === c) {
        a[e].selected = !0;d && (a[e].defaultSelected = !0);return;
      }null !== b || a[e].disabled || (b = a[e]);
    }null !== b && (b.selected = !0);
  }
}
function be(a, b) {
  null != b.dangerouslySetInnerHTML ? x("91") : void 0;return n({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
}function ce(a, b) {
  var c = b.value;null == c && (c = b.defaultValue, b = b.children, null != b && (null != c ? x("92") : void 0, Array.isArray(b) && (1 >= b.length ? void 0 : x("93"), b = b[0]), c = b), null == c && (c = ""));a._wrapperState = { initialValue: uc(c) };
}
function de(a, b) {
  var c = uc(b.value),
      d = uc(b.defaultValue);null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));null != d && (a.defaultValue = "" + d);
}function ee(a) {
  var b = a.textContent;b === a._wrapperState.initialValue && (a.value = b);
}var fe = { html: "http://www.w3.org/1999/xhtml", mathml: "http://www.w3.org/1998/Math/MathML", svg: "http://www.w3.org/2000/svg" };
function ge(a) {
  switch (a) {case "svg":
      return "http://www.w3.org/2000/svg";case "math":
      return "http://www.w3.org/1998/Math/MathML";default:
      return "http://www.w3.org/1999/xhtml";}
}function he(a, b) {
  return null == a || "http://www.w3.org/1999/xhtml" === a ? ge(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
}
var ie = void 0,
    je = function (a) {
  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function (b, c, d, e) {
    MSApp.execUnsafeLocalFunction(function () {
      return a(b, c, d, e);
    });
  } : a;
}(function (a, b) {
  if (a.namespaceURI !== fe.svg || "innerHTML" in a) a.innerHTML = b;else {
    ie = ie || document.createElement("div");ie.innerHTML = "<svg>" + b + "</svg>";for (b = ie.firstChild; a.firstChild;) {
      a.removeChild(a.firstChild);
    }for (; b.firstChild;) {
      a.appendChild(b.firstChild);
    }
  }
});
function ke(a, b) {
  if (b) {
    var c = a.firstChild;if (c && c === a.lastChild && 3 === c.nodeType) {
      c.nodeValue = b;return;
    }
  }a.textContent = b;
}
var le = { animationIterationCount: !0, borderImageOutset: !0, borderImageSlice: !0, borderImageWidth: !0, boxFlex: !0, boxFlexGroup: !0, boxOrdinalGroup: !0, columnCount: !0, columns: !0, flex: !0, flexGrow: !0, flexPositive: !0, flexShrink: !0, flexNegative: !0, flexOrder: !0, gridArea: !0, gridRow: !0, gridRowEnd: !0, gridRowSpan: !0, gridRowStart: !0, gridColumn: !0, gridColumnEnd: !0, gridColumnSpan: !0, gridColumnStart: !0, fontWeight: !0, lineClamp: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, tabSize: !0, widows: !0, zIndex: !0, zoom: !0, fillOpacity: !0,
  floodOpacity: !0, stopOpacity: !0, strokeDasharray: !0, strokeDashoffset: !0, strokeMiterlimit: !0, strokeOpacity: !0, strokeWidth: !0 },
    me = ["Webkit", "ms", "Moz", "O"];Object.keys(le).forEach(function (a) {
  me.forEach(function (b) {
    b = b + a.charAt(0).toUpperCase() + a.substring(1);le[b] = le[a];
  });
});function ne(a, b, c) {
  return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || le.hasOwnProperty(a) && le[a] ? ("" + b).trim() : b + "px";
}
function oe(a, b) {
  a = a.style;for (var c in b) {
    if (b.hasOwnProperty(c)) {
      var d = 0 === c.indexOf("--"),
          e = ne(c, b[c], d);"float" === c && (c = "cssFloat");d ? a.setProperty(c, e) : a[c] = e;
    }
  }
}var pe = n({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function qe(a, b) {
  b && (pe[a] && (null != b.children || null != b.dangerouslySetInnerHTML ? x("137", a, "") : void 0), null != b.dangerouslySetInnerHTML && (null != b.children ? x("60") : void 0, "object" === _typeof(b.dangerouslySetInnerHTML) && "__html" in b.dangerouslySetInnerHTML ? void 0 : x("61")), null != b.style && "object" !== _typeof(b.style) ? x("62", "") : void 0);
}
function re(a, b) {
  if (-1 === a.indexOf("-")) return "string" === typeof b.is;switch (a) {case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":
      return !1;default:
      return !0;}
}
function se(a, b) {
  a = 9 === a.nodeType || 11 === a.nodeType ? a : a.ownerDocument;var c = Id(a);b = sa[b];for (var d = 0; d < b.length; d++) {
    var e = b[d];if (!c.hasOwnProperty(e) || !c[e]) {
      switch (e) {case "scroll":
          Ed("scroll", a);break;case "focus":case "blur":
          Ed("focus", a);Ed("blur", a);c.blur = !0;c.focus = !0;break;case "cancel":case "close":
          Ob(e) && Ed(e, a);break;case "invalid":case "submit":case "reset":
          break;default:
          -1 === ab.indexOf(e) && E(e, a);}c[e] = !0;
    }
  }
}function te() {}var ue = null,
    ve = null;
function we(a, b) {
  switch (a) {case "button":case "input":case "select":case "textarea":
      return !!b.autoFocus;}return !1;
}function xe(a, b) {
  return "textarea" === a || "option" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === _typeof(b.dangerouslySetInnerHTML) && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
}
var ye = "function" === typeof setTimeout ? setTimeout : void 0,
    ze = "function" === typeof clearTimeout ? clearTimeout : void 0,
    Ae = r.unstable_scheduleCallback,
    Be = r.unstable_cancelCallback;
function Ce(a, b, c, d, e) {
  a[Ga] = e;"input" === c && "radio" === e.type && null != e.name && xc(a, e);re(c, d);d = re(c, e);for (var f = 0; f < b.length; f += 2) {
    var g = b[f],
        h = b[f + 1];"style" === g ? oe(a, h) : "dangerouslySetInnerHTML" === g ? je(a, h) : "children" === g ? ke(a, h) : tc(a, g, h, d);
  }switch (c) {case "input":
      yc(a, e);break;case "textarea":
      de(a, e);break;case "select":
      b = a._wrapperState.wasMultiple, a._wrapperState.wasMultiple = !!e.multiple, c = e.value, null != c ? ae(a, !!e.multiple, c, !1) : b !== !!e.multiple && (null != e.defaultValue ? ae(a, !!e.multiple, e.defaultValue, !0) : ae(a, !!e.multiple, e.multiple ? [] : "", !1));}
}function De(a) {
  for (a = a.nextSibling; a && 1 !== a.nodeType && 3 !== a.nodeType;) {
    a = a.nextSibling;
  }return a;
}function Ee(a) {
  for (a = a.firstChild; a && 1 !== a.nodeType && 3 !== a.nodeType;) {
    a = a.nextSibling;
  }return a;
}new Set();var Fe = [],
    Ge = -1;function F(a) {
  0 > Ge || (a.current = Fe[Ge], Fe[Ge] = null, Ge--);
}function G(a, b) {
  Ge++;Fe[Ge] = a.current;a.current = b;
}var He = {},
    H = { current: He },
    I = { current: !1 },
    Ie = He;
function Je(a, b) {
  var c = a.type.contextTypes;if (!c) return He;var d = a.stateNode;if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;var e = {},
      f;for (f in c) {
    e[f] = b[f];
  }d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);return e;
}function J(a) {
  a = a.childContextTypes;return null !== a && void 0 !== a;
}function Ke(a) {
  F(I, a);F(H, a);
}function Le(a) {
  F(I, a);F(H, a);
}
function Me(a, b, c) {
  H.current !== He ? x("168") : void 0;G(H, b, a);G(I, c, a);
}function Ne(a, b, c) {
  var d = a.stateNode;a = b.childContextTypes;if ("function" !== typeof d.getChildContext) return c;d = d.getChildContext();for (var e in d) {
    e in a ? void 0 : x("108", ic(b) || "Unknown", e);
  }return n({}, c, d);
}function Oe(a) {
  var b = a.stateNode;b = b && b.__reactInternalMemoizedMergedChildContext || He;Ie = H.current;G(H, b, a);G(I, I.current, a);return !0;
}
function Pe(a, b, c) {
  var d = a.stateNode;d ? void 0 : x("169");c ? (b = Ne(a, b, Ie), d.__reactInternalMemoizedMergedChildContext = b, F(I, a), F(H, a), G(H, b, a)) : F(I, a);G(I, c, a);
}var Qe = null,
    Re = null;function Se(a) {
  return function (b) {
    try {
      return a(b);
    } catch (c) {}
  };
}
function Te(a) {
  if ("undefined" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return !1;var b = __REACT_DEVTOOLS_GLOBAL_HOOK__;if (b.isDisabled || !b.supportsFiber) return !0;try {
    var c = b.inject(a);Qe = Se(function (a) {
      return b.onCommitFiberRoot(c, a);
    });Re = Se(function (a) {
      return b.onCommitFiberUnmount(c, a);
    });
  } catch (d) {}return !0;
}
function Ue(a, b, c, d) {
  this.tag = a;this.key = c;this.sibling = this.child = this["return"] = this.stateNode = this.type = this.elementType = null;this.index = 0;this.ref = null;this.pendingProps = b;this.contextDependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;this.mode = d;this.effectTag = 0;this.lastEffect = this.firstEffect = this.nextEffect = null;this.childExpirationTime = this.expirationTime = 0;this.alternate = null;
}function K(a, b, c, d) {
  return new Ue(a, b, c, d);
}
function Ve(a) {
  a = a.prototype;return !(!a || !a.isReactComponent);
}function We(a) {
  if ("function" === typeof a) return Ve(a) ? 1 : 0;if (void 0 !== a && null !== a) {
    a = a.$$typeof;if (a === cc) return 11;if (a === ec) return 14;
  }return 2;
}
function Xe(a, b) {
  var c = a.alternate;null === c ? (c = K(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.effectTag = 0, c.nextEffect = null, c.firstEffect = null, c.lastEffect = null);c.childExpirationTime = a.childExpirationTime;c.expirationTime = a.expirationTime;c.child = a.child;c.memoizedProps = a.memoizedProps;c.memoizedState = a.memoizedState;c.updateQueue = a.updateQueue;c.contextDependencies = a.contextDependencies;c.sibling = a.sibling;
  c.index = a.index;c.ref = a.ref;return c;
}
function Ye(a, b, c, d, e, f) {
  var g = 2;d = a;if ("function" === typeof a) Ve(a) && (g = 1);else if ("string" === typeof a) g = 5;else a: switch (a) {case Xb:
      return Ze(c.children, e, f, b);case bc:
      return $e(c, e | 3, f, b);case Yb:
      return $e(c, e | 2, f, b);case Zb:
      return a = K(12, c, b, e | 4), a.elementType = Zb, a.type = Zb, a.expirationTime = f, a;case dc:
      return a = K(13, c, b, e), a.elementType = dc, a.type = dc, a.expirationTime = f, a;default:
      if ("object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && null !== a) switch (a.$$typeof) {case $b:
          g = 10;break a;case ac:
          g = 9;break a;case cc:
          g = 11;break a;case ec:
          g = 14;break a;case fc:
          g = 16;d = null;break a;}x("130", null == a ? a : typeof a === "undefined" ? "undefined" : _typeof(a), "");}b = K(g, c, b, e);b.elementType = a;b.type = d;b.expirationTime = f;return b;
}function Ze(a, b, c, d) {
  a = K(7, a, d, b);a.expirationTime = c;return a;
}function $e(a, b, c, d) {
  a = K(8, a, d, b);b = 0 === (b & 1) ? Yb : bc;a.elementType = b;a.type = b;a.expirationTime = c;return a;
}function af(a, b, c) {
  a = K(6, a, null, b);a.expirationTime = c;return a;
}
function bf(a, b, c) {
  b = K(4, null !== a.children ? a.children : [], a.key, b);b.expirationTime = c;b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };return b;
}function cf(a, b) {
  a.didError = !1;var c = a.earliestPendingTime;0 === c ? a.earliestPendingTime = a.latestPendingTime = b : c < b ? a.earliestPendingTime = b : a.latestPendingTime > b && (a.latestPendingTime = b);df(b, a);
}
function ef(a, b) {
  a.didError = !1;if (0 === b) a.earliestPendingTime = 0, a.latestPendingTime = 0, a.earliestSuspendedTime = 0, a.latestSuspendedTime = 0, a.latestPingedTime = 0;else {
    b < a.latestPingedTime && (a.latestPingedTime = 0);var c = a.latestPendingTime;0 !== c && (c > b ? a.earliestPendingTime = a.latestPendingTime = 0 : a.earliestPendingTime > b && (a.earliestPendingTime = a.latestPendingTime));c = a.earliestSuspendedTime;0 === c ? cf(a, b) : b < a.latestSuspendedTime ? (a.earliestSuspendedTime = 0, a.latestSuspendedTime = 0, a.latestPingedTime = 0, cf(a, b)) : b > c && cf(a, b);
  }df(0, a);
}function ff(a, b) {
  a.didError = !1;a.latestPingedTime >= b && (a.latestPingedTime = 0);var c = a.earliestPendingTime,
      d = a.latestPendingTime;c === b ? a.earliestPendingTime = d === b ? a.latestPendingTime = 0 : d : d === b && (a.latestPendingTime = c);c = a.earliestSuspendedTime;d = a.latestSuspendedTime;0 === c ? a.earliestSuspendedTime = a.latestSuspendedTime = b : c < b ? a.earliestSuspendedTime = b : d > b && (a.latestSuspendedTime = b);df(b, a);
}
function gf(a, b) {
  var c = a.earliestPendingTime;a = a.earliestSuspendedTime;c > b && (b = c);a > b && (b = a);return b;
}function df(a, b) {
  var c = b.earliestSuspendedTime,
      d = b.latestSuspendedTime,
      e = b.earliestPendingTime,
      f = b.latestPingedTime;e = 0 !== e ? e : f;0 === e && (0 === a || d < a) && (e = d);a = e;0 !== a && c > a && (a = c);b.nextExpirationTimeToWorkOn = e;b.expirationTime = a;
}function L(a, b) {
  if (a && a.defaultProps) {
    b = n({}, b);a = a.defaultProps;for (var c in a) {
      void 0 === b[c] && (b[c] = a[c]);
    }
  }return b;
}
function hf(a) {
  var b = a._result;switch (a._status) {case 1:
      return b;case 2:
      throw b;case 0:
      throw b;default:
      a._status = 0;b = a._ctor;b = b();b.then(function (b) {
        0 === a._status && (b = b["default"], a._status = 1, a._result = b);
      }, function (b) {
        0 === a._status && (a._status = 2, a._result = b);
      });switch (a._status) {case 1:
          return a._result;case 2:
          throw a._result;}a._result = b;throw b;}
}var jf = new aa.Component().refs;
function kf(a, b, c, d) {
  b = a.memoizedState;c = c(d, b);c = null === c || void 0 === c ? b : n({}, b, c);a.memoizedState = c;d = a.updateQueue;null !== d && 0 === a.expirationTime && (d.baseState = c);
}
var tf = { isMounted: function isMounted(a) {
    return (a = a._reactInternalFiber) ? 2 === ed(a) : !1;
  }, enqueueSetState: function enqueueSetState(a, b, c) {
    a = a._reactInternalFiber;var d = lf();d = mf(d, a);var e = nf(d);e.payload = b;void 0 !== c && null !== c && (e.callback = c);of();pf(a, e);qf(a, d);
  }, enqueueReplaceState: function enqueueReplaceState(a, b, c) {
    a = a._reactInternalFiber;var d = lf();d = mf(d, a);var e = nf(d);e.tag = rf;e.payload = b;void 0 !== c && null !== c && (e.callback = c);of();pf(a, e);qf(a, d);
  }, enqueueForceUpdate: function enqueueForceUpdate(a, b) {
    a = a._reactInternalFiber;var c = lf();c = mf(c, a);var d = nf(c);d.tag = sf;void 0 !== b && null !== b && (d.callback = b);of();pf(a, d);qf(a, c);
  } };function uf(a, b, c, d, e, f, g) {
  a = a.stateNode;return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !dd(c, d) || !dd(e, f) : !0;
}
function vf(a, b, c) {
  var d = !1,
      e = He;var f = b.contextType;"object" === (typeof f === "undefined" ? "undefined" : _typeof(f)) && null !== f ? f = M(f) : (e = J(b) ? Ie : H.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? Je(a, e) : He);b = new b(c, f);a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;b.updater = tf;a.stateNode = b;b._reactInternalFiber = a;d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);return b;
}
function wf(a, b, c, d) {
  a = b.state;"function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);"function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);b.state !== a && tf.enqueueReplaceState(b, b.state, null);
}
function xf(a, b, c, d) {
  var e = a.stateNode;e.props = c;e.state = a.memoizedState;e.refs = jf;var f = b.contextType;"object" === (typeof f === "undefined" ? "undefined" : _typeof(f)) && null !== f ? e.context = M(f) : (f = J(b) ? Ie : H.current, e.context = Je(a, f));f = a.updateQueue;null !== f && (yf(a, f, c, e, d), e.state = a.memoizedState);f = b.getDerivedStateFromProps;"function" === typeof f && (kf(a, b, f, c), e.state = a.memoizedState);"function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && tf.enqueueReplaceState(e, e.state, null), f = a.updateQueue, null !== f && (yf(a, f, c, e, d), e.state = a.memoizedState));"function" === typeof e.componentDidMount && (a.effectTag |= 4);
}var zf = Array.isArray;
function Af(a, b, c) {
  a = c.ref;if (null !== a && "function" !== typeof a && "object" !== (typeof a === "undefined" ? "undefined" : _typeof(a))) {
    if (c._owner) {
      c = c._owner;var d = void 0;c && (1 !== c.tag ? x("309") : void 0, d = c.stateNode);d ? void 0 : x("147", a);var e = "" + a;if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === e) return b.ref;b = function b(a) {
        var b = d.refs;b === jf && (b = d.refs = {});null === a ? delete b[e] : b[e] = a;
      };b._stringRef = e;return b;
    }"string" !== typeof a ? x("284") : void 0;c._owner ? void 0 : x("290", a);
  }return a;
}
function Bf(a, b) {
  "textarea" !== a.type && x("31", "[object Object]" === Object.prototype.toString.call(b) ? "object with keys {" + Object.keys(b).join(", ") + "}" : b, "");
}
function Cf(a) {
  function b(b, c) {
    if (a) {
      var d = b.lastEffect;null !== d ? (d.nextEffect = c, b.lastEffect = c) : b.firstEffect = b.lastEffect = c;c.nextEffect = null;c.effectTag = 8;
    }
  }function c(c, d) {
    if (!a) return null;for (; null !== d;) {
      b(c, d), d = d.sibling;
    }return null;
  }function d(a, b) {
    for (a = new Map(); null !== b;) {
      null !== b.key ? a.set(b.key, b) : a.set(b.index, b), b = b.sibling;
    }return a;
  }function e(a, b, c) {
    a = Xe(a, b, c);a.index = 0;a.sibling = null;return a;
  }function f(b, c, d) {
    b.index = d;if (!a) return c;d = b.alternate;if (null !== d) return d = d.index, d < c ? (b.effectTag = 2, c) : d;b.effectTag = 2;return c;
  }function g(b) {
    a && null === b.alternate && (b.effectTag = 2);return b;
  }function h(a, b, c, d) {
    if (null === b || 6 !== b.tag) return b = af(c, a.mode, d), b["return"] = a, b;b = e(b, c, d);b["return"] = a;return b;
  }function l(a, b, c, d) {
    if (null !== b && b.elementType === c.type) return d = e(b, c.props, d), d.ref = Af(a, b, c), d["return"] = a, d;d = Ye(c.type, c.key, c.props, null, a.mode, d);d.ref = Af(a, b, c);d["return"] = a;return d;
  }function k(a, b, c, d) {
    if (null === b || 4 !== b.tag || b.stateNode.containerInfo !== c.containerInfo || b.stateNode.implementation !== c.implementation) return b = bf(c, a.mode, d), b["return"] = a, b;b = e(b, c.children || [], d);b["return"] = a;return b;
  }function m(a, b, c, d, f) {
    if (null === b || 7 !== b.tag) return b = Ze(c, a.mode, d, f), b["return"] = a, b;b = e(b, c, d);b["return"] = a;return b;
  }function p(a, b, c) {
    if ("string" === typeof b || "number" === typeof b) return b = af("" + b, a.mode, c), b["return"] = a, b;if ("object" === (typeof b === "undefined" ? "undefined" : _typeof(b)) && null !== b) {
      switch (b.$$typeof) {case Vb:
          return c = Ye(b.type, b.key, b.props, null, a.mode, c), c.ref = Af(a, null, b), c["return"] = a, c;case Wb:
          return b = bf(b, a.mode, c), b["return"] = a, b;}if (zf(b) || hc(b)) return b = Ze(b, a.mode, c, null), b["return"] = a, b;Bf(a, b);
    }return null;
  }function t(a, b, c, d) {
    var e = null !== b ? b.key : null;if ("string" === typeof c || "number" === typeof c) return null !== e ? null : h(a, b, "" + c, d);if ("object" === (typeof c === "undefined" ? "undefined" : _typeof(c)) && null !== c) {
      switch (c.$$typeof) {case Vb:
          return c.key === e ? c.type === Xb ? m(a, b, c.props.children, d, e) : l(a, b, c, d) : null;case Wb:
          return c.key === e ? k(a, b, c, d) : null;}if (zf(c) || hc(c)) return null !== e ? null : m(a, b, c, d, null);Bf(a, c);
    }return null;
  }function A(a, b, c, d, e) {
    if ("string" === typeof d || "number" === typeof d) return a = a.get(c) || null, h(b, a, "" + d, e);if ("object" === (typeof d === "undefined" ? "undefined" : _typeof(d)) && null !== d) {
      switch (d.$$typeof) {case Vb:
          return a = a.get(null === d.key ? c : d.key) || null, d.type === Xb ? m(b, a, d.props.children, e, d.key) : l(b, a, d, e);case Wb:
          return a = a.get(null === d.key ? c : d.key) || null, k(b, a, d, e);}if (zf(d) || hc(d)) return a = a.get(c) || null, m(b, a, d, e, null);Bf(b, d);
    }return null;
  }function v(e, g, h, k) {
    for (var l = null, m = null, q = g, u = g = 0, B = null; null !== q && u < h.length; u++) {
      q.index > u ? (B = q, q = null) : B = q.sibling;var w = t(e, q, h[u], k);if (null === w) {
        null === q && (q = B);break;
      }a && q && null === w.alternate && b(e, q);g = f(w, g, u);null === m ? l = w : m.sibling = w;m = w;q = B;
    }if (u === h.length) return c(e, q), l;if (null === q) {
      for (; u < h.length; u++) {
        if (q = p(e, h[u], k)) g = f(q, g, u), null === m ? l = q : m.sibling = q, m = q;
      }return l;
    }for (q = d(e, q); u < h.length; u++) {
      if (B = A(q, e, u, h[u], k)) a && null !== B.alternate && q["delete"](null === B.key ? u : B.key), g = f(B, g, u), null === m ? l = B : m.sibling = B, m = B;
    }a && q.forEach(function (a) {
      return b(e, a);
    });return l;
  }function R(e, g, h, k) {
    var l = hc(h);"function" !== typeof l ? x("150") : void 0;h = l.call(h);null == h ? x("151") : void 0;
    for (var m = l = null, q = g, u = g = 0, B = null, w = h.next(); null !== q && !w.done; u++, w = h.next()) {
      q.index > u ? (B = q, q = null) : B = q.sibling;var v = t(e, q, w.value, k);if (null === v) {
        q || (q = B);break;
      }a && q && null === v.alternate && b(e, q);g = f(v, g, u);null === m ? l = v : m.sibling = v;m = v;q = B;
    }if (w.done) return c(e, q), l;if (null === q) {
      for (; !w.done; u++, w = h.next()) {
        w = p(e, w.value, k), null !== w && (g = f(w, g, u), null === m ? l = w : m.sibling = w, m = w);
      }return l;
    }for (q = d(e, q); !w.done; u++, w = h.next()) {
      w = A(q, e, u, w.value, k), null !== w && (a && null !== w.alternate && q["delete"](null === w.key ? u : w.key), g = f(w, g, u), null === m ? l = w : m.sibling = w, m = w);
    }a && q.forEach(function (a) {
      return b(e, a);
    });return l;
  }return function (a, d, f, h) {
    var k = "object" === (typeof f === "undefined" ? "undefined" : _typeof(f)) && null !== f && f.type === Xb && null === f.key;k && (f = f.props.children);var l = "object" === (typeof f === "undefined" ? "undefined" : _typeof(f)) && null !== f;if (l) switch (f.$$typeof) {case Vb:
        a: {
          l = f.key;for (k = d; null !== k;) {
            if (k.key === l) {
              if (7 === k.tag ? f.type === Xb : k.elementType === f.type) {
                c(a, k.sibling);d = e(k, f.type === Xb ? f.props.children : f.props, h);d.ref = Af(a, k, f);d["return"] = a;a = d;break a;
              } else {
                c(a, k);break;
              }
            } else b(a, k);k = k.sibling;
          }f.type === Xb ? (d = Ze(f.props.children, a.mode, h, f.key), d["return"] = a, a = d) : (h = Ye(f.type, f.key, f.props, null, a.mode, h), h.ref = Af(a, d, f), h["return"] = a, a = h);
        }return g(a);case Wb:
        a: {
          for (k = f.key; null !== d;) {
            if (d.key === k) {
              if (4 === d.tag && d.stateNode.containerInfo === f.containerInfo && d.stateNode.implementation === f.implementation) {
                c(a, d.sibling);d = e(d, f.children || [], h);d["return"] = a;a = d;break a;
              } else {
                c(a, d);break;
              }
            } else b(a, d);d = d.sibling;
          }d = bf(f, a.mode, h);d["return"] = a;a = d;
        }return g(a);}if ("string" === typeof f || "number" === typeof f) return f = "" + f, null !== d && 6 === d.tag ? (c(a, d.sibling), d = e(d, f, h), d["return"] = a, a = d) : (c(a, d), d = af(f, a.mode, h), d["return"] = a, a = d), g(a);if (zf(f)) return v(a, d, f, h);if (hc(f)) return R(a, d, f, h);l && Bf(a, f);if ("undefined" === typeof f && !k) switch (a.tag) {case 1:case 0:
        h = a.type, x("152", h.displayName || h.name || "Component");}return c(a, d);
  };
}var Df = Cf(!0),
    Ef = Cf(!1),
    Ff = {},
    N = { current: Ff },
    Gf = { current: Ff },
    Hf = { current: Ff };function If(a) {
  a === Ff ? x("174") : void 0;return a;
}
function Jf(a, b) {
  G(Hf, b, a);G(Gf, a, a);G(N, Ff, a);var c = b.nodeType;switch (c) {case 9:case 11:
      b = (b = b.documentElement) ? b.namespaceURI : he(null, "");break;default:
      c = 8 === c ? b.parentNode : b, b = c.namespaceURI || null, c = c.tagName, b = he(b, c);}F(N, a);G(N, b, a);
}function Kf(a) {
  F(N, a);F(Gf, a);F(Hf, a);
}function Lf(a) {
  If(Hf.current);var b = If(N.current);var c = he(b, a.type);b !== c && (G(Gf, a, a), G(N, c, a));
}function Mf(a) {
  Gf.current === a && (F(N, a), F(Gf, a));
}
var Nf = 0,
    Of = 2,
    Pf = 4,
    Qf = 8,
    Rf = 16,
    Sf = 32,
    Tf = 64,
    Uf = 128,
    Vf = Tb.ReactCurrentDispatcher,
    Wf = 0,
    Xf = null,
    O = null,
    P = null,
    Yf = null,
    Q = null,
    Zf = null,
    $f = 0,
    ag = null,
    bg = 0,
    cg = !1,
    dg = null,
    eg = 0;function fg() {
  x("321");
}function gg(a, b) {
  if (null === b) return !1;for (var c = 0; c < b.length && c < a.length; c++) {
    if (!bd(a[c], b[c])) return !1;
  }return !0;
}
function hg(a, b, c, d, e, f) {
  Wf = f;Xf = b;P = null !== a ? a.memoizedState : null;Vf.current = null === P ? ig : jg;b = c(d, e);if (cg) {
    do {
      cg = !1, eg += 1, P = null !== a ? a.memoizedState : null, Zf = Yf, ag = Q = O = null, Vf.current = jg, b = c(d, e);
    } while (cg);dg = null;eg = 0;
  }Vf.current = kg;a = Xf;a.memoizedState = Yf;a.expirationTime = $f;a.updateQueue = ag;a.effectTag |= bg;a = null !== O && null !== O.next;Wf = 0;Zf = Q = Yf = P = O = Xf = null;$f = 0;ag = null;bg = 0;a ? x("300") : void 0;return b;
}function lg() {
  Vf.current = kg;Wf = 0;Zf = Q = Yf = P = O = Xf = null;$f = 0;ag = null;bg = 0;cg = !1;dg = null;eg = 0;
}
function mg() {
  var a = { memoizedState: null, baseState: null, queue: null, baseUpdate: null, next: null };null === Q ? Yf = Q = a : Q = Q.next = a;return Q;
}function ng() {
  if (null !== Zf) Q = Zf, Zf = Q.next, O = P, P = null !== O ? O.next : null;else {
    null === P ? x("310") : void 0;O = P;var a = { memoizedState: O.memoizedState, baseState: O.baseState, queue: O.queue, baseUpdate: O.baseUpdate, next: null };Q = null === Q ? Yf = a : Q.next = a;P = O.next;
  }return Q;
}function og(a, b) {
  return "function" === typeof b ? b(a) : b;
}
function pg(a) {
  var b = ng(),
      c = b.queue;null === c ? x("311") : void 0;c.lastRenderedReducer = a;if (0 < eg) {
    var d = c.dispatch;if (null !== dg) {
      var e = dg.get(c);if (void 0 !== e) {
        dg["delete"](c);var f = b.memoizedState;do {
          f = a(f, e.action), e = e.next;
        } while (null !== e);bd(f, b.memoizedState) || (qg = !0);b.memoizedState = f;b.baseUpdate === c.last && (b.baseState = f);c.lastRenderedState = f;return [f, d];
      }
    }return [b.memoizedState, d];
  }d = c.last;var g = b.baseUpdate;f = b.baseState;null !== g ? (null !== d && (d.next = null), d = g.next) : d = null !== d ? d.next : null;if (null !== d) {
    var h = e = null,
        l = d,
        k = !1;do {
      var m = l.expirationTime;m < Wf ? (k || (k = !0, h = g, e = f), m > $f && ($f = m)) : f = l.eagerReducer === a ? l.eagerState : a(f, l.action);g = l;l = l.next;
    } while (null !== l && l !== d);k || (h = g, e = f);bd(f, b.memoizedState) || (qg = !0);b.memoizedState = f;b.baseUpdate = h;b.baseState = e;c.lastRenderedState = f;
  }return [b.memoizedState, c.dispatch];
}
function rg(a, b, c, d) {
  a = { tag: a, create: b, destroy: c, deps: d, next: null };null === ag ? (ag = { lastEffect: null }, ag.lastEffect = a.next = a) : (b = ag.lastEffect, null === b ? ag.lastEffect = a.next = a : (c = b.next, b.next = a, a.next = c, ag.lastEffect = a));return a;
}function sg(a, b, c, d) {
  var e = mg();bg |= a;e.memoizedState = rg(b, c, void 0, void 0 === d ? null : d);
}
function tg(a, b, c, d) {
  var e = ng();d = void 0 === d ? null : d;var f = void 0;if (null !== O) {
    var g = O.memoizedState;f = g.destroy;if (null !== d && gg(d, g.deps)) {
      rg(Nf, c, f, d);return;
    }
  }bg |= a;e.memoizedState = rg(b, c, f, d);
}function ug(a, b) {
  if ("function" === typeof b) return a = a(), b(a), function () {
    b(null);
  };if (null !== b && void 0 !== b) return a = a(), b.current = a, function () {
    b.current = null;
  };
}function vg() {}
function wg(a, b, c) {
  25 > eg ? void 0 : x("301");var d = a.alternate;if (a === Xf || null !== d && d === Xf) {
    if (cg = !0, a = { expirationTime: Wf, action: c, eagerReducer: null, eagerState: null, next: null }, null === dg && (dg = new Map()), c = dg.get(b), void 0 === c) dg.set(b, a);else {
      for (b = c; null !== b.next;) {
        b = b.next;
      }b.next = a;
    }
  } else {
    of();var e = lf();e = mf(e, a);var f = { expirationTime: e, action: c, eagerReducer: null, eagerState: null, next: null },
        g = b.last;if (null === g) f.next = f;else {
      var h = g.next;null !== h && (f.next = h);g.next = f;
    }b.last = f;if (0 === a.expirationTime && (null === d || 0 === d.expirationTime) && (d = b.lastRenderedReducer, null !== d)) try {
      var l = b.lastRenderedState,
          k = d(l, c);f.eagerReducer = d;f.eagerState = k;if (bd(k, l)) return;
    } catch (m) {} finally {}qf(a, e);
  }
}
var kg = { readContext: M, useCallback: fg, useContext: fg, useEffect: fg, useImperativeHandle: fg, useLayoutEffect: fg, useMemo: fg, useReducer: fg, useRef: fg, useState: fg, useDebugValue: fg },
    ig = { readContext: M, useCallback: function useCallback(a, b) {
    mg().memoizedState = [a, void 0 === b ? null : b];return a;
  }, useContext: M, useEffect: function useEffect(a, b) {
    return sg(516, Uf | Tf, a, b);
  }, useImperativeHandle: function useImperativeHandle(a, b, c) {
    c = null !== c && void 0 !== c ? c.concat([a]) : null;return sg(4, Pf | Sf, ug.bind(null, b, a), c);
  }, useLayoutEffect: function useLayoutEffect(a, b) {
    return sg(4, Pf | Sf, a, b);
  },
  useMemo: function useMemo(a, b) {
    var c = mg();b = void 0 === b ? null : b;a = a();c.memoizedState = [a, b];return a;
  }, useReducer: function useReducer(a, b, c) {
    var d = mg();b = void 0 !== c ? c(b) : b;d.memoizedState = d.baseState = b;a = d.queue = { last: null, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };a = a.dispatch = wg.bind(null, Xf, a);return [d.memoizedState, a];
  }, useRef: function useRef(a) {
    var b = mg();a = { current: a };return b.memoizedState = a;
  }, useState: function useState(a) {
    var b = mg();"function" === typeof a && (a = a());b.memoizedState = b.baseState = a;a = b.queue = { last: null, dispatch: null,
      lastRenderedReducer: og, lastRenderedState: a };a = a.dispatch = wg.bind(null, Xf, a);return [b.memoizedState, a];
  }, useDebugValue: vg },
    jg = { readContext: M, useCallback: function useCallback(a, b) {
    var c = ng();b = void 0 === b ? null : b;var d = c.memoizedState;if (null !== d && null !== b && gg(b, d[1])) return d[0];c.memoizedState = [a, b];return a;
  }, useContext: M, useEffect: function useEffect(a, b) {
    return tg(516, Uf | Tf, a, b);
  }, useImperativeHandle: function useImperativeHandle(a, b, c) {
    c = null !== c && void 0 !== c ? c.concat([a]) : null;return tg(4, Pf | Sf, ug.bind(null, b, a), c);
  }, useLayoutEffect: function useLayoutEffect(a, b) {
    return tg(4, Pf | Sf, a, b);
  }, useMemo: function useMemo(a, b) {
    var c = ng();b = void 0 === b ? null : b;var d = c.memoizedState;if (null !== d && null !== b && gg(b, d[1])) return d[0];a = a();c.memoizedState = [a, b];return a;
  }, useReducer: pg, useRef: function useRef() {
    return ng().memoizedState;
  }, useState: function useState(a) {
    return pg(og, a);
  }, useDebugValue: vg },
    xg = null,
    yg = null,
    zg = !1;
function Ag(a, b) {
  var c = K(5, null, null, 0);c.elementType = "DELETED";c.type = "DELETED";c.stateNode = b;c["return"] = a;c.effectTag = 8;null !== a.lastEffect ? (a.lastEffect.nextEffect = c, a.lastEffect = c) : a.firstEffect = a.lastEffect = c;
}function Bg(a, b) {
  switch (a.tag) {case 5:
      var c = a.type;b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;return null !== b ? (a.stateNode = b, !0) : !1;case 6:
      return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, !0) : !1;case 13:
      return !1;default:
      return !1;}
}
function Cg(a) {
  if (zg) {
    var b = yg;if (b) {
      var c = b;if (!Bg(a, b)) {
        b = De(c);if (!b || !Bg(a, b)) {
          a.effectTag |= 2;zg = !1;xg = a;return;
        }Ag(xg, c);
      }xg = a;yg = Ee(b);
    } else a.effectTag |= 2, zg = !1, xg = a;
  }
}function Dg(a) {
  for (a = a["return"]; null !== a && 5 !== a.tag && 3 !== a.tag && 18 !== a.tag;) {
    a = a["return"];
  }xg = a;
}function Eg(a) {
  if (a !== xg) return !1;if (!zg) return Dg(a), zg = !0, !1;var b = a.type;if (5 !== a.tag || "head" !== b && "body" !== b && !xe(b, a.memoizedProps)) for (b = yg; b;) {
    Ag(a, b), b = De(b);
  }Dg(a);yg = xg ? De(a.stateNode) : null;return !0;
}function Fg() {
  yg = xg = null;zg = !1;
}
var Gg = Tb.ReactCurrentOwner,
    qg = !1;function S(a, b, c, d) {
  b.child = null === a ? Ef(b, null, c, d) : Df(b, a.child, c, d);
}function Hg(a, b, c, d, e) {
  c = c.render;var f = b.ref;Ig(b, e);d = hg(a, b, c, d, f, e);if (null !== a && !qg) return b.updateQueue = a.updateQueue, b.effectTag &= -517, a.expirationTime <= e && (a.expirationTime = 0), Jg(a, b, e);b.effectTag |= 1;S(a, b, d, e);return b.child;
}
function Kg(a, b, c, d, e, f) {
  if (null === a) {
    var g = c.type;if ("function" === typeof g && !Ve(g) && void 0 === g.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = g, Lg(a, b, g, d, e, f);a = Ye(c.type, null, d, null, b.mode, f);a.ref = b.ref;a["return"] = b;return b.child = a;
  }g = a.child;if (e < f && (e = g.memoizedProps, c = c.compare, c = null !== c ? c : dd, c(e, d) && a.ref === b.ref)) return Jg(a, b, f);b.effectTag |= 1;a = Xe(g, d, f);a.ref = b.ref;a["return"] = b;return b.child = a;
}
function Lg(a, b, c, d, e, f) {
  return null !== a && dd(a.memoizedProps, d) && a.ref === b.ref && (qg = !1, e < f) ? Jg(a, b, f) : Mg(a, b, c, d, f);
}function Ng(a, b) {
  var c = b.ref;if (null === a && null !== c || null !== a && a.ref !== c) b.effectTag |= 128;
}function Mg(a, b, c, d, e) {
  var f = J(c) ? Ie : H.current;f = Je(b, f);Ig(b, e);c = hg(a, b, c, d, f, e);if (null !== a && !qg) return b.updateQueue = a.updateQueue, b.effectTag &= -517, a.expirationTime <= e && (a.expirationTime = 0), Jg(a, b, e);b.effectTag |= 1;S(a, b, c, e);return b.child;
}
function Og(a, b, c, d, e) {
  if (J(c)) {
    var f = !0;Oe(b);
  } else f = !1;Ig(b, e);if (null === b.stateNode) null !== a && (a.alternate = null, b.alternate = null, b.effectTag |= 2), vf(b, c, d, e), xf(b, c, d, e), d = !0;else if (null === a) {
    var g = b.stateNode,
        h = b.memoizedProps;g.props = h;var l = g.context,
        k = c.contextType;"object" === (typeof k === "undefined" ? "undefined" : _typeof(k)) && null !== k ? k = M(k) : (k = J(c) ? Ie : H.current, k = Je(b, k));var m = c.getDerivedStateFromProps,
        p = "function" === typeof m || "function" === typeof g.getSnapshotBeforeUpdate;p || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || l !== k) && wf(b, g, d, k);Pg = !1;var t = b.memoizedState;l = g.state = t;var A = b.updateQueue;null !== A && (yf(b, A, d, g, e), l = b.memoizedState);h !== d || t !== l || I.current || Pg ? ("function" === typeof m && (kf(b, c, m, d), l = b.memoizedState), (h = Pg || uf(b, c, h, d, t, l, k)) ? (p || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.effectTag |= 4)) : ("function" === typeof g.componentDidMount && (b.effectTag |= 4), b.memoizedProps = d, b.memoizedState = l), g.props = d, g.state = l, g.context = k, d = h) : ("function" === typeof g.componentDidMount && (b.effectTag |= 4), d = !1);
  } else g = b.stateNode, h = b.memoizedProps, g.props = b.type === b.elementType ? h : L(b.type, h), l = g.context, k = c.contextType, "object" === (typeof k === "undefined" ? "undefined" : _typeof(k)) && null !== k ? k = M(k) : (k = J(c) ? Ie : H.current, k = Je(b, k)), m = c.getDerivedStateFromProps, (p = "function" === typeof m || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || l !== k) && wf(b, g, d, k), Pg = !1, l = b.memoizedState, t = g.state = l, A = b.updateQueue, null !== A && (yf(b, A, d, g, e), t = b.memoizedState), h !== d || l !== t || I.current || Pg ? ("function" === typeof m && (kf(b, c, m, d), t = b.memoizedState), (m = Pg || uf(b, c, h, d, l, t, k)) ? (p || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, t, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, t, k)), "function" === typeof g.componentDidUpdate && (b.effectTag |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.effectTag |= 256)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && l === a.memoizedState || (b.effectTag |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && l === a.memoizedState || (b.effectTag |= 256), b.memoizedProps = d, b.memoizedState = t), g.props = d, g.state = t, g.context = k, d = m) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && l === a.memoizedState || (b.effectTag |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && l === a.memoizedState || (b.effectTag |= 256), d = !1);return Qg(a, b, c, d, f, e);
}
function Qg(a, b, c, d, e, f) {
  Ng(a, b);var g = 0 !== (b.effectTag & 64);if (!d && !g) return e && Pe(b, c, !1), Jg(a, b, f);d = b.stateNode;Gg.current = b;var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();b.effectTag |= 1;null !== a && g ? (b.child = Df(b, a.child, null, f), b.child = Df(b, null, h, f)) : S(a, b, h, f);b.memoizedState = d.state;e && Pe(b, c, !0);return b.child;
}function Rg(a) {
  var b = a.stateNode;b.pendingContext ? Me(a, b.pendingContext, b.pendingContext !== b.context) : b.context && Me(a, b.context, !1);Jf(a, b.containerInfo);
}
function Sg(a, b, c) {
  var d = b.mode,
      e = b.pendingProps,
      f = b.memoizedState;if (0 === (b.effectTag & 64)) {
    f = null;var g = !1;
  } else f = { timedOutAt: null !== f ? f.timedOutAt : 0 }, g = !0, b.effectTag &= -65;if (null === a) {
    if (g) {
      var h = e.fallback;a = Ze(null, d, 0, null);0 === (b.mode & 1) && (a.child = null !== b.memoizedState ? b.child.child : b.child);d = Ze(h, d, c, null);a.sibling = d;c = a;c["return"] = d["return"] = b;
    } else c = d = Ef(b, null, e.children, c);
  } else null !== a.memoizedState ? (d = a.child, h = d.sibling, g ? (c = e.fallback, e = Xe(d, d.pendingProps, 0), 0 === (b.mode & 1) && (g = null !== b.memoizedState ? b.child.child : b.child, g !== d.child && (e.child = g)), d = e.sibling = Xe(h, c, h.expirationTime), c = e, e.childExpirationTime = 0, c["return"] = d["return"] = b) : c = d = Df(b, d.child, e.children, c)) : (h = a.child, g ? (g = e.fallback, e = Ze(null, d, 0, null), e.child = h, 0 === (b.mode & 1) && (e.child = null !== b.memoizedState ? b.child.child : b.child), d = e.sibling = Ze(g, d, c, null), d.effectTag |= 2, c = e, e.childExpirationTime = 0, c["return"] = d["return"] = b) : d = c = Df(b, h, e.children, c)), b.stateNode = a.stateNode;b.memoizedState = f;b.child = c;return d;
}
function Jg(a, b, c) {
  null !== a && (b.contextDependencies = a.contextDependencies);if (b.childExpirationTime < c) return null;null !== a && b.child !== a.child ? x("153") : void 0;if (null !== b.child) {
    a = b.child;c = Xe(a, a.pendingProps, a.expirationTime);b.child = c;for (c["return"] = b; null !== a.sibling;) {
      a = a.sibling, c = c.sibling = Xe(a, a.pendingProps, a.expirationTime), c["return"] = b;
    }c.sibling = null;
  }return b.child;
}
function Tg(a, b, c) {
  var d = b.expirationTime;if (null !== a) {
    if (a.memoizedProps !== b.pendingProps || I.current) qg = !0;else {
      if (d < c) {
        qg = !1;switch (b.tag) {case 3:
            Rg(b);Fg();break;case 5:
            Lf(b);break;case 1:
            J(b.type) && Oe(b);break;case 4:
            Jf(b, b.stateNode.containerInfo);break;case 10:
            Ug(b, b.memoizedProps.value);break;case 13:
            if (null !== b.memoizedState) {
              d = b.child.childExpirationTime;if (0 !== d && d >= c) return Sg(a, b, c);b = Jg(a, b, c);return null !== b ? b.sibling : null;
            }}return Jg(a, b, c);
      }
    }
  } else qg = !1;b.expirationTime = 0;switch (b.tag) {case 2:
      d = b.elementType;null !== a && (a.alternate = null, b.alternate = null, b.effectTag |= 2);a = b.pendingProps;var e = Je(b, H.current);Ig(b, c);e = hg(null, b, d, a, e, c);b.effectTag |= 1;if ("object" === (typeof e === "undefined" ? "undefined" : _typeof(e)) && null !== e && "function" === typeof e.render && void 0 === e.$$typeof) {
        b.tag = 1;lg();if (J(d)) {
          var f = !0;Oe(b);
        } else f = !1;b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null;var g = d.getDerivedStateFromProps;"function" === typeof g && kf(b, d, g, a);e.updater = tf;b.stateNode = e;e._reactInternalFiber = b;xf(b, d, a, c);b = Qg(null, b, d, !0, f, c);
      } else b.tag = 0, S(null, b, e, c), b = b.child;return b;case 16:
      e = b.elementType;null !== a && (a.alternate = null, b.alternate = null, b.effectTag |= 2);f = b.pendingProps;a = hf(e);b.type = a;e = b.tag = We(a);f = L(a, f);g = void 0;switch (e) {case 0:
          g = Mg(null, b, a, f, c);break;case 1:
          g = Og(null, b, a, f, c);break;case 11:
          g = Hg(null, b, a, f, c);break;case 14:
          g = Kg(null, b, a, L(a.type, f), d, c);break;default:
          x("306", a, "");}return g;case 0:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : L(d, e), Mg(a, b, d, e, c);case 1:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : L(d, e), Og(a, b, d, e, c);case 3:
      Rg(b);d = b.updateQueue;null === d ? x("282") : void 0;e = b.memoizedState;e = null !== e ? e.element : null;yf(b, d, b.pendingProps, null, c);d = b.memoizedState.element;if (d === e) Fg(), b = Jg(a, b, c);else {
        e = b.stateNode;if (e = (null === a || null === a.child) && e.hydrate) yg = Ee(b.stateNode.containerInfo), xg = b, e = zg = !0;e ? (b.effectTag |= 2, b.child = Ef(b, null, d, c)) : (S(a, b, d, c), Fg());b = b.child;
      }return b;case 5:
      return Lf(b), null === a && Cg(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, xe(d, e) ? g = null : null !== f && xe(d, f) && (b.effectTag |= 16), Ng(a, b), 1 !== c && b.mode & 1 && e.hidden ? (b.expirationTime = b.childExpirationTime = 1, b = null) : (S(a, b, g, c), b = b.child), b;case 6:
      return null === a && Cg(b), null;case 13:
      return Sg(a, b, c);case 4:
      return Jf(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Df(b, null, d, c) : S(a, b, d, c), b.child;case 11:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : L(d, e), Hg(a, b, d, e, c);case 7:
      return S(a, b, b.pendingProps, c), b.child;case 8:
      return S(a, b, b.pendingProps.children, c), b.child;case 12:
      return S(a, b, b.pendingProps.children, c), b.child;case 10:
      a: {
        d = b.type._context;e = b.pendingProps;g = b.memoizedProps;f = e.value;Ug(b, f);if (null !== g) {
          var h = g.value;f = bd(h, f) ? 0 : ("function" === typeof d._calculateChangedBits ? d._calculateChangedBits(h, f) : 1073741823) | 0;if (0 === f) {
            if (g.children === e.children && !I.current) {
              b = Jg(a, b, c);break a;
            }
          } else for (h = b.child, null !== h && (h["return"] = b); null !== h;) {
            var l = h.contextDependencies;if (null !== l) {
              g = h.child;for (var k = l.first; null !== k;) {
                if (k.context === d && 0 !== (k.observedBits & f)) {
                  1 === h.tag && (k = nf(c), k.tag = sf, pf(h, k));h.expirationTime < c && (h.expirationTime = c);k = h.alternate;null !== k && k.expirationTime < c && (k.expirationTime = c);k = c;for (var m = h["return"]; null !== m;) {
                    var p = m.alternate;if (m.childExpirationTime < k) m.childExpirationTime = k, null !== p && p.childExpirationTime < k && (p.childExpirationTime = k);else if (null !== p && p.childExpirationTime < k) p.childExpirationTime = k;else break;m = m["return"];
                  }l.expirationTime < c && (l.expirationTime = c);break;
                }k = k.next;
              }
            } else g = 10 === h.tag ? h.type === b.type ? null : h.child : h.child;if (null !== g) g["return"] = h;else for (g = h; null !== g;) {
              if (g === b) {
                g = null;break;
              }h = g.sibling;if (null !== h) {
                h["return"] = g["return"];g = h;break;
              }g = g["return"];
            }h = g;
          }
        }S(a, b, e.children, c);b = b.child;
      }return b;case 9:
      return e = b.type, f = b.pendingProps, d = f.children, Ig(b, c), e = M(e, f.unstable_observedBits), d = d(e), b.effectTag |= 1, S(a, b, d, c), b.child;case 14:
      return e = b.type, f = L(e, b.pendingProps), f = L(e.type, f), Kg(a, b, e, f, d, c);case 15:
      return Lg(a, b, b.type, b.pendingProps, d, c);case 17:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : L(d, e), null !== a && (a.alternate = null, b.alternate = null, b.effectTag |= 2), b.tag = 1, J(d) ? (a = !0, Oe(b)) : a = !1, Ig(b, c), vf(b, d, e, c), xf(b, d, e, c), Qg(null, b, d, !0, a, c);}x("156");
}var Vg = { current: null },
    Wg = null,
    Xg = null,
    Yg = null;function Ug(a, b) {
  var c = a.type._context;G(Vg, c._currentValue, a);c._currentValue = b;
}function Zg(a) {
  var b = Vg.current;F(Vg, a);a.type._context._currentValue = b;
}function Ig(a, b) {
  Wg = a;Yg = Xg = null;var c = a.contextDependencies;null !== c && c.expirationTime >= b && (qg = !0);a.contextDependencies = null;
}
function M(a, b) {
  if (Yg !== a && !1 !== b && 0 !== b) {
    if ("number" !== typeof b || 1073741823 === b) Yg = a, b = 1073741823;b = { context: a, observedBits: b, next: null };null === Xg ? (null === Wg ? x("308") : void 0, Xg = b, Wg.contextDependencies = { first: b, expirationTime: 0 }) : Xg = Xg.next = b;
  }return a._currentValue;
}var $g = 0,
    rf = 1,
    sf = 2,
    ah = 3,
    Pg = !1;function bh(a) {
  return { baseState: a, firstUpdate: null, lastUpdate: null, firstCapturedUpdate: null, lastCapturedUpdate: null, firstEffect: null, lastEffect: null, firstCapturedEffect: null, lastCapturedEffect: null };
}
function ch(a) {
  return { baseState: a.baseState, firstUpdate: a.firstUpdate, lastUpdate: a.lastUpdate, firstCapturedUpdate: null, lastCapturedUpdate: null, firstEffect: null, lastEffect: null, firstCapturedEffect: null, lastCapturedEffect: null };
}function nf(a) {
  return { expirationTime: a, tag: $g, payload: null, callback: null, next: null, nextEffect: null };
}function dh(a, b) {
  null === a.lastUpdate ? a.firstUpdate = a.lastUpdate = b : (a.lastUpdate.next = b, a.lastUpdate = b);
}
function pf(a, b) {
  var c = a.alternate;if (null === c) {
    var d = a.updateQueue;var e = null;null === d && (d = a.updateQueue = bh(a.memoizedState));
  } else d = a.updateQueue, e = c.updateQueue, null === d ? null === e ? (d = a.updateQueue = bh(a.memoizedState), e = c.updateQueue = bh(c.memoizedState)) : d = a.updateQueue = ch(e) : null === e && (e = c.updateQueue = ch(d));null === e || d === e ? dh(d, b) : null === d.lastUpdate || null === e.lastUpdate ? (dh(d, b), dh(e, b)) : (dh(d, b), e.lastUpdate = b);
}
function eh(a, b) {
  var c = a.updateQueue;c = null === c ? a.updateQueue = bh(a.memoizedState) : fh(a, c);null === c.lastCapturedUpdate ? c.firstCapturedUpdate = c.lastCapturedUpdate = b : (c.lastCapturedUpdate.next = b, c.lastCapturedUpdate = b);
}function fh(a, b) {
  var c = a.alternate;null !== c && b === c.updateQueue && (b = a.updateQueue = ch(b));return b;
}
function gh(a, b, c, d, e, f) {
  switch (c.tag) {case rf:
      return a = c.payload, "function" === typeof a ? a.call(f, d, e) : a;case ah:
      a.effectTag = a.effectTag & -2049 | 64;case $g:
      a = c.payload;e = "function" === typeof a ? a.call(f, d, e) : a;if (null === e || void 0 === e) break;return n({}, d, e);case sf:
      Pg = !0;}return d;
}
function yf(a, b, c, d, e) {
  Pg = !1;b = fh(a, b);for (var f = b.baseState, g = null, h = 0, l = b.firstUpdate, k = f; null !== l;) {
    var m = l.expirationTime;m < e ? (null === g && (g = l, f = k), h < m && (h = m)) : (k = gh(a, b, l, k, c, d), null !== l.callback && (a.effectTag |= 32, l.nextEffect = null, null === b.lastEffect ? b.firstEffect = b.lastEffect = l : (b.lastEffect.nextEffect = l, b.lastEffect = l)));l = l.next;
  }m = null;for (l = b.firstCapturedUpdate; null !== l;) {
    var p = l.expirationTime;p < e ? (null === m && (m = l, null === g && (f = k)), h < p && (h = p)) : (k = gh(a, b, l, k, c, d), null !== l.callback && (a.effectTag |= 32, l.nextEffect = null, null === b.lastCapturedEffect ? b.firstCapturedEffect = b.lastCapturedEffect = l : (b.lastCapturedEffect.nextEffect = l, b.lastCapturedEffect = l)));l = l.next;
  }null === g && (b.lastUpdate = null);null === m ? b.lastCapturedUpdate = null : a.effectTag |= 32;null === g && null === m && (f = k);b.baseState = f;b.firstUpdate = g;b.firstCapturedUpdate = m;a.expirationTime = h;a.memoizedState = k;
}
function hh(a, b, c) {
  null !== b.firstCapturedUpdate && (null !== b.lastUpdate && (b.lastUpdate.next = b.firstCapturedUpdate, b.lastUpdate = b.lastCapturedUpdate), b.firstCapturedUpdate = b.lastCapturedUpdate = null);ih(b.firstEffect, c);b.firstEffect = b.lastEffect = null;ih(b.firstCapturedEffect, c);b.firstCapturedEffect = b.lastCapturedEffect = null;
}function ih(a, b) {
  for (; null !== a;) {
    var c = a.callback;if (null !== c) {
      a.callback = null;var d = b;"function" !== typeof c ? x("191", c) : void 0;c.call(d);
    }a = a.nextEffect;
  }
}
function jh(a, b) {
  return { value: a, source: b, stack: jc(b) };
}function kh(a) {
  a.effectTag |= 4;
}var lh = void 0,
    mh = void 0,
    nh = void 0,
    oh = void 0;lh = function lh(a, b) {
  for (var c = b.child; null !== c;) {
    if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);else if (4 !== c.tag && null !== c.child) {
      c.child["return"] = c;c = c.child;continue;
    }if (c === b) break;for (; null === c.sibling;) {
      if (null === c["return"] || c["return"] === b) return;c = c["return"];
    }c.sibling["return"] = c["return"];c = c.sibling;
  }
};mh = function mh() {};
nh = function nh(a, b, c, d, e) {
  var f = a.memoizedProps;if (f !== d) {
    var g = b.stateNode;If(N.current);a = null;switch (c) {case "input":
        f = vc(g, f);d = vc(g, d);a = [];break;case "option":
        f = $d(g, f);d = $d(g, d);a = [];break;case "select":
        f = n({}, f, { value: void 0 });d = n({}, d, { value: void 0 });a = [];break;case "textarea":
        f = be(g, f);d = be(g, d);a = [];break;default:
        "function" !== typeof f.onClick && "function" === typeof d.onClick && (g.onclick = te);}qe(c, d);g = c = void 0;var h = null;for (c in f) {
      if (!d.hasOwnProperty(c) && f.hasOwnProperty(c) && null != f[c]) if ("style" === c) {
        var l = f[c];for (g in l) {
          l.hasOwnProperty(g) && (h || (h = {}), h[g] = "");
        }
      } else "dangerouslySetInnerHTML" !== c && "children" !== c && "suppressContentEditableWarning" !== c && "suppressHydrationWarning" !== c && "autoFocus" !== c && (ra.hasOwnProperty(c) ? a || (a = []) : (a = a || []).push(c, null));
    }for (c in d) {
      var k = d[c];l = null != f ? f[c] : void 0;if (d.hasOwnProperty(c) && k !== l && (null != k || null != l)) if ("style" === c) {
        if (l) {
          for (g in l) {
            !l.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (h || (h = {}), h[g] = "");
          }for (g in k) {
            k.hasOwnProperty(g) && l[g] !== k[g] && (h || (h = {}), h[g] = k[g]);
          }
        } else h || (a || (a = []), a.push(c, h)), h = k;
      } else "dangerouslySetInnerHTML" === c ? (k = k ? k.__html : void 0, l = l ? l.__html : void 0, null != k && l !== k && (a = a || []).push(c, "" + k)) : "children" === c ? l === k || "string" !== typeof k && "number" !== typeof k || (a = a || []).push(c, "" + k) : "suppressContentEditableWarning" !== c && "suppressHydrationWarning" !== c && (ra.hasOwnProperty(c) ? (null != k && se(e, c), a || l === k || (a = [])) : (a = a || []).push(c, k));
    }h && (a = a || []).push("style", h);e = a;(b.updateQueue = e) && kh(b);
  }
};oh = function oh(a, b, c, d) {
  c !== d && kh(b);
};
var ph = "function" === typeof WeakSet ? WeakSet : Set;function qh(a, b) {
  var c = b.source,
      d = b.stack;null === d && null !== c && (d = jc(c));null !== c && ic(c.type);b = b.value;null !== a && 1 === a.tag && ic(a.type);try {
    console.error(b);
  } catch (e) {
    setTimeout(function () {
      throw e;
    });
  }
}function rh(a) {
  var b = a.ref;if (null !== b) if ("function" === typeof b) try {
    b(null);
  } catch (c) {
    sh(a, c);
  } else b.current = null;
}
function th(a, b, c) {
  c = c.updateQueue;c = null !== c ? c.lastEffect : null;if (null !== c) {
    var d = c = c.next;do {
      if ((d.tag & a) !== Nf) {
        var e = d.destroy;d.destroy = void 0;void 0 !== e && e();
      }(d.tag & b) !== Nf && (e = d.create, d.destroy = e());d = d.next;
    } while (d !== c);
  }
}
function uh(a, b) {
  for (var c = a;;) {
    if (5 === c.tag) {
      var d = c.stateNode;if (b) d.style.display = "none";else {
        d = c.stateNode;var e = c.memoizedProps.style;e = void 0 !== e && null !== e && e.hasOwnProperty("display") ? e.display : null;d.style.display = ne("display", e);
      }
    } else if (6 === c.tag) c.stateNode.nodeValue = b ? "" : c.memoizedProps;else if (13 === c.tag && null !== c.memoizedState) {
      d = c.child.sibling;d["return"] = c;c = d;continue;
    } else if (null !== c.child) {
      c.child["return"] = c;c = c.child;continue;
    }if (c === a) break;for (; null === c.sibling;) {
      if (null === c["return"] || c["return"] === a) return;c = c["return"];
    }c.sibling["return"] = c["return"];c = c.sibling;
  }
}
function vh(a) {
  "function" === typeof Re && Re(a);switch (a.tag) {case 0:case 11:case 14:case 15:
      var b = a.updateQueue;if (null !== b && (b = b.lastEffect, null !== b)) {
        var c = b = b.next;do {
          var d = c.destroy;if (void 0 !== d) {
            var e = a;try {
              d();
            } catch (f) {
              sh(e, f);
            }
          }c = c.next;
        } while (c !== b);
      }break;case 1:
      rh(a);b = a.stateNode;if ("function" === typeof b.componentWillUnmount) try {
        b.props = a.memoizedProps, b.state = a.memoizedState, b.componentWillUnmount();
      } catch (f) {
        sh(a, f);
      }break;case 5:
      rh(a);break;case 4:
      wh(a);}
}
function xh(a) {
  return 5 === a.tag || 3 === a.tag || 4 === a.tag;
}
function yh(a) {
  a: {
    for (var b = a["return"]; null !== b;) {
      if (xh(b)) {
        var c = b;break a;
      }b = b["return"];
    }x("160");c = void 0;
  }var d = b = void 0;switch (c.tag) {case 5:
      b = c.stateNode;d = !1;break;case 3:
      b = c.stateNode.containerInfo;d = !0;break;case 4:
      b = c.stateNode.containerInfo;d = !0;break;default:
      x("161");}c.effectTag & 16 && (ke(b, ""), c.effectTag &= -17);a: b: for (c = a;;) {
    for (; null === c.sibling;) {
      if (null === c["return"] || xh(c["return"])) {
        c = null;break a;
      }c = c["return"];
    }c.sibling["return"] = c["return"];for (c = c.sibling; 5 !== c.tag && 6 !== c.tag && 18 !== c.tag;) {
      if (c.effectTag & 2) continue b;if (null === c.child || 4 === c.tag) continue b;else c.child["return"] = c, c = c.child;
    }if (!(c.effectTag & 2)) {
      c = c.stateNode;break a;
    }
  }for (var e = a;;) {
    if (5 === e.tag || 6 === e.tag) {
      if (c) {
        if (d) {
          var f = b,
              g = e.stateNode,
              h = c;8 === f.nodeType ? f.parentNode.insertBefore(g, h) : f.insertBefore(g, h);
        } else b.insertBefore(e.stateNode, c);
      } else d ? (g = b, h = e.stateNode, 8 === g.nodeType ? (f = g.parentNode, f.insertBefore(h, g)) : (f = g, f.appendChild(h)), g = g._reactRootContainer, null !== g && void 0 !== g || null !== f.onclick || (f.onclick = te)) : b.appendChild(e.stateNode);
    } else if (4 !== e.tag && null !== e.child) {
      e.child["return"] = e;e = e.child;continue;
    }if (e === a) break;for (; null === e.sibling;) {
      if (null === e["return"] || e["return"] === a) return;e = e["return"];
    }e.sibling["return"] = e["return"];e = e.sibling;
  }
}
function wh(a) {
  for (var b = a, c = !1, d = void 0, e = void 0;;) {
    if (!c) {
      c = b["return"];a: for (;;) {
        null === c ? x("160") : void 0;switch (c.tag) {case 5:
            d = c.stateNode;e = !1;break a;case 3:
            d = c.stateNode.containerInfo;e = !0;break a;case 4:
            d = c.stateNode.containerInfo;e = !0;break a;}c = c["return"];
      }c = !0;
    }if (5 === b.tag || 6 === b.tag) {
      a: for (var f = b, g = f;;) {
        if (vh(g), null !== g.child && 4 !== g.tag) g.child["return"] = g, g = g.child;else {
          if (g === f) break;for (; null === g.sibling;) {
            if (null === g["return"] || g["return"] === f) break a;g = g["return"];
          }g.sibling["return"] = g["return"];g = g.sibling;
        }
      }e ? (f = d, g = b.stateNode, 8 === f.nodeType ? f.parentNode.removeChild(g) : f.removeChild(g)) : d.removeChild(b.stateNode);
    } else if (4 === b.tag) {
      if (null !== b.child) {
        d = b.stateNode.containerInfo;e = !0;b.child["return"] = b;b = b.child;continue;
      }
    } else if (vh(b), null !== b.child) {
      b.child["return"] = b;b = b.child;continue;
    }if (b === a) break;for (; null === b.sibling;) {
      if (null === b["return"] || b["return"] === a) return;b = b["return"];4 === b.tag && (c = !1);
    }b.sibling["return"] = b["return"];b = b.sibling;
  }
}
function zh(a, b) {
  switch (b.tag) {case 0:case 11:case 14:case 15:
      th(Pf, Qf, b);break;case 1:
      break;case 5:
      var c = b.stateNode;if (null != c) {
        var d = b.memoizedProps;a = null !== a ? a.memoizedProps : d;var e = b.type,
            f = b.updateQueue;b.updateQueue = null;null !== f && Ce(c, f, e, a, d, b);
      }break;case 6:
      null === b.stateNode ? x("162") : void 0;b.stateNode.nodeValue = b.memoizedProps;break;case 3:
      break;case 12:
      break;case 13:
      c = b.memoizedState;d = void 0;a = b;null === c ? d = !1 : (d = !0, a = b.child, 0 === c.timedOutAt && (c.timedOutAt = lf()));null !== a && uh(a, d);c = b.updateQueue;if (null !== c) {
        b.updateQueue = null;var g = b.stateNode;null === g && (g = b.stateNode = new ph());c.forEach(function (a) {
          var c = Ah.bind(null, b, a);g.has(a) || (g.add(a), a.then(c, c));
        });
      }break;case 17:
      break;default:
      x("163");}
}var Bh = "function" === typeof WeakMap ? WeakMap : Map;function Ch(a, b, c) {
  c = nf(c);c.tag = ah;c.payload = { element: null };var d = b.value;c.callback = function () {
    Dh(d);qh(a, b);
  };return c;
}
function Eh(a, b, c) {
  c = nf(c);c.tag = ah;var d = a.type.getDerivedStateFromError;if ("function" === typeof d) {
    var e = b.value;c.payload = function () {
      return d(e);
    };
  }var f = a.stateNode;null !== f && "function" === typeof f.componentDidCatch && (c.callback = function () {
    "function" !== typeof d && (null === Fh ? Fh = new Set([this]) : Fh.add(this));var c = b.value,
        e = b.stack;qh(a, b);this.componentDidCatch(c, { componentStack: null !== e ? e : "" });
  });return c;
}
function Gh(a) {
  switch (a.tag) {case 1:
      J(a.type) && Ke(a);var b = a.effectTag;return b & 2048 ? (a.effectTag = b & -2049 | 64, a) : null;case 3:
      return Kf(a), Le(a), b = a.effectTag, 0 !== (b & 64) ? x("285") : void 0, a.effectTag = b & -2049 | 64, a;case 5:
      return Mf(a), null;case 13:
      return b = a.effectTag, b & 2048 ? (a.effectTag = b & -2049 | 64, a) : null;case 18:
      return null;case 4:
      return Kf(a), null;case 10:
      return Zg(a), null;default:
      return null;}
}
var Hh = Tb.ReactCurrentDispatcher,
    Ih = Tb.ReactCurrentOwner,
    Jh = 1073741822,
    Kh = !1,
    T = null,
    Lh = null,
    U = 0,
    Mh = -1,
    Nh = !1,
    V = null,
    Oh = !1,
    Ph = null,
    Qh = null,
    Rh = null,
    Fh = null;function Sh() {
  if (null !== T) for (var a = T["return"]; null !== a;) {
    var b = a;switch (b.tag) {case 1:
        var c = b.type.childContextTypes;null !== c && void 0 !== c && Ke(b);break;case 3:
        Kf(b);Le(b);break;case 5:
        Mf(b);break;case 4:
        Kf(b);break;case 10:
        Zg(b);}a = a["return"];
  }Lh = null;U = 0;Mh = -1;Nh = !1;T = null;
}
function Th() {
  for (; null !== V;) {
    var a = V.effectTag;a & 16 && ke(V.stateNode, "");if (a & 128) {
      var b = V.alternate;null !== b && (b = b.ref, null !== b && ("function" === typeof b ? b(null) : b.current = null));
    }switch (a & 14) {case 2:
        yh(V);V.effectTag &= -3;break;case 6:
        yh(V);V.effectTag &= -3;zh(V.alternate, V);break;case 4:
        zh(V.alternate, V);break;case 8:
        a = V, wh(a), a["return"] = null, a.child = null, a.memoizedState = null, a.updateQueue = null, a = a.alternate, null !== a && (a["return"] = null, a.child = null, a.memoizedState = null, a.updateQueue = null);}V = V.nextEffect;
  }
}
function Uh() {
  for (; null !== V;) {
    if (V.effectTag & 256) a: {
      var a = V.alternate,
          b = V;switch (b.tag) {case 0:case 11:case 15:
          th(Of, Nf, b);break a;case 1:
          if (b.effectTag & 256 && null !== a) {
            var c = a.memoizedProps,
                d = a.memoizedState;a = b.stateNode;b = a.getSnapshotBeforeUpdate(b.elementType === b.type ? c : L(b.type, c), d);a.__reactInternalSnapshotBeforeUpdate = b;
          }break a;case 3:case 5:case 6:case 4:case 17:
          break a;default:
          x("163");}
    }V = V.nextEffect;
  }
}
function Vh(a, b) {
  for (; null !== V;) {
    var c = V.effectTag;if (c & 36) {
      var d = V.alternate,
          e = V,
          f = b;switch (e.tag) {case 0:case 11:case 15:
          th(Rf, Sf, e);break;case 1:
          var g = e.stateNode;if (e.effectTag & 4) if (null === d) g.componentDidMount();else {
            var h = e.elementType === e.type ? d.memoizedProps : L(e.type, d.memoizedProps);g.componentDidUpdate(h, d.memoizedState, g.__reactInternalSnapshotBeforeUpdate);
          }d = e.updateQueue;null !== d && hh(e, d, g, f);break;case 3:
          d = e.updateQueue;if (null !== d) {
            g = null;if (null !== e.child) switch (e.child.tag) {case 5:
                g = e.child.stateNode;break;case 1:
                g = e.child.stateNode;}hh(e, d, g, f);
          }break;case 5:
          f = e.stateNode;null === d && e.effectTag & 4 && we(e.type, e.memoizedProps) && f.focus();break;case 6:
          break;case 4:
          break;case 12:
          break;case 13:
          break;case 17:
          break;default:
          x("163");}
    }c & 128 && (e = V.ref, null !== e && (f = V.stateNode, "function" === typeof e ? e(f) : e.current = f));c & 512 && (Ph = a);V = V.nextEffect;
  }
}
function Wh(a, b) {
  Rh = Qh = Ph = null;var c = W;W = !0;do {
    if (b.effectTag & 512) {
      var d = !1,
          e = void 0;try {
        var f = b;th(Uf, Nf, f);th(Nf, Tf, f);
      } catch (g) {
        d = !0, e = g;
      }d && sh(b, e);
    }b = b.nextEffect;
  } while (null !== b);W = c;c = a.expirationTime;0 !== c && Xh(a, c);X || W || Yh(1073741823, !1);
}function of() {
  null !== Qh && Be(Qh);null !== Rh && Rh();
}
function Zh(a, b) {
  Oh = Kh = !0;a.current === b ? x("177") : void 0;var c = a.pendingCommitExpirationTime;0 === c ? x("261") : void 0;a.pendingCommitExpirationTime = 0;var d = b.expirationTime,
      e = b.childExpirationTime;ef(a, e > d ? e : d);Ih.current = null;d = void 0;1 < b.effectTag ? null !== b.lastEffect ? (b.lastEffect.nextEffect = b, d = b.firstEffect) : d = b : d = b.firstEffect;ue = Bd;ve = Pd();Bd = !1;for (V = d; null !== V;) {
    e = !1;var f = void 0;try {
      Uh();
    } catch (h) {
      e = !0, f = h;
    }e && (null === V ? x("178") : void 0, sh(V, f), null !== V && (V = V.nextEffect));
  }for (V = d; null !== V;) {
    e = !1;
    f = void 0;try {
      Th();
    } catch (h) {
      e = !0, f = h;
    }e && (null === V ? x("178") : void 0, sh(V, f), null !== V && (V = V.nextEffect));
  }Qd(ve);ve = null;Bd = !!ue;ue = null;a.current = b;for (V = d; null !== V;) {
    e = !1;f = void 0;try {
      Vh(a, c);
    } catch (h) {
      e = !0, f = h;
    }e && (null === V ? x("178") : void 0, sh(V, f), null !== V && (V = V.nextEffect));
  }if (null !== d && null !== Ph) {
    var g = Wh.bind(null, a, d);Qh = r.unstable_runWithPriority(r.unstable_NormalPriority, function () {
      return Ae(g);
    });Rh = g;
  }Kh = Oh = !1;"function" === typeof Qe && Qe(b.stateNode);c = b.expirationTime;b = b.childExpirationTime;b = b > c ? b : c;0 === b && (Fh = null);$h(a, b);
}
function ai(a) {
  for (;;) {
    var b = a.alternate,
        c = a["return"],
        d = a.sibling;if (0 === (a.effectTag & 1024)) {
      T = a;a: {
        var e = b;b = a;var f = U;var g = b.pendingProps;switch (b.tag) {case 2:
            break;case 16:
            break;case 15:case 0:
            break;case 1:
            J(b.type) && Ke(b);break;case 3:
            Kf(b);Le(b);g = b.stateNode;g.pendingContext && (g.context = g.pendingContext, g.pendingContext = null);if (null === e || null === e.child) Eg(b), b.effectTag &= -3;mh(b);break;case 5:
            Mf(b);var h = If(Hf.current);f = b.type;if (null !== e && null != b.stateNode) nh(e, b, f, g, h), e.ref !== b.ref && (b.effectTag |= 128);else if (g) {
              var l = If(N.current);if (Eg(b)) {
                g = b;e = g.stateNode;var k = g.type,
                    m = g.memoizedProps,
                    p = h;e[Fa] = g;e[Ga] = m;f = void 0;h = k;switch (h) {case "iframe":case "object":
                    E("load", e);break;case "video":case "audio":
                    for (k = 0; k < ab.length; k++) {
                      E(ab[k], e);
                    }break;case "source":
                    E("error", e);break;case "img":case "image":case "link":
                    E("error", e);E("load", e);break;case "form":
                    E("reset", e);E("submit", e);break;case "details":
                    E("toggle", e);break;case "input":
                    wc(e, m);E("invalid", e);se(p, "onChange");break;case "select":
                    e._wrapperState = { wasMultiple: !!m.multiple };E("invalid", e);se(p, "onChange");break;case "textarea":
                    ce(e, m), E("invalid", e), se(p, "onChange");}qe(h, m);k = null;for (f in m) {
                  m.hasOwnProperty(f) && (l = m[f], "children" === f ? "string" === typeof l ? e.textContent !== l && (k = ["children", l]) : "number" === typeof l && e.textContent !== "" + l && (k = ["children", "" + l]) : ra.hasOwnProperty(f) && null != l && se(p, f));
                }switch (h) {case "input":
                    Rb(e);Ac(e, m, !0);break;case "textarea":
                    Rb(e);ee(e, m);break;case "select":case "option":
                    break;default:
                    "function" === typeof m.onClick && (e.onclick = te);}f = k;g.updateQueue = f;g = null !== f ? !0 : !1;g && kh(b);
              } else {
                m = b;p = f;e = g;k = 9 === h.nodeType ? h : h.ownerDocument;l === fe.html && (l = ge(p));l === fe.html ? "script" === p ? (e = k.createElement("div"), e.innerHTML = "<script>\x3c/script>", k = e.removeChild(e.firstChild)) : "string" === typeof e.is ? k = k.createElement(p, { is: e.is }) : (k = k.createElement(p), "select" === p && (p = k, e.multiple ? p.multiple = !0 : e.size && (p.size = e.size))) : k = k.createElementNS(l, p);e = k;e[Fa] = m;e[Ga] = g;lh(e, b, !1, !1);p = e;k = f;m = g;var t = h,
                    A = re(k, m);switch (k) {case "iframe":case "object":
                    E("load", p);h = m;break;case "video":case "audio":
                    for (h = 0; h < ab.length; h++) {
                      E(ab[h], p);
                    }h = m;break;case "source":
                    E("error", p);h = m;break;case "img":case "image":case "link":
                    E("error", p);E("load", p);h = m;break;case "form":
                    E("reset", p);E("submit", p);h = m;break;case "details":
                    E("toggle", p);h = m;break;case "input":
                    wc(p, m);h = vc(p, m);E("invalid", p);se(t, "onChange");break;case "option":
                    h = $d(p, m);break;case "select":
                    p._wrapperState = { wasMultiple: !!m.multiple };h = n({}, m, { value: void 0 });E("invalid", p);se(t, "onChange");break;case "textarea":
                    ce(p, m);h = be(p, m);E("invalid", p);se(t, "onChange");break;default:
                    h = m;}qe(k, h);l = void 0;var v = k,
                    R = p,
                    u = h;for (l in u) {
                  if (u.hasOwnProperty(l)) {
                    var q = u[l];"style" === l ? oe(R, q) : "dangerouslySetInnerHTML" === l ? (q = q ? q.__html : void 0, null != q && je(R, q)) : "children" === l ? "string" === typeof q ? ("textarea" !== v || "" !== q) && ke(R, q) : "number" === typeof q && ke(R, "" + q) : "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && "autoFocus" !== l && (ra.hasOwnProperty(l) ? null != q && se(t, l) : null != q && tc(R, l, q, A));
                  }
                }switch (k) {case "input":
                    Rb(p);
                    Ac(p, m, !1);break;case "textarea":
                    Rb(p);ee(p, m);break;case "option":
                    null != m.value && p.setAttribute("value", "" + uc(m.value));break;case "select":
                    h = p;h.multiple = !!m.multiple;p = m.value;null != p ? ae(h, !!m.multiple, p, !1) : null != m.defaultValue && ae(h, !!m.multiple, m.defaultValue, !0);break;default:
                    "function" === typeof h.onClick && (p.onclick = te);}(g = we(f, g)) && kh(b);b.stateNode = e;
              }null !== b.ref && (b.effectTag |= 128);
            } else null === b.stateNode ? x("166") : void 0;break;case 6:
            e && null != b.stateNode ? oh(e, b, e.memoizedProps, g) : ("string" !== typeof g && (null === b.stateNode ? x("166") : void 0), e = If(Hf.current), If(N.current), Eg(b) ? (g = b, f = g.stateNode, e = g.memoizedProps, f[Fa] = g, (g = f.nodeValue !== e) && kh(b)) : (f = b, g = (9 === e.nodeType ? e : e.ownerDocument).createTextNode(g), g[Fa] = b, f.stateNode = g));break;case 11:
            break;case 13:
            g = b.memoizedState;if (0 !== (b.effectTag & 64)) {
              b.expirationTime = f;T = b;break a;
            }g = null !== g;f = null !== e && null !== e.memoizedState;null !== e && !g && f && (e = e.child.sibling, null !== e && (h = b.firstEffect, null !== h ? (b.firstEffect = e, e.nextEffect = h) : (b.firstEffect = b.lastEffect = e, e.nextEffect = null), e.effectTag = 8));if (g || f) b.effectTag |= 4;break;case 7:
            break;case 8:
            break;case 12:
            break;case 4:
            Kf(b);mh(b);break;case 10:
            Zg(b);break;case 9:
            break;case 14:
            break;case 17:
            J(b.type) && Ke(b);break;case 18:
            break;default:
            x("156");}T = null;
      }b = a;if (1 === U || 1 !== b.childExpirationTime) {
        g = 0;for (f = b.child; null !== f;) {
          e = f.expirationTime, h = f.childExpirationTime, e > g && (g = e), h > g && (g = h), f = f.sibling;
        }b.childExpirationTime = g;
      }if (null !== T) return T;null !== c && 0 === (c.effectTag & 1024) && (null === c.firstEffect && (c.firstEffect = a.firstEffect), null !== a.lastEffect && (null !== c.lastEffect && (c.lastEffect.nextEffect = a.firstEffect), c.lastEffect = a.lastEffect), 1 < a.effectTag && (null !== c.lastEffect ? c.lastEffect.nextEffect = a : c.firstEffect = a, c.lastEffect = a));
    } else {
      a = Gh(a, U);if (null !== a) return a.effectTag &= 1023, a;null !== c && (c.firstEffect = c.lastEffect = null, c.effectTag |= 1024);
    }if (null !== d) return d;if (null !== c) a = c;else break;
  }return null;
}
function bi(a) {
  var b = Tg(a.alternate, a, U);a.memoizedProps = a.pendingProps;null === b && (b = ai(a));Ih.current = null;return b;
}
function ci(a, b) {
  Kh ? x("243") : void 0;of();Kh = !0;var c = Hh.current;Hh.current = kg;var d = a.nextExpirationTimeToWorkOn;if (d !== U || a !== Lh || null === T) Sh(), Lh = a, U = d, T = Xe(Lh.current, null, U), a.pendingCommitExpirationTime = 0;var e = !1;do {
    try {
      if (b) for (; null !== T && !di();) {
        T = bi(T);
      } else for (; null !== T;) {
        T = bi(T);
      }
    } catch (u) {
      if (Yg = Xg = Wg = null, lg(), null === T) e = !0, Dh(u);else {
        null === T ? x("271") : void 0;var f = T,
            g = f["return"];if (null === g) e = !0, Dh(u);else {
          a: {
            var h = a,
                l = g,
                k = f,
                m = u;g = U;k.effectTag |= 1024;k.firstEffect = k.lastEffect = null;if (null !== m && "object" === (typeof m === "undefined" ? "undefined" : _typeof(m)) && "function" === typeof m.then) {
              var p = m;m = l;var t = -1,
                  A = -1;do {
                if (13 === m.tag) {
                  var v = m.alternate;if (null !== v && (v = v.memoizedState, null !== v)) {
                    A = 10 * (1073741822 - v.timedOutAt);break;
                  }v = m.pendingProps.maxDuration;if ("number" === typeof v) if (0 >= v) t = 0;else if (-1 === t || v < t) t = v;
                }m = m["return"];
              } while (null !== m);m = l;do {
                if (v = 13 === m.tag) v = void 0 === m.memoizedProps.fallback ? !1 : null === m.memoizedState;if (v) {
                  l = m.updateQueue;null === l ? (l = new Set(), l.add(p), m.updateQueue = l) : l.add(p);if (0 === (m.mode & 1)) {
                    m.effectTag |= 64;k.effectTag &= -1957;1 === k.tag && (null === k.alternate ? k.tag = 17 : (g = nf(1073741823), g.tag = sf, pf(k, g)));k.expirationTime = 1073741823;break a;
                  }k = h;l = g;var R = k.pingCache;null === R ? (R = k.pingCache = new Bh(), v = new Set(), R.set(p, v)) : (v = R.get(p), void 0 === v && (v = new Set(), R.set(p, v)));v.has(l) || (v.add(l), k = ei.bind(null, k, p, l), p.then(k, k));-1 === t ? h = 1073741823 : (-1 === A && (A = 10 * (1073741822 - gf(h, g)) - 5E3), h = A + t);0 <= h && Mh < h && (Mh = h);m.effectTag |= 2048;m.expirationTime = g;break a;
                }m = m["return"];
              } while (null !== m);m = Error((ic(k.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display." + jc(k));
            }Nh = !0;m = jh(m, k);h = l;do {
              switch (h.tag) {case 3:
                  h.effectTag |= 2048;h.expirationTime = g;g = Ch(h, m, g);eh(h, g);break a;case 1:
                  if (t = m, A = h.type, k = h.stateNode, 0 === (h.effectTag & 64) && ("function" === typeof A.getDerivedStateFromError || null !== k && "function" === typeof k.componentDidCatch && (null === Fh || !Fh.has(k)))) {
                    h.effectTag |= 2048;
                    h.expirationTime = g;g = Eh(h, t, g);eh(h, g);break a;
                  }}h = h["return"];
            } while (null !== h);
          }T = ai(f);continue;
        }
      }
    }break;
  } while (1);Kh = !1;Hh.current = c;Yg = Xg = Wg = null;lg();if (e) Lh = null, a.finishedWork = null;else if (null !== T) a.finishedWork = null;else {
    c = a.current.alternate;null === c ? x("281") : void 0;Lh = null;if (Nh) {
      e = a.latestPendingTime;f = a.latestSuspendedTime;g = a.latestPingedTime;if (0 !== e && e < d || 0 !== f && f < d || 0 !== g && g < d) {
        ff(a, d);fi(a, c, d, a.expirationTime, -1);return;
      }if (!a.didError && b) {
        a.didError = !0;d = a.nextExpirationTimeToWorkOn = d;
        b = a.expirationTime = 1073741823;fi(a, c, d, b, -1);return;
      }
    }b && -1 !== Mh ? (ff(a, d), b = 10 * (1073741822 - gf(a, d)), b < Mh && (Mh = b), b = 10 * (1073741822 - lf()), b = Mh - b, fi(a, c, d, a.expirationTime, 0 > b ? 0 : b)) : (a.pendingCommitExpirationTime = d, a.finishedWork = c);
  }
}
function sh(a, b) {
  for (var c = a["return"]; null !== c;) {
    switch (c.tag) {case 1:
        var d = c.stateNode;if ("function" === typeof c.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Fh || !Fh.has(d))) {
          a = jh(b, a);a = Eh(c, a, 1073741823);pf(c, a);qf(c, 1073741823);return;
        }break;case 3:
        a = jh(b, a);a = Ch(c, a, 1073741823);pf(c, a);qf(c, 1073741823);return;}c = c["return"];
  }3 === a.tag && (c = jh(b, a), c = Ch(a, c, 1073741823), pf(a, c), qf(a, 1073741823));
}
function mf(a, b) {
  var c = r.unstable_getCurrentPriorityLevel(),
      d = void 0;if (0 === (b.mode & 1)) d = 1073741823;else if (Kh && !Oh) d = U;else {
    switch (c) {case r.unstable_ImmediatePriority:
        d = 1073741823;break;case r.unstable_UserBlockingPriority:
        d = 1073741822 - 10 * (((1073741822 - a + 15) / 10 | 0) + 1);break;case r.unstable_NormalPriority:
        d = 1073741822 - 25 * (((1073741822 - a + 500) / 25 | 0) + 1);break;case r.unstable_LowPriority:case r.unstable_IdlePriority:
        d = 1;break;default:
        x("313");}null !== Lh && d === U && --d;
  }c === r.unstable_UserBlockingPriority && (0 === gi || d < gi) && (gi = d);return d;
}function ei(a, b, c) {
  var d = a.pingCache;null !== d && d["delete"](b);if (null !== Lh && U === c) Lh = null;else if (b = a.earliestSuspendedTime, d = a.latestSuspendedTime, 0 !== b && c <= b && c >= d) {
    a.didError = !1;b = a.latestPingedTime;if (0 === b || b > c) a.latestPingedTime = c;df(c, a);c = a.expirationTime;0 !== c && Xh(a, c);
  }
}function Ah(a, b) {
  var c = a.stateNode;null !== c && c["delete"](b);b = lf();b = mf(b, a);a = hi(a, b);null !== a && (cf(a, b), b = a.expirationTime, 0 !== b && Xh(a, b));
}
function hi(a, b) {
  a.expirationTime < b && (a.expirationTime = b);var c = a.alternate;null !== c && c.expirationTime < b && (c.expirationTime = b);var d = a["return"],
      e = null;if (null === d && 3 === a.tag) e = a.stateNode;else for (; null !== d;) {
    c = d.alternate;d.childExpirationTime < b && (d.childExpirationTime = b);null !== c && c.childExpirationTime < b && (c.childExpirationTime = b);if (null === d["return"] && 3 === d.tag) {
      e = d.stateNode;break;
    }d = d["return"];
  }return e;
}
function qf(a, b) {
  a = hi(a, b);null !== a && (!Kh && 0 !== U && b > U && Sh(), cf(a, b), Kh && !Oh && Lh === a || Xh(a, a.expirationTime), ii > ji && (ii = 0, x("185")));
}function ki(a, b, c, d, e) {
  return r.unstable_runWithPriority(r.unstable_ImmediatePriority, function () {
    return a(b, c, d, e);
  });
}var li = null,
    Y = null,
    mi = 0,
    ni = void 0,
    W = !1,
    oi = null,
    Z = 0,
    gi = 0,
    pi = !1,
    qi = null,
    X = !1,
    ri = !1,
    si = null,
    ti = r.unstable_now(),
    ui = 1073741822 - (ti / 10 | 0),
    vi = ui,
    ji = 50,
    ii = 0,
    wi = null;function xi() {
  ui = 1073741822 - ((r.unstable_now() - ti) / 10 | 0);
}
function yi(a, b) {
  if (0 !== mi) {
    if (b < mi) return;null !== ni && r.unstable_cancelCallback(ni);
  }mi = b;a = r.unstable_now() - ti;ni = r.unstable_scheduleCallback(zi, { timeout: 10 * (1073741822 - b) - a });
}function fi(a, b, c, d, e) {
  a.expirationTime = d;0 !== e || di() ? 0 < e && (a.timeoutHandle = ye(Ai.bind(null, a, b, c), e)) : (a.pendingCommitExpirationTime = c, a.finishedWork = b);
}function Ai(a, b, c) {
  a.pendingCommitExpirationTime = c;a.finishedWork = b;xi();vi = ui;Bi(a, c);
}function $h(a, b) {
  a.expirationTime = b;a.finishedWork = null;
}
function lf() {
  if (W) return vi;Ci();if (0 === Z || 1 === Z) xi(), vi = ui;return vi;
}function Xh(a, b) {
  null === a.nextScheduledRoot ? (a.expirationTime = b, null === Y ? (li = Y = a, a.nextScheduledRoot = a) : (Y = Y.nextScheduledRoot = a, Y.nextScheduledRoot = li)) : b > a.expirationTime && (a.expirationTime = b);W || (X ? ri && (oi = a, Z = 1073741823, Di(a, 1073741823, !1)) : 1073741823 === b ? Yh(1073741823, !1) : yi(a, b));
}
function Ci() {
  var a = 0,
      b = null;if (null !== Y) for (var c = Y, d = li; null !== d;) {
    var e = d.expirationTime;if (0 === e) {
      null === c || null === Y ? x("244") : void 0;if (d === d.nextScheduledRoot) {
        li = Y = d.nextScheduledRoot = null;break;
      } else if (d === li) li = e = d.nextScheduledRoot, Y.nextScheduledRoot = e, d.nextScheduledRoot = null;else if (d === Y) {
        Y = c;Y.nextScheduledRoot = li;d.nextScheduledRoot = null;break;
      } else c.nextScheduledRoot = d.nextScheduledRoot, d.nextScheduledRoot = null;d = c.nextScheduledRoot;
    } else {
      e > a && (a = e, b = d);if (d === Y) break;if (1073741823 === a) break;c = d;d = d.nextScheduledRoot;
    }
  }oi = b;Z = a;
}var Ei = !1;function di() {
  return Ei ? !0 : r.unstable_shouldYield() ? Ei = !0 : !1;
}function zi() {
  try {
    if (!di() && null !== li) {
      xi();var a = li;do {
        var b = a.expirationTime;0 !== b && ui <= b && (a.nextExpirationTimeToWorkOn = ui);a = a.nextScheduledRoot;
      } while (a !== li);
    }Yh(0, !0);
  } finally {
    Ei = !1;
  }
}
function Yh(a, b) {
  Ci();if (b) for (xi(), vi = ui; null !== oi && 0 !== Z && a <= Z && !(Ei && ui > Z);) {
    Di(oi, Z, ui > Z), Ci(), xi(), vi = ui;
  } else for (; null !== oi && 0 !== Z && a <= Z;) {
    Di(oi, Z, !1), Ci();
  }b && (mi = 0, ni = null);0 !== Z && yi(oi, Z);ii = 0;wi = null;if (null !== si) for (a = si, si = null, b = 0; b < a.length; b++) {
    var c = a[b];try {
      c._onComplete();
    } catch (d) {
      pi || (pi = !0, qi = d);
    }
  }if (pi) throw a = qi, qi = null, pi = !1, a;
}function Bi(a, b) {
  W ? x("253") : void 0;oi = a;Z = b;Di(a, b, !1);Yh(1073741823, !1);
}
function Di(a, b, c) {
  W ? x("245") : void 0;W = !0;if (c) {
    var d = a.finishedWork;null !== d ? Fi(a, d, b) : (a.finishedWork = null, d = a.timeoutHandle, -1 !== d && (a.timeoutHandle = -1, ze(d)), ci(a, c), d = a.finishedWork, null !== d && (di() ? a.finishedWork = d : Fi(a, d, b)));
  } else d = a.finishedWork, null !== d ? Fi(a, d, b) : (a.finishedWork = null, d = a.timeoutHandle, -1 !== d && (a.timeoutHandle = -1, ze(d)), ci(a, c), d = a.finishedWork, null !== d && Fi(a, d, b));W = !1;
}
function Fi(a, b, c) {
  var d = a.firstBatch;if (null !== d && d._expirationTime >= c && (null === si ? si = [d] : si.push(d), d._defer)) {
    a.finishedWork = b;a.expirationTime = 0;return;
  }a.finishedWork = null;a === wi ? ii++ : (wi = a, ii = 0);r.unstable_runWithPriority(r.unstable_ImmediatePriority, function () {
    Zh(a, b);
  });
}function Dh(a) {
  null === oi ? x("246") : void 0;oi.expirationTime = 0;pi || (pi = !0, qi = a);
}function Gi(a, b) {
  var c = X;X = !0;try {
    return a(b);
  } finally {
    (X = c) || W || Yh(1073741823, !1);
  }
}
function Hi(a, b) {
  if (X && !ri) {
    ri = !0;try {
      return a(b);
    } finally {
      ri = !1;
    }
  }return a(b);
}function Ii(a, b, c) {
  X || W || 0 === gi || (Yh(gi, !1), gi = 0);var d = X;X = !0;try {
    return r.unstable_runWithPriority(r.unstable_UserBlockingPriority, function () {
      return a(b, c);
    });
  } finally {
    (X = d) || W || Yh(1073741823, !1);
  }
}
function Ji(a, b, c, d, e) {
  var f = b.current;a: if (c) {
    c = c._reactInternalFiber;b: {
      2 === ed(c) && 1 === c.tag ? void 0 : x("170");var g = c;do {
        switch (g.tag) {case 3:
            g = g.stateNode.context;break b;case 1:
            if (J(g.type)) {
              g = g.stateNode.__reactInternalMemoizedMergedChildContext;break b;
            }}g = g["return"];
      } while (null !== g);x("171");g = void 0;
    }if (1 === c.tag) {
      var h = c.type;if (J(h)) {
        c = Ne(c, h, g);break a;
      }
    }c = g;
  } else c = He;null === b.context ? b.context = c : b.pendingContext = c;b = e;e = nf(d);e.payload = { element: a };b = void 0 === b ? null : b;null !== b && (e.callback = b);
  of();pf(f, e);qf(f, d);return d;
}function Ki(a, b, c, d) {
  var e = b.current,
      f = lf();e = mf(f, e);return Ji(a, b, c, e, d);
}function Li(a) {
  a = a.current;if (!a.child) return null;switch (a.child.tag) {case 5:
      return a.child.stateNode;default:
      return a.child.stateNode;}
}function Mi(a, b, c) {
  var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;return { $$typeof: Wb, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
}
Ab = function Ab(a, b, c) {
  switch (b) {case "input":
      yc(a, c);b = c.name;if ("radio" === c.type && null != b) {
        for (c = a; c.parentNode;) {
          c = c.parentNode;
        }c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');for (b = 0; b < c.length; b++) {
          var d = c[b];if (d !== a && d.form === a.form) {
            var e = Ka(d);e ? void 0 : x("90");Sb(d);yc(d, e);
          }
        }
      }break;case "textarea":
      de(a, c);break;case "select":
      b = c.value, null != b && ae(a, !!c.multiple, b, !1);}
};
function Ni(a) {
  var b = 1073741822 - 25 * (((1073741822 - lf() + 500) / 25 | 0) + 1);b >= Jh && (b = Jh - 1);this._expirationTime = Jh = b;this._root = a;this._callbacks = this._next = null;this._hasChildren = this._didComplete = !1;this._children = null;this._defer = !0;
}Ni.prototype.render = function (a) {
  this._defer ? void 0 : x("250");this._hasChildren = !0;this._children = a;var b = this._root._internalRoot,
      c = this._expirationTime,
      d = new Oi();Ji(a, b, null, c, d._onCommit);return d;
};
Ni.prototype.then = function (a) {
  if (this._didComplete) a();else {
    var b = this._callbacks;null === b && (b = this._callbacks = []);b.push(a);
  }
};
Ni.prototype.commit = function () {
  var a = this._root._internalRoot,
      b = a.firstBatch;this._defer && null !== b ? void 0 : x("251");if (this._hasChildren) {
    var c = this._expirationTime;if (b !== this) {
      this._hasChildren && (c = this._expirationTime = b._expirationTime, this.render(this._children));for (var d = null, e = b; e !== this;) {
        d = e, e = e._next;
      }null === d ? x("251") : void 0;d._next = e._next;this._next = b;a.firstBatch = this;
    }this._defer = !1;Bi(a, c);b = this._next;this._next = null;b = a.firstBatch = b;null !== b && b._hasChildren && b.render(b._children);
  } else this._next = null, this._defer = !1;
};Ni.prototype._onComplete = function () {
  if (!this._didComplete) {
    this._didComplete = !0;var a = this._callbacks;if (null !== a) for (var b = 0; b < a.length; b++) {
      (0, a[b])();
    }
  }
};function Oi() {
  this._callbacks = null;this._didCommit = !1;this._onCommit = this._onCommit.bind(this);
}Oi.prototype.then = function (a) {
  if (this._didCommit) a();else {
    var b = this._callbacks;null === b && (b = this._callbacks = []);b.push(a);
  }
};
Oi.prototype._onCommit = function () {
  if (!this._didCommit) {
    this._didCommit = !0;var a = this._callbacks;if (null !== a) for (var b = 0; b < a.length; b++) {
      var c = a[b];"function" !== typeof c ? x("191", c) : void 0;c();
    }
  }
};
function Pi(a, b, c) {
  b = K(3, null, null, b ? 3 : 0);a = { current: b, containerInfo: a, pendingChildren: null, pingCache: null, earliestPendingTime: 0, latestPendingTime: 0, earliestSuspendedTime: 0, latestSuspendedTime: 0, latestPingedTime: 0, didError: !1, pendingCommitExpirationTime: 0, finishedWork: null, timeoutHandle: -1, context: null, pendingContext: null, hydrate: c, nextExpirationTimeToWorkOn: 0, expirationTime: 0, firstBatch: null, nextScheduledRoot: null };this._internalRoot = b.stateNode = a;
}
Pi.prototype.render = function (a, b) {
  var c = this._internalRoot,
      d = new Oi();b = void 0 === b ? null : b;null !== b && d.then(b);Ki(a, c, null, d._onCommit);return d;
};Pi.prototype.unmount = function (a) {
  var b = this._internalRoot,
      c = new Oi();a = void 0 === a ? null : a;null !== a && c.then(a);Ki(null, b, null, c._onCommit);return c;
};Pi.prototype.legacy_renderSubtreeIntoContainer = function (a, b, c) {
  var d = this._internalRoot,
      e = new Oi();c = void 0 === c ? null : c;null !== c && e.then(c);Ki(b, d, a, e._onCommit);return e;
};
Pi.prototype.createBatch = function () {
  var a = new Ni(this),
      b = a._expirationTime,
      c = this._internalRoot,
      d = c.firstBatch;if (null === d) c.firstBatch = a, a._next = null;else {
    for (c = null; null !== d && d._expirationTime >= b;) {
      c = d, d = d._next;
    }a._next = d;null !== c && (c._next = a);
  }return a;
};function Qi(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
}Gb = Gi;Hb = Ii;Ib = function Ib() {
  W || 0 === gi || (Yh(gi, !1), gi = 0);
};
function Ri(a, b) {
  b || (b = a ? 9 === a.nodeType ? a.documentElement : a.firstChild : null, b = !(!b || 1 !== b.nodeType || !b.hasAttribute("data-reactroot")));if (!b) for (var c; c = a.lastChild;) {
    a.removeChild(c);
  }return new Pi(a, !1, b);
}
function Si(a, b, c, d, e) {
  var f = c._reactRootContainer;if (f) {
    if ("function" === typeof e) {
      var g = e;e = function e() {
        var a = Li(f._internalRoot);g.call(a);
      };
    }null != a ? f.legacy_renderSubtreeIntoContainer(a, b, e) : f.render(b, e);
  } else {
    f = c._reactRootContainer = Ri(c, d);if ("function" === typeof e) {
      var h = e;e = function e() {
        var a = Li(f._internalRoot);h.call(a);
      };
    }Hi(function () {
      null != a ? f.legacy_renderSubtreeIntoContainer(a, b, e) : f.render(b, e);
    });
  }return Li(f._internalRoot);
}
function Ti(a, b) {
  var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;Qi(b) ? void 0 : x("200");return Mi(a, b, null, c);
}
var Vi = { createPortal: Ti, findDOMNode: function findDOMNode(a) {
    if (null == a) return null;if (1 === a.nodeType) return a;var b = a._reactInternalFiber;void 0 === b && ("function" === typeof a.render ? x("188") : x("268", Object.keys(a)));a = hd(b);a = null === a ? null : a.stateNode;return a;
  }, hydrate: function hydrate(a, b, c) {
    Qi(b) ? void 0 : x("200");return Si(null, a, b, !0, c);
  }, render: function render(a, b, c) {
    Qi(b) ? void 0 : x("200");return Si(null, a, b, !1, c);
  }, unstable_renderSubtreeIntoContainer: function unstable_renderSubtreeIntoContainer(a, b, c, d) {
    Qi(c) ? void 0 : x("200");null == a || void 0 === a._reactInternalFiber ? x("38") : void 0;return Si(a, b, c, !1, d);
  }, unmountComponentAtNode: function unmountComponentAtNode(a) {
    Qi(a) ? void 0 : x("40");return a._reactRootContainer ? (Hi(function () {
      Si(null, null, a, !1, function () {
        a._reactRootContainer = null;
      });
    }), !0) : !1;
  }, unstable_createPortal: function unstable_createPortal() {
    return Ti.apply(void 0, arguments);
  }, unstable_batchedUpdates: Gi, unstable_interactiveUpdates: Ii, flushSync: function flushSync(a, b) {
    W ? x("187") : void 0;var c = X;X = !0;try {
      return ki(a, b);
    } finally {
      X = c, Yh(1073741823, !1);
    }
  }, unstable_createRoot: Ui, unstable_flushControlled: function unstable_flushControlled(a) {
    var b = X;X = !0;try {
      ki(a);
    } finally {
      (X = b) || W || Yh(1073741823, !1);
    }
  }, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: { Events: [Ia, Ja, Ka, Ba.injectEventPluginsByName, pa, Qa, function (a) {
      ya(a, Pa);
    }, Eb, Fb, Dd, Da] } };function Ui(a, b) {
  Qi(a) ? void 0 : x("299", "unstable_createRoot");return new Pi(a, !0, null != b && !0 === b.hydrate);
}
(function (a) {
  var b = a.findFiberByHostInstance;return Te(n({}, a, { overrideProps: null, currentDispatcherRef: Tb.ReactCurrentDispatcher, findHostInstanceByFiber: function findHostInstanceByFiber(a) {
      a = hd(a);return null === a ? null : a.stateNode;
    }, findFiberByHostInstance: function findFiberByHostInstance(a) {
      return b ? b(a) : null;
    } }));
})({ findFiberByHostInstance: Ha, bundleType: 0, version: "16.8.6", rendererPackageName: "react-dom" });var Wi = { "default": Vi },
    Xi = Wi && Vi || Wi;module.exports = Xi["default"] || Xi;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(37);
} else {
  module.exports = require('./cjs/scheduler.development.js');
}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/** @license React v0.13.6
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", { value: !0 });var d = null,
    e = !1,
    g = 3,
    k = -1,
    l = -1,
    m = !1,
    n = !1;function p() {
  if (!m) {
    var a = d.expirationTime;n ? q() : n = !0;_r(t, a);
  }
}
function u() {
  var a = d,
      b = d.next;if (d === b) d = null;else {
    var c = d.previous;d = c.next = b;b.previous = c;
  }a.next = a.previous = null;c = a.callback;b = a.expirationTime;a = a.priorityLevel;var f = g,
      Q = l;g = a;l = b;try {
    var h = c();
  } finally {
    g = f, l = Q;
  }if ("function" === typeof h) if (h = { callback: h, priorityLevel: a, expirationTime: b, next: null, previous: null }, null === d) d = h.next = h.previous = h;else {
    c = null;a = d;do {
      if (a.expirationTime >= b) {
        c = a;break;
      }a = a.next;
    } while (a !== d);null === c ? c = d : c === d && (d = h, p());b = c.previous;b.next = c.previous = h;h.next = c;h.previous = b;
  }
}function v() {
  if (-1 === k && null !== d && 1 === d.priorityLevel) {
    m = !0;try {
      do {
        u();
      } while (null !== d && 1 === d.priorityLevel);
    } finally {
      m = !1, null !== d ? p() : n = !1;
    }
  }
}function t(a) {
  m = !0;var b = e;e = a;try {
    if (a) for (; null !== d;) {
      var c = exports.unstable_now();if (d.expirationTime <= c) {
        do {
          u();
        } while (null !== d && d.expirationTime <= c);
      } else break;
    } else if (null !== d) {
      do {
        u();
      } while (null !== d && !w());
    }
  } finally {
    m = !1, e = b, null !== d ? p() : n = !1, v();
  }
}
var x = Date,
    y = "function" === typeof setTimeout ? setTimeout : void 0,
    z = "function" === typeof clearTimeout ? clearTimeout : void 0,
    A = "function" === typeof requestAnimationFrame ? requestAnimationFrame : void 0,
    B = "function" === typeof cancelAnimationFrame ? cancelAnimationFrame : void 0,
    C,
    D;function E(a) {
  C = A(function (b) {
    z(D);a(b);
  });D = y(function () {
    B(C);a(exports.unstable_now());
  }, 100);
}
if ("object" === (typeof performance === "undefined" ? "undefined" : _typeof(performance)) && "function" === typeof performance.now) {
  var F = performance;exports.unstable_now = function () {
    return F.now();
  };
} else exports.unstable_now = function () {
  return x.now();
};var _r,
    q,
    w,
    G = null;"undefined" !== typeof window ? G = window : "undefined" !== typeof global && (G = global);
if (G && G._schedMock) {
  var H = G._schedMock;_r = H[0];q = H[1];w = H[2];exports.unstable_now = H[3];
} else if ("undefined" === typeof window || "function" !== typeof MessageChannel) {
  var I = null,
      J = function J(a) {
    if (null !== I) try {
      I(a);
    } finally {
      I = null;
    }
  };_r = function r(a) {
    null !== I ? setTimeout(_r, 0, a) : (I = a, setTimeout(J, 0, !1));
  };q = function q() {
    I = null;
  };w = function w() {
    return !1;
  };
} else {
  "undefined" !== typeof console && ("function" !== typeof A && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"), "function" !== typeof B && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"));var K = null,
      L = !1,
      M = -1,
      N = !1,
      O = !1,
      P = 0,
      R = 33,
      S = 33;w = function w() {
    return P <= exports.unstable_now();
  };var T = new MessageChannel(),
      U = T.port2;T.port1.onmessage = function () {
    L = !1;var a = K,
        b = M;K = null;M = -1;var c = exports.unstable_now(),
        f = !1;if (0 >= P - c) if (-1 !== b && b <= c) f = !0;else {
      N || (N = !0, E(V));K = a;M = b;return;
    }if (null !== a) {
      O = !0;try {
        a(f);
      } finally {
        O = !1;
      }
    }
  };
  var V = function V(a) {
    if (null !== K) {
      E(V);var b = a - P + S;b < S && R < S ? (8 > b && (b = 8), S = b < R ? R : b) : R = b;P = a + S;L || (L = !0, U.postMessage(void 0));
    } else N = !1;
  };_r = function _r(a, b) {
    K = a;M = b;O || 0 > b ? U.postMessage(void 0) : N || (N = !0, E(V));
  };q = function q() {
    K = null;L = !1;M = -1;
  };
}exports.unstable_ImmediatePriority = 1;exports.unstable_UserBlockingPriority = 2;exports.unstable_NormalPriority = 3;exports.unstable_IdlePriority = 5;exports.unstable_LowPriority = 4;
exports.unstable_runWithPriority = function (a, b) {
  switch (a) {case 1:case 2:case 3:case 4:case 5:
      break;default:
      a = 3;}var c = g,
      f = k;g = a;k = exports.unstable_now();try {
    return b();
  } finally {
    g = c, k = f, v();
  }
};exports.unstable_next = function (a) {
  switch (g) {case 1:case 2:case 3:
      var b = 3;break;default:
      b = g;}var c = g,
      f = k;g = b;k = exports.unstable_now();try {
    return a();
  } finally {
    g = c, k = f, v();
  }
};
exports.unstable_scheduleCallback = function (a, b) {
  var c = -1 !== k ? k : exports.unstable_now();if ("object" === (typeof b === "undefined" ? "undefined" : _typeof(b)) && null !== b && "number" === typeof b.timeout) b = c + b.timeout;else switch (g) {case 1:
      b = c + -1;break;case 2:
      b = c + 250;break;case 5:
      b = c + 1073741823;break;case 4:
      b = c + 1E4;break;default:
      b = c + 5E3;}a = { callback: a, priorityLevel: g, expirationTime: b, next: null, previous: null };if (null === d) d = a.next = a.previous = a, p();else {
    c = null;var f = d;do {
      if (f.expirationTime > b) {
        c = f;break;
      }f = f.next;
    } while (f !== d);null === c ? c = d : c === d && (d = a, p());
    b = c.previous;b.next = c.previous = a;a.next = c;a.previous = b;
  }return a;
};exports.unstable_cancelCallback = function (a) {
  var b = a.next;if (null !== b) {
    if (b === a) d = null;else {
      a === d && (d = b);var c = a.previous;c.next = b;b.previous = c;
    }a.next = a.previous = null;
  }
};exports.unstable_wrapCallback = function (a) {
  var b = g;return function () {
    var c = g,
        f = k;g = b;k = exports.unstable_now();try {
      return a.apply(this, arguments);
    } finally {
      g = c, k = f, v();
    }
  };
};exports.unstable_getCurrentPriorityLevel = function () {
  return g;
};
exports.unstable_shouldYield = function () {
  return !e && (null !== d && d.expirationTime < l || w());
};exports.unstable_continueExecution = function () {
  null !== d && p();
};exports.unstable_pauseExecution = function () {};exports.unstable_getFirstCallbackNode = function () {
  return d;
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(38)))

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhenixPlayer = exports.JWPlayer = exports.VAST = exports.FilePlayer = exports.Mixcloud = exports.Iframe = exports.UstreamVideo = exports.UstreamLive = exports.DailyMotion = exports.Twitch = exports.Wistia = exports.FaceMask = exports.Streamable = exports.Facebook = exports.Vimeo = exports.SoundCloud = exports.YouTube = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _YouTube = __webpack_require__(5);

Object.defineProperty(exports, 'YouTube', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_YouTube)['default'];
  }
});

var _SoundCloud = __webpack_require__(7);

Object.defineProperty(exports, 'SoundCloud', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SoundCloud)['default'];
  }
});

var _Vimeo = __webpack_require__(8);

Object.defineProperty(exports, 'Vimeo', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Vimeo)['default'];
  }
});

var _Facebook = __webpack_require__(14);

Object.defineProperty(exports, 'Facebook', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Facebook)['default'];
  }
});

var _Streamable = __webpack_require__(15);

Object.defineProperty(exports, 'Streamable', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Streamable)['default'];
  }
});

var _FaceMask = __webpack_require__(16);

Object.defineProperty(exports, 'FaceMask', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_FaceMask)['default'];
  }
});

var _Wistia = __webpack_require__(17);

Object.defineProperty(exports, 'Wistia', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Wistia)['default'];
  }
});

var _Twitch = __webpack_require__(18);

Object.defineProperty(exports, 'Twitch', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Twitch)['default'];
  }
});

var _DailyMotion = __webpack_require__(9);

Object.defineProperty(exports, 'DailyMotion', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_DailyMotion)['default'];
  }
});

var _UstreamLive = __webpack_require__(19);

Object.defineProperty(exports, 'UstreamLive', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_UstreamLive)['default'];
  }
});

var _UstreamVideo = __webpack_require__(20);

Object.defineProperty(exports, 'UstreamVideo', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_UstreamVideo)['default'];
  }
});

var _Iframe = __webpack_require__(21);

Object.defineProperty(exports, 'Iframe', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Iframe)['default'];
  }
});

var _Mixcloud = __webpack_require__(22);

Object.defineProperty(exports, 'Mixcloud', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Mixcloud)['default'];
  }
});

var _FilePlayer = __webpack_require__(10);

Object.defineProperty(exports, 'FilePlayer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_FilePlayer)['default'];
  }
});

var _VAST = __webpack_require__(23);

Object.defineProperty(exports, 'VAST', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_VAST)['default'];
  }
});

var _JWPlayer = __webpack_require__(30);

Object.defineProperty(exports, 'JWPlayer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_JWPlayer)['default'];
  }
});

var _PhenixPlayer = __webpack_require__(31);

Object.defineProperty(exports, 'PhenixPlayer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PhenixPlayer)['default'];
  }
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _props2 = __webpack_require__(4);

var _utils = __webpack_require__(1);

var _players = __webpack_require__(69);

var _players2 = _interopRequireDefault(_players);

var _Player4 = __webpack_require__(6);

var _Player5 = _interopRequireDefault(_Player4);

var _Preview = __webpack_require__(70);

var _Preview2 = _interopRequireDefault(_Preview);

var _preload = __webpack_require__(71);

var _preload2 = _interopRequireDefault(_preload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SUPPORTED_PROPS = Object.keys(_props2.propTypes);

var customPlayers = [];

var ReactPlayer = function (_Component) {
  _inherits(ReactPlayer, _Component);

  function ReactPlayer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ReactPlayer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ReactPlayer.__proto__ || Object.getPrototypeOf(ReactPlayer)).call.apply(_ref, [this].concat(args))), _this), _this.config = (0, _utils.getConfig)(_this.props, _props2.defaultProps, true), _this.state = {
      showPreview: !!_this.props.light
    }, _this.onClickPreview = function () {
      _this.setState({ showPreview: false });
    }, _this.getDuration = function () {
      if (!_this.player) return null;
      return _this.player.getDuration();
    }, _this.getCurrentTime = function () {
      if (!_this.player) return null;
      return _this.player.getCurrentTime();
    }, _this.getSecondsLoaded = function () {
      if (!_this.player) return null;
      return _this.player.getSecondsLoaded();
    }, _this.getInternalPlayer = function () {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'player';

      if (!_this.player) return null;
      return _this.player.getInternalPlayer(key);
    }, _this.seekTo = function (fraction, type) {
      if (!_this.player) return null;
      _this.player.seekTo(fraction, type);
    }, _this.onReady = function () {
      _this.props.onReady(_this);
    }, _this.wrapperRef = function (wrapper) {
      _this.wrapper = wrapper;
    }, _this.activePlayerRef = function (player) {
      _this.player = player;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ReactPlayer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.progressFrequency) {
        var message = 'ReactPlayer: %cprogressFrequency%c is deprecated, please use %cprogressInterval%c instead';
        console.warn(message, 'font-weight: bold', '', 'font-weight: bold', '');
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _utils.isEqual)(this.props, nextProps) || !(0, _utils.isEqual)(this.state, nextState);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      this.config = (0, _utils.getConfig)(nextProps, _props2.defaultProps);
      if (!this.props.light && nextProps.light) {
        this.setState({ showPreview: true });
      }
    }
  }, {
    key: 'getActivePlayer',
    value: function getActivePlayer(url) {
      var _arr = [].concat(_toConsumableArray(customPlayers), _toConsumableArray(_players2['default']));

      for (var _i = 0; _i < _arr.length; _i++) {
        var _Player = _arr[_i];
        if (_Player.canPlay(url)) {
          return _Player;
        }
      }
      // Fall back to FilePlayer if nothing else can play the URL
      return _Iframe.Iframe;
    }
  }, {
    key: 'renderActivePlayer',
    value: function renderActivePlayer(url, activePlayer) {
      if (!url) return null;
      return _react2['default'].createElement(_Player5['default'], _extends({}, this.props, {
        key: activePlayer.displayName,
        ref: this.activePlayerRef,
        config: this.config,
        activePlayer: activePlayer,
        onReady: this.onReady
      }));
    }
  }, {
    key: 'sortPlayers',
    value: function sortPlayers(a, b) {
      // Retain player order to prevent weird iframe behaviour when switching players
      if (a && b) {
        return a.key < b.key ? -1 : 1;
      }
      return 0;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          url = _props.url,
          controls = _props.controls,
          style = _props.style,
          width = _props.width,
          height = _props.height,
          light = _props.light,
          Wrapper = _props.wrapper;

      var showPreview = this.state.showPreview && url;
      var otherProps = (0, _utils.omit)(this.props, SUPPORTED_PROPS, _props2.DEPRECATED_CONFIG_PROPS);
      var activePlayer = this.getActivePlayer(url);
      var renderedActivePlayer = this.renderActivePlayer(url, activePlayer);
      var preloadPlayers = (0, _preload2['default'])(url, controls, this.config);
      var players = [renderedActivePlayer].concat(_toConsumableArray(preloadPlayers)).sort(this.sortPlayers);
      var preview = _react2['default'].createElement(_Preview2['default'], { url: url, light: light, onClick: this.onClickPreview });
      return _react2['default'].createElement(
        Wrapper,
        _extends({ ref: this.wrapperRef, style: _extends({}, style, { width: width, height: height }) }, otherProps),
        showPreview ? preview : players
      );
    }
  }]);

  return ReactPlayer;
}(_react.Component);

ReactPlayer.addCustomPlayer = function (player) {
  customPlayers.push(player);
};

ReactPlayer.removeCustomPlayers = function () {
  customPlayers = [];
};

ReactPlayer.displayName = 'ReactPlayer';
ReactPlayer.propTypes = _props2.propTypes;
ReactPlayer.defaultProps = _props2.defaultProps;

ReactPlayer.canPlay = function (url) {
  var _arr2 = [].concat(_toConsumableArray(customPlayers), _toConsumableArray(_players2['default']));

  for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
    var _Player2 = _arr2[_i2];
    if (_Player2.canPlay(url)) {
      return true;
    }
  }
  return false;
};

ReactPlayer.canEnablePIP = function (url) {
  var _arr3 = [].concat(_toConsumableArray(customPlayers), _toConsumableArray(_players2['default']));

  for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
    var _Player3 = _arr3[_i3];
    if (_Player3.canEnablePIP && _Player3.canEnablePIP(url)) {
      return true;
    }
  }
  return false;
};

exports['default'] = ReactPlayer;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function load(src, opts, cb) {
  var head = document.head || document.getElementsByTagName('head')[0];
  var script = document.createElement('script');

  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }

  opts = opts || {};
  cb = cb || function () {};

  script.type = opts.type || 'text/javascript';
  script.charset = opts.charset || 'utf8';
  script.async = 'async' in opts ? !!opts.async : true;
  script.src = src;

  if (opts.attrs) {
    setAttributes(script, opts.attrs);
  }

  if (opts.text) {
    script.text = '' + opts.text;
  }

  var onend = 'onload' in script ? stdOnEnd : ieOnEnd;
  onend(script, cb);

  // some good legacy browsers (firefox) fail the 'in' detection above
  // so as a fallback we always set onload
  // old IE will ignore this and new IE will set onload
  if (!script.onload) {
    stdOnEnd(script, cb);
  }

  head.appendChild(script);
};

function setAttributes(script, attrs) {
  for (var attr in attrs) {
    script.setAttribute(attr, attrs[attr]);
  }
}

function stdOnEnd(script, cb) {
  script.onload = function () {
    this.onerror = this.onload = null;
    cb(null, script);
  };
  script.onerror = function () {
    // this.onload = null here is necessary
    // because even IE9 works not like others
    this.onerror = this.onload = null;
    cb(new Error('Failed to load ' + this.src), script);
  };
}

function ieOnEnd(script, cb) {
  script.onreadystatechange = function () {
    if (this.readyState != 'complete' && this.readyState != 'loaded') return;
    this.onreadystatechange = null;
    cb(null, script); // there is no way to catch loading errors in IE8
  };
}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (global, factory) {
	( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.deepmerge = factory();
})(undefined, function () {
	'use strict';

	var isMergeableObject = function isMergeableObject(value) {
		return isNonNullObject(value) && !isSpecial(value);
	};

	function isNonNullObject(value) {
		return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
	}

	function isSpecial(value) {
		var stringValue = Object.prototype.toString.call(value);

		return stringValue === '[object RegExp]' || stringValue === '[object Date]' || isReactElement(value);
	}

	// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
	var canUseSymbol = typeof Symbol === 'function' && Symbol['for'];
	var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol['for']('react.element') : 0xeac7;

	function isReactElement(value) {
		return value.$$typeof === REACT_ELEMENT_TYPE;
	}

	function emptyTarget(val) {
		return Array.isArray(val) ? [] : {};
	}

	function cloneUnlessOtherwiseSpecified(value, options) {
		return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
	}

	function defaultArrayMerge(target, source, options) {
		return target.concat(source).map(function (element) {
			return cloneUnlessOtherwiseSpecified(element, options);
		});
	}

	function getMergeFunction(key, options) {
		if (!options.customMerge) {
			return deepmerge;
		}
		var customMerge = options.customMerge(key);
		return typeof customMerge === 'function' ? customMerge : deepmerge;
	}

	function mergeObject(target, source, options) {
		var destination = {};
		if (options.isMergeableObject(target)) {
			Object.keys(target).forEach(function (key) {
				destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
			});
		}
		Object.keys(source).forEach(function (key) {
			if (!options.isMergeableObject(source[key]) || !target[key]) {
				destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
			} else {
				destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
			}
		});
		return destination;
	}

	function deepmerge(target, source, options) {
		options = options || {};
		options.arrayMerge = options.arrayMerge || defaultArrayMerge;
		options.isMergeableObject = options.isMergeableObject || isMergeableObject;

		var sourceIsArray = Array.isArray(source);
		var targetIsArray = Array.isArray(target);
		var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

		if (!sourceAndTargetTypesMatch) {
			return cloneUnlessOtherwiseSpecified(source, options);
		} else if (sourceIsArray) {
			return options.arrayMerge(target, source, options);
		} else {
			return mergeObject(target, source, options);
		}
	}

	deepmerge.all = function deepmergeAll(array, options) {
		if (!Array.isArray(array)) {
			throw new Error('first argument should be an array');
		}

		return array.reduce(function (prev, next) {
			return deepmerge(prev, next, options);
		}, {});
	};

	var deepmerge_1 = deepmerge;

	return deepmerge_1;
});

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) {
  var ReactIs = require('react-is');

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(ReactIs.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(43)();
}

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(44);

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function () {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(24);
var unique = utils.unique('vpaidIframe');
var VPAIDAdUnit = __webpack_require__(46);

var defaultTemplate = '<!DOCTYPE html>' + '<html lang="en">' + '<head><meta charset="UTF-8"></head>' + '<body style="margin:0;padding:0"><div class="ad-element"></div>' + '<script type="text/javascript" src="{{iframeURL_JS}}"></script>' + '<script type="text/javascript">' + 'window.parent.postMessage(\'{"event": "ready", "id": "{{iframeID}}"}\', \'{{origin}}\');' + '</script>' + '</body>' + '</html>';

var AD_STOPPED = 'AdStopped';

/**
 * This callback is displayed as global member. The callback use nodejs error-first callback style
 * @callback NodeStyleCallback
 * @param {string|null}
 * @param {undefined|object}
 */

/**
 * VPAIDHTML5Client
 * @class
 *
 * @param {HTMLElement} el that will contain the iframe to load adUnit and a el to add to adUnit slot
 * @param {HTMLVideoElement} video default video element to be used by adUnit
 * @param {object} [templateConfig] template: html template to be used instead of the default, extraOptions: to be used when rendering the template
 * @param {object} [vpaidOptions] timeout: when loading adUnit
 */
function VPAIDHTML5Client(el, video, templateConfig, vpaidOptions) {
    templateConfig = templateConfig || {};

    this._id = unique();
    this._destroyed = false;

    this._frameContainer = utils.createElementInEl(el, 'div');
    this._videoEl = video;
    this._vpaidOptions = vpaidOptions || { timeout: 10000 };

    this._templateConfig = {
        template: templateConfig.template || defaultTemplate,
        extraOptions: templateConfig.extraOptions || {}
    };
}

/**
 * destroy
 *
 */
VPAIDHTML5Client.prototype.destroy = function destroy() {
    if (this._destroyed) {
        return;
    }
    this._destroyed = true;
    $unloadPreviousAdUnit.call(this);
};

/**
 * isDestroyed
 *
 * @return {boolean}
 */
VPAIDHTML5Client.prototype.isDestroyed = function isDestroyed() {
    return this._destroyed;
};

/**
 * loadAdUnit
 *
 * @param {string} adURL url of the js of the adUnit
 * @param {nodeStyleCallback} callback
 */
VPAIDHTML5Client.prototype.loadAdUnit = function loadAdUnit(adURL, callback) {
    $throwIfDestroyed.call(this);
    $unloadPreviousAdUnit.call(this);
    var that = this;

    var frame = utils.createIframeWithContent(this._frameContainer, this._templateConfig.template, utils.extend({
        iframeURL_JS: adURL,
        iframeID: this.getID(),
        origin: getOrigin()
    }, this._templateConfig.extraOptions));

    this._frame = frame;

    this._onLoad = utils.callbackTimeout(this._vpaidOptions.timeout, onLoad.bind(this), onTimeout.bind(this));

    window.addEventListener('message', this._onLoad);

    function onLoad(e) {
        /*jshint validthis: false */
        //don't clear timeout
        if (e.origin !== getOrigin()) return;
        var result = JSON.parse(e.data);

        //don't clear timeout
        if (result.id !== that.getID()) return;

        var adUnit, error, createAd;
        if (!that._frame.contentWindow) {

            error = 'the iframe is not anymore in the DOM tree';
        } else {
            createAd = that._frame.contentWindow.getVPAIDAd;
            error = utils.validate(typeof createAd === 'function', 'the ad didn\'t return a function to create an ad');
        }

        if (!error) {
            var adEl = that._frame.contentWindow.document.querySelector('.ad-element');
            adUnit = new VPAIDAdUnit(createAd(), adEl, that._videoEl, that._frame);
            adUnit.subscribe(AD_STOPPED, $adDestroyed.bind(that));
            error = utils.validate(adUnit.isValidVPAIDAd(), 'the add is not fully complaint with VPAID specification');
        }

        that._adUnit = adUnit;
        $destroyLoadListener.call(that);
        callback(error, error ? null : adUnit);

        //clear timeout
        return true;
    }

    function onTimeout() {
        callback('timeout', null);
    }
};

/**
 * unloadAdUnit
 *
 */
VPAIDHTML5Client.prototype.unloadAdUnit = function unloadAdUnit() {
    $unloadPreviousAdUnit.call(this);
};

/**
 * getID will return the unique id
 *
 * @return {string}
 */
VPAIDHTML5Client.prototype.getID = function () {
    return this._id;
};

/**
 * $removeEl
 *
 * @param {string} key
 */
function $removeEl(key) {
    var el = this[key];
    if (el) {
        el.remove();
        delete this[key];
    }
}

function $adDestroyed() {
    $removeAdElements.call(this);
    delete this._adUnit;
}

function $unloadPreviousAdUnit() {
    $removeAdElements.call(this);
    $destroyAdUnit.call(this);
}

function $removeAdElements() {
    $removeEl.call(this, '_frame');
    $destroyLoadListener.call(this);
}

/**
 * $destroyLoadListener
 *
 */
function $destroyLoadListener() {
    if (this._onLoad) {
        window.removeEventListener('message', this._onLoad);
        utils.clearCallbackTimeout(this._onLoad);
        delete this._onLoad;
    }
}

function $destroyAdUnit() {
    if (this._adUnit) {
        this._adUnit.stopAd();
        delete this._adUnit;
    }
}

/**
 * $throwIfDestroyed
 *
 */
function $throwIfDestroyed() {
    if (this._destroyed) {
        throw new Error('VPAIDHTML5Client already destroyed!');
    }
}

function getOrigin() {
    if (window.location.origin) {
        return window.location.origin;
    } else {
        return window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    }
}

module.exports = VPAIDHTML5Client;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var IVPAIDAdUnit = __webpack_require__(47);
var Subscriber = __webpack_require__(48);
var checkVPAIDInterface = IVPAIDAdUnit.checkVPAIDInterface;
var utils = __webpack_require__(24);
var METHODS = IVPAIDAdUnit.METHODS;
var ERROR = 'AdError';
var AD_CLICK = 'AdClickThru';
var FILTERED_EVENTS = IVPAIDAdUnit.EVENTS.filter(function (event) {
    return event != AD_CLICK;
});

/**
 * This callback is displayed as global member. The callback use nodejs error-first callback style
 * @callback NodeStyleCallback
 * @param {string|null}
 * @param {undefined|object}
 */

/**
 * VPAIDAdUnit
 * @class
 *
 * @param VPAIDCreative
 * @param {HTMLElement} [el] this will be used in initAd environmentVars.slot if defined
 * @param {HTMLVideoElement} [video] this will be used in initAd environmentVars.videoSlot if defined
 */
function VPAIDAdUnit(VPAIDCreative, el, video, iframe) {
    this._isValid = checkVPAIDInterface(VPAIDCreative);
    if (this._isValid) {
        this._creative = VPAIDCreative;
        this._el = el;
        this._videoEl = video;
        this._iframe = iframe;
        this._subscribers = new Subscriber();
        utils.setFullSizeStyle(el);
        $addEventsSubscribers.call(this);
    }
}

VPAIDAdUnit.prototype = Object.create(IVPAIDAdUnit.prototype);

/**
 * isValidVPAIDAd will return if the VPAIDCreative passed in constructor is valid or not
 *
 * @return {boolean}
 */
VPAIDAdUnit.prototype.isValidVPAIDAd = function isValidVPAIDAd() {
    return this._isValid;
};

IVPAIDAdUnit.METHODS.forEach(function (method) {
    //NOTE: this methods arguments order are implemented differently from the spec
    var ignores = ['subscribe', 'unsubscribe', 'initAd'];

    if (ignores.indexOf(method) !== -1) return;

    VPAIDAdUnit.prototype[method] = function () {
        var ariaty = IVPAIDAdUnit.prototype[method].length;
        // TODO avoid leaking arguments
        // https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
        var args = Array.prototype.slice.call(arguments);
        var callback = ariaty === args.length ? args.pop() : undefined;

        setTimeout(function () {
            var result,
                error = null;
            try {
                result = this._creative[method].apply(this._creative, args);
            } catch (e) {
                error = e;
            }

            callOrTriggerEvent(callback, this._subscribers, error, result);
        }.bind(this), 0);
    };
});

/**
 * initAd concreate implementation
 *
 * @param {number} width
 * @param {number} height
 * @param {string} viewMode can be 'normal', 'thumbnail' or 'fullscreen'
 * @param {number} desiredBitrate indicates the desired bitrate in kbps
 * @param {object} [creativeData] used for additional initialization data
 * @param {object} [environmentVars] used for passing implementation-specific of js version, if el & video was used in constructor slot & videoSlot will be added to the object
 * @param {NodeStyleCallback} callback
 */
VPAIDAdUnit.prototype.initAd = function initAd(width, height, viewMode, desiredBitrate, creativeData, environmentVars, callback) {
    creativeData = creativeData || {};
    environmentVars = utils.extend({
        slot: this._el,
        videoSlot: this._videoEl
    }, environmentVars || {});

    setTimeout(function () {
        var error;
        try {
            this._creative.initAd(width, height, viewMode, desiredBitrate, creativeData, environmentVars);
        } catch (e) {
            error = e;
        }

        callOrTriggerEvent(callback, this._subscribers, error);
    }.bind(this), 0);
};

/**
 * subscribe
 *
 * @param {string} event
 * @param {nodeStyleCallback} handler
 * @param {object} context
 */
VPAIDAdUnit.prototype.subscribe = function subscribe(event, handler, context) {
    this._subscribers.subscribe(handler, event, context);
};

/**
 * unsubscribe
 *
 * @param {string} event
 * @param {nodeStyleCallback} handler
 */
VPAIDAdUnit.prototype.unsubscribe = function unsubscribe(event, handler) {
    this._subscribers.unsubscribe(handler, event);
};

//alias
VPAIDAdUnit.prototype.on = VPAIDAdUnit.prototype.subscribe;
VPAIDAdUnit.prototype.off = VPAIDAdUnit.prototype.unsubscribe;

IVPAIDAdUnit.GETTERS.forEach(function (getter) {
    VPAIDAdUnit.prototype[getter] = function (callback) {
        setTimeout(function () {

            var result,
                error = null;
            try {
                result = this._creative[getter]();
            } catch (e) {
                error = e;
            }

            callOrTriggerEvent(callback, this._subscribers, error, result);
        }.bind(this), 0);
    };
});

/**
 * setAdVolume
 *
 * @param volume
 * @param {nodeStyleCallback} callback
 */
VPAIDAdUnit.prototype.setAdVolume = function setAdVolume(volume, callback) {
    setTimeout(function () {

        var result,
            error = null;
        try {
            this._creative.setAdVolume(volume);
            result = this._creative.getAdVolume();
        } catch (e) {
            error = e;
        }

        if (!error) {
            error = utils.validate(result === volume, 'failed to apply volume: ' + volume);
        }
        callOrTriggerEvent(callback, this._subscribers, error, result);
    }.bind(this), 0);
};

VPAIDAdUnit.prototype._destroy = function destroy() {
    this.stopAd();
    this._subscribers.unsubscribeAll();
};

function $addEventsSubscribers() {
    // some ads implement
    // so they only handle one subscriber
    // to handle this we create our one
    FILTERED_EVENTS.forEach(function (event) {
        this._creative.subscribe($trigger.bind(this, event), event);
    }.bind(this));

    // map the click event to be an object instead of depending of the order of the arguments
    // and to be consistent with the flash
    this._creative.subscribe($clickThruHook.bind(this), AD_CLICK);

    // because we are adding the element inside the iframe
    // the user is not able to click in the video
    if (this._videoEl) {
        var documentElement = this._iframe.contentDocument.documentElement;
        var videoEl = this._videoEl;
        documentElement.addEventListener('click', function (e) {
            if (e.target === documentElement) {
                videoEl.click();
            }
        });
    }
}

function $clickThruHook(url, id, playerHandles) {
    this._subscribers.triggerSync(AD_CLICK, { url: url, id: id, playerHandles: playerHandles });
}

function $trigger(event) {
    // TODO avoid leaking arguments
    // https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
    this._subscribers.trigger(event, Array.prototype.slice(arguments, 1));
}

function callOrTriggerEvent(callback, subscribers, error, result) {
    if (callback) {
        callback(error, result);
    } else if (error) {
        subscribers.trigger(ERROR, error);
    }
}

module.exports = VPAIDAdUnit;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var METHODS = ['handshakeVersion', 'initAd', 'startAd', 'stopAd', 'skipAd', // VPAID 2.0 new method
'resizeAd', 'pauseAd', 'resumeAd', 'expandAd', 'collapseAd', 'subscribe', 'unsubscribe'];

var EVENTS = ['AdLoaded', 'AdStarted', 'AdStopped', 'AdSkipped', 'AdSkippableStateChange', // VPAID 2.0 new event
'AdSizeChange', // VPAID 2.0 new event
'AdLinearChange', 'AdDurationChange', // VPAID 2.0 new event
'AdExpandedChange', 'AdRemainingTimeChange', // [Deprecated in 2.0] but will be still fired for backwards compatibility
'AdVolumeChange', 'AdImpression', 'AdVideoStart', 'AdVideoFirstQuartile', 'AdVideoMidpoint', 'AdVideoThirdQuartile', 'AdVideoComplete', 'AdClickThru', 'AdInteraction', // VPAID 2.0 new event
'AdUserAcceptInvitation', 'AdUserMinimize', 'AdUserClose', 'AdPaused', 'AdPlaying', 'AdLog', 'AdError'];

var GETTERS = ['getAdLinear', 'getAdWidth', // VPAID 2.0 new getter
'getAdHeight', // VPAID 2.0 new getter
'getAdExpanded', 'getAdSkippableState', // VPAID 2.0 new getter
'getAdRemainingTime', 'getAdDuration', // VPAID 2.0 new getter
'getAdVolume', 'getAdCompanions', // VPAID 2.0 new getter
'getAdIcons' // VPAID 2.0 new getter
];

var SETTERS = ['setAdVolume'];

/**
 * This callback is displayed as global member. The callback use nodejs error-first callback style
 * @callback NodeStyleCallback
 * @param {string|null}
 * @param {undefined|object}
 */

/**
 * IVPAIDAdUnit
 *
 * @class
 *
 * @param {object} creative
 * @param {HTMLElement} el
 * @param {HTMLVideoElement} video
 */
function IVPAIDAdUnit(creative, el, video) {}

/**
 * handshakeVersion
 *
 * @param {string} VPAIDVersion
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.handshakeVersion = function (VPAIDVersion, callback) {};

/**
 * initAd
 *
 * @param {number} width
 * @param {number} height
 * @param {string} viewMode can be 'normal', 'thumbnail' or 'fullscreen'
 * @param {number} desiredBitrate indicates the desired bitrate in kbps
 * @param {object} [creativeData] used for additional initialization data
 * @param {object} [environmentVars] used for passing implementation-specific of js version
 * @param {NodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.initAd = function (width, height, viewMode, desiredBitrate, creativeData, environmentVars, callback) {};

/**
 * startAd
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.startAd = function (callback) {};

/**
 * stopAd
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.stopAd = function (callback) {};

/**
 * skipAd
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.skipAd = function (callback) {};

/**
 * resizeAd
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.resizeAd = function (width, height, viewMode, callback) {};

/**
 * pauseAd
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.pauseAd = function (callback) {};

/**
 * resumeAd
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.resumeAd = function (callback) {};

/**
 * expandAd
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.expandAd = function (callback) {};

/**
 * collapseAd
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.collapseAd = function (callback) {};

/**
 * subscribe
 *
 * @param {string} event
 * @param {nodeStyleCallback} handler
 * @param {object} context
 */
IVPAIDAdUnit.prototype.subscribe = function (event, handler, context) {};

/**
 * startAd
 *
 * @param {string} event
 * @param {function} handler
 */
IVPAIDAdUnit.prototype.unsubscribe = function (event, handler) {};

/**
 * getAdLinear
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.getAdLinear = function (callback) {};

/**
 * getAdWidth
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.getAdWidth = function (callback) {};

/**
 * getAdHeight
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.getAdHeight = function (callback) {};

/**
 * getAdExpanded
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.getAdExpanded = function (callback) {};

/**
 * getAdSkippableState
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.getAdSkippableState = function (callback) {};

/**
 * getAdRemainingTime
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.getAdRemainingTime = function (callback) {};

/**
 * getAdDuration
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.getAdDuration = function (callback) {};

/**
 * getAdVolume
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.getAdVolume = function (callback) {};

/**
 * getAdCompanions
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.getAdCompanions = function (callback) {};

/**
 * getAdIcons
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.getAdIcons = function (callback) {};

/**
 * setAdVolume
 *
 * @param {number} volume
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.setAdVolume = function (volume, callback) {};

addStaticToInterface(IVPAIDAdUnit, 'METHODS', METHODS);
addStaticToInterface(IVPAIDAdUnit, 'GETTERS', GETTERS);
addStaticToInterface(IVPAIDAdUnit, 'SETTERS', SETTERS);
addStaticToInterface(IVPAIDAdUnit, 'EVENTS', EVENTS);

var VPAID1_METHODS = METHODS.filter(function (method) {
  return ['skipAd'].indexOf(method) === -1;
});

addStaticToInterface(IVPAIDAdUnit, 'checkVPAIDInterface', function checkVPAIDInterface(creative) {
  var result = VPAID1_METHODS.every(function (key) {
    return typeof creative[key] === 'function';
  });
  return result;
});

module.exports = IVPAIDAdUnit;

function addStaticToInterface(Interface, name, value) {
  Object.defineProperty(Interface, name, {
    writable: false,
    configurable: false,
    value: value
  });
}

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Subscriber() {
    this._subscribers = {};
}

Subscriber.prototype.subscribe = function subscribe(handler, eventName, context) {
    if (!this.isHandlerAttached(handler, eventName)) {
        this.get(eventName).push({ handler: handler, context: context, eventName: eventName });
    }
};

Subscriber.prototype.unsubscribe = function unsubscribe(handler, eventName) {
    this._subscribers[eventName] = this.get(eventName).filter(function (subscriber) {
        return handler !== subscriber.handler;
    });
};

Subscriber.prototype.unsubscribeAll = function unsubscribeAll() {
    this._subscribers = {};
};

Subscriber.prototype.trigger = function (eventName, data) {
    var that = this;
    var subscribers = this.get(eventName).concat(this.get('*'));

    subscribers.forEach(function (subscriber) {
        setTimeout(function () {
            if (that.isHandlerAttached(subscriber.handler, subscriber.eventName)) {
                subscriber.handler.call(subscriber.context, data);
            }
        }, 0);
    });
};

Subscriber.prototype.triggerSync = function (eventName, data) {
    var subscribers = this.get(eventName).concat(this.get('*'));

    subscribers.forEach(function (subscriber) {
        subscriber.handler.call(subscriber.context, data);
    });
};

Subscriber.prototype.get = function get(eventName) {
    if (!this._subscribers[eventName]) {
        this._subscribers[eventName] = [];
    }
    return this._subscribers[eventName];
};

Subscriber.prototype.isHandlerAttached = function isHandlerAttached(handler, eventName) {
    return this.get(eventName).some(function (subscriber) {
        return handler === subscriber.handler;
    });
};

module.exports = Subscriber;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VASTTracker = exports.VASTParser = exports.VASTClient = undefined;

var _vast_parser = __webpack_require__(25);

var _vast_client = __webpack_require__(66);

var _vast_tracker = __webpack_require__(68);

exports.VASTClient = _vast_client.VASTClient;
exports.VASTParser = _vast_parser.VASTParser;
exports.VASTTracker = _vast_tracker.VASTTracker;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseAd = parseAd;

var _ad = __webpack_require__(51);

var _ad_extension = __webpack_require__(52);

var _ad_extension_child = __webpack_require__(53);

var _creative_companion_parser = __webpack_require__(54);

var _creative_linear_parser = __webpack_require__(56);

var _creative_non_linear_parser = __webpack_require__(59);

var _parser_utils = __webpack_require__(3);

/**
 * This module provides methods to parse a VAST Ad Element.
 */

/**
 * Parses an Ad element (can either be a Wrapper or an InLine).
 * @param  {Object} adElement - The VAST Ad element to parse.
 * @return {Ad}
 */
function parseAd(adElement) {
  var childNodes = adElement.childNodes;

  for (var adTypeElementKey in childNodes) {
    var adTypeElement = childNodes[adTypeElementKey];

    if (['Wrapper', 'InLine'].indexOf(adTypeElement.nodeName) === -1) {
      continue;
    }

    _parser_utils.parserUtils.copyNodeAttribute('id', adElement, adTypeElement);
    _parser_utils.parserUtils.copyNodeAttribute('sequence', adElement, adTypeElement);

    if (adTypeElement.nodeName === 'Wrapper') {
      return parseWrapper(adTypeElement);
    } else if (adTypeElement.nodeName === 'InLine') {
      return parseInLine(adTypeElement);
    }
  }
}

/**
 * Parses an Inline element.
 * @param  {Object} inLineElement - The VAST Inline element to parse.
 * @return {Ad}
 */
function parseInLine(inLineElement) {
  var childNodes = inLineElement.childNodes;
  var ad = new _ad.Ad();
  ad.id = inLineElement.getAttribute('id') || null;
  ad.sequence = inLineElement.getAttribute('sequence') || null;

  for (var nodeKey in childNodes) {
    var node = childNodes[nodeKey];

    switch (node.nodeName) {
      case 'Error':
        ad.errorURLTemplates.push(_parser_utils.parserUtils.parseNodeText(node));
        break;

      case 'Impression':
        ad.impressionURLTemplates.push(_parser_utils.parserUtils.parseNodeText(node));
        break;

      case 'Creatives':
        _parser_utils.parserUtils.childrenByName(node, 'Creative').forEach(function (creativeElement) {
          var creativeAttributes = {
            id: creativeElement.getAttribute('id') || null,
            adId: parseCreativeAdIdAttribute(creativeElement),
            sequence: creativeElement.getAttribute('sequence') || null,
            apiFramework: creativeElement.getAttribute('apiFramework') || null
          };

          for (var creativeTypeElementKey in creativeElement.childNodes) {
            var creativeTypeElement = creativeElement.childNodes[creativeTypeElementKey];
            var parsedCreative = void 0;

            switch (creativeTypeElement.nodeName) {
              case 'Linear':
                parsedCreative = (0, _creative_linear_parser.parseCreativeLinear)(creativeTypeElement, creativeAttributes);
                if (parsedCreative) {
                  ad.creatives.push(parsedCreative);
                }
                break;
              case 'NonLinearAds':
                parsedCreative = (0, _creative_non_linear_parser.parseCreativeNonLinear)(creativeTypeElement, creativeAttributes);
                if (parsedCreative) {
                  ad.creatives.push(parsedCreative);
                }
                break;
              case 'CompanionAds':
                parsedCreative = (0, _creative_companion_parser.parseCreativeCompanion)(creativeTypeElement, creativeAttributes);
                if (parsedCreative) {
                  ad.creatives.push(parsedCreative);
                }
                break;
            }
          }
        });
        break;

      case 'Extensions':
        parseExtensions(ad.extensions, _parser_utils.parserUtils.childrenByName(node, 'Extension'));
        break;

      case 'AdSystem':
        ad.system = {
          value: _parser_utils.parserUtils.parseNodeText(node),
          version: node.getAttribute('version') || null
        };
        break;

      case 'AdTitle':
        ad.title = _parser_utils.parserUtils.parseNodeText(node);
        break;

      case 'Description':
        ad.description = _parser_utils.parserUtils.parseNodeText(node);
        break;

      case 'Advertiser':
        ad.advertiser = _parser_utils.parserUtils.parseNodeText(node);
        break;

      case 'Pricing':
        ad.pricing = {
          value: _parser_utils.parserUtils.parseNodeText(node),
          model: node.getAttribute('model') || null,
          currency: node.getAttribute('currency') || null
        };
        break;

      case 'Survey':
        ad.survey = _parser_utils.parserUtils.parseNodeText(node);
        break;
    }
  }

  return ad;
}

/**
 * Parses a Wrapper element without resolving the wrapped urls.
 * @param  {Object} wrapperElement - The VAST Wrapper element to be parsed.
 * @return {Ad}
 */
function parseWrapper(wrapperElement) {
  var ad = parseInLine(wrapperElement);
  var wrapperURLElement = _parser_utils.parserUtils.childByName(wrapperElement, 'VASTAdTagURI');

  if (wrapperURLElement) {
    ad.nextWrapperURL = _parser_utils.parserUtils.parseNodeText(wrapperURLElement);
  } else {
    wrapperURLElement = _parser_utils.parserUtils.childByName(wrapperElement, 'VASTAdTagURL');

    if (wrapperURLElement) {
      ad.nextWrapperURL = _parser_utils.parserUtils.parseNodeText(_parser_utils.parserUtils.childByName(wrapperURLElement, 'URL'));
    }
  }

  ad.creatives.forEach(function (wrapperCreativeElement) {
    if (['linear', 'nonlinear'].indexOf(wrapperCreativeElement.type) !== -1) {
      // TrackingEvents Linear / NonLinear
      if (wrapperCreativeElement.trackingEvents) {
        if (!ad.trackingEvents) {
          ad.trackingEvents = {};
        }
        if (!ad.trackingEvents[wrapperCreativeElement.type]) {
          ad.trackingEvents[wrapperCreativeElement.type] = {};
        }

        var _loop = function _loop(eventName) {
          var urls = wrapperCreativeElement.trackingEvents[eventName];
          if (!Array.isArray(ad.trackingEvents[wrapperCreativeElement.type][eventName])) {
            ad.trackingEvents[wrapperCreativeElement.type][eventName] = [];
          }
          urls.forEach(function (url) {
            ad.trackingEvents[wrapperCreativeElement.type][eventName].push(url);
          });
        };

        for (var eventName in wrapperCreativeElement.trackingEvents) {
          _loop(eventName);
        }
      }
      // ClickTracking
      if (wrapperCreativeElement.videoClickTrackingURLTemplates) {
        if (!Array.isArray(ad.videoClickTrackingURLTemplates)) {
          ad.videoClickTrackingURLTemplates = [];
        } // tmp property to save wrapper tracking URLs until they are merged
        wrapperCreativeElement.videoClickTrackingURLTemplates.forEach(function (item) {
          ad.videoClickTrackingURLTemplates.push(item);
        });
      }
      // ClickThrough
      if (wrapperCreativeElement.videoClickThroughURLTemplate) {
        ad.videoClickThroughURLTemplate = wrapperCreativeElement.videoClickThroughURLTemplate;
      }
      // CustomClick
      if (wrapperCreativeElement.videoCustomClickURLTemplates) {
        if (!Array.isArray(ad.videoCustomClickURLTemplates)) {
          ad.videoCustomClickURLTemplates = [];
        } // tmp property to save wrapper tracking URLs until they are merged
        wrapperCreativeElement.videoCustomClickURLTemplates.forEach(function (item) {
          ad.videoCustomClickURLTemplates.push(item);
        });
      }
    }
  });

  if (ad.nextWrapperURL) {
    return ad;
  }
}

/**
 * Parses an array of Extension elements.
 * @param  {Array} collection - The array used to store the parsed extensions.
 * @param  {Array} extensions - The array of extensions to parse.
 */
function parseExtensions(collection, extensions) {
  extensions.forEach(function (extNode) {
    var ext = new _ad_extension.AdExtension();
    var extNodeAttrs = extNode.attributes;
    var childNodes = extNode.childNodes;

    if (extNode.attributes) {
      for (var extNodeAttrKey in extNodeAttrs) {
        var extNodeAttr = extNodeAttrs[extNodeAttrKey];

        if (extNodeAttr.nodeName && extNodeAttr.nodeValue) {
          ext.attributes[extNodeAttr.nodeName] = extNodeAttr.nodeValue;
        }
      }
    }

    for (var childNodeKey in childNodes) {
      var childNode = childNodes[childNodeKey];
      var txt = _parser_utils.parserUtils.parseNodeText(childNode);

      // ignore comments / empty value
      if (childNode.nodeName !== '#comment' && txt !== '') {
        var extChild = new _ad_extension_child.AdExtensionChild();
        extChild.name = childNode.nodeName;
        extChild.value = txt;

        if (childNode.attributes) {
          var childNodeAttributes = childNode.attributes;

          for (var extChildNodeAttrKey in childNodeAttributes) {
            var extChildNodeAttr = childNodeAttributes[extChildNodeAttrKey];

            extChild.attributes[extChildNodeAttr.nodeName] = extChildNodeAttr.nodeValue;
          }
        }

        ext.children.push(extChild);
      }
    }

    collection.push(ext);
  });
}

/**
 * Parses the creative adId Attribute.
 * @param  {any} creativeElement - The creative element to retrieve the adId from.
 * @return {String|null}
 */
function parseCreativeAdIdAttribute(creativeElement) {
  return creativeElement.getAttribute('AdID') || // VAST 2 spec
  creativeElement.getAttribute('adID') || // VAST 3 spec
  creativeElement.getAttribute('adId') || // VAST 4 spec
  null;
}

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ad = exports.Ad = function Ad() {
  _classCallCheck(this, Ad);

  this.id = null;
  this.sequence = null;
  this.system = null;
  this.title = null;
  this.description = null;
  this.advertiser = null;
  this.pricing = null;
  this.survey = null;
  this.errorURLTemplates = [];
  this.impressionURLTemplates = [];
  this.creatives = [];
  this.extensions = [];
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdExtension = exports.AdExtension = function AdExtension() {
  _classCallCheck(this, AdExtension);

  this.attributes = {};
  this.children = [];
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdExtensionChild = exports.AdExtensionChild = function AdExtensionChild() {
  _classCallCheck(this, AdExtensionChild);

  this.name = null;
  this.value = null;
  this.attributes = {};
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseCreativeCompanion = parseCreativeCompanion;

var _companion_ad = __webpack_require__(26);

var _creative_companion = __webpack_require__(55);

var _parser_utils = __webpack_require__(3);

/**
 * This module provides methods to parse a VAST CompanionAd Element.
 */

/**
 * Parses a CompanionAd.
 * @param  {Object} creativeElement - The VAST CompanionAd element to parse.
 * @param  {Object} creativeAttributes - The attributes of the CompanionAd (optional).
 * @return {CreativeCompanion}
 */
function parseCreativeCompanion(creativeElement, creativeAttributes) {
  var creative = new _creative_companion.CreativeCompanion(creativeAttributes);

  _parser_utils.parserUtils.childrenByName(creativeElement, 'Companion').forEach(function (companionResource) {
    var companionAd = new _companion_ad.CompanionAd();
    companionAd.id = companionResource.getAttribute('id') || null;
    companionAd.width = companionResource.getAttribute('width');
    companionAd.height = companionResource.getAttribute('height');
    companionAd.companionClickTrackingURLTemplates = [];

    _parser_utils.parserUtils.childrenByName(companionResource, 'HTMLResource').forEach(function (htmlElement) {
      companionAd.type = htmlElement.getAttribute('creativeType') || 'text/html';
      companionAd.htmlResource = _parser_utils.parserUtils.parseNodeText(htmlElement);
    });

    _parser_utils.parserUtils.childrenByName(companionResource, 'IFrameResource').forEach(function (iframeElement) {
      companionAd.type = iframeElement.getAttribute('creativeType') || 0;
      companionAd.iframeResource = _parser_utils.parserUtils.parseNodeText(iframeElement);
    });

    _parser_utils.parserUtils.childrenByName(companionResource, 'StaticResource').forEach(function (staticElement) {
      companionAd.type = staticElement.getAttribute('creativeType') || 0;

      _parser_utils.parserUtils.childrenByName(companionResource, 'AltText').forEach(function (child) {
        companionAd.altText = _parser_utils.parserUtils.parseNodeText(child);
      });

      companionAd.staticResource = _parser_utils.parserUtils.parseNodeText(staticElement);
    });

    _parser_utils.parserUtils.childrenByName(companionResource, 'TrackingEvents').forEach(function (trackingEventsElement) {
      _parser_utils.parserUtils.childrenByName(trackingEventsElement, 'Tracking').forEach(function (trackingElement) {
        var eventName = trackingElement.getAttribute('event');
        var trackingURLTemplate = _parser_utils.parserUtils.parseNodeText(trackingElement);
        if (eventName && trackingURLTemplate) {
          if (!Array.isArray(companionAd.trackingEvents[eventName])) {
            companionAd.trackingEvents[eventName] = [];
          }
          companionAd.trackingEvents[eventName].push(trackingURLTemplate);
        }
      });
    });

    _parser_utils.parserUtils.childrenByName(companionResource, 'CompanionClickTracking').forEach(function (clickTrackingElement) {
      companionAd.companionClickTrackingURLTemplates.push(_parser_utils.parserUtils.parseNodeText(clickTrackingElement));
    });

    companionAd.companionClickThroughURLTemplate = _parser_utils.parserUtils.parseNodeText(_parser_utils.parserUtils.childByName(companionResource, 'CompanionClickThrough'));
    companionAd.companionClickTrackingURLTemplate = _parser_utils.parserUtils.parseNodeText(_parser_utils.parserUtils.childByName(companionResource, 'CompanionClickTracking'));
    creative.variations.push(companionAd);
  });

  return creative;
}

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreativeCompanion = undefined;

var _creative = __webpack_require__(11);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CreativeCompanion = exports.CreativeCompanion = function (_Creative) {
  _inherits(CreativeCompanion, _Creative);

  function CreativeCompanion() {
    var creativeAttributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, CreativeCompanion);

    var _this = _possibleConstructorReturn(this, (CreativeCompanion.__proto__ || Object.getPrototypeOf(CreativeCompanion)).call(this, creativeAttributes));

    _this.type = 'companion';
    _this.variations = [];
    return _this;
  }

  return CreativeCompanion;
}(_creative.Creative);

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseCreativeLinear = parseCreativeLinear;

var _creative_linear = __webpack_require__(27);

var _icon = __webpack_require__(57);

var _media_file = __webpack_require__(58);

var _parser_utils = __webpack_require__(3);

/**
 * This module provides methods to parse a VAST Linear Element.
 */

/**
 * Parses a Linear element.
 * @param  {Object} creativeElement - The VAST Linear element to parse.
 * @param  {any} creativeAttributes - The attributes of the Linear (optional).
 * @return {CreativeLinear}
 */
function parseCreativeLinear(creativeElement, creativeAttributes) {
  var offset = void 0;
  var creative = new _creative_linear.CreativeLinear(creativeAttributes);

  creative.duration = _parser_utils.parserUtils.parseDuration(_parser_utils.parserUtils.parseNodeText(_parser_utils.parserUtils.childByName(creativeElement, 'Duration')));
  var skipOffset = creativeElement.getAttribute('skipoffset');

  if (typeof skipOffset === 'undefined' || skipOffset === null) {
    creative.skipDelay = null;
  } else if (skipOffset.charAt(skipOffset.length - 1) === '%' && creative.duration !== -1) {
    var percent = parseInt(skipOffset, 10);
    creative.skipDelay = creative.duration * (percent / 100);
  } else {
    creative.skipDelay = _parser_utils.parserUtils.parseDuration(skipOffset);
  }

  var videoClicksElement = _parser_utils.parserUtils.childByName(creativeElement, 'VideoClicks');
  if (videoClicksElement) {
    creative.videoClickThroughURLTemplate = _parser_utils.parserUtils.parseNodeText(_parser_utils.parserUtils.childByName(videoClicksElement, 'ClickThrough'));

    _parser_utils.parserUtils.childrenByName(videoClicksElement, 'ClickTracking').forEach(function (clickTrackingElement) {
      creative.videoClickTrackingURLTemplates.push(_parser_utils.parserUtils.parseNodeText(clickTrackingElement));
    });

    _parser_utils.parserUtils.childrenByName(videoClicksElement, 'CustomClick').forEach(function (customClickElement) {
      creative.videoCustomClickURLTemplates.push(_parser_utils.parserUtils.parseNodeText(customClickElement));
    });
  }

  var adParamsElement = _parser_utils.parserUtils.childByName(creativeElement, 'AdParameters');
  if (adParamsElement) {
    creative.adParameters = _parser_utils.parserUtils.parseNodeText(adParamsElement);
  }

  _parser_utils.parserUtils.childrenByName(creativeElement, 'TrackingEvents').forEach(function (trackingEventsElement) {
    _parser_utils.parserUtils.childrenByName(trackingEventsElement, 'Tracking').forEach(function (trackingElement) {
      var eventName = trackingElement.getAttribute('event');
      var trackingURLTemplate = _parser_utils.parserUtils.parseNodeText(trackingElement);
      if (eventName && trackingURLTemplate) {
        if (eventName === 'progress') {
          offset = trackingElement.getAttribute('offset');
          if (!offset) {
            return;
          }
          if (offset.charAt(offset.length - 1) === '%') {
            eventName = 'progress-' + offset;
          } else {
            eventName = 'progress-' + Math.round(_parser_utils.parserUtils.parseDuration(offset));
          }
        }

        if (!Array.isArray(creative.trackingEvents[eventName])) {
          creative.trackingEvents[eventName] = [];
        }
        creative.trackingEvents[eventName].push(trackingURLTemplate);
      }
    });
  });

  _parser_utils.parserUtils.childrenByName(creativeElement, 'MediaFiles').forEach(function (mediaFilesElement) {
    _parser_utils.parserUtils.childrenByName(mediaFilesElement, 'MediaFile').forEach(function (mediaFileElement) {
      var mediaFile = new _media_file.MediaFile();
      mediaFile.id = mediaFileElement.getAttribute('id');
      mediaFile.fileURL = _parser_utils.parserUtils.parseNodeText(mediaFileElement);
      mediaFile.deliveryType = mediaFileElement.getAttribute('delivery');
      mediaFile.codec = mediaFileElement.getAttribute('codec');
      mediaFile.mimeType = mediaFileElement.getAttribute('type');
      mediaFile.apiFramework = mediaFileElement.getAttribute('apiFramework');
      mediaFile.bitrate = parseInt(mediaFileElement.getAttribute('bitrate') || 0);
      mediaFile.minBitrate = parseInt(mediaFileElement.getAttribute('minBitrate') || 0);
      mediaFile.maxBitrate = parseInt(mediaFileElement.getAttribute('maxBitrate') || 0);
      mediaFile.width = parseInt(mediaFileElement.getAttribute('width') || 0);
      mediaFile.height = parseInt(mediaFileElement.getAttribute('height') || 0);

      var scalable = mediaFileElement.getAttribute('scalable');
      if (scalable && typeof scalable === 'string') {
        scalable = scalable.toLowerCase();
        if (scalable === 'true') {
          mediaFile.scalable = true;
        } else if (scalable === 'false') {
          mediaFile.scalable = false;
        }
      }

      var maintainAspectRatio = mediaFileElement.getAttribute('maintainAspectRatio');
      if (maintainAspectRatio && typeof maintainAspectRatio === 'string') {
        maintainAspectRatio = maintainAspectRatio.toLowerCase();
        if (maintainAspectRatio === 'true') {
          mediaFile.maintainAspectRatio = true;
        } else if (maintainAspectRatio === 'false') {
          mediaFile.maintainAspectRatio = false;
        }
      }

      creative.mediaFiles.push(mediaFile);
    });
  });

  var iconsElement = _parser_utils.parserUtils.childByName(creativeElement, 'Icons');
  if (iconsElement) {
    _parser_utils.parserUtils.childrenByName(iconsElement, 'Icon').forEach(function (iconElement) {
      var icon = new _icon.Icon();
      icon.program = iconElement.getAttribute('program');
      icon.height = parseInt(iconElement.getAttribute('height') || 0);
      icon.width = parseInt(iconElement.getAttribute('width') || 0);
      icon.xPosition = parseXPosition(iconElement.getAttribute('xPosition'));
      icon.yPosition = parseYPosition(iconElement.getAttribute('yPosition'));
      icon.apiFramework = iconElement.getAttribute('apiFramework');
      icon.offset = _parser_utils.parserUtils.parseDuration(iconElement.getAttribute('offset'));
      icon.duration = _parser_utils.parserUtils.parseDuration(iconElement.getAttribute('duration'));

      _parser_utils.parserUtils.childrenByName(iconElement, 'HTMLResource').forEach(function (htmlElement) {
        icon.type = htmlElement.getAttribute('creativeType') || 'text/html';
        icon.htmlResource = _parser_utils.parserUtils.parseNodeText(htmlElement);
      });

      _parser_utils.parserUtils.childrenByName(iconElement, 'IFrameResource').forEach(function (iframeElement) {
        icon.type = iframeElement.getAttribute('creativeType') || 0;
        icon.iframeResource = _parser_utils.parserUtils.parseNodeText(iframeElement);
      });

      _parser_utils.parserUtils.childrenByName(iconElement, 'StaticResource').forEach(function (staticElement) {
        icon.type = staticElement.getAttribute('creativeType') || 0;
        icon.staticResource = _parser_utils.parserUtils.parseNodeText(staticElement);
      });

      var iconClicksElement = _parser_utils.parserUtils.childByName(iconElement, 'IconClicks');
      if (iconClicksElement) {
        icon.iconClickThroughURLTemplate = _parser_utils.parserUtils.parseNodeText(_parser_utils.parserUtils.childByName(iconClicksElement, 'IconClickThrough'));
        _parser_utils.parserUtils.childrenByName(iconClicksElement, 'IconClickTracking').forEach(function (iconClickTrackingElement) {
          icon.iconClickTrackingURLTemplates.push(_parser_utils.parserUtils.parseNodeText(iconClickTrackingElement));
        });
      }

      icon.iconViewTrackingURLTemplate = _parser_utils.parserUtils.parseNodeText(_parser_utils.parserUtils.childByName(iconElement, 'IconViewTracking'));

      creative.icons.push(icon);
    });
  }

  return creative;
}

/**
 * Parses an horizontal position into a String ('left' or 'right') or into a Number.
 * @param  {String} xPosition - The x position to parse.
 * @return {String|Number}
 */
function parseXPosition(xPosition) {
  if (['left', 'right'].indexOf(xPosition) !== -1) {
    return xPosition;
  }

  return parseInt(xPosition || 0);
}

/**
 * Parses an vertical position into a String ('top' or 'bottom') or into a Number.
 * @param  {String} yPosition - The x position to parse.
 * @return {String|Number}
 */
function parseYPosition(yPosition) {
  if (['top', 'bottom'].indexOf(yPosition) !== -1) {
    return yPosition;
  }

  return parseInt(yPosition || 0);
}

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Icon = exports.Icon = function Icon() {
  _classCallCheck(this, Icon);

  this.program = null;
  this.height = 0;
  this.width = 0;
  this.xPosition = 0;
  this.yPosition = 0;
  this.apiFramework = null;
  this.offset = null;
  this.duration = 0;
  this.type = null;
  this.staticResource = null;
  this.htmlResource = null;
  this.iframeResource = null;
  this.iconClickThroughURLTemplate = null;
  this.iconClickTrackingURLTemplates = [];
  this.iconViewTrackingURLTemplate = null;
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MediaFile = exports.MediaFile = function MediaFile() {
  _classCallCheck(this, MediaFile);

  this.id = null;
  this.fileURL = null;
  this.deliveryType = 'progressive';
  this.mimeType = null;
  this.codec = null;
  this.bitrate = 0;
  this.minBitrate = 0;
  this.maxBitrate = 0;
  this.width = 0;
  this.height = 0;
  this.apiFramework = null;
  this.scalable = null;
  this.maintainAspectRatio = null;
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseCreativeNonLinear = parseCreativeNonLinear;

var _creative_non_linear = __webpack_require__(60);

var _non_linear_ad = __webpack_require__(28);

var _parser_utils = __webpack_require__(3);

/**
 * This module provides methods to parse a VAST NonLinear Element.
 */

/**
 * Parses a NonLinear element.
 * @param  {any} creativeElement - The VAST NonLinear element to parse.
 * @param  {any} creativeAttributes - The attributes of the NonLinear (optional).
 * @return {CreativeNonLinear}
 */
function parseCreativeNonLinear(creativeElement, creativeAttributes) {
  var creative = new _creative_non_linear.CreativeNonLinear(creativeAttributes);

  _parser_utils.parserUtils.childrenByName(creativeElement, 'TrackingEvents').forEach(function (trackingEventsElement) {
    var eventName = void 0,
        trackingURLTemplate = void 0;
    _parser_utils.parserUtils.childrenByName(trackingEventsElement, 'Tracking').forEach(function (trackingElement) {
      eventName = trackingElement.getAttribute('event');
      trackingURLTemplate = _parser_utils.parserUtils.parseNodeText(trackingElement);

      if (eventName && trackingURLTemplate) {
        if (!Array.isArray(creative.trackingEvents[eventName])) {
          creative.trackingEvents[eventName] = [];
        }
        creative.trackingEvents[eventName].push(trackingURLTemplate);
      }
    });
  });

  _parser_utils.parserUtils.childrenByName(creativeElement, 'NonLinear').forEach(function (nonlinearResource) {
    var nonlinearAd = new _non_linear_ad.NonLinearAd();
    nonlinearAd.id = nonlinearResource.getAttribute('id') || null;
    nonlinearAd.width = nonlinearResource.getAttribute('width');
    nonlinearAd.height = nonlinearResource.getAttribute('height');
    nonlinearAd.expandedWidth = nonlinearResource.getAttribute('expandedWidth');
    nonlinearAd.expandedHeight = nonlinearResource.getAttribute('expandedHeight');
    nonlinearAd.scalable = _parser_utils.parserUtils.parseBoolean(nonlinearResource.getAttribute('scalable'));
    nonlinearAd.maintainAspectRatio = _parser_utils.parserUtils.parseBoolean(nonlinearResource.getAttribute('maintainAspectRatio'));
    nonlinearAd.minSuggestedDuration = _parser_utils.parserUtils.parseDuration(nonlinearResource.getAttribute('minSuggestedDuration'));
    nonlinearAd.apiFramework = nonlinearResource.getAttribute('apiFramework');

    _parser_utils.parserUtils.childrenByName(nonlinearResource, 'HTMLResource').forEach(function (htmlElement) {
      nonlinearAd.type = htmlElement.getAttribute('creativeType') || 'text/html';
      nonlinearAd.htmlResource = _parser_utils.parserUtils.parseNodeText(htmlElement);
    });

    _parser_utils.parserUtils.childrenByName(nonlinearResource, 'IFrameResource').forEach(function (iframeElement) {
      nonlinearAd.type = iframeElement.getAttribute('creativeType') || 0;
      nonlinearAd.iframeResource = _parser_utils.parserUtils.parseNodeText(iframeElement);
    });

    _parser_utils.parserUtils.childrenByName(nonlinearResource, 'StaticResource').forEach(function (staticElement) {
      nonlinearAd.type = staticElement.getAttribute('creativeType') || 0;
      nonlinearAd.staticResource = _parser_utils.parserUtils.parseNodeText(staticElement);
    });

    var adParamsElement = _parser_utils.parserUtils.childByName(nonlinearResource, 'AdParameters');
    if (adParamsElement) {
      nonlinearAd.adParameters = _parser_utils.parserUtils.parseNodeText(adParamsElement);
    }

    nonlinearAd.nonlinearClickThroughURLTemplate = _parser_utils.parserUtils.parseNodeText(_parser_utils.parserUtils.childByName(nonlinearResource, 'NonLinearClickThrough'));
    _parser_utils.parserUtils.childrenByName(nonlinearResource, 'NonLinearClickTracking').forEach(function (clickTrackingElement) {
      nonlinearAd.nonlinearClickTrackingURLTemplates.push(_parser_utils.parserUtils.parseNodeText(clickTrackingElement));
    });

    creative.variations.push(nonlinearAd);
  });

  return creative;
}

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreativeNonLinear = undefined;

var _creative = __webpack_require__(11);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CreativeNonLinear = exports.CreativeNonLinear = function (_Creative) {
  _inherits(CreativeNonLinear, _Creative);

  function CreativeNonLinear() {
    var creativeAttributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, CreativeNonLinear);

    var _this = _possibleConstructorReturn(this, (CreativeNonLinear.__proto__ || Object.getPrototypeOf(CreativeNonLinear)).call(this, creativeAttributes));

    _this.type = 'nonlinear';
    _this.variations = [];
    return _this;
  }

  return CreativeNonLinear;
}(_creative.Creative);

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urlHandler = undefined;

var _flash_url_handler = __webpack_require__(62);

var _mock_node_url_handler = __webpack_require__(63);

var _xhr_url_handler = __webpack_require__(64);

function get(url, options, cb) {
  // Allow skip of the options param
  if (!cb) {
    if (typeof options === 'function') {
      cb = options;
    }
    options = {};
  }

  if (typeof window === 'undefined' || window === null) {
    return _mock_node_url_handler.nodeURLHandler.get(url, options, cb);
  } else if (_xhr_url_handler.XHRURLHandler.supported()) {
    return _xhr_url_handler.XHRURLHandler.get(url, options, cb);
  } else if (_flash_url_handler.flashURLHandler.supported()) {
    return _flash_url_handler.flashURLHandler.get(url, options, cb);
  }
  return cb(new Error('Current context is not supported by any of the default URLHandlers. Please provide a custom URLHandler'));
}

var urlHandler = exports.urlHandler = {
  get: get
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function xdr() {
  var request = void 0;
  if (window.XDomainRequest) {
    // eslint-disable-next-line no-undef
    request = new XDomainRequest();
  }
  return request;
}

function supported() {
  return !!xdr();
}

function get(url, options, cb) {
  var xmlDocument = typeof window.ActiveXObject === 'function' ? new window.ActiveXObject('Microsoft.XMLDOM') : undefined;

  if (xmlDocument) {
    xmlDocument.async = false;
  } else {
    return cb(new Error('FlashURLHandler: Microsoft.XMLDOM format not supported'));
  }

  var request = xdr();
  request.open('GET', url);
  request.timeout = options.timeout || 0;
  request.withCredentials = options.withCredentials || false;
  request.send();
  request.onprogress = function () {};

  request.onload = function () {
    xmlDocument.loadXML(request.responseText);
    cb(null, xmlDocument);
  };
}

var flashURLHandler = exports.flashURLHandler = {
  get: get,
  supported: supported
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// This mock module is loaded in stead of the original NodeURLHandler module
// when bundling the library for environments which are not node.
// This allows us to avoid bundling useless node components and have a smaller build.
function get(url, options, cb) {
  cb(new Error('Please bundle the library for node to use the node urlHandler'));
}

var nodeURLHandler = exports.nodeURLHandler = {
  get: get
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function xhr() {
  try {
    var request = new window.XMLHttpRequest();
    if ('withCredentials' in request) {
      // check CORS support
      return request;
    }
    return null;
  } catch (err) {
    return null;
  }
}

function supported() {
  return !!xhr();
}

function get(url, options, cb) {
  if (window.location.protocol === 'https:' && url.indexOf('http://') === 0) {
    return cb(new Error('XHRURLHandler: Cannot go from HTTPS to HTTP.'));
  }

  try {
    var request = xhr();

    request.open('GET', url);
    request.timeout = options.timeout || 0;
    request.withCredentials = options.withCredentials || false;
    request.overrideMimeType && request.overrideMimeType('text/xml');
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
          cb(null, request.responseXML);
        } else {
          cb(new Error('XHRURLHandler: ' + request.statusText));
        }
      }
    };
    request.send();
  } catch (error) {
    cb(new Error('XHRURLHandler: Unexpected error'));
  }
}

var XHRURLHandler = exports.XHRURLHandler = {
  get: get,
  supported: supported
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VASTResponse = exports.VASTResponse = function VASTResponse() {
  _classCallCheck(this, VASTResponse);

  this.ads = [];
  this.errorURLTemplates = [];
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VASTClient = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _storage = __webpack_require__(67);

var _vast_parser = __webpack_require__(25);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This class provides methods to fetch and parse a VAST document using VASTParser.
 * In addition it provides options to skip consecutive calls based on constraints.
 * @export
 * @class VASTClient
 */
var VASTClient = exports.VASTClient = function () {
  /**
   * Creates an instance of VASTClient.
   * @param  {Number} cappingFreeLunch - The number of first calls to skip.
   * @param  {Number} cappingMinimumTimeInterval - The minimum time interval between two consecutive calls.
   * @param  {Storage} customStorage - A custom storage to use instead of the default one.
   * @constructor
   */
  function VASTClient(cappingFreeLunch, cappingMinimumTimeInterval, customStorage) {
    _classCallCheck(this, VASTClient);

    this.cappingFreeLunch = cappingFreeLunch || 0;
    this.cappingMinimumTimeInterval = cappingMinimumTimeInterval || 0;
    this.defaultOptions = {
      withCredentials: false,
      timeout: 0
    };
    this.vastParser = new _vast_parser.VASTParser();
    this.storage = customStorage || new _storage.Storage();

    // Init values if not already set
    if (this.lastSuccessfulAd === undefined) {
      this.lastSuccessfulAd = 0;
    }

    if (this.totalCalls === undefined) {
      this.totalCalls = 0;
    }
    if (this.totalCallsTimeout === undefined) {
      this.totalCallsTimeout = 0;
    }
  }

  _createClass(VASTClient, [{
    key: 'getParser',
    value: function getParser() {
      return this.vastParser;
    }
  }, {
    key: 'hasRemainingAds',


    /**
     * Returns a boolean indicating if there are more ads to resolve for the current parsing.
     * @return {Boolean}
     */
    value: function hasRemainingAds() {
      return this.vastParser.remainingAds.length > 0;
    }

    /**
     * Resolves the next group of ads. If all is true resolves all the remaining ads.
     * @param  {Boolean} all - If true all the remaining ads are resolved
     * @return {Promise}
     */

  }, {
    key: 'getNextAds',
    value: function getNextAds(all) {
      return this.vastParser.getRemainingAds(all);
    }

    /**
     * Gets a parsed VAST document for the given url, applying the skipping rules defined.
     * Returns a Promise which resolves with a fully parsed VASTResponse or rejects with an Error.
     * @param  {String} url - The url to use to fecth the VAST document.
     * @param  {Object} options - An optional Object of parameters to be applied in the process.
     * @return {Promise}
     */

  }, {
    key: 'get',
    value: function get(url) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var now = Date.now();
      options = Object.assign(this.defaultOptions, options);

      // By default the client resolves only the first Ad or AdPod
      if (!options.hasOwnProperty('resolveAll')) {
        options.resolveAll = false;
      }

      // Check totalCallsTimeout (first call + 1 hour), if older than now,
      // reset totalCalls number, by this way the client will be eligible again
      // for freelunch capping
      if (this.totalCallsTimeout < now) {
        this.totalCalls = 1;
        this.totalCallsTimeout = now + 60 * 60 * 1000;
      } else {
        this.totalCalls++;
      }

      return new Promise(function (resolve, reject) {
        if (_this.cappingFreeLunch >= _this.totalCalls) {
          return reject(new Error('VAST call canceled \u2013 FreeLunch capping not reached yet ' + _this.totalCalls + '/' + _this.cappingFreeLunch));
        }

        var timeSinceLastCall = now - _this.lastSuccessfulAd;

        // Check timeSinceLastCall to be a positive number. If not, this mean the
        // previous was made in the future. We reset lastSuccessfulAd value
        if (timeSinceLastCall < 0) {
          _this.lastSuccessfulAd = 0;
        } else if (timeSinceLastCall < _this.cappingMinimumTimeInterval) {
          return reject(new Error('VAST call canceled \u2013 (' + _this.cappingMinimumTimeInterval + ')ms minimum interval reached'));
        }

        _this.vastParser.getAndParseVAST(url, options).then(function (response) {
          return resolve(response);
        }).catch(function (err) {
          return reject(err);
        });
      });
    }
  }, {
    key: 'lastSuccessfulAd',
    get: function get() {
      return this.storage.getItem('vast-client-last-successful-ad');
    },
    set: function set(value) {
      this.storage.setItem('vast-client-last-successful-ad', value);
    }
  }, {
    key: 'totalCalls',
    get: function get() {
      return this.storage.getItem('vast-client-total-calls');
    },
    set: function set(value) {
      this.storage.setItem('vast-client-total-calls', value);
    }
  }, {
    key: 'totalCallsTimeout',
    get: function get() {
      return this.storage.getItem('vast-client-total-calls-timeout');
    },
    set: function set(value) {
      this.storage.setItem('vast-client-total-calls-timeout', value);
    }
  }]);

  return VASTClient;
}();

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var storage = null;

/**
 * This Object represents a default storage to be used in case no other storage is available.
 * @constant
 * @type {Object}
 */
var DEFAULT_STORAGE = {
  data: {},
  length: 0,
  getItem: function getItem(key) {
    return this.data[key];
  },
  setItem: function setItem(key, value) {
    this.data[key] = value;
    this.length = Object.keys(this.data).length;
  },
  removeItem: function removeItem(key) {
    delete this.data[key];
    this.length = Object.keys(this.data).length;
  },
  clear: function clear() {
    this.data = {};
    this.length = 0;
  }
};

/**
 * This class provides an wrapper interface to the a key-value storage.
 * It uses localStorage, sessionStorage or a custom storage if none of the two is available.
 * @export
 * @class Storage
 */

var Storage = exports.Storage = function () {
  /**
   * Creates an instance of Storage.
   * @constructor
   */
  function Storage() {
    _classCallCheck(this, Storage);

    this.storage = this.initStorage();
  }

  /**
   * Provides a singleton instance of the wrapped storage.
   * @return {Object}
   */


  _createClass(Storage, [{
    key: 'initStorage',
    value: function initStorage() {
      if (storage) {
        return storage;
      }

      try {
        storage = typeof window !== 'undefined' && window !== null ? window.localStorage || window.sessionStorage : null;
      } catch (storageError) {
        storage = null;
      }

      if (!storage || this.isStorageDisabled(storage)) {
        storage = DEFAULT_STORAGE;
        storage.clear();
      }

      return storage;
    }

    /**
     * Check if storage is disabled (like in certain cases with private browsing).
     * In Safari (Mac + iOS) when private browsing is ON, localStorage is read only
     * http://spin.atomicobject.com/2013/01/23/ios-private-browsing-localstorage/
     * @param {Object} testStorage - The storage to check.
     * @return {Boolean}
     */

  }, {
    key: 'isStorageDisabled',
    value: function isStorageDisabled(testStorage) {
      var testValue = '__VASTStorage__';

      try {
        testStorage.setItem(testValue, testValue);
        if (testStorage.getItem(testValue) !== testValue) {
          testStorage.removeItem(testValue);
          return true;
        }
      } catch (e) {
        return true;
      }

      testStorage.removeItem(testValue);
      return false;
    }

    /**
     * Returns the value for the given key. If the key does not exist, null is returned.
     * @param  {String} key - The key to retrieve the value.
     * @return {any}
     */

  }, {
    key: 'getItem',
    value: function getItem(key) {
      return this.storage.getItem(key);
    }

    /**
     * Adds or updates the value for the given key.
     * @param  {String} key - The key to modify the value.
     * @param  {any} value - The value to be associated with the key.
     * @return {any}
     */

  }, {
    key: 'setItem',
    value: function setItem(key, value) {
      return this.storage.setItem(key, value);
    }

    /**
     * Removes an item for the given key.
     * @param  {String} key - The key to remove the value.
     * @return {any}
     */

  }, {
    key: 'removeItem',
    value: function removeItem(key) {
      return this.storage.removeItem(key);
    }

    /**
     * Removes all the items from the storage.
     */

  }, {
    key: 'clear',
    value: function clear() {
      return this.storage.clear();
    }
  }]);

  return Storage;
}();

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VASTTracker = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _companion_ad = __webpack_require__(26);

var _creative_linear = __webpack_require__(27);

var _events = __webpack_require__(29);

var _non_linear_ad = __webpack_require__(28);

var _util = __webpack_require__(12);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The default skip delay used in case a custom one is not provided
 * @constant
 * @type {Number}
 */
var DEFAULT_SKIP_DELAY = -1;

/**
 * This class provides methods to track an ad execution.
 *
 * @export
 * @class VASTTracker
 * @extends EventEmitter
 */

var VASTTracker = exports.VASTTracker = function (_EventEmitter) {
  _inherits(VASTTracker, _EventEmitter);

  /**
   * Creates an instance of VASTTracker.
   *
   * @param {VASTClient} client - An instance of VASTClient that can be updated by the tracker. [optional]
   * @param {Ad} ad - The ad to track.
   * @param {Creative} creative - The creative to track.
   * @param {CompanionAd|NonLinearAd} [variation=null] - An optional variation of the creative.
   * @constructor
   */
  function VASTTracker(client, ad, creative) {
    var variation = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    _classCallCheck(this, VASTTracker);

    var _this = _possibleConstructorReturn(this, (VASTTracker.__proto__ || Object.getPrototypeOf(VASTTracker)).call(this));

    _this.ad = ad;
    _this.creative = creative;
    _this.variation = variation;
    _this.muted = false;
    _this.impressed = false;
    _this.skippable = false;
    _this.trackingEvents = {};
    // We need to save the already triggered quartiles, in order to not trigger them again
    _this._alreadyTriggeredQuartiles = {};
    // Tracker listeners should be notified with some events
    // no matter if there is a tracking URL or not
    _this.emitAlwaysEvents = ['creativeView', 'start', 'firstQuartile', 'midpoint', 'thirdQuartile', 'complete', 'resume', 'pause', 'rewind', 'skip', 'closeLinear', 'close'];

    // Duplicate the creative's trackingEvents property so we can alter it
    for (var eventName in _this.creative.trackingEvents) {
      var events = _this.creative.trackingEvents[eventName];
      _this.trackingEvents[eventName] = events.slice(0);
    }

    // Nonlinear and companion creatives provide some tracking information at a variation level
    // While linear creatives provided that at a creative level. That's why we need to
    // differentiate how we retrieve some tracking information.
    if (_this.creative instanceof _creative_linear.CreativeLinear) {
      _this._initLinearTracking();
    } else {
      _this._initVariationTracking();
    }

    // If the tracker is associated with a client we add a listener to the start event
    // to update the lastSuccessfulAd property.
    if (client) {
      _this.on('start', function () {
        client.lastSuccessfulAd = Date.now();
      });
    }
    return _this;
  }

  /**
   * Init the custom tracking options for linear creatives.
   *
   * @return {void}
   */


  _createClass(VASTTracker, [{
    key: '_initLinearTracking',
    value: function _initLinearTracking() {
      this.linear = true;
      this.skipDelay = this.creative.skipDelay;

      this.setDuration(this.creative.duration);

      this.clickThroughURLTemplate = this.creative.videoClickThroughURLTemplate;
      this.clickTrackingURLTemplates = this.creative.videoClickTrackingURLTemplates;
    }

    /**
     * Init the custom tracking options for nonlinear and companion creatives.
     * These options are provided in the variation Object.
     *
     * @return {void}
     */

  }, {
    key: '_initVariationTracking',
    value: function _initVariationTracking() {
      this.linear = false;
      this.skipDelay = DEFAULT_SKIP_DELAY;

      // If no variation has been provided there's nothing else to set
      if (!this.variation) {
        return;
      }

      // Duplicate the variation's trackingEvents property so we can alter it
      for (var eventName in this.variation.trackingEvents) {
        var events = this.variation.trackingEvents[eventName];

        // If for the given eventName we already had some trackingEvents provided by the creative
        // we want to keep both the creative trackingEvents and the variation ones
        if (this.trackingEvents[eventName]) {
          this.trackingEvents[eventName] = this.trackingEvents[eventName].concat(events.slice(0));
        } else {
          this.trackingEvents[eventName] = events.slice(0);
        }
      }

      if (this.variation instanceof _non_linear_ad.NonLinearAd) {
        this.clickThroughURLTemplate = this.variation.nonlinearClickThroughURLTemplate;
        this.clickTrackingURLTemplates = this.variation.nonlinearClickTrackingURLTemplates;
        this.setDuration(this.variation.minSuggestedDuration);
      } else if (this.variation instanceof _companion_ad.CompanionAd) {
        this.clickThroughURLTemplate = this.variation.companionClickThroughURLTemplate;
        this.clickTrackingURLTemplates = this.variation.companionClickTrackingURLTemplates;
      }
    }

    /**
     * Sets the duration of the ad and updates the quartiles based on that.
     *
     * @param  {Number} duration - The duration of the ad.
     */

  }, {
    key: 'setDuration',
    value: function setDuration(duration) {
      this.assetDuration = duration;
      // beware of key names, theses are also used as event names
      this.quartiles = {
        firstQuartile: Math.round(25 * this.assetDuration) / 100,
        midpoint: Math.round(50 * this.assetDuration) / 100,
        thirdQuartile: Math.round(75 * this.assetDuration) / 100
      };
    }

    /**
     * Sets the duration of the ad and updates the quartiles based on that.
     * This is required for tracking time related events.
     *
     * @param {Number} progress - Current playback time in seconds.
     * @emits VASTTracker#start
     * @emits VASTTracker#skip-countdown
     * @emits VASTTracker#progress-[0-100]%
     * @emits VASTTracker#progress-[currentTime]
     * @emits VASTTracker#rewind
     * @emits VASTTracker#firstQuartile
     * @emits VASTTracker#midpoint
     * @emits VASTTracker#thirdQuartile
     */

  }, {
    key: 'setProgress',
    value: function setProgress(progress) {
      var _this2 = this;

      var skipDelay = this.skipDelay || DEFAULT_SKIP_DELAY;

      if (skipDelay !== -1 && !this.skippable) {
        if (skipDelay > progress) {
          this.emit('skip-countdown', skipDelay - progress);
        } else {
          this.skippable = true;
          this.emit('skip-countdown', 0);
        }
      }

      if (this.assetDuration > 0) {
        var events = [];

        if (progress > 0) {
          var percent = Math.round(progress / this.assetDuration * 100);

          events.push('start');
          events.push('progress-' + percent + '%');
          events.push('progress-' + Math.round(progress));

          for (var quartile in this.quartiles) {
            if (this.isQuartileReached(quartile, this.quartiles[quartile], progress)) {
              events.push(quartile);
              this._alreadyTriggeredQuartiles[quartile] = true;
            }
          }
        }

        events.forEach(function (eventName) {
          _this2.track(eventName, true);
        });

        if (progress < this.progress) {
          this.track('rewind');
        }
      }

      this.progress = progress;
    }

    /**
     * Checks if a quartile has been reached without have being triggered already.
     *
     * @param {String} quartile - Quartile name
     * @param {Number} time - Time offset, when this quartile is reached in seconds.
     * @param {Number} progress - Current progress of the ads in seconds.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isQuartileReached',
    value: function isQuartileReached(quartile, time, progress) {
      var quartileReached = false;
      // if quartile time already reached and never triggered
      if (time <= progress && !this._alreadyTriggeredQuartiles[quartile]) {
        quartileReached = true;
      }
      return quartileReached;
    }

    /**
     * Updates the mute state and calls the mute/unmute tracking URLs.
     *
     * @param {Boolean} muted - Indicates if the video is muted or not.
     * @emits VASTTracker#mute
     * @emits VASTTracker#unmute
     */

  }, {
    key: 'setMuted',
    value: function setMuted(muted) {
      if (this.muted !== muted) {
        this.track(muted ? 'mute' : 'unmute');
      }
      this.muted = muted;
    }

    /**
     * Update the pause state and call the resume/pause tracking URLs.
     *
     * @param {Boolean} paused - Indicates if the video is paused or not.
     * @emits VASTTracker#pause
     * @emits VASTTracker#resume
     */

  }, {
    key: 'setPaused',
    value: function setPaused(paused) {
      if (this.paused !== paused) {
        this.track(paused ? 'pause' : 'resume');
      }
      this.paused = paused;
    }

    /**
     * Updates the fullscreen state and calls the fullscreen tracking URLs.
     *
     * @param {Boolean} fullscreen - Indicates if the video is in fulscreen mode or not.
     * @emits VASTTracker#fullscreen
     * @emits VASTTracker#exitFullscreen
     */

  }, {
    key: 'setFullscreen',
    value: function setFullscreen(fullscreen) {
      if (this.fullscreen !== fullscreen) {
        this.track(fullscreen ? 'fullscreen' : 'exitFullscreen');
      }
      this.fullscreen = fullscreen;
    }

    /**
     * Updates the expand state and calls the expand/collapse tracking URLs.
     *
     * @param {Boolean} expanded - Indicates if the video is expanded or not.
     * @emits VASTTracker#expand
     * @emits VASTTracker#collapse
     */

  }, {
    key: 'setExpand',
    value: function setExpand(expanded) {
      if (this.expanded !== expanded) {
        this.track(expanded ? 'expand' : 'collapse');
      }
      this.expanded = expanded;
    }

    /**
     * Must be called if you want to overwrite the <Linear> Skipoffset value.
     * This will init the skip countdown duration. Then, every time setProgress() is called,
     * it will decrease the countdown and emit a skip-countdown event with the remaining time.
     * Do not call this method if you want to keep the original Skipoffset value.
     *
     * @param {Number} duration - The time in seconds until the skip button is displayed.
     */

  }, {
    key: 'setSkipDelay',
    value: function setSkipDelay(duration) {
      if (typeof duration === 'number') {
        this.skipDelay = duration;
      }
    }

    /**
     * Tracks an impression (can be called only once).
     *
     * @emits VASTTracker#creativeView
     */

  }, {
    key: 'trackImpression',
    value: function trackImpression() {
      if (!this.impressed) {
        this.impressed = true;
        this.trackURLs(this.ad.impressionURLTemplates);
        this.track('creativeView');
      }
    }

    /**
     * Send a request to the URI provided by the VAST <Error> element.
     * If an [ERRORCODE] macro is included, it will be substitute with errorCode.
     *
     * @param {String} errorCode - Replaces [ERRORCODE] macro. [ERRORCODE] values are listed in the VAST specification.
     * @param {Boolean} [isCustomCode=false] - Flag to allow custom values on error code.
     */

  }, {
    key: 'errorWithCode',
    value: function errorWithCode(errorCode) {
      var isCustomCode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      this.trackURLs(this.ad.errorURLTemplates, { ERRORCODE: errorCode }, { isCustomCode: isCustomCode });
    }

    /**
     * Must be called when the user watched the linear creative until its end.
     * Calls the complete tracking URLs.
     *
     * @emits VASTTracker#complete
     */

  }, {
    key: 'complete',
    value: function complete() {
      this.track('complete');
    }

    /**
     * Must be called when the player or the window is closed during the ad.
     * Calls the `closeLinear` (in VAST 3.0) and `close` tracking URLs.
     *
     * @emits VASTTracker#closeLinear
     * @emits VASTTracker#close
     */

  }, {
    key: 'close',
    value: function close() {
      this.track(this.linear ? 'closeLinear' : 'close');
    }

    /**
     * Must be called when the skip button is clicked. Calls the skip tracking URLs.
     *
     * @emits VASTTracker#skip
     */

  }, {
    key: 'skip',
    value: function skip() {
      this.track('skip');
    }

    /**
     * Must be called when the user clicks on the creative.
     * It calls the tracking URLs and emits a 'clickthrough' event with the resolved
     * clickthrough URL when done.
     *
     * @param {String} [fallbackClickThroughURL=null] - an optional clickThroughURL template that could be used as a fallback
     * @emits VASTTracker#clickthrough
     */

  }, {
    key: 'click',
    value: function click() {
      var fallbackClickThroughURL = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (this.clickTrackingURLTemplates && this.clickTrackingURLTemplates.length) {
        this.trackURLs(this.clickTrackingURLTemplates);
      }

      // Use the provided fallbackClickThroughURL as a fallback
      var clickThroughURLTemplate = this.clickThroughURLTemplate || fallbackClickThroughURL;

      if (clickThroughURLTemplate) {
        var variables = this.linear ? { CONTENTPLAYHEAD: this.progressFormatted() } : {};
        var clickThroughURL = _util.util.resolveURLTemplates([clickThroughURLTemplate], variables)[0];

        this.emit('clickthrough', clickThroughURL);
      }
    }

    /**
     * Calls the tracking URLs for the given eventName and emits the event.
     *
     * @param {String} eventName - The name of the event.
     * @param {Boolean} [once=false] - Boolean to define if the event has to be tracked only once.
     */

  }, {
    key: 'track',
    value: function track(eventName) {
      var once = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      // closeLinear event was introduced in VAST 3.0
      // Fallback to vast 2.0 close event if necessary
      if (eventName === 'closeLinear' && !this.trackingEvents[eventName] && this.trackingEvents['close']) {
        eventName = 'close';
      }

      var trackingURLTemplates = this.trackingEvents[eventName];
      var isAlwaysEmitEvent = this.emitAlwaysEvents.indexOf(eventName) > -1;

      if (trackingURLTemplates) {
        this.emit(eventName, '');
        this.trackURLs(trackingURLTemplates);
      } else if (isAlwaysEmitEvent) {
        this.emit(eventName, '');
      }

      if (once) {
        delete this.trackingEvents[eventName];
        if (isAlwaysEmitEvent) {
          this.emitAlwaysEvents.splice(this.emitAlwaysEvents.indexOf(eventName), 1);
        }
      }
    }

    /**
     * Calls the tracking urls templates with the given variables.
     *
     * @param {Array} URLTemplates - An array of tracking url templates.
     * @param {Object} [variables={}] - An optional Object of parameters to be used in the tracking calls.
     * @param {Object} [options={}] - An optional Object of options to be used in the tracking calls.
     */

  }, {
    key: 'trackURLs',
    value: function trackURLs(URLTemplates) {
      var variables = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (this.linear) {
        if (this.creative && this.creative.mediaFiles && this.creative.mediaFiles[0] && this.creative.mediaFiles[0].fileURL) {
          variables['ASSETURI'] = this.creative.mediaFiles[0].fileURL;
        }
        variables['CONTENTPLAYHEAD'] = this.progressFormatted();
      }

      _util.util.track(URLTemplates, variables, options);
    }

    /**
     * Formats time progress in a readable string.
     *
     * @return {String}
     */

  }, {
    key: 'progressFormatted',
    value: function progressFormatted() {
      var seconds = parseInt(this.progress);
      var h = seconds / (60 * 60);
      if (h.length < 2) {
        h = '0' + h;
      }
      var m = seconds / 60 % 60;
      if (m.length < 2) {
        m = '0' + m;
      }
      var s = seconds % 60;
      if (s.length < 2) {
        s = '0' + m;
      }
      var ms = parseInt((this.progress - seconds) * 100);
      return h + ':' + m + ':' + s + '.' + ms;
    }
  }]);

  return VASTTracker;
}(_events.EventEmitter);

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _YouTube = __webpack_require__(5);

var _SoundCloud = __webpack_require__(7);

var _Vimeo = __webpack_require__(8);

var _Facebook = __webpack_require__(14);

var _Streamable = __webpack_require__(15);

var _FaceMask = __webpack_require__(16);

var _Wistia = __webpack_require__(17);

var _Twitch = __webpack_require__(18);

var _DailyMotion = __webpack_require__(9);

var _UstreamLive = __webpack_require__(19);

var _UstreamVideo = __webpack_require__(20);

var _Iframe = __webpack_require__(21);

var _Mixcloud = __webpack_require__(22);

var _FilePlayer = __webpack_require__(10);

var _VAST = __webpack_require__(23);

var _JWPlayer = __webpack_require__(30);

var _PhenixPlayer = __webpack_require__(31);

exports['default'] = [_PhenixPlayer.PhenixPlayer, _YouTube.YouTube, _SoundCloud.SoundCloud, _Vimeo.Vimeo, _Facebook.Facebook, _Streamable.Streamable, _FaceMask.FaceMask, _Wistia.Wistia, _Twitch.Twitch, _DailyMotion.DailyMotion, _Mixcloud.Mixcloud, _UstreamLive.UstreamLive, _UstreamVideo.UstreamVideo, _JWPlayer.JWPlayer, _VAST.VAST, _FilePlayer.FilePlayer, _Iframe.Iframe];

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ICON_SIZE = '64px';

var Preview = function (_Component) {
  _inherits(Preview, _Component);

  function Preview() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Preview);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Preview.__proto__ || Object.getPrototypeOf(Preview)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      image: null
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Preview, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.fetchImage(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.url !== nextProps.url) {
        this.fetchImage(nextProps);
      }
    }
  }, {
    key: 'fetchImage',
    value: function fetchImage(_ref2) {
      var _this2 = this;

      var url = _ref2.url,
          light = _ref2.light;

      if (typeof light === 'string') {
        this.setState({ image: light });
        return;
      }
      this.setState({ image: null });
      return window.fetch('https://noembed.com/embed?url=' + url).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.thumbnail_url) {
          var image = data.thumbnail_url.replace('height=100', 'height=480');
          _this2.setState({ image: image });
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var onClick = this.props.onClick;
      var image = this.state.image;

      var flexCenter = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      };
      var styles = {
        preview: _extends({
          width: '100%',
          height: '100%',
          backgroundImage: image ? 'url(' + image + ')' : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          cursor: 'pointer'
        }, flexCenter),
        shadow: _extends({
          background: 'radial-gradient(rgb(0, 0, 0, 0.3), rgba(0, 0, 0, 0) 60%)',
          borderRadius: ICON_SIZE,
          width: ICON_SIZE,
          height: ICON_SIZE
        }, flexCenter),
        playIcon: {
          borderStyle: 'solid',
          borderWidth: '16px 0 16px 26px',
          borderColor: 'transparent transparent transparent white',
          marginLeft: '7px'
        }
      };
      return _react2['default'].createElement(
        'div',
        { style: styles.preview, className: 'react-player__preview', onClick: onClick },
        _react2['default'].createElement(
          'div',
          { style: styles.shadow, className: 'react-player__shadow' },
          _react2['default'].createElement('div', { style: styles.playIcon, className: 'react-player__play-icon' })
        )
      );
    }
  }]);

  return Preview;
}(_react.Component);

exports['default'] = Preview;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = renderPreloadPlayers;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Player = __webpack_require__(6);

var _Player2 = _interopRequireDefault(_Player);

var _YouTube = __webpack_require__(5);

var _SoundCloud = __webpack_require__(7);

var _Vimeo = __webpack_require__(8);

var _DailyMotion = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var PRELOAD_PLAYERS = [{
  Player: _YouTube.YouTube,
  configKey: 'youtube',
  url: 'https://www.youtube.com/watch?v=GlCmAC4MHek'
}, {
  Player: _SoundCloud.SoundCloud,
  configKey: 'soundcloud',
  url: 'https://soundcloud.com/seucheu/john-cage-433-8-bit-version'
}, {
  Player: _Vimeo.Vimeo,
  configKey: 'vimeo',
  url: 'https://vimeo.com/300970506'
}, {
  Player: _DailyMotion.DailyMotion,
  configKey: 'dailymotion',
  url: 'http://www.dailymotion.com/video/xqdpyk'
}];

function renderPreloadPlayers(url, controls, config) {
  var players = [];

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = PRELOAD_PLAYERS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var player = _step.value;

      if (!player.Player.canPlay(url) && config[player.configKey].preload) {
        players.push(_react2['default'].createElement(_Player2['default'], {
          key: player.Player.displayName,
          activePlayer: player.Player,
          url: player.url,
          controls: controls,
          playing: true,
          muted: true,
          style: { display: 'none' }
        }));
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return players;
}

/***/ })
/******/ ])["default"];
//# sourceMappingURL=ReactPlayer.standalone.js.map