import React, { useState } from 'react';
import { Plus, Users, Share2, Settings, Copy, Check } from 'lucide-react';

export default function ClassManagement() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [newClass, setNewClass] = useState({
    name: '',
    description: '',
  });

  // Mock data
  const [classes, setClasses] = useState([
    {
      id: '1',
      name: 'Math Grade 5A',
      code: 'MATH5A',
      description: 'Advanced mathematics for grade 5 students',
      studentCount: 24,
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      name: 'Science Grade 5B',
      code: 'SCI5B',
      description: 'Exploring the natural world through experiments',
      studentCount: 22,
      createdAt: '2024-01-20',
    },
    {
      id: '3',
      name: 'English Literature',
      code: 'ENG5C',
      description: 'Reading comprehension and creative writing',
      studentCount: 21,
      createdAt: '2024-02-01',
    },
  ]);

  const generateClassCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    const newClassData = {
      id: (classes.length + 1).toString(),
      name: newClass.name,
      code: generateClassCode(),
      description: newClass.description,
      studentCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    
    setClasses([...classes, newClassData]);
    setNewClass({ name: '', description: '' });
    setShowCreateForm(false);
  };

  const copyClassCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Class Management</h2>
          <p className="mt-1 text-sm text-gray-600">
            Create and manage your classes
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Class
        </button>
      </div>

      {/* Create Class Form */}
      {showCreateForm && (
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Class</h3>
          <form onSubmit={handleCreateClass} className="space-y-4">
            <div>
              <label htmlFor="className" className="block text-sm font-medium text-gray-700">
                Class Name
              </label>
              <input
                type="text"
                id="className"
                required
                value={newClass.name}
                onChange={(e) => setNewClass(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="e.g., Math Grade 5A"
              />
            </div>
            <div>
              <label htmlFor="classDescription" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="classDescription"
                rows={3}
                value={newClass.description}
                onChange={(e) => setNewClass(prev => ({ ...prev, description: e.target.value }))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Brief description of the class"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create Class
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <div key={classItem.id} className="bg-white shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                      <Users className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{classItem.name}</h3>
                    <p className="text-sm text-gray-500">{classItem.studentCount} students</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-500">
                  <Settings className="h-5 w-5" />
                </button>
              </div>
              
              <p className="mt-4 text-sm text-gray-600">{classItem.description}</p>
              
              <div className="mt-4 bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Class Code</p>
                    <p className="text-lg font-mono font-bold text-gray-900">{classItem.code}</p>
                  </div>
                  <button
                    onClick={() => copyClassCode(classItem.code)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    {copiedCode === classItem.code ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="mt-4 flex space-x-2">
                <button className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <Users className="h-4 w-4 mr-2" />
                  Manage
                </button>
                <button className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
