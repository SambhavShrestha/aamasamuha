const NoticeForm = ({ newNotice, setNewNotice, onSubmit, onCancel }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4">
      <h3 className="font-semibold mb-3">Create New Notice</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={newNotice.title}
            onChange={(e) => setNewNotice({...newNotice, title: e.target.value})}
            placeholder="Enter notice title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows="3"
            value={newNotice.content}
            onChange={(e) => setNewNotice({...newNotice, content: e.target.value})}
            placeholder="Enter notice content"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={newNotice.priority}
            onChange={(e) => setNewNotice({...newNotice, priority: e.target.value})}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onSubmit}
            className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Post Notice
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default NoticeForm;