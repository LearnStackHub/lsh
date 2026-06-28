function AuthGateLoading({ message = 'Signing you in…' }) {
  return (
    <div className="auth-gate-page auth-gate-page--loading">
      <div className="auth-gate-spinner" aria-hidden />
      <p>{message}</p>
    </div>
  );
}

export default AuthGateLoading;
