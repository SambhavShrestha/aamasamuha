import React from "react";

const NoticeCard = ({ notice }) => {
  const priorityStyles = {
    high: 'bg-red-50 border-red-500',
    medium: 'bg-yellow-50 border-yellow-500',
    low: 'bg-blue-50 border-blue-500'
  };

  return (
    <div className={`p-4 rounded-lg border-l-4 ${priorityStyles[notice.priority]}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold">{notice.title}</h3>
        <span className="text-xs text-gray-600">{notice.date}</span>
      </div>
      <p className="text-sm text-gray-700">{notice.content}</p>
    </div>
  );
};

export default NoticeCard;