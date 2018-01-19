(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("widgets/select2", [], factory);
	else if(typeof exports === 'object')
		exports["widgets/select2"] = factory();
	else
		root["widgets/select2"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function init(Survey, $) {
  $ = $ || window.$;
  var widget = {
    activatedBy: "property",
    name: "select2",
    htmlTemplate: "<select style='width: 100%;'></select>",
    widgetIsLoaded: function() {
      return typeof $ == "function" && !!$.fn.select2;
    },
    isFit: function(question) {
      if (widget.activatedBy == "property")
        return (
          question["renderAs"] === "select2" &&
          question.getType() === "dropdown"
        );
      if (widget.activatedBy == "type")
        return typeof question.getType() === "dropdown";
      if (widget.activatedBy == "customtype")
        return question.getType() === "select2";
      return false;
    },
    activatedByChanged: function(activatedBy) {
      if (!this.widgetIsLoaded()) return;
      widget.activatedBy = activatedBy;
      Survey.JsonObject.metaData.removeProperty("dropdown", "renderAs");
      if (activatedBy == "property") {
        Survey.JsonObject.metaData.addProperty("dropdown", {
          name: "renderAs",
          default: "standard",
          choices: ["standard", "select2"]
        });
      }
      if (activatedBy == "customtype") {
        Survey.JsonObject.metaData.addClass("select2", [], null, "dropdown");
      }
    },
    afterRender: function(question, el) {
      var $el = $(el).is("select") ? $(el) : $(el).find("select");
      var othersEl = document.createElement("input");
      othersEl.type = "text";
      othersEl.style.marginTop = "3px";
      othersEl.style.display = "none";
      othersEl.style.width = "100%";
      $el
        .parent()
        .get(0)
        .appendChild(othersEl);
      var widget = $el.select2({
        theme: "classic"
      });
      var updateValueHandler = function() {
        $el.val(question.value).trigger("change");
        othersEl.style.display = !question.isOtherSelected ? "none" : "";
      };
      var updateCommentHandler = function() {
        othersEl.value = question.comment ? question.comment : "";
      };
      var othersElChanged = function() {
        question.comment = othersEl.value;
      };
      var updateChoices = function() {
        $el.select2({
          data: question.visibleChoices.map(function(choice) {
            return { id: choice.value, text: choice.text };
          })
        });
        updateValueHandler();
        updateCommentHandler();
      };
      question.choicesChangedCallback = updateChoices;
      updateChoices();
      $el.on("select2:select", function(e) {
        question.value = e.target.value;
      });
      othersEl.onchange = othersElChanged;
      question.valueChangedCallback = updateValueHandler;
      question.commentChangedCallback = updateCommentHandler;
      updateValueHandler();
      updateCommentHandler();
    },
    willUnmount: function(question, el) {
      $(el)
        .find("select")
        .off("select2:select")
        .select2("destroy");
    }
  };

  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget);
}

if (typeof Survey !== "undefined") {
  init(Survey, window.$);
}

/* harmony default export */ __webpack_exports__["default"] = (init);


/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5ZDBmYmE3ZWZhNzNmMzUzN2U5NiIsIndlYnBhY2s6Ly8vLi9zcmMvc2VsZWN0Mi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUM3REE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDO0FBQzlDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEIsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6IndpZGdldHMvc2VsZWN0Mi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwid2lkZ2V0cy9zZWxlY3QyXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIndpZGdldHMvc2VsZWN0MlwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJ3aWRnZXRzL3NlbGVjdDJcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDlkMGZiYTdlZmE3M2YzNTM3ZTk2IiwiZnVuY3Rpb24gaW5pdChTdXJ2ZXksICQpIHtcclxuICAkID0gJCB8fCB3aW5kb3cuJDtcclxuICB2YXIgd2lkZ2V0ID0ge1xyXG4gICAgYWN0aXZhdGVkQnk6IFwicHJvcGVydHlcIixcclxuICAgIG5hbWU6IFwic2VsZWN0MlwiLFxyXG4gICAgaHRtbFRlbXBsYXRlOiBcIjxzZWxlY3Qgc3R5bGU9J3dpZHRoOiAxMDAlOyc+PC9zZWxlY3Q+XCIsXHJcbiAgICB3aWRnZXRJc0xvYWRlZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiB0eXBlb2YgJCA9PSBcImZ1bmN0aW9uXCIgJiYgISEkLmZuLnNlbGVjdDI7XHJcbiAgICB9LFxyXG4gICAgaXNGaXQ6IGZ1bmN0aW9uKHF1ZXN0aW9uKSB7XHJcbiAgICAgIGlmICh3aWRnZXQuYWN0aXZhdGVkQnkgPT0gXCJwcm9wZXJ0eVwiKVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICBxdWVzdGlvbltcInJlbmRlckFzXCJdID09PSBcInNlbGVjdDJcIiAmJlxyXG4gICAgICAgICAgcXVlc3Rpb24uZ2V0VHlwZSgpID09PSBcImRyb3Bkb3duXCJcclxuICAgICAgICApO1xyXG4gICAgICBpZiAod2lkZ2V0LmFjdGl2YXRlZEJ5ID09IFwidHlwZVwiKVxyXG4gICAgICAgIHJldHVybiB0eXBlb2YgcXVlc3Rpb24uZ2V0VHlwZSgpID09PSBcImRyb3Bkb3duXCI7XHJcbiAgICAgIGlmICh3aWRnZXQuYWN0aXZhdGVkQnkgPT0gXCJjdXN0b210eXBlXCIpXHJcbiAgICAgICAgcmV0dXJuIHF1ZXN0aW9uLmdldFR5cGUoKSA9PT0gXCJzZWxlY3QyXCI7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBhY3RpdmF0ZWRCeUNoYW5nZWQ6IGZ1bmN0aW9uKGFjdGl2YXRlZEJ5KSB7XHJcbiAgICAgIGlmICghdGhpcy53aWRnZXRJc0xvYWRlZCgpKSByZXR1cm47XHJcbiAgICAgIHdpZGdldC5hY3RpdmF0ZWRCeSA9IGFjdGl2YXRlZEJ5O1xyXG4gICAgICBTdXJ2ZXkuSnNvbk9iamVjdC5tZXRhRGF0YS5yZW1vdmVQcm9wZXJ0eShcImRyb3Bkb3duXCIsIFwicmVuZGVyQXNcIik7XHJcbiAgICAgIGlmIChhY3RpdmF0ZWRCeSA9PSBcInByb3BlcnR5XCIpIHtcclxuICAgICAgICBTdXJ2ZXkuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRQcm9wZXJ0eShcImRyb3Bkb3duXCIsIHtcclxuICAgICAgICAgIG5hbWU6IFwicmVuZGVyQXNcIixcclxuICAgICAgICAgIGRlZmF1bHQ6IFwic3RhbmRhcmRcIixcclxuICAgICAgICAgIGNob2ljZXM6IFtcInN0YW5kYXJkXCIsIFwic2VsZWN0MlwiXVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChhY3RpdmF0ZWRCeSA9PSBcImN1c3RvbXR5cGVcIikge1xyXG4gICAgICAgIFN1cnZleS5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZENsYXNzKFwic2VsZWN0MlwiLCBbXSwgbnVsbCwgXCJkcm9wZG93blwiKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFmdGVyUmVuZGVyOiBmdW5jdGlvbihxdWVzdGlvbiwgZWwpIHtcclxuICAgICAgdmFyICRlbCA9ICQoZWwpLmlzKFwic2VsZWN0XCIpID8gJChlbCkgOiAkKGVsKS5maW5kKFwic2VsZWN0XCIpO1xyXG4gICAgICB2YXIgb3RoZXJzRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICAgIG90aGVyc0VsLnR5cGUgPSBcInRleHRcIjtcclxuICAgICAgb3RoZXJzRWwuc3R5bGUubWFyZ2luVG9wID0gXCIzcHhcIjtcclxuICAgICAgb3RoZXJzRWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICBvdGhlcnNFbC5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xyXG4gICAgICAkZWxcclxuICAgICAgICAucGFyZW50KClcclxuICAgICAgICAuZ2V0KDApXHJcbiAgICAgICAgLmFwcGVuZENoaWxkKG90aGVyc0VsKTtcclxuICAgICAgdmFyIHdpZGdldCA9ICRlbC5zZWxlY3QyKHtcclxuICAgICAgICB0aGVtZTogXCJjbGFzc2ljXCJcclxuICAgICAgfSk7XHJcbiAgICAgIHZhciB1cGRhdGVWYWx1ZUhhbmRsZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAkZWwudmFsKHF1ZXN0aW9uLnZhbHVlKS50cmlnZ2VyKFwiY2hhbmdlXCIpO1xyXG4gICAgICAgIG90aGVyc0VsLnN0eWxlLmRpc3BsYXkgPSAhcXVlc3Rpb24uaXNPdGhlclNlbGVjdGVkID8gXCJub25lXCIgOiBcIlwiO1xyXG4gICAgICB9O1xyXG4gICAgICB2YXIgdXBkYXRlQ29tbWVudEhhbmRsZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBvdGhlcnNFbC52YWx1ZSA9IHF1ZXN0aW9uLmNvbW1lbnQgPyBxdWVzdGlvbi5jb21tZW50IDogXCJcIjtcclxuICAgICAgfTtcclxuICAgICAgdmFyIG90aGVyc0VsQ2hhbmdlZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHF1ZXN0aW9uLmNvbW1lbnQgPSBvdGhlcnNFbC52YWx1ZTtcclxuICAgICAgfTtcclxuICAgICAgdmFyIHVwZGF0ZUNob2ljZXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAkZWwuc2VsZWN0Mih7XHJcbiAgICAgICAgICBkYXRhOiBxdWVzdGlvbi52aXNpYmxlQ2hvaWNlcy5tYXAoZnVuY3Rpb24oY2hvaWNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IGlkOiBjaG9pY2UudmFsdWUsIHRleHQ6IGNob2ljZS50ZXh0IH07XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHVwZGF0ZVZhbHVlSGFuZGxlcigpO1xyXG4gICAgICAgIHVwZGF0ZUNvbW1lbnRIYW5kbGVyKCk7XHJcbiAgICAgIH07XHJcbiAgICAgIHF1ZXN0aW9uLmNob2ljZXNDaGFuZ2VkQ2FsbGJhY2sgPSB1cGRhdGVDaG9pY2VzO1xyXG4gICAgICB1cGRhdGVDaG9pY2VzKCk7XHJcbiAgICAgICRlbC5vbihcInNlbGVjdDI6c2VsZWN0XCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBxdWVzdGlvbi52YWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgICB9KTtcclxuICAgICAgb3RoZXJzRWwub25jaGFuZ2UgPSBvdGhlcnNFbENoYW5nZWQ7XHJcbiAgICAgIHF1ZXN0aW9uLnZhbHVlQ2hhbmdlZENhbGxiYWNrID0gdXBkYXRlVmFsdWVIYW5kbGVyO1xyXG4gICAgICBxdWVzdGlvbi5jb21tZW50Q2hhbmdlZENhbGxiYWNrID0gdXBkYXRlQ29tbWVudEhhbmRsZXI7XHJcbiAgICAgIHVwZGF0ZVZhbHVlSGFuZGxlcigpO1xyXG4gICAgICB1cGRhdGVDb21tZW50SGFuZGxlcigpO1xyXG4gICAgfSxcclxuICAgIHdpbGxVbm1vdW50OiBmdW5jdGlvbihxdWVzdGlvbiwgZWwpIHtcclxuICAgICAgJChlbClcclxuICAgICAgICAuZmluZChcInNlbGVjdFwiKVxyXG4gICAgICAgIC5vZmYoXCJzZWxlY3QyOnNlbGVjdFwiKVxyXG4gICAgICAgIC5zZWxlY3QyKFwiZGVzdHJveVwiKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBTdXJ2ZXkuQ3VzdG9tV2lkZ2V0Q29sbGVjdGlvbi5JbnN0YW5jZS5hZGRDdXN0b21XaWRnZXQod2lkZ2V0KTtcclxufVxyXG5cclxuaWYgKHR5cGVvZiBTdXJ2ZXkgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICBpbml0KFN1cnZleSwgd2luZG93LiQpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBpbml0O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zZWxlY3QyLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCA2Il0sInNvdXJjZVJvb3QiOiIifQ==