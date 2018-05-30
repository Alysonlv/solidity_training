'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _web = require('./web3');

var _web2 = _interopRequireDefault(_web);

var _CampaignFactoryContract = require('./build/CampaignFactoryContract.json');

var _CampaignFactoryContract2 = _interopRequireDefault(_CampaignFactoryContract);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
This file will provide the contract of Factory to the project
*/
var instance = new _web2.default.eth.Contract(JSON.parse(_CampaignFactoryContract2.default.interface), '0xb09bB3e8e10C31E4B608c7DaDf9b4E28489Cc359');

exports.default = instance;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtL2ZhY3RvcnkuanMiXSwibmFtZXMiOlsid2ViMyIsIkNhbXBhaWduRmFjdG9yeUNvbnRyYWN0IiwiaW5zdGFuY2UiLCJldGgiLCJDb250cmFjdCIsIkpTT04iLCJwYXJzZSIsImludGVyZmFjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBR0EsQUFBTyxBQUFVOzs7O0FBQ2pCLEFBQU8sQUFBNkI7Ozs7OztBQUpwQzs7O0FBTUEsSUFBTSxXQUFXLElBQUksY0FBQSxBQUFLLElBQVQsQUFBYSxTQUMxQixLQUFBLEFBQUssTUFBTSxrQ0FERSxBQUNiLEFBQW1DLFlBRHZDLEFBQWlCLEFBRWIsQUFHSjs7a0JBQUEsQUFBZSIsImZpbGUiOiJmYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Ii93b3Jrc3BhY2VzL2Jsb2NrY2hhaW4vc29saWRpdHkvc29saWRpdHlfdHJhaW5pbmcva2lja3N0YXJ0LWJsb2NrY2hhaW4ifQ==