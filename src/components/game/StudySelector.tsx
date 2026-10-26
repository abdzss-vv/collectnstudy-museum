import { useState } from 'react';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { subjects, durations } from '@/data/sample';
import { GameButton, Select } from './ui';
import { startSession, type StudySession } from '@/lib/study-session';

export function StudySelector({ onStart }: { onStart: (session: StudySession) => void }) {
  const [subject, setSubject] = useState('history');
  const [minutes, setMinutes] = useState(25);
  return <div className="space-y-6">
    <BookOpen className="text-primary" size={28} />
    <Select label="Subject" value={subject} onChange={setSubject} options={subjects.map((s) => ({ value: s.id, label: s.name }))} />
    <fieldset><legend className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground"><Clock size={15} /> Session duration</legend><div className="grid grid-cols-4 gap-2">{durations.map((duration) => <GameButton key={duration} variant={minutes === duration ? 'primary' : 'outline'} aria-pressed={minutes === duration} className="px-2" onClick={() => setMinutes(duration)}>{duration}m</GameButton>)}</div></fieldset>
    <GameButton className="w-full py-3" onClick={() => onStart(startSession(subject, minutes, Date.now()))}>Enter the reading room <ArrowRight size={17} /></GameButton>
  </div>;
}