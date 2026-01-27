"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/components/ThemeProvider';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';
import { usePullToRefresh } from '@/hooks/useMobileOptimizations';
import { MobileNavigationWrapper } from '@/components/MobileNavigation';
import MobileCard, { MobileCardGrid, MobileCardList } from '@/components/MobileCard';
import { MobileLoadingStates } from '@/components/MobileLoading';
import { getMaintenanceStats } from '@/lib/data';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  badge?: number;
  color: string;
}

interface RecentActivity {
  id: string;
  title: string;
  description: string;
  time: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export default function MobileDashboard() {
  const router = useRouter();
  const { themeConfig } = useTheme();
  const { isMobile } = useMobileOptimizations();
  const [stats, setStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    inProgressRequests: 0,
    completedRequests: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Pull to refresh functionality
  const { isPulling, pullProgress, isRefreshing } = usePullToRefresh(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  });

  const loadData = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const realStats = getMaintenanceStats();
      setStats(realStats);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const quickActions: QuickAction[] = [
    {
      id: 'new-request',
      title: 'New Request',
      description: 'Submit a maintenance request',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      href: '/student',
      color: themeConfig.colors.primary,
    },
    {
      id: 'history',
      title: 'History',
      description: 'View request history',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      href: '/student/history',
      color: themeConfig.colors.success,
    },
    {
      id: 'emergency',
      title: 'Emergency',
      description: 'Report urgent issues',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ),
      href: '/emergency',
      color: themeConfig.colors.error,
      badge: 1,
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'Manage preferences',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      href: '/settings',
      color: themeConfig.colors.accent,
    },
  ];

  const recentActivity: RecentActivity[] = [
    {
      id: '1',
      title: 'Air Conditioning Repair',
      description: 'Room 201 - AC unit not cooling',
      time: '2 hours ago',
      status: 'in-progress',
    },
    {
      id: '2',
      title: 'Light Bulb Replacement',
      description: 'Hallway B - Flickering lights',
      time: '5 hours ago',
      status: 'completed',
    },
    {
      id: '3',
      title: 'Plumbing Issue',
      description: 'Restroom 3F - Leaking faucet',
      time: '1 day ago',
      status: 'pending',
    },
  ];

  const getStatusColor = (status: RecentActivity['status']) => {
    switch (status) {
      case 'completed':
        return themeConfig.colors.success;
      case 'in-progress':
        return themeConfig.colors.warning;
      default:
        return themeConfig.colors.textSecondary;
    }
  };

  const getStatusText = (status: RecentActivity['status']) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      default:
        return 'Pending';
    }
  };

  if (loading) {
    return (
      <MobileNavigationWrapper>
        <div className="min-h-screen" style={{ backgroundColor: themeConfig.colors.background }}>
          <MobileLoadingStates.Dashboard />
        </div>
      </MobileNavigationWrapper>
    );
  }

  return (
    <MobileNavigationWrapper>
      <div className="min-h-screen" style={{ backgroundColor: themeConfig.colors.background }}>
        {/* Header */}
        <div
          className="mobile-safe-padding-top px-4 py-6 border-b"
          style={{ borderColor: themeConfig.colors.border }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1
                className="text-2xl font-bold"
                style={{ color: themeConfig.colors.text }}
              >
                Dashboard
              </h1>
              <p
                className="text-sm mt-1"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                Welcome back! Here's your overview.
              </p>
            </div>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${themeConfig.colors.primary}20` }}
            >
              <svg
                className="w-5 h-5"
                style={{ color: themeConfig.colors.primary }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 py-4 space-y-6">
          {/* Stats Grid */}
          <MobileCardGrid columns={2}>
            <MobileCard variant="compact">
              <div className="text-center">
                <div
                  className="text-2xl font-bold mb-1"
                  style={{ color: themeConfig.colors.text }}
                >
                  {stats.totalRequests}
                </div>
                <div
                  className="text-xs"
                  style={{ color: themeConfig.colors.textSecondary }}
                >
                  Total Requests
                </div>
              </div>
            </MobileCard>
            
            <MobileCard variant="compact" status="warning">
              <div className="text-center">
                <div
                  className="text-2xl font-bold mb-1"
                  style={{ color: themeConfig.colors.text }}
                >
                  {stats.pendingRequests}
                </div>
                <div
                  className="text-xs"
                  style={{ color: themeConfig.colors.textSecondary }}
                >
                  Pending
                </div>
              </div>
            </MobileCard>
            
            <MobileCard variant="compact" status="default">
              <div className="text-center">
                <div
                  className="text-2xl font-bold mb-1"
                  style={{ color: themeConfig.colors.text }}
                >
                  {stats.inProgressRequests}
                </div>
                <div
                  className="text-xs"
                  style={{ color: themeConfig.colors.textSecondary }}
                >
                  In Progress
                </div>
              </div>
            </MobileCard>
            
            <MobileCard variant="compact" status="success">
              <div className="text-center">
                <div
                  className="text-2xl font-bold mb-1"
                  style={{ color: themeConfig.colors.text }}
                >
                  {stats.completedRequests}
                </div>
                <div
                  className="text-xs"
                  style={{ color: themeConfig.colors.textSecondary }}
                >
                  Completed
                </div>
              </div>
            </MobileCard>
          </MobileCardGrid>

          {/* Quick Actions */}
          <div>
            <h2
              className="text-lg font-semibold mb-3"
              style={{ color: themeConfig.colors.text }}
            >
              Quick Actions
            </h2>
            <MobileCardGrid columns={2}>
              {quickActions.map((action) => (
                <MobileCard
                  key={action.id}
                  onClick={() => router.push(action.href)}
                  badge={action.badge}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${action.color}20` }}
                    >
                      <div style={{ color: action.color }}>{action.icon}</div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3
                        className="font-medium text-sm truncate"
                        style={{ color: themeConfig.colors.text }}
                      >
                        {action.title}
                      </h3>
                      <p
                        className="text-xs truncate"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        {action.description}
                      </p>
                    </div>
                  </div>
                </MobileCard>
              ))}
            </MobileCardGrid>
          </div>

          {/* Recent Activity */}
          <div>
            <h2
              className="text-lg font-semibold mb-3"
              style={{ color: themeConfig.colors.text }}
            >
              Recent Activity
            </h2>
            <MobileCardList>
              {recentActivity.map((activity) => (
                <MobileCard
                  key={activity.id}
                  variant="compact"
                  status={activity.status === 'completed' ? 'success' : activity.status === 'in-progress' ? 'warning' : 'default'}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: `${getStatusColor(activity.status)}20` }}
                    >
                      <svg
                        className="w-4 h-4"
                        style={{ color: getStatusColor(activity.status) }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4
                        className="font-medium text-sm truncate"
                        style={{ color: themeConfig.colors.text }}
                      >
                        {activity.title}
                      </h4>
                      <p
                        className="text-xs truncate mb-1"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        {activity.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span
                          className="text-xs"
                          style={{ color: themeConfig.colors.textSecondary }}
                        >
                          {activity.time}
                        </span>
                        <span
                          className="text-xs font-medium px-2 py-1 rounded-full"
                          style={{
                            backgroundColor: `${getStatusColor(activity.status)}20`,
                            color: getStatusColor(activity.status),
                          }}
                        >
                          {getStatusText(activity.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                </MobileCard>
              ))}
            </MobileCardList>
          </div>
        </div>

        {/* Pull to Refresh Indicator */}
        {(isPulling || isRefreshing) && (
          <div
            className="fixed top-0 left-0 right-0 z-30 flex items-center justify-center pointer-events-none mobile-safe-padding-top"
            style={{
              transform: `translateY(${isPulling ? Math.min(pullProgress * 60, 60) : 0}px)`,
              opacity: isPulling ? pullProgress : 1,
            }}
          >
            <div
              className="flex items-center space-x-2 px-4 py-2 rounded-full"
              style={{
                backgroundColor: themeConfig.colors.surface,
                border: `1px solid ${themeConfig.colors.border}`,
              }}
            >
              {isRefreshing ? (
                <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: themeConfig.colors.primary }} />
              ) : (
                <svg
                  className="w-4 h-4 transition-transform duration-200"
                  style={{
                    color: themeConfig.colors.primary,
                    transform: `rotate(${pullProgress * 180}deg)`,
                  }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              )}
              <span
                className="text-xs font-medium"
                style={{ color: themeConfig.colors.text }}
              >
                {isRefreshing ? 'Refreshing...' : 'Pull to refresh'}
              </span>
            </div>
          </div>
        )}
      </div>
    </MobileNavigationWrapper>
  );
}
