import React, { useState } from 'react';
import { User, TrendingUp, MessageSquare, Calendar, Award, AlertCircle } from 'lucide-react';

export default function ParentDashboard() {
  const [selectedChild, setSelectedChild] = useState('1');
  
  // Mock data
  const children = [
    { id: '1', name: 'Alex Chen', grade: '5th Grade', class: 'Ms. Johnson', avatar: 'AC' },
    { id: '2', name: 'Emma Chen', grade: '3rd Grade', class: 'Mr. Davis', avatar: 'EC' },
  ];

  const childData = {
    '1': {
      totalPoints: 87,
      weeklyPoints: 12,
      monthlyTrend: '+15%',
      recentActivity: [
        { id: '1', type: 'point', points: 3, reason: 'Outstanding presentation on solar system', teacher: 'Ms. Johnson', date: '2024-01-15' },
        { id: '2', type: 'point', points: 2, reason: 'Excellent teamwork during group project', teacher: 'Ms. Johnson', date: '2024-01-14' },
        { id: '3', type: 'improvement', points: -1, reason: 'Remember to raise hand before speaking', teacher: 'Ms. Johnson', date: '2024-01-13' },
        { id: '4', type: 'message', content: 'Alex did great in math today!', teacher: 'Ms. Johnson', date: '2024-01-12' },
      ],
      behaviorBreakdown: {
        positive: 45,
        needsWork: 3,
        categories: {
          'Academic Performance': 25,
          'Participation': 18,
          'Teamwork': 12,
          'Behavior': 8,
        }
      }
    },
    '2': {
      totalPoints: 62,
      weeklyPoints: 8,
      monthlyTrend: '+8%',
      recentActivity: [
        { id: '1', type: 'point', points: 2, reason: 'Great reading progress', teacher: 'Mr. Davis', date: '2024-01-15' },
        { id: '2', type: 'point', points: 1, reason: 'Kind to classmates', teacher: 'Mr. Davis', date: '2024-01-14' },
      ],
      behaviorBreakdown: {
        positive: 32,
        needsWork: 2,
        categories: {
          'Academic Performance': 20,
          'Participation': 15,
          'Teamwork': 10,
          'Behavior': 9,
        }
      }
    }
  };

  const currentChild = children.find(child => child.id === selectedChild);
  const currentData = childData[selectedChild as keyof typeof childData];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-lg p-6 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Parent Dashboard</h1>
        <p className="text-violet-100">Stay connected with your child's educational journey</p>
      </div>

      {/* Child Selector */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Child:</label>
        <div className="flex space-x-4">
          {children.map((child) => (
            <button
              key={child.id}
              onClick={() => setSelectedChild(child.id)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg border-2 transition-all ${
                selectedChild === child.id
                  ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">{child.avatar}</span>
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">{child.name}</p>
                <p className="text-sm text-gray-600">{child.grade} • {child.class}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Award className="h-8 w-8 text-amber-500" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{currentData.totalPoints}</p>
              <p className="text-sm text-gray-600">Total Points</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-emerald-500" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">+{currentData.weeklyPoints}</p>
              <p className="text-sm text-gray-600">This Week</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-cyan-500" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{currentData.monthlyTrend}</p>
              <p className="text-sm text-gray-600">Monthly Trend</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <MessageSquare className="h-8 w-8 text-rose-500" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-gray-600">New Messages</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {currentData.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {activity.type === 'point' ? (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.points && activity.points > 0 ? 'bg-green-100' : 'bg-orange-100'
                    }`}>
                      <span className={`text-sm font-bold ${
                        activity.points && activity.points > 0 ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        {activity.points && activity.points > 0 ? '+' : ''}{activity.points}
                      </span>
                    </div>
                  ) : activity.type === 'message' ? (
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.reason || activity.content}
                  </p>
                  <p className="text-xs text-gray-600">From {activity.teacher}</p>
                  <p className="text-xs text-gray-400">{new Date(activity.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Behavior Breakdown */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Behavior Summary</h2>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Progress</span>
              <span className="text-sm text-gray-600">
                {Math.round((currentData.behaviorBreakdown.positive / (currentData.behaviorBreakdown.positive + currentData.behaviorBreakdown.needsWork)) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-500"
                style={{ 
                  width: `${(currentData.behaviorBreakdown.positive / (currentData.behaviorBreakdown.positive + currentData.behaviorBreakdown.needsWork)) * 100}%` 
                }}
              ></div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Positive Behaviors</span>
              </div>
              <span className="text-sm font-bold text-emerald-600">{currentData.behaviorBreakdown.positive}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Areas for Growth</span>
              </div>
              <span className="text-sm font-bold text-rose-600">{currentData.behaviorBreakdown.needsWork}</span>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Category Breakdown</h3>
            <div className="space-y-2">
              {Object.entries(currentData.behaviorBreakdown.categories).map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">{category}</span>
                  <span className="text-xs font-medium text-gray-900">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Communication Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Communication</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <MessageSquare className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Message Teacher</p>
            <p className="text-xs text-gray-600">Send a message to {currentChild?.class}</p>
          </button>
          
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Schedule Meeting</p>
            <p className="text-xs text-gray-600">Request parent-teacher conference</p>
          </button>
        </div>
      </div>
    </div>
  );
}
