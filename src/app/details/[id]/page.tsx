'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Button } from 'antd';
import Link from 'next/link';

import { User, ViewStateType } from '@/types';
import { fetchUser } from '@/helpers/user-api';
import styles from './details.module.css';
import useViewMode from '@/hooks/view-mode';
import { viewQueryParam } from '@/constants';

export default function Details() {
  const path = usePathname();
  const [user, setUser] = useState<User>();
  const currentView: ViewStateType = useViewMode();

  useEffect(() => {
    if (!path) return;

    const id = [...path.split('/')].pop();

    if (!id) return;

    const getUserInfo = async () => {
      const userInfo = await fetchUser(id);
      setUser(userInfo);
    };
    getUserInfo();
  }, [path]);

  if (!path || !user) return null;

  return (
    <>
      <div className={styles.homeBtn}>
        <Link href={`/?${viewQueryParam}=${currentView}`}>
          <Button>Go back</Button>
        </Link>
      </div>

      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <Image width={150} height={150} src={user.avatarUrl} alt="avatar image"></Image>
        </div>
        <div className={styles.userInfo}>
          <DisplayDict dict={user}></DisplayDict>
        </div>
      </div>
    </>
  );
}

function DisplayDict({ dict, isChild }: { dict: object; isChild?: boolean }) {
  const items = Object.entries(dict);

  if (!items.length) return null;

  return (
    <>
      {items.map(([key, value]) => {
        if (typeof value === 'string' || typeof value === 'number') {
          return (
            <div key={key}>
              {isChild ? ' > ' : ''} {key}: {value}
            </div>
          );
        }

        return (
          <div key={key}>
            [{key}] <DisplayDict key={key} dict={value} isChild={true} />
          </div>
        );
      })}
    </>
  );
}
