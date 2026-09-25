import { Link } from 'react-router-dom';
import { loadOrders } from '../lib/storage';
import { getProductById } from '../data/products';
import { formatPrice } from '../lib/utils';
import { Package, ArrowRight, Truck, CheckCircle2 } from 'lucide-react';

export function OrdersPage() {
  const orders = loadOrders().reverse(); // Show most recent first

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-500">
          <Package className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-100 mb-2">No Orders Yet</h2>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">
          You haven't placed any demo orders yet. When you do, they’ll show up here!
        </p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          Start Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Your Orders</h1>
        <p className="text-slate-400 text-sm mt-1">
          {orders.length} past {orders.length === 1 ? 'order' : 'orders'} placed
        </p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => {
          const dateStr = new Date(order.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });

          return (
            <div key={order.id} className="card overflow-hidden">
              {/* Order Card Header */}
              <div className="bg-slate-900/90 border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex flex-wrap items-center gap-6">
                  <div>
                    <span className="text-slate-500 block uppercase tracking-wider font-semibold">
                      Order Placed
                    </span>
                    <span className="text-slate-200 font-medium">{dateStr}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block uppercase tracking-wider font-semibold">
                      Total
                    </span>
                    <span className="text-slate-200 font-bold">{formatPrice(order.total)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block uppercase tracking-wider font-semibold">
                      Ship To
                    </span>
                    <span className="text-slate-200 font-medium">
                      {order.shippingAddress.fullName}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-slate-400 text-[11px] bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                    #{order.id}
                  </span>
                  <Link
                    to={`/order-confirmation/${order.id}`}
                    state={{ order }}
                    className="text-teal-400 hover:text-teal-300 font-medium transition-colors"
                  >
                    View Details &rarr;
                  </Link>
                </div>
              </div>

              {/* Order Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Status: Confirmed & Shipping</span>
                </div>

                <div className="space-y-4">
                  {order.items.map((item) => {
                    const product = getProductById(item.productId);
                    if (!product) return null;
                    return (
                      <div
                        key={product.id}
                        className="flex items-center justify-between gap-4 text-sm"
                      >
                        <div className="flex items-center gap-4">
                          <Link
                            to={`/product/${product.id}`}
                            className="w-16 h-16 rounded-lg bg-slate-800 overflow-hidden shrink-0"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </Link>
                          <div>
                            <Link
                              to={`/product/${product.id}`}
                              className="font-semibold text-slate-200 hover:text-teal-400 transition-colors line-clamp-1"
                            >
                              {product.name}
                            </Link>
                            <p className="text-xs text-slate-500 mt-0.5">
                              Qty: {item.quantity} · {formatPrice(product.price)} each
                            </p>
                          </div>
                        </div>

                        <Link
                          to={`/product/${product.id}`}
                          className="btn-secondary text-xs py-2 px-3 shrink-0"
                        >
                          Buy Again
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
