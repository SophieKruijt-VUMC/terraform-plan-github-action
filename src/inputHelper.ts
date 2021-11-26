import * as core from '@actions/core';

export const token = core.getInput("token");
export const message = core.getInput("message");
export const environment = core.getInput("environment");

export function validateRequiredInputs() {
    if (!message)
        throw new Error("Could not find required input: message");
    if (!token)
        throw new Error("Could not find required input: token");
    if (!environment)
        throw new Error("Could not find required input: environment");
}