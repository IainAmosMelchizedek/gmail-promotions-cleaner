/**
 * Gmail Promotions Cleaner
 * ------------------------
 * Automatically moves all emails in the Promotions category to Trash.
 * Handles large inboxes by processing in batches and auto-rescheduling
 * itself to avoid Apps Script execution time limits.
 *
 * Designed for reliability, clarity, and safe bulk operations.
 */

const CONFIG = {
  QUERY: 'category:promotions',
  BATCH_SIZE: 100,
  PAUSE_MS: 1000,
  MAX_RUNTIME_MS: 4 * 60 * 1000, // ~4 minutes
  RESTART_DELAY_MS: 30 * 1000    // 30 seconds
};

/**
 * Entry point: processes promotion emails in batches.
 * Automatically schedules continuation if runtime limit is reached.
 */
function deleteEverythingInPromotions() {
  const startTime = Date.now();
  let totalProcessed = 0;

  while (true) {
    if (isTimeExceeded(startTime)) {
      log('Time limit approaching. Scheduling continuation...');
      scheduleNextRun();
      log(`Processed this run: ${totalProcessed}`);
      return;
    }

    const threads = fetchPromotionThreads(CONFIG.BATCH_SIZE);
    if (threads.length === 0) {
      log('All promotion emails have been cleared.');
      cleanupTriggers();
      return;
    }

    moveToTrash(threads);
    totalProcessed += threads.length;
    log(`Batch processed: ${threads.length} | Total this run: ${totalProcessed}`);
    sleep(CONFIG.PAUSE_MS);
  }
}

/**
 * Fetches a batch of promotion threads.
 */
function fetchPromotionThreads(batchSize) {
  return GmailApp.search(CONFIG.QUERY, 0, batchSize);
}

/**
 * Moves threads to Trash.
 */
function moveToTrash(threads) {
  GmailApp.moveThreadsToTrash(threads);
}

/**
 * Checks if execution time is close to limit.
 */
function isTimeExceeded(startTime) {
  return Date.now() - startTime > CONFIG.MAX_RUNTIME_MS;
}

/**
 * Schedules the next execution if not already scheduled.
 */
function scheduleNextRun() {
  const exists = ScriptApp.getProjectTriggers()
    .some(t => t.getHandlerFunction() === 'deleteEverythingInPromotions');

  if (!exists) {
    ScriptApp.newTrigger('deleteEverythingInPromotions')
      .timeBased()
      .after(CONFIG.RESTART_DELAY_MS)
      .create();
    log('Next run scheduled.');
  }
}

/**
 * Removes all triggers for this script once complete.
 */
function cleanupTriggers() {
  ScriptApp.getProjectTriggers()
    .forEach(trigger => {
      if (trigger.getHandlerFunction() === 'deleteEverythingInPromotions') {
        ScriptApp.deleteTrigger(trigger);
      }
    });
  log('All triggers removed.');
}

/**
 * Utility: sleep wrapper.
 */
function sleep(ms) {
  Utilities.sleep(ms);
}

/**
 * Utility: consistent logging.
 */
function log(message) {
  Logger.log(message);
}
