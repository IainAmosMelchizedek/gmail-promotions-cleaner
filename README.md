
# Gmail Promotions Cleaner

Automates the removal of all emails in the Gmail Promotions tab using Google Apps Script.

## Features
- Batch processing (safe for large inboxes)
- Auto-restart to avoid execution timeouts
- Fully automated cleanup
- Designed for inboxes with 10,000+ emails

## Use Case
This tool was built to clean up over 44,000 promotional emails accumulated over several years.

## How It Works
- Searches Gmail using: `category:promotions`
- Processes emails in batches of 100
- Moves them to Trash
- Automatically schedules continuation until complete

## Setup
1. Open Google Apps Script
2. Paste the script
3. Run the function `deleteEverythingInPromotions`
4. Approve permissions

## Disclaimer
This script permanently affects your inbox. Use with caution.
