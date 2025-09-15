export const mockUniversities = [
    'Jharkhand Technical University',
    'Ranchi University',
    'Birla Institute of Technology, Mesra',
    'Indian Institute of Technology (ISM), Dhanbad',
];

export const mockCertificateDatabase = [
  {
    id: 'JHU-CS-2023-001',
    studentName: 'Amit Kumar',
    course: 'B.Tech in Computer Science',
    grade: 'A+',
    issueDate: '2023-05-15',
    university: 'Jharkhand Technical University',
  },
  {
    id: 'RU-PHY-2022-045',
    studentName: 'Priya Sharma',
    course: 'M.Sc in Physics',
    grade: 'A',
    issueDate: '2022-07-20',
    university: 'Ranchi University',
  },
  {
    id: 'BITM-EE-2023-102',
    studentName: 'Rahul Singh',
    course: 'B.E. in Electrical Engineering',
    grade: 'B+',
    issueDate: '2023-06-01',
    university: 'Birla Institute of Technology, Mesra',
  },
  {
    id: 'IIT-D-MIN-2021-007',
    studentName: 'Sneha Verma',
    course: 'M.Tech in Mining Engineering',
    grade: 'O',
    issueDate: '2021-08-10',
    university: 'Indian Institute of Technology (ISM), Dhanbad',
  },
];

export const mockVerificationLogs = [
  {
    id: 'LOG-001',
    certificateId: 'JHU-CS-2023-001',
    verifier: 'TechCorp Inc.',
    date: '2024-07-28',
    status: 'Verified',
    studentName: 'Amit Kumar',
    university: 'Jharkhand Technical University',
  },
  {
    id: 'LOG-002',
    certificateId: 'FAKE-ID-001',
    verifier: 'Global Solutions',
    date: '2024-07-27',
    status: 'Forged',
    studentName: 'Unknown',
    university: 'Non-Existent University',
  },
  {
    id: 'LOG-003',
    certificateId: 'RU-PHY-2022-045',
    verifier: 'EduVerify Ltd.',
    date: '2024-07-26',
    status: 'Mismatch',
    studentName: 'Priya Sharma',
    university: 'Ranchi University',
  },
    {
    id: 'LOG-004',
    certificateId: 'BITM-EE-2023-102',
    verifier: 'Innovate LLC',
    date: '2024-07-25',
    status: 'Verified',
    studentName: 'Rahul Singh',
    university: 'Birla Institute of Technology, Mesra',
  },
];