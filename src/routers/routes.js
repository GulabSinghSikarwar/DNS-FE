import { createBrowserRouter } from 'react-router-dom'
import Dashboard from '../components/Dashboard'
import DomainTable from '../components/DomainTable'
import DNSRecordForm from '../components/DNSRecordForm'

const router = createBrowserRouter(
    [
        {
            path: '/',
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
            children:[
                {
                    path:':id',
                    element:<DNSRecordForm/>
                }
            ]

        }

    ]
)

export default router