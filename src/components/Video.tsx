import '@vime/core/themes/default.css';

import {
  CaretRight,
  DiscordLogo,
  FileArrowDown,
  Lightning,
} from 'phosphor-react';
import { DefaultUi, Player, Youtube } from '@vime/react';
import { gql, useQuery } from '@apollo/client';

type VideoProps = {
  lessonSlug: string;
};

type GetLessonBySlugResponse = {
  lesson: {
    title: string;
    videoId: string;
    description: string;
    teacher: {
      avatarURL: string;
      name: string;
      bio: string;
    };
  };
};

const GET_LESSON_BY_SLUG_QUERY = gql`
  query GetLessonBySlug($slug: String) {
    lesson(where: { slug: $slug }) {
      title
      videoId
      description
      teacher {
        avatarURL
        name
        bio
      }
    }
  }
`;

export function Video({ lessonSlug }: VideoProps) {
  const { data } = useQuery<GetLessonBySlugResponse>(GET_LESSON_BY_SLUG_QUERY, {
    variables: { slug: lessonSlug },
  });

  if (!data) {
    return <div className="flex-1" />;
  }

  return (
    <div className="flex-1">
      <div className={['bg-black', 'flex', 'justify-center'].join(' ')}>
        <div
          className={[
            'h-full',
            'w-full',
            'max-w-[1100px]',
            'max-h-[60vh]',
            'aspect-video',
          ].join(' ')}
        >
          <Player>
            <Youtube videoId={data.lesson.videoId} />
            <DefaultUi />
          </Player>
        </div>
      </div>

      <div className={['p-8', 'max-w-[1100px]', 'mx-auto'].join(' ')}>
        <div className={['flex', 'items-start', 'gap-16'].join(' ')}>
          <div className="flex-1">
            <h1 className={['text-2xl', 'font-bold'].join(' ')}>
              {data.lesson.title}
            </h1>
            <p
              className={['mt-4', 'text-gray-200', 'leading-relaxed'].join(' ')}
            >
              {data.lesson.description}
            </p>

            <div
              className={['flex', 'items-center', 'gap-4', 'mt-6'].join(' ')}
            >
              <img
                className={[
                  'h-16',
                  'w-16',
                  'rounded-full',
                  'object-cover',
                  'border-2',
                  'border-blue-500',
                ].join(' ')}
                src={data.lesson.teacher.avatarURL}
                alt={data.lesson.teacher.name}
              />

              <div className="leading-relaxed">
                <strong
                  className={['font-bold', 'text-2xl', 'block'].join(' ')}
                >
                  {data.lesson.teacher.name}
                </strong>
                <span
                  className={['text-gray-200', 'text-sm', 'block'].join(' ')}
                >
                  {data.lesson.teacher.bio}
                </span>
              </div>
            </div>
          </div>

          <div className={['flex', 'flex-col', 'gap-4'].join(' ')}>
            <a
              href="#!"
              className={[
                'p-4',
                'text-sm',
                'bg-green-500',
                'flex',
                'justify-center',
                'items-center',
                'rounded',
                'font-bold',
                'uppercase',
                'gap-2',
                'hover:bg-green-700',
                'transition-colors',
              ].join(' ')}
            >
              <DiscordLogo size={24} />
              Comunidade do Discord
            </a>
            <a
              href="#!"
              className={[
                'p-4',
                'text-sm',
                'flex',
                'justify-center',
                'items-center',
                'rounded',
                'font-bold',
                'uppercase',
                'gap-2',
                'border',
                'border-blue-500',
                'text-blue-500',
                'hover:bg-blue-500',
                'hover:text-gray-900',
                'transition-colors',
              ].join(' ')}
            >
              <Lightning size={24} />
              Acesse o desafio
            </a>
          </div>
        </div>

        <div className={['gap-8', 'mt-20', 'grid', 'grid-cols-2'].join(' ')}>
          <a
            href="#!"
            className={[
              'bg-gray-700',
              'rounded',
              'overflow-hidden',
              'flex',
              'items-stretch',
              'gap-6',
              'hover:bg-gray-600',
              'transition-colors',
            ].join(' ')}
          >
            <div
              className={[
                'bg-green-700',
                'h-full',
                'p-6',
                'flex',
                'items-center',
              ].join(' ')}
            >
              <FileArrowDown size={40} />
            </div>
            <div className={['py-6', 'leading-relaxed'].join(' ')}>
              <strong className="text-2xl">Material complementar</strong>
              <p className={['text-sm', 'text-gray-200', 'mt-2'].join(' ')}>
                Acesse o material complementar para acelerar o seu
                desenvolvimento
              </p>
            </div>
            <div
              className={[
                'h-full',
                'p-6',
                'flex',
                'items-center',
                'text-blue-500',
              ].join(' ')}
            >
              <CaretRight size={24} />
            </div>
          </a>

          <a
            href="#!"
            className={[
              'bg-gray-700',
              'rounded',
              'overflow-hidden',
              'flex',
              'items-stretch',
              'gap-6',
              'hover:bg-gray-600',
              'transition-colors',
            ].join(' ')}
          >
            <div
              className={[
                'bg-green-700',
                'h-full',
                'p-6',
                'flex',
                'items-center',
              ].join(' ')}
            >
              <FileArrowDown size={40} />
            </div>
            <div className={['py-6', 'leading-relaxed'].join(' ')}>
              <strong className="text-2xl">Wallpapers exclusivos</strong>
              <p className={['text-sm', 'text-gray-200', 'mt-2'].join(' ')}>
                Baixe wallpapers exclusivos do Ignite Lab e personalize a sua
                máquina
              </p>
            </div>
            <div
              className={[
                'h-full',
                'p-6',
                'flex',
                'items-center',
                'text-blue-500',
              ].join(' ')}
            >
              <CaretRight size={24} />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
