import React, { useState, useCallback } from 'react';
import Layout from '../components/Layout.jsx';
import { UserRole, VerificationStatus } from '../types.js';
import { extractCertificateDetails } from '../services/geminiService.js';
import { mockCertificateDatabase } from '../services/mockDatabase.js';
import { UploadIcon, CheckCircleIcon, XCircleIcon, AlertTriangleIcon, ClockIcon, SparklesIcon } from '../components/icons/StatusIcons.jsx';

const CertificateUploadForm = ({ onVerify, isLoading }) => {
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      onVerify(file);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Verify Certificate</h2>
      <div 
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-10 text-center transition-colors ${dragOver ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-300 dark:border-gray-600'}`}
      >
        <UploadIcon />
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          {file ? `Selected: ${file.name}` : 'Drag & drop a file here, or click to select'}
        </p>
        <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} accept="image/jpeg,image/png,application/pdf" />
        <label htmlFor="file-upload" className="mt-4 inline-block bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-semibold py-2 px-4 rounded-lg cursor-pointer hover:bg-indigo-200 dark:hover:bg-indigo-900">
          Select File
        </label>
      </div>
      <button 
        type="submit" 
        disabled={!file || isLoading}
        className="w-full mt-6 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all flex items-center justify-center"
      >
        {isLoading ? (
            <>
                <ClockIcon />
                <span className="ml-2">Verifying...</span>
            </>
        ) : (
            <>
                <SparklesIcon />
                <span className="ml-2">Verify with AI</span>
            </>
        )}
      </button>
    </form>
  );
};

const VerificationResultDisplay = ({ result }) => {
    const statusConfig = {
        [VerificationStatus.SUCCESS]: { icon: <CheckCircleIcon />, color: 'green', title: 'Certificate Verified' },
        [VerificationStatus.MISMATCH]: { icon: <AlertTriangleIcon />, color: 'yellow', title: 'Data Mismatch Found' },
        [VerificationStatus.FORGED]: { icon: <XCircleIcon />, color: 'red', title: 'Forgery Alert!' },
        [VerificationStatus.ERROR]: { icon: <XCircleIcon />, color: 'red', title: 'Verification Error' },
    };

    const config = statusConfig[result.status];
    if (!config) return null;

    const renderField = (label, value, originalValue) => {
        const isMismatched = result.mismatchedFields?.includes(label.toLowerCase().replace(' ', '')) && originalValue !== undefined;
        return (
            <div className={`p-3 rounded-lg ${isMismatched ? 'bg-yellow-100 dark:bg-yellow-900/30 ring-2 ring-yellow-400' : 'bg-gray-100 dark:bg-gray-700'}`}>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
                <p className={`text-lg font-semibold ${isMismatched ? 'text-yellow-800 dark:text-yellow-300' : 'text-gray-900 dark:text-white'}`}>{value || 'N/A'}</p>
                {isMismatched && <p className="text-sm font-semibold text-green-700 dark:text-green-400 mt-1">Database value: {originalValue}</p>}
            </div>
        );
    };

    return (
        <div className={`mt-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-4xl mx-auto border-t-4 border-${config.color}-500`}>
            <div className="flex items-center mb-6">
                {config.icon}
                <h2 className={`text-2xl font-bold ml-4 text-${config.color}-700 dark:text-${config.color}-300`}>{config.title}</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{result.message}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {renderField('Student Name', result.extractedData?.studentName, result.databaseRecord?.studentName)}
                 {renderField('Certificate ID', result.extractedData?.id, result.databaseRecord?.id)}
                 {renderField('University', result.extractedData?.university, result.databaseRecord?.university)}
                 {renderField('Course', result.extractedData?.course, result.databaseRecord?.course)}
                 {renderField('Grade', result.extractedData?.grade, result.databaseRecord?.grade)}
                 {renderField('Issue Date', result.extractedData?.issueDate, result.databaseRecord?.issueDate)}
            </div>
        </div>
    );
};


const EmployerDashboard = ({ onLogout }) => {
  const [verificationResult, setVerificationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleVerify = useCallback(async (file) => {
    setIsLoading(true);
    setVerificationResult({ status: VerificationStatus.VERIFYING, message: "Analyzing certificate with AI..." });

    try {
        const base64Image = await fileToBase64(file);
        const extractedData = await extractCertificateDetails(base64Image);

        const dbRecord = mockCertificateDatabase.find(record => record.id === extractedData.id);

        if (!dbRecord) {
            setVerificationResult({
                status: VerificationStatus.FORGED,
                message: 'This certificate ID does not exist in the verified database. High probability of forgery.',
                extractedData,
                databaseRecord: null
            });
        } else {
            const mismatchedFields = [];
            Object.keys(extractedData).forEach(key => {
                if (extractedData[key] && dbRecord[key] && String(extractedData[key]).toLowerCase() !== String(dbRecord[key]).toLowerCase()) {
                    mismatchedFields.push(key);
                }
            });

            if (mismatchedFields.length > 0) {
                 setVerificationResult({
                    status: VerificationStatus.MISMATCH,
                    message: `Mismatch found in the following fields: ${mismatchedFields.join(', ')}. Please review carefully.`,
                    extractedData,
                    databaseRecord: dbRecord,
                    mismatchedFields
                });
            } else {
                 setVerificationResult({
                    status: VerificationStatus.SUCCESS,
                    message: 'Certificate details successfully matched with the official university database.',
                    extractedData,
                    databaseRecord: dbRecord
                });
            }
        }

    } catch (error) {
        console.error(error);
        setVerificationResult({ status: VerificationStatus.ERROR, message: 'An unexpected error occurred during verification.' });
    } finally {
        setIsLoading(false);
    }
  }, []);

  return (
    <Layout userRole={UserRole.Employer} onLogout={onLogout}>
      <CertificateUploadForm onVerify={handleVerify} isLoading={isLoading} />
      {verificationResult && verificationResult.status !== VerificationStatus.VERIFYING && (
        <VerificationResultDisplay result={verificationResult} />
      )}
       {verificationResult && verificationResult.status === VerificationStatus.VERIFYING && (
        <div className="mt-8 text-center">
            <div className="inline-flex items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                 <ClockIcon />
                 <p className="ml-3 font-semibold text-indigo-600 dark:text-indigo-300">{verificationResult.message}</p>
            </div>
        </div>
      )}
    </Layout>
  );
};

export default EmployerDashboard;