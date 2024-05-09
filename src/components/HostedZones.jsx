import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../service/authContext';
import { Link } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import { getAllHostedZones } from '../service/hostedZone';

function HostedZones() {
    const [hostedZones, setHostedZones] = useState([]);

    useEffect(() => {
        //  getAllHostedZones().then((response) => {
        //     setHostedZones(response);
        // })
        setHostedZones([
            {
                "Id": "/hostedzone/Z05257343MSBEWS89VVDE",
                "Name": "hllowan2gulab.com.",
                "CallerReference": "82558e6f-56aa-4220-ac6f-35f7e9e6747a",
                "Config": {
                    "Comment": "",
                    "PrivateZone": false
                },
                "ResourceRecordSetCount": 2
            },
            {
                "Id": "/hostedzone/Z01152962GDQ6LNZ1OHBR",
                "Name": "hellogulabwan.com.",
                "CallerReference": "b8fd172e-272d-42ee-8f04-b1cb74d0e6f3",
                "Config": {
                    "Comment": "",
                    "PrivateZone": false
                },
                "ResourceRecordSetCount": 2
            }
        ])
    }, []);

    // Function to extract the relevant portion of the zone ID
    const extractZoneId = (fullId) => {
        return fullId.split('/')[2];
    };

    // Function to render dash "-" if data is blank
    const renderData = (data) => {
        return data ? data : "-";
    };

    // Function to render type based on PrivateZone property
    const renderType = (privateZone) => {
        return privateZone ? "Private" : "Public";
    };

    // If hostedZones array is empty, display a single row with dashes
    if (hostedZones.length === 0) {
        return (
            <div className="container mx-auto px-4">
                <Navbar />
                <table className="min-w-full table-auto shadow-md rounded-lg overflow-hidden">
                    <tbody className="text-gray-700">
                        <tr className="bg-white border-b">
                            <td colSpan="7" className="text-center py-3 px-4">No data available</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <div className="mx-auto ">
            <Navbar />
            <table className="min-w-full table-auto shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="text-center py-3 px-4 uppercase font-semibold text-sm text-gray-700">Hosted Zone Name</th>
                        <th className="text-center py-3 px-4 uppercase font-semibold text-sm text-gray-700">Type</th>
                        <th className="text-center py-3 px-4 uppercase font-semibold text-sm text-gray-700">Created By</th>

                        <th className="text-center py-3 px-4 uppercase font-semibold text-sm text-gray-700">Record Count</th>
                        <th className="text-center py-3 px-4 uppercase font-semibold text-sm text-gray-700">Description</th>
                        <th className="text-center py-3 px-4 uppercase font-semibold text-sm text-gray-700">Hosted Zone ID</th>

                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {hostedZones.map(zone => (
                        <tr key={zone.Id} className="bg-white border-b">
                            <td className="py-3 px-4 text-center">
                                <Link to={`/zone/${extractZoneId(zone.Id)}`} className="text-blue-500 hover:text-blue-700">
                                    {renderData(zone.Name)}
                                </Link>
                            </td>
                            <td className="py-3 px-4 text-center">{renderType(zone.Config.PrivateZone)}</td>
                            <td className="py-3 px-4 text-center"> Route 53</td>
                            <td className="py-3 px-4 text-center">{renderData(zone.ResourceRecordSetCount)}</td>
                            <td className="py-3 px-4 text-center">{renderData(zone.Config.Comment)}</td>
                            <td className="py-3 px-4 text-center">{extractZoneId(renderData(zone.Id))}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default HostedZones;
