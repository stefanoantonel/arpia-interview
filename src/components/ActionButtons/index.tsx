import { User, UserChangeActions } from '@/types';
import ShowDetailsBtn from './ShowDetailsBtn';
import EditBtn from './EditBtn';
import DeleteBtn from './DeleteBtn';

type UserProps = {
  user: User;
};

type ActionButtonsProps = UserProps & {
  handleUserChange: (user: User, action: UserChangeActions) => void;
};

export default function ActionButtons({ user, handleUserChange }: ActionButtonsProps) {
  return (
    <>
      <ShowDetailsBtn user={user} />

      <EditBtn user={user} handleUserChange={handleUserChange} />

      <DeleteBtn user={user} handleUserChange={handleUserChange} />
    </>
  );
}
