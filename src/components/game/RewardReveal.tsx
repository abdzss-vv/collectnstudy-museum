import { useEffect, useState } from 'react';
import { Check, Gift, SkipForward } from 'lucide-react';
import rewardBox from '@/assets/reward-box.png';
import cardFront from '@/assets/reward-card-front.png.asset.json';
import cardBack from '@/assets/reward-card-back.png.asset.json';
import studyRoom from '@/assets/study-room.jpg';
import { subjectName } from '@/data/sample';
import { monaLisaDetails } from '@/data/rewards';
import { GameButton } from './ui';
import { useRewards } from './RewardsProvider';

export function RewardReveal() {
  const { state, confirm, error } = useRewards();
  const reward = state.pending[0];
  const [stage, setStage] = useState<'box' | 'opening' | 'card'>('box');
  const [flipped, setFlipped] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [saveError, setSaveError] = useState('');
  useEffect(() => { setStage('box'); setFlipped(false); setSpinning(false); setSaveError(''); }, [reward?.id]);
  useEffect(() => {
    if (stage !== 'opening') return;
    const id = window.setTimeout(() => setStage('card'), 1000);
    return () => window.clearTimeout(id);
  }, [stage]);
  useEffect(() => {
    if (stage !== 'card') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setSpinning(true);
    const id = window.setTimeout(() => setSpinning(false), 1100);
    return () => window.clearTimeout(id);
  }, [stage]);
  if (!reward) return null;
  return <section className="reward-screen" role="dialog" aria-modal="true" aria-label="Study collectible reward">
    <img src={studyRoom} className="focus-scenery" alt="" width={1920} height={1088} />
    <div className="reward-content">
      <p className="text-sm font-semibold text-primary">Study complete · {subjectName(reward.subjectId)}</p>
      <h1 className="mt-2 text-4xl">A new piece of history.</h1>
      {stage !== 'card' ? <>
        <GameButton autoFocus variant="ghost" className={`reward-box ${stage === 'opening' ? 'reward-box-opening' : ''}`} aria-label="Open collectible box" disabled={stage === 'opening'} onClick={() => setStage(window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'card' : 'opening')}><img src={rewardBox} alt="Illustrated oak collectible box with brass fittings and a green ribbon" width={1024} height={1024} /></GameButton>
        <div className="flex flex-wrap justify-center gap-3"><GameButton disabled={stage === 'opening'} onClick={() => setStage('opening')}><Gift size={17} /> Open box</GameButton><GameButton variant="outline" onClick={() => setStage('card')}><SkipForward size={17} /> Skip animation</GameButton></div>
      </> : <>
        <GameButton variant="ghost" aria-label={spinning ? 'Revealing collectible card' : flipped ? 'Show painting' : 'Flip card'} aria-pressed={spinning ? undefined : flipped} disabled={spinning} className={`artwork-card ${flipped ? 'artwork-card-flipped' : ''} ${spinning ? 'artwork-card-spin' : ''}`} onClick={() => setFlipped((v) => !v)}>
          <div className="artwork-card-inner">
            <div className="artwork-card-face" aria-hidden={flipped}><img src={cardFront.url} alt="Mona Lisa artwork card, supplied high-resolution design" width={723} height={1023} /></div>
            <div className="artwork-card-face artwork-card-back" aria-hidden={!flipped}><img src={cardBack.url} alt={`Mona Lisa. Painted by ${monaLisaDetails.artist}, ${monaLisaDetails.date}. ${monaLisaDetails.fact}`} width={723} height={1023} /></div>
          </div>
        </GameButton>
        <p className="mb-4 text-sm font-semibold text-primary">{reward.rarity} · Studied: {subjectName(reward.subjectId)}</p>
        <div className="flex justify-center"><GameButton autoFocus onClick={() => { try { confirm(reward.earnedSessionId ?? ''); } catch { setSaveError('Could not save to this browser. Your reward is still here; please try again.'); } }}><Check size={17} /> Add to collection</GameButton></div>
      </>}
      {(saveError || error) && <p role="alert" className="mt-4 text-sm text-destructive">{saveError || error}</p>}
    </div>
  </section>;
}
