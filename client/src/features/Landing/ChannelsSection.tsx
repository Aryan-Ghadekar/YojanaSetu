import { useNavigate } from 'react-router-dom';
import { channelOptions } from './channelsConfig';

const ChannelsSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Reach YojanaSetu Your Way</h2>
          <p className="mt-2 text-sm text-slate-500">Choose whichever channel works best for you — the same eligibility engine powers all of them.</p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {channelOptions.map((channel) => {
            const Icon = channel.icon;
            return (
              <button
                key={channel.title}
                onClick={() => navigate(channel.action)}
                className="group rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
              >
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition-transform group-hover:scale-110 group-hover:bg-brand-100">
                  <Icon size={20} />
                </span>
                <p className="mt-3 text-sm font-semibold text-slate-900">{channel.title}</p>
                <p className="mt-1 text-xs text-slate-500">{channel.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ChannelsSection;
