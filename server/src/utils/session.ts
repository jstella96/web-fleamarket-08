const sessionStore = new Map();
const sessionTimeOut = 60 * 1000;

export const createSessionId = (userId): string => {
  const sessionId = Math.random().toString(20).slice(2);
  saveSession(sessionId, userId);
  return sessionId;
};

export const getSeesionValue = (sessionId) => {
  const session = sessionStore.get(sessionId);
  if (!session) return null;
  updateSessionDate(session.sessionId);
  return session.userId;
};

const saveSession = (sessionId, userId) => {
  const session = {
    sessionId: sessionId,
    userId: userId,
    updateAt: new Date(),
  };
  sessionStore.set(sessionId, session);
};

const updateSessionDate = (sessionId) => {
  const session = { ...sessionStore.get(sessionId) };
  session.updateAt = new Date();
  sessionStore.set(sessionId, session);
};

const removeExpiredSession = async () => {
  const sessionIds = [...sessionStore.keys()];
  const nowDate = new Date().getTime();
  sessionIds.forEach((sessionId) => {
    const sessionValue = sessionStore.get(sessionId);
    const updateAt = new Date(sessionValue.updateAt).getTime();
    if (nowDate - updateAt > sessionTimeOut) {
      sessionStore.delete(sessionId);
    }
  });
};

export const startSessionScheduler = (ms) => {
  ms = ms > 1000 ? ms : 1000;
  setInterval(() => {
    removeExpiredSession();
  }, ms);
};
