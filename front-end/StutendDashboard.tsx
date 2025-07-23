import React from 'react';
import { Award, TrendingUp, Star, MessageSquare, Calendar, Target } from 'lucide-react';

export default function StudentDashboard() {
  // Mock data
  const studentStats = {
    totalPoints: 87,
    weeklyPoints: 12,
    rank: 3,
    totalStudents: 24,
  };

  const recentPoints = [
    { id: '1', points: 3, reason: 'Outstanding presentation on solar system', teacher: 'Ms. Johnson', date: '2024-01-15', type: 'positive' },
    { id: '2', points: 2, reason: 'Excellent teamwork during group project', teacher: 'Mr. Davis', date: '2024-01-14', type: 'positive' },
    { id: '3', points: -1, reason: 'Remember to raise hand before speaking', teacher: 'Ms. Johnson', date: '2024-01-13', type: 'improvement' },
    { id: '4', points: 1, reason: 'Good listening during story time', teacher: 'Mrs. Smith', date: '2024-01-12', type: 'positive' },
  ];

  const achievements = [
    { id: '1', title: 'Team Player', description: 'Helped classmates 5 times this week', icon: '🤝', unlocked: true },
    { id: '2', title: 'Math Wizard', description: 'Solved 10 math problems correctly', icon: '🧮', unlocked: true },
    { id: '3', title: 'Reading Star', description: 'Read 5 books this month', icon: '📚', unlocked: false },
    { id: '4', title: 'Science Explorer', description: 'Asked great questions in science', icon: '🔬', unlocked: true },
  ];

  const announcements = [
    { id: '1', title: 'Science Fair Next Week', message: 'Don\'t forget to bring your projects on Friday!', teacher: 'Ms. Johnson', time: '2 hours ago' },
    { id: '2', title: 'Library Visit Tomorrow', message: 'We\'ll be visiting the school library for story time.', teacher: 'Mrs. Smith', time: '5 hours ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-lg p-6 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, Alex! 👋</h1>
            <p className="text-emerald-100">You're doing amazing! Keep up the great work.</p>
          </div>
          <div className="mt-4 sm:mt-0 text-center">
            <div className="text-3xl font-bold">{studentStats.totalPoints}</div>
            <div className="text-sm text-green-100">Total Points</div>
          </div>
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
              <p className="text-2xl font-bold text-gray-900">{studentStats.totalPoints}</p>
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
              <p className="text-2xl font-bold text-gray-900">+{studentStats.weeklyPoints}</p>
              <p className="text-sm text-gray-600">This Week</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Star className="h-8 w-8 text-violet-500" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">#{studentStats.rank}</p>
              <p className="text-sm text-gray-600">Class Rank</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Target className="h-8 w-8 text-indigo-500" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-gray-600">Achievements</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Points */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Feedback</h2>
          <div className="space-y-4">
            {recentPoints.map((point) => (
              <div key={point.id} className="flex items-start space-x-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  point.type === 'positive' ? 'bg-green-100' : 'bg-orange-100'
                }`}>
                  <span className={`text-sm font-bold ${
                    point.type === 'positive' ? 'text-green-600' : 'text-orange-600'
                  }`}>
                    {point.points > 0 ? '+' : ''}{point.points}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{point.reason}</p>
                  <p className="text-xs text-gray-600">From {point.teacher}</p>
                  <p className="text-xs text-gray-400">{new Date(point.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h2>
          <div className="grid grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 text-center transition-all ${
                  achievement.unlocked
                    ? 'border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50'
                    : 'border-gray-200 bg-gray-50 opacity-50'
                }`}
              >
                <div className="text-2xl mb-2">{achievement.icon}</div>
                <h3 className="font-medium text-sm text-gray-900 mb-1">{achievement.title}</h3>
                <p className="text-xs text-gray-600">{achievement.description}</p>
                {achievement.unlocked && (
                  <div className="mt-2">
                    <Star className="h-4 w-4 text-amber-500 mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Announcements */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Class Announcements</h2>
          <MessageSquare className="h-5 w-5 text-gray-400" />
        </div>
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="border-l-4 border-gradient-to-b from-purple-500 to-pink-500 bg-gradient-to-r from-purple-50 to-pink-50 rounded-r-lg pl-4 py-3">
              <h3 className="font-medium text-gray-900">{announcement.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{announcement.message}</p>
              <p className="text-xs text-gray-500 mt-2">
                {announcement.teacher} • {announcement.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
