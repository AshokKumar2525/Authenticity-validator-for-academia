import React from 'react';
import Layout from '../components/Layout.jsx';
import { UserRole } from '../types.js';
import { mockCertificateDatabase, mockUniversities } from '../services/mockDatabase.js';
import { DatabaseIcon, CheckBadgeIcon, ClockIcon } from '../components/icons/StatIcons.jsx';

const DashboardCard = ({ title, value, icon }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex items-center">
        <div className="bg-indigo-100 dark:bg-indigo-900/50 p-4 rounded-full mr-4">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
    </div>
);

const RecordTable = ({ records }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mt-8">
         <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Certificate Records</h3>
            <div>
                 <button className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors mr-2">Add New Record</button>
                 <button className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">Bulk Upload</button>
            </div>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-400">Certificate ID</th>
                        <th className="py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-400">Student Name</th>
                        <th className="py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-400">Course</th>
                        <th className="py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-400">Grade</th>
                        <th className="py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-400">Issue Date</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map(record => (
                        <tr key={record.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                            <td className="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400">{record.id}</td>
                            <td className="py-3 px-4">{record.studentName}</td>
                            <td className="py-3 px-4">{record.course}</td>
                            <td className="py-3 px-4 font-semibold">{record.grade}</td>
                            <td className="py-3 px-4">{record.issueDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const UniversityDashboard = ({ onLogout }) => {
    // For demonstration, we'll just show records from one university
    const universityName = mockUniversities[0];
    const universityRecords = mockCertificateDatabase.filter(r => r.university === universityName);
    const totalRecords = universityRecords.length;
    const recentVerifications = 5; // mock data
    const pendingRequests = 2; // mock data
    
    return (
        <Layout userRole={UserRole.University} onLogout={onLogout}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Welcome, {universityName}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <DashboardCard title="Total Records" value={totalRecords} icon={<DatabaseIcon />} />
                <DashboardCard title="Recent Verifications" value={recentVerifications} icon={<CheckBadgeIcon />} />
                <DashboardCard title="Pending Requests" value={pendingRequests} icon={<ClockIcon />} />
            </div>
            
            <RecordTable records={universityRecords} />

        </Layout>
    );
};

export default UniversityDashboard;