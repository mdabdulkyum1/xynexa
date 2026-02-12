
import { auth } from '@/auth';
import Page from './component/Dashboard/Dashboard';
import { redirect } from 'next/navigation';

const Dashboard = async () => {
    const session = await auth();
    
    if (!session) {
        return redirect('/sign-in'); 
    }

    

    return (
        <div>
            <Page/>
            
        </div>
    );
};

export default Dashboard;