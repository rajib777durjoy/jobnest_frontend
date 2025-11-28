'use client'

import React, { useEffect, useState } from 'react';

const endpoints = {
  jobs: '/api/admin/total-jobs',         // expected response: { total: 178, history: [20,30,15,45,...] }
  employers: '/api/admin/total-employers', // { total: 23, history: [2,1,3,4,...] }
  users: '/api/admin/total-users'        // { total: 1024, history: [50,60,40,80,...] }
};

// small util: convert array of numbers into an SVG polyline path (simple sparkline)
function sparklinePath(values, width = 120, height = 30, padding = 4) {
  if (!values || values.length === 0) return '';
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const step = (width - padding * 2) / (values.length - 1 || 1);

  return values
    .map((v, i) => {
      const x = padding + i * step;
      const y = padding + (1 - (v - min) / range) * (height - padding * 2);
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');
}

export default function AdminAnalytics() {
  const [data, setData] = useState({
    jobs: null,
    employers: null,
    users: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   let mounted = true;

  //   async function loadAll() {
  //     setLoading(true);
  //     try {
  //       const [jobsRes, empRes, usersRes] = await Promise.all([
  //         fetch(endpoints.jobs),
  //         fetch(endpoints.employers),
  //         fetch(endpoints.users)
  //       ]);

  //       // if (!jobsRes.ok || !empRes.ok || !usersRes.ok) {
  //       //   throw new Error('One or more requests failed');
  //       // }

  //       const jobsJson = await jobsRes.json();
  //       const empJson = await empRes.json();
  //       const usersJson = await usersRes.json();

  //       if (!mounted) return;
  //       setData({
  //         jobs: jobsJson,
  //         employers: empJson,
  //         users: usersJson
  //       });
  //       setError(null);
  //     } catch (err) {
  //       console.error(err);
  //       if (mounted) setError(err.message || 'Failed to load analytics');
  //     } finally {
  //       if (mounted) setLoading(false);
  //     }
  //   }

  //   loadAll();
  //   return () => { mounted = false; };
  // }, []);

  const cards = [
    {
      key: 'jobs',
      title: 'Total Jobs',
      subtitle: 'All posted jobs',
      colorClass: 'text-green-600'
    },
    {
      key: 'employers',
      title: 'Total Employers',
      subtitle: 'Registered companies',
      colorClass: 'text-blue-600'
    },
    {
      key: 'users',
      title: 'Total Job Seekers',
      subtitle: 'Registered job seekers',
      colorClass: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Admin Analytics</h1>

        {loading ? (
          <div className="p-6 bg-white rounded shadow text-center">Loading analytics...</div>
        ) : error ? (
          <div className="p-6 bg-red-50 text-red-700 rounded shadow">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {cards.map(card => {
                const d = data[card.key];
                const total = d?.total ?? 0;
                const history = Array.isArray(d?.history) ? d.history : [];
                const path = sparklinePath(history);

                return (
                  <div key={card.key} className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">{card.title}</p>
                        <h2 className="text-2xl font-semibold">{total}</h2>
                        <p className="text-xs text-gray-400 mt-1">{card.subtitle}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${card.colorClass}`}>View</div>
                        <div className="text-xs text-gray-400">details →</div>
                      </div>
                    </div>

                    {/* Sparkline */}
                    <div className="mt-4">
                      {history.length > 0 ? (
                        <svg width="140" height="38" viewBox="0 0 140 38" xmlns="http://www.w3.org/2000/svg">
                          <path d={path} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <div className="text-xs text-gray-400">No historical data</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Suggestions / deeper metrics */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold mb-2">Quick Insights</h3>
              <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                <li>Use the <code>history</code> array from each endpoint to render monthly charts (Chart.js / Recharts).</li>
                <li>Show <strong>growth %</strong> comparing last month vs previous month for each metric.</li>
                <li>Make each card clickable and link to your detailed pages (you already made them) for drill-down.</li>
                <li>Show <em>Top Categories</em> or <em>Top Jobs by Applications</em> as additional widgets.</li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
