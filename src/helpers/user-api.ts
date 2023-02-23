'use client';

import { usersEndpoint, avatarEndpoint, userStorageKey } from '@/constants';
import { User } from '@/types';

export function fetchUsers(force = false): Promise<User[]> {
  if (!force) {
    // try to fetch from localstorage
    const usersRaw = localStorage.getItem(userStorageKey);
    const users: User[] = JSON.parse(usersRaw || '[]');
    if (users?.length) return Promise.resolve(users);
  }

  return fetch(usersEndpoint)
    .then((r) => r.json())
    .then((users: User[]) => {
      const usersWithAvatar = users.map((u) => {
        u.avatarUrl = avatarEndpoint.replace('{{username}}', u.username);
        return u;
      });
      return usersWithAvatar;
    });
}

export function fetchUser(id: string): Promise<User> {
  return fetch(`${usersEndpoint}/${id}`)
    .then((r) => r.json())
    .then((user: User) => {
      user.avatarUrl = avatarEndpoint.replace('{{username}}', user.username);
      return user;
    });
}

export function saveUsersToStorage(users: User[]) {
  if (!users.length) return;
  localStorage.setItem(userStorageKey, JSON.stringify(users));
}
