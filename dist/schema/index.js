"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = validateEvent;

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var dateTimeSchema = _joi["default"].array().min(3).max(7).ordered(_joi["default"].number().integer(), _joi["default"].number().integer().min(1).max(12), _joi["default"].number().integer().min(1).max(31), _joi["default"].number().integer().min(0).max(23), _joi["default"].number().integer().min(0).max(60), _joi["default"].number().integer().min(0).max(60));

var durationSchema = _joi["default"].object().keys({
  before: _joi["default"]["boolean"](),
  //option to set before alaram
  weeks: _joi["default"].number(),
  days: _joi["default"].number(),
  hours: _joi["default"].number(),
  minutes: _joi["default"].number(),
  seconds: _joi["default"].number()
});

var contactSchema = _joi["default"].object().keys({
  name: _joi["default"].string(),
  email: _joi["default"].string().email({
    tlds: {
      allow: false
    }
  }),
  rsvp: _joi["default"]["boolean"](),
  dir: _joi["default"].string().uri(),
  partstat: _joi["default"].string(),
  role: _joi["default"].string()
});

var organizerSchema = _joi["default"].object().keys({
  name: _joi["default"].string(),
  email: _joi["default"].string().email({
    tlds: {
      allow: false
    }
  })
});

var alarmSchema = _joi["default"].object().keys({
  action: _joi["default"].string().regex(/audio|display|email/).required(),
  trigger: _joi["default"].any().required(),
  description: _joi["default"].string(),
  duration: durationSchema,
  repeat: _joi["default"].number(),
  attach: _joi["default"].string(),
  attachType: _joi["default"].string(),
  summary: _joi["default"].string(),
  attendee: contactSchema,
  'x-prop': _joi["default"].any(),
  'iana-prop': _joi["default"].any()
});

var schema = _joi["default"].object().keys({
  summary: _joi["default"].string(),
  timestamp: _joi["default"].any(),
  title: _joi["default"].string(),
  productId: _joi["default"].string(),
  method: _joi["default"].string(),
  uid: _joi["default"].string().required(),
  sequence: _joi["default"].number(),
  start: dateTimeSchema.required(),
  duration: durationSchema,
  startType: _joi["default"].string().regex(/utc|local/),
  startInputType: _joi["default"].string().regex(/utc|local/),
  startOutputType: _joi["default"].string().regex(/utc|local/),
  end: dateTimeSchema,
  endInputType: _joi["default"].string().regex(/utc|local/),
  endOutputType: _joi["default"].string().regex(/utc|local/),
  description: _joi["default"].string(),
  url: _joi["default"].string().uri(),
  geo: _joi["default"].object().keys({
    lat: _joi["default"].number(),
    lon: _joi["default"].number()
  }),
  location: _joi["default"].string(),
  status: _joi["default"].string().regex(/TENTATIVE|CANCELLED|CONFIRMED/),
  categories: _joi["default"].array().items(_joi["default"].string()),
  organizer: organizerSchema,
  attendees: _joi["default"].array().items(contactSchema),
  alarms: _joi["default"].array().items(alarmSchema),
  recurrenceRule: _joi["default"].string(),
  exRule: _joi["default"].string(),
  exDateRule: _joi["default"].string(),
  busyStatus: _joi["default"].string().regex(/TENTATIVE|FREE|BUSY|OOF/),
  created: dateTimeSchema,
  lastModified: dateTimeSchema,
  calName: _joi["default"].string()
}).xor('end', 'duration');

function validateEvent(candidate) {
  var _schema$validate = schema.validate(candidate),
      _schema$validate$erro = _schema$validate.error,
      error = _schema$validate$erro === void 0 ? null : _schema$validate$erro,
      value = _schema$validate.value;

  return {
    error: error,
    value: value
  };
}