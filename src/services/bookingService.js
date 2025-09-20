// 予約関連のFirebaseサービス
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query, 
  orderBy, 
  where,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase/config';

// 予約を追加
export const addBooking = async (bookingData) => {
  try {
    const docRef = await addDoc(collection(db, 'bookings'), {
      ...bookingData,
      createdAt: serverTimestamp(),
      status: 'pending' // pending, confirmed, cancelled
    });
    console.log('予約が追加されました:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('予約追加エラー:', error);
    throw error;
  }
};

// 全ての予約を取得
export const getAllBookings = async () => {
  try {
    const q = query(
      collection(db, 'bookings'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const bookings = [];
    querySnapshot.forEach((doc) => {
      bookings.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return bookings;
  } catch (error) {
    console.error('予約取得エラー:', error);
    throw error;
  }
};

// 特定の日付の予約を取得
export const getBookingsByDate = async (date) => {
  try {
    const q = query(
      collection(db, 'bookings'),
      where('date', '==', date),
      orderBy('time', 'asc')
    );
    const querySnapshot = await getDocs(q);
    const bookings = [];
    querySnapshot.forEach((doc) => {
      bookings.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return bookings;
  } catch (error) {
    console.error('日付別予約取得エラー:', error);
    throw error;
  }
};

// 利用可能な時間を取得
export const getAvailableTimes = async (date) => {
  try {
    const bookedTimes = await getBookingsByDate(date);
    const allTimes = [
      '10:00', '11:00', '12:00', '13:00', '14:00', 
      '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
    ];
    
    const bookedTimeSlots = bookedTimes
      .filter(booking => booking.status !== 'cancelled')
      .map(booking => booking.time);
    
    return allTimes.filter(time => !bookedTimeSlots.includes(time));
  } catch (error) {
    console.error('利用可能時間取得エラー:', error);
    throw error;
  }
};

// 特定の予約を取得
export const getBookingById = async (bookingId) => {
  try {
    const docRef = doc(db, 'bookings', bookingId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      throw new Error('予約が見つかりません');
    }
  } catch (error) {
    console.error('予約取得エラー:', error);
    throw error;
  }
};

// 予約を更新
export const updateBooking = async (bookingId, updateData) => {
  try {
    const docRef = doc(db, 'bookings', bookingId);
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: serverTimestamp()
    });
    console.log('予約が更新されました:', bookingId);
  } catch (error) {
    console.error('予約更新エラー:', error);
    throw error;
  }
};

// 予約をキャンセル
export const cancelBooking = async (bookingId) => {
  try {
    const docRef = doc(db, 'bookings', bookingId);
    await updateDoc(docRef, {
      status: 'cancelled',
      cancelledAt: serverTimestamp()
    });
    console.log('予約がキャンセルされました:', bookingId);
  } catch (error) {
    console.error('予約キャンセルエラー:', error);
    throw error;
  }
};

// 予約を削除
export const deleteBooking = async (bookingId) => {
  try {
    const docRef = doc(db, 'bookings', bookingId);
    await deleteDoc(docRef);
    console.log('予約が削除されました:', bookingId);
  } catch (error) {
    console.error('予約削除エラー:', error);
    throw error;
  }
};

// メールアドレスで予約を検索
export const getBookingsByEmail = async (email) => {
  try {
    const q = query(
      collection(db, 'bookings'),
      where('email', '==', email),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const bookings = [];
    querySnapshot.forEach((doc) => {
      bookings.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return bookings;
  } catch (error) {
    console.error('メール別予約取得エラー:', error);
    throw error;
  }
};

// 予約確認メール送信（モック）
export const sendBookingConfirmationEmail = async (bookingData) => {
  try {
    // 実際の実装では、Firebase Functionsや外部メールサービスを使用
    console.log('予約確認メール送信:', {
      to: bookingData.email,
      subject: '予約確認 - 耳かき屋さん',
      body: `お名前: ${bookingData.name}\n予約日時: ${bookingData.date} ${bookingData.time}\nサービス: ${bookingData.service}`
    });
    
    // モック成功レスポンス
    return { success: true, messageId: 'mock-message-id' };
  } catch (error) {
    console.error('メール送信エラー:', error);
    throw error;
  }
};
