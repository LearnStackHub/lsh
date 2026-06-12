import { useEffect, useState } from 'react';
import { User as UserIcon } from 'lucide-react';

function UserAvatar({ photoURL, name, className = 'auth-user-avatar', iconSize = 14 }) {
  const [failed, setFailed] = useState(false);
  const initial = (name || 'U').trim().charAt(0).toUpperCase();

  useEffect(() => {
    setFailed(false);
  }, [photoURL]);

  if (!photoURL || failed) {
    return (
      <span className={`${className} auth-user-avatar-fallback`} aria-hidden="true">
        {initial !== 'U' ? initial : <UserIcon size={iconSize} aria-hidden />}
      </span>
    );
  }

  return (
    <img
      src={photoURL}
      alt=""
      className={className}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
}

export default UserAvatar;
