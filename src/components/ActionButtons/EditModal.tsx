import { useRef } from 'react';
import { Modal } from 'antd';

import { User, UserChangeActions } from '@/types';

type EditModalProps = {
  user: User;
  handleUserChange: (user: User, action: UserChangeActions) => void;
  showModal: boolean;
  onModalChange: () => void;
};

export default function EditModal({
  user,
  showModal,
  onModalChange,
  handleUserChange,
}: EditModalProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const handleModalChange = () => {
    const editedText = textAreaRef.current?.value;
    if (!editedText) return;

    let newUserInfo: User;
    try {
      newUserInfo = JSON.parse(editedText);
    } catch (e) {
      if (!errorRef.current) return;
      errorRef.current.innerText = 'User information malformatted';
      return;
    }
    handleUserChange(newUserInfo, 'EDIT');
    onModalChange();
  };

  const userInfoStr = JSON.stringify(user, null, 4);

  return (
    <Modal
      title="Edit info"
      centered
      open={showModal}
      onOk={handleModalChange}
      onCancel={onModalChange}
      destroyOnClose={true}
    >
      <div ref={errorRef} style={{ color: 'red' }}></div>
      <textarea ref={textAreaRef} rows={30} cols={57} defaultValue={userInfoStr} />
    </Modal>
  );
}
