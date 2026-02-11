import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Trophy, Target, TrendingUp, DollarSign, Users, Award, ChevronRight, Plus, Minus, Edit2, Share2, Eye, EyeOff } from 'lucide-react';

export default function XPenseApp() {
  const [activeView, setActiveView] = useState('dashboard');
  const [currentMonth, setCurrentMonth] = useState('February 2026');
  const [showValues, setShowValues] = useState(true);
  const [budgetData, setBudgetData] = useState({
    income: 5000,
    categories: [
      { name: 'Housing', budgeted: 1500, spent: 1450, color: '#FF6B9D' },
      { name: 'Food', budgeted: 600, spent: 720, color: '#C69FF8' },
      { name: 'Transportation', budgeted: 400, spent: 380, color: '#69D9FF' },
      { name: 'Investments', budgeted: 750, spent: 750, color: '#FFD93D' },
      { name: 'Entertainment', budgeted: 300, spent: 420, color: '#95E1D3' },
      { name: 'Shopping', budgeted: 250, spent: 180, color: '#FDA7DF' },
      { name: 'Healthcare', budgeted: 200, spent: 150, color: '#B4E7CE' },
      { name: 'Utilities', budgeted: 300, spent: 280, color: '#A8D8EA' },
      { name: 'Savings', budgeted: 700, spent: 700, color: '#FFB6B9' }
    ]
  });

  const [userScore, setUserScore] = useState(542);
  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, name: 'Sarah Chen', score: 785, streak: 6, avatar: '🏆' },
    { rank: 2, name: 'Marcus Johnson', score: 721, streak: 4, avatar: '🎯' },
    { rank: 3, name: 'You', score: 542, streak: 2, avatar: '⭐', isUser: true },
    { rank: 4, name: 'Emily Rodriguez', score: 498, streak: 3, avatar: '💪' },
    { rank: 5, name: 'David Kim', score: 445, streak: 1, avatar: '🚀' },
    { rank: 6, name: 'Lisa Thompson', score: 387, streak: 2, avatar: '✨' },
    { rank: 7, name: 'James Wilson', score: 312, streak: 1, avatar: '🎮' },
    { rank: 8, name: 'Anna Martinez', score: 256, streak: 0, avatar: '🌟' }
  ]);

  const [monthlyProgress, setMonthlyProgress] = useState([
    { month: 'Aug', score: 320 },
    { month: 'Sep', score: 425 },
    { month: 'Oct', score: 380 },
    { month: 'Nov', score: 510 },
    { month: 'Dec', score: 485 },
    { month: 'Jan', score: 542 }
  ]);

  const totalBudgeted = budgetData.categories.reduce((sum, cat) => sum + cat.budgeted, 0);
  const totalSpent = budgetData.categories.reduce((sum, cat) => sum + cat.spent, 0);
  const savingsRate = ((budgetData.income - totalSpent) / budgetData.income * 100).toFixed(1);

  const calculateCategoryPerformance = (budgeted, spent) => {
    const variance = ((spent - budgeted) / budgeted * 100);
    if (variance <= 0) return 'excellent';
    if (variance <= 5) return 'good';
    if (variance <= 15) return 'okay';
    return 'poor';
  };

  const getScoreColor = (score) => {
    if (score >= 700) return '#4ADE80';
    if (score >= 500) return '#FFD93D';
    if (score >= 300) return '#FFA726';
    return '#EF4444';
  };

  const DashboardView = () => (
    <div className="space-y-6">
      {/* Score Card */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-purple-200 text-sm font-medium mb-1">Your Budget Score</p>
              <h1 className="text-6xl font-black tracking-tight">{userScore}</h1>
              <p className="text-purple-200 text-sm mt-2">out of 800 points</p>
            </div>
            <div className="text-right">
              <Trophy className="w-16 h-16 mb-2 opacity-90" />
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
                Rank #{leaderboard.find(l => l.isUser)?.rank}
              </span>
            </div>
          </div>
          <div className="h-3 bg-white/20 rounded-full overflow-hidden mt-6">
            <div 
              className="h-full bg-gradient-to-r from-yellow-300 to-white rounded-full transition-all duration-1000"
              style={{ width: `${(userScore / 800) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border-2 border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Savings Rate</p>
              <p className="text-2xl font-black text-gray-900">{savingsRate}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-5 border-2 border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Budget Left</p>
              <p className="text-2xl font-black text-gray-900">
                {showValues ? `$${(totalBudgeted - totalSpent).toLocaleString()}` : '•••'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border-2 border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Award className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Win Streak</p>
              <p className="text-2xl font-black text-gray-900">2 months</p>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Overview */}
      <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-gray-900">Budget vs Actual</h2>
          <button 
            onClick={() => setShowValues(!showValues)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-200 transition-colors"
          >
            {showValues ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            {showValues ? 'Hide' : 'Show'} Values
          </button>
        </div>

        <div className="space-y-4">
          {budgetData.categories.map((category, idx) => {
            const performance = calculateCategoryPerformance(category.budgeted, category.spent);
            const percentSpent = (category.spent / category.budgeted) * 100;
            
            return (
              <div key={idx} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="font-bold text-gray-900">{category.name}</span>
                    {performance === 'excellent' && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">On Track!</span>}
                    {performance === 'poor' && <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-semibold">Over Budget</span>}
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-gray-900">
                      {showValues ? `$${category.spent}` : '•••'} / {showValues ? `$${category.budgeted}` : '•••'}
                    </span>
                  </div>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${Math.min(percentSpent, 100)}%`,
                      backgroundColor: category.color
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Spending Breakdown Pie Chart */}
      <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
        <h2 className="text-2xl font-black text-gray-900 mb-6">Spending Breakdown</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={budgetData.categories}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="spent"
            >
              {budgetData.categories.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Progress Chart */}
      <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
        <h2 className="text-2xl font-black text-gray-900 mb-6">Score Progress</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthlyProgress}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#888" />
            <YAxis stroke="#888" domain={[0, 800]} />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="#8B5CF6" 
              strokeWidth={3}
              dot={{ fill: '#8B5CF6', r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const LeaderboardView = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-3xl p-8 text-white">
        <div className="flex items-center gap-4">
          <Trophy className="w-12 h-12" />
          <div>
            <h1 className="text-3xl font-black">Monthly Leaderboard</h1>
            <p className="text-white/90 font-medium">Top budget masters this month</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden">
        {leaderboard.map((player, idx) => (
          <div 
            key={idx}
            className={`flex items-center justify-between p-5 border-b border-gray-100 last:border-b-0 transition-all ${
              player.isUser ? 'bg-purple-50 border-l-4 border-l-purple-500' : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-4 flex-1">
              <div className={`text-2xl font-black ${
                player.rank === 1 ? 'text-yellow-500' :
                player.rank === 2 ? 'text-gray-400' :
                player.rank === 3 ? 'text-orange-600' :
                'text-gray-400'
              }`}>
                #{player.rank}
              </div>
              
              <div className="text-3xl">{player.avatar}</div>
              
              <div className="flex-1">
                <p className="font-bold text-gray-900 text-lg">
                  {player.name}
                  {player.isUser && <span className="ml-2 text-xs bg-purple-500 text-white px-2 py-1 rounded-full">You</span>}
                </p>
                <p className="text-sm text-gray-500">
                  {player.streak > 0 ? `🔥 ${player.streak} month streak` : 'Building momentum'}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-3xl font-black" style={{ color: getScoreColor(player.score) }}>
                {player.score}
              </p>
              <p className="text-xs text-gray-500 font-medium">points</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-100">
        <h3 className="text-xl font-black text-gray-900 mb-3">🎯 Weekly Challenge</h3>
        <p className="text-gray-700 mb-4">
          Keep your food budget under 25% this week and earn <span className="font-black text-purple-600">+50 bonus points</span>!
        </p>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: '60%' }} />
          </div>
          <span className="text-sm font-bold text-gray-700">3 days left</span>
        </div>
      </div>
    </div>
  );

  const BudgetCreatorView = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-400 to-teal-500 rounded-3xl p-8 text-white">
        <h1 className="text-3xl font-black mb-2">Create Your Budget</h1>
        <p className="text-white/90 font-medium">Plan your spending for {currentMonth}</p>
      </div>

      <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
        <h2 className="text-xl font-black text-gray-900 mb-4">Monthly Income</h2>
        <div className="relative">
          <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="number"
            value={budgetData.income}
            onChange={(e) => setBudgetData({ ...budgetData, income: parseInt(e.target.value) || 0 })}
            className="w-full pl-12 pr-4 py-4 text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-gray-900">Budget Categories</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-xl font-semibold hover:bg-purple-600 transition-colors">
            <Plus className="w-4 h-4" />
            Add Category
          </button>
        </div>

        <div className="space-y-4">
          {budgetData.categories.map((category, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div 
                className="w-6 h-6 rounded-full flex-shrink-0"
                style={{ backgroundColor: category.color }}
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={category.name}
                  className="w-full font-bold text-gray-900 bg-transparent border-none focus:outline-none"
                  onChange={(e) => {
                    const newCategories = [...budgetData.categories];
                    newCategories[idx].name = e.target.value;
                    setBudgetData({ ...budgetData, categories: newCategories });
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  value={category.budgeted}
                  className="w-28 px-3 py-2 font-bold border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  onChange={(e) => {
                    const newCategories = [...budgetData.categories];
                    newCategories[idx].budgeted = parseInt(e.target.value) || 0;
                    setBudgetData({ ...budgetData, categories: newCategories });
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t-2 border-gray-200">
          <div className="flex items-center justify-between text-lg">
            <span className="font-black text-gray-900">Total Budgeted</span>
            <span className="font-black text-gray-900">${totalBudgeted.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-gray-500">Remaining Income</span>
            <span className={`font-bold ${budgetData.income - totalBudgeted >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${(budgetData.income - totalBudgeted).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <button className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-black text-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl">
        Save Budget for {currentMonth}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-black text-xl">
                X
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  XPense
                </h1>
                <p className="text-xs text-gray-500 font-semibold">Budget Smarter, Live Better</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button className="px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all">
                Link Bank Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b-2 border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
              { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
              { id: 'budget', label: 'Create Budget', icon: Target }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-bold transition-all border-b-4 ${
                  activeView === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {activeView === 'dashboard' && <DashboardView />}
        {activeView === 'leaderboard' && <LeaderboardView />}
        {activeView === 'budget' && <BudgetCreatorView />}
      </div>

      {/* Footer */}
      <div className="bg-white border-t-2 border-gray-100 mt-12">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-500 font-medium mb-2">
              XPense - Smart Budget Tracking & Gamification
            </p>
            <p className="text-xs text-gray-400">
              Helping everyone achieve financial independence through gamification
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}