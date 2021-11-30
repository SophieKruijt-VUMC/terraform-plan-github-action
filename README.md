# Display Terraform plan action

This action creates check-runs with a Terraform plan

## Inputs

## `message`

**Required** The Terraform plan to output.

## `environment`

**Required** The environment of the Terraform plan.

## `token`

GitHub token

## Example usage

```yaml
name: Display Terraform plan in GitHub
  uses: ./.github/actions/terraform-plan-display
  with:
    environment: 'dev'
    message: 'this is a test'
    token: ${{ secrets.GITHUB_TOKEN }}
```

## Development

To build: `npm run build`

## Improvements to make

- Use webpack or something similiar to bundle all files and node_modules. Checkin in node_modules === bad
- tslint