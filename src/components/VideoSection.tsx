import { DefaultUi, Player, Youtube } from '@vime/react';
import {
  DiscordLogo,
  FileArrowDown,
  ImageSquare,
  Lightning,
} from 'phosphor-react';
import { Button } from './Button';
import { Footer } from './Footer';
import { MaterialCard } from './MaterialCard';

import '@vime/core/themes/default.css';
import { gql, useQuery } from '@apollo/client';
import { isPast } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const GET_LESSON_BY_SLUG_QUERY = gql`
  query GetLessonBySlug($slug: String) {
    lesson(where: { slug: $slug }) {
      title
      videoId
      description
      availableAt
      teacher {
        bio
        avatarURL
        name
      }
      challenge {
        url
      }
    }
  }
`;

interface GetLessonBySlugResponse {
  lesson: {
    title: string;
    videoId: string;
    description: string;
    availableAt: Date;
    teacher: {
      bio: string;
      avatarURL: string;
      name: string;
    };
    challenge?: {
      url: string;
    };
  };
}

interface VideoProps {
  lessonSlug: string;
}

export function VideoSection({ lessonSlug }: VideoProps) {
  const navigate = useNavigate();
  const { data } = useQuery<GetLessonBySlugResponse>(GET_LESSON_BY_SLUG_QUERY, {
    variables: { slug: lessonSlug },
  });

  if (!data) {
    return (
      <div className='flex-1'>
        <p>Carregando...</p>
      </div>
    );
  }

  const isLessonAvailable = isPast(new Date(data.lesson.availableAt));

  if (!isLessonAvailable) {
    navigate(-1);
  }

  return (
    <div className='flex-1'>
      <div className='bg-black flex justify-center'>
        <div className='h-full w-full max-w-[1100px] max-h-[60vh] aspect-video'>
          <Player>
            <Youtube videoId={data.lesson.videoId} />
            <DefaultUi />
          </Player>
        </div>
      </div>

      <div className='p-8 max-w-[1100px] mx-auto flex flex-col gap-20'>
        <div className='flex items-start gap-16'>
          <div className='flex-1'>
            <h1 className='text-2xl font-bold text-gray-100'>
              {data.lesson.title}
            </h1>
            <p className='mt-4 text-gray-200 leading-relaxed'>
              {data.lesson.description}
            </p>

            <div className='flex items-center gap-4 mt-6'>
              <img
                className='h-16 w-16 rounded-full border-2 border-blue-500 '
                src={data.lesson.teacher.avatarURL}
                alt={`Foto de ${data.lesson.teacher.name}`}
              />
              <div className='leading-relaxed'>
                <strong className='font-bold text-2xl block'>
                  {data.lesson.teacher.name}
                </strong>
                <span className='text-gray-200 text-sm block'>
                  {data.lesson.teacher.bio}
                </span>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <Button href='https://discord-service.rocketseat.dev/signin/ignite-lab'>
              <DiscordLogo size={24} /> Comunidade no discord
            </Button>
            {data.lesson.challenge && (
              <Button variant='ghost' href={data.lesson.challenge.url}>
                <Lightning size={24} /> Acesse o desafio
              </Button>
            )}
          </div>
        </div>

        <div className='gap-8 grid grid-cols-2'>
          <MaterialCard
            title='Material complementar'
            description='Acesse o material complementar para acelerar o seu desenvolvimento'
            icon={<FileArrowDown size={40} />}
          />
          <MaterialCard
            title='Wallpapers exclusivos'
            description='Baixe wallpapers exclusivos do Ignite Lab e personalize a sua máquina'
            icon={<ImageSquare size={40} />}
          />
        </div>

        <Footer />
      </div>
    </div>
  );
}
