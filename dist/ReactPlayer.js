var ReactPlayer =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

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

var _loadScript = __webpack_require__(24);

var _loadScript2 = _interopRequireDefault(_loadScript);

var _deepmerge = __webpack_require__(25);

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _props = __webpack_require__(3);

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

var _props2 = __webpack_require__(3);

var _utils = __webpack_require__(1);

var _Player = __webpack_require__(5);

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
exports.DEPRECATED_CONFIG_PROPS = exports.defaultProps = exports.propTypes = undefined;

var _propTypes = __webpack_require__(26);

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
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _props2 = __webpack_require__(3);

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
/* 6 */
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
/* 7 */
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
/* 8 */
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
/* 9 */
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
/* 10 */
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
/* 11 */
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
/* 12 */
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
/* 13 */
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
/* 14 */
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
/* 15 */
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
/* 16 */
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
/* 17 */
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
/* 18 */
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VAST = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utils = __webpack_require__(1);

var _singlePlayer = __webpack_require__(2);

var _singlePlayer2 = _interopRequireDefault(_singlePlayer);

var _ima = __webpack_require__(31);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PLAYER_ID_PREFIX = 'vast-player-';
var CONTENT_ID_PREFIX = 'vast-content-';
var PLAY_BUTTON_ID_PREFIX = 'vast-play-';
var MATCH_URL = /^VAST:https:\/\//i;

// Example: https://github.com/googleads/googleads-ima-html5/blob/master/attempt_to_autoplay/ads.js

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
      adDisplayContainer: null,
      autoplayChecksResolved: false,
      adObject: null,
      adsInitialized: false,
      adsLoader: null,
      adsManager: null,
      adsRequest: null,
      adsUrl: null,
      autoplayAllowed: null,
      autoplayRequiresMuted: null,
      ima: null,
      preMuteVolume: 0,
      showPlayButton: false
    }, _this.playerID = PLAYER_ID_PREFIX + (0, _utils.randomString)(), _this.contentID = CONTENT_ID_PREFIX + (0, _utils.randomString)(), _this.playButtonID = PLAY_BUTTON_ID_PREFIX + (0, _utils.randomString)(), _this.callPlayer = _utils.callPlayer, _this.mute = function () {
      var adsManager = _this.state.adsManager;

      if (!adsManager) return null;
      _this.setState({ preMuteVolume: adsManager.getVolume() });
      _this.setVolume(0.0);
    }, _this.unmute = function () {
      var preMuteVolume = _this.state.preMuteVolume;

      _this.setVolume(preMuteVolume);
    }, _this.ref = function (container) {
      _this.container = container;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(VAST, [{
    key: 'onAutoplayWithSoundSuccess',
    value: function onAutoplayWithSoundSuccess() {
      // If we make it here, unmuted autoplay works.
      var videoElement = document.getElementById(this.playerID);
      videoElement.pause();
      this.setState({
        autoplayAllowed: true,
        autoplayRequiresMuted: false,
        autoplayChecksResolved: true
      });
    }
  }, {
    key: 'onMutedAutoplaySuccess',
    value: function onMutedAutoplaySuccess() {
      // If we make it here, muted autoplay works but unmuted autoplay does not.
      var videoElement = document.getElementById(this.playerID);
      videoElement.pause();
      this.setState({
        autoplayAllowed: true,
        autoplayRequiresMuted: true,
        autoplayChecksResolved: true
      });
    }
  }, {
    key: 'onMutedAutoplayFail',
    value: function onMutedAutoplayFail() {
      // Both muted and unmuted autoplay failed. Fall back to click to play.
      var videoElement = document.getElementById(this.playerID);
      videoElement.volume = 1;
      videoElement.muted = false;
      this.setState({
        autoplayAllowed: false,
        autoplayRequiresMuted: false,
        autoplayChecksResolved: true
      });
    }
  }, {
    key: 'checkMutedAutoplaySupport',
    value: function checkMutedAutoplaySupport() {
      var videoElement = document.getElementById(this.playerID);
      videoElement.volume = 0;
      videoElement.muted = true;
      var promise = videoElement.play();
      if (promise !== undefined) {
        promise.then(this.onMutedAutoplaySuccess)['catch'](this.onMutedAutoplayFail);
      }
    }
  }, {
    key: 'checkAutoplaySupport',
    value: function checkAutoplaySupport() {
      var _this2 = this;

      var videoElement = document.getElementById(this.playerID);
      var promise = videoElement.play();
      if (promise !== undefined) {
        promise.then(function () {
          _this2.onAutoplayWithSoundSuccess();
        })['catch'](function () {
          _this2.checkMutedAutoplaySupport();
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      // sdk is loaded
      if (prevState.adsUrl === null && this.state.adsUrl) {
        return this.checkAutoplaySupport();
      }

      // autoplay settings determined
      if (prevState.autoplayChecksResolved === false && this.state.autoplayChecksResolved === true) {
        return this.onAutoplayChecksResolved();
      }

      // adsManager events listening
      if (prevState.adsManager === null && this.state.adsManager) {
        var autoplayAllowed = this.state.autoplayAllowed;

        if (autoplayAllowed) {
          this.playAds();
        } else {
          this.setState({ showPlayButton: true });
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.removeListeners();
    }
  }, {
    key: 'removeListeners',
    value: function removeListeners() {
      var adsManager = this.state.adsManager;

      window.removeEventListener('resize', this._onWindowResize);

      if (adsManager && this.eventMap) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Object.entries(this.eventMap)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ref2 = _step.value;

            var _ref3 = _slicedToArray(_ref2, 2);

            var event = _ref3[0];
            var fn = _ref3[1];

            adsManager.removeEventListener(event, fn);
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
    }
  }, {
    key: 'onWindowResize',
    value: function onWindowResize() {
      var _state = this.state,
          adsManager = _state.adsManager,
          ima = _state.ima;

      var videoElement = document.getElementById(this.playerID);
      var height = videoElement.offsetHeight,
          width = videoElement.offsetWidth;

      if (!adsManager) return null;
      adsManager.resize(width, height, ima.ViewMode.NORMAL);
    }
  }, {
    key: 'onLoaded',
    value: function onLoaded(adEvent) {
      var onPlay = this.props.onPlay;

      var adObject = adEvent.getAd();
      onPlay();
      this.setState({ adObject: adObject });
    }
  }, {
    key: 'onAdsManagerLoaded',
    value: function onAdsManagerLoaded(adsManagerLoadedEvent) {
      var _eventMap;

      var _props = this.props,
          onEnded = _props.onEnded,
          onPause = _props.onPause,
          onPlay = _props.onPlay,
          onVolumeChange = _props.onVolumeChange;
      var ima = this.state.ima;

      var adsManager = adsManagerLoadedEvent.getAdsManager(document.getElementById(this.playerID));

      // bind resize event
      this._onWindowResize = this.onWindowResize.bind(this);
      window.addEventListener('resize', this._onWindowResize);

      this.eventMap = (_eventMap = {}, _defineProperty(_eventMap, ima.AdErrorEvent.Type.AD_ERROR, this.onError.bind(this)), _defineProperty(_eventMap, ima.AdEvent.Type.COMPLETE, onEnded.bind(this)), _defineProperty(_eventMap, ima.AdEvent.Type.LOADED, this.onLoaded.bind(this)), _defineProperty(_eventMap, ima.AdEvent.Type.RESUMED, onPlay.bind(this)), _defineProperty(_eventMap, ima.AdEvent.Type.PAUSED, onPause.bind(this)), _defineProperty(_eventMap, ima.AdEvent.Type.VOLUME_CHANGED, onVolumeChange.bind(this)), _eventMap);

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Object.entries(this.eventMap)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _ref4 = _step2.value;

          var _ref5 = _slicedToArray(_ref4, 2);

          var event = _ref5[0];
          var fn = _ref5[1];

          adsManager.addEventListener(event, fn);
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

      this.setState({ adsManager: adsManager });
    }
  }, {
    key: 'onAutoplayChecksResolved',
    value: function onAutoplayChecksResolved() {
      var _state2 = this.state,
          adsUrl = _state2.adsUrl,
          adsLoader = _state2.adsLoader,
          autoplayAllowed = _state2.autoplayAllowed,
          autoplayRequiresMuted = _state2.autoplayRequiresMuted,
          ima = _state2.ima;
      // setup ads request

      var adsRequest = new ima.AdsRequest();
      adsRequest.adTagUrl = adsUrl;
      adsRequest.setAdWillAutoPlay(autoplayAllowed);
      adsRequest.setAdWillPlayMuted(autoplayRequiresMuted);
      adsLoader.requestAds(adsRequest);
    }
  }, {
    key: 'playAds',
    value: function playAds() {
      var _state3 = this.state,
          adDisplayContainer = _state3.adDisplayContainer,
          adsManager = _state3.adsManager,
          adsInitialized = _state3.adsInitialized,
          ima = _state3.ima;
      var onReady = this.props.onReady;

      try {
        if (!adsInitialized) {
          adDisplayContainer.initialize();
          this.setState({ adsInitialized: true });
        }
        // Initialize the ads manager. Ad rules playlist will start at this time.
        adsManager.init(640, 360, ima.ViewMode.NORMAL);

        // trigger window resize
        this.onWindowResize();

        // Call play to start showing the ad. Single video and overlay ads will
        // start at this time; the call will be ignored for ad rules.
        adsManager.start();

        // fire ready
        onReady();
      } catch (adError) {
        // An error may be thrown if there was a problem with the VAST response.
        this.props.onEnded();
      }
    }
  }, {
    key: 'load',
    value: function load(rawUrl) {
      var _this3 = this;

      // replace [RANDOM] or [random] with a randomly generated cache value
      var ord = Math.random() * 10000000000000000;
      var url = rawUrl.replace(/\[random]/ig, ord);

      (0, _ima.loadImaSdk)().then(function (ima) {
        // Create the ad display container.
        var adDisplayContainer = new ima.AdDisplayContainer(document.getElementById(_this3.contentID), document.getElementById(_this3.playerID));

        // Create the ads loader.
        var adsLoader = new ima.AdsLoader(adDisplayContainer);

        // Listen and respond to ads loaded and error events
        adsLoader.addEventListener(ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, _this3.onAdsManagerLoaded.bind(_this3), false);
        adsLoader.addEventListener(ima.AdErrorEvent.Type.AD_ERROR, _this3.onError.bind(_this3), false);

        _this3.setState({
          ima: ima,
          adDisplayContainer: adDisplayContainer,
          adsLoader: adsLoader,
          adsUrl: url.slice('VAST:'.length)
        });
      })['catch'](function () {
        // error loading ima, probably because of adblock. just fire onended
        _this3.props.onEnded();
      });
    }
  }, {
    key: 'onError',
    value: function onError(error) {
      var onError = this.props.onError;
      var adsManager = this.state.adsManager;

      if (adsManager) {
        adsManager.destroy();
      }
      onError(error);
    }
  }, {
    key: 'play',
    value: function play() {
      var adsManager = this.state.adsManager;

      if (!adsManager) return null;
      adsManager.resume();
    }
  }, {
    key: 'pause',
    value: function pause() {
      var adsManager = this.state.adsManager;

      adsManager.pause();
    }
  }, {
    key: 'seekTo',
    value: function seekTo() {}
  }, {
    key: 'stop',
    value: function stop() {
      var adsManager = this.state.adsManager;

      if (!adsManager) return null;
      adsManager.destroy();
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      var adsManager = this.state.adsManager;

      if (!adsManager) return null;
      adsManager.setVolume(fraction);
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      var adObject = this.state.adObject;

      if (!adObject) return null;
      var duration = adObject.getDuration();
      return duration > 0 ? duration : null;
    }
  }, {
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      var adsManager = this.state.adsManager;

      if (!adsManager) return null;
      var duration = this.getDuration();
      var remainingTime = adsManager.getRemainingTime();
      if (Number.isFinite(duration) && Number.isFinite(remainingTime)) {
        return duration - remainingTime;
      }
      return null;
    }
  }, {
    key: 'getSecondsLoaded',
    value: function getSecondsLoaded() {
      return null;
    }
  }, {
    key: 'onButtonClick',
    value: function onButtonClick() {
      var _this4 = this;

      // Initialize the container. Must be done via a user action where autoplay
      // is not allowed.
      var adDisplayContainer = this.state.adDisplayContainer;

      adDisplayContainer.initialize();
      var videoElement = document.getElementById(this.playerID);
      this.setState({
        adsInitalized: true,
        showPlayButton: false
      }, function () {
        videoElement.load();
        _this4.playAds();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var _props2 = this.props,
          width = _props2.width,
          height = _props2.height;
      var showPlayButton = this.state.showPlayButton;

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
      var playButtonStyle = {
        borderStyle: 'solid',
        borderWidth: '16px 0 16px 26px',
        borderColor: 'transparent transparent transparent white',
        cursor: 'pointer',
        left: '50%',
        marginLeft: '-8px',
        marginTop: '-8px',
        position: 'absolute',
        top: '50%',
        zIndex: 2
      };
      return _react2['default'].createElement(
        'div',
        { style: _extends({}, dimensions, { position: 'relative' }) },
        showPlayButton && _react2['default'].createElement('div', { style: playButtonStyle, id: this.playButtonID, onClick: function onClick() {
            return _this5.onButtonClick();
          } }),
        _react2['default'].createElement('video', {
          ref: this.ref,
          controls: false,
          src: 'https://www.maestro.io/pkg/dobi-api/4.0/public/blank.mp4',
          style: dimensions,
          preload: 'auto',
          id: this.playerID
        }),
        _react2['default'].createElement('div', { id: this.contentID, style: contentStyle })
      );
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// Asynchronous loader for external scripts
var loadScript = function loadScript(src) {
    return new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.async = true;
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
};
exports['default'] = loadScript;

/***/ }),
/* 21 */
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
/* 22 */
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhenixPlayer = exports.JWPlayer = exports.VAST = exports.FilePlayer = exports.Mixcloud = exports.Iframe = exports.UstreamVideo = exports.UstreamLive = exports.DailyMotion = exports.Twitch = exports.Wistia = exports.FaceMask = exports.Streamable = exports.Facebook = exports.Vimeo = exports.SoundCloud = exports.YouTube = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _YouTube = __webpack_require__(4);

Object.defineProperty(exports, 'YouTube', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_YouTube)['default'];
  }
});

var _SoundCloud = __webpack_require__(6);

Object.defineProperty(exports, 'SoundCloud', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SoundCloud)['default'];
  }
});

var _Vimeo = __webpack_require__(7);

Object.defineProperty(exports, 'Vimeo', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Vimeo)['default'];
  }
});

var _Facebook = __webpack_require__(9);

Object.defineProperty(exports, 'Facebook', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Facebook)['default'];
  }
});

var _Streamable = __webpack_require__(10);

Object.defineProperty(exports, 'Streamable', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Streamable)['default'];
  }
});

var _FaceMask = __webpack_require__(11);

Object.defineProperty(exports, 'FaceMask', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_FaceMask)['default'];
  }
});

var _Wistia = __webpack_require__(12);

Object.defineProperty(exports, 'Wistia', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Wistia)['default'];
  }
});

var _Twitch = __webpack_require__(13);

Object.defineProperty(exports, 'Twitch', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Twitch)['default'];
  }
});

var _DailyMotion = __webpack_require__(8);

Object.defineProperty(exports, 'DailyMotion', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_DailyMotion)['default'];
  }
});

var _UstreamLive = __webpack_require__(14);

Object.defineProperty(exports, 'UstreamLive', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_UstreamLive)['default'];
  }
});

var _UstreamVideo = __webpack_require__(15);

Object.defineProperty(exports, 'UstreamVideo', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_UstreamVideo)['default'];
  }
});

var _Iframe = __webpack_require__(16);

Object.defineProperty(exports, 'Iframe', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Iframe)['default'];
  }
});

var _Mixcloud = __webpack_require__(17);

Object.defineProperty(exports, 'Mixcloud', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Mixcloud)['default'];
  }
});

var _FilePlayer = __webpack_require__(18);

Object.defineProperty(exports, 'FilePlayer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_FilePlayer)['default'];
  }
});

var _VAST = __webpack_require__(19);

Object.defineProperty(exports, 'VAST', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_VAST)['default'];
  }
});

var _JWPlayer = __webpack_require__(21);

Object.defineProperty(exports, 'JWPlayer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_JWPlayer)['default'];
  }
});

var _PhenixPlayer = __webpack_require__(22);

Object.defineProperty(exports, 'PhenixPlayer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PhenixPlayer)['default'];
  }
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _props2 = __webpack_require__(3);

var _utils = __webpack_require__(1);

var _players = __webpack_require__(33);

var _players2 = _interopRequireDefault(_players);

var _Player4 = __webpack_require__(5);

var _Player5 = _interopRequireDefault(_Player4);

var _Preview = __webpack_require__(34);

var _Preview2 = _interopRequireDefault(_Preview);

var _preload = __webpack_require__(35);

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
/* 24 */
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
/* 25 */
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
				destination[key] = deepmerge(target[key], source[key], options);
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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) {
  var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

  var isValidElement = function isValidElement(object) {
    return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(27)();
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(28);
var invariant = __webpack_require__(29);
var ReactPropTypesSecret = __webpack_require__(30);

module.exports = function () {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
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
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (false) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),
/* 30 */
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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _loadImaSdk = __webpack_require__(32);

Object.defineProperty(exports, 'loadImaSdk', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_loadImaSdk)['default'];
  }
});

var _loadScript = __webpack_require__(20);

Object.defineProperty(exports, 'loadScript', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_loadScript)['default'];
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _loadScript = __webpack_require__(20);

var _loadScript2 = _interopRequireDefault(_loadScript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var imaSdkSrc = '//imasdk.googleapis.com/js/sdkloader/ima3.js'; /// <reference path="../typings/ima.d.ts" />

var pendingPromise = null;
var promiseFinished = function promiseFinished() {
    pendingPromise = null;
};
var loadImaSdk = function loadImaSdk() {
    if (window.google && window.google.ima) {
        return Promise.resolve(window.google.ima);
    }
    if (pendingPromise) {
        return pendingPromise;
    }
    pendingPromise = (0, _loadScript2['default'])(imaSdkSrc).then(function () {
        return window.google.ima;
    });
    pendingPromise.then(promiseFinished)['catch'](promiseFinished);
    return pendingPromise;
};
exports['default'] = loadImaSdk;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _YouTube = __webpack_require__(4);

var _SoundCloud = __webpack_require__(6);

var _Vimeo = __webpack_require__(7);

var _Facebook = __webpack_require__(9);

var _Streamable = __webpack_require__(10);

var _FaceMask = __webpack_require__(11);

var _Wistia = __webpack_require__(12);

var _Twitch = __webpack_require__(13);

var _DailyMotion = __webpack_require__(8);

var _UstreamLive = __webpack_require__(14);

var _UstreamVideo = __webpack_require__(15);

var _Iframe = __webpack_require__(16);

var _Mixcloud = __webpack_require__(17);

var _FilePlayer = __webpack_require__(18);

var _VAST = __webpack_require__(19);

var _JWPlayer = __webpack_require__(21);

var _PhenixPlayer = __webpack_require__(22);

exports['default'] = [_PhenixPlayer.PhenixPlayer, _YouTube.YouTube, _SoundCloud.SoundCloud, _Vimeo.Vimeo, _Facebook.Facebook, _Streamable.Streamable, _FaceMask.FaceMask, _Wistia.Wistia, _Twitch.Twitch, _DailyMotion.DailyMotion, _Mixcloud.Mixcloud, _UstreamLive.UstreamLive, _UstreamVideo.UstreamVideo, _JWPlayer.JWPlayer, _VAST.VAST, _FilePlayer.FilePlayer, _Iframe.Iframe];

/***/ }),
/* 34 */
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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = renderPreloadPlayers;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Player = __webpack_require__(5);

var _Player2 = _interopRequireDefault(_Player);

var _YouTube = __webpack_require__(4);

var _SoundCloud = __webpack_require__(6);

var _Vimeo = __webpack_require__(7);

var _DailyMotion = __webpack_require__(8);

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
//# sourceMappingURL=ReactPlayer.js.map