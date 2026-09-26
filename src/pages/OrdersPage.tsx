import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedProducts } from '../data/products';
import { formatPrice } from '../lib/utils';
import { ProductImage } from '../components/ui/ProductImage';
import { subscribeToOrders } from '../lib/firebase';
import { loadOrders } from '../lib/storage';
import { OrderTrackingModal } from '../components/orders/OrderTrackingModal';
import { useCartStore } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { Search, ChevronDown, Package, RotateCcw, Truck, CheckCircle2, Radio, FileText, ShoppingCart, Check } from 'lucide-react';

export function OrdersPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'buyAgain' | 'notShipped' | 'cancelled'>('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const [trackingOrder, setTrackingOrder] = useState<any | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const addItem = useCartStore((s) => s.addItem);
  const { t } = useLanguage();

  const sampleProducts = getFeaturedProducts().slice(0, 3);

  const defaultMockOrders = [
    {
      id: '#55202604061234',
      date: '24 September 2026',
      total: 22399,
      recipient: 'Gaurav Mali',
      status: 'Delivered Yesterday',
      items: [sampleProducts[0]],
    },
    {
      id: '#55202603819284',
      date: '18 September 2026',
      total: 35999,
      recipient: 'Gaurav Mali',
      status: 'Delivered 20 September 2026',
      items: [sampleProducts[1]],
    },
    {
      id: '#55202601928374',
      date: '10 September 2026',
      total: 3999,
      recipient: 'Gaurav Mali',
      status: 'Delivered 12 September 2026',
      items: [sampleProducts[2]],
    },
  ];

  useEffect(() => {
    // 1. Initial load from local storage
    const local = loadOrders();
    if (local && local.length > 0) {
      setOrders([...local, ...defaultMockOrders]);
    } else {
      setOrders(defaultMockOrders);
    }

    // 2. Real-time subscription to Firebase Realtime Database
    const unsubscribe = subscribeToOrders((firebaseOrders) => {
      setIsLiveConnected(true);
      if (firebaseOrders && firebaseOrders.length > 0) {
        // Merge without duplicates
        const seen = new Set();
        const combined = [...firebaseOrders, ...local, ...defaultMockOrders].filter((item) => {
          const id = item.id || item.orderId;
          if (seen.has(id)) return false;
          seen.add(id);
          return true;
        });
        setOrders(combined);
      }
    });

    return () => unsubscribe();
  }, []);

  const cancelledMockOrders = [
    {
      id: '#55202600192841',
      date: '12 September 2026',
      total: 1899,
      recipient: 'Gaurav Mali',
      status: 'Cancelled • Refund of ₹1,899 Credited to Bank Account',
      items: [sampleProducts[1]],
      isCancelled: true,
    },
  ];

  const notShippedMockOrders = [
    {
      id: '#55202604991203',
      date: 'Today, 02:15 PM',
      total: 4499,
      recipient: 'Gaurav Mali',
      status: 'In Transit • Arriving by Tomorrow 11:00 AM',
      items: [sampleProducts[0]],
      isNotShipped: true,
    },
  ];

  let displayList = orders;
  if (activeTab === 'cancelled') {
    displayList = cancelledMockOrders;
  } else if (activeTab === 'notShipped') {
    displayList = notShippedMockOrders;
  }

  const filteredOrders = displayList.filter((o) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const idMatch = (o.id || o.orderId || '').toLowerCase().includes(q);
    const itemMatch = (o.items || []).some((it: any) => (it.name || '').toLowerCase().includes(q));
    return idMatch || itemMatch;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 pb-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Heading & Search Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{t('yourOrders', 'Your Orders')}</h1>
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Firebase RTDB Live
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{t('trackReturnSubtitle', 'Track, return, or buy items again in real time')}</p>
          </div>
          <div className="relative w-full sm:w-80">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder', 'Search all orders...')}
              className="input pr-10 text-xs py-2.5 rounded-xl"
            />
            <button className="btn-sage absolute right-1 top-1 bottom-1 px-3.5 text-xs rounded-lg">
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Filter Tabs matching Image 1 */}
        <div className="flex border-b border-slate-200 mb-6 gap-6 text-xs sm:text-sm font-bold">
          {[
            { key: 'orders', label: t('ordersTab', 'Orders') },
            { key: 'buyAgain', label: t('buyAgain', 'Buy Again') },
            { key: 'notShipped', label: t('notYetShipped', 'Not Yet Shipped') },
            { key: 'cancelled', label: t('cancelledOrders', 'Cancelled Orders') },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`pb-3 relative transition-colors cursor-pointer ${
                activeTab === tab.key
                  ? 'text-emerald-600'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Orders / Buy Again List */}
        <div className="space-y-4">
          {activeTab === 'buyAgain' ? (
            /* Buy Again Specific Showcase */
            <div className="space-y-4">
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 flex items-center justify-between text-xs text-emerald-800">
                <span className="font-semibold">Recommended from your past purchases with guaranteed fast delivery.</span>
                <span className="font-bold text-emerald-700">{sampleProducts.length} Items Available</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sampleProducts.map((prod) => (
                  <div key={prod.id} className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-subtle flex flex-col justify-between space-y-4">
                    <div className="flex gap-4 items-center">
                      <Link to={`/product/${prod.id}`} className="w-20 h-20 bg-slate-50 rounded-2xl p-2 border border-slate-100 flex items-center justify-center shrink-0">
                        <ProductImage src={prod.image} alt={prod.name} className="max-h-full max-w-full object-contain" />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <Link to={`/product/${prod.id}`} className="text-xs font-bold text-slate-800 hover:text-emerald-600 line-clamp-2">
                          {prod.name}
                        </Link>
                        <p className="text-xs font-black text-slate-900 mt-1">{formatPrice(prod.price)}</p>
                        <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">In Stock • Eligible for FREE Prime Delivery</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          addItem(prod.id);
                          setToastMessage(`Added "${prod.name}" to your cart!`);
                          setTimeout(() => setToastMessage(''), 3500);
                        }}
                        className="btn-add-to-cart flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Buy it again
                      </button>
                      <Link to={`/product/${prod.id}`} className="btn-outline px-3 py-2 rounded-xl text-xs font-semibold">
                        View item
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-subtle">
              <Package className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-700">No orders found</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for another keyword or order ID.</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-subtle overflow-hidden"
              >
                {/* Order Meta Header */}
                <div className="bg-slate-50/80 px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-xs border-b border-slate-100">
                  <div className="flex flex-wrap gap-6 text-slate-500">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400">{t('orderPlaced', 'Order Placed')}</p>
                      <p className="font-semibold text-slate-800">{order.date || 'Recent'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400">{t('total', 'Total')}</p>
                      <p className="font-semibold text-slate-800">{formatPrice(order.total)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400">{t('shipTo', 'Ship To')}</p>
                      <p className="font-semibold text-slate-800">{order.recipient || 'Customer'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setToastMessage(`Invoice for Order ${order.id || order.orderId} prepared for download.`);
                        setTimeout(() => setToastMessage(''), 3000);
                      }}
                      className="text-xs font-semibold text-slate-600 hover:text-emerald-700 flex items-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>{t('invoice', 'Invoice')}</span>
                    </button>
                    <div className="text-right">
                      <p className="text-[10px] uppercase font-bold text-slate-400">{t('orderId', 'Order ID')}</p>
                      <p className="font-mono font-bold text-slate-900">{order.id || order.orderId}</p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className={`flex items-center gap-2 text-xs font-bold mb-4 ${order.isCancelled ? 'text-rose-600' : 'text-emerald-600'}`}>
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                    <span>{order.status || 'Order Confirmed'}</span>
                  </div>

                  {(order.items || []).map((item: any, idx: number) => {
                    if (!item) return null;
                    return (
                      <div key={item.id || idx} className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                          <Link
                            to={`/product/${item.id}`}
                            className="w-20 h-20 rounded-2xl bg-slate-50 p-2 border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden"
                          >
                            <ProductImage
                              src={item.image}
                              alt={item.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          </Link>
                          <div className="space-y-1">
                            <Link
                              to={`/product/${item.id}`}
                              className="text-sm font-semibold text-slate-900 hover:text-emerald-600 transition-colors line-clamp-1"
                            >
                              {item.name}
                            </Link>
                            <p className="text-xs text-slate-500 font-medium">Qty: {item.quantity || 1} • Verified Purchase</p>
                            <p className="text-sm font-bold text-slate-900">{formatPrice(item.price)}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
                          {!order.isCancelled && (
                            <button
                              type="button"
                              onClick={() => setTrackingOrder(order)}
                              className="btn-sage px-4 py-2 rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
                            >
                              <Truck className="w-3.5 h-3.5" />
                              <span>{t('trackPackage', 'Track Package')}</span>
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              addItem(item.id);
                              setToastMessage(`Added "${item.name}" to your cart!`);
                              setTimeout(() => setToastMessage(''), 3500);
                            }}
                            className="btn-outline px-4 py-2 rounded-xl text-xs font-semibold hover:border-emerald-600 hover:text-emerald-700 cursor-pointer"
                          >
                            {t('buyAgain', 'Buy again')}
                          </button>
                          <Link
                            to={`/product/${item.id}`}
                            className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-emerald-700 hover:bg-slate-100 transition-colors"
                          >
                            {t('viewItem', 'View item')}
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Floating Action Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-bottom-5">
          <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
          <span>{toastMessage}</span>
          <Link to="/cart" className="ml-2 underline text-emerald-400 font-bold hover:text-emerald-300">
            View Cart
          </Link>
        </div>
      )}

      {/* Package Tracking Timeline Modal */}
      <OrderTrackingModal
        order={trackingOrder}
        onClose={() => setTrackingOrder(null)}
      />
    </div>
  );
}
