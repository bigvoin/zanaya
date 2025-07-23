import React, { useState } from 'react';
import { Award, Plus, TrendingUp, Filter, Search } from 'lucide-react';

export default function StudentPoints() {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [pointType, setPointType] = useState<'positive' | 'improvement'>('positive');
  const [pointValue, setPointValue] = useState(1);
  const [pointReason, setPointReason] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const students = [
    { id: '1', name: 'Alex Chen', totalPoints: 45, recentActivity: 8, avatar: 'AC' },
    { id: '2', name: 'Maria Garcia', totalPoints: 52, recentActivity: 12, avatar: 'MG' },
    { id: '3', name: 'James Wilson', totalPoints: 38, recentActivity: 5, avatar: 'JW' },
    { id: '4', name: 'Sofia Rodriguez', totalPoints: 47, recentActivity: 9, avatar: 'SR' },
    { id: '5', name: 'Ethan Brown', totalPoints: 41, recentActivity: 7, avatar: 'EB' },
    { id: '6', name: 'Isabella Lee', totalPoints: 55, recentActivity: 15, avatar: 'IL' },
  ];

  const recentPoints = [
    { id: '1', student: 'Alex Chen', points: 2, reason: 'Excellent teamwork', type: 'positive', time: '2 hours ago' },
    { id: '2', student: 'Maria Garcia', points: 1, reason: 'Good listening skills', type: 'positive', time: '3 hours ago' },
    { id: '3', student: 'James Wilson', points: -1, reason: 'Needs to focus more', type: 'improvement', time: '5 hours ago' },
    { id: '4', student: 'Sofia Rodriguez', points: 3, reason: 'Outstanding presentation', type: 'positive', time: '1 day ago' },
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAwardPoints = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent || !pointReason) return;
    
    // In a real app, this would make an API call
    console.log('Awarding points:', {
      studentId: selectedStudent,
      points: pointType === 'positive' ? pointValue : -pointValue,
      reason: pointReason,
      type: pointType,
    });
    
    // Reset form
    setSelectedStudent(null);
    setPointValue(1);
    setPointReason('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Student Points</h2>
        <p className="mt-1 text-sm text-gray-600">
          Award points and track student behavior
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Students List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Students Grid */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Students</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                    selectedStudent === student.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                  onClick={() => setSelectedStudent(student.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-white">{student.avatar}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{student.name}</p>
                        <p className="text-xs text-gray-500">Total: {student.totalPoints} points</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-lg font-bold text-emerald-600">{student.totalPoints}</p>
                        <p className="text-xs text-gray-500">Total</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-cyan-600">+{student.recentActivity}</p>
                        <p className="text-xs text-gray-500">This week</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Award Points Form */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Award Points</h3>
            
            {!selectedStudent ? (
              <div className="text-center py-8">
                <Award className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Select a student</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Choose a student from the list to award points.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAwardPoints} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Point Type</label>
                  <div className="mt-1 flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="positive"
                        checked={pointType === 'positive'}
                        onChange={(e) => setPointType(e.target.value as 'positive')}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Positive</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="improvement"
                        checked={pointType === 'improvement'}
                        onChange={(e) => setPointType(e.target.value as 'improvement')}
                        className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Needs Work</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Points</label>
                  <select
                    value={pointValue}
                    onChange={(e) => setPointValue(parseInt(e.target.value))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value={1}>1 point</option>
                    <option value={2}>2 points</option>
                    <option value={3}>3 points</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Reason</label>
                  <input
                    type="text"
                    required
                    value={pointReason}
                    onChange={(e) => setPointReason(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="e.g., Great participation"
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                    pointType === 'positive'
                      ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                      : 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500'
                  }`}
                >
                  <Award className="h-4 w-4 mr-2" />
                  Award {pointType === 'positive' ? '+' : '-'}{pointValue} Point{pointValue > 1 ? 's' : ''}
                </button>
              </form>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentPoints.map((point) => (
                <div key={point.id} className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                    point.type === 'positive' ? 'bg-green-100' : 'bg-orange-100'
                  }`}>
                    <span className={`text-xs font-bold ${
                      point.type === 'positive' ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {point.points > 0 ? '+' : ''}{point.points}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{point.student}</p>
                    <p className="text-xs text-gray-600">{point.reason}</p>
                    <p className="text-xs text-gray-400">{point.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
