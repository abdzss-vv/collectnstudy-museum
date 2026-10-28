import { galleryPortrait } from './sample';
import type { Collectible, SubjectId } from './types';

export const monaLisaDetails = {
  artist: 'Leonardo da Vinci',
  date: 'circa 1503–1519',
  fact: 'The portrait is believed to depict Lisa Gherardini. Leonardo’s sfumato technique blends tones to create soft shadows and her enigmatic smile.',
};
export function makeReward(sessionId: string, subjectId: SubjectId, earnedAt: string): Collectible {
  return { ...galleryPortrait, id: `mona-lisa-${sessionId}`, subjectId, earnedSessionId: sessionId, earnedAt,
    note: `${monaLisaDetails.artist}, ${monaLisaDetails.date} · ${monaLisaDetails.fact}` };
}