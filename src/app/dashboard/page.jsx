
import { currentUser } from '@clerk/nextjs/server';
import Page from './component/Dashboard/Dashboard';
import { redirect } from 'next/navigation';

const Dashboard = async () => {
    const user = await currentUser();
    
    if (!user) {
        return redirect('/sign-in'); 
    }

    return (
        <div>
            <Page/>
            {/* hello */}
        </div>
    );
};

export default Dashboard;