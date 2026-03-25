'use client'

import { useState } from 'react'
import { Users, MessageCircle, ThumbsUp, Share2, Plus, Search, Award } from 'lucide-react'
import { useAuth } from '@/lib/auth'

interface Post {
  id: string
  title: string
  author: string
  authorRole: string
  avatar?: string
  content: string
  category: string
  timestamp: string
  likes: number
  replies: number
  isExpert: boolean
  upvoted: boolean
}

interface Discussion {
  id: string
  question: string
  author: string
  replies: number
  views: number
  lastActive: string
  solved: boolean
}

const communityPosts: Post[] = [
  {
    id: '1',
    title: 'How to Prevent Wheat Blast Disease?',
    author: 'Farmer Rajesh',
    authorRole: 'Farmer',
    content:
      'My wheat crop is showing brown spots on leaves. Is it blast disease? How to prevent it from spreading?',
    category: 'Disease Prevention',
    timestamp: '2 hours ago',
    likes: 24,
    replies: 8,
    isExpert: false,
    upvoted: false,
  },
  {
    id: '2',
    title: 'Best Time to Start Drip Irrigation',
    author: 'Dr. Agriculture',
    authorRole: 'Expert',
    content:
      'Drip irrigation should be started when soil moisture drops below 50-60%. The best time is early morning to maximize water retention.',
    category: 'Irrigation',
    timestamp: '1 hour ago',
    likes: 156,
    replies: 32,
    isExpert: true,
    upvoted: false,
  },
  {
    id: '3',
    title: 'Success Story: 3x Yield Increase with Organic Farming',
    author: 'Farmer Priya',
    authorRole: 'Farmer',
    content:
      'Started organic farming 2 years ago. Now getting 30 quintals/acre instead of 10. Here\'s my detailed plan...',
    category: 'Success Stories',
    timestamp: '4 hours ago',
    likes: 342,
    replies: 78,
    isExpert: false,
    upvoted: false,
  },
  {
    id: '4',
    title: 'Cotton Pickling Guidelines and Best Practices',
    author: 'Cotton Expert',
    authorRole: 'Expert',
    content:
      'For best quality cotton, pick when bolls are 75% opened. Avoid picking in morning dew or evening moisture.',
    category: 'Crop Management',
    timestamp: '6 hours ago',
    likes: 89,
    replies: 15,
    isExpert: true,
    upvoted: false,
  },
]

const discussions: Discussion[] = [
  {
    id: '1',
    question: 'What is the minimum temperature for rice germination?',
    author: 'Student Farmer',
    replies: 5,
    views: 245,
    lastActive: '1 hour',
    solved: true,
  },
  {
    id: '2',
    question: 'How much nitrogen fertilizer for wheat per acre?',
    author: 'New Farmer',
    replies: 12,
    views: 892,
    lastActive: '30 min',
    solved: true,
  },
  {
    id: '3',
    question: 'Anyone using AI pest detection? Any recommendations?',
    author: 'Tech Farmer',
    replies: 8,
    views: 156,
    lastActive: '15 min',
    solved: false,
  },
]

const topExperts = [
  {
    name: 'Dr. Rajesh Kumar',
    title: 'Agricultural Scientist',
    answers: 342,
    reputation: 12500,
  },
  {
    name: 'Prof. Priya Singh',
    title: 'Soil Expert',
    answers: 287,
    reputation: 10200,
  },
  {
    name: 'Farmer Harjeet',
    title: 'Organic Farming Expert',
    answers: 156,
    reputation: 8900,
  },
]

export default function CommunityPage() {
  const { user } = useAuth()
  const [tab, setTab] = useState<'feed' | 'discussions' | 'experts'>('feed')
  const [showNewPost, setShowNewPost] = useState(false)
  const [posts, setPosts] = useState(communityPosts)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.upvoted ? post.likes - 1 : post.likes + 1,
              upvoted: !post.upvoted,
            }
          : post
      )
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-12">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Community</h1>
          </div>
          <p className="text-purple-100">
            Connect with farmers, share experiences, and learn from experts
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto border-b border-gray-200">
          <button
            onClick={() => setTab('feed')}
            className={`px-6 py-3 font-semibold whitespace-nowrap border-b-2 transition ${
              tab === 'feed'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600'
            }`}
          >
            <MessageCircle className="w-4 h-4 inline mr-2" />
            Feed
          </button>
          <button
            onClick={() => setTab('discussions')}
            className={`px-6 py-3 font-semibold whitespace-nowrap border-b-2 transition ${
              tab === 'discussions'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600'
            }`}
          >
            Q&A
          </button>
          <button
            onClick={() => setTab('experts')}
            className={`px-6 py-3 font-semibold whitespace-nowrap border-b-2 transition ${
              tab === 'experts'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600'
            }`}
          >
            <Award className="w-4 h-4 inline mr-2" />
            Top Experts
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {(tab === 'feed' || tab === 'discussions') && (
              <>
                {/* Post/Question Button */}
                <button
                  onClick={() => setShowNewPost(!showNewPost)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:shadow-lg transition"
                >
                  <Plus className="w-5 h-5" />
                  {tab === 'feed'
                    ? 'Share Your Experience'
                    : 'Ask a Question'}
                </button>

                {/* New Post Form */}
                {showNewPost && (
                  <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-purple-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      {tab === 'feed'
                        ? 'Share Your Story'
                        : 'Ask the Community'}
                    </h3>
                    <form className="space-y-6">
                      <input
                        type="text"
                        placeholder={
                          tab === 'feed'
                            ? 'What do you want to share?'
                            : 'What do you want to ask?'
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none text-lg font-semibold"
                      />
                      <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none">
                        <option>Select Category</option>
                        <option>Crop Management</option>
                        <option>Disease Prevention</option>
                        <option>Irrigation</option>
                        <option>Fertilization</option>
                        <option>Success Stories</option>
                        <option>Ask Expert</option>
                      </select>
                      <textarea
                        placeholder="Share details, tips, questions, or experiences..."
                        rows={6}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none"
                      />
                      <div className="flex gap-4">
                        <button
                          type="submit"
                          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                        >
                          {tab === 'feed' ? 'Post' : 'Ask'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowNewPost(false)}
                          className="px-6 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none"
                  />
                </div>
              </>
            )}

            {/* Feed Tab */}
            {tab === 'feed' && (
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">
                            {post.title}
                          </h3>
                          {post.isExpert && (
                            <Award className="w-5 h-5 text-yellow-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <span className="font-semibold">{post.author}</span>
                          <span>•</span>
                          <span>{post.authorRole}</span>
                          <span>•</span>
                          <span>{post.timestamp}</span>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                        {post.category}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-6 line-clamp-3">
                      {post.content}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-6">
                        <button
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center gap-2 text-sm transition ${
                            post.upvoted
                              ? 'text-pink-600'
                              : 'text-gray-600 hover:text-pink-600'
                          }`}
                        >
                          <ThumbsUp className="w-4 h-4" />
                          {post.likes}
                        </button>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MessageCircle className="w-4 h-4" />
                          {post.replies}
                        </div>
                      </div>
                      <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 transition">
                        <Share2 className="w-4 h-4" />
                        Share
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Discussions Tab */}
            {tab === 'discussions' && (
              <div className="space-y-4">
                {discussions.map((discussion) => (
                  <div
                    key={discussion.id}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {discussion.question}
                        </h3>
                        <p className="text-sm text-gray-600">by {discussion.author}</p>
                      </div>
                      {discussion.solved && (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                          ✓ Solved
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <div className="space-x-4 text-sm text-gray-600">
                        <span>
                          <strong>{discussion.views}</strong> views
                        </span>
                        <span>
                          <strong>{discussion.replies}</strong> answers
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Active {discussion.lastActive} ago
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Rules */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600">
              <h3 className="text-lg font-bold text-gray-900 mb-4">📋 Community Rules</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Be respectful to all members</li>
                <li>• Share verified information</li>
                <li>• No spam or advertisements</li>
                <li>• Help fellow farmers learn</li>
                <li>• Share your experiences</li>
                <li>• Ask questions courteously</li>
              </ul>
            </div>

            {/* Top Experts */}
            {tab === 'experts' ? (
              <div className="space-y-4">
                {topExperts.map((expert, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-lg p-6 border-2 border-yellow-200"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="px-3 py-1 bg-yellow-100 rounded-full">
                        <span className="text-xl font-bold text-yellow-600">#{idx + 1}</span>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{expert.name}</p>
                        <p className="text-xs text-gray-600">{expert.title}</p>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-gray-700">
                      <p>
                        <span className="font-semibold">{expert.answers}</span> helpful answers
                      </p>
                      <p>
                        <span className="font-semibold">{expert.reputation}</span> reputation
                      </p>
                    </div>

                    <button className="w-full mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm">
                      Message
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-yellow-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  Top Experts
                </h3>
                <div className="space-y-3">
                  {topExperts.map((expert, idx) => (
                    <div key={idx} className="pb-3 border-b border-gray-200 last:border-0">
                      <p className="font-semibold text-sm text-gray-900">
                        #{idx + 1} {expert.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {expert.answers} answers • {expert.reputation} rep
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Categories */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Categories</h3>
              <div className="space-y-2">
                {[
                  'Crop Management',
                  'Disease Prevention',
                  'Irrigation',
                  'Fertilization',
                  'Success Stories',
                ].map((cat) => (
                  <button
                    key={cat}
                    className="w-full text-left px-3 py-2 hover:bg-purple-50 rounded transition text-sm text-gray-700"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
