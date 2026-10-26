import { useState } from 'react';
import { BookOpen, Library, CalendarDays, Sprout, Settings, Coins, ArrowRight, Sun, VolumeX } from 'lucide-react';
import museumInterior from '@/assets/museum-interior.jpg';
import { museumDisplays, sampleCollectibles, sampleStats, subjectName } from '@/data/sample';
import type { Collectible } from '@/data/types';
import type { StudySession } from '@/lib/study-session';
import { CollectionContent } from './CollectionContent';
import { TestsContent } from './TestsContent';
import { MuseumPanel } from './MuseumPanel';
import { FocusMode } from './FocusMode';
import { StudySelector } from './StudySelector';
import { GameButton, SampleBadge } from './ui';

type Panel = 'collection' | 'tests' | 'progress' | 'settings' | 'study' | null;
export function MuseumHome() {
  const [panel, setPanel] = useState<Panel>(null);
  const [selected, setSelected] = useState<Collectible | null>(null);
  const [session, setSession] = useState<StudySession | null>(null);
  const [motion, setMotion] = useState(true);
  return <div className={`museum-home ${motion ? '' : 'museum-still'}`}>
    <div className="gallery-viewport"><div className="gallery-scene">
      <img src={museumInterior} alt="Sunlit museum with cream walls, oak floors, plants and ornate golden frames" className="gallery-background" width={1920} height={1088} />
      {museumDisplays.map(({ item, position }) => item && <GameButton key={item.id} variant="ghost" className={`gallery-art gallery-art-${position}`} aria-label={`Inspect ${item.name}`} title={item.name} onClick={() => setSelected(item)}><img src={item.image} alt={item.name} width={600} height={400} /></GameButton>)}
      <GameButton variant="ghost" className="gallery-art gallery-amphora" aria-label="Inspect Black-Figure Amphora" title="Black-Figure Amphora" onClick={() => setSelected(sampleCollectibles[2] ?? null)} />
    </div></div>
    <header className="museum-top">
      <div className="museum-brand"><Library size={22} /><div><h1>Collect<span>n</span>Study</h1><p>A little museum of your own</p></div></div>
      <div className="museum-currency" title="Demonstration currency; economy not active"><Coins size={18} /><span>{sampleStats.coins}</span><span className="text-xs text-muted-foreground">coins</span></div>
    </header>
    <div className="museum-room-label"><span className="room-line" /><p>The sunlit gallery</p><span className="room-line" /></div>
    <nav className="museum-tools" aria-label="Museum controls">
      <GameButton variant="outline" title="Collection" onClick={() => setPanel('collection')}><Library size={20} /><span>Collection</span></GameButton>
      <GameButton variant="outline" title="Tests" onClick={() => setPanel('tests')}><CalendarDays size={20} /><span>Tests</span></GameButton>
      <GameButton variant="outline" title="Museum progress" onClick={() => setPanel('progress')}><Sprout size={20} /><span>Progress</span></GameButton>
      <GameButton variant="outline" title="Settings" onClick={() => setPanel('settings')}><Settings size={20} /><span>Settings</span></GameButton>
    </nav>
    <div className="museum-bottom"><div className="gallery-caption"><Sun size={14} /><span>Main hall</span><span className="caption-dot">·</span><span>Demonstration displays</span></div><GameButton className="begin-study" onClick={() => setPanel('study')}><BookOpen size={21} /> Begin Studying <ArrowRight size={18} /></GameButton><p className="museum-bottom-note">A quiet moment today. A growing collection tomorrow.</p></div>
    <MuseumPanel open={panel !== null} onClose={() => setPanel(null)} title={panel === 'collection' ? 'Your collection' : panel === 'tests' ? 'Upcoming tests' : panel === 'progress' ? 'Museum journal' : panel === 'settings' ? 'Settings' : 'Settle in to study'} description="Museum panel. Close to return to the gallery." compact={panel === 'study' || panel === 'settings' || panel === 'progress'}>
      {panel === 'collection' && <CollectionContent />}
      {panel === 'tests' && <TestsContent />}
      {panel === 'study' && <StudySelector onStart={(value) => { setPanel(null); setSession(value); }} />}
      {panel === 'progress' && <><Sprout className="text-primary" size={30} /><h2 className="mt-4 text-2xl">Every museum starts small.</h2><dl className="journal-stats"><div><dt>Earned collectibles</dt><dd>0</dd></div><div><dt>Saved study sessions</dt><dd>0</dd></div><div><dt>Gallery</dt><dd>Main hall</dd></div></dl><SampleBadge>Prototype</SampleBadge><p className="mt-4 text-sm text-muted-foreground">Session history, visitors, expansions and rewards are not active yet.</p></>}
      {panel === 'settings' && <><label className="flex items-center justify-between gap-4 border-b border-border py-4"><span>Ambient movement</span><input type="checkbox" checked={motion} onChange={(e) => setMotion(e.target.checked)} className="h-5 w-5 accent-primary" /></label><p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground"><VolumeX size={17} /> Sound is not included in this prototype.</p><p className="mt-4 text-xs text-muted-foreground">Preferences apply until this page is refreshed.</p></>}
    </MuseumPanel>
    <MuseumPanel open={selected !== null} onClose={() => setSelected(null)} title={selected?.name ?? 'Display detail'} description="Details of this demonstration collectible." compact>
      {selected && <><div className="gilded-frame overflow-hidden"><img src={selected.image} alt={selected.name} className="max-h-64 w-full object-contain" /></div><div className="mt-5 flex flex-wrap gap-2"><SampleBadge>Demonstration · Not earned</SampleBadge><span className="text-sm text-muted-foreground">{selected.rarity} · {selected.category}</span></div><p className="mt-4">Associated subject: <strong>{subjectName(selected.subjectId)}</strong></p><p className="mt-2 text-sm text-muted-foreground">{selected.note}</p><p className="mt-2 text-sm text-muted-foreground">Catalogue value: {selected.value} coins (placeholder)</p></>}
    </MuseumPanel>
    {session && <FocusMode initial={session} onExit={() => setSession(null)} />}
  </div>;
}