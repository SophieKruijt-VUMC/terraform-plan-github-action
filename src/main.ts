import * as core from '@actions/core';
import * as inputHelper from './inputHelper';
import * as gitHubHelper from './gitHubHelper';
import { GitHubClient } from './githubClient';

export async function run(): Promise<void> {
    inputHelper.validateRequiredInputs();

    try {
        const gitHubClient = new GitHubClient(process.env.GITHUB_REPOSITORY, inputHelper.token);

        const payload = {
            head_sha: gitHubHelper.getHeadSha(),
            name: `[Terraform Plan Result] ${inputHelper.environment}`,
            status: "completed",
            conclusion: "neutral",
            output: {
              title: "Container scan result",
              summary: `Here comes the Terraform plan!`,
              text: "abcef"
            }
          }

        await gitHubClient.createCheckRun(payload);
    } catch (error) {
        core.warning(`An error occurred while creating the check run for container scan. Error: ${error}`);
    }
}

run().catch(error => core.setFailed(error.message));