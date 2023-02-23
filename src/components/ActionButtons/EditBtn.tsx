import { EditOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

import { User, UserChangeActions } from '@/types';
import { useState } from 'react';

import EditModal from './EditModal';

type Props = {
  user: User;
  handleUserChange: (user: User, action: UserChangeActions) => void;
};

export default function EditBtn({ user, handleUserChange }: Props) {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal((oldVal) => !oldVal);

  return (
    <>
      <Tooltip title="Edit" placement="bottom">
        <Button shape="circle" icon={<EditOutlined />} onClick={toggleModal} />
      </Tooltip>

      <EditModal
        user={user}
        showModal={showModal}
        onModalChange={toggleModal}
        handleUserChange={handleUserChange}
      />
    </>
  );
}
