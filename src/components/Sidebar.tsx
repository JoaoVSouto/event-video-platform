import { gql, useQuery } from '@apollo/client';

import { Lesson, LessonTypes } from './Lesson';

const GET_LESSONS_QUERY = gql`
  query {
    lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
      id
      lessonType
      availableAt
      title
      slug
    }
  }
`;

type GetLessonsQueryResponse = {
  lessons: Array<{
    id: string;
    lessonType: LessonTypes;
    availableAt: string;
    title: string;
    slug: string;
  }>;
};

export function Sidebar() {
  const { data } = useQuery<GetLessonsQueryResponse>(GET_LESSONS_QUERY);

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
          />
        ))}
      </div>
    </aside>
  );
}
