# Fivaldi API JavaScript Examples

This repository contains JavaScript examples demonstrating how to interact with our API, including how to authenticate and how to send requests.

The API documentation can be found [here](https://support.fivaldi.fi/fi/support/solutions/articles/77000567542-visma-fivaldi-api).

## Requirements

- Node.js (LTS version recommended)
- Access to the terminal or command prompt

## Setup

Ensure Node.js is installed on your system. You can verify this by running `node --version` in your terminal.

## Running the Scripts

1. **Navigate to the Script Directory**: Open a terminal or command prompt and navigate to the directory containing the scripts. For example: If your scripts are in `Documents/scripts/api-examples-javascript`, use `cd Documents/scripts/api-examples-javascript`.

2. **Set Environment Variables**: Before running scripts, set environment variables for your `PARTNER_ID` and `PARTNER_SECRET`.
   - **Linux/macOS**: `export PARTNER_ID="your_partner_id"` and `export PARTNER_SECRET="your_partner_secret"`
   - **Windows**: In Command Prompt, `set PARTNER_ID="your_partner_id"` and `set PARTNER_SECRET="your_partner_secret"`. In PowerShell, use `$env:PARTNER_ID="your_partner_id"` and `$env:PARTNER_SECRET="your_partner_secret"`.

3. **Run the Script**: Execute the script by running `node get_example.js` or `node post_example.js`.

## Note

Replace `"your_partner_id"` and `"your_partner_secret"` with the actual credentials provided.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.