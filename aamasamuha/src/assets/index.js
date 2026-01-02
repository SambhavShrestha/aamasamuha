
export const membersData = [
  { 
    id: 1, 
    name: 'सरिता देवी (Sarita Devi)', 
    phone: '9841234567', 
    totalDeposits: 12000, 
    joinDate: '2024-01-01', 
    status: 'active' 
  },
  { 
    id: 2, 
    name: 'गीता श्रेष्ठ (Gita Shrestha)', 
    phone: '9841234568', 
    totalDeposits: 15000, 
    joinDate: '2024-01-01', 
    status: 'active' 
  },
  { 
    id: 3, 
    name: 'लक्ष्मी तामाङ (Laxmi Tamang)', 
    phone: '9841234569', 
    totalDeposits: 8000, 
    joinDate: '2024-03-01', 
    status: 'active' 
  },
  { 
    id: 4, 
    name: 'राधा गुरुङ (Radha Gurung)', 
    phone: '9841234570', 
    totalDeposits: 10000, 
    joinDate: '2024-02-01', 
    status: 'active' 
  },
];

export const loansData = [
  { 
    id: 1, 
    memberId: 1, 
    memberName: 'सरिता देवी', 
    amount: 40000, 
    purpose: 'Small Business - Tailoring Shop', 
    interestRate: 10, 
    duration: 12, 
    approvedDate: '2024-11-01', 
    dueDate: '2025-11-01', 
    paidAmount: 5000, 
    status: 'active', 
    repaymentType: 'monthly' 
  },
  { 
    id: 2, 
    memberId: 3, 
    memberName: 'लक्ष्मी तामाङ', 
    amount: 25000, 
    purpose: 'Education - Children School Fees', 
    interestRate: 8, 
    duration: 6, 
    approvedDate: '2024-12-01', 
    dueDate: '2025-06-01', 
    paidAmount: 0, 
    status: 'active', 
    repaymentType: 'lumpsum' 
  },
];

export const loanRequestsData = [
  { 
    id: 3, 
    memberId: 2, 
    memberName: 'गीता श्रेष्ठ', 
    amount: 30000, 
    purpose: 'Medical Emergency - Family Treatment', 
    requestDate: '2025-01-01', 
    status: 'pending' 
  },
];

export const depositsData = [
  { 
    id: 1, 
    memberId: 1, 
    amount: 1000, 
    date: '2025-01-01', 
    month: 'January 2025' 
  },
  { 
    id: 2, 
    memberId: 2, 
    amount: 1000, 
    date: '2025-01-01', 
    month: 'January 2025' 
  },
  { 
    id: 3, 
    memberId: 3, 
    amount: 1000, 
    date: '2025-01-01', 
    month: 'January 2025' 
  },
  { 
    id: 4, 
    memberId: 4, 
    amount: 1000, 
    date: '2025-01-01', 
    month: 'January 2025' 
  },
];

export const noticesData = [
  { 
    id: 1, 
    title: 'Next Meeting: February 1st, 2025', 
    content: 'Monthly meeting at community center. Please bring deposit amount.', 
    date: '2025-01-01', 
    priority: 'high' 
  },
  { 
    id: 2, 
    title: 'Interest Rate Update', 
    content: 'New interest rate for loans: 10% per annum', 
    date: '2024-12-15', 
    priority: 'medium' 
  },
];

// You can also export everything as a single object
export const mockData = {
  members: membersData,
  loans: loansData,
  loanRequests: loanRequestsData,
  deposits: depositsData,
  notices: noticesData,
};

// Default export
export default mockData;