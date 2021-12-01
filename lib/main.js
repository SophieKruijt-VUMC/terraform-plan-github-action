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
exports.run = void 0;
const core = __importStar(require("@actions/core"));
const inputHelper = __importStar(require("./inputHelper"));
const gitHubHelper = __importStar(require("./gitHubHelper"));
const githubClient_1 = require("./githubClient");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        inputHelper.validateRequiredInputs();
        try {
            const gitHubClient = new githubClient_1.GitHubClient(process.env.GITHUB_REPOSITORY, inputHelper.token);
            console.log(`hello world`);
            console.log(inputHelper.message);
            const message = inputHelper.message;
            console.log(message);
            const payload = {
                head_sha: gitHubHelper.getHeadSha(),
                name: `[Terraform Plan Result] ${inputHelper.environment}`,
                status: "completed",
                conclusion: "neutral",
                output: {
                    title: `Terraform Plan ${inputHelper.environment}`,
                    summary: `Terraform Plan for environment ${inputHelper.environment}`,
                    text: message
                }
            };
            yield gitHubClient.createCheckRun(payload);
        }
        catch (error) {
            core.warning(`An error occurred while creating the check run for container scan. Error: ${error}`);
        }
    });
}
exports.run = run;
run().catch(error => core.setFailed(error.message));
