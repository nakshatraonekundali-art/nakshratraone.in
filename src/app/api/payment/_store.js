// Simple in-memory store for short-lived payment state
// Note: In production, replace with a persistent store (DB/cache)

const globalAny = global;

if (!globalAny.__PAYMENT_STORE__) {
  globalAny.__PAYMENT_STORE__ = new Map();
}

export function setPaymentContext(txnId, payload) {
  try {
    globalAny.__PAYMENT_STORE__.set(txnId, { ...payload, savedAt: Date.now() });
  } catch (_) {}
}

export function getPaymentContext(txnId) {
  try {
    return globalAny.__PAYMENT_STORE__.get(txnId) || null;
  } catch (_) {
    return null;
  }
}

export function deletePaymentContext(txnId) {
  try {
    globalAny.__PAYMENT_STORE__.delete(txnId);
  } catch (_) {}
}


