# Exam Tracking Troubleshooting Guide

## Issue: Exam Events Not Showing in Google Analytics

If you don't see `exam_page_view`, `exam_start`, or `exam_completed` events in Google Analytics, follow these steps:

### 1. Check Browser Console

Open your browser's Developer Tools (F12) and check the Console tab. You should see:
- ✅ `Google Analytics: Event tracked exam_page_view` (when page loads)
- ✅ `Google Analytics: Event tracked exam_start` (when exam starts)
- ✅ `Google Analytics: Event tracked exam_completed` (when exam ends)

If you see warnings or errors, note them down.

### 2. Verify Google Analytics is Loaded

In the browser console, type:
```javascript
window.gtag
```

If it returns `undefined`, Google Analytics hasn't loaded yet. This is normal because:
- Analytics loads **only after user interaction** (scroll, click, etc.)
- There's a 2-second delay after interaction

### 3. Test the Events Manually

1. **Visit the exam page**: `/core-java-mcq`
   - Should trigger `exam_page_view` event
   - Check console for: `✅ Google Analytics: Event tracked exam_page_view`

2. **Click "Start Exam"**
   - Should trigger `exam_start` event
   - Check console for: `✅ Google Analytics: Event tracked exam_start`

3. **Complete or submit the exam**
   - Should trigger `exam_completed` event
   - Check console for: `✅ Google Analytics: Event tracked exam_completed`

### 4. Check Google Analytics Real-Time

1. Go to [Google Analytics](https://analytics.google.com/)
2. Navigate to **Reports** → **Realtime**
3. Look for events:
   - `exam_page_view`
   - `exam_start`
   - `exam_completed`

**Note:** Real-time data appears immediately, but standard reports may take 24-48 hours.

### 5. Verify Event Names in Analytics

1. Go to **Reports** → **Engagement** → **Events**
2. Use the **Search** box to filter for:
   - `exam_page_view`
   - `exam_start`
   - `exam_completed`

If events don't appear:
- Wait 24-48 hours for data to process
- Check if events are being blocked by ad blockers
- Verify the Google Analytics Measurement ID is correct: `G-JDCPS7ENJ6`

### 6. Common Issues and Solutions

#### Issue: Events fire but don't appear in Analytics
**Solution:** 
- Events may be queued and will appear after 24-48 hours
- Check Real-time reports for immediate verification

#### Issue: `gtag is not defined` errors
**Solution:**
- This is normal - analytics loads after user interaction
- The tracking code now retries after 500ms
- Events will be sent once gtag is available

#### Issue: Ad blockers blocking analytics
**Solution:**
- Disable ad blockers for your site
- Or use Google Analytics DebugView for testing

### 7. Enable Debug Mode

Debug mode is currently **enabled** in `src/config/analytics.js`:
```javascript
debug: true
```

This will show console logs for all tracking events. Once you verify events are working, you can set it back to `false`.

### 8. Verify Event Parameters

Each event includes these parameters:

**exam_page_view:**
- `exam_type`: "core_java_mcq"
- `exam_name`: "Core Java MCQ Exam"
- `page_path`: "/core-java-mcq"

**exam_start:**
- `exam_type`: "core_java_mcq"
- `exam_name`: "Core Java MCQ Exam"
- `total_questions`: 20
- `time_limit`: 600
- `page_path`: "/core-java-mcq"

**exam_completed:**
- `exam_type`: "core_java_mcq"
- `exam_name`: "Core Java MCQ Exam"
- `completion_type`: "manual_submit" or "auto_submit"
- `score`: 0-100
- `correct_answers`: number
- `total_questions`: 20
- `time_taken`: seconds
- `security_warnings`: number
- `tab_switches`: number
- `page_path`: "/core-java-mcq"

### 9. Test Checklist

- [ ] Visit `/core-java-mcq` page
- [ ] Check console for `exam_page_view` log
- [ ] Click "Start Exam"
- [ ] Check console for `exam_start` log
- [ ] Complete the exam
- [ ] Check console for `exam_completed` log
- [ ] Check Google Analytics Real-time for events
- [ ] Wait 24-48 hours and check standard reports

### 10. Still Not Working?

If events still don't appear after 48 hours:

1. **Check Network Tab:**
   - Open Developer Tools → Network tab
   - Filter by "collect" or "analytics"
   - Look for requests to `google-analytics.com`
   - Verify requests are being sent

2. **Check Google Analytics Setup:**
   - Verify Measurement ID: `G-JDCPS7ENJ6`
   - Check if property is active
   - Verify no filters are blocking events

3. **Contact Support:**
   - Share console logs
   - Share Network tab screenshots
   - Share Google Analytics property details

---

**Last Updated:** March 2026
**Debug Mode:** Currently ENABLED (set to `false` in production)

