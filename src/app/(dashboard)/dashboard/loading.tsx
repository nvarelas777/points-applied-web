function Bar({ className }: { className: string }) {
  return <div className={`bg-slate-100 rounded ${className}`} />;
}

export default function DashboardLoading() {
  return (
    <div className="max-w-7xl mx-auto space-y-4 animate-pulse">
      {/* Account summary skeleton — mirrors AccountSummary's own layout classes */}
      <div className="app-card">
        <div className="app-card-header flex items-center gap-4 px-6">
          <div className="w-10 h-10 rounded-xl bg-white/20" />
          <div className="space-y-2">
            <div className="h-5 w-24 bg-white/20 rounded" />
            <div className="h-4 w-20 bg-white/10 rounded" />
          </div>
        </div>

        <div className="app-card-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-3xl border border-slate-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100" />
                  <div className="space-y-2">
                    <Bar className="h-3 w-16 ml-auto" />
                    <Bar className="h-6 w-12 ml-auto" />
                  </div>
                </div>
                <div className="flex gap-4 pt-3 border-t border-slate-50">
                  <Bar className="h-8 w-12" />
                  <Bar className="h-8 w-12" />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Bar className="h-3 w-16" />
                <Bar className="h-6 w-12" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card list skeleton — mirrors CardList/CardRow's own layout classes */}
      <div className="app-card">
        <div className="app-card-header flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <div className="h-5 w-24 bg-white/20 rounded" />
            <div className="h-4 w-56 bg-white/10 rounded" />
          </div>
          <div className="h-8 w-36 bg-white/20 rounded-lg" />
        </div>

        <div className="app-card-body space-y-4">
          <div className="flex flex-wrap gap-4 items-center">
            <Bar className="h-8 w-48 rounded-lg" />
            <Bar className="h-8 w-40 rounded-lg" />
            <Bar className="h-8 w-40 rounded-lg" />
            <Bar className="h-8 w-20 rounded-lg" />
          </div>

          <div className="hidden md:grid bg-slate-50 border border-slate-100 px-5 py-3 rounded-xl grid-cols-12 gap-4">
            <Bar className="col-span-4 h-4" />
            <Bar className="col-span-7 h-4" />
            <Bar className="col-span-1 h-4" />
          </div>

          <div className="space-y-4 mt-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white border border-slate-100 rounded-xl p-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center">
                  <div className="md:col-span-4 flex items-center gap-4">
                    <div className="h-14 w-24 rounded-lg bg-slate-100" />
                    <div className="space-y-2">
                      <Bar className="h-3 w-16" />
                      <Bar className="h-4 w-32" />
                    </div>
                  </div>
                  <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <div key={j} className="space-y-2">
                        <Bar className="h-3 w-10" />
                        <Bar className="h-4 w-14" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
