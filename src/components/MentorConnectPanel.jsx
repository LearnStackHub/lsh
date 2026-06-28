import { Calendar, Mail, MessageCircle, Phone, Video } from 'lucide-react';
import {
  MENTOR_CONNECT,
  buildMentorEmailUrl,
  buildWhatsAppMentorUrl,
} from '../config/mentorConnect';

function MentorConnectPanel({ user }) {
  const whatsappUrl = buildWhatsAppMentorUrl({ name: user.name, email: user.email });
  const emailUrl = buildMentorEmailUrl({ name: user.name, email: user.email });

  return (
    <section className="account-card account-card--mentor">
      <div className="account-mentor-head">
        <Video size={22} aria-hidden />
        <div>
          <h2>Live training &amp; mentor connect</h2>
          <p>
            Your 12-month plan includes {MENTOR_CONNECT.trainingDays} days of guided online training. Use the
            channels below to reach mentors, clear doubts, and get technology walkthroughs.
          </p>
        </div>
      </div>

      <ul className="account-mentor-steps">
        <li>Send your name and registered email so we can verify your plan.</li>
        <li>Share the topic or doubt (Java, Spring, JDBC, interview prep, etc.).</li>
        <li>Our team responds {MENTOR_CONNECT.responseTime} ({MENTOR_CONNECT.supportHours}).</li>
      </ul>

      <div className="account-mentor-actions">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="account-mentor-btn account-mentor-btn--whatsapp"
        >
          <MessageCircle size={18} aria-hidden />
          Chat on WhatsApp
        </a>
        <a href={emailUrl} className="account-mentor-btn account-mentor-btn--email">
          <Mail size={18} aria-hidden />
          Email mentor team
        </a>
        <a href={`tel:${MENTOR_CONNECT.phoneTel}`} className="account-mentor-btn account-mentor-btn--phone">
          <Phone size={18} aria-hidden />
          Call {MENTOR_CONNECT.phoneDisplay}
        </a>
        {MENTOR_CONNECT.scheduleUrl ? (
          <a
            href={MENTOR_CONNECT.scheduleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="account-mentor-btn account-mentor-btn--schedule"
          >
            <Calendar size={18} aria-hidden />
            Book a session
          </a>
        ) : null}
      </div>
    </section>
  );
}

export default MentorConnectPanel;
