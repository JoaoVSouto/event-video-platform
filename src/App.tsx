import { gql, useQuery } from '@apollo/client';

const GET_LESSONS_QUERY = gql`
  query GetLessons {
    lessons {
      id
      title
    }
  }
`;

type Lesson = {
  id: string;
  title: string;
};

export function App() {
  const { data, loading } = useQuery<{ lessons: Lesson[] }>(GET_LESSONS_QUERY);

  return loading ? (
    <p>Loading...</p>
  ) : (
    <ul>
      {data?.lessons.map(lesson => (
        <li key={lesson.id}>{lesson.title}</li>
      ))}
    </ul>
  );
}
