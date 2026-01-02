import React, { useState } from 'react';
import Header from './components/Header.jsx';
import LoginScreen from './components/LoginScreen.jsx';
import SummaryCard from "./components/SummaryCard";
import LoanCard from "./components/LoanCard";
import NoticeCard from "./components/NoticeCard";

const FinanceManagerApp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Demo data
  const [members] = useState([
    { id: 1, name: 'सरिता देवी (Sarita Devi)', phone: '9841234567', totalDeposits: 12000, joinDate: '2024-01-01', status: 'active' },
    { id: 2, name: 'गीता श्रेष्ठ (Gita Shrestha)', phone: '9841234568', totalDeposits: 15000, joinDate: '2024-01-01', status: 'active' },
    { id: 3, name: 'लक्ष्मी तामाङ (Laxmi Tamang)', phone: '9841234569', totalDeposits: 8000, joinDate: '2024-03-01', status: 'active' },
    { id: 4, name: 'राधा गुरुङ (Radha Gurung)', phone: '9841234570', totalDeposits: 10000, joinDate: '2024-02-01', status: 'active' },
  ]);

  const [loans, setLoans] = useState([
    { id: 1, memberId: 1, memberName: 'सरिता देवी', amount: 40000, purpose: 'Small Business - Tailoring Shop', interestRate: 10, duration: 12, approvedDate: '2024-11-01', dueDate: '2025-11-01', paidAmount: 5000, status: 'active', repaymentType: 'monthly' },
    { id: 2, memberId: 3, memberName: 'लक्ष्मी तामाङ', amount: 25000, purpose: 'Education - Children School Fees', interestRate: 8, duration: 6, approvedDate: '2024-12-01', dueDate: '2025-06-01', paidAmount: 0, status: 'active', repaymentType: 'lumpsum' },
  ]);

  const [loanRequests, setLoanRequests] = useState([
    { id: 3, memberId: 2, memberName: 'गीता श्रेष्ठ', amount: 30000, purpose: 'Medical Emergency - Family Treatment', requestDate: '2025-01-01', status: 'pending' },
  ]);

  const [deposits] = useState([
    { id: 1, memberId: 1, amount: 1000, date: '2025-01-01', month: 'January 2025' },
    { id: 2, memberId: 2, amount: 1000, date: '2025-01-01', month: 'January 2025' },
    { id: 3, memberId: 3, amount: 1000, date: '2025-01-01', month: 'January 2025' },
    { id: 4, memberId: 4, amount: 1000, date: '2025-01-01', month: 'January 2025' },
  ]);

  const [notices, setNotices] = useState([
    { id: 1, title: 'Next Meeting: February 1st, 2025', content: 'Monthly meeting at community center. Please bring deposit amount.', date: '2025-01-01', priority: 'high' },
    { id: 2, title: 'Interest Rate Update', content: 'New interest rate for loans: 10% per annum', date: '2024-12-15', priority: 'medium' },
  ]);

  const [newNotice, setNewNotice] = useState({ title: '', content: '', priority: 'medium' });
  const [showNoticeForm, setShowNoticeForm] = useState(false);
  const [repaymentAmount, setRepaymentAmount] = useState('');
  const [selectedLoanId, setSelectedLoanId] = useState(null);

  // Calculate totals
  const totalDeposits = deposits.reduce((sum, d) => sum + d.amount, 0);
  const totalLoansDisbursed = loans.reduce((sum, l) => sum + l.amount, 0);
  const totalRepayments = loans.reduce((sum, l) => sum + l.paidAmount, 0);
  const availableFund = totalDeposits - totalLoansDisbursed + totalRepayments;

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('dashboard');
  };

  const approveLoan = (requestId) => {
    const request = loanRequests.find(r => r.id === requestId);
    const newLoan = {
      id: loans.length + 1,
      memberId: request.memberId,
      memberName: request.memberName,
      amount: request.amount,
      purpose: request.purpose,
      interestRate: 10,
      duration: 12,
      approvedDate: new Date().toISOString().split('T')[0],
      // dueDate: new Date(Date.now() + 365*24*60*60*1000).toISOString().split('T')[0],
      paidAmount: 0,
      status: 'active',
      repaymentType: 'monthly'
    };
    setLoans([...loans, newLoan]);
    setLoanRequests(loanRequests.filter(r => r.id !== requestId));
  };

  const rejectLoan = (requestId) => {
    setLoanRequests(loanRequests.filter(r => r.id !== requestId));
  };

  const addNotice = () => {
    if (newNotice.title && newNotice.content) {
      const notice = {
        id: notices.length + 1,
        ...newNotice,
        date: new Date().toISOString().split('T')[0]
      };
      setNotices([notice, ...notices]);
      setNewNotice({ title: '', content: '', priority: 'medium' });
      setShowNoticeForm(false);
    }
  };

  const recordRepayment = () => {
    if (selectedLoanId && repaymentAmount && !isNaN(repaymentAmount)) {
      const amount = parseFloat(repaymentAmount);
      setLoans(loans.map(loan => {
        if (loan.id === selectedLoanId) {
          const newPaidAmount = (loan.paidAmount || 0) + amount;
          const newStatus = newPaidAmount >= loan.amount ? 'paid' : 'active';
          return { ...loan, paidAmount: newPaidAmount, status: newStatus };
        }
        return loan;
      }));
      setRepaymentAmount('');
      setSelectedLoanId(null);
    }
  };

  // Show login if no user
  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} members={members} />;
  }

  // Member Dashboard
  if (currentUser.role === 'member') {
    const memberLoans = loans.filter(l => l.memberId === currentUser.id);
    
    return (
      <div className="min-h-screen bg-gray-50">
        <Header user={currentUser} onLogout={handleLogout} />

        <div className="max-w-6xl mx-auto p-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <SummaryCard 
              title="Total Deposits" 
              value={`NPR ${currentUser.totalDeposits.toLocaleString()}`}
              icon={() => <span className="text-2xl">💰</span>}
              color="green"
            />
            <SummaryCard 
              title="Active Loans" 
              value={memberLoans.length}
              icon={() => <span className="text-2xl">📄</span>}
              color="blue"
            />
            <SummaryCard 
              title="Total Borrowed" 
              value={`NPR ${memberLoans.reduce((sum, l) => sum + l.amount, 0).toLocaleString()}`}
              icon={() => <span className="text-2xl">📈</span>}
              color="orange"
            />
          </div>

          {/* Active Loans */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">My Active Loans</h2>
            </div>
            <div className="p-6">
              {memberLoans.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No active loans</p>
              ) : (
                <div className="space-y-4">
                  {memberLoans.map(loan => (
                    <LoanCard key={loan.id} loan={loan} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Notices */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">Notices & Announcements</h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {notices.map(notice => (
                  <NoticeCard key={notice.id} notice={notice} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={currentUser} onLogout={handleLogout} />
      
      {/* Admin Tabs */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex border-b mb-6 overflow-x-auto">
          <button
            className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'dashboard' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'members' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('members')}
          >
            Members
          </button>
          <button
            className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'loans' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('loans')}
          >
            Loans
          </button>
          <button
            className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'notices' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('notices')}
          >
            Notices
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <SummaryCard 
                title="Total Members" 
                value={members.length}
                icon={() => <span className="text-2xl">👥</span>}
                color="blue"
              />
              <SummaryCard 
                title="Total Deposits" 
                value={`NPR ${totalDeposits.toLocaleString()}`}
                icon={() => <span className="text-2xl">💰</span>}
                color="green"
              />
              <SummaryCard 
                title="Loans Disbursed" 
                value={`NPR ${totalLoansDisbursed.toLocaleString()}`}
                icon={() => <span className="text-2xl">📈</span>}
                color="orange"
              />
              <SummaryCard 
                title="Available Fund" 
                value={`NPR ${availableFund.toLocaleString()}`}
                icon={() => <span className="text-2xl">🏦</span>}
                color="purple"
              />
            </div>

            {/* Loan Requests */}
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">Pending Loan Requests</h2>
              </div>
              <div className="p-6">
                {loanRequests.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No pending loan requests</p>
                ) : (
                  <div className="space-y-4">
                    {loanRequests.map(request => (
                      <div key={request.id} className="border rounded-lg p-4">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div>
                            <h3 className="font-bold text-lg">{request.memberName}</h3>
                            <p className="text-gray-600">{request.purpose}</p>
                            <p className="text-lg font-bold">NPR {request.amount.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">Requested: {request.requestDate}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => approveLoan(request.id)}
                              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => rejectLoan(request.id)}
                              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Active Loans */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">Active Loans</h2>
              </div>
              <div className="p-6">
                {loans.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No active loans</p>
                ) : (
                  <div className="space-y-4">
                    {loans.map(loan => (
                      <div key={loan.id} className="border rounded-lg p-4">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div>
                            <h3 className="font-bold text-lg">{loan.memberName}</h3>
                            <p className="text-gray-600">{loan.purpose}</p>
                            <div className="flex gap-4 mt-2">
                              <span className="text-sm">Amount: NPR {loan.amount.toLocaleString()}</span>
                              <span className="text-sm">Paid: NPR {loan.paidAmount.toLocaleString()}</span>
                              <span className="text-sm">Remaining: NPR {(loan.amount - loan.paidAmount).toLocaleString()}</span>
                            </div>
                            <p className="text-sm text-gray-500">Due: {loan.dueDate}</p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                              <input
                                type="number"
                                placeholder="Repayment amount"
                                className="border rounded px-3 py-1 w-40"
                                value={selectedLoanId === loan.id ? repaymentAmount : ''}
                                onChange={(e) => {
                                  setSelectedLoanId(loan.id);
                                  setRepaymentAmount(e.target.value);
                                }}
                              />
                              <button
                                onClick={() => {
                                  setSelectedLoanId(loan.id);
                                  recordRepayment();
                                }}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                              >
                                Record Payment
                              </button>
                            </div>
                            <span className={`text-sm px-2 py-1 rounded ${loan.status === 'active' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                              {loan.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Members Tab */}
        {activeTab === 'members' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">All Members</h2>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Phone</th>
                      <th className="text-left py-3 px-4">Total Deposits</th>
                      <th className="text-left py-3 px-4">Join Date</th>
                      <th className="text-left py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map(member => (
                      <tr key={member.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{member.name}</td>
                        <td className="py-3 px-4">{member.phone}</td>
                        <td className="py-3 px-4">NPR {member.totalDeposits.toLocaleString()}</td>
                        <td className="py-3 px-4">{member.joinDate}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded bg-green-100 text-green-800">
                            {member.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Loans Tab */}
        {activeTab === 'loans' && (
          <div className="space-y-6">
            {/* Loan Requests */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">Loan Requests</h2>
              </div>
              <div className="p-6">
                {loanRequests.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No pending loan requests</p>
                ) : (
                  <div className="space-y-4">
                    {loanRequests.map(request => (
                      <div key={request.id} className="border rounded-lg p-4">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-bold text-lg">{request.memberName}</h3>
                              <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">Pending</span>
                            </div>
                            <p className="text-gray-600 mb-2">{request.purpose}</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                              <div>
                                <span className="text-sm text-gray-500">Amount:</span>
                                <p className="font-bold">NPR {request.amount.toLocaleString()}</p>
                              </div>
                              <div>
                                <span className="text-sm text-gray-500">Requested:</span>
                                <p>{request.requestDate}</p>
                              </div>
                              <div>
                                <span className="text-sm text-gray-500">Member ID:</span>
                                <p>{request.memberId}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => approveLoan(request.id)}
                              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => rejectLoan(request.id)}
                              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* All Loans */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">All Loans</h2>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Member</th>
                        <th className="text-left py-3 px-4">Purpose</th>
                        <th className="text-left py-3 px-4">Amount</th>
                        <th className="text-left py-3 px-4">Paid</th>
                        <th className="text-left py-3 px-4">Due Date</th>
                        <th className="text-left py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loans.map(loan => (
                        <tr key={loan.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{loan.memberName}</td>
                          <td className="py-3 px-4">{loan.purpose}</td>
                          <td className="py-3 px-4">NPR {loan.amount.toLocaleString()}</td>
                          <td className="py-3 px-4">NPR {loan.paidAmount.toLocaleString()}</td>
                          <td className="py-3 px-4">{loan.dueDate}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-xs ${loan.status === 'active' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                              {loan.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notices Tab */}
        {activeTab === 'notices' && (
          <div className="space-y-6">
            {/* Add Notice Form */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Add New Notice</h2>
                  <button
                    onClick={() => setShowNoticeForm(!showNoticeForm)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    {showNoticeForm ? 'Cancel' : 'Add Notice'}
                  </button>
                </div>
              </div>
              
              {showNoticeForm && (
                <div className="p-6 border-b">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Title</label>
                      <input
                        type="text"
                        value={newNotice.title}
                        onChange={(e) => setNewNotice({...newNotice, title: e.target.value})}
                        className="w-full border rounded px-3 py-2"
                        placeholder="Enter notice title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Content</label>
                      <textarea
                        value={newNotice.content}
                        onChange={(e) => setNewNotice({...newNotice, content: e.target.value})}
                        className="w-full border rounded px-3 py-2"
                        rows="3"
                        placeholder="Enter notice content"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Priority</label>
                      <select
                        value={newNotice.priority}
                        onChange={(e) => setNewNotice({...newNotice, priority: e.target.value})}
                        className="w-full border rounded px-3 py-2"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    <button
                      onClick={addNotice}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Publish Notice
                    </button>
                  </div>
                </div>
              )}

              {/* All Notices */}
              <div className="p-6">
                <h3 className="text-lg font-bold mb-4">All Notices</h3>
                <div className="space-y-4">
                  {notices.map(notice => (
                    <NoticeCard key={notice.id} notice={notice} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinanceManagerApp;