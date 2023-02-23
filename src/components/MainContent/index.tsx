'use client';

import { useEffect, useState } from 'react';
import { SortAscendingOutlined, SortDescendingOutlined, GlobalOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { ViewStateType, User, UserChangeActions } from '@/types';
import styles from './main-content.module.css';
import { fetchUsers, saveUsersToStorage } from '@/helpers/user-api';
import ListView from '@/views/ListView';
import GridView from '@/views/GridView';
import ViewModeSwitcher from '@/components/ViewModeSwitcher';
import useViewMode from '@/hooks/view-mode';

export default function MainContent() {
  const [users, setUsers] = useState<User[]>([]);
  const [sortAsc, setSortAsc] = useState(true);
  const currentView: ViewStateType = useViewMode();

  useEffect(() => {
    async function getUsers() {
      const users: User[] = await fetchUsers();
      setUsers(users);
    }
    getUsers();
  }, []);

  const sortedUsers = sortAsc
    ? users.sort((a, b) => a.name.localeCompare(b.name))
    : users.sort((a, b) => b.name.localeCompare(a.name));

  const handleUserChange = (user: User, action: UserChangeActions) => {
    if (action === 'DELETE') onUserDelete(user);
    if (action === 'EDIT') onUserEdit(user);
  };

  const onUserEdit = (user: User) => {
    setUsers((users: User[]) => {
      const unmodifiedUsers = users.filter((u) => u.id !== user.id);
      return [...unmodifiedUsers, user];
    });
  };

  const onUserDelete = (user: User) => {
    setUsers((users: User[]) => {
      const newList = users.filter((u) => u.id !== user.id);
      return newList;
    });
  };

  const refetchUsers = async () => {
    const users: User[] = await fetchUsers(true);
    setUsers(users);
  };

  saveUsersToStorage(sortedUsers);

  return (
    <div className={styles.container}>
      <ViewModeSwitcher />

      <div className={styles.topButtonsContainer}>
        <Button icon={<GlobalOutlined />} onClick={refetchUsers}>
          Refetch
        </Button>

        <Button
          icon={sortAsc ? <SortAscendingOutlined /> : <SortDescendingOutlined />}
          onClick={() => setSortAsc((prev) => !prev)}
        >
          Sort
        </Button>
      </div>

      <div className={styles.viewContainer}>
        {currentView === 'GRID' ? (
          <GridView users={sortedUsers} handleUserChange={handleUserChange} />
        ) : (
          <ListView users={sortedUsers} handleUserChange={handleUserChange} />
        )}
      </div>
    </div>
  );
}
