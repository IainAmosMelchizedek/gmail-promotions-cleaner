# Gmail Promotions Cleaner

A simple Google Apps Script that automatically clears out the **Promotions** tab in Gmail by moving promotional emails to **Trash** in small batches until the job is done.

This tool was created to solve a very real problem: a Gmail inbox that had accumulated **tens of thousands of promotional emails** over several years, making manual cleanup slow, frustrating, and impractical.

---

# What problem does this solve?

If you use Gmail, you may have noticed that the **Promotions** tab can quietly fill up with a huge number of emails over time.

These emails usually come from:

- store newsletters
- coupon and discount emails
- marketing campaigns
- sale notifications
- mailing lists
- auto-generated promotional content

The problem is that Gmail does not make it easy to delete **all** promotional emails at once in a truly efficient way, especially when you have:

- 5,000 emails
- 10,000 emails
- 20,000 emails
- 40,000+ emails

At that point, deleting them manually page by page becomes a waste of time.

This script solves that problem by automating the cleanup.

---

# What does this script do?

This script:

1. searches your Gmail account for emails in the **Promotions** category
2. selects a small batch of those emails at a time
3. moves that batch to **Trash**
4. repeats the process automatically
5. stops when there are no more promotional emails left to process

It is designed to work around Google Apps Script execution limits by:

- using **small batch sizes**
- pausing briefly between batches
- scheduling itself to continue running if needed

That makes it much more useful for large inboxes than trying to delete everything manually.

---

# What does this NOT do?

This script does **not**:

- permanently erase emails instantly from Google’s servers
- delete emails from categories other than Promotions
- unsubscribe you from mailing lists
- reduce Google Drive or Google Photos storage
- guarantee a noticeable change in your Google storage usage

Important: this script moves promotional emails to **Trash**. After that, Gmail usually deletes Trash automatically after a period of time, or you can empty Trash manually.

---

# Who is this for?

This project is for people who:

- use Gmail
- have a large number of promotional emails
- want a faster way to clean up their inbox
- do not want to manually select and delete page after page of promotional mail

This is especially helpful if you have years of accumulated marketing emails and want a one-time cleanup tool.

---

# Requirements

Before you use this script, make sure you have all of the following:

- a **Google account**
- a **Gmail account**
- access to **Google Apps Script**
- permission to sign in to your own Google account
- a willingness to allow the script to access your Gmail in order to move emails to Trash

If you do not have a Gmail account, this tool will not be useful to you.

---

# Important warning

This script affects your email account.

It is designed to move emails in the **Promotions** category to **Trash**.

Use it carefully.

If there are promotional emails you want to keep, review your Promotions tab before running the script.

You are responsible for what you delete.

---

# How the script works in plain language

Google Apps Script cannot always run forever in one single session. It has time limits.

Because of that, this script does not try to process every promotional email in one giant operation.

Instead, it uses a safer method:

- it grabs **100 promotional email threads**
- moves them to Trash
- waits a moment
- repeats
- if it gets too close to the runtime limit, it schedules itself to continue again shortly after

This allows the script to keep working through a very large Promotions inbox over time.

---

# Why the batch size is 100

This project uses a batch size of **100** because that was the most reliable working value during testing.

Larger batch sizes may sound faster, but in practice they can cause:

- permission issues
- timeouts
- execution errors
- inconsistent behavior

A smaller, reliable batch size is slower per cycle, but more dependable overall.

When dealing with thousands of emails, reliability matters more than trying to force a giant batch through all at once.

---

# Files in this repository

## `gmail_promotions_cleaner.js`
This is the actual script file.

It contains the code that:

- searches for promotional emails
- moves them to Trash
- handles continuation and timing
- cleans up its own triggers when the work is done

## `README.md`
This file.

It explains what the project is, why it exists, and how to use it.

---

# Full setup guide for complete beginners

This section assumes you have **never used Google Apps Script before**.

## Step 1: Make sure you have a Gmail account

You need a Gmail account because this script works on Gmail.

If you do not already have a Google account with Gmail, create one first.

---

## Step 2: Open Google Apps Script

Go to this website in your browser:

`https://script.google.com`

This is Google’s browser-based code editor for small automation scripts.

You do not need to install anything on your computer.

---

## Step 3: Sign in to your Google account

If you are not already signed in, Google will ask you to log in.

Sign in with the **same Gmail account** that contains the promotional emails you want to clean up.

This is important.

If you sign in to the wrong Google account, the script will run against the wrong Gmail inbox.

---

## Step 4: Create a new Apps Script project

Once you are inside Google Apps Script:

- click **New project**

Google will open a new script editor page.

---

## Step 5: Name your project

At the top of the page, click the project title area and give your project a name.

Example project name:

`Keepit_Going`

Important: the **project name** can be anything you want.

The project name is **not** the same thing as the function name.

---

## Step 6: Open the script file from this repository

In this GitHub repository, open the file:

`gmail_promotions_cleaner.js`

Copy all of the code from that file.

---

## Step 7: Paste the code into Google Apps Script

Back in the Google Apps Script editor:

- delete any starter code that is already there
- paste in the full contents of `gmail_promotions_cleaner.js`

Now your Apps Script project contains the Gmail Promotions Cleaner code.

---

## Step 8: Save the project

Click the save icon, or press:

- **Ctrl + S** on Windows
- **Command + S** on Mac

---

## Step 9: Run the correct function

At the top of the Apps Script editor, there is a function dropdown near the **Run** button.

Select the function:

`deleteEverythingInPromotions`

Then click **Run**.

Important: this is the function name you want to run.

Even if your project is named something else, like `Keepit_Going`, the function you run is still:

`deleteEverythingInPromotions`

The project name and the function name are two different things.

---

## Step 10: Approve permissions

The first time you run the script, Google will ask you to authorize it.

This is normal.

The script needs permission because it is interacting with your Gmail account.

You may see warnings such as:

- “Google hasn’t verified this app”
- “This app is requesting access to sensitive information”

This happens because the script is requesting Gmail permissions and is not a publicly verified commercial app.

If this is **your own script in your own Google account**, this warning is expected.

To continue, you may need to click:

- **Advanced**
- then **Go to [your project name] (unsafe)**

Then continue through the permission screens.

You are authorizing your own script to access your own Gmail account.

---

## Step 11: Let the script work

Once authorized, the script will begin processing your promotional emails.

It will:

- find promotional emails
- move them to Trash in batches
- pause between batches
- continue until it reaches the script runtime limit
- schedule itself to continue if more work remains

This means you may not need to sit there and keep clicking Run repeatedly.

---

## Step 12: Check the execution log

Inside Apps Script, you can view logs to see progress.

Look for the **Execution log** area.

You may see messages such as:

- how many emails were processed in the current run
- whether another run was scheduled
- whether the Promotions category is empty

---

## Step 13: Check your Gmail Promotions tab

Open Gmail and check the Promotions tab.

You should see the number of emails going down over time as the script continues to work.

---

## Step 14: Empty Trash if you want permanent removal sooner

After the script moves emails to Trash, they are no longer in Promotions.

If you want them removed from Trash sooner, you can:

- open Gmail
- go to **Trash**
- click **Empty Trash now**

Be careful: emptying Trash is more final.

---

# Script behavior and design choices

This section explains why the script is written the way it is.

## Why not delete everything in one shot?

Because Google Apps Script has limits.

Very large email operations can run into:

- execution time limits
- Gmail service restrictions
- trigger and permission friction
- unstable behavior with large destructive operations

So the script is intentionally designed to be:

- slower than a reckless bulk delete
- but more reliable
- easier to recover from
- easier to understand

## Why modular code matters here

The script is written in a modular style so that it is easier to:

- read
- maintain
- update later
- test mentally
- adapt for other Gmail categories in the future

For example, you could later change the query from:

`category:promotions`

to something else if you wanted to clean another category or search result.

---

# Example use case

This script was originally built for a real-world cleanup of more than **44,000 promotional emails** accumulated over several years.

Manual cleanup would have taken an unreasonable amount of time.

Using a scripted batch approach made the task manageable.

---

# What this project demonstrates

This is more than just a delete script.

It demonstrates:

- practical automation
- bulk data cleanup
- working within platform constraints
- runtime-aware scripting
- defensive design for repetitive operations
- real-world problem solving with Google Apps Script

---

# Possible future improvements

This project could later be expanded into:

- a Chrome extension
- a one-click Gmail cleanup tool
- a small web app
- a broader Gmail organization toolkit
- a digital product with setup guides and support

Possible feature upgrades:

- preview mode before deleting
- custom category selection
- date filtering
- sender filtering
- unsubscribe helper tools
- automatic Trash cleanup
- a user interface for non-technical users

---

# Frequently asked questions

## Does this script permanently delete emails immediately?
No.

It moves promotional emails to **Trash**.

## Does this script unsubscribe me from mailing lists?
No.

It only moves emails to Trash.

## Does this script clean up Primary, Social, or Updates?
No.

It is specifically designed for the **Promotions** category.

## Do I need to know how to code to use it?
No, not necessarily.

This README is written so that a beginner can follow it step by step.

## Why does Google show a warning?
Because the script requests Gmail access and is not a publicly verified Google app.

## Can I use a different project name in Google Apps Script?
Yes.

The project name can be anything.

What matters when running the code is the **function name**.

## What function do I run?
Run:

`deleteEverythingInPromotions`

## Can I change the batch size?
Yes, but this project uses **100** because that proved to be the most reliable value during testing.

---

# Installation summary

For quick reference:

1. go to `https://script.google.com`
2. sign in to your Gmail account
3. create a new project
4. paste in the code from `gmail_promotions_cleaner.js`
5. save the project
6. choose the function `deleteEverythingInPromotions`
7. click **Run**
8. approve permissions
9. let the script process your Promotions emails

---

# Disclaimer

Use this tool at your own risk.

Always review the contents of your Promotions tab before running bulk cleanup tools.

The author of this repository is not responsible for deleted emails, lost messages, or misuse of the script.

---

# License
MIT
