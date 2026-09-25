import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedProducts } from '../data/products';
import { formatPrice } from '../lib/utils';
import { Search, ChevronDown, Package, RotateCcw } from 'lucide-react';

export function OrdersPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'buyAgain' | 'notShipped' | 'cancelled'>('orders');
  const sampleProducts = getFeaturedProducts().slice(0, 3);

  const mockOrders = [
    {
      id: '408-5928174-8291038',
      date: '24 September 2026',
      total: 22399,
      recipient: 'Rahul Sharma',
      status: 'Delivered Yesterday',
      items: [sampleProducts[0]],
    },
    {
      id: '408-1029384-9384721',
      date: '18 September 2026',
      total: 35999,
      recipient: 'Rahul Sharma',
      status: 'Delivered 20 September 2026',
      items: [sampleProducts[1]],
    },
    {
      id: '408-7291834-4728190',
      date: '10 September 2026',
      total: 3999,
      recipient: 'Rahul Sharma',
      status: 'Delivered 12 September 2026',
      items: [sampleProducts[2]],
    },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      {/* ── Heading & Search Bar ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-[#0f1111]">Your Orders</h1>
        <div className="relative w-full sm:w-80">
          <input
            type="search"
            placeholder="Search all orders"
            className="input pr-10 text-xs py-2"
          />
          <button className="btn-amazon-primary absolute right-0 top-0 h-full px-3 text-xs rounded-l-none">
            Search Orders
          </button>
        </div>
      </div>

      {/* ── Filter Tabs ─────────────────────────────────────────────────── */}
      <div className="flex border-b border-[#d5d9d9] mb-6 gap-6 text-sm">
        {[
          { key: 'orders', label: 'Orders' },
          { key: 'buyAgain', label: 'Buy Again' },
          { key: 'notShipped', label: 'Not Yet Shipped' },
          { key: 'cancelled', label: 'Cancelled Orders' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as any)}
            className={`pb-2.5 font-medium transition-colors cursor-pointer ${
              activeTab === key
                ? 'text-[#0f1111] border-b-2 border-[#e77600] font-bold'
                : 'text-[#565959] hover:text-[#0f1111]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Order List Cards ────────────────────────────────────────────── */}
      <div className="space-y-6">
        {mockOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-[8px] border border-[#d5d9d9] shadow-sm overflow-hidden"
          >
            {/* Order Card Header (#f0f2f2) */}
            <div className="bg-[#f0f2f2] p-4 flex flex-wrap items-center justify-between gap-4 text-xs text-[#565959] border-b border-[#d5d9d9]">
              <div className="flex flex-wrap gap-8">
                <div>
                  <span className="block uppercase text-[10px]">Order Placed</span>
                  <span className="font-medium text-[#0f1111]">{order.date}</span>
                </div>
                <div>
                  <span className="block uppercase text-[10px]">Total</span>
                  <span className="font-medium text-[#0f1111]">
                    ₹{order.total.toLocaleString('en-IN')}
                  </span>
                </div>
                <div>
                  <span className="block uppercase text-[10px]">Ship To</span>
                  <span className="font-medium text-[#007185] hover:underline cursor-pointer flex items-center gap-0.5">
                    {order.recipient} <ChevronDown className="w-3 h-3 text-gray-500" />
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="block uppercase text-[10px]">Order # {order.id}</span>
                <div className="flex items-center gap-2 text-[#007185] mt-0.5">
                  <a href="#" className="hover:underline">View order details</a>
                  <span>|</span>
                  <a href="#" className="hover:underline">Invoice</a>
                </div>
              </div>
            </div>

            {/* Order Card Body */}
            <div className="p-5 flex flex-col md:flex-row items-start justify-between gap-6">
              <div className="space-y-4 flex-1">
                <p className="text-base font-bold text-[#0f1111]">{order.status}</p>
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <Link to={`/product/${item.id}`} className="w-20 h-20 bg-white p-1 border rounded shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </Link>
                    <div>
                      <Link
                        to={`/product/${item.id}`}
                        className="text-sm font-medium text-[#007185] hover:text-[#c7511f] hover:underline line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      <p className="text-xs text-[#565959] mt-1">Return window closed on 25 September 2026</p>
                      <div className="mt-2 flex gap-3 text-xs">
                        <Link to={`/product/${item.id}`} className="btn-amazon-primary px-3 py-1 text-xs">
                          Buy it again
                        </Link>
                        <Link to={`/product/${item.id}`} className="btn-amazon-white px-3 py-1 text-xs">
                          View your item
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons Column */}
              <div className="w-full md:w-56 flex flex-col gap-2 shrink-0 text-xs">
                <button className="btn-amazon-white w-full py-1.5 shadow-sm text-xs">
                  Track package
                </button>
                <button className="btn-amazon-white w-full py-1.5 shadow-sm text-xs">
                  Return or replace items
                </button>
                <button className="btn-amazon-white w-full py-1.5 shadow-sm text-xs">
                  Write a product review
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
