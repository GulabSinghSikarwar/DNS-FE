import { createBrowserRouter } from 'react-router-dom'
import Dashboard from '../components/Dashboard'
import DomainTable from '../components/DomainTable'
import DNSRecordForm from '../components/DNSRecordForm'
import HostedZones from '../components/HostedZones'
import LoginForm from '../components/Login/Login'
import SignupForm from '../components/SignUp/Signup'
import App from '../App'
import ProtectedRoute from '../service/ProtectedRoute'

const router = createBrowserRouter(
    [
        {
            element: <ProtectedRoute />,
            children: [
              
                {
                    path: '/zone/:zoneId',
                    element: <Dashboard />

                },
                {
                    path: "/all-DNS",
                    element: <DomainTable />,
                },
                {
                    path: 'addDNS',
                    element: <DNSRecordForm />
                },
                {
                    path: 'edit',
                    children: [
                        {
                            path: ':id',
                            element: <DNSRecordForm />
                        }
                    ]

                },
                {
                    path: '/',
                    element: <HostedZones />,
                     
                },
            ]
        },
        ,
        {
            path: '/login',
            element: <LoginForm />,
        },
        {
            path: '/signup',
            element: <SignupForm />
        },
        {
            path: '*',
            element: <p>404 Error - Nothing here...</p>
        }

    ]
)

export default router