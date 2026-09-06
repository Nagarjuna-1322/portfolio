import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  increment, 
  onSnapshot, 
  getDocFromServer 
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp({
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  messagingSenderId: firebaseConfig.messagingSenderId,
  appId: firebaseConfig.appId,
}) : getApp();

// Initialize Firestore with custom database ID if specified
export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Connection test as required by Firebase integration skill
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Firebase client is currently offline. Operating in offline/cached mode.");
    }
  }
}
testConnection();

/**
 * Record a visit and subscribe to live visitor count updates.
 * Deduplicates multiple page refreshes in the same browser session using sessionStorage.
 */
export function subscribeToVisitorCount(callback: (count: number, isLive: boolean) => void): () => void {
  const visitorDocRef = doc(db, 'stats', 'visitors');

  // Record visit once per session
  const SESSION_KEY = 'portfolio_visited_session';
  const hasVisitedThisSession = typeof window !== 'undefined' && sessionStorage.getItem(SESSION_KEY);

  const incrementVisitor = async () => {
    try {
      if (!hasVisitedThisSession && typeof window !== 'undefined') {
        sessionStorage.setItem(SESSION_KEY, 'true');
        
        const docSnap = await getDoc(visitorDocRef);
        if (!docSnap.exists()) {
          // Initialize doc if it doesn't exist
          await setDoc(visitorDocRef, {
            count: 1,
            lastVisitedAt: new Date().toISOString(),
          });
        } else {
          // Atomically increment counter
          await updateDoc(visitorDocRef, {
            count: increment(1),
            lastVisitedAt: new Date().toISOString(),
          });
        }
      }
    } catch (err) {
      console.warn("Could not increment visitor counter:", err);
    }
  };

  incrementVisitor();

  // Listen to live realtime updates
  const unsubscribe = onSnapshot(
    visitorDocRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        const count = typeof data?.count === 'number' ? data.count : 1;
        callback(count, true);
      } else {
        // Doc not created yet
        callback(1, false);
      }
    },
    (error) => {
      console.warn("Visitor counter snapshot subscription note:", error.message);
      // Fallback to local default if permission or connection issue
      callback(128, false);
    }
  );

  return unsubscribe;
}
