import Image from 'next/image';
import { Tooltip } from 'antd';

import { User, UserChangeActions } from '@/types';
import styles from './grid-view.module.css';
import ActionButtons from '@/components/ActionButtons';

type GridProps = {
  users: User[];
  handleUserChange: (user: User, action: UserChangeActions) => void;
};

export default function GridView({ users, handleUserChange }: GridProps) {
  return (
    <div className={styles.container}>
      {users.map((user) => (
        <UserItem key={user.id} user={user} handleUserChange={handleUserChange} />
      ))}
    </div>
  );
}

type UserProps = {
  user: User;
  handleUserChange: (user: User, action: UserChangeActions) => void;
};

function UserItem({ user, handleUserChange }: UserProps) {
  return (
    <div className={styles.card}>
      <Tooltip title={user.name}>
        <Image width={50} height={50} src={user.avatarUrl} alt="avatar image"></Image>
      </Tooltip>

      <div className={styles.actions}>
        <ActionButtons user={user} handleUserChange={handleUserChange} />
      </div>
    </div>
  );
}
