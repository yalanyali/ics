"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = buildEvent;

var _pickBy = _interopRequireDefault(require("lodash/pickBy"));

var _identity = _interopRequireDefault(require("lodash/identity"));

var _defaults = _interopRequireDefault(require("../defaults"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function buildEvent() {
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var title = attributes.title,
      productId = attributes.productId,
      method = attributes.method,
      uid = attributes.uid,
      sequence = attributes.sequence,
      start = attributes.start,
      startType = attributes.startType,
      duration = attributes.duration,
      end = attributes.end,
      description = attributes.description,
      url = attributes.url,
      geo = attributes.geo,
      location = attributes.location,
      status = attributes.status,
      categories = attributes.categories,
      organizer = attributes.organizer,
      attendees = attributes.attendees,
      alarms = attributes.alarms,
      recurrenceRule = attributes.recurrenceRule,
      exRule = attributes.exRule,
      exDateRule = attributes.exDateRule,
      created = attributes.created,
      lastModified = attributes.lastModified,
      calName = attributes.calName; // fill in default values where necessary

  var output = Object.assign({}, _defaults["default"], attributes); // remove falsey values

  var cleanOutput = (0, _pickBy["default"])(output, _identity["default"]);
  return cleanOutput;
}