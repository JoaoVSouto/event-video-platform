import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Video } from '@/components/Video';
import { useParams } from 'react-router-dom';

export function Event() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className={['flex', 'flex-col', 'min-h-screen'].join(' ')}>
      <Header />
      <main className={['flex', 'flex-1'].join(' ')}>
        {slug ? <Video lessonSlug={slug} /> : <div className="flex-1" />}
        <Sidebar />
      </main>
    </div>
  );
}
