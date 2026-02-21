import { useState } from 'react';
import { X, Mail, User, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function LoginModal() {
  const { isLoginModalOpen, closeLoginModal, login } = useAuth();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    login(email, name);
  };

  return (
    <div className="modal-overlay" onClick={closeLoginModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={closeLoginModal}>
          <X size={20} />
        </button>

        <div className="modal-header">
          <div className="modal-icon">
            <LogIn size={24} />
          </div>
          <h2>Sign In to Contribute</h2>
          <p>Enter your details to add or edit tutorials</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="form-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="name">
              <User size={16} />
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <Mail size={16} />
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
            />
          </div>

          <button type="submit" className="btn btn-primary login-btn">
            <LogIn size={18} />
            Sign In & Continue
          </button>

          <p className="login-note">
            Your email will be displayed as the contributor when you add or edit content.
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;





