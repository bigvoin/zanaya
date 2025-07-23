import React, { useState } from 'react';
import { Plus, Users, Award, MessageSquare, BookOpen, Share2 } from 'lucide-react';
import ClassManagement from './ClassManagement';
import StudentPoints from './StudentPoints';

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const stats = {
    totalClasses: 3,
    totalStudents: 67,
    pointsAwarded: 1247,
    announcements: 12,
  };

  const recentActivity = [
    { id: '1', type: 'point', student: 'Alex Chen', action: 'Awarded +2 points for helping classmate', time: '2 minutes ago' },
    { id: '2', type: 'message', student: 'Maria Garcia', action: 'New message from parent', time: '15 minutes ago' },
    { id: '3', type: 'point', student: 'James Wilson', action: 'Awarded +1 point for good listening', time: '1 hour ago' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'classes', label: 'Classes', icon: Users },
    { id: 'points', label: 'Points', icon: Award },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-lg p-6 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Teacher Dashboard</h1>
        <p className="text-purple-100">Manage your classes and engage with students</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stats.totalClasses}</p>
                  <p className="text-sm text-gray-600">Total Classes</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-emerald-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
                  <p className="text-sm text-gray-600">Total Students</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Award className="h-8 w-8 text-amber-500" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stats.pointsAwarded}</p>
                  <p className="text-sm text-gray-600">Points Awarded</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <MessageSquare className="h-8 w-8 text-pink-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stats.announcements}</p>
                  <p className="text-sm text-gray-600">Announcements</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'point' ? 'bg-yellow-100' : 'bg-blue-100'
                    }`}>
                      {activity.type === 'point' ? (
                        <Award className="h-4 w-4 text-yellow-600" />
                      ) : (
                        <MessageSquare className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.student}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'classes' && <ClassManagement />}
      {activeTab === 'points' && <StudentPoints />}

      {activeTab === 'messages' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center py-12">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No messages yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Messages from parents and students will appear here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
