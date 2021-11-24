"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequiredInputs = exports.environment = exports.message = exports.token = void 0;
const core = __importStar(require("@actions/core"));
exports.token = core.getInput("token");
exports.message = core.getInput("message");
exports.environment = core.getInput("environment");
function validateRequiredInputs() {
    if (!exports.message)
        throw new Error("Could not find required input: message");
    if (!exports.token)
        throw new Error("Could not find required input: token");
    if (!exports.environment)
        throw new Error("Could not find required input: environment");
}
exports.validateRequiredInputs = validateRequiredInputs;
