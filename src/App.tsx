import { gql, useQuery } from '@apollo/client';
import { client } from './lib/apollo';

const GET_LESSONS_QUERY = gql`
  query {
    lessons {
      id
      title
      lessonType
      availableAt
    }
  }
`;

interface Lesson {
  id: string;
  title: string;
  lessonType: 'live' | 'class';
  availableAt: string;
}

function App() {
  const { data } = useQuery<{ lessons: Lesson[] }>(GET_LESSONS_QUERY);
  console.log(data);

  return (
    <ul>
      {data?.lessons.map((lesson) => (
        <li>{lesson.title}</li>
      ))}
    </ul>
  );
}

export default App;
