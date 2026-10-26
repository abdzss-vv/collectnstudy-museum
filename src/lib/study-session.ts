export type SessionStatus = 'running' | 'paused' | 'done';
export interface StudySession {
  subject: string;
  total: number;
  remaining: number;
  endsAt: number;
  status: SessionStatus;
}
export function startSession(subject: string, minutes: number, now: number): StudySession {
  const total = minutes * 60;
  return { subject, total, remaining: total, endsAt: now + total * 1000, status: 'running' };
}
export function tickSession(session: StudySession, now: number): StudySession {
  if (session.status !== 'running') return session;
  const remaining = Math.max(0, Math.ceil((session.endsAt - now) / 1000));
  return { ...session, remaining, status: remaining === 0 ? 'done' : 'running' };
}
export function pauseSession(session: StudySession, now: number): StudySession {
  const current = tickSession(session, now);
  return current.status === 'done' ? current : { ...current, status: 'paused' };
}
export function resumeSession(session: StudySession, now: number): StudySession {
  if (session.status !== 'paused') return session;
  return { ...session, status: 'running', endsAt: now + session.remaining * 1000 };
}