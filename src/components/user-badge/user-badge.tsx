import React from 'react';
import './user-badge.css';

interface UserBadgeProps {
  username: string;
}

const UserBadge: React.FC<UserBadgeProps> = ({ username }) => {
  // Generate a random color based on the username
  const getColorFromUsername = (name: string) => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
      '#D4A5A5', '#9B59B6', '#3498DB', '#E74C3C', '#2ECC71'
    ];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  // Get initials from username
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div 
    className="user-avatar" 
    style={{ backgroundColor: getColorFromUsername(username) }}
  >
    {getInitials(username)}
  </div>
  );
};

export default UserBadge; 