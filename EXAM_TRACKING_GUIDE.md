# Core Java MCQ Exam - Student Tracking Guide

## Overview
The Core Java MCQ exam now tracks all student activity through Google Analytics. You can see:
- **Total number of students who started the exam**
- **Total number of students who completed the exam**
- **Completion rates and scores**
- **Time taken per exam**
- **Security violations (tab switches, etc.)**

## How to View Student Count

### Step 1: Access Google Analytics
1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property (G-JDCPS7ENJ6)
3. Navigate to **Reports** → **Engagement** → **Events**

### Step 2: View Exam Events
The exam tracks three main events:

#### 1. **exam_page_view**
- **When:** Every time someone visits the exam page
- **What it tracks:** Page views (not unique students)

#### 2. **exam_start**
- **When:** When a student clicks "Start Exam"
- **What it tracks:** 
  - Total number of students who started the exam
  - Exam type and configuration

#### 3. **exam_completed**
- **When:** When a student submits the exam (manually or auto-submit)
- **What it tracks:**
  - Total number of students who completed the exam
  - Score percentage
  - Correct answers
  - Time taken
  - Security warnings
  - Completion type (manual/auto-submit)

### Step 3: Filter by Event Name
1. In the Events report, look for:
   - `exam_start` - Count of students who started
   - `exam_completed` - Count of students who completed

2. Click on each event to see:
   - **Event count** (total occurrences)
   - **Total users** (unique students)
   - **Event parameters** (scores, time, etc.)

### Step 4: Create Custom Reports (Optional)
For better visualization:

1. Go to **Explore** → **Free Form**
2. Add dimensions:
   - Event name
   - Date
3. Add metrics:
   - Event count
   - Total users
4. Filter by:
   - `event_name` contains `exam_`

## Key Metrics to Monitor

### Student Participation
- **Total Exam Starts:** Count of `exam_start` events
- **Total Exam Completions:** Count of `exam_completed` events
- **Completion Rate:** (Completions / Starts) × 100

### Performance Metrics
- **Average Score:** Average of `score` parameter in `exam_completed`
- **Average Time:** Average of `time_taken` parameter
- **Pass Rate:** Count of exams with `score >= 70%`

### Security Metrics
- **Tab Switch Violations:** Count of exams with `tab_switches > 0`
- **Security Warnings:** Average of `security_warnings` parameter

## Real-Time Monitoring
1. Go to **Reports** → **Realtime**
2. Filter by event name: `exam_start` or `exam_completed`
3. See live activity as students take the exam

## Exporting Data
1. In any report, click the **Export** button
2. Choose format: CSV, PDF, or Google Sheets
3. Use for analysis or reporting

## Important Notes
- **Unique Students:** Google Analytics counts unique users, so if the same student takes the exam multiple times, they're counted once per event
- **Data Delay:** Real-time data is immediate, but standard reports may have a 24-48 hour delay
- **Privacy:** All tracking is anonymous and complies with privacy regulations

## Example Queries

### How many students started the exam today?
- Event: `exam_start`
- Date range: Today
- Metric: Total users

### How many students completed the exam this week?
- Event: `exam_completed`
- Date range: Last 7 days
- Metric: Total users

### What's the average score?
- Event: `exam_completed`
- Metric: Average of `score` parameter

---

**Need Help?** Check Google Analytics documentation or contact support.

