const LoanRequestCard = ({ request, onApprove, onReject }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg">{request.memberName}</h3>
          <p className="text-sm text-gray-600">Requested: {request.requestDate}</p>
        </div>
        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">Pending</span>
      </div>
      
      <div className="mb-3">
        <p className="text-sm text-gray-600 mb-1">Purpose:</p>
        <p className="font-medium">{request.purpose}</p>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-1">Amount Requested:</p>
        <p className="text-xl font-bold text-blue-600">NPR {request.amount.toLocaleString()}</p>
      </div>
      
      <div className="flex gap-3">
        <button 
          onClick={() => onApprove(request.id)}
          className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Approve
        </button>
        <button 
          onClick={() => onReject(request.id)}
          className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default LoanRequestCard;