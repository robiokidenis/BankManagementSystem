
import { withAuth } from '@/libs/Utils/Auth';
import { NextPage } from 'next';

const profile: NextPage = () => {
  return (
    <div>
      <h1>Welcome to your profile page!</h1>
    </div>
  );
};

export default withAuth(profile,false);
