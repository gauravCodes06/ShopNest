import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, TrendingUp, Sparkles, Film, Tv, Flame, X, Volume2, Maximize, Pause, RotateCcw, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Show {
  id: number;
  title: string;
  genre: string;
  rating: string;
  episodes: string;
  image: string;
  tag: string;
  category: 'Web Series' | 'Short Films' | 'Comedy Shows' | 'Romance' | 'Desi Melodrama';
  description: string;
}

export function MiniTVPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('Desi Melodrama');
  const [activeVideoShow, setActiveVideoShow] = useState<Show | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [progress, setProgress] = useState(35);

  const allShows: Show[] = [
    {
      id: 1,
      title: 'Crushed - Season 4',
      genre: 'Romance • Drama • Coming of Age',
      rating: '8.4',
      episodes: '6 Episodes',
      image: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
      tag: 'NEW EPISODES',
      category: 'Romance',
      description: 'Follow the bittersweet journey of teenage love, friendship dilemmas, and school rivalries in Lucknow high school.',
    },
    {
      id: 2,
      title: 'Physics Wallah',
      genre: 'Biopic • Inspirational • Drama',
      rating: '8.9',
      episodes: '8 Episodes',
      image: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
      tag: 'TRENDING #1',
      category: 'Desi Melodrama',
      description: 'The incredible journey of a passionate teacher who revolutionised India’s education system with vision and determination.',
    },
    {
      id: 3,
      title: 'Case Toh Banta Hai',
      genre: 'Comedy • Courtroom • Celebrity',
      rating: '7.8',
      episodes: '12 Episodes',
      image: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
      tag: 'POPULAR',
      category: 'Comedy Shows',
      description: 'Hilarious mock courtroom trials where Bollywood stars defend bizarre accusations made by public prosecutors.',
    },
    {
      id: 4,
      title: 'Slum Golf',
      genre: 'Sports • Drama • Inspiration',
      rating: '8.2',
      episodes: '7 Episodes',
      image: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
      tag: 'TOP RATED',
      category: 'Web Series',
      description: 'Against all odds, a young boy from the slums of Mumbai dreams of mastering professional golf and competing globally.',
    },
    {
      id: 5,
      title: 'Yeh Meri Family',
      genre: 'Family • Nostalgia • Comedy',
      rating: '9.0',
      episodes: '5 Episodes',
      image: 'https://m.media-amazon.com/images/M/MV5BMjIxMjgxNTk0MF5BMl5BanBnXkFtZTgwNjIyOTg2MDE@._V1_.jpg',
      tag: 'SUPERHIT',
      category: 'Desi Melodrama',
      description: 'Relive the golden era of the 1990s through the innocent eyes of a 12-year-old child and his eccentric loving family.',
    },
    {
      id: 6,
      title: 'Half CA',
      genre: 'Drama • Academic • Motivation',
      rating: '8.6',
      episodes: '6 Episodes',
      image: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
      tag: 'TRENDING #2',
      category: 'Desi Melodrama',
      description: 'The real battles, sacrifices, and pressures faced by students preparing for India’s toughest exam: Chartered Accountancy.',
    },
    {
      id: 7,
      title: 'Highway Love',
      genre: 'Romance • Road Trip • Drama',
      rating: '8.1',
      episodes: '6 Episodes',
      image: 'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg',
      tag: 'ROMANCE',
      category: 'Romance',
      description: 'Two complete opposites meet during an unexpected car breakdown on the highway, changing their lives forever.',
    },
    {
      id: 8,
      title: 'The Mini Life',
      genre: 'Short Film • Slice of Life',
      rating: '8.0',
      episodes: '1 Episode',
      image: 'https://m.media-amazon.com/images/I/91KkWf50SoL.jpg',
      tag: 'AWARD WINNING',
      category: 'Short Films',
      description: 'A poignant 25-minute journey of reconnecting with old childhood memories in a fast-paced metropolitan city.',
    },
  ];

  const categories = ['All', 'Web Series', 'Short Films', 'Comedy Shows', 'Romance', 'Desi Melodrama'];

  const displayedShows = activeTab === 'All'
    ? allShows
    : allShows.filter((s) => s.category === activeTab);

  const handlePlayShow = (show: Show) => {
    setActiveVideoShow(show);
    setIsPlaying(true);
    setProgress(15);
    setSelectedEpisode(1);
  };

  return (
    <div className="bg-[#0f1111] text-white min-h-screen pb-16">
      {/* miniTV Header Banner */}
      <div className="bg-gradient-to-r from-[#191919] via-[#0b2447] to-[#131921] px-6 py-12 border-b border-gray-800">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-1.5 bg-[#febd69] text-[#131921] text-xs font-black px-2.5 py-1 rounded-[2px]">
              <Flame className="w-4 h-4 fill-current" />
              <span>ShopNest miniTV • 100% FREE ENTERTAINMENT</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              {t('watchTopSeries', 'Watch Top Web Series & Movies for Free')}
            </h1>
            <p className="text-sm text-gray-300">
              {t('miniTVBannerDesc', 'No subscription required. Stream unlimited trending shows, comedies, and originals directly on ShopNest.')}
            </p>
            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={() => handlePlayShow(allShows[1])}
                className="bg-[#008a00] hover:bg-[#007000] text-white px-6 py-2.5 rounded-md font-bold text-sm inline-flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105 transition-all"
              >
                <Play className="w-4 h-4 fill-white" /> {t('startWatching', 'Start Watching')}
              </button>
            </div>
          </div>

          <div
            onClick={() => handlePlayShow(allShows[1])}
            className="w-full md:w-96 aspect-video rounded-lg overflow-hidden border border-gray-700 shadow-2xl relative cursor-pointer group"
          >
            <img
              src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
              alt="miniTV stream banner"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-[#ffd814] text-[#0f1111] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 fill-current ml-0.5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <div className="flex gap-2 overflow-x-auto pb-2 border-b border-gray-800 text-xs">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveTab(c)}
              className={`px-4 py-2 rounded-full font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === c
                  ? 'bg-white text-[#0f1111] font-bold shadow-sm'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Shows Grid */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#ffd814]" />
              {t('trendingOnMiniTV', 'Trending on ShopNest miniTV')}
            </h2>
            <span
              onClick={() => setActiveTab('All')}
              className="text-xs text-[#00a8e1] hover:underline cursor-pointer"
            >
              {t('viewAll', 'View All')}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedShows.map((show) => (
              <div
                key={show.id}
                onClick={() => handlePlayShow(show)}
                className="bg-[#1a1a1a] rounded-lg overflow-hidden border border-gray-800 hover:border-gray-600 transition-all hover:scale-[1.02] cursor-pointer group shadow-lg"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={show.image}
                    alt={show.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-[#cc0c39] text-white text-[10px] font-bold px-2 py-0.5 rounded-[2px]">
                    {show.tag}
                  </span>
                  <div className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity ${show.id === 2 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    <div className="w-10 h-10 rounded-full bg-[#ffd814] text-[#0f1111] flex items-center justify-center shadow-md">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-1.5">
                  <h3 className="font-bold text-base text-white group-hover:text-[#ffd814] transition-colors line-clamp-1">
                    {show.title}
                  </h3>
                  <p className="text-xs text-gray-400">{show.genre}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-800">
                    <span className="flex items-center gap-1 font-bold text-[#ffd814]">
                      <Star className="w-3.5 h-3.5 fill-current" /> {show.rating} IMDB
                    </span>
                    <span>{show.episodes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Interactive Full Theater Video Player Modal ── */}
      {activeVideoShow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#141414] rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-gray-800 flex flex-col animate-in zoom-in-95">
            {/* Top Bar */}
            <div className="p-4 bg-gray-900/90 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="bg-[#febd69] text-black font-extrabold text-[10px] px-2 py-0.5 rounded">miniTV HD</span>
                <h3 className="font-bold text-white text-sm">{activeVideoShow.title} — Episode {selectedEpisode}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveVideoShow(null)}
                className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Canvas Simulation */}
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden group">
              <img
                src={activeVideoShow.image}
                alt={activeVideoShow.title}
                className="w-full h-full object-cover opacity-60"
              />

              {/* Streaming Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 flex flex-col justify-between p-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="bg-red-600 text-white font-bold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">
                    {isPlaying ? 'Streaming Free' : 'Paused'}
                  </span>
                  <span className="text-gray-300 text-xs">1080p FHD • Dolby Atmos 5.1</span>
                </div>

                {/* Big Center Play/Pause button */}
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-[#ffd814] text-black flex items-center justify-center mx-auto shadow-2xl hover:scale-110 transition-transform cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
                </button>

                {/* Bottom Controls Bar */}
                <div className="space-y-2">
                  {/* Progress scrubber */}
                  <div
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      setProgress(Math.round((clickX / rect.width) * 100));
                    }}
                    className="w-full h-1.5 bg-gray-700 rounded-full cursor-pointer relative overflow-hidden"
                  >
                    <div
                      className="h-full bg-[#ffd814] transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-300">
                    <div className="flex items-center gap-3">
                      <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-white">
                        {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                      </button>
                      <button onClick={() => setProgress(0)} className="hover:text-white" title="Replay">
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <span>12:45 / 38:20</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Volume2 className="w-4 h-4 hover:text-white cursor-pointer" />
                      <Maximize className="w-4 h-4 hover:text-white cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Details & Episodes List */}
            <div className="p-5 space-y-4 max-h-64 overflow-y-auto">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h4 className="text-base font-bold text-white">{activeVideoShow.title}</h4>
                  <p className="text-xs text-gray-400 mt-1 max-w-xl">{activeVideoShow.description}</p>
                </div>
                <span className="flex items-center gap-1 font-bold text-[#ffd814] bg-gray-900 px-3 py-1 rounded-xl border border-gray-800 text-xs shrink-0">
                  <Star className="w-4 h-4 fill-current" /> {activeVideoShow.rating} IMDb
                </span>
              </div>

              {/* Episode Selector */}
              <div>
                <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Select Episode</h5>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {[1, 2, 3, 4, 5, 6].map((ep) => (
                    <button
                      key={ep}
                      type="button"
                      onClick={() => {
                        setSelectedEpisode(ep);
                        setIsPlaying(true);
                        setProgress(5);
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                        selectedEpisode === ep
                          ? 'border-[#ffd814] bg-[#ffd814]/10 text-[#ffd814]'
                          : 'border-gray-800 bg-gray-900 text-gray-400 hover:text-white'
                      }`}
                    >
                      Episode {ep}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
