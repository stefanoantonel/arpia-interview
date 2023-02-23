import { DeleteOutlined } from '@ant-design/icons';
import { Button, Tooltip, Popconfirm } from 'antd';

import { User, UserChangeActions } from '@/types';

type Props = {
  user: User;
  handleUserChange: (user: User, action: UserChangeActions) => void;
};

export default function DeleteBtn({ user, handleUserChange }: Props) {
  return (
    <Tooltip title="Delete" placement="bottom">
      <Popconfirm
        title="Delete user"
        description="Are you sure to delete this user?"
        onConfirm={() => handleUserChange(user, 'DELETE')}
        onCancel={() => {}}
        okText="Yes"
        cancelText="No"
      >
        <Button shape="circle" icon={<DeleteOutlined />} />
      </Popconfirm>
    </Tooltip>
  );
}
