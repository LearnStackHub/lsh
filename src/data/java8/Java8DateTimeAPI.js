const java8DateTimeAPI = {
  id: 'java8-date-time-api',
  title: 'Java 8 Date and Time API Tutorial',
  description: 'Learn Java 8 Date and Time API with LocalDate, LocalTime, LocalDateTime, ZonedDateTime, Period, Duration, DateTimeFormatter, and API examples.',
  content: `
# Java 8 Date and Time API with Realtime Formatting Examples

Java 8 introduced a new Date and Time API in the \`java.time\` package. It replaced many confusing parts of the old \`Date\` and \`Calendar\` APIs.

---

## Fresher Job Task: Format Joining Date for an API

In real applications, dates appear everywhere:

- Employee joining date
- Order placed date
- Invoice due date
- Subscription expiry date
- Interview scheduled time

Suppose the database gives an employee joining date and the API must return it in a readable format.

\`\`\`java
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;

public class EmployeeJoiningDateExample {
    public static void main(String[] args) {
        LocalDate joiningDate = LocalDate.of(2024, 3, 15);
        LocalDate today = LocalDate.now();

        Period experience = Period.between(joiningDate, today);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MMM-yyyy");

        System.out.println("Joining Date: " + joiningDate.format(formatter));
        System.out.println("Experience Years: " + experience.getYears());
    }
}
\`\`\`

### Date Flow Diagram

\`\`\`
Database date: 2024-03-15
        |
        v
LocalDate object
        |
        +-- Period.between() -> experience
        |
        +-- DateTimeFormatter -> 15-Mar-2024
        |
        v
API response / UI display
\`\`\`

---

## Problems With Old Date and Calendar

- \`Date\` was mutable
- Month handling was confusing
- API names were not clear
- Time zone handling was difficult
- Formatting required separate, mutable formatter classes

Java 8 fixed these problems with immutable and clear classes.

---

## LocalDate

Used for date without time.

\`\`\`java
LocalDate today = LocalDate.now();
System.out.println(today);
\`\`\`

## LocalTime

Used for time without date.

\`\`\`java
LocalTime time = LocalTime.now();
System.out.println(time);
\`\`\`

## LocalDateTime

Used for date and time without timezone.

\`\`\`java
LocalDateTime now = LocalDateTime.now();
System.out.println(now);
\`\`\`

## ZonedDateTime

Used when timezone is important.

\`\`\`java
ZonedDateTime indiaTime = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));
System.out.println(indiaTime);
\`\`\`

## Period

Used for date-based amount of time.

\`\`\`java
Period period = Period.between(
        LocalDate.of(2024, 1, 1),
        LocalDate.of(2026, 1, 1)
);
System.out.println(period.getYears());
\`\`\`

## Duration

Used for time-based amount of time.

\`\`\`java
Duration duration = Duration.between(
        LocalTime.of(10, 0),
        LocalTime.of(12, 30)
);
System.out.println(duration.toMinutes());
\`\`\`

## Formatting Dates Using DateTimeFormatter

\`\`\`java
LocalDate date = LocalDate.now();
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
System.out.println(date.format(formatter));
\`\`\`

## Realtime Date Use Cases

| Use case | Recommended class |
|----------|-------------------|
| Employee joining date | LocalDate |
| Meeting time without date | LocalTime |
| Order created timestamp without timezone | LocalDateTime |
| International meeting or deployment time | ZonedDateTime |
| Employee experience | Period |
| Task execution time | Duration |
| API date format | DateTimeFormatter |

## Common Fresher Mistakes

| Mistake | Problem | Fix |
|---------|---------|-----|
| Using old \`Date\` for new code | Mutable and confusing | Use \`java.time\` |
| Using LocalDateTime for timezone-sensitive data | Timezone is missing | Use ZonedDateTime |
| Comparing formatted strings | Wrong date ordering possible | Compare date objects |
| Hardcoding date formats everywhere | Inconsistent output | Reuse DateTimeFormatter constants |

## Interview Traps

### Is LocalDateTime timezone-aware?

No. LocalDateTime has date and time but no timezone. Use ZonedDateTime when timezone matters.

### Difference between Period and Duration?

Period is date-based, such as years, months, and days. Duration is time-based, such as hours, minutes, and seconds.

### Are Java 8 date/time classes immutable?

Yes. Most classes in \`java.time\` are immutable and thread-safe.

## Key Takeaways

- Use \`java.time\` classes for modern Java date/time work.
- LocalDate stores date only.
- LocalTime stores time only.
- LocalDateTime stores date and time without timezone.
- ZonedDateTime stores date, time, and timezone.
- DateTimeFormatter is used for formatting and parsing.
`,
  code: `import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class DateTimeExample {
    public static void main(String[] args) {
        LocalDate today = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");

        System.out.println(today.format(formatter));
    }
}`
};

export default java8DateTimeAPI;
