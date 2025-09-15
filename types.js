export const UserRole = Object.freeze({
  University: 'university',
  Employer: 'employer',
  Government: 'government',
});

export const VerificationStatus = Object.freeze({
    IDLE: 'idle',
    UPLOADING: 'uploading',
    VERIFYING: 'verifying',
    SUCCESS: 'success',
    MISMATCH: 'mismatch',
    FORGED: 'forged',
    ERROR: 'error',
});