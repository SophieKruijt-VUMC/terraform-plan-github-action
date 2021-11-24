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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScanReport = exports.createScanResult = void 0;
const fs = __importStar(require("fs"));
const gitHubHelper = __importStar(require("./gitHubHelper"));
const inputHelper = __importStar(require("./inputHelper"));
const githubClient_1 = require("./githubClient");
function createScanResult(trivyStatus, dockleStatus) {
    return __awaiter(this, void 0, void 0, function* () {
        const gitHubClient = new githubClient_1.GitHubClient(process.env.GITHUB_REPOSITORY, inputHelper.token);
        const checkRunPayload = getCheckRunPayload("abc", "def");
        console.log(checkRunPayload);
        yield gitHubClient.createCheckRun(checkRunPayload);
    });
}
exports.createScanResult = createScanResult;
function getScanReport(text1, text2) {
    const scanReportPath = `scanreport.json`;
    const scanReportObject = {
        "imageName": text1,
        "vulnerabilities": text1,
        "bestPracticeViolations": text2,
        "vulnerabilityScanTimestamp": text2
    };
    fs.writeFileSync(scanReportPath, JSON.stringify(scanReportObject, null, 2));
    return scanReportPath;
}
exports.getScanReport = getScanReport;
function getCheckRunPayload(trivyStatus, dockleStatus) {
    const headSha = gitHubHelper.getHeadSha();
    const checkConclusion = "action_required";
    let checkSummary = "summary";
    // let appHyperlink = `<a href=${APP_LINK}>${APP_NAME}</a>`;
    checkSummary = `Here comes the Terraform plan!`;
    const checkText = getCheckText("abc", "abc");
    const payload = {
        head_sha: headSha,
        name: `[Terraform Plan] environment`,
        status: "completed",
        conclusion: checkConclusion,
        output: {
            title: "Container scan result",
            summary: checkSummary,
            text: checkText
        }
    };
    return payload;
}
function getCheckText(trivyStatus, dockleStatus) {
    const separator = '___';
    const trivyText = "trivytext";
    let text = trivyText;
    return text;
}
