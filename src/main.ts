import * as core from '@actions/core';
import * as inputHelper from './inputHelper';
import * as gitHubHelper from './gitHubHelper';
import { GitHubClient } from './githubClient';

export async function run(): Promise<void> {
    inputHelper.validateRequiredInputs();

    try {
        const gitHubClient = new GitHubClient(process.env.GITHUB_REPOSITORY, inputHelper.token);

        console.log(`hello world`);
        console.log(inputHelper.message)
        const message = inputHelper.message
        console.log(message)

        const payload = {
            head_sha: gitHubHelper.getHeadSha(),
            name: `[Terraform Plan Result] ${inputHelper.environment}`,
            status: "completed",
            conclusion: "success",
            output: {
              title: `Terraform Plan ${inputHelper.environment}`,
              summary: `Terraform Plan for environment ${inputHelper.environment}`,
              text: message
            }
          }

        await gitHubClient.createCheckRun(payload);
    } catch (error) {
        core.warning(`An error occurred while creating the check run for container scan. Error: ${error}`);
    }
}

run().catch(error => core.setFailed(error.message));