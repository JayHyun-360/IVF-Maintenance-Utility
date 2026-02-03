"use client";

export default function TestEnvPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Environment Variables Test</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Environment Status</h2>
          <div className="space-y-2">
            <p><strong>NEXTAUTH_SECRET:</strong> {process.env.NEXTAUTH_SECRET ? 'Set' : 'Not Set'}</p>
            <p><strong>NEXTAUTH_URL:</strong> {process.env.NEXTAUTH_URL || 'Not Set'}</p>
            <p><strong>GOOGLE_CLIENT_ID:</strong> {process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Not Set'}</p>
            <p><strong>GOOGLE_CLIENT_SECRET:</strong> {process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Not Set'}</p>
            <p><strong>NODE_ENV:</strong> {process.env.NODE_ENV}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">NextAuth Configuration</h2>
          <div className="space-y-2">
            <p><strong>Expected NEXTAUTH_URL:</strong> {typeof window !== 'undefined' ? window.location.origin : 'Loading...'}</p>
            <p><strong>Current Origin:</strong> {typeof window !== 'undefined' ? window.location.origin : 'Loading...'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
