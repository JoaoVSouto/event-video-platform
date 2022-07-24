import { Lesson } from './Lesson';
import { useGetLessonsQuery } from '@/graphql/generated';
import { useParams } from 'react-router-dom';

export function Sidebar() {
  const { data } = useGetLessonsQuery();
  const { slug } = useParams<{ slug: string }>();

  return (
    <aside
      className={[
        'w-[348px]',
        'bg-gray-700',
        'p-6',
        'border-l',
        'border-gray-600',
      ].join(' ')}
    >
      <span
        className={[
          'font-bold',
          'text-2xl',
          'pb-6',
          'mb-6',
          'border-b',
          'border-gray-500',
          'block',
        ].join(' ')}
      >
        Cronograma de aulas
      </span>

      <div className={['flex', 'flex-col', 'gap-8'].join(' ')}>
        {data?.lessons.map(lesson => (
          <Lesson
            key={lesson.id}
            title={lesson.title}
            slug={lesson.slug}
            availableAt={new Date(lesson.availableAt)}
            type={lesson.lessonType}
            isActive={lesson.slug === slug}
          />
        ))}
      </div>
    </aside>
  );
}
