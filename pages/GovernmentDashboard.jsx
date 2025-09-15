import React from 'react';
import Layout from '../components/Layout.jsx';
import { UserRole } from '../types.js';
import { mockVerificationLogs, mockUniversities } from '../services/mockDatabase.js';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { GlobeAltIcon, ExclamationTriangleIcon, CheckCircleIcon } from '../components/icons/StatIcons.jsx';

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

const VerificationLogTable = ({ logs }) => {
    const getStatusChip = (status) => {
        const styles = {
            Verified: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
            Mismatch: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
            Forged: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
        };
        return <span className={`px-3 py-1 text-sm font-semibold rounded-full ${styles[status]}`}>{status}</span>;
    };

    return (
         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mt-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Verification Activity</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                             <th className="py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-400">Date</th>
                             <th className="py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-400">Verifier</th>
                             <th className="py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-400">University</th>
                             <th className="py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-400">Student Name</th>
                             <th className="py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-400">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map(log => (
                            <tr key={log.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <td className="py-3 px-4">{log.date}</td>
                                <td className="py-3 px-4">{log.verifier}</td>
                                <td className="py-3 px-4">{log.university}</td>
                                <td className="py-3 px-4">{log.studentName}</td>
                                <td className="py-3 px-4">{getStatusChip(log.status)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const GovernmentDashboard = ({ onLogout }) => {
    const totalVerifications = mockVerificationLogs.length;
    const forgedAttempts = mockVerificationLogs.filter(log => log.status === 'Forged').length;
    const successfulVerifications = mockVerificationLogs.filter(log => log.status === 'Verified').length;

    const chartData = mockUniversities.map(uni => ({
        name: uni.split(' ').slice(0, 2).join(' '),
        Verified: mockVerificationLogs.filter(l => l.university === uni && l.status === 'Verified').length,
        Forged: mockVerificationLogs.filter(l => l.university === uni && l.status === 'Forged').length,
        Mismatch: mockVerificationLogs.filter(l => l.university === uni && l.status === 'Mismatch').length,
    }));

    return (
        <Layout userRole={UserRole.Government} onLogout={onLogout}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                State-wide Verification Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <DashboardCard title="Total Verifications" value={totalVerifications} icon={<GlobeAltIcon />} />
                <DashboardCard title="Successful Verifications" value={successfulVerifications} icon={<CheckCircleIcon />} />
                <DashboardCard title="Forgery Attempts Detected" value={forgedAttempts} icon={<ExclamationTriangleIcon />} />
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mt-8">
                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Verification Trends by Institution</h3>
                 <div style={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.2)" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '0.5rem' }} />
                            <Legend />
                            <Bar dataKey="Verified" stackId="a" fill="#22c55e" />
                            <Bar dataKey="Mismatch" stackId="a" fill="#facc15" />
                            <Bar dataKey="Forged" stackId="a" fill="#ef4444" />
                        </BarChart>
                    </ResponsiveContainer>
                 </div>
            </div>
            
            <VerificationLogTable logs={mockVerificationLogs} />
        </Layout>
    );
};

export default GovernmentDashboard;