import Link from 'next/link';
import { FileSearchOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

import { User, ViewStateType } from '@/types';
import useViewMode from '@/hooks/view-mode';
import { viewQueryParam } from '@/constants';

type UserProps = {
  user: User;
};

export default function ShowDetailsBtn({ user }: UserProps) {
  const currentView: ViewStateType = useViewMode();

  return (
    <Tooltip title="Show Details" placement="bottom">
      <Link href={`/details/${user.id}?${viewQueryParam}=${currentView}`}>
        <Button shape="circle" icon={<FileSearchOutlined />} />
      </Link>
    </Tooltip>
  );
}
