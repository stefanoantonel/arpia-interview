import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Link from 'next/link';

import { ViewStateType } from '@/types';
import styles from './view-mode-switcher.module.css';
import useViewMode from '@/hooks/view-mode';
import { viewQueryParam } from '@/constants';

export default function ViewModeSwitcher() {
  const currentView: ViewStateType = useViewMode();

  const opositeView: ViewStateType = currentView === 'GRID' ? 'LIST' : 'GRID';

  return (
    <Link href={`/?${viewQueryParam}=${opositeView}`}>
      <Button
        className={styles.switchViewBtn}
        icon={currentView === 'GRID' ? <UnorderedListOutlined /> : <AppstoreOutlined />}
      >
        Show {opositeView.toLowerCase()}
      </Button>
    </Link>
  );
}
